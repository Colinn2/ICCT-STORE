# ICCT Store - Campus Essentials E-Commerce Platform

## 🚀 Live Demo

**⚠️ IMPORTANT:** This project requires a backend server with MySQL database.

- **GitHub Pages**: https://colinn2.github.io/ICCT-STORE/ (Static preview only - limited functionality)
- **Full Version**: Open in GitHub Codespaces (see instructions below)

## 🎯 Features

- 🛍️ **Product Catalog**: Browse 46 products across 4 categories
  - 21 School Apparel & Accessories
  - 7 Document Requests
  - 5 School Supplies
  - 13 School Fees
- 🗄️ **MySQL Database**: Dynamic product loading
- 🐍 **Python API**: RESTful backend server
- 🎨 **Responsive Design**: Works on desktop and mobile
- 🛒 **Shopping Cart**: Add products and checkout
- 💳 **Payment Methods**: Multiple payment options (GCash, Maya, Bank Transfer, etc.)

## 🔧 Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python (HTTP Server)
- **Database**: MySQL 8.0
- **API**: RESTful JSON API
- **Deployment**: GitHub Pages (static) + GitHub Codespaces (full stack)

## 📦 Database Structure

```
icct_store/
├── categories (4 records)
│   ├── School Apparel & Accessories (uniforms)
│   ├── Document Requests (documents)
│   ├── School Supplies (supplies)
│   └── School Fees (fees)
│
└── products (46 records)
    ├── id, category_id, name, description
    ├── price, stock_quantity, image_url
    └── is_active, created_at, updated_at
```

## 🚀 How to Run (GitHub Codespaces)

### 1. Open in Codespaces
1. Go to: https://github.com/Colinn2/ICCT-STORE
2. Click the green **Code** button
3. Select **Codespaces** tab
4. Click **Create codespace on main**

### 2. Setup Database (First Time Only)
```bash
# Run the database setup script
chmod +x setup-database.sh
./setup-database.sh
```

This will:
- Create MySQL database `icct_store`
- Create tables for categories and products
- Insert all 46 products

### 3. Start Servers
```bash
# Terminal 1: Start API Server (Port 8080)
python3 api-server.py

# Terminal 2: Start Frontend Server (Port 8000)
python3 -m http.server 8000 --bind 0.0.0.0
```

### 4. Access the Website
Codespaces will automatically forward ports. Click on:
- **Port 8000**: Frontend (Main website)
- **Port 8080**: API Server (Backend)

Or open: `https://[your-codespace-name]-8000.app.github.dev`

## 🧪 Testing

### Test Pages Available:
- `/index.html` - Main website
- `/direct-test.html` - Simple product loading test
- `/quick-test.html` - Interactive category testing
- `/debug-console.html` - Full diagnostic tool

### Manual Testing:
```bash
# Test API endpoints
curl "http://localhost:8080/?action=categories"
curl "http://localhost:8080/?action=products&category=uniforms"

# Check database
sudo mysql -e "USE icct_store; SELECT COUNT(*) FROM products;"
```

## 📁 Project Structure

```
ICCT-STORE/
├── index.html              # Main website
├── script.js               # JavaScript logic
├── style.css               # Styling
├── api-server.py           # Python API server
├── database/
│   └── schema.sql          # Database schema + data
├── api/                    # (Legacy PHP files)
├── test pages/             # Testing utilities
├── docs/                   # Documentation
│   ├── README-DATABASE.md
│   ├── DEBUGGING.md
│   ├── TEST-GUIDE.md
│   └── SETUP-COMPLETE.md
└── setup-database.sh       # Database setup script
```

## 🔍 Troubleshooting

### Products Not Showing?
1. **Check Console**: Press F12, look for errors
2. **Check API**: Visit `http://localhost:8080/?action=products`
3. **Check Database**: Run `sudo mysql -e "USE icct_store; SELECT COUNT(*) FROM products;"`
4. **Hard Refresh**: Press Ctrl+Shift+R

### API Server Not Running?
```bash
# Check if running
ps aux | grep api-server

# Restart
pkill -f api-server
python3 api-server.py &
```

### Database Not Found?
```bash
# Re-run setup
./setup-database.sh
```

## 🌐 GitHub Pages Limitations

GitHub Pages only hosts **static files** (HTML, CSS, JS). It **cannot**:
- ❌ Run Python API server
- ❌ Run MySQL database
- ❌ Execute server-side code

**Result**: Products won't load on GitHub Pages - you'll only see the layout.

**Solution**: Use **GitHub Codespaces** for full functionality!

## 📝 Product Categories

### Uniforms (21 items)
- School Uniforms (Male/Female)
- PE Uniform
- ICCT Jacket, Hoodie
- ID Lace, Patches, Pins
- School Bags, Caps
- T-Shirts, Keychains, Lanyards
- Stickers, Mugs, Tumblers
- Phone Cases

### Documents (7 items)
- Certificate of Enrollment
- Form 137, Form 138
- Transcript of Records
- Good Moral Certificate
- Certificate of Grades
- Diploma Request

### Supplies (5 items)
- Ballpen, Notebook
- Folder, Index Card
- Clearance Form

### Fees (13 items)
- Tuition, Laboratory, Library
- Registration, ID, Medical
- Athletic, Insurance, Miscellaneous
- Internet, Development, Graduation
- Thesis Fee

## 👨‍💻 Developer

**Colin** - [GitHub Profile](https://github.com/Colinn2)

## 📄 License

This project is for educational purposes.

---

**Need help?** Check the documentation in the `/docs` folder or open an issue on GitHub!
