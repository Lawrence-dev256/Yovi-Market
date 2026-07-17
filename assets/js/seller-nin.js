 /*==================================
 NIN VERIFICATION PAGE 
 ===================================*/
document.addEventListener("DOMContentLoaded", () => {

    const uploadBox = document.getElementById("uploadBox");
    const fileInput = document.getElementById("fileInput");
    const fileName = document.getElementById("fileName");
    const continueBtn = document.querySelector(".continue-btn");
    const ninInput = document.querySelector(".nin-input");

    /*==========================================
      OPEN FILE PICKER
    ==========================================*/
    uploadBox.addEventListener("click", () => {
        fileInput.click();
    });

    /*==========================================
      FILE SELECTION
    ==========================================*/
    fileInput.addEventListener("change", function () {

        if (!this.files.length) return;

        const file = this.files[0];

        if (validateFile(file)) {
            displayFile(file);
        }

    });

    /*==========================================
      DRAG EVENTS
    ==========================================*/
    ["dragenter", "dragover"].forEach(event => {

        uploadBox.addEventListener(event, e => {

            e.preventDefault();
            uploadBox.classList.add("dragover");

        });

    });

    ["dragleave", "dragend"].forEach(event => {

        uploadBox.addEventListener(event, () => {

            uploadBox.classList.remove("dragover");

        });

    });

    uploadBox.addEventListener("drop", e => {

        e.preventDefault();

        uploadBox.classList.remove("dragover");

        if (!e.dataTransfer.files.length) return;

        const file = e.dataTransfer.files[0];

        if (validateFile(file)) {

            fileInput.files = e.dataTransfer.files;

            displayFile(file);

        }

    });

    /*==========================================
      VALIDATE FILE
    ==========================================*/
    function validateFile(file) {

        const allowed = [
            "image/png",
            "image/jpeg",
            "application/pdf"
        ];

        const maxSize = 5 * 1024 * 1024;

        if (!allowed.includes(file.type)) {

            alert("Only PNG, JPG and PDF files are allowed.");

            return false;

        }

        if (file.size > maxSize) {

            alert("Maximum upload size is 5MB.");

            return false;

        }

        return true;

    }

    /*==========================================
      DISPLAY FILE NAME
    ==========================================*/
    function displayFile(file) {

        fileName.innerHTML = `
            <i class="bi bi-check-circle-fill text-success me-2"></i>
            ${file.name}
        `;

        uploadBox.style.borderColor = "#22C55E";
        uploadBox.style.background = "#F0FDF4";

    }

    /*==========================================
      NIN INPUT
    ==========================================*/
    ninInput.addEventListener("input", function () {

        this.value = this.value.replace(/\D/g, "");

        if (this.value.length > 11) {

            this.value = this.value.slice(0, 11);

        }

    });

    /*==========================================
      BUTTON CLICK
    ==========================================*/
    continueBtn.addEventListener("click", function () {

        const nin = ninInput.value.trim();

        if (nin === "") {

            alert("Please enter your NIN.");

            ninInput.focus();

            return;

        }

        if (nin.length !== 11) {

            alert("NIN must contain exactly 11 digits.");

            ninInput.focus();

            return;

        }

        if (!fileInput.files.length) {

            alert("Please upload your NIN document.");

            return;

        }

        this.disabled = true;

        const originalHTML = this.innerHTML;

        this.innerHTML = `
            <span class="spinner-border spinner-border-sm"></span>
            Verifying...
        `;

        setTimeout(() => {

            this.disabled = false;

            this.innerHTML = originalHTML;

            alert("Verification details submitted successfully.");

        }, 1800);

    });

    /*==========================================
      CARD FADE-IN
    ==========================================*/
    const card = document.querySelector(".verification-card");

    if (card) {

        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";

        setTimeout(() => {

            card.style.transition = "all .7s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, 150);

    }

    /*==========================================
      PROGRESS STEP ANIMATION
    ==========================================*/
    const steps = document.querySelectorAll(".step");

    steps.forEach((step, index) => {

        step.style.opacity = "0";
        step.style.transform = "translateY(15px)";

        setTimeout(() => {

            step.style.transition = "all .45s ease";
            step.style.opacity = "1";
            step.style.transform = "translateY(0)";

        }, index * 180);

    });

    /*==========================================
      INPUT FOCUS EFFECT
    ==========================================*/
    ninInput.addEventListener("focus", () => {

        ninInput.parentElement.style.transform = "translateY(-2px)";
        ninInput.parentElement.style.transition = ".3s";

    });

    ninInput.addEventListener("blur", () => {

        ninInput.parentElement.style.transform = "translateY(0)";

    });

});