// script.js
console.log('🚀 Script loaded!');

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const cartToggle = document.getElementById('cartToggle');
const closeCart = document.getElementById('closeCart');
const cartSidebar = document.getElementById('cartSidebar');
const overlay = document.getElementById('overlay');
const carouselTrack = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('.cart-count');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total span');
const checkoutBtn = document.querySelector('.checkout-btn');
const continueShopping = document.querySelector('.continue-shopping');
const heroIndicators = document.querySelectorAll('.indicator');

// Cart State
let cart = [];
let currentSlide = 0;
let carouselPosition = 0;
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

    // Fetch and display products from database
    async function loadProducts(categorySlug) {
        // Check if we're on GitHub Pages (no API available)
        if (!window.location.hostname.includes('app.github.dev') && window.location.hostname !== 'localhost') {
            console.error('❌ API server not available on GitHub Pages');
            alert('⚠️ This website requires a backend server!\n\nPlease open this project in GitHub Codespaces to see the full functionality with MySQL database.\n\nGitHub Pages only shows static content.');
            return [];
        }
        
        try {
            const url = `${API_BASE_URL}/?action=products&category=${categorySlug}`;
            console.log('🔄 Loading products from:', url);
            console.log('⏳ Fetching data...');
            
            const response = await fetch(url);
            console.log('📡 Response received:', response.status, response.statusText);
            console.log('📡 Response OK?', response.ok);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const result = await response.json();
            
            console.log('✅ API Response received');
            console.log('📊 Response data:', result);
            console.log('✅ Success?', result.success);
            console.log('📦 Products count:', result.data ? result.data.length : 0);
            
            if (result.success && result.data) {
                console.log('✅ Returning', result.data.length, 'products');
                if (result.data.length > 0) {
                    console.log('📋 First product:', result.data[0].name);
                }
                return result.data;
            } else {
                console.error('❌ Error fetching products:', result.error);
                alert(`API Error: ${result.error || 'Unknown error'}`);
                return [];
            }
        } catch (error) {
            console.error('❌ Error loading products:', error);
            alert(`Failed to load products: ${error.message}`);
            return [];
        }
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
            alert(`ERROR: Cannot find container for ${containerId}`);
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
                    <div class="image-placeholder">${product.name}</div>
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
        
        console.log('✅ Rendered', products.length, 'products to container');
        console.log('✅ Final HTML length:', container.innerHTML.length);
        console.log('✅ Product cards in DOM:', container.querySelectorAll('.product-card').length);
        console.log('🎨 ===== RENDER PRODUCTS END =====');
    }

    // Show Category Section
    async function showCategory(categoryId) {
        console.log('🎯 ===== SHOW CATEGORY START =====');
        console.log('🎯 Category ID:', categoryId);
        
        // Hide all sections
        categorySections.forEach(section => {
            section.classList.add('hidden');
            section.style.display = 'none';
        });
        
        if (productShowcase) productShowcase.style.display = 'none';
        if (backToSchoolSection) backToSchoolSection.style.display = 'none';
        
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
            alert(`ERROR: Cannot find section with ID: ${categoryId}`);
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
        cartSidebar.classList.remove('active');
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
});

// Add to Cart Function
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1
        });
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
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>₱${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <div class="cart-item-total">
                    <p>₱${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="remove-item" data-name="${item.name}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemName = e.target.closest('.remove-item').dataset.name;
                removeFromCart(itemName);
            });
        });
    }
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `₱${total.toFixed(2)}`;
}

// Remove from Cart Function
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
}

// Checkout Button
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Thank you for your purchase! Your order has been placed.');
            cart = [];
            updateCart();
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else {
            alert('Your cart is empty. Add some items before checking out.');
        }
    });
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
    const query = searchInput.value.trim();
    if (query) {
        alert(`Searching for: ${query}`);
        // In a real implementation, this would filter products
    }
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
        alert(`Filtering by: ${filterType}`);
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

