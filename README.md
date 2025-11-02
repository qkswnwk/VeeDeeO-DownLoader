# VeeDeeO DownLoader — 웹 사이트 스타터

정적(HTML) 사이트로 아주 가볍게 시작합니다. Netlify 또는 GitHub Pages에 바로 올릴 수 있습니다.

# VeeDeeO DownLoader
A free Windows YouTube downloader that saves videos up to 4K and extracts MP3 audio.  
**Download:** https://biblesoftlab.org/veedeeo/download.php  
**Website:** https://veedeeo.net

## 1) 폴더 구성
```
veedeeo-starter/
├── css/styles.css
├── img/
├── js/main.js
├── index.html
├── privacy.html
├── terms.html
├── robots.txt
├── sitemap.xml
└── netlify.toml
```

## 2) GitHub 저장소 만들기
1. GitHub에 로그인 → **New repository**
2. 이름: `veedeeo-site` (원하는 이름)
3. Public 선택 → Create repository

## 3) 로컬에서 초기 커밋
Windows PowerShell 기준:
```powershell
cd <다운로드한_폴더>/veedeeo-starter
git init
git branch -M main
git add .
git commit -m "Initialize VeeDeeO site"
git remote add origin https://github.com/<YOUR_ID>/veedeeo-site.git
git push -u origin main
```

## 4) Netlify에 배포
1. https://app.netlify.com → **Add new site** → **Import an existing project**
2. Git provider로 **GitHub** 선택 → 방금 만든 저장소를 선택
3. Build command: (비움) · Publish directory: `.`
4. Deploy 클릭 → 배포 완료 후 **Site settings → Domain management**에서 `veedeeo.net` 연결

> DNS는 도메인 공급자에서 CNAME 또는 A 레코드 설정이 필요합니다.

## 5) 검색엔진 준비
- `index.html` 상단의 Google/Naver 인증 메타 태그에 실제 발급값을 넣고 재배포
- `robots.txt`, `sitemap.xml`은 URL만 바꿔도 됩니다 (`https://veedeeo.net/…`)

## 6) 커스텀
- 이미지 교체: `img/hero-ui.png`, `img/og-hero.png`, `img/favicon.svg`를 실제 자산으로 바꾸세요.
- 다운로드 버튼 링크는 실제 게시글/릴리스 페이지 URL로 교체하세요.
- TailwindCDN은 추후 빌드 세팅으로 교체 가능(Vite/Next 등).
```

