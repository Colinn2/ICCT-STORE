# DEBUGGING GUIDE - Products Not Showing

## ✅ Server Status
- Frontend Server (Port 8000): RUNNING ✓
- API Server (Port 8080): RUNNING ✓
- MySQL Database: RUNNING ✓
- Total Products in Database: 46

## 🔍 How to Debug

### Step 1: Open the Website
1. Open your browser
2. Go to: **http://localhost:8000**

### Step 2: Open Browser Console
- **Chrome/Edge**: Press `F12` or `Ctrl+Shift+J` (Windows) / `Cmd+Option+J` (Mac)
- **Firefox**: Press `F12` or `Ctrl+Shift+K`

### Step 3: Test the Category Navigation
1. Click **Shop** in the navbar
2. Click **Uniforms**
3. Watch the console for these messages:

**Expected Console Output:**
```
🎯 showCategory called with: uniforms
📄 Selected section: uniforms
✅ Section displayed: uniforms
🔄 Loading products for category: uniforms
🔄 Loading products from: http://localhost:8080/?action=products&category=uniforms
📡 Response status: 200 OK
✅ API Response: {success: true, data: Array(21)}
📦 Products count: 21
📦 Products loaded: 21
🎨 Rendering products for: uniforms Count: 21
📦 Container found: Yes
✅ Rendered 21 products to container
```

### Step 4: Check for Errors

**If you see:**
- ❌ "Container not found" → HTML structure issue
- ❌ "Failed to fetch" → CORS or network issue
- ❌ "Response status: 404" → API server not running
- ❌ "Products count: 0" → Database query issue

## 🧪 Quick Tests

### Test 1: Check API Directly
Open in browser: http://localhost:8080/?action=products&category=uniforms

**Expected:** JSON with 21 products

### Test 2: Simple Test Page
Open in browser: http://localhost:8000/test-products.html

Click buttons to test each category

## 📊 Product Counts
- Uniforms: 21 products
- Documents: 7 products
- Supplies: 5 products
- Fees: 13 products
- All Products: 46 products

## 🔧 Common Fixes

### If products still don't show:

1. **Clear Browser Cache**
   - Press `Ctrl+Shift+Delete`
   - Select "Cached images and files"
   - Click "Clear data"
   - Reload page with `Ctrl+F5`

2. **Check Network Tab in DevTools**
   - Open DevTools (F12)
   - Go to "Network" tab
   - Click on Shop → Uniforms
   - Look for request to `http://localhost:8080/?action=products&category=uniforms`
   - Check if it returns 200 OK with data

3. **Verify CSS isn't hiding products**
   - In console, type: `document.querySelectorAll('.product-card').length`
   - Should return a number > 0 if products are rendered

## 📝 What to Share if Still Not Working

Copy and paste from your browser console:
1. All console messages (especially the emoji ones)
2. Any red error messages
3. Network tab screenshot showing the API request

## 🚀 Quick Fix Commands

If servers stopped, restart them:
```bash
# Restart API Server
pkill -f api-server.py
cd /workspaces/ICCT-STORE && python3 api-server.py &

# Restart Frontend Server
pkill -f "http.server 8000"
cd /workspaces/ICCT-STORE && python3 -m http.server 8000 --bind 0.0.0.0 &
```
