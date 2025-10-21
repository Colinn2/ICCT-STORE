# Admin Account System - User Guide

## Overview
The ICCT Store now includes a simple Admin Account System with live stock control features. This allows administrators to manage product inventory in real-time.

## Features

### 1. Admin Login
- **Location**: Profile section (click the user icon in the navigation bar)
- **Access**: Click "Admin Login" button below the regular sign-in option
- **Credentials**: Randomly generated 6-character username and password (displayed on screen)

### 2. Admin Mode
When logged in as admin, the following changes occur:
- An "Admin Mode Active" indicator appears in the top-right corner
- Product cards display admin controls instead of user buttons
- Stock can be updated in real-time

### 3. Stock Management
**For Regular Users:**
- Each product shows: "Stock: [number]" in small gray text
- If stock reaches 0, "Add to Cart" button is disabled
- "Out of Stock" text appears instead

**For Admins:**
- Each product displays a stock input field
- Enter new stock quantity (0-999)
- Click "Update" button to save changes
- Changes are immediately visible to all users
- Visual feedback confirms successful update

### 4. Logout
- Click the "Logout" button in the admin indicator (top-right)
- Site returns to normal user mode
- Stock values persist until page reload

## How to Use

### Step 1: Access Admin Login
1. Click the **Profile icon** (user icon) in the navigation bar
2. In the profile sidebar, scroll down
3. Click the **"Admin Login"** button (purple gradient button)

### Step 2: View Credentials
1. A modal appears showing randomly generated credentials
2. Note the **Username** and **Password** (6 characters each)
3. These credentials are for testing only and change each time

### Step 3: Login
1. Enter the displayed username in the "Username" field
2. Enter the displayed password in the "Password" field
3. Click **"Login as Admin"**
4. Success message appears confirming admin mode

### Step 4: Manage Stock
1. Browse to any product category (Uniforms, Documents, etc.)
2. Each product card now shows:
   - Stock input field (instead of Add to Cart button)
   - Update button
3. Change the stock number as needed
4. Click **"Update"** to save
5. Confirmation message appears

### Step 5: Logout
1. Click the **"Logout"** button in the admin indicator (top-right corner)
2. Site returns to user mode
3. All changes are preserved (until page refresh)

## Important Notes

### Temporary Storage
- ⚠️ Stock changes are **not permanently saved**
- Changes reset when:
  - Page is refreshed
  - Admin logs out and page reloads
  - Browser is closed

### Security
- Credentials are randomly generated for **testing purposes only**
- New credentials are generated each time the admin login modal opens
- This is not a production-ready authentication system

### User Experience
- Regular users see stock levels but cannot modify them
- Out-of-stock items are automatically disabled
- Smooth transitions between user and admin modes
- Visual feedback for all actions

## UI Design

### Color Scheme
- **Admin Login Button**: Purple gradient (#667eea to #764ba2)
- **Admin Modal**: Consistent with site theme
- **Stock Display**: Small gray text for users
- **Admin Controls**: Blue-themed input fields
- **Update Button**: Primary accent color (#4A90E2)
- **Admin Indicator**: Purple gradient with white text

### Layout
- Stock text appears above product buttons
- Admin controls replace user buttons (not added below)
- Admin indicator in top-right corner
- All elements match existing border-radius and padding

### Animations
- Smooth fade-in for modals
- Slide-in animation for admin indicator
- Button hover effects
- Success confirmation animations

## Testing Checklist

✅ Admin login button appears in profile section
✅ Random credentials are generated and displayed
✅ Login validates credentials correctly
✅ Admin mode indicator appears after login
✅ Product cards show stock display for users
✅ Product cards show admin controls in admin mode
✅ Stock updates work correctly
✅ Out-of-stock items are disabled for users
✅ Logout button works correctly
✅ Smooth transitions between modes
✅ Responsive design on mobile devices

## Browser Compatibility
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## Future Enhancements
- Persistent storage (database integration)
- User role management
- Stock history tracking
- Low stock alerts
- Bulk stock updates
- Export/import functionality

---

**Version**: 1.0  
**Last Updated**: October 21, 2025  
**Status**: ✅ Implementation Complete
