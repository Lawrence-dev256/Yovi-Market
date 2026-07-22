/*==================================================
BUYER DONE PAGE 
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
    PAGE CHECK
    =========================================*/

    const donePage = document.getElementById("ybdDonePage");

    if (!donePage) return;

    /*=========================================
    ELEMENT REFERENCES
    =========================================*/

    const loader = document.getElementById("ybdPageLoader");

    const toastElement = document.getElementById("ybdToast");

    const toastMessage = document.getElementById("ybdToastMessage");

    const confettiContainer = document.getElementById("ybdConfettiContainer");

    const browseProductsBtn = document.getElementById("ybdBrowseProductsBtn");

    const findServicesBtn = document.getElementById("ybdFindServicesBtn");

    const homeBtn = document.getElementById("ybdBackHomeBtn");

    const notificationBtn = document.getElementById("ybdViewBuyerDashboardBtn");

    const productsPage = document.getElementById("ybdProductsPage");

    const servicesPage = document.getElementById("ybdServicesPage");

    const dashboardPage = document.getElementById("ybdDashboardPage");

    const accountStatus = document.getElementById("ybdAccountStatus");

    const accountRole = document.getElementById("ybdAccountRole");

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

        "buyer-done"

    );

    sessionStorage.setItem(

        "yoviBuyerStatus",

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

            "🎉 Congratulations! Your buyer account is now ready."

        );

    },600);

    /*=========================================
    PAGE ENTRANCE
    =========================================*/

    donePage.classList.add(

        "ybd-page-loaded"

    );

    /*=========================================
    BROWSE PRODUCTS
    =========================================*/

    browseProductsBtn.addEventListener("click", () => {

        showLoader();

        browseProductsBtn.disabled = true;

        browseProductsBtn.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Opening Products...

        `;

        setTimeout(() => {

            window.location.href ="../../navigation/products.html";

        },800);

    });

    /*=========================================
    FIND SERVICES
    =========================================*/

    findServicesBtn.addEventListener("click", () => {

        showLoader();

        findServicesBtn.disabled = true;

        findServicesBtn.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Opening Services...

        `;

        setTimeout(() => {

            window.location.href ="../../navigation/services.html";

        },800);

    });

    /*=========================================
    BACK TO HOME
    =========================================*/

    homeBtn.addEventListener("click", () => {

        showLoader();

        setTimeout(() => {

            window.location.href = "../../navigation/home.html";

        }, 700);

    });

    /*=========================================
    VIEW NOTIFICATIONS
    =========================================*/

    buyerDashboardBtn.addEventListener("click", () => {

        showLoader();

        setTimeout(() => {

            window.location.href = "../../navigation/notification.html";

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

            piece.className = `ybd-confetti ${

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

        "yoviBuyerSetupCompleted",

        "true"

    );

    sessionStorage.setItem(

        "yoviBuyerDashboardReady",

        "true"

    );

    /*=========================================
    DEVELOPMENT LOG
    =========================================*/

    console.info(

        "Buyer setup completed successfully."

    );

    /*=========================================
    RESTORE SESSION
    =========================================*/

    function restoreBuyerSession() {

        const buyerStatus = sessionStorage.getItem(

            "yoviBuyerStatus"

        );

        const currentStep = sessionStorage.getItem(

            "yoviCurrentStep"

        );

        const dashboardReady = sessionStorage.getItem(

            "yoviBuyerDashboardReady"

        );

        console.info(

            "Buyer Status:",

            buyerStatus

        );

        console.info(

            "Current Step:",

            currentStep

        );

        console.info(

            "Dashboard Ready:",

            dashboardReady

        );

    }

    restoreBuyerSession();

    /*=========================================
    MARK ONBOARDING COMPLETE
    =========================================*/

    sessionStorage.setItem(

        "yoviOnboardingCompleted",

        "true"

    );

    sessionStorage.setItem(

        "yoviLastCompletedPage",

        "buyer-done"

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
    BUTTON HOVER EFFECT
    =========================================*/

    [

        browseProductsBtn,

        findServicesBtn

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

            browseProductsBtn.click();

        }

        if (

            event.key.toLowerCase() === "s"

        ) {

            findServicesBtn.click();

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

                    "Buyer returned to page."

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

            "Buyer Completed"

        );

        /*
        Example:

        gtag('event','buyer_completed',{

            role:'buyer'

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
    OVERRIDE PRIMARY BUTTONS
    =========================================*/

    browseProductsBtn.addEventListener("click", function (event) {

        event.stopImmediatePropagation();

        if (!beginNavigation(this)) return;

        this.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Redirecting...

        `;

        setTimeout(() => {

            window.location.href = productsPage.value;

        }, 900);

    });

    findServicesBtn.addEventListener("click", function (event) {

        event.stopImmediatePropagation();

        if (!beginNavigation(this)) return;

        this.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Redirecting...

        `;

        setTimeout(() => {

            window.location.href = servicesPage.value;

        }, 900);

    });

    /*=========================================
    AUTO FOCUS
    =========================================*/

    window.addEventListener("load", () => {

        browseProductsBtn.focus();

    });

    /*=========================================
    ESC KEY SUPPORT
    =========================================*/

    document.addEventListener("keydown", event => {

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

                "Buyer Done loaded in",

                Math.round(performance.now()),

                "ms"

            );

        }

    });

    /*=========================================
    PREFETCH COMMON PAGES
    =========================================*/

    fetch(productsPage.value, {

        method: "GET",

        cache: "force-cache"

    }).catch(() => {});

    fetch(servicesPage.value, {

        method: "GET",

        cache: "force-cache"

    }).catch(() => {});

    /*=========================================
    FINALIZE SESSION
    =========================================*/

    function finalizeBuyerOnboarding() {

        sessionStorage.setItem(

            "yoviBuyerSetupFinished",

            "true"

        );

        sessionStorage.removeItem(

            "yoviCurrentStep"

        );

    }

    finalizeBuyerOnboarding();

    /*=========================================
    DEVELOPMENT LOG
    =========================================*/

    console.info(

        "Buyer Done UX initialized."

    );

    /*=========================================
    SAVE COMPLETION RECORD
    =========================================*/

    function saveCompletionRecord() {

        const completionData = {

            completed: true,

            role: "buyer",

            completedAt: new Date().toISOString(),

            nextPage: dashboardPage.value

        };

        localStorage.setItem(

            "yoviBuyerCompletion",

            JSON.stringify(completionData)

        );

    }

    saveCompletionRecord();

    /*=========================================
    AUTO SAVE LAST ACTIVITY
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
    REMEMBER LAST PAGE
    =========================================*/

    window.addEventListener("beforeunload", () => {

        sessionStorage.setItem(

            "yoviLastVisitedPage",

            "buyer-done"

        );

    });

    /*=========================================
    CLEAR TEMPORARY SETUP DATA
    =========================================*/

    function clearTemporaryData() {

        const temporaryKeys = [

            "yoviBuyerProfile",

            "yoviBuyerSetup",

            "yoviCurrentStep"

        ];

        temporaryKeys.forEach(key => {

            sessionStorage.removeItem(key);

        });

    }

    clearTemporaryData();

    /*=========================================
    VERIFY BUYER ACCESS
    =========================================*/

    function buyerAccessReady() {

        return (

            sessionStorage.getItem(

                "yoviBuyerDashboardReady"

            ) === "true"

        );

    }

    console.info(

        "Buyer Access:",

        buyerAccessReady()

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

            `Time spent on Buyer Done page: ${duration}s`

        );

    });

    /*=========================================
    GLOBAL DEBUG HELPERS
    =========================================*/

    window.yoviBuyerDone = {

        showToast,

        showLoader,

        hideLoader,

        buyerAccessReady,

        saveCompletionRecord

    };

    /*=========================================
    INITIALIZATION SUMMARY
    =========================================*/

    console.group(

        "YOVI - Buyer Done"

    );

    console.log(

        "Role:",

        sessionStorage.getItem("yoviUserRole")

    );

    console.log(

        "Status:",

        sessionStorage.getItem("yoviBuyerStatus")

    );

    console.log(

        "Products Page:",

        productsPage.value

    );

    console.log(

        "Services Page:",

        servicesPage.value

    );

    console.log(

        "Dashboard:",

        dashboardPage.value

    );

    console.groupEnd();

    console.info(

        "✔ Buyer Done page initialized successfully."

    );

});