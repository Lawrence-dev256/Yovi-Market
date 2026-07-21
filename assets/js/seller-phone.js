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


/*
=========================================================
 Phone Verification Page
=========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /*=====================================================
      SELECTORS
    =====================================================*/
    const mobileToggle = document.querySelector(".mobile-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    const otpButton = document.querySelector(".otp-btn");
    const verifyButton = document.querySelector(".verify-btn");

    const phoneInput = document.querySelector(".phone-input input");
    const otpInputs = document.querySelectorAll(".otp-inputs input");

    /*=====================================================
      MOBILE MENU
    =====================================================*/
    if (mobileToggle) {

        mobileToggle.addEventListener("click", () => {

            mobileMenu.classList.toggle("show");

        });

    }

    /*=====================================================
      PHONE NUMBER
    =====================================================*/
    phoneInput.addEventListener("input", function () {

        // Keep only numbers
        let value = this.value.replace(/\D/g, "");

        // Max 11 digits
        value = value.substring(0, 11);

        this.value = value;

    });

    /*=====================================================
      SEND OTP
    =====================================================*/
    otpButton.addEventListener("click", function () {

        const number = phoneInput.value.trim();

        if (number.length !== 11) {

            alert("Please enter a valid phone number.");

            phoneInput.focus();

            return;

        }

        this.disabled = true;

        const original = this.innerHTML;

        this.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2"></span>
            Sending...
        `;

        setTimeout(() => {

            this.innerHTML = "OTP Sent ✓";

            this.style.background = "#19C37D";
            this.style.color = "#fff";

            otpInputs[0].focus();

        }, 1500);

    });

    /*=====================================================
      OTP AUTO NEXT
    =====================================================*/
    otpInputs.forEach((input, index) => {

        input.addEventListener("input", function () {

            this.value = this.value.replace(/[^0-9]/g, "");

            if (this.value.length === 1 && index < otpInputs.length - 1) {

                otpInputs[index + 1].focus();

            }

        });

    });

    /*=====================================================
      OTP BACKSPACE
    =====================================================*/
    otpInputs.forEach((input, index) => {

        input.addEventListener("keydown", function (e) {

            if (e.key === "Backspace" && this.value === "" && index > 0) {

                otpInputs[index - 1].focus();

            }

        });

    });

    /*=====================================================
      OTP PASTE
    =====================================================*/
    otpInputs[0].addEventListener("paste", function (e) {

        e.preventDefault();

        const paste = (e.clipboardData || window.clipboardData)
            .getData("text")
            .replace(/\D/g, "")
            .substring(0, otpInputs.length);

        paste.split("").forEach((digit, index) => {

            if (otpInputs[index]) {

                otpInputs[index].value = digit;

            }

        });

    });

    /*=====================================================
      VERIFY BUTTON
    =====================================================*/
    verifyButton.addEventListener("click", function () {

        const phone = phoneInput.value.trim();

        if (phone.length !== 11) {

            alert("Please enter your phone number.");

            return;

        }

        let otp = "";

        otpInputs.forEach(input => {

            otp += input.value;

        });

        if (otp.length !== 6) {

            alert("Enter the complete OTP.");

            return;

        }

        this.disabled = true;

        const originalText = this.innerHTML;

        this.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2"></span>
            Verifying...
        `;

        setTimeout(() => {

            this.innerHTML = `
                <i class="bi bi-check-circle-fill me-2"></i>
                Verified
            `;

            this.style.background = "#19C37D";

            window.location.href= "../../verifications/seller-business.html";

        }, 1800);

    });

    /*=====================================================
      PAGE ANIMATION
    =====================================================*/
    const card = document.querySelector(".verification-card");

    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";

    setTimeout(() => {

        card.style.transition = ".6s ease";

        card.style.opacity = "1";
        card.style.transform = "translateY(0)";

    }, 200);

    /*=====================================================
      PROGRESS ANIMATION
    =====================================================*/
    const steps = document.querySelectorAll(".step");

    steps.forEach((step, index) => {

        step.style.opacity = "0";
        step.style.transform = "translateY(15px)";

        setTimeout(() => {

            step.style.transition = ".4s ease";

            step.style.opacity = "1";

            step.style.transform = "translateY(0)";

        }, index * 180);

    });

    /*=====================================================
      BUTTON HOVER EFFECT
    =====================================================*/
    document.querySelectorAll("button").forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.style.transition = ".3s";

        });

    });

    /*=====================================================
      OTP INPUT ANIMATION
    =====================================================*/
    otpInputs.forEach(input => {

        input.addEventListener("focus", () => {

            input.style.transform = "scale(1.05)";

        });

        input.addEventListener("blur", () => {

            input.style.transform = "scale(1)";

        });

    });

});
