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
    }

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
        reqUppercase.classList.toggle("valid", uppercaseValid);
        reqLowercase.classList.toggle("valid", lowercaseValid);
        reqNumber.classList.toggle("valid", numberValid);
        reqSpecial.classList.toggle("valid", specialValid);

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

    // 🔹 Save Registration Data to Local Storage & Redirect to Login Page
    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const ign = ignInput.value.trim();
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if IGN or Email is already taken
        if (users.some(user => user.ign === ign)) {
            alert("This IGN is already taken. Please choose another.");
            return;
        }
        if (users.some(user => user.email === emailInput.value)) {
            alert("This email is already registered. Please use another.");
            return;
        }

        const userData = {
            playerID: playerIDInput.value,
            email: emailInput.value,
            ign: ign,
            password: passwordInput.value,
            level: "1",
            team: "No Team"
        };

        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful! Redirecting to login page...");
        window.location.href = "logIn.html"; // ✅ Redirects to login page after registration
    });
});
