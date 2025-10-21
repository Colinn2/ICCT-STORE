// Firebase Services Layer for ICCT Store
// Products & Stock use Realtime Database for instant updates
// Everything else uses Firestore for better querying

// ============================================
// PRODUCTS SERVICE (Realtime Database)
// ============================================
const ProductService = {
  ref: realtimeDB.ref('products'),
  
  // Listen to all products in real-time
  onProductsChange(callback) {
    this.ref.on('value', (snapshot) => {
      const products = [];
      snapshot.forEach((child) => {
        products.push({ ...child.val(), id: child.key });
      });
      console.log(`📦 Loaded ${products.length} products from Realtime DB`);
      callback(products);
    });
  },
  
  // Get products by category
  onCategoryProductsChange(category, callback) {
    const query = this.ref.orderByChild('category').equalTo(category);
    query.on('value', (snapshot) => {
      const products = [];
      snapshot.forEach((child) => {
        products.push({ ...child.val(), id: child.key });
      });
      callback(products);
    });
  },
  
  // Get single product
  async getProduct(productId) {
    const snapshot = await this.ref.child(productId).once('value');
    return snapshot.val();
  },
  
  // Update stock (Admin only)
  async updateStock(productId, newStock) {
    try {
      await this.ref.child(productId).update({
        stock: newStock,
        lastUpdated: firebase.database.ServerValue.TIMESTAMP
      });
      console.log(`✅ Stock updated for product ${productId}: ${newStock}`);
      return true;
    } catch (error) {
      console.error('❌ Error updating stock:', error);
      throw error;
    }
  },
  
  // Update product (Admin only)
  async updateProduct(productId, productData) {
    try {
      await this.ref.child(productId).update({
        ...productData,
        lastUpdated: firebase.database.ServerValue.TIMESTAMP
      });
      console.log(`✅ Product ${productId} updated`);
      return true;
    } catch (error) {
      console.error('❌ Error updating product:', error);
      throw error;
    }
  },
  
  // Add new product (Admin only)
  async addProduct(productData) {
    try {
      const newRef = this.ref.push();
      await newRef.set({
        ...productData,
        id: newRef.key,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        lastUpdated: firebase.database.ServerValue.TIMESTAMP
      });
      console.log(`✅ New product added: ${newRef.key}`);
      return newRef.key;
    } catch (error) {
      console.error('❌ Error adding product:', error);
      throw error;
    }
  },
  
  // Listen to specific product
  onProductChange(productId, callback) {
    this.ref.child(productId).on('value', (snapshot) => {
      callback(snapshot.val());
    });
  },
  
  // Stop listening to all products
  off() {
    this.ref.off();
  },
  
  // Stop listening to specific product
  offProduct(productId) {
    this.ref.child(productId).off();
  }
};

// ============================================
// USER SERVICE (Firestore)
// ============================================
const UserService = {
  collection: firestore.collection('users'),
  
  // Create new user
  async createUser(userData) {
    try {
      const doc = this.collection.doc();
      await doc.set({
        ...userData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
        wishlist: [],
        role: userData.role || 'student'
      });
      console.log(`✅ User created: ${doc.id}`);
      return doc.id;
    } catch (error) {
      console.error('❌ Error creating user:', error);
      throw error;
    }
  },
  
  // Find user by student number
  async findByStudentNumber(studentNumber) {
    try {
      const query = await this.collection
        .where('studentNumber', '==', studentNumber)
        .limit(1)
        .get();
      
      if (query.empty) return null;
      const doc = query.docs[0];
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('❌ Error finding user:', error);
      throw error;
    }
  },
  
  // Get user by ID
  async getUser(userId) {
    try {
      const doc = await this.collection.doc(userId).get();
      if (!doc.exists) return null;
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('❌ Error getting user:', error);
      throw error;
    }
  },
  
  // Update wishlist
  async updateWishlist(userId, wishlist) {
    try {
      await this.collection.doc(userId).update({ wishlist });
      console.log(`✅ Wishlist updated for user ${userId}`);
      return true;
    } catch (error) {
      console.error('❌ Error updating wishlist:', error);
      throw error;
    }
  },
  
  // Update last login
  async updateLastLogin(userId) {
    try {
      await this.collection.doc(userId).update({
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('❌ Error updating last login:', error);
      throw error;
    }
  }
};

// ============================================
// ORDER SERVICE (Firestore)
// ============================================
const OrderService = {
  collection: firestore.collection('orders'),
  
  // Create new order
  async create(orderData) {
    try {
      const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 999)}`;
      const doc = this.collection.doc();
      
      await doc.set({
        ...orderData,
        orderId,
        status: 'pending',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      console.log(`✅ Order created: ${orderId}`);
      return { id: doc.id, orderId };
    } catch (error) {
      console.error('❌ Error creating order:', error);
      throw error;
    }
  },
  
  // Get user orders
  async getUserOrders(userId) {
    try {
      const snapshot = await this.collection
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();
      
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('❌ Error getting user orders:', error);
      throw error;
    }
  },
  
  // Get all orders (Admin)
  async getAllOrders() {
    try {
      const snapshot = await this.collection
        .orderBy('createdAt', 'desc')
        .limit(100)
        .get();
      
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('❌ Error getting all orders:', error);
      throw error;
    }
  },
  
  // Update order status (Admin)
  async updateStatus(docId, status) {
    try {
      await this.collection.doc(docId).update({
        status,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log(`✅ Order status updated: ${status}`);
      return true;
    } catch (error) {
      console.error('❌ Error updating order status:', error);
      throw error;
    }
  },
  
  // Listen to orders in real-time (Admin)
  onOrdersChange(callback) {
    return this.collection
      .orderBy('createdAt', 'desc')
      .limit(50)
      .onSnapshot(snapshot => {
        const orders = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        callback(orders);
      });
  }
};

// ============================================
// PAYMENT SERVICE (Firestore)
// ============================================
const PaymentService = {
  collection: firestore.collection('payments'),
  
  // Create payment record
  async create(paymentData) {
    try {
      const paymentId = `PAY-${Date.now()}-${Math.floor(Math.random() * 999)}`;
      const doc = this.collection.doc();
      
      await doc.set({
        ...paymentData,
        paymentId,
        status: 'pending',
        submittedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      console.log(`✅ Payment created: ${paymentId}`);
      return { id: doc.id, paymentId };
    } catch (error) {
      console.error('❌ Error creating payment:', error);
      throw error;
    }
  },
  
  // Get all payments (Admin)
  async getAll() {
    try {
      const snapshot = await this.collection
        .orderBy('submittedAt', 'desc')
        .limit(100)
        .get();
      
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('❌ Error getting payments:', error);
      throw error;
    }
  },
  
  // Update payment status (Admin)
  async updateStatus(docId, status, adminId) {
    try {
      await this.collection.doc(docId).update({
        status,
        verifiedAt: firebase.firestore.FieldValue.serverTimestamp(),
        verifiedBy: adminId
      });
      console.log(`✅ Payment status updated: ${status}`);
      return true;
    } catch (error) {
      console.error('❌ Error updating payment status:', error);
      throw error;
    }
  },
  
  // Listen to payments in real-time (Admin)
  onPaymentsChange(callback) {
    return this.collection
      .orderBy('submittedAt', 'desc')
      .limit(50)
      .onSnapshot(snapshot => {
        const payments = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        callback(payments);
      });
  }
};

// ============================================
// TRANSACTION SERVICE (Firestore)
// ============================================
const TransactionService = {
  collection: firestore.collection('transactions'),
  
  // Create transaction
  async create(transactionData) {
    try {
      const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 999)}`;
      const doc = this.collection.doc();
      
      await doc.set({
        ...transactionData,
        transactionId,
        processedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      console.log(`✅ Transaction created: ${transactionId}`);
      return { id: doc.id, transactionId };
    } catch (error) {
      console.error('❌ Error creating transaction:', error);
      throw error;
    }
  },
  
  // Get user transactions
  async getUserTransactions(userId) {
    try {
      const snapshot = await this.collection
        .where('userId', '==', userId)
        .orderBy('processedAt', 'desc')
        .get();
      
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('❌ Error getting user transactions:', error);
      throw error;
    }
  },
  
  // Get all transactions (Admin)
  async getAll() {
    try {
      const snapshot = await this.collection
        .orderBy('processedAt', 'desc')
        .limit(100)
        .get();
      
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('❌ Error getting transactions:', error);
      throw error;
    }
  }
};

// ============================================
// ADMIN SERVICE (Firestore)
// ============================================
const AdminService = {
  collection: firestore.collection('admins'),
  
  // Verify admin credentials
  async verifyAdmin(username, password) {
    try {
      const query = await this.collection
        .where('username', '==', username)
        .where('password', '==', password) // In production, use hashed passwords!
        .limit(1)
        .get();
      
      if (query.empty) return null;
      const doc = query.docs[0];
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('❌ Error verifying admin:', error);
      throw error;
    }
  },
  
  // Create admin account
  async createAdmin(adminData) {
    try {
      const doc = this.collection.doc();
      await doc.set({
        ...adminData,
        role: 'admin',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log(`✅ Admin created: ${doc.id}`);
      return doc.id;
    } catch (error) {
      console.error('❌ Error creating admin:', error);
      throw error;
    }
  }
};

// ============================================
// Export to global scope
// ============================================
window.DB = {
  ProductService,
  UserService,
  OrderService,
  PaymentService,
  TransactionService,
  AdminService
};

console.log('✅ Firebase Services initialized');
