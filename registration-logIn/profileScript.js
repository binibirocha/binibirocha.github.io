// Function to toggle sidebar menu
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Function to close sidebar when clicking the close button
document.querySelector('.close-btn').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('active'); 
});

// Function to redirect to login page
function redirectToSignIn() {
    window.location.href = "https://binibirocha.github.io/registration-logIn/logIn.html";
}

// Function to preview and save uploaded profile image
function previewImage(event) {
    console.log("File selected");
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function() {
        const imageData = reader.result; 
        localStorage.setItem('profilePicture', imageData); // Save image to local storage
        document.querySelector('.profile-pic').src = imageData; // Update profile picture
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        console.log("No file selected");
    }
}

// Function to load saved profile picture on page load
function loadProfilePicture() {
    const savedImage = localStorage.getItem('profilePicture');
    if (savedImage) {
        document.querySelector('.profile-pic').src = savedImage;
    }
}

// Functionality for the language dropdown
document.addEventListener("DOMContentLoaded", function () {
    loadProfilePicture(); // Load the saved profile picture when the page loads

    const languageButton = document.querySelector(".language-button");
    const languageDropdown = document.querySelector(".language-dropdown");
    const languageOptions = document.querySelectorAll(".language-option");

    languageButton.addEventListener("click", function () {
        languageDropdown.style.display = 
            languageDropdown.style.display === "block" ? "none" : "block";
    });

    languageOptions.forEach(option => {
        option.addEventListener("click", function () {
            languageButton.innerHTML = `🌏︎ ${this.textContent}`; 
            languageDropdown.style.display = "none"; 
        });
    });

    // Close the dropdown when clicking outside of it
    document.addEventListener("click", function (event) {
        if (!languageButton.contains(event.target) && !languageDropdown.contains(event.target)) {
            languageDropdown.style.display = "none";
        }
    });

    // Attach event listener to "Change Avatar" button
    document.getElementById('changeAvatarBtn').addEventListener('click', function() {
        document.getElementById('avatarInput').click(); // Trigger the file input when button is clicked
    });

    // Attach event listener to file input
    document.getElementById('avatarInput').addEventListener('change', previewImage);

    // Account Deletion Modal Logic
    document.getElementById('delete-account-btn').addEventListener('click', function() {
        // Show the delete confirmation modal
        document.getElementById('deleteModal').style.display = 'flex';
    });

    document.getElementById('cancelDeleteBtn').addEventListener('click', function() {
        // Hide the modal when cancel is clicked
        document.getElementById('deleteModal').style.display = 'none';
    });

    document.getElementById('confirmDeleteBtn').addEventListener('click', function() {
        // Handle the deletion logic here (e.g., confirm and delete account)
        alert('Account Deleted');
        document.getElementById('deleteModal').style.display = 'none';
    });
});
