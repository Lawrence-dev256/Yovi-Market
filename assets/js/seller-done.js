/*==================================================
SELLER DONE PAGE (3A)

==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
    PAGE CHECK
    =========================================*/

    const donePage = document.getElementById("ysdDonePage");

    if (!donePage) return;

    /*=========================================
    ELEMENT REFERENCES
    =========================================*/

    const loader = document.getElementById("ysdPageLoader");

    const toastElement = document.getElementById("ysdToast");

    const toastMessage = document.getElementById("ysdToastMessage");

    const confettiContainer = document.getElementById("ysdConfettiContainer");

    const addProductBtn = document.getElementById("ysdAddFirstProductBtn");

    const dashboardBtn = document.getElementById("ysdViewDashboardBtn");

    const homeBtn = document.getElementById("ysdBackHomeBtn");

    const notificationBtn = document.getElementById("ysdViewNotificationsBtn");

    const dashboardPage = document.getElementById("ysdDashboardPage");

    const addProductPage = document.getElementById("ysdAddProductPage");

    const accountStatus = document.getElementById("ysdAccountStatus");

    const accountRole = document.getElementById("ysdAccountRole");

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
    SHOW TOAST
    =========================================*/

    function showToast(message){

        toastMessage.textContent = message;

        successToast.show();

    }

    /*=========================================
    PAGE LOADER
    =========================================*/

    function showLoader(){

        loader.classList.add("show");

    }

    function hideLoader(){

        loader.classList.remove("show");

    }

    /*=========================================
    INITIAL SESSION
    =========================================*/

    sessionStorage.setItem(

        "yoviCurrentStep",

        "seller-done"

    );

    sessionStorage.setItem(

        "yoviSellerStatus",

        accountStatus.textContent.trim()

    );

    sessionStorage.setItem(

        "yoviUserRole",

        accountRole.value

    );

    /*=========================================
    SUCCESS MESSAGE
    =========================================*/

    setTimeout(() => {

        showToast(

            "🎉 Congratulations! Your seller account is now live."

        );

    },600);

    /*=========================================
    PAGE ENTRANCE
    =========================================*/

    donePage.classList.add(

        "ysd-page-loaded"

    );

    /*=========================================
    ADD FIRST PRODUCT
    =========================================*/

    addProductBtn.addEventListener("click", () => {

        showLoader();

        addProductBtn.disabled = true;

        addProductBtn.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Opening...

        `;

        setTimeout(() => {

            window.location.href =

                addProductPage.value;

        },800);

    });

    /*=========================================
    VIEW DASHBOARD
    =========================================*/

    dashboardBtn.addEventListener("click", () => {

        showLoader();

        dashboardBtn.disabled = true;

        dashboardBtn.innerHTML = `

            <i class="bi bi-speedometer2 me-2"></i>

            Loading Dashboard...

        `;

        setTimeout(() => {

            window.location.href =

                dashboardPage.value;

        },800);

    });
    
/*==================================================
SELLER DONE PAGE (3B)
Footer Navigation • Confetti • Celebration
Append after Part 3A
==================================================*/

    /*=========================================
    BACK TO HOME
    =========================================*/

    homeBtn.addEventListener("click", () => {

        showLoader();

        setTimeout(() => {

            window.location.href = "index.html";

        }, 700);

    });

    /*=========================================
    VIEW NOTIFICATIONS
    =========================================*/

    notificationBtn.addEventListener("click", () => {

        showLoader();

        setTimeout(() => {

            window.location.href = "notifications.html";

        }, 700);

    });

    /*=========================================
    CONFETTI CELEBRATION
    =========================================*/

    function launchConfetti() {

        const colors = [

            "orange",

            "green",

            "blue",

            "purple",

            "yellow"

        ];

        for (let i = 0; i < 120; i++) {

            const piece = document.createElement("div");

            piece.className = `ysd-confetti ${

                colors[Math.floor(Math.random() * colors.length)]

            }`;

            piece.style.left =

                Math.random() * 100 + "%";

            piece.style.animationDuration =

                (Math.random() * 3 + 2) + "s";

            piece.style.animationDelay =

                Math.random() * .8 + "s";

            piece.style.transform =

                `rotate(${Math.random() * 360}deg)`;

            confettiContainer.appendChild(piece);

            piece.addEventListener("animationend", () => {

                piece.remove();

            });

        }

    }

    /*=========================================
    START CELEBRATION
    =========================================*/

    setTimeout(() => {

        launchConfetti();

    }, 500);

    /*=========================================
    OPTIONAL SUCCESS SOUND
    =========================================*/

    function playSuccessSound() {

        /*
        Optional:

        const audio = new Audio(
            "assets/audio/success.mp3"
        );

        audio.play();

        */

    }

    playSuccessSound();

    /*=========================================
    SAVE COMPLETION STATUS
    =========================================*/

    sessionStorage.setItem(

        "yoviSellerSetupCompleted",

        "true"

    );

    sessionStorage.setItem(

        "yoviSellerDashboardReady",

        "true"

    );

    /*=========================================
    DEVELOPMENT LOG
    =========================================*/

    console.info(

        "Seller setup completed successfully."

    );

    /*=========================================
    RESTORE SESSION
    =========================================*/

    function restoreSellerSession() {

        const sellerStatus = sessionStorage.getItem(

            "yoviSellerStatus"

        );

        const currentStep = sessionStorage.getItem(

            "yoviCurrentStep"

        );

        const dashboardReady = sessionStorage.getItem(

            "yoviSellerDashboardReady"

        );

        console.info("Seller Status:", sellerStatus);

        console.info("Current Step:", currentStep);

        console.info("Dashboard Ready:", dashboardReady);

    }

    restoreSellerSession();

    /*=========================================
    MARK ONBOARDING COMPLETE
    =========================================*/

    sessionStorage.setItem(

        "yoviOnboardingCompleted",

        "true"

    );

    sessionStorage.setItem(

        "yoviLastCompletedPage",

        "seller-done"

    );

    sessionStorage.setItem(

        "yoviAccountActivated",

        "true"

    );

    /*=========================================
    PRELOAD DASHBOARD
    =========================================*/

    function preloadDashboard() {

        const preloadLink = document.createElement("link");

        preloadLink.rel = "prefetch";

        preloadLink.href = dashboardPage.value;

        document.head.appendChild(preloadLink);

    }

    preloadDashboard();

    /*=========================================
    AUTO HIDE LOADER
    =========================================*/

    window.addEventListener("load", () => {

        hideLoader();

    });

    /*=========================================
    BUTTON HOVER ANIMATION
    =========================================*/

    [

        addProductBtn,

        dashboardBtn

    ].forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.style.transform =

                "translateY(-2px)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });

    /*=========================================
    KEYBOARD SHORTCUTS
    =========================================*/

    document.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            dashboardBtn.click();

        }

        if (

            event.key.toLowerCase() === "a"

        ) {

            addProductBtn.click();

        }

    });

    /*=========================================
    PAGE VISIBILITY
    =========================================*/

    document.addEventListener(

        "visibilitychange",

        () => {

            if (!document.hidden) {

                console.info(

                    "Welcome back."

                );

            }

        }

    );

    /*=========================================
    ANALYTICS PLACEHOLDER
    =========================================*/

    function trackCompletion() {

        console.info(

            "Analytics Event:",

            "Seller Completed"

        );

        /*
        Example:

        gtag('event','seller_completed',{
            role:'seller'
        });

        */

    }

    trackCompletion();

    /*=========================================
    PREVENT MULTIPLE CLICKS
    =========================================*/

    let navigationInProgress = false;

    function beginNavigation(button) {

        if (navigationInProgress) return false;

        navigationInProgress = true;

        button.disabled = true;

        showLoader();

        return true;

    }

    /*=========================================
    OVERRIDE PRIMARY NAVIGATION
    =========================================*/

    addProductBtn.addEventListener("click", function (event) {

        event.stopImmediatePropagation();

        if (!beginNavigation(this)) return;

        this.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Redirecting...

        `;

        setTimeout(() => {

            window.location.href = "";
            
            addProductPage.value;

        }, 900);

    });

    dashboardBtn.addEventListener("click", function (event) {

        event.stopImmediatePropagation();

        if (!beginNavigation(this)) return;

        this.innerHTML = `

            <i class="bi bi-speedometer2 me-2"></i>

            Opening Dashboard...

        `;

        setTimeout(() => {

            window.location.href = "seller/seller-dashboard.html"; 
            
            dashboardPage.value;

        }, 900);

    });

    /*=========================================
    AUTO FOCUS
    =========================================*/

    window.addEventListener("load", () => {

        dashboardBtn.focus();

    });

    /*=========================================
    ESC KEY SUPPORT
    =========================================*/

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            hideLoader();

        }

    });

    /*=========================================
    NETWORK STATUS
    =========================================*/

    window.addEventListener("offline", () => {

        showToast(

            "No internet connection detected."

        );

    });

    window.addEventListener("online", () => {

        showToast(

            "Internet connection restored."

        );

    });

    /*=========================================
    PERFORMANCE LOG
    =========================================*/

    window.addEventListener("load", () => {

        if ("performance" in window) {

            console.info(

                "Seller Done loaded in",

                Math.round(performance.now()),

                "ms"

            );

        }

    });

    /*=========================================
    PREFETCH DASHBOARD
    =========================================*/

    fetch(dashboardPage.value, {

        method: "GET",

        cache: "force-cache"

    }).catch(() => {

        /* Ignore prefetch errors */

    });

    /*=========================================
    FINALIZE SESSION
    =========================================*/

    function finalizeSellerOnboarding() {

        sessionStorage.setItem(

            "yoviSellerSetupFinished",

            "true"

        );

        sessionStorage.removeItem(

            "yoviCurrentStep"

        );

    }

    finalizeSellerOnboarding();

    /*=========================================
    DEVELOPMENT LOG
    =========================================*/

    console.info(

        "Seller Done UX initialized."

    );

    /*=========================================
    SAVE COMPLETION RECORD
    =========================================*/

    function saveCompletionRecord() {

        const completionData = {

            completed: true,

            role: "seller",

            completedAt: new Date().toISOString(),

            nextPage: dashboardPage.value

        };

        localStorage.setItem(

            "yoviSellerCompletion",

            JSON.stringify(completionData)

        );

    }

    saveCompletionRecord();

    /*=========================================
    AUTO SAVE USER SESSION
    =========================================*/

    function updateLastActivity() {

        sessionStorage.setItem(

            "yoviLastActivity",

            Date.now()

        );

    }

    updateLastActivity();

    document.addEventListener(

        "click",

        updateLastActivity

    );

    document.addEventListener(

        "keydown",

        updateLastActivity

    );

    /*=========================================
    BEFORE UNLOAD
    =========================================*/

    window.addEventListener("beforeunload", () => {

        sessionStorage.setItem(

            "yoviLastVisitedPage",

            "seller-done"

        );

    });

    /*=========================================
    CLEAR TEMPORARY SETUP DATA
    =========================================*/

    function clearTemporaryData() {

        const temporaryKeys = [

            "yoviSellerProfile",

            "yoviSellerSetup",

            "yoviCurrentStep"

        ];

        temporaryKeys.forEach(key => {

            sessionStorage.removeItem(key);

        });

    }

    clearTemporaryData();

    /*=========================================
    VERIFY DASHBOARD ACCESS
    =========================================*/

    function dashboardAccessible() {

        return (

            sessionStorage.getItem(

                "yoviSellerDashboardReady"

            ) === "true"

        );

    }

    console.info(

        "Dashboard Access:",

        dashboardAccessible()

    );

    /*=========================================
    PAGE TIMER
    =========================================*/

    const pageOpenedAt = Date.now();

    window.addEventListener("pagehide", () => {

        const duration = Math.round(

            (Date.now() - pageOpenedAt) / 1000

        );

        console.info(

            `Time spent on Seller Done page: ${duration}s`

        );

    });

    /*=========================================
    DEVELOPMENT HELPERS
    =========================================*/

    window.yoviSellerDone = {

        showToast,

        showLoader,

        hideLoader,

        dashboardAccessible,

        saveCompletionRecord

    };

    /*=========================================
    INITIALIZATION COMPLETE
    =========================================*/

    console.group(

        "YOVI - Seller Done"

    );

    console.log(

        "Role:",

        sessionStorage.getItem("yoviUserRole")

    );

    console.log(

        "Status:",

        sessionStorage.getItem("yoviSellerStatus")

    );

    console.log(

        "Dashboard:",

        dashboardPage.value

    );

    console.log(

        "Add Product:",

        addProductPage.value

    );

    console.groupEnd();

    console.info(

        "✔ Seller Done page initialized successfully."

    );

});