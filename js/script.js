// ======================================
// MOBILE MENU TOGGLE
// ======================================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}


// ======================================
// SEARCH FUNCTION (ONLY ON PRODUCTS PAGE)
// ======================================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    const productCards = document.querySelectorAll(".product-card");

    searchInput.addEventListener("keyup", () => {

        const value = searchInput.value.toLowerCase();

        productCards.forEach(card => {

            const name = card.querySelector("h3").textContent.toLowerCase();

            card.style.display = name.includes(value) ? "block" : "none";

        });

    });
}


// ======================================
// CONTACT FORM (SAFE CHECK)
// ======================================

const form = document.querySelector("form");

if (form) {

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Message sent successfully!");
        form.reset();
    });

}


// ======================================
// ADD TO CART (LOCALSTORAGE)
// ======================================

function addToCart(name, price, image) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} added to cart`);
}


// ======================================
// RENDER CART (ONLY ON CART PAGE)
// ======================================

const cartContainer = document.querySelector(".cart-items");

if (cartContainer) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let subtotal = 0;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <h2 class="empty-cart">Your cart is empty</h2>
        `;

    } else {

        cart.forEach((item, index) => {

            const total = item.price * item.quantity;
            subtotal += total;

            cartContainer.innerHTML += `
                <div class="cart-item">

                    <img src="${item.image}" alt="${item.name}">

                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>GH₵ ${item.price}</p>
                    </div>

                    <div class="quantity-controls">

                        <button onclick="decreaseQuantity(${index})">-</button>

                        <span>${item.quantity}</span>

                        <button onclick="increaseQuantity(${index})">+</button>

                    </div>

                    <div class="item-total">
                        GH₵ ${total}
                    </div>

                    <button onclick="removeItem(${index})">
                        Remove
                    </button>

                </div>
            `;
        });
    }

    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("grandTotal");

    const delivery = 15;

    if (subtotalEl) {
        subtotalEl.textContent = `GH₵ ${subtotal}`;
    }

    if (totalEl) {
        totalEl.textContent = `GH₵ ${subtotal + delivery}`;
    }
}


// ======================================
// CART FUNCTIONS
// ======================================

function increaseQuantity(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();
}

function decreaseQuantity(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();
}

function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();
}

// ======================================
// GO TO CHECKOUT PAGE
// ======================================

function goToCheckout(){
    window.location.href = "checkout.html";
}

// ======================================
// LOAD CHECKOUT DATA
// ======================================

const checkoutContainer = document.getElementById("checkoutItems");

if (checkoutContainer) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    checkoutContainer.innerHTML = "";

    cart.forEach(item => {

        let itemTotal = item.price * item.quantity;

        total += itemTotal;

        checkoutContainer.innerHTML += `
            <p>${item.name} x ${item.quantity} = GH₵ ${itemTotal}</p>
        `;
    });

    document.getElementById("checkoutTotal").textContent =
        "Total: GH₵ " + total;
}