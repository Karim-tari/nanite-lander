// Animated waitlist counter
let waitlistCount = 1247; // Target count
let currentDisplayCount = 0; // Start from 0
let isAnimating = false;

function animateCountUp(startValue, endValue, duration, callback) {
    const counterElement = document.getElementById('waitlistCount');
    if (!counterElement) return;
    
    isAnimating = true;
    const startTime = performance.now();
    const difference = endValue - startValue;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easeOutQuart for smooth deceleration
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (difference * easeProgress));
        
        counterElement.textContent = currentValue.toLocaleString();
        currentDisplayCount = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            isAnimating = false;
            if (callback) callback();
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function updateWaitlistCount() {
    // Calculate realistic current count
    const now = new Date();
    const baseCount = 1247;
    const minutesSinceStart = Math.floor((now.getTime() - new Date('2024-01-01').getTime()) / (1000 * 60));
    const dynamicGrowth = Math.floor(minutesSinceStart * 0.02);
    
    waitlistCount = baseCount + dynamicGrowth;
}

function incrementWaitlistCount() {
    if (isAnimating) return; // Don't increment during animation
    
    const oldCount = currentDisplayCount;
    waitlistCount++;
    currentDisplayCount = waitlistCount;
    
    const counterElement = document.getElementById('waitlistCount');
    if (counterElement) {
        // Animate the increment with a quick pulse
        counterElement.style.transform = 'scale(1.08)';
        counterElement.style.color = '#10b981';
        counterElement.style.transition = 'all 0.2s ease';
        
        setTimeout(() => {
            counterElement.textContent = waitlistCount.toLocaleString();
            
            setTimeout(() => {
                counterElement.style.transform = 'scale(1)';
                counterElement.style.color = '';
            }, 100);
        }, 100);
    }
}

function startWaitlistAnimation() {
    updateWaitlistCount(); // Calculate target count
    
    // Animate from 0 to current count over 2.5 seconds
    animateCountUp(0, waitlistCount, 2500, () => {
        // Start periodic increments after initial animation
        setInterval(() => {
            incrementWaitlistCount();
        }, 3000 + Math.random() * 4000); // Every 3-7 seconds
    });
}

// Accordion functionality
function toggleAccordion(index) {
    const accordionItems = document.querySelectorAll('.accordion-item');
    const targetItem = accordionItems[index];
    const isActive = targetItem.classList.contains('active');
    
    // Close all accordion items
    accordionItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // If the clicked item wasn't active, open it
    if (!isActive) {
        targetItem.classList.add('active');
    }
    
    // Add haptic feedback on mobile
    if (typeof isMobile !== 'undefined' && isMobile && navigator.vibrate) {
        navigator.vibrate(50);
    }
}

// Mobile detection and optimization
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isAndroid = /Android/i.test(navigator.userAgent);

// Enhanced touch support detection
const supportsTouchEvents = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// AI Typewriter Effect for Placeholder
function typewriterPlaceholder() {
    const input = document.getElementById('emailInput');
    if (!input) return;
    
    const text = "Enter your email to join the waitlist";
    let i = 0;
    let displayText = "";
    
    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.style.display = 'none';
    
    // Position cursor relative to input
    const promptBox = input.closest('.prompt-box');
    if (promptBox) {
        promptBox.style.position = 'relative';
        promptBox.appendChild(cursor);
    }
    
    function updateCursorPosition() {
        // Create temporary span to measure text width using exact input styling
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.fontSize = '18px';
        tempSpan.style.fontWeight = '500';
        tempSpan.style.fontFamily = getComputedStyle(input).fontFamily;
        tempSpan.textContent = displayText;
        document.body.appendChild(tempSpan);
        
        const textWidth = tempSpan.offsetWidth;
        document.body.removeChild(tempSpan);
        
        // Position cursor after the text (accounting for icon, gap, and padding)
        cursor.style.left = `${textWidth + 52}px`; // 20px icon + 16px gap + 16px left padding
        cursor.style.display = 'block';
    }
    
    function typeChar() {
        if (i < text.length) {
            displayText += text.charAt(i);
            input.placeholder = displayText;
            updateCursorPosition();
            i++;
            // Much faster typing speed for snappier feel
            const speed = Math.random() * 30 + 20; // 20-50ms
            setTimeout(typeChar, speed);
        } else {
            // Hide cursor when done
            setTimeout(() => {
                cursor.style.display = 'none';
            }, 1000);
        }
    }
    
    // Start typing after the prompt box animation completes
    setTimeout(() => {
        cursor.style.display = 'block';
        cursor.style.left = '52px'; // Start position
        typeChar();
    }, 2200);
}

// Static hero message - no rotation

// Word-by-word animation on page load
document.addEventListener('DOMContentLoaded', function() {
    const words = document.querySelectorAll('.word');
    
    words.forEach(word => {
        const delay = parseInt(word.getAttribute('data-delay')) || 0;
        
        setTimeout(() => {
            word.classList.add('animate');
        }, delay);
    });
    
    // Mobile-specific optimizations
    if (isMobile) {
        initializeMobileOptimizations();
        // Simplify placeholder text on mobile
        const emailInput = document.getElementById('emailInput');
        if (emailInput) {
            emailInput.placeholder = "Enter email address";
        }
    }
    
    // Handle viewport height on mobile
    handleMobileViewport();
    
    // Initialize animated waitlist counter
    setTimeout(() => {
        startWaitlistAnimation();
    }, 1000); // Start after 1 second delay
    
    // Initialize scroll-based availability text fade
    initializeAvailabilityFade();
    
    // Initialize dark mode toggle
    initializeDarkMode();

});

// Dark Mode Toggle Functionality
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;
    
    // Check for saved dark mode preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    }
    
    // Toggle function
    function toggleDarkMode() {
        const isDark = document.documentElement.classList.contains('dark');
        
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        
        // Add a subtle animation to the toggle button
        darkModeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            darkModeToggle.style.transform = '';
        }, 150);
        
        // Haptic feedback on mobile
        if (isMobile && 'vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }
    
    // Add click event listener
    darkModeToggle.addEventListener('click', toggleDarkMode);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    });
}


// Scroll-based availability text fade effect
function initializeAvailabilityFade() {
    const availabilityText = document.querySelector('.availability-label');
    if (!availabilityText) return;
    
    let isVisible = true;
    let ticking = false;
    
    function updateAvailabilityVisibility() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const shouldBeVisible = scrollY < 100; // Fade out after 100px scroll
        
        if (shouldBeVisible !== isVisible) {
            isVisible = shouldBeVisible;
            
            if (isVisible) {
                // Fade in when scrolling back to top
                availabilityText.style.opacity = '1';
                availabilityText.style.transform = 'translateY(0)';
                availabilityText.style.transition = 'opacity 400ms ease-out, transform 400ms ease-out';
            } else {
                // Fade out when scrolling down
                availabilityText.style.opacity = '0';
                availabilityText.style.transform = 'translateY(-10px)';
                availabilityText.style.transition = 'opacity 300ms ease-in, transform 300ms ease-in';
            }
        }
        
        ticking = false;
    }
    
    function requestAvailabilityUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateAvailabilityVisibility);
            ticking = true;
        }
    }
    
    // Use passive event listener for better performance
    window.addEventListener('scroll', requestAvailabilityUpdate, { passive: true });
    
    // Handle orientation change on mobile
    if (isMobile) {
        window.addEventListener('orientationchange', () => {
            setTimeout(requestAvailabilityUpdate, 100);
        });
    }
}

// Mobile viewport handling for better UX
function handleMobileViewport() {
    if (isMobile) {
        // Set CSS custom property for real viewport height
        const setViewportHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', () => {
            setTimeout(setViewportHeight, 100);
        });
    }
}

// Initialize mobile-specific optimizations
function initializeMobileOptimizations() {
    // Disable hover effects on touch devices
    if (supportsTouchEvents) {
        document.body.classList.add('touch-device');
    }
    
    // Optimize video for mobile
    const video = document.querySelector('.background-video');
    if (video && isMobile) {
        video.setAttribute('webkit-playsinline', 'true');
        video.setAttribute('playsinline', 'true');
        video.muted = true;
        
        // Reduce video quality on slower connections
        if ('connection' in navigator) {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (connection && (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g')) {
                video.style.display = 'none';
            }
        }
    }
    
    // Prevent iOS Safari rubber band scrolling
    if (isIOS) {
        document.addEventListener('touchmove', function(e) {
            if (e.scale !== 1) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    // Add mobile-specific touch handling
    initializeTouchHandling();
}

// Enhanced touch handling for mobile
function initializeTouchHandling() {
    let touchStartY = 0;
    let touchStartX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    document.addEventListener('touchmove', function(e) {
        const touchY = e.touches[0].clientY;
        const touchX = e.touches[0].clientX;
        const deltaY = touchStartY - touchY;
        const deltaX = touchStartX - touchX;
        
        // Prevent horizontal scrolling
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Add touch feedback to interactive elements
    const interactiveElements = document.querySelectorAll('.hui-btn, .feature-card, .partner-logo, .status-badge');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
                this.style.transition = 'all 300ms ease';
            }, 100);
        }, { passive: true });
        
        element.addEventListener('touchcancel', function() {
            this.style.transform = '';
            this.style.transition = 'all 300ms ease';
        }, { passive: true });
    });
}

// Smooth scroll to signup form with mobile optimization
function scrollToSignup() {
    const signupForm = document.querySelector('.signup-section');
    if (signupForm) {
        // Calculate offset for mobile keyboards
        const offset = isMobile ? window.innerHeight * 0.3 : 0;
        const targetPosition = signupForm.offsetTop - offset;
        
        if (isMobile && 'scrollTo' in window) {
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        } else {
            signupForm.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
        
        // Add a prominent highlight effect with mobile considerations
        const emailInput = signupForm.querySelector('.prompt-input');
        if (emailInput) {
            setTimeout(() => {
                // On mobile, focus after scroll to prevent keyboard jumping
                if (isMobile) {
                    setTimeout(() => emailInput.focus(), 500);
                } else {
                    emailInput.focus();
                }
                
                // Enhanced highlight effect
                emailInput.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.4), 0 0 20px rgba(59, 130, 246, 0.2)';
                emailInput.style.borderColor = '#3b82f6';
                emailInput.style.transform = 'scale(1.02)';
                emailInput.style.transition = 'all 0.3s ease';
                
                // Add a pulse animation
                emailInput.classList.add('highlight-pulse');
                
                // Remove highlight after animation
                setTimeout(() => {
                    emailInput.style.boxShadow = '';
                    emailInput.style.borderColor = '';
                    emailInput.style.transform = '';
                    emailInput.classList.remove('highlight-pulse');
                }, 2000);
            }, isMobile ? 800 : 500);
        }
    }
}

// AI Typing Effect
function typeText(element, text, speed = 50) {
    return new Promise((resolve) => {
        element.textContent = '';
        element.style.display = 'block';
        let i = 0;
        
        function typeChar() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            } else {
                resolve();
            }
        }
        
        typeChar();
    });
}

// Show AI Message in the input box
function showAIMessage(type, message) {
    const input = document.getElementById('emailInput');
    const promptBox = input.closest('.prompt-box');
    
    // Store original state
    const originalPlaceholder = input.placeholder;
    const originalValue = input.value;
    
    // Clear input and disable it temporarily
    input.value = '';
    input.placeholder = '';
    input.disabled = true;
    
    // Add visual feedback class
    promptBox.classList.add(type === 'success' ? 'ai-responding-success' : 'ai-responding-error');
    
    // Show typing dots in placeholder first
    let dots = '';
    const showTypingDots = () => {
        dots = dots.length >= 3 ? '' : dots + '•';
        input.placeholder = dots;
    };
    
    const typingInterval = setInterval(showTypingDots, 200);
    
    // After 800ms, start typing the message
    setTimeout(async () => {
        clearInterval(typingInterval);
        input.placeholder = '';
        
        // Type the AI message character by character
        await typeTextInInput(input, message, 25);
        
        // Auto-clear and restore after 4 seconds
        setTimeout(() => {
            input.placeholder = originalPlaceholder;
            input.disabled = false;
            promptBox.classList.remove('ai-responding-success', 'ai-responding-error');
            input.focus();
        }, 4000);
            }, 800);
}

// Type text directly in the input placeholder
function typeTextInInput(input, text, speed = 50) {
    return new Promise((resolve) => {
        let i = 0;
        
        function typeChar() {
            if (i < text.length) {
                input.placeholder += text.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            } else {
                resolve();
            }
        }
        
        typeChar();
    });
}

// Enhanced form submission with AI responses
function handleInlineSignup(event) {
    event.preventDefault();
    
    const emailInput = event.target.querySelector('.prompt-input');
    const email = emailInput.value.trim();
    
    if (!email) return;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        // Show AI error message
        const errorMessages = [
            "Hmm, that email doesn't look quite right. Could you double-check it for me?",
            "Oops! That email format seems a bit off. Mind trying again?",
            "I'm having trouble with that email format. Could you give it another shot?"
        ];
        const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        showAIMessage('error', randomError);
        
        // Haptic feedback on mobile
        if (isMobile && 'vibrate' in navigator) {
            navigator.vibrate(200);
        }
        return;
    }
    
    // Show AI success message
    const successMessages = [
        "🎉 You're on the list! See you this summer.",
        "✨ All set! You'll be the first to know.",
        "🚀 You're in! Exciting things coming soon."
    ];
    const randomSuccess = successMessages[Math.floor(Math.random() * successMessages.length)];
    showAIMessage('success', randomSuccess);
    
    // Clear form
    emailInput.value = '';
    
    // Hide mobile keyboard
    if (isMobile) {
        document.activeElement.blur();
    }
    
    // Provide haptic feedback on mobile
    if (isMobile && 'vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
    }
    
    // Trigger waitlist counter increment
    setTimeout(() => {
        incrementWaitlistCount();
    }, 2000);
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced notification system with mobile optimization
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const bgColor = type === 'error' ? '#ef4444' : 
                   type === 'success' ? '#10b981' : '#3b82f6';
    
    // Mobile-responsive positioning
    const isMobileSize = window.innerWidth <= 768;
    const topPosition = isMobileSize ? '10px' : '20px';
    const rightPosition = isMobileSize ? '10px' : '20px';
    const maxWidth = isMobileSize ? 'calc(100vw - 20px)' : '350px';
    const fontSize = isMobileSize ? '13px' : '14px';
    
    notification.style.cssText = `
        position: fixed;
        top: ${topPosition};
        right: ${rightPosition};
        background: ${bgColor};
        color: white;
        padding: ${isMobileSize ? '12px 16px' : '16px 20px'};
        border-radius: 12px;
        font-size: ${fontSize};
        font-weight: 500;
        z-index: 3000;
        opacity: 0;
        transform: translateX(100px) scale(0.8);
        transition: all 300ms ease;
        max-width: ${maxWidth};
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        word-wrap: break-word;
        text-align: center;
    `;
    
    document.body.appendChild(notification);
    
    // Trigger entrance animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0) scale(1)';
    }, 10);
    
    // Remove notification after 5 seconds (4 seconds on mobile for better UX)
    const duration = isMobileSize ? 4000 : 5000;
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px) scale(0.8)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Enhanced ripple effect with mobile optimization
function createRipple(button, event) {
    // Skip ripple on touch devices to avoid double effects
    if (supportsTouchEvents && event.type === 'click') {
        return;
    }
    
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    let x, y;
    if (event.touches && event.touches[0]) {
        // Touch event
        x = event.touches[0].clientX - rect.left - size / 2;
        y = event.touches[0].clientY - rect.top - size / 2;
    } else {
        // Mouse event
        x = event.clientX - rect.left - size / 2;
        y = event.clientY - rect.top - size / 2;
    }
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        transform: scale(0);
        animation: ripple 600ms ease-out forwards;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// Initialize interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add enhanced button interactions
    const submitButton = document.querySelector('.submit-btn');
    if (submitButton) {
        if (supportsTouchEvents) {
            submitButton.addEventListener('touchstart', function(e) {
                createRipple(submitButton, e);
            }, { passive: true });
        } else {
            submitButton.addEventListener('click', function(e) {
                createRipple(submitButton, e);
            });
        }
    }
    
    // Add enhanced feature card interactions
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        if (supportsTouchEvents) {
            card.addEventListener('touchstart', function(e) {
                createRipple(card, e);
            }, { passive: true });
        } else {
            card.addEventListener('click', function(e) {
                createRipple(card, e);
            });
        }
    });
    
    // Add enhanced badge interactions with mobile considerations
    const statusBadge = document.querySelector('.status-badge');
    if (statusBadge) {
        if (!supportsTouchEvents) {
            statusBadge.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(0, 0, 0, 0.08)';
                this.style.transform = 'scale(1.05)';
            });
            
            statusBadge.addEventListener('mouseleave', function() {
                this.style.background = 'rgba(0, 0, 0, 0.05)';
                this.style.transform = '';
            });
        }
    }
    
    // Mobile keyboard handling
    if (isMobile) {
        const emailInput = document.querySelector('.email-input');
        if (emailInput) {
            // Prevent zoom on iOS when focusing input
            if (isIOS) {
                emailInput.addEventListener('focus', function() {
                    this.style.fontSize = '16px';
                });
                
                emailInput.addEventListener('blur', function() {
                    this.style.fontSize = '';
                });
            }
            
            // Handle virtual keyboard on Android
            if (isAndroid) {
                let initialViewportHeight = window.innerHeight;
                
                emailInput.addEventListener('focus', function() {
                    setTimeout(() => {
                        if (window.innerHeight < initialViewportHeight * 0.8) {
                            document.body.style.transform = 'translateY(-50px)';
                        }
                    }, 300);
                });
                
                emailInput.addEventListener('blur', function() {
                    document.body.style.transform = '';
                });
            }
        }
    }
    
    // Performance optimizations for mobile
    if (isMobile) {
        // Lazy load non-critical animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.1 });
        
        const animatedElements = document.querySelectorAll('.features-grid, .partners-section');
        animatedElements.forEach(el => observer.observe(el));
    }
});

// Handle orientation change on mobile
if (isMobile) {
    window.addEventListener('orientationchange', function() {
        // Hide address bar on mobile browsers
        setTimeout(() => {
            window.scrollTo(0, 1);
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 100);
        }, 500);
    });
}

// Add additional CSS styles dynamically for enhanced animations and mobile support
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    /* Mobile viewport fix */
    .main-content {
        min-height: calc(var(--vh, 1vh) * 100 - 160px);
    }
    
    /* Touch device optimizations */
    .touch-device .hui-card.feature-card:hover,
    .touch-device .hui-card.partner-logo:hover,
    .touch-device .hui-btn.submit-btn:hover,
    .touch-device .hui-btn.waitlist-btn:hover,
    .touch-device .status-badge:hover {
        transform: none !important;
        background: initial !important;
        border-color: initial !important;
        box-shadow: initial !important;
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .submit-btn {
        position: relative;
        overflow: hidden;
    }
    
    .feature-card {
        position: relative;
        overflow: hidden;
    }
    
    /* Enhanced input focus states for mobile */
    .email-input:focus {
        outline: none;
    }
    
    /* Mobile-specific improvements */
    @media (max-width: 768px) {
        /* Improve tap targets */
        .hui-btn, .feature-card, .partner-logo {
            min-height: 44px;
            min-width: 44px;
        }
        
        /* Better touch feedback */
        .hui-btn:active,
        .feature-card:active,
        .partner-logo:active {
            opacity: 0.8;
            transform: scale(0.98) !important;
        }
        
        /* Optimize text selection on mobile */
        .main-headline,
        .subtitle,
        .feature-text,
        .logo-text-partner {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        
        /* Input optimizations */
        .email-input {
            -webkit-appearance: none;
            border-radius: 0;
        }
        
        /* Notification improvements for mobile */
        .notification {
            font-size: 13px !important;
            padding: 12px 16px !important;
            margin: 0 10px;
        }
    }
    
    /* iOS specific fixes */
    @supports (-webkit-touch-callout: none) {
        .email-input {
            font-size: 16px !important; /* Prevent zoom */
        }
        
        /* Fix for iOS Safari */
        .hui-btn.submit-btn {
            -webkit-appearance: none;
            border-radius: 50px;
        }
    }
    
    /* Android specific fixes */
    @media (max-width: 768px) and (-webkit-min-device-pixel-ratio: 1) {
        .background-video {
            filter: blur(1px);
        }
    }
    
    /* Reduce motion for users who prefer it */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .word {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
        }
        
        .subtitle,
        .features-grid,
        .signup-section {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
        }
        
        /* Disable transform animations for reduced motion */
        .hui-btn,
        .feature-card,
        .partner-logo {
            transform: none !important;
        }
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
        .hui-card.feature-card,
        .hui-card.partner-logo {
            border-width: 2px !important;
        }
        
        .hui-btn.submit-btn {
            border: 2px solid #000 !important;
        }
    }
`;
document.head.appendChild(additionalStyles); 