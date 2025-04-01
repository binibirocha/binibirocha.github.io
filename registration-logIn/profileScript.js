document.addEventListener("DOMContentLoaded", function () {
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
            console.log("Loading user profile:", loggedInUser);  // Debugging line
            document.getElementById("profile-ign").textContent = loggedInUser.ign;
            document.getElementById("profile-email").textContent = loggedInUser.email;
            document.getElementById("profile-playerID").textContent = loggedInUser.playerID;

            // Load profile picture if available
            const savedImage = localStorage.getItem("profilePicture");
            if (savedImage) {
                console.log("Loading saved image:", savedImage);  // Debugging line
                document.querySelector(".profile-pic").src = savedImage;
            }
        } else {
            alert("No user is logged in. Redirecting to sign-in page.");
            window.location.href = "logIn.html"; // Redirect to login if no user is logged in
        }
    }

    // Change Avatar Button Trigger
    document.getElementById('changeAvatarBtn').addEventListener('click', function () {
        document.getElementById('avatarInput').click();
    });

    // Handle file input for avatar upload
    document.getElementById('avatarInput').addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                const imageURL = reader.result;
                console.log("Image selected:", imageURL);  // Debugging line
                document.querySelector(".profile-pic").src = imageURL;
                localStorage.setItem("profilePicture", imageURL); // Save to localStorage
            };
            reader.readAsDataURL(file);
        }
    });

    // Account Deletion Modal
    document.getElementById('delete-account-btn').addEventListener('click', function () {
        if (confirm("Are you sure you want to delete your account? This action is irreversible.")) {
            // You can add logic to remove user from localStorage
            localStorage.removeItem("loggedInUser");
            alert("Account deleted.");
            window.location.href = "landingPage.html"; // Redirect to landing page after deletion
        }
    });

    // Load user profile on page load
    checkAuth(); // Ensure user is logged in
    loadUserProfile(); // Load user profile info
});
