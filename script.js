// script.js
console.log('🚀 Script loaded!');

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
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    ${product.image_url ? `<img src="${product.image_url}" alt="${product.name}">` : `<div class="image-placeholder">${product.name}</div>`}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    ${product.description ? `<p class="product-desc">${product.description}</p>` : ''}
                    <p class="price">₱${parseFloat(product.price).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    <div class="product-actions">
                        ${product.stock_quantity > 0 ? 
                            `<button class="buy-now-btn" title="Buy Now">
                                <i class="fas fa-shopping-bag"></i>
                             </button>
                             <button class="add-to-cart" title="Add to Cart">
                                <i class="fas fa-cart-plus"></i>
                             </button>
                             <button class="love-btn" title="Add to Wishlist">
                                <i class="fas fa-heart"></i>
                             </button>` : 
                            `<button class="out-of-stock" disabled>Out of Stock</button>`
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
            
            // Skip product loading for payment section (it's a guide, not a product category)
            if (categoryId !== 'payment') {
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
                console.log('💳 Payment section - displaying guide only (no products)');
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
            
            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    ${sizeSelector}
                    ${installmentSelector}
                    <p>₱${item.price.toFixed(2)} x ${item.quantity}</p>
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

// Checkout Button
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            // Check if user is logged in
            if (!isLoggedIn) {
                // Show login modal
                openLoginModal();
            } else {
                // Proceed with checkout
                proceedToCheckout();
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
                proceedToCheckout();
            }, 2500);
        }
    });
}

// Proceed to checkout function
function proceedToCheckout() {
    if (cart.length === 0) {
        showSuccessModal('Cart Empty', 'Your cart is empty! Add items to continue.');
        return;
    }
    
    // Create transaction record
    const transaction = {
        id: `TXN-${Date.now()}`,
        date: new Date().toLocaleString(),
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'completed',
        studentNumber: currentUser ? currentUser.studentNumber : 'Guest'
    };
    
    // Add to transaction history
    transactionHistory.unshift(transaction); // Add to beginning
    
    // Update account display
    updateAccountDisplay();
    
    showSuccessModal('Order Placed Successfully!', `Thank you for your purchase, ${currentUser ? currentUser.studentNumber : 'valued customer'}! Your order has been placed and added to your transaction history.`);
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
                
                const productShowcase = document.querySelector('.product-showcase');
                const backToSchool = document.querySelector('.back-to-school');
                if (productShowcase) productShowcase.style.display = 'block';
                if (backToSchool) backToSchool.style.display = 'block';
                
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
    
    const productShowcase = document.querySelector('.product-showcase');
    const backToSchool = document.querySelector('.back-to-school');
    if (productShowcase) productShowcase.style.display = 'none';
    if (backToSchool) backToSchool.style.display = 'none';
    
    searchSection.classList.remove('hidden');
    searchSection.style.display = 'block';
    
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
            const productId = this.dataset.id;
            const productName = this.dataset.name;
            const productPrice = parseFloat(this.dataset.price);
            const productImage = this.dataset.image;
            
            addToCart({ id: productId, name: productName, price: productPrice, image_url: productImage });
            
            // Visual feedback
            const icon = this.querySelector('i');
            const originalClass = icon.className;
            icon.className = 'fas fa-check';
            this.style.background = '#4caf50';
            
            setTimeout(() => {
                icon.className = originalClass;
                this.style.background = '';
            }, 1500);
        });
    });
    
    // Wishlist buttons
    const loveButtons = container.querySelectorAll('.love-btn');
    loveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.id;
            const productName = this.dataset.name;
            const productPrice = parseFloat(this.dataset.price);
            const productImage = this.dataset.image;
            
            addToWishlist({ id: productId, name: productName, price: productPrice, image_url: productImage });
            
            // Visual feedback
            this.classList.add('loved');
            setTimeout(() => {
                this.classList.remove('loved');
            }, 1500);
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

