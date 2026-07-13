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
PROFILE SETUP PAGE 
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
PROFILE SETUP PAGE 
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

                if (accountType === "buyer") {

                    window.location.href = "../../auth/buyer-done.html";

                } else if (accountType === "seller") {

                    window.location.href = "../../auth/seller-done.html";

                } else if (accountType === "service-provider") {

                    window.location.href = "../../auth/service-setup.html";

                } else {

                    window.location.href = "";

                }

            }, 1000);

            });

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

                    "../../auth/service-provider-done.html";

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

            window.location.href = "../../provider/provider-dashboard.html";

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


/*=========================================================
  YOVI SELLER DASHBOARD
  PART 3A
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

                "../Cart/cart.html";

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