/*==================================================
SERVICE PROVIDER DONE PAGE 
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
    PAGE CHECK
    =========================================*/

    const donePage = document.getElementById("yspdDonePage");

    if (!donePage) return;

    /*=========================================
    ELEMENT REFERENCES
    =========================================*/

    const loader = document.getElementById("yspdPageLoader");

    const toastElement = document.getElementById("yspdToast");

    const toastMessage = document.getElementById("yspdToastMessage");

    const confettiContainer = document.getElementById("yspdConfettiContainer");

    const availabilityBtn = document.getElementById("yspdAvailabilityBtn");

    const dashboardBtn = document.getElementById("yspdDashboardBtn");

    const homeBtn = document.getElementById("yspdBackHomeBtn");

    const notificationBtn = document.getElementById("yspdNotificationBtn");

    const nextPage = document.getElementById("yspdNextPage");

    const availabilityPage = document.getElementById("yspdAvailabilityPage");

    const accountStatus = document.getElementById("yspdAccountStatus");

    const userRole = document.getElementById("yspdUserRole");

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

        "service-provider-done"

    );

    sessionStorage.setItem(

        "yoviProviderStatus",

        accountStatus.value

    );

    sessionStorage.setItem(

        "yoviUserRole",

        userRole.value

    );

    /*=========================================
    INITIAL SUCCESS MESSAGE
    =========================================*/

    setTimeout(() => {

        showToast(

            "🎉 Congratulations! Your account is now live."

        );

    },600);

    /*=========================================
    ENTRANCE ANIMATION
    =========================================*/

    donePage.classList.add(

        "yspd-page-loaded"

    );

    /*=========================================
    NAVIGATION
    =========================================*/

    availabilityBtn.addEventListener("click", () => {

        showLoader();

        availabilityBtn.disabled = true;

        availabilityBtn.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Opening...

        `;

        setTimeout(() => {

            window.location.href =

                availabilityPage.value;

        },800);

    });

    dashboardBtn.addEventListener("click", () => {

        showLoader();

        dashboardBtn.disabled = true;

        dashboardBtn.innerHTML = `

            <i class="bi bi-speedometer2 me-2"></i>

            Loading Dashboard...

        `;

        setTimeout(() => {

            window.location.href = "../../provider/provider-dashboard.html";

                nextPage.value;

        },800);

    });


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
    NOTIFICATIONS
    =========================================*/

    notificationBtn.addEventListener("click", () => {

        showLoader();

        setTimeout(() => {

            window.location.href = "../../navigation/notification.html";

        }, 700);

    });

    /*=========================================
    CONFETTI EFFECT
    =========================================*/

    function launchConfetti() {

        const colors = [

            "green",

            "blue",

            "purple",

            "yellow",

            "red"

        ];

        for (let i = 0; i < 120; i++) {

            const piece = document.createElement("div");

            piece.className = `yspd-confetti ${

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
    PLAY SUCCESS SOUND
    (Optional)
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
    SAVE FINAL STATE
    =========================================*/

    sessionStorage.setItem(

        "yoviSetupCompleted",

        "true"

    );

    sessionStorage.setItem(

        "yoviDashboardReady",

        "true"

    );

    /*=========================================
    LOG
    =========================================*/

    console.info(

        "Service Provider setup completed."

    );


    /*=========================================
    RESTORE SESSION
    =========================================*/

    function restoreProviderSession() {

        const providerStatus = sessionStorage.getItem(

            "yoviProviderStatus"

        );

        const currentStep = sessionStorage.getItem(

            "yoviCurrentStep"

        );

        const dashboardReady = sessionStorage.getItem(

            "yoviDashboardReady"

        );

        console.info("Provider Status:", providerStatus);

        console.info("Current Step:", currentStep);

        console.info("Dashboard Ready:", dashboardReady);

    }

    restoreProviderSession();

    /*=========================================
    MARK ONBOARDING COMPLETE
    =========================================*/

    sessionStorage.setItem(

        "yoviOnboardingCompleted",

        "true"

    );

    sessionStorage.setItem(

        "yoviLastCompletedPage",

        "service-provider-done"

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

        preloadLink.href = nextPage.value;

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

        availabilityBtn,

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

            availabilityBtn.click();

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

            "Service Provider Completed"

        );

        /*
        Example:

        gtag('event','provider_completed',{
            role:'service-provider'
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
    BUTTON NAVIGATION OVERRIDE
    =========================================*/

    availabilityBtn.addEventListener("click", function (event) {

        event.stopImmediatePropagation();

        if (!beginNavigation(this)) return;

        this.innerHTML = `

            <i class="bi bi-arrow-repeat me-2"></i>

            Redirecting...

        `;

        setTimeout(() => {

            window.location.href = "";
            
            availabilityPage.value;

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

            window.location.href = "../../provider/provider-dashboard.html";

        }, 900);

    });

    /*=========================================
    FOCUS MANAGEMENT
    =========================================*/

    window.addEventListener("load", () => {

        dashboardBtn.focus();

    });

    /*=========================================
    ESC KEY SUPPORT
    =========================================*/

    document.addEventListener("keydown", function (event) {

        if (event.key !== "Escape") return;

        hideLoader();

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

            "Connection restored."

        );

    });

    /*=========================================
    PAGE PERFORMANCE
    =========================================*/

    window.addEventListener("load", () => {

        if ("performance" in window) {

            console.info(

                "Page loaded in",

                Math.round(performance.now()),

                "ms"

            );

        }

    });

    /*=========================================
    DASHBOARD PREFETCH
    =========================================*/

    fetch(nextPage.value, {

        method: "GET",

        cache: "force-cache"

    }).catch(() => {

        /* Ignore prefetch failures */

    });

    /*=========================================
    CLEAN SESSION
    =========================================*/

    function finalizeOnboarding() {

        sessionStorage.setItem(

            "yoviSetupFinished",

            "true"

        );

        sessionStorage.removeItem(

            "yoviCurrentStep"

        );

    }

    finalizeOnboarding();

    /*=========================================
    DEVELOPMENT LOG
    =========================================*/

    console.info(

        "Service Provider Done UX initialized."

    );

    /*=========================================
    SAVE COMPLETION RECORD
    =========================================*/

    function saveCompletionRecord() {

        const completionData = {

            completed: true,

            role: "service-provider",

            completedAt: new Date().toISOString(),

            nextPage: nextPage.value

        };

        localStorage.setItem(

            "yoviServiceProviderCompletion",

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

            "service-provider-done"

        );

    });

    /*=========================================
    CLEAR TEMPORARY SETUP DATA
    Keep only required onboarding data
    =========================================*/

    function clearTemporaryData() {

        const temporaryKeys = [

            "yoviServiceSetup",

            "yoviProfileSetup",

            "yoviCurrentStep"

        ];

        temporaryKeys.forEach(key => {

            sessionStorage.removeItem(key);

        });

    }

    clearTemporaryData();

    /*=========================================
    CHECK DASHBOARD ACCESS
    =========================================*/

    function dashboardAccessible() {

        return (

            sessionStorage.getItem(

                "yoviDashboardReady"

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

        const duration =

            Math.round(

                (Date.now() - pageOpenedAt) / 1000

            );

        console.info(

            `Time spent on completion page: ${duration}s`

        );

    });

    /*=========================================
    DEVELOPMENT HELPERS
    =========================================*/

    window.yoviServiceProviderDone = {

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

        "YOVI - Service Provider Done"

    );

    console.log(

        "Role:",

        sessionStorage.getItem("yoviUserRole")

    );

    console.log(

        "Status:",

        sessionStorage.getItem("yoviProviderStatus")

    );

    console.log(

        "Dashboard:",

        nextPage.value

    );

    console.log(

        "Availability:",

        availabilityPage.value

    );

    console.groupEnd();

    console.info(

        "✔ Service Provider Done page initialized successfully."

    );

});