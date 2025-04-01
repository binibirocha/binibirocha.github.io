// Function to check if the user is logged in
function checkAuth() {
    // Check if there's a logged-in user in localStorage
    if (!localStorage.getItem("loggedInUser")) {
        // If not logged in, redirect to the homepage (or any page you'd like)
        window.location.href = "https://riavenice.github.io//finallanding/index.html"; 
    }
}

// Function to log in the user
function login(event) {
    event.preventDefault(); // Prevent form submission

    const loginInput = document.getElementById("ign").value.trim(); // Accept both IGN and email
    const password = document.getElementById("password").value.trim();

    // Retrieve users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user by matching IGN or email and password
    let user = users.find(u => (u.ign === loginInput || u.email === loginInput) && u.password === password);

    if (user) {
        // If user found, store the logged-in user data in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        
        // Display success message and redirect
        alert(`✅ Login successful! Welcome back, ${user.ign}.`);
        window.location.href = "https://riavenice.github.io//finallanding/index.html"; // Redirect to the homepage
    } else {
        // If no match found, alert the user
        alert("❌ Invalid IGN, email, or password.");
    }
}

// Function to log out the user
function logout() {
    // Remove the logged-in user session from localStorage
    localStorage.removeItem("loggedInUser");
    alert("You have been logged out!");

    // Redirect to the homepage after logout
    window.location.href = "https://riavenice.github.io//finallanding/index.html";
}

// Add password toggle functionality
function togglePassword(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if (passwordInput.type === "password") {
        passwordInput.type = "text";  // Change password field to text
        icon.classList.remove("fa-eye");  // Remove 'eye' icon
        icon.classList.add("fa-eye-slash");  // Add 'eye-slash' icon
    } else {
        passwordInput.type = "password";  // Change password field back to password
        icon.classList.remove("fa-eye-slash");  // Remove 'eye-slash' icon
        icon.classList.add("fa-eye");  // Add 'eye' icon
    }
}

// Ensure DOM is fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Add event listener to the login form
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", login);
    }

    // Add event listener for password visibility toggle
    const togglePasswordButton = document.querySelector('.toggle-password');
    if (togglePasswordButton) {
        togglePasswordButton.addEventListener('click', function () {
            togglePassword('password', 'toggleIcon');  // Call the togglePassword function
        });
    }
});
