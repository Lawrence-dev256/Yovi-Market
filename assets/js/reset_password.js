

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       ELEMENTS
    ========================================== */

    const form = document.getElementById("resetPasswordForm");

    const passwordInput =
        document.getElementById("password");

    const confirmPasswordInput =
        document.getElementById("confirmPassword");

    const resetBtn =
        document.getElementById("resetBtn");

    const strengthFill =
        document.getElementById("strengthFill");

    const strengthText =
        document.getElementById("strengthText");

    const passwordMatch =
        document.getElementById("passwordMatch");

    const generateBtn =
        document.getElementById("generatePasswordBtn");

    const copyBtn =
        document.getElementById("copyPasswordBtn");

    const successScreen =
        document.getElementById("successScreen");

    const loadingSpinner =
        document.getElementById("loadingSpinner");

    const errorMessage =
        document.getElementById("errorMessage");

    const capsLockWarning =
        document.getElementById("capsLockWarning");

    /* ==========================================
       REQUIREMENTS
    ========================================== */

    const requirements = {
        length: document.getElementById("reqLength"),
        upper: document.getElementById("reqUpper"),
        lower: document.getElementById("reqLower"),
        number: document.getElementById("reqNumber"),
        special: document.getElementById("reqSpecial")
    };

    /* ==========================================
       PASSWORD TOGGLES
    ========================================== */

    document
        .querySelectorAll(".toggle-password")
        .forEach(button => {

            button.addEventListener("click", () => {

                const target =
                    document.getElementById(
                        button.dataset.target
                    );

                const icon =
                    button.querySelector("i");

                if (target.type === "password") {

                    target.type = "text";

                    icon.classList.remove(
                        "fa-eye"
                    );

                    icon.classList.add(
                        "fa-eye-slash"
                    );

                } else {

                    target.type = "password";

                    icon.classList.remove(
                        "fa-eye-slash"
                    );

                    icon.classList.add(
                        "fa-eye"
                    );
                }
            });
        });

    /* ==========================================
       PASSWORD VALIDATION
    ========================================== */

    function validatePassword(password) {

        return {

            length:
                password.length >= 12,

            upper:
                /[A-Z]/.test(password),

            lower:
                /[a-z]/.test(password),

            number:
                /\d/.test(password),

            special:
                /[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]/.test(password)
        };
    }

    /* ==========================================
       UPDATE REQUIREMENTS UI
    ========================================== */

    function updateRequirement(
        element,
        valid
    ) {

        const icon =
            element.querySelector("i");

        if (valid) {

            element.classList.add(
                "valid"
            );

            icon.classList.remove(
                "fa-circle"
            );

            icon.classList.add(
                "fa-circle-check"
            );

        } else {

            element.classList.remove(
                "valid"
            );

            icon.classList.remove(
                "fa-circle-check"
            );

            icon.classList.add(
                "fa-circle"
            );
        }
    }

    /* ==========================================
       PASSWORD STRENGTH
    ========================================== */

    function calculateStrength(
        password
    ) {

        let score = 0;

        if (
            password.length >= 12
        ) score++;

        if (
            /[A-Z]/.test(password)
        ) score++;

        if (
            /[a-z]/.test(password)
        ) score++;

        if (
            /\d/.test(password)
        ) score++;

        if (
            /[^A-Za-z0-9]/.test(password)
        ) score++;

        return score;
    }

    function updateStrengthMeter(
        score
    ) {

        strengthFill.className =
            "strength-fill";

        switch (score) {

            case 1:

                strengthFill.style.width =
                    "20%";

                strengthFill.classList.add(
                    "strength-weak"
                );

                strengthText.textContent =
                    "Weak Password";

                break;

            case 2:

                strengthFill.style.width =
                    "40%";

                strengthFill.classList.add(
                    "strength-fair"
                );

                strengthText.textContent =
                    "Fair Password";

                break;

            case 3:

                strengthFill.style.width =
                    "60%";

                strengthFill.classList.add(
                    "strength-good"
                );

                strengthText.textContent =
                    "Good Password";

                break;

            case 4:

                strengthFill.style.width =
                    "80%";

                strengthFill.classList.add(
                    "strength-strong"
                );

                strengthText.textContent =
                    "Strong Password";

                break;

            case 5:

                strengthFill.style.width =
                    "100%";

                strengthFill.classList.add(
                    "strength-very-strong"
                );

                strengthText.textContent =
                    "Very Strong Password";

                break;

            default:

                strengthFill.style.width =
                    "0%";

                strengthText.textContent =
                    "Enter a password";
        }
    }

    /* ==========================================
       LIVE VALIDATION
    ========================================== */

    function validateForm() {

        const password =
            passwordInput.value;

        const confirmPassword =
            confirmPasswordInput.value;

        const result =
            validatePassword(password);

        updateRequirement(
            requirements.length,
            result.length
        );

        updateRequirement(
            requirements.upper,
            result.upper
        );

        updateRequirement(
            requirements.lower,
            result.lower
        );

        updateRequirement(
            requirements.number,
            result.number
        );

        updateRequirement(
            requirements.special,
            result.special
        );

        const score =
            calculateStrength(password);

        updateStrengthMeter(score);

        const passwordValid =
            Object.values(result)
                .every(Boolean);

        const passwordsMatch =
            password &&
            password ===
            confirmPassword;

        if (
            confirmPassword.length > 0
        ) {

            if (passwordsMatch) {

                passwordMatch.innerHTML =
                    '<i class="fa-solid fa-circle-check"></i> Passwords match';

                passwordMatch.className =
                    "password-match match-success";

            } else {

                passwordMatch.innerHTML =
                    '<i class="fa-solid fa-circle-xmark"></i> Passwords do not match';

                passwordMatch.className =
                    "password-match match-error";
            }
        } else {

            passwordMatch.innerHTML = "";
        }

        resetBtn.disabled =
            !(
                passwordValid &&
                passwordsMatch
            );

        return (
            passwordValid &&
            passwordsMatch
        );
    }

    passwordInput.addEventListener(
        "input",
        validateForm
    );

    confirmPasswordInput.addEventListener(
        "input",
        validateForm
    );

    /* ==========================================
       CAPS LOCK
    ========================================== */

    passwordInput.addEventListener(
        "keyup",
        e => {

            if (
                e.getModifierState(
                    "CapsLock"
                )
            ) {

                capsLockWarning.classList.remove(
                    "d-none"
                );

            } else {

                capsLockWarning.classList.add(
                    "d-none"
                );
            }
        }
    );

    /* ==========================================
       PASSWORD GENERATOR
    ========================================== */

    function generatePassword() {

    const upper =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const lower =
        "abcdefghijklmnopqrstuvwxyz";

    const numbers =
        "0123456789";

    const special =
        "!@#$%^&*()_+-=[]{}<>?";

    const all =
        upper +
        lower +
        numbers +
        special;

    const length = 18;

    let password = [
        upper[randomIndex(upper.length)],
        lower[randomIndex(lower.length)],
        numbers[randomIndex(numbers.length)],
        special[randomIndex(special.length)]
    ];

    const randomValues =
        new Uint32Array(length - 4);

    crypto.getRandomValues(randomValues);

    randomValues.forEach(value => {

        password.push(
            all[value % all.length]
        );

    });

    return shuffle(password).join("");
}

function randomIndex(max) {

    const array =
        new Uint32Array(1);

    crypto.getRandomValues(array);

    return array[0] % max;
}

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const rand =
            new Uint32Array(1);

        crypto.getRandomValues(rand);

        const j =
            rand[0] % (i + 1);

        [array[i], array[j]] =
            [array[j], array[i]];
    }

    return array;
}


    /* ==========================================
       COPY PASSWORD
    ========================================== */

    copyBtn.addEventListener(
        "click",
        async () => {

            if (
                !passwordInput.value
            ) return;

            try {

                await navigator
                    .clipboard
                    .writeText(
                        passwordInput.value
                    );

                const original =
                    copyBtn.innerHTML;

                copyBtn.innerHTML =
                    '<i class="fa-solid fa-check"></i> Copied';

                setTimeout(() => {

                    copyBtn.innerHTML =
                        original;

                }, 2000);

            } catch {

                console.error(
                    "Copy failed"
                );
            }
        }
    );

    /* ==========================================
       GET RESET TOKEN
    ========================================== */

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const token =
        urlParams.get("token");

    /* ==========================================
       FORM SUBMIT
    ========================================== */

    form.addEventListener(
        "submit",
        async e => {

            e.preventDefault();

            errorMessage.classList.add(
                "d-none"
            );

            if (
                !validateForm()
            ) return;

            resetBtn.disabled = true;

            loadingSpinner.classList.remove(
                "d-none"
            );

            try {

        /*============================
        GENERATE BACKEND HERE 
        ==============================*/
                const response =
                    await fetch(
                        "/api/auth/reset-password",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                token,
                                password:
                                    passwordInput.value
                            })
                        }
                    );

                const data =
                    await response.json();

                if (
                    !response.ok
                ) {

                    throw new Error(
                        data.message ||
                        "Password reset failed"
                    );
                }

                form.classList.add(
                    "d-none"
                );

                successScreen.classList.remove(
                    "d-none"
                );

            } catch (error) {

                errorMessage.textContent =
                    error.message;

                errorMessage.classList.remove(
                    "d-none"
                );

                resetBtn.disabled = false;

            } finally {

                loadingSpinner.classList.add(
                    "d-none"
                );
            }
        }
    );

});