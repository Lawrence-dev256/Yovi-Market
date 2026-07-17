
 /* =====================================
  Seller Verification Script
  =====================================*/

document.addEventListener("DOMContentLoaded", () => {
    initFileUpload();
    initFormValidation();
    initNavbarShadow();
    initInputAnimations();
    initRippleEffects();
    initStepAnimation();
    initNavLinks();
    initBackButton();
});

/*========================================
    FILE UPLOAD
========================================*/

function initFileUpload() {

    const uploadInput = document.getElementById("uploadFile");
    const uploadBox = document.querySelector(".upload-box");
    const uploadText = document.querySelector(".upload-content p");

    if (!uploadInput || !uploadBox || !uploadText) return;

    uploadInput.addEventListener("change", function () {

        if (this.files.length) {

            uploadBox.classList.add("file-selected");

            uploadText.innerHTML = `
                <strong>${this.files[0].name}</strong><br>
                File selected successfully.
            `;

        } else {

            uploadBox.classList.remove("file-selected");

            uploadText.textContent =
                "Upload CAC certificate for higher trust tier";

        }

    });

}

/*========================================
    FORM VALIDATION
========================================*/

function initFormValidation() {

    const form = document.getElementById("verificationForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const businessName = document.getElementById("businessName");
        const businessType = document.getElementById("businessType");
        const submitBtn = document.querySelector(".btn-submit");

        if (businessName.value.trim() === "") {

            showToast("Please enter your business/store name.");

            businessName.focus();

            return;

        }

        if (businessType.selectedIndex === 0) {

            showToast("Please select a business type.");

            businessType.focus();

            return;

        }

        submitBtn.disabled = true;

        submitBtn.innerHTML = `
            <span class="spinner-border spinner-border-sm"></span>
            Submitting...
        `;

        setTimeout(() => {

            submitBtn.disabled = false;

            submitBtn.innerHTML = `
                Submit Verification
                <i class="bi bi-arrow-right"></i>
            `;

            showToast("Verification submitted successfully!");

            window.location.href= "../../verifications/seller-submitted.html";

        }, 2000);

    });

}

/*========================================
    TOAST MESSAGE
========================================*/

function showToast(message) {

    const existingToast = document.querySelector(".custom-toast");

    if (existingToast) existingToast.remove();

    const toast = document.createElement("div");

    toast.className = "custom-toast";
    toast.textContent = message;

    Object.assign(toast.style, {

        position: "fixed",
        bottom: "25px",
        right: "25px",
        background: "#16C784",
        color: "#fff",
        padding: "14px 22px",
        borderRadius: "10px",
        fontWeight: "600",
        fontSize: "14px",
        zIndex: "9999",
        opacity: "0",
        transform: "translateY(20px)",
        transition: ".35s ease"

    });

    document.body.appendChild(toast);

    requestAnimationFrame(() => {

        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";

    });

    setTimeout(() => {

        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";

        setTimeout(() => toast.remove(), 300);

    }, 3000);

}

/*========================================
    INPUT ANIMATION
========================================*/

function initInputAnimations() {

    const fields = document.querySelectorAll(".form-control, .form-select");

    fields.forEach(field => {

        field.addEventListener("focus", () => {

            field.parentElement.style.transform = "translateY(-2px)";

        });

        field.addEventListener("blur", () => {

            field.parentElement.style.transform = "translateY(0)";

        });

    });

}

/*========================================
    NAVBAR SHADOW
========================================*/

function initNavbarShadow() {

    const navbar = document.querySelector(".top-navbar");

    if (!navbar) return;

    window.addEventListener("scroll", () => {

        navbar.style.boxShadow = window.scrollY > 10
            ? "0 10px 30px rgba(0,0,0,.06)"
            : "none";

    });

}

/*========================================
    RIPPLE EFFECT
========================================*/

function initRippleEffects() {

    const buttons = document.querySelectorAll(
        ".btn-submit, .btn-back, .icon-btn"
    );

    buttons.forEach(button => {

        button.style.position = "relative";
        button.style.overflow = "hidden";

        button.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            const diameter = Math.max(
                this.clientWidth,
                this.clientHeight
            );

            ripple.style.width = `${diameter}px`;
            ripple.style.height = `${diameter}px`;

            ripple.style.left = `${e.offsetX - diameter / 2}px`;
            ripple.style.top = `${e.offsetY - diameter / 2}px`;

            Object.assign(ripple.style, {

                position: "absolute",
                borderRadius: "50%",
                background: "rgba(255,255,255,.4)",
                transform: "scale(0)",
                transition: "all .6s ease",
                pointerEvents: "none"

            });

            this.appendChild(ripple);

            requestAnimationFrame(() => {

                ripple.style.transform = "scale(4)";
                ripple.style.opacity = "0";

            });

            setTimeout(() => ripple.remove(), 600);

        });

    });

}

/*========================================
    STEP ANIMATION
========================================*/

function initStepAnimation() {

    const steps = document.querySelectorAll(".step");

    steps.forEach((step, index) => {

        step.style.opacity = "0";
        step.style.transform = "translateY(20px)";

        setTimeout(() => {

            step.style.transition = ".45s ease";
            step.style.opacity = "1";
            step.style.transform = "translateY(0)";

        }, index * 180);

    });

}

/*========================================
    ACTIVE NAVIGATION
========================================*/

function initNavLinks() {

    const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {

        link.addEventListener("click", function () {

            links.forEach(item =>
                item.classList.remove("active")
            );

            this.classList.add("active");

        });

    });

}

/*========================================
    BACK BUTTON
========================================*/

function initBackButton() {

    const backBtn = document.querySelector(".btn-back");

    if (!backBtn) return;

    backBtn.addEventListener("click", () => {

        window.history.back();

    });

}