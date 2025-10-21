# ICCT Store - Restored to Original (No Firebase)

## ✅ What Was Done

1. **Removed all Firebase code** from `index.html`
2. **Restored original `script.js`** (uses MySQL/SQLite API)
3. **Restored original `api/products.php`**
4. **Fixed database** to use SQLite (PHP MySQL driver had issues)
5. **Created SQLite database** with all 43 products

## 📁 Current Setup

### Database
- **Type**: SQLite (located at `/workspaces/ICCT-STORE/database/icct_store.db`)
- **Products**: 43 products across 4 categories
- **Categories**:
  - Uniforms (21 products)
  - Documents (7 products)
  - Supplies (5 products)
  - Fees (13 products)

### Servers Running
1. **PHP Server** (Port 8080): `php -S localhost:8080`
2. **Python Server** (Port 3000): `python3 -m http.server 3000`

### API Endpoints
- Get all products: `http://localhost:8080/api/products.php?action=products`
- Get by category: `http://localhost:8080/api/products.php?action=products&category=uniforms`
- Get categories: `http://localhost:8080/api/products.php?action=categories`

## 🌐 Access Your Website

**Main Website**: http://localhost:3000/index.html

## 🧪 Testing

Test the dropdown menu:
1. Go to http://localhost:3000/index.html
2. Click on "Uniforms" in the dropdown menu
3. Products should load
4. Repeat for Documents, Campus Collection (Supplies), and Fees

## 📝 Files Modified

- `index.html` - Removed Firebase scripts, kept original
- `script.js` - Uses original API calls to PHP backend
- `api/config.php` - Changed from MySQL to SQLite
- `api/products.php` - Original version restored

## 🗑️ Firebase Files (Can be deleted)

These files are no longer used:
- `firebase-config.js`
- `firebase-services.js`
- `firebase-test.html`
- `check-firebase-products.html`
- `complete-setup.html`
- `emergency-debug.html`
- `fix-categories.html`
- `fix-products-directly.html`
- `upload-products-asia.html`
- `script-firebase-backup.js`
- All `*-GUIDE.md` files related to Firebase

## ⚙️ How to Start Servers

If servers stop, restart them:

```bash
# Start PHP server (in one terminal)
cd /workspaces/ICCT-STORE
php -S localhost:8080

# Start Python server (in another terminal)
cd /workspaces/ICCT-STORE
python3 -m http.server 3000
```

Then open: http://localhost:3000/index.html

## ✨ Everything is Back to Original!

Your website is now running on the original MySQL/SQLite setup with NO Firebase code. The dropdown menu should work perfectly now!
