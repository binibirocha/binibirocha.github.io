document.addEventListener("DOMContentLoaded", function () {
    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (user) {
        // Sidebar details
        document.getElementById("profile-name").textContent = user.ign || "Trainer";
        document.getElementById("profile-email").textContent = user.email || "No Email";
        document.getElementById("profile-level").textContent = user.level || "1";
        document.getElementById("profile-team").textContent = user.team || "No Team";
        document.getElementById("profile-player-id").textContent = user.playerID || "0000 0000 0000";

        // Form fields
        document.getElementById("trainer-name").value = user.ign || "";
        document.getElementById("trainer-level").value = user.level || "1";
        document.getElementById("friend-code").value = user.playerID || "";
        
        // Set team selection
        document.getElementById("team").value = user.team || "Mystic";
        document.getElementById("country").value = user.country || "Philippines";
    } else {
        alert("No user logged in! Redirecting to login...");
        window.location.href = "logIn.html"; // Redirect if no user is logged in
    }
});
