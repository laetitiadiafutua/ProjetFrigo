// Client (React)
import React from "react";

export const AjouterRecettes = () => {
  function handleSubmitPlusPropre(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log("Données du formulaire :", formJson); // Vérifiez les données envoyées

    fetch("http://localhost:3002/recettes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formJson),
    })
      .then((response) => response.json())
      .then((data) => console.log("Réponse du serveur :", data))
      .catch((error) => console.error("Erreur :", error));
  }

  return (
    <div>
      <h1>Ajouter Recettes</h1>
      <form method="post" onSubmit={handleSubmitPlusPropre}>
        <label htmlFor="nom">Nom</label>
        <input
          type="text"
          id="nom"
          name="nom"
          required
          minLength="4"
          maxLength="18"
        />

        <label htmlFor="ingredients">Ingredients:</label>
        <input
          type="text"
          id="ingredients"
          name="ingredients"
          minLength="3"
          maxLength="200"
          required
        />

        <label htmlFor="instructions">Instructions</label>
        <input
          type="text"
          id="instructions"
          name="instructions"
          min="5"
          max="5000"
        />

        <label htmlFor="difficulte">Difficulte</label>
        <input type="text" id="difficulte" name="difficulte" required />
        {/* <select id="difficulte" name="difficulte" required> */}
        {/* <option value="">Choisir...</option> */}
        {/* <option value="Facile">Facile</option> */}
        {/* <option value="Moyen">Moyen</option> */}
        {/* <option value="Difficile">Difficile</option> */}
        {/* </select> */}

        <label htmlFor="temps_preparation">Temps_preparation</label>
        <input
          type="number"
          id="temps_preparation"
          name="temps_preparation"
          // defaultValue="1"
          required
        />

        <input type="submit" value="Rajouter la recette !" />
      </form>
    </div>
  );
};

// import React, { useState } from "react";
// //import axios from "axios";

// export const AjouterRecettes = () => {
//     function handleSubmitPlusPropre(e) {
//       e.preventDefault();
//       const form = e.target;
//       const formData = new FormData(form);
//       const formJson = Object.fromEntries(formData.entries());
//       console.log(formJson);
//       fetch("http://localhost:3001/AjouterRecettes", {
//         method: form.method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formJson),
//       });
//     }

//     return (
//       <div>
//         <h1>Ajouter Recettes</h1>
//         <form method="post" onSubmit={handleSubmitPlusPropre}>
//           <label htmlFor="nom">Nom</label>
//           <input
//             type="text"
//             id="nom"
//             name="nom"
//             required
//             minLength="4"
//             maxLength="18"
//             size="10"
//             defaultValue=""
//           />

//           <label htmlFor="instructions">Instructions</label>
//           <input
//         s    type="text"
//             id="instruction"
//             name="instructions"
//             min="5"
//             max="5000"
//             defaultValue=""
//           />

//           <label htmlFor="difficulte">Difficulte</label>
//           <input
//           <select
//             type="text"
//             id="difficulte"
//             name="difficulte"
//             required
//             min="5"
//             max="5000"
//             defaultValue=""
//             >

//             <option value="">Choisir...</option>
//             <option value="Facile">Facile</option>
//             <option value="Moyen">Moyen</option>
//             <option value="Difficile">Difficile</option>
//             </select>

//           <label htmlFor="temps_preparation">Temps_preparation</label>
//           <input
//             type="text"
//             id="temps_preparation"
//             name="temps_preparation"
//             min="5"
//             max="100"
//             defaultValue="1"
//           />

//           <input type="submit" value="Rajouter le produit !" />
//         </form>
//       </div>
//     );
//   };
