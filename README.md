# 🛠️ 웹 도구 모음 (Web Tools Collection)

무료 온라인 웹 도구 모음입니다. 비밀번호 생성기, PDF 변환기, 이미지 변환기 등 다양한 도구를 브라우저에서 안전하게 이용할 수 있습니다.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seo-junghwa/web-tools-collection)

## 🚀 주요 기능

### 🔐 비밀번호 생성기
- **안전한 랜덤 비밀번호 생성**: 4-50자 길이 설정 가능
- **문자 유형 선택**: 소문자, 대문자, 숫자, 특수문자 조합
- **강도 표시**: 실시간 비밀번호 보안 강도 분석
- **3개 옵션 제공**: 한 번에 3가지 다른 비밀번호 생성
- **원클릭 복사**: 클립보드 복사 기능

### 📄 PDF 도구 모음
- **PDF to PNG 변환**: 고품질 이미지 변환 (1x, 2x, 3x 해상도)
- **HWP to PDF 변환**: 한글 문서 PDF 변환 가이드
- **ePub to PDF 변환**: 전자책을 PDF로 변환
- **PDF 워터마크**: 텍스트/이미지 워터마크 추가

### 🖼️ 이미지 변환기
- **WEBP to JPG**: WEBP 이미지를 JPG로 변환
- **품질 설정**: 높음(90%), 보통(80%), 낮음(70%)
- **일괄 처리**: 여러 파일 동시 변환
- **AI 변환기**: AI 기반 고품질 변환 (준비중)

### 📁 파일 변환 가이드
- **HWP ↔ Word 변환**: 한글 문서와 워드 간 변환 방법
- **Excel ↔ PDF**: 스프레드시트와 PDF 간 변환
- **보안 가이드**: 안전한 파일 변환을 위한 팁
- **추천 도구**: 신뢰할 수 있는 온라인 변환 사이트 목록

## 🔒 보안 및 개인정보 보호

모든 도구는 **클라이언트 사이드**에서 처리되어 개인정보가 서버로 전송되지 않습니다:

- ✅ **브라우저 내 처리**: 파일이 서버에 업로드되지 않음
- ✅ **실시간 변환**: 즉시 처리되어 임시 저장되지 않음
- ✅ **HTTPS 보안**: 모든 통신이 암호화됨
- ✅ **오픈소스**: 투명한 코드 공개

## 🌐 다국어 지원

- **한국어** (기본): 완전한 한국어 지원
- **English**: 전체 영어 번역 제공
- **동적 언어 전환**: 페이지 새로고침 없이 언어 변경

## 🛠️ 기술 스택

### Frontend
- **HTML5/CSS3/JavaScript**: 순수 웹 기술
- **CSS Grid/Flexbox**: 반응형 디자인
- **Web APIs**: 파일 처리, 클립보드 API

### PDF 처리
- **PDF.js**: Mozilla의 PDF 렌더링 라이브러리
- **Canvas API**: 고품질 이미지 변환
- **jsPDF**: PDF 생성 및 조작

### 이미지 처리
- **Canvas API**: 이미지 형식 변환
- **File API**: 드래그앤드롭 업로드
- **Blob API**: 파일 다운로드

### 국제화 (i18n)
- **커스텀 i18n 시스템**: 경량 다국어 지원
- **동적 로딩**: 필요한 언어만 로드
- **실시간 전환**: 페이지 새로고침 없이 언어 변경

## 📂 프로젝트 구조

```
web-tools-collection/
├── index.html                    # 메인 페이지
├── layout/                       # 공통 레이아웃
│   ├── nav.html                 # 네비게이션 컴포넌트
│   ├── nav.css                  # 네비게이션 스타일
│   └── layout.css               # 공통 레이아웃 스타일
├── tools/                       # 각종 도구들
│   ├── password-generator/      # 비밀번호 생성기
│   ├── pdf-tools/              # PDF 도구 모음
│   ├── image-tools/            # 이미지 변환기
│   └── file-conversion/        # 파일 변환 가이드
├── js/                         # JavaScript 파일
│   └── utils/                  # 유틸리티 함수들
│       ├── i18n.js            # 국제화 시스템
│       ├── nav-loader.js      # 네비게이션 로더
│       ├── cookie-consent.js  # 쿠키 동의
│       └── feedback.js        # 피드백 시스템
├── lang/                       # 언어 파일
│   ├── ko.json                # 한국어 번역
│   └── en.json                # 영어 번역
├── css/                        # 스타일시트
├── api/                        # Vercel 서버리스 함수
└── README.md                   # 프로젝트 문서
```

## 🚀 배포

### Vercel 자동 배포

이 프로젝트는 Vercel에서 자동 배포됩니다:

1. **GitHub 연동**: main 브랜치에 푸시 시 자동 배포
2. **환경 변수**: CLOUDCONVERT_API_KEY 설정 필요 (HWP 변환용)
3. **도메인**: https://web-tools-collection.vercel.app

### 수동 배포

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 프로젝트 루트에서 배포
vercel

# 3. 프로덕션 배포
vercel --prod
```

### 로컬 개발

```bash
# 1. 저장소 클론
git clone https://github.com/seo-junghwa/web-tools-collection.git
cd web-tools-collection

# 2. 로컬 서버 실행 (예: Live Server)
# 또는 Python 간단 서버
python -m http.server 8000

# 3. 브라우저에서 확인
# http://localhost:8000
```

## 📋 개발 가이드

### 새 도구 추가

1. **디렉토리 생성**: `tools/new-tool/` 생성
2. **HTML 파일**: 메인 도구 페이지 작성
3. **CSS 파일**: 도구별 스타일링
4. **JavaScript**: 도구 기능 구현
5. **번역 추가**: `lang/ko.json`, `lang/en.json`에 텍스트 추가
6. **네비게이션**: `layout/nav.html`에 링크 추가

### 번역 추가

```javascript
// lang/ko.json
{
  "newTool": {
    "title": "새 도구",
    "description": "도구 설명"
  }
}

// HTML에서 사용
<h1 data-i18n="newTool.title">새 도구</h1>
```

### 스타일 가이드

- **색상 팔레트**: CSS 커스텀 속성 사용
- **반응형**: 모바일 우선 디자인
- **접근성**: ARIA 라벨, 키보드 네비게이션
- **성능**: CSS/JS 최적화

## 🤝 기여 방법

1. **Fork**: 이 저장소를 포크
2. **브랜치**: 기능별 브랜치 생성 (`git checkout -b feature/new-tool`)
3. **개발**: 새 기능 개발 및 테스트
4. **커밋**: 의미있는 커밋 메시지 작성
5. **푸시**: 브랜치에 푸시 (`git push origin feature/new-tool`)
6. **PR**: Pull Request 생성

### 커밋 컨벤션

```bash
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 스타일 변경
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 기타 작업
```

## 📊 성능 최적화

### 이미지 최적화
- **WebP 사용**: 브라우저 지원시 WebP 형식
- **지연 로딩**: 스크롤 시 이미지 로드
- **압축**: 적절한 품질 설정

### JavaScript 최적화
- **모듈화**: 기능별 파일 분리
- **지연 로딩**: 필요한 시점에 스크립트 로드
- **최소화**: 프로덕션 빌드 시 압축

### CSS 최적화
- **CSS Grid/Flexbox**: 레이아웃 최적화
- **커스텀 속성**: 일관된 디자인 시스템
- **미디어 쿼리**: 반응형 최적화

## 🔧 API 및 확장

### CloudConvert API (선택사항)
HWP 변환을 위한 외부 API:

```javascript
// api/hwp-to-pdf.js
export default async function handler(req, res) {
  const cloudconvert = new CloudConvert(process.env.CLOUDCONVERT_API_KEY);
  // 변환 로직
}
```

### 확장 계획
- **AI 이미지 향상**: 머신러닝 기반 이미지 개선
- **OCR 기능**: 이미지에서 텍스트 추출
- **배치 처리**: 대량 파일 일괄 변환
- **API 제공**: 외부 서비스 연동

## 📈 SEO 및 마케팅

### 검색 엔진 최적화
- **메타 태그**: 각 페이지별 최적화된 메타 정보
- **구조화 데이터**: JSON-LD 스키마 마크업
- **사이트맵**: XML 사이트맵 자동 생성
- **언어 대체**: hreflang 태그 설정

### 소셜 미디어
- **Open Graph**: 페이스북, 링크드인 최적화
- **Twitter Cards**: 트위터 카드 지원
- **공유 버튼**: 주요 SNS 공유 기능

## 📱 PWA 기능 (계획중)

- **오프라인 지원**: 서비스 워커를 통한 캐싱
- **설치 가능**: 모바일/데스크톱 앱처럼 설치
- **푸시 알림**: 새 기능 알림
- **백그라운드 동기화**: 오프라인 작업 동기화

## 🎯 브라우저 지원

### 최소 지원 버전
- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+

### 핵심 기능 요구사항
- **File API**: 파일 업로드/다운로드
- **Canvas API**: 이미지 처리
- **Clipboard API**: 복사 기능
- **CSS Grid**: 레이아웃

## 📞 지원 및 문의

- **이슈 리포트**: [GitHub Issues](https://github.com/seo-junghwa/web-tools-collection/issues)
- **기능 요청**: [GitHub Discussions](https://github.com/seo-junghwa/web-tools-collection/discussions)
- **이메일**: gum798@gmail.com

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 크레딧

### 사용된 라이브러리
- **PDF.js**: Mozilla Foundation
- **Canvas API**: Web Standards
- **CSS Grid**: Web Standards

### 아이콘 및 디자인
- **Emoji Icons**: Unicode Consortium
- **Material Design**: Google
- **Responsive Design**: 모바일 퍼스트 접근법

---

**🌟 이 프로젝트가 유용하다면 Star를 눌러주세요!**

Made with ❤️ by [Seo Jung Hwa](https://github.com/seo-junghwa)