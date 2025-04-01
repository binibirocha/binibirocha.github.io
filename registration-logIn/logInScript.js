// Function to toggle the password visibility
function togglePassword(inputId, iconId) {
    const passwordField = document.getElementById(inputId);
    const toggleIcon = document.getElementById(iconId);

    // Check the current type of the input and change it to show or hide the password
    if (passwordField.type === "password") {
        passwordField.type = "text"; // Change to 'text' to show the password
        toggleIcon.classList.remove("fa-eye"); // Remove the eye icon (hidden)
        toggleIcon.classList.add("fa-eye-slash"); // Add the slash eye icon (visible)
    } else {
        passwordField.type = "password"; // Change to 'password' to hide the password
        toggleIcon.classList.remove("fa-eye-slash"); // Remove the slash eye icon
        toggleIcon.classList.add("fa-eye"); // Add the eye icon (hidden)
    }
}

// Function to log in the user
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
            login(event);  // Call the login function
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
