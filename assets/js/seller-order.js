/*==========================================
TEMP CART STATUS
Change to true when testing cart page
==========================================*/

const hasCartItems = false;

/*==========================================
GLOBAL CART NAVIGATION
==========================================*/

document.querySelectorAll(".js-cart-link").forEach(function(cart){

    cart.addEventListener("click", function(e){

        e.preventDefault();

        if(hasCartItems){

            window.location.href = "../../cart/shopping-cart.html";

        }else{

            window.location.href = "../../cart/cart.html";

        }

    });

});