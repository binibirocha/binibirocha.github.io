function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

document.querySelector('.close-btn').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('active'); 
});

document.addEventListener("DOMContentLoaded", function () {
    let wishlistCount = 0;
    const cartIcon = document.querySelector(".bi-cart-fill");
    const wishlistButton = document.querySelector(".card a");
   
    // Create badge
    const badge = document.createElement("span");
    badge.classList.add("cart-badge");
    badge.textContent = wishlistCount;
    cartIcon.parentElement.appendChild(badge);


    wishlistButton.addEventListener("click", function (event) {
        event.preventDefault();
        wishlistCount++;
        badge.textContent = wishlistCount;
        badge.style.display = "inline-block";
    });
});

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
            languageDropdown.style.display = "none"; 
        });
    });

    document.addEventListener("click", function (event) {
        if (!languageButton.contains(event.target) && !languageDropdown.contains(event.target)) {
            languageDropdown.style.display = "none";
        }
    });
});

//CART-ICON
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