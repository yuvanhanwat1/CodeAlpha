// In-memory user database (for demonstration purposes)
const users = [];

// Function to check if all required fields are filled
function areAllFieldsFilled(formId) {
    const form = document.getElementById(formId);
    const requiredFields = form.querySelectorAll('[required]');
    for (const field of requiredFields) {
        if (!field.value.trim()) {
            return false;
        }
    }
    return true;
}

// Function to enable or disable the button based on field values
function toggleButton(formId, buttonId) {
    const button = document.getElementById(buttonId);
    const allFieldsFilled = areAllFieldsFilled(formId);
    button.disabled = !allFieldsFilled;
}

function register() {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;
    const regUsername = email;
    const regPassword = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (users.some(user => user.username === regUsername)) {
        alert("Username (email) is already taken. Please choose another.");
    } else if (regPassword !== confirmPassword) {
        alert("Passwords do not match. Please confirm your password.");
    } else {
        users.push({
            username: regUsername,
            password: regPassword,
            firstName,
            lastName,
            age,
            email
        });

        alert("Registration successful! You can now log in.");
        showLoginForm();
    }
}

function showRegistrationForm() {
    document.getElementById("login").style.display = "none";
    document.getElementById("registration").style.display = "flex";
}

function showLoginForm() {
    document.getElementById("registration").style.display = "none";
    document.getElementById("login").style.display = "flex";
}

function login() {
    const loginUsername = document.getElementById("login-username").value;
    const loginPassword = document.getElementById("login-password").value;

    const user = users.find(user => user.username === loginUsername && user.password === loginPassword);

    if (user) {
        document.getElementById("login").style.display = "none";
        document.getElementById("registration").style.display = "none";
        document.getElementById("secured-page").style.display = "block";
    } else {
        alert("Invalid username or password. Please try again.");
    }
}

// Add event listeners to toggle button states
document.getElementById("registration-form").addEventListener("input", function () {
    toggleButton("registration-form", "register-button");
});

document.getElementById("login-form").addEventListener("input", function () {
    toggleButton("login-form", "login-button");
});