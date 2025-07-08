class I18n {
    constructor() {
        this.currentLanguage = 'ko';
        this.translations = {};
        this.fallbackLanguage = 'ko';
        this.init();
    }

    async init() {
        // Get language from localStorage, URL parameter, or browser language
        this.currentLanguage = this.detectLanguage();
        
        // Load translations
        await this.loadTranslations(this.currentLanguage);
        
        // Apply translations to current page
        this.applyTranslations();
        
        // Update language selector
        this.updateLanguageSelector();
        
        // Set up language change listener
        this.setupLanguageSelector();
    }

    detectLanguage() {
        // Priority: localStorage > URL parameter > browser language > fallback
        const stored = localStorage.getItem('preferred-language');
        if (stored && ['ko', 'en'].includes(stored)) {
            return stored;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && ['ko', 'en'].includes(urlLang)) {
            return urlLang;
        }

        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('ko')) {
            return 'ko';
        }
        if (browserLang.startsWith('en')) {
            return 'en';
        }

        return this.fallbackLanguage;
    }

    async loadTranslations(language) {
        try {
            const response = await fetch(`lang/${language}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load ${language} translations`);
            }
            this.translations = await response.json();
            console.log(`Loaded ${language} translations`);
        } catch (error) {
            console.error(`Error loading translations for ${language}:`, error);
            
            // Try to load fallback language if current language fails
            if (language !== this.fallbackLanguage) {
                console.log(`Falling back to ${this.fallbackLanguage}`);
                try {
                    const fallbackResponse = await fetch(`lang/${this.fallbackLanguage}.json`);
                    this.translations = await fallbackResponse.json();
                    this.currentLanguage = this.fallbackLanguage;
                } catch (fallbackError) {
                    console.error('Failed to load fallback translations:', fallbackError);
                }
            }
        }
    }

    t(key, params = {}) {
        const keys = key.split('.');
        let value = this.translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key; // Return the key if translation not found
            }
        }

        // Handle array values (return array as-is)
        if (Array.isArray(value)) {
            return value;
        }

        // Handle string interpolation
        if (typeof value === 'string') {
            return value.replace(/\{(\w+)\}/g, (match, param) => {
                return params[param] !== undefined ? params[param] : match;
            });
        }

        return value;
    }

    applyTranslations() {
        // Update document title and meta tags
        this.updateDocumentMeta();
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translated = this.t(key);
            
            if (typeof translated === 'string') {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translated;
                } else {
                    element.textContent = translated;
                }
            }
        });

        // Update all elements with data-i18n-html attribute (for HTML content)
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const translated = this.t(key);
            
            if (typeof translated === 'string') {
                element.innerHTML = translated;
            }
        });

        // Update all elements with data-i18n-attr attribute (for attributes)
        document.querySelectorAll('[data-i18n-attr]').forEach(element => {
            const attrMapping = element.getAttribute('data-i18n-attr');
            const pairs = attrMapping.split(';');
            
            pairs.forEach(pair => {
                const [attr, key] = pair.split(':');
                if (attr && key) {
                    const translated = this.t(key.trim());
                    if (typeof translated === 'string') {
                        element.setAttribute(attr.trim(), translated);
                    }
                }
            });
        });

        // Update dynamic content based on page type
        this.updatePageSpecificContent();
    }

    updateDocumentMeta() {
        const currentPage = this.detectCurrentPage();
        
        if (currentPage && this.translations[currentPage]) {
            const pageData = this.translations[currentPage];
            
            // Update title
            if (pageData.title) {
                document.title = pageData.title;
            }
            
            // Update meta description
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc && pageData.description) {
                metaDesc.setAttribute('content', pageData.description);
            }
            
            // Update meta keywords
            const metaKeywords = document.querySelector('meta[name="keywords"]');
            if (metaKeywords && pageData.keywords) {
                metaKeywords.setAttribute('content', pageData.keywords);
            }
            
            // Update Open Graph tags
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle && pageData.title) {
                ogTitle.setAttribute('content', pageData.title);
            }
            
            const ogDesc = document.querySelector('meta[property="og:description"]');
            if (ogDesc && pageData.description) {
                ogDesc.setAttribute('content', pageData.description);
            }
        }
    }

    detectCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().split('.')[0];
        
        switch (filename) {
            case 'index':
            case '':
                return 'home';
            case 'password':
                return 'password';
            case 'pdf-converter':
                return 'pdfConverter';
            case 'file-converter':
                return 'fileConverter';
            default:
                return 'home';
        }
    }

    updatePageSpecificContent() {
        const currentPage = this.detectCurrentPage();
        
        // Handle special cases for different pages
        switch (currentPage) {
            case 'fileConverter':
                this.updateFileConverterContent();
                break;
            // Add other page-specific updates as needed
        }
    }

    updateFileConverterContent() {
        // Update security items list
        const securityList = document.querySelector('.security-warning ul');
        if (securityList) {
            const items = this.t('fileConverter.securityItems');
            if (Array.isArray(items)) {
                securityList.innerHTML = items.map(item => `<li><strong>${item.split(':')[0]}:</strong> ${item.split(':').slice(1).join(':').trim()}</li>`).join('');
            }
        }

        // Update converter cards
        this.updateConverterCards();

        // Update tool features list
        const toolFeaturesList = document.querySelector('.guide-section ul');
        if (toolFeaturesList && toolFeaturesList.previousElementSibling?.textContent.includes('💡')) {
            const features = this.t('fileConverter.toolFeatures');
            if (Array.isArray(features)) {
                toolFeaturesList.innerHTML = features.map(feature => `<li><strong>${feature.split(':')[0]}:</strong> ${feature.split(':').slice(1).join(':').trim()}</li>`).join('');
            }
        }

        // Update offline tools list
        const offlineToolsList = document.querySelectorAll('.guide-section ul')[1];
        if (offlineToolsList) {
            const tools = this.t('fileConverter.offlineTools');
            if (Array.isArray(tools)) {
                offlineToolsList.innerHTML = tools.map(tool => `<li><strong>${tool.split(':')[0]}:</strong> ${tool.split(':').slice(1).join(':').trim()}</li>`).join('');
            }
        }
    }

    updateConverterCards() {
        const converterCards = document.querySelectorAll('.converter-card');
        const converterKeys = ['hwpWord', 'excelPdf', 'powerpointPdf', 'image', 'audioVideo', 'archive'];
        
        converterCards.forEach((card, index) => {
            if (index < converterKeys.length) {
                const converterKey = converterKeys[index];
                const converterData = this.t(`fileConverter.converters.${converterKey}`);
                
                if (converterData && typeof converterData === 'object') {
                    // Update title
                    const titleElement = card.querySelector('h3');
                    if (titleElement) {
                        titleElement.innerHTML = converterData.title + (converterData.popular ? ` <span class="popular-badge">${converterData.popular}</span>` : '');
                    }
                    
                    // Update description
                    const descElement = card.querySelector('p');
                    if (descElement) {
                        descElement.textContent = converterData.description;
                    }
                    
                    // Update steps if available (only for HWP converter)
                    if (converterData.steps && Array.isArray(converterData.steps)) {
                        const stepsList = card.querySelector('.step-list');
                        if (stepsList) {
                            stepsList.innerHTML = converterData.steps.map(step => `<li>${step}</li>`).join('');
                        }
                    }
                }
            }
        });
    }

    updateLanguageSelector() {
        const selector = document.getElementById('languageSelect');
        if (selector) {
            // Set current language as selected
            selector.value = this.currentLanguage;
            
            // Update option texts
            const options = selector.querySelectorAll('option');
            options.forEach(option => {
                const lang = option.value;
                if (lang === 'ko') {
                    option.textContent = this.t('common.languageKo');
                } else if (lang === 'en') {
                    option.textContent = this.t('common.languageEn');
                }
            });
        }
    }

    setupLanguageSelector() {
        const selector = document.getElementById('languageSelect');
        if (selector) {
            selector.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }
    }

    async changeLanguage(newLanguage) {
        if (newLanguage === this.currentLanguage) return;
        
        // Save preference
        localStorage.setItem('preferred-language', newLanguage);
        
        // Mark that user manually chose language
        sessionStorage.setItem('userLanguageChoice', 'manual');
        
        // Load new translations
        await this.loadTranslations(newLanguage);
        
        // Update current language
        this.currentLanguage = newLanguage;
        
        // Apply new translations
        this.applyTranslations();
        
        // Update URL parameter
        const url = new URL(window.location);
        url.searchParams.set('lang', newLanguage);
        window.history.replaceState({}, '', url);
        
        console.log(`Language changed to: ${newLanguage}`);
    }

    // Method to get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Method to check if a language is supported
    isLanguageSupported(language) {
        return ['ko', 'en'].includes(language);
    }
}

// Initialize i18n when DOM is loaded
let i18n;

document.addEventListener('DOMContentLoaded', async () => {
    i18n = new I18n();
});

// Export for use in other scripts
window.i18n = i18n;