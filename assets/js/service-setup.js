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