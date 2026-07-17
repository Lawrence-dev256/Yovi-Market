/*==================================================
ACCOUNT TYPE PAGE 
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
