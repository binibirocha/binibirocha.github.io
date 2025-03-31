//FOR THE CART ICON BADGE
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