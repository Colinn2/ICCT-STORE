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

// Admin DOM Elements
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminModal = document.getElementById('adminModal');
const closeAdminModal = document.getElementById('closeAdminModal');
const adminForm = document.getElementById('adminForm');
const adminUsernameDisplay = document.getElementById('adminUsername');
const adminPasswordDisplay = document.getElementById('adminPassword');
const adminUsernameInput = document.getElementById('adminUsernameInput');
const adminPasswordInput = document.getElementById('adminPasswordInput');
const toggleAdminPassword = document.getElementById('toggleAdminPassword');

// Admin Dashboard Elements
const adminDashboard = document.getElementById('adminDashboard');
const adminNavBtns = document.querySelectorAll('.admin-nav-btn');
const adminSections = document.querySelectorAll('.admin-section');
const adminSectionTitle = document.getElementById('adminSectionTitle');
const adminSectionDesc = document.getElementById('adminSectionDesc');
const adminLogoutSidebar = document.getElementById('adminLogoutSidebar');
const adminProductsGrid = document.getElementById('adminProductsGrid');
const adminTransactionsTable = document.getElementById('adminTransactionsTable');
const adminPaymentsTable = document.getElementById('adminPaymentsTable');
const adminOrdersTable = document.getElementById('adminOrdersTable');

// Cart State
let cart = [];
let wishlist = [];
let currentSlide = 0;
let isLoggedIn = false;
let currentUser = null;
let transactionHistory = [];
let carouselPosition = 0;
let confirmCallback = null; // Store callback for confirm modal

// Admin System State
let isAdminMode = false;
let adminCredentials = {
    username: '',
    password: ''
};
let productStocks = {}; // Store current stock for each product

// Admin Dashboard Sample Data
let adminTransactions = [
    { id: 'TXN-001', studentNumber: '2023-100001', studentName: 'Juan Dela Cruz', date: '2025-10-20 14:30', items: 'School Uniform (Male Set)', total: 1200.00, status: 'Completed' },
    { id: 'TXN-002', studentNumber: '2023-100002', studentName: 'Maria Santos', date: '2025-10-20 13:15', items: 'PE Uniform, ID Lace', total: 900.00, status: 'Completed' },
    { id: 'TXN-003', studentNumber: '2023-100003', studentName: 'Pedro Reyes', date: '2025-10-20 11:45', items: 'School Uniform (Female Set)', total: 1200.00, status: 'Completed' },
    { id: 'TXN-004', studentNumber: '2023-100004', studentName: 'Anna Garcia', date: '2025-10-21 09:20', items: 'Notebook Set, Ballpen (Blue)', total: 180.00, status: 'Pending' },
    { id: 'TXN-005', studentNumber: '2023-100005', studentName: 'Carlos Lopez', date: '2025-10-21 10:05', items: 'ICCT Hoodie, ICCT Cap', total: 950.00, status: 'Processing' }
];

let adminPayments = [
    { id: 'PAY-001', studentNumber: '2023-100001', transactionId: 'TXN-001', method: 'GCash', amount: 1200.00, status: 'Paid' },
    { id: 'PAY-002', studentNumber: '2023-100002', transactionId: 'TXN-002', method: 'Cash on Delivery', amount: 900.00, status: 'Paid' },
    { id: 'PAY-003', studentNumber: '2023-100003', transactionId: 'TXN-003', method: 'GCash', amount: 1200.00, status: 'Paid' },
    { id: 'PAY-004', studentNumber: '2023-100004', transactionId: 'TXN-004', method: 'PayMaya', amount: 180.00, status: 'Pending' },
    { id: 'PAY-005', studentNumber: '2023-100005', transactionId: 'TXN-005', method: 'Bank Transfer', amount: 950.00, status: 'Pending' }
];

let adminOrders = [
    { id: 'ORD-001', studentNumber: '2023-100001', studentName: 'Juan Dela Cruz', products: 'School Uniform (Male Set)', quantity: 1, total: 1200.00, status: 'Completed' },
    { id: 'ORD-002', studentNumber: '2023-100002', studentName: 'Maria Santos', products: 'PE Uniform, ID Lace', quantity: 2, total: 900.00, status: 'Ready for Pickup' },
    { id: 'ORD-003', studentNumber: '2023-100003', studentName: 'Pedro Reyes', products: 'School Uniform (Female Set)', quantity: 1, total: 1200.00, status: 'Ready for Pickup' },
    { id: 'ORD-004', studentNumber: '2023-100004', studentName: 'Anna Garcia', products: 'Notebook Set, Ballpen (Blue)', quantity: 2, total: 180.00, status: 'Preparing' },
    { id: 'ORD-005', studentNumber: '2023-100005', studentName: 'Carlos Lopez', products: 'ICCT Hoodie, ICCT Cap', quantity: 2, total: 950.00, status: 'Pending' }
];

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

// ===== ADMIN SYSTEM FUNCTIONS =====

// Generate Random 6-Character Credentials
function generateRandomCredentials() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let username = '';
    let password = '';
    
    for (let i = 0; i < 6; i++) {
        username += chars.charAt(Math.floor(Math.random() * chars.length));
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    adminCredentials.username = username;
    adminCredentials.password = password;
    
    // Display credentials
    if (adminUsernameDisplay) adminUsernameDisplay.textContent = username;
    if (adminPasswordDisplay) adminPasswordDisplay.textContent = password;
    
    console.log('🔑 Admin Credentials Generated:', { username, password });
}

// Open Admin Modal
function openAdminModal() {
    if (adminModal) {
        generateRandomCredentials(); // Generate new credentials each time
        adminModal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Clear form
        if (adminUsernameInput) adminUsernameInput.value = '';
        if (adminPasswordInput) adminPasswordInput.value = '';
    }
}

// Close Admin Modal
function closeAdminModalFunc() {
    if (adminModal) {
        adminModal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Toggle Admin Mode
function toggleAdminMode(enable) {
    isAdminMode = enable;
    
    if (enable) {
        // Enable Admin Mode - Show Dashboard
        document.body.classList.add('admin-mode');
        
        // Hide main site content
        const header = document.querySelector('.header');
        const hero = document.querySelector('.hero');
        const productShowcase = document.querySelector('.product-showcase');
        const backToSchool = document.querySelector('.back-to-school');
        const categorySections = document.querySelectorAll('.category-section');
        const footer = document.querySelector('.footer');
        
        if (header) header.style.display = 'none';
        if (hero) hero.style.display = 'none';
        if (productShowcase) productShowcase.style.display = 'none';
        if (backToSchool) backToSchool.style.display = 'none';
        categorySections.forEach(section => section.style.display = 'none');
        if (footer) footer.style.display = 'none';
        
        // Show Admin Dashboard
        if (adminDashboard) {
            adminDashboard.style.display = 'flex';
            loadAdminDashboard();
        }
        
        console.log('✅ Admin Dashboard Enabled');
    } else {
        // Disable Admin Mode - Show Normal Site
        document.body.classList.remove('admin-mode');
        
        // Show main site content
        const header = document.querySelector('.header');
        const hero = document.querySelector('.hero');
        const productShowcase = document.querySelector('.product-showcase');
        const backToSchool = document.querySelector('.back-to-school');
        const footer = document.querySelector('.footer');
        
        if (header) header.style.display = '';
        if (hero) hero.style.display = '';
        if (productShowcase) productShowcase.style.display = '';
        if (backToSchool) backToSchool.style.display = '';
        if (footer) footer.style.display = '';
        
        // Hide Admin Dashboard
        if (adminDashboard) {
            adminDashboard.style.display = 'none';
        }
        
        console.log('✅ Admin Dashboard Disabled');
    }
}

// Update Stock for a Product
// ============================================================================
// UPDATE PRODUCT STOCK (Firebase Write - Replaces MySQL UPDATE query)
// ============================================================================
// Old: UPDATE products SET stock_quantity = ? WHERE id = ?
// New: Firebase Realtime Database update
function updateProductStock(productId, newStock) {
    const productCard = document.querySelector(`.admin-product-card[data-product-id="${productId}"]`);
    if (!productCard) {
        console.warn(`⚠️ Product card not found for ID: ${productId}`);
        return;
    }
    
    // Update Firebase (real-time sync)
    if (typeof realtimeDB !== 'undefined') {
        console.log(`🔥 Updating Firebase stock for product ${productId}: ${newStock}`);
        
        realtimeDB.ref(`products/${productId}`).update({
            stock: parseInt(newStock)
        })
        .then(() => {
            console.log(`✅ Firebase stock updated successfully for ${productId}`);
            
            // Update local UI
            updateLocalStockDisplay(productId, newStock);
            
            // Show success message
            showSuccessModal('Stock Updated', `✅ Stock updated to ${newStock} and synced to Firebase!`);
        })
        .catch(error => {
            console.error('❌ Firebase update error:', error);
            showSuccessModal('Update Error', `⚠️ Failed to update Firebase: ${error.message}`);
        });
    } else {
        console.warn('⚠️ Firebase not available - updating local display only');
        updateLocalStockDisplay(productId, newStock);
        showSuccessModal('Stock Updated (Local Only)', `Stock updated to ${newStock} (Firebase not connected)`);
    }
}

// Helper function to update local DOM display
function updateLocalStockDisplay(productId, newStock) {
    // Update admin card
    const productCard = document.querySelector(`.admin-product-card[data-product-id="${productId}"]`);
    if (productCard) {
        productCard.setAttribute('data-stock', newStock);
        const stockInput = productCard.querySelector('.stock-input');
        if (stockInput) stockInput.value = newStock;
    }
    
    // Update user-facing product cards (if any are displayed)
    const userProductCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    if (userProductCard) {
        userProductCard.setAttribute('data-stock', newStock);
        productStocks[productId] = newStock;
        
        const stockCount = userProductCard.querySelector('.stock-count');
        if (stockCount) stockCount.textContent = newStock;
        
        const stockInput = userProductCard.querySelector('.stock-input');
        if (stockInput) stockInput.value = newStock;
        
        // Update button states
        const productActions = userProductCard.querySelector('.product-actions');
        if (parseInt(newStock) <= 0) {
            // Out of stock - disable buttons
            productActions.innerHTML = '<button class="out-of-stock user-mode-only" disabled>Out of Stock</button>';
        } else if (!productActions.querySelector('.add-to-cart')) {
            // Had no stock, now has stock - re-enable buttons
            productActions.innerHTML = `
                <button class="buy-now-btn user-mode-only" title="Buy Now">
                    <i class="fas fa-shopping-bag"></i>
                </button>
                <button class="add-to-cart user-mode-only" title="Add to Cart">
                    <i class="fas fa-cart-plus"></i>
                </button>
                <button class="love-btn user-mode-only" title="Add to Wishlist">
                    <i class="fas fa-heart"></i>
                </button>
            `;
            
            // Re-attach event listeners for the new buttons
            attachProductCardListeners(userProductCard);
        }
        
        // Re-apply admin mode visibility if needed
        if (isAdminMode) {
            userProductCard.querySelectorAll('.user-mode-only').forEach(el => el.style.display = 'none');
        }
    }
    
    console.log(`📦 Local stock display updated for product ${productId}: ${newStock}`);
}

// ============================================================================
// ATTACH STOCK UPDATE LISTENERS (Connects UI buttons to Firebase writes)
// ============================================================================
function attachStockUpdateListeners() {
    const updateButtons = document.querySelectorAll('.update-stock-btn');
    console.log(`🔗 Attaching ${updateButtons.length} stock update listeners...`);
    
    updateButtons.forEach(button => {
        // Remove old listeners to prevent duplicates
        button.replaceWith(button.cloneNode(true));
    });
    
    // Re-select buttons after cloning
    const freshButtons = document.querySelectorAll('.update-stock-btn');
    freshButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.admin-product-card');
            if (!productCard) {
                console.error('❌ Product card not found');
                return;
            }
            
            const productId = productCard.getAttribute('data-product-id');
            const stockInput = productCard.querySelector('.stock-input');
            const newStock = parseInt(stockInput.value) || 0;
            
            console.log(`📝 Admin clicked update: Product ${productId} → Stock ${newStock}`);
            
            // Update Firebase and local display
            updateProductStock(productId, newStock);
            
            // Visual feedback on button
            this.style.background = '#4caf50';
            const icon = this.querySelector('i');
            if (icon) icon.className = 'fas fa-check';
            
            setTimeout(() => {
                this.style.background = '';
                if (icon) icon.className = 'fas fa-sync-alt';
            }, 1500);
        });
    });
    
    console.log('✅ Stock update listeners attached successfully');
}

// Load Admin Dashboard
function loadAdminDashboard() {
    // Load Products Section (default)
    loadAdminProducts();
    
    // Load other sections
    loadAdminTransactions();
    loadAdminPayments();
    loadAdminOrders();
    
    // Set default active section
    switchAdminSection('products');
}

// Load Admin Products
async function loadAdminProducts() {
    if (!adminProductsGrid) return;
    
    console.log('� Loading admin products from Firebase...');
    
    try {
        // Check if Firebase is available
        if (typeof realtimeDB === 'undefined') {
            console.warn('⚠️ Firebase not initialized, using static data');
            loadAdminProductsFromStatic();
            return;
        }
        
        // ============================================================================
        // FIREBASE READ: Get all products (Replaces MySQL SELECT * FROM products)
        // ============================================================================
        const snapshot = await realtimeDB.ref('products').once('value');
        const data = snapshot.val();
        
        if (!data) {
            console.warn('⚠️ No products in Firebase');
            adminProductsGrid.innerHTML = '<p style="text-align:center;color:#999;padding:40px;">No products found in Firebase</p>';
            return;
        }
        
        // Convert Firebase object to array
        const allProducts = Object.keys(data).map(key => ({
            id: key,
            name: data[key].name,
            price: data[key].price,
            stock_quantity: data[key].stock || 0,
            category_slug: data[key].category || 'unknown',
            image_url: data[key].image || 'images/placeholder.png'
        }));
        
        console.log(`✅ Loaded ${allProducts.length} products from Firebase for admin`);
        
        // Clear grid
        adminProductsGrid.innerHTML = '';
        
        // Render products
        allProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'admin-product-card';
            productCard.setAttribute('data-product-id', product.id);
            productCard.setAttribute('data-stock', product.stock_quantity);
            
            productCard.innerHTML = `
                <div class="admin-product-image">
                    ${product.image_url ? `<img src="${product.image_url}" alt="${product.name}">` : `<div class="image-placeholder">${product.name}</div>`}
                </div>
                <div class="admin-product-info">
                    <h3>${product.name}</h3>
                    <p class="admin-product-price">₱${parseFloat(product.price).toLocaleString('en-PH', {minimumFractionDigits: 2})}</p>
                    <p class="admin-product-category">${product.category_slug}</p>
                    <div class="admin-product-stock">
                        <label>Current Stock:</label>
                        <div class="stock-control">
                            <input type="number" class="stock-input" value="${product.stock_quantity}" min="0" max="999">
                            <button class="update-stock-btn" data-product-id="${product.id}">
                                <i class="fas fa-sync-alt"></i> Update
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            adminProductsGrid.appendChild(productCard);
        });
        
        // Attach update listeners with Firebase write capability
        attachStockUpdateListeners();
        
    } catch (error) {
        console.error('❌ Firebase error loading admin products:', error);
        loadAdminProductsFromStatic();
    }
}

// Fallback function using static data
function loadAdminProductsFromStatic() {
    console.log('📦 Loading admin products from static data...');
    
    const allProducts = [];
    
    // Check if we have static products data
    if (typeof STATIC_PRODUCTS !== 'undefined') {
        Object.keys(STATIC_PRODUCTS).forEach(category => {
            allProducts.push(...STATIC_PRODUCTS[category]);
        });
    }
    
    console.log(`📦 Loaded ${allProducts.length} products from static data`);
    
    // Clear grid
    adminProductsGrid.innerHTML = '';
    
    // Render products
    allProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'admin-product-card';
        productCard.setAttribute('data-product-id', product.id);
        productCard.setAttribute('data-stock', product.stock_quantity);
        
        productCard.innerHTML = `
            <div class="admin-product-image">
                ${product.image_url ? `<img src="${product.image_url}" alt="${product.name}">` : `<div class="image-placeholder">${product.name}</div>`}
            </div>
            <div class="admin-product-info">
                <h3>${product.name}</h3>
                <p class="admin-product-price">₱${parseFloat(product.price).toLocaleString('en-PH', {minimumFractionDigits: 2})}</p>
                <p class="admin-product-category">${product.category_slug}</p>
                <div class="admin-product-stock">
                    <label>Current Stock:</label>
                    <div class="stock-control">
                        <input type="number" class="stock-input" value="${product.stock_quantity}" min="0" max="999">
                        <button class="update-stock-btn" data-product-id="${product.id}">
                            <i class="fas fa-sync-alt"></i> Update (Static Mode)
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        adminProductsGrid.appendChild(productCard);
    });
    
    // Attach update listeners
    attachAdminStockListeners();
}

// Load Admin Transactions
function loadAdminTransactions() {
    if (!adminTransactionsTable) return;
    
    adminTransactionsTable.innerHTML = '';
    
    adminTransactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${transaction.id}</strong></td>
            <td>${transaction.studentNumber}</td>
            <td>${transaction.date}</td>
            <td>${transaction.items}</td>
            <td class="amount">₱${transaction.total.toLocaleString('en-PH', {minimumFractionDigits: 2})}</td>
            <td><span class="status-badge status-${transaction.status.toLowerCase().replace(' ', '-')}">${transaction.status}</span></td>
        `;
        adminTransactionsTable.appendChild(row);
    });
}

// Load Admin Payments
function loadAdminPayments() {
    if (!adminPaymentsTable) return;
    
    adminPaymentsTable.innerHTML = '';
    
    adminPayments.forEach(payment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${payment.id}</strong></td>
            <td>${payment.studentNumber}</td>
            <td>${payment.transactionId}</td>
            <td>${payment.method}</td>
            <td class="amount">₱${payment.amount.toLocaleString('en-PH', {minimumFractionDigits: 2})}</td>
            <td><span class="status-badge status-${payment.status.toLowerCase()}">${payment.status}</span></td>
            <td>
                <select class="payment-status-select" data-payment-id="${payment.id}">
                    <option value="Paid" ${payment.status === 'Paid' ? 'selected' : ''}>Paid</option>
                    <option value="Pending" ${payment.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Failed" ${payment.status === 'Failed' ? 'selected' : ''}>Failed</option>
                </select>
            </td>
        `;
        adminPaymentsTable.appendChild(row);
    });
    
    // Attach change listeners
    attachPaymentStatusListeners();
}

// Load Admin Orders
function loadAdminOrders() {
    if (!adminOrdersTable) return;
    
    adminOrdersTable.innerHTML = '';
    
    adminOrders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${order.id}</strong></td>
            <td>${order.studentNumber}</td>
            <td>${order.studentName}</td>
            <td>${order.products}</td>
            <td>${order.quantity}</td>
            <td class="amount">₱${order.total.toLocaleString('en-PH', {minimumFractionDigits: 2})}</td>
            <td><span class="status-badge status-${order.status.toLowerCase().replace(' ', '-')}">${order.status}</span></td>
            <td>
                <select class="order-status-select" data-order-id="${order.id}">
                    <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Preparing" ${order.status === 'Preparing' ? 'selected' : ''}>Preparing</option>
                    <option value="Ready for Pickup" ${order.status === 'Ready for Pickup' ? 'selected' : ''}>Ready for Pickup</option>
                    <option value="Completed" ${order.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
            </td>
        `;
        adminOrdersTable.appendChild(row);
    });
    
    // Attach change listeners
    attachOrderStatusListeners();
}

// Switch Admin Section
function switchAdminSection(sectionName) {
    // Update navigation
    document.querySelectorAll('.admin-nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === sectionName) {
            btn.classList.add('active');
        }
    });
    
    // Update sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(`admin${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}Section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update header
    const titles = {
        products: { title: 'Products Management', desc: 'Manage product inventory and stock levels' },
        transactions: { title: 'Transaction History', desc: 'View all student transactions and orders' },
        payments: { title: 'Payment Management', desc: 'Monitor and update payment statuses' },
        orders: { title: 'Order Status Management', desc: 'Track and update order fulfillment status' }
    };
    
    if (titles[sectionName]) {
        if (adminSectionTitle) adminSectionTitle.textContent = titles[sectionName].title;
        if (adminSectionDesc) adminSectionDesc.textContent = titles[sectionName].desc;
    }
}

// Attach Stock Update Listeners for Admin Dashboard
function attachAdminStockListeners() {
    const updateButtons = document.querySelectorAll('.admin-product-card .update-stock-btn');
    updateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.admin-product-card');
            const productId = this.getAttribute('data-product-id');
            const stockInput = productCard.querySelector('.stock-input');
            const newStock = parseInt(stockInput.value) || 0;
            
            // Update stock
            productCard.setAttribute('data-stock', newStock);
            productStocks[productId] = newStock;
            
            // Visual feedback
            this.style.background = '#4caf50';
            const icon = this.querySelector('i');
            icon.className = 'fas fa-check';
            
            setTimeout(() => {
                this.style.background = '';
                icon.className = 'fas fa-sync-alt';
            }, 1000);
            
            showSuccessModal('Stock Updated', `Product stock has been updated to ${newStock}.`);
        });
    });
}

// Attach Payment Status Listeners
function attachPaymentStatusListeners() {
    const selects = document.querySelectorAll('.payment-status-select');
    selects.forEach(select => {
        select.addEventListener('change', function() {
            const paymentId = this.getAttribute('data-payment-id');
            const newStatus = this.value;
            
            // Find and update payment
            const payment = adminPayments.find(p => p.id === paymentId);
            if (payment) {
                payment.status = newStatus;
                
                // Update badge
                const badge = this.closest('tr').querySelector('.status-badge');
                badge.className = `status-badge status-${newStatus.toLowerCase()}`;
                badge.textContent = newStatus;
                
                showSuccessModal('Status Updated', `Payment status changed to ${newStatus}`);
            }
        });
    });
}

// Attach Order Status Listeners
function attachOrderStatusListeners() {
    const selects = document.querySelectorAll('.order-status-select');
    selects.forEach(select => {
        select.addEventListener('change', function() {
            const orderId = this.getAttribute('data-order-id');
            const newStatus = this.value;
            
            // Find and update order
            const order = adminOrders.find(o => o.id === orderId);
            if (order) {
                order.status = newStatus;
                
                // Update badge
                const badge = this.closest('tr').querySelector('.status-badge');
                badge.className = `status-badge status-${newStatus.toLowerCase().replace(' ', '-')}`;
                badge.textContent = newStatus;
                
                showSuccessModal('Status Updated', `Order status changed to ${newStatus}`);
            }
        });
    });
}

// Admin Logout
function adminLogout() {
    toggleAdminMode(false);
    showSuccessModal('Admin Logout', 'You have been logged out of Admin Mode.');
}

// Admin Form Submit
if (adminForm) {
    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const enteredUsername = adminUsernameInput.value.trim();
        const enteredPassword = adminPasswordInput.value.trim();
        
        if (enteredUsername === adminCredentials.username && enteredPassword === adminCredentials.password) {
            // Success - Enable Admin Mode
            closeAdminModalFunc();
            closeAccountSidebar(); // Close account sidebar
            toggleAdminMode(true);
            showSuccessModal('Admin Login Success', 'You are now in Admin Mode. You can update product stock levels.');
        } else {
            // Failed
            showSuccessModal('Login Failed', 'Invalid username or password. Please check the credentials displayed above.');
        }
    });
}

// Admin Login Button
if (adminLoginBtn) {
    adminLoginBtn.addEventListener('click', openAdminModal);
}

// Close Admin Modal Button
if (closeAdminModal) {
    closeAdminModal.addEventListener('click', closeAdminModalFunc);
}

// Toggle Admin Password Visibility
if (toggleAdminPassword) {
    toggleAdminPassword.addEventListener('click', () => {
        const input = adminPasswordInput;
        const icon = toggleAdminPassword.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            input.type = 'password';
            icon.className = 'fas fa-eye';
        }
    });
}

// Admin Navigation Buttons
document.querySelectorAll('.admin-nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const section = this.getAttribute('data-section');
        switchAdminSection(section);
    });
});

// Admin Sidebar Logout Button
if (adminLogoutSidebar) {
    adminLogoutSidebar.addEventListener('click', adminLogout);
}

// Close Account Sidebar Function
function closeAccountSidebar() {
    if (accountSidebar) {
        accountSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Attach Event Listeners to Product Cards
function attachProductCardListeners(productCard) {
    // Add to Cart button
    const addToCartBtn = productCard.querySelector('.add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.className = 'fas fa-check';
            this.style.background = '#4caf50';
            this.title = 'Added to Cart';
            
            setTimeout(() => {
                icon.className = 'fas fa-cart-plus';
                this.style.background = '';
                this.title = 'Add to Cart';
            }, 2000);
        });
    }
    
    // Love button
    const loveBtn = productCard.querySelector('.love-btn');
    if (loveBtn) {
        loveBtn.addEventListener('click', function() {
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('₱', '').replace(',', ''));
            const added = addToWishlist(productName, productPrice);
            
            const icon = this.querySelector('i');
            
            if (added) {
                icon.className = 'fas fa-heart';
                icon.style.color = '#ff4757';
                this.style.background = '#ff4757';
                this.title = 'Remove from Favorites';
                
                setTimeout(() => {
                    if (wishlistSidebar) {
                        wishlistSidebar.classList.add('active');
                        overlay.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                }, 300);
            } else {
                icon.className = 'far fa-heart';
                icon.style.color = '';
                this.style.background = '';
                this.title = 'Add to Wishlist';
            }
        });
    }
}

const carouselItemWidth = 280; // Width + gap

// ===== FIREBASE INTEGRATION (Replaces MySQL/API) =====
// Comment: All MySQL queries have been replaced with Firebase Realtime Database
// Old approach: Fetch from API endpoint -> MySQL database
// New approach: Read directly from Firebase Realtime Database

console.log('🔥 Initializing Firebase product loading...');

// ===== CATEGORY NAVIGATION =====
// Commented out: Old MySQL API Configuration
/*
let API_BASE_URL;
if (window.location.hostname === 'localhost') {
    API_BASE_URL = 'http://localhost:8080';
} else if (window.location.hostname.includes('app.github.dev')) {
    const protocol = window.location.protocol;
    const host = window.location.host.replace('-8000.', '-8080.');
    API_BASE_URL = `${protocol}//${host}`;
} else {
    API_BASE_URL = 'http://localhost:8080';
}
*/

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

    // ============================================================================
    // LOAD PRODUCTS FROM FIREBASE (Replaces MySQL SELECT queries)
    // ============================================================================
    // Old: SELECT * FROM products WHERE category = ?
    // New: Firebase Realtime Database query with category mapping
    async function loadProducts(categorySlug) {
        console.log('🔥 Loading products from Firebase for category:', categorySlug);
        
        try {
            // Check if Firebase is available
            if (typeof realtimeDB === 'undefined') {
                console.error('❌ Firebase Realtime Database not initialized!');
                return fallbackToStaticData(categorySlug);
            }
            
            const productsRef = realtimeDB.ref('products');
            
            // Handle 'all-products' - get everything
            if (categorySlug === 'all-products') {
                const snapshot = await productsRef.once('value');
                const data = snapshot.val();
                
                if (data) {
                    const products = Object.keys(data).map(key => ({
                        id: key,
                        name: data[key].name,
                        price: data[key].price,
                        stock_quantity: data[key].stock || 0,
                        description: data[key].description || '',
                        image_url: data[key].image || `images/${key}.jpg`,
                        category_slug: data[key].category || categorySlug
                    }));
                    
                    console.log(`✅ Loaded ${products.length} products from Firebase (all products)`);
                    return products;
                }
            }
            
            // Map website category to Firebase categories
            // Website uses 'supplies' but Firebase might use 'campus-collection' OR 'supplies'
            const categoryVariants = [categorySlug];
            if (categorySlug === 'supplies') {
                categoryVariants.push('campus-collection', 'campus collection');
            } else if (categorySlug === 'campus-collection') {
                categoryVariants.push('supplies');
            }
            
            console.log('🔍 Searching for categories:', categoryVariants);
            
            // Try each category variant
            let allProducts = [];
            for (const variant of categoryVariants) {
                const query = productsRef.orderByChild('category').equalTo(variant);
                const snapshot = await query.once('value');
                const data = snapshot.val();
                
                if (data) {
                    const products = Object.keys(data).map(key => ({
                        id: key,
                        name: data[key].name,
                        price: data[key].price,
                        stock_quantity: data[key].stock || 0,
                        description: data[key].description || '',
                        image_url: data[key].image || `images/${key}.jpg`,
                        category_slug: data[key].category || categorySlug
                    }));
                    allProducts = allProducts.concat(products);
                    console.log(`✅ Found ${products.length} products with category "${variant}"`);
                }
            }
            
            if (allProducts.length > 0) {
                console.log(`✅ Total loaded: ${allProducts.length} products from Firebase`);
                console.log('📋 First product:', allProducts[0].name);
                return allProducts;
            } else {
                console.warn('⚠️ No products found in Firebase for category:', categorySlug);
                console.warn('⚠️ Tried variants:', categoryVariants);
                return [];
            }
            
        } catch (error) {
            console.error('❌ Firebase error:', error.message);
            console.log('📦 Falling back to static data...');
            return fallbackToStaticData(categorySlug);
        }
    }
    
    // Fallback to static data if Firebase fails
    function fallbackToStaticData(categorySlug) {
        console.log('📦 Using static product data for category:', categorySlug);
        
        if (typeof STATIC_PRODUCTS === 'undefined') {
            console.error('❌ Static product data not loaded!');
            showSuccessModal('Data Error', '⚠️ Product data not available. Please ensure products-data.js is loaded.');
            return [];
        }
        
        const products = STATIC_PRODUCTS[categorySlug] || [];
        console.log('✅ Loaded', products.length, 'products from static data');
        return products;
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
            productCard.setAttribute('data-product-id', product.id);
            productCard.setAttribute('data-stock', product.stock_quantity);
            productCard.innerHTML = `
                <div class="product-image">
                    ${product.image_url ? `<img src="${product.image_url}" alt="${product.name}">` : `<div class="image-placeholder">${product.name}</div>`}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    ${product.description ? `<p class="product-desc">${product.description}</p>` : ''}
                    <p class="price">₱${parseFloat(product.price).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    
                    <!-- Stock Display (User Mode) -->
                    <div class="stock-display user-mode-only">
                        <small class="stock-text">Stock: <span class="stock-count">${product.stock_quantity}</span></small>
                    </div>
                    
                    <!-- Admin Controls (Admin Mode) -->
                    <div class="admin-controls admin-mode-only" style="display: none;">
                        <label>Update Stock:</label>
                        <div class="stock-control">
                            <input type="number" class="stock-input" value="${product.stock_quantity}" min="0" max="999">
                            <button class="update-stock-btn" title="Update Stock">
                                <i class="fas fa-sync-alt"></i> Update
                            </button>
                        </div>
                    </div>
                    
                    <div class="product-actions">
                        ${product.stock_quantity > 0 ? 
                            `<button class="buy-now-btn user-mode-only" title="Buy Now">
                                <i class="fas fa-shopping-bag"></i>
                             </button>
                             <button class="add-to-cart user-mode-only" title="Add to Cart">
                                <i class="fas fa-cart-plus"></i>
                             </button>
                             <button class="love-btn user-mode-only" title="Add to Wishlist">
                                <i class="fas fa-heart"></i>
                             </button>` : 
                            `<button class="out-of-stock user-mode-only" disabled>Out of Stock</button>`
                        }
                    </div>
                </div>
            `;
            container.appendChild(productCard);
        });
        
        // Add event listeners for product cards
        const productCards = container.querySelectorAll('.product-card');
        productCards.forEach(card => {
            attachProductCardListeners(card);
            
            // Apply admin mode visibility if already in admin mode
            if (isAdminMode) {
                card.querySelectorAll('.user-mode-only').forEach(el => el.style.display = 'none');
                card.querySelectorAll('.admin-mode-only').forEach(el => el.style.display = 'block');
            }
        });
        
        // Attach stock update listeners if in admin mode
        if (isAdminMode) {
            attachStockUpdateListeners();
        }
        
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

// Payment Method Selector - Show/Hide Payment Details Form
const paymentMethodSelect = document.getElementById('paymentMethod');
const paymentDetailsForm = document.getElementById('paymentDetailsForm');
const paymentFormTitle = document.getElementById('paymentFormTitle');

if (paymentMethodSelect && paymentDetailsForm) {
    paymentMethodSelect.addEventListener('change', function() {
        const selectedMethod = this.value;
        
        // Hide all payment forms first
        const allForms = paymentDetailsForm.querySelectorAll('.payment-form');
        allForms.forEach(form => {
            form.style.display = 'none';
        });
        
        if (selectedMethod) {
            // Show the payment details container
            paymentDetailsForm.style.display = 'block';
            
            // Update the form title
            const methodNames = {
                'gcash': 'GCash Payment Details',
                'maya': 'Maya Payment Details',
                'bank': 'Bank Transfer Details',
                'counter': 'Over the Counter Details',
                'card': 'Card Payment Details',
                'installment': 'Installment Plan Details'
            };
            paymentFormTitle.textContent = methodNames[selectedMethod] || 'Payment Details';
            
            // Show the corresponding form
            const targetForm = paymentDetailsForm.querySelector(`[data-payment="${selectedMethod}"]`);
            if (targetForm) {
                targetForm.style.display = 'block';
            }
        } else {
            // Hide the payment details container if no method selected
            paymentDetailsForm.style.display = 'none';
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

