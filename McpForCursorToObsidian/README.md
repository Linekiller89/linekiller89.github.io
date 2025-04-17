# McpForCursorToObsidian

Cursor IDE와 Obsidian을 연동하기 위한 프로젝트입니다.

## 프로젝트 구조

```
McpForCursorToObsidian/
├── src/
│   ├── config/
│   └── tools/
└── package.json
```

## 설치 방법

1. 프로젝트를 클론합니다.
2. 필요한 의존성을 설치합니다:
   ```bash
   npm install
   ```

## 사용 방법

프로젝트를 시작하려면 다음 명령어를 실행하세요:

```bash
npm start
```

## 구성 요소

- MCP 서버 설정
- Obsidian 볼트 연동
- 도구 통합

## 설정 방법

1. MCP 서버 설정

```json
{
  "mcpServers": {
    "obsidian-mcp": {
      "transport": {
        "type": "stdio"
      },
      "config": {
        "vaultPath": "/Users/lineson/Desktop/Obsidian/Local-Pra"
      }
    }
  }
}
```

2. 서버 실행

```bash
npx -y @smithery/cli@latest run obsidian-mcp --key YOUR_API_KEY --vault "/path/to/vault"
```

## 사용 가능한 도구

- create-note: 새로운 노트 생성
- list-available-vaults: 사용 가능한 볼트 목록 조회
- edit-note: 노트 편집
- search-vault: 볼트 내 검색
- move-note: 노트 이동
- create-directory: 디렉토리 생성
- delete-note: 노트 삭제
- add-tags: 태그 추가
- remove-tags: 태그 제거
- rename-tag: 태그 이름 변경
- read-note: 노트 읽기

## 문제 해결

현재 알려진 문제:

1. Cursor 도구와 MCP 도구 간의 통합 이슈
2. WebSocket vs stdio 연결 방식 선택
3. 도구 등록 및 사용 권한 문제
