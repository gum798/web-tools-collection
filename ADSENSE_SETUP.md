# 구글 애드센스 설정 가이드

## 🎯 준비 완료된 것들
✅ 모든 페이지에 AdSense 코드 추가됨  
✅ ads.txt 파일 생성됨  
✅ Auto ads 설정 완료됨  

## 📋 당신이 해야 할 단계들

### 1. 구글 애드센스 계정 생성
1. https://www.google.com/adsense/ 방문
2. '시작하기' 클릭
3. 구글 계정으로 로그인
4. 웹사이트 URL 입력: https://web-tools-collection-git-main-seo-junghwas-projects.vercel.app
5. 국가/지역 선택
6. 결제 정보 입력

### 2. 웹사이트 추가 및 승인 신청
1. AdSense 대시보드에서 '사이트' 메뉴 클릭
2. '사이트 추가' 버튼 클릭
3. 웹사이트 URL 입력
4. 사이트 검토 및 승인 대기 (보통 1-14일 소요)

### 3. 퍼블리셔 ID 교체
**현재 코드에서 `ca-pub-XXXXXXXXXXXXXXXX`를 실제 퍼블리셔 ID로 교체해야 합니다.**

1. AdSense 대시보드에서 '계정' > '계정 정보' 클릭
2. '퍼블리셔 ID' 복사 (ca-pub-로 시작하는 16자리 숫자)
3. 아래 파일들에서 `ca-pub-XXXXXXXXXXXXXXXX`를 실제 ID로 교체:
   - `index.html`
   - `password.html`
   - `pdf-converter.html`
   - `ads.txt`

### 4. 웹사이트 업로드
1. 웹 호스팅 서비스에 모든 파일 업로드
2. 도메인 연결 확인
3. HTTPS 설정 (필수)

### 5. 승인 기다리기
- 승인까지 보통 1-14일 소요
- 승인 후 24-48시간 후 광고 표시 시작
- 승인 거절 시 이유 확인 후 재신청

## 🔧 추가 최적화 (선택사항)

### 수동 광고 단위 추가
Auto ads 외에 수동으로 광고 위치를 지정하려면:

```html
<!-- 배너 광고 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="1234567890"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

### 광고 배치 최적화
1. 헤더 배너 (상단)
2. 사이드바 (좌우)
3. 콘텐츠 중간
4. 푸터 위

## ⚠️ 주의사항
- 자신의 광고를 클릭하지 마세요 (계정 정지 위험)
- 트래픽이 적을 경우 수익이 매우 적을 수 있습니다
- 승인 후에도 지속적으로 품질 유지 필요
- 성인 콘텐츠, 폭력적 콘텐츠 등은 승인 거절 사유

## 💰 수익 확인
- AdSense 대시보드에서 실시간 수익 확인 가능
- 월 $100 이상부터 지급 (한국 기준)
- 매월 21일경 이전 달 수익 지급

## 📞 문제 해결
- 승인 거절: 콘텐츠 품질 향상, 트래픽 증가 후 재신청
- 광고 미표시: 퍼블리셔 ID 확인, 24-48시간 대기
- 수익 없음: 트래픽 부족, 광고 차단기 사용자 많음

## 📈 트래픽 증가 팁
1. SEO 최적화
2. 소셜미디어 공유
3. 유용한 콘텐츠 지속 업데이트
4. 검색엔진 등록 (구글 서치 콘솔)