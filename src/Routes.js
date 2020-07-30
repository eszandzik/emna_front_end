import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./helpers/PrivateRoute";
import IndexLogin from "./components/login/Index";

import ListeContrat from "./components/contrat/listeContrat/ListeContrat";
import Contrat from "./components/contrat/Contrat";
import DetailContrat from "./components/contrat/detailContrat/DetailContrat";
import CreerContrat from "./components/contrat/creerContrat/CreerContrat";
import Home from "./components/home/Home";

import Bancaire from "./components/bancaire/index";
import CreationOperation from "./components/bancaire/operation/creationOperation/creationOperation";
import IndexOperation from "./components/bancaire/operation/index";
import ListeOperations from "./components/bancaire/operation/listeOperations/listeOperations";

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={IndexLogin} />
          <Route path="/listcontrat" component={ListeContrat} />
          <Route path="/contrat" component={Contrat} />
          <Route path="/detailcontrat/:id" component={DetailContrat} />
          <Route path="/creercontrat" component={CreerContrat} />

          <PrivateRoute path="/bancaire" component={Bancaire} />
          <PrivateRoute
            path="/creationoperation"
            component={CreationOperation}
          />
          <PrivateRoute path="/indexoperation" component={IndexOperation} />
          <PrivateRoute path="/listeoperations" component={ListeOperations} />
        </Switch>
      </BrowserRouter>
    );
  }
}
