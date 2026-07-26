# 🌐 Shika Tech Hub - Digital Literacy Course Registration

A modern, responsive registration form for the Shika Tech Hub beginner digital literacy course. Built with HTML5, CSS3, and vanilla JavaScript.

## 📋 Features

### ✨ User Authentication
- **Login Form**: Sign in with email and password
- **Signup Form**: Create new account with full name, email, phone, and password
- **Form Toggle**: Seamless switching between login and signup modes

### 🔒 Security & Validation
- Email validation (format checking)
- Phone number validation (international format support)
- Password strength indicator
- Real-time validation feedback
- Password confirmation matching
- Terms & conditions agreement requirement

### 🎨 User Experience
- Modern gradient design with brand colors (#0066cc primary)
- Smooth animations and transitions
- Responsive design (desktop, tablet, mobile)
- Password visibility toggle
- Real-time error messages
- Success modal confirmation
- Focus management

### 📱 Responsive Layout
- Desktop: Split layout (branding left, form right)
- Tablet: Adjusted spacing and typography
- Mobile: Stacked layout with full-width form

## 🚀 Quick Start

### Installation
1. Clone the repository:
```bash
git clone https://github.com/shikatechhub-bot/shika-tech-hub.git
cd shika-tech-hub
```

2. Open in browser:
- Simply open `index.html` in your web browser
- Or use a local server:
```bash
python -m http.server 8000
# or
npx http-server
```

3. Visit `http://localhost:8000`

## 📁 File Structure

```
shika-tech-hub/
├── index.html       # Main HTML structure
├── styles.css       # Complete styling with CSS variables
├── script.js        # Form logic and validation
└── README.md        # This file
```

## 🎯 Course Details

**Beginner Digital Literacy Course**
- **Duration**: 5 Weeks
- **Start Date**: 27 July
- **Fee**: FREE
- **Registration Deadline**: 2nd August

**Course Modules**:
1. Introduction to Computers (Hardware & Software)
2. Microsoft Office (Word, Excel, PowerPoint)
3. Computer Networking (Browsing, Email, Online Tools)
4. Graphic Design (CorelDRAW & Canva)
5. Educational Technology for Students & Workers

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Grid layout, Flexbox, CSS variables, animations
- **JavaScript (Vanilla)**: Form validation, DOM manipulation
- **Font Awesome 6.4**: Icon library
- **LocalStorage API**: Client-side data persistence

## 📊 Form Fields

### Login Form
- Email Address (required, validated)
- Password (minimum 6 characters)
- Remember Me (checkbox)
- Forgot Password Link

### Signup Form
- Full Name (minimum 3 characters)
- Email Address (valid email format)
- Phone Number (international format)
- Create Password (minimum 8 characters)
- Confirm Password (must match)
- Terms & Conditions (must accept)

## 🎨 Color Scheme

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary | #0066cc | Buttons, links, focus states |
| Primary Dark | #004499 | Hover states, gradients |
| Primary Light | #3399ff | Accents |
| Secondary | #00b359 | Success, checks |
| Accent | #ff6600 | Highlights |
| Warning | #ffaa00 | Alerts |
| Error | #e74c3c | Error messages |
| Success | #27ae60 | Success states |

## ✅ Validation Rules

### Email
- Must be valid email format (example@domain.com)
- Required field

### Password (Login)
- Minimum 6 characters
- Required field

### Password (Signup)
- Minimum 8 characters
- Must contain mix of:
  - Uppercase letters
  - Lowercase letters
  - Numbers
  - Special characters (recommended)
- Real-time strength indicator

### Phone Number
- International format supported
- Examples: +1234567890, (123) 456-7890, 123-456-7890

### Full Name
- Minimum 3 characters
- Required field

## 💾 Data Storage

Currently uses browser's `localStorage` for demo purposes:
- Login attempts stored with timestamp
- Registrations stored as array of objects
- Data persists across browser sessions
- Clear console to see stored data logs

**For production**, connect to backend API:
```javascript
// Example: Replace localStorage with API call
fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
})
```

## 🔧 Customization

### Brand Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #00b359;
    --accent-color: #ff6600;
    /* ... more colors ... */
}
```

### Form Fields
Add/remove fields in `index.html` and update validation in `script.js`

### Validation Rules
Modify validation functions in `script.js`:
- `validateEmail(email)`
- `validatePhoneNumber(phone)`
- `validateLoginForm()`
- `validateSignupForm()`

## 📱 Browser Compatibility

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚨 Important Notes

1. **Security**: Current implementation uses client-side storage. For production:
   - Use HTTPS
   - Implement backend authentication
   - Use secure password hashing
   - Add CSRF protection
   - Validate on server-side

2. **Accessibility**: 
   - Form includes proper labels
   - Error messages are associated with inputs
   - Keyboard navigation supported
   - Color contrast meets WCAG AA standards

3. **Password Reset**:
   - "Forgot Password" link currently points to "#"
   - Implement actual password reset flow in production

## 📞 Support

For issues or questions about Shika Tech Hub:
- 📧 Email: shikatechhub@gmail.com
- 🌍 Website: [Your website]
- 📱 Phone: [Your phone number]

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Made with ❤️ by Shika Tech Hub**

🚀 Don't miss this opportunity to boost your digital skills!
Register now and secure your spot by **2nd August**.
