"""
MCP(Memory Control Program) 서버의 메인 진입점
FastAPI를 사용하여 RESTful API 서버를 구현합니다.
"""

import datetime
import os
from pathlib import Path
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from pydantic import BaseModel
from typing import Dict, List, Optional
import uvicorn
from obsidian_handler import ObsidianHandler

# Vault 경로 설정
BASE_VAULT_PATH = Path("/Users/lineson/Library/Mobile Documents/iCloud~md~obsidian/Documents/Blog/Portfolio")
NOTES_PATH = BASE_VAULT_PATH / "MCP 활용/Cursor to Obsidian/자동생성노트"

# FastAPI 인스턴스 생성
app = FastAPI(
    title="MCP Server",
    description="Memory Control Program Server for Obsidian Integration",
    version="1.0.0"
)

# CORS 미들웨어 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# 신뢰할 수 있는 호스트 미들웨어 추가
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*"])

# 응답 모델 정의
class FolderStructure(BaseModel):
    folders: List[str]
    files: List[str]

class VaultResponse(BaseModel):
    status: str
    vault: Dict[str, FolderStructure]

class Note(BaseModel):
    filename: str
    content: str
    append: bool = False

    class Config:
        json_schema_extra = {
            "example": {
                "filename": "example_note",
                "content": "# Example Note\nThis is a test note.",
                "append": False
            }
        }

@app.get("/vault/list", 
         response_model=VaultResponse,
         summary="Obsidian Vault 구조 조회",
         description="Obsidian Vault의 전체 폴더 및 파일 구조를 반환합니다.")
async def list_vault_structure():
    """
    Vault 구조를 반환하는 API
    
    Returns:
        VaultResponse: Vault의 폴더 및 파일 구조
        - status: API 호출 상태 ("ok" 또는 "error")
        - vault: 폴더별 구조 정보
          - folders: 하위 폴더 목록
          - files: 파일 목록
    """
    try:
        if not BASE_VAULT_PATH.exists():
            raise HTTPException(
                status_code=500, 
                detail=f"Vault path not found: {BASE_VAULT_PATH}"
            )
            
        result = {}
        for root, dirs, files in os.walk(BASE_VAULT_PATH):
            rel_root = os.path.relpath(root, BASE_VAULT_PATH)
            result[rel_root] = {
                "folders": dirs,
                "files": [f for f in files if f.endswith('.md')]  # .md 파일만 포함
            }
        return {"status": "ok", "vault": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    """
    서버 상태 확인을 위한 기본 엔드포인트
    """
    return {
        "status": "active",
        "message": "Welcome to MCP Server",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """
    서버 헬스 체크 엔드포인트
    """
    return {
        "status": "healthy",
        "timestamp": datetime.datetime.now().isoformat()
    }

@app.post("/write")
async def write_to_obsidian(note: Note):
    """
    Obsidian 노트 작성 엔드포인트
    """
    try:
        handler = ObsidianHandler()
        result = handler.write_note(note.filename, note.content, note.append)
        if result.get("status") == "error":
            raise HTTPException(status_code=500, detail=result.get("error"))
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/read")
async def read_note_by_name(filename: str):
    """
    파일명으로 노트를 검색하고 읽는 API
    파일명이 정확히 일치하는 첫 번째 파일을 읽어옵니다.
    """
    try:
        # 파일 찾기
        found_file = None
        for root, _, files in os.walk(BASE_VAULT_PATH):
            for file in files:
                if file.lower() == f"{filename.lower()}.md" or file.lower() == filename.lower():
                    found_file = Path(root) / file
                    break
            if found_file:
                break
        
        if not found_file:
            raise HTTPException(
                status_code=404, 
                detail=f"File '{filename}' not found in vault"
            )
        
        # 파일 읽기
        with open(found_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 상대 경로 계산
        relative_path = found_file.relative_to(BASE_VAULT_PATH)
        
        return {
            "filename": found_file.name,
            "path": str(relative_path),
            "content": content
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/search")
async def search_notes(query: str):
    """
    파일명으로 노트를 검색하는 API
    부분 일치하는 모든 파일을 찾습니다.
    """
    try:
        found_files = []
        for root, _, files in os.walk(BASE_VAULT_PATH):
            for file in files:
                if file.endswith('.md') and query.lower() in file.lower():
                    rel_path = Path(root).relative_to(BASE_VAULT_PATH) / file
                    found_files.append(str(rel_path))
        
        return {
            "query": query,
            "matches": found_files,
            "count": len(found_files)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 서버 실행 코드
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)