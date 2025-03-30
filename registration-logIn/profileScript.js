document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    console.log("Loaded user data:", loggedInUser); // Debugging - check if data exists

    if (!loggedInUser) {
        window.location.href = "login.html"; // Redirect if not logged in
        return;
    }

    // Get elements using correct IDs from your HTML
    const trainerNameInput = document.getElementById("trainer-name");
    const emailInput = document.getElementById("trainer-email");  
    const levelInput = document.getElementById("trainer-level");
    const teamSelect = document.getElementById("team");
    const playerIDInput = document.getElementById("player-id");  
    const deleteAccountBtn = document.getElementById("delete-account-btn");
    const profilePic = document.querySelector(".profile-pic");
    const avatarInput = document.getElementById("avatarInput");
    const changeAvatarBtn = document.getElementById("changeAvatarBtn");

    // Get modal elements
    const deleteModal = document.getElementById("deleteModal");
    const confirmDeleteBtn = document.getElementById("confirmDelete");
    const cancelDeleteBtn = document.getElementById("cancelDelete");

    // Load saved avatar from localStorage
    if (loggedInUser.avatar) {
        profilePic.src = loggedInUser.avatar;
    }

    // Check if elements exist before setting values
    if (trainerNameInput) trainerNameInput.value = loggedInUser.ign || "";
    if (emailInput) emailInput.value = loggedInUser.email || "N/A";
    if (levelInput) levelInput.value = loggedInUser.level || "1";
    if (teamSelect) teamSelect.value = loggedInUser.team || "No Team";
    if (playerIDInput) playerIDInput.value = loggedInUser.playerID || "N/A";

    // Handle profile update
    const profileForm = document.getElementById("profileForm");
    if (profileForm) {
        profileForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let users = JSON.parse(localStorage.getItem("users")) || [];

            let updatedUsers = users.map(user => {
                if (user.playerID === loggedInUser.playerID) {
                    return {
                        ...user,
                        ign: trainerNameInput.value.trim(),
                        email: emailInput.value.trim(),
                        level: levelInput.value,
                        team: teamSelect.value,
                    };
                }
                return user;
            });

            localStorage.setItem("users", JSON.stringify(updatedUsers));

            // Update logged-in user session
            loggedInUser.ign = trainerNameInput.value.trim();
            loggedInUser.email = emailInput.value.trim();
            loggedInUser.level = levelInput.value;
            loggedInUser.team = teamSelect.value;
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

            alert("Profile updated successfully!");
        });
    }

    // Handle avatar change
    changeAvatarBtn.addEventListener("click", () => {
        avatarInput.click();
    });

    avatarInput.addEventListener("change", function (event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const newAvatar = e.target.result;

                // Update UI
                profilePic.src = newAvatar;

                // Save new avatar in localStorage
                loggedInUser.avatar = newAvatar;
                localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

                // Update stored users list
                let users = JSON.parse(localStorage.getItem("users")) || [];
                users = users.map(user => user.playerID === loggedInUser.playerID ? { ...user, avatar: newAvatar } : user);
                localStorage.setItem("users", JSON.stringify(users));
            };
            reader.readAsDataURL(file);
        }
    });

    // Show modal when delete button is clicked
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener("click", function () {
            deleteModal.style.display = "flex"; // Show modal
        });
    }

    // Close modal when cancel is clicked
    cancelDeleteBtn.addEventListener("click", function () {
        deleteModal.style.display = "none";
    });

    // Confirm account deletion
    confirmDeleteBtn.addEventListener("click", function () {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users = users.filter(user => user.playerID !== loggedInUser.playerID);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.removeItem("loggedInUser");

        alert("Your account has been deleted. Redirecting to login page...");
        window.location.href = "login.html";
    });
});
