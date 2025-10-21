# Firebase Integration Guide - ICCT Store

## 🔥 Overview

The ICCT Store now uses **Firebase** as its backend database solution:
- **Realtime Database**: Products & Stock (for instant updates)
- **Firestore**: Everything else (Orders, Payments, Transactions, Users)

---

## 📁 Files Created

1. **firebase-config.js** - Firebase initialization and configuration
2. **firebase-services.js** - Service layer for database operations
3. **index.html** - Updated with Firebase SDK imports

---

## 🗄️ Database Structure

### Realtime Database (Products & Stock)

```json
{
  "products": {
    "prod_001": {
      "id": "prod_001",
      "name": "Male School Uniform",
      "category": "uniforms",
      "price": 1200,
      "stock": 50,
      "image": "images/male-uniform.png",
      "description": "Official ICCT male school uniform",
      "featured": true,
      "sizes": {
        "XS": 10,
        "S": 15,
        "M": 15,
        "L": 8,
        "XL": 2
      },
      "lastUpdated": 1729468800000
    }
  }
}
```

### Firestore Collections

#### **users** collection
```javascript
{
  userId: "user_abc123",
  studentNumber: "2024-12345",
  email: "student@icct.edu.ph",
  name: "Juan Dela Cruz",
  role: "student",
  wishlist: ["prod_001", "prod_003"],
  createdAt: Timestamp,
  lastLogin: Timestamp
}
```

#### **orders** collection
```javascript
{
  orderId: "ORD-1729468800-123",
  userId: "user_abc123",
  studentNumber: "2024-12345",
  studentName: "Juan Dela Cruz",
  items: [
    {
      productId: "prod_001",
      name: "Male School Uniform",
      price: 1200,
      quantity: 1,
      size: "M"
    }
  ],
  total: 1200,
  status: "pending",
  paymentMethod: "gcash",
  paymentStatus: "pending",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### **payments** collection
```javascript
{
  paymentId: "PAY-1729468800-456",
  orderId: "ORD-1729468800-123",
  userId: "user_abc123",
  amount: 1200,
  method: "gcash",
  status: "pending",
  referenceNumber: "GCASH123456",
  submittedAt: Timestamp,
  verifiedAt: Timestamp,
  verifiedBy: "admin_xyz"
}
```

#### **transactions** collection
```javascript
{
  transactionId: "TXN-1729468800-789",
  orderId: "ORD-1729468800-123",
  userId: "user_abc123",
  studentNumber: "2024-12345",
  amount: 1200,
  status: "completed",
  processedAt: Timestamp,
  processedBy: "admin_xyz"
}
```

#### **admins** collection
```javascript
{
  username: "admin",
  password: "hashed_password", // Use bcrypt in production!
  email: "admin@icct.edu.ph",
  name: "Admin User",
  role: "admin",
  createdAt: Timestamp
}
```

---

## 🚀 How to Use Firebase Services

### 1. Products (Realtime Database)

```javascript
// Listen to all products in real-time
DB.ProductService.onProductsChange((products) => {
  console.log('Products:', products);
  // Update UI with products
});

// Listen to products by category
DB.ProductService.onCategoryProductsChange('uniforms', (products) => {
  console.log('Uniforms:', products);
});

// Get single product
const product = await DB.ProductService.getProduct('prod_001');

// Update stock (Admin)
await DB.ProductService.updateStock('prod_001', 45);

// Add new product (Admin)
const productId = await DB.ProductService.addProduct({
  name: "New Product",
  category: "uniforms",
  price: 1500,
  stock: 30,
  image: "images/new-product.png"
});

// Stop listening
DB.ProductService.off();
```

### 2. Users (Firestore)

```javascript
// Create new user
const userId = await DB.UserService.createUser({
  studentNumber: "2024-12345",
  email: "student@icct.edu.ph",
  name: "Juan Dela Cruz",
  password: "hashed_password"
});

// Find user by student number
const user = await DB.UserService.findByStudentNumber("2024-12345");

// Get user by ID
const user = await DB.UserService.getUser(userId);

// Update wishlist
await DB.UserService.updateWishlist(userId, ["prod_001", "prod_003"]);
```

### 3. Orders (Firestore)

```javascript
// Create new order
const { id, orderId } = await DB.OrderService.create({
  userId: "user_abc123",
  studentNumber: "2024-12345",
  studentName: "Juan Dela Cruz",
  items: [
    {
      productId: "prod_001",
      name: "Male School Uniform",
      price: 1200,
      quantity: 1
    }
  ],
  total: 1200,
  paymentMethod: "gcash"
});

// Get user orders
const orders = await DB.OrderService.getUserOrders(userId);

// Get all orders (Admin)
const allOrders = await DB.OrderService.getAllOrders();

// Update order status (Admin)
await DB.OrderService.updateStatus(orderId, "processing");

// Listen to orders in real-time (Admin)
const unsubscribe = DB.OrderService.onOrdersChange((orders) => {
  console.log('Orders updated:', orders);
});
// Later: unsubscribe();
```

### 4. Payments (Firestore)

```javascript
// Create payment record
const { id, paymentId } = await DB.PaymentService.create({
  orderId: "ORD-1729468800-123",
  userId: "user_abc123",
  amount: 1200,
  method: "gcash",
  referenceNumber: "GCASH123456"
});

// Get all payments (Admin)
const payments = await DB.PaymentService.getAll();

// Update payment status (Admin)
await DB.PaymentService.updateStatus(paymentId, "verified", adminId);

// Listen to payments (Admin)
const unsubscribe = DB.PaymentService.onPaymentsChange((payments) => {
  console.log('Payments updated:', payments);
});
```

### 5. Transactions (Firestore)

```javascript
// Create transaction
const { id, transactionId } = await DB.TransactionService.create({
  orderId: "ORD-1729468800-123",
  userId: "user_abc123",
  studentNumber: "2024-12345",
  amount: 1200,
  status: "completed"
});

// Get user transactions
const transactions = await DB.TransactionService.getUserTransactions(userId);

// Get all transactions (Admin)
const allTransactions = await DB.TransactionService.getAll();
```

### 6. Admin Service (Firestore)

```javascript
// Verify admin credentials
const admin = await DB.AdminService.verifyAdmin("admin123", "password");

if (admin) {
  console.log('Admin verified:', admin);
} else {
  console.log('Invalid credentials');
}

// Create admin account
const adminId = await DB.AdminService.createAdmin({
  username: "admin123",
  password: "hashed_password",
  email: "admin@icct.edu.ph",
  name: "Admin User"
});
```

---

## 🔧 Setting Up Firebase Console

### Step 1: Configure Realtime Database

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **icct-store-29ea5**
3. Navigate to **Realtime Database**
4. Click **Create Database**
5. Choose location (e.g., asia-southeast1)
6. Start in **test mode** (or use rules below)

### Step 2: Set Database URL

The Realtime Database URL should be:
```
https://icct-store-29ea5-default-rtdb.firebaseio.com
```

This is already added in `firebase-config.js`.

### Step 3: Import Sample Data

In Firebase Realtime Database, import your products:

```json
{
  "products": {
    "prod_001": {
      "id": "prod_001",
      "name": "Male School Uniform",
      "category": "uniforms",
      "price": 1200,
      "stock": 50,
      "image": "images/boy unif.png",
      "description": "Complete male school uniform set",
      "featured": true,
      "lastUpdated": 1729468800000
    }
  }
}
```

### Step 4: Configure Firestore

1. Navigate to **Firestore Database**
2. Click **Create Database**
3. Choose location (same as Realtime DB)
4. Start in **test mode**

### Step 5: Set Security Rules

#### Realtime Database Rules

```json
{
  "rules": {
    "products": {
      ".read": true,
      ".write": "auth != null && root.child('admins').child(auth.uid).exists()"
    }
  }
}
```

#### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        (request.auth.uid == userId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    match /orders/{orderId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /payments/{paymentId} {
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      allow write: if request.auth != null;
    }
    
    match /transactions/{transactionId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /admins/{adminId} {
      allow read: if request.auth != null;
      allow write: if false; // Only via Firebase Console
    }
  }
}
```

---

## 🔒 Security Notes

### ⚠️ Important: Password Hashing

The current implementation stores passwords in plain text for testing. **DO NOT use this in production!**

For production, use:
1. **Firebase Authentication** for user management
2. **bcrypt.js** for password hashing
3. **Secure environment variables** for sensitive data

### Example with Firebase Auth:

```javascript
// Sign up
await firebase.auth().createUserWithEmailAndPassword(email, password);

// Sign in
await firebase.auth().signInWithEmailAndPassword(email, password);

// Check auth state
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('User logged in:', user.uid);
  }
});
```

---

## 📊 Migrating from Static Data to Firebase

### Step 1: Convert products-data.js to Firebase

Run this script in your browser console to upload products:

```javascript
// Upload all products from STATIC_PRODUCTS to Firebase
async function migrateProductsToFirebase() {
  const categories = Object.keys(STATIC_PRODUCTS);
  
  for (const category of categories) {
    const products = STATIC_PRODUCTS[category];
    
    for (const product of products) {
      const productId = `prod_${product.id}`;
      await realtimeDB.ref(`products/${productId}`).set({
        id: productId,
        name: product.name,
        category: product.category_slug,
        price: product.price,
        stock: product.stock_quantity,
        image: product.image_url,
        description: product.description,
        featured: false,
        lastUpdated: Date.now()
      });
      console.log(`✅ Uploaded: ${product.name}`);
    }
  }
  
  console.log('🎉 Migration complete!');
}

// Run migration
migrateProductsToFirebase();
```

### Step 2: Update script.js to use Firebase

Replace the static data loading with Firebase:

```javascript
// OLD: Load from STATIC_PRODUCTS
// NEW: Load from Firebase
DB.ProductService.onProductsChange((products) => {
  renderProducts(products);
});
```

---

## 🧪 Testing Firebase Integration

### Test 1: Load Products

```javascript
// Open browser console and run:
DB.ProductService.onProductsChange((products) => {
  console.log('Products loaded:', products);
});
```

### Test 2: Update Stock (Admin)

```javascript
await DB.ProductService.updateStock('prod_001', 45);
// Check Firebase Console to see update
```

### Test 3: Create Order

```javascript
const order = await DB.OrderService.create({
  userId: "test_user",
  studentNumber: "2024-99999",
  studentName: "Test Student",
  items: [{ productId: "prod_001", name: "Test", price: 100, quantity: 1 }],
  total: 100,
  paymentMethod: "cash"
});
console.log('Order created:', order);
```

---

## 📱 Real-time Updates

### Products automatically update when stock changes:

```javascript
// Admin updates stock
await DB.ProductService.updateStock('prod_001', 40);

// All connected clients see the update instantly!
DB.ProductService.onProductChange('prod_001', (product) => {
  console.log('Product updated:', product.stock); // 40
  // Update UI immediately
});
```

---

## 🚀 Deployment Checklist

- [ ] Firebase project created
- [ ] Realtime Database configured
- [ ] Firestore configured
- [ ] Security rules set
- [ ] Sample data uploaded
- [ ] firebase-config.js configured
- [ ] firebase-services.js included
- [ ] index.html updated with Firebase SDKs
- [ ] Testing completed
- [ ] Production security rules applied
- [ ] Firebase Authentication enabled (recommended)

---

## 📚 Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Realtime Database Guide](https://firebase.google.com/docs/database)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Firebase Console](https://console.firebase.google.com)

---

**Status**: ✅ Firebase Integration Complete  
**Last Updated**: October 21, 2025  
**Version**: 1.0
