# 배포 가이드 (Deployment Guide)

이 프로젝트는 **Next.js**로 제작되었으며, **Vercel** 또는 **Render**에 쉽게 배포할 수 있습니다.
가장 추천하는 방법은 Next.js를 만든 Vercel을 사용하는 것입니다.

## 1. Vercel 배포 (추천)

Vercel은 Next.js에 최적화되어 있어 설정이 거의 필요 없습니다.

### 절차
1. [Vercel](https://vercel.com)에 회원가입 또는 로그인합니다.
2. **"Add New..."** 버튼을 누르고 **"Project"**를 선택합니다.
3. **"Continue with GitHub"**를 선택하고, 이 프로젝트가 있는 저장소(`portfolio`)를 Import 합니다.
4. **Configure Project** 화면에서:
   - **Framework Preset**: `Next.js` (자동 선택됨)
   - **Root Directory**: `./` (변경 없음)
   - **Environment Variables** (중요!):
     아래 두 가지 변수를 반드시 추가해야 합니다. (Supabase 설정값)
     - `NEXT_PUBLIC_SUPABASE_URL`: (Supabase 대시보드에서 복사한 값)
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Supabase 대시보드에서 복사한 값)
5. **"Deploy"** 버튼을 클릭합니다.
6. 배포가 완료되면 제공된 URL로 접속하여 확인합니다.

---

## 2. Render 배포

Render도 좋은 대안입니다. 정적 사이트 또는 웹 서비스로 배포할 수 있습니다.

### 절차
1. [Render](https://render.com)에 로그인합니다.
2. **"New +"** 버튼을 누르고 **"Web Service"**를 선택합니다.
3. GitHub 계정을 연결하고 `portfolio` 저장소를 선택합니다.
4. 설정 화면에서:
   - **Name**: 원하는 이름 (예: `social-worker-portfolio`)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. **Environment Variables** 섹션으로 이동하여 변수 추가:
   - Key: `NEXT_PUBLIC_SUPABASE_URL`, Value: (값)
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`, Value: (값)
6. **"Create Web Service"**를 클릭합니다.

## 주의사항
- 배포 후 데이터베이스 연결이 잘 안 된다면 환경 변수(Environment Variables)가 정확히 입력되었는지 확인하세요.
- Supabase의 Row Level Security (RLS) 정책이 올바르게 설정되어 있어야 외부에서 데이터를 읽고 쓸 수 있습니다. (현재 설정은 공개 허용 상태입니다)
