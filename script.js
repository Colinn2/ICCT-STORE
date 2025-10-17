// script.js

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
// Initialize after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const categoryLinks = document.querySelectorAll('.category-link');
    const categorySections = document.querySelectorAll('.category-section');
    const backButtons = document.querySelectorAll('.back-btn');
    const productShowcase = document.querySelector('.product-showcase');
    const backToSchoolSection = document.querySelector('.back-to-school');

    console.log('Category Links found:', categoryLinks.length);
    console.log('Category Sections found:', categorySections.length);

    // Show Category Section
    function showCategory(categoryId) {
        console.log('showCategory called with:', categoryId);
        
        // Hide all sections
        categorySections.forEach(section => {
            section.classList.add('hidden');
            section.style.display = 'none';
        });
        
        if (productShowcase) productShowcase.style.display = 'none';
        if (backToSchoolSection) backToSchoolSection.style.display = 'none';
        
        // Show selected category
        const selectedSection = document.getElementById(categoryId);
        console.log('Selected section:', selectedSection);
        
        if (selectedSection) {
            selectedSection.classList.remove('hidden');
            selectedSection.style.display = 'block';
            
            // Scroll to the section with navbar visible
            setTimeout(() => {
                const navbar = document.querySelector('.header');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const sectionTop = selectedSection.offsetTop - navbarHeight - 20; // 20px extra padding
                
                window.scrollTo({
                    top: sectionTop,
                    behavior: 'smooth'
                });
            }, 100); // Small delay to ensure display change is applied
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

// Toggle Mobile Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Toggle Cart Sidebar
cartToggle.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Continue Shopping Button
continueShopping.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Carousel Navigation
if (prevBtn && nextBtn) {
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

