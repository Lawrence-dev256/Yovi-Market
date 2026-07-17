/*=========================================================
YOVI REGISTER PAGE
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