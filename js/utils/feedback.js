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
        messagePlaceholder: "어떤 기능이 필요하신가요? 또는 개선 사항이 있으신가요? (Tab + Space/Enter로 빠른 전송)",
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
        messagePlaceholder: "What features do you need? Any suggestions for improvement? (Tab + Space/Enter for quick submit)",
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
                        <textarea id="feedback-message" placeholder="${this.getText('messagePlaceholder')}" required onkeydown="feedbackSystem.handleTextareaKeydown(event)"></textarea>
                    </div>
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
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 25px;
                padding: 15px 20px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                box-shadow: 0 8px 32px rgba(0,0,0,0.1);
                z-index: 1300;
                transition: all 0.3s ease;
                animation: feedbackPulse 3s infinite;
                text-shadow: 0 1px 2px rgba(0,0,0,0.3);
            }
            
            .feedback-floating-btn:hover {
                transform: translateY(-3px);
                background: rgba(255, 255, 255, 0.15);
                box-shadow: 0 12px 40px rgba(0,0,0,0.2);
                border-color: rgba(255, 255, 255, 0.3);
            }
            
            @keyframes feedbackPulse {
                0% { 
                    box-shadow: 0 8px 32px rgba(0,0,0,0.1), 0 0 0 0 rgba(255, 255, 255, 0.4);
                }
                50% { 
                    box-shadow: 0 8px 32px rgba(0,0,0,0.1), 0 0 0 8px rgba(255, 255, 255, 0.1);
                }
                100% { 
                    box-shadow: 0 8px 32px rgba(0,0,0,0.1), 0 0 0 0 rgba(255, 255, 255, 0);
                }
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
                background: rgba(255, 255, 255, 0.3); /* Slightly less transparent white */
                backdrop-filter: blur(10px); /* Frosted glass effect */
                border-radius: 15px;
                padding: 0;
                width: 90%;
                max-width: 500px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); /* Subtle shadow */
                border: 1px solid rgba(255, 255, 255, 0.18); /* Light border */
            }
            
            .feedback-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 25px;
                border-radius: 15px 15px 0 0;
                position: relative;
                backdrop-filter: blur(10px);
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
                color: white; /* Changed to white for better contrast */
            }
            
            .feedback-form-group input,
            .feedback-form-group select,
            .feedback-form-group textarea {
                width: 100%;
                padding: 12px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                font-size: 14px;
                transition: all 0.3s ease;
                box-sizing: border-box;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(5px);
                color: white;
            }
            
            .feedback-form-group input:focus,
            .feedback-form-group select:focus,
            .feedback-form-group textarea:focus {
                outline: none;
                border-color: rgba(255, 255, 255, 0.4);
                box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
                background: rgba(255, 255, 255, 0.15);
            }
            
            .feedback-form-group input::placeholder,
            .feedback-form-group textarea::placeholder {
                color: rgba(255, 255, 255, 0.6);
            }
            
            .feedback-form-group select option {
                background: #333;
                color: white;
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
                background: rgba(255, 255, 255, 0.1);
                border: 1px dashed rgba(255, 255, 255, 0.3);
                color: rgba(255, 255, 255, 0.8);
                padding: 10px 20px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.3s ease;
                backdrop-filter: blur(5px);
            }
            
            #optional-fields-btn:hover {
                background: rgba(255, 255, 255, 0.15);
                border-color: rgba(255, 255, 255, 0.4);
                color: white;
            }
            
            #optional-fields-btn.active {
                background: rgba(255, 255, 255, 0.2);
                border-color: rgba(255, 255, 255, 0.5);
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
            
            .feedback-toast {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.2);
                z-index: 10001;
                opacity: 0;
                transform: translateX(400px);
                transition: all 0.3s ease;
                min-width: 300px;
                max-width: 500px;
                border-left: 4px solid #007bff;
            }
            
            .feedback-toast-show {
                opacity: 1 !important;
                transform: translateX(0) !important;
            }
            
            .feedback-toast-success {
                border-left-color: #28a745;
                background: linear-gradient(135deg, #d4edda, #c3e6cb);
            }
            
            .feedback-toast-error {
                border-left-color: #dc3545;
                background: linear-gradient(135deg, #f8d7da, #f5c6cb);
            }
            
            .feedback-toast-warning {
                border-left-color: #ffc107;
                background: linear-gradient(135deg, #fff3cd, #ffeeba);
            }
            
            .feedback-toast-info {
                border-left-color: #17a2b8;
                background: linear-gradient(135deg, #d1ecf1, #bee5eb);
            }
            
            .feedback-toast-content {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 16px 20px;
            }
            
            .feedback-toast-icon {
                font-size: 20px;
                flex-shrink: 0;
            }
            
            .feedback-toast-message {
                font-size: 14px;
                font-weight: 500;
                color: white;
                line-height: 1.4;
                text-shadow: 0 1px 2px rgba(0,0,0,0.3);
            }
            
            @media (max-width: 600px) {
                .feedback-toast {
                    right: 10px;
                    left: 10px;
                    min-width: auto;
                    transform: translateY(-100px);
                }
                
                .feedback-toast-show {
                    transform: translateY(0) !important;
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
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
                backdrop-filter: blur(5px);
            }
            
            .feedback-btn-cancel {
                background: rgba(255, 255, 255, 0.1);
                color: rgba(255, 255, 255, 0.8);
            }
            
            .feedback-btn-cancel:hover {
                background: rgba(255, 255, 255, 0.15);
                color: white;
                border-color: rgba(255, 255, 255, 0.3);
            }
            
            .feedback-btn-submit {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-color: transparent;
            }
            
            .feedback-btn-submit:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
                background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
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
            this.showToast(this.getText('requiredMessage'), 'warning');
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
            
            this.showToast(this.getText('successMessage'), 'success');
            this.closeModal();
            
        } catch (error) {
            console.error('Feedback submission error:', error);
            this.showToast(this.getText('errorMessage'), 'error');
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
    
    showToast(message, type = 'info') {
        // Remove existing toast if any
        const existingToast = document.getElementById('feedback-toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.id = 'feedback-toast';
        toast.className = `feedback-toast feedback-toast-${type}`;
        
        // Add icon based on type
        const icons = {
            success: '✅',
            error: '❌', 
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        toast.innerHTML = `
            <div class="feedback-toast-content">
                <span class="feedback-toast-icon">${icons[type]}</span>
                <span class="feedback-toast-message">${message}</span>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(toast);
        
        // Show with animation
        setTimeout(() => {
            toast.classList.add('feedback-toast-show');
        }, 10);
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('feedback-toast-show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, 3000);
    }
    
    handleTextareaKeydown(event) {
        // Tab + Space 또는 Tab + Enter로 전송
        if (event.key === 'Tab') {
            event.preventDefault();
            
            // 다음 키 입력을 기다림
            const textarea = event.target;
            const originalBorderColor = textarea.style.borderColor;
            textarea.style.borderColor = '#007bff';
            
            const keyHandler = (nextEvent) => {
                if (nextEvent.key === ' ' || nextEvent.key === 'Enter') {
                    nextEvent.preventDefault();
                    
                    // 폼 제출
                    const form = document.getElementById('feedback-form');
                    if (form) {
                        const submitEvent = new Event('submit');
                        form.dispatchEvent(submitEvent);
                    }
                } else {
                    // Tab 키 효과 취소
                    textarea.style.borderColor = originalBorderColor;
                }
                
                // 이벤트 리스너 제거
                textarea.removeEventListener('keydown', keyHandler);
            };
            
            // 임시 이벤트 리스너 추가
            textarea.addEventListener('keydown', keyHandler);
            
            // 3초 후 자동으로 하이라이트 제거
            setTimeout(() => {
                textarea.style.borderColor = originalBorderColor;
                textarea.removeEventListener('keydown', keyHandler);
            }, 3000);
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