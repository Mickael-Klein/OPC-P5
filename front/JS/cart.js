 // Script permettant la modification de la quantité ou la supression d'élément dans le panier depuis la page panier 

 // Generer le recap produits dans panier 

 let arr = [];
//  let cart = getCart();
//  cart = cart.sort((a,b) => a.id - b.id);
//  saveCart(cart);

 function generateProductArticleArray() {

    fetch("http://localhost:3000/api/products") 
        .then(function(res) {
            if(res.ok) {
                return res.json();  /*retourne les données au format json si le status code est compris entre 200 et 299 (.ok --> .json() ) */
            }
        })
        .then(jsonListArticle => {
            for(let jsonArticle of jsonListArticle) {
                let article = new Article(jsonArticle); /* boucle qui va itérer sur chaque élément pour en faire un instance de la classe Article */
                arr.push(article);
            }
            return arr;
        })
        .then(function(arr) {
            let cart = getCart();
            const targetNode = document.querySelector("#cart__items");
            for(let i in cart) {
                const found = arr.find(selected => selected._id == cart[i].id)

                const article = document.createElement("article");
                article.className = "cart__item";
                article.dataset.id = `${found._id}`;
                article.dataset.color = `${cart[i].color}`;

                article.innerHTML = `
                                        <div class="cart__item__img">
                                            <img src="${found.imageUrl}" alt="${found.description}">
                                        </div>

                                        <div class="cart__item__content">
                                            <div class="cart__item__content__description">
                                                <h2>${found.name}</h2>
                                                <p>${cart[i].color}</p>
                                                <p>${found.price} €</p>
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
                `
                targetNode.appendChild(article);
            }
        })
        .then(function removeElementOnClick() {
            const btnList = document.querySelectorAll(".deleteItem");
            let cart = getCart();
            btnList.forEach(btn => btn.addEventListener("click", function(event) {
                let targetArticle = event.target.closest("article");
                let targetId = targetArticle.dataset.id;
                let targetColor = targetArticle.dataset.color;
        
                for(let i in cart) {
                    if(cart[i].id == targetId && cart[i].color == targetColor) {
                        cart.splice(i, 1);
                        saveCart(cart);
                        break;
                    }
                }
                
                const targetNode = document.querySelector("#cart__items");
                targetNode.innerHTML = "";

                generateProductArticleArray();
            })); 
        })
        .then(function quantityModifier() {
            const modifierList = document.querySelectorAll(".itemQuantity");
            let cart = getCart();
            modifierList.forEach(modifier => modifier.addEventListener("change", function(event) {
                let changedValue = event.target.value;
                if(changedValue == 0) {
                    saveCart(cart);
                    const targetNode = document.querySelector("#cart__items");
                    targetNode.innerHTML = "";

                    generateProductArticleArray();
                }
                let targetArticle = event.target.closest("article");
                let targetId = targetArticle.dataset.id;
                let targetColor = targetArticle.dataset.color;

                for(let i in cart) {
                    if(cart[i].id == targetId && cart[i].color == targetColor) {
                        cart[i].quantity = changedValue;
                        saveCart(cart);
                        break;
                    }
                }

                const targetNode = event.target.closest(".cart__item__content__settings__quantity");
                const targetNodeP = targetNode.querySelector("p");

                targetNodeP.textContent = "";
                targetNodeP.textContent = `Qté : ${changedValue}`;
                

                // generateProductArticleArray();
            }));
        })
        // .catch(err => console.log(err));
        }
 


generateProductArticleArray();
