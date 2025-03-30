document.addEventListener("DOMContentLoaded", function () {
    // Retrieve logged-in user data from local storage
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (user) {
        // Update profile details with user data
        document.getElementById("profile-name").textContent = user.ign || "Trainer";
        document.getElementById("profile-email").textContent = user.email || "No Email";
        document.getElementById("profile-level").textContent = user.level || "1";
        document.getElementById("profile-team").textContent = user.team || "No Team";
        document.getElementById("profile-player-id").textContent = user.playerID || "0000 0000 0000";
    } else {
        alert("❌ No user logged in! Redirecting to login...");
        window.location.href = "registration-logIn\logIn.html"; // Redirect if no user is logged in
    }
});
