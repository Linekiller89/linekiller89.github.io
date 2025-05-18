# Moon Blog

개인 블로그 프로젝트입니다. React와 TypeScript를 사용하여 개발되었습니다.

## 배포 URL

https://linekiller89.github.io

## 주요 기능

- 다크 모드 지원
- 마크다운 기반 블로그 포스트
- 코드 하이라이팅
- 반응형 디자인
- GitHub API 연동
- 테마 관리 시스템

## 기술 스택

### Frontend

- React 19
- TypeScript
- Styled Components
- Vite 6.3.4
- React Router 7
- React Markdown 10

### 개발 도구

- ESLint 9
- TypeScript ESLint
- Vite Plugin React

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 린트 실행
npm run lint
```

## 프로젝트 구조

```
src/
  ├── components/     # 재사용 가능한 컴포넌트
  ├── pages/         # 페이지 컴포넌트
  ├── styles/        # 전역 스타일
  ├── utils/         # 유틸리티 함수
  ├── hooks/         # 커스텀 훅
  └── contexts/      # React Context
```

## 버전 정보

### v0.2.0

- 보안 업데이트
  - Vite 보안 취약점 패치 (6.3.4로 업그레이드)
  - 프로젝트 루트 파일 접근 제한 강화
- 기능 개선
  - GitHub API 연동 준비
  - 테마 관리 시스템 구현 시작
  - 성능 최적화 및 UX 개선
- 개발 환경
  - MacOS 개발 환경으로 전환
  - 의존성 패키지 버전 업데이트

### v0.1.0

- 초기 릴리즈
  - 기본 블로그 기능 구현
  - 다크 모드 지원
  - 마크다운 렌더링
  - 코드 하이라이팅

## 보안

이 프로젝트는 정기적인 보안 업데이트를 진행하고 있습니다. 발견된 취약점은 즉시 패치됩니다.

## 라이선스

MIT License
