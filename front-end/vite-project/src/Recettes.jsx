import React, { useState, useEffect } from "react";
import axios from "axios";

const Recettes = () => {
  const [recettes, setRecettes] = useState([]); // Corrigez mesrecettes en recettes pour uniformiser

  // Fonction pour faire une requête GET à l'API et récupérer les produits
  const getRecettes = async () => {
    try {
      // Requête à l'API pour obtenir la liste des produits
      const response = await axios.get("http://localhost:3002/recettes");
      console.log(response.data); // Affiche la réponse de l'API dans la console
      setRecettes(response.data); // Met à jour l'état avec les données des produits reçues
    } catch (error) {
      console.error(error); // Affiche une erreur dans la console si la requête échoue
    }
  };

  // useEffect exécute le code de récupération des produits après le premier affichage du composant
  useEffect(() => {
    getRecettes(); // Appelle la fonction pour récupérer la liste des produits
  }, []); // Le tableau vide signifie que ça ne s'exécute qu'une fois au montage

  // Affichage du composant
  return (
    <div>
      <h1>Liste des Recettes</h1>
      {/* Boucle sur chaque produit et l'affiche dans un paragraphe */}
      {recettes.map((marecette) => (
        <ul key={marecette.id}>
          <li>
            {marecette.nom} - {marecette.instructions} - {marecette.difficulte}-{" "}
            {marecette.temps_preparation}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Recettes;
