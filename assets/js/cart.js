document.addEventListener("DOMContentLoaded", () => {

    /*=====================================================
    RUN ONLY ON SHOPPING CART PAGE
    =====================================================*/

    const yscCartPage = document.querySelector(".ysc-cart-section");

    if (!yscCartPage) return;

    /*=====================================================
    AOS INITIALIZATION
    =====================================================*/

    if (typeof AOS !== "undefined") {

        AOS.init({

            duration: 800,

            once: true,

            easing: "ease-in-out"

        });

    }

    /*=====================================================
    ELEMENT REFERENCES
    =====================================================*/

    const yscSubtotal = document.getElementById("yscSubtotalAmount");

    const yscGrandTotal = document.getElementById("yscGrandTotal");

    const yscBadge = document.getElementById("yscCartBadge");

    /*=====================================================
    UPDATE CART TOTALS
    =====================================================*/

    function yscUpdateSummary() {

        let subtotal = 0;

        let totalItems = 0;

        document.querySelectorAll(".ysc-cart-card").forEach((card) => {

            const qtyInput = card.querySelector(".ysc-qty-input");

            const priceElement = card.querySelector(".ysc-product-price");

            if (!qtyInput || !priceElement) return;

            const quantity = parseInt(qtyInput.value) || 0;

            const unitPrice = parseInt(

                priceElement.textContent

                    .replace(/[₦,]/g, "")

            ) || 0;

            subtotal += quantity * unitPrice;

            totalItems += quantity;

        });

        if (yscSubtotal) {

            yscSubtotal.textContent =

                "₦" + subtotal.toLocaleString();

        }

        if (yscGrandTotal) {

            yscGrandTotal.textContent =

                "₦" + subtotal.toLocaleString();

        }

        if (yscBadge) {

            yscBadge.textContent = totalItems;

        }

    }

    /*=====================================================
    SAVE CART
    =====================================================*/

    function yscSaveCart() {

        const cart = [];

        document.querySelectorAll(".ysc-cart-card").forEach((card) => {

            cart.push({

                title:

                    card.querySelector(".ysc-product-title")?.textContent ||

                    "",

                quantity:

                    parseInt(

                        card.querySelector(".ysc-qty-input").value

                    ),

                price:

                    parseInt(

                        card.querySelector(".ysc-product-price")

                            .textContent

                            .replace(/[₦,]/g, "")

                    )

            });

        });

        localStorage.setItem(

            "yscShoppingCart",

            JSON.stringify(cart)

        );

    }

    /*=====================================================
    QUANTITY BUTTONS
    (EVENT DELEGATION)
    =====================================================*/

    document.addEventListener("click", function (event) {

        /* PLUS */

        if (

            event.target.classList.contains(

                "ysc-qty-plus"

            )

        ) {

            const wrapper = event.target.closest(

                ".ysc-quantity-wrapper"

            );

            const input = wrapper.querySelector(

                ".ysc-qty-input"

            );

            input.value =

                parseInt(input.value) + 1;

            yscUpdateSummary();

            yscSaveCart();

        }

        /* MINUS */

        if (

            event.target.classList.contains(

                "ysc-qty-minus"

            )

        ) {

            const wrapper = event.target.closest(

                ".ysc-quantity-wrapper"

            );

            const input = wrapper.querySelector(

                ".ysc-qty-input"

            );

            let qty = parseInt(input.value);

            if (qty > 1) {

                input.value = qty - 1;

                yscUpdateSummary();

                yscSaveCart();

            }

        }

    });

    /*=====================================================
    INITIAL LOAD
    =====================================================*/

    yscUpdateSummary();

    /*=====================================================
    DELETE SINGLE CART ITEM
    =====================================================*/

    document.addEventListener("click", function (event) {

        const deleteButton = event.target.closest(".ysc-delete-btn");

        if (!deleteButton) return;

        const cartCard = deleteButton.closest(".ysc-cart-card");

        if (!cartCard) return;

        const confirmDelete = confirm(
            "Remove this item from your cart?"
        );

        if (!confirmDelete) return;

        cartCard.style.transition = "all .35s ease";
        cartCard.style.opacity = "0";
        cartCard.style.transform = "translateX(80px)";

        setTimeout(function () {

            cartCard.remove();

            yscUpdateSummary();

            yscSaveCart();

            yscCheckEmptyCart();

        }, 350);

    });

    /*=====================================================
    CLEAR CART
    =====================================================*/

    const yscClearCartBtn =
        document.getElementById("yscClearCartBtn");

    if (yscClearCartBtn) {

        yscClearCartBtn.addEventListener(

            "click",

            function () {

                if (

                    !confirm(
                        "Are you sure you want to clear your shopping cart?"
                    )

                ) return;

                document
                    .querySelectorAll(".ysc-cart-card")
                    .forEach(function (card) {

                        card.remove();

                    });

                yscUpdateSummary();

                yscSaveCart();

                yscCheckEmptyCart();

            }

        );

    }

    /*=====================================================
    EMPTY CART STATE
    =====================================================*/

    function yscCheckEmptyCart() {

        const cartItems =
            document.querySelectorAll(".ysc-cart-card");

        if (cartItems.length > 0) return;

        const cartColumn =
            document.querySelector(".ysc-cart-section .col-xl-8");

        if (!cartColumn) return;

        cartColumn.innerHTML = `

            <div class="card shadow-sm border-0">

                <div class="card-body text-center py-5">

                    <i class="fa-solid fa-cart-shopping"

                        style="font-size:70px;color:#d1d5db;"></i>

                    <h3 class="mt-4">

                        Your cart is empty

                    </h3>

                    <p class="text-muted mt-2">

                        Looks like you haven't added any products yet.

                    </p>

                    <a

                        href="../products/products.html"

                        class="btn btn-success mt-4"

                    >

                        Continue Shopping

                    </a>

                </div>

            </div>

        `;

    }

    /*=====================================================
    PROMO CODE
    =====================================================*/

    const yscPromoButton =
        document.getElementById("yscPromoCodeBtn");

    const yscPromoWrapper =
        document.getElementById("yscPromoWrapper");

    if (yscPromoButton && yscPromoWrapper) {

        yscPromoButton.addEventListener(

            "click",

            function () {

                yscPromoWrapper.classList.toggle("d-none");

            }

        );

    }

    /*=====================================================
    APPLY PROMO
    =====================================================*/

    const yscApplyPromo =
        document.getElementById("yscApplyPromoBtn");

    if (yscApplyPromo) {

        yscApplyPromo.addEventListener(

            "click",

            function () {

                const input =
                    document.getElementById("yscPromoInput");

                const code =
                    input.value.trim().toUpperCase();

                if (code === "YOVI10") {

                    alert("10% discount applied successfully.");

                } else if (code === "") {

                    alert("Enter a promo code.");

                } else {

                    alert("Invalid promo code.");

                }

            }

        );

    }

    /*=====================================================
    PROCEED TO CHECKOUT
    =====================================================*/

    const yscCheckoutBtn =
        document.getElementById("yscCheckoutBtn");

    if (yscCheckoutBtn) {

        yscCheckoutBtn.addEventListener(

            "click",

            function () {

                yscSaveCart();

                window.location.href =
                    "../checkout/checkout.html";

            }

        );

    }

    /*=====================================================
    CONTINUE SHOPPING
    =====================================================*/

    const yscContinueShopping =
        document.getElementById("yscContinueShopping");

    if (yscContinueShopping) {

        yscContinueShopping.addEventListener(

            "click",

            function (event) {

                event.preventDefault();

                window.location.href =
                    "../products/products.html";

            }

        );

    }

    /*=====================================================
    CONTACT SUPPORT
    =====================================================*/

    const yscSupportBtn =
        document.getElementById("yscSupportBtn");

    if (yscSupportBtn) {

        yscSupportBtn.addEventListener(

            "click",

            function (event) {

                event.preventDefault();

                window.location.href =
                    "../support/contact-support.html";

            }

        );

    }

    /*=====================================================
    RESTORE CART FROM LOCAL STORAGE
    =====================================================*/

    function yscRestoreCart() {

        const savedCart = JSON.parse(

            localStorage.getItem(

                "yscShoppingCart"

            )

        );

        if (!savedCart) return;

        const cards =

            document.querySelectorAll(

                ".ysc-cart-card"

            );

        cards.forEach(function (card, index) {

            if (!savedCart[index]) return;

            const qtyInput =

                card.querySelector(

                    ".ysc-qty-input"

                );

            if (qtyInput) {

                qtyInput.value =

                    savedCart[index].quantity;

            }

        });

        yscUpdateSummary();

    }

    yscRestoreCart();

    /*=====================================================
    NAVBAR SCROLL EFFECT
    =====================================================*/

    const yscNavbar =

        document.querySelector(

            ".ysc-navbar"

        );

    window.addEventListener(

        "scroll",

        function () {

            if (

                window.scrollY > 40

            ) {

                yscNavbar?.classList.add(

                    "ysc-navbar-scrolled"

                );

            }

            else {

                yscNavbar?.classList.remove(

                    "ysc-navbar-scrolled"

                );

            }

        }

    );

    /*=====================================================
    SCROLL TO TOP
    =====================================================*/

    const yscScrollTop =

        document.getElementById(

            "yscScrollTop"

        );

    if (yscScrollTop) {

        window.addEventListener(

            "scroll",

            function () {

                if (

                    window.scrollY > 350

                ) {

                    yscScrollTop.classList.remove(

                        "ysc-hidden"

                    );

                }

                else {

                    yscScrollTop.classList.add(

                        "ysc-hidden"

                    );

                }

            }

        );

        yscScrollTop.addEventListener(

            "click",

            function () {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }

        );

    }

    /*=====================================================
    UPDATE TOTALS ON PAGE LOAD
    =====================================================*/

    yscUpdateSummary();

    /*=====================================================
    ACTIVE NAVIGATION LINK
    =====================================================*/

    const yscCurrentPage =

        window.location.pathname

        .split("/")

        .pop();

    document

        .querySelectorAll(

            ".ysc-nav-link"

        )

        .forEach(function(link){

            const href =

                link.getAttribute("href");

            if(

                href &&

                href.includes(yscCurrentPage)

            ){

                link.classList.add("active");

            }

        });

    /*=====================================================
    BUTTON RIPPLE EFFECT
    =====================================================*/

    document

        .querySelectorAll(

            ".btn, button"

        )

        .forEach(function(button){

            button.addEventListener(

                "click",

                function(event){

                    const ripple =

                        document.createElement(

                            "span"

                        );

                    ripple.className =

                        "ysc-ripple";

                    const rect =

                        button.getBoundingClientRect();

                    const size =

                        Math.max(

                            rect.width,

                            rect.height

                        );

                    ripple.style.width =

                        size + "px";

                    ripple.style.height =

                        size + "px";

                    ripple.style.left =

                        (event.clientX - rect.left - size / 2) +

                        "px";

                    ripple.style.top =

                        (event.clientY - rect.top - size / 2) +

                        "px";

                    button.appendChild(ripple);

                    setTimeout(function(){

                        ripple.remove();

                    },600);

                }

            );

        });

    /*=====================================================
    ONLINE / OFFLINE STATUS
    =====================================================*/

    window.addEventListener(

        "online",

        function(){

            console.log(

                "YOVI: Internet connection restored."

            );

        }

    );

    window.addEventListener(

        "offline",

        function(){

            console.warn(

                "YOVI: You are currently offline."

            );

        }

    );

    /*=====================================================
    BOOTSTRAP TOOLTIPS
    =====================================================*/

    if(

        typeof bootstrap !== "undefined"

    ){

        document

            .querySelectorAll(

                '[data-bs-toggle="tooltip"]'

            )

            .forEach(function(item){

                new bootstrap.Tooltip(item);

            });

    }

    /*=====================================================
    BOOTSTRAP POPOVERS
    =====================================================*/

    if(

        typeof bootstrap !== "undefined"

    ){

        document

            .querySelectorAll(

                '[data-bs-toggle="popover"]'

            )

            .forEach(function(item){

                new bootstrap.Popover(item);

            });

    }

    /*=====================================================
    PERFORMANCE LOG
    =====================================================*/

    window.addEventListener(

        "load",

        function(){

            console.log(

                "YOVI Shopping Cart loaded successfully."

            );

            console.log(

                "Screen:",

                window.innerWidth +

                " × " +

                window.innerHeight

            );

        }

    );

    /*=====================================================
    PAGE VISIBILITY
    =====================================================*/

    document.addEventListener(

        "visibilitychange",

        function(){

            if(document.hidden){

                console.log(

                    "Shopping cart hidden."

                );

            }

            else{

                console.log(

                    "Shopping cart active."

                );

            }

        }

    );

    /*=====================================================
    FINAL INITIALIZATION
    =====================================================*/

    console.log(

        "YOVI Shopping Cart initialized."

    );

});