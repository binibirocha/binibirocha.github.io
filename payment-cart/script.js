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

//CART-PAGE
document.addEventListener("DOMContentLoaded", function () {
    function updateTotal() {
        let subtotal = 0;
        document.querySelectorAll(".box").forEach(box => {
            const price = parseFloat(box.querySelector("h4").textContent.replace("Price: $", ""));
            const quantity = parseInt(box.querySelector(".quantity-input").value);
            if (quantity > 0) {
                subtotal += price * quantity;
            } else {
                box.remove();
            }
        });

        const serviceFee = 4; // Set the service fee to $4
        const total = subtotal + serviceFee;

        document.querySelector(".right-bar .item-cost").textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector(".right-bar .service-fee").textContent = `$${serviceFee.toFixed(2)}`;
        document.querySelector(".right-bar .total-cost").textContent = `$${total.toFixed(2)}`;
    }

    document.querySelectorAll(".box").forEach(box => {
        const quantityInput = box.querySelector(".quantity-input");
        const removeButton = box.querySelector(".btn2");
        const increaseButton = box.querySelector(".increase-quantity");
        const decreaseButton = box.querySelector(".decrease-quantity");

        quantityInput.addEventListener("input", () => {
            if (quantityInput.value < 0) quantityInput.value = 0;
            updateTotal();
        });

        increaseButton.addEventListener("click", () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateTotal();
        });

        decreaseButton.addEventListener("click", () => {
            if (quantityInput.value > 0) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
                updateTotal();
            } else {
                box.remove();
                updateTotal();
            }
        });

        removeButton.addEventListener("click", () => {
            box.remove();
            updateTotal();
        });
    });

    updateTotal();
});

//PAYMENT-PAGE
document.addEventListener('DOMContentLoaded', function() {
    const payButton = document.getElementById('pay-button');
    const modal = document.getElementById('custom-modal');
    const closeButton = document.querySelector('.close-button');

    if (payButton) {
        payButton.onclick = function() {
            modal.style.display = 'block'; // Show the modal
        };
    }

    if (closeButton) {
        closeButton.onclick = function() {
            modal.style.display = 'none'; // Hide the modal
        };
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none'; // Hide the modal if clicked outside
        }
    };
});

//JS NI JENNIFER
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

function redirectToSignIn() {
    window.location.href = "https://binibirocha.github.io/registration-logIn/signIn.html";
}

document.querySelector('.close-btn').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('active'); 
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