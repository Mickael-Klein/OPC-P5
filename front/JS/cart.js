 // Script permettant la modification de la quantité ou la supression d'élément dans le panier depuis la page panier 

 // Generer le recap produits dans panier 

function displayCart() {
    let cart = getCart();
    cart = cart.sort((a,b) => {a.id - b.id});
    console.log(cart);

    let anchorsArr = [];

    for(let i in cart) {
        let id = cart[i].id;
        fetch("http://localhost:3000/api/products/" + id)
        .then(function(res) {
            if(res.ok) {
                return res.json();  // retourne les données au format json si le status code est compris entre 200 et 299 (.ok --> .json() ) 
            }
        })
        .then(jsonArticle => {
            let article = new Article(jsonArticle);

            document.querySelector("#cart__items").innerHTML += `<article class="cart__item" data-id="${article._id}" data-color="${article.colors}">

                                                                    <div class="cart__item__img">
                                                                        <img src="${article.imageUrl}" alt="${article.altTxt}">
                                                                    </div>

                                                                    <div class="cart__item__content">

                                                                        <div class="cart__item__content__description">
                                                                            <h2>${article.name}</h2>
                                                                            <p>${cart[i].color}</p>
                                                                            <p>${article.price} €</p>
                                                                        </div>

                                                                        <div class="cart__item__content__settings">

                                                                            <div class="cart__item__content__settings__quantity">
                                                                                <p>Qté : ${cart[i].quantity}</p>
                                                                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantity}">
                                                                            </div>

                                                                            <div class="cart__item__content__settings__delete">
                                                                                <p class="deleteItem">Supprimer</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </article>`

            function createDeleteListener() {
                document.querySelectorAll(".deleteItem").forEach(btn => btn.addEventListener("click", function(event) {
                    let target = event.target.closest("article");
                    let targetId = event.target.closest("article").dataset.id;
                    let targetColor = target.querySelector(".cart__item__content__description p:first-of-type").textContent;
                    console.log(targetColor);
                    for(let j in cart) {
                        if(cart[j].id == targetId && cart[j].color == targetColor) {
                            cart.splice(cart[j], 1);
                            saveCart(cart);
                            target.remove();
                        }
                    }
                    console.log(cart.length);
                    /*
                    saveCart();
                    displayCart();
                    */                    
                    
                }));
            }
            createDeleteListener();

            function createQuantityListener() {
                document.querySelectorAll(".itemQuantity").forEach(item => item.addEventListener("change", function(event) {
                    console.log("Change detected !");
                    let target = event.target.closest("article");
                    let targetId = event.target.closest("article").dataset.id;
                    console.log(targetId);
                    let targetInput = event.target.value;
                    console.log(targetInput);
                    let targetColor = target.querySelector(".cart__item__content__description p:first-of-type").textContent;
                    console.log(targetColor);
                    for(let k in cart) {
                        if(cart[k].id == targetId && cart[k].color == targetColor) {
                            cart[k].quantity = targetInput;
                            saveCart(cart);
                        }
                    }
                    let targetQuantityToChange = event.target.closest(".cart__item__content__settings__quantity").innerHTML = `
                        <p>Qté : ${targetInput}</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantity}">
                    `;
                }));
            }
            createQuantityListener();
        })
        .catch(err => console.log(err));
    }
}

displayCart();


