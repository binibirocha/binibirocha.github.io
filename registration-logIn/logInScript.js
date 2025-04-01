// Function to log in the user
function login(event) {
    event.preventDefault(); // Prevent form submission

    const loginInput = document.getElementById("ign").value.trim(); // Accept both IGN and email
    const password = document.getElementById("password").value.trim();

    // Debugging: Log the values of loginInput and password
    console.log(`Login attempt with IGN/email: ${loginInput} and Password: ${password}`);

    // Retrieve users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user by matching IGN or email and password
    let user = users.find(u => (u.ign === loginInput || u.email === loginInput) && u.password === password);

    if (user) {
        // If user found, store the logged-in user data in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        
        // Display success message and redirect
        alert(`✅ Login successful! Welcome back, ${user.ign}.`);
        window.location.href = "store.html"; // Redirect to the homepage
    } else {
        // If no match found, alert the user
        alert("❌ Invalid IGN, email, or password.");
    }
}

// Ensure DOM is fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Add event listener to the login form
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            console.log("Login form submitted"); // Debugging
            login(event);
        });
    }

    // Add event listener for password visibility toggle
    const togglePasswordButton = document.querySelector('.toggle-password');
    if (togglePasswordButton) {
        togglePasswordButton.addEventListener('click', function () {
            togglePassword('password', 'toggleIcon');  // Call the togglePassword function
        });
    }
});
