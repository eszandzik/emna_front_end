import React, { Component } from "react";
import AxiosCenter from "./../../shared/services/AxiosCenter";
import DetailsClientFournisseur from "./detailsClientFournisseur";
import Style from "./ClientFournisseur.module.css";

class ListerClientFournisseur extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
    };
  }

  componentDidMount() {
    AxiosCenter.getClientFournisseur(1)
      .then((response) => {
        const clients = response.data;
        this.setState({ clients });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // deleteClient = (id) => {
  //   axios.delete(`http://localhost:8080/api/client-fournisseurs/${id}`, {
  //     headers: {
  //       Authorization: "Basic " + " YWRtaW46YWRtaW4="
  //     }
  //   })
  //     .catch(err => console.log(err))
  // }

  render() {
    return (
      <div className="container-fluid container-fluid p-5 bg-light justify-content-center align-items-center ">
        <div>
          <table className=" table table-striped table-bordered table-hover table-sm">
            <caption>La liste de client fournisseur</caption>
            <thead className="thead-dark">
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">SIREN</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {this.state.clients && this.state.clients.length ? (
                this.state.clients.map((c, index) => (
                  <tr key={index}>
                    <td scope="row">{c.nom}</td>
                    <td scope="row">{c.siren}</td>
                    <td scope="row">{c.email}</td>
                    <td>
                      <div className="btn-group flex-btn-group-container">
                        <DetailsClientFournisseur client={c} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <h1 className="text-center"> Pas des Client ... </h1>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListerClientFournisseur;
