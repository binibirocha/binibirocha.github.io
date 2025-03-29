// Function to check if the user is logged in
function checkAuth() {
    if (!localStorage.getItem("loggedIn")) {
        window.location.href = "login.html"; // Redirect if not logged in
    }
}

// Function to log in the user
function login(event) {
    event.preventDefault(); // Prevent form submission

    const ign = document.getElementById("ign").value.trim(); // Get IGN
    const password = document.getElementById("password").value;

    // Retrieve user data using IGN from localStorage
    const userData = localStorage.getItem(ign);

    if (!userData) {
        alert("❌ Invalid username or password.");
        return;
    }

    const { email, password: storedPassword } = JSON.parse(userData);

    if (password !== storedPassword) {
        alert("❌ Invalid username or password.");
        return;
    }

    // Store login status and redirect
    localStorage.setItem("loggedIn", "true");
    alert(`✅ Login successful! Welcome back, ${ign}.`);
    window.location.href = "profile.html";
}

// Function to log out the user
function logout() {
    localStorage.removeItem("loggedIn"); // Remove login status
    alert("You have been logged out!");
    window.location.href = "login.html"; // Redirect to login page
}

// Check authentication when loading profile page
if (window.location.pathname.includes("profile.html")) {
    checkAuth();
}

// Attach event listeners after the page loads
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", login);
    }

    // Ensure the logout button works
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
});
