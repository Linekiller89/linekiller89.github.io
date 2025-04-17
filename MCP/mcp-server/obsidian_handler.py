"""
Obsidian 노트 파일 처리를 위한 핸들러 모듈
"""

import os
from datetime import datetime
from pathlib import Path
from typing import Dict, Optional

class ObsidianHandler:
    def __init__(self, vault_path: Optional[str] = None):
        """
        ObsidianHandler 초기화
        """
        self.vault_path = vault_path or "/Users/lineson/Library/Mobile Documents/iCloud~md~obsidian/Documents/Blog/Portfolio/MCP 활용/Cursor to Obsidian/자동생성노트"
        # 디렉토리가 없으면 생성
        Path(self.vault_path).mkdir(parents=True, exist_ok=True)
    
    def write_note(self, filename: str, content: str, append: bool = False) -> Dict:
        """
        노트 파일 작성
        """
        try:
            if not filename.endswith('.md'):
                filename = f"{filename}.md"
                
            filepath = Path(self.vault_path) / filename
            
            # 디렉토리가 없으면 생성
            filepath.parent.mkdir(parents=True, exist_ok=True)
            
            mode = 'a' if append else 'w'
            with open(filepath, mode, encoding='utf-8') as f:
                f.write(content)
            
            return {
                "status": "success",
                "filepath": str(filepath),
                "timestamp": datetime.now().isoformat()
            }
        except Exception as e:
            return {
                "status": "error",
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }