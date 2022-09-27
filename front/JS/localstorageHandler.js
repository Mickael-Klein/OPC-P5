/* Fonctions permettant la manipulation du panier dans localestorage */


function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart() {
    let cart = localStorage.getItem("cart");
    if(cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

function productAlreadyInCart(product) {
    let cart = getCart();
    let found = false;
    for(let j in cart) {
        if(cart[j].id == product.id && cart[j].color == product.color) {
            found = true;
            return j;
            break;
        }
    }
    return found;
}

function addCart(product) {
    let cart = getCart();
    if(cart.length == 0) {
        cart.push(product);
    } else{
        let check = productAlreadyInCart(Product);
        if(check !== false) {
            cart[check].quantity += product.quantity;
        } else{
            cart.push(product);
        }
    }
    saveCart(cart);
}

/* function sortCart() {
    let cart = getCart();
    if(cart.length == 0) {
        saveCart();
    } else{
        cart = cart.sort((a,b) => a.id - b.id);
        saveCart();
    }
} */

function removeFromCart(product) {
    let cart = getCart();
    cart = cart.filter(p => p.id != product.id);
    saveCart(cart);
}

function changeQuantity(product, quantity) {
    let cart = getCart();
    let existingProduct = cart.find(p => p.id == product.id);
    if (existingProduct != undefined) {
        existingProduct.quantity += quantity;
        if(existingProduct.quantity <= 0) {
            removeFromCart(existingProduct);
        }else {
            saveCart(cart);
        }
    }
}