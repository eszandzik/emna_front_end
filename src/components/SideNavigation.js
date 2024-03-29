import React from "react";
import {MDBSideNav, MDBSideNavCat, MDBSideNavLink, MDBSideNavNav,} from "mdbreact";
import AxiosCenter from "../shared/services/AxiosCenter";
import UserService from "./../shared/services/UserService";
import "./style.scss";

class SideNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      societes: [],
    };
  }
  componentDidMount() {
    if (UserService.getRole() === "ROLE_ACCOUNTANT") {
      AxiosCenter.getAccountantByUser(UserService.getUserId()).then(
          (response) => {
            AxiosCenter.getAllSocietiesByComptable(response.data.id).then(
                (response) => {
                  this.setState({
                    societes: response.data,
                  });
                  UserService.setSocietyId(response.data[0].id);
                }
            );
          }
      ).catch(e=>{console.log(e)});
    } else if (UserService.getRole() === "ROLE_ADMIN") {
      AxiosCenter.getAllSocieties().then((response) => {
        this.setState({
          societes: response.data,
        });
        UserService.setSocietyId(response.data[0].id);
      }).catch(e=> {
        // console.log(e)
      });
    } else if (UserService.getRole() === "ROLE_SOCIETY") {
      AxiosCenter.getSocietyByUser(UserService.getUserId()).then((response) => {
        UserService.setSocietyId(response.data.id);
      });
    }
  }
  // render MDBSideNav Link
  rSNL(to, text) {
    return (
        <MDBSideNavLink to={to} onClick={this.props.onLinkClick}>
          {text}
        </MDBSideNavLink>
    );
  }
  changeSocietyId() {
    UserService.setSocietyId(document.getElementById("mySelect").value);
  }

  render() {
    return (
        <div className="white-skin">
          <MDBSideNav
              logo="https://cdn.discordapp.com/attachments/649887310447509524/742351581931896923/logo.png"
              bg="https://mdbootstrap.com/img/Photos/Others/sigdenav4.jpg"
              mask="strong"
              fixed
              breakWidth={this.props.breakWidth}
              triggerOpening={this.props.triggerOpening}
              style={{ transition: "padding-left .3s" }}
              href="/"
          >
            <br></br>
            <br></br>
            {(UserService.getRole() === "ROLE_ACCOUNTANT") |
            (UserService.getRole() === "ROLE_ADMIN") ? (
                <div>
                  <select
                      id="mySelect"
                      className="browser-default custom-select"
                      onChange={() => this.changeSocietyId()}
                  >
                    {this.state.societes.map((societe) => (
                        <option value={societe.id} key={societe.id}>{societe.civilite}</option>
                    ))}
                  </select>
                </div>
            ) : null}
            <MDBSideNavNav>
              <MDBSideNavCat
                  name="Comptabilité"
                  id="dashboard-cat"
                  icon="tachometer-alt"
              >
                {this.rSNL("/accueilfactures", "Facture")}
                {this.rSNL("/accueildepenses", "Depense")}
                {this.rSNL("/devis/accueil", "Devis")}
                {this.rSNL("/bancaire", "Relevé Bancaire")}
              </MDBSideNavCat>

              <MDBSideNavCat name="Juridique" id="pages-cat" icon="scroll">
                {this.rSNL("/contrat", "Contrat")}
                {this.rSNL("/client-fournisseur", "Société")}
                {this.rSNL("/TODO", "Assemblée Générale")}
              </MDBSideNavCat>

              <MDBSideNavCat name="Social" id="profile-cat" icon="user">
                {this.rSNL(
                    "/listEmployes/" + UserService.getSocietyId(),
                    "Employés"
                )}
                {this.rSNL(
                    "/variables_de_paie/addVariablePaie/ParentAddPayrollVariables/" + UserService.getSocietyId(),
                    "Variable Paie"
                )}
                {this.rSNL(
                    "/socialHome/" + UserService.getSocietyId(),
                    "Validation"
                )}
                {this.rSNL(
                    "/socialHome/" + UserService.getSocietyId(),
                    "Fiche de Paie"
                )}
                {this.rSNL(
                    "/socialHome/" + UserService.getSocietyId(),
                    "Déclaration d'embauche"
                )}
              </MDBSideNavCat>

              {/* <MDBSideNavLink topLevel to="/alerts" onClick={onLinkClick}>
              <MDBIcon icon="bell mr-2" />
              Alerts
            </MDBSideNavLink> */}
            </MDBSideNavNav>
          </MDBSideNav>
        </div>
    );
  }
}

export default SideNavigation;
