document.addEventListener("DOMContentLoaded", function () {
    const playerIDInput = document.getElementById("playerID");
    const emailInput = document.getElementById("email");
    const ignInput = document.getElementById("ign");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const passwordRequirements = document.getElementById("password-requirements");
    const passwordMatchMsg = document.getElementById("password-match-msg");
    const registerButton = document.querySelector("button[type='submit']");

    // Password validation elements
    const reqLength = document.getElementById("req-length");
    const reqUppercase = document.getElementById("req-uppercase");
    const reqLowercase = document.getElementById("req-lowercase");
    const reqNumber = document.getElementById("req-number");
    const reqSpecial = document.getElementById("req-special");

    // Generate a random Player ID
    function generatePlayerID() {
        return (
            Math.floor(1000 + Math.random() * 9000) + " " +
            Math.floor(1000 + Math.random() * 9000) + " " +
            Math.floor(1000 + Math.random() * 9000)
        );
    }

    // Auto-fill Player ID field
    if (playerIDInput) {
        playerIDInput.value = generatePlayerID();
    }

    // Function to check password requirements
    function checkPasswordRequirements() {
        const password = passwordInput.value;
        const lengthValid = password.length >= 8;
        const uppercaseValid = /[A-Z]/.test(password);
        const lowercaseValid = /[a-z]/.test(password);
        const numberValid = /\d/.test(password);
        const specialValid = /[@$!%*?&]/.test(password);

        reqLength.classList.toggle("valid", lengthValid);
        reqUppercase.classList.toggle("valid", uppercaseValid);
        reqLowercase.classList.toggle("valid", lowercaseValid);
        reqNumber.classList.toggle("valid", numberValid);
        reqSpecial.classList.toggle("valid", specialValid);

        passwordRequirements.style.display = (lengthValid && uppercaseValid && lowercaseValid && numberValid && specialValid) ? "none" : "block";

        validateForm();
    }

    passwordInput.addEventListener("input", checkPasswordRequirements);

    // Function to check if passwords match
    function checkPasswordMatch() {
        if (confirmPasswordInput.value === passwordInput.value && confirmPasswordInput.value !== "") {
            passwordMatchMsg.style.color = "green";
            passwordMatchMsg.innerHTML = "✅ Passwords match!";
            passwordMatchMsg.style.display = "block";
        } else {
            passwordMatchMsg.style.color = "red";
            passwordMatchMsg.innerHTML = "❌ Passwords do not match!";
            passwordMatchMsg.style.display = "block";
        }
        validateForm();
    }

    confirmPasswordInput.addEventListener("input", checkPasswordMatch);
    confirmPasswordInput.addEventListener("blur", function () {
        passwordMatchMsg.style.display = "none";
    });

    // Password toggle functionality
    function togglePassword(inputID, iconID) {
        const input = document.getElementById(inputID);
        const icon = document.getElementById(iconID);

        // Toggle input type between 'password' and 'text'
        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        } else {
            input.type = "password";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    }

    // Toggle password visibility for both fields
    const togglePassword1 = document.querySelector('#toggleIcon1');
    const togglePassword2 = document.querySelector('#toggleIcon2');

    togglePassword1.addEventListener('click', function () {
        togglePassword('password', 'toggleIcon1');
    });

    togglePassword2.addEventListener('click', function () {
        togglePassword('confirmPassword', 'toggleIcon2');
    });

    // Validate form before enabling register button
    function validateForm() {
        const passwordValid = reqLength.classList.contains("valid") &&
                              reqUppercase.classList.contains("valid") &&
                              reqLowercase.classList.contains("valid") &&
                              reqNumber.classList.contains("valid") &&
                              reqSpecial.classList.contains("valid");

        const passwordsMatch = confirmPasswordInput.value === passwordInput.value && confirmPasswordInput.value !== "";
        const emailValid = emailInput.value.trim() !== "";
        const ignValid = ignInput.value.trim() !== "";

        registerButton.disabled = !(passwordValid && passwordsMatch && emailValid && ignValid);
    }

    emailInput.addEventListener("input", validateForm);
    ignInput.addEventListener("input", validateForm);

    // Handle form submission
    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const ign = ignInput.value.trim();
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if IGN or Email is already taken
        if (users.some(user => user.ign === ign)) {
            alert("❌ This IGN is already taken. Please choose another.");
            return;
        }
        if (users.some(user => user.email === emailInput.value)) {
            alert("❌ This email is already registered. Please use another.");
            return;
        }

        // Store new user data
        const userData = {
            playerID: playerIDInput.value,
            email: emailInput.value.trim(),
            ign: ign,
            password: passwordInput.value,
            level: "1",
            team: "No Team"
        };

        // Save user in local storage
        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));

        // ✅ Set this user as the logged-in user
        localStorage.setItem("loggedInUser", JSON.stringify(userData));

        alert("✅ Registration successful! Redirecting to profile...");
        window.location.href = "profile.html"; // ✅ Redirects to profile page after registration
    });
});
