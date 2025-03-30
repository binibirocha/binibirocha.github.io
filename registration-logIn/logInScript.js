// Function to check if the user is logged in
function checkAuth() {
    if (!localStorage.getItem("loggedInUser")) {
        window.location.href = "login.html"; // Redirect if not logged in
    }
}

// Function to log in the user
function login(event) {
    event.preventDefault(); // Prevent form submission

    const ign = document.getElementById("ign").value.trim();
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find((u) => u.ign === ign && u.password === password);

    if (user) {
        // Save the logged-in user
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        alert(`✅ Login successful! Welcome back, ${ign}.`);
        window.location.href = "profile page\profile.html"; // Redirect to profile page
    } else {
        alert("❌ Invalid username or password.");
    }
}

// Function to log out the user
function logout() {
    localStorage.removeItem("loggedInUser"); // Remove user session
    alert("You have been logged out!");
    window.location.href = "login.html"; // Redirect to login page
}

// Check authentication when loading the profile page
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
