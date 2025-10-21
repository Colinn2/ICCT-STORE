# 📸 ICCT Store Admin System - Visual Guide

## Step-by-Step Instructions with Screenshots

### 1️⃣ **Opening the Site**
📍 Navigate to: `http://localhost:3000/index.html`

---

### 2️⃣ **Regular User View**
- Click the **Profile icon** (👤) in the top-right corner
- You'll see the account sidebar open

---

### 3️⃣ **Sign In**
- Click **"Sign In"** button
- Enter any credentials:
  - Student Number: Any number (e.g., 12345)
  - Email: Any email (e.g., test@icct.edu.ph)
  - Password: Any password
- Click **"Sign In"**

---

### 4️⃣ **View Admin Credentials** ⭐
**After logging in, look for the purple box!**

The purple gradient box will appear showing:
```
🔑 Admin Credentials (30s)
Username: X7kM9n
Password: Qw3Rt5
```
*Note: Credentials are different each time you reload the page*

**⏰ Important**: Credentials disappear after 30 seconds!

---

### 5️⃣ **Admin Login**
Below the credentials box, click:
**"🛡️ Admin Login"** button

A modal will popup with:
- Username field
- Password field
- "Login as Admin" button

---

### 6️⃣ **Enter Admin Credentials**
1. Type the username from the purple box
2. Type the password from the purple box  
3. Click **"Login as Admin"**

---

### 7️⃣ **Admin Mode Activated!** 🎉

You'll see:

#### ✅ Green Banner at Top:
```
🛡️ Admin Mode Active
```

#### ✅ Transaction History (as before):
- Shows your past orders

#### ✅ **NEW: Payment Management Section**:
```
💳 Payment Management
0 payments

📦 No payments to manage
Transaction payments will appear here
```

#### ✅ **NEW: Exit Admin Mode Button**:
Red button at bottom: **"Sign Out | Exit Admin Mode"**

---

### 8️⃣ **Stock Management (Admin View)**

When you browse products (click "Shop" → any category):

**Regular User Sees:**
```
Stock: 50
[Add to Cart] [❤️]
```

**Admin Sees:**
```
📦 Stock Quantity:
[  50  ] [✓ Update]
```

**To Update Stock:**
1. Change the number in the input field
2. Click **"✓ Update"** button
3. Success message appears: "Stock Updated"

---

### 9️⃣ **Testing Stock Features**

#### As Admin:
1. Go to any product category
2. Change stock to `0`
3. Click **Update**
4. Log out of admin mode

#### As User:
1. Refresh the page
2. Go to that product
3. You'll see:
   ```
   Stock: 0 (in RED)
   [Out of Stock] (button disabled)
   ```

---

### 🔟 **Payment Tracking**

#### Creating a Transaction (as User):
1. Add items to cart
2. Click checkout
3. A transaction is created with "Pending" status

#### Managing Payments (as Admin):
1. Open Profile → Login as admin
2. Scroll to "Payment Management"
3. You'll see transaction cards:

```
┌─────────────────────────────────┐
│ #TXN-1634567890123    [PENDING] │
│                                  │
│ 3 item(s)                        │
│ ₱1,250.00                        │
│ Oct 21, 2025, 12:30 PM          │
│                                  │
│ [✓ Mark Successful] [✗ Mark Failed] │
└─────────────────────────────────┘
```

4. Click buttons to update payment status
5. Status changes color:
   - **Yellow**: Pending
   - **Green**: Successful
   - **Red**: Failed

---

### 1️⃣1️⃣ **Exiting Admin Mode**

Click the **red button** at bottom:
**"🚪 Exit Admin Mode"**

You'll return to regular user view:
- Stock management disappears
- Payment section disappears
- Regular cart buttons return

---

## 🎯 Quick Test Checklist

- [ ] Can you see the purple credentials box? (30 seconds after login)
- [ ] Can you login as admin with those credentials?
- [ ] Does the green "Admin Mode Active" banner appear?
- [ ] Can you see stock input fields instead of cart buttons?
- [ ] Can you update a product's stock?
- [ ] Does the stock persist after page refresh?
- [ ] Can you see the "Payment Management" section?
- [ ] Does setting stock to 0 disable the cart button?
- [ ] Can you exit admin mode successfully?

---

## 💡 Pro Tips

1. **Credentials Auto-Generate**: New credentials every page reload
2. **30-Second Window**: Write down credentials quickly!
3. **Console Logging**: Check browser console for credential info
4. **localStorage**: All data stored locally (no database needed)
5. **Refresh Safe**: Admin session persists across page refreshes

---

## 🔧 Troubleshooting

**Problem**: Can't see credentials box  
**Solution**: Make sure you're logged in first (not just admin - regular user login)

**Problem**: Credentials disappeared  
**Solution**: They hide after 30 seconds. Refresh page to generate new ones.

**Problem**: Admin login not working  
**Solution**: 
1. Check browser console for credentials
2. Copy/paste carefully (case-sensitive)
3. Make sure you waited for page to fully load

**Problem**: Stock not updating  
**Solution**: Make sure you're in admin mode (green banner visible)

---

## 🎉 Enjoy Your Admin System!

All features are now live and working:
- ✅ Random admin credentials
- ✅ Secure admin login
- ✅ Stock management
- ✅ Payment tracking
- ✅ Persistent storage
- ✅ Beautiful UI

**Happy Testing!** 🚀
