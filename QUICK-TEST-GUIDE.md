# 🎬 Quick Visual Test Guide - Stock Sync & Layout

## 🚀 Instant Test Instructions

**Time Required**: 2 minutes  
**Status**: Ready to test now!

---

## Test 1: Admin Panel with Images (30 seconds)

### Steps:
```
1. Go to: http://localhost:3000
2. Click: 👤 Profile icon (top-right)
3. Click: "Admin Login" button
4. Enter: Any username (e.g., "admin")
5. Enter: Any password (e.g., "123")
6. Click: "Login as Admin"
7. ✅ You're now in admin dashboard!
```

### What to Look For:
```
✅ Products display in a grid
✅ Each card shows:
   - Product image OR placeholder with icon
   - Product name (bold, white)
   - Price (large, gold color: ₱450.00)
   - Category with tag icon (🏷️ Uniforms)
   - Stock control section at bottom
   - Number input with current stock
   - Green "Update" button

✅ Hover over any card:
   - Border turns purple
   - Card lifts slightly
   - Shadow appears
```

---

## Test 2: Update Stock (30 seconds)

### Steps:
```
1. Find "ICCT Polo Shirt" (or any product)
2. See stock input showing "50"
3. Click in the input box
4. Change to: 10
5. Click: Green "Update" button
6. ✅ Success modal appears
7. Click: "OK"
```

### What to Look For:
```
✅ Input value changes to 10
✅ Success modal shows:
   "Stock Updated"
   "✅ ICCT Polo Shirt stock updated to 10"
✅ Green checkmark icon visible
✅ Modal has "OK" button
```

---

## Test 3: Student View - Stock Display (30 seconds)

### Steps:
```
1. Click: "Logout" button (bottom of sidebar)
2. ✅ Returns to normal store view
3. Browse to: Uniforms section
4. Find: "ICCT Polo Shirt"
5. Look above the buttons
```

### What to Look For:
```
✅ Blue box above buttons showing:
   📦 Stock: 10

✅ Stock display has:
   - Box/package icon (📦)
   - Text: "Stock: 10"
   - Blue background
   - Blue border
   - Centered layout

✅ Buttons below are:
   - 🛍️ Buy Now (active)
   - 🛒 Add to Cart (active)
   - ❤️ Wishlist (active)
```

---

## Test 4: Out of Stock (30 seconds)

### Steps:
```
1. Login as admin again
2. Find same product (ICCT Polo Shirt)
3. Change stock to: 0
4. Click: "Update"
5. Click: "OK" on success modal
6. Click: "Logout"
7. Browse to Uniforms
8. Find: ICCT Polo Shirt
```

### What to Look For:
```
✅ Stock display shows:
   📦 Stock: 0 (RED text!)

✅ Below it, instead of normal buttons:
   - Single button saying "🚫 Out of Stock"
   - Button is grayed out
   - Button is disabled (can't click)
   - Ban icon visible

✅ Note: Wishlist might still work (depends on design)
```

---

## Test 5: Image Display Check (15 seconds)

### Steps:
```
1. Login as admin
2. Scroll through all products
3. Look at product images
```

### What to Look For:
```
✅ Products WITH images:
   - Real product photo displays
   - Image fills space nicely
   - No broken image icon

✅ Products WITHOUT images:
   - Gradient background (purple/blue)
   - Large image icon (🖼️)
   - Product name below icon
   - Centered layout
```

---

## 🎯 Quick Checklist

After testing, verify these items:

### Admin Panel:
- [ ] Product images load or show placeholder
- [ ] Stock input is editable
- [ ] Update button is green and clickable
- [ ] Success notification appears on update
- [ ] Card hover effect works (purple border + lift)
- [ ] Category icon displayed

### Student View:
- [ ] Stock display visible above buttons
- [ ] Stock number is correct (matches admin update)
- [ ] Blue box styling present
- [ ] Icon (📦) visible
- [ ] Text is readable

### Out of Stock:
- [ ] Stock shows "0" in RED
- [ ] "Out of Stock" button appears
- [ ] Button is grayed out
- [ ] Button is disabled (can't click)
- [ ] Ban icon visible

### Synchronization:
- [ ] Admin changes reflect in student view
- [ ] Stock persists on page refresh (if admin logged in)
- [ ] Stock resets to default on logout

---

## 🐛 Troubleshooting

### Issue: Products not showing in admin
**Solution**: 
- Check browser console (F12) for errors
- Verify API is returning data
- Check if products exist in database

### Issue: Stock not updating
**Solution**:
- Check browser localStorage (F12 → Application → Local Storage)
- Look for keys like `stock_product-id`
- Verify number is being saved

### Issue: Images not displaying
**Solution**:
- Check image URLs in database
- Verify image files exist
- Check browser console for 404 errors
- Placeholder should appear if no image

### Issue: Stock display not showing in student view
**Solution**:
- Clear browser cache
- Refresh page (F5)
- Check if stock display CSS is loaded
- Verify JavaScript is running

---

## 📊 Expected Visual Results

### Admin Product Card:
```
╔═════════════════════════════════╗
║ ┌───────────────────────────┐  ║
║ │                           │  ║
║ │   Product Image Here      │  ║
║ │   (200px height)          │  ║
║ │                           │  ║
║ └───────────────────────────┘  ║
║                                ║
║  ICCT Polo Shirt (Male)        ║ ← White, Bold
║  ₱450.00                       ║ ← Gold, Large
║  🏷️ Uniforms                   ║ ← Gray, Small
║                                ║
║ ──────────────────────────────║
║  📦 Stock Quantity:            ║
║  ┌──────┐  ┌───────────────┐  ║
║  │  50  │  │ ✓ Update      │  ║ ← Green button
║  └──────┘  └───────────────┘  ║
╚═════════════════════════════════╝
     Hover: Purple border + lift
```

### Student Product Card:
```
╔═════════════════════════════════╗
║ ┌───────────────────────────┐  ║
║ │   Product Image           │  ║
║ └───────────────────────────┘  ║
║                                ║
║  ICCT Polo Shirt               ║
║  ₱450.00                       ║
║                                ║
║  ╔═══════════════════════╗    ║
║  ║ 📦 Stock: 50          ║    ║ ← NEW! Blue box
║  ╚═══════════════════════╝    ║
║                                ║
║  ┌────┐ ┌─────────┐ ┌────┐    ║
║  │ 🛍️ │ │ 🛒 Add  │ │ ❤️ │    ║
║  └────┘ └─────────┘ └────┘    ║
╚═════════════════════════════════╝
```

### Out of Stock Card:
```
╔═════════════════════════════════╗
║  Product Image                  ║
║  Product Name                   ║
║  ₱450.00                        ║
║                                ║
║  ╔═══════════════════════╗    ║
║  ║ 📦 Stock: 0 (RED!)    ║    ║ ← Red text!
║  ╚═══════════════════════╝    ║
║                                ║
║  ╔═══════════════════════════╗ ║
║  ║ 🚫 Out of Stock          ║ ║ ← Disabled
║  ╚═══════════════════════════╝ ║
╚═════════════════════════════════╝
     Grayed out, can't click
```

---

## 🎉 Success Indicators

### You'll know it's working when:

1. **Admin Panel**:
   - ✅ See product images or nice placeholders
   - ✅ Stock inputs are editable
   - ✅ Update buttons turn green on hover
   - ✅ Success notification pops up after update

2. **Student View**:
   - ✅ Blue stock box above every product
   - ✅ Stock number is visible and correct
   - ✅ Red "Stock: 0" when out of stock
   - ✅ Disabled button replaces normal buttons

3. **Synchronization**:
   - ✅ Admin changes (e.g., 50→10) appear in student view
   - ✅ Stock persists on page refresh
   - ✅ Out of stock button works correctly

---

## 🎬 Video Walkthrough (Text Version)

```
0:00 - Open http://localhost:3000
0:05 - Click profile icon, click Admin Login
0:10 - Enter admin/123, click Login as Admin
0:15 - Admin dashboard opens, see products with images
0:20 - Find ICCT Polo Shirt, change stock to 10
0:25 - Click Update, success modal appears
0:30 - Click OK, click Logout
0:35 - Browse to Uniforms section
0:40 - Find ICCT Polo Shirt, see "Stock: 10" display
0:45 - Login as admin again
0:50 - Change same product stock to 0
0:55 - Click Update, click OK, logout
1:00 - Find product again, see "Out of Stock" button
1:05 - Test complete! ✅
```

---

## 📱 Mobile Testing (Optional)

### On Mobile Device:
```
1. Open: http://localhost:3000 on phone
2. Follow same steps as desktop
3. ✅ Check: Stock display adapts to width
4. ✅ Check: Buttons are touch-friendly
5. ✅ Check: Images scale properly
```

---

## ✅ Final Verification

After completing all tests, you should see:

### Admin Mode:
- [x] 46 products with images/placeholders
- [x] Beautiful card layout
- [x] Stock controls at bottom of each card
- [x] Green Update buttons
- [x] Hover effects (purple border)
- [x] Success notifications

### Student Mode:
- [x] Stock display on ALL products
- [x] Blue box with icon above buttons
- [x] Stock number is accurate
- [x] Out of stock detection works
- [x] Disabled button when stock = 0
- [x] Red text for zero stock

### Synchronization:
- [x] Admin changes sync to student view
- [x] localStorage stores stock values
- [x] No page reload needed
- [x] Works across all product categories

---

**Status**: ✅ READY TO TEST  
**Time Required**: ~2 minutes  
**Expected Result**: ALL FEATURES WORKING  

**Go ahead and test it now!** 🚀
