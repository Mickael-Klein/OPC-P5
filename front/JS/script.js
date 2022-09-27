/* Script permettant l'import des produits depuis l'api et leur affichage sur la page index.html */

fetch("http://localhost:3000/api/products") 
.then(function(res) {
    if(res.ok) {
        return res.json();  /*retourne les données au format json si le status code est compris entre 200 et 299 (.ok --> .json() ) */
    }
})
.then(jsonListArticle => {
    for(let jsonArticle of jsonListArticle) {
        let article = new Article(jsonArticle); /* boucle qui va itérer sur chaque élément pour en faire un instance de la classe Article */
        document.querySelector(".items").innerHTML += `<a href="./product.html?id=${article._id}">
                                                    <article>
                                                            <img src=${article.imageUrl} alt=${article.altTxt}>
                                                            <h3 class="productName">${article.name}</h3>
                                                            <p class="productDescription">${article.description}</p>
                                                    </article>
                                             </a>`
    }
})
.catch(err => console.log(err));