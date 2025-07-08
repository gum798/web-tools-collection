// Google CMP (Consent Management Platform) with 3 options
// 한국어/영어 지원

const translations = {
    ko: {
        title: "쿠키 및 개인정보 처리 동의",
        message: "이 웹사이트는 광고 개인화 및 분석을 위해 쿠키를 사용합니다. 광고 수익은 무료 서비스 제공에 도움이 됩니다.",
        accept: "모두 동의",
        reject: "거부",
        manage: "옵션 관리",
        privacy: "개인정보처리방침",
        moreInfo: "자세한 정보"
    },
    en: {
        title: "Cookie and Privacy Consent",
        message: "This website uses cookies for ad personalization and analytics. Ad revenue helps us provide free services.",
        accept: "Accept All",
        reject: "Reject",
        manage: "Manage Options",
        privacy: "Privacy Policy",
        moreInfo: "More Information"
    }
};

class CookieConsent {
    constructor() {
        this.language = this.detectLanguage();
        this.consentGiven = localStorage.getItem('cookieConsent');
        
        if (!this.consentGiven) {
            this.showConsentBanner();
        } else {
            this.loadGoogleAds();
        }
    }
    
    detectLanguage() {
        const userLang = navigator.language || navigator.userLanguage;
        return userLang.startsWith('ko') ? 'ko' : 'en';
    }
    
    getText(key) {
        return translations[this.language][key];
    }
    
    showConsentBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-consent-overlay">
                <div class="cookie-consent-modal">
                    <h3>${this.getText('title')}</h3>
                    <p>${this.getText('message')}</p>
                    <div class="cookie-consent-buttons">
                        <button id="accept-all" class="btn-accept">${this.getText('accept')}</button>
                        <button id="reject-all" class="btn-reject">${this.getText('reject')}</button>
                        <button id="manage-options" class="btn-manage">${this.getText('manage')}</button>
                    </div>
                    <div class="cookie-consent-links">
                        <a href="privacy.html">${this.getText('privacy')}</a>
                    </div>
                </div>
            </div>
        `;
        
        // Add CSS
        const style = document.createElement('style');
        style.textContent = `
            .cookie-consent-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .cookie-consent-modal {
                background: white;
                padding: 30px;
                border-radius: 15px;
                max-width: 500px;
                margin: 20px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            
            .cookie-consent-modal h3 {
                margin-bottom: 15px;
                color: #333;
                font-size: 1.4em;
            }
            
            .cookie-consent-modal p {
                margin-bottom: 25px;
                color: #666;
                line-height: 1.6;
            }
            
            .cookie-consent-buttons {
                display: flex;
                gap: 10px;
                margin-bottom: 20px;
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .cookie-consent-buttons button {
                padding: 12px 20px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 14px;
                font-weight: bold;
                transition: all 0.3s ease;
                flex: 1;
                min-width: 120px;
            }
            
            .btn-accept {
                background: #28a745;
                color: white;
            }
            
            .btn-accept:hover {
                background: #1e7e34;
            }
            
            .btn-reject {
                background: #dc3545;
                color: white;
            }
            
            .btn-reject:hover {
                background: #c82333;
            }
            
            .btn-manage {
                background: #007bff;
                color: white;
            }
            
            .btn-manage:hover {
                background: #0056b3;
            }
            
            .cookie-consent-links {
                border-top: 1px solid #eee;
                padding-top: 15px;
            }
            
            .cookie-consent-links a {
                color: #007bff;
                text-decoration: none;
                font-size: 14px;
            }
            
            .cookie-consent-links a:hover {
                text-decoration: underline;
            }
            
            @media (max-width: 600px) {
                .cookie-consent-buttons {
                    flex-direction: column;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(banner);
        
        // Add event listeners
        document.getElementById('accept-all').addEventListener('click', () => this.acceptAll());
        document.getElementById('reject-all').addEventListener('click', () => this.rejectAll());
        document.getElementById('manage-options').addEventListener('click', () => this.showManageOptions());
    }
    
    acceptAll() {
        localStorage.setItem('cookieConsent', 'accepted');
        localStorage.setItem('analyticsConsent', 'true');
        localStorage.setItem('adsConsent', 'true');
        this.removeBanner();
        this.loadGoogleAds();
        
        // Send consent to Google
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
            });
        }
    }
    
    rejectAll() {
        localStorage.setItem('cookieConsent', 'rejected');
        localStorage.setItem('analyticsConsent', 'false');
        localStorage.setItem('adsConsent', 'false');
        this.removeBanner();
        
        // Send consent to Google
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
            });
        }
    }
    
    showManageOptions() {
        // Show detailed options modal
        alert(this.language === 'ko' ? 
            '상세 설정은 개인정보처리방침에서 확인하실 수 있습니다.' :
            'Detailed settings can be found in our Privacy Policy.'
        );
    }
    
    removeBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.remove();
        }
    }
    
    loadGoogleAds() {
        // AdSense is already loaded in head, just enable if consent given
        const consent = localStorage.getItem('adsConsent');
        if (consent === 'true') {
            // Enable ads
            if (typeof adsbygoogle !== 'undefined') {
                (adsbygoogle = window.adsbygoogle || []).push({});
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new CookieConsent();
});