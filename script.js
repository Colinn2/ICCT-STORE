// script.js
console.log('🚀 Script loaded!');

// Sticky Navbar on Scroll
const mainNav = document.querySelector('.main-nav');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }
});

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const cartToggle = document.getElementById('cartToggle');
const closeCart = document.getElementById('closeCart');
const cartSidebar = document.getElementById('cartSidebar');
const wishlistToggle = document.getElementById('wishlistToggle');
const closeWishlist = document.getElementById('closeWishlist');
const wishlistSidebar = document.getElementById('wishlistSidebar');
const overlay = document.getElementById('overlay');
const carouselTrack = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('.cart-count');
const wishlistCount = document.querySelector('.wishlist-count');
const cartItems = document.querySelector('.cart-items');
const wishlistItems = document.querySelector('.wishlist-items');
const cartTotal = document.querySelector('.cart-total span');
const checkoutBtn = document.querySelector('.checkout-btn');
const continueShopping = document.querySelector('.continue-shopping');
const heroIndicators = document.querySelectorAll('.indicator');
const loginModal = document.getElementById('loginModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const loginForm = document.getElementById('loginForm');
const togglePassword = document.getElementById('togglePassword');
const profileToggle = document.getElementById('profileToggle');
const accountSidebar = document.getElementById('accountSidebar');
const closeAccount = document.getElementById('closeAccount');
const accountLoginBtn = document.getElementById('accountLoginBtn');
const accountNotLoggedIn = document.getElementById('accountNotLoggedIn');
const accountLoggedIn = document.getElementById('accountLoggedIn');
const logoutBtn = document.getElementById('logoutBtn');
const transactionList = document.getElementById('transactionList');
const transactionCount = document.getElementById('transactionCount');
const accountUserName = document.getElementById('accountUserName');
const accountUserEmail = document.getElementById('accountUserEmail');
const accountStudentNumber = document.getElementById('accountStudentNumber');
const successModal = document.getElementById('successModal');
const successTitle = document.getElementById('successTitle');
const successMessage = document.getElementById('successMessage');
const successBtn = document.getElementById('successBtn');
const confirmModal = document.getElementById('confirmModal');
const confirmTitle = document.getElementById('confirmTitle');
const confirmMessage = document.getElementById('confirmMessage');
const confirmOkBtn = document.getElementById('confirmOkBtn');
const confirmCancelBtn = document.getElementById('confirmCancelBtn');

// Cart State
let cart = [];
let wishlist = [];
let currentSlide = 0;
let isLoggedIn = false;
let currentUser = null;
let transactionHistory = [];
let carouselPosition = 0;
let confirmCallback = null; // Store callback for confirm modal

// Success Modal Functions
function showSuccessModal(title, message) {
    if (successModal && successTitle && successMessage) {
        successTitle.textContent = title;
        successMessage.textContent = message;
        successModal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSuccessModal() {
    if (successModal) {
        successModal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Confirm Modal Functions
function showConfirmModal(title, message, callback) {
    if (confirmModal && confirmTitle && confirmMessage) {
        confirmTitle.textContent = title;
        confirmMessage.textContent = message;
        confirmCallback = callback;
        confirmModal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeConfirmModal() {
    if (confirmModal) {
        confirmModal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        confirmCallback = null;
    }
}

// Success Modal Close Button
if (successBtn) {
    successBtn.addEventListener('click', closeSuccessModal);
}

// Confirm Modal Buttons
if (confirmOkBtn) {
    confirmOkBtn.addEventListener('click', () => {
        if (confirmCallback) {
            confirmCallback(true);
        }
        closeConfirmModal();
    });
}

if (confirmCancelBtn) {
    confirmCancelBtn.addEventListener('click', () => {
        if (confirmCallback) {
            confirmCallback(false);
        }
        closeConfirmModal();
    });
}

const carouselItemWidth = 280; // Width + gap

// ===== CATEGORY NAVIGATION =====
// API Configuration
// Dynamically determine API URL based on current host
let API_BASE_URL;
if (window.location.hostname === 'localhost') {
    // Local development
    API_BASE_URL = 'http://localhost:8080';
} else if (window.location.hostname.includes('app.github.dev')) {
    // GitHub Codespaces - use same protocol (HTTPS) and replace port
    const protocol = window.location.protocol; // Will be 'https:'
    const host = window.location.host.replace('-8000.', '-8080.');
    API_BASE_URL = `${protocol}//${host}`;
} else {
    // GitHub Pages or other - use relative path (won't work without backend)
    API_BASE_URL = 'http://localhost:8080'; // Fallback
    console.warn('⚠️ Running on GitHub Pages - API server not available!');
    console.warn('⚠️ Please use GitHub Codespaces to test the full functionality');
}

console.log('🔗 API URL:', API_BASE_URL);
console.log('🌐 Current hostname:', window.location.hostname);
console.log('🌐 Protocol:', window.location.protocol);

// Initialize after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM Content Loaded!');
    const categoryLinks = document.querySelectorAll('.category-link');
    const categorySections = document.querySelectorAll('.category-section');
    const backButtons = document.querySelectorAll('.back-btn');
    const productShowcase = document.querySelector('.product-showcase');
    const backToSchoolSection = document.querySelector('.back-to-school');

    console.log('📋 Category Links found:', categoryLinks.length);
    console.log('📋 Category Sections found:', categorySections.length);

    // Fetch and display products from database (with static fallback)
    async function loadProducts(categorySlug) {
        const isCodespaces = window.location.hostname.includes('app.github.dev');
        const isLocalhost = window.location.hostname === 'localhost';
        
        // Try API first (if in development environment)
        if (isCodespaces || isLocalhost) {
            try {
                const url = `${API_BASE_URL}/?action=products&category=${categorySlug}`;
                console.log('🔄 Loading products from API:', url);
                console.log('⏳ Fetching data...');
                
                const response = await fetch(url);
                console.log('📡 Response received:', response.status, response.statusText);
                
                if (response.ok) {
                    const result = await response.json();
                    
                    console.log('✅ API Response received');
                    console.log('📊 Response data:', result);
                    console.log('✅ Success?', result.success);
                    console.log('📦 Products count:', result.data ? result.data.length : 0);
                    
                    if (result.success && result.data) {
                        console.log('✅ Using MySQL database - Returning', result.data.length, 'products');
                        if (result.data.length > 0) {
                            console.log('📋 First product:', result.data[0].name);
                        }
                        return result.data;
                    }
                }
                
                console.warn('⚠️ API response not OK, falling back to static data');
            } catch (error) {
                console.warn('⚠️ API fetch failed:', error.message);
                console.log('📦 Falling back to static product data...');
            }
        }
        
        // Fallback to static data (GitHub Pages or API unavailable)
        console.log('📦 Using static product data for category:', categorySlug);
        
        // Check if STATIC_PRODUCTS is available
        if (typeof STATIC_PRODUCTS === 'undefined') {
            console.error('❌ Static product data not loaded!');
            showSuccessModal('Data Error', '⚠️ Product data not available. Please ensure products-data.js is loaded.');
            return [];
        }
        
        const products = STATIC_PRODUCTS[categorySlug] || [];
        console.log('✅ Loaded', products.length, 'products from static data');
        
        // Show info banner if on GitHub Pages
        if (!isCodespaces && !isLocalhost) {
            showStaticModeNotice();
        }
        
        return products;
    }
    
    // Show notice when using static data
    function showStaticModeNotice() {
        // Only show once per session
        if (sessionStorage.getItem('staticModeNoticeShown')) {
            return;
        }
        
        const notice = document.createElement('div');
        notice.className = 'static-mode-notice';
        notice.innerHTML = `
            <div class="notice-content">
                <span class="notice-icon">ℹ️</span>
                <span class="notice-text">
                    You're viewing the static demo. 
                    <a href="https://github.com/Colinn2/ICCT-STORE#-how-to-run-github-codespaces" target="_blank">
                        Open in Codespaces
                    </a> for full database features.
                </span>
                <button class="notice-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        document.body.appendChild(notice);
        sessionStorage.setItem('staticModeNoticeShown', 'true');
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (notice.parentElement) {
                notice.style.opacity = '0';
                setTimeout(() => notice.remove(), 300);
            }
        }, 10000);
    }

    // Render products in the grid
    function renderProducts(products, containerId) {
        console.log('🎨 ===== RENDER PRODUCTS START =====');
        console.log('🎨 Rendering products for:', containerId);
        console.log('🎨 Number of products:', products.length);
        
        const selector = `#${containerId} .products-grid`;
        console.log('🎨 Looking for container with selector:', selector);
        
        const container = document.querySelector(selector);
        console.log('📦 Container element:', container);
        console.log('📦 Container found:', container ? 'YES ✅' : 'NO ❌');
        
        if (!container) {
            console.error('❌ Container not found for selector:', selector);
            showSuccessModal('Container Error', `ERROR: Cannot find container for ${containerId}`);
            return;
        }
        
        console.log('🗑️ Clearing existing products...');
        console.log('🗑️ Current HTML length:', container.innerHTML.length);
        container.innerHTML = ''; // Clear existing products
        console.log('✅ Container cleared');
        
        if (products.length === 0) {
            console.warn('⚠️ No products to display');
            container.innerHTML = '<p class="no-products">No products available in this category.</p>';
            return;
        }
        
        console.log('🔨 Creating product cards...');
        products.forEach((product, index) => {
            console.log(`  ${index + 1}. Creating card for: ${product.name}`);
            
            // Get product ID and check stock from localStorage
            const productId = product.id || product.name.toLowerCase().replace(/\s+/g, '-');
            const stockKey = `stock_${productId}`;
            let currentStock = parseInt(localStorage.getItem(stockKey)) || product.stock_quantity || 50;
            const isOutOfStock = currentStock <= 0;
            
            // Check if this is a service category (documents or fees) - no stock needed
            const isServiceCategory = containerId === 'documents' || containerId === 'fees';
            
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.productId = productId;
            productCard.innerHTML = `
                <div class="product-image">
                    ${product.image_url ? `<img src="${product.image_url}" alt="${product.name}">` : `<div class="image-placeholder">${product.name}</div>`}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    ${product.description ? `<p class="product-desc">${product.description}</p>` : ''}
                    <p class="price">₱${parseFloat(product.price).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    ${!isServiceCategory ? `<div class="stock-display">
                        <i class="fas fa-box"></i>
                        <span class="stock-text ${isOutOfStock ? 'out-of-stock-text' : ''}">
                            Stock: ${currentStock}
                        </span>
                    </div>` : ''}
                    <div class="product-actions">
                        ${(!isOutOfStock || isServiceCategory) ? 
                            `<button class="buy-now-btn" title="Buy Now" data-product-id="${productId}">
                                <i class="fas fa-shopping-bag"></i>
                             </button>
                             <button class="add-to-cart" title="Add to Cart" data-product-id="${productId}" data-product-name="${product.name}" data-product-price="${product.price}">
                                <i class="fas fa-cart-plus"></i>
                             </button>
                             <button class="love-btn" title="Add to Wishlist" data-product-id="${productId}" data-product-name="${product.name}">
                                <i class="far fa-heart"></i>
                             </button>` : 
                            `<button class="out-of-stock-btn" disabled>
                                <i class="fas fa-ban"></i> Out of Stock
                             </button>`
                        }
                    </div>
                </div>
            `;
            container.appendChild(productCard);
        });
        
        // Add event listeners for Add to Cart buttons
        const addToCartButtons = container.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Change icon to checkmark
                const icon = this.querySelector('i');
                icon.className = 'fas fa-check';
                
                // Change button color to indicate success
                this.style.background = '#4caf50';
                this.title = 'Added to Cart';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    icon.className = 'fas fa-cart-plus';
                    this.style.background = '';
                    this.title = 'Add to Cart';
                }, 2000);
            });
        });
        
        // Add event listeners for Love/Wishlist buttons
        const loveButtons = container.querySelectorAll('.love-btn');
        loveButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('₱', '').replace(',', ''));
                
                // Toggle - returns true if added, false if removed
                const added = addToWishlist(productName, productPrice);
                
                const icon = this.querySelector('i');
                
                if (added) {
                    // Added to wishlist - show filled red heart
                    icon.className = 'fas fa-heart';
                    icon.style.color = '#ff4757';
                    this.style.background = '#ff4757';
                    this.title = 'Remove from Favorites';
                    
                    // Open wishlist sidebar
                    setTimeout(() => {
                        wishlistSidebar.classList.add('active');
                        overlay.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }, 300);
                } else {
                    // Removed from wishlist - show outline heart
                    icon.className = 'far fa-heart';
                    icon.style.color = '';
                    this.style.background = '';
                    this.title = 'Add to Wishlist';
                }
            });
        });
        
        console.log('✅ Rendered', products.length, 'products to container');
        console.log('✅ Final HTML length:', container.innerHTML.length);
        console.log('✅ Product cards in DOM:', container.querySelectorAll('.product-card').length);
        console.log('🎨 ===== RENDER PRODUCTS END =====');
    }

    // Show Category Section
    async function showCategory(categoryId) {
        console.log('🎯 ===== SHOW CATEGORY START =====');
        console.log('🎯 Category ID:', categoryId);
        
        // Hide all OTHER category sections (not the one we're showing)
        categorySections.forEach(section => {
            if (section.id !== categoryId) {
                section.classList.add('hidden');
                section.style.display = 'none';
            }
        });

        // IMPORTANT: Also hide search results when navigating to categories
        const searchSection = document.getElementById('search-results');
        if (searchSection && searchSection.id !== categoryId) {
            searchSection.classList.add('hidden');
            searchSection.style.display = 'none';
            console.log('🔍 Search results cleared');
        }
        
        // Keep homepage sections visible (Popular Uniforms, Back to School)
        if (productShowcase) productShowcase.style.display = 'block';
        if (backToSchoolSection) backToSchoolSection.style.display = 'block';
        
        // Show selected category
        const selectedSection = document.getElementById(categoryId);
        console.log('📄 Looking for section with ID:', categoryId);
        console.log('📄 Selected section:', selectedSection);
        console.log('📄 Section found:', selectedSection ? 'YES ✅' : 'NO ❌');
        
        if (selectedSection) {
            console.log('👁️ Making section visible...');
            selectedSection.classList.remove('hidden');
            selectedSection.style.display = 'block';
            console.log('✅ Section displayed:', categoryId);
            
            // Skip product loading for info sections (payment, FAQ, supplies info)
            const infoSections = ['payment', 'about', 'contact'];
            if (!infoSections.includes(categoryId)) {
                // Load products from database
                console.log('🔄 ===== LOADING PRODUCTS =====');
                console.log('🔄 Category slug:', categoryId);
                const products = await loadProducts(categoryId);
                console.log('📦 Products received:', products.length);
                
                if (products.length > 0) {
                    console.log('📋 Sample products:');
                    products.slice(0, 3).forEach((p, i) => {
                        console.log(`  ${i+1}. ${p.name} - ₱${p.price}`);
                    });
                }
                
                console.log('🔄 ===== CALLING RENDER =====');
                renderProducts(products, categoryId);
                console.log('🔄 ===== RENDER COMPLETE =====');
            } else {
                console.log(`ℹ️ ${categoryId} section - displaying info only (no products)`);
            }
            
            // Scroll to the section with navbar visible
            setTimeout(() => {
                const navbar = document.querySelector('.header');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const sectionTop = selectedSection.offsetTop - navbarHeight - 20; // 20px extra padding
                
                console.log('📜 Scrolling to section...');
                window.scrollTo({
                    top: sectionTop,
                    behavior: 'smooth'
                });
            }, 100); // Small delay to ensure display change is applied
            
            console.log('🎯 ===== SHOW CATEGORY END =====');
        } else {
            console.error('❌ Section not found:', categoryId);
            showSuccessModal('Section Error', `ERROR: Cannot find section with ID: ${categoryId}`);
        }
    }

    // Show Home (hide category sections)
    function showHome() {
        console.log('showHome called');
        categorySections.forEach(section => {
            section.classList.add('hidden');
            section.style.display = 'none';
        });
        if (productShowcase) productShowcase.style.display = 'block';
        if (backToSchoolSection) backToSchoolSection.style.display = 'block';
        
        // Scroll to hero section (just below navbar)
        const hero = document.querySelector('.hero');
        if (hero) {
            const navbar = document.querySelector('.header');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const heroTop = hero.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: heroTop,
                behavior: 'smooth'
            });
        }
    }

    // Category Link Click Events
    categoryLinks.forEach((link, index) => {
        console.log('Setting up listener for link', index, link.href);
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Category link clicked!', e.target);
            const categoryId = link.getAttribute('href').substring(1); // Remove '#'
            showCategory(categoryId);
            
            // Close dropdown menu
            const dropdownParent = link.closest('.dropdown');
            if (dropdownParent) {
                dropdownParent.classList.remove('active');
            }
        });
    });

    // Back Button Click Events
    backButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showHome();
        });
    });

    // Home Link Navigation
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            showHome();
        });
    }

    // Payment Link Navigation
    const paymentLink = document.querySelector('a[href="#payment"]');
    if (paymentLink) {
        paymentLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Payment link clicked!');
            showCategory('payment');
        });
    }

    // FAQ Link Navigation
    const faqLink = document.querySelector('a[href="#about"]');
    if (faqLink) {
        faqLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('FAQ link clicked!');
            showCategory('about');
        });
    }

    // Supplies Info Link Navigation
    const suppliesLink = document.querySelector('a[href="#contact"]');
    if (suppliesLink) {
        suppliesLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Supplies Info link clicked!');
            showCategory('contact');
        });
    }

    // Hero slider navigation buttons
    console.log('🎯 Setting up hero slider buttons...');
    const heroButtons = document.querySelectorAll('.hero-shop-btn');
    console.log('🎯 Found hero buttons:', heroButtons.length);
    
    heroButtons.forEach((button, index) => {
        console.log(`🎯 Button ${index}: category="${button.dataset.category}"`);
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Get category from the button that was actually clicked
            const category = e.currentTarget.getAttribute('data-category');
            console.log('🎯 Hero button clicked! Category:', category);
            
            if (category) {
                console.log('🎯 Calling showCategory with:', category);
                showCategory(category);
            } else {
                console.error('❌ No category found on button!');
            }
        });
    });

    // Auto-open all-products on static/demo environments so users see items immediately
    try {
        const isCodespaces = window.location.hostname.includes('app.github.dev');
        const isLocalhost = window.location.hostname === 'localhost';
        if (!isCodespaces && !isLocalhost) {
            console.log('🔎 Detected static/demo environment — auto-loading all-products for preview');
            // Small delay to ensure DOM & styles are applied
            setTimeout(() => {
                showCategory('all-products');
            }, 250);
        }
    } catch (e) {
        console.warn('Auto-load skipped (error):', e && e.message);
    }

    // Ensure home is shown on page load
    console.log('🏠 Initializing home view...');
    showHome();
});

// ===== END CATEGORY NAVIGATION =====

// Handle Shop Dropdown
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdown = document.querySelector('.dropdown');

if (dropdown && dropdownToggle) {
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });

    // Toggle dropdown on click
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });
}

// Toggle Mobile Menu
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Toggle Cart Sidebar
if (cartToggle && cartSidebar && overlay) {
    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeCart && cartSidebar && overlay) {
    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (overlay && cartSidebar) {
    overlay.addEventListener('click', () => {
        // Close confirm modal if open
        if (confirmModal && confirmModal.classList.contains('active')) {
            if (confirmCallback) {
                confirmCallback(false);
            }
            closeConfirmModal();
            return;
        }
        // Close success modal if open
        if (successModal && successModal.classList.contains('active')) {
            closeSuccessModal();
            return;
        }
        // Close login modal if open
        if (loginModal && loginModal.classList.contains('active')) {
            loginModal.classList.remove('active');
        }
        // Close cart, wishlist, and account sidebar
        cartSidebar.classList.remove('active');
        wishlistSidebar.classList.remove('active');
        accountSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Continue Shopping Button
if (continueShopping && cartSidebar && overlay) {
    continueShopping.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Toggle Wishlist Sidebar
if (wishlistToggle && wishlistSidebar && overlay) {
    wishlistToggle.addEventListener('click', () => {
        wishlistSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeWishlist && wishlistSidebar && overlay) {
    closeWishlist.addEventListener('click', () => {
        wishlistSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// ===== ACCOUNT SIDEBAR =====
// Toggle Account Sidebar
if (profileToggle && accountSidebar && overlay) {
    profileToggle.addEventListener('click', () => {
        accountSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateAccountDisplay();
    });
}

// Close Account Sidebar
if (closeAccount && accountSidebar && overlay) {
    closeAccount.addEventListener('click', () => {
        accountSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Account Login Button (opens login modal)
if (accountLoginBtn && loginModal) {
    accountLoginBtn.addEventListener('click', () => {
        accountSidebar.classList.remove('active');
        openLoginModal();
    });
}

// Logout Button
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        showConfirmModal('Confirm Sign Out', 'Are you sure you want to sign out?', (confirmed) => {
            if (confirmed) {
                isLoggedIn = false;
                currentUser = null;
                transactionHistory = [];
                updateAccountDisplay();
                accountSidebar.classList.remove('active');
                
                // Show success modal instead of alert
                setTimeout(() => {
                    showSuccessModal('Signed Out Successfully', 'You have been logged out. See you next time!');
                }, 300);
            }
        });
    });
}

// Continue Shopping Button for Wishlist
const continueShoppingWishlist = document.querySelector('.continue-shopping-wishlist');
if (continueShoppingWishlist && wishlistSidebar && overlay) {
    continueShoppingWishlist.addEventListener('click', () => {
        wishlistSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Carousel Navigation
if (prevBtn && nextBtn && carouselTrack) {
    prevBtn.addEventListener('click', () => {
        if (carouselPosition < 0) {
            carouselPosition += carouselItemWidth;
            carouselTrack.style.transform = `translateX(${carouselPosition}px)`;
        }
    });

    nextBtn.addEventListener('click', () => {
        const maxPosition = -carouselItemWidth * (carouselTrack.children.length - 4);
        if (carouselPosition > maxPosition) {
            carouselPosition -= carouselItemWidth;
            carouselTrack.style.transform = `translateX(${carouselPosition}px)`;
        }
    });
}

// Add to Cart Functionality - Delegate to dynamic elements
document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart')) {
        const button = e.target.closest('.add-to-cart');
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('₱', '').replace(',', ''));
        
        addToCart(productName, productPrice);
        
        // Visual feedback
        button.textContent = 'Added!';
        button.style.background = '#28a745';
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.background = '';
        }, 1500);
    }
    
    // Handle banner "Add to Cart" buttons
    if (e.target.closest('.add-to-cart-btn')) {
        const button = e.target.closest('.add-to-cart-btn');
        const banner = button.closest('.uniform-banner');
        const productName = banner.querySelector('.banner-title').textContent;
        const priceText = banner.querySelector('.banner-price').textContent;
        const productPrice = parseFloat(priceText.replace('₱', '').replace(',', ''));
        
        addToCart(productName, productPrice);
        
        // Visual feedback
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Added!';
        button.style.background = '#28a745';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 1500);
    }
    
    // Handle sportsfest "Add to Cart" button
    if (e.target.closest('.sportsfest-add-to-cart')) {
        const button = e.target.closest('.sportsfest-add-to-cart');
        const productName = button.dataset.product;
        const productPrice = parseFloat(button.dataset.price);
        
        addToCart(productName, productPrice);
        
        // Visual feedback
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Added!';
        button.style.background = '#28a745';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 1500);
    }
});

// Add to Cart Function
function addToCart(name, price, size = null, installments = null) {
    // Check if item needs size selection (uniforms, jackets, hoodies, shirts)
    const needsSize = name.toLowerCase().includes('uniform') || 
                      name.toLowerCase().includes('jacket') || 
                      name.toLowerCase().includes('hoodie') || 
                      name.toLowerCase().includes('shirt') ||
                      name.toLowerCase().includes('t-shirt');
    
    // Check if item needs installment plan (Tuition Installment)
    const needsInstallment = name.toLowerCase().includes('tuition installment');
    
    // If needs size but no size provided, default to 'M'
    if (needsSize && !size) {
        size = 'M';
    }
    
    // If needs installment but no installment provided, default to 1
    if (needsInstallment && !installments) {
        installments = 1;
    }
    
    // Check for max quantity limits
    let maxQuantity = null;
    if (name.toLowerCase().includes('completion of incomplete grade')) {
        maxQuantity = 7;
    } else if (name.toLowerCase().includes('dropped subject')) {
        maxQuantity = 5;
    }
    
    // Create unique identifier with size/installment if applicable
    let itemKey = name;
    if (needsSize && size) itemKey += `|size:${size}`;
    if (needsInstallment && installments) itemKey += `|inst:${installments}`;
    
    const existingItem = cart.find(item => {
        let existingKey = item.name;
        if (item.size) existingKey += `|size:${item.size}`;
        if (item.installments) existingKey += `|inst:${item.installments}`;
        return existingKey === itemKey;
    });
    
    if (existingItem) {
        // Check max quantity limit before incrementing
        if (maxQuantity && existingItem.quantity >= maxQuantity) {
            showSuccessModal('Quantity Limit', `⚠️ Maximum quantity for ${name} is ${maxQuantity}.`);
            return;
        }
        existingItem.quantity += 1;
    } else {
        const newItem = {
            name,
            price,
            quantity: 1
        };
        if (needsSize) {
            newItem.size = size;
        }
        if (needsInstallment) {
            newItem.installments = installments;
            // Calculate installment price: 10k for 1 installment, up to 50k for 10 installments
            newItem.basePrice = price; // Store original price
            newItem.price = 10000 + ((installments - 1) * (40000 / 9)); // Linear scale from 10k to 50k
        }
        if (maxQuantity) {
            newItem.maxQuantity = maxQuantity;
        }
        cart.push(newItem);
    }
    
    updateCart();
}

// Update Cart Display
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        document.querySelector('.empty-cart').style.display = 'block';
        document.querySelector('.cart-footer').style.display = 'none';
    } else {
        document.querySelector('.empty-cart').style.display = 'none';
        document.querySelector('.cart-footer').style.display = 'block';
        
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            // Check if item has size option
            const hasSizeOption = item.size !== undefined;
            const sizeSelector = hasSizeOption ? `
                <div class="size-selector-cart">
                    <label for="size-${index}">Size:</label>
                    <select id="size-${index}" class="cart-size-select" data-index="${index}">
                        <option value="S" ${item.size === 'S' ? 'selected' : ''}>Small</option>
                        <option value="M" ${item.size === 'M' ? 'selected' : ''}>Medium</option>
                        <option value="L" ${item.size === 'L' ? 'selected' : ''}>Large</option>
                        <option value="XL" ${item.size === 'XL' ? 'selected' : ''}>XL</option>
                        <option value="2XL" ${item.size === '2XL' ? 'selected' : ''}>2XL</option>
                    </select>
                </div>
            ` : '';
            
            // Check if item has installment option
            const hasInstallmentOption = item.installments !== undefined;
            const installmentSelector = hasInstallmentOption ? `
                <div class="installment-selector-cart">
                    <label for="installment-${index}">Installments:</label>
                    <select id="installment-${index}" class="cart-installment-select" data-index="${index}">
                        ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => 
                            `<option value="${num}" ${item.installments === num ? 'selected' : ''}>${num} ${num === 1 ? 'payment' : 'payments'}</option>`
                        ).join('')}
                    </select>
                    <p class="installment-info">Total: ₱${item.price.toFixed(2)} (₱${(item.price / item.installments).toFixed(2)}/payment)</p>
                </div>
            ` : '';
            
            // Show max quantity warning if applicable
            const maxQuantityWarning = item.maxQuantity && item.quantity >= item.maxQuantity ? 
                `<p class="max-qty-warning"><i class="fas fa-exclamation-triangle"></i> Maximum ${item.maxQuantity} allowed</p>` : '';
            
            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    ${sizeSelector}
                    ${installmentSelector}
                    <p>₱${item.price.toFixed(2)} x ${item.quantity}</p>
                    ${maxQuantityWarning}
                </div>
                <div class="cart-item-total">
                    <p>₱${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="remove-item" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemIndex = parseInt(e.target.closest('.remove-item').dataset.index);
                removeFromCart(itemIndex);
            });
        });
        
        // Add event listeners to size selectors
        document.querySelectorAll('.cart-size-select').forEach(select => {
            select.addEventListener('change', (e) => {
                const itemIndex = parseInt(e.target.dataset.index);
                const newSize = e.target.value;
                cart[itemIndex].size = newSize;
                updateCart();
            });
        });
        
        // Add event listeners to installment selectors
        document.querySelectorAll('.cart-installment-select').forEach(select => {
            select.addEventListener('change', (e) => {
                const itemIndex = parseInt(e.target.dataset.index);
                const newInstallments = parseInt(e.target.value);
                cart[itemIndex].installments = newInstallments;
                // Recalculate price: 10k for 1 installment, up to 50k for 10 installments
                cart[itemIndex].price = 10000 + ((newInstallments - 1) * (40000 / 9));
                updateCart();
            });
        });
    }
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `₱${total.toFixed(2)}`;
}

// Remove from Cart Function
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// ===== WISHLIST FUNCTIONS =====

// Add to Wishlist Function
function addToWishlist(name, price, image = null) {
    const existingItemIndex = wishlist.findIndex(item => item.name === name);
    
    if (existingItemIndex === -1) {
        // Not in wishlist - add it
        wishlist.push({
            name,
            price,
            image
        });
        updateWishlist();
        return true; // Added
    } else {
        // Already in wishlist - remove it (toggle)
        wishlist.splice(existingItemIndex, 1);
        updateWishlist();
        return false; // Removed
    }
}

// Remove from Wishlist Function
function removeFromWishlist(index) {
    wishlist.splice(index, 1);
    updateWishlist();
}

// Update Wishlist Display
function updateWishlist() {
    if (!wishlistItems || !wishlistCount) return;
    
    wishlistCount.textContent = wishlist.length;
    wishlistItems.innerHTML = '';
    
    const emptyWishlist = wishlistSidebar.querySelector('.empty-cart');
    
    if (wishlist.length === 0) {
        emptyWishlist.style.display = 'flex';
        wishlistItems.style.display = 'none';
        return;
    }
    
    emptyWishlist.style.display = 'none';
    wishlistItems.style.display = 'block';
    
    wishlist.forEach((item, index) => {
        const wishlistItem = document.createElement('div');
        wishlistItem.className = 'cart-item';
        
        wishlistItem.innerHTML = `
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>₱${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <button class="move-to-cart-btn" data-index="${index}" title="Move to Cart">
                    <i class="fas fa-shopping-cart"></i>
                </button>
                <button class="remove-wishlist-item" data-index="${index}" title="Remove">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        wishlistItems.appendChild(wishlistItem);
    });
    
    // Add event listeners to move to cart buttons
    document.querySelectorAll('.move-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemIndex = parseInt(e.target.closest('.move-to-cart-btn').dataset.index);
            const item = wishlist[itemIndex];
            addToCart(item.name, item.price);
            removeFromWishlist(itemIndex);
            
            // Update all love buttons for this product
            updateLoveButtonsForProduct(item.name);
            
            // Visual feedback
            e.target.closest('button').innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                updateWishlist();
            }, 500);
        });
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-wishlist-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemIndex = parseInt(e.target.closest('.remove-wishlist-item').dataset.index);
            const item = wishlist[itemIndex];
            removeFromWishlist(itemIndex);
            
            // Update all love buttons for this product to show it's removed
            updateLoveButtonsForProduct(item.name);
        });
    });
}

// Helper function to update love button states for a specific product
function updateLoveButtonsForProduct(productName) {
    const allLoveButtons = document.querySelectorAll('.love-btn');
    const isInWishlist = wishlist.some(item => item.name === productName);
    
    allLoveButtons.forEach(button => {
        const productCard = button.closest('.product-card');
        if (productCard) {
            const cardProductName = productCard.querySelector('h3').textContent;
            if (cardProductName === productName) {
                const icon = button.querySelector('i');
                if (isInWishlist) {
                    // In wishlist - show filled red heart
                    icon.className = 'fas fa-heart';
                    icon.style.color = '#ff4757';
                    button.style.background = '#ff4757';
                    button.title = 'Remove from Favorites';
                } else {
                    // Not in wishlist - show outline heart
                    icon.className = 'far fa-heart';
                    icon.style.color = '';
                    button.style.background = '';
                    button.title = 'Add to Wishlist';
                }
            }
        }
    });
}

// Move All to Cart Button
const moveAllToCartBtn = document.querySelector('.move-all-to-cart-btn');
if (moveAllToCartBtn) {
    moveAllToCartBtn.addEventListener('click', () => {
        if (wishlist.length > 0) {
            // Store product names before clearing wishlist
            const productNames = wishlist.map(item => item.name);
            
            wishlist.forEach(item => {
                addToCart(item.name, item.price);
            });
            wishlist = [];
            updateWishlist();
            
            // Update all love buttons for moved products
            productNames.forEach(name => {
                updateLoveButtonsForProduct(name);
            });
            
            // Show success message
            moveAllToCartBtn.innerHTML = '<i class="fas fa-check"></i> Moved to Cart!';
            moveAllToCartBtn.style.background = '#28a745';
            setTimeout(() => {
                moveAllToCartBtn.innerHTML = 'Move All to Cart';
                moveAllToCartBtn.style.background = '';
            }, 2000);
        }
    });
}

// Payment Method Selector - Show Confirm Button
const paymentMethodSelect = document.getElementById('paymentMethod');
const confirmPaymentSection = document.getElementById('confirmPaymentSection');
const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
const paymentReferenceDisplay = document.getElementById('paymentReferenceDisplay');
const referenceNumberElement = document.getElementById('referenceNumber');

// Function to generate random reference number
function generateReferenceNumber(paymentMethod) {
    const prefix = {
        'gcash': 'GC',
        'ecpay': 'EP',
        'cebuana': 'CB',
        'mlhuillier': 'ML'
    };
    
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    
    return `${prefix[paymentMethod]}-${year}${month}${day}-${random}`;
}

if (paymentMethodSelect) {
    paymentMethodSelect.addEventListener('change', function() {
        const selectedMethod = this.value;
        
        if (selectedMethod) {
            // Show confirm button
            confirmPaymentSection.style.display = 'block';
            paymentReferenceDisplay.style.display = 'none';
        } else {
            // Hide everything if no method selected
            confirmPaymentSection.style.display = 'none';
            paymentReferenceDisplay.style.display = 'none';
        }
    });
}

// Confirm Payment Button Click
if (confirmPaymentBtn) {
    confirmPaymentBtn.addEventListener('click', function() {
        const selectedMethod = paymentMethodSelect ? paymentMethodSelect.value : '';
        
        if (selectedMethod) {
            // Generate reference number
            const refNumber = generateReferenceNumber(selectedMethod);
            
            // Display reference number
            referenceNumberElement.textContent = refNumber;
            paymentReferenceDisplay.style.display = 'block';
            confirmPaymentSection.style.display = 'none';
            
            // Show success message
            const methodNames = {
                'gcash': 'GCash',
                'ecpay': 'ECPay',
                'cebuana': 'Cebuana Lhuillier',
                'mlhuillier': 'M Lhuillier'
            };
            
            alert(`Payment method confirmed!\n\nMethod: ${methodNames[selectedMethod]}\nReference Number: ${refNumber}\n\nPlease save this reference number for your transaction.`);
        }
    });
}

// Checkout Button
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            // Check payment method selection
            const paymentMethodSelect = document.getElementById('paymentMethod');
            const selectedPaymentMethod = paymentMethodSelect ? paymentMethodSelect.value : '';
            
            if (!selectedPaymentMethod) {
                showSuccessModal('Payment Method Required', 'Please select a payment method before checkout.');
                if (paymentMethodSelect) {
                    paymentMethodSelect.focus();
                    paymentMethodSelect.style.borderColor = '#ff4444';
                    setTimeout(() => {
                        paymentMethodSelect.style.borderColor = '';
                    }, 2000);
                }
                return;
            }
            
            // Validate payment details form if visible
            const paymentDetailsForm = document.getElementById('paymentDetailsForm');
            if (paymentDetailsForm && paymentDetailsForm.style.display !== 'none') {
                const activeForm = paymentDetailsForm.querySelector('.payment-form[style*="display: block"]');
                if (activeForm) {
                    const requiredInputs = activeForm.querySelectorAll('[required]');
                    let allFilled = true;
                    
                    requiredInputs.forEach(input => {
                        if (!input.value.trim()) {
                            allFilled = false;
                            input.style.borderColor = '#ff4444';
                            setTimeout(() => {
                                input.style.borderColor = '';
                            }, 2000);
                        }
                    });
                    
                    if (!allFilled) {
                        showSuccessModal('Incomplete Payment Details', 'Please fill in all required payment information.');
                        return;
                    }
                }
            }
            
            // Check if user is logged in
            if (!isLoggedIn) {
                // Show login modal
                openLoginModal();
            } else {
                // Proceed with checkout
                proceedToCheckout(selectedPaymentMethod);
            }
        } else {
            showSuccessModal('Cart Empty', 'Your cart is empty. Add some items before checking out.');
        }
    });
}

// Login Modal Functions
function openLoginModal() {
    if (loginModal && overlay) {
        loginModal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLoginModalFunc() {
    if (loginModal && overlay) {
        loginModal.classList.remove('active');
        // Only remove overlay if cart and wishlist are also closed
        if (!cartSidebar.classList.contains('active') && !wishlistSidebar.classList.contains('active')) {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
}

// Close login modal button
if (closeLoginModal) {
    closeLoginModal.addEventListener('click', closeLoginModalFunc);
}

// Toggle password visibility
if (togglePassword) {
    togglePassword.addEventListener('click', () => {
        const passwordInput = document.getElementById('password');
        const icon = togglePassword.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            passwordInput.type = 'password';
            icon.className = 'fas fa-eye';
        }
    });
}

// Login form submission
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const studentNumber = document.getElementById('studentNumber').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // For now, accept any input (as requested)
        if (studentNumber && email && password) {
            // Store user info
            isLoggedIn = true;
            currentUser = {
                studentNumber: studentNumber,
                email: email
            };
            
            console.log('✅ User logged in:', currentUser);
            
            // Update account display
            updateAccountDisplay();
            
            // Close modal
            closeLoginModalFunc();
            
            // Show success modal
            setTimeout(() => {
                showSuccessModal('Login Successful!', `Welcome back, ${studentNumber}! You can now proceed with your order.`);
            }, 300);
            
            // Proceed to checkout after modal is closed
            setTimeout(() => {
                const paymentMethodSelect = document.getElementById('paymentMethod');
                const selectedPaymentMethod = paymentMethodSelect ? paymentMethodSelect.value : '';
                proceedToCheckout(selectedPaymentMethod);
            }, 2500);
        }
    });
}

// Proceed to checkout function
function proceedToCheckout(paymentMethod = 'Not Specified') {
    if (cart.length === 0) {
        showSuccessModal('Cart Empty', 'Your cart is empty! Add items to continue.');
        return;
    }
    
    // Get payment method name
    const paymentMethodNames = {
        'gcash': 'GCash',
        'maya': 'Maya (PayMaya)',
        'bank': 'Bank Transfer',
        'counter': 'Over the Counter',
        'card': 'Credit/Debit Card',
        'installment': 'Installment Plan'
    };
    
    const paymentMethodName = paymentMethodNames[paymentMethod] || paymentMethod;
    
    // Create transaction record
    const transaction = {
        id: `TXN-${Date.now()}`,
        date: new Date().toLocaleString(),
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'completed',
        paymentMethod: paymentMethodName,
        studentNumber: currentUser ? currentUser.studentNumber : 'Guest'
    };
    
    // Add to transaction history
    transactionHistory.unshift(transaction); // Add to beginning
    
    // Update account display
    updateAccountDisplay();
    
    // Reset payment method selector
    const paymentMethodSelect = document.getElementById('paymentMethod');
    if (paymentMethodSelect) {
        paymentMethodSelect.value = '';
    }
    
    // Reset and hide payment details form
    const paymentDetailsForm = document.getElementById('paymentDetailsForm');
    if (paymentDetailsForm) {
        paymentDetailsForm.style.display = 'none';
        // Clear all form inputs
        const allInputs = paymentDetailsForm.querySelectorAll('input, select, textarea');
        allInputs.forEach(input => {
            input.value = '';
        });
    }
    
    showSuccessModal('Order Placed Successfully!', `Thank you for your purchase, ${currentUser ? currentUser.studentNumber : 'valued customer'}! Your order has been placed via ${paymentMethodName} and added to your transaction history.`);
    cart = [];
    updateCart();
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Update Account Display
function updateAccountDisplay() {
    if (!accountNotLoggedIn || !accountLoggedIn) return;
    
    if (isLoggedIn && currentUser) {
        // Show logged in state
        accountNotLoggedIn.style.display = 'none';
        accountLoggedIn.style.display = 'block';
        
        // Update user info
        accountUserName.textContent = currentUser.studentNumber || 'Student';
        accountUserEmail.textContent = currentUser.email || 'email@icct.edu.ph';
        accountStudentNumber.textContent = `ID: ${currentUser.studentNumber || '000000'}`;
        
        // Update transaction history
        updateTransactionHistory();
    } else {
        // Show not logged in state
        accountNotLoggedIn.style.display = 'block';
        accountLoggedIn.style.display = 'none';
    }
}

// Update Transaction History
function updateTransactionHistory() {
    if (!transactionList || !transactionCount) return;
    
    // Update transaction count
    transactionCount.textContent = `${transactionHistory.length} order${transactionHistory.length !== 1 ? 's' : ''}`;
    
    // Clear current list
    transactionList.innerHTML = '';
    
    if (transactionHistory.length === 0) {
        // Show empty state
        transactionList.innerHTML = `
            <div class="empty-transactions">
                <i class="fas fa-shopping-bag"></i>
                <p>No transactions yet</p>
                <small>Your order history will appear here</small>
            </div>
        `;
    } else {
        // Display transactions
        transactionHistory.forEach(transaction => {
            const itemsList = transaction.items
                .map(item => `${item.name} (x${item.quantity})`)
                .join(', ');
            
            const transactionEl = document.createElement('div');
            transactionEl.className = 'transaction-item';
            transactionEl.innerHTML = `
                <div class="transaction-header">
                    <div>
                        <div class="transaction-id">${transaction.id}</div>
                        <div class="transaction-date">${transaction.date}</div>
                    </div>
                    <span class="transaction-status status-${transaction.status}">
                        ${transaction.status}
                    </span>
                </div>
                <div class="transaction-details">
                    <div class="transaction-items">
                        <strong>Items:</strong> ${itemsList}
                    </div>
                    ${transaction.paymentMethod ? `
                    <div class="transaction-payment">
                        <i class="fas fa-credit-card"></i> <strong>Payment:</strong> ${transaction.paymentMethod}
                    </div>
                    ` : ''}
                    <div class="transaction-total">
                        <span>Total:</span>
                        <span>₱${transaction.total.toFixed(2)}</span>
                    </div>
                </div>
            `;
            transactionList.appendChild(transactionEl);
        });
    }
}

// Hero Slider
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlide = index;
}

// Hero Indicator Click Events
heroIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto Slide Change
if (heroIndicators.length > 0) {
    setInterval(() => {
        const nextSlide = (currentSlide + 1) % heroIndicators.length;
        showSlide(nextSlide);
    }, 5000);
}

// Scroll Animations
function checkScroll() {
    const elements = document.querySelectorAll('.category-card, .split-layout, .section-title');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.category-card, .split-layout, .section-title');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on load
    
    updateCart();
});

// Search Functionality
const searchInput = document.querySelector('.nav-search input');
const searchButton = document.querySelector('.nav-search button');

if (searchInput && searchButton) {
    searchButton.addEventListener('click', () => {
        performSearch();
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
        showSuccessModal('Search Empty', 'Please enter a search term to find products.');
        return;
    }

    console.log('🔍 Searching for:', query);
    
    // Collect all products from STATIC_PRODUCTS
    let allProducts = [];
    
    if (typeof STATIC_PRODUCTS !== 'undefined') {
        Object.values(STATIC_PRODUCTS).forEach(categoryProducts => {
            if (Array.isArray(categoryProducts)) {
                allProducts = allProducts.concat(categoryProducts);
            }
        });
    }
    
    console.log('📦 Total products to search:', allProducts.length);
    
    // Filter products based on search query
    const results = allProducts.filter(product => {
        const searchInName = product.name.toLowerCase().includes(query);
        const searchInDescription = product.description.toLowerCase().includes(query);
        const searchInCategory = product.category_slug.toLowerCase().includes(query);
        
        return searchInName || searchInDescription || searchInCategory;
    });
    
    console.log('✅ Search results:', results.length);
    
    // Display results
    if (results.length > 0) {
        displaySearchResults(results, query);
        searchInput.value = ''; // Clear search input
    } else {
        showSuccessModal('No Results Found', `No products found matching "${query}". Try different keywords.`);
    }
}

function displaySearchResults(products, query) {
    // Get or create search results section
    let searchSection = document.getElementById('search-results');
    
    if (!searchSection) {
        // Create search results section
        const paymentSection = document.getElementById('payment');
        searchSection = document.createElement('section');
        searchSection.id = 'search-results';
        searchSection.className = 'category-section payment-section hidden';
        searchSection.innerHTML = `
            <div class="container">
                <div class="category-header">
                    <button class="back-btn" id="searchBackBtn"><i class="fas fa-arrow-left"></i> Back</button>
                    <h2 class="section-title" id="searchResultsTitle">Search Results</h2>
                </div>
                <div id="searchResultsContainer" class="products-grid"></div>
            </div>
        `;
        
        if (paymentSection && paymentSection.parentNode) {
            paymentSection.parentNode.insertBefore(searchSection, paymentSection);
        } else {
            document.querySelector('main').appendChild(searchSection);
        }
        
        // Add back button functionality
        const searchBackBtn = searchSection.querySelector('#searchBackBtn');
        if (searchBackBtn) {
            searchBackBtn.addEventListener('click', () => {
                searchSection.classList.add('hidden');
                searchSection.style.display = 'none';
                
                // Show home sections
                const productShowcase = document.querySelector('.popular-uniforms-banners');
                const backToSchool = document.querySelector('.back-to-school');
                if (productShowcase) productShowcase.style.display = 'block';
                if (backToSchool) backToSchool.style.display = 'block';
                
                // Make sure all category sections are hidden
                const allSections = document.querySelectorAll('.category-section');
                allSections.forEach(section => {
                    section.classList.add('hidden');
                    section.style.display = 'none';
                });
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
    
    // Update title
    const titleElement = searchSection.querySelector('#searchResultsTitle');
    if (titleElement) {
        titleElement.textContent = `Search Results for "${query}" (${products.length} ${products.length === 1 ? 'item' : 'items'})`;
    }
    
    // Render products
    const container = searchSection.querySelector('#searchResultsContainer');
    if (container) {
        container.innerHTML = ''; // Clear previous results
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image_url}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">₱${parseFloat(product.price).toFixed(2)}</span>
                        <div class="product-actions">
                            ${product.stock_quantity > 0 ? 
                                `<button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image_url}" title="Add to Cart">
                                    <i class="fas fa-cart-plus"></i>
                                </button>
                                <button class="love-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image_url}" title="Add to Wishlist">
                                    <i class="fas fa-heart"></i>
                                </button>` : 
                                `<button class="out-of-stock" disabled>Out of Stock</button>`
                            }
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(productCard);
        });
        
        // Re-initialize add to cart and wishlist functionality
        initializeProductButtons(container);
    }
    
    // Show search results section
    const categorySections = document.querySelectorAll('.category-section');
    categorySections.forEach(section => {
        section.classList.add('hidden');
        section.style.display = 'none';
    });
    
    const productShowcase = document.querySelector('.popular-uniforms-banners');
    const backToSchool = document.querySelector('.back-to-school');
    if (productShowcase) productShowcase.style.display = 'none';
    if (backToSchool) backToSchool.style.display = 'none';
    
    searchSection.classList.remove('hidden');
    searchSection.style.display = 'block';
    
    console.log('🔍 All category sections hidden, search results displayed');
    
    // Scroll to results
    const navbar = document.querySelector('.header');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const searchTop = searchSection.offsetTop - navbarHeight;
    
    window.scrollTo({
        top: searchTop,
        behavior: 'smooth'
    });
}

// Helper function to initialize product buttons (add to cart, wishlist)
function initializeProductButtons(container) {
    // Add to cart buttons
    const addToCartButtons = container.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.dataset.name;
            const productPrice = parseFloat(this.dataset.price);
            const productImage = this.dataset.image;
            
            // Call addToCart with correct parameters (name, price, size, installments)
            addToCart(productName, productPrice);
            
            // Visual feedback
            const icon = this.querySelector('i');
            const originalClass = icon.className;
            icon.className = 'fas fa-check';
            this.style.background = '#4caf50';
            this.title = 'Added to Cart';
            
            setTimeout(() => {
                icon.className = originalClass;
                this.style.background = '';
                this.title = 'Add to Cart';
            }, 1500);
        });
    });
    
    // Wishlist buttons
    const loveButtons = container.querySelectorAll('.love-btn');
    loveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.dataset.name;
            const productPrice = parseFloat(this.dataset.price);
            const productImage = this.dataset.image;
            
            // Call addToWishlist with correct parameters (name, price, image)
            const added = addToWishlist(productName, productPrice, productImage);
            
            // Visual feedback - toggle heart icon
            const icon = this.querySelector('i');
            if (added) {
                // Added to wishlist - show filled heart
                icon.className = 'fas fa-heart';
                icon.style.color = '#ff4757';
                this.style.background = 'rgba(255, 71, 87, 0.1)';
                this.title = 'Remove from Wishlist';
            } else {
                // Removed from wishlist - show outline heart
                icon.className = 'far fa-heart';
                icon.style.color = '';
                this.style.background = '';
                this.title = 'Add to Wishlist';
            }
        });
    });
}

// Quick Filters
const filters = document.querySelectorAll('.filter');
filters.forEach(filter => {
    filter.addEventListener('click', (e) => {
        e.preventDefault();
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        // In a real implementation, this would filter products
        const filterType = filter.textContent;
        showSuccessModal('Filter Applied', `Filtering by: ${filterType}`);
    });
});

// Dropdown Menu for Mobile
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            const isActive = item.classList.contains('active');
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// ============================================================================
// ADMIN DASHBOARD SYSTEM
// ============================================================================

// Admin State
let isAdminMode = false;

// Dummy Data for Admin Dashboard
const dummyTransactions = [
    { id: 'TXN001', studentNumber: '2024-1001', date: '2025-10-20 10:30 AM', total: 1250.00, status: 'Completed' },
    { id: 'TXN002', studentNumber: '2024-1002', date: '2025-10-20 11:15 AM', total: 850.00, status: 'Pending' },
    { id: 'TXN003', studentNumber: '2024-1003', date: '2025-10-20 02:45 PM', total: 2100.00, status: 'Completed' },
    { id: 'TXN004', studentNumber: '2024-1004', date: '2025-10-21 09:00 AM', total: 450.00, status: 'Processing' },
    { id: 'TXN005', studentNumber: '2024-1005', date: '2025-10-21 10:20 AM', total: 1650.00, status: 'Completed' }
];

const dummyPayments = [
    { id: 'PAY001', studentNumber: '2024-1001', method: 'GCash', amount: 1250.00, status: 'Paid', date: '2025-10-20 10:30 AM' },
    { id: 'PAY002', studentNumber: '2024-1002', method: 'ECPay', amount: 850.00, status: 'Pending', date: '2025-10-20 11:15 AM' },
    { id: 'PAY003', studentNumber: '2024-1003', method: 'Cebuana Lhuillier', amount: 2100.00, status: 'Paid', date: '2025-10-20 02:45 PM' },
    { id: 'PAY004', studentNumber: '2024-1004', method: 'GCash', amount: 450.00, status: 'Paid', date: '2025-10-21 09:00 AM' },
    { id: 'PAY005', studentNumber: '2024-1005', method: 'M Lhuillier', amount: 1650.00, status: 'Paid', date: '2025-10-21 10:20 AM' },
    { id: 'PAY006', studentNumber: '2024-1006', method: 'GCash', amount: 3200.00, status: 'Paid', date: '2025-10-21 11:45 AM' },
    { id: 'PAY007', studentNumber: '2024-1007', method: 'ECPay', amount: 575.00, status: 'Paid', date: '2025-10-21 01:30 PM' },
    { id: 'PAY008', studentNumber: '2024-1008', method: 'M Lhuillier', amount: 920.00, status: 'Pending', date: '2025-10-21 02:15 PM' },
    { id: 'PAY009', studentNumber: '2024-1009', method: 'Cebuana Lhuillier', amount: 1480.00, status: 'Paid', date: '2025-10-21 03:00 PM' },
    { id: 'PAY010', studentNumber: '2024-1010', method: 'GCash', amount: 780.00, status: 'Paid', date: '2025-10-21 04:15 PM' },
    { id: 'PAY011', studentNumber: '2024-1011', method: 'ECPay', amount: 1120.00, status: 'Paid', date: '2025-10-21 05:00 PM' },
    { id: 'PAY012', studentNumber: '2024-1012', method: 'M Lhuillier', amount: 2350.00, status: 'Paid', date: '2025-10-21 05:30 PM' }
];

const dummyOrders = [
    { id: 'ORD001', studentNumber: '2024-1001', products: 'ICCT Polo Shirt (M)', quantity: 2, status: 'Completed' },
    { id: 'ORD002', studentNumber: '2024-1002', products: 'ID Card, Clearance Form', quantity: 2, status: 'Ready for Pickup' },
    { id: 'ORD003', studentNumber: '2024-1003', products: 'Ballpen Set, Notebook', quantity: 5, status: 'Preparing' },
    { id: 'ORD004', studentNumber: '2024-1004', products: 'Registration Fee', quantity: 1, status: 'Pending' },
    { id: 'ORD005', studentNumber: '2024-1005', products: 'ICCT Pants (L), Belt', quantity: 2, status: 'Preparing' }
];

// Check if admin is logged in from localStorage
function checkAdminSession() {
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
        const session = JSON.parse(adminSession);
        if (session.isAdmin) {
            isAdminMode = true;
            showAdminDashboard();
        }
    }
}

// Show Admin Dashboard (replaces entire user interface)
function showAdminDashboard() {
    const adminDashboard = document.getElementById('adminDashboard');
    const mainContent = document.querySelector('body');
    
    if (adminDashboard) {
        adminDashboard.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Load admin data
        loadAdminProducts();
        loadTransactions();
        loadPayments();
        loadOrders();
    }
}

// Hide Admin Dashboard (return to user view)
function hideAdminDashboard() {
    const adminDashboard = document.getElementById('adminDashboard');
    
    if (adminDashboard) {
        adminDashboard.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Admin Modal Elements
const adminModal = document.getElementById('adminModal');
const closeAdminModal = document.getElementById('closeAdminModal');
const adminLoginTriggerBtn = document.getElementById('adminLoginTriggerBtn');
const adminForm = document.getElementById('adminForm');
const toggleAdminPassword = document.getElementById('toggleAdminPassword');
const adminLogoutBtnTop = document.getElementById('adminLogoutBtnTop');
const adminLogoutBtnSidebar = document.getElementById('adminLogoutBtnSidebar');

// Open Admin Modal
if (adminLoginTriggerBtn) {
    adminLoginTriggerBtn.addEventListener('click', () => {
        adminModal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Close account sidebar
        const accountSidebar = document.getElementById('accountSidebar');
        if (accountSidebar) {
            accountSidebar.classList.remove('active');
        }
    });
}

// Close Admin Modal
if (closeAdminModal) {
    closeAdminModal.addEventListener('click', () => {
        adminModal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Toggle Admin Password Visibility
if (toggleAdminPassword) {
    toggleAdminPassword.addEventListener('click', () => {
        const passwordInput = document.getElementById('adminPassword');
        const icon = toggleAdminPassword.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
}

// Handle Admin Login Form
if (adminForm) {
    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;
        
        // Accept ANY credentials for admin login
        if (username && password) {
            // Successful login
            isAdminMode = true;
            localStorage.setItem('adminSession', JSON.stringify({ isAdmin: true }));
            
            // Close admin modal
            adminModal.classList.remove('active');
            overlay.classList.remove('active');
            
            // Show Admin Dashboard
            showAdminDashboard();
            
            // Show success message
            showSuccessModal('Admin Login Successful', `🔐 Welcome, ${username}! Admin Dashboard is now active.`);
            
            // Reset form
            adminForm.reset();
        } else {
            showSuccessModal('Login Failed', '❌ Please enter both username and password.');
        }
    });
}

// Admin Logout from Top-Right Indicator
if (adminLogoutBtnTop) {
    adminLogoutBtnTop.addEventListener('click', () => {
        isAdminMode = false;
        localStorage.removeItem('adminSession');
        hideAdminDashboard();
        showSuccessModal('Admin Logout', '✅ You have exited admin mode.');
    });
}

// Admin Logout from Sidebar
if (adminLogoutBtnSidebar) {
    adminLogoutBtnSidebar.addEventListener('click', () => {
        isAdminMode = false;
        localStorage.removeItem('adminSession');
        hideAdminDashboard();
        showSuccessModal('Admin Logout', '✅ You have exited admin mode.');
    });
}

// Admin Dashboard Tab Navigation
const adminNavBtns = document.querySelectorAll('.admin-nav-btn');
const adminSections = document.querySelectorAll('.admin-section');

adminNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetSection = btn.dataset.section;
        
        // Remove active class from all buttons and sections
        adminNavBtns.forEach(b => b.classList.remove('active'));
        adminSections.forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked button and target section
        btn.classList.add('active');
        const sectionMap = {
            'products': 'adminProductsSection',
            'transactions': 'adminTransactionsSection',
            'payments': 'adminPaymentsSection',
            'orders': 'adminOrdersSection'
        };
        
        const targetElement = document.getElementById(sectionMap[targetSection]);
        if (targetElement) {
            targetElement.classList.add('active');
        }
    });
});

// Load Admin Products
// Load Admin Products
async function loadAdminProducts() {
    const productsGrid = document.getElementById('adminProductsGrid');
    if (!productsGrid) {
        console.error('Admin products grid not found');
        return;
    }
    
    console.log('🔄 Loading products for admin dashboard...');
    
    try {
        // Try to fetch from API - use ?action=products to get all products
        const response = await fetch('http://localhost:8080/api/products.php?action=products&category=all-products');
        const data = await response.json();
        
        console.log('API Response:', data);
        
        if (data.success && data.data && data.data.length > 0) {
            console.log('✅ Loaded', data.data.length, 'products from API');
            displayAdminProducts(data.data);
            return;
        } else if (data.success && data.products && data.products.length > 0) {
            // Fallback to 'products' property
            console.log('✅ Loaded', data.products.length, 'products from API (alt)');
            displayAdminProducts(data.products);
            return;
        }
    } catch (error) {
        console.warn('⚠️ API fetch failed:', error.message);
    }
    
    // Fallback to static data
    if (typeof STATIC_PRODUCTS !== 'undefined') {
        console.log('📦 Using static product data...');
        // Get all products from all categories
        const allProducts = [];
        for (const category in STATIC_PRODUCTS) {
            allProducts.push(...STATIC_PRODUCTS[category]);
        }
        console.log('✅ Loaded', allProducts.length, 'products from static data');
        displayAdminProducts(allProducts);
    } else {
        console.error('❌ No product data available!');
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-body);">
                <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: var(--cta-color); margin-bottom: 20px;"></i>
                <h3 style="margin: 0 0 10px 0; color: var(--white);">No Products Available</h3>
                <p>Unable to load product data. Please check your connection.</p>
            </div>
        `;
    }
}

// Display Admin Products
function displayAdminProducts(productList) {
    const productsGrid = document.getElementById('adminProductsGrid');
    if (!productsGrid) return;
    
    if (!productList || productList.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-body);">
                <i class="fas fa-box-open" style="font-size: 48px; color: var(--text-body); margin-bottom: 20px;"></i>
                <h3 style="margin: 0 0 10px 0; color: var(--white);">No Products Found</h3>
                <p>No products available to display.</p>
            </div>
        `;
        return;
    }
    
    // Remove duplicates based on product ID or name
    const uniqueProducts = [];
    const seenIds = new Set();
    
    for (const product of productList) {
        const productId = product.id || product.name.toLowerCase().replace(/\s+/g, '-');
        if (!seenIds.has(productId)) {
            seenIds.add(productId);
            uniqueProducts.push(product);
        }
    }
    
    console.log('📦 Displaying', uniqueProducts.length, 'unique products in admin grid (removed', productList.length - uniqueProducts.length, 'duplicates)');
    
    productsGrid.innerHTML = uniqueProducts.map(product => {
        const productId = product.id || product.name.toLowerCase().replace(/\s+/g, '-');
        const stockKey = `stock_${productId}`;
        let currentStock = localStorage.getItem(stockKey) || product.stock_quantity || 50;
        const productName = product.name || 'Unnamed Product';
        const productPrice = parseFloat(product.price || 0).toFixed(2);
        const productCategory = product.category_name || product.category || 'Uncategorized';
        const productImage = product.image_url || '';
        
        return `
            <div class="admin-product-card" data-product-id="${productId}">
                <div class="admin-product-image">
                    ${productImage ? 
                        `<img src="${productImage}" alt="${productName}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                         <div class="image-placeholder" style="display:none;">
                            <i class="fas fa-image"></i>
                            <span>${productName}</span>
                         </div>` : 
                        `<div class="image-placeholder">
                            <i class="fas fa-image"></i>
                            <span>${productName}</span>
                         </div>`
                    }
                </div>
                <div class="admin-product-info">
                    <h3>${productName}</h3>
                    <p class="admin-product-price">₱${productPrice}</p>
                    <p class="admin-product-category">
                        <i class="fas fa-tag"></i> ${productCategory}
                    </p>
                </div>
                <div class="admin-stock-control">
                    <label><i class="fas fa-boxes"></i> Stock Quantity:</label>
                    <div class="stock-input-group">
                        <input 
                            type="number" 
                            class="admin-stock-input" 
                            value="${currentStock}" 
                            min="0"
                            data-product-id="${productId}"
                            data-product-name="${productName}"
                        >
                        <button class="admin-update-btn" data-product-id="${productId}">
                            <i class="fas fa-check"></i> Update
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Attach event listeners to update buttons
    attachAdminStockListeners();
}

// Attach Stock Update Listeners
function attachAdminStockListeners() {
    const updateBtns = document.querySelectorAll('.admin-update-btn');
    
    updateBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.dataset.productId;
            const input = document.querySelector(`.admin-stock-input[data-product-id="${productId}"]`);
            const productName = input.dataset.productName || 'Product';
            const newStock = parseInt(input.value);
            
            // Save to localStorage
            localStorage.setItem(`stock_${productId}`, newStock);
            
            // Update the admin card display
            const adminCard = btn.closest('.admin-product-card');
            if (adminCard) {
                input.value = newStock;
            }
            
            // Show success notification
            showSuccessModal('Stock Updated', `✅ ${productName} stock updated to ${newStock}`);
            
            console.log(`✅ Stock updated: ${productId} = ${newStock}`);
        });
    });
}

// Load Transactions
function loadTransactions() {
    const tbody = document.getElementById('transactionsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = dummyTransactions.map(txn => `
        <tr>
            <td><strong>${txn.id}</strong></td>
            <td>${txn.studentNumber}</td>
            <td>${txn.date}</td>
            <td>₱${txn.total.toFixed(2)}</td>
            <td><span class="status-badge status-${txn.status.toLowerCase()}">${txn.status}</span></td>
        </tr>
    `).join('');
}

// Load Payments
function loadPayments() {
    console.log('🔄 Loading payments...');
    const tbody = document.getElementById('paymentsTableBody');
    console.log('📋 Payment table body found:', tbody ? 'YES' : 'NO');
    if (!tbody) {
        console.error('❌ paymentsTableBody element not found!');
        return;
    }
    
    console.log('📊 Dummy payments count:', dummyPayments.length);
    
    // Calculate ledger totals (only count 'Paid' transactions)
    const ledger = {
        gcash: { total: 0, count: 0 },
        ecpay: { total: 0, count: 0 },
        mlhuillier: { total: 0, count: 0 },
        cebuana: { total: 0, count: 0 }
    };
    
    dummyPayments.forEach(payment => {
        if (payment.status === 'Paid') {
            const method = payment.method.toLowerCase();
            if (method === 'gcash') {
                ledger.gcash.total += payment.amount;
                ledger.gcash.count++;
            } else if (method === 'ecpay') {
                ledger.ecpay.total += payment.amount;
                ledger.ecpay.count++;
            } else if (method === 'm lhuillier' || method === 'mlhuillier') {
                ledger.mlhuillier.total += payment.amount;
                ledger.mlhuillier.count++;
            } else if (method === 'cebuana lhuillier' || method === 'cebuana') {
                ledger.cebuana.total += payment.amount;
                ledger.cebuana.count++;
            }
        }
    });
    
    // Calculate total revenue
    const totalRevenue = ledger.gcash.total + ledger.ecpay.total + ledger.mlhuillier.total + ledger.cebuana.total;
    const totalCount = ledger.gcash.count + ledger.ecpay.count + ledger.mlhuillier.count + ledger.cebuana.count;
    
    console.log('💰 Ledger calculated:', ledger);
    console.log('💰 Total revenue:', totalRevenue, 'Total count:', totalCount);
    
    // Update ledger display
    updateLedgerDisplay(ledger, totalRevenue, totalCount);
    
    // Render payment table
    tbody.innerHTML = dummyPayments.map((payment, index) => `
        <tr>
            <td><strong>${payment.id}</strong></td>
            <td>${payment.studentNumber}</td>
            <td>${payment.date}</td>
            <td>${payment.method}</td>
            <td class="amount">₱${payment.amount.toFixed(2)}</td>
            <td><span class="status-badge status-${payment.status.toLowerCase()}">${payment.status}</span></td>
            <td>
                <select class="payment-status-dropdown" data-index="${index}">
                    <option value="Paid" ${payment.status === 'Paid' ? 'selected' : ''}>Paid</option>
                    <option value="Pending" ${payment.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Failed" ${payment.status === 'Failed' ? 'selected' : ''}>Failed</option>
                </select>
            </td>
        </tr>
    `).join('');
    
    // Attach event listeners
    attachPaymentStatusListeners();
}

// Update Ledger Display
function updateLedgerDisplay(ledger, totalRevenue, totalCount) {
    console.log('📊 Updating ledger display...');
    
    // GCash
    const gcashTotalEl = document.getElementById('gcashTotal');
    const gcashCountEl = document.getElementById('gcashCount');
    console.log('GCash elements found:', gcashTotalEl ? 'YES' : 'NO', gcashCountEl ? 'YES' : 'NO');
    if (gcashTotalEl) gcashTotalEl.textContent = `₱${ledger.gcash.total.toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    if (gcashCountEl) gcashCountEl.textContent = ledger.gcash.count;
    
    // ECPay
    const ecpayTotalEl = document.getElementById('ecpayTotal');
    const ecpayCountEl = document.getElementById('ecpayCount');
    if (ecpayTotalEl) ecpayTotalEl.textContent = `₱${ledger.ecpay.total.toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    if (ecpayCountEl) ecpayCountEl.textContent = ledger.ecpay.count;
    
    // M Lhuillier
    const mlhuillierTotalEl = document.getElementById('mlhuillierTotal');
    const mlhuillierCountEl = document.getElementById('mlhuillierCount');
    if (mlhuillierTotalEl) mlhuillierTotalEl.textContent = `₱${ledger.mlhuillier.total.toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    if (mlhuillierCountEl) mlhuillierCountEl.textContent = ledger.mlhuillier.count;
    
    // Cebuana Lhuillier
    const cebuanaTotalEl = document.getElementById('cebuanaTotal');
    const cebuanaCountEl = document.getElementById('cebuanaCount');
    if (cebuanaTotalEl) cebuanaTotalEl.textContent = `₱${ledger.cebuana.total.toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    if (cebuanaCountEl) cebuanaCountEl.textContent = ledger.cebuana.count;
    
    // Total
    const totalRevenueEl = document.getElementById('totalRevenue');
    const totalCountEl = document.getElementById('totalCount');
    if (totalRevenueEl) totalRevenueEl.textContent = `₱${totalRevenue.toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    if (totalCountEl) totalCountEl.textContent = totalCount;
}

// Attach Payment Status Listeners
function attachPaymentStatusListeners() {
    const dropdowns = document.querySelectorAll('.payment-status-dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', (e) => {
            const index = parseInt(e.target.dataset.index);
            const newStatus = e.target.value;
            
            // Update dummy data
            dummyPayments[index].status = newStatus;
            
            // Reload table
            loadPayments();
            
            // Show success message
            showSuccessModal('Payment Status Updated', `✅ Payment status changed to ${newStatus}`);
        });
    });
}

// Load Orders
function loadOrders() {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = dummyOrders.map((order, index) => `
        <tr>
            <td><strong>${order.id}</strong></td>
            <td>${order.studentNumber}</td>
            <td>${order.products}</td>
            <td>${order.quantity}</td>
            <td><span class="order-badge order-${order.status.toLowerCase().replace(/\s+/g, '-')}">${order.status}</span></td>
            <td>
                <select class="order-status-dropdown" data-index="${index}">
                    <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Preparing" ${order.status === 'Preparing' ? 'selected' : ''}>Preparing</option>
                    <option value="Ready for Pickup" ${order.status === 'Ready for Pickup' ? 'selected' : ''}>Ready for Pickup</option>
                    <option value="Completed" ${order.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
            </td>
        </tr>
    `).join('');
    
    // Attach event listeners
    attachOrderStatusListeners();
}

// Attach Order Status Listeners
function attachOrderStatusListeners() {
    const dropdowns = document.querySelectorAll('.order-status-dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', (e) => {
            const index = parseInt(e.target.dataset.index);
            const newStatus = e.target.value;
            
            // Update dummy data
            dummyOrders[index].status = newStatus;
            
            // Reload table
            loadOrders();
            
            // Show success message
            showSuccessModal('Order Status Updated', `✅ Order status changed to ${newStatus}`);
        });
    });
}

// Update product cards for admin (show stock management) - OLD FUNCTION, KEPT FOR COMPATIBILITY
function updateProductCardsForAdmin() {
    // This function is no longer used with the new dashboard but kept for compatibility
    console.log('Using new admin dashboard system');
}

// Update product cards for user (show normal buttons with stock display)
function updateProductCardsForUser() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-title')?.textContent || 'Unknown';
        const productId = card.dataset.productId || productName.toLowerCase().replace(/\s+/g, '-');
        
        // Get current stock from localStorage or default to 50
        const stockKey = `stock_${productId}`;
        let currentStock = localStorage.getItem(stockKey);
        if (currentStock === null) {
            currentStock = 50;
            localStorage.setItem(stockKey, currentStock);
        }
        
        // Replace buttons with stock management interface
        const actionsDiv = card.querySelector('.product-actions');
        if (actionsDiv) {
            actionsDiv.innerHTML = `
                <div class="admin-stock-management">
                    <label class="stock-label">
                        <i class="fas fa-boxes"></i> Stock Quantity:
                    </label>
                    <div class="stock-input-group">
                        <input 
                            type="number" 
                            class="stock-input" 
                            value="${currentStock}" 
                            min="0"
                            data-product-id="${productId}"
                        >
                        <button class="update-stock-btn" data-product-id="${productId}">
                            <i class="fas fa-check"></i> Update
                        </button>
                    </div>
                </div>
            `;
            
            // Add update listener
            const updateBtn = actionsDiv.querySelector('.update-stock-btn');
            const stockInput = actionsDiv.querySelector('.stock-input');
            
            if (updateBtn && stockInput) {
                updateBtn.addEventListener('click', () => {
                    const newStock = parseInt(stockInput.value);
                    localStorage.setItem(stockKey, newStock);
                    showNotification('Stock Updated', `✅ ${productName} stock updated to ${newStock}`);
                });
            }
        }
    });
}

// Update product cards for user (show normal buttons with stock display)
function updateProductCardsForUser() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-title')?.textContent || 'Unknown';
        const productId = card.dataset.productId || productName.toLowerCase().replace(/\s+/g, '-');
        const price = card.querySelector('.product-price')?.textContent || '₱0.00';
        
        // Get current stock
        const stockKey = `stock_${productId}`;
        let currentStock = localStorage.getItem(stockKey) || 50;
        currentStock = parseInt(currentStock);
        
        // Replace with normal user interface
        const actionsDiv = card.querySelector('.product-actions');
        if (actionsDiv) {
            const isOutOfStock = currentStock === 0;
            
            actionsDiv.innerHTML = `
                <div class="stock-display">
                    <span class="stock-text ${isOutOfStock ? 'out-of-stock' : ''}">
                        <i class="fas fa-box"></i> Stock: ${currentStock}
                    </span>
                </div>
                <button class="add-to-cart-btn" ${isOutOfStock ? 'disabled' : ''} 
                    data-product-name="${productName}" 
                    data-product-price="${price.replace('₱', '')}"
                    data-product-id="${productId}">
                    <i class="fas fa-shopping-cart"></i> ${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button class="add-to-wishlist-btn" data-product-name="${productName}">
                    <i class="far fa-heart"></i>
                </button>
            `;
            
            // Re-attach event listeners
            attachProductButtonListeners(card);
        }
    });
}

// Attach event listeners to product buttons
function attachProductButtonListeners(card) {
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    const addToWishlistBtn = card.querySelector('.add-to-wishlist-btn');
    
    if (addToCartBtn && !addToCartBtn.disabled) {
        addToCartBtn.addEventListener('click', function() {
            const productName = this.dataset.productName;
            const productPrice = parseFloat(this.dataset.productPrice);
            const productId = this.dataset.productId;
            
            // Add to cart logic here
            cart.push({ name: productName, price: productPrice, id: productId });
            updateCartCount();
            showNotification('Added to Cart', `✅ ${productName} added to your cart!`);
        });
    }
    
    if (addToWishlistBtn) {
        addToWishlistBtn.addEventListener('click', function() {
            const productName = this.dataset.productName;
            wishlist.push({ name: productName });
            updateWishlistCount();
            showNotification('Added to Wishlist', `❤️ ${productName} added to your wishlist!`);
        });
    }
}

// Show notification (small success message)
function showNotification(title, message) {
    // Use existing success modal for now
    showSuccessModal(title, message);
}

// Payment Management System
function loadPaymentList() {
    const paymentList = document.getElementById('paymentList');
    const paymentCount = document.getElementById('paymentCount');
    
    if (!paymentList || !isAdminMode) return;
    
    // Get all transactions from localStorage
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    
    if (transactions.length === 0) {
        paymentList.innerHTML = `
            <div class="empty-payments">
                <i class="fas fa-money-check-alt"></i>
                <p>No payments to manage</p>
                <small>Transaction payments will appear here</small>
            </div>
        `;
        if (paymentCount) paymentCount.textContent = '0 payments';
        return;
    }
    
    if (paymentCount) paymentCount.textContent = `${transactions.length} payment${transactions.length !== 1 ? 's' : ''}`;
    
    paymentList.innerHTML = transactions.map(transaction => `
        <div class="payment-item" data-transaction-id="${transaction.id}">
            <div class="payment-header">
                <span class="transaction-number">#${transaction.id}</span>
                <span class="payment-status status-${transaction.paymentStatus.toLowerCase()}">
                    ${transaction.paymentStatus}
                </span>
            </div>
            <div class="payment-details">
                <p><strong>${transaction.items.length} item(s)</strong></p>
                <p class="payment-total">₱${transaction.total.toFixed(2)}</p>
                <p class="payment-date">${new Date(transaction.date).toLocaleString()}</p>
            </div>
            <div class="payment-actions">
                <button class="payment-action-btn success-btn" onclick="updatePaymentStatus('${transaction.id}', 'Successful')">
                    <i class="fas fa-check"></i> Mark Successful
                </button>
                <button class="payment-action-btn failed-btn" onclick="updatePaymentStatus('${transaction.id}', 'Failed')">
                    <i class="fas fa-times"></i> Mark Failed
                </button>
            </div>
        </div>
    `).join('');
}

// Update payment status
function updatePaymentStatus(transactionId, newStatus) {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const transactionIndex = transactions.findIndex(t => t.id === transactionId);
    
    if (transactionIndex !== -1) {
        transactions[transactionIndex].paymentStatus = newStatus;
        localStorage.setItem('transactions', JSON.stringify(transactions));
        
        loadPaymentList();
        showNotification('Payment Updated', `✅ Payment status updated to ${newStatus}`);
    }
}

// Make updatePaymentStatus available globally
window.updatePaymentStatus = updatePaymentStatus;

// Initialize admin system on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAdminSession();
});

// Update cart count helper
function updateCartCount() {
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Update wishlist count helper
function updateWishlistCount() {
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
}

