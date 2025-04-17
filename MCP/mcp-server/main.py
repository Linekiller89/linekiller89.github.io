"""
MCP(Memory Control Program) 서버의 메인 진입점
FastAPI를 사용하여 RESTful API 서버를 구현합니다.
"""

import datetime
import os
from pathlib import Path
from fastapi import FastAPI, HTTPException, Request, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from pydantic import BaseModel
from typing import Dict, List, Optional
import uvicorn
from obsidian_handler import ObsidianHandler
import urllib.parse

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
class FileInfo(BaseModel):
    """파일 정보를 담는 모델"""
    name: str
    path: str  # 상대 경로
    full_path: str  # 전체 경로
    size: int
    last_modified: str
    type: str = "file"

class FolderInfo(BaseModel):
    """폴더 정보를 담는 모델"""
    name: str
    path: str  # 상대 경로
    full_path: str  # 전체 경로
    type: str = "folder"
    files: List[FileInfo]
    subfolders: List[str]

class VaultResponse(BaseModel):
    """Vault 구조 응답 모델"""
    status: str
    vault: Dict[str, FolderInfo]
    total_files: int
    total_folders: int

# 추가 요청 모델 정의
class MoveNoteRequest(BaseModel):
    source_path: str
    target_path: str

class CreateFolderRequest(BaseModel):
    folder_path: str

# 기존 Note 모델에 folder_path 추가
class Note(BaseModel):
    filename: str
    content: str
    folder_path: str = ""
    append: bool = False

    class Config:
        json_schema_extra = {
            "example": {
                "filename": "example_note",
                "content": "# Example Note\nThis is a test note.",
                "folder_path": "테스트/예제",
                "append": False
            }
        }

class NoteResponse(BaseModel):
    filename: str
    path: str
    content: str

class SearchResponse(BaseModel):
    filename: str
    matches: List[str]
    count: int

def normalize_filename(filename: str) -> str:
    """파일명 정규화 함수"""
    # URL 디코딩
    decoded_filename = urllib.parse.unquote(filename)
    # .md 확장자 처리
    if not decoded_filename.lower().endswith('.md'):
        decoded_filename = f"{decoded_filename}.md"
    return decoded_filename

def find_file_in_vault(filename: str) -> Path:
    """Vault에서 파일 찾기"""
    normalized_filename = normalize_filename(filename)
    filename_lower = normalized_filename.lower()
    
    for root, _, files in os.walk(BASE_VAULT_PATH):
        for file in files:
            if file.lower() == filename_lower:
                return Path(root) / file
    return None

@app.get("/vault/list")
async def list_vault_structure():
    """
    Vault 구조를 반환하는 API
    """
    try:
        if not BASE_VAULT_PATH.exists():
            raise HTTPException(
                status_code=500,
                detail=f"Vault path not found: {BASE_VAULT_PATH}"
            )

        vault_structure = {}
        
        for root, dirs, files in os.walk(BASE_VAULT_PATH):
            current_path = Path(root)
            try:
                rel_path = str(current_path.relative_to(BASE_VAULT_PATH))
            except ValueError:
                rel_path = "."

            # 마크다운 파일만 필터링
            md_files = []
            for file in files:
                if file.endswith('.md'):
                    file_path = current_path / file
                    md_files.append({
                        "name": file,
                        "path": str(file_path.relative_to(BASE_VAULT_PATH)),
                        "size": os.path.getsize(file_path),
                        "modified": os.path.getmtime(file_path)
                    })

            vault_structure[rel_path] = {
                "files": md_files,
                "folders": dirs
            }

        return {
            "status": "ok",
            "vault": vault_structure
        }

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

@app.post("/write_to_obsidian")
async def write_to_obsidian_alt(note: Note):
    """
    Obsidian 노트 작성 엔드포인트 (GPT 통합용 별칭)
    """
    return await write_to_obsidian(note)

@app.post("/notes", summary="노트 생성")
async def create_note(note: Note):
    """
    새로운 노트를 생성합니다.
    """
    try:
        handler = ObsidianHandler()
        result = handler.write_note(
            note.filename,
            note.content,
            note.folder_path,
            note.append
        )
        if result.get("status") == "error":
            raise HTTPException(status_code=500, detail=result.get("error"))
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get(
    "/read",
    response_model=NoteResponse,
    summary="노트 읽기",
    description="파일명으로 노트를 검색하여 내용을 읽어옵니다."
)
async def read_note(
    filename: str = Query(
        ...,
        description="읽을 파일의 이름 (예: '테스트파일' 또는 '테스트파일.md')",
        title="파일명"
    )
):
    try:
        found_file = find_file_in_vault(filename)
        
        if not found_file:
            raise HTTPException(
                status_code=404,
                detail=f"파일을 찾을 수 없습니다. (파일명: '{filename}')"
            )

        # 파일 읽기
        with open(found_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # 상대 경로 계산
        relative_path = found_file.relative_to(BASE_VAULT_PATH)

        return NoteResponse(
            filename=found_file.name,
            path=str(relative_path),
            content=content
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/notes/{filepath:path}", summary="노트 삭제")
async def delete_note(filepath: str):
    """
    지정된 경로의 노트를 삭제합니다.
    """
    try:
        handler = ObsidianHandler()
        result = handler.delete_note(filepath)
        if result.get("status") == "error":
            if "not found" in result.get("error", ""):
                raise HTTPException(status_code=404, detail=result.get("error"))
            raise HTTPException(status_code=500, detail=result.get("error"))
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/folders", summary="폴더 생성")
async def create_folder(request: CreateFolderRequest):
    """
    새로운 폴더를 생성합니다.
    """
    try:
        handler = ObsidianHandler()
        result = handler.create_folder(request.folder_path)
        if result.get("status") == "error":
            raise HTTPException(status_code=500, detail=result.get("error"))
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/folders/{folder_path:path}", summary="폴더 삭제")
async def delete_folder(folder_path: str):
    """
    지정된 경로의 폴더를 삭제합니다.
    """
    try:
        handler = ObsidianHandler()
        result = handler.delete_folder(folder_path)
        if result.get("status") == "error":
            if "not found" in result.get("error", ""):
                raise HTTPException(status_code=404, detail=result.get("error"))
            raise HTTPException(status_code=500, detail=result.get("error"))
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/notes/move", summary="노트 이동")
async def move_note(request: MoveNoteRequest):
    """
    노트를 다른 위치로 이동합니다.
    """
    try:
        handler = ObsidianHandler()
        result = handler.move_note(request.source_path, request.target_path)
        if result.get("status") == "error":
            if "not found" in result.get("error", ""):
                raise HTTPException(status_code=404, detail=result.get("error"))
            raise HTTPException(status_code=500, detail=result.get("error"))
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get(
    "/search",
    response_model=SearchResponse,
    summary="노트 검색",
    description="입력한 파일명과 일치하는 모든 노트를 찾습니다."
)
async def search_notes(
    filename: str = Query(
        ...,
        description="검색할 파일명",
        example="테스트파일",
        title="파일명"
    )
):
    try:
        decoded_filename = urllib.parse.unquote(filename).lower()
        found_files = []
        
        for root, _, files in os.walk(BASE_VAULT_PATH):
            for file in files:
                if file.endswith('.md') and decoded_filename in file.lower():
                    rel_path = Path(root).relative_to(BASE_VAULT_PATH) / file
                    found_files.append(str(rel_path))

        return SearchResponse(
            filename=filename,
            matches=found_files,
            count=len(found_files)
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 서버 실행 코드
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)