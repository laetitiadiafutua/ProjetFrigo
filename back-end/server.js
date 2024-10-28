const express = require("express");
const cors = require("cors");
const app = express();
const port = 3002;
const mysql = require("mysql2");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Root",
  database: "frigo_recettes",
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
    throw err; // Arrête l'exécution si la connexion échoue
  }
  console.log("Connecté à MySQL avec mysql2");
});

app.use(express.json({ extended: false })); // CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (process.env.WHITELIST.indexOf(origin) === -1) {
        let message =
          "The CORS policy for this origin doesn't " +
          "allow access from the particular origin.";
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

app.get("/produits", (req, res) => {
  const sql = "SELECT * FROM produits";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération des produits:", err);
      res.status(500).send("Erreur lors de la récupération des produits");
    } else {
      res.json(result);
    }
  });
});

// Endpoint : POST /recettes/bulk
// But : Ajouter plusieurs recettes en une seule opération
// Requête SQL : Insère plusieurs recettes dans la table 'recettes' en une seule requête
app.post("/recettes/bulk", (req, res) => {
  const recettes = req.body; // Liste des recettes envoyées dans le body

  const sql =
    "INSERT INTO recettes (nom, ingredients, instructions, difficulte, temps_preparation) VALUES ?";

  const valeurs = recettes.map((recette) => [
    recette.nom,
    recette.ingredients,
    recette.instructions,
    recette.difficulte,
    recette.temps_preparation,
  ]);

  db.query(sql, [valeurs], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout des recettes :", err);
      res.status(500).send("Erreur lors de l'ajout des recettes");
    } else {
      res.json({
        message: "Recettes ajoutées avec succès",
        affectedRows: result.affectedRows,
      });
    }
  });
});

// Endpoint : GET /recettes_disponibles
// But : Trouver les recettes réalisables avec les ingrédients disponibles dans le frigo
// Requêtes SQL :
// 1. Sélectionne les noms des produits dans le frigo
// 2. Sélectionne toutes les recettes
app.get("/recettes_disponibles", (req, res) => {
  const sqlProduits = "SELECT nom FROM produits"; // Récupérer tous les produits du frigo

  db.query(sqlProduits, (err, produits) => {
    if (err) {
      console.error("Erreur lors de la récupération des produits:", err);
      res.status(500).send("Erreur lors de la récupération des produits");
      return;
    }

    // Crée une liste d'ingrédients disponibles dans le frigo
    const ingredientsFrigo = produits.map((p) => p.nom.toLowerCase());
    // Puis exécute une seconde requête pour obtenir les recettes
    const sqlRecettes =
      "SELECT nom, ingredients, instructions, temps_preparation, difficulte FROM recettes";
    db.query(sqlRecettes, (err, recettes) => {
      if (err) {
        console.error("Erreur lors de la récupération des recettes:", err);
        res.status(500).send("Erreur lors de la récupération des recettes");
        return;
      }

      // Filtrer les recettes réalisables
      const recettesDisponibles = recettes.filter((recette) => {
        const ingredientsRecette = recette.ingredients
          .toLowerCase()
          .split(", ");
        // Vérifie si tous les ingrédients de la recette sont dans le frigo
        return ingredientsRecette.every((ingredient) =>
          ingredientsFrigo.includes(ingredient)
        );
      });

      // Renvoie les recettes réalisables avec les informations supplémentaires
      const result = recettesDisponibles.map((recette) => ({
        nom: recette.nom,
        instructions: recette.instructions,
        temps_preparation: recette.temps_preparation,
        difficulte: recette.difficulte,
        ingredients: recette.ingredients,
      }));

      res.json(result); // Renvoie les recettes réalisables
    });
  });
});

// Endpoint : POST /ingredients/bulk
// But : Ajouter plusieurs ingrédients (produits) en une seule opération
// Requête SQL : Insère plusieurs produits dans la table 'produits' en une seule requête
app.post("/ingredients/bulk", (req, res) => {
  const ingredients = req.body; // Liste des ingrédients envoyés dans le body

  const sql =
    "INSERT INTO produits (nom, quantite, date_expiration, categorie) VALUES ?";

  const valeurs = ingredients.map((ingredient) => [
    ingredient.nom,
    ingredient.quantite,
    ingredient.date_expiration,
    ingredient.categorie,
  ]);

  db.query(sql, [valeurs], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout des ingrédients :", err);
      res.status(500).send("Erreur lors de l'ajout des ingrédients");
    } else {
      res.json({
        message: "Ingrédients ajoutés avec succès",
        affectedRows: result.affectedRows,
      });
    }
  });
});

// Démarrage du serveur
app.listen(3001, () => {
  console.log("Serveur backend sur le port 3001");
});
