# 🔍 Product Loading Diagnostic Guide

## Problem: "No products available in this category"

You have **49 products in Firebase** but they're not showing on the website.

---

## 🎯 Step 1: Check What Categories Your Products Have

1. **Open this file in your browser**: `check-firebase-products.html`
2. Click **"🏷️ List Category Slugs"**
3. This will show you what `category` values your 49 products have in Firebase

---

## 📋 Common Category Mismatch Issues

### Your Website Navigation Uses:
- `uniforms` (for Uniforms category)
- `documents` (for Documents category)
- `supplies` (for Campus Collection category) ⚠️
- `fees` (for Fees category)

### Firebase Products Might Use:
- `uniforms` ✅
- `documents` ✅
- `campus-collection` ❌ (mismatch with `supplies`)
- `fees` ✅

---

## 🔧 Quick Fixes

### Fix #1: If Your Products Use Different Category Names

**Check your products first:**
```bash
Open: check-firebase-products.html
Click: "🏷️ List Category Slugs"
Compare the category slugs shown with what the website expects
```

**Then update your Firebase products to match:**
- If products have `campus-collection`, change to `supplies`
- If products have other names, standardize them

### Fix #2: Update Website to Match Your Firebase Categories

Open `index.html` and find line 45:
```html
<li><a href="#supplies" class="category-link">Campus Collection</a></li>
```

Change `#supplies` to match your Firebase category name (e.g., `#campus-collection`)

---

## 🐛 Debugging Steps

### Step 1: Check Browser Console

Open your website → Press F12 → Go to Console tab

**When you click "Uniforms", you should see:**
```
🔥 Loading products from Firebase for category: uniforms
✅ Loaded X products from Firebase
📋 First product: [product name]
🎨 Rendering products...
✅ Rendered X products to container
```

**If you see this instead:**
```
⚠️ No products found in Firebase for category: uniforms
```
→ **Your category names don't match!**

### Step 2: Check Category Values in Firebase

1. Open: https://console.firebase.google.com/project/icct-store-29ea5/database
2. Navigate to `products/`
3. Click on any product
4. Look at the `category` field
5. **Write down the exact category name** (case-sensitive!)

### Step 3: Verify Database URL

Open browser console and run:
```javascript
console.log(firebase.database().ref().toString());
```

**Should show:**
```
https://icct-store-29ea5-default-rtdb.asia-southeast1.firebasedatabase.app/
```

If it shows `.firebaseio.com`, the database URL is wrong!

---

## 🎯 Most Likely Issue: Category Name Mismatch

### Scenario A: Products use `campus-collection`, website uses `supplies`

**Option 1: Update Firebase Products**
```javascript
// Run this in Firebase Console or browser
const updates = {};
firebase.database().ref('products').once('value').then(snapshot => {
    snapshot.forEach(child => {
        if (child.val().category === 'campus-collection') {
            updates[`products/${child.key}/category`] = 'supplies';
        }
    });
    return firebase.database().ref().update(updates);
});
```

**Option 2: Update Website Navigation**
Change `index.html` line 45:
```html
<!-- FROM: -->
<li><a href="#supplies" class="category-link">Campus Collection</a></li>

<!-- TO: -->
<li><a href="#campus-collection" class="category-link">Campus Collection</a></li>
```

And change `index.html` line ~700 (the section ID):
```html
<!-- FROM: -->
<section id="supplies" class="category-section hidden">

<!-- TO: -->
<section id="campus-collection" class="category-section hidden">
```

---

## 🧪 Test Firebase Query Manually

Open browser console on your website and run:

```javascript
// Test query for uniforms
firebase.database().ref('products')
    .orderByChild('category')
    .equalTo('uniforms')
    .once('value')
    .then(snapshot => {
        console.log('Uniforms found:', snapshot.val());
    });

// Test query for all products
firebase.database().ref('products')
    .once('value')
    .then(snapshot => {
        const data = snapshot.val();
        console.log('Total products:', Object.keys(data).length);
        console.log('Categories:', [...new Set(Object.values(data).map(p => p.category))]);
    });
```

---

## ✅ Expected Product Structure

Each product in Firebase should have:
```json
{
  "products": {
    "uniform-male": {
      "name": "ICCT Uniform (Male)",
      "price": 550,
      "stock": 45,
      "category": "uniforms",  ← MUST MATCH website navigation
      "description": "...",
      "image": "images/uniform-male.jpg"
    }
  }
}
```

---

## 📝 Summary Checklist

- [ ] Run `check-firebase-products.html` to see category names
- [ ] Compare Firebase categories with website navigation
- [ ] Fix mismatches (either in Firebase or in index.html)
- [ ] Verify database URL is Asia Southeast region
- [ ] Test category loading in browser console
- [ ] Clear browser cache and test

---

## 🚨 Quick Diagnostic Script

Run this in your browser console:

```javascript
// Comprehensive diagnostic
(async function() {
    console.log('🔍 Running diagnostics...');
    
    // Check Firebase initialization
    console.log('1. Firebase URL:', firebase.database().ref().toString());
    
    // Get all products
    const snapshot = await firebase.database().ref('products').once('value');
    const products = snapshot.val();
    
    if (!products) {
        console.error('❌ No products in Firebase!');
        return;
    }
    
    console.log('2. Total products:', Object.keys(products).length);
    
    // Get unique categories
    const categories = [...new Set(Object.values(products).map(p => p.category))];
    console.log('3. Categories in Firebase:', categories);
    
    // Check each category
    for (const cat of categories) {
        const catSnapshot = await firebase.database().ref('products')
            .orderByChild('category')
            .equalTo(cat)
            .once('value');
        const count = Object.keys(catSnapshot.val() || {}).length;
        console.log(`   - ${cat}: ${count} products`);
    }
    
    console.log('✅ Diagnostic complete!');
})();
```

---

## 💡 Most Likely Solution

Based on common issues, the problem is probably one of these:

1. **Category mismatch**: Firebase has `campus-collection`, website expects `supplies`
2. **Missing products**: Products exist but have `null` or empty `category` field
3. **Database URL**: Wrong region (should be Asia Southeast)

**Run `check-firebase-products.html` → "List Category Slugs" to confirm!**
