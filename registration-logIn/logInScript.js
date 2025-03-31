// Function to check if the user is logged in
function checkAuth() {
    if (!localStorage.getItem("loggedInUser")) {
        window.location.href = "https://riavenice.github.io//finallanding/index.html"; // Redirect to the provided link if not logged in
    }
}

// Function to log in the user
function login(event) {
    event.preventDefault(); // Prevent form submission

    const loginInput = document.getElementById("ign").value.trim(); // This will accept both IGN and email
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find((u) => (u.ign === loginInput || u.email === loginInput) && u.password === password);

    if (user) {
        // Save the logged-in user in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        alert(`✅ Login successful! Welcome back, ${user.ign}.`);
        window.location.href = "https://riavenice.github.io//finallanding/index.html"; // Redirect to the provided link after successful login
    } else {
        alert("❌ Invalid IGN, email, or password.");
    }
}

// Function to log out the user
function logout() {
    localStorage.removeItem("loggedInUser"); // Remove user session
    alert("You have been logged out!");
    window.location.href = "https://riavenice.github.io//finallanding/index.html"; // Redirect to the provided link after logout
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
