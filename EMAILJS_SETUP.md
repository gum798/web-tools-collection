# EmailJS 설정 가이드 📧

피드백을 이메일로 자동 전송받기 위한 EmailJS 설정 방법입니다.

## 🔧 1단계: EmailJS 계정 생성

1. **https://www.emailjs.com** 접속
2. **"Sign Up"** 클릭하여 무료 계정 생성
3. Gmail 또는 이메일로 가입

## ⚙️ 2단계: 이메일 서비스 연결

1. **EmailJS 대시보드** 로그인
2. **"Email Services"** 탭 클릭
3. **"Add New Service"** 클릭
4. **Gmail** 선택 (추천)
5. **Service ID** 복사해두기 (예: `service_abc123`)

## 📝 3단계: 이메일 템플릿 생성

1. **"Email Templates"** 탭 클릭
2. **"Create New Template"** 클릭
3. **Template ID** 입력 (예: `feedback_template`)
4. 아래 템플릿 사용:

```
제목: [웹 도구 모음] 새로운 피드백: {{feedback_type}}

안녕하세요!

웹 도구 모음에 새로운 피드백이 도착했습니다.

📋 피드백 정보:
- 유형: {{feedback_type}}
- 보낸 사람: {{from_name}}
- 이메일: {{from_email}}
- 언어: {{language}}
- 시간: {{timestamp}}

💬 메시지:
{{message}}

🔗 페이지 URL: {{page_url}}

🖥️ 사용자 환경: {{user_agent}}

---
웹 도구 모음 피드백 시스템
```

5. **Template ID** 복사해두기

## 🔑 4단계: Public Key 확인

1. **"Account"** 탭 클릭
2. **"API Keys"** 섹션에서 **Public Key** 복사

## 💻 5단계: 코드에 설정값 입력

`feedback.js` 파일에서 다음 부분을 수정:

```javascript
// 라인 96: Public Key 교체
emailjs.init('YOUR_PUBLIC_KEY'); // ← 실제 Public Key 입력

// 라인 557: 수신 이메일 교체  
to_email: 'YOUR_EMAIL@example.com', // ← 실제 이메일 주소 입력

// 라인 570-571: Service ID, Template ID 교체
'YOUR_SERVICE_ID',  // ← 실제 Service ID 입력
'YOUR_TEMPLATE_ID', // ← 실제 Template ID 입력
```

## 📤 6단계: 테스트

1. 웹사이트에서 피드백 버튼 클릭
2. 테스트 메시지 작성 후 전송
3. 이메일 수신 확인

## 🎯 완료된 기능들

✅ **자동 이메일 알림**: 피드백 즉시 이메일로 수신  
✅ **상세 정보**: 피드백 유형, 페이지, 시간 등 포함  
✅ **백업 저장**: localStorage에도 저장 (이중 안전장치)  
✅ **로딩 상태**: 전송 중 버튼 상태 변경  
✅ **에러 처리**: 이메일 전송 실패 시에도 사용자 경험 유지  

## 💰 EmailJS 무료 한도

- **월 200건** 무료 전송
- 추가 필요시 유료 플랜 이용

## 🔧 문제 해결

### 이메일이 안 와요
1. **스팸 폴더** 확인
2. **Service ID, Template ID** 재확인
3. **Public Key** 재확인
4. Gmail 연결 상태 확인

### 에러 메시지가 나와요
1. **콘솔 로그** 확인 (F12)
2. **네트워크 연결** 확인
3. **EmailJS 대시보드**에서 전송 로그 확인

## 📞 지원

문제가 계속되면 EmailJS 문서를 참고하세요:
https://www.emailjs.com/docs/

---

설정 완료 후 실제 키 값들로 교체하고 푸시하면 피드백 이메일 자동 전송이 시작됩니다! 🚀