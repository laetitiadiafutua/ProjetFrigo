import React, { useState, useEffect } from "react"; // Importer React et ses hooks pour gérer l'état et les effets
import axios from "axios"; // Importer axios, une bibliothèque pour faire des requêtes HTTP

// Définition du composant AfficherProduits
const AfficherProduits = () => {
  // Déclare un état pour stocker la liste des produits, initialisé comme un tableau vide
  const [mesproduits, setMesProduits] = useState([]);

  // Fonction pour faire une requête GET à l'API et récupérer les produits
  async function getAfficherProduits() {
    try {
      // Requête à l'API pour obtenir la liste des produits
      const response = await axios.get("http://localhost:3001/produits");
      console.log(response.data); // Affiche la réponse de l'API dans la console
      setMesProduits(response.data); // Met à jour l'état avec les données des produits reçues
    } catch (error) {
      console.error(error); // Affiche une erreur dans la console si la requête échoue
    }
  }

  // useEffect exécute le code de récupération des produits après le premier affichage du composant
  useEffect(() => {
    getAfficherProduits(); // Appelle la fonction pour récupérer la liste des produits
  }, []); // Le tableau vide signifie que ça ne s'exécute qu'une fois au montage

  // Affichage du composant
  return (
    <div>
      <h1>Liste des Produits</h1>
      {/* Boucle sur chaque produit et l'affiche dans un paragraphe */}
      {mesproduits.map((monproduit) => (
        <ul>
        <li key={monproduit.id}>
          {monproduit.nom} - {monproduit.quantite} en stock - Expire le{" "}
          {monproduit.date_expiration || "Aucune date"} - Catégorie :{" "}
          {monproduit.categorie}
        </li>
        </ul>
      ))}
    </div>
  );
};

export default AfficherProduits; // Exporte le composant pour pouvoir l'utiliser dans d'autres fichiers

