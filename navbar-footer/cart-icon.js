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