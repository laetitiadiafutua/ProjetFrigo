// Serveur Node.js (Express)
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const port = 3002;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Root",
  database: "frigo_recettes",
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
  } else {
    console.log("Connecté à la base de données MySQL");
  }
});

// Route de test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Route GET pour récupérer les produits
app.get("/produits", (req, res) => {
  const sql = "SELECT * FROM produits";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des produits :", err);
      res.status(500).send("Erreur lors de la récupération des produits");
    } else {
      console.log("Produits récupérés :", results);
      res.json(results);
    }
  });
});

// Route GET pour récupérer les recettes
app.get("/recettes", (req, res) => {
  const sql = "SELECT * FROM recettes";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des recettes :", err);
      res.status(500).send("Erreur lors de la récupération des recettes");
    } else {
      console.log("Recettes récupérées :", results);
      res.json(results);
    }
  });
});

// Route POST pour ajouter un produit
app.post("/AjouterProduits", (req, res) => {
  const { nom, date_expiration, quantite, categorie } = req.body;
  if (!nom || !date_expiration || !quantite || !categorie) {
    return res.status(400).send("Les informations du produit sont incomplètes");
  }

  const sql = `INSERT INTO produits (nom, quantite, date_expiration, categorie) VALUES (?, ?, ?, ?)`;
  db.query(sql, [nom, quantite, date_expiration, categorie], (err, results) => {
    if (err) {
      console.error("Erreur lors de l'ajout du produit :", err);
      res.status(500).send("Erreur lors de l'ajout du produit");
    } else {
      res.json({ message: "Produit ajouté avec succès", results });
    }
  });
});

// Route POST pour ajouter une recette
app.post("/recettes", (req, res) => {
  const { nom, ingredients, instructions, difficulte, temps_preparation } =
    req.body;
  if (
    !nom ||
    !ingredients ||
    !instructions ||
    !difficulte ||
    !temps_preparation
  ) {
    return res
      .status(400)
      .send("Les informations de la recette sont incomplètes");
  }

  const sql = `INSERT INTO recettes (nom, ingredients, instructions, difficulte, temps_preparation) VALUES (?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [nom, ingredients, instructions, difficulte, temps_preparation],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de l'ajout de la recette :", err);
        res.status(500).send("Erreur lors de l'ajout de la recette");
      } else {
        res.json({ message: "Recette ajoutée avec succès", results });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});

// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql2"); // Importation de mysql2 avec l'API Promise
// const app = express();
// const port = 3001;

// // Configuration de CORS
// app.use(express.json()); // Autorisation  des requêtes JSON
// app.use(cors());

// // Configuration pour la base de données
// const dbConfig = {
//   host: "localhost",
//   user: "root",
//   password: "Root",
//   database: "frigo_recettes",
// };

// // Fonction asynchrone pour les requêtes SQL
// // async function runQueries() {
// //   try {
// //     const db = await mysql.createConnection(dbConfig); // Connexion à la base de données

// //     // Requêtes SQL
// //     const [databases] = await db.query("SHOW DATABASES");
// //     console.log("Bases de données:", databases);

// //     const [tables] = await db.query("SHOW TABLES");
// //     console.log("Tables:", tables);

// //     const [produits] = await db.query("DESCRIBE produits");
// //     console.log("Description de la table Produits:", produits);

// //     const [recettes] = await db.query("DESCRIBE recettes");
// //     console.log("Description de la table Recettes:", recettes);

// //     const [filteredResults] = await db.query(
// //       "SELECT * FROM `produits` WHERE `quantite` = 5"
// //     );
// //     console.log("Résultats filtrés:", filteredResults);

// //     // await db.end(); // Fermer la connexion après toutes les requêtes
// //   } catch (err) {
// //     console.error("Erreur lors de l'exécution des requêtes SQL:", err);
// //   }
// // }

// // Exécution des requêtes au démarrage du serveur
// //runQueries();
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Root",
//   database: "frigo_recettes",
// });

// // Route des test (route=racine de notre serveur)
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// // Route qui gère les requêtes GET sur "/produits"
// app.get("/produits", (req, res) => {
//   const mysql = "SELECT * FROM produits"; // Requête SQL pour sélectionner tous les produits
//   // Exécution de la requête SQL
//   db.query(mysql, (err, results) => {
//     if (err) {
//       console.log("Oups, Erreur", err);
//       res.status(500).send("Erreur lors de la récupération des produits");
//     } else {
//       // console.log("Voici le résultat", results);
//       // Envoi de la liste des produits en réponse
//       res.send(results);
//     }
//   });
// });

// // Route GET pour "/recettes"
// app.get("/recettes", (req, res) => {
//   const mysql = "SELECT * FROM recettes"; // Requête SQL pour sélectionner tous les recettes
//   db.query(mysql, (err, results) => {
//     if (err) {
//       console.log("Oups, Erreur", err);
//       res.status(500).send("Erreur lors de la récupération des recettes");
//     } else {
//       // console.log("Voici le résultat", results);
//       // Logique pour la route POST ici
//       res.send(results);
//     }
//   });
// });

// // Route POST pour "/AjouterProduits"
// // Ajouter plusieurs ingrédients (produits) en une seule opération
// // Requête SQL : Insère plusieurs produits dans la table 'produits' en une seule requête
// app.post("/AjouterProduits", (req, res) => {
//   const { nom, date_expiration, quantite, categorie } = req.body;
//   console.log(nom, date_expiration, quantite, categorie);
//   db.query(
//     `INSERT INTO produits
//  (nom, quantite, date_expiration, categorie)
//  VALUES ('${nom}','${quantite}', '${date_expiration}', '${categorie}')`,
//     function (err, results, fields) {
//       console.log("Resultats", results, err, fields);
//       res.send("Requete post execute");
//     }
//   );
// });

// // Endpoint : POST /recettes/bulk
// // But : Ajouter plusieurs recettes en une seule opération
// // Requête SQL : Insère plusieurs recettes dans la table 'recettes' en une seule requête
// app.post("/recettes", (req, res) => {
//   const recettes = req.body; // Liste des recettes envoyées dans le body
//   console.log(nom, ingredients, instructions, difficulte, temps_preparation);
//   const sql =
//     "INSERT INTO recettes (nom, ingredients, instructions, difficulte, temps_preparation) VALUES ?";
//   db.query(
//     `INSERT INTO produits
//    (nom, quantite, date_expiration, categorie)
//    VALUES ('${nom}','${ingredients}', '${instructions}', '${difficulte}''${temps_preparation}')`,
//     function (err, results, fields) {
//       console.log("Resultats", results, err, fields);
//       res.send("Recettes ajoutées avec succès");
//     }
//   );
// });

// const valeurs = recettes.map((recette) => [
//   recette.nom,
//   recette.ingredients,
//   recette.instructions,
//   recette.difficulte,
//   recette.temps_preparation,
// ]);

// db.query(sql, [valeurs], (err, result) => {
//   if (err) {
//     console.error("Erreur lors de l'ajout des recettes :", err);
//     res.status(500).send("Erreur lors de l'ajout des recettes");
//   } else {
//     res.json({
//       message: "Recettes ajoutées avec succès",
//       affectedRows: result.affectedRows,
//     });
//   }
// });

// app.post("/AjouterProduits", (req, res) => {
//   const { nom, date_expiration, quantite, categorie } = req.body;
//   console.log(nom, date_expiration, quantite, categorie);
//   db.query(
//     `INSERT INTO produits (nom, quantite, date_expiration, categorie) VALUES ${nom},${quantite},${date_expiration},${categorie}`,
//     function (err, results) {
//       console.log("Resultats", results);
//       res.send(`Requete post execute,${results}`);
//     }
//   );
// });

// app.post("/AjouterProduits", (req, res) => {
//   const { nom, date_expiration, quantite, categorie } = req.body;

//   console.log("Received data:", { nom, date_expiration, quantite, categorie });

//   db.query(
//     `INSERT INTO produits (nom, quantite, date_expiration, categorie) VALUES (?, ?, ?, ?)`,
//     [nom, quantite, date_expiration, categorie],
//     (err, results) => {
//       if (err) {
//         console.error(
//           "Erreur lors de l'insertion dans la base de données",
//           err
//         );
//         return res.status(500).send("Erreur lors de l'insertion");
//       }
//       console.log("Resultats", results);
//       res.send(
//         `Requête post exécutée, ID du produit ajouté : ${results.insertId}`
//       );
//     }
//   );
// });

// // Route POST pour "/AjouterProduits"
// // But : Ajouter plusieurs ingrédients (produits) en une seule opération
// // Requête SQL : Insère plusieurs produits dans la table 'produits' en une seule requête
// app.post('/AjouterProduits', (req, res) => {
//   const { nom, date_expiration, quantite, categorie } = req.body;
//   console.log(nom, date_expiration, quantite, categorie);
//   db.query(`INSERT INTO produits
//  (nom, quantite, date_expiration, categorie)
//  VALUES ('${nom}','${quantite}', '${date_expiration}', '${categorie}')`,
//     function (err, results, fields) {
//       console.log("Resultats", results, err, fields);
//       res.send('Requete post execute');
//     }
//   );
// });

// Route POST pour "/AjouterProduits"
// But : Ajouter plusieurs ingrédients (produits) en une seule opération
// Requête SQL : Insère plusieurs produits dans la table 'produits' en une seule requête

// Route POST pour "/AjouterRecettes"
// But : Ajouter plusieurs ingrédients (produits) en une seule opération
// Requête SQL : Insère plusieurs produits dans la table 'produits' en une seule requête
// app.post("/AjouterRecettes", (req, res) => {
//   const ingredients = req.body; // Liste des ingrédients envoyés dans le body
//   const sql =
//     "INSERT INTO produits (nom, quantite, date_expiration, categorie) VALUES ?";
//   const valeurs = ingredients.map((ingredient) => [
//     ingredient.nom,
//     ingredient.quantite,
//     ingredient.date_expiration,
//     ingredient.categorie,
//   ]);

//   db.query(sql, [valeurs], (err, result) => {
//     if (err) {
//       console.error("Erreur lors de l'ajout des ingrédients :", err);
//       res.status(500).send("Erreur lors de l'ajout des ingrédients");
//     } else {
//       res.json({
//         message: "Ingrédients ajoutés avec succès",
//         affectedRows: result.affectedRows,
//       });
//     }
//   });
// });

// // Endpoint : GET /recettes_disponibles
// // But : Trouver les recettes réalisables avec les ingrédients disponibles dans le frigo
// // Requêtes SQL :
// // 1. Sélectionne les noms des produits dans le frigo
// // 2. Sélectionne toutes les recettes
// app.get("/recettes_disponibles", (req, res) => {
//   const sqlProduits = "SELECT nom FROM produits"; // Récupérer tous les produits du frigo

//   db.query(sqlProduits, (err, produits) => {
//     if (err) {
//       console.error("Erreur lors de la récupération des produits:", err);
//       res.status(500).send("Erreur lors de la récupération des produits");
//       return;
//     }

//     // Crée une liste d'ingrédients disponibles dans le frigo
//     const ingredientsFrigo = produits.map((p) => p.nom.toLowerCase());
//     // Puis exécute une seconde requête pour obtenir les recettes
//     const sqlRecettes =
//       "SELECT nom, ingredients, instructions, temps_preparation, difficulte FROM recettes";
//     db.query(sqlRecettes, (err, recettes) => {
//       if (err) {
//         console.error("Erreur lors de la récupération des recettes:", err);
//         res.status(500).send("Erreur lors de la récupération des recettes");
//         return;
//       }

//       // Filtrer les recettes réalisables
//       const recettesDisponibles = recettes.filter((recette) => {
//         const ingredientsRecette = recette.ingredients
//           .toLowerCase()
//           .split(", ");
//         // Vérifie si tous les ingrédients de la recette sont dans le frigo
//         return ingredientsRecette.every((ingredient) =>
//           ingredientsFrigo.includes(ingredient)
//         );
//       });

//       // Renvoie les recettes réalisables avec les informations supplémentaires
//       const result = recettesDisponibles.map((recette) => ({
//         nom: recette.nom,
//         instructions: recette.instructions,
//         temps_preparation: recette.temps_preparation,
//         difficulte: recette.difficulte,
//         ingredients: recette.ingredients,
//       }));

//       res.json(result); // Renvoie les recettes réalisables
//     });
//   });
// });

// Démarrage du serveur
app.listen(3001, () => {
  console.log("Serveur backend sur le port 3001");
});
