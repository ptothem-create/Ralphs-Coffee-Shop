//floating window for home page
(function createWelcomeBox() {
    const hasShownWelcome = sessionStorage.getItem('welcomeBoxShown');
    
    // Create the welcome box HTML
    function buildWelcomeBox() {
        const box = document.createElement('div');
        box.id = 'luxuryWelcomeBox';
        box.innerHTML = `
            <div class="welcome-overlay"></div>
            <div class="welcome-container">
                <button class="welcome-close" aria-label="Close">&times;</button>
                <div class="welcome-decoration">
                    <span class="deco-line left"></span>
                    <i class="bi bi-cup-hot welcome-icon"></i>
                    <span class="deco-line right"></span>
                </div>
                <h2 class="welcome-title">Welcome</h2>
                <div class="welcome-subtitle">To Ralphs Coffee</div>
                <div class="welcome-divider"></div>
                <p class="welcome-message">
                    Experience the finest coffee crafted with passion and precision.
                    <br><br>
                    Discover our premium collection and elevate your coffee journey.
                </p>
                <div class="welcome-features">
                    <div class="feature">
                        <i class="bi bi-gem"></i>
                        <span>Premium Quality</span>
                    </div>
                    <div class="feature">
                        <i class="bi bi-cup-straw"></i>
                        <span>Expert Craft</span>
                    </div>
                    <div class="feature">
                        <i class="bi bi-flower1"></i>
                        <span>Fresh Roasted</span>
                    </div>
                </div>
                <button class="welcome-btn">Start Your Journey</button>
                <p class="welcome-small">Every cup tells a story</p>
            </div>
        `;
        return box;
    }
    
    // Add styles for the welcome box
    function addWelcomeStyles() {
        const style = document.createElement('style');
        style.id = 'welcomeBoxStyles';
        style.textContent = `
            #luxuryWelcomeBox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                justify-content: center;
                align-items: center;
                animation: fadeInBg 0.5s ease;
            }
            
            .welcome-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.75);
                backdrop-filter: blur(5px);
            }
            
            .welcome-container {
                position: relative;
                background: linear-gradient(135deg, #fff8f0 0%, #fff 100%);
                width: 500px;
                max-width: 90%;
                padding: 45px 40px 50px;
                border-radius: 25px;
                text-align: center;
                box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(212, 175, 55, 0.3);
                animation: slideUp 0.5s ease;
                z-index: 10001;
            }
            
            .welcome-close {
                position: absolute;
                top: 18px;
                right: 22px;
                background: none;
                border: none;
                font-size: 32px;
                cursor: pointer;
                color: #8b6914;
                transition: 0.3s;
                padding: 0;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }
            
            .welcome-close:hover {
                color: #8b0000;
                background: rgba(139, 0, 0, 0.1);
                transform: rotate(90deg);
            }
            
            .welcome-decoration {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 15px;
                margin-bottom: 25px;
            }
            
            .deco-line {
                width: 50px;
                height: 2px;
                background: linear-gradient(90deg, transparent, #d4af37, #8b0000, #d4af37, transparent);
            }
            
            .welcome-icon {
                font-size: 45px;
                color: #8b0000;
                text-shadow: 0 2px 5px rgba(139, 0, 0, 0.3);
            }
            
            .welcome-title {
                font-size: 32px;
                font-weight: 300;
                letter-spacing: 3px;
                color: #4a1a1a;
                margin: 0 0 5px;
                font-family: 'Georgia', serif;
            }
            
            .welcome-subtitle {
                font-size: 18px;
                letter-spacing: 5px;
                color: #d4af37;
                margin-bottom: 20px;
                font-weight: 500;
            }
            
            .welcome-divider {
                width: 60px;
                height: 2px;
                background: linear-gradient(90deg, #d4af37, #8b0000);
                margin: 0 auto 25px;
            }
            
            .welcome-message {
                color: #5a3a3a;
                line-height: 1.7;
                font-size: 15px;
                margin-bottom: 30px;
            }
            
            .welcome-features {
                display: flex;
                justify-content: center;
                gap: 30px;
                margin-bottom: 35px;
            }
            
            .feature {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
            }
            
            .feature i {
                font-size: 24px;
                color: #d4af37;
            }
            
            .feature span {
                font-size: 12px;
                color: #8b6914;
                letter-spacing: 1px;
            }
            
            .welcome-btn {
                background: linear-gradient(135deg, #8b0000, #5a0000);
                color: white;
                border: none;
                padding: 14px 35px;
                border-radius: 40px;
                font-size: 16px;
                font-weight: 600;
                letter-spacing: 1px;
                cursor: pointer;
                transition: 0.3s;
                box-shadow: 0 5px 15px rgba(139, 0, 0, 0.3);
                width: auto;
                display: inline-block;
            }
            
            .welcome-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 25px rgba(139, 0, 0, 0.4);
                background: linear-gradient(135deg, #9a0010, #6b0000);
            }
            
            .welcome-small {
                margin-top: 20px;
                font-size: 11px;
                color: #bba87a;
                letter-spacing: 2px;
            }
            
            @keyframes fadeInBg {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @media (max-width: 550px) {
                .welcome-container {
                    padding: 35px 25px 40px;
                }
                .welcome-title {
                    font-size: 26px;
                }
                .welcome-features {
                    gap: 20px;
                }
                .deco-line {
                    width: 30px;
                }
            }
        `;
        
        if (!document.querySelector('#welcomeBoxStyles')) {
            document.head.appendChild(style);
        }
    }
    
    // Show welcome box
    function showWelcomeBox() {
        // Don't show if already shown in this session (use sessionStorage)
        if (sessionStorage.getItem('welcomeBoxShown') === 'true') {
            return;
        }
        
        addWelcomeStyles();
        const box = buildWelcomeBox();
        document.body.appendChild(box);
        
        // Mark as shown in this session
        sessionStorage.setItem('welcomeBoxShown', 'true');
        
        // Close button functionality
        const closeBtn = box.querySelector('.welcome-close');
        const overlay = box.querySelector('.welcome-overlay');
        const mainBtn = box.querySelector('.welcome-btn');
        
        function closeBox() {
            box.style.animation = 'fadeInBg 0.3s reverse';
            setTimeout(() => {
                if (box && box.parentNode) {
                    box.remove();
                }
            }, 300);
        }
        
        if (closeBtn) closeBtn.addEventListener('click', closeBox);
        if (overlay) overlay.addEventListener('click', closeBox);
        if (mainBtn) mainBtn.addEventListener('click', closeBox);
        
        // Close on Escape key
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeBox();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }
    
    // Show welcome box on page load/refresh
    // Using performance.navigation to detect refresh (modern approach)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showWelcomeBox);
    } else {
        showWelcomeBox();
    }
    
    // Also detect if page was refreshed (using performance)
    if (performance && performance.getEntriesByType) {
        const navigationEntries = performance.getEntriesByType('navigation');
        if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
            // It's a refresh, ensure welcome box shows
            sessionStorage.removeItem('welcomeBoxShown');
            setTimeout(showWelcomeBox, 100);
        }
    }
})();

// JavaScript For Review tag
document.addEventListener("DOMContentLoaded", function () {

    const reviews = [
        document.getElementById("Sarah"),
        document.getElementById("Emily"),
        document.getElementById("James"),
        document.getElementById("Michael")
    ];

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    let currentIndex = 0;

    reviews.forEach((review, index) => {
        if (index !== 0) review.style.display = "none";
        review.style.transition = "opacity 0.6s ease";
    });

    function showReview(index) {
        reviews.forEach((review) => {
            review.style.opacity = "0";
            setTimeout(() => review.style.display = "none", 600);
        });

        setTimeout(() => {
            reviews[index].style.display = "block";
            setTimeout(() => reviews[index].style.opacity = "1", 50);
        }, 600);
    }

    nextBtn.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % reviews.length;
        showReview(currentIndex);
    });

    prevBtn.addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
        showReview(currentIndex);
    });

});