// ============================================
// SHIKA TECH HUB - REGISTRATION FORM LOGIC
// ============================================

// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginToggle = document.getElementById('loginToggle');
const signupToggle = document.getElementById('signupToggle');
const signupPassword = document.getElementById('signupPassword');
const strengthBar = document.querySelector('.strength-bar');
const strengthText = document.querySelector('.strength-text');
const successModal = document.getElementById('successModal');

// ============================================
// TOGGLE BETWEEN LOGIN AND SIGNUP FORMS
// ============================================

loginToggle.addEventListener('click', () => {
    showLoginForm();
});

signupToggle.addEventListener('click', () => {
    showSignupForm();
});

function showLoginForm() {
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
    loginToggle.classList.add('active');
    signupToggle.classList.remove('active');
    clearFormErrors();
}

function showSignupForm() {
    loginForm.classList.remove('active');
    signupForm.classList.add('active');
    loginToggle.classList.remove('active');
    signupToggle.classList.add('active');
    clearFormErrors();
}

function switchForm(event) {
    event.preventDefault();
    if (loginForm.classList.contains('active')) {
        showSignupForm();
    } else {
        showLoginForm();
    }
}

// ============================================
// PASSWORD VISIBILITY TOGGLE
// ============================================

function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const icon = event.target.tagName === 'I' ? event.target : event.target.querySelector('i');
    
    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        field.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// ============================================
// PASSWORD STRENGTH INDICATOR
// ============================================

signupPassword.addEventListener('input', checkPasswordStrength);

function checkPasswordStrength(event) {
    const password = event.target.value;
    const strengthIndicator = document.querySelector('.password-strength');
    
    if (password.length === 0) {
        strengthIndicator.classList.remove('show');
        return;
    }

    strengthIndicator.classList.add('show');
    
    let strength = 0;
    
    // Check password length
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Check for uppercase letters
    if (/[A-Z]/.test(password)) strength++;
    
    // Check for lowercase letters
    if (/[a-z]/.test(password)) strength++;
    
    // Check for numbers
    if (/\d/.test(password)) strength++;
    
    // Check for special characters
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    
    // Update strength bar and text
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    strengthBar.classList.remove('weak', 'fair', 'strong');
    strengthText.classList.remove('weak', 'fair', 'strong');
    
    if (strength <= 2) {
        strengthBar.classList.add('weak');
        strengthText.classList.add('weak');
        strengthText.textContent = 'Weak password';
    } else if (strength <= 4) {
        strengthBar.classList.add('fair');
        strengthText.classList.add('fair');
        strengthText.textContent = 'Fair password';
    } else {
        strengthBar.classList.add('strong');
        strengthText.classList.add('strong');
        strengthText.textContent = 'Strong password';
    }
}

// ============================================
// FORM VALIDATION
// ============================================

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhoneNumber(phone) {
    // Basic phone validation - can be customized per region
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function validateLoginForm() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    let isValid = true;

    // Clear previous errors
    clearErrorMessage('loginEmailError');
    clearErrorMessage('loginPasswordError');

    // Validate email
    if (!email) {
        showErrorMessage('loginEmailError', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showErrorMessage('loginEmailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate password
    if (!password) {
        showErrorMessage('loginPasswordError', 'Password is required');
        isValid = false;
    } else if (password.length < 6) {
        showErrorMessage('loginPasswordError', 'Password must be at least 6 characters');
        isValid = false;
    }

    return isValid;
}

function validateSignupForm() {
    const fullName = document.getElementById('signupFullName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const phone = document.getElementById('signupPhone').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const termsCheckbox = document.querySelector('input[name="terms"]');
    
    let isValid = true;

    // Clear previous errors
    clearErrorMessage('signupFullNameError');
    clearErrorMessage('signupEmailError');
    clearErrorMessage('signupPhoneError');
    clearErrorMessage('signupPasswordError');
    clearErrorMessage('signupConfirmPasswordError');

    // Validate full name
    if (!fullName) {
        showErrorMessage('signupFullNameError', 'Full name is required');
        isValid = false;
    } else if (fullName.length < 3) {
        showErrorMessage('signupFullNameError', 'Full name must be at least 3 characters');
        isValid = false;
    }

    // Validate email
    if (!email) {
        showErrorMessage('signupEmailError', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showErrorMessage('signupEmailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate phone number
    if (!phone) {
        showErrorMessage('signupPhoneError', 'Phone number is required');
        isValid = false;
    } else if (!validatePhoneNumber(phone)) {
        showErrorMessage('signupPhoneError', 'Please enter a valid phone number');
        isValid = false;
    }

    // Validate password
    if (!password) {
        showErrorMessage('signupPasswordError', 'Password is required');
        isValid = false;
    } else if (password.length < 8) {
        showErrorMessage('signupPasswordError', 'Password must be at least 8 characters');
        isValid = false;
    }

    // Validate password match
    if (!confirmPassword) {
        showErrorMessage('signupConfirmPasswordError', 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showErrorMessage('signupConfirmPasswordError', 'Passwords do not match');
        isValid = false;
    }

    // Validate terms
    if (!termsCheckbox.checked) {
        alert('You must agree to the Terms of Service and Privacy Policy');
        isValid = false;
    }

    return isValid;
}

// ============================================
// ERROR MESSAGE HANDLING
// ============================================

function showErrorMessage(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearErrorMessage(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.classList.remove('show');
    });
}

// ============================================
// FORM SUBMISSION
// ============================================

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateLoginForm()) {
        handleLoginSubmit();
    }
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateSignupForm()) {
        handleSignupSubmit();
    }
});

function handleLoginSubmit() {
    const email = document.getElementById('loginEmail').value;
    const formData = {
        email: email,
        password: document.getElementById('loginPassword').value,
        timestamp: new Date().toISOString()
    };

    // In a real application, send to backend
    console.log('Login attempt:', formData);
    
    // Save to localStorage for demo purposes
    localStorage.setItem('lastLogin', JSON.stringify({
        email: email,
        timestamp: new Date().toISOString()
    }));

    showSuccessModal(
        'Welcome Back!',
        `You have successfully logged in. Welcome back, ${email}!`
    );
}

function handleSignupSubmit() {
    const fullName = document.getElementById('signupFullName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    
    const formData = {
        fullName: fullName,
        email: email,
        phone: phone,
        timestamp: new Date().toISOString()
    };

    // In a real application, send to backend
    console.log('Signup data:', formData);
    
    // Save to localStorage for demo purposes
    const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    registrations.push(formData);
    localStorage.setItem('registrations', JSON.stringify(registrations));

    showSuccessModal(
        'Welcome to Shika Tech Hub!',
        `Account created successfully, ${fullName}! Check your email at ${email} for confirmation details. Registration deadline is August 2nd.`
    );
}

// ============================================
// SUCCESS MODAL
// ============================================

function showSuccessModal(title, message) {
    const modal = document.getElementById('successModal');
    const titleElement = document.getElementById('successTitle');
    const messageElement = document.getElementById('successMessage');
    
    titleElement.textContent = title;
    messageElement.textContent = message;
    modal.classList.add('show');
    
    // Close modal on button click
    document.querySelector('.modal-btn').onclick = closeModal;
    
    // Close modal on background click
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
    
    // Reset forms
    loginForm.reset();
    signupForm.reset();
    
    // Reset password strength indicator
    const strengthIndicator = document.querySelector('.password-strength');
    if (strengthIndicator) {
        strengthIndicator.classList.remove('show');
    }
    
    // Return to login form
    showLoginForm();
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Set focus on first input
    document.getElementById('loginEmail').focus();
    
    // Add enter key support
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (loginForm.classList.contains('active')) {
                    loginForm.dispatchEvent(new Event('submit'));
                } else {
                    signupForm.dispatchEvent(new Event('submit'));
                }
            }
        });
    });
    
    // Real-time validation for email
    document.getElementById('loginEmail').addEventListener('blur', () => {
        const email = document.getElementById('loginEmail').value.trim();
        if (email && !validateEmail(email)) {
            showErrorMessage('loginEmailError', 'Please enter a valid email address');
        } else {
            clearErrorMessage('loginEmailError');
        }
    });

    document.getElementById('signupEmail').addEventListener('blur', () => {
        const email = document.getElementById('signupEmail').value.trim();
        if (email && !validateEmail(email)) {
            showErrorMessage('signupEmailError', 'Please enter a valid email address');
        } else {
            clearErrorMessage('signupEmailError');
        }
    });

    // Real-time validation for phone
    document.getElementById('signupPhone').addEventListener('blur', () => {
        const phone = document.getElementById('signupPhone').value.trim();
        if (phone && !validatePhoneNumber(phone)) {
            showErrorMessage('signupPhoneError', 'Please enter a valid phone number');
        } else {
            clearErrorMessage('signupPhoneError');
        }
    });

    // Real-time password confirmation validation
    document.getElementById('signupConfirmPassword').addEventListener('input', () => {
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        
        if (confirmPassword && password !== confirmPassword) {
            showErrorMessage('signupConfirmPasswordError', 'Passwords do not match');
        } else {
            clearErrorMessage('signupConfirmPasswordError');
        }
    });

    // Log any previously saved registrations (for demo)
    const savedRegistrations = localStorage.getItem('registrations');
    if (savedRegistrations) {
        console.log('Saved Registrations:', JSON.parse(savedRegistrations));
    }
});