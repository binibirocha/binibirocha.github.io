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
            document.getElementById("profile-ign-display").textContent = loggedInUser.ign;
            document.getElementById("profile-email-display").textContent = loggedInUser.email;
            document.getElementById("profile-playerID-display").textContent = loggedInUser.playerID;

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

    // Function to toggle between display and input mode for editable fields
    function toggleEdit(fieldId) {
        const displayField = document.getElementById(`${fieldId}-display`);
        const inputField = document.getElementById(fieldId);
        const saveBtn = document.getElementById("save-btn");

        // Toggle visibility of display and input fields
        displayField.style.display = displayField.style.display === "none" ? "inline" : "none";
        inputField.style.display = inputField.style.display === "none" ? "inline" : "none";
        saveBtn.style.display = saveBtn.style.display === "none" ? "inline" : "none";

        // Pre-fill the input field with the current value
        inputField.value = displayField.textContent;
    }

    // Function to save changes to the user profile
// Function to save changes to the user profile
function saveProfileChanges() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // Grab the updated values from the inputs, ensuring email is preserved if not changed
    const updatedUser = {
        ign: document.getElementById("profile-ign").value.trim(),
        email: document.getElementById("profile-email").value.trim() || loggedInUser.email, // Preserve email if not changed
        playerID: loggedInUser.playerID, // Keep playerID unchanged
        password: loggedInUser.password // Keep the password unchanged
    };

    // Remove the old user from the users list in localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Remove the old IGN from users
    users = users.filter(user => user.ign !== loggedInUser.ign); // Remove the old user by IGN
    localStorage.setItem("users", JSON.stringify(users)); // Save the updated users list

    // Add the updated user to the users list
    users.push(updatedUser);
    localStorage.setItem("users", JSON.stringify(users)); // Update the users list with new IGN

    // Update the logged-in user in localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    // Display success message
    alert("✅ Profile updated successfully!");

    // Now update the display fields with the new values
    document.getElementById("profile-ign-display").textContent = updatedUser.ign;
    document.getElementById("profile-email-display").textContent = updatedUser.email;

    // Hide the input fields and save button
    document.getElementById("profile-ign").style.display = "none";
    document.getElementById("profile-email").style.display = "none";
    document.getElementById("save-btn").style.display = "none";

    // Show the updated values in the display fields
    document.getElementById("profile-ign-display").style.display = "inline";
    document.getElementById("profile-email-display").style.display = "inline";
}

    // Account Deletion Modal
    document.getElementById('delete-account-btn').addEventListener('click', function () {
        if (confirm("Are you sure you want to delete your account? This action is irreversible.")) {
            // Remove user from localStorage
            localStorage.removeItem("loggedInUser");
            alert("❌ Your account has been deleted.");
            window.location.href = "main.html"; // Redirect to landing page after deletion
        }
    });

    // Load user profile on page load
    checkAuth(); // Ensure user is logged in
    loadUserProfile(); // Load user profile info

    // Handle Edit Buttons for profile fields
    document.getElementById("edit-ign").addEventListener("click", function () {
        toggleEdit("profile-ign");
    });
    document.getElementById("edit-email").addEventListener("click", function () {
        toggleEdit("profile-email");
    });

    // Handle saving the changes to user profile on form submission
    const profileForm = document.getElementById("profileForm");
    if (profileForm) {
        profileForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission
            saveProfileChanges(); // Call the saveProfileChanges function
        });
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
                document.querySelector(".profile-pic").src = imageURL;
                localStorage.setItem("profilePicture", imageURL); // Save to localStorage
            };
            reader.readAsDataURL(file);
        }

    // Function to log out the user
function logout() {
    // Remove loggedInUser from localStorage
    localStorage.removeItem("loggedInUser");
    
    // Redirect to login page
    window.location.href = "logIn.html"; 
}

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

document.querySelector('.close-btn').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('active'); 
});

    });
});

(function() {
    document.addEventListener("DOMContentLoaded", function () {
        const cartBadge = document.querySelector(".cart-badge");

        // Use sessionStorage instead of localStorage
        let cartCount = parseInt(sessionStorage.getItem("cartCount")) || 0;

        function updateCartBadge() {
            cartBadge.textContent = cartCount;
            cartBadge.style.display = cartCount > 0 ? "inline-block" : "none";
            cartBadge.style.marginLeft = "5px";
        }

        updateCartBadge();

        function handleAddToCartClick() {
            cartCount++;
            updateCartBadge();
            // Use sessionStorage instead of localStorage
            sessionStorage.setItem("cartCount", cartCount);
        }

        const addToCartButtons = document.querySelectorAll(".card-btn");
        addToCartButtons.forEach(button => {
            button.addEventListener("click", handleAddToCartClick);
        });
    });
})();