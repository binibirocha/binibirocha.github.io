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
    const pokecoinsBalance = document.getElementById("pokecoins-balance"); // PokéCoins balance display
    const purchaseList = document.getElementById("purchase-list"); // Recent purchases list

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

    // Ensure PokéCoins exist in storage
    if (loggedInUser.pokecoins === undefined) {
        loggedInUser.pokecoins = 0;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    }

    // Display PokéCoins balance
    if (pokecoinsBalance) {
        pokecoinsBalance.textContent = loggedInUser.pokecoins;
    }

    // Load and display purchase history
    if (purchaseList) {
        let purchases = JSON.parse(localStorage.getItem("purchases_" + loggedInUser.playerID)) || [];

        // Clear list before adding items
        purchaseList.innerHTML = "";

        if (purchases.length > 0) {
            purchases.slice(-5).reverse().forEach(purchase => {
                let li = document.createElement("li");
                li.textContent = `${purchase.item} ×${purchase.quantity} - ${purchase.date}`;
                purchaseList.appendChild(li);
            });
        } else {
            purchaseList.innerHTML = "<li>No recent purchases.</li>";
        }
    }

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
                        pokecoins: loggedInUser.pokecoins, // Keep the PokéCoins balance
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
