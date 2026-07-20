/*==========================================
TEMP CART STATUS
Change to true when testing cart page
==========================================*/

const hasCartItems = false;

/*==========================================
GLOBAL CART NAVIGATION
==========================================*/

document.querySelectorAll(".js-cart-link").forEach(function(cart){

    cart.addEventListener("click", function(e){

        e.preventDefault();

        if(hasCartItems){

            window.location.href = "../../cart/shopping-cart.html";

        }else{

            window.location.href = "../../cart/cart.html";

        }

    });

});


/*====================================
LANDING PAGE 
=====================================*/

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* ==========================================
       DOM ELEMENTS
    ========================================== */

    const yhmHeader = document.querySelector(".yhm-header");

    const yhmNavbar = document.getElementById("yhmNavbar");

    const yhmScrollTop = document.getElementById("yhmScrollTop");

    const yhmRevealItems = document.querySelectorAll(
        ".yhm-highlight-card, \
         .yhm-feature-card, \
         .yhm-service-chip, \
         .yhm-sale-card, \
         .yhm-seller-card, \
         .yhm-pro-card, \
         .yhm-recommend-card, \
         .yhm-community-box"
    );

    const yhmWishlistButtons = document.querySelectorAll(
        ".yhm-wishlist, .yhm-wishlist-btn, .yhm-card-favourite"
    );

    const yhmCartButtons = document.querySelectorAll(
        ".yhm-add-cart, .yhm-cart-btn"
    );

    const yhmBookButtons = document.querySelectorAll(
        ".yhm-book-btn"
    );

    const yhmNewsletterForm = document.querySelector(
        ".yhm-newsletter-form"
    );

    const yhmFlashCounter = document.getElementById(
        "yhmFlashCountdown"
    );

    const yhmTopCounter = document.getElementById(
        "yhmTopSellerCountdown"
    );

    /* ==========================================
       PAGE NAVIGATION
    ========================================== */

    document.querySelectorAll("[data-page]").forEach((button) => {

        button.addEventListener("click", () => {

            const page = button.dataset.page;

            if (!page) return;

            window.location.href = page;

        });

    });

    /* ==========================================
       STICKY HEADER
    ========================================== */

    function yhmHandleHeader() {

        if (!yhmHeader) return;

        if (window.scrollY > 25) {

            yhmHeader.classList.add("yhm-header-scrolled");

        } else {

            yhmHeader.classList.remove("yhm-header-scrolled");

        }

    }

    yhmHandleHeader();

    window.addEventListener("scroll", yhmHandleHeader);

    /* ==========================================
       SCROLL REVEAL
    ========================================== */

    yhmRevealItems.forEach((item) => {

        item.classList.add("yhm-reveal");

    });

    const yhmObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("yhm-show");

                    yhmObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.18
        }

    );

    yhmRevealItems.forEach((item) => {

        yhmObserver.observe(item);

    });

    /* ==========================================
       MOBILE NAVIGATION
    ========================================== */

    if (yhmNavbar) {

        yhmNavbar.querySelectorAll(".nav-link").forEach((link) => {

            link.addEventListener("click", () => {

                if (window.innerWidth < 992) {

                    const collapse =
                        bootstrap.Collapse.getInstance(yhmNavbar);

                    if (collapse) {

                        collapse.hide();

                    }

                }

            });

        });

    }

    /* ==========================================
       FLASH SALES COUNTDOWN
    ========================================== */

    function yhmStartCountdown(element, hours = 3, minutes = 45, seconds = 12) {

        if (!element) return;

        let totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

        const timer = setInterval(() => {

            if (totalSeconds <= 0) {

                clearInterval(timer);

                element.textContent = "00:00:00";

                return;

            }

            totalSeconds--;

            const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");

            const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");

            const secs = String(totalSeconds % 60).padStart(2, "0");

            element.textContent = `${hrs}:${mins}:${secs}`;

        }, 1000);

    }

    yhmStartCountdown(yhmFlashCounter, 3, 45, 12);

    yhmStartCountdown(yhmTopCounter, 3, 45, 12);

    /* ==========================================
       WISHLIST BUTTONS
    ========================================== */

    yhmWishlistButtons.forEach((button) => {

        button.addEventListener("click", function () {

            this.classList.toggle("active");

            const icon = this.querySelector("i");

            if (!icon) return;

            if (this.classList.contains("active")) {

                icon.classList.remove("bi-heart");

                icon.classList.add("bi-heart-fill");

            } else {

                icon.classList.remove("bi-heart-fill");

                icon.classList.add("bi-heart");

            }

        });

    });

    /* ==========================================
       ADD TO CART
    ========================================== */

    yhmCartButtons.forEach((button) => {

        button.addEventListener("click", function () {

            if (this.disabled) return;

            const originalText = this.innerHTML;

            this.disabled = true;

            this.classList.add("active");

            this.innerHTML = `
                <i class="bi bi-check-circle-fill me-2"></i>
                Added
            `;

            setTimeout(() => {

                this.disabled = false;

                this.classList.remove("active");

                this.innerHTML = originalText;

            }, 1800);

        });

    });

    /* ==========================================
       BOOK NOW BUTTONS
    ========================================== */

    yhmBookButtons.forEach((button) => {

        button.addEventListener("click", function () {

            const originalText = this.innerHTML;

            this.disabled = true;

            this.classList.add("active");

            this.innerHTML = `
                <i class="bi bi-calendar-check me-2"></i>
                Booking...
            `;

            setTimeout(() => {

                window.location.href = "../../navigation/services.html";

            }, 1000);

            setTimeout(() => {

                this.disabled = false;

                this.classList.remove("active");

                this.innerHTML = originalText;

            }, 1600);

        });

    });

    /* ==========================================
       NEWSLETTER SUBSCRIPTION
    ========================================== */

    if (yhmNewsletterForm) {

        yhmNewsletterForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const emailInput = this.querySelector("input[type='email']");

            const submitButton = this.querySelector("button");

            if (!emailInput || !submitButton) return;

            const email = emailInput.value.trim();

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email === "") {

                alert("Please enter your email address.");

                emailInput.focus();

                return;

            }

            if (!emailPattern.test(email)) {

                alert("Please enter a valid email address.");

                emailInput.focus();

                return;

            }

            const originalButton = submitButton.innerHTML;

            submitButton.disabled = true;

            submitButton.classList.add("yhm-loading");

            submitButton.innerHTML = `
                <i class="bi bi-hourglass-split me-2"></i>
                Subscribing...
            `;

            setTimeout(() => {

                submitButton.classList.remove("yhm-loading");

                submitButton.innerHTML = `
                    <i class="bi bi-check-circle-fill me-2"></i>
                    Subscribed
                `;

                emailInput.value = "";

            }, 1800);

            setTimeout(() => {

                submitButton.disabled = false;

                submitButton.innerHTML = originalButton;

            }, 3500);

        });

    }

    /* ==========================================
       SMOOTH SCROLL FOR ANCHOR LINKS
    ========================================== */

    document.querySelectorAll("a[href^='#']").forEach((anchor) => {

        anchor.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (!targetElement) return;

            event.preventDefault();

            targetElement.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });

    /* ==========================================
       PRODUCT IMAGE HOVER EFFECT
    ========================================== */

    document.querySelectorAll(

        ".yhm-feature-image img, \
         .yhm-card-image img, \
         .yhm-sale-card img, \
         .yhm-seller-card img"

    ).forEach((image) => {

        image.addEventListener("mouseenter", () => {

            image.classList.add("yhm-scale-up");

        });

        image.addEventListener("mouseleave", () => {

            image.classList.remove("yhm-scale-up");

        });

    });

    /* ==========================================
       FEATURE CARD HOVER SHADOW
    ========================================== */

    document.querySelectorAll(

        ".yhm-feature-card, \
         .yhm-sale-card, \
         .yhm-seller-card, \
         .yhm-recommend-card"

    ).forEach((card) => {

        card.addEventListener("mouseenter", () => {

            card.classList.add("yhm-shadow-active");

        });

        card.addEventListener("mouseleave", () => {

            card.classList.remove("yhm-shadow-active");

        });

    });

    /* ==========================================
       SCROLL TO TOP BUTTON
    ========================================== */

    function yhmHandleScrollTop() {

        if (!yhmScrollTop) return;

        if (window.scrollY > 450) {

            yhmScrollTop.classList.add("yhm-show");

        } else {

            yhmScrollTop.classList.remove("yhm-show");

        }

    }

    window.addEventListener("scroll", yhmHandleScrollTop);

    yhmHandleScrollTop();

    if (yhmScrollTop) {

        yhmScrollTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    /* ==========================================
       BUTTON RIPPLE EFFECT
    ========================================== */

    document.querySelectorAll(

        ".yhm-start-btn,\
         .yhm-primary-btn,\
         .yhm-outline-btn,\
         .yhm-banner-primary,\
         .yhm-banner-outline,\
         .yhm-add-cart,\
         .yhm-cart-btn,\
         .yhm-book-btn,\
         .yhm-community-primary,\
         .yhm-community-outline"

    ).forEach((button) => {

        button.addEventListener("click", function (event) {

            const ripple = document.createElement("span");

            const diameter = Math.max(

                this.clientWidth,

                this.clientHeight

            );

            const radius = diameter / 2;

            ripple.style.width = ripple.style.height = `${diameter}px`;

            ripple.style.left = `${event.clientX - this.getBoundingClientRect().left - radius}px`;

            ripple.style.top = `${event.clientY - this.getBoundingClientRect().top - radius}px`;

            ripple.className = "yhm-ripple";

            const existingRipple = this.querySelector(".yhm-ripple");

            if (existingRipple) {

                existingRipple.remove();

            }

            this.appendChild(ripple);

        });

    });

    /* ==========================================
       ACTIVE NAVIGATION LINK
    ========================================== */

    const yhmCurrentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    document.querySelectorAll(".yhm-nav-link").forEach((link) => {

        const href = (link.getAttribute("href") || "").toLowerCase();

        if (

            href === yhmCurrentPage ||

            (yhmCurrentPage === "" && href === "index.html")

        ) {

            document
                .querySelectorAll(".yhm-nav-link")
                .forEach(item => item.classList.remove("active"));

            link.classList.add("active");

        }

    });

    /* ==========================================
       EXTERNAL PAGE LINKS
    ========================================== */

    document.querySelectorAll("[data-link]").forEach((element) => {

        element.style.cursor = "pointer";

        element.addEventListener("click", function () {

            const page = this.dataset.link;

            if (!page) return;

            window.location.href = page;

        });

    });

    /* ==========================================
       PRELOAD IMAGES
    ========================================== */

    document.querySelectorAll("img").forEach((image) => {

        if (image.complete) return;

        image.addEventListener("load", () => {

            image.style.opacity = "1";

        });

        image.style.opacity = ".85";

    });

    /* ==========================================
       WINDOW RESIZE HANDLER
    ========================================== */

    let yhmResizeTimer;

    window.addEventListener("resize", () => {

        clearTimeout(yhmResizeTimer);

        yhmResizeTimer = setTimeout(() => {

            yhmHandleHeader();

            yhmHandleScrollTop();

        }, 200);

    });

    /* ==========================================
       KEYBOARD ACCESSIBILITY
    ========================================== */

    document.addEventListener("keydown", (event) => {

        // Scroll to top using Home key
        if (event.key === "Home") {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }

        // Close mobile menu using Escape
        if (event.key === "Escape" && yhmNavbar) {

            const collapse =
                bootstrap.Collapse.getInstance(yhmNavbar);

            if (collapse) {

                collapse.hide();

            }

        }

    });

    /* ==========================================
       PAGE LOADED ANIMATION
    ========================================== */

    window.addEventListener("load", () => {

        document.body.classList.add("yhm-page-loaded");

    });

    /* ==========================================
       SIMPLE PERFORMANCE LOGGER
    ========================================== */

    console.info(
        "%cYOVI Marketplace Loaded Successfully",
        "color:#0d6efd;font-size:14px;font-weight:bold;"
    );

    console.info(
        "UI initialized:",
        new Date().toLocaleString()
    );

    /* ==========================================
       OPTIONAL PAGE ROUTING HELPERS
       (For future screens)
    ========================================== */

    window.yhmNavigate = function (page) {

        if (!page) return;

        window.location.href = page;

    };

    window.yhmReloadPage = function () {

        window.location.reload();

    };

    window.yhmGoBack = function () {

        window.history.back();

    };

    /* ==========================================
       GLOBAL ERROR HANDLER
    ========================================== */

    window.addEventListener("error", (event) => {

        console.error(
            "YOVI Error:",
            event.message
        );

    });

    /* ==========================================
       INITIALIZE PAGE
    ========================================== */

    yhmHandleHeader();

    yhmHandleScrollTop();

    console.log("YOVI Marketplace UI Ready 🚀");

});

/*======================================
END OF  HOMEPAGE 
======================================*/

/*==========================================================
CHECKOUT DELIVERY
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /*======================================================
    PAGE CHECK
    Runs ONLY on Checkout Delivery Page
    ======================================================*/

    const sscdlPage = document.getElementById("sscdl-page");

    if (!sscdlPage) return;

    /*======================================================
    HELPERS
    ======================================================*/

    const $ = (selector) => document.querySelector(selector);

    const $$ = (selector) => document.querySelectorAll(selector);

    /*======================================================
    PAGE LOADED
    ======================================================*/

    document.body.classList.add("sscdl-page-loaded");

    /*======================================================
    REVEAL ANIMATION
    ======================================================*/

    const sscdlRevealItems = $$(
        ".sscdl-card,.sscdl-summary-card,.sscdl-escrow-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("sscdl-show");

                }

            });

        }, {

            threshold:0.15

        });

        sscdlRevealItems.forEach((item) => {

            observer.observe(item);

        });

    }

    /*======================================================
    DELIVERY METHOD
    ======================================================*/

    const deliveryCards = $$(".sscdl-delivery-card");

    const deliveryFee = $("#sscdlDeliveryAmount");

    const totalAmount = $("#sscdlTotalAmount");

    deliveryCards.forEach((card) => {

        card.addEventListener("click", () => {

            deliveryCards.forEach((item) => {

                item.classList.remove("sscdl-delivery-active");

            });

            card.classList.add("sscdl-delivery-active");

            const type = card.querySelector("input").value;

            let fee = 2500;

            let total = 1857500;

            if (type === "express") {

                fee = 5000;

                total = 1860000;

            }

            if (type === "pickup") {

                fee = 0;

                total = 1855000;

            }

            if (deliveryFee) {

                deliveryFee.textContent =
                    "₦" + fee.toLocaleString();

            }

            if (totalAmount) {

                totalAmount.textContent =
                    "₦" + total.toLocaleString();

            }

        });

    });

    /*======================================================
    BUTTON RIPPLE
    ======================================================*/

    const buttons = $$(".sscdl-btn");

    buttons.forEach((button) => {

        button.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            ripple.className = "sscdl-ripple";

            const rect = this.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            ripple.style.width = size + "px";

            ripple.style.height = size + "px";

            ripple.style.left =
                e.clientX - rect.left - size / 2 + "px";

            ripple.style.top =
                e.clientY - rect.top - size / 2 + "px";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

    /*======================================================
    ACTIVE NAVIGATION
    ======================================================*/

    const currentPage = window.location.pathname
        .split("/")
        .pop();

    $$(".sscdl-nav-link").forEach((link) => {

        const href = link.getAttribute("href");

        if (!href) return;

        if (href.includes(currentPage)) {

            link.classList.add("sscdl-active");

        }

    });

    /*======================================================
    CART
    ======================================================*/

    // const cartBtn = $("#sscdlCartBtn");

    // if (cartBtn) {

    //     cartBtn.addEventListener("click", () => {

    //         window.location.href = "../cart.html";

    //     });

    // }

    /*======================================================
    NOTIFICATIONS
    ======================================================*/

    const notificationBtn = $("#sscdlNotificationBtn");

    if (notificationBtn) {

        notificationBtn.addEventListener("click", () => {

            window.location.href =
                "../notifications.html";

        });

    }

    /*======================================================
    PROFILE
    ======================================================*/

    const profile = $(".sscdl-profile");

    if (profile) {

        profile.addEventListener("click", (event) => {

            event.preventDefault();

            window.location.href =
                "../profile.html";

        });

    }

    /*======================================================
    CONTINUE BUTTON
    ======================================================*/

    const continueBtn = $("#sscdlContinueLink");

    if (continueBtn) {

        continueBtn.addEventListener("click", (event) => {

            event.preventDefault();

            window.location.href =
                "checkout-payment.html";

        });

    }

    /*======================================================
    FORM VALIDATION
    ======================================================*/

    const deliveryForm = $("#sscdlDeliveryForm");

    if (deliveryForm) {

        deliveryForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const firstName = $("#sscdlFirstName");
            const lastName = $("#sscdlLastName");
            const address = $("#sscdlAddress");
            const state = $("#sscdlState");
            const phone = $("#sscdlPhone");

            let valid = true;

            [firstName, lastName, address, state, phone].forEach((field) => {

                if (!field) return;

                field.style.borderColor = "var(--border)";

                if (field.value.trim() === "") {

                    field.style.borderColor = "var(--danger)";

                    valid = false;

                }

            });

            if (valid) {

                window.location.href = "checkout-payment.html";

            }

        });

    }

    /*======================================================
    INPUT ANIMATION
    ======================================================*/

    const inputs = $$(".sscdl-input");

    inputs.forEach((input) => {

        input.addEventListener("focus", () => {

            input.parentElement.classList.add("sscdl-input-focus");

        });

        input.addEventListener("blur", () => {

            input.parentElement.classList.remove("sscdl-input-focus");

        });

    });

    /*======================================================
    CARD HOVER EFFECT
    ======================================================*/

    const cards = $$(".sscdl-card,.sscdl-summary-card,.sscdl-escrow-card");

    cards.forEach((card) => {

        card.addEventListener("mouseenter", () => {

            card.style.transition = "0.3s ease";

            card.style.transform = "translateY(-4px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0)";

        });

    });

    /*======================================================
    SMOOTH PAGE FADE
    ======================================================*/

    window.addEventListener("load", () => {

        document.body.classList.add("sscdl-loaded");

    });

    /*======================================================
    WINDOW RESIZE
    ======================================================*/

    let resizeTimer;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {

            document.body.classList.add("sscdl-resized");

        }, 200);

    });

    /*======================================================
    KEYBOARD ACCESSIBILITY
    ======================================================*/

    document.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            const active = document.activeElement;

            if (

                active &&
                active.classList.contains("sscdl-btn")

            ) {

                active.click();

            }

        }

    });

    /*======================================================
    SCROLL TO TOP
    ======================================================*/

    window.addEventListener("beforeunload", () => {

        window.scrollTo({

            top:0,

            behavior:"auto"

        });

    });

});

/*======================================================
    END OF CART CHECKOUT PAGE
======================================================*/

/*==========================================================
EMPTY CART PAGE
==========================================================*/

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /*======================================================
    RUN ONLY ON EMPTY CART PAGE
    ======================================================*/

    const ssecPage = document.getElementById("ssecPage");

    if (!ssecPage) return;

    /*======================================================
    HELPERS
    ======================================================*/

    const $ = (selector) => document.querySelector(selector);

    const $$ = (selector) => document.querySelectorAll(selector);

    /*======================================================
    PAGE LOADED
    ======================================================*/

    document.body.classList.add("ssec-page-loaded");

    /*======================================================
    ELEMENTS
    ======================================================*/

    const browseButton = $("#ssecBrowseProductsBtn");

    const cartButton = $("#ssecCartIcon");

    const emptyWrapper = $(".ssec-empty-wrapper");

    /*======================================================
    BROWSE PRODUCTS
    ======================================================*/

    if (browseButton) {

        browseButton.addEventListener("click", function (e) {

            e.preventDefault();

            this.classList.add("ssec-loading");

            setTimeout(function () {

                window.location.href = "products.html";

            }, 300);

        });

    }

    /*======================================================
    NAVBAR CART
    ======================================================*/

    if (cartButton) {

        cartButton.addEventListener("click", function (e) {

            e.preventDefault();

            const cartItems = JSON.parse(

                localStorage.getItem("cartItems")

            ) || [];

            if (cartItems.length > 0) {

                window.location.href = "shopping-cart.html";

            } else {

                window.location.href = "empty-cart.html";

            }

        });

    }

    /*======================================================
    RIPPLE EFFECT
    ======================================================*/

    if (browseButton) {

        browseButton.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            ripple.className = "ssec-ripple";

            const rect = this.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            ripple.style.width = size + "px";

            ripple.style.height = size + "px";

            ripple.style.left =

                (e.clientX - rect.left - size / 2) + "px";

            ripple.style.top =

                (e.clientY - rect.top - size / 2) + "px";

            const oldRipple =

                this.querySelector(".ssec-ripple");

            if (oldRipple) {

                oldRipple.remove();

            }

            this.appendChild(ripple);

        });

    }

    /*======================================================
    REVEAL ANIMATION
    ======================================================*/

    if ("IntersectionObserver" in window && emptyWrapper) {

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("ssec-show");

                    observer.unobserve(entry.target);

                }

            });

        }, {

            threshold: 0.2

        });

        observer.observe(emptyWrapper);

    }

    /*======================================================
    ACTIVE NAVIGATION
    ======================================================*/

    const currentPage =

        window.location.pathname.split("/").pop();

    $$(".ssec-navbar .nav-link").forEach(function (link) {

        if (link.getAttribute("href") === currentPage) {

            link.classList.add("active");

        }

    });

    /*======================================================
    KEYBOARD ACCESSIBILITY
    ======================================================*/

    [browseButton, cartButton].forEach(function(button){

        if(!button) return;

        button.addEventListener("keydown",function(event){

            if(event.key==="Enter" || event.key===" "){

                event.preventDefault();

                this.click();

            }

        });

    });

    /*======================================================
    WINDOW LOAD
    ======================================================*/

    window.addEventListener("load",function(){

        document.body.classList.add("ssec-loaded");

    });

    /*======================================================
    RESIZE HANDLER
    ======================================================*/

    let resizeTimer;

    window.addEventListener("resize",function(){

        clearTimeout(resizeTimer);

        resizeTimer=setTimeout(function(){

            document.body.classList.add("ssec-resized");

        },200);

    });

    /*======================================================
    RESET SCROLL POSITION
    ======================================================*/

    window.addEventListener("beforeunload",function(){

        window.scrollTo(0,0);

    });

    /*======================================================
    PREVENT DOUBLE CLICK
    ======================================================*/

    [browseButton, cartButton].forEach(function(button){

        if(!button) return;

        button.addEventListener("dblclick",function(event){

            event.preventDefault();

        });

    });

    /*======================================================
    REMOVE RIPPLE AFTER ANIMATION
    ======================================================*/

    document.addEventListener("animationend",function(event){

        if(event.target.classList.contains("ssec-ripple")){

            event.target.remove();

        }

    });

    /*======================================================
    CHECK CART STATUS
    Automatically redirect if cart becomes populated
    while user is still on the empty cart page.
    ======================================================*/

    window.addEventListener("storage",function(event){

        if(event.key==="cartItems"){

            const cartItems=JSON.parse(

                localStorage.getItem("cartItems")

            ) || [];

            if(cartItems.length>0){

                window.location.href="shopping-cart.html";

            }

        }

    });

    /*======================================================
    END OF EMPTY CART PAGE
    ======================================================*/

});


/*==========================================================
CHECKOUT CONFIRM PAGE
==========================================================*/

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /*======================================================
    RUN ONLY ON CHECKOUT CONFIRM PAGE
    ======================================================*/

    const sscfPage = document.getElementById("sscfPage");

    if (!sscfPage) return;

    /*======================================================
    HELPERS
    ======================================================*/

    const $ = (selector) => document.querySelector(selector);

    const $$ = (selector) => document.querySelectorAll(selector);

    /*======================================================
    PAGE LOADED
    ======================================================*/

    document.body.classList.add("sscf-page-loaded");

    /*======================================================
    ELEMENTS
    ======================================================*/

    const trackOrderBtn = $("#sscfTrackOrderBtn");

    const continueShoppingBtn = $("#sscfContinueShoppingBtn");

    const successIcon = $(".sscf-success-icon");

    /*======================================================
    CLEAR CHECKOUT SESSION
    ======================================================*/

    try{

        sessionStorage.removeItem("checkoutDelivery");

        sessionStorage.removeItem("checkoutPayment");

        sessionStorage.removeItem("checkoutCard");

        sessionStorage.removeItem("checkoutOrder");

        sessionStorage.removeItem("selectedPaymentMethod");

    }

    catch(error){

        console.log(error);

    }

    /*======================================================
    SUCCESS ICON ANIMATION
    ======================================================*/

    if(successIcon){

        setTimeout(function(){

            successIcon.classList.add("sscf-success-ready");

        },300);

    }

    /*======================================================
    TRACK ORDER
    ======================================================*/

    if(trackOrderBtn){

        trackOrderBtn.addEventListener("click",function(e){

            e.preventDefault();

            this.classList.add("sscf-loading");

            setTimeout(function(){

                window.location.href="buyer-orders.html";

            },500);

        });

    }

    /*======================================================
    CONTINUE SHOPPING
    ======================================================*/

    if(continueShoppingBtn){

        continueShoppingBtn.addEventListener("click",function(e){

            e.preventDefault();

            this.classList.add("sscf-loading");

            setTimeout(function(){

                window.location.href="../../products/products.html";

            },500);

        });

    }

    /*======================================================
    BUTTON RIPPLE EFFECT
    ======================================================*/

    const buttons=$$(".sscf-track-btn, .sscf-shopping-btn");

    buttons.forEach(function(button){

        button.addEventListener("click",function(e){

            const ripple=document.createElement("span");

            ripple.className="sscf-ripple";

            const rect=this.getBoundingClientRect();

            const size=Math.max(rect.width,rect.height);

            ripple.style.width=size+"px";

            ripple.style.height=size+"px";

            ripple.style.left=(e.clientX-rect.left-size/2)+"px";

            ripple.style.top=(e.clientY-rect.top-size/2)+"px";

            const oldRipple=this.querySelector(".sscf-ripple");

            if(oldRipple){

                oldRipple.remove();

            }

            this.appendChild(ripple);

        });

    });

    /*======================================================
    ACTIVE NAVIGATION
    ======================================================*/

    const currentPage=window.location.pathname.split("/").pop();

    $$(".sscf-navbar .nav-link").forEach(function(link){

        if(link.getAttribute("href")===currentPage){

            link.classList.add("active");

        }

    });

    /*======================================================
    KEYBOARD ACCESSIBILITY
    ======================================================*/

    [trackOrderBtn, continueShoppingBtn].forEach(function(button){

        if(!button) return;

        button.addEventListener("keydown",function(event){

            if(event.key==="Enter" || event.key===" "){

                event.preventDefault();

                this.click();

            }

        });

    });

    /*======================================================
    REVEAL ANIMATION
    ======================================================*/

    const revealElements=$$(

        ".sscf-success-icon, .sscf-order-card, .sscf-actions"

    );

    if("IntersectionObserver" in window){

        const observer=new IntersectionObserver(function(entries){

            entries.forEach(function(entry){

                if(entry.isIntersecting){

                    entry.target.classList.add("sscf-show");

                    observer.unobserve(entry.target);

                }

            });

        },{

            threshold:0.15

        });

        revealElements.forEach(function(element){

            observer.observe(element);

        });

    }

    /*======================================================
    WINDOW LOAD
    ======================================================*/

    window.addEventListener("load",function(){

        document.body.classList.add("sscf-loaded");

    });

    /*======================================================
    RESIZE HANDLER
    ======================================================*/

    let resizeTimer;

    window.addEventListener("resize",function(){

        clearTimeout(resizeTimer);

        resizeTimer=setTimeout(function(){

            document.body.classList.add("sscf-resized");

        },200);

    });

    /*======================================================
    RESET SCROLL POSITION
    ======================================================*/

    window.addEventListener("beforeunload",function(){

        window.scrollTo(0,0);

    });

    /*======================================================
    PREVENT DOUBLE CLICK
    ======================================================*/

    buttons.forEach(function(button){

        button.addEventListener("dblclick",function(event){

            event.preventDefault();

        });

    });

    /*======================================================
    AUTO REMOVE RIPPLE
    ======================================================*/

    document.addEventListener("animationend",function(event){

        if(event.target.classList.contains("sscf-ripple")){

            event.target.remove();

        }

    });

});

/*======================================================
    END OF CHECKOUT CONFIRM PAGE
    ======================================================*/



/*==========================================================
CHECKOUT PAYMENT PAGE
==========================================================*/

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /*======================================================
    RUN ONLY ON CHECKOUT PAYMENT PAGE
    ======================================================*/

    const sscpPage = document.getElementById("sscpPage");

    if (!sscpPage) return;

    /*======================================================
    HELPERS
    ======================================================*/

    const $ = (selector) => document.querySelector(selector);

    const $$ = (selector) => document.querySelectorAll(selector);

    /*======================================================
    PAGE LOADED
    ======================================================*/

    document.body.classList.add("sscp-page-loaded");

    /*======================================================
    PAYMENT METHOD ELEMENTS
    ======================================================*/

    const paymentMethods = $$(".sscp-payment-method");

    const payButton = $("#sscpPayButton");

    /*======================================================
    PAYMENT METHOD SELECTION
    ======================================================*/

    paymentMethods.forEach(function (method) {

        method.addEventListener("click", function () {

            paymentMethods.forEach(function (item) {

                item.classList.remove("sscp-payment-method-active");

            });

            method.classList.add("sscp-payment-method-active");

        });

    });

    /*======================================================
    PAY BUTTON
    ======================================================*/

    if (payButton) {

        payButton.addEventListener("click", function (event) {

            event.preventDefault();

            const selectedMethod = document.querySelector(".sscp-payment-method-active");

            if (!selectedMethod) {

                alert("Please select a payment method.");

                return;

            }

            /*==============================================
            DEBIT / CREDIT CARD
            ==============================================*/

            if (selectedMethod.id === "sscpDebitCard") {

                window.location.href = "checkout-card.html";

                return;

            }

            /*==============================================
            BANK TRANSFER
            ==============================================*/

            if (selectedMethod.id === "sscpBankTransfer") {

                window.location.href = "checkout-bank-transfer.html";

                return;

            }

            /*==============================================
            USSD
            ==============================================*/

            if (selectedMethod.id === "sscpUSSD") {

                window.location.href = "checkout-ussd.html";

                return;

            }

            /*==============================================
            YOVI WALLET
            ==============================================*/

            if (selectedMethod.id === "sscpWallet") {

                window.location.href = "../../seller/seller-wallet.html";

                return;

            }

        });

    }

    /*======================================================
    BACK BUTTON
    ======================================================*/

    const backButton = $(".sscp-back-btn");

    if (backButton) {

        backButton.addEventListener("click", function () {

            window.location.href = "checkout-delivery.html";

        });

    }

    /*======================================================
    RIPPLE EFFECT
    ======================================================*/

    if (payButton) {

        payButton.addEventListener("click", function (e) {

            const circle = document.createElement("span");

            circle.classList.add("sscp-ripple");

            const diameter = Math.max(
                payButton.clientWidth,
                payButton.clientHeight
            );

            circle.style.width = diameter + "px";

            circle.style.height = diameter + "px";

            circle.style.left =
                e.clientX -
                payButton.getBoundingClientRect().left -
                diameter / 2 +
                "px";

            circle.style.top =
                e.clientY -
                payButton.getBoundingClientRect().top -
                diameter / 2 +
                "px";

            const oldRipple = payButton.querySelector(".sscp-ripple");

            if (oldRipple) {

                oldRipple.remove();

            }

            payButton.appendChild(circle);

        });

    }

    /*======================================================
    REVEAL ANIMATION
    ======================================================*/

    const revealItems = $$(
        ".sscp-payment-card, .sscp-order-summary, .sscp-escrow-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("sscp-show");

                }

            });

        }, {

            threshold:0.15

        });

        revealItems.forEach(function (item) {

            observer.observe(item);

        });

    }

    /*======================================================
    KEYBOARD ACCESSIBILITY
    ======================================================*/

    paymentMethods.forEach(function (method) {

        method.setAttribute("tabindex", "0");

        method.addEventListener("keydown", function (event) {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();

                method.click();

            }

        });

    });

    /*======================================================
    HOVER EFFECT
    ======================================================*/

    const hoverCards = $$(
        ".sscp-payment-card, .sscp-order-summary, .sscp-escrow-card"
    );

    hoverCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            card.style.transform = "translateY(-4px)";

        });

        card.addEventListener("mouseleave", function () {

            card.style.transform = "translateY(0)";

        });

    });

    /*======================================================
    ACTIVE NAVIGATION
    ======================================================*/

    const currentPage = window.location.pathname
        .split("/")
        .pop();

    $$(".sscp-navbar .nav-link").forEach(function (link) {

        const href = link.getAttribute("href");

        if (href === currentPage) {

            link.classList.add("active");

        }

    });

    /*======================================================
    PAGE LOAD ANIMATION
    ======================================================*/

    window.addEventListener("load", function () {

        document.body.classList.add("sscp-loaded");

    });

    /*======================================================
    RESIZE HANDLER
    ======================================================*/

    let resizeTimer;

    window.addEventListener("resize", function () {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {

            document.body.classList.add("sscp-resized");

        }, 200);

    });

    /*======================================================
    SCROLL TO TOP
    ======================================================*/

    window.addEventListener("beforeunload", function () {

        window.scrollTo(0, 0);

    });

    /*======================================================
    OPTIONAL:
    PRESELECT BANK TRANSFER
    (Matches the UI in the design image)
    ======================================================*/

    const defaultMethod = document.getElementById("sscpBankTransfer");

    if (defaultMethod) {

        paymentMethods.forEach(function (item) {

            item.classList.remove("sscp-payment-method-active");

        });

        defaultMethod.classList.add("sscp-payment-method-active");

    }

    /*======================================================
    END OF CHECKOUT PAYMENT PAGE
    ======================================================*/

});


/*==========================================================
CHECKOUT CARD PAGE
==========================================================*/

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /*======================================================
    RUN ONLY ON CHECKOUT CARD PAGE
    ======================================================*/

    const ssccPage = document.getElementById("ssccPage");

    if (!ssccPage) return;

    /*======================================================
    HELPERS
    ======================================================*/

    const $ = (selector) => document.querySelector(selector);

    const $$ = (selector) => document.querySelectorAll(selector);

    /*======================================================
    PAGE LOADED
    ======================================================*/

    document.body.classList.add("sscc-page-loaded");

    /*======================================================
    ELEMENTS
    ======================================================*/

    const cardForm = $("#ssccCardForm");

    const cardNumber = $("#ssccCardNumber");

    const expiry = $("#ssccExpiry");

    const cvv = $("#ssccCVV");

    const payButton = $("#ssccPaySecurely");

    /*======================================================
    CARD NUMBER FORMAT
    ======================================================*/

    if (cardNumber) {

        cardNumber.addEventListener("input", function () {

            let value = this.value.replace(/\D/g, "");

            value = value.substring(0, 16);

            value = value.replace(/(.{4})/g, "$1 ").trim();

            this.value = value;

        });

    }

    /*======================================================
    EXPIRY FORMAT
    ======================================================*/

    if (expiry) {

        expiry.addEventListener("input", function () {

            let value = this.value.replace(/\D/g, "");

            value = value.substring(0, 4);

            if (value.length > 2) {

                value = value.substring(0, 2) + "/" + value.substring(2);

            }

            this.value = value;

        });

    }

    /*======================================================
    CVV FORMAT
    ======================================================*/

    if (cvv) {

        cvv.addEventListener("input", function () {

            this.value = this.value.replace(/\D/g, "");

            this.value = this.value.substring(0, 4);

        });

    }

    /*======================================================
    PAY BUTTON RIPPLE
    ======================================================*/

    if (payButton) {

        payButton.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            ripple.classList.add("sscc-ripple");

            const diameter = Math.max(

                payButton.clientWidth,

                payButton.clientHeight

            );

            ripple.style.width = diameter + "px";

            ripple.style.height = diameter + "px";

            ripple.style.left =

                e.clientX -

                payButton.getBoundingClientRect().left -

                diameter / 2 +

                "px";

            ripple.style.top =

                e.clientY -

                payButton.getBoundingClientRect().top -

                diameter / 2 +

                "px";

            const oldRipple =

                payButton.querySelector(".sscc-ripple");

            if (oldRipple) {

                oldRipple.remove();

            }

            payButton.appendChild(ripple);

        });

    }

    /*======================================================
    FORM SUBMIT
    ======================================================*/

    if (cardForm) {

        cardForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const cardValue =

                cardNumber.value.replace(/\s/g, "");

            const expiryValue = expiry.value.trim();

            const cvvValue = cvv.value.trim();

            if (

                cardValue.length < 16 ||

                expiryValue.length < 5 ||

                cvvValue.length < 3

            ) {

                alert("Please complete your card details.");

                return;

            }

            payButton.classList.add("sscc-loading");

            payButton.disabled = true;

            payButton.innerHTML =

                '<i class="fa-solid fa-spinner fa-spin"></i> Processing Payment...';

            setTimeout(function () {

                window.location.href =

                    "checkout-confirm.html";

            }, 2000);

        });

    }

    /*======================================================
    BACK BUTTON
    ======================================================*/

    const backButton = $(".sscc-back-btn");

    if (backButton) {

        backButton.addEventListener("click", function (e) {

            e.preventDefault();

            window.location.href = "checkout-payment.html";

        });

    }

    /*======================================================
    KEYBOARD ACCESSIBILITY
    ======================================================*/

    [cardNumber, expiry, cvv].forEach(function (field) {

        if (!field) return;

        field.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                if (payButton) {

                    payButton.click();

                }

            }

        });

    });

    /*======================================================
    CARD INPUT FOCUS EFFECT
    ======================================================*/

    const formInputs = $$(".sscc-card-details .form-control");

    formInputs.forEach(function (input) {

        input.addEventListener("focus", function () {

            this.parentElement.classList.add("sscc-input-focus");

        });

        input.addEventListener("blur", function () {

            this.parentElement.classList.remove("sscc-input-focus");

        });

    });

    /*======================================================
    REVEAL ANIMATION
    ======================================================*/

    const revealItems = $$(
        ".sscc-card-form, .sscc-order-summary, .sscc-escrow-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("sscc-show");

                    observer.unobserve(entry.target);

                }

            });

        }, {

            threshold:0.15

        });

        revealItems.forEach(function (item) {

            observer.observe(item);

        });

    }

    /*======================================================
    ACTIVE NAVIGATION
    ======================================================*/

    const currentPage = window.location.pathname
        .split("/")
        .pop();

    $$(".sscc-navbar .nav-link").forEach(function (link) {

        if (link.getAttribute("href") === currentPage) {

            link.classList.add("active");

        }

    });

    /*======================================================
    WINDOW LOAD
    ======================================================*/

    window.addEventListener("load", function () {

        document.body.classList.add("sscc-loaded");

    });

    /*======================================================
    RESIZE HANDLER
    ======================================================*/

    let resizeTimer;

    window.addEventListener("resize", function () {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {

            document.body.classList.add("sscc-resized");

        }, 200);

    });

    /*======================================================
    RESET SCROLL POSITION
    ======================================================*/

    window.addEventListener("beforeunload", function () {

        window.scrollTo(0, 0);

    });

    /*======================================================
    END OF CHECKOUT CARD PAGE
    ======================================================*/

});

/*==========================================================
CHECKOUT CONFIRM PAGE
==========================================================*/

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /*======================================================
    RUN ONLY ON CHECKOUT CONFIRM PAGE
    ======================================================*/

    const sscfPage = document.getElementById("sscfPage");

    if (!sscfPage) return;

    /*======================================================
    HELPERS
    ======================================================*/

    const $ = (selector) => document.querySelector(selector);

    const $$ = (selector) => document.querySelectorAll(selector);

    /*======================================================
    PAGE LOADED
    ======================================================*/

    document.body.classList.add("sscf-page-loaded");

    /*======================================================
    ELEMENTS
    ======================================================*/

    const trackOrderBtn = $("#sscfTrackOrderBtn");

    const continueShoppingBtn = $("#sscfContinueShoppingBtn");

    const successIcon = $(".sscf-success-icon");

    /*======================================================
    CLEAR CHECKOUT SESSION
    ======================================================*/

    try{

        sessionStorage.removeItem("checkoutDelivery");

        sessionStorage.removeItem("checkoutPayment");

        sessionStorage.removeItem("checkoutCard");

        sessionStorage.removeItem("checkoutOrder");

        sessionStorage.removeItem("selectedPaymentMethod");

    }

    catch(error){

        console.log(error);

    }

    /*======================================================
    SUCCESS ICON ANIMATION
    ======================================================*/

    if(successIcon){

        setTimeout(function(){

            successIcon.classList.add("sscf-success-ready");

        },300);

    }

    /*======================================================
    TRACK ORDER
    ======================================================*/

    if(trackOrderBtn){

        trackOrderBtn.addEventListener("click",function(e){

            e.preventDefault();

            this.classList.add("sscf-loading");

            setTimeout(function(){

                window.location.href="buyer-orders.html";

            },500);

        });

    }

    /*======================================================
    CONTINUE SHOPPING
    ======================================================*/

    if(continueShoppingBtn){

        continueShoppingBtn.addEventListener("click",function(e){

            e.preventDefault();

            this.classList.add("sscf-loading");

            setTimeout(function(){

                window.location.href="products.html";

            },500);

        });

    }

    /*======================================================
    BUTTON RIPPLE EFFECT
    ======================================================*/

    const buttons=$$(".sscf-track-btn, .sscf-shopping-btn");

    buttons.forEach(function(button){

        button.addEventListener("click",function(e){

            const ripple=document.createElement("span");

            ripple.className="sscf-ripple";

            const rect=this.getBoundingClientRect();

            const size=Math.max(rect.width,rect.height);

            ripple.style.width=size+"px";

            ripple.style.height=size+"px";

            ripple.style.left=(e.clientX-rect.left-size/2)+"px";

            ripple.style.top=(e.clientY-rect.top-size/2)+"px";

            const oldRipple=this.querySelector(".sscf-ripple");

            if(oldRipple){

                oldRipple.remove();

            }

            this.appendChild(ripple);

        });

    });

    /*======================================================
    ACTIVE NAVIGATION
    ======================================================*/

    const currentPage=window.location.pathname.split("/").pop();

    $$(".sscf-navbar .nav-link").forEach(function(link){

        if(link.getAttribute("href")===currentPage){

            link.classList.add("active");

        }

    });

    /*======================================================
    KEYBOARD ACCESSIBILITY
    ======================================================*/

    [trackOrderBtn, continueShoppingBtn].forEach(function(button){

        if(!button) return;

        button.addEventListener("keydown",function(event){

            if(event.key==="Enter" || event.key===" "){

                event.preventDefault();

                this.click();

            }

        });

    });

    /*======================================================
    REVEAL ANIMATION
    ======================================================*/

    const revealElements=$$(

        ".sscf-success-icon, .sscf-order-card, .sscf-actions"

    );

    if("IntersectionObserver" in window){

        const observer=new IntersectionObserver(function(entries){

            entries.forEach(function(entry){

                if(entry.isIntersecting){

                    entry.target.classList.add("sscf-show");

                    observer.unobserve(entry.target);

                }

            });

        },{

            threshold:0.15

        });

        revealElements.forEach(function(element){

            observer.observe(element);

        });

    }

    /*======================================================
    WINDOW LOAD
    ======================================================*/

    window.addEventListener("load",function(){

        document.body.classList.add("sscf-loaded");

    });

    /*======================================================
    RESIZE HANDLER
    ======================================================*/

    let resizeTimer;

    window.addEventListener("resize",function(){

        clearTimeout(resizeTimer);

        resizeTimer=setTimeout(function(){

            document.body.classList.add("sscf-resized");

        },200);

    });

    /*======================================================
    RESET SCROLL POSITION
    ======================================================*/

    window.addEventListener("beforeunload",function(){

        window.scrollTo(0,0);

    });

    /*======================================================
    PREVENT DOUBLE CLICK
    ======================================================*/

    buttons.forEach(function(button){

        button.addEventListener("dblclick",function(event){

            event.preventDefault();

        });

    });

    /*======================================================
    AUTO REMOVE RIPPLE
    ======================================================*/

    document.addEventListener("animationend",function(event){

        if(event.target.classList.contains("sscf-ripple")){

            event.target.remove();

        }

    });

});

  /*======================================================
    END OF CHECKOUT CONFIRM PAGE
    ======================================================*/

/*==========================================================
ALL PRODUCTS PAGE
Prefix: ssap
==========================================================*/

(function(){

    "use strict";

    /*======================================================
    HELPERS
    ======================================================*/

    const $ = (selector,parent=document)=>parent.querySelector(selector);

    const $$ = (selector,parent=document)=>parent.querySelectorAll(selector);

    const body = document.body;

    if(body.id !== "ssapPage"){

        return;

    }

    /*======================================================
    PAGE ELEMENTS
    ======================================================*/

    const searchInput = $(".ssap-search input");

    const categoryButtons = $$(".ssap-category");

    const productCards = $$(".ssap-product-card");

    const viewButtons = $$(".ssap-view-btn");

    const addToCartButtons = $$(".ssap-cart-btn");

    const filterLinks = $$(".ssap-filter-card a");

    const paginationLinks = $$(".ssap-pagination-wrapper .page-link");

    /*======================================================
    SEARCH PRODUCTS
    ======================================================*/

    if(searchInput){

        searchInput.addEventListener("input",function(){

            const keyword = this.value.trim().toLowerCase();

            productCards.forEach(function(card){

                const title = card.querySelector("h5").textContent.toLowerCase();

                const description = card.querySelector("p").textContent.toLowerCase();

                if(title.includes(keyword) || description.includes(keyword)){

                    card.parentElement.style.display="";

                }else{

                    card.parentElement.style.display="none";

                }

            });

        });

    }

    /*======================================================
    CATEGORY BUTTONS
    ======================================================*/

    categoryButtons.forEach(function(button){

        button.addEventListener("click",function(){

            categoryButtons.forEach(function(item){

                item.classList.remove("active");

            });

            this.classList.add("active");

        });

    });

    /*======================================================
    GRID / LIST VIEW
    ======================================================*/

    viewButtons.forEach(function(button){

        button.addEventListener("click",function(){

            viewButtons.forEach(function(item){

                item.classList.remove("active");

            });

            this.classList.add("active");

        });

    });

    /*======================================================
    FILTER LINKS
    ======================================================*/

    filterLinks.forEach(function(link){

        link.addEventListener("click",function(event){

            event.preventDefault();

            filterLinks.forEach(function(item){

                item.classList.remove("text-primary");

            });

            this.classList.add("text-primary");

        });

    });

    /*======================================================
    PRODUCT HOVER EFFECT
    ======================================================*/

    productCards.forEach(function(card){

        card.addEventListener("mouseenter",function(){

            this.style.transform="translateY(-8px)";

        });

        card.addEventListener("mouseleave",function(){

            this.style.transform="";

        });

    });

    /*======================================================
    ADD TO CART BUTTON
    ======================================================*/

    addToCartButtons.forEach(function(button){

        button.addEventListener("click",function(event){

            event.preventDefault();

            event.stopPropagation();

            this.classList.add("ssap-cart-added");

            const icon = this.querySelector("i");

            if(icon){

                icon.classList.remove("fa-cart-plus");

                icon.classList.add("fa-check");

            }

            setTimeout(()=>{

                this.classList.remove("ssap-cart-added");

                if(icon){

                    icon.classList.remove("fa-check");

                    icon.classList.add("fa-cart-plus");

                }

            },1200);

        });

    });

/*======================================================
PAGINATION
======================================================*/

paginationLinks.forEach(function(link){

    link.addEventListener("click",function(event){

        event.preventDefault();

        const pageItem = this.parentElement;

        if(pageItem.classList.contains("disabled")){

            return;

        }

        paginationLinks.forEach(function(item){

            if(item.parentElement.classList.contains("active")){

                item.parentElement.classList.remove("active");

            }

        });

        if(!pageItem.classList.contains("disabled")){

            pageItem.classList.add("active");

        }

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

});

/*======================================================
ESC TO CLEAR SEARCH
======================================================*/

document.addEventListener("keydown",function(event){

    if(event.key !== "Escape"){

        return;

    }

    if(searchInput){

        searchInput.value="";

        searchInput.dispatchEvent(new Event("input"));

        searchInput.blur();

    }

});

/*======================================================
PRODUCT DETAILS
======================================================*/

productCards.forEach(function(card){

    card.addEventListener("click",function(event){

        if(event.target.closest(".ssap-cart-btn")){

            return;

        }

        window.location.href="product-details.html";

    });

});

/*======================================================
FILTER BUTTON
======================================================*/

const filterButton=$(".ssap-filter-btn");

const sidebar=$(".ssap-sidebar");

if(filterButton && sidebar){

    filterButton.addEventListener("click",function(){

        sidebar.classList.toggle("ssap-sidebar-open");

    });

}

/*======================================================
CART ICON
======================================================*/

const cartIcon=$("#ssapCartIcon");

if(cartIcon){

    cartIcon.addEventListener("click",function(event){

        event.preventDefault();

        /*
        FRONT-END ONLY

        Change this variable later when
        backend/localStorage is integrated.
        */

        const hasCartItems=false;

        if(hasCartItems){

            window.location.href="../../cart/shopping-cart.html";

        }else{

            window.location.href="../../cart/cart.html";

        }

    });

}

/*======================================================
NAVIGATION LINKS
======================================================*/

const navigationLinks=$$(".ssap-navbar .nav-link");

navigationLinks.forEach(function(link){

    link.addEventListener("click",function(){

        navigationLinks.forEach(function(item){

            item.classList.remove("active");

        });

        this.classList.add("active");

    });

});

/*======================================================
CATEGORY BUTTON ANIMATION
======================================================*/

categoryButtons.forEach(function(button){

    button.addEventListener("click",function(){

        this.animate([

            {

                transform:"scale(.95)"

            },

            {

                transform:"scale(1)"

            }

        ],{

            duration:180,

            easing:"ease-out"

        });

    });

});

/*======================================================
PRODUCT IMAGE PARALLAX
======================================================*/

productCards.forEach(function(card){

    const image=card.querySelector(".ssap-product-image img");

    if(!image){

        return;

    }

    card.addEventListener("mousemove",function(event){

        const rect=card.getBoundingClientRect();

        const x=((event.clientX-rect.left)/rect.width-.5)*8;

        const y=((event.clientY-rect.top)/rect.height-.5)*8;

        image.style.transform=`scale(1.05) translate(${x}px, ${y}px)`;

    });

    card.addEventListener("mouseleave",function(){

        image.style.transform="";

    });

});

})();

/*======================================================
END OF ALL PRODUCTS PAGE
======================================================*/


/*==========================================================
SERVICE TOP NAVBAR LANDING PAGE
==========================================================*/

(function(){

"use strict";

/*==========================================================
PAGE CHECK
==========================================================*/

if(document.body.id !== "stnlpPage"){

    return;

}

/*==========================================================
HELPERS
==========================================================*/

const $=(selector,parent=document)=>parent.querySelector(selector);

const $$=(selector,parent=document)=>parent.querySelectorAll(selector);

/*==========================================================
ELEMENTS
==========================================================*/

const stnlpSearchForm=$("#stnlpSearchForm");

const stnlpSearchInput=$("#stnlpSearchInput");

const stnlpLocation=$("#stnlpLocation");

const stnlpFindButton=$(".stnlp-find-btn");

const stnlpCategoryCards=$$(".stnlp-category-card");

const stnlpProviderCards=$$(".stnlp-provider-card");

const stnlpViewAll=$(".stnlp-view-all");

const stnlpCart=$("#stnlpCartIcon");

const stnlpNavigation=$$(".stnlp-navbar .nav-link");

const stnlpFooterLinks=$$(".stnlp-footer-links a");

/*==========================================================
SEARCH FORM
==========================================================*/

if(stnlpSearchForm){

    stnlpSearchForm.addEventListener("submit",function(event){

        event.preventDefault();

        const keyword=stnlpSearchInput.value.trim();

        const location=stnlpLocation.value;

        if(keyword===""){

            stnlpSearchInput.focus();

            return;

        }

        /*
        Replace later with backend search
        */

        window.location.href=
        "service-search-results.html";

    });

}

/*==========================================================
SEARCH INPUT ANIMATION
==========================================================*/

if(stnlpSearchInput){

    stnlpSearchInput.addEventListener("focus",function(){

        this.parentElement.classList.add("stnlp-search-active");

    });

    stnlpSearchInput.addEventListener("blur",function(){

        this.parentElement.classList.remove("stnlp-search-active");

    });

}

/*==========================================================
CATEGORY CARDS
==========================================================*/

stnlpCategoryCards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        this.style.transform="translateY(-8px)";

    });

    card.addEventListener("mouseleave",function(){

        this.style.transform="";

    });

    card.addEventListener("click",function(event){

        event.preventDefault();

        window.location.href="../../services/service-category.html";

    });

});

/*==========================================================
PROVIDER CARDS
==========================================================*/

stnlpProviderCards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        this.style.transform="translateY(-8px)";

    });

    card.addEventListener("mouseleave",function(){

        this.style.transform="";

    });

    card.addEventListener("click",function(event){

        event.preventDefault();

        window.location.href="../../profile/provider-profile.html";

    });

});

/*==========================================================
VIEW ALL
==========================================================*/

if(stnlpViewAll){

    stnlpViewAll.addEventListener("click",function(event){

        event.preventDefault();

        window.location.href="../../services/service-provider.html";

    });

}

/*==========================================================
TOP NAVIGATION
==========================================================*/

stnlpNavigation.forEach(function(link){

    link.addEventListener("click",function(){

        stnlpNavigation.forEach(function(item){

            item.classList.remove("active");

        });

        this.classList.add("active");

    });

});

/*==========================================================
FOOTER LINKS
==========================================================*/

stnlpFooterLinks.forEach(function(link){

    link.addEventListener("mouseenter",function(){

        this.style.paddingLeft="8px";

    });

    link.addEventListener("mouseleave",function(){

        this.style.paddingLeft="";

    });

});

/*==========================================================
CART
==========================================================*/

if(stnlpCart){

    stnlpCart.addEventListener("click",function(event){

        event.preventDefault();

        /*
        FRONTEND ONLY
        Replace with your backend/localStorage later.
        */

        const hasCartItems=false;

        if(hasCartItems){

            window.location.href="../../cart/shopping-cart.html";

        }

        else{

            window.location.href="../../cart/cart.html";

        }

    });

}

/*==========================================================
HERO ENTRANCE
==========================================================*/

window.addEventListener("load",function(){

    const hero=$(".stnlp-hero-content");

    if(hero){

        hero.animate([

            {

                opacity:0,

                transform:"translateY(40px)"

            },

            {

                opacity:1,

                transform:"translateY(0)"

            }

        ],{

            duration:700,

            easing:"ease-out",

            fill:"forwards"

        });

    }

});

/*==========================================================
SCROLL REVEAL ANIMATION
==========================================================*/

const stnlpAnimatedElements=$$(
".stnlp-category-card,.stnlp-provider-card,.stnlp-footer"
);

if("IntersectionObserver" in window){

    const stnlpObserver=new IntersectionObserver(function(entries){

        entries.forEach(function(entry){

            if(entry.isIntersecting){

                entry.target.classList.add("stnlp-show");

                stnlpObserver.unobserve(entry.target);

            }

        });

    },{

        threshold:.15

    });

    stnlpAnimatedElements.forEach(function(element){

        element.classList.add("stnlp-hidden");

        stnlpObserver.observe(element);

    });

}

/*==========================================================
CATEGORY STAGGER ANIMATION
==========================================================*/

stnlpCategoryCards.forEach(function(card,index){

    card.style.animationDelay=(index*.08)+"s";

});

/*==========================================================
PROVIDER STAGGER ANIMATION
==========================================================*/

stnlpProviderCards.forEach(function(card,index){

    card.style.animationDelay=(index*.1)+"s";

});

/*==========================================================
NAVBAR SCROLL EFFECT
==========================================================*/

const stnlpNavbar=$(".stnlp-navbar");

window.addEventListener("scroll",function(){

    if(window.scrollY>30){

        stnlpNavbar.classList.add("stnlp-navbar-scrolled");

    }

    else{

        stnlpNavbar.classList.remove("stnlp-navbar-scrolled");

    }

});

/*==========================================================
ESC KEY CLEARS SEARCH
==========================================================*/

document.addEventListener("keydown",function(event){

    if(event.key==="Escape" && stnlpSearchInput){

        stnlpSearchInput.value="";

        stnlpSearchInput.blur();

    }

});

/*==========================================================
MOBILE NAVBAR AUTO CLOSE
==========================================================*/

const stnlpCollapse=$("#stnlpNavbar");

const stnlpMenuLinks=$$("#stnlpNavbar .nav-link");

stnlpMenuLinks.forEach(function(link){

    link.addEventListener("click",function(){

        if(window.innerWidth<992 && stnlpCollapse){

            const collapse=
            bootstrap.Collapse.getOrCreateInstance(stnlpCollapse);

            collapse.hide();

        }

    });

});

/*==========================================================
NOTIFICATION ICON
==========================================================*/

const stnlpNotification=$$(".stnlp-nav-icon")[1];

if(stnlpNotification){

    stnlpNotification.addEventListener("click",function(event){

        event.preventDefault();

        window.location.href="../../notifications/notifications.html";

    });

}

/*==========================================================
PROFILE BUTTON
==========================================================*/

const stnlpProfile=$(".stnlp-profile");

if(stnlpProfile){

    stnlpProfile.addEventListener("click",function(event){

        event.preventDefault();

        window.location.href="../../profile/profile.html";

    });

}

/*==========================================================
SMOOTH SCROLL FOR INTERNAL LINKS
==========================================================*/

$$('a[href^="#"]').forEach(function(anchor){

    anchor.addEventListener("click",function(event){

        const target=document.querySelector(
            this.getAttribute("href")
        );

        if(target){

            event.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }

    });

});

/*==========================================================
WINDOW RESIZE
==========================================================*/

window.addEventListener("resize",function(){

    if(window.innerWidth>=992 && stnlpCollapse){

        stnlpCollapse.classList.remove("show");

    }

});

/*==========================================================
PLACEHOLDER FIND BUTTON EFFECT
==========================================================*/

if(stnlpFindButton){

    stnlpFindButton.addEventListener("click",function(){

        this.classList.add("stnlp-btn-loading");

        setTimeout(()=>{

            this.classList.remove("stnlp-btn-loading");

        },600);

    });

}

})();

/*==========================================================
END OF SERVICE TOP NAVBAR LANDING PAGE
==========================================================*/


/*==========================================================
SERVICE TOP PROVIDERS LISTING
==========================================================*/

(function(){

"use strict";

/*==========================================================
PAGE CHECK
==========================================================*/

if(document.body.id!=="stplPage"){

    return;

}

/*==========================================================
HELPERS
==========================================================*/

const $=(selector,parent=document)=>parent.querySelector(selector);

const $$=(selector,parent=document)=>parent.querySelectorAll(selector);

/*==========================================================
ELEMENTS
==========================================================*/

const stplNavbar=$(".stpl-navbar");

const stplSearch=$("#stplSearch");

const stplFilterButton=$("#stplFilterButton");

const stplCategoryPills=$$(".stpl-category-pill");

const stplProviderCards=$$(".stpl-provider-card");

const stplCart=$("#stplCart");

/*==========================================================
CATEGORY FILTERS
==========================================================*/

stplCategoryPills.forEach(function(pill){

    pill.addEventListener("click",function(event){

        event.preventDefault();

        stplCategoryPills.forEach(function(item){

            item.classList.remove("active");

        });

        this.classList.add("active");

        /*
        Replace with backend category filtering later
        */

    });

});

/*==========================================================
SEARCH
==========================================================*/

if(stplSearch){

    stplSearch.addEventListener("keyup",function(event){

        if(event.key==="Enter"){

            const keyword=this.value.trim();

            if(keyword===""){

                return;

            }

            /*
            Backend search later
            */

            window.location.href="service-search-results.html";

        }

    });

}

/*==========================================================
FILTER BUTTON
==========================================================*/

if(stplFilterButton){

    stplFilterButton.addEventListener("click",function(){

        /*
        Future modal/sidebar filter
        */

        alert("Filter panel coming soon.");

    });

}

/*==========================================================
PROVIDER CARDS
==========================================================*/

stplProviderCards.forEach(function(card){

    card.addEventListener("click",function(event){

        event.preventDefault();

        window.location.href="../../profile/provider-profile.html";

    });

});

/*==========================================================
CART
==========================================================*/

if(stplCart){

    stplCart.addEventListener("click",function(event){

        event.preventDefault();

        /*
        Frontend only
        Replace with backend/localStorage
        */

        const hasCartItems=false;

        if(hasCartItems){

            window.location.href="shopping-cart.html";

        }

        else{

            window.location.href="empty-cart.html";

        }

    });

}

/*==========================================================
NAVBAR ACTIVE LINKS
==========================================================*/

$$(".stpl-navbar .nav-link").forEach(function(link){

    link.addEventListener("click",function(){

        $$(".stpl-navbar .nav-link").forEach(function(item){

            item.classList.remove("active");

        });

        this.classList.add("active");

    });

});

/*==========================================================
HOVER ANIMATION
==========================================================*/

stplProviderCards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        this.style.transform="translateY(-8px)";

    });

    card.addEventListener("mouseleave",function(){

        this.style.transform="";

    });

});

/*==========================================================
PAGE LOAD ANIMATION
==========================================================*/

window.addEventListener("load",function(){

    stplProviderCards.forEach(function(card,index){

        card.animate([

            {

                opacity:0,

                transform:"translateY(30px)"

            },

            {

                opacity:1,

                transform:"translateY(0)"

            }

        ],{

            duration:600,

            delay:index*120,

            easing:"ease-out",

            fill:"forwards"

        });

    });

});

/*==========================================================
SCROLL REVEAL ANIMATION
==========================================================*/

const stplAnimatedElements=$$(
".stpl-provider-card"
);

if("IntersectionObserver" in window){

    const stplObserver=new IntersectionObserver(function(entries){

        entries.forEach(function(entry){

            if(entry.isIntersecting){

                entry.target.classList.add("stpl-visible");

                stplObserver.unobserve(entry.target);

            }

        });

    },{

        threshold:.15

    });

    stplAnimatedElements.forEach(function(element){

        element.classList.add("stpl-hidden");

        stplObserver.observe(element);

    });

}

/*==========================================================
NAVBAR SCROLL EFFECT
==========================================================*/

window.addEventListener("scroll",function(){

    if(!stplNavbar){

        return;

    }

    if(window.scrollY>25){

        stplNavbar.classList.add("stpl-navbar-scrolled");

    }

    else{

        stplNavbar.classList.remove("stpl-navbar-scrolled");

    }

});

/*==========================================================
ESC KEY CLEARS SEARCH
==========================================================*/

document.addEventListener("keydown",function(event){

    if(event.key==="Escape" && stplSearch){

        stplSearch.value="";

        stplSearch.blur();

    }

});

/*==========================================================
MOBILE MENU AUTO CLOSE
==========================================================*/

const stplNavbarCollapse=$("#stplNavbar");

$$(".stpl-navbar .nav-link").forEach(function(link){

    link.addEventListener("click",function(){

        if(window.innerWidth<992 && stplNavbarCollapse){

            const collapse=
            bootstrap.Collapse.getOrCreateInstance(
                stplNavbarCollapse
            );

            collapse.hide();

        }

    });

});

/*==========================================================
NOTIFICATION ICON
==========================================================*/

const stplNotification=$$(".stpl-nav-icon")[1];

if(stplNotification){

    stplNotification.addEventListener("click",function(event){

        event.preventDefault();

        window.location.href="notifications.html";

    });

}

/*==========================================================
PROFILE
==========================================================*/

const stplProfile=$(".stpl-profile");

if(stplProfile){

    stplProfile.addEventListener("click",function(event){

        event.preventDefault();

        window.location.href="profile.html";

    });

}

/*==========================================================
SMOOTH SCROLL
==========================================================*/

$$('a[href^="#"]').forEach(function(anchor){

    anchor.addEventListener("click",function(event){

        const target=document.querySelector(
            this.getAttribute("href")
        );

        if(target){

            event.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }

    });

});

/*==========================================================
WINDOW RESIZE
==========================================================*/

window.addEventListener("resize",function(){

    if(window.innerWidth>=992 && stplNavbarCollapse){

        stplNavbarCollapse.classList.remove("show");

    }

});

/*==========================================================
SEARCH PLACEHOLDER
==========================================================*/

if(stplSearch){

    stplSearch.addEventListener("focus",function(){

        this.parentElement.classList.add("stpl-search-active");

    });

    stplSearch.addEventListener("blur",function(){

        this.parentElement.classList.remove("stpl-search-active");

    });

}

/*==========================================================
FILTER BUTTON EFFECT
==========================================================*/

if(stplFilterButton){

    stplFilterButton.addEventListener("mousedown",function(){

        this.classList.add("stpl-btn-active");

    });

    stplFilterButton.addEventListener("mouseup",function(){

        this.classList.remove("stpl-btn-active");

    });

    stplFilterButton.addEventListener("mouseleave",function(){

        this.classList.remove("stpl-btn-active");

    });

}

})();

/*==========================================================
END OF SERVICE PROVIDERS LISTING
==========================================================*/

/*==========================================================
SERVICE TOP PROVIDER PROFILE
Prefix : stpp
==========================================================*/

(function(){

"use strict";

/*==========================================================
PAGE CHECK
==========================================================*/

if(document.body.id!=="stppPage"){

    return;

}

/*==========================================================
HELPERS
==========================================================*/

const $=(selector,parent=document)=>parent.querySelector(selector);

const $$=(selector,parent=document)=>parent.querySelectorAll(selector);

/*==========================================================
ELEMENTS
==========================================================*/

const stppNavbar=$(".stpp-navbar");

const stppCart=$("#stppCart");

const stppMessageBtn=$("#stppMessageBtn");

const stppBookServiceBtn=$("#stppBookServiceBtn");

const stppBookAppointment=$("#stppBookAppointment");

const stppBookButtons=$$(".stpp-book-btn");

const stppTabs=$$(".stpp-tab");

const stppNewsletterForm=$("#stppNewsletterForm");

const stppNewsletterEmail=$("#stppNewsletterEmail");

const stppProfile=$(".stpp-profile");

/*==========================================================
NAVIGATION TABS
==========================================================*/

stppTabs.forEach(function(tab){

    tab.addEventListener("click",function(){

        stppTabs.forEach(function(item){

            item.classList.remove("active");

        });

        this.classList.add("active");

    });

});

/*==========================================================
MESSAGE BUTTON
==========================================================*/

if(stppMessageBtn){

    stppMessageBtn.addEventListener("click",function(event){

        event.preventDefault();

        window.location.href="messages.html";

    });

}

/*==========================================================
BOOK SERVICE BUTTON
==========================================================*/

if(stppBookServiceBtn){

    stppBookServiceBtn.addEventListener("click",function(event){

        event.preventDefault();

        window.location.href="booking-checkout.html";

    });

}

/*==========================================================
BOOK APPOINTMENT
==========================================================*/

if(stppBookAppointment){

    stppBookAppointment.addEventListener("click",function(event){

        event.preventDefault();

        window.location.href="booking-checkout.html";

    });

}

/*==========================================================
SERVICE CARD BUTTONS
==========================================================*/

stppBookButtons.forEach(function(button){

    button.addEventListener("click",function(event){

        event.preventDefault();

        window.location.href="booking-checkout.html";

    });

});

/*==========================================================
CART
==========================================================*/

if(stppCart){

    stppCart.addEventListener("click",function(event){

        event.preventDefault();

        /*
        Replace with backend/localStorage later
        */

        const hasCartItems=false;

        if(hasCartItems){

            window.location.href="shopping-cart.html";

        }

        else{

            window.location.href="empty-cart.html";

        }

    });

}

/*==========================================================
PROFILE
==========================================================*/

if(stppProfile){

    stppProfile.addEventListener("click",function(event){

        event.preventDefault();

        window.location.href="profile.html";

    });

}

/*==========================================================
NEWSLETTER
==========================================================*/

if(stppNewsletterForm){

    stppNewsletterForm.addEventListener("submit",function(event){

        event.preventDefault();

        const email=stppNewsletterEmail.value.trim();

        if(email===""){

            stppNewsletterEmail.focus();

            return;

        }

        alert("Newsletter subscription successful.");

        stppNewsletterEmail.value="";

    });

}

/*==========================================================
HOVER ANIMATION
==========================================================*/

stppBookButtons.forEach(function(button){

    button.addEventListener("mouseenter",function(){

        this.style.transform="translateY(-2px)";

    });

    button.addEventListener("mouseleave",function(){

        this.style.transform="";

    });

});

/*==========================================================
PAGE LOAD ANIMATION
==========================================================*/

window.addEventListener("load",function(){

    const cards=$$(".stpp-service-card");

    cards.forEach(function(card,index){

        card.animate([

            {

                opacity:0,

                transform:"translateY(30px)"

            },

            {

                opacity:1,

                transform:"translateY(0)"

            }

        ],{

            duration:650,

            delay:index*120,

            easing:"ease-out",

            fill:"forwards"

        });

    });

});

/*==========================================================
SCROLL REVEAL
==========================================================*/

const stppRevealItems=$$(
".stpp-profile-header,.stpp-service-card,.stpp-sidebar-card"
);

if("IntersectionObserver" in window){

    const stppObserver=new IntersectionObserver(function(entries){

        entries.forEach(function(entry){

            if(entry.isIntersecting){

                entry.target.classList.add("stpp-visible");

                stppObserver.unobserve(entry.target);

            }

        });

    },{

        threshold:.15

    });

    stppRevealItems.forEach(function(item){

        item.classList.add("stpp-hidden");

        stppObserver.observe(item);

    });

}

/*==========================================================
NAVBAR SCROLL EFFECT
==========================================================*/

window.addEventListener("scroll",function(){

    if(!stppNavbar){

        return;

    }

    if(window.scrollY>20){

        stppNavbar.classList.add("stpp-navbar-scrolled");

    }

    else{

        stppNavbar.classList.remove("stpp-navbar-scrolled");

    }

});

/*==========================================================
NOTIFICATION
==========================================================*/

const stppNotification=$$(".stpp-nav-icon")[1];

if(stppNotification){

    stppNotification.addEventListener("click",function(event){

        event.preventDefault();

        window.location.href="notifications.html";

    });

}

/*==========================================================
SMOOTH SCROLL
==========================================================*/

$$('a[href^="#"]').forEach(function(anchor){

    anchor.addEventListener("click",function(event){

        const target=document.querySelector(

            this.getAttribute("href")

        );

        if(target){

            event.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }

    });

});

/*==========================================================
ESC KEY
==========================================================*/

document.addEventListener("keydown",function(event){

    if(event.key==="Escape"){

        if(document.activeElement){

            document.activeElement.blur();

        }

    }

});

/*==========================================================
BOOTSTRAP MOBILE MENU
==========================================================*/

const stppNavbarCollapse=$("#stppNavbar");

$$(".stpp-navbar .nav-link").forEach(function(link){

    link.addEventListener("click",function(){

        if(window.innerWidth<992 && stppNavbarCollapse){

            const collapse=

            bootstrap.Collapse.getOrCreateInstance(

                stppNavbarCollapse

            );

            collapse.hide();

        }

    });

});

/*==========================================================
WINDOW RESIZE
==========================================================*/

window.addEventListener("resize",function(){

    if(window.innerWidth>=992 && stppNavbarCollapse){

        stppNavbarCollapse.classList.remove("show");

    }

});

/*==========================================================
ACCESSIBILITY
==========================================================*/

$$("button,a").forEach(function(element){

    element.addEventListener("keyup",function(event){

        if(event.key==="Enter"){

            this.click();

        }

    });

});

/*==========================================================
UTILITY CLASSES
==========================================================*/

const stppStyle=document.createElement("style");

stppStyle.textContent=`

.stpp-hidden{

    opacity:0;

    transform:translateY(35px);

}

.stpp-visible{

    opacity:1;

    transform:translateY(0);

    transition:all .7s ease;

}

.stpp-navbar-scrolled{

    background:rgba(255,255,255,.97);

    backdrop-filter:blur(14px);

    box-shadow:var(--shadow-md);

}

`;

document.head.appendChild(stppStyle);

})();

/*==========================================================
END OF PROVIDER PROFILE
==========================================================*/

/*==========================================================
SERVICE BOOKING PAGE
Prefix : stbk
==========================================================*/

(function(){

"use strict";

/*==========================================================
PAGE CHECK
==========================================================*/

if(document.body.id!=="stbkPage"){

    return;

}

/*==========================================================
HELPERS
==========================================================*/

const $=(selector,parent=document)=>parent.querySelector(selector);

const $$=(selector,parent=document)=>parent.querySelectorAll(selector);

/*==========================================================
ELEMENTS
==========================================================*/

const stbkNavbar=$("#stbk-navbar");

const stbkServiceItems=$$(".stbk-service-item");

const stbkDateButtons=$$(".stbk-date-btn");

const stbkTimeButtons=$$(".stbk-time-btn");

const stbkConfirmButton=$("#stbkConfirmBookingBtn");

const stbkCartButton=$("#stbkCartBtn");

const stbkNotifyButton=$("#stbkNotifyBtn");

const stbkNotes=$("#stbkNotes");

const stbkSummaryService=$("#stbkSummaryService");

const stbkSummaryDate=$("#stbkSummaryDate");

const stbkSummaryTime=$("#stbkSummaryTime");

const stbkServiceFee=$("#stbkServiceFee");

const stbkEscrowFee=$("#stbkEscrowFee");

const stbkGrandTotal=$("#stbkGrandTotal");

/*==========================================================
FORMAT CURRENCY
==========================================================*/

function stbkFormatMoney(amount){

    return "₦"+Number(amount).toLocaleString();

}

/*==========================================================
UPDATE SUMMARY
==========================================================*/

function stbkUpdateSummary(){

    const activeService=$(".stbk-service-active");

    const activeDate=$(".stbk-date-active");

    const activeTime=$(".stbk-time-active");

    const serviceName=activeService.dataset.service;

    const servicePrice=parseInt(activeService.dataset.price);

    const escrow=Math.round(servicePrice*0.015);

    const total=servicePrice+escrow;

    stbkSummaryService.textContent=serviceName;

    stbkSummaryDate.textContent=activeDate.textContent.trim();

    stbkSummaryTime.textContent=activeTime.textContent.trim();

    stbkServiceFee.textContent=stbkFormatMoney(servicePrice);

    stbkEscrowFee.textContent=stbkFormatMoney(escrow);

    stbkGrandTotal.textContent=stbkFormatMoney(total);

}

/*==========================================================
SERVICE SELECTION
==========================================================*/

stbkServiceItems.forEach(function(button){

    button.addEventListener("click",function(){

        stbkServiceItems.forEach(function(item){

            item.classList.remove("stbk-service-active");

        });

        this.classList.add("stbk-service-active");

        stbkUpdateSummary();

    });

});

/*==========================================================
DATE SELECTION
==========================================================*/

stbkDateButtons.forEach(function(button){

    button.addEventListener("click",function(){

        stbkDateButtons.forEach(function(item){

            item.classList.remove("stbk-date-active");

        });

        this.classList.add("stbk-date-active");

        stbkUpdateSummary();

    });

});

/*==========================================================
TIME SELECTION
==========================================================*/

stbkTimeButtons.forEach(function(button){

    button.addEventListener("click",function(){

        stbkTimeButtons.forEach(function(item){

            item.classList.remove("stbk-time-active");

        });

        this.classList.add("stbk-time-active");

        stbkUpdateSummary();

    });

});

/*==========================================================
CONFIRM BOOKING
==========================================================*/

if(stbkConfirmButton){

    stbkConfirmButton.addEventListener("click",function(){

        window.location.href="../../cart/checkout-payment.html";

    });

}

/*==========================================================
CART
==========================================================*/

if(stbkCartButton){

    stbkCartButton.addEventListener("click",function(){

        /*
        Replace this with backend/localStorage later
        */

        const hasCartItems=false;

        if(hasCartItems){

            window.location.href="../../cart/shopping-cart.html";

        }

        else{

            window.location.href="../../navigation/cart.html";

        }

    });

}

/*==========================================================
NOTIFICATIONS
==========================================================*/

if(stbkNotifyButton){

    stbkNotifyButton.addEventListener("click",function(){

        window.location.href="../../navigation/notification.html";

    });

}

/*==========================================================
NOTES LIMIT
==========================================================*/

if(stbkNotes){

    stbkNotes.addEventListener("input",function(){

        if(this.value.length>500){

            this.value=this.value.substring(0,500);

        }

    });

}

/*==========================================================
INITIALIZE
==========================================================*/

stbkUpdateSummary();

window.addEventListener("load",function(){

    document.body.classList.add("stbk-loaded");

});

/*==========================================================
NAVBAR SCROLL EFFECT
==========================================================*/

window.addEventListener("scroll",function(){

    if(window.scrollY>15){

        stbkNavbar.classList.add("stbk-navbar-scrolled");

    }

    else{

        stbkNavbar.classList.remove("stbk-navbar-scrolled");

    }

});

/*==========================================================
SCROLL REVEAL
==========================================================*/

const stbkRevealElements=$$(
".stbk-provider-card,.stbk-card,.stbk-summary-card"
);

if("IntersectionObserver" in window){

    const stbkObserver=new IntersectionObserver(function(entries){

        entries.forEach(function(entry){

            if(entry.isIntersecting){

                entry.target.classList.add("stbk-show");

                stbkObserver.unobserve(entry.target);

            }

        });

    },{

        threshold:.15

    });

    stbkRevealElements.forEach(function(element){

        element.classList.add("stbk-hidden");

        stbkObserver.observe(element);

    });

}

/*==========================================================
BUTTON RIPPLE EFFECT
==========================================================*/

const stbkRippleButtons=$$(
".stbk-confirm-btn,.stbk-service-item,.stbk-date-btn,.stbk-time-btn"
);

stbkRippleButtons.forEach(function(button){

    button.addEventListener("click",function(event){

        const ripple=document.createElement("span");

        ripple.className="stbk-ripple";

        const rect=this.getBoundingClientRect();

        const size=Math.max(rect.width,rect.height);

        ripple.style.width=size+"px";

        ripple.style.height=size+"px";

        ripple.style.left=(event.clientX-rect.left-size/2)+"px";

        ripple.style.top=(event.clientY-rect.top-size/2)+"px";

        this.appendChild(ripple);

        setTimeout(function(){

            ripple.remove();

        },600);

    });

});

/*==========================================================
SMOOTH SCROLL
==========================================================*/

$$('a[href^="#"]').forEach(function(anchor){

    anchor.addEventListener("click",function(event){

        const target=document.querySelector(

            this.getAttribute("href")

        );

        if(target){

            event.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }

    });

});

/*==========================================================
AUTO CLOSE MOBILE MENU
==========================================================*/

const stbkCollapse=$("#stbkNavbarCollapse");

$$(".navbar-nav .nav-link").forEach(function(link){

    link.addEventListener("click",function(){

        if(window.innerWidth<992 && stbkCollapse){

            const collapse=

            bootstrap.Collapse.getOrCreateInstance(

                stbkCollapse

            );

            collapse.hide();

        }

    });

});

/*==========================================================
KEYBOARD ACCESSIBILITY
==========================================================*/

document.addEventListener("keydown",function(event){

    if(event.key==="Escape"){

        if(document.activeElement){

            document.activeElement.blur();

        }

    }

});

/*==========================================================
WINDOW RESIZE
==========================================================*/

window.addEventListener("resize",function(){

    if(window.innerWidth>=992 && stbkCollapse){

        stbkCollapse.classList.remove("show");

    }

});

/*==========================================================
UTILITY STYLES
==========================================================*/

const stbkUtilityStyle=document.createElement("style");

stbkUtilityStyle.textContent=`

.stbk-hidden{

    opacity:0;

    transform:translateY(35px);

}

.stbk-show{

    opacity:1;

    transform:translateY(0);

    transition:all .7s ease;

}

.stbk-ripple{

    position:absolute;

    border-radius:50%;

    background:rgba(255,255,255,.35);

    transform:scale(0);

    animation:stbkRipple .6s linear;

    pointer-events:none;

}

.stbk-service-item,

.stbk-date-btn,

.stbk-time-btn,

.stbk-confirm-btn{

    position:relative;

    overflow:hidden;

}

@keyframes stbkRipple{

    to{

        transform:scale(4);

        opacity:0;

    }

}

`;

document.head.appendChild(stbkUtilityStyle);

})();

/*==========================================================
END OF BOOKING SERVICE
==========================================================*/

/*==========================================================
SERVICE BOOKING CONFIRMATION
Prefix : stbc
==========================================================*/

(function(){

"use strict";

/*==========================================================
PAGE CHECK
==========================================================*/

if(document.body.id!=="stbcPage"){

    return;

}

/*==========================================================
HELPERS
==========================================================*/

const $=(selector,parent=document)=>parent.querySelector(selector);

const $$=(selector,parent=document)=>parent.querySelectorAll(selector);

/*==========================================================
ELEMENTS
==========================================================*/

const stbcNavbar=$("#stbc-navbar");

const stbcBookingsBtn=$("#stbcBookingsBtn");

const stbcMessageBtn=$("#stbcMessageBtn");

const stbcContinueBrowsing=$("#stbcContinueBrowsing");

const stbcCartBtn=$("#stbcCartBtn");

const stbcBellBtn=$("#stbcBellBtn");

const stbcReference=$("#stbcReference");

const stbcCard=$(".stbc-card");

/*==========================================================
BOOKING REFERENCE
==========================================================*/

function stbcGenerateReference(){

    const random=Math.floor(

        100000+Math.random()*900000

    );

    return "#BK-"+random;

}

if(stbcReference){

    if(!sessionStorage.getItem("stbcReference")){

        sessionStorage.setItem(

            "stbcReference",

            stbcGenerateReference()

        );

    }

    stbcReference.textContent=

    sessionStorage.getItem("stbcReference");

}

/*==========================================================
VIEW BOOKINGS
==========================================================*/

if(stbcBookingsBtn){

    stbcBookingsBtn.addEventListener("click",function(event){

        event.preventDefault();

        window.location.href="bookings.html";

    });

}

/*==========================================================
MESSAGE PROVIDER
==========================================================*/

if(stbcMessageBtn){

    stbcMessageBtn.addEventListener("click",function(event){

        event.preventDefault();

        window.location.href="chat.html";

    });

}

/*==========================================================
CONTINUE BROWSING
==========================================================*/

if(stbcContinueBrowsing){

    stbcContinueBrowsing.addEventListener("click",function(event){

        event.preventDefault();

        window.location.href="service-landing.html";

    });

}

/*==========================================================
CART BUTTON
==========================================================*/

if(stbcCartBtn){

    stbcCartBtn.addEventListener("click",function(event){

        event.preventDefault();

        window.location.href="cart.html";

    });

}

/*==========================================================
NOTIFICATION BUTTON
==========================================================*/

if(stbcBellBtn){

    stbcBellBtn.addEventListener("click",function(event){

        event.preventDefault();

        window.location.href="notifications.html";

    });

}

/*==========================================================
CARD ENTRANCE
==========================================================*/

window.addEventListener("load",function(){

    if(stbcCard){

        stbcCard.classList.add("stbc-card-loaded");

    }

});

/*==========================================================
SUCCESS ICON ANIMATION
==========================================================*/

const stbcSuccessIcon=$(".stbc-success-icon");

if(stbcSuccessIcon){

    setTimeout(function(){

        stbcSuccessIcon.classList.add("stbc-success-ready");

    },300);

}

/*==========================================================
NAVBAR SCROLL EFFECT
==========================================================*/

window.addEventListener("scroll",function(){

    if(window.scrollY>10){

        stbcNavbar?.classList.add("stbc-navbar-scrolled");

    }

    else{

        stbcNavbar?.classList.remove("stbc-navbar-scrolled");

    }

});

/*==========================================================
SCROLL REVEAL ANIMATION
==========================================================*/

const stbcRevealElements=$$(

".stbc-success-icon,.stbc-title,.stbc-subtitle,.stbc-card,.stbc-action-group,.stbc-extra-link"

);

if("IntersectionObserver" in window){

    const stbcObserver=new IntersectionObserver(function(entries){

        entries.forEach(function(entry){

            if(entry.isIntersecting){

                entry.target.classList.add("stbc-show");

                stbcObserver.unobserve(entry.target);

            }

        });

    },{

        threshold:.15

    });

    stbcRevealElements.forEach(function(element){

        element.classList.add("stbc-hidden");

        stbcObserver.observe(element);

    });

}

/*==========================================================
BUTTON RIPPLE EFFECT
==========================================================*/

$$(".stbc-btn-primary,.stbc-btn-outline").forEach(function(button){

    button.addEventListener("click",function(event){

        const ripple=document.createElement("span");

        ripple.className="stbc-ripple";

        const rect=this.getBoundingClientRect();

        const size=Math.max(rect.width,rect.height);

        ripple.style.width=size+"px";

        ripple.style.height=size+"px";

        ripple.style.left=(event.clientX-rect.left-size/2)+"px";

        ripple.style.top=(event.clientY-rect.top-size/2)+"px";

        this.appendChild(ripple);

        setTimeout(function(){

            ripple.remove();

        },600);

    });

});

/*==========================================================
AUTO CLOSE MOBILE NAVBAR
==========================================================*/

const stbcCollapse=$("#stbcNavbarCollapse");

$$(".navbar-nav .nav-link").forEach(function(link){

    link.addEventListener("click",function(){

        if(window.innerWidth<992 && stbcCollapse){

            bootstrap.Collapse

            .getOrCreateInstance(stbcCollapse)

            .hide();

        }

    });

});

/*==========================================================
KEYBOARD ACCESSIBILITY
==========================================================*/

document.addEventListener("keydown",function(event){

    if(event.key==="Escape"){

        document.activeElement.blur();

    }

});

/*==========================================================
WINDOW RESIZE
==========================================================*/

window.addEventListener("resize",function(){

    if(window.innerWidth>=992 && stbcCollapse){

        stbcCollapse.classList.remove("show");

    }

});

/*==========================================================
UTILITY STYLES
==========================================================*/

const stbcStyle=document.createElement("style");

stbcStyle.textContent=`

.stbc-hidden{

opacity:0;

transform:translateY(35px);

}

.stbc-show{

opacity:1;

transform:translateY(0);

transition:all .7s ease;

}

.stbc-ripple{

position:absolute;

border-radius:50%;

background:rgba(255,255,255,.35);

transform:scale(0);

animation:stbcRipple .6s linear;

pointer-events:none;

}

.stbc-btn-primary,

.stbc-btn-outline{

position:relative;

overflow:hidden;

}

@keyframes stbcRipple{

to{

transform:scale(4);

opacity:0;

}

}

`;

document.head.appendChild(stbcStyle);

})();

/*==========================================================
END OF BOOKING CONFIRMATION PAGE
==========================================================*/

/*==========================================================
MY BOOKINGS PAGE
Prefix: stmb-
script.js — Part 1
==========================================================*/

(function(){

"use strict";

/*==========================================================
PAGE CHECK
==========================================================*/

if(!document.querySelector(".stmb-page")){

    return;

}

/*==========================================================
HELPERS
==========================================================*/

const $=(selector,parent=document)=>parent.querySelector(selector);

const $$=(selector,parent=document)=>parent.querySelectorAll(selector);

/*==========================================================
ELEMENTS
==========================================================*/

const stmbNavbar=$(".stmb-navbar");

const stmbCartBtn=$("#stmbCartBtn");

const stmbNotifyBtn=$("#stmbNotifyBtn");

const stmbBookingCards=$$(".stmb-booking-card");

const stmbChatButtons=$$(".stmb-chat-btn");

const stmbUserButton=$(".stmb-user-btn");

/*==========================================================
NAVBAR SCROLL EFFECT
==========================================================*/

function stmbHandleNavbar(){

    if(window.scrollY>15){

        stmbNavbar?.classList.add("stmb-navbar-scrolled");

    }else{

        stmbNavbar?.classList.remove("stmb-navbar-scrolled");

    }

}

window.addEventListener(

    "scroll",

    stmbHandleNavbar

);

stmbHandleNavbar();

/*==========================================================
BOOKING CARD HOVER
==========================================================*/

stmbBookingCards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        this.style.transform="translateY(-6px)";

    });

    card.addEventListener("mouseleave",function(){

        this.style.transform="translateY(0)";

    });

});

/*==========================================================
CHAT BUTTONS
==========================================================*/

stmbChatButtons.forEach(function(button){

    button.addEventListener("click",function(event){

        event.preventDefault();

        window.location.href="../messages/chat.html";

    });

});

/*==========================================================
CART BUTTON
==========================================================*/

if(stmbCartBtn){

    stmbCartBtn.addEventListener("click",function(){

        window.location.href="../cart/index.html";

    });

}

/*==========================================================
NOTIFICATION BUTTON
==========================================================*/

if(stmbNotifyBtn){

    stmbNotifyBtn.addEventListener("click",function(){

        window.location.href="../notifications/index.html";

    });

}

/*==========================================================
USER PROFILE
==========================================================*/

if(stmbUserButton){

    stmbUserButton.addEventListener("dblclick",function(){

        window.location.href="../profile/index.html";

    });

}

/*==========================================================
SCROLL REVEAL
==========================================================*/

const stmbObserver=new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("stmb-show");

            stmbObserver.unobserve(entry.target);

        }

    });

},{

    threshold:.15

});

stmbBookingCards.forEach(function(card){

    card.classList.add("stmb-hidden");

    stmbObserver.observe(card);

});

/*==========================================================
RIPPLE EFFECT
==========================================================*/

stmbChatButtons.forEach(function(button){

    button.addEventListener("click",function(event){

        const ripple=document.createElement("span");

        ripple.className="stmb-ripple";

        const rect=this.getBoundingClientRect();

        const size=Math.max(rect.width,rect.height);

        ripple.style.width=size+"px";

        ripple.style.height=size+"px";

        ripple.style.left=

        (event.clientX-rect.left-size/2)+"px";

        ripple.style.top=

        (event.clientY-rect.top-size/2)+"px";

        this.appendChild(ripple);

        setTimeout(function(){

            ripple.remove();

        },600);

    });

});

/*==========================================================
KEYBOARD ACCESSIBILITY
==========================================================*/

document.addEventListener("keydown",function(event){

    if(event.key==="Escape"){

        document.activeElement.blur();

    }

});

/*==========================================================
WINDOW RESIZE
==========================================================*/

window.addEventListener("resize",function(){

    if(window.innerWidth>=992){

        document

        .querySelector(".navbar-collapse")

        ?.classList.remove("show");

    }

});

/*==========================================================
UTILITY STYLES
==========================================================*/

const stmbStyle=document.createElement("style");

stmbStyle.textContent=`

.stmb-hidden{

opacity:0;

transform:translateY(30px);

}

.stmb-show{

opacity:1;

transform:translateY(0);

transition:all .7s ease;

}

.stmb-ripple{

position:absolute;

border-radius:50%;

background:rgba(255,255,255,.35);

transform:scale(0);

animation:stmbRipple .6s linear;

pointer-events:none;

}

.stmb-chat-btn{

position:relative;

overflow:hidden;

}

@keyframes stmbRipple{

to{

transform:scale(4);

opacity:0;

}

}

`;

document.head.appendChild(stmbStyle);

/*==========================================================
PAGE LOADED
==========================================================*/

window.addEventListener("load",function(){

    document.body.classList.add("stmb-page-loaded");

});

})();

/*==========================================================
END OF BOOKING PAGE
==========================================================*/



/*=========================================================
  SELLER DASHBOARD
=========================================================*/

document.addEventListener("DOMContentLoaded", function () {

    /*=====================================================
    PAGE CHECK
    Prevents this script from running on other pages
    =====================================================*/

    const ysdPage = document.getElementById("ysdSellerDashboardPage");

    if (!ysdPage) return;

    console.log("Seller Dashboard Loaded");

    /*=====================================================
    ELEMENTS
    =====================================================*/

    const ysdAddProductBtn =
        document.getElementById("ysdAddProductBtn");

    const ysdLogoutBtn =
        document.getElementById("ysdLogoutBtn");

    const ysdSidebarLogout =
        document.getElementById("ysdSidebarLogout");

    const ysdNewsletterForm =
        document.getElementById("ysdNewsletterForm");

    const ysdNewsletterEmail =
        document.getElementById("ysdNewsletterEmail");

    /*=====================================================
    DASHBOARD DATA
    =====================================================*/

    const ysdDashboardData = {

        revenue: 2250000,

        products: 47,

        orders: 138,

        rating: 4.9

    };

    /*=====================================================
    FORMAT NAIRA
    =====================================================*/

    function ysdFormatCurrency(amount){

        return new Intl.NumberFormat(

            "en-NG",

            {

                style:"currency",

                currency:"NGN",

                maximumFractionDigits:0

            }

        ).format(amount);

    }

    /*=====================================================
    BUTTON RIPPLE EFFECT
    =====================================================*/

    function ysdRipple(button,event){

        const circle =
            document.createElement("span");

        const diameter =
            Math.max(

                button.clientWidth,

                button.clientHeight

            );

        circle.style.width =
            circle.style.height =
            diameter + "px";

        circle.classList.add("ysd-ripple");

        const rect =
            button.getBoundingClientRect();

        circle.style.left =
            event.clientX -
            rect.left -
            diameter / 2 + "px";

        circle.style.top =
            event.clientY -
            rect.top -
            diameter / 2 + "px";

        button.appendChild(circle);

        setTimeout(function(){

            circle.remove();

        },600);

    }

    /*=====================================================
    ADD PRODUCT
    =====================================================*/

    if(ysdAddProductBtn){

        ysdAddProductBtn.addEventListener(

            "click",

            function(event){

                ysdRipple(this,event);

                setTimeout(function(){

                    window.location.href =
                    "../Products/add-product.html";

                },250);

            }

        );

    }

    /*=====================================================
    NEWSLETTER
    =====================================================*/

    if(ysdNewsletterForm){

        ysdNewsletterForm.addEventListener(

            "submit",

            function(event){

                event.preventDefault();

                const email =
                    ysdNewsletterEmail.value.trim();

                if(email===""){

                    alert(

                        "Please enter your email."

                    );

                    ysdNewsletterEmail.focus();

                    return;

                }

                alert(

                    "Newsletter subscription successful."

                );

                ysdNewsletterForm.reset();

            }

        );

    }

       /*=====================================================
    SIGN OUT
    =====================================================*/

    function ysdSignOut(){

        const confirmLogout = confirm(
            "Are you sure you want to sign out?"
        );

        if(!confirmLogout){

            return;

        }

        sessionStorage.clear();

        localStorage.removeItem("currentUser");

        localStorage.removeItem("authToken");

        window.location.href="../index.html";

    }

    if(ysdLogoutBtn){

        ysdLogoutBtn.addEventListener(

            "click",

            function(event){

                event.preventDefault();

                ysdSignOut();

            }

        );

    }

    if(ysdSidebarLogout){

        ysdSidebarLogout.addEventListener(

            "click",

            function(event){

                event.preventDefault();

                ysdSignOut();

            }

        );

    }

    /*=====================================================
    STATISTICS CARD ANIMATION
    =====================================================*/

    const ysdStatCards =

        document.querySelectorAll(

            ".ysd-stat-card"

        );

    ysdStatCards.forEach(function(card,index){

        card.style.animationDelay=

            (index*0.15)+"s";

    });

    /*=====================================================
    REVENUE CHART ANIMATION
    =====================================================*/

    const ysdChartBars =

        document.querySelectorAll(

            ".ysd-chart-line span"

        );

    ysdChartBars.forEach(function(bar,index){

        const finalHeight=

            bar.style.height;

        bar.style.height="0";

        setTimeout(function(){

            bar.style.height=

                finalHeight;

        },250+(index*120));

    });

    /*=====================================================
    PRODUCT TABLE HOVER
    =====================================================*/

    const ysdProductRows=

        document.querySelectorAll(

            ".ysd-product-table tbody tr"

        );

    ysdProductRows.forEach(function(row){

        row.addEventListener(

            "mouseenter",

            function(){

                this.style.cursor="pointer";

            }

        );

    });

    /*=====================================================
    EDIT PRODUCT
    =====================================================*/

    const ysdEditButtons=

        document.querySelectorAll(

            ".ysd-edit-btn"

        );

    ysdEditButtons.forEach(function(button){

        button.addEventListener(

            "click",

            function(event){

                event.stopPropagation();

                window.location.href=

                "../Products/edit-product.html";

            }

        );

    });

    /*=====================================================
    TABLE ROW CLICK
    =====================================================*/

    ysdProductRows.forEach(function(row){

        row.addEventListener(

            "click",

            function(){

                window.location.href=

                "../Products/product-details.html";

            }

        );

    });

    /*=====================================================
    ACTIVE SIDEBAR
    =====================================================*/

    const ysdCurrentPage=

        window.location.pathname

        .split("/")

        .pop();

    document

        .querySelectorAll(

            ".ysd-menu a"

        )

        .forEach(function(link){

            const href=

                link.getAttribute("href");

            if(

                href &&

                href.includes(

                    ysdCurrentPage

                )

            ){

                link.classList.add(

                    "active"

                );

            }

        });

       /*=====================================================
    DASHBOARD CARD HOVER EFFECT
    =====================================================*/

    const ysdDashboardCards = document.querySelectorAll(

        ".ysd-card, .ysd-stat-card"

    );

    ysdDashboardCards.forEach(function(card){

        card.addEventListener("mouseenter", function(){

            this.style.transform = "translateY(-6px)";

        });

        card.addEventListener("mouseleave", function(){

            this.style.transform = "";

        });

    });

    /*=====================================================
    NOTIFICATION BUTTON
    =====================================================*/

    const ysdNotificationBtn =

        document.querySelector(

            ".ysd-nav-icon.position-relative"

        );

    if(ysdNotificationBtn){

        ysdNotificationBtn.addEventListener(

            "click",

            function(){

                alert(

                    "You have no new notifications."

                );

            }

        );

    }

    /*=====================================================
    CART BUTTON
    =====================================================*/

    const ysdCartBtn =

        document.querySelector(

            ".ysd-nav-icon:not(.position-relative)"

        );

    if(ysdCartBtn){

        ysdCartBtn.addEventListener(

            "click",

            function(){

                window.location.href =

                "../../navigation/shopping-cart.html";

            }

        );

    }

    /*=====================================================
    VIEW ALL ORDERS
    =====================================================*/

    document.querySelectorAll(

        ".ysd-view-all"

    ).forEach(function(link){

        link.addEventListener(

            "click",

            function(){

                console.log(

                    "Opening page..."

                );

            }

        );

    });

    /*=====================================================
    NEWSLETTER EMAIL VALIDATION
    =====================================================*/

    if(ysdNewsletterEmail){

        ysdNewsletterEmail.addEventListener(

            "input",

            function(){

                const value =

                    this.value.trim();

                const emailPattern =

                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if(

                    value === ""

                ){

                    this.style.borderColor = "";

                }

                else if(

                    emailPattern.test(value)

                ){

                    this.style.borderColor =

                    "#198754";

                }

                else{

                    this.style.borderColor =

                    "#dc3545";

                }

            }

        );

    }

    /*=====================================================
    PAGE FADE-IN
    =====================================================*/

    document.body.style.opacity = "0";

    setTimeout(function(){

        document.body.style.transition =

        "opacity .35s ease";

        document.body.style.opacity = "1";

    },100);

    /*=====================================================
    ESC KEY SUPPORT
    =====================================================*/

    document.addEventListener(

        "keydown",

        function(event){

            if(event.key === "Escape"){

                const dropdown =

                document.activeElement;

                if(dropdown){

                    dropdown.blur();

                }

            }

        }

    );

    /*=====================================================
    WINDOW RESIZE
    =====================================================*/

    window.addEventListener(

        "resize",

        function(){

            console.log(

                "Dashboard resized:",

                window.innerWidth

            );

        }

    );

       /*=====================================================
    QUICK SEARCH
    =====================================================*/

    const ysdSearchInput =
        document.getElementById("ysdSearchInput");

    if(ysdSearchInput){

        ysdSearchInput.addEventListener(

            "keyup",

            function(){

                const keyword =
                    this.value
                        .toLowerCase()
                        .trim();

                const rows =
                    document.querySelectorAll(
                        ".ysd-product-table tbody tr"
                    );

                rows.forEach(function(row){

                    const text =
                        row.textContent.toLowerCase();

                    row.style.display =
                        text.includes(keyword)
                        ? ""
                        : "none";

                });

            }

        );

    }

    /*=====================================================
    REFRESH DASHBOARD
    =====================================================*/

    const ysdRefreshBtn =
        document.getElementById("ysdRefreshBtn");

    if(ysdRefreshBtn){

        ysdRefreshBtn.addEventListener(

            "click",

            function(){

                this.disabled = true;

                this.innerHTML =
                    '<i class="bi bi-arrow-clockwise"></i> Refreshing...';

                setTimeout(() => {

                    location.reload();

                },800);

            }

        );

    }

    /*=====================================================
    COPY REVENUE
    =====================================================*/

    const ysdRevenueAmount =
        document.getElementById("ysdRevenueAmount");

    if(ysdRevenueAmount){

        ysdRevenueAmount.addEventListener(

            "click",

            async function(){

                try{

                    await navigator.clipboard.writeText(

                        this.innerText

                    );

                    alert(

                        "Revenue copied successfully."

                    );

                }

                catch(error){

                    console.error(error);

                }

            }

        );

    }

    /*=====================================================
    KEYBOARD SHORTCUTS
    =====================================================*/

    document.addEventListener(

        "keydown",

        function(event){

            if(event.ctrlKey && event.key==="n"){

                event.preventDefault();

                if(ysdAddProductBtn){

                    ysdAddProductBtn.click();

                }

            }

            if(event.ctrlKey && event.key==="r"){

                event.preventDefault();

                location.reload();

            }

        }

    );

    /*=====================================================
    AUTO CLOSE DROPDOWN
    =====================================================*/

    document.addEventListener(

        "click",

        function(){

            const dropdowns =
                document.querySelectorAll(

                    ".dropdown-menu.show"

                );

            dropdowns.forEach(function(menu){

                menu.classList.remove("show");

            });

        }

    );

    /*=====================================================
    PRODUCT COUNTER
    =====================================================*/

    const ysdTotalProducts =
        document.getElementById("ysdTotalProducts");

    if(ysdTotalProducts){

        const totalRows =
            document.querySelectorAll(

                ".ysd-product-table tbody tr"

            ).length;

        ysdTotalProducts.textContent =
            totalRows;

    }

    /*=====================================================
    SCROLL TO TOP
    =====================================================*/

    const ysdScrollTop =
        document.getElementById("ysdScrollTop");

    if(ysdScrollTop){

        window.addEventListener(

            "scroll",

            function(){

                if(window.scrollY>300){

                    ysdScrollTop.classList.remove(

                        "d-none"

                    );

                }

                else{

                    ysdScrollTop.classList.add(

                        "d-none"

                    );

                }

            }

        );

        ysdScrollTop.addEventListener(

            "click",

            function(){

                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });

            }

        );

    }

    /*=====================================================
    SAVE DASHBOARD STATE
    =====================================================*/

    function ysdSaveDashboardState(){

        const dashboardState = {

            lastVisited: new Date().toISOString(),

            activePage: "seller-dashboard",

            sellerLoggedIn: true

        };

        localStorage.setItem(

            "ysdDashboardState",

            JSON.stringify(dashboardState)

        );

    }

    ysdSaveDashboardState();

    /*=====================================================
    RESTORE SCROLL POSITION
    =====================================================*/

    const savedScroll = sessionStorage.getItem(

        "ysdScrollPosition"

    );

    if(savedScroll){

        window.scrollTo(

            0,

            parseInt(savedScroll)

        );

    }

    window.addEventListener(

        "beforeunload",

        function(){

            sessionStorage.setItem(

                "ysdScrollPosition",

                window.scrollY

            );

        }

    );

    /*=====================================================
    PAGE VISIT LOGGER
    =====================================================*/

    console.log(

        "Seller Dashboard opened:",

        new Date().toLocaleString()

    );

    /*=====================================================
    CONNECTION STATUS
    =====================================================*/

    window.addEventListener(

        "online",

        function(){

            console.log(

                "Internet connection restored."

            );

        }

    );

    window.addEventListener(

        "offline",

        function(){

            alert(

                "No internet connection."

            );

        }

    );

    /*=====================================================
    LAZY LOAD PLACEHOLDER IMAGES
    =====================================================*/

    const ysdImages =

        document.querySelectorAll(

            "img"

        );

    ysdImages.forEach(function(image){

        image.loading = "lazy";

    });

    /*=====================================================
    PREVENT MULTIPLE FORM SUBMISSIONS
    =====================================================*/

    document.querySelectorAll(

        "form"

    ).forEach(function(form){

        form.addEventListener(

            "submit",

            function(){

                const submitButton =

                    this.querySelector(

                        'button[type="submit"]'

                    );

                if(submitButton){

                    submitButton.disabled = true;

                    setTimeout(function(){

                        submitButton.disabled = false;

                    },1500);

                }

            }

        );

    });

    /*=====================================================
    INITIALIZE TOOLTIPS
    =====================================================*/

    const tooltipTriggerList =

        document.querySelectorAll(

            '[data-bs-toggle="tooltip"]'

        );

    tooltipTriggerList.forEach(function(element){

        new bootstrap.Tooltip(element);

    });

    /*=====================================================
    INITIALIZE POPOVERS
    =====================================================*/

    const popoverTriggerList =

        document.querySelectorAll(

            '[data-bs-toggle="popover"]'

        );

    popoverTriggerList.forEach(function(element){

        new bootstrap.Popover(element);

    });

    /*=====================================================
    PERFORMANCE TIMER
    =====================================================*/

    window.addEventListener(

        "load",

        function(){

            console.log(

                "Dashboard fully loaded."

            );

        }

    );

    /*=====================================================
    SELLER SESSION CHECK
    =====================================================*/

    // const sellerSession =

    //     localStorage.getItem(

    //         "sellerLoggedIn"

    //     );

    // if(

    //     sellerSession !== "true"

    // ){

    //     window.location.href =

    //     "../../seller/seller-dashboard.html";

    // }

    /*=====================================================
    END OF DASHBOARD INITIALIZATION
    =====================================================*/

    console.log(

        "YOVI Seller Dashboard initialized successfully."

    );

});

/*=========================================================
MY PRODUCTS PAGE
SCRIPT.JS — PART 3A
Prefix: ymspp-
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /*=====================================================
    PAGE CHECK
    =====================================================*/

    const ymsppPage = document.getElementById(
        "ymsppPage"
    );

    if (!ymsppPage) return;

    /*=====================================================
    ELEMENTS
    =====================================================*/

    const ymsppBrand =
        document.getElementById("ymsppBrand");

    const ymsppBackDashboard =
        document.getElementById("ymsppBackDashboard");

    const ymsppCartButton =
        document.getElementById("ymsppCartButton");

    const ymsppNotificationButton =
        document.getElementById("ymsppNotificationButton");

    const ymsppProfileLink =
        document.getElementById("ymsppProfileLink");

    const ymsppAddProductBtn =
        document.getElementById("ymsppAddProductBtn");

    const ymsppProductCards =
        document.querySelectorAll(".ymspp-product-card");

    const ymsppEditButtons =
        document.querySelectorAll(".ymspp-edit-btn");

    /*=====================================================
    PAGE ANIMATION
    =====================================================*/

    if (typeof AOS !== "undefined") {

        AOS.refresh();

    }

    /*=====================================================
    BRAND
    =====================================================*/

    if (ymsppBrand) {

        ymsppBrand.addEventListener("click", function (e) {

            e.preventDefault();

            window.location.href = "../index.html";

        });

    }

    /*=====================================================
    DASHBOARD
    =====================================================*/

    if (ymsppBackDashboard) {

        ymsppBackDashboard.addEventListener("click", function (e) {

            e.preventDefault();

            window.location.href = "seller-dashboard.html";

        });

    }

    /*=====================================================
    CART
    =====================================================*/

    if (ymsppCartButton) {

        ymsppCartButton.addEventListener("click", function () {

            window.location.href = "shopping-cart.html";

        });

    }

    /*=====================================================
    NOTIFICATIONS
    =====================================================*/

    if (ymsppNotificationButton) {

        ymsppNotificationButton.addEventListener("click", function () {

            window.location.href = "notifications.html";

        });

    }

    /*=====================================================
    PROFILE
    =====================================================*/

    if (ymsppProfileLink) {

        ymsppProfileLink.addEventListener("click", function (e) {

            e.preventDefault();

            window.location.href = "seller-profile.html";

        });

    }

    /*=====================================================
    ADD NEW PRODUCT
    =====================================================*/

    if (ymsppAddProductBtn) {

        ymsppAddProductBtn.addEventListener("click", function () {

            window.location.href = "add-product.html";

        });

    }

    /*=====================================================
    PRODUCT CARD CLICK
    =====================================================*/

    ymsppProductCards.forEach(function (card) {

        card.style.cursor = "pointer";

        card.addEventListener("click", function (event) {

            if (event.target.closest(".ymspp-edit-btn")) {

                return;

            }

            window.location.href = "product-details.html";

        });

    });

    /*=====================================================
    EDIT PRODUCT
    =====================================================*/

    ymsppEditButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            event.stopPropagation();

            /*---------------------------------------------
            Store selected product (optional)
            ---------------------------------------------*/

            const ymsppCard =
                this.closest(".ymspp-product-card");

            if (ymsppCard) {

                const ymsppProductTitle =
                    ymsppCard.querySelector(
                        ".ymspp-product-title"
                    )?.textContent.trim();

                sessionStorage.setItem(

                    "ymsppSelectedProduct",

                    ymsppProductTitle || ""

                );

            }

            /*---------------------------------------------
            Redirect
            ---------------------------------------------*/

            window.location.href =
                "edit-product.html";

        });

    });

    /*=====================================================
    PRODUCT HOVER EFFECTS
    =====================================================*/

    ymsppProductCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            this.classList.add("ymspp-card-hover");

        });

        card.addEventListener("mouseleave", function () {

            this.classList.remove("ymspp-card-hover");

        });

    });

    /*=====================================================
    KEYBOARD ACCESSIBILITY
    =====================================================*/

    ymsppProductCards.forEach(function (card) {

        card.setAttribute("tabindex", "0");

        card.addEventListener("keydown", function (event) {

            if (

                event.key === "Enter" ||

                event.key === " "

            ) {

                event.preventDefault();

                window.location.href =
                    "product-details.html";

            }

        });

    });

    /*=====================================================
    BUTTON RIPPLE EFFECT
    =====================================================*/

    const ymsppButtons = document.querySelectorAll(

        ".ymspp-add-product-btn, .ymspp-edit-btn, .ymspp-icon-btn"

    );

    ymsppButtons.forEach(function(button){

        button.addEventListener("click", function(event){

            const ripple = document.createElement("span");

            ripple.className = "ymspp-ripple";

            const rect = this.getBoundingClientRect();

            const size = Math.max(

                rect.width,

                rect.height

            );

            ripple.style.width = size + "px";

            ripple.style.height = size + "px";

            ripple.style.left =

                (event.clientX - rect.left - size / 2) + "px";

            ripple.style.top =

                (event.clientY - rect.top - size / 2) + "px";

            this.appendChild(ripple);

            setTimeout(function(){

                ripple.remove();

            },600);

        });

    });

    /*=====================================================
    IMAGE LOADING ANIMATION
    =====================================================*/

    const ymsppImages = document.querySelectorAll(

        ".ymspp-product-image"

    );

    ymsppImages.forEach(function(image){

        image.addEventListener("load", function(){

            this.classList.add(

                "ymspp-image-loaded"

            );

        });

    });

    /*=====================================================
    PAGE LOADED
    =====================================================*/

    document.body.classList.add(

        "ymspp-page-ready"

    );

    console.log(

        "YMSPP My Products page initialized successfully."

    );

});




/*=========================================================
YOVI SELLER REVENUE
PART 3A
=========================================================*/

document.addEventListener("DOMContentLoaded", function () {

    /*=====================================================
    PAGE VALIDATION
    =====================================================*/

    const ysrPage = document.getElementById(

        "ysrSellerRevenuePage"

    );

    if (!ysrPage) return;

    console.log("Seller Revenue Page Loaded");

    /*=====================================================
    ELEMENTS
    =====================================================*/

    const ysrBackDashboard =

        document.getElementById(

            "ysrBackDashboard"

        );

    const ysrLogoutBtn =

        document.getElementById(

            "ysrLogoutBtn"

        );

    const ysrCartBtn =

        document.getElementById(

            "ysrCartBtn"

        );

    const ysrNotificationBtn =

        document.getElementById(

            "ysrNotificationBtn"

        );

    const ysrNewsletterForm =

        document.getElementById(

            "ysrNewsletterForm"

        );

    const ysrNewsletterEmail =

        document.getElementById(

            "ysrNewsletterEmail"

        );

    const ysrRevenueChart =

        document.getElementById(

            "ysrRevenueChart"

        );

    /*=====================================================
    RIPPLE EFFECT
    =====================================================*/

    function ysrCreateRipple(button, event){

        const ripple =

            document.createElement("span");

        const diameter = Math.max(

            button.clientWidth,

            button.clientHeight

        );

        ripple.classList.add(

            "ysr-ripple"

        );

        ripple.style.width =

            ripple.style.height =

            diameter + "px";

        const rect =

            button.getBoundingClientRect();

        ripple.style.left =

            event.clientX -

            rect.left -

            diameter / 2 +

            "px";

        ripple.style.top =

            event.clientY -

            rect.top -

            diameter / 2 +

            "px";

        button.appendChild(

            ripple

        );

        setTimeout(function(){

            ripple.remove();

        },600);

    }

    /*=====================================================
    BUTTON RIPPLE
    =====================================================*/

    document.querySelectorAll(

        ".ysr-nav-icon, .ysr-newsletter-btn"

    ).forEach(function(button){

        button.addEventListener(

            "click",

            function(event){

                ysrCreateRipple(

                    this,

                    event

                );

            }

        );

    });

    /*=====================================================
    BACK TO DASHBOARD
    =====================================================*/

    if(ysrBackDashboard){

        ysrBackDashboard.addEventListener(

            "click",

            function(){

                window.location.href =

                "../Dashboard/seller-dashboard.html";

            }

        );

    }

    /*=====================================================
    NEWSLETTER
    =====================================================*/

    if(ysrNewsletterForm){

        ysrNewsletterForm.addEventListener(

            "submit",

            function(event){

                event.preventDefault();

                const email =

                    ysrNewsletterEmail.value.trim();

                if(email === ""){

                    alert(

                        "Please enter your email."

                    );

                    ysrNewsletterEmail.focus();

                    return;

                }

                alert(

                    "Newsletter subscription successful."

                );

                ysrNewsletterForm.reset();

            }

        );

    }

    /*=====================================================
    MONTHLY REVENUE CHART
    =====================================================*/

    if(ysrRevenueChart){

        new Chart(

            ysrRevenueChart,

            {

                type:"line",

                data:{

                    labels:[

                        "Jan",

                        "Feb",

                        "Mar",

                        "Apr",

                        "May",

                        "Jun"

                    ],

                    datasets:[{

                        label:"Revenue (₦)",

                        data:[

                            285000,

                            342000,

                            298000,

                            412000,

                            389000,

                            524000

                        ],

                        borderColor:"#0d6efd",

                        backgroundColor:

                            "rgba(13,110,253,.15)",

                        borderWidth:3,

                        tension:.4,

                        fill:true,

                        pointRadius:5,

                        pointHoverRadius:7

                    }]

                },

                options:{

                    responsive:true,

                    maintainAspectRatio:false,

                    plugins:{

                        legend:{

                            display:false

                        }

                    },

                    scales:{

                        y:{

                            beginAtZero:true

                        }

                    }

                }

            }

        );

    }

       /*=====================================================
    SIGN OUT
    =====================================================*/

    function ysrSignOut(){

        const confirmLogout = confirm(

            "Are you sure you want to sign out?"

        );

        if(!confirmLogout){

            return;

        }

        sessionStorage.clear();

        localStorage.removeItem(

            "currentUser"

        );

        localStorage.removeItem(

            "authToken"

        );

        localStorage.removeItem(

            "sellerLoggedIn"

        );

        window.location.href =

        "../index.html";

    }

    if(ysrLogoutBtn){

        ysrLogoutBtn.addEventListener(

            "click",

            function(event){

                event.preventDefault();

                ysrSignOut();

            }

        );

    }

    /*=====================================================
    CART NAVIGATION
    =====================================================*/

    if(ysrCartBtn){

        ysrCartBtn.addEventListener(

            "click",

            function(){

                window.location.href =

                "../Checkout/cart.html";

            }

        );

    }

    /*=====================================================
    NOTIFICATION BUTTON
    =====================================================*/

    if(ysrNotificationBtn){

        ysrNotificationBtn.addEventListener(

            "click",

            function(){

                alert(

                    "You have no new notifications."

                );

            }

        );

    }

    /*=====================================================
    SUMMARY CARD ENTRANCE ANIMATION
    =====================================================*/

    const ysrSummaryCards =

        document.querySelectorAll(

            ".ysr-summary-card"

        );

    ysrSummaryCards.forEach(function(card,index){

        card.style.opacity = "0";

        card.style.transform =

            "translateY(25px)";

        setTimeout(function(){

            card.style.transition =

                "all .45s ease";

            card.style.opacity = "1";

            card.style.transform =

                "translateY(0)";

        },150 + (index * 150));

    });

    /*=====================================================
    CHART CARD ENTRANCE
    =====================================================*/

    const ysrChartCard =

        document.querySelector(

            ".ysr-chart-card"

        );

    if(ysrChartCard){

        ysrChartCard.style.opacity = "0";

        ysrChartCard.style.transform =

            "translateY(35px)";

        setTimeout(function(){

            ysrChartCard.style.transition =

                "all .55s ease";

            ysrChartCard.style.opacity = "1";

            ysrChartCard.style.transform =

                "translateY(0)";

        },650);

    }

    /*=====================================================
    SUMMARY CARD HOVER EFFECT
    =====================================================*/

    ysrSummaryCards.forEach(function(card){

        card.addEventListener(

            "mouseenter",

            function(){

                this.style.cursor = "pointer";

            }

        );

    });

    /*=====================================================
    ANIMATE REVENUE NUMBERS
    =====================================================*/

    const ysrRevenueValues =

        document.querySelectorAll(

            ".ysr-summary-value"

        );

    ysrRevenueValues.forEach(function(item){

        item.style.transition =

            "transform .3s ease";

        item.addEventListener(

            "mouseenter",

            function(){

                this.style.transform =

                    "scale(1.05)";

            }

        );

        item.addEventListener(

            "mouseleave",

            function(){

                this.style.transform =

                    "scale(1)";

            }

        );

    });

    /*=====================================================
    CHART CONTAINER INTERACTION
    =====================================================*/

    if(ysrChartCard){

        ysrChartCard.addEventListener(

            "mouseenter",

            function(){

                this.style.boxShadow =

                    "0 18px 40px rgba(0,0,0,.12)";

            }

        );

        ysrChartCard.addEventListener(

            "mouseleave",

            function(){

                this.style.boxShadow = "";

            }

        );

    }

       /*=====================================================
    NEWSLETTER EMAIL VALIDATION
    =====================================================*/

    if(ysrNewsletterEmail){

        ysrNewsletterEmail.addEventListener(

            "input",

            function(){

                const email =

                    this.value.trim();

                const emailPattern =

                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if(email === ""){

                    this.style.borderColor = "";

                    return;

                }

                if(emailPattern.test(email)){

                    this.style.borderColor =

                        "#198754";

                }

                else{

                    this.style.borderColor =

                        "#dc3545";

                }

            }

        );

    }

    /*=====================================================
    PAGE FADE IN
    =====================================================*/

    document.body.style.opacity = "0";

    setTimeout(function(){

        document.body.style.transition =

            "opacity .4s ease";

        document.body.style.opacity = "1";

    },100);

    /*=====================================================
    KEYBOARD SHORTCUTS
    =====================================================*/

    document.addEventListener(

        "keydown",

        function(event){

            /* Ctrl + B = Dashboard */

            if(

                event.ctrlKey &&

                event.key.toLowerCase() === "b"

            ){

                event.preventDefault();

                if(ysrBackDashboard){

                    ysrBackDashboard.click();

                }

            }

            /* Ctrl + H = Home */

            if(

                event.ctrlKey &&

                event.key.toLowerCase() === "h"

            ){

                event.preventDefault();

                window.location.href =

                "../index.html";

            }

        }

    );

    /*=====================================================
    ACTIVE NAVIGATION
    =====================================================*/

    const ysrCurrentPage =

        window.location.pathname

        .split("/")

        .pop();

    document

        .querySelectorAll(

            ".navbar-nav .nav-link"

        )

        .forEach(function(link){

            const href =

                link.getAttribute("href");

            if(

                href &&

                href.includes(

                    ysrCurrentPage

                )

            ){

                link.classList.add(

                    "active"

                );

            }

        });

    /*=====================================================
    CHART EXPORT (Future Compatible)
    =====================================================*/

    const ysrExportChartBtn =

        document.getElementById(

            "ysrExportChartBtn"

        );

    if(

        ysrExportChartBtn &&

        ysrRevenueChart

    ){

        ysrExportChartBtn.addEventListener(

            "click",

            function(){

                const chartCanvas =

                    document

                    .getElementById(

                        "ysrRevenueChart"

                    );

                const image =

                    chartCanvas.toDataURL(

                        "image/png"

                    );

                const link =

                    document.createElement(

                        "a"

                    );

                link.download =

                    "monthly-revenue.png";

                link.href = image;

                link.click();

            }

        );

    }

    /*=====================================================
    SUMMARY CARD CLICK
    =====================================================*/

    ysrSummaryCards.forEach(function(card){

        card.addEventListener(

            "click",

            function(){

                this.classList.add(

                    "ysr-fade-in"

                );

            }

        );

    });

    /*=====================================================
    WINDOW RESIZE LOGGER
    =====================================================*/

    window.addEventListener(

        "resize",

        function(){

            console.log(

                "Revenue Page Width:",

                window.innerWidth

            );

        }

    );

       /*=====================================================
    REFRESH REVENUE DATA
    =====================================================*/

    const ysrRefreshBtn =

        document.getElementById(

            "ysrRefreshBtn"

        );

    if(ysrRefreshBtn){

        ysrRefreshBtn.addEventListener(

            "click",

            function(){

                this.disabled = true;

                this.innerHTML =

                    '<i class="bi bi-arrow-clockwise"></i> Refreshing...';

                setTimeout(function(){

                    location.reload();

                },800);

            }

        );

    }

    /*=====================================================
    SCROLL TO TOP
    =====================================================*/

    const ysrScrollTop =

        document.getElementById(

            "ysrScrollTop"

        );

    if(ysrScrollTop){

        window.addEventListener(

            "scroll",

            function(){

                if(window.scrollY > 300){

                    ysrScrollTop.classList.remove(

                        "d-none"

                    );

                }

                else{

                    ysrScrollTop.classList.add(

                        "d-none"

                    );

                }

            }

        );

        ysrScrollTop.addEventListener(

            "click",

            function(){

                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });

            }

        );

    }

    /*=====================================================
    ANIMATE MONTHLY REVENUE VALUES
    =====================================================*/

    const ysrMonthItems =

        document.querySelectorAll(

            ".ysr-month-item"

        );

    ysrMonthItems.forEach(function(item,index){

        item.style.opacity = "0";

        item.style.transform =

            "translateY(15px)";

        setTimeout(function(){

            item.style.transition =

                "all .4s ease";

            item.style.opacity = "1";

            item.style.transform =

                "translateY(0)";

        },300 + (index * 100));

    });

    /*=====================================================
    ONLINE / OFFLINE STATUS
    =====================================================*/

    window.addEventListener(

        "online",

        function(){

            console.log(

                "Internet connection restored."

            );

        }

    );

    window.addEventListener(

        "offline",

        function(){

            alert(

                "You are currently offline."

            );

        }

    );

    /*=====================================================
    SAVE LAST VISIT
    =====================================================*/

    localStorage.setItem(

        "ysrLastVisit",

        new Date().toISOString()

    );

    /*=====================================================
    REVENUE CARD COUNTER
    =====================================================*/

    const ysrRevenueCounter =

        document.getElementById(

            "ysrRevenueCounter"

        );

    if(ysrRevenueCounter){

        ysrRevenueCounter.textContent =

            ysrSummaryCards.length;

    }

    /*=====================================================
    COPY REVENUE VALUE
    =====================================================*/

    ysrRevenueValues.forEach(function(value){

        value.addEventListener(

            "dblclick",

            async function(){

                try{

                    await navigator.clipboard.writeText(

                        this.innerText

                    );

                    alert(

                        "Revenue value copied."

                    );

                }

                catch(error){

                    console.error(error);

                }

            }

        );

    });

       /*=====================================================
    SAVE PAGE STATE
    =====================================================*/

    function ysrSavePageState(){

        const pageState = {

            page:"seller-revenue",

            lastVisited:new Date().toISOString(),

            totalCards:ysrSummaryCards.length

        };

        localStorage.setItem(

            "ysrPageState",

            JSON.stringify(pageState)

        );

    }

    ysrSavePageState();

    /*=====================================================
    RESTORE SCROLL POSITION
    =====================================================*/

    const ysrSavedScroll =

        sessionStorage.getItem(

            "ysrScrollPosition"

        );

    if(ysrSavedScroll){

        window.scrollTo(

            0,

            parseInt(ysrSavedScroll)

        );

    }

    window.addEventListener(

        "beforeunload",

        function(){

            sessionStorage.setItem(

                "ysrScrollPosition",

                window.scrollY

            );

        }

    );

    /*=====================================================
    LAZY LOAD PROFILE IMAGE
    =====================================================*/

    const ysrProfileImage =

        document.querySelector(

            ".ysr-profile-image"

        );

    if(ysrProfileImage){

        ysrProfileImage.loading = "lazy";

        ysrProfileImage.decoding = "async";

    }

    /*=====================================================
    PREVENT MULTIPLE FORM SUBMISSIONS
    =====================================================*/

    document.querySelectorAll("form")

        .forEach(function(form){

            form.addEventListener(

                "submit",

                function(){

                    const submitButton =

                        this.querySelector(

                            'button[type="submit"]'

                        );

                    if(submitButton){

                        submitButton.disabled = true;

                        setTimeout(function(){

                            submitButton.disabled = false;

                        },1500);

                    }

                }

            );

        });

    /*=====================================================
    INITIALIZE BOOTSTRAP TOOLTIPS
    =====================================================*/

    document.querySelectorAll(

        '[data-bs-toggle="tooltip"]'

    ).forEach(function(element){

        new bootstrap.Tooltip(

            element

        );

    });

    /*=====================================================
    INITIALIZE BOOTSTRAP POPOVERS
    =====================================================*/

    document.querySelectorAll(

        '[data-bs-toggle="popover"]'

    ).forEach(function(element){

        new bootstrap.Popover(

            element

        );

    });

    /*=====================================================
    SELLER SESSION VALIDATION
    =====================================================*/

    // const ysrSellerSession =

    //     localStorage.getItem(

    //         "sellerLoggedIn"

    //     );

    // if(

    //     ysrSellerSession !== "true"

    // ){

    //     window.location.href =

    //     "../auth/signin.html";

    // }

    /*=====================================================
    PAGE LOAD LOGGER
    =====================================================*/

    window.addEventListener(

        "load",

        function(){

            console.log(

                "Seller Revenue page fully loaded."

            );

        }

    );

    console.log(

        "Seller Revenue initialized:",

        new Date().toLocaleString()

    );

    /*=====================================================
    CLEANUP BEFORE PAGE UNLOAD
    =====================================================*/

    window.addEventListener(

        "beforeunload",

        function(){

            console.log(

                "Leaving Seller Revenue page..."

            );

        }

    );

    /*=====================================================
    FINAL INITIALIZATION
    =====================================================*/

    console.log(

        "YOVI Seller Revenue module initialized successfully."

    );

});

/*=========================================================
SELLER PROMOTE LISTINGS
PART 3A
=========================================================*/

const SellerPromoteListings = {

    /*=====================================================
    LOCAL STORAGE KEYS
    =====================================================*/

    storage: {

        selectedPackage: "yoviSelectedPromotionPackage",

        selectedProduct: "yoviSelectedPromotionProduct",

        promotionDraft: "yoviPromotionDraft"

    },

    /*=====================================================
    APPLICATION STATE
    =====================================================*/

    state: {

        selectedPackage: null,

        selectedProduct: "1",

        isLoading: false

    },

    /*=====================================================
    DOM ELEMENTS
    =====================================================*/

    elements: {},

    /*=====================================================
    INITIALIZE
    =====================================================*/

    init() {

        this.cacheDOM();

        this.loadLocalStorage();

        this.restoreSelections();

        this.bindEvents();

        this.initializeAnimations();

        this.initializeIntersectionObserver();

        this.animateSelectedPackage();

    },

    /*=====================================================
    CACHE DOM
    =====================================================*/

    cacheDOM() {

        this.elements.packageCards =

            document.querySelectorAll(

                ".cspl-package-card"

            );

        this.elements.packageButtons =

            document.querySelectorAll(

                ".cspl-package-btn"

            );

        this.elements.productCards =

            document.querySelectorAll(

                ".cspl-product-card"

            );

        this.elements.continueButton =

            document.getElementById(

                "csplContinueButton"

            );

        this.elements.breadcrumb =

            document.querySelector(

                ".cspl-breadcrumb"

            );

    },

    /*=====================================================
    LOAD LOCAL STORAGE
    =====================================================*/

    loadLocalStorage() {

        const selectedPackage =

            localStorage.getItem(

                this.storage.selectedPackage

            );

        const selectedProduct =

            localStorage.getItem(

                this.storage.selectedProduct

            );

        if (selectedPackage) {

            this.state.selectedPackage =

                selectedPackage;

        }

        if (selectedProduct) {

            this.state.selectedProduct =

                selectedProduct;

        }

    },

    /*=====================================================
    SAVE LOCAL STORAGE
    =====================================================*/

    saveLocalStorage() {

        localStorage.setItem(

            this.storage.selectedPackage,

            this.state.selectedPackage || ""

        );

        localStorage.setItem(

            this.storage.selectedProduct,

            this.state.selectedProduct

        );

    },

    /*=====================================================
    RESTORE SAVED SELECTIONS
    =====================================================*/

    restoreSelections() {

        this.elements.productCards.forEach(card => {

            if (

                card.dataset.product ===

                this.state.selectedProduct

            ) {

                card.classList.add(

                    "cspl-product-selected"

                );

            } else {

                card.classList.remove(

                    "cspl-product-selected"

                );

            }

        });

        this.elements.packageButtons.forEach(button => {

            const card =

                button.closest(

                    ".cspl-package-card"

                );

            if (

                button.dataset.package ===

                this.state.selectedPackage

            ) {

                card.classList.add(

                    "cspl-package-selected"

                );

            } else {

                card.classList.remove(

                    "cspl-package-selected"

                );

            }

        });

    },

    /*=====================================================
    BIND EVENTS
    =====================================================*/

    bindEvents() {

        /*-----------------------------------------
        Promotion Package Selection
        -----------------------------------------*/

        this.elements.packageButtons.forEach(button => {

            button.addEventListener(

                "click",

                this.handlePackageSelection.bind(this)

            );

        });

        /*-----------------------------------------
        Product Selection
        -----------------------------------------*/

        this.elements.productCards.forEach(card => {

            card.addEventListener(

                "click",

                this.handleProductSelection.bind(this)

            );

        });

        /*-----------------------------------------
        Continue Button
        -----------------------------------------*/

        if (this.elements.continueButton) {

            this.elements.continueButton.addEventListener(

                "click",

                this.handleContinue.bind(this)

            );

        }

        /*-----------------------------------------
        Breadcrumb
        -----------------------------------------*/

        if (this.elements.breadcrumb) {

            this.elements.breadcrumb.addEventListener(

                "click",

                this.handleBreadcrumb.bind(this)

            );

        }

    },

    /*=====================================================
    HANDLE PACKAGE SELECTION
    =====================================================*/

    handlePackageSelection(event) {

        event.preventDefault();

        const button = event.currentTarget;

        const selectedPackage =

            button.dataset.package;

        this.state.selectedPackage =

            selectedPackage;

        this.elements.packageCards.forEach(card => {

            card.classList.remove(

                "cspl-package-selected"

            );

        });

        button.closest(

            ".cspl-package-card"

        ).classList.add(

            "cspl-package-selected"

        );

        this.saveLocalStorage();

    },

    /*=====================================================
    HANDLE PRODUCT SELECTION
    =====================================================*/

    handleProductSelection(event) {

        const selectedCard =

            event.currentTarget;

        this.elements.productCards.forEach(card => {

            card.classList.remove(

                "cspl-product-selected"

            );

        });

        selectedCard.classList.add(

            "cspl-product-selected"

        );

        this.state.selectedProduct =

            selectedCard.dataset.product;

        this.saveLocalStorage();

    },

    /*=====================================================
    HANDLE CONTINUE
    =====================================================*/

   handleContinue(event) {

    event.preventDefault();

    if (!this.validateCampaign()) {

        return;
    }

    this.setLoadingState(true);

    this.elements.continueButton.classList.add(

        "cspl-btn-loading"

    );

    this.autoSave();

    setTimeout(() => {

        window.location.href = "seller-promotion-campaign.html";

    }, 700)

   },

    /*=====================================================
    HANDLE BREADCRUMB
    =====================================================*/

    handleBreadcrumb(event) {

        event.preventDefault();

        window.location.href =

            "seller-dashboard.html";

    },

    /*=====================================================
    INITIALIZE ANIMATIONS
    =====================================================*/

    initializeAnimations() {

        [

            ...this.elements.packageCards,

            ...this.elements.productCards

        ].forEach((card, index) => {

            card.style.animationDelay =

                `${index * 0.08}s`;

        });

    },

    /*=====================================================
    SHOW TOAST
    =====================================================*/

    showToast(message, type = "success") {

        const existingToast =

            document.getElementById(

                "csplToast"

            );

        if (existingToast) {

            existingToast.remove();

        }

        const toast = document.createElement("div");

        toast.id = "csplToast";

        toast.className =
            `toast align-items-center text-bg-${type} border-0 position-fixed`;

        toast.style.top = "20px";

        toast.style.right = "20px";

        toast.style.zIndex = "1080";

        toast.innerHTML = `

            <div class="d-flex">

                <div class="toast-body">

                    ${message}

                </div>

                <button
                    type="button"
                    class="btn-close btn-close-white me-2 m-auto"
                    data-bs-dismiss="toast">

                </button>

            </div>

        `;

        document.body.appendChild(toast);

        const bsToast = new bootstrap.Toast(

            toast,

            {

                delay:2500

            }

        );

        bsToast.show();

        toast.addEventListener(

            "hidden.bs.toast",

            () => toast.remove()

        );

    },

    /*=====================================================
    SAVE PROMOTION DRAFT
    =====================================================*/

    savePromotionDraft() {

        const draft = {

            package: this.state.selectedPackage,

            product: this.state.selectedProduct,

            createdAt: new Date().toISOString()

        };

        localStorage.setItem(

            this.storage.promotionDraft,

            JSON.stringify(draft)

        );

    },

    /*=====================================================
    LOADING STATE
    =====================================================*/

    setLoadingState(status) {

        this.state.isLoading = status;

        if (status) {

            document.body.classList.add(

                "cspl-loading"

            );

        } else {

            document.body.classList.remove(

                "cspl-loading"

            );

        }

    },

    /*=====================================================
    INTERSECTION OBSERVER
    =====================================================*/

    initializeIntersectionObserver() {

        const observer = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(

                            "cspl-visible"

                        );

                        observer.unobserve(

                            entry.target

                        );

                    }

                });

            },

            {

                threshold:0.15,

                rootMargin:"0px 0px -40px 0px"

            }

        );

        [

            ...this.elements.packageCards,

            ...this.elements.productCards

        ].forEach(card => {

            observer.observe(card);

        });

    },

    /*=====================================================
    REFRESH PAGE STATE
    =====================================================*/

    refreshPageState() {

        this.restoreSelections();

    },

    /*=====================================================
    RESTORE PACKAGE ANIMATION
    =====================================================*/

    animateSelectedPackage() {

        const selectedCard =

            document.querySelector(

                ".cspl-package-selected"

            );

        if (!selectedCard) return;

        selectedCard.animate(

            [

                {

                    transform:"scale(.96)"

                },

                {

                    transform:"scale(1.03)"

                },

                {

                    transform:"scale(1)"

                }

            ],

            {

                duration:450,

                easing:"ease"

            }

        );

    },

    /*=====================================================
    AUTO SAVE
    =====================================================*/

    autoSave() {

        this.saveLocalStorage();

        this.savePromotionDraft();

    },

    /*=====================================================
    KEYBOARD ACCESSIBILITY
    =====================================================*/

    initializeKeyboardSupport() {

        this.elements.productCards.forEach(card => {

            card.setAttribute("tabindex", "0");

            card.addEventListener("keydown", event => {

                if (

                    event.key === "Enter" ||

                    event.key === " "

                ) {

                    event.preventDefault();

                    card.click();

                }

            });

        });

        this.elements.packageButtons.forEach(button => {

            button.addEventListener("keydown", event => {

                if (

                    event.key === "Enter" ||

                    event.key === " "

                ) {

                    event.preventDefault();

                    button.click();

                }

            });

        });

    },

    /*=====================================================
    WINDOW RESIZE
    =====================================================*/

    initializeResizeHandler() {

        let resizeTimer;

        window.addEventListener(

            "resize",

            () => {

                clearTimeout(resizeTimer);

                resizeTimer = setTimeout(() => {

                    document.body.classList.add(

                        "cspl-resizing"

                    );

                    setTimeout(() => {

                        document.body.classList.remove(

                            "cspl-resizing"

                        );

                    }, 150);

                }, 100);

            }

        );

    },

    /*=====================================================
    VISIBILITY CHANGE
    =====================================================*/

    initializeVisibilityHandler() {

        document.addEventListener(

            "visibilitychange",

            () => {

                if (document.hidden) {

                    this.autoSave();

                } else {

                    this.refreshPageState();

                }

            }

        );

    },

    /*=====================================================
    VALIDATE CAMPAIGN
    =====================================================*/

    validateCampaign() {

        if (!this.state.selectedPackage) {

            this.showToast(

                "Select a promotion package.",

                "warning"

            );

            return false;

        }

        if (!this.state.selectedProduct) {

            this.showToast(

                "Select a product to promote.",

                "warning"

            );

            return false;

        }

        return true;

    },

    /*=====================================================
    GET SELECTED PRODUCT
    =====================================================*/

    getSelectedProductCard() {

        return document.querySelector(

            ".cspl-product-selected"

        );

    },

    /*=====================================================
    GET SELECTED PACKAGE
    =====================================================*/

    getSelectedPackageCard() {

        return document.querySelector(

            ".cspl-package-selected"

        );

    },

    /*=====================================================
    REGISTER GLOBAL EVENTS
    =====================================================*/

    registerGlobalEvents() {

        this.initializeKeyboardSupport();

        this.initializeResizeHandler();

        this.initializeVisibilityHandler();

        window.addEventListener(

            "beforeunload",

            () => {

                this.autoSave();

            }

        );

    },

    /*=====================================================
    RESET CAMPAIGN
    =====================================================*/

    resetCampaign() {

        this.state.selectedPackage = null;

        this.state.selectedProduct = "1";

        this.restoreSelections();

        this.autoSave();

    },

    /*=====================================================
    DESTROY
    =====================================================*/

    destroy() {

        this.autoSave();

    }

};

/*=========================================================
APPLICATION START
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        SellerPromoteListings.init();

        SellerPromoteListings.registerGlobalEvents();

    }

);


"use strict";

/*=========================================================
SELLER WALLET
PART 3A
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeSellerWallet();

});

/*=========================================================
INITIALIZE
=========================================================*/

function initializeSellerWallet() {

    cacheWalletElements();

    initializeWalletAnimations();

    initializeNavigation();

    initializeWalletActions();

}

/*=========================================================
CACHE DOM ELEMENTS
=========================================================*/

let yswElements = {};

function cacheWalletElements() {

    yswElements = {

        withdrawButton:
            document.getElementById("yswWithdrawBtn"),

        topupButton:
            document.getElementById("yswTopupBtn"),

        confirmButton:
            document.getElementById("yswConfirmWithdrawalBtn"),

        changeBankButton:
            document.getElementById("yswChangeBank"),

        amountInput:
            document.getElementById("yswWithdrawAmount"),

        viewAllButton:
            document.getElementById("yswViewAllTransactions"),

        walletCard:
            document.querySelector(".ysw-wallet-card"),

        transactionItems:
            document.querySelectorAll(".ysw-transaction-item")

    };

}

/*=========================================================
PAGE ANIMATION
=========================================================*/

function initializeWalletAnimations() {

    if (yswElements.walletCard) {

        yswElements.walletCard.classList.add("ysw-scale-in");

    }

    yswElements.transactionItems.forEach((item, index) => {

        item.style.animationDelay = `${index * 120}ms`;

        item.classList.add("ysw-fade-up");

    });

}

/*=========================================================
NAVIGATION
=========================================================*/

function initializeNavigation() {

    if (yswElements.topupButton) {

        yswElements.topupButton.addEventListener("click", () => {

            window.location.href = "wallet-topup.html";

        });

    }

    if (yswElements.viewAllButton) {

        yswElements.viewAllButton.addEventListener("click", () => {

            window.location.href = "wallet-transactions.html";

        });

    }

}

/*=========================================================
PRIMARY ACTIONS
=========================================================*/

function initializeWalletActions() {

    if (yswElements.withdrawButton) {

        yswElements.withdrawButton.addEventListener("click", () => {

            if (yswElements.amountInput) {

                yswElements.amountInput.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });

                setTimeout(() => {

                    yswElements.amountInput.focus();

                }, 400);

            }

        });

    }

    if (yswElements.changeBankButton) {

        yswElements.changeBankButton.addEventListener("click", () => {

            window.location.href = "seller-bank-accounts.html";

        });

    }

}

/*=========================================================
WITHDRAWAL VALIDATION
=========================================================*/

const YSW_MINIMUM_WITHDRAWAL = 1000;

const YSW_AVAILABLE_BALANCE = 524000;

/*=========================================================
INITIALIZE VALIDATION
=========================================================*/

initializeWithdrawalValidation();

function initializeWithdrawalValidation() {

    if (!yswElements.amountInput) {

        return;

    }

    yswElements.amountInput.addEventListener("input", handleAmountInput);

    yswElements.amountInput.addEventListener("blur", validateWithdrawalAmount);

}

/*=========================================================
HANDLE INPUT
=========================================================*/

function handleAmountInput(event) {

    const input = event.target;

    let value = input.value.replace(/[^\d]/g, "");

    if (value === "") {

        input.value = "";

        return;

    }

    value = parseInt(value, 10);

    input.value = value;

}

/*=========================================================
VALIDATE AMOUNT
=========================================================*/

function validateWithdrawalAmount() {

    if (!yswElements.amountInput) {

        return false;

    }

    const amount = Number(yswElements.amountInput.value);

    if (!amount) {

        showWalletInputError(

            "Please enter a withdrawal amount."

        );

        return false;

    }

    if (amount < YSW_MINIMUM_WITHDRAWAL) {

        showWalletInputError(

            `Minimum withdrawal is ₦${formatWalletCurrency(YSW_MINIMUM_WITHDRAWAL)}.`

        );

        return false;

    }

    if (amount > YSW_AVAILABLE_BALANCE) {

        showWalletInputError(

            "Withdrawal amount exceeds your available balance."

        );

        return false;

    }

    clearWalletInputError();

    return true;

}

/*=========================================================
INPUT ERROR
=========================================================*/

function showWalletInputError(message) {

    if (!yswElements.amountInput) {

        return;

    }

    yswElements.amountInput.classList.add("is-invalid");

    let feedback = document.getElementById(

        "yswAmountFeedback"

    );

    if (!feedback) {

        feedback = document.createElement("div");

        feedback.id = "yswAmountFeedback";

        feedback.className = "invalid-feedback d-block";

        yswElements.amountInput.insertAdjacentElement(

            "afterend",

            feedback

        );

    }

    feedback.textContent = message;

}

function clearWalletInputError() {

    if (!yswElements.amountInput) {

        return;

    }

    yswElements.amountInput.classList.remove("is-invalid");

    const feedback = document.getElementById(

        "yswAmountFeedback"

    );

    if (feedback) {

        feedback.remove();

    }

}

/*=========================================================
FORMAT CURRENCY
=========================================================*/

function formatWalletCurrency(amount) {

    return Number(amount).toLocaleString(

        "en-NG"

    );

}

/*=========================================================
CONFIRM WITHDRAWAL
=========================================================*/

initializeConfirmWithdrawal();

function initializeConfirmWithdrawal() {

    if (!yswElements.confirmButton) {

        return;

    }

    yswElements.confirmButton.addEventListener(

        "click",

        processWithdrawal

    );

}

/*=========================================================
PROCESS WITHDRAWAL
=========================================================*/

function processWithdrawal() {

    if (!validateWithdrawalAmount()) {

        return;

    }

    const amount = Number(

        yswElements.amountInput.value

    );

    const originalText =

        yswElements.confirmButton.textContent;

    yswElements.confirmButton.disabled = true;

    yswElements.confirmButton.innerHTML =

        `<span class="spinner-border spinner-border-sm me-2"></span>
         Processing...`;

    setTimeout(() => {

        completeWithdrawal(amount);

        yswElements.confirmButton.disabled = false;

        yswElements.confirmButton.textContent =

            originalText;

    }, 1800);

}

/*=========================================================
COMPLETE WITHDRAWAL
=========================================================*/

function completeWithdrawal(amount) {

    const updatedBalance =

        YSW_AVAILABLE_BALANCE - amount;

    updateWalletBalance(updatedBalance);

    saveWalletTransaction({

        id: Date.now(),

        type: "Withdrawal",

        amount: amount,

        account: "GTBank ••••4532",

        status: "Completed",

        date: new Date().toISOString()

    });

    showWalletToast(

        `₦${formatWalletCurrency(amount)} withdrawal request submitted successfully.`,

        "success"

    );

    yswElements.amountInput.value = "";

}

/*=========================================================
UPDATE WALLET BALANCE
=========================================================*/

function updateWalletBalance(balance) {

    const balanceElement =

        document.querySelector(

            ".ysw-wallet-balance"

        );

    if (!balanceElement) {

        return;

    }

    balanceElement.textContent =

        `₦${formatWalletCurrency(balance)}`;

}

/*=========================================================
SAVE TRANSACTION
===========================*/

    saveWalletState(updatedBalance);

    prependLatestTransaction(amount);

}

/*=========================================================
LOCAL STORAGE
=========================================================*/

function saveWalletState(balance) {

    const walletState = {

        availableBalance: balance,

        updatedAt: new Date().toISOString()

    };

    localStorage.setItem(

        "yswSellerWalletState",

        JSON.stringify(walletState)

    );

}

function saveWalletTransaction(transaction) {

    const transactions = JSON.parse(

        localStorage.getItem("yswWalletTransactions") || "[]"

    );

    transactions.unshift(transaction);

    localStorage.setItem(

        "yswWalletTransactions",

        JSON.stringify(transactions)

    );

}

/*=========================================================
PREPEND NEW TRANSACTION
=========================================================*/

function prependLatestTransaction(amount) {

    const transactionsContainer = document.querySelector(

        ".ysw-transactions-section .ysw-card"

    );

    if (!transactionsContainer) {

        return;

    }

    const transaction = document.createElement("div");

    transaction.className =

        "ysw-transaction-item ysw-scale-in";

    transaction.innerHTML = `

        <div class="ysw-transaction-left">

            <div class="ysw-transaction-icon danger">

                <i class="bi bi-arrow-up-circle-fill"></i>

            </div>

            <div>

                <h6>

                    Withdrawal

                </h6>

                <span>

                    GTBank ••••4532

                </span>

            </div>

        </div>

        <div class="ysw-transaction-right">

            <h6 class="ysw-debit">

                - ₦${formatWalletCurrency(amount)}

            </h6>

            <small>

                Just now

            </small>

        </div>

    `;

    const firstTransaction = transactionsContainer.querySelector(

        ".ysw-transaction-item"

    );

    if (firstTransaction) {

        firstTransaction.before(transaction);

    }

}

/*=========================================================
RESTORE WALLET
=========================================================*/

restoreWalletState();

function restoreWalletState() {

    const walletState = JSON.parse(

        localStorage.getItem("yswSellerWalletState")

    );

    if (

        walletState &&

        walletState.availableBalance

    ) {

        updateWalletBalance(

            walletState.availableBalance

        );

    }

}

/*=========================================================
TOAST NOTIFICATION
=========================================================*/

function showWalletToast(message, type = "success") {

    let toast = document.getElementById("yswWalletToast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "yswWalletToast";

        toast.className = "toast align-items-center border-0 position-fixed";

        toast.style.top = "20px";
        toast.style.right = "20px";
        toast.style.zIndex = "9999";

        document.body.appendChild(toast);

    }

    const backgroundColor = type === "success"
        ? "bg-success"
        : "bg-danger";

    toast.className = `toast align-items-center text-white ${backgroundColor} border-0 position-fixed`;

    toast.innerHTML = `

        <div class="d-flex">

            <div class="toast-body">

                ${message}

            </div>

            <button
                type="button"
                class="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast">

            </button>

        </div>

    `;

    const bsToast = new bootstrap.Toast(toast, {

        delay: 3500

    });

    bsToast.show();

}

/*=========================================================
KEYBOARD SHORTCUTS
=========================================================*/

document.addEventListener("keydown", (event) => {

    if (

        event.key === "Enter" &&

        document.activeElement === yswElements.amountInput

    ) {

        event.preventDefault();

        processWithdrawal();

    }

});

/*=========================================================
AUTO FORMAT ON BLUR
=========================================================*/

if (yswElements.amountInput) {

    yswElements.amountInput.addEventListener("blur", () => {

        const amount = Number(

            yswElements.amountInput.value

        );

        if (amount > 0) {

            yswElements.amountInput.value = amount;

        }

    });

}

/*=========================================================
GLOBAL ERROR HANDLER
=========================================================*/

window.addEventListener("error", (event) => {

    console.error(

        "[Seller Wallet]",

        event.message

    );

});

/*=========================================================
HELPER FUNCTIONS
=========================================================*/

function getCurrentWalletBalance() {

    const balanceElement = document.querySelector(

        ".ysw-wallet-balance"

    );

    if (!balanceElement) {

        return 0;

    }

    return Number(

        balanceElement.textContent

            .replace(/[₦,\s]/g, "")

    );

}

function resetWithdrawalForm() {

    clearWalletInputError();

    if (yswElements.amountInput) {

        yswElements.amountInput.value = "";

    }

}

function scrollToTopSmooth() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

/*=========================================================
PAGE EVENTS
=========================================================*/

window.addEventListener("beforeunload", () => {

    console.info(

        "Seller Wallet page unloaded."

    );

});

/*=========================================================
SELLER DASHBOARD LINKS
=========================================================*/

const yswSidebarLinks = {

    dashboard: "../../seller/seller-dashboard.html",

    orders: "../../seller/seller-order.html",

    products: "../../seller/seller-product.html",

    inventory: "../../seller/seller-inventory.html",

    analytics: "../../seller/seller-analytics.html",

    revenue: "../../seller/seller-revenue.html",

    wallet: "../../seller/seller-wallet.html",

    settings: "../../seller/seller-setting.html"

};

/*=========================================================
END OF SELLER WALLET JAVASCRIPT
=========================================================*/

/*==========================================================
SELLER SIDEBAR ORDERS
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /*======================================================
    PAGE CHECK
    Prevent conflicts with other pages
    ======================================================*/

    const ssorPage = document.getElementById("ssor-page");

    if (!ssorPage) return;

    /*======================================================
    HELPERS
    ======================================================*/

    const $ = (selector) => document.querySelector(selector);

    const $$ = (selector) => document.querySelectorAll(selector);

    /*======================================================
    REVEAL ANIMATION
    ======================================================*/

    const ssorCards = $$(".ssor-order-card");

    if ("IntersectionObserver" in window && ssorCards.length) {

        const ssorObserver = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("ssor-show");

                    entry.target.classList.remove("ssor-hidden");

                    ssorObserver.unobserve(entry.target);

                }

            });

        }, {

            threshold:0.15

        });

        ssorCards.forEach((card)=>{

            card.classList.add("ssor-hidden");

            ssorObserver.observe(card);

        });

    }

    /*======================================================
    IMAGE HOVER
    ======================================================*/

    const ssorImages = $$(".ssor-order-image img");

    if(ssorImages.length){

        ssorImages.forEach((image)=>{

            image.addEventListener("mouseenter",()=>{

                image.style.transform="scale(1.08)";

            });

            image.addEventListener("mouseleave",()=>{

                image.style.transform="scale(1)";

            });

        });

    }

    /*======================================================
    CARD HOVER EFFECT
    ======================================================*/

    if(ssorCards.length){

        ssorCards.forEach((card)=>{

            card.addEventListener("mouseenter",()=>{

                card.style.transform="translateY(-5px)";

            });

            card.addEventListener("mouseleave",()=>{

                card.style.transform="translateY(0)";

            });

        });

    }

    /*======================================================
    RIPPLE EFFECT
    ======================================================*/

    const ssorButtons = $$(".ssor-btn,.ssor-icon-btn");

    if(ssorButtons.length){

        ssorButtons.forEach((button)=>{

            button.style.position="relative";

            button.style.overflow="hidden";

            button.addEventListener("click",(event)=>{

                const ripple=document.createElement("span");

                ripple.className="ssor-ripple";

                const rect=button.getBoundingClientRect();

                const size=Math.max(rect.width,rect.height);

                ripple.style.width=size+"px";

                ripple.style.height=size+"px";

                ripple.style.left=(event.clientX-rect.left-size/2)+"px";

                ripple.style.top=(event.clientY-rect.top-size/2)+"px";

                button.appendChild(ripple);

                ripple.addEventListener("animationend",()=>{

                    ripple.remove();

                });

            });

        });

    }

    /*======================================================
    NAVIGATION LINKS
    ======================================================*/

    const ssorLinks = $$(".ssor-nav-link");

    if(ssorLinks.length){

        const currentPage=window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

        ssorLinks.forEach((link)=>{

            const href=link.getAttribute("href");

            if(!href) return;

            if(href.toLowerCase()===currentPage){

                link.classList.add("active");

            }

        });

    }

    /*======================================================
    BREADCRUMB
    ======================================================*/

    const ssorBackBtn=$(".ssor-breadcrumb a");

    if(ssorBackBtn){

        ssorBackBtn.addEventListener("click",(event)=>{

            event.preventDefault();

            window.location.href="seller-dashboard.html";

        });

    }

    /*======================================================
    USER PROFILE
    ======================================================*/

    const ssorUser=$(".ssor-user-box");

    if(ssorUser){

        ssorUser.addEventListener("click",(event)=>{

            event.preventDefault();

            window.location.href="seller-profile.html";

        });

    }

    /*======================================================
    CART
    ======================================================*/

    const ssorCart=$("#ssorCart");

    if(ssorCart){

        ssorCart.addEventListener("click",(event)=>{

            event.preventDefault();

            window.location.href="cart.html";

        });

    }

    /*======================================================
    NOTIFICATIONS
    ======================================================*/

    const ssorNotification=$("#ssorNotification");

    if(ssorNotification){

        ssorNotification.addEventListener("click",(event)=>{

            event.preventDefault();

            window.location.href="notifications.html";

        });

    }

    /*======================================================
    ORDER CARD CLICK
    ======================================================*/

    if(ssorCards.length){

        ssorCards.forEach((card)=>{

            card.style.cursor="pointer";

            card.addEventListener("click",()=>{

                window.location.href="seller-order-details.html";

            });

        });

    }

    /*======================================================
    KEYBOARD ACCESSIBILITY
    ======================================================*/

    document.addEventListener("keyup", (event) => {

        if (event.key === "Escape") {

            document.activeElement.blur();

        }

    });

    /*======================================================
    STATUS BADGE HOVER
    ======================================================*/

    const ssorStatusBadges = $$(".ssor-status");

    if (ssorStatusBadges.length) {

        ssorStatusBadges.forEach((badge) => {

            badge.addEventListener("mouseenter", () => {

                badge.style.transform = "scale(1.05)";

            });

            badge.addEventListener("mouseleave", () => {

                badge.style.transform = "scale(1)";

            });

        });

    }

    /*======================================================
    PAGE TRANSITION
    ======================================================*/

    document.querySelectorAll("a[href]").forEach((link) => {

        const href = link.getAttribute("href");

        if (!href) return;

        if (
            href.startsWith("#") ||
            href.startsWith("javascript:")
        ) return;

        link.addEventListener("click", () => {

            document.body.classList.add("ssor-page-leaving");

        });

    });

    /*======================================================
    PAGE LOADED
    ======================================================*/

    window.addEventListener("load", () => {

        document.body.classList.add("ssor-page-loaded");

    });

    /*======================================================
    WINDOW RESIZE
    ======================================================*/

    window.addEventListener("resize", () => {

        if (window.innerWidth < 768) {

            ssorCards.forEach((card) => {

                card.style.transition = ".3s ease";

            });

        }

    });

    /*======================================================
    SCROLL ANIMATION
    ======================================================*/

    let ssorScrollTick = false;

    window.addEventListener("scroll", () => {

        if (ssorScrollTick) return;

        window.requestAnimationFrame(() => {

            const scrollTop = window.scrollY;

            if (scrollTop > 20) {

                const header = $(".ssor-header");

                if (header) {

                    header.style.boxShadow = "0 8px 20px rgba(16,24,40,.08)";

                }

            } else {

                const header = $(".ssor-header");

                if (header) {

                    header.style.boxShadow = "";

                }

            }

            ssorScrollTick = false;

        });

        ssorScrollTick = true;

    });

    /*======================================================
    IMAGE FALLBACK
    ======================================================*/

    ssorImages.forEach((image) => {

        image.addEventListener("error", function () {

            this.src = "assets/images/product-placeholder.jpg";

        });

    });

    /*======================================================
    ORDER COUNTER
    ======================================================*/

    const ssorTitle = $(".ssor-page-title");

    if (ssorTitle && ssorCards.length) {

        ssorTitle.setAttribute(

            "data-orders",

            ssorCards.length

        );

    }

    /*======================================================
    OPTIONAL SEARCH SUPPORT
    ======================================================*/

    const ssorSearch = document.getElementById("ssorSearch");

    if (ssorSearch) {

        ssorSearch.addEventListener("keyup", function () {

            const value = this.value.toLowerCase();

            ssorCards.forEach((card) => {

                const text = card.textContent.toLowerCase();

                card.style.display =

                    text.includes(value)

                        ? ""

                        : "none";

            });

        });

    }

    /*======================================================
    OPTIONAL FILTER SUPPORT
    ======================================================*/

    const ssorFilter = document.getElementById("ssorFilter");

    if (ssorFilter) {

        ssorFilter.addEventListener("change", function () {

            const value = this.value.toLowerCase();

            ssorCards.forEach((card) => {

                if (value === "all") {

                    card.style.display = "";

                    return;

                }

                const status = card
                    .querySelector(".ssor-status")
                    ?.textContent
                    .trim()
                    .toLowerCase();

                card.style.display =

                    status === value

                        ? ""

                        : "none";

            });

        });

    }

    /*======================================================
    CONSOLE MESSAGE
    ======================================================*/

    console.log(

        "%cSeller Sidebar Orders Loaded Successfully",

        "color:#18c37e;font-size:14px;font-weight:bold;"

    );

});

/*=========================================================
YOVI PAYMENT PLAN ANNUALLY
APP.JS — PART 3A
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        /*=====================================================
        PAGE CHECK
        Prevent this script from affecting other pages
        =====================================================*/

        const yppaPage =

            document.getElementById(

                "yppaPage"

            );

        if(!yppaPage){

            return;

        }

        console.log(

            "YOVI Annual Payment Plan Loaded"

        );

        /*=====================================================
        ELEMENTS
        =====================================================*/

        const yppaMonthlyBtn =

            document.getElementById(

                "yppaMonthlyBtn"

            );

        const yppaAnnualBtn =

            document.getElementById(

                "yppaAnnualBtn"

            );

        const yppaBackDashboard =

            document.getElementById(

                "yppaBackDashboard"

            );

        const yppaUpgradeProBtn =

            document.getElementById(

                "yppaUpgradeProBtn"

            );

        const yppaPremiumBtn =

            document.getElementById(

                "yppaPremiumBtn"

            );

        const yppaCurrentPlanBtn =

            document.getElementById(

                "yppaCurrentPlanBtn"

            );

        const yppaLogoutBtn =

            document.getElementById(

                "yppaLogoutBtn"

            );

        const yppaNotificationBtn =

            document.getElementById(

                "yppaNotificationBtn"

            );

        const yppaCartBtn =

            document.getElementById(

                "yppaCartBtn"

            );

        const yppaCards =

            document.querySelectorAll(

                ".yppa-plan-card"

            );

        /*=====================================================
        RIPPLE EFFECT
        =====================================================*/

        function yppaCreateRipple(

            button,

            event

        ){

            const ripple =

                document.createElement(

                    "span"

                );

            const diameter = Math.max(

                button.clientWidth,

                button.clientHeight

            );

            ripple.className =

                "yppa-ripple";

            ripple.style.width =

                diameter + "px";

            ripple.style.height =

                diameter + "px";

            const rect =

                button.getBoundingClientRect();

            ripple.style.left =

                event.clientX -

                rect.left -

                diameter / 2 +

                "px";

            ripple.style.top =

                event.clientY -

                rect.top -

                diameter / 2 +

                "px";

            button.appendChild(

                ripple

            );

            setTimeout(

                function(){

                    ripple.remove();

                },

                600

            );

        }

        /*=====================================================
        MONTHLY PLAN
        =====================================================*/

        if(

            yppaMonthlyBtn

        ){

            yppaMonthlyBtn.addEventListener(

                "click",

                function(event){

                    yppaCreateRipple(

                        this,

                        event

                    );

                    setTimeout(

                        function(){

                            window.location.href =

                            "seller-plan.html";

                        },

                        250

                    );

                }

            );

        }

        /*=====================================================
        ANNUAL BUTTON
        =====================================================*/

        if(

            yppaAnnualBtn

        ){

            yppaAnnualBtn.classList.add(

                "yppa-toggle-active"

            );

        }

        /*=====================================================
        BACK TO DASHBOARD
        =====================================================*/

        if(

            yppaBackDashboard

        ){

            yppaBackDashboard.addEventListener(

                "click",

                function(event){

                    event.preventDefault();

                    window.location.href =

                    "../Dashboard/seller-dashboard.html";

                }

            );

        }

        /*=====================================================
        CURRENT PLAN
        =====================================================*/

        if(

            yppaCurrentPlanBtn

        ){

            yppaCurrentPlanBtn.addEventListener(

                "click",

                function(event){

                    event.preventDefault();

                    alert(

                        "You are currently using the Free Annual Plan."

                    );

                }

            );

        }

        /*=====================================================
        UPGRADE TO PROFESSIONAL
        =====================================================*/

        if(

            yppaUpgradeProBtn

        ){

            yppaUpgradeProBtn.addEventListener(

                "click",

                function(event){

                    event.preventDefault();

                    yppaCreateRipple(

                        this,

                        event

                    );

                    this.classList.add(

                        "yppa-btn-loading"

                    );

                    setTimeout(

                        () => {

                            window.location.href =

                            "../Payments/professional-checkout.html";

                        },

                        350

                    );

                }

            );

        }

        /*=====================================================
        GO PREMIUM
        =====================================================*/

        if(

            yppaPremiumBtn

        ){

            yppaPremiumBtn.addEventListener(

                "click",

                function(event){

                    event.preventDefault();

                    yppaCreateRipple(

                        this,

                        event

                    );

                    this.classList.add(

                        "yppa-btn-loading"

                    );

                    setTimeout(

                        () => {

                            window.location.href =

                            "../Payments/premium-checkout.html";

                        },

                        350

                    );

                }

            );

        }

        /*=====================================================
        CART
        =====================================================*/

        if(

            yppaCartBtn

        ){

            yppaCartBtn.addEventListener(

                "click",

                function(){

                    window.location.href =

                    "../Cart/cart.html";

                }

            );

        }

        /*=====================================================
        NOTIFICATION
        =====================================================*/

        if(

            yppaNotificationBtn

        ){

            yppaNotificationBtn.addEventListener(

                "click",

                function(){

                    alert(

                        "You have no new notifications."

                    );

                }

            );

        }

        /*=====================================================
        SIGN OUT
        =====================================================*/

        function yppaSignOut(){

            const confirmLogout =

                confirm(

                    "Are you sure you want to sign out?"

                );

            if(

                !confirmLogout

            ){

                return;

            }

            sessionStorage.clear();

            localStorage.removeItem(

                "currentUser"

            );

            localStorage.removeItem(

                "authToken"

            );

            localStorage.removeItem(

                "sellerLoggedIn"

            );

            window.location.href =

            "../auth/signin.html";

        }

        if(

            yppaLogoutBtn

        ){

            yppaLogoutBtn.addEventListener(

                "click",

                function(event){

                    event.preventDefault();

                    yppaSignOut();

                }

            );

        }

        /*=====================================================
        CARD ENTRANCE ANIMATION
        =====================================================*/

        yppaCards.forEach(

            function(

                card,

                index

            ){

                card.style.opacity =

                    "0";

                card.style.transform =

                    "translateY(35px)";

                setTimeout(

                    function(){

                        card.style.transition =

                            "all .5s ease";

                        card.style.opacity =

                            "1";

                        card.style.transform =

                            "translateY(0)";

                    },

                    150 +

                    (

                        index * 150

                    )

                );

            }

        );

        /*=====================================================
        NAVBAR SCROLL EFFECT
        =====================================================*/

        const yppaNavbar =

            document.querySelector(

                ".yppa-navbar"

            );

        window.addEventListener(

            "scroll",

            function(){

                if(

                    window.scrollY >

                    30

                ){

                    yppaNavbar.classList.add(

                        "yppa-navbar-scrolled"

                    );

                }

                else{

                    yppaNavbar.classList.remove(

                        "yppa-navbar-scrolled"

                    );

                }

            }

        );

        /*=====================================================
        SAVE CURRENT PLAN
        =====================================================*/

        localStorage.setItem(

            "yppaCurrentPlan",

            "annual"

        );

        /*=====================================================
        SAVE PAGE STATE
        =====================================================*/

        function yppaSavePageState(){

            const pageState = {

                page:

                    "seller-plan-annual",

                activePlan:

                    "annual",

                lastVisit:

                    new Date()

                    .toISOString()

            };

            localStorage.setItem(

                "yppaPageState",

                JSON.stringify(

                    pageState

                )

            );

        }

        yppaSavePageState();

        /*=====================================================
        RESTORE LAST VISIT
        =====================================================*/

        const yppaLastVisit =

            localStorage.getItem(

                "yppaLastVisit"

            );

        if(

            yppaLastVisit

        ){

            console.log(

                "Last Visit:",

                yppaLastVisit

            );

        }

        localStorage.setItem(

            "yppaLastVisit",

            new Date()

            .toISOString()

        );

        /*=====================================================
        PAGE FADE IN
        =====================================================*/

        document.body.style.opacity =

            "0";

        window.addEventListener(

            "load",

            function(){

                document.body.style.transition =

                    "opacity .45s ease";

                document.body.style.opacity =

                    "1";

            }

        );

        /*=====================================================
        WINDOW RESIZE LOGGER
        =====================================================*/

        window.addEventListener(

            "resize",

            function(){

                console.log(

                    "Viewport:",

                    window.innerWidth +

                    "px"

                );

            }

        );

        /*=====================================================
        KEYBOARD SHORTCUTS
        =====================================================*/

        document.addEventListener(

            "keydown",

            function(event){

                /* Ctrl + M = Monthly Plan */

                if(

                    event.ctrlKey &&

                    event.key.toLowerCase() === "m"

                ){

                    event.preventDefault();

                    if(

                        yppaMonthlyBtn

                    ){

                        yppaMonthlyBtn.click();

                    }

                }

                /* Ctrl + P = Professional */

                if(

                    event.ctrlKey &&

                    event.key.toLowerCase() === "p"

                ){

                    event.preventDefault();

                    if(

                        yppaUpgradeProBtn

                    ){

                        yppaUpgradeProBtn.click();

                    }

                }

            }

        );

        /*=====================================================
        RESTORE SCROLL POSITION
        =====================================================*/

        const yppaSavedScroll =

            sessionStorage.getItem(

                "yppaScrollPosition"

            );

        if(

            yppaSavedScroll

        ){

            window.scrollTo(

                0,

                parseInt(

                    yppaSavedScroll

                )

            );

        }

        window.addEventListener(

            "beforeunload",

            function(){

                sessionStorage.setItem(

                    "yppaScrollPosition",

                    window.scrollY

                );

            }

        );

        /*=====================================================
        ONLINE / OFFLINE STATUS
        =====================================================*/

        window.addEventListener(

            "online",

            function(){

                console.log(

                    "Internet connection restored."

                );

            }

        );

        window.addEventListener(

            "offline",

            function(){

                alert(

                    "You are currently offline."

                );

            }

        );

        /*=====================================================
        INITIALIZE TOOLTIPS
        =====================================================*/

        document

            .querySelectorAll(

                '[data-bs-toggle="tooltip"]'

            )

            .forEach(

                function(item){

                    new bootstrap.Tooltip(

                        item

                    );

                }

            );

        /*=====================================================
        INITIALIZE POPOVERS
        =====================================================*/

        document

            .querySelectorAll(

                '[data-bs-toggle="popover"]'

            )

            .forEach(

                function(item){

                    new bootstrap.Popover(

                        item

                    );

                }

            );

        /*=====================================================
        BUTTON LOADING RESET
        =====================================================*/

        document

            .querySelectorAll(

                ".yppa-btn-loading"

            )

            .forEach(

                function(button){

                    setTimeout(

                        function(){

                            button.classList.remove(

                                "yppa-btn-loading"

                            );

                        },

                        2500

                    );

                }

            );

        /*=====================================================
        PAGE VISIBILITY
        =====================================================*/

        document.addEventListener(

            "visibilitychange",

            function(){

                if(

                    document.hidden

                ){

                    console.log(

                        "Annual Plan page hidden."

                    );

                }

                else{

                    console.log(

                        "Annual Plan page active."

                    );

                }

            }

        );

        /*=====================================================
        SESSION VALIDATION
        =====================================================*/

        const yppaSellerSession =

            localStorage.getItem(

                "sellerLoggedIn"

            );

        if(

            yppaSellerSession !==

            "true"

        ){

            window.location.href =

            "../auth/signin.html";

        }

        /*=====================================================
        ACTIVE NAVIGATION
        =====================================================*/

        const yppaCurrentPage =

            window.location.pathname

            .split("/")

            .pop();

        document

            .querySelectorAll(

                ".yppa-nav-link"

            )

            .forEach(

                function(link){

                    const href =

                        link.getAttribute(

                            "href"

                        );

                    if(

                        href &&

                        href.includes(

                            yppaCurrentPage

                        )

                    ){

                        link.classList.add(

                            "active"

                        );

                    }

                }

            );

        /*=====================================================
        PAGE LOAD LOGGER
        =====================================================*/

        window.addEventListener(

            "load",

            function(){

                console.log(

                    "Seller Annual Payment Plan fully loaded."

                );

            }

        );

        /*=====================================================
        PERFORMANCE LOGGER
        =====================================================*/

        console.log(

            "Page initialized at:",

            new Date()

            .toLocaleString()

        );

        console.log(

            "Current Plan:",

            "Annual"

        );

        console.log(

            "Screen Width:",

            window.innerWidth

        );

        /*=====================================================
        CLEANUP BEFORE UNLOAD
        =====================================================*/

        window.addEventListener(

            "beforeunload",

            function(){

                console.log(

                    "Leaving Seller Annual Payment Plan..."

                );

            }

        );

        /*=====================================================
        FINAL INITIALIZATION
        =====================================================*/

        console.log(

            "YOVI Annual Payment Plan module initialized successfully."

        );

    }

);

/*=========================================================
SELLER PLANS
=========================================================*/

const SellerPlans = {

    /*=====================================================
    LOCAL STORAGE KEYS
    =====================================================*/

    storage: {

        billingCycle: "yoviSellerBillingCycle",

        selectedPlan: "yoviSellerSelectedPlan"

    },

    /*=====================================================
    APPLICATION STATE
    =====================================================*/

    state: {

        billingCycle: "monthly",

        selectedPlan: null,

        isLoading: false

    },

    /*=====================================================
    DOM ELEMENTS
    =====================================================*/

    elements: {},

    /*=====================================================
    INITIALIZE
    =====================================================*/

   init() {

    this.cacheDOM();

    this.loadLocalStorage();

    this.restoreBillingCycle();

    this.restoreSelectedPlan();

    this.bindEvents();

    this.initializeAnimations();

    this.initializeIntersectionObserver();

    this.animateSelectedPlan();

},

    /*=====================================================
    CACHE DOM
    =====================================================*/

    cacheDOM() {

        this.elements.monthlyButton =

            document.getElementById(

                "ysppMonthlyBtn"

            );

        this.elements.annualButton =

            document.getElementById(

                "ysppAnnualBtn"

            );

        this.elements.priceValues =

            document.querySelectorAll(

                ".yspp-price-value"

            );

        this.elements.pricePeriods =

            document.querySelectorAll(

                ".yspp-price-period"

            );

        this.elements.upgradeButtons =

            document.querySelectorAll(

                ".yspp-upgrade-btn"

            );

        this.elements.planCards =

            document.querySelectorAll(

                ".yspp-plan-card"

            );

        this.elements.breadcrumb =

            document.querySelector(

                ".yspp-breadcrumb"

            );

        this.elements.contactButton =

            document.querySelector(

                ".yspp-contact-btn"

            );

    },

    /*=====================================================
    LOAD LOCAL STORAGE
    =====================================================*/

    loadLocalStorage() {

        const billingCycle =

            localStorage.getItem(

                this.storage.billingCycle

            );

        const selectedPlan =

            localStorage.getItem(

                this.storage.selectedPlan

            );

        if (billingCycle) {

            this.state.billingCycle =

                billingCycle;

        }

        if (selectedPlan) {

            this.state.selectedPlan =

                selectedPlan;

        }

    },

    /*=====================================================
    SAVE LOCAL STORAGE
    =====================================================*/

    saveLocalStorage() {

        localStorage.setItem(

            this.storage.billingCycle,

            this.state.billingCycle

        );

        localStorage.setItem(

            this.storage.selectedPlan,

            this.state.selectedPlan || ""

        );

    },

    /*=====================================================
    RESTORE BILLING CYCLE
    =====================================================*/

    restoreBillingCycle() {

        if (

            this.state.billingCycle === "annual"

        ) {

            this.updateBillingCycle(

                "annual"

            );

        } else {

            this.updateBillingCycle(

                "monthly"

            );

        }

    },

    /*=====================================================
    RESTORE SELECTED PLAN
    =====================================================*/

    restoreSelectedPlan() {

        this.elements.planCards.forEach(card => {

            card.classList.remove(

                "yspp-plan-selected"

            );

        });

        if (!this.state.selectedPlan) return;

        const selectedButton =

            document.querySelector(

                `[data-plan="${this.state.selectedPlan}"]`

            );

        if (!selectedButton) return;

        selectedButton.closest(

            ".yspp-plan-card"

        ).classList.add(

            "yspp-plan-selected"

        );

    },

    /*=====================================================
    BIND EVENTS
    =====================================================*/

    bindEvents() {

        /*-----------------------------------------
        Monthly Billing
        -----------------------------------------*/

        if (this.elements.monthlyButton) {

            this.elements.monthlyButton.addEventListener(

                "click",

                () => {

                    this.updateBillingCycle(

                        "monthly"

                    );

                }

            );

        }

        /*-----------------------------------------
        Annual Billing
        -----------------------------------------*/

        if (this.elements.annualButton) {

            this.elements.annualButton.addEventListener(

                "click",

                () => {

                    this.updateBillingCycle(

                        "annual"

                    );

                }

            );

        }

        /*-----------------------------------------
        Upgrade Buttons
        -----------------------------------------*/

        this.elements.upgradeButtons.forEach(button => {

            button.addEventListener(

                "click",

                this.handlePlanSelection.bind(this)

            );

        });

        /*-----------------------------------------
        Contact Sales
        -----------------------------------------*/

        if (this.elements.contactButton) {

            this.elements.contactButton.addEventListener(

                "click",

                this.handleContactSales.bind(this)

            );

        }

        /*-----------------------------------------
        Breadcrumb
        -----------------------------------------*/

        if (this.elements.breadcrumb) {

            this.elements.breadcrumb.addEventListener(

                "click",

                this.handleBreadcrumb.bind(this)

            );

        }

    },

    /*=====================================================
    UPDATE BILLING CYCLE
    =====================================================*/

    updateBillingCycle(cycle) {

        this.state.billingCycle = cycle;

        this.elements.monthlyButton.classList.toggle(

            "yspp-toggle-active",

            cycle === "monthly"

        );

        this.elements.annualButton.classList.toggle(

            "yspp-toggle-active",

            cycle === "annual"

        );

        this.elements.priceValues.forEach(price => {

            const value =

                cycle === "monthly"

                ? price.dataset.monthly

                : price.dataset.annual;

            price.textContent =

                Number(value).toLocaleString();

        });

        this.elements.pricePeriods.forEach(period => {

            period.textContent =

                cycle === "monthly"

                ? "/month"

                : "/year";

        });

        this.saveLocalStorage();

    },

    /*=====================================================
    HANDLE PLAN SELECTION
    =====================================================*/

    handlePlanSelection(event) {

    event.preventDefault();

    const button = event.currentTarget;

    this.state.selectedPlan =

        button.dataset.plan;

    this.elements.planCards.forEach(card => {

        card.classList.remove(

            "yspp-plan-selected"

        );

    });

    const selectedCard =

        button.closest(

            ".yspp-plan-card"

        );

    selectedCard.classList.add(

        "yspp-plan-selected"

    );

    if (!this.validatePlanSelection()) {

        return;

    }

    this.setLoadingState(true);

    this.autoSave();

    this.animateSelection(

        selectedCard

    );

    setTimeout(() => {

        window.location.href =

            "seller-checkout-plan.html";

    }, 700);

},

    /*=====================================================
    HANDLE CONTACT SALES
    =====================================================*/

    handleContactSales(event) {

        event.preventDefault();

        window.location.href =

            "contact-us.html";

    },

    /*=====================================================
    HANDLE BREADCRUMB
    =====================================================*/

    handleBreadcrumb(event) {

        event.preventDefault();

        window.location.href =

            "seller-dashboard.html";

    },

    /*=====================================================
    CARD SELECTION ANIMATION
    =====================================================*/

    animateSelection(card) {

        card.animate(

            [

                {

                    transform:"scale(.97)"

                },

                {

                    transform:"scale(1.03)"

                },

                {

                    transform:"scale(1)"

                }

            ],

            {

                duration:450,

                easing:"ease"

            }

        );

    },

    /*=====================================================
    INITIALIZE ANIMATIONS
    =====================================================*/

    initializeAnimations() {

        this.elements.planCards.forEach(

            (card, index) => {

                card.style.animationDelay =

                    `${index * 0.12}s`;

            }

        );

    },

    /*=====================================================
    SHOW TOAST
    =====================================================*/

    showToast(message, type = "success") {

        const existingToast =

            document.getElementById(

                "ysppToast"

            );

        if (existingToast) {

            existingToast.remove();

        }

        const toast = document.createElement("div");

        toast.id = "ysppToast";

        toast.className =
            `toast align-items-center text-bg-${type} border-0 position-fixed`;

        toast.style.top = "20px";

        toast.style.right = "20px";

        toast.style.zIndex = "1080";

        toast.innerHTML = `

            <div class="d-flex">

                <div class="toast-body">

                    ${message}

                </div>

                <button
                    type="button"
                    class="btn-close btn-close-white me-2 m-auto"
                    data-bs-dismiss="toast">

                </button>

            </div>

        `;

        document.body.appendChild(toast);

        const bsToast = new bootstrap.Toast(

            toast,

            {

                delay:2500

            }

        );

        bsToast.show();

        toast.addEventListener(

            "hidden.bs.toast",

            () => toast.remove()

        );

    },

    /*=====================================================
    SAVE PLAN SUMMARY
    =====================================================*/

    savePlanSummary() {

        const summary = {

            plan: this.state.selectedPlan,

            billingCycle: this.state.billingCycle,

            selectedAt: new Date().toISOString()

        };

        localStorage.setItem(

            "yoviSellerPlanSummary",

            JSON.stringify(summary)

        );

    },

    /*=====================================================
    LOADING STATE
    =====================================================*/

    setLoadingState(status) {

        this.state.isLoading = status;

        document.body.classList.toggle(

            "yspp-loading",

            status

        );

    },

    /*=====================================================
    INTERSECTION OBSERVER
    =====================================================*/

    initializeIntersectionObserver() {

        const observer = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(

                            "yspp-visible"

                        );

                        observer.unobserve(

                            entry.target

                        );

                    }

                });

            },

            {

                threshold:0.15,

                rootMargin:"0px 0px -40px 0px"

            }

        );

        this.elements.planCards.forEach(card => {

            observer.observe(card);

        });

    },

    /*=====================================================
    REFRESH PAGE STATE
    =====================================================*/

    refreshPageState() {

        this.restoreBillingCycle();

        this.restoreSelectedPlan();

    },

    /*=====================================================
    RESTORE SELECTION ANIMATION
    =====================================================*/

    animateSelectedPlan() {

        const selectedCard =

            document.querySelector(

                ".yspp-plan-selected"

            );

        if (!selectedCard) return;

        selectedCard.animate(

            [

                {

                    transform:"scale(.96)"

                },

                {

                    transform:"scale(1.03)"

                },

                {

                    transform:"scale(1)"

                }

            ],

            {

                duration:450,

                easing:"ease"

            }

        );

    },

    /*=====================================================
    AUTO SAVE
    =====================================================*/

    autoSave() {

        this.saveLocalStorage();

        this.savePlanSummary();

    },

    /*=====================================================
    KEYBOARD ACCESSIBILITY
    =====================================================*/

    initializeKeyboardSupport() {

        this.elements.upgradeButtons.forEach(button => {

            button.setAttribute(

                "tabindex",

                "0"

            );

            button.addEventListener(

                "keydown",

                event => {

                    if (

                        event.key === "Enter" ||

                        event.key === " "

                    ) {

                        event.preventDefault();

                        button.click();

                    }

                }

            );

        });

        if (this.elements.monthlyButton) {

            this.elements.monthlyButton.addEventListener(

                "keydown",

                event => {

                    if (

                        event.key === "Enter" ||

                        event.key === " "

                    ) {

                        event.preventDefault();

                        this.elements.monthlyButton.click();

                    }

                }

            );

        }

        if (this.elements.annualButton) {

            this.elements.annualButton.addEventListener(

                "keydown",

                event => {

                    if (

                        event.key === "Enter" ||

                        event.key === " "

                    ) {

                        event.preventDefault();

                        this.elements.annualButton.click();

                    }

                }

            );

        }

    },

    /*=====================================================
    WINDOW RESIZE
    =====================================================*/

    initializeResizeHandler() {

        let resizeTimer;

        window.addEventListener(

            "resize",

            () => {

                clearTimeout(

                    resizeTimer

                );

                resizeTimer = setTimeout(

                    () => {

                        document.body.classList.add(

                            "yspp-resizing"

                        );

                        setTimeout(

                            () => {

                                document.body.classList.remove(

                                    "yspp-resizing"

                                );

                            },

                            150

                        );

                    },

                    100

                );

            }

        );

    },

    /*=====================================================
    PAGE VISIBILITY
    =====================================================*/

    initializeVisibilityHandler() {

        document.addEventListener(

            "visibilitychange",

            () => {

                if (

                    document.hidden

                ) {

                    this.autoSave();

                } else {

                    this.refreshPageState();

                }

            }

        );

    },

    /*=====================================================
    VALIDATE PLAN
    =====================================================*/

    validatePlanSelection() {

        if (

            !this.state.selectedPlan

        ) {

            this.showToast(

                "Please choose a subscription plan.",

                "warning"

            );

            return false;

        }

        return true;

    },

    /*=====================================================
    GET SELECTED PLAN
    =====================================================*/

    getSelectedPlanCard() {

        return document.querySelector(

            ".yspp-plan-selected"

        );

    },

    /*=====================================================
    GET BILLING CYCLE
    =====================================================*/

    getCurrentBillingCycle() {

        return this.state.billingCycle;

    },

    /*=====================================================
    REGISTER GLOBAL EVENTS
    =====================================================*/

    registerGlobalEvents() {

        this.initializeKeyboardSupport();

        this.initializeResizeHandler();

        this.initializeVisibilityHandler();

        window.addEventListener(

            "beforeunload",

            () => {

                this.autoSave();

            }

        );

    },

    /*=====================================================
    RESET PLAN
    =====================================================*/

    resetPlanSelection() {

        this.state.selectedPlan = null;

        this.state.billingCycle = "monthly";

        this.restoreBillingCycle();

        this.restoreSelectedPlan();

        this.autoSave();

    },

    /*=====================================================
    DESTROY
    =====================================================*/

    destroy() {

        this.autoSave();

    }

};

/*=========================================================
APPLICATION START
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        SellerPlans.init();

        SellerPlans.registerGlobalEvents();

    }

);









/*=====================================================
SELLER INVENTORY
PART 3A
=====================================================*/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        "use strict";

        /*=====================================================
        DOM REFERENCES
        =====================================================*/

        const ysiCartBtn =

            document.getElementById(

                "ysiCartBtn"

            );

        const ysiNotificationBtn =

            document.getElementById(

                "ysiNotificationBtn"

            );

        const ysiLogoutBtn =

            document.getElementById(

                "ysiLogoutBtn"

            );

        const ysiBackDashboard =

            document.getElementById(

                "ysiBackDashboard"

            );

        const ysiExportBtn =

            document.getElementById(

                "ysiExportBtn"

            );

        const ysiAddStockBtn =

            document.getElementById(

                "ysiAddStockBtn"

            );

        const ysiInventorySearch =

            document.getElementById(

                "ysiInventorySearch"

            );

        const ysiInventoryFilterBtn =

            document.getElementById(

                "ysiInventoryFilterBtn"

            );

        const ysiNewsletterForm =

            document.getElementById(

                "ysiNewsletterForm"

            );

        const ysiNewsletterEmail =

            document.getElementById(

                "ysiNewsletterEmail"

            );

        /*=====================================================
        TABLE
        =====================================================*/

        const ysiInventoryTable =

            document.querySelector(

                ".ysi-inventory-table"

            );

        const ysiInventoryRows =

            document.querySelectorAll(

                ".ysi-inventory-table tbody tr"

            );

        /*=====================================================
        ACTION BUTTONS
        =====================================================*/

        const ysiEditButtons =

            document.querySelectorAll(

                ".ysi-edit-product"

            );

        const ysiDeleteButtons =

            document.querySelectorAll(

                ".ysi-delete-product"

            );

        /*=====================================================
        SUMMARY CARDS
        =====================================================*/

        const ysiSummaryCards =

            document.querySelectorAll(

                ".ysi-summary-card"

            );

        /*=====================================================
        NAVIGATION
        =====================================================*/

        if(ysiBackDashboard){

            ysiBackDashboard.addEventListener(

                "click",

                function(){

                    window.location.href =

                    "../Seller/seller-dashboard.html";

                }

            );

        }

        if(ysiCartBtn){

            ysiCartBtn.addEventListener(

                "click",

                function(){

                    window.location.href =

                    "../Cart/cart.html";

                }

            );

        }

        if(ysiNotificationBtn){

            ysiNotificationBtn.addEventListener(

                "click",

                function(){

                    window.location.href =

                    "../Notifications/notifications.html";

                }

            );

        }

        if(ysiLogoutBtn){

            ysiLogoutBtn.addEventListener(

                "click",

                function(){

                    const confirmLogout =

                        confirm(

                            "Are you sure you want to sign out?"

                        );

                    if(confirmLogout){

                        localStorage.removeItem(

                            "sellerLoggedIn"

                        );

                        window.location.href =

                        "../index.html";

                    }

                }

            );

        }

        /*=====================================================
        SEARCH INVENTORY
        =====================================================*/

        if(

            ysiInventorySearch &&

            ysiInventoryRows.length

        ){

            ysiInventorySearch.addEventListener(

                "keyup",

                function(){

                    const keyword =

                        this.value

                        .toLowerCase()

                        .trim();

                    ysiInventoryRows.forEach(

                        function(row){

                            const content =

                                row.innerText

                                .toLowerCase();

                            row.style.display =

                                content.includes(keyword)

                                ? ""

                                : "none";

                        }

                    );

                }

            );

        }

               /*=====================================================
        EXPORT INVENTORY AS CSV
        =====================================================*/

        if(ysiExportBtn){

            ysiExportBtn.addEventListener(

                "click",

                function(){

                    let csv =

                        "Product,SKU,Stock,Sold,Status\n";

                    ysiInventoryRows.forEach(

                        function(row){

                            if(row.style.display === "none"){

                                return;

                            }

                            const cells =

                                row.querySelectorAll("td");

                            if(cells.length < 6){

                                return;

                            }

                            const product =

                                cells[0]

                                .innerText

                                .trim()

                                .replace(/\n/g," ");

                            const sku =

                                cells[1].innerText.trim();

                            const stock =

                                cells[2].innerText.trim();

                            const sold =

                                cells[3].innerText.trim();

                            const status =

                                cells[4].innerText.trim();

                            csv += `"${product}","${sku}","${stock}","${sold}","${status}"\n`;

                        }

                    );

                    const blob =

                        new Blob(

                            [csv],

                            {

                                type:"text/csv;charset=utf-8;"

                            }

                        );

                    const url =

                        URL.createObjectURL(blob);

                    const link =

                        document.createElement("a");

                    link.href = url;

                    link.download =

                        "inventory.csv";

                    document.body.appendChild(link);

                    link.click();

                    document.body.removeChild(link);

                    URL.revokeObjectURL(url);

                }

            );

        }

        /*=====================================================
        ADD STOCK
        =====================================================*/

        if(ysiAddStockBtn){

            ysiAddStockBtn.addEventListener(

                "click",

                function(){

                    alert(

                        "Add Stock form will be connected here."

                    );

                }

            );

        }

        /*=====================================================
        FILTER BUTTON
        =====================================================*/

        if(ysiInventoryFilterBtn){

            ysiInventoryFilterBtn.addEventListener(

                "click",

                function(){

                    alert(

                        "Inventory filters coming soon."

                    );

                }

            );

        }

        /*=====================================================
        EDIT PRODUCT
        =====================================================*/

        ysiEditButtons.forEach(

            function(button){

                button.addEventListener(

                    "click",

                    function(){

                        const row =

                            this.closest("tr");

                        const product =

                            row.querySelector(

                                ".ysi-product-cell span"

                            ).innerText;

                        alert(

                            "Edit Product:\n\n" +

                            product

                        );

                    }

                );

            }

        );

        /*=====================================================
        DELETE PRODUCT
        =====================================================*/

        ysiDeleteButtons.forEach(

            function(button){

                button.addEventListener(

                    "click",

                    function(){

                        const row =

                            this.closest("tr");

                        const product =

                            row.querySelector(

                                ".ysi-product-cell span"

                            ).innerText;

                        const confirmed =

                            confirm(

                                `Delete "${product}" from inventory?`

                            );

                        if(confirmed){

                            row.remove();

                        }

                    }

                );

            }

        );

        /*=====================================================
        NEWSLETTER SUBMISSION
        =====================================================*/

        if(ysiNewsletterForm){

            ysiNewsletterForm.addEventListener(

                "submit",

                function(event){

                    event.preventDefault();

                    const email =

                        ysiNewsletterEmail.value.trim();

                    const emailPattern =

                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if(

                        !emailPattern.test(email)

                    ){

                        alert(

                            "Please enter a valid email address."

                        );

                        return;

                    }

                    alert(

                        "Thank you for subscribing!"

                    );

                    this.reset();

                }

            );

        }

        /*=====================================================
        SUMMARY CARD ANIMATION
        =====================================================*/

        ysiSummaryCards.forEach(

            function(card,index){

                card.style.opacity = "0";

                card.style.transform =

                    "translateY(25px)";

                setTimeout(

                    function(){

                        card.style.transition =

                            "all .5s ease";

                        card.style.opacity = "1";

                        card.style.transform =

                            "translateY(0)";

                    },

                    index * 120

                );

            }

        );

              /*=====================================================
        RIPPLE EFFECT
        =====================================================*/

        function ysiCreateRipple(event){

            const button = event.currentTarget;

            const ripple =

                document.createElement("span");

            ripple.classList.add(

                "ysi-ripple"

            );

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

                (event.clientX - rect.left - size / 2) + "px";

            ripple.style.top =

                (event.clientY - rect.top - size / 2) + "px";

            button.style.position = "relative";

            button.style.overflow = "hidden";

            button.appendChild(ripple);

            ripple.addEventListener(

                "animationend",

                function(){

                    ripple.remove();

                }

            );

        }

        document.querySelectorAll(

            ".ysi-export-btn, .ysi-add-stock-btn, .ysi-filter-btn, .ysi-action-btn, .ysi-nav-icon"

        ).forEach(

            function(button){

                button.addEventListener(

                    "click",

                    ysiCreateRipple

                );

            }

        );

        /*=====================================================
        TABLE ROW HOVER
        =====================================================*/

        ysiInventoryRows.forEach(

            function(row){

                row.addEventListener(

                    "mouseenter",

                    function(){

                        this.style.transition =

                            "all .25s ease";

                    }

                );

            }

        );

        /*=====================================================
        PRODUCT IMAGE CLICK
        =====================================================*/

        document.querySelectorAll(

            ".ysi-product-image"

        ).forEach(

            function(image){

                image.addEventListener(

                    "click",

                    function(){

                        const product =

                            this.closest("tr")

                            .querySelector(

                                ".ysi-product-cell span"

                            )

                            .innerText;

                        alert(

                            "Preview for:\n\n" +

                            product

                        );

                    }

                );

            }

        );

        /*=====================================================
        BUTTON LOADING EFFECT
        =====================================================*/

        function ysiButtonLoading(

            button,

            duration = 800

        ){

            if(!button) return;

            button.classList.add(

                "ysi-btn-loading"

            );

            button.disabled = true;

            setTimeout(

                function(){

                    button.classList.remove(

                        "ysi-btn-loading"

                    );

                    button.disabled = false;

                },

                duration

            );

        }

        if(ysiExportBtn){

            ysiExportBtn.addEventListener(

                "click",

                function(){

                    ysiButtonLoading(this);

                }

            );

        }

        if(ysiAddStockBtn){

            ysiAddStockBtn.addEventListener(

                "click",

                function(){

                    ysiButtonLoading(this);

                }

            );

        }

        /*=====================================================
        KEYBOARD SHORTCUTS
        =====================================================*/

        document.addEventListener(

            "keydown",

            function(event){

                if(

                    event.ctrlKey &&

                    event.key.toLowerCase() === "f"

                ){

                    event.preventDefault();

                    ysiInventorySearch.focus();

                }

                if(

                    event.altKey &&

                    event.key.toLowerCase() === "a"

                ){

                    event.preventDefault();

                    ysiAddStockBtn.click();

                }

                if(

                    event.altKey &&

                    event.key.toLowerCase() === "e"

                ){

                    event.preventDefault();

                    ysiExportBtn.click();

                }

            }

        );

               /*=====================================================
        SAVE INVENTORY PAGE STATE
        =====================================================*/

        function ysiSavePageState(){

            const pageState = {

                searchValue:

                    ysiInventorySearch

                    ? ysiInventorySearch.value

                    : "",

                lastVisited:

                    new Date().toISOString()

            };

            localStorage.setItem(

                "ysiInventoryPageState",

                JSON.stringify(pageState)

            );

        }

        function ysiRestorePageState(){

            const savedState =

                localStorage.getItem(

                    "ysiInventoryPageState"

                );

            if(!savedState){

                return;

            }

            try{

                const pageState =

                    JSON.parse(savedState);

                if(

                    ysiInventorySearch &&

                    pageState.searchValue

                ){

                    ysiInventorySearch.value =

                        pageState.searchValue;

                    ysiInventorySearch.dispatchEvent(

                        new Event("keyup")

                    );

                }

            }

            catch(error){

                console.error(error);

            }

        }

        ysiRestorePageState();

        window.addEventListener(

            "beforeunload",

            ysiSavePageState

        );

        /*=====================================================
        INVENTORY SUMMARY REFRESH
        =====================================================*/

        function ysiRefreshInventoryStats(){

            const rows =

                document.querySelectorAll(

                    ".ysi-inventory-table tbody tr"

                );

            const totalProducts = rows.length;

            const lowStockProducts =

                Array.from(rows).filter(

                    function(row){

                        const stock = parseInt(

                            row.children[2]

                            .innerText

                        );

                        return stock <= 10;

                    }

                ).length;

            const summaryValues =

                document.querySelectorAll(

                    ".ysi-summary-value"

                );

            if(summaryValues.length >= 2){

                summaryValues[0].textContent =

                    totalProducts;

                summaryValues[1].textContent =

                    lowStockProducts;

            }

        }

        ysiRefreshInventoryStats();

        /*=====================================================
        EMPTY TABLE CHECK
        =====================================================*/

        function ysiCheckEmptyInventory(){

            const visibleRows =

                Array.from(

                    document.querySelectorAll(

                        ".ysi-inventory-table tbody tr"

                    )

                ).filter(

                    function(row){

                        return row.style.display !== "none";

                    }

                );

            let emptyState =

                document.getElementById(

                    "ysiEmptyState"

                );

            if(

                visibleRows.length === 0

            ){

                if(!emptyState){

                    emptyState =

                        document.createElement(

                            "div"

                        );

                    emptyState.id =

                        "ysiEmptyState";

                    emptyState.className =

                        "ysi-empty-state";

                    emptyState.innerHTML =

                        '<i class="bi bi-box-seam"></i>' +

                        '<h4>No Products Found</h4>' +

                        '<p>Try another search keyword.</p>';

                    ysiInventoryTable

                        .parentElement

                        .appendChild(

                            emptyState

                        );

                }

            }

            else if(emptyState){

                emptyState.remove();

            }

        }

        if(ysiInventorySearch){

            ysiInventorySearch.addEventListener(

                "keyup",

                ysiCheckEmptyInventory

            );

        }

        /*=====================================================
        SMOOTH SCROLL TO TABLE
        =====================================================*/

        if(ysiInventorySearch){

            ysiInventorySearch.addEventListener(

                "focus",

                function(){

                    ysiInventoryTable.scrollIntoView({

                        behavior:"smooth",

                        block:"start"

                    });

                }

            );

        }

        /*=====================================================
        SIMPLE TOAST NOTIFICATION
        =====================================================*/

        function ysiShowToast(message){

            const toast =

                document.createElement(

                    "div"

                );

            toast.className =

                "ysi-floating-btn";

            toast.style.width =

                "auto";

            toast.style.height =

                "auto";

            toast.style.padding =

                "14px 20px";

            toast.style.borderRadius =

                "12px";

            toast.style.cursor =

                "default";

            toast.textContent =

                message;

            document.body.appendChild(

                toast

            );

            setTimeout(function(){

                toast.remove();

            },2500);

        }

        /*=====================================================
        DELETE SUCCESS TOAST
        =====================================================*/

        ysiDeleteButtons.forEach(

            function(button){

                button.addEventListener(

                    "click",

                    function(){

                        setTimeout(function(){

                            ysiRefreshInventoryStats();

                            ysiCheckEmptyInventory();

                            ysiShowToast(

                                "Inventory updated."

                            );

                        },100);

                    }

                );

            }

        );

               /*=====================================================
        SESSION VALIDATION
        =====================================================*/

        // const ysiSellerSession =

        //     localStorage.getItem(

        //         "sellerLoggedIn"

        //     );

        // if(ysiSellerSession !== "true"){

        //     window.location.href =

        //     "../auth/signin.html";

        // }

        /*=====================================================
        RESTORE SCROLL POSITION
        =====================================================*/

        const ysiSavedScroll =

            sessionStorage.getItem(

                "ysiInventoryScroll"

            );

        if(ysiSavedScroll){

            window.scrollTo(

                0,

                parseInt(ysiSavedScroll,10)

            );

        }

        window.addEventListener(

            "beforeunload",

            function(){

                sessionStorage.setItem(

                    "ysiInventoryScroll",

                    window.scrollY

                );

            }

        );

        /*=====================================================
        BOOTSTRAP TOOLTIPS
        =====================================================*/

        document.querySelectorAll(

            '[data-bs-toggle="tooltip"]'

        ).forEach(function(element){

            new bootstrap.Tooltip(

                element

            );

        });

        /*=====================================================
        BOOTSTRAP POPOVERS
        =====================================================*/

        document.querySelectorAll(

            '[data-bs-toggle="popover"]'

        ).forEach(function(element){

            new bootstrap.Popover(

                element

            );

        });

        /*=====================================================
        PAGE FADE-IN
        =====================================================*/

        document.body.style.opacity = "0";

        window.addEventListener(

            "load",

            function(){

                document.body.style.transition =

                    "opacity .35s ease";

                document.body.style.opacity = "1";

            }

        );

        /*=====================================================
        IMAGE FALLBACKS
        =====================================================*/

        document.querySelectorAll(

            ".ysi-product-image, .ysi-profile-image"

        ).forEach(function(image){

            image.addEventListener(

                "error",

                function(){

                    this.src =

                        "https://placehold.co/60x60?text=Image";

                }

            );

        });

        /*=====================================================
        PERFORMANCE LOGGER
        =====================================================*/

        window.addEventListener(

            "load",

            function(){

                console.log(

                    "Seller Inventory page loaded successfully."

                );

                if(

                    performance &&

                    performance.now

                ){

                    console.log(

                        "Load Time:",

                        Math.round(

                            performance.now()

                        ) + "ms"

                    );

                }

            }

        );

        /*=====================================================
        PAGE VISIT HISTORY
        =====================================================*/

        localStorage.setItem(

            "ysiLastVisitedPage",

            "seller-inventory"

        );

        localStorage.setItem(

            "ysiLastVisitTime",

            new Date().toISOString()

        );

        /*=====================================================
        CLEANUP
        =====================================================*/

        window.addEventListener(

            "beforeunload",

            function(){

                console.log(

                    "Leaving Seller Inventory page..."

                );

            }

        );

        /*=====================================================
        MODULE INITIALIZED
        =====================================================*/

        console.log(

            "YOVI Seller Inventory module initialized successfully."

        );

    }

);


/*==================================
   SELLER ANALYTICS PAGE 
 ===================================*/

"use strict";

document.addEventListener(

    "DOMContentLoaded",

    function(){

        /*=====================================================
        PAGE ELEMENTS
        =====================================================*/

        const ysaAnalyticsPage =

            document.getElementById(

                "ysaAnalyticsPage"

            );

        const ysaBackDashboard =

            document.getElementById(

                "ysaBackDashboard"

            );

        const ysaCartBtn =

            document.getElementById(

                "ysaCartBtn"

            );

        const ysaNotificationBtn =

            document.getElementById(

                "ysaNotificationBtn"

            );

        const ysaLogoutBtn =

            document.getElementById(

                "ysaLogoutBtn"

            );

        const ysaNewsletterForm =

            document.getElementById(

                "ysaNewsletterForm"

            );

        const ysaNewsletterEmail =

            document.getElementById(

                "ysaNewsletterEmail"

            );

        const ysaStatCards =

            document.querySelectorAll(

                ".ysa-stat-card"

            );

        const ysaAnalyticsCards =

            document.querySelectorAll(

                ".ysa-card"

            );

        const ysaProductRows =

            document.querySelectorAll(

                ".ysa-table-card tbody tr"

            );

        const ysaProgressBars =

            document.querySelectorAll(

                ".ysa-progress .progress-bar"

            );

        const ysaFunnelItems =

            document.querySelectorAll(

                ".ysa-funnel-item"

            );

        const ysaProductImages =

            document.querySelectorAll(

                ".ysa-product-image"

            );

        /*=====================================================
        PAGE NAVIGATION
        =====================================================*/

        if(ysaBackDashboard){

            ysaBackDashboard.addEventListener(

                "click",

                function(){

                    window.location.href =

                        "../../seller/seller-dashboard.html";

                }

            );

        }

        if(ysaCartBtn){

            ysaCartBtn.addEventListener(

                "click",

                function(){

                    window.location.href =

                        "../cart.html";

                }

            );

        }

        if(ysaNotificationBtn){

            ysaNotificationBtn.addEventListener(

                "click",

                function(){

                    window.location.href =

                        "../notifications.html";

                }

            );

        }

        /*=====================================================
        LOGOUT
        =====================================================*/

        if(ysaLogoutBtn){

            ysaLogoutBtn.addEventListener(

                "click",

                function(){

                    const confirmLogout =

                        confirm(

                            "Are you sure you want to sign out?"

                        );

                    if(!confirmLogout){

                        return;

                    }

                    localStorage.removeItem(

                        "sellerLoggedIn"

                    );

                    window.location.href =

                        "../auth/login.html";

                }

            );

        }

        /*=====================================================
        NEWSLETTER SUBSCRIPTION
        =====================================================*/

        if(ysaNewsletterForm){

            ysaNewsletterForm.addEventListener(

                "submit",

                function(event){

                    event.preventDefault();

                    const email =

                        ysaNewsletterEmail.value.trim();

                    if(email === ""){

                        alert(

                            "Please enter your email address."

                        );

                        return;

                    }

                    alert(

                        "Newsletter subscription successful!"

                    );

                    this.reset();

                }

            );

        }

              /*=====================================================
        STATISTICS CARD ANIMATION
        =====================================================*/

        ysaStatCards.forEach(function(card, index){

            card.style.opacity = "0";

            card.style.transform = "translateY(30px)";

            setTimeout(function(){

                card.style.transition =

                    "all .45s ease";

                card.style.opacity = "1";

                card.style.transform =

                    "translateY(0)";

            }, index * 120);

        });

        /*=====================================================
        CONTENT CARD ANIMATION
        =====================================================*/

        ysaAnalyticsCards.forEach(function(card, index){

            card.style.opacity = "0";

            card.style.transform = "translateY(35px)";

            setTimeout(function(){

                card.style.transition =

                    "all .5s ease";

                card.style.opacity = "1";

                card.style.transform =

                    "translateY(0)";

            }, 450 + (index * 180));

        });

        /*=====================================================
        PROGRESS BAR ANIMATION
        =====================================================*/

        ysaProgressBars.forEach(function(bar){

            const targetWidth =

                bar.style.width;

            bar.style.width = "0";

            setTimeout(function(){

                bar.style.width = targetWidth;

            }, 700);

        });

        /*=====================================================
        CONVERSION FUNNEL ANIMATION
        =====================================================*/

        ysaFunnelItems.forEach(function(item, index){

            item.style.opacity = "0";

            item.style.transform =

                "translateX(-25px)";

            setTimeout(function(){

                item.style.transition =

                    "all .45s ease";

                item.style.opacity = "1";

                item.style.transform =

                    "translateX(0)";

            }, 900 + (index * 150));

        });

        /*=====================================================
        PRODUCT TABLE ROW HOVER EFFECT
        =====================================================*/

        ysaProductRows.forEach(function(row){

            row.addEventListener(

                "mouseenter",

                function(){

                    this.style.transform =

                        "scale(1.01)";

                }

            );

            row.addEventListener(

                "mouseleave",

                function(){

                    this.style.transform =

                        "scale(1)";

                }

            );

        });

        /*=====================================================
        PRODUCT IMAGE INTERACTION
        =====================================================*/

        ysaProductImages.forEach(function(image){

            image.addEventListener(

                "click",

                function(){

                    alert(

                        "Product preview will be available in a future update."

                    );

                }

            );

        });

               /*=====================================================
        INTERSECTION OBSERVER
        Animate cards when they enter the viewport
        =====================================================*/

        const ysaObserver = new IntersectionObserver(

            function(entries){

                entries.forEach(function(entry){

                    if(entry.isIntersecting){

                        entry.target.classList.add(

                            "ysa-fade-in"

                        );

                    }

                });

            },

            {

                threshold:0.20

            }

        );

        ysaAnalyticsCards.forEach(function(card){

            ysaObserver.observe(card);

        });

        ysaStatCards.forEach(function(card){

            ysaObserver.observe(card);

        });

        /*=====================================================
        PRODUCT ROW RIPPLE EFFECT
        =====================================================*/

        ysaProductRows.forEach(function(row){

            row.addEventListener(

                "click",

                function(){

                    this.animate(

                        [

                            {

                                transform:"scale(1)"

                            },

                            {

                                transform:"scale(.98)"

                            },

                            {

                                transform:"scale(1)"

                            }

                        ],

                        {

                            duration:220,

                            easing:"ease"

                        }

                    );

                }

            );

        });

        /*=====================================================
        REFRESH ANALYTICS
        =====================================================*/

        function ysaRefreshAnalytics(){

            ysaProgressBars.forEach(function(bar){

                const width = bar.style.width;

                bar.style.width = "0";

                setTimeout(function(){

                    bar.style.width = width;

                },250);

            });

        }

        /*=====================================================
        AUTO REFRESH
        =====================================================*/

        const ysaRefreshInterval =

            setInterval(function(){

                ysaRefreshAnalytics();

            },30000);

        /*=====================================================
        PRODUCT IMAGE LOADING
        =====================================================*/

        ysaProductImages.forEach(function(image){

            image.addEventListener(

                "load",

                function(){

                    image.classList.remove(

                        "ysa-skeleton"

                    );

                }

            );

        });

        /*=====================================================
        CONSOLE INFO
        =====================================================*/

        console.log(

            "Seller Analytics initialized successfully."

        );

               /*=====================================================
        PRODUCT TABLE ROW SELECTION
        =====================================================*/

        ysaProductRows.forEach(function (row) {

            row.addEventListener("click", function () {

                ysaProductRows.forEach(function (item) {

                    item.classList.remove("ysa-row-selected");

                });

                this.classList.add("ysa-row-selected");

            });

        });

        /*=====================================================
        PRODUCT ROW DOUBLE CLICK
        =====================================================*/

        ysaProductRows.forEach(function (row) {

            row.addEventListener("dblclick", function () {

                alert("Opening product details...");

                window.location.href = "seller-products.html";

            });

        });

        /*=====================================================
        KEYBOARD SHORTCUTS
        =====================================================*/

        document.addEventListener("keydown", function (event) {

            /* Alt + D → Dashboard */

            if (event.altKey && event.key.toLowerCase() === "d") {

                event.preventDefault();

                window.location.href = "seller-dashboard.html";

            }

            /* Alt + P → Products */

            if (event.altKey && event.key.toLowerCase() === "p") {

                event.preventDefault();

                window.location.href = "seller-products.html";

            }

            /* Alt + I → Inventory */

            if (event.altKey && event.key.toLowerCase() === "i") {

                event.preventDefault();

                window.location.href = "seller-inventory.html";

            }

            /* Alt + R → Revenue */

            if (event.altKey && event.key.toLowerCase() === "r") {

                event.preventDefault();

                window.location.href = "seller-revenue.html";

            }

        });

        /*=====================================================
        PAGE VISIBILITY
        =====================================================*/

        document.addEventListener(

            "visibilitychange",

            function () {

                if (document.hidden) {

                    console.log("Analytics page hidden.");

                } else {

                    console.log("Analytics page active.");

                }

            }

        );

        /*=====================================================
        SIMPLE PAGE TIMER
        =====================================================*/

        let ysaVisitSeconds = 0;

        setInterval(function () {

            ysaVisitSeconds++;

        }, 1000);

        window.addEventListener("beforeunload", function () {

            console.log(

                "Time spent:",

                ysaVisitSeconds,

                "seconds"

            );

        });

               /*=====================================================
        RESTORE SCROLL POSITION
        =====================================================*/

        const ysaSavedScroll =

            sessionStorage.getItem(

                "ysaAnalyticsScroll"

            );

        if(ysaSavedScroll){

            window.scrollTo(

                0,

                parseInt(

                    ysaSavedScroll,

                    10

                )

            );

        }

        window.addEventListener(

            "beforeunload",

            function(){

                sessionStorage.setItem(

                    "ysaAnalyticsScroll",

                    window.scrollY

                );

            }

        );

        /*=====================================================
        SESSION VALIDATION
        =====================================================*/

        // const ysaSellerSession =

        //     localStorage.getItem(

        //         "sellerLoggedIn"

        //     );

        // if(ysaSellerSession !== "true"){

        //     window.location.href =

        //         "../auth/signin.html";

        // }

        /*=====================================================
        BOOTSTRAP TOOLTIPS
        =====================================================*/

        document.querySelectorAll(

            '[data-bs-toggle="tooltip"]'

        ).forEach(function(element){

            new bootstrap.Tooltip(

                element

            );

        });

        /*=====================================================
        BOOTSTRAP POPOVERS
        =====================================================*/

        document.querySelectorAll(

            '[data-bs-toggle="popover"]'

        ).forEach(function(element){

            new bootstrap.Popover(

                element

            );

        });

        /*=====================================================
        PAGE FADE-IN
        =====================================================*/

        document.body.style.opacity = "0";

        window.addEventListener(

            "load",

            function(){

                document.body.style.transition =

                    "opacity .35s ease";

                document.body.style.opacity = "1";

            }

        );

        /*=====================================================
        IMAGE FALLBACK
        =====================================================*/

        ysaProductImages.forEach(function(image){

            image.addEventListener(

                "error",

                function(){

                    this.src =

                        "https://placehold.co/60x60?text=Image";

                }

            );

        });

        /*=====================================================
        SAVE LAST VISITED PAGE
        =====================================================*/

        localStorage.setItem(

            "ysaLastVisitedPage",

            "seller-analytics"

        );

        localStorage.setItem(

            "ysaLastVisitTime",

            new Date().toISOString()

        );

        /*=====================================================
        CLEANUP
        =====================================================*/

        window.addEventListener(

            "beforeunload",

            function(){

                clearInterval(

                    ysaRefreshInterval

                );

                console.log(

                    "Leaving Seller Analytics page..."

                );

            }

        );

        /*=====================================================
        MODULE INITIALIZED
        =====================================================*/

        console.log(

            "YOVI Seller Analytics module initialized successfully."

        );

    }

);


/*=========================================================
BUYER REVIEWS CENTRE
PART 3A
=========================================================*/

/*=========================================================
APPLICATION
=========================================================*/

const BuyerReviewsCentre = {

    /*=========================================
    LOCAL STORAGE KEYS
    =========================================*/

    storage: {

        submittedReviews: "yoviSubmittedReviews",

        pendingReviews: "yoviPendingReviews"

    },

    /*=========================================
    APPLICATION STATE
    =========================================*/

    state: {

        activeTab: "pending",

        selectedRatings: {},

        submittedReviews: [],

        pendingReviews: []

    },

    /*=========================================
    DOM ELEMENTS
    =========================================*/

    elements: {},

    /*=========================================
    INITIALIZE
    =========================================*/

    init() {

        this.cacheDOM();

        this.loadLocalStorage();

        this.restoreRatings();

        this.restoreSubmittedReviews();

        this.bindEvents();

        this.updateTabCounts();

        this.updateEmptyState();

    },

    /*=========================================
    CACHE DOM
    =========================================*/

    cacheDOM() {

        this.elements.pendingTab =
            document.getElementById("cbrcPendingTab");

        this.elements.submittedTab =
            document.getElementById("cbrcSubmittedTab");

        this.elements.tabs =
            document.querySelectorAll(".cbrc-tab");

        this.elements.reviewCards =
            document.querySelectorAll(".cbrc-review-card");

        this.elements.starGroups =
            document.querySelectorAll(".cbrc-rating-stars");

        this.elements.textareas =
            document.querySelectorAll(".cbrc-review-textarea");

        this.elements.submitButtons =
            document.querySelectorAll(".cbrc-submit-review-btn");

        this.elements.remindButtons =
            document.querySelectorAll(".cbrc-remind-btn");

        this.elements.emptyState =
            document.getElementById("cbrcEmptyState");

        this.elements.toast =
            document.getElementById("cbrcSuccessToast");

    },

    /*=========================================
    LOAD LOCAL STORAGE
    =========================================*/

    loadLocalStorage() {

        const submitted =
            localStorage.getItem(this.storage.submittedReviews);

        const pending =
            localStorage.getItem(this.storage.pendingReviews);

        this.state.submittedReviews =
            submitted ? JSON.parse(submitted) : [];

        this.state.pendingReviews =
            pending ? JSON.parse(pending) : [];

    },

    /*=========================================
    SAVE LOCAL STORAGE
    =========================================*/

    saveLocalStorage() {

        localStorage.setItem(

            this.storage.submittedReviews,

            JSON.stringify(this.state.submittedReviews)

        );

        localStorage.setItem(

            this.storage.pendingReviews,

            JSON.stringify(this.state.pendingReviews)

        );

    },

    /*=========================================
    RESTORE SAVED RATINGS
    =========================================*/

    restoreRatings() {

        const ratings =
            localStorage.getItem("yoviReviewRatings");

        if (!ratings) return;

        this.state.selectedRatings =
            JSON.parse(ratings);

    },

    /*=========================================
    SAVE RATINGS
    =========================================*/

    saveRatings() {

        localStorage.setItem(

            "yoviReviewRatings",

            JSON.stringify(this.state.selectedRatings)

        );

    },

    /*=========================================
    BIND EVENTS
    =========================================*/

    bindEvents() {

        /*-------------------------------
        Tabs
        -------------------------------*/

        this.elements.tabs.forEach(tab => {

            tab.addEventListener("click", () => {

                this.switchTab(

                    tab.dataset.tab

                );

            });

        });

        /*-------------------------------
        Submit Review Buttons
        -------------------------------*/

        this.elements.submitButtons.forEach(button => {

            button.addEventListener("click", (event) => {

                this.submitReview(event);

            });

        });

        /*-------------------------------
        Remind Me Later
        -------------------------------*/

        this.elements.remindButtons.forEach(button => {

            button.addEventListener("click", (event) => {

                this.remindLater(event);

            });

        });

        /*-------------------------------
        Check Empty State
        -------------------------------*/

        this.updateEmptyState();

    },

    /*=========================================
    SWITCH TAB
    =========================================*/

    switchTab(tabName) {

        this.state.activeTab = tabName;

        this.elements.tabs.forEach(tab => {

            tab.classList.remove("active");

        });

        document
            .querySelector(`[data-tab="${tabName}"]`)
            .classList.add("active");

        this.elements.pendingTab.classList.remove("active");

        this.elements.submittedTab.classList.remove("active");

        if (tabName === "pending") {

            this.elements.pendingTab.classList.add("active");

        } else {

            this.elements.submittedTab.classList.add("active");

        }

        this.updateEmptyState();

    },

    /*=========================================
    UPDATE EMPTY STATE
    =========================================*/

    updateEmptyState() {

        if (!this.elements.emptyState) {

            return;

        }

        const pendingCount =

            this.elements.pendingTab
                ?.querySelectorAll(".cbrc-review-card")
                .length || 0;

        const submittedCount =

            this.elements.submittedTab
                ?.querySelectorAll(".cbrc-review-card")
                .length || 0;

        let showEmpty = false;

        if (

            this.state.activeTab === "pending" &&

            pendingCount === 0

        ) {

            showEmpty = true;

        }

        if (

            this.state.activeTab === "submitted" &&

            submittedCount === 0

        ) {

            showEmpty = true;

        }

        if (showEmpty) {

            this.elements.emptyState.classList.remove("d-none");

        } else {

            this.elements.emptyState.classList.add("d-none");

        }

    },

    /*=========================================
    RESTORE SUBMITTED REVIEWS
    =========================================*/

    restoreSubmittedReviews() {

        if (

            !this.state.submittedReviews ||

            !this.state.submittedReviews.length

        ) {

            return;

        }

        this.state.submittedReviews.forEach(review => {

            const card = document.querySelector(

                `[data-review-id="${review.id}"]`

            );

            if (!card) return;

            card.classList.add("cbrc-review-submitted");

        });

    },

    /*=========================================
    INITIALIZE STAR RATING
    =========================================*/

    initializeStarRatings() {

        this.elements.starGroups.forEach(group => {

            const stars = group.querySelectorAll("i");

            stars.forEach(star => {

                /*-------------------------------
                Hover
                -------------------------------*/

                star.addEventListener("mouseenter", () => {

                    const value = Number(star.dataset.value);

                    this.previewRating(group, value);

                });

                /*-------------------------------
                Click
                -------------------------------*/

                star.addEventListener("click", () => {

                    const value = Number(star.dataset.value);

                    const reviewCard = star.closest(".cbrc-review-card");

                    const reviewId = reviewCard.dataset.reviewId;

                    this.setRating(

                        reviewId,

                        group,

                        value

                    );

                });

            });

            /*-------------------------------
            Mouse Leave
            -------------------------------*/

            group.addEventListener("mouseleave", () => {

                const reviewCard = group.closest(".cbrc-review-card");

                const reviewId = reviewCard.dataset.reviewId;

                const savedRating =

                    this.state.selectedRatings[reviewId] || 0;

                this.renderRating(

                    group,

                    savedRating

                );

            });

        });

    },

    /*=========================================
    STAR HOVER PREVIEW
    =========================================*/

    previewRating(group, rating) {

        const stars = group.querySelectorAll("i");

        stars.forEach(star => {

            const value = Number(star.dataset.value);

            if (value <= rating) {

                star.classList.remove("bi-star");

                star.classList.add(

                    "bi-star-fill",

                    "cbrc-active"

                );

            } else {

                star.classList.remove(

                    "bi-star-fill",

                    "cbrc-active"

                );

                star.classList.add("bi-star");

            }

        });

    },

    /*=========================================
    SAVE RATING
    =========================================*/

    setRating(reviewId, group, rating) {

        this.state.selectedRatings[reviewId] = rating;

        this.saveRatings();

        this.renderRating(

            group,

            rating

        );

        const text = group.parentElement.querySelector(

            ".cbrc-rating-text"

        );

        if (text) {

            text.textContent =

                `${rating} / 5 Selected`;

        }

    },

    /*=========================================
    RENDER STAR RATING
    =========================================*/

    renderRating(group, rating) {

        const stars = group.querySelectorAll("i");

        stars.forEach(star => {

            const value = Number(star.dataset.value);

            if (value <= rating) {

                star.classList.remove("bi-star");

                star.classList.add(

                    "bi-star-fill",

                    "cbrc-active"

                );

            } else {

                star.classList.remove(

                    "bi-star-fill",

                    "cbrc-active"

                );

                star.classList.add("bi-star");

            }

        });

    },

    /*=========================================
    RESTORE SAVED STAR RATINGS
    =========================================*/

    restoreStarRatings() {

        this.elements.starGroups.forEach(group => {

            const reviewCard =

                group.closest(".cbrc-review-card");

            const reviewId =

                reviewCard.dataset.reviewId;

            const rating =

                this.state.selectedRatings[reviewId] || 0;

            this.renderRating(

                group,

                rating

            );

            const text = group.parentElement.querySelector(

                ".cbrc-rating-text"

            );

            if (text && rating > 0) {

                text.textContent =

                    `${rating} / 5 Selected`;

            }

        });

    },

    /*=========================================
    SUBMIT REVIEW
    =========================================*/

    submitReview(event) {

        const button = event.currentTarget;

        const reviewCard = button.closest(

            ".cbrc-review-card"

        );

        const reviewId = reviewCard.dataset.reviewId;

        const textarea = reviewCard.querySelector(

            ".cbrc-review-textarea"

        );

        const reviewText = textarea.value.trim();

        const rating =

            this.state.selectedRatings[reviewId] || 0;

        /*-------------------------------
        VALIDATION
        -------------------------------*/

        if (rating === 0) {

            alert("Please select a star rating.");

            return;

        }

        if (reviewText.length < 10) {

            alert(

                "Your review must contain at least 10 characters."

            );

            textarea.focus();

            return;

        }

        /*-------------------------------
        LOADING STATE
        -------------------------------*/

        reviewCard.classList.add("cbrc-loading");

        button.disabled = true;

        setTimeout(() => {

            this.completeSubmission(

                reviewCard,

                reviewId,

                rating,

                reviewText

            );

        }, 1000);

    },

    /*=========================================
    COMPLETE SUBMISSION
    =========================================*/

    completeSubmission(

        reviewCard,

        reviewId,

        rating,

        reviewText

    ) {

        reviewCard.classList.remove(

            "cbrc-loading"

        );

        reviewCard.classList.add(

            "cbrc-review-submitted"

        );

        this.state.submittedReviews.push({

            id: reviewId,

            rating,

            review: reviewText,

            submittedAt: Date.now()

        });

        this.saveLocalStorage();

        /*-------------------------------
        MOVE CARD
        -------------------------------*/

        if (this.elements.submittedTab) {

            this.elements.submittedTab.appendChild(

                reviewCard

            );

        }

        /*-------------------------------
        REMOVE INPUTS
        -------------------------------*/

        const inputArea = reviewCard.querySelector(

            ".cbrc-review-input"

        );

        const actionArea = reviewCard.querySelector(

            ".cbrc-review-actions"

        );

        const ratingText = reviewCard.querySelector(

            ".cbrc-rating-text"

        );

        if (inputArea) {

            inputArea.remove();

        }

        if (actionArea) {

            actionArea.remove();

        }

        if (ratingText) {

            ratingText.textContent =

                "Review Submitted";

        }

        this.showToast(

            "Review submitted successfully."

        );

        this.updateTabCounts();

        this.updateEmptyState();

    },

    /*=========================================
    UPDATE TAB COUNTS
    =========================================*/

    updateTabCounts() {

        const pendingCount =

            this.elements.pendingTab.querySelectorAll(

                ".cbrc-review-card"

            ).length;

        const submittedCount =

            this.elements.submittedTab.querySelectorAll(

                ".cbrc-review-card"

            ).length;

        const pendingTabButton = document.querySelector(

            '[data-tab="pending"]'

        );

        const submittedTabButton = document.querySelector(

            '[data-tab="submitted"]'

        );

        if (pendingTabButton) {

            pendingTabButton.textContent =

                `Pending Reviews (${pendingCount})`;

        }

        if (submittedTabButton) {

            submittedTabButton.textContent =

                `Submitted (${submittedCount})`;

        }

    },

    /*=========================================
    RESET REVIEW FORM
    =========================================*/

    resetReviewForm(card) {

        const textarea = card.querySelector(

            ".cbrc-review-textarea"

        );

        const stars = card.querySelector(

            ".cbrc-rating-stars"

        );

        const ratingText = card.querySelector(

            ".cbrc-rating-text"

        );

        if (textarea) {

            textarea.value = "";

        }

        if (stars) {

            this.renderRating(

                stars,

                0

            );

        }

        if (ratingText) {

            ratingText.textContent =

                "Tap to rate";

        }

        const reviewId = card.dataset.reviewId;

        delete this.state.selectedRatings[reviewId];

        this.saveRatings();

    },

    /*=========================================
    PAGE NAVIGATION
    =========================================*/

    navigate(page) {

        window.location.href = page;

    },

    /*=========================================
    GLOBAL EVENT HANDLERS
    =========================================*/

    registerGlobalEvents() {

        window.addEventListener("beforeunload", () => {

            this.saveLocalStorage();

            this.saveRatings();

        });

        document.addEventListener("visibilitychange", () => {

            if (!document.hidden) {

                this.updateTabCounts();

                this.updateEmptyState();

            }

        });

    }

};

/*=========================================================
APPLICATION START
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    BuyerReviewsCentre.init();

    BuyerReviewsCentre.registerGlobalEvents();

});








/*=========================================================
BUYER NEIGHBOURHOOD
PART 3A
=========================================================*/

const BuyerNeighbourhood = {

    /*=====================================================
    LOCAL STORAGE KEYS
    =====================================================*/

    storage: {

        location: "yoviBuyerLocation",

        favouriteProducts: "yoviFavouriteProducts",

        recentProviders: "yoviRecentProviders"

    },

    /*=====================================================
    APPLICATION STATE
    =====================================================*/

    state: {

        currentLocation: "Ikeja, Lagos",

        favouriteProducts: [],

        recentProviders: [],

        isLoading: false

    },

    /*=====================================================
    DOM ELEMENTS
    =====================================================*/

    elements: {},

    /*=====================================================
    INITIALIZE
    =====================================================*/

    init() {

        this.cacheDOM();

        this.loadLocalStorage();

        this.restoreLocation();

        this.bindEvents();

        this.initializeAnimations();

    },

    /*=====================================================
    CACHE DOM
    =====================================================*/

    cacheDOM() {

        this.elements.locationText =

            document.querySelector(

                ".cbnh-current-location"

            );

        this.elements.changeLocation =

            document.querySelector(

                ".cbnh-location-change"

            );

        this.elements.liveFeedButton =

            document.querySelector(

                ".cbnh-live-feed-btn"

            );

        this.elements.productCards =

            document.querySelectorAll(

                ".cbnh-product-card"

            );

        this.elements.providerCards =

            document.querySelectorAll(

                ".cbnh-provider-card"

            );

        this.elements.statCards =

            document.querySelectorAll(

                ".cbnh-stat-card"

            );

    },

    /*=====================================================
    LOAD LOCAL STORAGE
    =====================================================*/

    loadLocalStorage() {

        const savedLocation =

            localStorage.getItem(

                this.storage.location

            );

        const favourites =

            localStorage.getItem(

                this.storage.favouriteProducts

            );

        const providers =

            localStorage.getItem(

                this.storage.recentProviders

            );

        if (savedLocation) {

            this.state.currentLocation =

                savedLocation;

        }

        this.state.favouriteProducts =

            favourites

                ? JSON.parse(favourites)

                : [];

        this.state.recentProviders =

            providers

                ? JSON.parse(providers)

                : [];

    },

    /*=====================================================
    SAVE LOCAL STORAGE
    =====================================================*/

    saveLocalStorage() {

        localStorage.setItem(

            this.storage.location,

            this.state.currentLocation

        );

        localStorage.setItem(

            this.storage.favouriteProducts,

            JSON.stringify(

                this.state.favouriteProducts

            )

        );

        localStorage.setItem(

            this.storage.recentProviders,

            JSON.stringify(

                this.state.recentProviders

            )

        );

    },

    /*=====================================================
    RESTORE LOCATION
    =====================================================*/

    restoreLocation() {

        if (

            this.elements.locationText

        ) {

            this.elements.locationText.textContent =

                this.state.currentLocation;

        }

    },

    /*=====================================================
    BIND EVENTS
    =====================================================*/

    bindEvents() {

        /*-----------------------------------------
        Change Location
        -----------------------------------------*/

        if (this.elements.changeLocation) {

            this.elements.changeLocation.addEventListener(

                "click",

                this.handleLocationChange.bind(this)

            );

        }

        /*-----------------------------------------
        Live Feed
        -----------------------------------------*/

        if (this.elements.liveFeedButton) {

            this.elements.liveFeedButton.addEventListener(

                "click",

                this.openLiveFeed.bind(this)

            );

        }

        /*-----------------------------------------
        Product Cards
        -----------------------------------------*/

        this.elements.productCards.forEach(card => {

            card.addEventListener(

                "click",

                this.handleProductClick.bind(this)

            );

        });

        /*-----------------------------------------
        Provider Cards
        -----------------------------------------*/

        this.elements.providerCards.forEach(card => {

            card.addEventListener(

                "click",

                this.handleProviderClick.bind(this)

            );

        });

    },

    /*=====================================================
    CHANGE LOCATION
    =====================================================*/

    handleLocationChange(event) {

        event.preventDefault();

        window.location.href =

            "buyer-change-location.html";

    },

    /*=====================================================
    LIVE FEED
    =====================================================*/

    openLiveFeed(event) {

        event.preventDefault();

        this.elements.liveFeedButton.classList.add(

            "cbnh-btn-loading"

        );

        setTimeout(() => {

            window.location.href =

                "buyer-live-feed.html";

        }, 500);

    },

    /*=====================================================
    PRODUCT CLICK
    =====================================================*/

    handleProductClick(event) {

        const card = event.currentTarget;

        card.classList.add("cbnh-card-active");

        setTimeout(() => {

            card.classList.remove(

                "cbnh-card-active"

            );

        }, 180);

    },

    /*=====================================================
    PROVIDER CLICK
    =====================================================*/

    handleProviderClick(event) {

        const card = event.currentTarget;

        const providerName =

            card.querySelector("h4")?.textContent.trim();

        if (

            providerName &&

            !this.state.recentProviders.includes(

                providerName

            )

        ) {

            this.state.recentProviders.unshift(

                providerName

            );

            if (

                this.state.recentProviders.length > 10

            ) {

                this.state.recentProviders.pop();

            }

            this.saveLocalStorage();

        }

        card.classList.add("cbnh-card-active");

        setTimeout(() => {

            card.classList.remove(

                "cbnh-card-active"

            );

        }, 180);

    },

    /*=====================================================
    INITIALIZE ANIMATIONS
    =====================================================*/

    initializeAnimations() {

        const animatedItems = [

            ...this.elements.statCards,

            ...this.elements.productCards,

            ...this.elements.providerCards

        ];

        animatedItems.forEach((item, index) => {

            item.style.animationDelay =

                `${index * 0.08}s`;

        });

    },

    /*=====================================================
    INITIALIZE INTERSECTION OBSERVER
    =====================================================*/

    initializeIntersectionObserver() {

        const observer = new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(

                            "cbnh-visible"

                        );

                        observer.unobserve(

                            entry.target

                        );

                    }

                });

            },

            {

                threshold:0.15,

                rootMargin:"0px 0px -40px 0px"

            }

        );

        [

            ...this.elements.statCards,

            ...this.elements.productCards,

            ...this.elements.providerCards

        ].forEach(card => {

            observer.observe(card);

        });

    },

    /*=====================================================
    ANIMATE STATISTICS
    =====================================================*/

    animateStatistics() {

        this.elements.statCards.forEach(card => {

            const numberElement =

                card.querySelector("h3");

            if (!numberElement) return;

            const targetValue = parseInt(

                numberElement.textContent.replace(/\D/g, ""),

                10

            );

            if (isNaN(targetValue)) return;

            let currentValue = 0;

            const increment =

                Math.max(1, Math.ceil(targetValue / 40));

            const counter = setInterval(() => {

                currentValue += increment;

                if (currentValue >= targetValue) {

                    currentValue = targetValue;

                    clearInterval(counter);

                }

                numberElement.textContent =

                    currentValue;

            }, 25);

        });

    },

    /*=====================================================
    RESTORE RECENT PROVIDERS
    =====================================================*/

    restoreRecentProviders() {

        if (

            !this.state.recentProviders.length

        ) {

            return;

        }

        this.elements.providerCards.forEach(card => {

            const providerName =

                card.querySelector("h4")?.textContent.trim();

            if (

                this.state.recentProviders.includes(

                    providerName

                )

            ) {

                card.classList.add(

                    "cbnh-recent-provider"

                );

            }

        });

    },

    /*=====================================================
    UPDATE LOCATION
    =====================================================*/

    updateLocation(location) {

        this.state.currentLocation = location;

        this.restoreLocation();

        this.saveLocalStorage();

    },

    /*=====================================================
    REFRESH PAGE STATE
    =====================================================*/

    refreshPageState() {

        this.restoreLocation();

        this.restoreRecentProviders();

    },

    /*=====================================================
    SHOW TOAST MESSAGE
    =====================================================*/

    showToast(message, type = "success") {

        const existingToast = document.querySelector("#cbnhToast");

        if (existingToast) {

            existingToast.remove();

        }

        const toast = document.createElement("div");

        toast.id = "cbnhToast";

        toast.className = `toast align-items-center text-bg-${type} border-0 position-fixed`;

        toast.style.top = "20px";

        toast.style.right = "20px";

        toast.style.zIndex = "1080";

        toast.innerHTML = `

            <div class="d-flex">

                <div class="toast-body">

                    ${message}

                </div>

                <button type="button"
                        class="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast">

                </button>

            </div>

        `;

        document.body.appendChild(toast);

        const bsToast = new bootstrap.Toast(toast, {

            delay:2500

        });

        bsToast.show();

        toast.addEventListener("hidden.bs.toast", () => {

            toast.remove();

        });

    },

    /*=====================================================
    SAVE PRODUCT AS FAVOURITE
    =====================================================*/

    saveFavouriteProduct(card) {

        const productName =

            card.querySelector("h4")?.textContent.trim();

        if (!productName) return;

        if (

            !this.state.favouriteProducts.includes(

                productName

            )

        ) {

            this.state.favouriteProducts.push(

                productName

            );

            this.saveLocalStorage();

            this.showToast(

                "Product added to favourites."

            );

        }

    },

    /*=====================================================
    TOGGLE LOADING STATE
    =====================================================*/

    setLoadingState(status) {

        this.state.isLoading = status;

        if (status) {

            document.body.classList.add(

                "cbnh-loading"

            );

        } else {

            document.body.classList.remove(

                "cbnh-loading"

            );

        }

    },

    /*=====================================================
    SIMULATE DATA REFRESH
    =====================================================*/

    refreshNeighbourhoodData() {

        this.setLoadingState(true);

        setTimeout(() => {

            this.setLoadingState(false);

            this.showToast(

                "Neighbourhood updated successfully."

            );

        }, 1200);

    },

    /*=====================================================
    STORE RECENT PRODUCT
    =====================================================*/

    storeRecentProduct(card) {

        const productName =

            card.querySelector("h4")?.textContent.trim();

        if (!productName) return;

        let recentProducts = JSON.parse(

            localStorage.getItem(

                "yoviRecentProducts"

            ) || "[]"

        );

        recentProducts = recentProducts.filter(

            item => item !== productName

        );

        recentProducts.unshift(productName);

        recentProducts = recentProducts.slice(0, 10);

        localStorage.setItem(

            "yoviRecentProducts",

            JSON.stringify(recentProducts)

        );

    },

    /*=====================================================
    HANDLE PAGE VISIBILITY
    =====================================================*/

    handleVisibilityChange() {

        if (document.hidden) {

            this.saveLocalStorage();

            return;

        }

        this.refreshPageState();

    },

    /*=====================================================
    HANDLE WINDOW RESIZE
    =====================================================*/

    handleWindowResize() {

        let resizeTimer;

        window.addEventListener("resize", () => {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {

                document.body.classList.add(

                    "cbnh-resizing"

                );

                setTimeout(() => {

                    document.body.classList.remove(

                        "cbnh-resizing"

                    );

                }, 150);

            }, 100);

        });

    },

    /*=====================================================
    REGISTER GLOBAL EVENTS
    =====================================================*/

    registerGlobalEvents() {

        document.addEventListener(

            "visibilitychange",

            this.handleVisibilityChange.bind(this)

        );

        window.addEventListener(

            "beforeunload",

            () => {

                this.saveLocalStorage();

            }

        );

        this.handleWindowResize();

    },

    /*=====================================================
    DESTROY
    =====================================================*/

    destroy() {

        this.saveLocalStorage();

    }

};

/*=========================================================
APPLICATION START
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        BuyerNeighbourhood.init();

        BuyerNeighbourhood.registerGlobalEvents();

    }

);





































/* ==========================================================
   PROVIDER DASHBOARD
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
       PAGE CHECK
    ========================================================== */

    if (!document.getElementById("yoviProviderDashboardPage")) {
        return;
    }

    /* ==========================================================
       ELEMENTS
    ========================================================== */

    const ypdAvailabilityButton =
        document.getElementById("ypdAvailabilityButton");

    const ypdCalendarPrev =
        document.getElementById("ypdCalendarPrev");

    const ypdCalendarNext =
        document.getElementById("ypdCalendarNext");

    const ypdCalendarGrid =
        document.getElementById("ypdCalendarGrid");

    const ypdNewsletterForm =
        document.getElementById("ypdNewsletterForm");

    const ypdStatCards =
        document.querySelectorAll(".ypd-stat-card");

    const ypdDashboardCards =
        document.querySelectorAll(".ypd-dashboard-card");

    const ypdSidebarLinks =
        document.querySelectorAll(".ypd-sidebar-menu a");

    /* ==========================================================
       PAGE ENTRANCE ANIMATION
    ========================================================== */

    ypdStatCards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";

        setTimeout(() => {

            card.style.transition =
                "all .5s ease";

            card.style.opacity = "1";
            card.style.transform =
                "translateY(0)";

        }, index * 120);

    });

    ypdDashboardCards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";

        setTimeout(() => {

            card.style.transition =
                "all .6s ease";

            card.style.opacity = "1";
            card.style.transform =
                "translateY(0)";

        }, 500 + (index * 150));

    });

    /* ==========================================================
       ACTIVE SIDEBAR
    ========================================================== */

    ypdSidebarLinks.forEach(link => {

        link.addEventListener("click", function () {

            ypdSidebarLinks.forEach(item => {

                item.classList.remove("active");

            });

            this.classList.add("active");

        });

    });

    /* ==========================================================
       AVAILABILITY STATUS
    ========================================================== */

    let ypdAvailable = true;

    ypdAvailabilityButton?.addEventListener("click", () => {

        ypdAvailable = !ypdAvailable;

        const ypdIndicator =
            ypdAvailabilityButton.querySelector("span");

        if (ypdAvailable) {

            ypdAvailabilityButton.innerHTML = `
                <span></span>
                Available Now
            `;

            ypdAvailabilityButton.style.background =
                "#16A34A";

            ypdAvailabilityButton.style.boxShadow =
                "0 12px 26px rgba(22,163,74,.25)";

        } else {

            ypdAvailabilityButton.innerHTML = `
                <span></span>
                Busy
            `;

            ypdAvailabilityButton.style.background =
                "#EF4444";

            ypdAvailabilityButton.style.boxShadow =
                "0 12px 26px rgba(239,68,68,.25)";

        }

    });

    /* ==========================================================
       STATISTICS COUNTER ANIMATION
    ========================================================== */

    function ypdAnimateCounter(element, target, duration = 1500) {

        let start = 0;

        const increment = target / (duration / 16);

        function updateCounter() {

            start += increment;

            if (start < target) {

                element.textContent = Math.floor(start);

                requestAnimationFrame(updateCounter);

            } else {

                element.textContent = target;

            }

        }

        updateCounter();

    }

    ypdStatCards.forEach(card => {

        const value = card.querySelector("h2");

        if (!value) return;

        const text = value.textContent.trim();

        if (/^\d+$/.test(text)) {

            ypdAnimateCounter(value, parseInt(text));

        }

    });

    /* ==========================================================
       CARD HOVER EFFECT
    ========================================================== */

    ypdStatCards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform =
                "translateY(-8px) scale(1.02)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "translateY(0) scale(1)";

        });

    });

    /* ==========================================================
       DASHBOARD CARD RIPPLE EFFECT
    ========================================================== */

    ypdDashboardCards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            card.style.background = `
                radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(22,163,74,.06),
                    #FFFFFF 60%
                )
            `;

        });

        card.addEventListener("mouseleave", () => {

            card.style.background = "#FFFFFF";

        });

    });

    /* ==========================================================
       NOTIFICATION ICON ANIMATION
    ========================================================== */

    const ypdNotificationDot =
        document.querySelector(".ypd-notification-dot");

    if (ypdNotificationDot) {

        setInterval(() => {

            ypdNotificationDot.animate([

                {
                    transform: "scale(1)"
                },

                {
                    transform: "scale(1.45)"
                },

                {
                    transform: "scale(1)"
                }

            ], {

                duration: 900

            });

        }, 3500);

    }

    /* ==========================================================
       WELCOME MESSAGE
    ========================================================== */

    setTimeout(() => {

        console.log(
            "Welcome to the YOVI Provider Dashboard."
        );

    }, 800);

    /* ==========================================================
       CALENDAR NAVIGATION
    ========================================================== */

    const ypdMonthNames = [

        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"

    ];

    let ypdCurrentMonth = 5;
    let ypdCurrentYear = 2026;

    const ypdCalendarTitle =
        document.querySelector(".ypd-calendar-header h4");

    function ypdUpdateCalendarTitle(){

        if(!ypdCalendarTitle) return;

        ypdCalendarTitle.textContent =
            `${ypdMonthNames[ypdCurrentMonth]} ${ypdCurrentYear}`;

    }

    ypdCalendarPrev?.addEventListener("click",()=>{

        ypdCurrentMonth--;

        if(ypdCurrentMonth < 0){

            ypdCurrentMonth = 11;
            ypdCurrentYear--;

        }

        ypdUpdateCalendarTitle();

    });

    ypdCalendarNext?.addEventListener("click",()=>{

        ypdCurrentMonth++;

        if(ypdCurrentMonth > 11){

            ypdCurrentMonth = 0;
            ypdCurrentYear++;

        }

        ypdUpdateCalendarTitle();

    });

    ypdUpdateCalendarTitle();

    /* ==========================================================
       CALENDAR DAY SELECTION
    ========================================================== */

    const ypdCalendarDays =
        document.querySelectorAll(".ypd-day");

    ypdCalendarDays.forEach(day=>{

        day.addEventListener("click",function(){

            ypdCalendarDays.forEach(item=>{

                if(!item.classList.contains("today")){

                    item.classList.remove("selected");

                }

            });

            if(!this.classList.contains("today")){

                this.classList.add("selected");

            }

        });

    });

    /* ==========================================================
       BOOKED DAY TOOLTIP
    ========================================================== */

    document
        .querySelectorAll(".ypd-day.booked")
        .forEach(day=>{

            day.title="You already have bookings on this date.";

        });

    /* ==========================================================
       TODAY TOOLTIP
    ========================================================== */

    const ypdToday =
        document.querySelector(".ypd-day.today");

    if(ypdToday){

        ypdToday.title="Today's Schedule";

    }

    /* ==========================================================
       NEWSLETTER FORM
    ========================================================== */

    ypdNewsletterForm?.addEventListener("submit",function(e){

        e.preventDefault();

        const input =
            this.querySelector("input");

        const email =
            input.value.trim();

        if(email===""){

            alert("Please enter your email address.");

            input.focus();

            return;

        }

        const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailPattern.test(email)){

            alert("Please enter a valid email address.");

            input.focus();

            return;

        }

        const button =
            this.querySelector("button");

        const originalText =
            button.innerHTML;

        button.disabled=true;

        button.innerHTML=`
            <span class="spinner-border spinner-border-sm me-2"></span>
            Subscribing...
        `;

        setTimeout(()=>{

            button.disabled=false;

            button.innerHTML=originalText;

            alert("Newsletter subscription successful!");

            input.value="";

        },1800);

    });

    /* ==========================================================
       CALENDAR FADE ANIMATION
    ========================================================== */

    function ypdAnimateCalendar(){

        if(!ypdCalendarGrid) return;

        ypdCalendarGrid.animate(

            [

                {

                    opacity:.3,

                    transform:"translateY(15px)"

                },

                {

                    opacity:1,

                    transform:"translateY(0)"

                }

            ],

            {

                duration:350,

                easing:"ease-out"

            }

        );

    }

    ypdCalendarPrev?.addEventListener("click",ypdAnimateCalendar);

    ypdCalendarNext?.addEventListener("click",ypdAnimateCalendar);

    /* ==========================================================
       LIVE GREETING
    ========================================================== */

    function ypdUpdateGreeting() {

        const hour = new Date().getHours();

        let greeting = "Welcome";

        if (hour < 12) {

            greeting = "Good Morning";

        } else if (hour < 17) {

            greeting = "Good Afternoon";

        } else {

            greeting = "Good Evening";

        }

        const pageTitle =
            document.querySelector(".ypd-page-title");

        if (pageTitle) {

            pageTitle.textContent =
                `${greeting}, Emeka`;

        }

    }

    ypdUpdateGreeting();

    /* ==========================================================
       ACTIVE PAGE DETECTION
    ========================================================== */

    const currentPage =
        window.location.pathname
        .split("/")
        .pop();

    ypdSidebarLinks.forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {

            ypdSidebarLinks.forEach(item => {

                item.classList.remove("active");

            });

            link.classList.add("active");

        }

    });

    /* ==========================================================
       SCROLL TO TOP
    ========================================================== */

    window.addEventListener("scroll", () => {

        if (window.scrollY > 150) {

            document.body.classList.add(
                "ypd-page-scrolled"
            );

        } else {

            document.body.classList.remove(
                "ypd-page-scrolled"
            );

        }

    });

    /* ==========================================================
       DASHBOARD CARD ENTRANCE
    ========================================================== */

    const ypdObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "ypd-card-visible"
                    );

                }

            });

        },

        {

            threshold: 0.2

        }

    );

    ypdDashboardCards.forEach(card => {

        ypdObserver.observe(card);

    });

    /* ==========================================================
       KEYBOARD SHORTCUTS
    ========================================================== */

    document.addEventListener("keydown", event => {

        if (event.altKey && event.key === "1") {

            window.location.href =
                "provider/provider-dashboard.html";

        }

        if (event.altKey && event.key === "2") {

            window.location.href =
                "provider-bookings.html";

        }

        if (event.altKey && event.key === "3") {

            window.location.href =
                "provider-services.html";

        }

        if (event.altKey && event.key === "4") {

            window.location.href =
                "provider-settings.html";

        }

    });

    /* ==========================================================
       REFRESH STATISTICS ANIMATION
    ========================================================== */

    function ypdRefreshStats() {

        ypdStatCards.forEach(card => {

            card.animate(

                [

                    {

                        transform: "scale(1)"

                    },

                    {

                        transform: "scale(1.04)"

                    },

                    {

                        transform: "scale(1)"

                    }

                ],

                {

                    duration: 700,

                    easing: "ease"

                }

            );

        });

    }

    setInterval(

        ypdRefreshStats,

        30000

    );

    /* ==========================================================
       ACCESSIBILITY
    ========================================================== */

    document
        .querySelectorAll("button,a")
        .forEach(element => {

            element.addEventListener("focus", () => {

                element.classList.add(
                    "ypd-focus-visible"
                );

            });

            element.addEventListener("blur", () => {

                element.classList.remove(
                    "ypd-focus-visible"
                );

            });

        });

    /* ==========================================================
       LOADING COMPLETE
    ========================================================== */

    document.body.classList.add(
        "ypd-dashboard-loaded"
    );

    /* ==========================================================
       LOGOUT CONFIRMATION
    ========================================================== */

    const ypdSignOutButton =
        document.getElementById("ypdSignOutButton");

    ypdSignOutButton?.addEventListener("click", function (event) {

        event.preventDefault();

        const confirmLogout = confirm(
            "Are you sure you want to sign out?"
        );

        if (confirmLogout) {

            localStorage.removeItem("yoviCurrentUser");
            localStorage.removeItem("yoviProviderSession");

            window.location.href = "/index.html";

        }

    });

    /* ==========================================================
       SAVE AVAILABILITY STATUS
    ========================================================== */

    if (ypdAvailabilityButton) {

        const savedStatus =
            localStorage.getItem("yoviProviderAvailability");

        if (savedStatus === "busy") {

            ypdAvailable = false;

            ypdAvailabilityButton.innerHTML = `
                <span></span>
                Busy
            `;

            ypdAvailabilityButton.style.background =
                "#EF4444";

            ypdAvailabilityButton.style.boxShadow =
                "0 12px 26px rgba(239,68,68,.25)";

        }

        ypdAvailabilityButton.addEventListener("click", () => {

            localStorage.setItem(

                "yoviProviderAvailability",

                ypdAvailable ? "available" : "busy"

            );

        });

    }

    /* ==========================================================
       REMEMBER NEWSLETTER EMAIL
    ========================================================== */

    const ypdNewsletterInput =
        document.querySelector(
            "#ypdNewsletterForm input[type='email']"
        );

    if (ypdNewsletterInput) {

        const savedEmail =
            localStorage.getItem("yoviNewsletterEmail");

        if (savedEmail) {

            ypdNewsletterInput.value = savedEmail;

        }

        ypdNewsletterInput.addEventListener("blur", () => {

            localStorage.setItem(

                "yoviNewsletterEmail",

                ypdNewsletterInput.value.trim()

            );

        });

    }

    /* ==========================================================
       CARD CLICK EFFECT
    ========================================================== */

    ypdStatCards.forEach(card => {

        card.addEventListener("click", () => {

            card.animate(

                [

                    {
                        transform: "scale(1)"
                    },

                    {
                        transform: "scale(.96)"
                    },

                    {
                        transform: "scale(1)"
                    }

                ],

                {

                    duration: 220

                }

            );

        });

    });

    /* ==========================================================
       AUTO SCROLL TO TOP
    ========================================================== */

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

    /* ==========================================================
       DASHBOARD INITIALIZED
    ========================================================== */

    console.log(
        "%cYOVI Provider Dashboard Loaded Successfully",
        "color:#16A34A;font-size:14px;font-weight:bold;"
    );

    console.log(
        "Provider Dashboard Version 1.0.0"
    );

    console.log(
        "Current User: Service Provider"
    );

});

    /* ==========================================================
       END OF PROVIDER DASHBOARD
    ========================================================== */


