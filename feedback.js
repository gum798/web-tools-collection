// Universal Feedback System
// 모든 페이지에서 사용 가능한 피드백 시스템

const translations = {
    ko: {
        feedbackButton: "💡 의견 제안",
        feedbackTitle: "기능 제안 및 피드백",
        feedbackSubtitle: "더 나은 서비스를 위해 여러분의 의견을 들려주세요!",
        nameLabel: "이름 (선택사항)",
        emailLabel: "이메일 (답변받고 싶으시면)",
        typeLabel: "유형",
        messageLabel: "의견 내용",
        optionalFieldsButton: "📝 선택 입력 항목",
        namePlaceholder: "이름을 입력해주세요",
        emailPlaceholder: "이메일을 입력해주세요",
        messagePlaceholder: "어떤 기능이 필요하신가요? 또는 개선 사항이 있으신가요?",
        submitButton: "📨 의견 보내기",
        cancelButton: "취소",
        successMessage: "의견이 성공적으로 전송되었습니다! 감사합니다 🎉",
        errorMessage: "전송 중 오류가 발생했습니다. 다시 시도해주세요.",
        requiredMessage: "의견 내용을 입력해주세요.",
        sendingMessage: "전송 중입니다...",
        types: {
            feature: "새로운 기능 제안",
            improvement: "기존 기능 개선",
            bug: "버그 신고",
            other: "기타 의견"
        }
    },
    en: {
        feedbackButton: "💡 Suggest Feature",
        feedbackTitle: "Feature Suggestion & Feedback",
        feedbackSubtitle: "Help us improve by sharing your ideas!",
        nameLabel: "Name (Optional)",
        emailLabel: "Email (If you want a reply)",
        typeLabel: "Type",
        messageLabel: "Your Message",
        optionalFieldsButton: "📝 Optional Fields",
        namePlaceholder: "Enter your name",
        emailPlaceholder: "Enter your email",
        messagePlaceholder: "What features do you need? Any suggestions for improvement?",
        submitButton: "📨 Send Feedback",
        cancelButton: "Cancel",
        successMessage: "Feedback sent successfully! Thank you 🎉",
        errorMessage: "Error occurred while sending. Please try again.",
        requiredMessage: "Please enter your feedback.",
        sendingMessage: "Sending...",
        types: {
            feature: "New Feature Request",
            improvement: "Existing Feature Improvement",
            bug: "Bug Report",
            other: "Other Feedback"
        }
    }
};

class FeedbackSystem {
    constructor() {
        this.language = this.detectLanguage();
        this.isOpen = false;
        this.emailjsInitialized = false;
        this.init();
    }
    
    detectLanguage() {
        // Check current page URL or language setting
        if (window.location.pathname.includes('/en/')) {
            return 'en';
        }
        const userLang = navigator.language || navigator.userLanguage;
        return userLang.startsWith('ko') ? 'ko' : 'en';
    }
    
    getText(key) {
        const keys = key.split('.');
        let result = translations[this.language];
        for (const k of keys) {
            result = result[k];
        }
        return result;
    }
    
    init() {
        this.loadEmailJS();
        this.createFloatingButton();
        this.createModal();
        this.addStyles();
    }
    
    loadEmailJS() {
        // Load EmailJS SDK
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
        script.onload = () => {
            // Initialize EmailJS with your public key
            emailjs.init('mzxEHp0PGd3uxFKLv'); // 나중에 실제 키로 교체
            this.emailjsInitialized = true;
        };
        document.head.appendChild(script);
    }
    
    createFloatingButton() {
        const button = document.createElement('button');
        button.id = 'feedback-btn';
        button.className = 'feedback-floating-btn';
        button.innerHTML = this.getText('feedbackButton');
        button.onclick = () => this.openModal();
        
        document.body.appendChild(button);
    }
    
    createModal() {
        const modal = document.createElement('div');
        modal.id = 'feedback-modal';
        modal.className = 'feedback-modal';
        modal.innerHTML = `
            <div class="feedback-modal-overlay" onclick="feedbackSystem.closeModal()"></div>
            <div class="feedback-modal-content">
                <div class="feedback-header">
                    <h2>${this.getText('feedbackTitle')}</h2>
                    <p>${this.getText('feedbackSubtitle')}</p>
                    <button class="feedback-close" onclick="feedbackSystem.closeModal()">✕</button>
                </div>
                <form id="feedback-form" onsubmit="feedbackSystem.submitFeedback(event)">
                    <div class="feedback-optional-toggle">
                        <button type="button" id="optional-fields-btn" onclick="feedbackSystem.toggleOptionalFields()">
                            ${this.getText('optionalFieldsButton')}
                        </button>
                    </div>
                    <div id="optional-fields" class="feedback-optional-fields" style="display: none;">
                        <div class="feedback-form-group">
                            <label>${this.getText('nameLabel')}</label>
                            <input type="text" id="feedback-name" placeholder="${this.getText('namePlaceholder')}">
                        </div>
                        <div class="feedback-form-group">
                            <label>${this.getText('emailLabel')}</label>
                            <input type="email" id="feedback-email" placeholder="${this.getText('emailPlaceholder')}">
                        </div>
                    </div>
                    <div class="feedback-form-group">
                        <label>${this.getText('typeLabel')}</label>
                        <select id="feedback-type">
                            <option value="feature">${this.getText('types.feature')}</option>
                            <option value="improvement">${this.getText('types.improvement')}</option>
                            <option value="bug">${this.getText('types.bug')}</option>
                            <option value="other">${this.getText('types.other')}</option>
                        </select>
                    </div>
                    <div class="feedback-form-group">
                        <label>${this.getText('messageLabel')} *</label>
                        <textarea id="feedback-message" placeholder="${this.getText('messagePlaceholder')}" required></textarea>
                    </div>
                    <div class="feedback-form-actions">
                        <button type="button" class="feedback-btn-cancel" onclick="feedbackSystem.closeModal()">
                            ${this.getText('cancelButton')}
                        </button>
                        <button type="submit" class="feedback-btn-submit">
                            ${this.getText('submitButton')}
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .feedback-floating-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 50px;
                padding: 15px 25px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                z-index: 1000;
                transition: all 0.3s ease;
                animation: pulse 2s infinite;
            }
            
            .feedback-floating-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 25px rgba(0,0,0,0.3);
            }
            
            @keyframes pulse {
                0% { box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3); }
                50% { box-shadow: 0 4px 20px rgba(102, 126, 234, 0.6); }
                100% { box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3); }
            }
            
            .feedback-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: none;
            }
            
            .feedback-modal.show {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .feedback-modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
            }
            
            .feedback-modal-content {
                position: relative;
                background: white;
                border-radius: 15px;
                padding: 0;
                width: 90%;
                max-width: 500px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }
            
            .feedback-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 25px;
                border-radius: 15px 15px 0 0;
                position: relative;
            }
            
            .feedback-header h2 {
                margin: 0 0 10px 0;
                font-size: 1.5em;
            }
            
            .feedback-header p {
                margin: 0;
                opacity: 0.9;
            }
            
            .feedback-close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                width: 35px;
                height: 35px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.3s ease;
            }
            
            .feedback-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .feedback-form-group {
                margin-bottom: 20px;
            }
            
            .feedback-form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: bold;
                color: #333;
            }
            
            .feedback-form-group input,
            .feedback-form-group select,
            .feedback-form-group textarea {
                width: 100%;
                padding: 12px;
                border: 2px solid #e1e5e9;
                border-radius: 8px;
                font-size: 14px;
                transition: border-color 0.3s ease;
                box-sizing: border-box;
            }
            
            .feedback-form-group input:focus,
            .feedback-form-group select:focus,
            .feedback-form-group textarea:focus {
                outline: none;
                border-color: #667eea;
            }
            
            .feedback-form-group textarea {
                min-height: 100px;
                resize: vertical;
                font-family: inherit;
            }
            
            #feedback-form {
                padding: 25px;
            }
            
            .feedback-optional-toggle {
                margin-bottom: 20px;
                text-align: center;
            }
            
            #optional-fields-btn {
                background: #f8f9fa;
                border: 2px dashed #dee2e6;
                color: #6c757d;
                padding: 10px 20px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.3s ease;
            }
            
            #optional-fields-btn:hover {
                background: #e9ecef;
                border-color: #6c757d;
                color: #495057;
            }
            
            #optional-fields-btn.active {
                background: #667eea;
                border-color: #667eea;
                color: white;
            }
            
            .feedback-optional-fields {
                transition: all 0.3s ease;
                overflow: hidden;
            }
            
            .feedback-optional-fields.show {
                display: block !important;
                animation: slideDown 0.3s ease;
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    max-height: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    max-height: 200px;
                    transform: translateY(0);
                }
            }
            
            .feedback-form-actions {
                display: flex;
                gap: 15px;
                margin-top: 25px;
            }
            
            .feedback-btn-cancel,
            .feedback-btn-submit {
                flex: 1;
                padding: 12px 20px;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .feedback-btn-cancel {
                background: #f8f9fa;
                color: #6c757d;
                border: 2px solid #e1e5e9;
            }
            
            .feedback-btn-cancel:hover {
                background: #e9ecef;
            }
            
            .feedback-btn-submit {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }
            
            .feedback-btn-submit:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            }
            
            @media (max-width: 600px) {
                .feedback-floating-btn {
                    bottom: 20px;
                    right: 20px;
                    padding: 12px 20px;
                    font-size: 14px;
                }
                
                .feedback-modal-content {
                    width: 95%;
                    margin: 20px;
                }
                
                .feedback-header {
                    padding: 20px;
                }
                
                #feedback-form {
                    padding: 20px;
                }
                
                .feedback-form-actions {
                    flex-direction: column;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    openModal() {
        const modal = document.getElementById('feedback-modal');
        modal.classList.add('show');
        this.isOpen = true;
        
        // Focus on textarea
        setTimeout(() => {
            document.getElementById('feedback-message').focus();
        }, 100);
    }
    
    closeModal() {
        const modal = document.getElementById('feedback-modal');
        modal.classList.remove('show');
        this.isOpen = false;
        
        // Reset form and optional fields
        document.getElementById('feedback-form').reset();
        this.hideOptionalFields();
    }
    
    toggleOptionalFields() {
        const optionalFields = document.getElementById('optional-fields');
        const toggleBtn = document.getElementById('optional-fields-btn');
        
        if (optionalFields.style.display === 'none') {
            this.showOptionalFields();
        } else {
            this.hideOptionalFields();
        }
    }
    
    showOptionalFields() {
        const optionalFields = document.getElementById('optional-fields');
        const toggleBtn = document.getElementById('optional-fields-btn');
        
        optionalFields.style.display = 'block';
        optionalFields.classList.add('show');
        toggleBtn.classList.add('active');
        toggleBtn.textContent = this.language === 'ko' ? '📝 선택 항목 숨기기' : '📝 Hide Optional Fields';
    }
    
    hideOptionalFields() {
        const optionalFields = document.getElementById('optional-fields');
        const toggleBtn = document.getElementById('optional-fields-btn');
        
        optionalFields.style.display = 'none';
        optionalFields.classList.remove('show');
        toggleBtn.classList.remove('active');
        toggleBtn.textContent = this.getText('optionalFieldsButton');
        
        // Clear optional field values
        document.getElementById('feedback-name').value = '';
        document.getElementById('feedback-email').value = '';
    }
    
    async submitFeedback(event) {
        event.preventDefault();
        
        const name = document.getElementById('feedback-name').value;
        const email = document.getElementById('feedback-email').value;
        const type = document.getElementById('feedback-type').value;
        const message = document.getElementById('feedback-message').value.trim();
        const submitBtn = document.querySelector('.feedback-btn-submit');
        
        if (!message) {
            alert(this.getText('requiredMessage'));
            return;
        }
        
        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = this.getText('sendingMessage');
        submitBtn.disabled = true;
        
        const feedbackData = {
            name: name || 'Anonymous',
            email: email || 'No email provided',
            type: type,
            message: message,
            page: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
            language: this.language
        };
        
        try {
            // Save to localStorage as backup
            const existingFeedback = JSON.parse(localStorage.getItem('feedback_data') || '[]');
            existingFeedback.push(feedbackData);
            localStorage.setItem('feedback_data', JSON.stringify(existingFeedback));
            
            // Send email via EmailJS
            if (this.emailjsInitialized && typeof emailjs !== 'undefined') {
                await this.sendEmailNotification(feedbackData);
            } else {
                console.log('EmailJS not loaded, saved to localStorage only');
            }
            
            alert(this.getText('successMessage'));
            this.closeModal();
            
        } catch (error) {
            console.error('Feedback submission error:', error);
            alert(this.getText('errorMessage'));
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
    
    async sendEmailNotification(feedbackData) {
        const typeLabels = {
            feature: this.getText('types.feature'),
            improvement: this.getText('types.improvement'),
            bug: this.getText('types.bug'),
            other: this.getText('types.other')
        };
        
        const emailParams = {
            to_email: 'gum798@gmail.com', // 실제 이메일로 교체
            from_name: feedbackData.name,
            from_email: feedbackData.email,
            feedback_type: typeLabels[feedbackData.type],
            message: feedbackData.message,
            page_url: feedbackData.page,
            timestamp: new Date(feedbackData.timestamp).toLocaleString(),
            language: feedbackData.language,
            user_agent: feedbackData.userAgent
        };
        
        try {
            const response = await emailjs.send(
                'service_07p5y7f',  // 실제 서비스 ID로 교체
                'template_4ypz16r', // 실제 템플릿 ID로 교체
                emailParams
            );
            console.log('Email sent successfully:', response);
        } catch (error) {
            console.error('Email sending failed:', error);
            // Don't throw error to user, feedback is still saved locally
        }
    }
}

// Initialize feedback system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.feedbackSystem = new FeedbackSystem();
});

// Handle ESC key to close modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && window.feedbackSystem && window.feedbackSystem.isOpen) {
        window.feedbackSystem.closeModal();
    }
});