/*
=========================================================
 Verification Submitted 
=========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /*=====================================================
      SELECTORS
    =====================================================*/
    const mobileToggle = document.querySelector(".mobile-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    const dashboardBtn = document.querySelector(".dashboard-btn");
    const trustBtn = document.querySelector(".trust-btn");

    const reviewItems = document.querySelectorAll(".review-item");
    const successCircle = document.querySelector(".success-circle");
    const statusBadge = document.querySelector(".status-badge");

    /*=====================================================
      MOBILE MENU
    =====================================================*/
    if (mobileToggle) {

        mobileToggle.addEventListener("click", () => {

            mobileMenu.classList.toggle("show");

            const icon = mobileToggle.querySelector("i");

            if (mobileMenu.classList.contains("show")) {

                icon.classList.remove("bi-list");
                icon.classList.add("bi-x-lg");

            } else {

                icon.classList.remove("bi-x-lg");
                icon.classList.add("bi-list");

            }

        });

    }

    /*=====================================================
      CLOSE MOBILE MENU WHEN LINK IS CLICKED
    =====================================================*/
    document.querySelectorAll(".mobile-menu a").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("show");

            const icon = mobileToggle.querySelector("i");

            icon.classList.remove("bi-x-lg");
            icon.classList.add("bi-list");

        });

    });

    /*=====================================================
      SUCCESS ICON ENTRANCE
    =====================================================*/
    successCircle.style.transform = "scale(0)";
    successCircle.style.opacity = "0";

    setTimeout(() => {

        successCircle.style.transition = "all .6s ease";
        successCircle.style.transform = "scale(1)";
        successCircle.style.opacity = "1";

    }, 150);

    /*=====================================================
      STATUS BADGE ENTRANCE
    =====================================================*/
    if (statusBadge) {

        statusBadge.style.opacity = "0";
        statusBadge.style.transform = "translateY(-10px)";

        setTimeout(() => {

            statusBadge.style.transition = ".5s ease";
            statusBadge.style.opacity = "1";
            statusBadge.style.transform = "translateY(0)";

        }, 700);

    }

    /*=====================================================
      REVIEW ITEMS STAGGER ANIMATION
    =====================================================*/
    reviewItems.forEach((item, index) => {

        item.style.opacity = "0";
        item.style.transform = "translateY(25px)";

        setTimeout(() => {

            item.style.transition = ".5s ease";

            item.style.opacity = "1";

            item.style.transform = "translateY(0)";

        }, 300 + (index * 180));

    });

    /*=====================================================
      DASHBOARD BUTTON
    =====================================================*/
    dashboardBtn.addEventListener("click", function () {

        const original = this.innerHTML;

        this.disabled = true;

        this.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2"></span>
            Loading...
        `;

        setTimeout(() => {

            this.innerHTML = original;

            this.disabled = false;
  
         window.location.href = "../../seller/seller-dashboard.html";

        }, 1500);

    });

    /*=====================================================
      TRUST CENTRE BUTTON
    =====================================================*/
    trustBtn.addEventListener("click", function () {

        this.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2"></span>
            Opening...
        `;

        this.disabled = true;

        setTimeout(() => {

            this.disabled = false;

            this.innerHTML = "Trust Centre";

            // Replace with your page
            // window.location.href = "trust-centre.html";

            // alert("Redirect to Trust Centre");

        }, 1200);

    });

    /*=====================================================
      CARD HOVER EFFECT
    =====================================================*/
    reviewItems.forEach(item => {

        item.addEventListener("mouseenter", () => {

            item.style.transform = "translateX(6px)";
            item.style.transition = ".25s ease";

        });

        item.addEventListener("mouseleave", () => {

            item.style.transform = "translateX(0)";

        });

    });

    /*=====================================================
      AUTO UPDATE DEMO
      (Simulates review progress)
    =====================================================*/
    setTimeout(() => {

        const progressStatus = document.querySelector(".progress-status");

        if (progressStatus) {

            progressStatus.textContent = "Reviewing";

            progressStatus.style.background = "#DBEAFE";
            progressStatus.style.color = "#2563EB";

        }

    }, 5000);

    /*=====================================================
      PAGE FADE-IN
    =====================================================*/
    document.body.style.opacity = "0";

    setTimeout(() => {

        document.body.style.transition = ".5s ease";
        document.body.style.opacity = "1";

    }, 50);

});