/*==================================================
PHONE VERIFICATION PAGE 
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