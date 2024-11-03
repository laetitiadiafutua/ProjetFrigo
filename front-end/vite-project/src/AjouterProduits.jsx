import React, { useState } from "react";

export const AjouterProduits = () => {
  function handleSubmitPlusPropre(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    fetch("http://localhost:3001/AjouterProduits", {
      method: form.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formJson),
    });
  }

  return (
    <div>
      <h1>Ajouter Produits</h1>
      <form method="post" onSubmit={handleSubmitPlusPropre}>
        <label htmlFor="nom">Nom</label>
        <input
          type="text"
          id="nom"
          name="nom"
          required
          minLength="4"
          maxLength="18"
          size="10"
          defaultValue=""
        />

        <label htmlFor="date_expiration">Date d'expiration</label>
        <input
          type="date"
          id="date_expiration"
          name="date_expiration"
          min="2018-01-01"
          max="2025-12-31"
          defaultValue="2018-01-01"
        />

        <label htmlFor="categorie">Categorie</label>
        <input
          type="text"
          id="categorie"
          name="categorie"
          required
          minLength="4"
          maxLength="8"
          size="10"
          defaultValue=""
        />

        <label htmlFor="quantite">Quantité</label>

        <input
          type="number"
          id="quantite"
          name="quantite"
          min="1"
          max="100"
          defaultValue="1"
        />

        <input type="submit" value="Rajouter le produit !" />
      </form>
    </div>
  );
};

// import React, { useState } from "react";

// export const AjouterProduits = () => {
//   // État pour les produits ajoutés
//   const [produits, setProduits] = useState([]);

//   // État pour les entrées du formulaire contrôlé
//   const [formData, setFormData] = useState({
//     nom: "",
//     date_expiration: "",
//     quantite: 1,
//     categorie: "",
//   });

//   // Gestion des changements d'entrée
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   async function handleSubmitPlusPropre(e) {
//     e.preventDefault(); // Empêcher l'envoi par défaut du formulaire
//     try {
//       const response = await fetch("http://localhost:3001/AjouterProduits", {
//         method: "POST", // Spécifier la méthode
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData), // Envoyer l'état contrôlé
//       });

//       if (!response.ok) {
//         throw new Error("Erreur lors de l'ajout du produit");
//       }

//       const result = await response.json(); // Supposons que la réponse soit au format JSON
//       console.log(result);

//       // Ajouter le produit à la liste des produits avec un id unique
//       setProduits((prevProduits) => [
//         ...prevProduits,
//         { ...formData, id: result.id }, // Ajouter un id unique
//       ]);

//       // Réinitialiser le formulaire après la soumission
//       setFormData({
//         nom: "",
//         date_expiration: "",
//         quantite: 1,
//         categorie: "",
//       });
//     } catch (error) {
//       console.error("Erreur de requête:", error);
//     }
//   }

//   return (
//     <div>
//       <h1>Ajouter Produits</h1>
//       <form method="post" onSubmit={handleSubmitPlusPropre}>
//         <label htmlFor="nom">Nom</label>
//         <input
//           type="text"
//           id="nom"
//           name="nom"
//           required
//           minLength="4"
//           maxLength="18"
//           size="10"
//           value={formData.nom} // Entrée contrôlée
//           onChange={handleChange} // Mise à jour sur changement
//         />

//         <label htmlFor="date_expiration">Date d'expiration</label>
//         <input
//           type="date"
//           id="date_expiration"
//           name="date_expiration"
//           required
//           value={formData.date_expiration} // Entrée contrôlée
//           onChange={handleChange} // Mise à jour sur changement
//         />

//         <label htmlFor="categorie">Catégorie</label>
//         <input
//           type="text"
//           id="categorie"
//           name="categorie"
//           required
//           minLength="4"
//           maxLength="8"
//           size="10"
//           value={formData.categorie} // Entrée contrôlée
//           onChange={handleChange} // Mise à jour sur changement
//         />

//         <label htmlFor="quantite">Quantité</label>
//         <input
//           type="number"
//           id="quantite"
//           name="quantite"
//           min="1"
//           max="100"
//           required
//           value={formData.quantite} // Entrée contrôlée
//           onChange={handleChange} // Mise à jour sur changement
//         />

//         <input type="submit" value="Rajouter le produit !" />
//       </form>

//       {/* Affichage de la liste des produits ajoutés */}
//       <h2>Produits Ajoutés :</h2>
//       <ul>
//         {produits.map((produit) => (
//           <li key={produit.id}>
//             {produit.nom} - {produit.quantite} - {produit.categorie} (Exp. :{" "}
//             {produit.date_expiration})
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// import React, { useState } from "react";

// export const AjouterProduits = () => {
//   // State for controlled form inputs
//   const [formData, setFormData] = useState({
//     nom: "",
//     date_expiration: "",
//     quantite: 1,
//     categorie: "",
//   });

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   async function handleSubmitPlusPropre(e) {
//     e.preventDefault(); // Prevent the default form submission
//     try {
//       const response = await fetch("http://localhost:3001/AjouterProduits", {
//         method: "POST", // Specify the method
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData), // Send the controlled state
//       });

//       if (!response.ok) {
//         throw new Error("Erreur lors de l'ajout du produit");
//       }

//       const result = await response.text(); // or response.json() based on your response type
//       console.log(result);
//       // Reset form after submission
//       setFormData({
//         nom: "",
//         date_expiration: "",
//         quantite: 1,
//         categorie: "",
//       });
//     } catch (error) {
//       console.error("Erreur de requête:", error);
//     }
//   }

//   return (
//     <div>
//       <h1>Ajouter Produits</h1>
//       <form method="post" onSubmit={handleSubmitPlusPropre}>
//         <label htmlFor="nom">Nom</label>
//         <input
//           type="text"
//           id="nom"
//           name="nom"
//           required
//           minLength="4"
//           maxLength="18"
//           size="10"
//           value={formData.nom} // Controlled input
//           onChange={handleChange} // Update onChange
//         />

//         <label htmlFor="date_expiration">Date d'expiration</label>
//         <input
//           type="date"
//           id="date_expiration"
//           name="date_expiration"
//           required
//           value={formData.date_expiration} // Controlled input
//           onChange={handleChange} // Update onChange
//         />

//         <label htmlFor="categorie">Categorie</label>
//         <input
//           type="text"
//           id="categorie"
//           name="categorie"
//           required
//           minLength="4"
//           maxLength="8"
//           size="10"
//           value={formData.categorie} // Controlled input
//           onChange={handleChange} // Update onChange
//         />

//         <label htmlFor="quantite">Quantité</label>
//         <input
//           type="number"
//           id="quantite"
//           name="quantite"
//           min="1"
//           max="100"
//           required
//           value={formData.quantite} // Controlled input
//           onChange={handleChange} // Update onChange
//         />

//         <input type="submit" value="Rajouter le produit !" />
//       </form>
//     </div>
//   );
// };
