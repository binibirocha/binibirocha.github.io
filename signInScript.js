document.addEventListener("DOMContentLoaded", function () {
    const playerIDInput = document.getElementById("playerID");
    const emailInput = document.getElementById("email");
    const ignInput = document.getElementById("ign");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const passwordRequirements = document.getElementById("password-requirements");
    const passwordMatchMsg = document.getElementById("password-match-msg");
    const registerButton = document.querySelector("button[type='submit']");

    // Function to generate a random Player ID
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
    } else {
        console.error("Player ID input field not found!");
    }

    // Function to toggle password visibility
    function togglePassword(inputID, iconID) {
        let input = document.getElementById(inputID);
        let icon = document.getElementById(iconID);

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

    window.togglePassword = togglePassword;

    // Password validation elements
    const reqLength = document.getElementById("req-length");
    const reqUppercase = document.getElementById("req-uppercase");
    const reqLowercase = document.getElementById("req-lowercase");
    const reqNumber = document.getElementById("req-number");
    const reqSpecial = document.getElementById("req-special");

    // Function to check password requirements
    function checkPasswordRequirements() {
        const password = passwordInput.value;

        const lengthValid = password.length >= 8;
        const uppercaseValid = /[A-Z]/.test(password);
        const lowercaseValid = /[a-z]/.test(password);
        const numberValid = /\d/.test(password);
        const specialValid = /[@$!%*?&]/.test(password);

        reqLength.classList.toggle("valid", lengthValid);
        reqLength.innerHTML = lengthValid ? "✅ At least 8 characters" : "❌ At least 8 characters";

        reqUppercase.classList.toggle("valid", uppercaseValid);
        reqUppercase.innerHTML = uppercaseValid ? "✅ At least one uppercase letter" : "❌ At least one uppercase letter";

        reqLowercase.classList.toggle("valid", lowercaseValid);
        reqLowercase.innerHTML = lowercaseValid ? "✅ At least one lowercase letter" : "❌ At least one lowercase letter";

        reqNumber.classList.toggle("valid", numberValid);
        reqNumber.innerHTML = numberValid ? "✅ At least one number" : "❌ At least one number";

        reqSpecial.classList.toggle("valid", specialValid);
        reqSpecial.innerHTML = specialValid ? "✅ At least one special character (@, #, $, etc.)" : "❌ At least one special character (@, #, $, etc.)";

        passwordRequirements.style.display = (lengthValid && uppercaseValid && lowercaseValid && numberValid && specialValid) ? "none" : "block";

        validateForm();
    }

    passwordInput.addEventListener("input", checkPasswordRequirements);

    // Check password match
    confirmPasswordInput.addEventListener("input", function () {
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
    });

    confirmPasswordInput.addEventListener("blur", function () {
        passwordMatchMsg.style.display = "none";
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

    // 🔹 Save Registration Data to Local Storage & Redirect to Login
    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const ign = ignInput.value.trim();

        // Check if IGN is already taken
        if (localStorage.getItem(ign)) {
            alert("This IGN is already taken. Please choose another.");
            return;
        }

        const userData = {
            playerID: playerIDInput.value,
            email: emailInput.value,
            ign: ign,
            password: passwordInput.value
        };

        // Save user with IGN as the key
        localStorage.setItem(ign, JSON.stringify(userData));

        alert("Registration successful! Redirecting to login...");
        window.location.href = "logIn.html";
    });

    // 🔹 Login Form Validation
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const ign = document.getElementById("ign").value.trim();
        const password = document.getElementById("password").value;

        console.log("Attempting login with IGN:", ign); // Debugging line

        const storedUser = localStorage.getItem(ign);

        if (!storedUser) {
            alert("❌ Username not found. Please register first.");
            return;
        }

        const userData = JSON.parse(storedUser);

        console.log("Stored User Data:", userData); // Debugging line

        if (password !== userData.password) {
            alert("❌ Incorrect password. Please try again.");
            return;
        }

        alert(`✅ Login successful! Welcome back, ${ign}.`);
        window.location.href = "dashboard.html"; // Redirect after successful login
    });
});
