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