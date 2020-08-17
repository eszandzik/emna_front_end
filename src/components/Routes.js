import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "../helpers/PrivateRoute";

//Gestion Social import
import AccueilSocial from "./social/SocialHome";
import ListEmployes from "./social/gestion_employes/List_employes";
import DetailEmploye from "./social/gestion_employes/Detail_employe";
import NewEmploye from "./social/gestion_employes/Create_employe";
import UpdateEmploye from "./social/gestion_employes/Update_employe";
import SupprimerEmploye from "./social/gestion_employes/Supprimer_employe";

import ListeContrat from "./contrat/listeContrat/ListeContrat";
import Contrat from "./contrat/Contrat";
import DetailContrat from "./contrat/detailContrat/DetailContrat";
import CreerContrat from "./contrat/creerContrat/CreerContrat";

//gestion ClientFournisseur imports
import MenuClientFournisseur from "./clientFournisseur/menuClientFournisseur";
import ListerClients from "./clientFournisseur/listerClientFournisseur/listerClients";
import AddClient from "./clientFournisseur/addClientFournisseur/addClient";
import ModifierClient from "./clientFournisseur/modifierCLientFournisseur/modifierClient";
import SupprimerClient from "./clientFournisseur/supprimerClientFounisseur/supprimerClient";
import DetailsClient from "./clientFournisseur/detailsClientFounisseur/detailsClient";

//gestionBancaire
import Bancaire from "./bancaire/index";
import CreationOperation from "./bancaire/releve/details_releve/operation/creation_operation/creationOperation";
import Releve from "./bancaire/releve/releve";
import ListeReleves from "./bancaire/releve/historique_releves/liste_releves_archive";
import DetailsReleve from "./bancaire/releve/details_releve/details_releve";
import DetailsReleveInvalide from "./bancaire/releve/details_releve/details_releve_invalide";
import DetailsReleveNonArchive from "./bancaire/releve/details_releve/details_releve_non_archive";
import CreationReleve from "./bancaire/releve/creation_releve/creation_releve";
import DetailsOperation from "./bancaire/releve/details_releve/operation/details_operation/details_operation";
import MenuReleveNon from "./bancaire/releve/historique_releves/menu_releve_non";
import ListeRelevesInvalide from "./bancaire/releve/historique_releves/liste_releves_invalide";
import ListeRelevesNonArchive from "./bancaire/releve/historique_releves/liste_releves_non_archive";

// gestionUserRoutesImports
import Users from "./users/Users";
import NotFound from "./pages/NotFound";
import EditUser from "./users/EditUser";
import AddUser from "./users/AddUser";
import ViewUser from "./users/ViewUser";
import AddComptable from "./comptables/AddComptable";
import ViewComptable from "./comptables/ViewComptable";
import EditComptable from "./comptables/EditComptable";
import SelectToAddUser from "./pages/SelectToAddUser";
import AddSociete from "./societe/AddSociete";
import ViewSociete from "./societe/ViewSociete";
import EditSociete from "./societe/EditSociete";
import HomeMenu from "./navigation/HomeMenu";
import ComptabiliteMenu from "./navigation/ComptabiliteMenu";
import JuridiqueMenu from "./navigation/JuridiqueMenu";
// finGestionUserRoutesImports

//GestionProduits
import ListeProduits from "./produits/listeProduits/listeProduits";
import DetailsProduit from "./produits/detailsProduits/detailsProduit";
import AddProduit from "./produits/addProduits/addProduit";
//finGestionProduits

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path="/" component={HomeMenu} />
        <PrivateRoute path="/menu/comptabilite" component={ComptabiliteMenu} />
        <PrivateRoute path="/menu/juridique" component={JuridiqueMenu} />
        {/* Gestion Social */}
        <PrivateRoute path="/socialHome/:id" component={AccueilSocial} />
        <PrivateRoute path="/listEmployes/:id" component={ListEmployes} />
        <PrivateRoute path="/detailEmploye/:id" component={DetailEmploye} />
        <PrivateRoute path="/newEmploye/:id" component={NewEmploye} />
        <PrivateRoute path="/updateEmploye/:id" component={UpdateEmploye} />
        <PrivateRoute path="/deleteEmploye/:id" component={SupprimerEmploye} />
        {/* Gestion des Contrats*/}
        <PrivateRoute path="/listcontrat" component={ListeContrat} />
        <PrivateRoute path="/contrat" component={Contrat} />
        <PrivateRoute path="/detailcontrat/:id" component={DetailContrat} />
        <PrivateRoute path="/creercontrat" component={CreerContrat} />
        {/* gestionUserRoutes */}
        <PrivateRoute exact path="/users" component={Users} />
        <PrivateRoute exact path="/users/add" component={AddUser} />
        <PrivateRoute exact path="/users/edit/:id" component={EditUser} />
        <PrivateRoute exact path="/users/view/:id" component={ViewUser} />
        <PrivateRoute
          exact
          path="/users/add/comptable"
          component={AddComptable}
        />
        <PrivateRoute
          exact
          path="/users/view/comptable/:id"
          component={ViewComptable}
        />
        <PrivateRoute
          exact
          path="/users/edit/comptable/:id"
          component={EditComptable}
        />
        <PrivateRoute exact path="/users/add/societe" component={AddSociete} />
        <PrivateRoute
          exact
          path="/users/view/societe/:id"
          component={ViewSociete}
        />
        <PrivateRoute
          exact
          path="/users/edit/societe/:id"
          component={EditSociete}
        />
        <PrivateRoute exact path="/users/stau" component={SelectToAddUser} />
        {/* finGestionUserRoutes */}
        <PrivateRoute path="/bancaire" component={Bancaire} />
        <PrivateRoute path="/creationoperation" component={CreationOperation} />
        <PrivateRoute path="/menureleve" component={Releve} />
        <PrivateRoute path="/historiquereleve/:id" component={ListeReleves} />
        <PrivateRoute path="/detailsreleve/:id" component={DetailsReleve} />
        <PrivateRoute
          path="/detailsreleveinvalide/:id"
          component={DetailsReleveInvalide}
        />
        <PrivateRoute
          path="/detailsrelevenonarchive/:id"
          component={DetailsReleveNonArchive}
        />
        <PrivateRoute path="/creationreleve" component={CreationReleve} />
        <PrivateRoute
          path="/detailsoperation/:id"
          component={DetailsOperation}
        />
        <PrivateRoute path="/menurelevenon" component={MenuReleveNon} />
        <PrivateRoute
          path="/releveinvalide/:id"
          component={ListeRelevesInvalide}
        />
        <PrivateRoute
          path="/relevenonarchive/:id"
          component={ListeRelevesNonArchive}
        />
        {/* gestionClientFournisseur */}
        <PrivateRoute
          path="/client-fournisseur"
          component={MenuClientFournisseur}
        />
        <PrivateRoute
          path="/clientFournisseur/modifier/:id"
          component={ModifierClient}
        />
        <PrivateRoute
          path="/clientFournisseur/liste"
          component={ListerClients}
        />
        <PrivateRoute path="/clientFournisseur/creer" component={AddClient} />
        <PrivateRoute
          path="/clientFournisseur/delete/:id"
          component={SupprimerClient}
        />
        <PrivateRoute
          path="/clientFournisseur/detail/:id"
          component={DetailsClient}
        />
        {/* finGestionClientFournisseur */}
        {/* GestionProduit */}
        <PrivateRoute path="/produits" component={ListeProduits} />
        <PrivateRoute path="/produit/detail/:id" component={DetailsProduit} />
        <PrivateRoute path="/produit/creer" component={AddProduit} />

        {/* <Route component={NotFound} /> */}
        <PrivateRoute component={NotFound} />
      </Switch>
    );
  }
}
