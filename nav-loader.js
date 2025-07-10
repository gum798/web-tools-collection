// Navigation Loader Script
document.addEventListener('DOMContentLoaded', function() {
    loadNavigation();
});

async function loadNavigation() {
    try {
        // 1. nav.html 파일 내용을 비동기적으로 가져오기
        const response = await fetch('/layout/nav.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const navHTML = await response.text();
        
        // 2. navbar-placeholder에 HTML 삽입
        const placeholder = document.getElementById('navbar-placeholder');
        if (placeholder) {
            placeholder.innerHTML = navHTML;
            
            // 3. 현재 페이지에 맞는 active 클래스 추가
            setActiveNavigation();
            
            // 4. 모바일 메뉴 기능 초기화
            initializeMobileMenu();
        }
    } catch (error) {
        console.error('Navigation loading failed:', error);
    }
}

function setActiveNavigation() {
    const currentPath = window.location.pathname;
    
    // 경로에 따른 페이지 식별자 매핑
    const pathMapping = {
        '/index.html': 'home',
        '/': 'home',
        '/tools/pdf-tools/index.html': 'pdf-tools',
        '/tools/pdf-tools/png-converter.html': 'pdf-png',
        '/tools/pdf-tools/hwp-converter.html': 'pdf-hwp',
        '/tools/pdf-tools/epub-to-pdf.html': 'pdf-epub',
        '/tools/pdf-tools/pdf-watermark.html': 'pdf-watermark',
        '/tools/image-tools/index.html': 'image-tools',
        '/tools/image-tools/webp-to-jpg.html': 'image-webp',
        '/tools/file-conversion/file-conversion.html': 'file-conversion',
        '/tools/password-generator/password.html': 'password-generator'
    };
    
    // 현재 경로의 페이지 식별자 찾기
    let currentPage = pathMapping[currentPath];
    
    // 정확한 매칭이 없으면 경로 기반으로 추정
    if (!currentPage) {
        if (currentPath.includes('/pdf-tools/')) {
            currentPage = 'pdf-tools';
        } else if (currentPath.includes('/image-tools/')) {
            currentPage = 'image-tools';
        } else if (currentPath.includes('/file-conversion/')) {
            currentPage = 'file-conversion';
        } else if (currentPath.includes('/password-generator/')) {
            currentPage = 'password-generator';
        } else {
            currentPage = 'home';
        }
    }
    
    // 모든 active 클래스 제거
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // 현재 페이지에 해당하는 링크에 active 클래스 추가
    const activeLink = document.querySelector(`[data-page="${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
        
        // 드롭다운 메뉴 내의 링크인 경우 부모 드롭다운도 active 처리
        const dropdown = activeLink.closest('.nav-dropdown');
        if (dropdown) {
            const parentLink = dropdown.querySelector('.has-dropdown');
            if (parentLink) {
                parentLink.classList.add('active');
            }
        }
    }
}

function initializeMobileMenu() {
    // 모바일 메뉴 토글 기능
    window.toggleMenu = function() {
        const navLinks = document.getElementById('navLinks');
        if (navLinks) {
            navLinks.classList.toggle('active');
        }
    };
    
    // 외부 클릭시 메뉴 닫기
    document.addEventListener('click', function(e) {
        const navBar = document.querySelector('.nav-bar');
        const navLinks = document.getElementById('navLinks');
        if (navBar && navLinks && !navBar.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
    
    // 윈도우 리사이즈시 메뉴 닫기
    window.addEventListener('resize', function() {
        const navLinks = document.getElementById('navLinks');
        if (navLinks && window.innerWidth > 768) {
            navLinks.classList.remove('active');
        }
    });
}