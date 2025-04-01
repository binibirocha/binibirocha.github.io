//scroller for the item boxes and pokecoins
const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];


productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;


    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })


    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})

//navbar for the OPTIONS 
window.addEventListener("scroll", function () {
    const options = document.querySelector(".options");
    const homepage = document.querySelector(".homepage");


    if (window.scrollY >= homepage.offsetHeight) {
        options.classList.add("sticky");
    } else {
        options.classList.remove("sticky");
    }
});

//add to cart confirmation
function addToCart() {
    document.getElementById("custom-confirm").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

document.getElementById("confirm-yes").onclick = function () {
    window.location.href = "cart-page.html"; // Redirects to cart page
};

document.getElementById("confirm-no").onclick = function () {
    document.getElementById("custom-confirm").style.display = "none";
    document.getElementById("overlay").style.display = "none";
};


//homepage slideshow
document.addEventListener('DOMContentLoaded', function() {

    if (document.querySelector('.hero-carousel')) initCarousel();

});

function initCarousel() {
    const carousel = document.querySelector('.hero-carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    let slideInterval = setInterval(nextSlide, 10000);
    
    carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
    carousel.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 8000);
    });
    
    
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 8000);
    });
    
    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 8000);
    });
    
    showSlide(currentSlide);
}

//navbar-footer ni jeni
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