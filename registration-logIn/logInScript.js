// Function to check if the user is logged in (to be used on Profile or Store pages)
function checkAuth() {
    if (!localStorage.getItem("loggedInUser")) {
        // If not logged in, redirect to the log-in page
        window.location.href = "logIn.html"; 
    }
}

// Function to load user data into the profile page
function loadUserProfile() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
        // Update profile information with logged-in user data
        document.getElementById("profile-ign").textContent = loggedInUser.ign;
        document.getElementById("profile-email").textContent = loggedInUser.email;
        document.getElementById("profile-playerID").textContent = loggedInUser.playerID;

        // Load profile picture if available
        const savedImage = localStorage.getItem("profilePicture");
        if (savedImage) {
            document.querySelector(".profile-pic").src = savedImage;
        }
    } else {
        alert("No user is logged in. Redirecting to sign-in page.");
        window.location.href = "logIn.html"; // Redirect to login if no user is logged in
    }
}

// Function to log in the user
function login(event) {
    event.preventDefault(); // Prevent form submission

    const loginInput = document.getElementById("loginInput").value.trim(); // Accept both IGN and email
    const password = document.getElementById("password").value.trim();

    // Retrieve users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user by matching IGN or email and password
    let user = users.find(u => (u.ign === loginInput || u.email === loginInput) && u.password === password);

    if (user) {
        // If user found, store the logged-in user data in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        // Display success message and redirect to store page
        alert(`✅ Login successful! Welcome back, ${user.ign}.`);
        window.location.href = "profile.html"; // Redirect to profile page after login
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

    // Redirect to the sign-in page after logout
    window.location.href = "logIn.html";
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
    // Check if the user is logged in before showing content (redirect if not)
    if (document.location.pathname.includes("profile.html") || document.location.pathname.includes("store.html")) {
        checkAuth();  // Check authentication status on these pages
    }

    // Add event listener to the login form on logIn.html page
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", login);
    }

    // Add event listener for password visibility toggle on logIn.html
    const togglePasswordButton = document.querySelector('.toggle-password');
    if (togglePasswordButton) {
        togglePasswordButton.addEventListener('click', function () {
            togglePassword('password', 'toggleIcon');  // Call the togglePassword function
        });
    }

    // Load user profile data if on profile page
    if (document.location.pathname.includes("profile.html")) {
        loadUserProfile();  // Load user profile data on the profile page
    }

    // If logout button is clicked, log out the user and redirect to sign-in page
    const logoutButton = document.getElementById('logoutBtn');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});
