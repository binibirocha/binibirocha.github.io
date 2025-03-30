function toggleMenu() {
    let links = document.querySelector(".navbar .links");
    if (links.style.display === "flex") {
        links.style.display = "none";
    } else {
        links.style.display = "flex";
    }
}

document.addEventListener("DOMContentLoaded", function () {
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
        });
    });

    document.addEventListener("click", function (event) {
        if (!languageButton.contains(event.target) && !languageDropdown.contains(event.target)) {
            languageDropdown.style.display = "none";
        }
    });
});
