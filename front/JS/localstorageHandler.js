/* Fonctions permettant la manipulation du panier dans localestorage */


function saveCart(cart) {
    for(let i in cart) {
        if(cart[i].quantity == 0) {
            cart.splice(i, 1);
        }
    }
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
    cart = cart.sort((a, b) => (a.id > b.id) ? 1 : -1);
    saveCart(cart);
}

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