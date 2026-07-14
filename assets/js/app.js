document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* ==========================================
       DOM ELEMENTS
    ========================================== */

    const yhmHeader = document.querySelector(".yhm-header");

    const yhmNavbar = document.getElementById("yhmNavbar");

    const yhmScrollTop = document.getElementById("yhmScrollTop");

    const yhmRevealItems = document.querySelectorAll(
        ".yhm-highlight-card, \
         .yhm-feature-card, \
         .yhm-service-chip, \
         .yhm-sale-card, \
         .yhm-seller-card, \
         .yhm-pro-card, \
         .yhm-recommend-card, \
         .yhm-community-box"
    );

    const yhmWishlistButtons = document.querySelectorAll(
        ".yhm-wishlist, .yhm-wishlist-btn, .yhm-card-favourite"
    );

    const yhmCartButtons = document.querySelectorAll(
        ".yhm-add-cart, .yhm-cart-btn"
    );

    const yhmBookButtons = document.querySelectorAll(
        ".yhm-book-btn"
    );

    const yhmNewsletterForm = document.querySelector(
        ".yhm-newsletter-form"
    );

    const yhmFlashCounter = document.getElementById(
        "yhmFlashCountdown"
    );

    const yhmTopCounter = document.getElementById(
        "yhmTopSellerCountdown"
    );

    /* ==========================================
       PAGE NAVIGATION
    ========================================== */

    document.querySelectorAll("[data-page]").forEach((button) => {

        button.addEventListener("click", () => {

            const page = button.dataset.page;

            if (!page) return;

            window.location.href = page;

        });

    });

    /* ==========================================
       STICKY HEADER
    ========================================== */

    function yhmHandleHeader() {

        if (!yhmHeader) return;

        if (window.scrollY > 25) {

            yhmHeader.classList.add("yhm-header-scrolled");

        } else {

            yhmHeader.classList.remove("yhm-header-scrolled");

        }

    }

    yhmHandleHeader();

    window.addEventListener("scroll", yhmHandleHeader);

    /* ==========================================
       SCROLL REVEAL
    ========================================== */

    yhmRevealItems.forEach((item) => {

        item.classList.add("yhm-reveal");

    });

    const yhmObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("yhm-show");

                    yhmObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.18
        }

    );

    yhmRevealItems.forEach((item) => {

        yhmObserver.observe(item);

    });

    /* ==========================================
       MOBILE NAVIGATION
    ========================================== */

    if (yhmNavbar) {

        yhmNavbar.querySelectorAll(".nav-link").forEach((link) => {

            link.addEventListener("click", () => {

                if (window.innerWidth < 992) {

                    const collapse =
                        bootstrap.Collapse.getInstance(yhmNavbar);

                    if (collapse) {

                        collapse.hide();

                    }

                }

            });

        });

    }

    /* ==========================================
       FLASH SALES COUNTDOWN
    ========================================== */

    function yhmStartCountdown(element, hours = 3, minutes = 45, seconds = 12) {

        if (!element) return;

        let totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

        const timer = setInterval(() => {

            if (totalSeconds <= 0) {

                clearInterval(timer);

                element.textContent = "00:00:00";

                return;

            }

            totalSeconds--;

            const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");

            const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");

            const secs = String(totalSeconds % 60).padStart(2, "0");

            element.textContent = `${hrs}:${mins}:${secs}`;

        }, 1000);

    }

    yhmStartCountdown(yhmFlashCounter, 3, 45, 12);

    yhmStartCountdown(yhmTopCounter, 3, 45, 12);

    /* ==========================================
       WISHLIST BUTTONS
    ========================================== */

    yhmWishlistButtons.forEach((button) => {

        button.addEventListener("click", function () {

            this.classList.toggle("active");

            const icon = this.querySelector("i");

            if (!icon) return;

            if (this.classList.contains("active")) {

                icon.classList.remove("bi-heart");

                icon.classList.add("bi-heart-fill");

            } else {

                icon.classList.remove("bi-heart-fill");

                icon.classList.add("bi-heart");

            }

        });

    });

    /* ==========================================
       ADD TO CART
    ========================================== */

    yhmCartButtons.forEach((button) => {

        button.addEventListener("click", function () {

            if (this.disabled) return;

            const originalText = this.innerHTML;

            this.disabled = true;

            this.classList.add("active");

            this.innerHTML = `
                <i class="bi bi-check-circle-fill me-2"></i>
                Added
            `;

            setTimeout(() => {

                this.disabled = false;

                this.classList.remove("active");

                this.innerHTML = originalText;

            }, 1800);

        });

    });

    /* ==========================================
       BOOK NOW BUTTONS
    ========================================== */

    yhmBookButtons.forEach((button) => {

        button.addEventListener("click", function () {

            const originalText = this.innerHTML;

            this.disabled = true;

            this.classList.add("active");

            this.innerHTML = `
                <i class="bi bi-calendar-check me-2"></i>
                Booking...
            `;

            setTimeout(() => {

                window.location.href = "services.html";

            }, 1000);

            setTimeout(() => {

                this.disabled = false;

                this.classList.remove("active");

                this.innerHTML = originalText;

            }, 1600);

        });

    });

    /* ==========================================
       NEWSLETTER SUBSCRIPTION
    ========================================== */

    if (yhmNewsletterForm) {

        yhmNewsletterForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const emailInput = this.querySelector("input[type='email']");

            const submitButton = this.querySelector("button");

            if (!emailInput || !submitButton) return;

            const email = emailInput.value.trim();

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email === "") {

                alert("Please enter your email address.");

                emailInput.focus();

                return;

            }

            if (!emailPattern.test(email)) {

                alert("Please enter a valid email address.");

                emailInput.focus();

                return;

            }

            const originalButton = submitButton.innerHTML;

            submitButton.disabled = true;

            submitButton.classList.add("yhm-loading");

            submitButton.innerHTML = `
                <i class="bi bi-hourglass-split me-2"></i>
                Subscribing...
            `;

            setTimeout(() => {

                submitButton.classList.remove("yhm-loading");

                submitButton.innerHTML = `
                    <i class="bi bi-check-circle-fill me-2"></i>
                    Subscribed
                `;

                emailInput.value = "";

            }, 1800);

            setTimeout(() => {

                submitButton.disabled = false;

                submitButton.innerHTML = originalButton;

            }, 3500);

        });

    }

    /* ==========================================
       SMOOTH SCROLL FOR ANCHOR LINKS
    ========================================== */

    document.querySelectorAll("a[href^='#']").forEach((anchor) => {

        anchor.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (!targetElement) return;

            event.preventDefault();

            targetElement.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });

    /* ==========================================
       PRODUCT IMAGE HOVER EFFECT
    ========================================== */

    document.querySelectorAll(

        ".yhm-feature-image img, \
         .yhm-card-image img, \
         .yhm-sale-card img, \
         .yhm-seller-card img"

    ).forEach((image) => {

        image.addEventListener("mouseenter", () => {

            image.classList.add("yhm-scale-up");

        });

        image.addEventListener("mouseleave", () => {

            image.classList.remove("yhm-scale-up");

        });

    });

    /* ==========================================
       FEATURE CARD HOVER SHADOW
    ========================================== */

    document.querySelectorAll(

        ".yhm-feature-card, \
         .yhm-sale-card, \
         .yhm-seller-card, \
         .yhm-recommend-card"

    ).forEach((card) => {

        card.addEventListener("mouseenter", () => {

            card.classList.add("yhm-shadow-active");

        });

        card.addEventListener("mouseleave", () => {

            card.classList.remove("yhm-shadow-active");

        });

    });

    /* ==========================================
       SCROLL TO TOP BUTTON
    ========================================== */

    function yhmHandleScrollTop() {

        if (!yhmScrollTop) return;

        if (window.scrollY > 450) {

            yhmScrollTop.classList.add("yhm-show");

        } else {

            yhmScrollTop.classList.remove("yhm-show");

        }

    }

    window.addEventListener("scroll", yhmHandleScrollTop);

    yhmHandleScrollTop();

    if (yhmScrollTop) {

        yhmScrollTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    /* ==========================================
       BUTTON RIPPLE EFFECT
    ========================================== */

    document.querySelectorAll(

        ".yhm-start-btn,\
         .yhm-primary-btn,\
         .yhm-outline-btn,\
         .yhm-banner-primary,\
         .yhm-banner-outline,\
         .yhm-add-cart,\
         .yhm-cart-btn,\
         .yhm-book-btn,\
         .yhm-community-primary,\
         .yhm-community-outline"

    ).forEach((button) => {

        button.addEventListener("click", function (event) {

            const ripple = document.createElement("span");

            const diameter = Math.max(

                this.clientWidth,

                this.clientHeight

            );

            const radius = diameter / 2;

            ripple.style.width = ripple.style.height = `${diameter}px`;

            ripple.style.left = `${event.clientX - this.getBoundingClientRect().left - radius}px`;

            ripple.style.top = `${event.clientY - this.getBoundingClientRect().top - radius}px`;

            ripple.className = "yhm-ripple";

            const existingRipple = this.querySelector(".yhm-ripple");

            if (existingRipple) {

                existingRipple.remove();

            }

            this.appendChild(ripple);

        });

    });

    /* ==========================================
       ACTIVE NAVIGATION LINK
    ========================================== */

    const yhmCurrentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    document.querySelectorAll(".yhm-nav-link").forEach((link) => {

        const href = (link.getAttribute("href") || "").toLowerCase();

        if (

            href === yhmCurrentPage ||

            (yhmCurrentPage === "" && href === "index.html")

        ) {

            document
                .querySelectorAll(".yhm-nav-link")
                .forEach(item => item.classList.remove("active"));

            link.classList.add("active");

        }

    });

    /* ==========================================
       EXTERNAL PAGE LINKS
    ========================================== */

    document.querySelectorAll("[data-link]").forEach((element) => {

        element.style.cursor = "pointer";

        element.addEventListener("click", function () {

            const page = this.dataset.link;

            if (!page) return;

            window.location.href = page;

        });

    });

    /* ==========================================
       PRELOAD IMAGES
    ========================================== */

    document.querySelectorAll("img").forEach((image) => {

        if (image.complete) return;

        image.addEventListener("load", () => {

            image.style.opacity = "1";

        });

        image.style.opacity = ".85";

    });

    /* ==========================================
       WINDOW RESIZE HANDLER
    ========================================== */

    let yhmResizeTimer;

    window.addEventListener("resize", () => {

        clearTimeout(yhmResizeTimer);

        yhmResizeTimer = setTimeout(() => {

            yhmHandleHeader();

            yhmHandleScrollTop();

        }, 200);

    });

    /* ==========================================
       KEYBOARD ACCESSIBILITY
    ========================================== */

    document.addEventListener("keydown", (event) => {

        // Scroll to top using Home key
        if (event.key === "Home") {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }

        // Close mobile menu using Escape
        if (event.key === "Escape" && yhmNavbar) {

            const collapse =
                bootstrap.Collapse.getInstance(yhmNavbar);

            if (collapse) {

                collapse.hide();

            }

        }

    });

    /* ==========================================
       PAGE LOADED ANIMATION
    ========================================== */

    window.addEventListener("load", () => {

        document.body.classList.add("yhm-page-loaded");

    });

    /* ==========================================
       SIMPLE PERFORMANCE LOGGER
    ========================================== */

    console.info(
        "%cYOVI Marketplace Loaded Successfully",
        "color:#0d6efd;font-size:14px;font-weight:bold;"
    );

    console.info(
        "UI initialized:",
        new Date().toLocaleString()
    );

    /* ==========================================
       OPTIONAL PAGE ROUTING HELPERS
       (For future screens)
    ========================================== */

    window.yhmNavigate = function (page) {

        if (!page) return;

        window.location.href = page;

    };

    window.yhmReloadPage = function () {

        window.location.reload();

    };

    window.yhmGoBack = function () {

        window.history.back();

    };

    /* ==========================================
       GLOBAL ERROR HANDLER
    ========================================== */

    window.addEventListener("error", (event) => {

        console.error(
            "YOVI Error:",
            event.message
        );

    });

    /* ==========================================
       INITIALIZE PAGE
    ========================================== */

    yhmHandleHeader();

    yhmHandleScrollTop();

    console.log("YOVI Marketplace UI Ready 🚀");

});

/*======================================
END OF YOVI HOMEPAGE 
======================================*/




















/*=========================================================
  YOVI SELLER DASHBOARD
  PART 3A
=========================================================*/

document.addEventListener("DOMContentLoaded", function () {

    /*=====================================================
    PAGE CHECK
    Prevents this script from running on other pages
    =====================================================*/

    const ysdPage = document.getElementById("ysdSellerDashboardPage");

    if (!ysdPage) return;

    console.log("Seller Dashboard Loaded");

    /*=====================================================
    ELEMENTS
    =====================================================*/

    const ysdAddProductBtn =
        document.getElementById("ysdAddProductBtn");

    const ysdLogoutBtn =
        document.getElementById("ysdLogoutBtn");

    const ysdSidebarLogout =
        document.getElementById("ysdSidebarLogout");

    const ysdNewsletterForm =
        document.getElementById("ysdNewsletterForm");

    const ysdNewsletterEmail =
        document.getElementById("ysdNewsletterEmail");

    /*=====================================================
    DASHBOARD DATA
    =====================================================*/

    const ysdDashboardData = {

        revenue: 2250000,

        products: 47,

        orders: 138,

        rating: 4.9

    };

    /*=====================================================
    FORMAT NAIRA
    =====================================================*/

    function ysdFormatCurrency(amount){

        return new Intl.NumberFormat(

            "en-NG",

            {

                style:"currency",

                currency:"NGN",

                maximumFractionDigits:0

            }

        ).format(amount);

    }

    /*=====================================================
    BUTTON RIPPLE EFFECT
    =====================================================*/

    function ysdRipple(button,event){

        const circle =
            document.createElement("span");

        const diameter =
            Math.max(

                button.clientWidth,

                button.clientHeight

            );

        circle.style.width =
            circle.style.height =
            diameter + "px";

        circle.classList.add("ysd-ripple");

        const rect =
            button.getBoundingClientRect();

        circle.style.left =
            event.clientX -
            rect.left -
            diameter / 2 + "px";

        circle.style.top =
            event.clientY -
            rect.top -
            diameter / 2 + "px";

        button.appendChild(circle);

        setTimeout(function(){

            circle.remove();

        },600);

    }

    /*=====================================================
    ADD PRODUCT
    =====================================================*/

    if(ysdAddProductBtn){

        ysdAddProductBtn.addEventListener(

            "click",

            function(event){

                ysdRipple(this,event);

                setTimeout(function(){

                    window.location.href =
                    "../Products/add-product.html";

                },250);

            }

        );

    }

    /*=====================================================
    NEWSLETTER
    =====================================================*/

    if(ysdNewsletterForm){

        ysdNewsletterForm.addEventListener(

            "submit",

            function(event){

                event.preventDefault();

                const email =
                    ysdNewsletterEmail.value.trim();

                if(email===""){

                    alert(

                        "Please enter your email."

                    );

                    ysdNewsletterEmail.focus();

                    return;

                }

                alert(

                    "Newsletter subscription successful."

                );

                ysdNewsletterForm.reset();

            }

        );

    }

       /*=====================================================
    SIGN OUT
    =====================================================*/

    function ysdSignOut(){

        const confirmLogout = confirm(
            "Are you sure you want to sign out?"
        );

        if(!confirmLogout){

            return;

        }

        sessionStorage.clear();

        localStorage.removeItem("currentUser");

        localStorage.removeItem("authToken");

        window.location.href="../index.html";

    }

    if(ysdLogoutBtn){

        ysdLogoutBtn.addEventListener(

            "click",

            function(event){

                event.preventDefault();

                ysdSignOut();

            }

        );

    }

    if(ysdSidebarLogout){

        ysdSidebarLogout.addEventListener(

            "click",

            function(event){

                event.preventDefault();

                ysdSignOut();

            }

        );

    }

    /*=====================================================
    STATISTICS CARD ANIMATION
    =====================================================*/

    const ysdStatCards =

        document.querySelectorAll(

            ".ysd-stat-card"

        );

    ysdStatCards.forEach(function(card,index){

        card.style.animationDelay=

            (index*0.15)+"s";

    });

    /*=====================================================
    REVENUE CHART ANIMATION
    =====================================================*/

    const ysdChartBars =

        document.querySelectorAll(

            ".ysd-chart-line span"

        );

    ysdChartBars.forEach(function(bar,index){

        const finalHeight=

            bar.style.height;

        bar.style.height="0";

        setTimeout(function(){

            bar.style.height=

                finalHeight;

        },250+(index*120));

    });

    /*=====================================================
    PRODUCT TABLE HOVER
    =====================================================*/

    const ysdProductRows=

        document.querySelectorAll(

            ".ysd-product-table tbody tr"

        );

    ysdProductRows.forEach(function(row){

        row.addEventListener(

            "mouseenter",

            function(){

                this.style.cursor="pointer";

            }

        );

    });

    /*=====================================================
    EDIT PRODUCT
    =====================================================*/

    const ysdEditButtons=

        document.querySelectorAll(

            ".ysd-edit-btn"

        );

    ysdEditButtons.forEach(function(button){

        button.addEventListener(

            "click",

            function(event){

                event.stopPropagation();

                window.location.href=

                "../Products/edit-product.html";

            }

        );

    });

    /*=====================================================
    TABLE ROW CLICK
    =====================================================*/

    ysdProductRows.forEach(function(row){

        row.addEventListener(

            "click",

            function(){

                window.location.href=

                "../Products/product-details.html";

            }

        );

    });

    /*=====================================================
    ACTIVE SIDEBAR
    =====================================================*/

    const ysdCurrentPage=

        window.location.pathname

        .split("/")

        .pop();

    document

        .querySelectorAll(

            ".ysd-menu a"

        )

        .forEach(function(link){

            const href=

                link.getAttribute("href");

            if(

                href &&

                href.includes(

                    ysdCurrentPage

                )

            ){

                link.classList.add(

                    "active"

                );

            }

        });

       /*=====================================================
    DASHBOARD CARD HOVER EFFECT
    =====================================================*/

    const ysdDashboardCards = document.querySelectorAll(

        ".ysd-card, .ysd-stat-card"

    );

    ysdDashboardCards.forEach(function(card){

        card.addEventListener("mouseenter", function(){

            this.style.transform = "translateY(-6px)";

        });

        card.addEventListener("mouseleave", function(){

            this.style.transform = "";

        });

    });

    /*=====================================================
    NOTIFICATION BUTTON
    =====================================================*/

    const ysdNotificationBtn =

        document.querySelector(

            ".ysd-nav-icon.position-relative"

        );

    if(ysdNotificationBtn){

        ysdNotificationBtn.addEventListener(

            "click",

            function(){

                alert(

                    "You have no new notifications."

                );

            }

        );

    }

    /*=====================================================
    CART BUTTON
    =====================================================*/

    const ysdCartBtn =

        document.querySelector(

            ".ysd-nav-icon:not(.position-relative)"

        );

    if(ysdCartBtn){

        ysdCartBtn.addEventListener(

            "click",

            function(){

                window.location.href =

                "../Cart/cart.html";

            }

        );

    }

    /*=====================================================
    VIEW ALL ORDERS
    =====================================================*/

    document.querySelectorAll(

        ".ysd-view-all"

    ).forEach(function(link){

        link.addEventListener(

            "click",

            function(){

                console.log(

                    "Opening page..."

                );

            }

        );

    });

    /*=====================================================
    NEWSLETTER EMAIL VALIDATION
    =====================================================*/

    if(ysdNewsletterEmail){

        ysdNewsletterEmail.addEventListener(

            "input",

            function(){

                const value =

                    this.value.trim();

                const emailPattern =

                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if(

                    value === ""

                ){

                    this.style.borderColor = "";

                }

                else if(

                    emailPattern.test(value)

                ){

                    this.style.borderColor =

                    "#198754";

                }

                else{

                    this.style.borderColor =

                    "#dc3545";

                }

            }

        );

    }

    /*=====================================================
    PAGE FADE-IN
    =====================================================*/

    document.body.style.opacity = "0";

    setTimeout(function(){

        document.body.style.transition =

        "opacity .35s ease";

        document.body.style.opacity = "1";

    },100);

    /*=====================================================
    ESC KEY SUPPORT
    =====================================================*/

    document.addEventListener(

        "keydown",

        function(event){

            if(event.key === "Escape"){

                const dropdown =

                document.activeElement;

                if(dropdown){

                    dropdown.blur();

                }

            }

        }

    );

    /*=====================================================
    WINDOW RESIZE
    =====================================================*/

    window.addEventListener(

        "resize",

        function(){

            console.log(

                "Dashboard resized:",

                window.innerWidth

            );

        }

    );

       /*=====================================================
    QUICK SEARCH
    =====================================================*/

    const ysdSearchInput =
        document.getElementById("ysdSearchInput");

    if(ysdSearchInput){

        ysdSearchInput.addEventListener(

            "keyup",

            function(){

                const keyword =
                    this.value
                        .toLowerCase()
                        .trim();

                const rows =
                    document.querySelectorAll(
                        ".ysd-product-table tbody tr"
                    );

                rows.forEach(function(row){

                    const text =
                        row.textContent.toLowerCase();

                    row.style.display =
                        text.includes(keyword)
                        ? ""
                        : "none";

                });

            }

        );

    }

    /*=====================================================
    REFRESH DASHBOARD
    =====================================================*/

    const ysdRefreshBtn =
        document.getElementById("ysdRefreshBtn");

    if(ysdRefreshBtn){

        ysdRefreshBtn.addEventListener(

            "click",

            function(){

                this.disabled = true;

                this.innerHTML =
                    '<i class="bi bi-arrow-clockwise"></i> Refreshing...';

                setTimeout(() => {

                    location.reload();

                },800);

            }

        );

    }

    /*=====================================================
    COPY REVENUE
    =====================================================*/

    const ysdRevenueAmount =
        document.getElementById("ysdRevenueAmount");

    if(ysdRevenueAmount){

        ysdRevenueAmount.addEventListener(

            "click",

            async function(){

                try{

                    await navigator.clipboard.writeText(

                        this.innerText

                    );

                    alert(

                        "Revenue copied successfully."

                    );

                }

                catch(error){

                    console.error(error);

                }

            }

        );

    }

    /*=====================================================
    KEYBOARD SHORTCUTS
    =====================================================*/

    document.addEventListener(

        "keydown",

        function(event){

            if(event.ctrlKey && event.key==="n"){

                event.preventDefault();

                if(ysdAddProductBtn){

                    ysdAddProductBtn.click();

                }

            }

            if(event.ctrlKey && event.key==="r"){

                event.preventDefault();

                location.reload();

            }

        }

    );

    /*=====================================================
    AUTO CLOSE DROPDOWN
    =====================================================*/

    document.addEventListener(

        "click",

        function(){

            const dropdowns =
                document.querySelectorAll(

                    ".dropdown-menu.show"

                );

            dropdowns.forEach(function(menu){

                menu.classList.remove("show");

            });

        }

    );

    /*=====================================================
    PRODUCT COUNTER
    =====================================================*/

    const ysdTotalProducts =
        document.getElementById("ysdTotalProducts");

    if(ysdTotalProducts){

        const totalRows =
            document.querySelectorAll(

                ".ysd-product-table tbody tr"

            ).length;

        ysdTotalProducts.textContent =
            totalRows;

    }

    /*=====================================================
    SCROLL TO TOP
    =====================================================*/

    const ysdScrollTop =
        document.getElementById("ysdScrollTop");

    if(ysdScrollTop){

        window.addEventListener(

            "scroll",

            function(){

                if(window.scrollY>300){

                    ysdScrollTop.classList.remove(

                        "d-none"

                    );

                }

                else{

                    ysdScrollTop.classList.add(

                        "d-none"

                    );

                }

            }

        );

        ysdScrollTop.addEventListener(

            "click",

            function(){

                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });

            }

        );

    }

       /*=====================================================
    SAVE DASHBOARD STATE
    =====================================================*/

    function ysdSaveDashboardState(){

        const dashboardState = {

            lastVisited: new Date().toISOString(),

            activePage: "seller-dashboard",

            sellerLoggedIn: true

        };

        localStorage.setItem(

            "ysdDashboardState",

            JSON.stringify(dashboardState)

        );

    }

    ysdSaveDashboardState();

    /*=====================================================
    RESTORE SCROLL POSITION
    =====================================================*/

    const savedScroll = sessionStorage.getItem(

        "ysdScrollPosition"

    );

    if(savedScroll){

        window.scrollTo(

            0,

            parseInt(savedScroll)

        );

    }

    window.addEventListener(

        "beforeunload",

        function(){

            sessionStorage.setItem(

                "ysdScrollPosition",

                window.scrollY

            );

        }

    );

    /*=====================================================
    PAGE VISIT LOGGER
    =====================================================*/

    console.log(

        "Seller Dashboard opened:",

        new Date().toLocaleString()

    );

    /*=====================================================
    CONNECTION STATUS
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

                "No internet connection."

            );

        }

    );

    /*=====================================================
    LAZY LOAD PLACEHOLDER IMAGES
    =====================================================*/

    const ysdImages =

        document.querySelectorAll(

            "img"

        );

    ysdImages.forEach(function(image){

        image.loading = "lazy";

    });

    /*=====================================================
    PREVENT MULTIPLE FORM SUBMISSIONS
    =====================================================*/

    document.querySelectorAll(

        "form"

    ).forEach(function(form){

        form.addEventListener(

            "submit",

            function(){

                const submitButton =

                    this.querySelector(

                        'button[type="submit"]'

                    );

                if(submitButton){

                    submitButton.disabled = true;

                    setTimeout(function(){

                        submitButton.disabled = false;

                    },1500);

                }

            }

        );

    });

    /*=====================================================
    INITIALIZE TOOLTIPS
    =====================================================*/

    const tooltipTriggerList =

        document.querySelectorAll(

            '[data-bs-toggle="tooltip"]'

        );

    tooltipTriggerList.forEach(function(element){

        new bootstrap.Tooltip(element);

    });

    /*=====================================================
    INITIALIZE POPOVERS
    =====================================================*/

    const popoverTriggerList =

        document.querySelectorAll(

            '[data-bs-toggle="popover"]'

        );

    popoverTriggerList.forEach(function(element){

        new bootstrap.Popover(element);

    });

    /*=====================================================
    PERFORMANCE TIMER
    =====================================================*/

    window.addEventListener(

        "load",

        function(){

            console.log(

                "Dashboard fully loaded."

            );

        }

    );

    /*=====================================================
    SELLER SESSION CHECK
    =====================================================*/

    // const sellerSession =

    //     localStorage.getItem(

    //         "sellerLoggedIn"

    //     );

    // if(

    //     sellerSession !== "true"

    // ){

    //     window.location.href =

    //     "../../seller/seller-dashboard.html";

    // }

    /*=====================================================
    END OF DASHBOARD INITIALIZATION
    =====================================================*/

    console.log(

        "YOVI Seller Dashboard initialized successfully."

    );

});


/*=========================================================
YOVI SELLER REVENUE
PART 3A
=========================================================*/

document.addEventListener("DOMContentLoaded", function () {

    /*=====================================================
    PAGE VALIDATION
    =====================================================*/

    const ysrPage = document.getElementById(

        "ysrSellerRevenuePage"

    );

    if (!ysrPage) return;

    console.log("Seller Revenue Page Loaded");

    /*=====================================================
    ELEMENTS
    =====================================================*/

    const ysrBackDashboard =

        document.getElementById(

            "ysrBackDashboard"

        );

    const ysrLogoutBtn =

        document.getElementById(

            "ysrLogoutBtn"

        );

    const ysrCartBtn =

        document.getElementById(

            "ysrCartBtn"

        );

    const ysrNotificationBtn =

        document.getElementById(

            "ysrNotificationBtn"

        );

    const ysrNewsletterForm =

        document.getElementById(

            "ysrNewsletterForm"

        );

    const ysrNewsletterEmail =

        document.getElementById(

            "ysrNewsletterEmail"

        );

    const ysrRevenueChart =

        document.getElementById(

            "ysrRevenueChart"

        );

    /*=====================================================
    RIPPLE EFFECT
    =====================================================*/

    function ysrCreateRipple(button, event){

        const ripple =

            document.createElement("span");

        const diameter = Math.max(

            button.clientWidth,

            button.clientHeight

        );

        ripple.classList.add(

            "ysr-ripple"

        );

        ripple.style.width =

            ripple.style.height =

            diameter + "px";

        const rect =

            button.getBoundingClientRect();

        ripple.style.left =

            event.clientX -

            rect.left -

            diameter / 2 +

            "px";

        ripple.style.top =

            event.clientY -

            rect.top -

            diameter / 2 +

            "px";

        button.appendChild(

            ripple

        );

        setTimeout(function(){

            ripple.remove();

        },600);

    }

    /*=====================================================
    BUTTON RIPPLE
    =====================================================*/

    document.querySelectorAll(

        ".ysr-nav-icon, .ysr-newsletter-btn"

    ).forEach(function(button){

        button.addEventListener(

            "click",

            function(event){

                ysrCreateRipple(

                    this,

                    event

                );

            }

        );

    });

    /*=====================================================
    BACK TO DASHBOARD
    =====================================================*/

    if(ysrBackDashboard){

        ysrBackDashboard.addEventListener(

            "click",

            function(){

                window.location.href =

                "../Dashboard/seller-dashboard.html";

            }

        );

    }

    /*=====================================================
    NEWSLETTER
    =====================================================*/

    if(ysrNewsletterForm){

        ysrNewsletterForm.addEventListener(

            "submit",

            function(event){

                event.preventDefault();

                const email =

                    ysrNewsletterEmail.value.trim();

                if(email === ""){

                    alert(

                        "Please enter your email."

                    );

                    ysrNewsletterEmail.focus();

                    return;

                }

                alert(

                    "Newsletter subscription successful."

                );

                ysrNewsletterForm.reset();

            }

        );

    }

    /*=====================================================
    MONTHLY REVENUE CHART
    =====================================================*/

    if(ysrRevenueChart){

        new Chart(

            ysrRevenueChart,

            {

                type:"line",

                data:{

                    labels:[

                        "Jan",

                        "Feb",

                        "Mar",

                        "Apr",

                        "May",

                        "Jun"

                    ],

                    datasets:[{

                        label:"Revenue (₦)",

                        data:[

                            285000,

                            342000,

                            298000,

                            412000,

                            389000,

                            524000

                        ],

                        borderColor:"#0d6efd",

                        backgroundColor:

                            "rgba(13,110,253,.15)",

                        borderWidth:3,

                        tension:.4,

                        fill:true,

                        pointRadius:5,

                        pointHoverRadius:7

                    }]

                },

                options:{

                    responsive:true,

                    maintainAspectRatio:false,

                    plugins:{

                        legend:{

                            display:false

                        }

                    },

                    scales:{

                        y:{

                            beginAtZero:true

                        }

                    }

                }

            }

        );

    }

       /*=====================================================
    SIGN OUT
    =====================================================*/

    function ysrSignOut(){

        const confirmLogout = confirm(

            "Are you sure you want to sign out?"

        );

        if(!confirmLogout){

            return;

        }

        sessionStorage.clear();

        localStorage.removeItem(

            "currentUser"

        );

        localStorage.removeItem(

            "authToken"

        );

        localStorage.removeItem(

            "sellerLoggedIn"

        );

        window.location.href =

        "../index.html";

    }

    if(ysrLogoutBtn){

        ysrLogoutBtn.addEventListener(

            "click",

            function(event){

                event.preventDefault();

                ysrSignOut();

            }

        );

    }

    /*=====================================================
    CART NAVIGATION
    =====================================================*/

    if(ysrCartBtn){

        ysrCartBtn.addEventListener(

            "click",

            function(){

                window.location.href =

                "../Checkout/cart.html";

            }

        );

    }

    /*=====================================================
    NOTIFICATION BUTTON
    =====================================================*/

    if(ysrNotificationBtn){

        ysrNotificationBtn.addEventListener(

            "click",

            function(){

                alert(

                    "You have no new notifications."

                );

            }

        );

    }

    /*=====================================================
    SUMMARY CARD ENTRANCE ANIMATION
    =====================================================*/

    const ysrSummaryCards =

        document.querySelectorAll(

            ".ysr-summary-card"

        );

    ysrSummaryCards.forEach(function(card,index){

        card.style.opacity = "0";

        card.style.transform =

            "translateY(25px)";

        setTimeout(function(){

            card.style.transition =

                "all .45s ease";

            card.style.opacity = "1";

            card.style.transform =

                "translateY(0)";

        },150 + (index * 150));

    });

    /*=====================================================
    CHART CARD ENTRANCE
    =====================================================*/

    const ysrChartCard =

        document.querySelector(

            ".ysr-chart-card"

        );

    if(ysrChartCard){

        ysrChartCard.style.opacity = "0";

        ysrChartCard.style.transform =

            "translateY(35px)";

        setTimeout(function(){

            ysrChartCard.style.transition =

                "all .55s ease";

            ysrChartCard.style.opacity = "1";

            ysrChartCard.style.transform =

                "translateY(0)";

        },650);

    }

    /*=====================================================
    SUMMARY CARD HOVER EFFECT
    =====================================================*/

    ysrSummaryCards.forEach(function(card){

        card.addEventListener(

            "mouseenter",

            function(){

                this.style.cursor = "pointer";

            }

        );

    });

    /*=====================================================
    ANIMATE REVENUE NUMBERS
    =====================================================*/

    const ysrRevenueValues =

        document.querySelectorAll(

            ".ysr-summary-value"

        );

    ysrRevenueValues.forEach(function(item){

        item.style.transition =

            "transform .3s ease";

        item.addEventListener(

            "mouseenter",

            function(){

                this.style.transform =

                    "scale(1.05)";

            }

        );

        item.addEventListener(

            "mouseleave",

            function(){

                this.style.transform =

                    "scale(1)";

            }

        );

    });

    /*=====================================================
    CHART CONTAINER INTERACTION
    =====================================================*/

    if(ysrChartCard){

        ysrChartCard.addEventListener(

            "mouseenter",

            function(){

                this.style.boxShadow =

                    "0 18px 40px rgba(0,0,0,.12)";

            }

        );

        ysrChartCard.addEventListener(

            "mouseleave",

            function(){

                this.style.boxShadow = "";

            }

        );

    }

       /*=====================================================
    NEWSLETTER EMAIL VALIDATION
    =====================================================*/

    if(ysrNewsletterEmail){

        ysrNewsletterEmail.addEventListener(

            "input",

            function(){

                const email =

                    this.value.trim();

                const emailPattern =

                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if(email === ""){

                    this.style.borderColor = "";

                    return;

                }

                if(emailPattern.test(email)){

                    this.style.borderColor =

                        "#198754";

                }

                else{

                    this.style.borderColor =

                        "#dc3545";

                }

            }

        );

    }

    /*=====================================================
    PAGE FADE IN
    =====================================================*/

    document.body.style.opacity = "0";

    setTimeout(function(){

        document.body.style.transition =

            "opacity .4s ease";

        document.body.style.opacity = "1";

    },100);

    /*=====================================================
    KEYBOARD SHORTCUTS
    =====================================================*/

    document.addEventListener(

        "keydown",

        function(event){

            /* Ctrl + B = Dashboard */

            if(

                event.ctrlKey &&

                event.key.toLowerCase() === "b"

            ){

                event.preventDefault();

                if(ysrBackDashboard){

                    ysrBackDashboard.click();

                }

            }

            /* Ctrl + H = Home */

            if(

                event.ctrlKey &&

                event.key.toLowerCase() === "h"

            ){

                event.preventDefault();

                window.location.href =

                "../index.html";

            }

        }

    );

    /*=====================================================
    ACTIVE NAVIGATION
    =====================================================*/

    const ysrCurrentPage =

        window.location.pathname

        .split("/")

        .pop();

    document

        .querySelectorAll(

            ".navbar-nav .nav-link"

        )

        .forEach(function(link){

            const href =

                link.getAttribute("href");

            if(

                href &&

                href.includes(

                    ysrCurrentPage

                )

            ){

                link.classList.add(

                    "active"

                );

            }

        });

    /*=====================================================
    CHART EXPORT (Future Compatible)
    =====================================================*/

    const ysrExportChartBtn =

        document.getElementById(

            "ysrExportChartBtn"

        );

    if(

        ysrExportChartBtn &&

        ysrRevenueChart

    ){

        ysrExportChartBtn.addEventListener(

            "click",

            function(){

                const chartCanvas =

                    document

                    .getElementById(

                        "ysrRevenueChart"

                    );

                const image =

                    chartCanvas.toDataURL(

                        "image/png"

                    );

                const link =

                    document.createElement(

                        "a"

                    );

                link.download =

                    "monthly-revenue.png";

                link.href = image;

                link.click();

            }

        );

    }

    /*=====================================================
    SUMMARY CARD CLICK
    =====================================================*/

    ysrSummaryCards.forEach(function(card){

        card.addEventListener(

            "click",

            function(){

                this.classList.add(

                    "ysr-fade-in"

                );

            }

        );

    });

    /*=====================================================
    WINDOW RESIZE LOGGER
    =====================================================*/

    window.addEventListener(

        "resize",

        function(){

            console.log(

                "Revenue Page Width:",

                window.innerWidth

            );

        }

    );

       /*=====================================================
    REFRESH REVENUE DATA
    =====================================================*/

    const ysrRefreshBtn =

        document.getElementById(

            "ysrRefreshBtn"

        );

    if(ysrRefreshBtn){

        ysrRefreshBtn.addEventListener(

            "click",

            function(){

                this.disabled = true;

                this.innerHTML =

                    '<i class="bi bi-arrow-clockwise"></i> Refreshing...';

                setTimeout(function(){

                    location.reload();

                },800);

            }

        );

    }

    /*=====================================================
    SCROLL TO TOP
    =====================================================*/

    const ysrScrollTop =

        document.getElementById(

            "ysrScrollTop"

        );

    if(ysrScrollTop){

        window.addEventListener(

            "scroll",

            function(){

                if(window.scrollY > 300){

                    ysrScrollTop.classList.remove(

                        "d-none"

                    );

                }

                else{

                    ysrScrollTop.classList.add(

                        "d-none"

                    );

                }

            }

        );

        ysrScrollTop.addEventListener(

            "click",

            function(){

                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });

            }

        );

    }

    /*=====================================================
    ANIMATE MONTHLY REVENUE VALUES
    =====================================================*/

    const ysrMonthItems =

        document.querySelectorAll(

            ".ysr-month-item"

        );

    ysrMonthItems.forEach(function(item,index){

        item.style.opacity = "0";

        item.style.transform =

            "translateY(15px)";

        setTimeout(function(){

            item.style.transition =

                "all .4s ease";

            item.style.opacity = "1";

            item.style.transform =

                "translateY(0)";

        },300 + (index * 100));

    });

    /*=====================================================
    ONLINE / OFFLINE STATUS
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
    SAVE LAST VISIT
    =====================================================*/

    localStorage.setItem(

        "ysrLastVisit",

        new Date().toISOString()

    );

    /*=====================================================
    REVENUE CARD COUNTER
    =====================================================*/

    const ysrRevenueCounter =

        document.getElementById(

            "ysrRevenueCounter"

        );

    if(ysrRevenueCounter){

        ysrRevenueCounter.textContent =

            ysrSummaryCards.length;

    }

    /*=====================================================
    COPY REVENUE VALUE
    =====================================================*/

    ysrRevenueValues.forEach(function(value){

        value.addEventListener(

            "dblclick",

            async function(){

                try{

                    await navigator.clipboard.writeText(

                        this.innerText

                    );

                    alert(

                        "Revenue value copied."

                    );

                }

                catch(error){

                    console.error(error);

                }

            }

        );

    });

       /*=====================================================
    SAVE PAGE STATE
    =====================================================*/

    function ysrSavePageState(){

        const pageState = {

            page:"seller-revenue",

            lastVisited:new Date().toISOString(),

            totalCards:ysrSummaryCards.length

        };

        localStorage.setItem(

            "ysrPageState",

            JSON.stringify(pageState)

        );

    }

    ysrSavePageState();

    /*=====================================================
    RESTORE SCROLL POSITION
    =====================================================*/

    const ysrSavedScroll =

        sessionStorage.getItem(

            "ysrScrollPosition"

        );

    if(ysrSavedScroll){

        window.scrollTo(

            0,

            parseInt(ysrSavedScroll)

        );

    }

    window.addEventListener(

        "beforeunload",

        function(){

            sessionStorage.setItem(

                "ysrScrollPosition",

                window.scrollY

            );

        }

    );

    /*=====================================================
    LAZY LOAD PROFILE IMAGE
    =====================================================*/

    const ysrProfileImage =

        document.querySelector(

            ".ysr-profile-image"

        );

    if(ysrProfileImage){

        ysrProfileImage.loading = "lazy";

        ysrProfileImage.decoding = "async";

    }

    /*=====================================================
    PREVENT MULTIPLE FORM SUBMISSIONS
    =====================================================*/

    document.querySelectorAll("form")

        .forEach(function(form){

            form.addEventListener(

                "submit",

                function(){

                    const submitButton =

                        this.querySelector(

                            'button[type="submit"]'

                        );

                    if(submitButton){

                        submitButton.disabled = true;

                        setTimeout(function(){

                            submitButton.disabled = false;

                        },1500);

                    }

                }

            );

        });

    /*=====================================================
    INITIALIZE BOOTSTRAP TOOLTIPS
    =====================================================*/

    document.querySelectorAll(

        '[data-bs-toggle="tooltip"]'

    ).forEach(function(element){

        new bootstrap.Tooltip(

            element

        );

    });

    /*=====================================================
    INITIALIZE BOOTSTRAP POPOVERS
    =====================================================*/

    document.querySelectorAll(

        '[data-bs-toggle="popover"]'

    ).forEach(function(element){

        new bootstrap.Popover(

            element

        );

    });

    /*=====================================================
    SELLER SESSION VALIDATION
    =====================================================*/

    // const ysrSellerSession =

    //     localStorage.getItem(

    //         "sellerLoggedIn"

    //     );

    // if(

    //     ysrSellerSession !== "true"

    // ){

    //     window.location.href =

    //     "../auth/signin.html";

    // }

    /*=====================================================
    PAGE LOAD LOGGER
    =====================================================*/

    window.addEventListener(

        "load",

        function(){

            console.log(

                "Seller Revenue page fully loaded."

            );

        }

    );

    console.log(

        "Seller Revenue initialized:",

        new Date().toLocaleString()

    );

    /*=====================================================
    CLEANUP BEFORE PAGE UNLOAD
    =====================================================*/

    window.addEventListener(

        "beforeunload",

        function(){

            console.log(

                "Leaving Seller Revenue page..."

            );

        }

    );

    /*=====================================================
    FINAL INITIALIZATION
    =====================================================*/

    console.log(

        "YOVI Seller Revenue module initialized successfully."

    );

});

/*=========================================================
SELLER PROMOTE LISTINGS
PART 3A
=========================================================*/

const SellerPromoteListings = {

    /*=====================================================
    LOCAL STORAGE KEYS
    =====================================================*/

    storage: {

        selectedPackage: "yoviSelectedPromotionPackage",

        selectedProduct: "yoviSelectedPromotionProduct",

        promotionDraft: "yoviPromotionDraft"

    },

    /*=====================================================
    APPLICATION STATE
    =====================================================*/

    state: {

        selectedPackage: null,

        selectedProduct: "1",

        isLoading: false

    },

    /*=====================================================
    DOM ELEMENTS
    =====================================================*/

    elements: {},

    /*=====================================================
    INITIALIZE
    =====================================================*/

    init() {

        this.cacheDOM();

        this.loadLocalStorage();

        this.restoreSelections();

        this.bindEvents();

        this.initializeAnimations();

        this.initializeIntersectionObserver();

        this.animateSelectedPackage();

    },

    /*=====================================================
    CACHE DOM
    =====================================================*/

    cacheDOM() {

        this.elements.packageCards =

            document.querySelectorAll(

                ".cspl-package-card"

            );

        this.elements.packageButtons =

            document.querySelectorAll(

                ".cspl-package-btn"

            );

        this.elements.productCards =

            document.querySelectorAll(

                ".cspl-product-card"

            );

        this.elements.continueButton =

            document.getElementById(

                "csplContinueButton"

            );

        this.elements.breadcrumb =

            document.querySelector(

                ".cspl-breadcrumb"

            );

    },

    /*=====================================================
    LOAD LOCAL STORAGE
    =====================================================*/

    loadLocalStorage() {

        const selectedPackage =

            localStorage.getItem(

                this.storage.selectedPackage

            );

        const selectedProduct =

            localStorage.getItem(

                this.storage.selectedProduct

            );

        if (selectedPackage) {

            this.state.selectedPackage =

                selectedPackage;

        }

        if (selectedProduct) {

            this.state.selectedProduct =

                selectedProduct;

        }

    },

    /*=====================================================
    SAVE LOCAL STORAGE
    =====================================================*/

    saveLocalStorage() {

        localStorage.setItem(

            this.storage.selectedPackage,

            this.state.selectedPackage || ""

        );

        localStorage.setItem(

            this.storage.selectedProduct,

            this.state.selectedProduct

        );

    },

    /*=====================================================
    RESTORE SAVED SELECTIONS
    =====================================================*/

    restoreSelections() {

        this.elements.productCards.forEach(card => {

            if (

                card.dataset.product ===

                this.state.selectedProduct

            ) {

                card.classList.add(

                    "cspl-product-selected"

                );

            } else {

                card.classList.remove(

                    "cspl-product-selected"

                );

            }

        });

        this.elements.packageButtons.forEach(button => {

            const card =

                button.closest(

                    ".cspl-package-card"

                );

            if (

                button.dataset.package ===

                this.state.selectedPackage

            ) {

                card.classList.add(

                    "cspl-package-selected"

                );

            } else {

                card.classList.remove(

                    "cspl-package-selected"

                );

            }

        });

    },

    /*=====================================================
    BIND EVENTS
    =====================================================*/

    bindEvents() {

        /*-----------------------------------------
        Promotion Package Selection
        -----------------------------------------*/

        this.elements.packageButtons.forEach(button => {

            button.addEventListener(

                "click",

                this.handlePackageSelection.bind(this)

            );

        });

        /*-----------------------------------------
        Product Selection
        -----------------------------------------*/

        this.elements.productCards.forEach(card => {

            card.addEventListener(

                "click",

                this.handleProductSelection.bind(this)

            );

        });

        /*-----------------------------------------
        Continue Button
        -----------------------------------------*/

        if (this.elements.continueButton) {

            this.elements.continueButton.addEventListener(

                "click",

                this.handleContinue.bind(this)

            );

        }

        /*-----------------------------------------
        Breadcrumb
        -----------------------------------------*/

        if (this.elements.breadcrumb) {

            this.elements.breadcrumb.addEventListener(

                "click",

                this.handleBreadcrumb.bind(this)

            );

        }

    },

    /*=====================================================
    HANDLE PACKAGE SELECTION
    =====================================================*/

    handlePackageSelection(event) {

        event.preventDefault();

        const button = event.currentTarget;

        const selectedPackage =

            button.dataset.package;

        this.state.selectedPackage =

            selectedPackage;

        this.elements.packageCards.forEach(card => {

            card.classList.remove(

                "cspl-package-selected"

            );

        });

        button.closest(

            ".cspl-package-card"

        ).classList.add(

            "cspl-package-selected"

        );

        this.saveLocalStorage();

    },

    /*=====================================================
    HANDLE PRODUCT SELECTION
    =====================================================*/

    handleProductSelection(event) {

        const selectedCard =

            event.currentTarget;

        this.elements.productCards.forEach(card => {

            card.classList.remove(

                "cspl-product-selected"

            );

        });

        selectedCard.classList.add(

            "cspl-product-selected"

        );

        this.state.selectedProduct =

            selectedCard.dataset.product;

        this.saveLocalStorage();

    },

    /*=====================================================
    HANDLE CONTINUE
    =====================================================*/

   handleContinue(event) {

    event.preventDefault();

    if (!this.validateCampaign()) {

        return;
    }

    this.setLoadingState(true);

    this.elements.continueButton.classList.add(

        "cspl-btn-loading"

    );

    this.autoSave();

    setTimeout(() => {

        window.location.href = "seller-promotion-campaign.html";

    }, 700)

   },

    /*=====================================================
    HANDLE BREADCRUMB
    =====================================================*/

    handleBreadcrumb(event) {

        event.preventDefault();

        window.location.href =

            "seller-dashboard.html";

    },

    /*=====================================================
    INITIALIZE ANIMATIONS
    =====================================================*/

    initializeAnimations() {

        [

            ...this.elements.packageCards,

            ...this.elements.productCards

        ].forEach((card, index) => {

            card.style.animationDelay =

                `${index * 0.08}s`;

        });

    },

    /*=====================================================
    SHOW TOAST
    =====================================================*/

    showToast(message, type = "success") {

        const existingToast =

            document.getElementById(

                "csplToast"

            );

        if (existingToast) {

            existingToast.remove();

        }

        const toast = document.createElement("div");

        toast.id = "csplToast";

        toast.className =
            `toast align-items-center text-bg-${type} border-0 position-fixed`;

        toast.style.top = "20px";

        toast.style.right = "20px";

        toast.style.zIndex = "1080";

        toast.innerHTML = `

            <div class="d-flex">

                <div class="toast-body">

                    ${message}

                </div>

                <button
                    type="button"
                    class="btn-close btn-close-white me-2 m-auto"
                    data-bs-dismiss="toast">

                </button>

            </div>

        `;

        document.body.appendChild(toast);

        const bsToast = new bootstrap.Toast(

            toast,

            {

                delay:2500

            }

        );

        bsToast.show();

        toast.addEventListener(

            "hidden.bs.toast",

            () => toast.remove()

        );

    },

    /*=====================================================
    SAVE PROMOTION DRAFT
    =====================================================*/

    savePromotionDraft() {

        const draft = {

            package: this.state.selectedPackage,

            product: this.state.selectedProduct,

            createdAt: new Date().toISOString()

        };

        localStorage.setItem(

            this.storage.promotionDraft,

            JSON.stringify(draft)

        );

    },

    /*=====================================================
    LOADING STATE
    =====================================================*/

    setLoadingState(status) {

        this.state.isLoading = status;

        if (status) {

            document.body.classList.add(

                "cspl-loading"

            );

        } else {

            document.body.classList.remove(

                "cspl-loading"

            );

        }

    },

    /*=====================================================
    INTERSECTION OBSERVER
    =====================================================*/

    initializeIntersectionObserver() {

        const observer = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(

                            "cspl-visible"

                        );

                        observer.unobserve(

                            entry.target

                        );

                    }

                });

            },

            {

                threshold:0.15,

                rootMargin:"0px 0px -40px 0px"

            }

        );

        [

            ...this.elements.packageCards,

            ...this.elements.productCards

        ].forEach(card => {

            observer.observe(card);

        });

    },

    /*=====================================================
    REFRESH PAGE STATE
    =====================================================*/

    refreshPageState() {

        this.restoreSelections();

    },

    /*=====================================================
    RESTORE PACKAGE ANIMATION
    =====================================================*/

    animateSelectedPackage() {

        const selectedCard =

            document.querySelector(

                ".cspl-package-selected"

            );

        if (!selectedCard) return;

        selectedCard.animate(

            [

                {

                    transform:"scale(.96)"

                },

                {

                    transform:"scale(1.03)"

                },

                {

                    transform:"scale(1)"

                }

            ],

            {

                duration:450,

                easing:"ease"

            }

        );

    },

    /*=====================================================
    AUTO SAVE
    =====================================================*/

    autoSave() {

        this.saveLocalStorage();

        this.savePromotionDraft();

    },

    /*=====================================================
    KEYBOARD ACCESSIBILITY
    =====================================================*/

    initializeKeyboardSupport() {

        this.elements.productCards.forEach(card => {

            card.setAttribute("tabindex", "0");

            card.addEventListener("keydown", event => {

                if (

                    event.key === "Enter" ||

                    event.key === " "

                ) {

                    event.preventDefault();

                    card.click();

                }

            });

        });

        this.elements.packageButtons.forEach(button => {

            button.addEventListener("keydown", event => {

                if (

                    event.key === "Enter" ||

                    event.key === " "

                ) {

                    event.preventDefault();

                    button.click();

                }

            });

        });

    },

    /*=====================================================
    WINDOW RESIZE
    =====================================================*/

    initializeResizeHandler() {

        let resizeTimer;

        window.addEventListener(

            "resize",

            () => {

                clearTimeout(resizeTimer);

                resizeTimer = setTimeout(() => {

                    document.body.classList.add(

                        "cspl-resizing"

                    );

                    setTimeout(() => {

                        document.body.classList.remove(

                            "cspl-resizing"

                        );

                    }, 150);

                }, 100);

            }

        );

    },

    /*=====================================================
    VISIBILITY CHANGE
    =====================================================*/

    initializeVisibilityHandler() {

        document.addEventListener(

            "visibilitychange",

            () => {

                if (document.hidden) {

                    this.autoSave();

                } else {

                    this.refreshPageState();

                }

            }

        );

    },

    /*=====================================================
    VALIDATE CAMPAIGN
    =====================================================*/

    validateCampaign() {

        if (!this.state.selectedPackage) {

            this.showToast(

                "Select a promotion package.",

                "warning"

            );

            return false;

        }

        if (!this.state.selectedProduct) {

            this.showToast(

                "Select a product to promote.",

                "warning"

            );

            return false;

        }

        return true;

    },

    /*=====================================================
    GET SELECTED PRODUCT
    =====================================================*/

    getSelectedProductCard() {

        return document.querySelector(

            ".cspl-product-selected"

        );

    },

    /*=====================================================
    GET SELECTED PACKAGE
    =====================================================*/

    getSelectedPackageCard() {

        return document.querySelector(

            ".cspl-package-selected"

        );

    },

    /*=====================================================
    REGISTER GLOBAL EVENTS
    =====================================================*/

    registerGlobalEvents() {

        this.initializeKeyboardSupport();

        this.initializeResizeHandler();

        this.initializeVisibilityHandler();

        window.addEventListener(

            "beforeunload",

            () => {

                this.autoSave();

            }

        );

    },

    /*=====================================================
    RESET CAMPAIGN
    =====================================================*/

    resetCampaign() {

        this.state.selectedPackage = null;

        this.state.selectedProduct = "1";

        this.restoreSelections();

        this.autoSave();

    },

    /*=====================================================
    DESTROY
    =====================================================*/

    destroy() {

        this.autoSave();

    }

};

/*=========================================================
APPLICATION START
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        SellerPromoteListings.init();

        SellerPromoteListings.registerGlobalEvents();

    }

);


"use strict";

/*=========================================================
SELLER WALLET
PART 3A
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeSellerWallet();

});

/*=========================================================
INITIALIZE
=========================================================*/

function initializeSellerWallet() {

    cacheWalletElements();

    initializeWalletAnimations();

    initializeNavigation();

    initializeWalletActions();

}

/*=========================================================
CACHE DOM ELEMENTS
=========================================================*/

let yswElements = {};

function cacheWalletElements() {

    yswElements = {

        withdrawButton:
            document.getElementById("yswWithdrawBtn"),

        topupButton:
            document.getElementById("yswTopupBtn"),

        confirmButton:
            document.getElementById("yswConfirmWithdrawalBtn"),

        changeBankButton:
            document.getElementById("yswChangeBank"),

        amountInput:
            document.getElementById("yswWithdrawAmount"),

        viewAllButton:
            document.getElementById("yswViewAllTransactions"),

        walletCard:
            document.querySelector(".ysw-wallet-card"),

        transactionItems:
            document.querySelectorAll(".ysw-transaction-item")

    };

}

/*=========================================================
PAGE ANIMATION
=========================================================*/

function initializeWalletAnimations() {

    if (yswElements.walletCard) {

        yswElements.walletCard.classList.add("ysw-scale-in");

    }

    yswElements.transactionItems.forEach((item, index) => {

        item.style.animationDelay = `${index * 120}ms`;

        item.classList.add("ysw-fade-up");

    });

}

/*=========================================================
NAVIGATION
=========================================================*/

function initializeNavigation() {

    if (yswElements.topupButton) {

        yswElements.topupButton.addEventListener("click", () => {

            window.location.href = "wallet-topup.html";

        });

    }

    if (yswElements.viewAllButton) {

        yswElements.viewAllButton.addEventListener("click", () => {

            window.location.href = "wallet-transactions.html";

        });

    }

}

/*=========================================================
PRIMARY ACTIONS
=========================================================*/

function initializeWalletActions() {

    if (yswElements.withdrawButton) {

        yswElements.withdrawButton.addEventListener("click", () => {

            if (yswElements.amountInput) {

                yswElements.amountInput.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });

                setTimeout(() => {

                    yswElements.amountInput.focus();

                }, 400);

            }

        });

    }

    if (yswElements.changeBankButton) {

        yswElements.changeBankButton.addEventListener("click", () => {

            window.location.href = "seller-bank-accounts.html";

        });

    }

}

/*=========================================================
WITHDRAWAL VALIDATION
=========================================================*/

const YSW_MINIMUM_WITHDRAWAL = 1000;

const YSW_AVAILABLE_BALANCE = 524000;

/*=========================================================
INITIALIZE VALIDATION
=========================================================*/

initializeWithdrawalValidation();

function initializeWithdrawalValidation() {

    if (!yswElements.amountInput) {

        return;

    }

    yswElements.amountInput.addEventListener("input", handleAmountInput);

    yswElements.amountInput.addEventListener("blur", validateWithdrawalAmount);

}

/*=========================================================
HANDLE INPUT
=========================================================*/

function handleAmountInput(event) {

    const input = event.target;

    let value = input.value.replace(/[^\d]/g, "");

    if (value === "") {

        input.value = "";

        return;

    }

    value = parseInt(value, 10);

    input.value = value;

}

/*=========================================================
VALIDATE AMOUNT
=========================================================*/

function validateWithdrawalAmount() {

    if (!yswElements.amountInput) {

        return false;

    }

    const amount = Number(yswElements.amountInput.value);

    if (!amount) {

        showWalletInputError(

            "Please enter a withdrawal amount."

        );

        return false;

    }

    if (amount < YSW_MINIMUM_WITHDRAWAL) {

        showWalletInputError(

            `Minimum withdrawal is ₦${formatWalletCurrency(YSW_MINIMUM_WITHDRAWAL)}.`

        );

        return false;

    }

    if (amount > YSW_AVAILABLE_BALANCE) {

        showWalletInputError(

            "Withdrawal amount exceeds your available balance."

        );

        return false;

    }

    clearWalletInputError();

    return true;

}

/*=========================================================
INPUT ERROR
=========================================================*/

function showWalletInputError(message) {

    if (!yswElements.amountInput) {

        return;

    }

    yswElements.amountInput.classList.add("is-invalid");

    let feedback = document.getElementById(

        "yswAmountFeedback"

    );

    if (!feedback) {

        feedback = document.createElement("div");

        feedback.id = "yswAmountFeedback";

        feedback.className = "invalid-feedback d-block";

        yswElements.amountInput.insertAdjacentElement(

            "afterend",

            feedback

        );

    }

    feedback.textContent = message;

}

function clearWalletInputError() {

    if (!yswElements.amountInput) {

        return;

    }

    yswElements.amountInput.classList.remove("is-invalid");

    const feedback = document.getElementById(

        "yswAmountFeedback"

    );

    if (feedback) {

        feedback.remove();

    }

}

/*=========================================================
FORMAT CURRENCY
=========================================================*/

function formatWalletCurrency(amount) {

    return Number(amount).toLocaleString(

        "en-NG"

    );

}

/*=========================================================
CONFIRM WITHDRAWAL
=========================================================*/

initializeConfirmWithdrawal();

function initializeConfirmWithdrawal() {

    if (!yswElements.confirmButton) {

        return;

    }

    yswElements.confirmButton.addEventListener(

        "click",

        processWithdrawal

    );

}

/*=========================================================
PROCESS WITHDRAWAL
=========================================================*/

function processWithdrawal() {

    if (!validateWithdrawalAmount()) {

        return;

    }

    const amount = Number(

        yswElements.amountInput.value

    );

    const originalText =

        yswElements.confirmButton.textContent;

    yswElements.confirmButton.disabled = true;

    yswElements.confirmButton.innerHTML =

        `<span class="spinner-border spinner-border-sm me-2"></span>
         Processing...`;

    setTimeout(() => {

        completeWithdrawal(amount);

        yswElements.confirmButton.disabled = false;

        yswElements.confirmButton.textContent =

            originalText;

    }, 1800);

}

/*=========================================================
COMPLETE WITHDRAWAL
=========================================================*/

function completeWithdrawal(amount) {

    const updatedBalance =

        YSW_AVAILABLE_BALANCE - amount;

    updateWalletBalance(updatedBalance);

    saveWalletTransaction({

        id: Date.now(),

        type: "Withdrawal",

        amount: amount,

        account: "GTBank ••••4532",

        status: "Completed",

        date: new Date().toISOString()

    });

    showWalletToast(

        `₦${formatWalletCurrency(amount)} withdrawal request submitted successfully.`,

        "success"

    );

    yswElements.amountInput.value = "";

}

/*=========================================================
UPDATE WALLET BALANCE
=========================================================*/

function updateWalletBalance(balance) {

    const balanceElement =

        document.querySelector(

            ".ysw-wallet-balance"

        );

    if (!balanceElement) {

        return;

    }

    balanceElement.textContent =

        `₦${formatWalletCurrency(balance)}`;

}

/*=========================================================
SAVE TRANSACTION
===========================*/

    saveWalletState(updatedBalance);

    prependLatestTransaction(amount);

}

/*=========================================================
LOCAL STORAGE
=========================================================*/

function saveWalletState(balance) {

    const walletState = {

        availableBalance: balance,

        updatedAt: new Date().toISOString()

    };

    localStorage.setItem(

        "yswSellerWalletState",

        JSON.stringify(walletState)

    );

}

function saveWalletTransaction(transaction) {

    const transactions = JSON.parse(

        localStorage.getItem("yswWalletTransactions") || "[]"

    );

    transactions.unshift(transaction);

    localStorage.setItem(

        "yswWalletTransactions",

        JSON.stringify(transactions)

    );

}

/*=========================================================
PREPEND NEW TRANSACTION
=========================================================*/

function prependLatestTransaction(amount) {

    const transactionsContainer = document.querySelector(

        ".ysw-transactions-section .ysw-card"

    );

    if (!transactionsContainer) {

        return;

    }

    const transaction = document.createElement("div");

    transaction.className =

        "ysw-transaction-item ysw-scale-in";

    transaction.innerHTML = `

        <div class="ysw-transaction-left">

            <div class="ysw-transaction-icon danger">

                <i class="bi bi-arrow-up-circle-fill"></i>

            </div>

            <div>

                <h6>

                    Withdrawal

                </h6>

                <span>

                    GTBank ••••4532

                </span>

            </div>

        </div>

        <div class="ysw-transaction-right">

            <h6 class="ysw-debit">

                - ₦${formatWalletCurrency(amount)}

            </h6>

            <small>

                Just now

            </small>

        </div>

    `;

    const firstTransaction = transactionsContainer.querySelector(

        ".ysw-transaction-item"

    );

    if (firstTransaction) {

        firstTransaction.before(transaction);

    }

}

/*=========================================================
RESTORE WALLET
=========================================================*/

restoreWalletState();

function restoreWalletState() {

    const walletState = JSON.parse(

        localStorage.getItem("yswSellerWalletState")

    );

    if (

        walletState &&

        walletState.availableBalance

    ) {

        updateWalletBalance(

            walletState.availableBalance

        );

    }

}

/*=========================================================
TOAST NOTIFICATION
=========================================================*/

function showWalletToast(message, type = "success") {

    let toast = document.getElementById("yswWalletToast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "yswWalletToast";

        toast.className = "toast align-items-center border-0 position-fixed";

        toast.style.top = "20px";
        toast.style.right = "20px";
        toast.style.zIndex = "9999";

        document.body.appendChild(toast);

    }

    const backgroundColor = type === "success"
        ? "bg-success"
        : "bg-danger";

    toast.className = `toast align-items-center text-white ${backgroundColor} border-0 position-fixed`;

    toast.innerHTML = `

        <div class="d-flex">

            <div class="toast-body">

                ${message}

            </div>

            <button
                type="button"
                class="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast">

            </button>

        </div>

    `;

    const bsToast = new bootstrap.Toast(toast, {

        delay: 3500

    });

    bsToast.show();

}

/*=========================================================
KEYBOARD SHORTCUTS
=========================================================*/

document.addEventListener("keydown", (event) => {

    if (

        event.key === "Enter" &&

        document.activeElement === yswElements.amountInput

    ) {

        event.preventDefault();

        processWithdrawal();

    }

});

/*=========================================================
AUTO FORMAT ON BLUR
=========================================================*/

if (yswElements.amountInput) {

    yswElements.amountInput.addEventListener("blur", () => {

        const amount = Number(

            yswElements.amountInput.value

        );

        if (amount > 0) {

            yswElements.amountInput.value = amount;

        }

    });

}

/*=========================================================
GLOBAL ERROR HANDLER
=========================================================*/

window.addEventListener("error", (event) => {

    console.error(

        "[Seller Wallet]",

        event.message

    );

});

/*=========================================================
HELPER FUNCTIONS
=========================================================*/

function getCurrentWalletBalance() {

    const balanceElement = document.querySelector(

        ".ysw-wallet-balance"

    );

    if (!balanceElement) {

        return 0;

    }

    return Number(

        balanceElement.textContent

            .replace(/[₦,\s]/g, "")

    );

}

function resetWithdrawalForm() {

    clearWalletInputError();

    if (yswElements.amountInput) {

        yswElements.amountInput.value = "";

    }

}

function scrollToTopSmooth() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

/*=========================================================
PAGE EVENTS
=========================================================*/

window.addEventListener("beforeunload", () => {

    console.info(

        "Seller Wallet page unloaded."

    );

});

/*=========================================================
SELLER DASHBOARD LINKS
=========================================================*/

const yswSidebarLinks = {

    dashboard: "../../seller/seller-dashboard.html",

    orders: "../../seller/seller-order.html",

    products: "../../seller/seller-product.html",

    inventory: "../../seller/seller-inventory.html",

    analytics: "../../seller/seller-analytics.html",

    revenue: "../../seller/seller-revenue.html",

    wallet: "../../seller/seller-wallet.html",

    settings: "../../seller/seller-setting.html"

};

/*=========================================================
END OF SELLER WALLET JAVASCRIPT
=========================================================*/











/*=====================================================
SELLER INVENTORY
PART 3A
=====================================================*/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        "use strict";

        /*=====================================================
        DOM REFERENCES
        =====================================================*/

        const ysiCartBtn =

            document.getElementById(

                "ysiCartBtn"

            );

        const ysiNotificationBtn =

            document.getElementById(

                "ysiNotificationBtn"

            );

        const ysiLogoutBtn =

            document.getElementById(

                "ysiLogoutBtn"

            );

        const ysiBackDashboard =

            document.getElementById(

                "ysiBackDashboard"

            );

        const ysiExportBtn =

            document.getElementById(

                "ysiExportBtn"

            );

        const ysiAddStockBtn =

            document.getElementById(

                "ysiAddStockBtn"

            );

        const ysiInventorySearch =

            document.getElementById(

                "ysiInventorySearch"

            );

        const ysiInventoryFilterBtn =

            document.getElementById(

                "ysiInventoryFilterBtn"

            );

        const ysiNewsletterForm =

            document.getElementById(

                "ysiNewsletterForm"

            );

        const ysiNewsletterEmail =

            document.getElementById(

                "ysiNewsletterEmail"

            );

        /*=====================================================
        TABLE
        =====================================================*/

        const ysiInventoryTable =

            document.querySelector(

                ".ysi-inventory-table"

            );

        const ysiInventoryRows =

            document.querySelectorAll(

                ".ysi-inventory-table tbody tr"

            );

        /*=====================================================
        ACTION BUTTONS
        =====================================================*/

        const ysiEditButtons =

            document.querySelectorAll(

                ".ysi-edit-product"

            );

        const ysiDeleteButtons =

            document.querySelectorAll(

                ".ysi-delete-product"

            );

        /*=====================================================
        SUMMARY CARDS
        =====================================================*/

        const ysiSummaryCards =

            document.querySelectorAll(

                ".ysi-summary-card"

            );

        /*=====================================================
        NAVIGATION
        =====================================================*/

        if(ysiBackDashboard){

            ysiBackDashboard.addEventListener(

                "click",

                function(){

                    window.location.href =

                    "../Seller/seller-dashboard.html";

                }

            );

        }

        if(ysiCartBtn){

            ysiCartBtn.addEventListener(

                "click",

                function(){

                    window.location.href =

                    "../Cart/cart.html";

                }

            );

        }

        if(ysiNotificationBtn){

            ysiNotificationBtn.addEventListener(

                "click",

                function(){

                    window.location.href =

                    "../Notifications/notifications.html";

                }

            );

        }

        if(ysiLogoutBtn){

            ysiLogoutBtn.addEventListener(

                "click",

                function(){

                    const confirmLogout =

                        confirm(

                            "Are you sure you want to sign out?"

                        );

                    if(confirmLogout){

                        localStorage.removeItem(

                            "sellerLoggedIn"

                        );

                        window.location.href =

                        "../index.html";

                    }

                }

            );

        }

        /*=====================================================
        SEARCH INVENTORY
        =====================================================*/

        if(

            ysiInventorySearch &&

            ysiInventoryRows.length

        ){

            ysiInventorySearch.addEventListener(

                "keyup",

                function(){

                    const keyword =

                        this.value

                        .toLowerCase()

                        .trim();

                    ysiInventoryRows.forEach(

                        function(row){

                            const content =

                                row.innerText

                                .toLowerCase();

                            row.style.display =

                                content.includes(keyword)

                                ? ""

                                : "none";

                        }

                    );

                }

            );

        }

               /*=====================================================
        EXPORT INVENTORY AS CSV
        =====================================================*/

        if(ysiExportBtn){

            ysiExportBtn.addEventListener(

                "click",

                function(){

                    let csv =

                        "Product,SKU,Stock,Sold,Status\n";

                    ysiInventoryRows.forEach(

                        function(row){

                            if(row.style.display === "none"){

                                return;

                            }

                            const cells =

                                row.querySelectorAll("td");

                            if(cells.length < 6){

                                return;

                            }

                            const product =

                                cells[0]

                                .innerText

                                .trim()

                                .replace(/\n/g," ");

                            const sku =

                                cells[1].innerText.trim();

                            const stock =

                                cells[2].innerText.trim();

                            const sold =

                                cells[3].innerText.trim();

                            const status =

                                cells[4].innerText.trim();

                            csv += `"${product}","${sku}","${stock}","${sold}","${status}"\n`;

                        }

                    );

                    const blob =

                        new Blob(

                            [csv],

                            {

                                type:"text/csv;charset=utf-8;"

                            }

                        );

                    const url =

                        URL.createObjectURL(blob);

                    const link =

                        document.createElement("a");

                    link.href = url;

                    link.download =

                        "inventory.csv";

                    document.body.appendChild(link);

                    link.click();

                    document.body.removeChild(link);

                    URL.revokeObjectURL(url);

                }

            );

        }

        /*=====================================================
        ADD STOCK
        =====================================================*/

        if(ysiAddStockBtn){

            ysiAddStockBtn.addEventListener(

                "click",

                function(){

                    alert(

                        "Add Stock form will be connected here."

                    );

                }

            );

        }

        /*=====================================================
        FILTER BUTTON
        =====================================================*/

        if(ysiInventoryFilterBtn){

            ysiInventoryFilterBtn.addEventListener(

                "click",

                function(){

                    alert(

                        "Inventory filters coming soon."

                    );

                }

            );

        }

        /*=====================================================
        EDIT PRODUCT
        =====================================================*/

        ysiEditButtons.forEach(

            function(button){

                button.addEventListener(

                    "click",

                    function(){

                        const row =

                            this.closest("tr");

                        const product =

                            row.querySelector(

                                ".ysi-product-cell span"

                            ).innerText;

                        alert(

                            "Edit Product:\n\n" +

                            product

                        );

                    }

                );

            }

        );

        /*=====================================================
        DELETE PRODUCT
        =====================================================*/

        ysiDeleteButtons.forEach(

            function(button){

                button.addEventListener(

                    "click",

                    function(){

                        const row =

                            this.closest("tr");

                        const product =

                            row.querySelector(

                                ".ysi-product-cell span"

                            ).innerText;

                        const confirmed =

                            confirm(

                                `Delete "${product}" from inventory?`

                            );

                        if(confirmed){

                            row.remove();

                        }

                    }

                );

            }

        );

        /*=====================================================
        NEWSLETTER SUBMISSION
        =====================================================*/

        if(ysiNewsletterForm){

            ysiNewsletterForm.addEventListener(

                "submit",

                function(event){

                    event.preventDefault();

                    const email =

                        ysiNewsletterEmail.value.trim();

                    const emailPattern =

                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if(

                        !emailPattern.test(email)

                    ){

                        alert(

                            "Please enter a valid email address."

                        );

                        return;

                    }

                    alert(

                        "Thank you for subscribing!"

                    );

                    this.reset();

                }

            );

        }

        /*=====================================================
        SUMMARY CARD ANIMATION
        =====================================================*/

        ysiSummaryCards.forEach(

            function(card,index){

                card.style.opacity = "0";

                card.style.transform =

                    "translateY(25px)";

                setTimeout(

                    function(){

                        card.style.transition =

                            "all .5s ease";

                        card.style.opacity = "1";

                        card.style.transform =

                            "translateY(0)";

                    },

                    index * 120

                );

            }

        );

              /*=====================================================
        RIPPLE EFFECT
        =====================================================*/

        function ysiCreateRipple(event){

            const button = event.currentTarget;

            const ripple =

                document.createElement("span");

            ripple.classList.add(

                "ysi-ripple"

            );

            const rect =

                button.getBoundingClientRect();

            const size =

                Math.max(

                    rect.width,

                    rect.height

                );

            ripple.style.width =

                size + "px";

            ripple.style.height =

                size + "px";

            ripple.style.left =

                (event.clientX - rect.left - size / 2) + "px";

            ripple.style.top =

                (event.clientY - rect.top - size / 2) + "px";

            button.style.position = "relative";

            button.style.overflow = "hidden";

            button.appendChild(ripple);

            ripple.addEventListener(

                "animationend",

                function(){

                    ripple.remove();

                }

            );

        }

        document.querySelectorAll(

            ".ysi-export-btn, .ysi-add-stock-btn, .ysi-filter-btn, .ysi-action-btn, .ysi-nav-icon"

        ).forEach(

            function(button){

                button.addEventListener(

                    "click",

                    ysiCreateRipple

                );

            }

        );

        /*=====================================================
        TABLE ROW HOVER
        =====================================================*/

        ysiInventoryRows.forEach(

            function(row){

                row.addEventListener(

                    "mouseenter",

                    function(){

                        this.style.transition =

                            "all .25s ease";

                    }

                );

            }

        );

        /*=====================================================
        PRODUCT IMAGE CLICK
        =====================================================*/

        document.querySelectorAll(

            ".ysi-product-image"

        ).forEach(

            function(image){

                image.addEventListener(

                    "click",

                    function(){

                        const product =

                            this.closest("tr")

                            .querySelector(

                                ".ysi-product-cell span"

                            )

                            .innerText;

                        alert(

                            "Preview for:\n\n" +

                            product

                        );

                    }

                );

            }

        );

        /*=====================================================
        BUTTON LOADING EFFECT
        =====================================================*/

        function ysiButtonLoading(

            button,

            duration = 800

        ){

            if(!button) return;

            button.classList.add(

                "ysi-btn-loading"

            );

            button.disabled = true;

            setTimeout(

                function(){

                    button.classList.remove(

                        "ysi-btn-loading"

                    );

                    button.disabled = false;

                },

                duration

            );

        }

        if(ysiExportBtn){

            ysiExportBtn.addEventListener(

                "click",

                function(){

                    ysiButtonLoading(this);

                }

            );

        }

        if(ysiAddStockBtn){

            ysiAddStockBtn.addEventListener(

                "click",

                function(){

                    ysiButtonLoading(this);

                }

            );

        }

        /*=====================================================
        KEYBOARD SHORTCUTS
        =====================================================*/

        document.addEventListener(

            "keydown",

            function(event){

                if(

                    event.ctrlKey &&

                    event.key.toLowerCase() === "f"

                ){

                    event.preventDefault();

                    ysiInventorySearch.focus();

                }

                if(

                    event.altKey &&

                    event.key.toLowerCase() === "a"

                ){

                    event.preventDefault();

                    ysiAddStockBtn.click();

                }

                if(

                    event.altKey &&

                    event.key.toLowerCase() === "e"

                ){

                    event.preventDefault();

                    ysiExportBtn.click();

                }

            }

        );

               /*=====================================================
        SAVE INVENTORY PAGE STATE
        =====================================================*/

        function ysiSavePageState(){

            const pageState = {

                searchValue:

                    ysiInventorySearch

                    ? ysiInventorySearch.value

                    : "",

                lastVisited:

                    new Date().toISOString()

            };

            localStorage.setItem(

                "ysiInventoryPageState",

                JSON.stringify(pageState)

            );

        }

        function ysiRestorePageState(){

            const savedState =

                localStorage.getItem(

                    "ysiInventoryPageState"

                );

            if(!savedState){

                return;

            }

            try{

                const pageState =

                    JSON.parse(savedState);

                if(

                    ysiInventorySearch &&

                    pageState.searchValue

                ){

                    ysiInventorySearch.value =

                        pageState.searchValue;

                    ysiInventorySearch.dispatchEvent(

                        new Event("keyup")

                    );

                }

            }

            catch(error){

                console.error(error);

            }

        }

        ysiRestorePageState();

        window.addEventListener(

            "beforeunload",

            ysiSavePageState

        );

        /*=====================================================
        INVENTORY SUMMARY REFRESH
        =====================================================*/

        function ysiRefreshInventoryStats(){

            const rows =

                document.querySelectorAll(

                    ".ysi-inventory-table tbody tr"

                );

            const totalProducts = rows.length;

            const lowStockProducts =

                Array.from(rows).filter(

                    function(row){

                        const stock = parseInt(

                            row.children[2]

                            .innerText

                        );

                        return stock <= 10;

                    }

                ).length;

            const summaryValues =

                document.querySelectorAll(

                    ".ysi-summary-value"

                );

            if(summaryValues.length >= 2){

                summaryValues[0].textContent =

                    totalProducts;

                summaryValues[1].textContent =

                    lowStockProducts;

            }

        }

        ysiRefreshInventoryStats();

        /*=====================================================
        EMPTY TABLE CHECK
        =====================================================*/

        function ysiCheckEmptyInventory(){

            const visibleRows =

                Array.from(

                    document.querySelectorAll(

                        ".ysi-inventory-table tbody tr"

                    )

                ).filter(

                    function(row){

                        return row.style.display !== "none";

                    }

                );

            let emptyState =

                document.getElementById(

                    "ysiEmptyState"

                );

            if(

                visibleRows.length === 0

            ){

                if(!emptyState){

                    emptyState =

                        document.createElement(

                            "div"

                        );

                    emptyState.id =

                        "ysiEmptyState";

                    emptyState.className =

                        "ysi-empty-state";

                    emptyState.innerHTML =

                        '<i class="bi bi-box-seam"></i>' +

                        '<h4>No Products Found</h4>' +

                        '<p>Try another search keyword.</p>';

                    ysiInventoryTable

                        .parentElement

                        .appendChild(

                            emptyState

                        );

                }

            }

            else if(emptyState){

                emptyState.remove();

            }

        }

        if(ysiInventorySearch){

            ysiInventorySearch.addEventListener(

                "keyup",

                ysiCheckEmptyInventory

            );

        }

        /*=====================================================
        SMOOTH SCROLL TO TABLE
        =====================================================*/

        if(ysiInventorySearch){

            ysiInventorySearch.addEventListener(

                "focus",

                function(){

                    ysiInventoryTable.scrollIntoView({

                        behavior:"smooth",

                        block:"start"

                    });

                }

            );

        }

        /*=====================================================
        SIMPLE TOAST NOTIFICATION
        =====================================================*/

        function ysiShowToast(message){

            const toast =

                document.createElement(

                    "div"

                );

            toast.className =

                "ysi-floating-btn";

            toast.style.width =

                "auto";

            toast.style.height =

                "auto";

            toast.style.padding =

                "14px 20px";

            toast.style.borderRadius =

                "12px";

            toast.style.cursor =

                "default";

            toast.textContent =

                message;

            document.body.appendChild(

                toast

            );

            setTimeout(function(){

                toast.remove();

            },2500);

        }

        /*=====================================================
        DELETE SUCCESS TOAST
        =====================================================*/

        ysiDeleteButtons.forEach(

            function(button){

                button.addEventListener(

                    "click",

                    function(){

                        setTimeout(function(){

                            ysiRefreshInventoryStats();

                            ysiCheckEmptyInventory();

                            ysiShowToast(

                                "Inventory updated."

                            );

                        },100);

                    }

                );

            }

        );

               /*=====================================================
        SESSION VALIDATION
        =====================================================*/

        // const ysiSellerSession =

        //     localStorage.getItem(

        //         "sellerLoggedIn"

        //     );

        // if(ysiSellerSession !== "true"){

        //     window.location.href =

        //     "../auth/signin.html";

        // }

        /*=====================================================
        RESTORE SCROLL POSITION
        =====================================================*/

        const ysiSavedScroll =

            sessionStorage.getItem(

                "ysiInventoryScroll"

            );

        if(ysiSavedScroll){

            window.scrollTo(

                0,

                parseInt(ysiSavedScroll,10)

            );

        }

        window.addEventListener(

            "beforeunload",

            function(){

                sessionStorage.setItem(

                    "ysiInventoryScroll",

                    window.scrollY

                );

            }

        );

        /*=====================================================
        BOOTSTRAP TOOLTIPS
        =====================================================*/

        document.querySelectorAll(

            '[data-bs-toggle="tooltip"]'

        ).forEach(function(element){

            new bootstrap.Tooltip(

                element

            );

        });

        /*=====================================================
        BOOTSTRAP POPOVERS
        =====================================================*/

        document.querySelectorAll(

            '[data-bs-toggle="popover"]'

        ).forEach(function(element){

            new bootstrap.Popover(

                element

            );

        });

        /*=====================================================
        PAGE FADE-IN
        =====================================================*/

        document.body.style.opacity = "0";

        window.addEventListener(

            "load",

            function(){

                document.body.style.transition =

                    "opacity .35s ease";

                document.body.style.opacity = "1";

            }

        );

        /*=====================================================
        IMAGE FALLBACKS
        =====================================================*/

        document.querySelectorAll(

            ".ysi-product-image, .ysi-profile-image"

        ).forEach(function(image){

            image.addEventListener(

                "error",

                function(){

                    this.src =

                        "https://placehold.co/60x60?text=Image";

                }

            );

        });

        /*=====================================================
        PERFORMANCE LOGGER
        =====================================================*/

        window.addEventListener(

            "load",

            function(){

                console.log(

                    "Seller Inventory page loaded successfully."

                );

                if(

                    performance &&

                    performance.now

                ){

                    console.log(

                        "Load Time:",

                        Math.round(

                            performance.now()

                        ) + "ms"

                    );

                }

            }

        );

        /*=====================================================
        PAGE VISIT HISTORY
        =====================================================*/

        localStorage.setItem(

            "ysiLastVisitedPage",

            "seller-inventory"

        );

        localStorage.setItem(

            "ysiLastVisitTime",

            new Date().toISOString()

        );

        /*=====================================================
        CLEANUP
        =====================================================*/

        window.addEventListener(

            "beforeunload",

            function(){

                console.log(

                    "Leaving Seller Inventory page..."

                );

            }

        );

        /*=====================================================
        MODULE INITIALIZED
        =====================================================*/

        console.log(

            "YOVI Seller Inventory module initialized successfully."

        );

    }

);


/*==================================
   SELLER ANALYTICS PAGE 
 ===================================*/

"use strict";

document.addEventListener(

    "DOMContentLoaded",

    function(){

        /*=====================================================
        PAGE ELEMENTS
        =====================================================*/

        const ysaAnalyticsPage =

            document.getElementById(

                "ysaAnalyticsPage"

            );

        const ysaBackDashboard =

            document.getElementById(

                "ysaBackDashboard"

            );

        const ysaCartBtn =

            document.getElementById(

                "ysaCartBtn"

            );

        const ysaNotificationBtn =

            document.getElementById(

                "ysaNotificationBtn"

            );

        const ysaLogoutBtn =

            document.getElementById(

                "ysaLogoutBtn"

            );

        const ysaNewsletterForm =

            document.getElementById(

                "ysaNewsletterForm"

            );

        const ysaNewsletterEmail =

            document.getElementById(

                "ysaNewsletterEmail"

            );

        const ysaStatCards =

            document.querySelectorAll(

                ".ysa-stat-card"

            );

        const ysaAnalyticsCards =

            document.querySelectorAll(

                ".ysa-card"

            );

        const ysaProductRows =

            document.querySelectorAll(

                ".ysa-table-card tbody tr"

            );

        const ysaProgressBars =

            document.querySelectorAll(

                ".ysa-progress .progress-bar"

            );

        const ysaFunnelItems =

            document.querySelectorAll(

                ".ysa-funnel-item"

            );

        const ysaProductImages =

            document.querySelectorAll(

                ".ysa-product-image"

            );

        /*=====================================================
        PAGE NAVIGATION
        =====================================================*/

        if(ysaBackDashboard){

            ysaBackDashboard.addEventListener(

                "click",

                function(){

                    window.location.href =

                        "../../seller/seller-dashboard.html";

                }

            );

        }

        if(ysaCartBtn){

            ysaCartBtn.addEventListener(

                "click",

                function(){

                    window.location.href =

                        "../cart.html";

                }

            );

        }

        if(ysaNotificationBtn){

            ysaNotificationBtn.addEventListener(

                "click",

                function(){

                    window.location.href =

                        "../notifications.html";

                }

            );

        }

        /*=====================================================
        LOGOUT
        =====================================================*/

        if(ysaLogoutBtn){

            ysaLogoutBtn.addEventListener(

                "click",

                function(){

                    const confirmLogout =

                        confirm(

                            "Are you sure you want to sign out?"

                        );

                    if(!confirmLogout){

                        return;

                    }

                    localStorage.removeItem(

                        "sellerLoggedIn"

                    );

                    window.location.href =

                        "../auth/login.html";

                }

            );

        }

        /*=====================================================
        NEWSLETTER SUBSCRIPTION
        =====================================================*/

        if(ysaNewsletterForm){

            ysaNewsletterForm.addEventListener(

                "submit",

                function(event){

                    event.preventDefault();

                    const email =

                        ysaNewsletterEmail.value.trim();

                    if(email === ""){

                        alert(

                            "Please enter your email address."

                        );

                        return;

                    }

                    alert(

                        "Newsletter subscription successful!"

                    );

                    this.reset();

                }

            );

        }

              /*=====================================================
        STATISTICS CARD ANIMATION
        =====================================================*/

        ysaStatCards.forEach(function(card, index){

            card.style.opacity = "0";

            card.style.transform = "translateY(30px)";

            setTimeout(function(){

                card.style.transition =

                    "all .45s ease";

                card.style.opacity = "1";

                card.style.transform =

                    "translateY(0)";

            }, index * 120);

        });

        /*=====================================================
        CONTENT CARD ANIMATION
        =====================================================*/

        ysaAnalyticsCards.forEach(function(card, index){

            card.style.opacity = "0";

            card.style.transform = "translateY(35px)";

            setTimeout(function(){

                card.style.transition =

                    "all .5s ease";

                card.style.opacity = "1";

                card.style.transform =

                    "translateY(0)";

            }, 450 + (index * 180));

        });

        /*=====================================================
        PROGRESS BAR ANIMATION
        =====================================================*/

        ysaProgressBars.forEach(function(bar){

            const targetWidth =

                bar.style.width;

            bar.style.width = "0";

            setTimeout(function(){

                bar.style.width = targetWidth;

            }, 700);

        });

        /*=====================================================
        CONVERSION FUNNEL ANIMATION
        =====================================================*/

        ysaFunnelItems.forEach(function(item, index){

            item.style.opacity = "0";

            item.style.transform =

                "translateX(-25px)";

            setTimeout(function(){

                item.style.transition =

                    "all .45s ease";

                item.style.opacity = "1";

                item.style.transform =

                    "translateX(0)";

            }, 900 + (index * 150));

        });

        /*=====================================================
        PRODUCT TABLE ROW HOVER EFFECT
        =====================================================*/

        ysaProductRows.forEach(function(row){

            row.addEventListener(

                "mouseenter",

                function(){

                    this.style.transform =

                        "scale(1.01)";

                }

            );

            row.addEventListener(

                "mouseleave",

                function(){

                    this.style.transform =

                        "scale(1)";

                }

            );

        });

        /*=====================================================
        PRODUCT IMAGE INTERACTION
        =====================================================*/

        ysaProductImages.forEach(function(image){

            image.addEventListener(

                "click",

                function(){

                    alert(

                        "Product preview will be available in a future update."

                    );

                }

            );

        });

               /*=====================================================
        INTERSECTION OBSERVER
        Animate cards when they enter the viewport
        =====================================================*/

        const ysaObserver = new IntersectionObserver(

            function(entries){

                entries.forEach(function(entry){

                    if(entry.isIntersecting){

                        entry.target.classList.add(

                            "ysa-fade-in"

                        );

                    }

                });

            },

            {

                threshold:0.20

            }

        );

        ysaAnalyticsCards.forEach(function(card){

            ysaObserver.observe(card);

        });

        ysaStatCards.forEach(function(card){

            ysaObserver.observe(card);

        });

        /*=====================================================
        PRODUCT ROW RIPPLE EFFECT
        =====================================================*/

        ysaProductRows.forEach(function(row){

            row.addEventListener(

                "click",

                function(){

                    this.animate(

                        [

                            {

                                transform:"scale(1)"

                            },

                            {

                                transform:"scale(.98)"

                            },

                            {

                                transform:"scale(1)"

                            }

                        ],

                        {

                            duration:220,

                            easing:"ease"

                        }

                    );

                }

            );

        });

        /*=====================================================
        REFRESH ANALYTICS
        =====================================================*/

        function ysaRefreshAnalytics(){

            ysaProgressBars.forEach(function(bar){

                const width = bar.style.width;

                bar.style.width = "0";

                setTimeout(function(){

                    bar.style.width = width;

                },250);

            });

        }

        /*=====================================================
        AUTO REFRESH
        =====================================================*/

        const ysaRefreshInterval =

            setInterval(function(){

                ysaRefreshAnalytics();

            },30000);

        /*=====================================================
        PRODUCT IMAGE LOADING
        =====================================================*/

        ysaProductImages.forEach(function(image){

            image.addEventListener(

                "load",

                function(){

                    image.classList.remove(

                        "ysa-skeleton"

                    );

                }

            );

        });

        /*=====================================================
        CONSOLE INFO
        =====================================================*/

        console.log(

            "Seller Analytics initialized successfully."

        );

               /*=====================================================
        PRODUCT TABLE ROW SELECTION
        =====================================================*/

        ysaProductRows.forEach(function (row) {

            row.addEventListener("click", function () {

                ysaProductRows.forEach(function (item) {

                    item.classList.remove("ysa-row-selected");

                });

                this.classList.add("ysa-row-selected");

            });

        });

        /*=====================================================
        PRODUCT ROW DOUBLE CLICK
        =====================================================*/

        ysaProductRows.forEach(function (row) {

            row.addEventListener("dblclick", function () {

                alert("Opening product details...");

                window.location.href = "seller-products.html";

            });

        });

        /*=====================================================
        KEYBOARD SHORTCUTS
        =====================================================*/

        document.addEventListener("keydown", function (event) {

            /* Alt + D → Dashboard */

            if (event.altKey && event.key.toLowerCase() === "d") {

                event.preventDefault();

                window.location.href = "seller-dashboard.html";

            }

            /* Alt + P → Products */

            if (event.altKey && event.key.toLowerCase() === "p") {

                event.preventDefault();

                window.location.href = "seller-products.html";

            }

            /* Alt + I → Inventory */

            if (event.altKey && event.key.toLowerCase() === "i") {

                event.preventDefault();

                window.location.href = "seller-inventory.html";

            }

            /* Alt + R → Revenue */

            if (event.altKey && event.key.toLowerCase() === "r") {

                event.preventDefault();

                window.location.href = "seller-revenue.html";

            }

        });

        /*=====================================================
        PAGE VISIBILITY
        =====================================================*/

        document.addEventListener(

            "visibilitychange",

            function () {

                if (document.hidden) {

                    console.log("Analytics page hidden.");

                } else {

                    console.log("Analytics page active.");

                }

            }

        );

        /*=====================================================
        SIMPLE PAGE TIMER
        =====================================================*/

        let ysaVisitSeconds = 0;

        setInterval(function () {

            ysaVisitSeconds++;

        }, 1000);

        window.addEventListener("beforeunload", function () {

            console.log(

                "Time spent:",

                ysaVisitSeconds,

                "seconds"

            );

        });

               /*=====================================================
        RESTORE SCROLL POSITION
        =====================================================*/

        const ysaSavedScroll =

            sessionStorage.getItem(

                "ysaAnalyticsScroll"

            );

        if(ysaSavedScroll){

            window.scrollTo(

                0,

                parseInt(

                    ysaSavedScroll,

                    10

                )

            );

        }

        window.addEventListener(

            "beforeunload",

            function(){

                sessionStorage.setItem(

                    "ysaAnalyticsScroll",

                    window.scrollY

                );

            }

        );

        /*=====================================================
        SESSION VALIDATION
        =====================================================*/

        // const ysaSellerSession =

        //     localStorage.getItem(

        //         "sellerLoggedIn"

        //     );

        // if(ysaSellerSession !== "true"){

        //     window.location.href =

        //         "../auth/signin.html";

        // }

        /*=====================================================
        BOOTSTRAP TOOLTIPS
        =====================================================*/

        document.querySelectorAll(

            '[data-bs-toggle="tooltip"]'

        ).forEach(function(element){

            new bootstrap.Tooltip(

                element

            );

        });

        /*=====================================================
        BOOTSTRAP POPOVERS
        =====================================================*/

        document.querySelectorAll(

            '[data-bs-toggle="popover"]'

        ).forEach(function(element){

            new bootstrap.Popover(

                element

            );

        });

        /*=====================================================
        PAGE FADE-IN
        =====================================================*/

        document.body.style.opacity = "0";

        window.addEventListener(

            "load",

            function(){

                document.body.style.transition =

                    "opacity .35s ease";

                document.body.style.opacity = "1";

            }

        );

        /*=====================================================
        IMAGE FALLBACK
        =====================================================*/

        ysaProductImages.forEach(function(image){

            image.addEventListener(

                "error",

                function(){

                    this.src =

                        "https://placehold.co/60x60?text=Image";

                }

            );

        });

        /*=====================================================
        SAVE LAST VISITED PAGE
        =====================================================*/

        localStorage.setItem(

            "ysaLastVisitedPage",

            "seller-analytics"

        );

        localStorage.setItem(

            "ysaLastVisitTime",

            new Date().toISOString()

        );

        /*=====================================================
        CLEANUP
        =====================================================*/

        window.addEventListener(

            "beforeunload",

            function(){

                clearInterval(

                    ysaRefreshInterval

                );

                console.log(

                    "Leaving Seller Analytics page..."

                );

            }

        );

        /*=====================================================
        MODULE INITIALIZED
        =====================================================*/

        console.log(

            "YOVI Seller Analytics module initialized successfully."

        );

    }

);





/*==================================================
BUYER DONE PAGE (3A)
Initialization • Elements • Navigation
File: buyer-done.js
Unique Prefix: ybd-
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

    const notificationBtn = document.getElementById("ybdViewNotificationsBtn");

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

            window.location.href =

                productsPage.value;

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

            window.location.href =

                servicesPage.value;

        },800);

    });

/*==================================================
BUYER DONE PAGE (3B)
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

/*==================================================
BUYER DONE PAGE (3C)
Session Restore • Dashboard Preload • UX Enhancements
Append after Part 3B
==================================================*/

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

/*==================================================
BUYER DONE PAGE (3D)
Accessibility • Navigation Guard • Session Finalization
Append after Part 3C
==================================================*/

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

/*==================================================
BUYER DONE PAGE (3E)
Final Utilities • Cleanup • Developer Helpers
Append after Part 3D
==================================================*/

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


/*=========================================================
BUYER NEIGHBOURHOOD
PART 3A
=========================================================*/

const BuyerNeighbourhood = {

    /*=====================================================
    LOCAL STORAGE KEYS
    =====================================================*/

    storage: {

        location: "yoviBuyerLocation",

        favouriteProducts: "yoviFavouriteProducts",

        recentProviders: "yoviRecentProviders"

    },

    /*=====================================================
    APPLICATION STATE
    =====================================================*/

    state: {

        currentLocation: "Ikeja, Lagos",

        favouriteProducts: [],

        recentProviders: [],

        isLoading: false

    },

    /*=====================================================
    DOM ELEMENTS
    =====================================================*/

    elements: {},

    /*=====================================================
    INITIALIZE
    =====================================================*/

    init() {

        this.cacheDOM();

        this.loadLocalStorage();

        this.restoreLocation();

        this.bindEvents();

        this.initializeAnimations();

    },

    /*=====================================================
    CACHE DOM
    =====================================================*/

    cacheDOM() {

        this.elements.locationText =

            document.querySelector(

                ".cbnh-current-location"

            );

        this.elements.changeLocation =

            document.querySelector(

                ".cbnh-location-change"

            );

        this.elements.liveFeedButton =

            document.querySelector(

                ".cbnh-live-feed-btn"

            );

        this.elements.productCards =

            document.querySelectorAll(

                ".cbnh-product-card"

            );

        this.elements.providerCards =

            document.querySelectorAll(

                ".cbnh-provider-card"

            );

        this.elements.statCards =

            document.querySelectorAll(

                ".cbnh-stat-card"

            );

    },

    /*=====================================================
    LOAD LOCAL STORAGE
    =====================================================*/

    loadLocalStorage() {

        const savedLocation =

            localStorage.getItem(

                this.storage.location

            );

        const favourites =

            localStorage.getItem(

                this.storage.favouriteProducts

            );

        const providers =

            localStorage.getItem(

                this.storage.recentProviders

            );

        if (savedLocation) {

            this.state.currentLocation =

                savedLocation;

        }

        this.state.favouriteProducts =

            favourites

                ? JSON.parse(favourites)

                : [];

        this.state.recentProviders =

            providers

                ? JSON.parse(providers)

                : [];

    },

    /*=====================================================
    SAVE LOCAL STORAGE
    =====================================================*/

    saveLocalStorage() {

        localStorage.setItem(

            this.storage.location,

            this.state.currentLocation

        );

        localStorage.setItem(

            this.storage.favouriteProducts,

            JSON.stringify(

                this.state.favouriteProducts

            )

        );

        localStorage.setItem(

            this.storage.recentProviders,

            JSON.stringify(

                this.state.recentProviders

            )

        );

    },

    /*=====================================================
    RESTORE LOCATION
    =====================================================*/

    restoreLocation() {

        if (

            this.elements.locationText

        ) {

            this.elements.locationText.textContent =

                this.state.currentLocation;

        }

    },

    /*=====================================================
    BIND EVENTS
    =====================================================*/

    bindEvents() {

        /*-----------------------------------------
        Change Location
        -----------------------------------------*/

        if (this.elements.changeLocation) {

            this.elements.changeLocation.addEventListener(

                "click",

                this.handleLocationChange.bind(this)

            );

        }

        /*-----------------------------------------
        Live Feed
        -----------------------------------------*/

        if (this.elements.liveFeedButton) {

            this.elements.liveFeedButton.addEventListener(

                "click",

                this.openLiveFeed.bind(this)

            );

        }

        /*-----------------------------------------
        Product Cards
        -----------------------------------------*/

        this.elements.productCards.forEach(card => {

            card.addEventListener(

                "click",

                this.handleProductClick.bind(this)

            );

        });

        /*-----------------------------------------
        Provider Cards
        -----------------------------------------*/

        this.elements.providerCards.forEach(card => {

            card.addEventListener(

                "click",

                this.handleProviderClick.bind(this)

            );

        });

    },

    /*=====================================================
    CHANGE LOCATION
    =====================================================*/

    handleLocationChange(event) {

        event.preventDefault();

        window.location.href =

            "buyer-change-location.html";

    },

    /*=====================================================
    LIVE FEED
    =====================================================*/

    openLiveFeed(event) {

        event.preventDefault();

        this.elements.liveFeedButton.classList.add(

            "cbnh-btn-loading"

        );

        setTimeout(() => {

            window.location.href =

                "buyer-live-feed.html";

        }, 500);

    },

    /*=====================================================
    PRODUCT CLICK
    =====================================================*/

    handleProductClick(event) {

        const card = event.currentTarget;

        card.classList.add("cbnh-card-active");

        setTimeout(() => {

            card.classList.remove(

                "cbnh-card-active"

            );

        }, 180);

    },

    /*=====================================================
    PROVIDER CLICK
    =====================================================*/

    handleProviderClick(event) {

        const card = event.currentTarget;

        const providerName =

            card.querySelector("h4")?.textContent.trim();

        if (

            providerName &&

            !this.state.recentProviders.includes(

                providerName

            )

        ) {

            this.state.recentProviders.unshift(

                providerName

            );

            if (

                this.state.recentProviders.length > 10

            ) {

                this.state.recentProviders.pop();

            }

            this.saveLocalStorage();

        }

        card.classList.add("cbnh-card-active");

        setTimeout(() => {

            card.classList.remove(

                "cbnh-card-active"

            );

        }, 180);

    },

    /*=====================================================
    INITIALIZE ANIMATIONS
    =====================================================*/

    initializeAnimations() {

        const animatedItems = [

            ...this.elements.statCards,

            ...this.elements.productCards,

            ...this.elements.providerCards

        ];

        animatedItems.forEach((item, index) => {

            item.style.animationDelay =

                `${index * 0.08}s`;

        });

    },

    /*=====================================================
    INITIALIZE INTERSECTION OBSERVER
    =====================================================*/

    initializeIntersectionObserver() {

        const observer = new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(

                            "cbnh-visible"

                        );

                        observer.unobserve(

                            entry.target

                        );

                    }

                });

            },

            {

                threshold:0.15,

                rootMargin:"0px 0px -40px 0px"

            }

        );

        [

            ...this.elements.statCards,

            ...this.elements.productCards,

            ...this.elements.providerCards

        ].forEach(card => {

            observer.observe(card);

        });

    },

    /*=====================================================
    ANIMATE STATISTICS
    =====================================================*/

    animateStatistics() {

        this.elements.statCards.forEach(card => {

            const numberElement =

                card.querySelector("h3");

            if (!numberElement) return;

            const targetValue = parseInt(

                numberElement.textContent.replace(/\D/g, ""),

                10

            );

            if (isNaN(targetValue)) return;

            let currentValue = 0;

            const increment =

                Math.max(1, Math.ceil(targetValue / 40));

            const counter = setInterval(() => {

                currentValue += increment;

                if (currentValue >= targetValue) {

                    currentValue = targetValue;

                    clearInterval(counter);

                }

                numberElement.textContent =

                    currentValue;

            }, 25);

        });

    },

    /*=====================================================
    RESTORE RECENT PROVIDERS
    =====================================================*/

    restoreRecentProviders() {

        if (

            !this.state.recentProviders.length

        ) {

            return;

        }

        this.elements.providerCards.forEach(card => {

            const providerName =

                card.querySelector("h4")?.textContent.trim();

            if (

                this.state.recentProviders.includes(

                    providerName

                )

            ) {

                card.classList.add(

                    "cbnh-recent-provider"

                );

            }

        });

    },

    /*=====================================================
    UPDATE LOCATION
    =====================================================*/

    updateLocation(location) {

        this.state.currentLocation = location;

        this.restoreLocation();

        this.saveLocalStorage();

    },

    /*=====================================================
    REFRESH PAGE STATE
    =====================================================*/

    refreshPageState() {

        this.restoreLocation();

        this.restoreRecentProviders();

    },

    /*=====================================================
    SHOW TOAST MESSAGE
    =====================================================*/

    showToast(message, type = "success") {

        const existingToast = document.querySelector("#cbnhToast");

        if (existingToast) {

            existingToast.remove();

        }

        const toast = document.createElement("div");

        toast.id = "cbnhToast";

        toast.className = `toast align-items-center text-bg-${type} border-0 position-fixed`;

        toast.style.top = "20px";

        toast.style.right = "20px";

        toast.style.zIndex = "1080";

        toast.innerHTML = `

            <div class="d-flex">

                <div class="toast-body">

                    ${message}

                </div>

                <button type="button"
                        class="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast">

                </button>

            </div>

        `;

        document.body.appendChild(toast);

        const bsToast = new bootstrap.Toast(toast, {

            delay:2500

        });

        bsToast.show();

        toast.addEventListener("hidden.bs.toast", () => {

            toast.remove();

        });

    },

    /*=====================================================
    SAVE PRODUCT AS FAVOURITE
    =====================================================*/

    saveFavouriteProduct(card) {

        const productName =

            card.querySelector("h4")?.textContent.trim();

        if (!productName) return;

        if (

            !this.state.favouriteProducts.includes(

                productName

            )

        ) {

            this.state.favouriteProducts.push(

                productName

            );

            this.saveLocalStorage();

            this.showToast(

                "Product added to favourites."

            );

        }

    },

    /*=====================================================
    TOGGLE LOADING STATE
    =====================================================*/

    setLoadingState(status) {

        this.state.isLoading = status;

        if (status) {

            document.body.classList.add(

                "cbnh-loading"

            );

        } else {

            document.body.classList.remove(

                "cbnh-loading"

            );

        }

    },

    /*=====================================================
    SIMULATE DATA REFRESH
    =====================================================*/

    refreshNeighbourhoodData() {

        this.setLoadingState(true);

        setTimeout(() => {

            this.setLoadingState(false);

            this.showToast(

                "Neighbourhood updated successfully."

            );

        }, 1200);

    },

    /*=====================================================
    STORE RECENT PRODUCT
    =====================================================*/

    storeRecentProduct(card) {

        const productName =

            card.querySelector("h4")?.textContent.trim();

        if (!productName) return;

        let recentProducts = JSON.parse(

            localStorage.getItem(

                "yoviRecentProducts"

            ) || "[]"

        );

        recentProducts = recentProducts.filter(

            item => item !== productName

        );

        recentProducts.unshift(productName);

        recentProducts = recentProducts.slice(0, 10);

        localStorage.setItem(

            "yoviRecentProducts",

            JSON.stringify(recentProducts)

        );

    },

    /*=====================================================
    HANDLE PAGE VISIBILITY
    =====================================================*/

    handleVisibilityChange() {

        if (document.hidden) {

            this.saveLocalStorage();

            return;

        }

        this.refreshPageState();

    },

    /*=====================================================
    HANDLE WINDOW RESIZE
    =====================================================*/

    handleWindowResize() {

        let resizeTimer;

        window.addEventListener("resize", () => {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {

                document.body.classList.add(

                    "cbnh-resizing"

                );

                setTimeout(() => {

                    document.body.classList.remove(

                        "cbnh-resizing"

                    );

                }, 150);

            }, 100);

        });

    },

    /*=====================================================
    REGISTER GLOBAL EVENTS
    =====================================================*/

    registerGlobalEvents() {

        document.addEventListener(

            "visibilitychange",

            this.handleVisibilityChange.bind(this)

        );

        window.addEventListener(

            "beforeunload",

            () => {

                this.saveLocalStorage();

            }

        );

        this.handleWindowResize();

    },

    /*=====================================================
    DESTROY
    =====================================================*/

    destroy() {

        this.saveLocalStorage();

    }

};

/*=========================================================
APPLICATION START
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        BuyerNeighbourhood.init();

        BuyerNeighbourhood.registerGlobalEvents();

    }

);





































/* ==========================================================
   PROVIDER DASHBOARD
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
       PAGE CHECK
    ========================================================== */

    if (!document.getElementById("yoviProviderDashboardPage")) {
        return;
    }

    /* ==========================================================
       ELEMENTS
    ========================================================== */

    const ypdAvailabilityButton =
        document.getElementById("ypdAvailabilityButton");

    const ypdCalendarPrev =
        document.getElementById("ypdCalendarPrev");

    const ypdCalendarNext =
        document.getElementById("ypdCalendarNext");

    const ypdCalendarGrid =
        document.getElementById("ypdCalendarGrid");

    const ypdNewsletterForm =
        document.getElementById("ypdNewsletterForm");

    const ypdStatCards =
        document.querySelectorAll(".ypd-stat-card");

    const ypdDashboardCards =
        document.querySelectorAll(".ypd-dashboard-card");

    const ypdSidebarLinks =
        document.querySelectorAll(".ypd-sidebar-menu a");

    /* ==========================================================
       PAGE ENTRANCE ANIMATION
    ========================================================== */

    ypdStatCards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";

        setTimeout(() => {

            card.style.transition =
                "all .5s ease";

            card.style.opacity = "1";
            card.style.transform =
                "translateY(0)";

        }, index * 120);

    });

    ypdDashboardCards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";

        setTimeout(() => {

            card.style.transition =
                "all .6s ease";

            card.style.opacity = "1";
            card.style.transform =
                "translateY(0)";

        }, 500 + (index * 150));

    });

    /* ==========================================================
       ACTIVE SIDEBAR
    ========================================================== */

    ypdSidebarLinks.forEach(link => {

        link.addEventListener("click", function () {

            ypdSidebarLinks.forEach(item => {

                item.classList.remove("active");

            });

            this.classList.add("active");

        });

    });

    /* ==========================================================
       AVAILABILITY STATUS
    ========================================================== */

    let ypdAvailable = true;

    ypdAvailabilityButton?.addEventListener("click", () => {

        ypdAvailable = !ypdAvailable;

        const ypdIndicator =
            ypdAvailabilityButton.querySelector("span");

        if (ypdAvailable) {

            ypdAvailabilityButton.innerHTML = `
                <span></span>
                Available Now
            `;

            ypdAvailabilityButton.style.background =
                "#16A34A";

            ypdAvailabilityButton.style.boxShadow =
                "0 12px 26px rgba(22,163,74,.25)";

        } else {

            ypdAvailabilityButton.innerHTML = `
                <span></span>
                Busy
            `;

            ypdAvailabilityButton.style.background =
                "#EF4444";

            ypdAvailabilityButton.style.boxShadow =
                "0 12px 26px rgba(239,68,68,.25)";

        }

    });

    /* ==========================================================
       STATISTICS COUNTER ANIMATION
    ========================================================== */

    function ypdAnimateCounter(element, target, duration = 1500) {

        let start = 0;

        const increment = target / (duration / 16);

        function updateCounter() {

            start += increment;

            if (start < target) {

                element.textContent = Math.floor(start);

                requestAnimationFrame(updateCounter);

            } else {

                element.textContent = target;

            }

        }

        updateCounter();

    }

    ypdStatCards.forEach(card => {

        const value = card.querySelector("h2");

        if (!value) return;

        const text = value.textContent.trim();

        if (/^\d+$/.test(text)) {

            ypdAnimateCounter(value, parseInt(text));

        }

    });

    /* ==========================================================
       CARD HOVER EFFECT
    ========================================================== */

    ypdStatCards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform =
                "translateY(-8px) scale(1.02)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "translateY(0) scale(1)";

        });

    });

    /* ==========================================================
       DASHBOARD CARD RIPPLE EFFECT
    ========================================================== */

    ypdDashboardCards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            card.style.background = `
                radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(22,163,74,.06),
                    #FFFFFF 60%
                )
            `;

        });

        card.addEventListener("mouseleave", () => {

            card.style.background = "#FFFFFF";

        });

    });

    /* ==========================================================
       NOTIFICATION ICON ANIMATION
    ========================================================== */

    const ypdNotificationDot =
        document.querySelector(".ypd-notification-dot");

    if (ypdNotificationDot) {

        setInterval(() => {

            ypdNotificationDot.animate([

                {
                    transform: "scale(1)"
                },

                {
                    transform: "scale(1.45)"
                },

                {
                    transform: "scale(1)"
                }

            ], {

                duration: 900

            });

        }, 3500);

    }

    /* ==========================================================
       WELCOME MESSAGE
    ========================================================== */

    setTimeout(() => {

        console.log(
            "Welcome to the YOVI Provider Dashboard."
        );

    }, 800);

    /* ==========================================================
       CALENDAR NAVIGATION
    ========================================================== */

    const ypdMonthNames = [

        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"

    ];

    let ypdCurrentMonth = 5;
    let ypdCurrentYear = 2026;

    const ypdCalendarTitle =
        document.querySelector(".ypd-calendar-header h4");

    function ypdUpdateCalendarTitle(){

        if(!ypdCalendarTitle) return;

        ypdCalendarTitle.textContent =
            `${ypdMonthNames[ypdCurrentMonth]} ${ypdCurrentYear}`;

    }

    ypdCalendarPrev?.addEventListener("click",()=>{

        ypdCurrentMonth--;

        if(ypdCurrentMonth < 0){

            ypdCurrentMonth = 11;
            ypdCurrentYear--;

        }

        ypdUpdateCalendarTitle();

    });

    ypdCalendarNext?.addEventListener("click",()=>{

        ypdCurrentMonth++;

        if(ypdCurrentMonth > 11){

            ypdCurrentMonth = 0;
            ypdCurrentYear++;

        }

        ypdUpdateCalendarTitle();

    });

    ypdUpdateCalendarTitle();

    /* ==========================================================
       CALENDAR DAY SELECTION
    ========================================================== */

    const ypdCalendarDays =
        document.querySelectorAll(".ypd-day");

    ypdCalendarDays.forEach(day=>{

        day.addEventListener("click",function(){

            ypdCalendarDays.forEach(item=>{

                if(!item.classList.contains("today")){

                    item.classList.remove("selected");

                }

            });

            if(!this.classList.contains("today")){

                this.classList.add("selected");

            }

        });

    });

    /* ==========================================================
       BOOKED DAY TOOLTIP
    ========================================================== */

    document
        .querySelectorAll(".ypd-day.booked")
        .forEach(day=>{

            day.title="You already have bookings on this date.";

        });

    /* ==========================================================
       TODAY TOOLTIP
    ========================================================== */

    const ypdToday =
        document.querySelector(".ypd-day.today");

    if(ypdToday){

        ypdToday.title="Today's Schedule";

    }

    /* ==========================================================
       NEWSLETTER FORM
    ========================================================== */

    ypdNewsletterForm?.addEventListener("submit",function(e){

        e.preventDefault();

        const input =
            this.querySelector("input");

        const email =
            input.value.trim();

        if(email===""){

            alert("Please enter your email address.");

            input.focus();

            return;

        }

        const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailPattern.test(email)){

            alert("Please enter a valid email address.");

            input.focus();

            return;

        }

        const button =
            this.querySelector("button");

        const originalText =
            button.innerHTML;

        button.disabled=true;

        button.innerHTML=`
            <span class="spinner-border spinner-border-sm me-2"></span>
            Subscribing...
        `;

        setTimeout(()=>{

            button.disabled=false;

            button.innerHTML=originalText;

            alert("Newsletter subscription successful!");

            input.value="";

        },1800);

    });

    /* ==========================================================
       CALENDAR FADE ANIMATION
    ========================================================== */

    function ypdAnimateCalendar(){

        if(!ypdCalendarGrid) return;

        ypdCalendarGrid.animate(

            [

                {

                    opacity:.3,

                    transform:"translateY(15px)"

                },

                {

                    opacity:1,

                    transform:"translateY(0)"

                }

            ],

            {

                duration:350,

                easing:"ease-out"

            }

        );

    }

    ypdCalendarPrev?.addEventListener("click",ypdAnimateCalendar);

    ypdCalendarNext?.addEventListener("click",ypdAnimateCalendar);

    /* ==========================================================
       LIVE GREETING
    ========================================================== */

    function ypdUpdateGreeting() {

        const hour = new Date().getHours();

        let greeting = "Welcome";

        if (hour < 12) {

            greeting = "Good Morning";

        } else if (hour < 17) {

            greeting = "Good Afternoon";

        } else {

            greeting = "Good Evening";

        }

        const pageTitle =
            document.querySelector(".ypd-page-title");

        if (pageTitle) {

            pageTitle.textContent =
                `${greeting}, Emeka`;

        }

    }

    ypdUpdateGreeting();

    /* ==========================================================
       ACTIVE PAGE DETECTION
    ========================================================== */

    const currentPage =
        window.location.pathname
        .split("/")
        .pop();

    ypdSidebarLinks.forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {

            ypdSidebarLinks.forEach(item => {

                item.classList.remove("active");

            });

            link.classList.add("active");

        }

    });

    /* ==========================================================
       SCROLL TO TOP
    ========================================================== */

    window.addEventListener("scroll", () => {

        if (window.scrollY > 150) {

            document.body.classList.add(
                "ypd-page-scrolled"
            );

        } else {

            document.body.classList.remove(
                "ypd-page-scrolled"
            );

        }

    });

    /* ==========================================================
       DASHBOARD CARD ENTRANCE
    ========================================================== */

    const ypdObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "ypd-card-visible"
                    );

                }

            });

        },

        {

            threshold: 0.2

        }

    );

    ypdDashboardCards.forEach(card => {

        ypdObserver.observe(card);

    });

    /* ==========================================================
       KEYBOARD SHORTCUTS
    ========================================================== */

    document.addEventListener("keydown", event => {

        if (event.altKey && event.key === "1") {

            window.location.href =
                "provider/provider-dashboard.html";

        }

        if (event.altKey && event.key === "2") {

            window.location.href =
                "provider-bookings.html";

        }

        if (event.altKey && event.key === "3") {

            window.location.href =
                "provider-services.html";

        }

        if (event.altKey && event.key === "4") {

            window.location.href =
                "provider-settings.html";

        }

    });

    /* ==========================================================
       REFRESH STATISTICS ANIMATION
    ========================================================== */

    function ypdRefreshStats() {

        ypdStatCards.forEach(card => {

            card.animate(

                [

                    {

                        transform: "scale(1)"

                    },

                    {

                        transform: "scale(1.04)"

                    },

                    {

                        transform: "scale(1)"

                    }

                ],

                {

                    duration: 700,

                    easing: "ease"

                }

            );

        });

    }

    setInterval(

        ypdRefreshStats,

        30000

    );

    /* ==========================================================
       ACCESSIBILITY
    ========================================================== */

    document
        .querySelectorAll("button,a")
        .forEach(element => {

            element.addEventListener("focus", () => {

                element.classList.add(
                    "ypd-focus-visible"
                );

            });

            element.addEventListener("blur", () => {

                element.classList.remove(
                    "ypd-focus-visible"
                );

            });

        });

    /* ==========================================================
       LOADING COMPLETE
    ========================================================== */

    document.body.classList.add(
        "ypd-dashboard-loaded"
    );

    /* ==========================================================
       LOGOUT CONFIRMATION
    ========================================================== */

    const ypdSignOutButton =
        document.getElementById("ypdSignOutButton");

    ypdSignOutButton?.addEventListener("click", function (event) {

        event.preventDefault();

        const confirmLogout = confirm(
            "Are you sure you want to sign out?"
        );

        if (confirmLogout) {

            localStorage.removeItem("yoviCurrentUser");
            localStorage.removeItem("yoviProviderSession");

            window.location.href = "/index.html";

        }

    });

    /* ==========================================================
       SAVE AVAILABILITY STATUS
    ========================================================== */

    if (ypdAvailabilityButton) {

        const savedStatus =
            localStorage.getItem("yoviProviderAvailability");

        if (savedStatus === "busy") {

            ypdAvailable = false;

            ypdAvailabilityButton.innerHTML = `
                <span></span>
                Busy
            `;

            ypdAvailabilityButton.style.background =
                "#EF4444";

            ypdAvailabilityButton.style.boxShadow =
                "0 12px 26px rgba(239,68,68,.25)";

        }

        ypdAvailabilityButton.addEventListener("click", () => {

            localStorage.setItem(

                "yoviProviderAvailability",

                ypdAvailable ? "available" : "busy"

            );

        });

    }

    /* ==========================================================
       REMEMBER NEWSLETTER EMAIL
    ========================================================== */

    const ypdNewsletterInput =
        document.querySelector(
            "#ypdNewsletterForm input[type='email']"
        );

    if (ypdNewsletterInput) {

        const savedEmail =
            localStorage.getItem("yoviNewsletterEmail");

        if (savedEmail) {

            ypdNewsletterInput.value = savedEmail;

        }

        ypdNewsletterInput.addEventListener("blur", () => {

            localStorage.setItem(

                "yoviNewsletterEmail",

                ypdNewsletterInput.value.trim()

            );

        });

    }

    /* ==========================================================
       CARD CLICK EFFECT
    ========================================================== */

    ypdStatCards.forEach(card => {

        card.addEventListener("click", () => {

            card.animate(

                [

                    {
                        transform: "scale(1)"
                    },

                    {
                        transform: "scale(.96)"
                    },

                    {
                        transform: "scale(1)"
                    }

                ],

                {

                    duration: 220

                }

            );

        });

    });

    /* ==========================================================
       AUTO SCROLL TO TOP
    ========================================================== */

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

    /* ==========================================================
       DASHBOARD INITIALIZED
    ========================================================== */

    console.log(
        "%cYOVI Provider Dashboard Loaded Successfully",
        "color:#16A34A;font-size:14px;font-weight:bold;"
    );

    console.log(
        "Provider Dashboard Version 1.0.0"
    );

    console.log(
        "Current User: Service Provider"
    );

    /* ==========================================================
       END OF PROVIDER DASHBOARD
    ========================================================== */

});