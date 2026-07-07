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

                window.location.href = "services.html";

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
END OF YOVI HOMEPAGE 
======================================*/

/*=========================================================
YOVI REGISTER PAGE
PART 3A
=========================================================*/

document.addEventListener("DOMContentLoaded", function () {

    /*=====================================================
    PAGE CHECK
    Prevent this module from running on other pages
    =====================================================*/

    const yrgPage = document.getElementById(
        "yrgRegisterPage"
    );

    if (!yrgPage) return;

    console.log("YOVI Register Page Loaded");

    /*=====================================================
    ELEMENTS
    =====================================================*/

    const yrgForm =
        document.getElementById(
            "yrgRegisterForm"
        );

    const yrgFirstName =
        document.getElementById(
            "yrgFirstName"
        );

    const yrgLastName =
        document.getElementById(
            "yrgLastName"
        );

    const yrgEmail =
        document.getElementById(
            "yrgEmail"
        );

    const yrgPhone =
        document.getElementById(
            "yrgPhone"
        );

    const yrgPassword =
        document.getElementById(
            "yrgPassword"
        );

    const yrgConfirmPassword =
        document.getElementById(
            "yrgConfirmPassword"
        );

    const yrgTerms =
        document.getElementById(
            "yrgTermsCheck"
        );

    const yrgCreateAccountBtn =
        document.getElementById(
            "yrgCreateAccountBtn"
        );

    const yrgTogglePassword =
        document.getElementById(
            "yrgTogglePassword"
        );

    const yrgToggleConfirmPassword =
        document.getElementById(
            "yrgToggleConfirmPassword"
        );

    const yrgPasswordIcon =
        document.getElementById(
            "yrgPasswordIcon"
        );

    const yrgConfirmPasswordIcon =
        document.getElementById(
            "yrgConfirmPasswordIcon"
        );

    const yrgStrengthBar1 =
        document.getElementById(
            "yrgStrengthBar1"
        );

    const yrgStrengthBar2 =
        document.getElementById(
            "yrgStrengthBar2"
        );

    const yrgStrengthBar3 =
        document.getElementById(
            "yrgStrengthBar3"
        );

    const yrgStrengthLabel =
        document.getElementById(
            "yrgStrengthLabel"
        );

    const yrgPasswordMatchMessage =
        document.getElementById(
            "yrgPasswordMatchMessage"
        );

    const yrgGoogleSignupBtn =
        document.getElementById(
            "yrgGoogleSignupBtn"
        );

    const yrgPhoneSignupBtn =
        document.getElementById(
            "yrgPhoneSignupBtn"
        );

    /*=====================================================
    REGULAR EXPRESSIONS
    =====================================================*/

    const yrgEmailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const yrgPhonePattern =
        /^[789]\d{9}$/;

    const yrgUppercase =
        /[A-Z]/;

    const yrgLowercase =
        /[a-z]/;

    const yrgNumber =
        /\d/;

    const yrgSpecialCharacter =
        /[!@#$%^&*(),.?":{}|<>]/;

    /*=====================================================
    PASSWORD VISIBILITY
    =====================================================*/

    function yrgToggleVisibility(
        input,
        icon
    ){

        if(
            input.type === "password"
        ){

            input.type = "text";

            icon.classList.remove(
                "bi-eye"
            );

            icon.classList.add(
                "bi-eye-slash"
            );

        }

        else{

            input.type = "password";

            icon.classList.remove(
                "bi-eye-slash"
            );

            icon.classList.add(
                "bi-eye"
            );

        }

    }

    if(yrgTogglePassword){

        yrgTogglePassword.addEventListener(

            "click",

            function(){

                yrgToggleVisibility(

                    yrgPassword,

                    yrgPasswordIcon

                );

            }

        );

    }

    if(yrgToggleConfirmPassword){

        yrgToggleConfirmPassword.addEventListener(

            "click",

            function(){

                yrgToggleVisibility(

                    yrgConfirmPassword,

                    yrgConfirmPasswordIcon

                );

            }

        );

    }

    /*=====================================================
    PASSWORD STRENGTH
    =====================================================*/

    function yrgCheckPasswordStrength(){

        const password =

            yrgPassword.value.trim();

        let score = 0;

        /* Reset */

        [

            yrgStrengthBar1,

            yrgStrengthBar2,

            yrgStrengthBar3

        ].forEach(function(bar){

            bar.className = "";

        });

        yrgStrengthLabel.textContent =

            "Password strength";

        if(password.length >= 8){

            score++;

        }

        if(

            yrgUppercase.test(password) &&

            yrgLowercase.test(password)

        ){

            score++;

        }

        if(

            yrgNumber.test(password) &&

            yrgSpecialCharacter.test(password)

        ){

            score++;

        }

        /*=============================
        WEAK
        =============================*/

        if(score === 1){

            yrgStrengthBar1.classList.add(

                "yrg-strength-weak"

            );

            yrgStrengthLabel.textContent =

                "Weak Password";

            yrgStrengthLabel.className =

                "yrg-strength-label yrg-text-danger";

        }

        /*=============================
        MEDIUM
        =============================*/

        if(score === 2){

            yrgStrengthBar1.classList.add(

                "yrg-strength-medium"

            );

            yrgStrengthBar2.classList.add(

                "yrg-strength-medium"

            );

            yrgStrengthLabel.textContent =

                "Medium Password";

            yrgStrengthLabel.className =

                "yrg-strength-label yrg-text-warning";

        }

        /*=============================
        STRONG
        =============================*/

        if(score === 3){

            yrgStrengthBar1.classList.add(

                "yrg-strength-strong"

            );

            yrgStrengthBar2.classList.add(

                "yrg-strength-strong"

            );

            yrgStrengthBar3.classList.add(

                "yrg-strength-strong"

            );

            yrgStrengthLabel.textContent =

                "Strong Password";

            yrgStrengthLabel.className =

                "yrg-strength-label yrg-text-success";

        }

        return score === 3;

    }

    /*=====================================================
    PASSWORD MATCH
    =====================================================*/

    function yrgCheckPasswordMatch(){

        const password =

            yrgPassword.value.trim();

        const confirm =

            yrgConfirmPassword.value.trim();

        if(confirm === ""){

            yrgPasswordMatchMessage.textContent =

                "";

            return false;

        }

        if(password === confirm){

            yrgPasswordMatchMessage.textContent =

                "Passwords match";

            yrgPasswordMatchMessage.className =

                "yrg-match-message yrg-match-success";

            return true;

        }

        yrgPasswordMatchMessage.textContent =

            "Passwords do not match";

        yrgPasswordMatchMessage.className =

            "yrg-match-message yrg-match-error";

        return false;

    }

    /*=====================================================
    INPUT VALIDATION
    =====================================================*/

    function yrgValidateInput(

        input,

        isValid

    ){

        input.classList.remove(

            "yrg-input-success",

            "yrg-input-error"

        );

        if(input.value.trim() === ""){

            return;

        }

        if(isValid){

            input.classList.add(

                "yrg-input-success"

            );

        }

        else{

            input.classList.add(

                "yrg-input-error"

            );

        }

    }

    /*=====================================================
    LIVE VALIDATION
    =====================================================*/

    function yrgValidateForm(){

        const firstNameValid =

            yrgFirstName.value.trim().length > 1;

        const lastNameValid =

            yrgLastName.value.trim().length > 1;

        const emailValid =

            yrgEmailPattern.test(

                yrgEmail.value.trim()

            );

        const phoneValid =

            yrgPhonePattern.test(

                yrgPhone.value.trim()

            );

        const passwordValid =

            yrgCheckPasswordStrength();

        const confirmValid =

            yrgCheckPasswordMatch();

        yrgValidateInput(

            yrgFirstName,

            firstNameValid

        );

        yrgValidateInput(

            yrgLastName,

            lastNameValid

        );

        yrgValidateInput(

            yrgEmail,

            emailValid

        );

        yrgValidateInput(

            yrgPhone,

            phoneValid

        );

        yrgValidateInput(

            yrgPassword,

            passwordValid

        );

        yrgValidateInput(

            yrgConfirmPassword,

            confirmValid

        );

        const formValid =

            firstNameValid &&

            lastNameValid &&

            emailValid &&

            phoneValid &&

            passwordValid &&

            confirmValid &&

            yrgTerms.checked;

            console.log({
                firstNameValid,
                lastNameValid,
                emailValid,
                phoneValid,
                passwordValid,
                confirmValid,
                terms: yrgTerms.checked,
                formValid
            });

        yrgCreateAccountBtn.disabled =

            !formValid;

    }

    /*=====================================================
    LIVE EVENTS
    =====================================================*/

    [

        yrgFirstName,

        yrgLastName,

        yrgEmail,

        yrgPhone,

        yrgPassword,

        yrgConfirmPassword

    ].forEach(function(field){

        field.addEventListener(

            "input",

            yrgValidateForm

        );

    });

    yrgTerms.addEventListener(

        "change",

        yrgValidateForm

    );

    /*=====================================================
    CREATE ACCOUNT
    =====================================================*/

    if(yrgForm){

        yrgForm.addEventListener(

            "submit",

            function(event){

                event.preventDefault();

                yrgValidateForm();

                if(

                    yrgCreateAccountBtn.disabled

                ){

                    return;

                }

                /* Loading State */

                yrgCreateAccountBtn.classList.add(

                    "yrg-btn-loading"

                );

                yrgCreateAccountBtn.disabled = true;

                yrgCreateAccountBtn.innerHTML =

                    '<span class="yrg-btn-spinner"></span><span>Creating Account...</span>';

                /* Save Registration */

                const yrgUser = {

                    firstName:

                        yrgFirstName.value.trim(),

                    lastName:

                        yrgLastName.value.trim(),

                    email:

                        yrgEmail.value.trim(),

                    phone:

                        yrgPhone.value.trim(),

                    registeredAt:

                        new Date().toISOString()

                };

                localStorage.setItem(

                    "yoviRegisteredUser",

                    JSON.stringify(yrgUser)

                );

                /* Simulate Request */

                setTimeout(function(){

                    window.location.href =

                    "/auth/otp-verify.html";

                },1500);

            }

        );

    }

    /*=====================================================
    RIPPLE EFFECT
    =====================================================*/

    function yrgCreateRipple(

        button,

        event

    ){

        const ripple =

            document.createElement(

                "span"

            );

        const size = Math.max(

            button.clientWidth,

            button.clientHeight

        );

        ripple.classList.add(

            "yrg-btn-ripple"

        );

        ripple.style.width =

            size + "px";

        ripple.style.height =

            size + "px";

        const rect =

            button.getBoundingClientRect();

        ripple.style.left =

            event.clientX -

            rect.left -

            size / 2 +

            "px";

        ripple.style.top =

            event.clientY -

            rect.top -

            size / 2 +

            "px";

        button.appendChild(

            ripple

        );

        setTimeout(function(){

            ripple.remove();

        },650);

    }

    if(yrgCreateAccountBtn){

        yrgCreateAccountBtn.addEventListener(

            "click",

            function(event){

                if(

                    !this.disabled

                ){

                    yrgCreateRipple(

                        this,

                        event

                    );

                }

            }

        );

    }

    /*=====================================================
    GOOGLE SIGN UP
    =====================================================*/

    if(yrgGoogleSignupBtn){

        yrgGoogleSignupBtn.addEventListener(

            "click",

            function(){

                window.location.href =

                "../auth/google-auth.html";

            }

        );

    }

    /*=====================================================
    PHONE SIGN UP
    =====================================================*/

    if(yrgPhoneSignupBtn){

        yrgPhoneSignupBtn.addEventListener(

            "click",

            function(){

                window.location.href =

                "../auth/phone-verification.html";

            }

        );

    }

    /*=====================================================
    ENTER KEY SUPPORT
    =====================================================*/

    document.addEventListener(

        "keydown",

        function(event){

            if(

                event.key === "Enter" &&

                document.activeElement.tagName !==

                "TEXTAREA"

            ){

                if(

                    !yrgCreateAccountBtn.disabled

                ){

                    yrgForm.requestSubmit();

                }

            }

        }

    );

    /*=====================================================
    PAGE FADE-IN
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
    PHONE NUMBER FORMAT
    =====================================================*/

    if(yrgPhone){

        yrgPhone.addEventListener(

            "input",

            function(){

                this.value =

                    this.value.replace(

                        /[^0-9]/g,

                        ""

                    );

                if(

                    this.value.length > 10

                ){

                    this.value =

                        this.value.substring(

                            0,

                            11

                        );

                }

            }

        );

    }

    /*=====================================================
    EMAIL NORMALIZATION
    =====================================================*/

    if(yrgEmail){

        yrgEmail.addEventListener(

            "blur",

            function(){

                this.value =

                    this.value

                    .trim()

                    .toLowerCase();

            }

        );

    }

    /*=====================================================
    NAME FORMATTER
    =====================================================*/

    function yrgCapitalizeWords(

        value

    ){

        return value.replace(

            /\b\w/g,

            function(letter){

                return letter.toUpperCase();

            }

        );

    }

    [

        yrgFirstName,

        yrgLastName

    ].forEach(function(field){

        if(field){

            field.addEventListener(

                "blur",

                function(){

                    this.value =

                        yrgCapitalizeWords(

                            this.value.trim()

                        );

                }

            );

        }

    });

    /*=====================================================
    REMOVE EXTRA SPACES
    =====================================================*/

    [

        yrgFirstName,

        yrgLastName,

        yrgEmail

    ].forEach(function(field){

        if(field){

            field.addEventListener(

                "input",

                function(){

                    this.value =

                        this.value.replace(

                            /\s{2,}/g,

                            " "

                        );

                }

            );

        }

    });

    /*=====================================================
    PASSWORD PASTE
    =====================================================*/

    [

        yrgPassword,

        yrgConfirmPassword

    ].forEach(function(field){

        if(field){

            field.addEventListener(

                "paste",

                function(){

                    setTimeout(

                        yrgValidateForm,

                        10

                    );

                }

            );

        }

    });

    /*=====================================================
    DISABLE CREATE BUTTON
    ON DOUBLE CLICK
    =====================================================*/

    if(yrgCreateAccountBtn){

        yrgCreateAccountBtn.addEventListener(

            "dblclick",

            function(event){

                event.preventDefault();

            }

        );

    }

    /*=====================================================
    INPUT FOCUS EFFECT
    =====================================================*/

    document

        .querySelectorAll(

            ".yrg-input"

        )

        .forEach(function(input){

            input.addEventListener(

                "focus",

                function(){

                    this.parentElement.classList.add(

                        "shadow-sm"

                    );

                }

            );

            input.addEventListener(

                "blur",

                function(){

                    this.parentElement.classList.remove(

                        "shadow-sm"

                    );

                }

            );

        });

    /*=====================================================
    DISABLE SPACE
    AT START OF INPUT
    =====================================================*/

    [

        yrgFirstName,

        yrgLastName,

        yrgEmail

    ].forEach(function(field){

        if(field){

            field.addEventListener(

                "keydown",

                function(event){

                    if(

                        event.key === " " &&

                        this.selectionStart === 0

                    ){

                        event.preventDefault();

                    }

                }

            );

        }

    });

    /*=====================================================
    AUTOFOCUS
    =====================================================*/

    if(yrgFirstName){

        setTimeout(function(){

            yrgFirstName.focus();

        },300);

    }

    /*=====================================================
    SAVE FORM DRAFT
    =====================================================*/

    function yrgSaveDraft(){

        const draft = {

            firstName:

                yrgFirstName.value,

            lastName:

                yrgLastName.value,

            email:

                yrgEmail.value,

            phone:

                yrgPhone.value

        };

        localStorage.setItem(

            "yrgRegisterDraft",

            JSON.stringify(draft)

        );

    }

    [

        yrgFirstName,

        yrgLastName,

        yrgEmail,

        yrgPhone

    ].forEach(function(field){

        field.addEventListener(

            "input",

            yrgSaveDraft

        );

    });

    /*=====================================================
    RESTORE FORM DRAFT
    =====================================================*/

    const yrgDraft =

        JSON.parse(

            localStorage.getItem(

                "yrgRegisterDraft"

            )

        );

    if(yrgDraft){

        yrgFirstName.value =

            yrgDraft.firstName || "";

        yrgLastName.value =

            yrgDraft.lastName || "";

        yrgEmail.value =

            yrgDraft.email || "";

        yrgPhone.value =

            yrgDraft.phone || "";

    }

    /*=====================================================
    VALIDATE RESTORED DATA
    =====================================================*/

    yrgValidateForm();

    /*=====================================================
    BOOTSTRAP TOOLTIPS
    =====================================================*/

    document.querySelectorAll(

        '[data-bs-toggle="tooltip"]'

    ).forEach(function(item){

        new bootstrap.Tooltip(item);

    });

    /*=====================================================
    BOOTSTRAP POPOVERS
    =====================================================*/

    document.querySelectorAll(

        '[data-bs-toggle="popover"]'

    ).forEach(function(item){

        new bootstrap.Popover(item);

    });

    /*=====================================================
    ONLINE STATUS
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
    LAST VISIT
    =====================================================*/

    localStorage.setItem(

        "yrgLastVisit",

        new Date().toISOString()

    );

    /*=====================================================
    PAGE STATE
    =====================================================*/

    function yrgSavePageState(){

        const pageState = {

            page:

                "register",

            lastVisited:

                new Date().toISOString(),

            draftSaved:

                !!localStorage.getItem(

                    "yrgRegisterDraft"

                )

        };

        localStorage.setItem(

            "yrgRegisterPageState",

            JSON.stringify(

                pageState

            )

        );

    }

    yrgSavePageState();

    /*=====================================================
    RESTORE SCROLL POSITION
    =====================================================*/

    const yrgScroll =

        sessionStorage.getItem(

            "yrgRegisterScroll"

        );

    if(yrgScroll){

        window.scrollTo(

            0,

            parseInt(

                yrgScroll

            )

        );

    }

    window.addEventListener(

        "beforeunload",

        function(){

            sessionStorage.setItem(

                "yrgRegisterScroll",

                window.scrollY

            );

        }

    );

    /*=====================================================
    CLEAR DRAFT
    AFTER SUCCESSFUL REGISTRATION
    =====================================================*/

    if(

        localStorage.getItem(

            "yoviRegisteredUser"

        )

    ){

        localStorage.removeItem(

            "yrgRegisterDraft"

        );

    }

    /*=====================================================
    WINDOW RESIZE LOGGER
    =====================================================*/

    window.addEventListener(

        "resize",

        function(){

            console.log(

                "Viewport Width:",

                window.innerWidth

            );

        }

    );

    /*=====================================================
    PAGE LOAD LOGGER
    =====================================================*/

    window.addEventListener(

        "load",

        function(){

            console.log(

                "Register page fully loaded."

            );

        }

    );

    /*=====================================================
    CLEANUP BEFORE UNLOAD
    =====================================================*/

    window.addEventListener(

        "beforeunload",

        function(){

            console.log(

                "Leaving Register page..."

            );

        }

    );

    /*=====================================================
    INITIALIZE
    =====================================================*/

    console.log(

        "YOVI Register initialized:",

        new Date().toLocaleString()

    );

    console.log(

        "YOVI Register module initialized successfully."

    );

});

/*======================================
END OF REGISTER PAGE 
======================================*/

/*==================================================
PHONE VERIFICATION PAGE (3A)
Initialization • OTP Navigation • Auto Focus
Unique Prefix: yvp-
Append to global.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
    PAGE CHECK
    =========================================*/

    const verificationPage = document.getElementById("yvp-phone-verification-page");

    if (!verificationPage) return;

    /*=========================================
    ELEMENTS
    =========================================*/

    const otpInputs = document.querySelectorAll(".yvp-otp-input");

    const verificationForm = document.getElementById("yvpVerificationForm");

    const verifyButton = document.getElementById("yvpVerifyBtn");

    const countdownElement = document.getElementById("yvpCountdown");

    const resendLink = document.getElementById("yvpResendCode");

    const changeNumberLink = document.querySelector(".yvp-change-number");

    let countdown = 54;

    let countdownTimer = null;

    /*=========================================
    AUTO FOCUS FIRST INPUT
    =========================================*/

    if (otpInputs.length) {

        setTimeout(() => {

            otpInputs[0].focus();

        }, 300);

    }

    /*=========================================
    OTP INPUT HANDLING
    =========================================*/

    otpInputs.forEach((input, index) => {

        /* Only Numbers */

        input.addEventListener("input", function () {

            this.value = this.value.replace(/\D/g, "");

            if (this.value !== "") {

                this.classList.add("filled");

                if (index < otpInputs.length - 1) {

                    otpInputs[index + 1].focus();

                }

            } else {

                this.classList.remove("filled");

            }

            checkOtpCompletion();

        });

        /*=====================================
        BACKSPACE NAVIGATION
        =====================================*/

        input.addEventListener("keydown", function (event) {

            if (event.key === "Backspace") {

                if (this.value === "" && index > 0) {

                    otpInputs[index - 1].focus();

                    otpInputs[index - 1].value = "";

                    otpInputs[index - 1].classList.remove("filled");

                }

            }

            if (event.key === "ArrowLeft" && index > 0) {

                otpInputs[index - 1].focus();

            }

            if (event.key === "ArrowRight" && index < otpInputs.length - 1) {

                otpInputs[index + 1].focus();

            }

        });

        /*=====================================
        SELECT VALUE ON FOCUS
        =====================================*/

        input.addEventListener("focus", function () {

            this.select();

        });

    });

    /*=========================================
    CHECK OTP COMPLETION
    =========================================*/

    function checkOtpCompletion() {

        const completed = [...otpInputs].every(input => input.value !== "");

        verifyButton.disabled = !completed;

    }

    /*=========================================
    INITIAL BUTTON STATE
    =========================================*/

    verifyButton.disabled = true;

    /*=========================================
    START COUNTDOWN
    =========================================*/

    function startCountdown() {

        clearInterval(countdownTimer);

        countdown = 54;

        if (countdownElement) {

            countdownElement.textContent = `${countdown}s`;

        }

        if (resendLink) {

            resendLink.classList.remove("active");

            resendLink.setAttribute("aria-disabled", "true");

        }

        countdownTimer = setInterval(() => {

            countdown--;

            if (countdownElement) {

                countdownElement.textContent = `${countdown}s`;

            }

            if (countdown <= 0) {

                clearInterval(countdownTimer);

                if (countdownElement) {

                    countdownElement.textContent = "0s";

                }

                if (resendLink) {

                    resendLink.classList.add("active");

                    resendLink.removeAttribute("aria-disabled");

                }

            }

        }, 1000);

    }

    startCountdown();

    /*=========================================
    RESEND CODE
    =========================================*/

    if (resendLink) {

        resendLink.addEventListener("click", function (event) {

            event.preventDefault();

            if (!this.classList.contains("active")) {

                return;

            }

            otpInputs.forEach(input => {

                input.value = "";

                input.classList.remove("filled");

                input.classList.remove("is-valid");

                input.classList.remove("is-invalid");

            });

            verifyButton.disabled = true;

            otpInputs[0].focus();

            startCountdown();

            /*
             * Place your resend OTP API call here.
             *
             * Example:
             * resendVerificationCode();
             */

            console.log("Verification code resent.");

        });

    }

    /*=========================================
    PASTE COMPLETE OTP
    =========================================*/

    otpInputs.forEach(input => {

        input.addEventListener("paste", function (event) {

            event.preventDefault();

            const pastedData = (event.clipboardData || window.clipboardData)
                .getData("text")
                .replace(/\D/g, "");

            if (pastedData.length !== otpInputs.length) {

                return;

            }

            otpInputs.forEach((box, index) => {

                box.value = pastedData[index];

                box.classList.add("filled");

            });

            checkOtpCompletion();

            otpInputs[otpInputs.length - 1].focus();

        });

    });

    /*=========================================
    CHANGE NUMBER
    =========================================*/

    if (changeNumberLink) {

        changeNumberLink.addEventListener("click", function () {

            /*
             * Optional:
             * Clear OTP before returning.
             */

            otpInputs.forEach(input => {

                input.value = "";

                input.classList.remove("filled");

            });

        });

    }

    /*=========================================
    GET OTP VALUE
    =========================================*/

    function getOtpCode() {

        return [...otpInputs]

            .map(input => input.value)

            .join("");

    }

    /*=========================================
    OTP VALIDATION
    =========================================*/

    function validateOtp() {

        const otp = getOtpCode();

        if (otp.length !== 6) {

            otpInputs.forEach(input => {

                if (input.value === "") {

                    input.classList.add("is-invalid");

                }

            });

            return false;

        }

        otpInputs.forEach(input => {

            input.classList.remove("is-invalid");

            input.classList.add("is-valid");

        });

        return true;

    }

    /*=========================================
    VERIFY FORM
    =========================================*/

    verificationForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!validateOtp()) {

            otpInputs[0].focus();

            return;

        }

        verifyButton.disabled = true;

        verifyButton.classList.add("loading");

        verifyButton.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Verifying...

        `;

        const otpCode = getOtpCode();

        console.log("OTP Submitted:", otpCode);

        /*
        =========================================
        Replace this timeout with your API call

        Example:

        fetch("/api/verify-phone", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                otp: otpCode
            })
        })

        =========================================
        */

        setTimeout(() => {

            verificationSuccessful();

        }, 1800);

    });

    /*=========================================
    VERIFICATION SUCCESS
    =========================================*/

    function verificationSuccessful() {

        verifyButton.classList.remove("loading");

        verifyButton.classList.add("success");

        verifyButton.innerHTML = `

            <i class="bi bi-check-circle-fill me-2"></i>

            Verified Successfully

        `;

        otpInputs.forEach(input => {

            input.classList.remove("is-invalid");

            input.classList.add("is-valid");

        });

        setTimeout(() => {

            window.location.href = "/auth/account-type.html";

        }, 1200);

    }

    /*=========================================
    REMOVE ERROR STATE ON INPUT
    =========================================*/

    otpInputs.forEach(input => {

        input.addEventListener("input", function () {

            this.classList.remove("is-invalid");

        });

    });


    /*=========================================
    PREVENT NON-NUMERIC INPUT
    =========================================*/

    otpInputs.forEach(input => {

        input.addEventListener("keypress", function (event) {

            if (!/[0-9]/.test(event.key)) {

                event.preventDefault();

            }

        });

    });

    /*=========================================
    PREVENT DRAG & DROP
    =========================================*/

    otpInputs.forEach(input => {

        input.addEventListener("drop", function (event) {

            event.preventDefault();

        });

    });

    /*=========================================
    CLEAR OTP
    =========================================*/

    function clearOtpFields() {

        otpInputs.forEach(input => {

            input.value = "";

            input.classList.remove(

                "filled",

                "is-valid",

                "is-invalid"

            );

        });

        verifyButton.disabled = true;

        otpInputs[0].focus();

    }

    /*=========================================
    AUTO SUBMIT
    After entering the 6th digit
    =========================================*/

    otpInputs[otpInputs.length - 1].addEventListener("input", function () {

        if (getOtpCode().length === 6) {

            setTimeout(() => {

                verificationForm.requestSubmit();

            }, 250);

        }

    });

    /*=========================================
    ENTER KEY SUPPORT
    =========================================*/

    document.addEventListener("keydown", function (event) {

        if (event.key !== "Enter") return;

        if (document.activeElement.classList.contains("yvp-otp-input")) {

            event.preventDefault();

            verificationForm.requestSubmit();

        }

    });

    /*=========================================
    PAGE VISIBILITY
    Pause countdown while page is hidden
    =========================================*/

    document.addEventListener("visibilitychange", function () {

        if (document.hidden) {

            clearInterval(countdownTimer);

        } else {

            if (countdown > 0) {

                countdownTimer = setInterval(() => {

                    countdown--;

                    countdownElement.textContent = `${countdown}s`;

                    if (countdown <= 0) {

                        clearInterval(countdownTimer);

                        countdownElement.textContent = "0s";

                        if (resendLink) {

                            resendLink.classList.add("active");

                            resendLink.removeAttribute("aria-disabled");

                        }

                    }

                }, 1000);

            }

        }

    });

    /*=========================================
    RESET FORM
    =========================================*/

    verificationForm.addEventListener("reset", function () {

        clearOtpFields();

    });

    /*=========================================
    OTP EXPIRED
    =========================================*/

    function otpExpired() {

        clearOtpFields();

        alert("Your verification code has expired. Please request a new one.");

    }

    /*
    ==========================================
    Optional

    Call:

    otpExpired();

    whenever your backend
    returns an OTP expiration error.

    ==========================================
    */


    /*=========================================
    TOAST HELPER
    =========================================*/

    function showVerificationToast(message, type = "success") {

        const existingToast = document.getElementById("yvpToast");

        if (existingToast) {

            existingToast.remove();

        }

        const toast = document.createElement("div");

        toast.id = "yvpToast";

        toast.className = `yvp-toast ${type}`;

        toast.innerHTML = `

            <i class="bi ${type === "success"
                ? "bi-check-circle-fill"
                : "bi-exclamation-circle-fill"}"></i>

            <span>${message}</span>

        `;

        document.body.appendChild(toast);

        requestAnimationFrame(() => {

            toast.classList.add("show");

        });

        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(() => {

                toast.remove();

            }, 300);

        }, 3000);

    }

    /*=========================================
    API TEMPLATE
    Replace with your backend endpoint
    =========================================*/

    async function verifyOtpRequest(otpCode) {

        try {

            /*
            Example:

            const response = await fetch("/api/verify-phone", {

                method: "POST",

                headers: {

                    "Content-Type":"application/json"

                },

                body: JSON.stringify({

                    otp: otpCode

                })

            });

            if(!response.ok){

                throw new Error("Verification failed");

            }

            return await response.json();
            */

            return {

                success: true

            };

        } catch (error) {

            console.error(error);

            return {

                success: false,

                message: "Unable to verify code."

            };

        }

    }

    /*=========================================
    NETWORK ERROR
    =========================================*/

    function verificationFailed(message) {

        verifyButton.disabled = false;

        verifyButton.classList.remove(

            "loading",

            "success"

        );

        verifyButton.innerHTML = `

            <i class="bi bi-check-circle me-2"></i>

            Verify & Continue

        `;

        otpInputs.forEach(input => {

            input.classList.remove("is-valid");

            input.classList.add("is-invalid");

        });

        showVerificationToast(

            message || "Verification failed.",

            "error"

        );

    }

    /*=========================================
    ONLINE / OFFLINE
    =========================================*/

    window.addEventListener("offline", () => {

        showVerificationToast(

            "No internet connection.",

            "error"

        );

    });

    window.addEventListener("online", () => {

        showVerificationToast(

            "Connection restored.",

            "success"

        );

    });

    /*=========================================
    CLEANUP
    =========================================*/

    window.addEventListener("beforeunload", () => {

        clearInterval(countdownTimer);

    });

    /*=========================================
    OPTIONAL:
    STORE VERIFIED PHONE
    =========================================*/

    function storeVerifiedPhone(phoneNumber) {

        sessionStorage.setItem(

            "verifiedPhone",

            phoneNumber

        );

    }

    /*
        Example usage:

        storeVerifiedPhone("+23408123456789");
    */

    /*=========================================
    DEVELOPMENT LOG
    =========================================*/

    console.info(

        "Phone Verification Page Initialized Successfully."

    );

});


/*==================================================
ACCOUNT TYPE PAGE (3A)
Initialization • Card Selection • Continue Button
Unique Prefix: yat-
Append to global.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
    PAGE CHECK
    =========================================*/

    const accountTypePage = document.getElementById("yat-account-type-page");

    if (!accountTypePage) return;

    /*=========================================
    ELEMENTS
    =========================================*/

    const accountForm = document.getElementById("yatAccountTypeForm");

    const accountCards = document.querySelectorAll(".yat-account-card");

    const accountInputs = document.querySelectorAll(".yat-account-input");

    const continueBtn = document.getElementById("yatContinueBtn");

    /*=========================================
    INITIAL STATE
    =========================================*/

    continueBtn.disabled = false;

    /*=========================================
    APPLY SELECTED CARD
    =========================================*/

    function updateSelectedCard() {

        accountCards.forEach(card => {

            card.classList.remove("selected");

        });

        accountInputs.forEach(input => {

            if (input.checked) {

                input.closest(".yat-account-card")
                     .classList.add("selected");

            }

        });

    }

    updateSelectedCard();

    /*=========================================
    CARD CLICK
    =========================================*/

    accountCards.forEach(card => {

        card.addEventListener("click", () => {

            const radio = card.querySelector(".yat-account-input");

            if (!radio) return;

            radio.checked = true;

            updateSelectedCard();

        });

    });

    /*=========================================
    RADIO CHANGE
    =========================================*/

    accountInputs.forEach(input => {

        input.addEventListener("change", () => {

            updateSelectedCard();

        });

    });

    /*=========================================
    KEYBOARD ACCESSIBILITY
    =========================================*/

    accountCards.forEach(card => {

        card.setAttribute("tabindex", "0");

        card.addEventListener("keydown", (event) => {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();

                const radio = card.querySelector(".yat-account-input");

                radio.checked = true;

                updateSelectedCard();

            }

        });

    });

    /*=========================================
    GET SELECTED ACCOUNT TYPE
    =========================================*/

    function getSelectedAccountType() {

        const selected = document.querySelector(

            ".yat-account-input:checked"

        );

        return selected ? selected.value : null;

    }

    /*=========================================
    SAVE SELECTION
    =========================================*/

    function saveAccountType(accountType) {

        /*
        ==========================================
        Replace this with your backend API later.

        Example:

        await fetch("/api/account-type",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                accountType:accountType
            })

        });

        ==========================================
        */

        sessionStorage.setItem(

            "yoviAccountType",

            accountType

        );

    }

    /*=========================================
    FORM SUBMIT
    =========================================*/

    accountForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const selectedType = getSelectedAccountType();

        if (!selectedType) {

            alert("Please select an account type.");

            return;

        }

        continueBtn.disabled = true;

        continueBtn.classList.add("loading");

        continueBtn.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Saving...

        `;

        saveAccountType(selectedType);

        console.log("Selected Account Type:", selectedType);

        setTimeout(() => {

            continueBtn.classList.remove("loading");

            continueBtn.classList.add("success");

            continueBtn.innerHTML = `

                <i class="bi bi-check-circle-fill me-2"></i>

                Continue

            `;

            setTimeout(() => {

                /*
                =====================================

                NEXT PAGE

                Linked from verify-phone.html

                Goes to:

                auth/profile-setup.html

                =====================================
                */

                window.location.href = "profile-setup.html";

            }, 700);

        }, 1000);

    });

    /*=========================================
    PREVENT DOUBLE SUBMISSION
    =========================================*/

    continueBtn.addEventListener("click", function () {

        if (continueBtn.classList.contains("loading")) {

            return false;

        }

    });

    /*=========================================
    RESTORE PREVIOUS SELECTION
    =========================================*/

    function restoreAccountType() {

        const savedType = sessionStorage.getItem("yoviAccountType");

        if (!savedType) return;

        accountInputs.forEach(input => {

            if (input.value === savedType) {

                input.checked = true;

            }

        });

        updateSelectedCard();

    }

    restoreAccountType();

    /*=========================================
    CARD RIPPLE EFFECT
    =========================================*/

    accountCards.forEach(card => {

        card.addEventListener("click", function (event) {

            const ripple = document.createElement("span");

            ripple.className = "yat-ripple";

            const rect = card.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            ripple.style.width = `${size}px`;

            ripple.style.height = `${size}px`;

            ripple.style.left = `${event.clientX - rect.left - size / 2}px`;

            ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

            card.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 650);

        });

    });

    /*=========================================
    CARD HOVER LIFT
    =========================================*/

    accountCards.forEach(card => {

        card.addEventListener("mouseenter", function () {

            this.style.transform = "translateY(-6px)";

        });

        card.addEventListener("mouseleave", function () {

            if (this.classList.contains("selected")) {

                this.style.transform = "translateY(-4px)";

            } else {

                this.style.transform = "";

            }

        });

    });

    /*=========================================
    VALIDATE SELECTION
    =========================================*/

    function hasSelectedAccountType() {

        return [...accountInputs].some(input => input.checked);

    }

    /*=========================================
    ENABLE/DISABLE BUTTON
    =========================================*/

    function updateContinueButton() {

        continueBtn.disabled = !hasSelectedAccountType();

    }

    updateContinueButton();

    accountInputs.forEach(input => {

        input.addEventListener("change", updateContinueButton);

    });

    /*=========================================
    SCROLL TO SELECTED CARD
    Mobile Experience
    =========================================*/

    function scrollSelectedCardIntoView() {

        const selectedCard = document.querySelector(

            ".yat-account-card.selected"

        );

        if (!selectedCard) return;

        if (window.innerWidth < 768) {

            selectedCard.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

        }

    }

    accountInputs.forEach(input => {

        input.addEventListener("change", () => {

            setTimeout(scrollSelectedCardIntoView, 150);

        });

    });

    /*=========================================
    KEYBOARD NAVIGATION
    Arrow Keys
    =========================================*/

    accountCards.forEach((card, index) => {

        card.addEventListener("keydown", function (event) {

            let nextIndex = index;

            switch (event.key) {

                case "ArrowRight":

                case "ArrowDown":

                    event.preventDefault();

                    nextIndex = (index + 1) % accountCards.length;
                    break;

                case "ArrowLeft":

                case "ArrowUp":

                    event.preventDefault();

                    nextIndex = (index - 1 + accountCards.length) % accountCards.length;
                    break;

                default:

                    return;

            }

            accountCards[nextIndex].focus();

        });

    });

    /*=========================================
    SAVE CURRENT STEP
    =========================================*/

    sessionStorage.setItem(

        "yoviCurrentStep",

        "account-type"

    );

    /*=========================================
    LEAVE PAGE WARNING
    =========================================*/

    let formSubmitted = false;

    window.addEventListener("beforeunload", function (event) {

        if (formSubmitted) return;

        event.preventDefault();

        event.returnValue = "";

    });

    /*=========================================
    UPDATE SUBMIT STATUS
    =========================================*/

    accountForm.addEventListener("submit", function () {

        formSubmitted = true;

    });

    /*=========================================
    CLEAR SELECTION
    Optional Helper
    =========================================*/

    function clearAccountTypeSelection() {

        accountInputs.forEach(input => {

            input.checked = false;

        });

        accountCards.forEach(card => {

            card.classList.remove("selected");

        });

        updateContinueButton();

    }

    /*=========================================
    RESTORE DEFAULT SELECTION
    =========================================*/

    function selectDefaultAccountType() {

        if (hasSelectedAccountType()) return;

        const defaultInput = accountInputs[0];

        if (!defaultInput) return;

        defaultInput.checked = true;

        updateSelectedCard();

        updateContinueButton();

    }

    selectDefaultAccountType();

    /*=========================================
    DEVELOPMENT LOG
    =========================================*/

    console.info(

        "Account Type page loaded successfully."

    );

    /*=========================================
    TOAST NOTIFICATION
    =========================================*/

    function showAccountToast(message, type = "success") {

        const existingToast = document.getElementById("yatToast");

        if (existingToast) {

            existingToast.remove();

        }

        const toast = document.createElement("div");

        toast.id = "yatToast";

        toast.className = `yat-toast ${type}`;

        toast.innerHTML = `

            <i class="bi ${
                type === "success"
                    ? "bi-check-circle-fill"
                    : "bi-exclamation-circle-fill"
            }"></i>

            <span>${message}</span>

        `;

        document.body.appendChild(toast);

        requestAnimationFrame(() => {

            toast.classList.add("show");

        });

        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(() => {

                toast.remove();

            }, 300);

        }, 3000);

    }

    /*=========================================
    API TEMPLATE
    Replace with your backend endpoint
    =========================================*/

    async function saveAccountTypeToServer(accountType) {

        try {

            /*
            =====================================

            Example API

            const response = await fetch(
                "/api/account-type",
                {

                    method: "POST",

                    headers:{

                        "Content-Type":"application/json"

                    },

                    body:JSON.stringify({

                        accountType:accountType

                    })

                }

            );

            if(!response.ok){

                throw new Error("Unable to save.");

            }

            return await response.json();

            =====================================
            */

            return {

                success: true

            };

        }

        catch(error){

            console.error(error);

            return {

                success:false,

                message:"Unable to save account type."

            };

        }

    }

    /*=========================================
    ONLINE / OFFLINE STATUS
    =========================================*/

    window.addEventListener("offline", () => {

        showAccountToast(

            "No internet connection.",

            "error"

        );

    });

    window.addEventListener("online", () => {

        showAccountToast(

            "Connection restored.",

            "success"

        );

    });

    /*=========================================
    PAGE CLEANUP
    =========================================*/

    window.addEventListener("beforeunload", () => {

        accountCards.forEach(card => {

            card.replaceWith(card.cloneNode(true));

        });

    });

    /*=========================================
    SESSION HELPERS
    =========================================*/

    function getSavedAccountType() {

        return sessionStorage.getItem(

            "yoviAccountType"

        );

    }

    function clearSavedAccountType() {

        sessionStorage.removeItem(

            "yoviAccountType"

        );

    }

    /*=========================================
    DEVELOPMENT LOG
    =========================================*/

    console.group(

        "YOVI Account Type"

    );

    console.log(

        "Current Step:",

        sessionStorage.getItem("yoviCurrentStep")

    );

    console.log(

        "Selected Account:",

        getSavedAccountType()

    );

    console.groupEnd();

    /*=========================================
    READY
    =========================================*/

    console.info(

        "Account Type page initialized successfully."

    );

});


/*==================================================
PROFILE SETUP PAGE (3A)
Initialization • Image Upload • Bio Counter
Unique Prefix: yps-
Append to global.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
    PAGE CHECK
    =========================================*/

    const profilePage = document.getElementById("yps-profile-page");

    if (!profilePage) return;

    /*=========================================
    ELEMENTS
    =========================================*/

    const profileForm = document.getElementById("ypsProfileForm");

    const uploadInput = document.getElementById("ypsProfilePhoto");

    const uploadBox = document.querySelector(".yps-upload-box");

    const uploadBtn = document.getElementById("ypsUploadBtn");

    const skipPhotoBtn = document.getElementById("ypsSkipPhotoBtn");

    const bioInput = document.getElementById("ypsBio");

    const bioCounter = document.getElementById("ypsBioCount");

    const continueBtn = document.getElementById("ypsContinueBtn");

    const firstName = document.getElementById("ypsFirstName");

    const lastName = document.getElementById("ypsLastName");

    const phoneNumber = document.getElementById("ypsPhoneNumber");

    const state = document.getElementById("ypsState");

    const city = document.getElementById("ypsCity");

    /*=========================================
    INITIAL STATE
    =========================================*/

    continueBtn.disabled = false;

    bioCounter.textContent = bioInput.value.length;

    /*=========================================
    OPEN FILE PICKER
    =========================================*/

    uploadBtn.addEventListener("click", () => {

        uploadInput.click();

    });

    uploadBox.addEventListener("click", () => {

        uploadInput.click();

    });

    /*=========================================
    IMAGE PREVIEW
    =========================================*/

    uploadInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {

            alert("Please select a valid image.");

            this.value = "";

            return;

        }

        const reader = new FileReader();

        reader.onload = function (event) {

            uploadBox.classList.add("has-image");

            uploadBox.innerHTML = `
                <img
                    src="${event.target.result}"
                    alt="Profile Photo">
            `;

        };

        reader.readAsDataURL(file);

    });

    /*=========================================
    SKIP PHOTO
    =========================================*/

    skipPhotoBtn.addEventListener("click", () => {

        uploadInput.value = "";

        uploadBox.classList.remove("has-image");

        uploadBox.innerHTML = `
            <div class="yps-upload-icon">
                <i class="bi bi-camera"></i>
            </div>

            <span class="yps-upload-text">
                Upload
            </span>
        `;

    });

    /*=========================================
    BIO CHARACTER COUNTER
    =========================================*/

    bioInput.addEventListener("input", () => {

        bioCounter.textContent = bioInput.value.length;

    });

    /*=========================================
    INPUT ANIMATION
    =========================================*/

    document.querySelectorAll(".yps-input, .yps-textarea")
        .forEach(input => {

            input.addEventListener("focus", function () {

                this.parentElement.classList.add("active");

            });

            input.addEventListener("blur", function () {

                this.parentElement.classList.remove("active");

            });

        });

/*==================================================
PROFILE SETUP PAGE (3B)
Validation • Session Storage • Form Submission
Append after Part 3A
==================================================*/

    /*=========================================
    VALIDATION HELPERS
    =========================================*/

    function validateField(field) {

        if (!field.value.trim()) {

            field.classList.remove("is-valid");

            field.classList.add("is-invalid");

            return false;

        }

        field.classList.remove("is-invalid");

        field.classList.add("is-valid");

        return true;

    }

    /*=========================================
    REAL-TIME VALIDATION
    =========================================*/

    [
        firstName,
        lastName,
        phoneNumber,
        state,
        city
    ].forEach(field => {

        field.addEventListener("blur", () => {

            validateField(field);

        });

        field.addEventListener("input", () => {

            if (field.classList.contains("is-invalid")) {

                validateField(field);

            }

        });

    });

    /*=========================================
    SAVE PROFILE
    =========================================*/

    function saveProfileData() {

        const profile = {

            firstName: firstName.value.trim(),

            lastName: lastName.value.trim(),

            phoneNumber: phoneNumber.value.trim(),

            state: state.value,

            city: city.value.trim(),

            bio: bioInput.value.trim()

        };

        sessionStorage.setItem(

            "yoviProfile",

            JSON.stringify(profile)

        );

    }

    /*=========================================
    FORM SUBMISSION
    =========================================*/

    profileForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const isValid =

            validateField(firstName) &&
            validateField(lastName) &&
            validateField(phoneNumber) &&
            validateField(state) &&
            validateField(city);

        if (!isValid) {

            alert("Please complete all required fields.");

            return;

        }

        continueBtn.disabled = true;

        continueBtn.classList.add("loading");

        continueBtn.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Saving Profile...

        `;

        saveProfileData();

        setTimeout(() => {

            continueBtn.classList.remove("loading");

            continueBtn.classList.add("success");

            continueBtn.innerHTML = `

                <i class="bi bi-check-circle-fill me-2"></i>

                Continue

            `;

            /*
            =========================================
            NAVIGATION

            If Service Provider
                → service-setup.html

            Otherwise
                → dashboard/index.html

            =========================================
            */

            const accountType = sessionStorage.getItem("yoviAccountType");

            setTimeout(() => {

                if (
                    accountType &&
                    accountType.toLowerCase().includes("service")
                ) {

                    window.location.href = "service-setup.html";

                } else {

                    window.location.href =
                        "index.html";

                }

            }, 700);

        }, 1000);

    });

    /*=========================================
    AUTO SAVE
    =========================================*/

    [
        firstName,
        lastName,
        phoneNumber,
        state,
        city,
        bioInput
    ].forEach(field => {

        field.addEventListener("change", saveProfileData);

    });

    /*=========================================
    RESTORE SAVED PROFILE
    =========================================*/

    function restoreProfileData() {

        const savedProfile = sessionStorage.getItem("yoviProfile");

        if (!savedProfile) return;

        try {

            const profile = JSON.parse(savedProfile);

            firstName.value = profile.firstName || "";

            lastName.value = profile.lastName || "";

            phoneNumber.value = profile.phoneNumber || "";

            state.value = profile.state || "";

            city.value = profile.city || "";

            bioInput.value = profile.bio || "";

            bioCounter.textContent = bioInput.value.length;

        }

        catch (error) {

            console.error("Unable to restore profile.", error);

        }

    }

    restoreProfileData();

    /*=========================================
    PHONE NUMBER FORMATTER
    =========================================*/

    phoneNumber.addEventListener("input", function () {

        let value = this.value.replace(/\D/g, "");

        value = value.substring(0, 11);

        if (value.length > 7) {

            value = value.replace(

                /(\d{4})(\d{3})(\d+)/,

                "$1 $2 $3"

            );

        }

        else if (value.length > 4) {

            value = value.replace(

                /(\d{4})(\d+)/,

                "$1 $2"

            );

        }

        this.value = value;

    });

    /*=========================================
    FILE SIZE VALIDATION
    =========================================*/

    uploadInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {

            alert("Image size must not exceed 5MB.");

            this.value = "";

            return;

        }

    });

    /*=========================================
    DRAG & DROP SUPPORT
    =========================================*/

    ["dragenter", "dragover"].forEach(eventName => {

        uploadBox.addEventListener(eventName, function (event) {

            event.preventDefault();

            this.classList.add("dragging");

        });

    });

    ["dragleave", "drop"].forEach(eventName => {

        uploadBox.addEventListener(eventName, function (event) {

            event.preventDefault();

            this.classList.remove("dragging");

        });

    });

    uploadBox.addEventListener("drop", function (event) {

        const files = event.dataTransfer.files;

        if (!files.length) return;

        uploadInput.files = files;

        uploadInput.dispatchEvent(new Event("change"));

    });

    /*=========================================
    ENTER KEY SUBMISSION
    =========================================*/

    profileForm.addEventListener("keydown", function (event) {

        if (

            event.key === "Enter" &&

            event.target.tagName !== "TEXTAREA"

        ) {

            event.preventDefault();

            continueBtn.click();

        }

    });

    /*=========================================
    STEP TRACKING
    =========================================*/

    sessionStorage.setItem(

        "yoviCurrentStep",

        "profile-setup"

    );

    console.info(

        "Profile Setup restored successfully."

    );


    /*=========================================
    KEYBOARD NAVIGATION
    =========================================*/

    const formFields = [

        firstName,

        lastName,

        phoneNumber,

        state,

        city,

        bioInput

    ];

    formFields.forEach((field, index) => {

        field.addEventListener("keydown", function (event) {

            if (event.key !== "Enter") return;

            if (this.tagName === "TEXTAREA") return;

            event.preventDefault();

            const nextField = formFields[index + 1];

            if (nextField) {

                nextField.focus();

            } else {

                continueBtn.focus();

            }

        });

    });

    /*=========================================
    AUTO CAPITALIZE NAME FIELDS
    =========================================*/

    function capitalizeWords(value) {

        return value.replace(/\b\w/g, letter => letter.toUpperCase());

    }

    [firstName, lastName, city].forEach(field => {

        field.addEventListener("blur", function () {

            this.value = capitalizeWords(

                this.value.trim()

            );

        });

    });

    /*=========================================
    BEFORE LEAVE WARNING
    =========================================*/

    let profileSubmitted = false;

    window.addEventListener("beforeunload", function (event) {

        if (profileSubmitted) return;

        const hasData =

            firstName.value ||

            lastName.value ||

            phoneNumber.value ||

            city.value ||

            bioInput.value;

        if (!hasData) return;

        event.preventDefault();

        event.returnValue = "";

    });

    /*=========================================
    MARK SUBMITTED
    =========================================*/

    profileForm.addEventListener("submit", function () {

        profileSubmitted = true;

    });

    /*=========================================
    SCROLL TO FIRST ERROR
    =========================================*/

    function scrollToFirstError() {

        const invalidField = document.querySelector(

            "#yps-profile-page .is-invalid"

        );

        if (!invalidField) return;

        invalidField.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

        setTimeout(() => {

            invalidField.focus();

        }, 300);

    }

    /*=========================================
    OVERRIDE VALIDATION
    =========================================*/

    const originalValidate = validateField;

    validateField = function(field){

        const valid = originalValidate(field);

        if(!valid){

            scrollToFirstError();

        }

        return valid;

    };

    /*=========================================
    PROGRESS INDICATOR
    =========================================*/

    function updateCompletionProgress(){

        let completed = 0;

        [

            firstName,

            lastName,

            phoneNumber,

            state,

            city

        ].forEach(field => {

            if(field.value.trim()){

                completed++;

            }

        });

        profileForm.dataset.progress = completed;

    }

    formFields.forEach(field => {

        field.addEventListener(

            "input",

            updateCompletionProgress

        );

    });

    updateCompletionProgress();

    /*=========================================
    DEVELOPMENT LOG
    =========================================*/

    console.info(

        "Profile Setup UX initialized."

    );

    /*=========================================
    TOAST NOTIFICATION
    =========================================*/

    function showProfileToast(message, type = "success") {

        const existingToast = document.getElementById("ypsToast");

        if (existingToast) {

            existingToast.remove();

        }

        const toast = document.createElement("div");

        toast.id = "ypsToast";

        toast.className = `yps-toast ${type}`;

        toast.innerHTML = `

            <i class="bi ${
                type === "success"
                    ? "bi-check-circle-fill"
                    : "bi-exclamation-circle-fill"
            }"></i>

            <span>${message}</span>

        `;

        document.body.appendChild(toast);

        requestAnimationFrame(() => {

            toast.classList.add("show");

        });

        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(() => {

                toast.remove();

            }, 300);

        }, 3000);

    }

    /*=========================================
    API TEMPLATE
    Replace with your backend endpoint
    =========================================*/

    async function saveProfileToServer(profileData) {

        try {

            /*
            Example:

            const response = await fetch("/api/profile", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(profileData)

            });

            if (!response.ok) {

                throw new Error("Failed to save profile.");

            }

            return await response.json();
            */

            return {

                success: true

            };

        }

        catch (error) {

            console.error(error);

            return {

                success: false,

                message: "Unable to save profile."

            };

        }

    }

    /*=========================================
    ONLINE / OFFLINE STATUS
    =========================================*/

    window.addEventListener("offline", () => {

        showProfileToast(

            "You are offline.",

            "error"

        );

    });

    window.addEventListener("online", () => {

        showProfileToast(

            "Connection restored.",

            "success"

        );

    });

    /*=========================================
    AUTO SAVE INDICATOR
    =========================================*/

    let autoSaveTimer;

    formFields.forEach(field => {

        field.addEventListener("input", () => {

            clearTimeout(autoSaveTimer);

            autoSaveTimer = setTimeout(() => {

                saveProfileData();

                console.info("Profile auto-saved.");

            }, 800);

        });

    });

    /*=========================================
    SESSION HELPERS
    =========================================*/

    function getSavedProfile() {

        return JSON.parse(

            sessionStorage.getItem("yoviProfile") || "{}"

        );

    }

    function clearSavedProfile() {

        sessionStorage.removeItem("yoviProfile");

    }

    /*=========================================
    PAGE CLEANUP
    =========================================*/

    window.addEventListener("beforeunload", () => {

        clearTimeout(autoSaveTimer);

    });

    /*=========================================
    DEVELOPMENT LOG
    =========================================*/

    console.group("YOVI Profile Setup");

    console.log(

        "Current Step:",

        sessionStorage.getItem("yoviCurrentStep")

    );

    console.log(

        "Selected Account Type:",

        sessionStorage.getItem("yoviAccountType")

    );

    console.log(

        "Saved Profile:",

        getSavedProfile()

    );

    console.groupEnd();

    console.info(

        "Profile Setup page initialized successfully."

    );

});


document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
    PAGE CHECK
    =========================================*/

    const servicePage = document.getElementById("yss-service-page");

    if (!servicePage) return;

    /*=========================================
    ELEMENTS
    =========================================*/

    const serviceForm = document.getElementById("yssServiceForm");

    const professionalTitle = document.getElementById("yssProfessionalTitle");

    const categoryCards = document.querySelectorAll(".yss-category-card");

    const selectedCategory = document.getElementById("yssSelectedCategory");

    const experienceButtons = document.querySelectorAll(".yss-experience-btn");

    const experienceInput = document.getElementById("yssExperience");

    const startingRate = document.getElementById("yssStartingRate");

    const serviceImageInput = document.getElementById("yssServiceImage");

    const imageLabel = document.querySelector(".yss-service-image");

    const stateInput = document.getElementById("yssState");

    const cityInput = document.getElementById("yssCity");

    const bankName = document.getElementById("yssBankName");

    const accountNumber = document.getElementById("yssAccountNumber");

    const continueBtn = document.getElementById("yssContinueBtn");

    /*=========================================
    INITIAL STATE
    =========================================*/

    continueBtn.disabled = false;

    /*=========================================
    SERVICE CATEGORY
    =========================================*/

    categoryCards.forEach(card => {

        card.addEventListener("click", () => {

            categoryCards.forEach(item => {

                item.classList.remove("active");

            });

            card.classList.add("active");

            selectedCategory.value =

                card.dataset.category;

        });

    });

    /*=========================================
    YEARS OF EXPERIENCE
    =========================================*/

    experienceButtons.forEach(button => {

        button.addEventListener("click", () => {

            experienceButtons.forEach(item => {

                item.classList.remove("active");

            });

            button.classList.add("active");

            experienceInput.value =

                button.dataset.experience;

        });

    });

    /*=========================================
    IMAGE PREVIEW
    =========================================*/

    serviceImageInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {

            alert("Please select a valid image.");

            this.value = "";

            return;

        }

        const reader = new FileReader();

        reader.onload = function (event) {

            imageLabel.innerHTML = `

                <img
                    src="${event.target.result}"
                    class="yss-service-image-preview"
                    alt="Service Image">

            `;

        };

        reader.readAsDataURL(file);

    });

    /*=========================================
    RATE FORMAT
    =========================================*/

    startingRate.addEventListener("input", function () {

        this.value =

            this.value.replace(/[^0-9]/g, "");

    });

    /*=========================================
    ACCOUNT NUMBER
    =========================================*/

    accountNumber.addEventListener("input", function () {

        this.value =

            this.value

                .replace(/\D/g, "")

                .substring(0, 10);

    });

    /*=========================================
    INPUT FOCUS EFFECT
    =========================================*/

    document

        .querySelectorAll(".yss-input")

        .forEach(input => {

            input.addEventListener("focus", function () {

                this.parentElement.classList.add("active");

            });

            input.addEventListener("blur", function () {

                this.parentElement.classList.remove("active");

            });

        });


    /*=========================================
    VALIDATION
    =========================================*/

    function validateField(field) {

        if (!field.value.trim()) {

            field.classList.remove("is-valid");

            field.classList.add("is-invalid");

            return false;

        }

        field.classList.remove("is-invalid");

        field.classList.add("is-valid");

        return true;

    }

    /*=========================================
    REAL-TIME VALIDATION
    =========================================*/

    [

        professionalTitle,

        startingRate,

        stateInput,

        cityInput,

        bankName,

        accountNumber

    ].forEach(field => {

        field.addEventListener("blur", () => {

            validateField(field);

        });

        field.addEventListener("input", () => {

            if (field.classList.contains("is-invalid")) {

                validateField(field);

            }

        });

    });

    /*=========================================
    SAVE TO SESSION STORAGE
    =========================================*/

    function saveServiceSetup() {

        const serviceData = {

            professionalTitle:

                professionalTitle.value.trim(),

            serviceCategory:

                selectedCategory.value,

            experience:

                experienceInput.value,

            startingRate:

                startingRate.value,

            state:

                stateInput.value.trim(),

            city:

                cityInput.value.trim(),

            bankName:

                bankName.value,

            accountNumber:

                accountNumber.value.trim()

        };

        sessionStorage.setItem(

            "yoviServiceSetup",

            JSON.stringify(serviceData)

        );

    }

    /*=========================================
    FORM SUBMISSION
    =========================================*/

    serviceForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const isValid =

            validateField(professionalTitle) &&
            validateField(startingRate) &&
            validateField(stateInput) &&
            validateField(cityInput) &&
            validateField(bankName) &&
            validateField(accountNumber);

        if (!isValid) {

            alert("Please complete all required fields.");

            return;

        }

        if (accountNumber.value.length !== 10) {

            alert("Account number must contain exactly 10 digits.");

            accountNumber.focus();

            return;

        }

        continueBtn.disabled = true;

        continueBtn.classList.add("loading");

        continueBtn.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Saving Service...

        `;

        saveServiceSetup();

        setTimeout(() => {

            continueBtn.classList.remove("loading");

            continueBtn.classList.add("success");

            continueBtn.innerHTML = `

                <i class="bi bi-check-circle-fill me-2"></i>

                Saved Successfully

            `;

            setTimeout(() => {

                /*==================================
                NEXT PAGE
                ==================================*/

                window.location.href =

                    "provider/provider-dashboard.html";

            }, 800);

        }, 1200);

    });

    /*=========================================
    AUTO SAVE
    =========================================*/

    [

        professionalTitle,

        startingRate,

        stateInput,

        cityInput,

        bankName,

        accountNumber

    ].forEach(field => {

        field.addEventListener(

            "change",

            saveServiceSetup

        );

    });

    /*=========================================
    RESTORE SAVED DATA
    =========================================*/

    function restoreServiceSetup() {

        const savedData = sessionStorage.getItem("yoviServiceSetup");

        if (!savedData) return;

        try {

            const data = JSON.parse(savedData);

            professionalTitle.value = data.professionalTitle || "";

            selectedCategory.value = data.serviceCategory || "Automotive";

            experienceInput.value = data.experience || "6-10 yrs";

            startingRate.value = data.startingRate || "";

            stateInput.value = data.state || "";

            cityInput.value = data.city || "";

            bankName.value = data.bankName || "";

            accountNumber.value = data.accountNumber || "";

            /* Restore Category */

            categoryCards.forEach(card => {

                card.classList.remove("active");

                if (card.dataset.category === selectedCategory.value) {

                    card.classList.add("active");

                }

            });

            /* Restore Experience */

            experienceButtons.forEach(button => {

                button.classList.remove("active");

                if (button.dataset.experience === experienceInput.value) {

                    button.classList.add("active");

                }

            });

        } catch (error) {

            console.error(

                "Unable to restore Service Setup.",

                error

            );

        }

    }

    restoreServiceSetup();

    /*=========================================
    IMAGE SIZE VALIDATION
    =========================================*/

    serviceImageInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {

            alert("Image size must not exceed 5MB.");

            this.value = "";

            return;

        }

    });

    /*=========================================
    DRAG & DROP IMAGE SUPPORT
    =========================================*/

    ["dragenter", "dragover"].forEach(eventName => {

        imageLabel.addEventListener(eventName, function (event) {

            event.preventDefault();

            this.classList.add("dragging");

        });

    });

    ["dragleave", "drop"].forEach(eventName => {

        imageLabel.addEventListener(eventName, function (event) {

            event.preventDefault();

            this.classList.remove("dragging");

        });

    });

    imageLabel.addEventListener("drop", function (event) {

        const files = event.dataTransfer.files;

        if (!files.length) return;

        serviceImageInput.files = files;

        serviceImageInput.dispatchEvent(

            new Event("change")

        );

    });

    /*=========================================
    AUTO CAPITALIZE TEXT INPUTS
    =========================================*/

    function capitalizeWords(value) {

        return value.replace(/\b\w/g, char => char.toUpperCase());

    }

    [

        professionalTitle,

        stateInput,

        cityInput

    ].forEach(field => {

        field.addEventListener("blur", function () {

            this.value = capitalizeWords(

                this.value.trim()

            );

        });

    });

    /*=========================================
    STEP TRACKING
    =========================================*/

    sessionStorage.setItem(

        "yoviCurrentStep",

        "service-setup"

    );

    console.info(

        "Service Setup restored successfully."

    );


    /*=========================================
    KEYBOARD NAVIGATION
    =========================================*/

    const formFields = [

        professionalTitle,

        startingRate,

        stateInput,

        cityInput,

        bankName,

        accountNumber

    ];

    formFields.forEach((field, index) => {

        field.addEventListener("keydown", function(event){

            if(event.key !== "Enter") return;

            event.preventDefault();

            const nextField = formFields[index + 1];

            if(nextField){

                nextField.focus();

            }else{

                continueBtn.focus();

            }

        });

    });

    /*=========================================
    UNSAVED CHANGES WARNING
    =========================================*/

    let serviceSetupCompleted = false;

    window.addEventListener("beforeunload", function(event){

        if(serviceSetupCompleted) return;

        const hasChanges =

            professionalTitle.value ||

            startingRate.value ||

            stateInput.value ||

            cityInput.value ||

            bankName.value ||

            accountNumber.value;

        if(!hasChanges) return;

        event.preventDefault();

        event.returnValue = "";

    });

    serviceForm.addEventListener("submit", function(){

        serviceSetupCompleted = true;

    });

    /*=========================================
    SCROLL TO FIRST ERROR
    =========================================*/

    function scrollToFirstError(){

        const invalidField = document.querySelector(

            "#yss-service-page .is-invalid"

        );

        if(!invalidField) return;

        invalidField.scrollIntoView({

            behavior:"smooth",

            block:"center"

        });

        setTimeout(()=>{

            invalidField.focus();

        },300);

    }

    /*=========================================
    OVERRIDE VALIDATION
    =========================================*/

    const originalValidate = validateField;

    validateField = function(field){

        const valid = originalValidate(field);

        if(!valid){

            scrollToFirstError();

        }

        return valid;

    };

    /*=========================================
    FORM COMPLETION PROGRESS
    =========================================*/

    function updateCompletionProgress(){

        let completed = 0;

        [

            professionalTitle,

            startingRate,

            stateInput,

            cityInput,

            bankName,

            accountNumber

        ].forEach(field=>{

            if(field.value.trim()){

                completed++;

            }

        });

        serviceForm.dataset.progress = completed;

    }

    formFields.forEach(field=>{

        field.addEventListener(

            "input",

            updateCompletionProgress

        );

        field.addEventListener(

            "change",

            updateCompletionProgress

        );

    });

    updateCompletionProgress();

    /*=========================================
    PREVENT DOUBLE SUBMISSION
    =========================================*/

    let submitting = false;

    serviceForm.addEventListener("submit", function(event){

        if(submitting){

            event.preventDefault();

            return;

        }

        submitting = true;

    });

    /*=========================================
    DEVELOPMENT LOG
    =========================================*/

    console.info(

        "Service Setup UX initialized."

    );

    /*=========================================
    TOAST NOTIFICATION
    =========================================*/

    function showServiceToast(message, type = "success") {

        const existingToast = document.getElementById("yssToast");

        if (existingToast) {

            existingToast.remove();

        }

        const toast = document.createElement("div");

        toast.id = "yssToast";

        toast.className = `yss-toast ${type}`;

        toast.innerHTML = `

            <i class="bi ${
                type === "success"
                    ? "bi-check-circle-fill"
                    : "bi-exclamation-circle-fill"
            }"></i>

            <span>${message}</span>

        `;

        document.body.appendChild(toast);

        requestAnimationFrame(() => {

            toast.classList.add("show");

        });

        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(() => {

                toast.remove();

            }, 300);

        }, 3000);

    }

    /*=========================================
    API TEMPLATE
    Replace with your backend endpoint
    =========================================*/

    async function saveServiceToServer(serviceData) {

        try {

            /*
            Example:

            const response = await fetch("/api/service/setup", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(serviceData)

            });

            if (!response.ok) {

                throw new Error("Failed to save.");

            }

            return await response.json();
            */

            return {

                success: true

            };

        }

        catch (error) {

            console.error(error);

            return {

                success: false,

                message: "Unable to save service setup."

            };

        }

    }

    /*=========================================
    ONLINE / OFFLINE STATUS
    =========================================*/

    window.addEventListener("offline", () => {

        showServiceToast(

            "You're currently offline.",

            "error"

        );

    });

    window.addEventListener("online", () => {

        showServiceToast(

            "Internet connection restored.",

            "success"

        );

    });

    /*=========================================
    AUTO SAVE
    =========================================*/

    let autoSaveTimer;

    [

        professionalTitle,

        startingRate,

        stateInput,

        cityInput,

        bankName,

        accountNumber

    ].forEach(field => {

        field.addEventListener("input", () => {

            clearTimeout(autoSaveTimer);

            autoSaveTimer = setTimeout(() => {

                saveServiceSetup();

                console.info(

                    "Service setup auto-saved."

                );

            }, 800);

        });

    });

    /*=========================================
    SESSION HELPERS
    =========================================*/

    function getSavedServiceSetup() {

        return JSON.parse(

            sessionStorage.getItem("yoviServiceSetup") || "{}"

        );

    }

    function clearSavedServiceSetup() {

        sessionStorage.removeItem(

            "yoviServiceSetup"

        );

    }

    /*=========================================
    CLEANUP
    =========================================*/

    window.addEventListener("beforeunload", () => {

        clearTimeout(autoSaveTimer);

    });

    /*=========================================
    DEVELOPMENT LOG
    =========================================*/

    console.group("YOVI Service Setup");

    console.log(

        "Current Step:",

        sessionStorage.getItem("yoviCurrentStep")

    );

    console.log(

        "Selected Category:",

        selectedCategory.value

    );

    console.log(

        "Experience:",

        experienceInput.value

    );

    console.log(

        "Saved Data:",

        getSavedServiceSetup()

    );

    console.groupEnd();

    console.info(

        "Service Setup page initialized successfully."

    );

});


/*==================================================
SERVICE PROVIDER DONE PAGE 
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
    PAGE CHECK
    =========================================*/

    const donePage = document.getElementById("yspdDonePage");

    if (!donePage) return;

    /*=========================================
    ELEMENT REFERENCES
    =========================================*/

    const loader = document.getElementById("yspdPageLoader");

    const toastElement = document.getElementById("yspdToast");

    const toastMessage = document.getElementById("yspdToastMessage");

    const confettiContainer = document.getElementById("yspdConfettiContainer");

    const availabilityBtn = document.getElementById("yspdAvailabilityBtn");

    const dashboardBtn = document.getElementById("yspdDashboardBtn");

    const homeBtn = document.getElementById("yspdBackHomeBtn");

    const notificationBtn = document.getElementById("yspdNotificationBtn");

    const nextPage = document.getElementById("yspdNextPage");

    const availabilityPage = document.getElementById("yspdAvailabilityPage");

    const accountStatus = document.getElementById("yspdAccountStatus");

    const userRole = document.getElementById("yspdUserRole");

    /*=========================================
    BOOTSTRAP TOAST
    =========================================*/

    const successToast = new bootstrap.Toast(

        toastElement,

        {

            delay:2500

        }

    );

    /*=========================================
    SHOW TOAST
    =========================================*/

    function showToast(message){

        toastMessage.textContent = message;

        successToast.show();

    }

    /*=========================================
    PAGE LOADER
    =========================================*/

    function showLoader(){

        loader.classList.add("show");

    }

    function hideLoader(){

        loader.classList.remove("show");

    }

    /*=========================================
    INITIAL SESSION
    =========================================*/

    sessionStorage.setItem(

        "yoviCurrentStep",

        "service-provider-done"

    );

    sessionStorage.setItem(

        "yoviProviderStatus",

        accountStatus.value

    );

    sessionStorage.setItem(

        "yoviUserRole",

        userRole.value

    );

    /*=========================================
    INITIAL SUCCESS MESSAGE
    =========================================*/

    setTimeout(() => {

        showToast(

            "🎉 Congratulations! Your account is now live."

        );

    },600);

    /*=========================================
    ENTRANCE ANIMATION
    =========================================*/

    donePage.classList.add(

        "yspd-page-loaded"

    );

    /*=========================================
    NAVIGATION
    =========================================*/

    availabilityBtn.addEventListener("click", () => {

        showLoader();

        availabilityBtn.disabled = true;

        availabilityBtn.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Opening...

        `;

        setTimeout(() => {

            window.location.href =

                availabilityPage.value;

        },800);

    });

    dashboardBtn.addEventListener("click", () => {

        showLoader();

        dashboardBtn.disabled = true;

        dashboardBtn.innerHTML = `

            <i class="bi bi-speedometer2 me-2"></i>

            Loading Dashboard...

        `;

        setTimeout(() => {

            window.location.href = "";

                nextPage.value;

        },800);

    });


    /*=========================================
    BACK TO HOME
    =========================================*/

    homeBtn.addEventListener("click", () => {

        showLoader();

        setTimeout(() => {

            window.location.href = "index.html";

        }, 700);

    });

    /*=========================================
    NOTIFICATIONS
    =========================================*/

    notificationBtn.addEventListener("click", () => {

        showLoader();

        setTimeout(() => {

            window.location.href = "notifications.html";

        }, 700);

    });

    /*=========================================
    CONFETTI EFFECT
    =========================================*/

    function launchConfetti() {

        const colors = [

            "green",

            "blue",

            "purple",

            "yellow",

            "red"

        ];

        for (let i = 0; i < 120; i++) {

            const piece = document.createElement("div");

            piece.className = `yspd-confetti ${

                colors[Math.floor(Math.random() * colors.length)]

            }`;

            piece.style.left =

                Math.random() * 100 + "%";

            piece.style.animationDuration =

                (Math.random() * 3 + 2) + "s";

            piece.style.animationDelay =

                Math.random() * .8 + "s";

            piece.style.transform =

                `rotate(${Math.random() * 360}deg)`;

            confettiContainer.appendChild(piece);

            piece.addEventListener("animationend", () => {

                piece.remove();

            });

        }

    }

    /*=========================================
    START CELEBRATION
    =========================================*/

    setTimeout(() => {

        launchConfetti();

    }, 500);

    /*=========================================
    PLAY SUCCESS SOUND
    (Optional)
    =========================================*/

    function playSuccessSound() {

        /*
        Optional:

        const audio = new Audio(
            "assets/audio/success.mp3"
        );

        audio.play();

        */

    }

    playSuccessSound();

    /*=========================================
    SAVE FINAL STATE
    =========================================*/

    sessionStorage.setItem(

        "yoviSetupCompleted",

        "true"

    );

    sessionStorage.setItem(

        "yoviDashboardReady",

        "true"

    );

    /*=========================================
    LOG
    =========================================*/

    console.info(

        "Service Provider setup completed."

    );


    /*=========================================
    RESTORE SESSION
    =========================================*/

    function restoreProviderSession() {

        const providerStatus = sessionStorage.getItem(

            "yoviProviderStatus"

        );

        const currentStep = sessionStorage.getItem(

            "yoviCurrentStep"

        );

        const dashboardReady = sessionStorage.getItem(

            "yoviDashboardReady"

        );

        console.info("Provider Status:", providerStatus);

        console.info("Current Step:", currentStep);

        console.info("Dashboard Ready:", dashboardReady);

    }

    restoreProviderSession();

    /*=========================================
    MARK ONBOARDING COMPLETE
    =========================================*/

    sessionStorage.setItem(

        "yoviOnboardingCompleted",

        "true"

    );

    sessionStorage.setItem(

        "yoviLastCompletedPage",

        "service-provider-done"

    );

    sessionStorage.setItem(

        "yoviAccountActivated",

        "true"

    );

    /*=========================================
    PRELOAD DASHBOARD
    =========================================*/

    function preloadDashboard() {

        const preloadLink = document.createElement("link");

        preloadLink.rel = "prefetch";

        preloadLink.href = nextPage.value;

        document.head.appendChild(preloadLink);

    }

    preloadDashboard();

    /*=========================================
    AUTO HIDE LOADER
    =========================================*/

    window.addEventListener("load", () => {

        hideLoader();

    });

    /*=========================================
    BUTTON HOVER ANIMATION
    =========================================*/

    [

        availabilityBtn,

        dashboardBtn

    ].forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.style.transform =

                "translateY(-2px)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });

    /*=========================================
    KEYBOARD SHORTCUTS
    =========================================*/

    document.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            dashboardBtn.click();

        }

        if (

            event.key.toLowerCase() === "a"

        ) {

            availabilityBtn.click();

        }

    });

    /*=========================================
    PAGE VISIBILITY
    =========================================*/

    document.addEventListener(

        "visibilitychange",

        () => {

            if (!document.hidden) {

                console.info(

                    "Welcome back."

                );

            }

        }

    );

    /*=========================================
    ANALYTICS PLACEHOLDER
    =========================================*/

    function trackCompletion() {

        console.info(

            "Analytics Event:",

            "Service Provider Completed"

        );

        /*
        Example:

        gtag('event','provider_completed',{
            role:'service-provider'
        });

        */

    }

    trackCompletion();

    /*=========================================
    PREVENT MULTIPLE CLICKS
    =========================================*/

    let navigationInProgress = false;

    function beginNavigation(button) {

        if (navigationInProgress) return false;

        navigationInProgress = true;

        button.disabled = true;

        showLoader();

        return true;

    }

    /*=========================================
    BUTTON NAVIGATION OVERRIDE
    =========================================*/

    availabilityBtn.addEventListener("click", function (event) {

        event.stopImmediatePropagation();

        if (!beginNavigation(this)) return;

        this.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Redirecting...

        `;

        setTimeout(() => {

            window.location.href = "";
            
            availabilityPage.value;

        }, 900);

    });

    dashboardBtn.addEventListener("click", function (event) {

        event.stopImmediatePropagation();

        if (!beginNavigation(this)) return;

        this.innerHTML = `

            <i class="bi bi-speedometer2 me-2"></i>

            Opening Dashboard...

        `;

        setTimeout(() => {

            window.location.href = "";
            
            nextPage.value;

        }, 900);

    });

    /*=========================================
    FOCUS MANAGEMENT
    =========================================*/

    window.addEventListener("load", () => {

        dashboardBtn.focus();

    });

    /*=========================================
    ESC KEY SUPPORT
    =========================================*/

    document.addEventListener("keydown", function (event) {

        if (event.key !== "Escape") return;

        hideLoader();

    });

    /*=========================================
    NETWORK STATUS
    =========================================*/

    window.addEventListener("offline", () => {

        showToast(

            "No internet connection detected."

        );

    });

    window.addEventListener("online", () => {

        showToast(

            "Connection restored."

        );

    });

    /*=========================================
    PAGE PERFORMANCE
    =========================================*/

    window.addEventListener("load", () => {

        if ("performance" in window) {

            console.info(

                "Page loaded in",

                Math.round(performance.now()),

                "ms"

            );

        }

    });

    /*=========================================
    DASHBOARD PREFETCH
    =========================================*/

    fetch(nextPage.value, {

        method: "GET",

        cache: "force-cache"

    }).catch(() => {

        /* Ignore prefetch failures */

    });

    /*=========================================
    CLEAN SESSION
    =========================================*/

    function finalizeOnboarding() {

        sessionStorage.setItem(

            "yoviSetupFinished",

            "true"

        );

        sessionStorage.removeItem(

            "yoviCurrentStep"

        );

    }

    finalizeOnboarding();

    /*=========================================
    DEVELOPMENT LOG
    =========================================*/

    console.info(

        "Service Provider Done UX initialized."

    );

    /*=========================================
    SAVE COMPLETION RECORD
    =========================================*/

    function saveCompletionRecord() {

        const completionData = {

            completed: true,

            role: "service-provider",

            completedAt: new Date().toISOString(),

            nextPage: nextPage.value

        };

        localStorage.setItem(

            "yoviServiceProviderCompletion",

            JSON.stringify(completionData)

        );

    }

    saveCompletionRecord();

    /*=========================================
    AUTO SAVE USER SESSION
    =========================================*/

    function updateLastActivity() {

        sessionStorage.setItem(

            "yoviLastActivity",

            Date.now()

        );

    }

    updateLastActivity();

    document.addEventListener(

        "click",

        updateLastActivity

    );

    document.addEventListener(

        "keydown",

        updateLastActivity

    );

    /*=========================================
    BEFORE UNLOAD
    =========================================*/

    window.addEventListener("beforeunload", () => {

        sessionStorage.setItem(

            "yoviLastVisitedPage",

            "service-provider-done"

        );

    });

    /*=========================================
    CLEAR TEMPORARY SETUP DATA
    Keep only required onboarding data
    =========================================*/

    function clearTemporaryData() {

        const temporaryKeys = [

            "yoviServiceSetup",

            "yoviProfileSetup",

            "yoviCurrentStep"

        ];

        temporaryKeys.forEach(key => {

            sessionStorage.removeItem(key);

        });

    }

    clearTemporaryData();

    /*=========================================
    CHECK DASHBOARD ACCESS
    =========================================*/

    function dashboardAccessible() {

        return (

            sessionStorage.getItem(

                "yoviDashboardReady"

            ) === "true"

        );

    }

    console.info(

        "Dashboard Access:",

        dashboardAccessible()

    );

    /*=========================================
    PAGE TIMER
    =========================================*/

    const pageOpenedAt = Date.now();

    window.addEventListener("pagehide", () => {

        const duration =

            Math.round(

                (Date.now() - pageOpenedAt) / 1000

            );

        console.info(

            `Time spent on completion page: ${duration}s`

        );

    });

    /*=========================================
    DEVELOPMENT HELPERS
    =========================================*/

    window.yoviServiceProviderDone = {

        showToast,

        showLoader,

        hideLoader,

        dashboardAccessible,

        saveCompletionRecord

    };

    /*=========================================
    INITIALIZATION COMPLETE
    =========================================*/

    console.group(

        "YOVI - Service Provider Done"

    );

    console.log(

        "Role:",

        sessionStorage.getItem("yoviUserRole")

    );

    console.log(

        "Status:",

        sessionStorage.getItem("yoviProviderStatus")

    );

    console.log(

        "Dashboard:",

        nextPage.value

    );

    console.log(

        "Availability:",

        availabilityPage.value

    );

    console.groupEnd();

    console.info(

        "✔ Service Provider Done page initialized successfully."

    );

});


/*==================================================
SELLER DONE PAGE (3A)
Initialization • Elements • Navigation
Unique Prefix: ysd-
File: seller-done.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
    PAGE CHECK
    =========================================*/

    const donePage = document.getElementById("ysdDonePage");

    if (!donePage) return;

    /*=========================================
    ELEMENT REFERENCES
    =========================================*/

    const loader = document.getElementById("ysdPageLoader");

    const toastElement = document.getElementById("ysdToast");

    const toastMessage = document.getElementById("ysdToastMessage");

    const confettiContainer = document.getElementById("ysdConfettiContainer");

    const addProductBtn = document.getElementById("ysdAddFirstProductBtn");

    const dashboardBtn = document.getElementById("ysdViewDashboardBtn");

    const homeBtn = document.getElementById("ysdBackHomeBtn");

    const notificationBtn = document.getElementById("ysdViewNotificationsBtn");

    const dashboardPage = document.getElementById("ysdDashboardPage");

    const addProductPage = document.getElementById("ysdAddProductPage");

    const accountStatus = document.getElementById("ysdAccountStatus");

    const accountRole = document.getElementById("ysdAccountRole");

    /*=========================================
    BOOTSTRAP TOAST
    =========================================*/

    const successToast = new bootstrap.Toast(

        toastElement,

        {

            delay:2500

        }

    );

    /*=========================================
    SHOW TOAST
    =========================================*/

    function showToast(message){

        toastMessage.textContent = message;

        successToast.show();

    }

    /*=========================================
    PAGE LOADER
    =========================================*/

    function showLoader(){

        loader.classList.add("show");

    }

    function hideLoader(){

        loader.classList.remove("show");

    }

    /*=========================================
    INITIAL SESSION
    =========================================*/

    sessionStorage.setItem(

        "yoviCurrentStep",

        "seller-done"

    );

    sessionStorage.setItem(

        "yoviSellerStatus",

        accountStatus.textContent.trim()

    );

    sessionStorage.setItem(

        "yoviUserRole",

        accountRole.value

    );

    /*=========================================
    SUCCESS MESSAGE
    =========================================*/

    setTimeout(() => {

        showToast(

            "🎉 Congratulations! Your seller account is now live."

        );

    },600);

    /*=========================================
    PAGE ENTRANCE
    =========================================*/

    donePage.classList.add(

        "ysd-page-loaded"

    );

    /*=========================================
    ADD FIRST PRODUCT
    =========================================*/

    addProductBtn.addEventListener("click", () => {

        showLoader();

        addProductBtn.disabled = true;

        addProductBtn.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Opening...

        `;

        setTimeout(() => {

            window.location.href =

                addProductPage.value;

        },800);

    });

    /*=========================================
    VIEW DASHBOARD
    =========================================*/

    dashboardBtn.addEventListener("click", () => {

        showLoader();

        dashboardBtn.disabled = true;

        dashboardBtn.innerHTML = `

            <i class="bi bi-speedometer2 me-2"></i>

            Loading Dashboard...

        `;

        setTimeout(() => {

            window.location.href =

                dashboardPage.value;

        },800);

    });

/*==================================================
SELLER DONE PAGE (3B)
Footer Navigation • Confetti • Celebration
Append after Part 3A
==================================================*/

    /*=========================================
    BACK TO HOME
    =========================================*/

    homeBtn.addEventListener("click", () => {

        showLoader();

        setTimeout(() => {

            window.location.href = "index.html";

        }, 700);

    });

    /*=========================================
    VIEW NOTIFICATIONS
    =========================================*/

    notificationBtn.addEventListener("click", () => {

        showLoader();

        setTimeout(() => {

            window.location.href = "notifications.html";

        }, 700);

    });

    /*=========================================
    CONFETTI CELEBRATION
    =========================================*/

    function launchConfetti() {

        const colors = [

            "orange",

            "green",

            "blue",

            "purple",

            "yellow"

        ];

        for (let i = 0; i < 120; i++) {

            const piece = document.createElement("div");

            piece.className = `ysd-confetti ${

                colors[Math.floor(Math.random() * colors.length)]

            }`;

            piece.style.left =

                Math.random() * 100 + "%";

            piece.style.animationDuration =

                (Math.random() * 3 + 2) + "s";

            piece.style.animationDelay =

                Math.random() * .8 + "s";

            piece.style.transform =

                `rotate(${Math.random() * 360}deg)`;

            confettiContainer.appendChild(piece);

            piece.addEventListener("animationend", () => {

                piece.remove();

            });

        }

    }

    /*=========================================
    START CELEBRATION
    =========================================*/

    setTimeout(() => {

        launchConfetti();

    }, 500);

    /*=========================================
    OPTIONAL SUCCESS SOUND
    =========================================*/

    function playSuccessSound() {

        /*
        Optional:

        const audio = new Audio(
            "assets/audio/success.mp3"
        );

        audio.play();

        */

    }

    playSuccessSound();

    /*=========================================
    SAVE COMPLETION STATUS
    =========================================*/

    sessionStorage.setItem(

        "yoviSellerSetupCompleted",

        "true"

    );

    sessionStorage.setItem(

        "yoviSellerDashboardReady",

        "true"

    );

    /*=========================================
    DEVELOPMENT LOG
    =========================================*/

    console.info(

        "Seller setup completed successfully."

    );

    /*=========================================
    RESTORE SESSION
    =========================================*/

    function restoreSellerSession() {

        const sellerStatus = sessionStorage.getItem(

            "yoviSellerStatus"

        );

        const currentStep = sessionStorage.getItem(

            "yoviCurrentStep"

        );

        const dashboardReady = sessionStorage.getItem(

            "yoviSellerDashboardReady"

        );

        console.info("Seller Status:", sellerStatus);

        console.info("Current Step:", currentStep);

        console.info("Dashboard Ready:", dashboardReady);

    }

    restoreSellerSession();

    /*=========================================
    MARK ONBOARDING COMPLETE
    =========================================*/

    sessionStorage.setItem(

        "yoviOnboardingCompleted",

        "true"

    );

    sessionStorage.setItem(

        "yoviLastCompletedPage",

        "seller-done"

    );

    sessionStorage.setItem(

        "yoviAccountActivated",

        "true"

    );

    /*=========================================
    PRELOAD DASHBOARD
    =========================================*/

    function preloadDashboard() {

        const preloadLink = document.createElement("link");

        preloadLink.rel = "prefetch";

        preloadLink.href = dashboardPage.value;

        document.head.appendChild(preloadLink);

    }

    preloadDashboard();

    /*=========================================
    AUTO HIDE LOADER
    =========================================*/

    window.addEventListener("load", () => {

        hideLoader();

    });

    /*=========================================
    BUTTON HOVER ANIMATION
    =========================================*/

    [

        addProductBtn,

        dashboardBtn

    ].forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.style.transform =

                "translateY(-2px)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });

    /*=========================================
    KEYBOARD SHORTCUTS
    =========================================*/

    document.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            dashboardBtn.click();

        }

        if (

            event.key.toLowerCase() === "a"

        ) {

            addProductBtn.click();

        }

    });

    /*=========================================
    PAGE VISIBILITY
    =========================================*/

    document.addEventListener(

        "visibilitychange",

        () => {

            if (!document.hidden) {

                console.info(

                    "Welcome back."

                );

            }

        }

    );

    /*=========================================
    ANALYTICS PLACEHOLDER
    =========================================*/

    function trackCompletion() {

        console.info(

            "Analytics Event:",

            "Seller Completed"

        );

        /*
        Example:

        gtag('event','seller_completed',{
            role:'seller'
        });

        */

    }

    trackCompletion();

    /*=========================================
    PREVENT MULTIPLE CLICKS
    =========================================*/

    let navigationInProgress = false;

    function beginNavigation(button) {

        if (navigationInProgress) return false;

        navigationInProgress = true;

        button.disabled = true;

        showLoader();

        return true;

    }

    /*=========================================
    OVERRIDE PRIMARY NAVIGATION
    =========================================*/

    addProductBtn.addEventListener("click", function (event) {

        event.stopImmediatePropagation();

        if (!beginNavigation(this)) return;

        this.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Redirecting...

        `;

        setTimeout(() => {

            window.location.href = "";
            
            addProductPage.value;

        }, 900);

    });

    dashboardBtn.addEventListener("click", function (event) {

        event.stopImmediatePropagation();

        if (!beginNavigation(this)) return;

        this.innerHTML = `

            <i class="bi bi-speedometer2 me-2"></i>

            Opening Dashboard...

        `;

        setTimeout(() => {

            window.location.href = "seller/seller-dashboard.html"; 
            
            dashboardPage.value;

        }, 900);

    });

    /*=========================================
    AUTO FOCUS
    =========================================*/

    window.addEventListener("load", () => {

        dashboardBtn.focus();

    });

    /*=========================================
    ESC KEY SUPPORT
    =========================================*/

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            hideLoader();

        }

    });

    /*=========================================
    NETWORK STATUS
    =========================================*/

    window.addEventListener("offline", () => {

        showToast(

            "No internet connection detected."

        );

    });

    window.addEventListener("online", () => {

        showToast(

            "Internet connection restored."

        );

    });

    /*=========================================
    PERFORMANCE LOG
    =========================================*/

    window.addEventListener("load", () => {

        if ("performance" in window) {

            console.info(

                "Seller Done loaded in",

                Math.round(performance.now()),

                "ms"

            );

        }

    });

    /*=========================================
    PREFETCH DASHBOARD
    =========================================*/

    fetch(dashboardPage.value, {

        method: "GET",

        cache: "force-cache"

    }).catch(() => {

        /* Ignore prefetch errors */

    });

    /*=========================================
    FINALIZE SESSION
    =========================================*/

    function finalizeSellerOnboarding() {

        sessionStorage.setItem(

            "yoviSellerSetupFinished",

            "true"

        );

        sessionStorage.removeItem(

            "yoviCurrentStep"

        );

    }

    finalizeSellerOnboarding();

    /*=========================================
    DEVELOPMENT LOG
    =========================================*/

    console.info(

        "Seller Done UX initialized."

    );

    /*=========================================
    SAVE COMPLETION RECORD
    =========================================*/

    function saveCompletionRecord() {

        const completionData = {

            completed: true,

            role: "seller",

            completedAt: new Date().toISOString(),

            nextPage: dashboardPage.value

        };

        localStorage.setItem(

            "yoviSellerCompletion",

            JSON.stringify(completionData)

        );

    }

    saveCompletionRecord();

    /*=========================================
    AUTO SAVE USER SESSION
    =========================================*/

    function updateLastActivity() {

        sessionStorage.setItem(

            "yoviLastActivity",

            Date.now()

        );

    }

    updateLastActivity();

    document.addEventListener(

        "click",

        updateLastActivity

    );

    document.addEventListener(

        "keydown",

        updateLastActivity

    );

    /*=========================================
    BEFORE UNLOAD
    =========================================*/

    window.addEventListener("beforeunload", () => {

        sessionStorage.setItem(

            "yoviLastVisitedPage",

            "seller-done"

        );

    });

    /*=========================================
    CLEAR TEMPORARY SETUP DATA
    =========================================*/

    function clearTemporaryData() {

        const temporaryKeys = [

            "yoviSellerProfile",

            "yoviSellerSetup",

            "yoviCurrentStep"

        ];

        temporaryKeys.forEach(key => {

            sessionStorage.removeItem(key);

        });

    }

    clearTemporaryData();

    /*=========================================
    VERIFY DASHBOARD ACCESS
    =========================================*/

    function dashboardAccessible() {

        return (

            sessionStorage.getItem(

                "yoviSellerDashboardReady"

            ) === "true"

        );

    }

    console.info(

        "Dashboard Access:",

        dashboardAccessible()

    );

    /*=========================================
    PAGE TIMER
    =========================================*/

    const pageOpenedAt = Date.now();

    window.addEventListener("pagehide", () => {

        const duration = Math.round(

            (Date.now() - pageOpenedAt) / 1000

        );

        console.info(

            `Time spent on Seller Done page: ${duration}s`

        );

    });

    /*=========================================
    DEVELOPMENT HELPERS
    =========================================*/

    window.yoviSellerDone = {

        showToast,

        showLoader,

        hideLoader,

        dashboardAccessible,

        saveCompletionRecord

    };

    /*=========================================
    INITIALIZATION COMPLETE
    =========================================*/

    console.group(

        "YOVI - Seller Done"

    );

    console.log(

        "Role:",

        sessionStorage.getItem("yoviUserRole")

    );

    console.log(

        "Status:",

        sessionStorage.getItem("yoviSellerStatus")

    );

    console.log(

        "Dashboard:",

        dashboardPage.value

    );

    console.log(

        "Add Product:",

        addProductPage.value

    );

    console.groupEnd();

    console.info(

        "✔ Seller Done page initialized successfully."

    );

});



/*==================================================
BUYER DONE PAGE (3A)
Initialization • Elements • Navigation
File: buyer-done.js
Unique Prefix: ybd-
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
    PAGE CHECK
    =========================================*/

    const donePage = document.getElementById("ybdDonePage");

    if (!donePage) return;

    /*=========================================
    ELEMENT REFERENCES
    =========================================*/

    const loader = document.getElementById("ybdPageLoader");

    const toastElement = document.getElementById("ybdToast");

    const toastMessage = document.getElementById("ybdToastMessage");

    const confettiContainer = document.getElementById("ybdConfettiContainer");

    const browseProductsBtn = document.getElementById("ybdBrowseProductsBtn");

    const findServicesBtn = document.getElementById("ybdFindServicesBtn");

    const homeBtn = document.getElementById("ybdBackHomeBtn");

    const notificationBtn = document.getElementById("ybdViewNotificationsBtn");

    const productsPage = document.getElementById("ybdProductsPage");

    const servicesPage = document.getElementById("ybdServicesPage");

    const dashboardPage = document.getElementById("ybdDashboardPage");

    const accountStatus = document.getElementById("ybdAccountStatus");

    const accountRole = document.getElementById("ybdAccountRole");

    /*=========================================
    BOOTSTRAP TOAST
    =========================================*/

    const successToast = new bootstrap.Toast(

        toastElement,

        {

            delay:2500

        }

    );

    /*=========================================
    SHOW TOAST
    =========================================*/

    function showToast(message){

        toastMessage.textContent = message;

        successToast.show();

    }

    /*=========================================
    PAGE LOADER
    =========================================*/

    function showLoader(){

        loader.classList.add("show");

    }

    function hideLoader(){

        loader.classList.remove("show");

    }

    /*=========================================
    INITIAL SESSION
    =========================================*/

    sessionStorage.setItem(

        "yoviCurrentStep",

        "buyer-done"

    );

    sessionStorage.setItem(

        "yoviBuyerStatus",

        accountStatus.textContent.trim()

    );

    sessionStorage.setItem(

        "yoviUserRole",

        accountRole.value

    );

    /*=========================================
    SUCCESS MESSAGE
    =========================================*/

    setTimeout(() => {

        showToast(

            "🎉 Congratulations! Your buyer account is now ready."

        );

    },600);

    /*=========================================
    PAGE ENTRANCE
    =========================================*/

    donePage.classList.add(

        "ybd-page-loaded"

    );

    /*=========================================
    BROWSE PRODUCTS
    =========================================*/

    browseProductsBtn.addEventListener("click", () => {

        showLoader();

        browseProductsBtn.disabled = true;

        browseProductsBtn.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Opening Products...

        `;

        setTimeout(() => {

            window.location.href =

                productsPage.value;

        },800);

    });

    /*=========================================
    FIND SERVICES
    =========================================*/

    findServicesBtn.addEventListener("click", () => {

        showLoader();

        findServicesBtn.disabled = true;

        findServicesBtn.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Opening Services...

        `;

        setTimeout(() => {

            window.location.href =

                servicesPage.value;

        },800);

    });

/*==================================================
BUYER DONE PAGE (3B)
Footer Navigation • Confetti • Celebration
Append after Part 3A
==================================================*/

    /*=========================================
    BACK TO HOME
    =========================================*/

    homeBtn.addEventListener("click", () => {

        showLoader();

        setTimeout(() => {

            window.location.href = "index.html";

        }, 700);

    });

    /*=========================================
    VIEW NOTIFICATIONS
    =========================================*/

    notificationBtn.addEventListener("click", () => {

        showLoader();

        setTimeout(() => {

            window.location.href = "notifications.html";

        }, 700);

    });

    /*=========================================
    CONFETTI CELEBRATION
    =========================================*/

    function launchConfetti() {

        const colors = [

            "orange",

            "green",

            "blue",

            "purple",

            "yellow"

        ];

        for (let i = 0; i < 120; i++) {

            const piece = document.createElement("div");

            piece.className = `ybd-confetti ${

                colors[Math.floor(Math.random() * colors.length)]

            }`;

            piece.style.left =

                Math.random() * 100 + "%";

            piece.style.animationDuration =

                (Math.random() * 3 + 2) + "s";

            piece.style.animationDelay =

                Math.random() * .8 + "s";

            piece.style.transform =

                `rotate(${Math.random() * 360}deg)`;

            confettiContainer.appendChild(piece);

            piece.addEventListener("animationend", () => {

                piece.remove();

            });

        }

    }

    /*=========================================
    START CELEBRATION
    =========================================*/

    setTimeout(() => {

        launchConfetti();

    }, 500);

    /*=========================================
    OPTIONAL SUCCESS SOUND
    =========================================*/

    function playSuccessSound() {

        /*
        Optional:

        const audio = new Audio(
            "assets/audio/success.mp3"
        );

        audio.play();

        */

    }

    playSuccessSound();

    /*=========================================
    SAVE COMPLETION STATUS
    =========================================*/

    sessionStorage.setItem(

        "yoviBuyerSetupCompleted",

        "true"

    );

    sessionStorage.setItem(

        "yoviBuyerDashboardReady",

        "true"

    );

    /*=========================================
    DEVELOPMENT LOG
    =========================================*/

    console.info(

        "Buyer setup completed successfully."

    );

/*==================================================
BUYER DONE PAGE (3C)
Session Restore • Dashboard Preload • UX Enhancements
Append after Part 3B
==================================================*/

    /*=========================================
    RESTORE SESSION
    =========================================*/

    function restoreBuyerSession() {

        const buyerStatus = sessionStorage.getItem(

            "yoviBuyerStatus"

        );

        const currentStep = sessionStorage.getItem(

            "yoviCurrentStep"

        );

        const dashboardReady = sessionStorage.getItem(

            "yoviBuyerDashboardReady"

        );

        console.info(

            "Buyer Status:",

            buyerStatus

        );

        console.info(

            "Current Step:",

            currentStep

        );

        console.info(

            "Dashboard Ready:",

            dashboardReady

        );

    }

    restoreBuyerSession();

    /*=========================================
    MARK ONBOARDING COMPLETE
    =========================================*/

    sessionStorage.setItem(

        "yoviOnboardingCompleted",

        "true"

    );

    sessionStorage.setItem(

        "yoviLastCompletedPage",

        "buyer-done"

    );

    sessionStorage.setItem(

        "yoviAccountActivated",

        "true"

    );

    /*=========================================
    PRELOAD DASHBOARD
    =========================================*/

    function preloadDashboard() {

        const preloadLink = document.createElement("link");

        preloadLink.rel = "prefetch";

        preloadLink.href = dashboardPage.value;

        document.head.appendChild(preloadLink);

    }

    preloadDashboard();

    /*=========================================
    AUTO HIDE LOADER
    =========================================*/

    window.addEventListener("load", () => {

        hideLoader();

    });

    /*=========================================
    BUTTON HOVER EFFECT
    =========================================*/

    [

        browseProductsBtn,

        findServicesBtn

    ].forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.style.transform =

                "translateY(-2px)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });

    /*=========================================
    KEYBOARD SHORTCUTS
    =========================================*/

    document.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            browseProductsBtn.click();

        }

        if (

            event.key.toLowerCase() === "s"

        ) {

            findServicesBtn.click();

        }

    });

    /*=========================================
    PAGE VISIBILITY
    =========================================*/

    document.addEventListener(

        "visibilitychange",

        () => {

            if (!document.hidden) {

                console.info(

                    "Buyer returned to page."

                );

            }

        }

    );

    /*=========================================
    ANALYTICS PLACEHOLDER
    =========================================*/

    function trackCompletion() {

        console.info(

            "Analytics Event:",

            "Buyer Completed"

        );

        /*
        Example:

        gtag('event','buyer_completed',{

            role:'buyer'

        });

        */

    }

    trackCompletion();

/*==================================================
BUYER DONE PAGE (3D)
Accessibility • Navigation Guard • Session Finalization
Append after Part 3C
==================================================*/

    /*=========================================
    PREVENT MULTIPLE CLICKS
    =========================================*/

    let navigationInProgress = false;

    function beginNavigation(button) {

        if (navigationInProgress) return false;

        navigationInProgress = true;

        button.disabled = true;

        showLoader();

        return true;

    }

    /*=========================================
    OVERRIDE PRIMARY BUTTONS
    =========================================*/

    browseProductsBtn.addEventListener("click", function (event) {

        event.stopImmediatePropagation();

        if (!beginNavigation(this)) return;

        this.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Redirecting...

        `;

        setTimeout(() => {

            window.location.href = productsPage.value;

        }, 900);

    });

    findServicesBtn.addEventListener("click", function (event) {

        event.stopImmediatePropagation();

        if (!beginNavigation(this)) return;

        this.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Redirecting...

        `;

        setTimeout(() => {

            window.location.href = servicesPage.value;

        }, 900);

    });

    /*=========================================
    AUTO FOCUS
    =========================================*/

    window.addEventListener("load", () => {

        browseProductsBtn.focus();

    });

    /*=========================================
    ESC KEY SUPPORT
    =========================================*/

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            hideLoader();

        }

    });

    /*=========================================
    NETWORK STATUS
    =========================================*/

    window.addEventListener("offline", () => {

        showToast(

            "No internet connection detected."

        );

    });

    window.addEventListener("online", () => {

        showToast(

            "Internet connection restored."

        );

    });

    /*=========================================
    PERFORMANCE LOG
    =========================================*/

    window.addEventListener("load", () => {

        if ("performance" in window) {

            console.info(

                "Buyer Done loaded in",

                Math.round(performance.now()),

                "ms"

            );

        }

    });

    /*=========================================
    PREFETCH COMMON PAGES
    =========================================*/

    fetch(productsPage.value, {

        method: "GET",

        cache: "force-cache"

    }).catch(() => {});

    fetch(servicesPage.value, {

        method: "GET",

        cache: "force-cache"

    }).catch(() => {});

    /*=========================================
    FINALIZE SESSION
    =========================================*/

    function finalizeBuyerOnboarding() {

        sessionStorage.setItem(

            "yoviBuyerSetupFinished",

            "true"

        );

        sessionStorage.removeItem(

            "yoviCurrentStep"

        );

    }

    finalizeBuyerOnboarding();

    /*=========================================
    DEVELOPMENT LOG
    =========================================*/

    console.info(

        "Buyer Done UX initialized."

    );

/*==================================================
BUYER DONE PAGE (3E)
Final Utilities • Cleanup • Developer Helpers
Append after Part 3D
==================================================*/

    /*=========================================
    SAVE COMPLETION RECORD
    =========================================*/

    function saveCompletionRecord() {

        const completionData = {

            completed: true,

            role: "buyer",

            completedAt: new Date().toISOString(),

            nextPage: dashboardPage.value

        };

        localStorage.setItem(

            "yoviBuyerCompletion",

            JSON.stringify(completionData)

        );

    }

    saveCompletionRecord();

    /*=========================================
    AUTO SAVE LAST ACTIVITY
    =========================================*/

    function updateLastActivity() {

        sessionStorage.setItem(

            "yoviLastActivity",

            Date.now()

        );

    }

    updateLastActivity();

    document.addEventListener(

        "click",

        updateLastActivity

    );

    document.addEventListener(

        "keydown",

        updateLastActivity

    );

    /*=========================================
    REMEMBER LAST PAGE
    =========================================*/

    window.addEventListener("beforeunload", () => {

        sessionStorage.setItem(

            "yoviLastVisitedPage",

            "buyer-done"

        );

    });

    /*=========================================
    CLEAR TEMPORARY SETUP DATA
    =========================================*/

    function clearTemporaryData() {

        const temporaryKeys = [

            "yoviBuyerProfile",

            "yoviBuyerSetup",

            "yoviCurrentStep"

        ];

        temporaryKeys.forEach(key => {

            sessionStorage.removeItem(key);

        });

    }

    clearTemporaryData();

    /*=========================================
    VERIFY BUYER ACCESS
    =========================================*/

    function buyerAccessReady() {

        return (

            sessionStorage.getItem(

                "yoviBuyerDashboardReady"

            ) === "true"

        );

    }

    console.info(

        "Buyer Access:",

        buyerAccessReady()

    );

    /*=========================================
    PAGE TIMER
    =========================================*/

    const pageOpenedAt = Date.now();

    window.addEventListener("pagehide", () => {

        const duration = Math.round(

            (Date.now() - pageOpenedAt) / 1000

        );

        console.info(

            `Time spent on Buyer Done page: ${duration}s`

        );

    });

    /*=========================================
    GLOBAL DEBUG HELPERS
    =========================================*/

    window.yoviBuyerDone = {

        showToast,

        showLoader,

        hideLoader,

        buyerAccessReady,

        saveCompletionRecord

    };

    /*=========================================
    INITIALIZATION SUMMARY
    =========================================*/

    console.group(

        "YOVI - Buyer Done"

    );

    console.log(

        "Role:",

        sessionStorage.getItem("yoviUserRole")

    );

    console.log(

        "Status:",

        sessionStorage.getItem("yoviBuyerStatus")

    );

    console.log(

        "Products Page:",

        productsPage.value

    );

    console.log(

        "Services Page:",

        servicesPage.value

    );

    console.log(

        "Dashboard:",

        dashboardPage.value

    );

    console.groupEnd();

    console.info(

        "✔ Buyer Done page initialized successfully."

    );

});
















/*==================================================
SIGN IN PAGE 
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
    PAGE CHECK
    =========================================*/

    const signInPage = document.getElementById(

        "sipSignInPage"

    );

    if (!signInPage) return;

    /*=========================================
    ELEMENT REFERENCES
    =========================================*/

    const form = document.getElementById(

        "sipSignInForm"

    );

    const loader = document.getElementById(

        "sipPageLoader"

    );

    const toastElement = document.getElementById(

        "sipSuccessToast"

    );

    const toastMessage = document.getElementById(

        "sipToastMessage"

    );

    const email = document.getElementById(

        "sipEmailAddress"

    );

    const password = document.getElementById(

        "sipPassword"

    );

    const rememberMe = document.getElementById(

        "sipRememberMe"

    );

    const signInButton = document.getElementById(

        "sipSignInButton"

    );

    const googleButton = document.getElementById(

        "sipGoogleButton"

    );

    const phoneButton = document.getElementById(

        "sipPhoneButton"

    );

    const togglePassword = document.getElementById(

        "sipTogglePassword"

    );

    const forgotPasswordLink = document.getElementById(

        "sipForgotPasswordLink"

    );

    const createAccountLink = document.getElementById(

        "sipCreateAccountLink"

    );

    const dashboardPage = document.getElementById(

        "sipDashboardPage"

    );

    const createAccountPage = document.getElementById(

        "sipCreateAccountPage"

    );

    const forgotPasswordPage = document.getElementById(

        "sipForgotPasswordPage"

    );

    /*=========================================
    BOOTSTRAP TOAST
    =========================================*/

    const successToast = new bootstrap.Toast(

        toastElement,

        {

            delay:2500

        }

    );

    /*=========================================
    HELPER FUNCTIONS
    =========================================*/

    function showLoader(){

        loader.classList.add("show");

    }

    function hideLoader(){

        loader.classList.remove("show");

    }

    function showToast(message){

        toastMessage.textContent = message;

        successToast.show();

    }

    /*=========================================
    INITIAL SESSION
    =========================================*/

    sessionStorage.setItem(

        "yoviCurrentStep",

        "sign-in"

    );

    /*=========================================
    PAGE ENTRANCE
    =========================================*/

    signInPage.classList.add(

        "sip-page-loaded"

    );

    /*=========================================
    AUTO FOCUS
    =========================================*/

    email.focus();

    /*=========================================
    PASSWORD VISIBILITY
    =========================================*/

    function togglePasswordVisibility(input, button){

        const icon = button.querySelector("i");

        if(input.type === "password"){

            input.type = "text";

            icon.className = "bi bi-eye-slash";

        }else{

            input.type = "password";

            icon.className = "bi bi-eye";

        }

    }

    togglePassword.addEventListener("click", () => {

        togglePasswordVisibility(

            password,

            togglePassword

        );

    });

    /*=========================================
    RESTORE REMEMBERED EMAIL
    =========================================*/

    const rememberedEmail = localStorage.getItem(

        "yoviRememberedEmail"

    );

    if(rememberedEmail){

        email.value = rememberedEmail;

        rememberMe.checked = true;

    }

/*==================================================
SIGN IN PAGE (3B)
Validation • Form Submission • Authentication
Append after Part 3A
==================================================*/

    /*=========================================
    LIVE EMAIL VALIDATION
    =========================================*/

    email.addEventListener("input", () => {

        const emailPattern =

            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(email.value.trim()===""){

            email.classList.remove(

                "is-valid",

                "is-invalid"

            );

            return;

        }

        if(emailPattern.test(email.value.trim())){

            email.classList.add("is-valid");

            email.classList.remove("is-invalid");

        }else{

            email.classList.add("is-invalid");

            email.classList.remove("is-valid");

        }

    });

    /*=========================================
    FORM SUBMISSION
    =========================================*/

    form.addEventListener("submit",(event)=>{

        event.preventDefault();

        event.stopPropagation();

        if(!form.checkValidity()){

            form.classList.add("was-validated");

            return;

        }

        /*=====================================
        REMEMBER EMAIL
        =====================================*/

        if(rememberMe.checked){

            localStorage.setItem(

                "yoviRememberedEmail",

                email.value.trim()

            );

        }else{

            localStorage.removeItem(

                "yoviRememberedEmail"

            );

        }

        /*=====================================
        SAVE SESSION
        =====================================*/

        sessionStorage.setItem(

            "yoviUserEmail",

            email.value.trim()

        );

        sessionStorage.setItem(

            "yoviAuthenticated",

            "true"

        );

        /*=====================================
        BUTTON LOADING
        =====================================*/

        signInButton.disabled = true;

        signInButton.classList.add(

            "sip-btn-loading"

        );

        signInButton.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Signing In...

        `;

        showLoader();

        showToast(

            "Authentication successful."

        );

        setTimeout(()=>{

            window.location.href = "";

                dashboardPage.value;

        },1200);

    });

    /*=========================================
    ENTER KEY SUPPORT
    =========================================*/

    document.addEventListener("keydown",(event)=>{

        if(event.key==="Enter"){

            if(document.activeElement!==signInButton){

                signInButton.click();

            }

        }

    });

    /*=========================================
    PASSWORD FIELD
    =========================================*/

    password.addEventListener("input",()=>{

        if(password.value.length>0){

            password.classList.remove(

                "is-invalid"

            );

        }

    });

    /*=========================================
    LOADER CLEANUP
    =========================================*/

    window.addEventListener("load",()=>{

        hideLoader();

    });

    /*=========================================
    GOOGLE SIGN IN
    =========================================*/

    googleButton.addEventListener("click", () => {

        showLoader();

        googleButton.disabled = true;

        googleButton.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Connecting...

        `;

        sessionStorage.setItem(

            "yoviSigninMethod",

            "google"

        );

        setTimeout(() => {

            hideLoader();

            googleButton.disabled = false;

            googleButton.innerHTML = `

                <img src="https://placehold.co/20x20" alt="Google">

                <span>Google</span>

            `;

            showToast(

                "Google Sign In will be available soon."

            );

        },1500);

    });

    /*=========================================
    PHONE SIGN IN
    =========================================*/

    phoneButton.addEventListener("click", () => {

        showLoader();

        phoneButton.disabled = true;

        phoneButton.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Connecting...

        `;

        sessionStorage.setItem(

            "yoviSigninMethod",

            "phone"

        );

        setTimeout(() => {

            hideLoader();

            phoneButton.disabled = false;

            phoneButton.innerHTML = `

                <i class="bi bi-telephone"></i>

                <span>Phone</span>

            `;

            showToast(

                "Phone Sign In will be available soon."

            );

        },1500);

    });

    /*=========================================
    FORGOT PASSWORD
    =========================================*/

    forgotPasswordLink.addEventListener("click",(event)=>{

        event.preventDefault();

        showLoader();

        setTimeout(()=>{

            window.location.href = "/auth/forgot-password.html";

                forgotPasswordPage.value;

        },700);

    });

    /*=========================================
    CREATE ACCOUNT
    =========================================*/

    createAccountLink.addEventListener("click",(event)=>{

        event.preventDefault();

        showLoader();

        setTimeout(()=>{

            window.location.href = "/auth/register.html";

                createAccountPage.value;

        },700);

    });

    /*=========================================
    RESTORE LAST SESSION
    =========================================*/

    function restoreSession(){

        const savedEmail = sessionStorage.getItem(

            "yoviUserEmail"

        );

        if(savedEmail && !email.value){

            email.value = savedEmail;

        }

    }

    restoreSession();

    /*=========================================
    PRELOAD NEXT PAGES
    =========================================*/

    [

        dashboardPage.value,

        createAccountPage.value,

        forgotPasswordPage.value

    ].forEach(page=>{

        const preload = document.createElement("link");

        preload.rel = "prefetch";

        preload.href = page;

        document.head.appendChild(preload);

    });

    /*=========================================
    DEVELOPMENT LOG
    =========================================*/

    console.info(

        "Sign In page initialized."

    );

    /*=========================================
    NAVIGATION LOCK
    =========================================*/

    let navigationInProgress = false;

    function lockNavigation(button){

        if(navigationInProgress){

            return false;

        }

        navigationInProgress = true;

        button.disabled = true;

        showLoader();

        return true;

    }

    /*=========================================
    EMAIL VALIDATION
    =========================================*/

    email.addEventListener("blur",()=>{

        const emailPattern =

            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(email.value.trim()===""){

            email.classList.remove(

                "is-valid",

                "is-invalid"

            );

            return;

        }

        if(emailPattern.test(email.value.trim())){

            email.classList.add("is-valid");

            email.classList.remove("is-invalid");

        }else{

            email.classList.add("is-invalid");

            email.classList.remove("is-valid");

        }

    });

    /*=========================================
    PASSWORD VALIDATION
    =========================================*/

    password.addEventListener("blur",()=>{

        if(password.value.trim().length>=6){

            password.classList.add("is-valid");

            password.classList.remove("is-invalid");

        }else{

            password.classList.add("is-invalid");

            password.classList.remove("is-valid");

        }

    });

    /*=========================================
    REMOVE INVALID STATE ON INPUT
    =========================================*/

    [

        email,

        password

    ].forEach(input=>{

        input.addEventListener("input",()=>{

            if(input.value.trim()!==""){

                input.classList.remove("is-invalid");

            }

        });

    });

    /*=========================================
    NETWORK STATUS
    =========================================*/

    window.addEventListener("offline",()=>{

        showToast(

            "No internet connection."

        );

    });

    window.addEventListener("online",()=>{

        showToast(

            "Internet connection restored."

        );

    });

    /*=========================================
    PREVENT MULTIPLE SUBMISSIONS
    =========================================*/

    signInButton.addEventListener(

        "click",

        (event)=>{

            if(!lockNavigation(signInButton)){

                event.preventDefault();

                event.stopImmediatePropagation();

            }

        },

        true

    );

    /*=========================================
    KEYBOARD SHORTCUTS
    =========================================*/

    document.addEventListener("keydown",(event)=>{

        if(event.altKey && event.key==="g"){

            event.preventDefault();

            googleButton.click();

        }

        if(event.altKey && event.key==="p"){

            event.preventDefault();

            phoneButton.click();

        }

    });

    /*=========================================
    ACCESSIBILITY
    =========================================*/

    email.setAttribute(

        "aria-label",

        "Email Address"

    );

    password.setAttribute(

        "aria-label",

        "Password"

    );

    rememberMe.setAttribute(

        "aria-label",

        "Keep me signed in"

    );

    signInButton.setAttribute(

        "aria-label",

        "Sign In"

    );

    /*=========================================
    PERFORMANCE LOG
    =========================================*/

    window.addEventListener("load",()=>{

        console.info(

            "Sign In page loaded in",

            Math.round(performance.now()),

            "ms"

        );

    });

    /*=========================================
    SAVE LOGIN RECORD
    =========================================*/

    function saveLoginRecord(){

        const loginData = {

            email:email.value.trim(),

            rememberMe:rememberMe.checked,

            signInMethod:

                sessionStorage.getItem(

                    "yoviSigninMethod"

                ) || "email",

            loginDate:

                new Date().toISOString(),

            nextPage:

                dashboardPage.value

        };

        localStorage.setItem(

            "yoviLoginRecord",

            JSON.stringify(loginData)

        );

    }

    /*=========================================
    LAST USER ACTIVITY
    =========================================*/

    function updateLastActivity(){

        sessionStorage.setItem(

            "yoviLastActivity",

            Date.now()

        );

    }

    document.addEventListener(

        "click",

        updateLastActivity

    );

    document.addEventListener(

        "keydown",

        updateLastActivity

    );

    updateLastActivity();

    /*=========================================
    REMEMBER LAST PAGE
    =========================================*/

    window.addEventListener(

        "beforeunload",

        ()=>{

            sessionStorage.setItem(

                "yoviLastVisitedPage",

                "signin"

            );

        }

    );

    /*=========================================
    CLEAR TEMPORARY DATA
    =========================================*/

    function clearTemporaryData(){

        sessionStorage.removeItem(

            "yoviTemporaryOTP"

        );

        sessionStorage.removeItem(

            "yoviPasswordResetToken"

        );

    }

    /*=========================================
    SAVE BEFORE LOGIN
    =========================================*/

    form.addEventListener(

        "submit",

        ()=>{

            saveLoginRecord();

            clearTemporaryData();

        }

    );

    /*=========================================
    PAGE VISIBILITY
    =========================================*/

    document.addEventListener(

        "visibilitychange",

        ()=>{

            if(!document.hidden){

                console.info(

                    "Sign In page is active."

                );

            }

        }

    );

    /*=========================================
    GLOBAL DEBUG OBJECT
    =========================================*/

    window.yoviSignIn={

        showLoader,

        hideLoader,

        showToast,

        saveLoginRecord

    };

    /*=========================================
    DEVELOPMENT SUMMARY
    =========================================*/

    console.group(

        "YOVI - Sign In"

    );

    console.log(

        "Current Step:",

        sessionStorage.getItem(

            "yoviCurrentStep"

        )

    );

    console.log(

        "Dashboard:",

        dashboardPage.value

    );

    console.log(

        "Create Account:",

        createAccountPage.value

    );

    console.log(

        "Forgot Password:",

        forgotPasswordPage.value

    );

    console.log(

        "Sign In Method:",

        sessionStorage.getItem(

            "yoviSigninMethod"

        ) || "email"

    );

    console.groupEnd();

    console.info(

        "✔ Sign In page initialized successfully."

    );

});




















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

    /* ==========================================================
       END OF PROVIDER DASHBOARD
    ========================================================== */

});