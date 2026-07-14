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