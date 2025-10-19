# 🎬 Visual Demo: Account & Transaction History

## Step-by-Step Visual Guide

---

## 🏁 Starting Point: Not Logged In

### Navigation Bar
```
┌─────────────────────────────────────────────────────────┐
│  🏫 ICCT Store   [Home] [Shop] [Payment] [About]       │
│                                                         │
│                            [🔍 Search]  🛒(0) ❤️(0) 👤 │
└─────────────────────────────────────────────────────────┘
                                                      ↑
                                           Click this icon!
```

---

## Step 1️⃣: Click Profile Icon

### What Happens:
- Account sidebar slides in from the right
- Overlay darkens the background
- Body scroll is disabled

```
┌──────────────────────────────┬────────────────────────┐
│                              │  👤 My Account    ✕   │
│   Main Content (darkened)    ├────────────────────────┤
│                              │                        │
│   🏬 ICCT STORE             │       🔒               │
│                              │                        │
│   Browse Products...         │    Welcome!            │
│                              │                        │
│                              │  Please sign in to     │
│                              │  view your account     │
│                              │  and transaction       │
│                              │  history               │
│                              │                        │
│                              │   ┌──────────────┐    │
│                              │   │ 🔑 Sign In   │    │
│                              │   └──────────────┘    │
│                              │        ↑               │
│                              │   Click here!          │
└──────────────────────────────┴────────────────────────┘
```

---

## Step 2️⃣: Click "Sign In" Button

### What Happens:
- Account sidebar closes temporarily
- Login modal appears in center
- Form with 3 fields is displayed

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│         (Darkened Background - Overlay)              │
│                                                      │
│      ┌────────────────────────────────┐            │
│      │                                 │            │
│      │         👤 User Circle          │            │
│      │     Sign In to Continue         │            │
│      │  Please log in to complete...   │            │
│      │                                 │            │
│      │  📇 Student Number              │            │
│      │  [____________________]         │            │
│      │                                 │            │
│      │  ✉️ Email Address               │            │
│      │  [____________________]         │            │
│      │                                 │            │
│      │  🔒 Password                    │            │
│      │  [____________________] 👁️      │            │
│      │                                 │            │
│      │     ┌──────────────┐           │            │
│      │     │ 🔑 Sign In   │           │            │
│      │     └──────────────┘           │            │
│      │                                 │            │
│      └────────────────────────────────┘            │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## Step 3️⃣: Fill in Login Form

### Enter Any Credentials (Demo Mode):
```
Student Number: 2021-12345
Email: juan.delacruz@icct.edu.ph
Password: mypassword123
```

### Form After Filling:
```
┌────────────────────────────────┐
│  📇 Student Number              │
│  [2021-12345_______________]   │
│                                 │
│  ✉️ Email Address               │
│  [juan.delacruz@icct.edu.ph]  │
│                                 │
│  🔒 Password                    │
│  [••••••••••••••] 👁️          │
│                                 │
│     ┌──────────────┐           │
│     │ 🔑 Sign In   │ ← Click!  │
│     └──────────────┘           │
└────────────────────────────────┘
```

---

## Step 4️⃣: Successfully Logged In!

### Account Sidebar - Logged In State
```
┌────────────────────────────────────────┐
│  👤 My Account                    ✕    │
├────────────────────────────────────────┤
│ ┌────────────────────────────────────┐ │
│ │      ICCT Blue Gradient Header     │ │
│ │                                    │ │
│ │   👤           Student: 2021-12345 │ │
│ │   Big       juan.delacruz@icct... │ │
│ │   Icon      [ID: 2021-12345]      │ │
│ │                                    │ │
│ └────────────────────────────────────┘ │
├────────────────────────────────────────┤
│  📜 Transaction History     0 orders   │
├────────────────────────────────────────┤
│                                        │
│           🛍️                          │
│      No transactions yet               │
│   Your order history will appear here  │
│                                        │
├────────────────────────────────────────┤
│       ┌────────────────────┐          │
│       │  🚪 Sign Out       │          │
│       └────────────────────┘          │
└────────────────────────────────────────┘
```

---

## Step 5️⃣: Shop & Add Items to Cart

### Shopping Experience:
```
Main Page → Browse Products → Add to Cart

Example Cart:
┌─────────────────────────────┐
│  🛒 Shopping Cart           │
├─────────────────────────────┤
│  ICCT Uniform               │
│  ₱200.00 x 2 = ₱400.00     │
│                             │
│  Student ID                 │
│  ₱50.00 x 1 = ₱50.00       │
├─────────────────────────────┤
│  Total: ₱450.00            │
│                             │
│  ┌─────────────────┐       │
│  │   Checkout      │       │
│  └─────────────────┘       │
└─────────────────────────────┘
```

---

## Step 6️⃣: Click Checkout

### What Happens:
```
1. System checks if logged in ✅
2. Creates transaction record
3. Shows success message
4. Clears cart
5. Updates transaction history
```

### Success Message:
```
┌──────────────────────────────────────┐
│  ✅ Success!                         │
│                                      │
│  Thank you for your purchase,        │
│  2021-12345!                         │
│  Your order has been placed.         │
│                                      │
│          [OK]                        │
└──────────────────────────────────────┘
```

---

## Step 7️⃣: View Transaction History

### Click Profile Icon Again:
```
┌────────────────────────────────────────┐
│  👤 My Account                    ✕    │
├────────────────────────────────────────┤
│ ┌────────────────────────────────────┐ │
│ │      👤    Student: 2021-12345     │ │
│ │            juan.delacruz@icct...   │ │
│ │            [ID: 2021-12345]        │ │
│ └────────────────────────────────────┘ │
├────────────────────────────────────────┤
│  📜 Transaction History     1 order    │
├────────────────────────────────────────┤
│ ┌────────────────────────────────────┐ │
│ │ TXN-1729350000    10/19/2025, 3:30│ │
│ │                      ✅ Completed  │ │
│ │                                    │ │
│ │ Items:                             │ │
│ │ ICCT Uniform (x2), Student ID (x1) │ │
│ │                                    │ │
│ │ ────────────────────────────────── │ │
│ │ Total:               ₱450.00       │ │
│ └────────────────────────────────────┘ │
│                                        │
├────────────────────────────────────────┤
│       ┌────────────────────┐          │
│       │  🚪 Sign Out       │          │
│       └────────────────────┘          │
└────────────────────────────────────────┘
```

---

## Step 8️⃣: Multiple Transactions

### After Several Purchases:
```
┌────────────────────────────────────────┐
│  📜 Transaction History     3 orders   │
├────────────────────────────────────────┤
│ ┌────────────────────────────────────┐ │
│ │ TXN-1729360000    10/19/2025, 4:15│ │ ← Newest
│ │                      ✅ Completed  │ │
│ │ Items: Books (x3), Pen (x5)        │ │
│ │ Total:               ₱320.00       │ │
│ └────────────────────────────────────┘ │
│                                        │
│ ┌────────────────────────────────────┐ │
│ │ TXN-1729355000    10/19/2025, 3:45│ │
│ │                      ✅ Completed  │ │
│ │ Items: ID Lace (x2)                │ │
│ │ Total:               ₱100.00       │ │
│ └────────────────────────────────────┘ │
│                                        │
│ ┌────────────────────────────────────┐ │
│ │ TXN-1729350000    10/19/2025, 3:30│ │ ← Oldest
│ │                      ✅ Completed  │ │
│ │ Items: Uniform (x2), ID (x1)       │ │
│ │ Total:               ₱450.00       │ │
│ └────────────────────────────────────┘ │
└────────────────────────────────────────┘
```

---

## Step 9️⃣: Sign Out

### Click "Sign Out" Button:
```
┌──────────────────────────────────────┐
│  ⚠️ Confirm Sign Out                 │
│                                      │
│  Are you sure you want to sign out?  │
│                                      │
│     [Cancel]         [OK]            │
│                        ↑             │
│                   Click here         │
└──────────────────────────────────────┘
```

### After Confirmation:
```
┌──────────────────────────────────────┐
│  ✅ Success!                         │
│                                      │
│  You have been signed out            │
│  successfully.                       │
│                                      │
│          [OK]                        │
└──────────────────────────────────────┘
```

### Back to Not Logged In State:
```
┌────────────────────────────────────────┐
│  👤 My Account                    ✕    │
├────────────────────────────────────────┤
│                                        │
│               🔒                       │
│                                        │
│            Welcome!                    │
│                                        │
│      Please sign in to view            │
│      your account and                  │
│      transaction history               │
│                                        │
│        ┌──────────────┐               │
│        │ 🔑 Sign In   │               │
│        └──────────────┘               │
│                                        │
└────────────────────────────────────────┘
```

---

## 📱 Mobile View

### Mobile Account Sidebar (Full Width):
```
┌─────────────────────────────┐
│  👤 My Account         ✕    │
├─────────────────────────────┤
│  ┌───────────────────────┐  │
│  │        👤            │  │
│  │   Student: 2021-12345│  │
│  │   juan@icct.edu.ph   │  │
│  │   [ID: 2021-12345]   │  │
│  └───────────────────────┘  │
├─────────────────────────────┤
│  📜 Transactions  2 orders  │
├─────────────────────────────┤
│  ┌───────────────────────┐  │
│  │ TXN-1729360000       │  │
│  │ 10/19/2025    ✅     │  │
│  │ Items: Books (x3)    │  │
│  │ Total: ₱320.00       │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ TXN-1729350000       │  │
│  │ 10/19/2025    ✅     │  │
│  │ Items: Uniform (x2)  │  │
│  │ Total: ₱450.00       │  │
│  └───────────────────────┘  │
├─────────────────────────────┤
│    ┌─────────────────┐     │
│    │  🚪 Sign Out    │     │
│    └─────────────────┘     │
└─────────────────────────────┘
```

---

## 🎯 Key UI Elements

### Status Badges:
```
✅ Completed    (Green background)
⏳ Pending      (Yellow background)
🔄 Processing   (Blue background)
```

### Transaction Card States:
```
Default:        Light gray background
Hover:          White background + shadow + lift
Active:         Pressed state
```

### Button States:
```
Sign In:        Blue → Dark Blue on hover
Sign Out:       Red → Dark Red on hover
Close (X):      Gray → Blue on hover
```

---

## ⚡ Animations

### Sidebar Open:
```
Position: right -450px → right 0
Duration: 0.3s
Easing: ease-in-out
```

### Overlay Fade:
```
Opacity: 0 → 1
Duration: 0.3s
```

### Transaction Card Hover:
```
Transform: translateY(0) → translateY(-2px)
Box-shadow: none → 0 2px 8px rgba(0,0,0,0.1)
Duration: 0.3s
```

---

## 🎨 Color Reference

### Primary Colors:
- **ICCT Blue:** #0066cc
- **Navy:** #003d7a
- **Red (Sign Out):** #f44336

### Status Colors:
- **Completed:** #d4edda (bg), #155724 (text)
- **Pending:** #fff3cd (bg), #856404 (text)
- **Processing:** #d1ecf1 (bg), #0c5460 (text)

### Neutral Colors:
- **Background:** #f9f9f9
- **Border:** #eee
- **Text Primary:** #333
- **Text Secondary:** #666
- **Text Light:** #999

---

## ✅ Complete Feature Checklist

### Navigation:
- [✅] Profile icon visible in navbar
- [✅] Icon has tooltip on hover
- [✅] Click opens account sidebar

### Not Logged In:
- [✅] Welcome message displayed
- [✅] Lock icon shown
- [✅] Sign in button present
- [✅] Click opens login modal

### Logged In:
- [✅] User info displayed
- [✅] Avatar icon shown
- [✅] Student number as name
- [✅] Email address visible
- [✅] Student ID badge present

### Transactions:
- [✅] Transaction count badge
- [✅] Empty state when no orders
- [✅] Transaction cards rendered
- [✅] Transaction ID shown
- [✅] Date and time displayed
- [✅] Items list visible
- [✅] Total amount shown
- [✅] Status badge present

### Interactions:
- [✅] Close button works
- [✅] Overlay click closes sidebar
- [✅] Sign in button functional
- [✅] Sign out confirmation works
- [✅] Smooth animations
- [✅] Hover effects working

---

## 🎉 That's It!

**You now have a complete account and transaction history system!**

Enjoy tracking your ICCT Store purchases! 🛍️✨
