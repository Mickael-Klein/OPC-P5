/* Scripts permettant l' affichage du produit sélectionné depuis la page d'index grâce au paramètre passé dans son url et l'ajout d'éléments au panier via localstorage */


/* I Script permettant l' affichage du produit sélectionné depuis la page d'index grâce au paramètre passé dans son url */

let param = (new URL(document.location)).searchParams;
let id = param.get("id"); /* Recupération de l'id passé dans l'url ?id=xxx dans une variable id */

fetch("http://localhost:3000/api/products/" + id)
    .then(function(res) {
        if(res.ok) {
            return res.json();  /*retourne les données au format json si le status code est compris entre 200 et 299 (.ok --> .json() ) */
        }
    })
    .then(jsonArticle => {
        let article = new Article(jsonArticle); /* Création d' une instance de la classe Article */

        /* Ajout du contenu HTML avec les informations nécéssaires prises dans l' Article */
        document.querySelector(".item__img").innerHTML += `<img src=${article.imageUrl} alt=${article.altTxt}>`;
        document.querySelector("#title").innerHTML += `${article.name}`;
        document.querySelector("#price").innerHTML += `${article.price}`;
        document.querySelector("#description").innerHTML += `${article.description}`;

        article.colors.map(color => document.querySelector("#colors").innerHTML += `<option value="${color}">${color}</option>`); /* Ajout du contenu HTML option en itérant sur l'array colors grâce à la fonction map */

    })
    .catch(err => console.log(err));



    /* Scripts permettant l'ajout d'éléments au panier via localstorage */

    let Product = {};

    const btn = document.querySelector("#addToCart");
    btn.addEventListener("click", (e) => {
    const color = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;
    if(color == "" || color == null || quantity == null || quantity <= 0) {
        alert("Veuillez sélectionner une couleur et une quantité valides")
    }else {
        Product = {
            color: color,
            quantity: Number(quantity),
            id: id
        };
        addCart(Product);
    }
    })