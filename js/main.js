// Mobile menu toggle
        function toggleMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('active');
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const navBar = document.querySelector('.nav-bar');
            const navLinks = document.getElementById('navLinks');
            if (!navBar.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
        
        // Close menu when window is resized to desktop
        window.addEventListener('resize', function() {
            const navLinks = document.getElementById('navLinks');
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
            }
        });
        
        // 카드 호버 효과 강화
        document.querySelectorAll('.tool-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // 페이지 로드 애니메이션
        window.addEventListener('load', function() {
            const cards = document.querySelectorAll('.tool-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            });
        });
        
        // Social sharing functions
        const siteUrl = 'https://web-tools-collection-git-main-seo-junghwas-projects.vercel.app';
        let siteTitle = '웹 도구 모음 - 무료 온라인 도구';
        let siteDescription = '안전한 랜덤 비밀번호 생성기와 PDF to PNG 변환기. 브라우저에서 안전하게 처리되는 무료 온라인 도구 모음입니다.';
        
        // Update sharing text based on language
        function updateSharingText() {
            if (window.i18n && window.i18n.getCurrentLanguage() === 'en') {
                siteTitle = 'Web Tools Collection - Free Online Tools';
                siteDescription = 'Secure random password generator and PDF to PNG converter. Free online tools safely processed in your browser.';
            }
        }
        
        function shareOnFacebook() {
            updateSharingText();
            const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`;
            window.open(url, '_blank', 'width=600,height=400');
        }
        
        function shareOnTwitter() {
            updateSharingText();
            const text = `${siteTitle} - ${siteDescription}`;
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(siteUrl)}`;
            window.open(url, '_blank', 'width=600,height=400');
        }
        
        function shareOnLinkedIn() {
            updateSharingText();
            const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`;
            window.open(url, '_blank', 'width=600,height=400');
        }
        
        function shareOnTelegram() {
            updateSharingText();
            const text = `${siteTitle} - ${siteDescription}`;
            const url = `https://t.me/share/url?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(text)}`;
            window.open(url, '_blank', 'width=600,height=400');
        }
        
        function shareOnWhatsApp() {
            updateSharingText();
            const text = `${siteTitle} - ${siteDescription} ${siteUrl}`;
            const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        }
        
        function copyLink() {
            const copyText = window.i18n && window.i18n.getCurrentLanguage() === 'en' ? 'Link copied to clipboard!' : '링크가 클립보드에 복사되었습니다!';
            
            navigator.clipboard.writeText(siteUrl).then(function() {
                if (window.feedbackSystem) {
                    window.feedbackSystem.showToast(copyText, 'success');
                } else {
                    alert(copyText);
                }
            }).catch(function(err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = siteUrl;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                if (window.feedbackSystem) {
                    window.feedbackSystem.showToast(copyText, 'success');
                } else {
                    alert(copyText);
                }
            });
        }