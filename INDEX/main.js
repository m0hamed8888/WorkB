     // ========== TAB SWITCHING ==========
        function switchTab(mode, event) {
            // أزرار التابات
            const buttons = document.querySelectorAll('.tab-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            event.currentTarget.classList.add('active');

            // URL hash
            window.location.hash = mode;

            // إخفاء كل المحتوى
            document.querySelectorAll('.content-retail, .content-industrial').forEach(el => {
                el.classList.remove('active', 'flex-active');
            });

            // إظهار المحتوى المناسب
            const selector = mode === 'retail' ? '.content-retail' : '.content-industrial';
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add(el.classList.contains('packaging-grid') ? 'flex-active' : 'active');
            });
        }

        // ========== PRODUCTS DROPDOWN TOGGLE ==========
        function toggleProducts(event) {
            event.preventDefault();
            event.stopPropagation();
            const dropdown = document.querySelector('.nav-item-dropdown');
            dropdown.classList.toggle('active');
        }

        // إقفال Products Dropdown لما تضغط بره
        document.addEventListener('click', function(e) {
            const dropdown = document.querySelector('.nav-item-dropdown');
            const productsToggle = document.querySelector('.products-toggle');
            
            if (dropdown && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });

        // منع إقفال الـ Dropdown لما تضغط جواه
        document.addEventListener('DOMContentLoaded', function() {
            const productsDropdown = document.querySelector('.products-dropdown');
            if (productsDropdown) {
                productsDropdown.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            }
        });

        // ========== SCROLL (مُحسّن) ==========
        let busy = false;
        window.addEventListener('scroll', function () {
            if (busy) return;
            busy = true;

            requestAnimationFrame(function () {
                const fab = document.querySelector('.fab');
                const hero = document.querySelector('.hero');
                const preFooter = document.querySelector('.pre-footer');

                const scrollPos = window.scrollY;
                const heroBottom = hero.offsetTop + hero.offsetHeight;
                const preFooterTop = preFooter.offsetTop;
                const windowHeight = window.innerHeight;

                if (scrollPos > heroBottom && scrollPos < (preFooterTop - windowHeight + 100)) {
                    fab.classList.add('visible');
                } else {
                    fab.classList.remove('visible');
                }

                busy = false;
            });
        });

        // ========== MOBILE MENU TOGGLE ==========
        function toggleMenu() {
            const drawer = document.getElementById('navDrawer');
            const overlay = document.getElementById('navOverlay');
            const toggle = document.querySelector('.menu-toggle');

            drawer.classList.toggle('active');
            overlay.classList.toggle('active');
            toggle.classList.toggle('active');

            // منع السكرول لما يكون الـ Menu مفتوح
            if (drawer.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }

        // إقفال المنيو لما تضغط على لينك
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                // ما نقفلش المنيو لو كان الـ Products Toggle
                if (!link.classList.contains('products-toggle')) {
                    if (document.getElementById('navDrawer').classList.contains('active')) {
                        toggleMenu();
                    }
                }
            });
        });

        // إقفال بـ ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // إقفال Products Dropdown
                const productsDropdown = document.querySelector('.nav-item-dropdown');
                if (productsDropdown && productsDropdown.classList.contains('active')) {
                    productsDropdown.classList.remove('active');
                }
                
                // إقفال Mobile Menu
                if (document.getElementById('navDrawer').classList.contains('active')) {
                    toggleMenu();
                }
            }
        });

        // ========== LANGUAGE DROPDOWN ==========
        function toggleLang() {
            document.getElementById('langDropdown').classList.toggle('active');
        }

        // إقفال لما تضغط بره
        document.addEventListener('click', function (e) {
            const dropdown = document.getElementById('langDropdown');
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });

        // ========== LOAD ==========
        window.addEventListener('DOMContentLoaded', function () {
            // شيك الـ hash
            if (window.location.hash === '#industrial') {
                const btn = document.querySelector('.tab-btn:nth-child(2)');
                if (btn) btn.click();
            }

            // حدد اللغة
            const path = window.location.pathname;
            const langMap = { '/en/': 'EN', '/ar/': 'AR', '/fr/': 'FR', '/de/': 'DE', '/es/': 'ES', '/it/': 'IT' };
            let currentLang = 'EN';

            for (let [url, code] of Object.entries(langMap)) {
                if (path.startsWith(url)) currentLang = code;
            }

            document.getElementById('currentLang').textContent = currentLang;
            document.querySelectorAll('.lang-link').forEach(link => {
                link.classList.toggle('active', link.dataset.lang === currentLang);
            });
        });
