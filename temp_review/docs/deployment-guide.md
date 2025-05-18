# GitHub Pages 배포 가이드

## 1. 기본 설정

### Vite 설정

사용자 페이지(`username.github.io`)를 위한 base URL 설정:

```ts
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: "/", // GitHub 사용자 페이지를 위한 base URL
});
```

### GitHub Actions 워크플로우

`.github/workflows/deploy.yml` 파일 설정:

```yaml
name: Deploy to GitHub Pages

on:
  # 수동 실행을 위한 워크플로우 디스패치 설정
  workflow_dispatch:
    inputs:
      deploy_type:
        description: "Deploy Type"
        required: true
        default: "publish"
        type: choice
        options:
          - publish
          - unpublish
  # 자동 배포 (main 브랜치에 push 될 때)
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    if: github.event.inputs.deploy_type != 'unpublish'
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    if: github.event.inputs.deploy_type != 'unpublish'
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 2. 배포 관리

### 자동 배포

- `main` 브랜치에 push할 때마다 자동으로 배포됩니다.
- 빌드된 파일은 `dist` 디렉토리의 내용이 배포됩니다.

### 수동 배포 제어

1. GitHub 저장소의 "Actions" 탭으로 이동
2. 왼쪽 사이드바에서 "Deploy to GitHub Pages" 워크플로우 선택
3. "Run workflow" 버튼 클릭
4. Deploy Type 선택:
   - `publish`: 사이트 배포 (기본값)
   - `unpublish`: 사이트 비활성화

## 3. 주요 기능

- **자동 배포**: main 브랜치 push 시 자동 배포
- **수동 제어**: publish/unpublish 상태 수동 제어 가능
- **빌드 최적화**: npm 캐시 활성화로 빌드 속도 개선
- **동시성 제어**: 동시 배포 방지를 위한 concurrency 설정

## 4. 문제 해결

배포 실패 시 확인사항:

1. GitHub 저장소의 Settings > Pages에서 "Source"가 "GitHub Actions"로 설정되어 있는지 확인
2. Settings > Actions > General에서 "Workflow permissions"가 적절히 설정되어 있는지 확인
3. Actions 탭에서 워크플로우 실행 로그 확인
