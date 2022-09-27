/* Création d'une classe article qui nous servira de support pour recevoir les données renvoyées par l'api et la création d'instances de cette classe pour leur manipulation ultèrieure */

class Article {
    constructor(jsonArticle) {
        jsonArticle && Object.assign(this, jsonArticle)
    }
};