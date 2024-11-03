import AfficherProduits from "./AfficherProduits";
import Recettes from "./Recettes";
import RecettesAvailable from "./RecettesAvailable";
import { AjouterProduits } from "./AjouterProduits";
import { AjouterRecettes } from "./AjouterRecettes";

//Appelle du composents dans un fragment
const MonFrigo = () => {
  return (
    <div className="app-container">
      <h1>Bienvenue dans notre application</h1>
      <AfficherProduits />
      <Recettes />
      <RecettesAvailable />
      <AjouterProduits />
      <AjouterRecettes />
    </div>
  );
};

export default MonFrigo;
