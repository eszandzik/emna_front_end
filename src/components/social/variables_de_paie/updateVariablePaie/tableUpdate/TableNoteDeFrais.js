import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBModal, MDBModalBody } from "mdbreact";
import ModifyNoteDeFrais from "../children/ModifyNoteDeFrais";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import { toast } from "react-toastify";

const notify = (type) => {
  switch (type) {
    case "success":
      toast.success(
        <div className="text-center">
          <strong>Note de frais supprimé &nbsp;&nbsp;!</strong>
        </div>,
      );
      break;
    case "error":
      toast.error(
        <div className="text-center">
          <strong>Note de frais NON supprimé  &nbsp;&nbsp;!</strong>
        </div>,
      );
      break;
  }
};

export default class TableNoteDeFrais extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalAvance: false,
      index: null,
      modaleDelete: false,
    }
  }

  toggleModal = (key) => {
    this.setState({
      index: key,
      modalAvance: !this.state.modalAvance,
    });

  }

  toggleModaleDelete = (key) => {
    this.setState({
      index: key,
      modaleDelete: !this.state.modaleDelete,
    });
  }

  callBackToDelete = () => {
    AxiosCenter.deleteNoteDeFrais(this.props.noteDeFraisList[this.state.index].id).then(() => {
      this.toggleModaleDelete();
      this.props.reloadParentAfterUpdate();
      notify('success');
    }).catch((error) => {
      console.log(error);
      notify('error');
    });
  }

  render() {
    return (
      <div>
        <MDBTable>
          <MDBTableHead color="default-color">
            <tr>
              <th className="font-weight-bold">Notes de Frais</th>
              <th>Date</th>
              <th>Montant</th>
              <th>Justificatif(s)</th>
              <th className="w-25"></th>
            </tr>
          </MDBTableHead>
          {this.props.noteDeFraisList.length ? (
            <MDBTableBody>
              {this.props.noteDeFraisList.map((frais, index) => (
                <tr key={index}>
                  <td>{frais.designation}</td>
                  <td>{frais.date}</td>
                  <td>{frais.montant} €</td>
                  <td>{frais.justificatif}</td>
                  {frais.etatVariablePaieId === 1 ? (
                    <td>
                      <MDBBtn color="teal accent-3" rounded size="sm"
                        onClick={() => this.toggleModal(index)}>UPDATE</MDBBtn>
                      <MDBBtn color="danger" rounded size="sm"
                        onClick={() => this.toggleModaleDelete(index)}>DELETE</MDBBtn>
                    </td>
                  ) : (
                      <td>Confirmé</td>
                    )}
                </tr>
              ))}
            </MDBTableBody>
          ) : (
              <MDBTableBody>
                <tr>
                  <td colSpan="5">Pas de Note de Frais ce mois</td>
                </tr>
              </MDBTableBody>
            )}
        </MDBTable>

        {/** MODALE DELETE */}
        <MDBModal isOpen={this.state.modaleDelete} backdrop={false} centered size="lg">
          <MDBModalBody>
              Etes-vous sur de vouloir supprimer cet enregistrement ?
              <MDBBtn
                  onClick={this.toggleModaleDelete}>Annuler</MDBBtn>
              <MDBBtn
                  onClick={this.callBackToDelete}>Confirmer</MDBBtn>
          </MDBModalBody>
        </MDBModal>
        {/** MODALE UPDATE */}
        <MDBModal isOpen={this.state.modalAvance} backdrop={false} centered size="lg">
                    <MDBModalBody>
                        <ModifyNoteDeFrais
                            noteDeFrais={this.props.noteDeFraisList[this.state.index]}
                            index={this.state.index}
                            toggleNoteDeFrais={this.toggleModal}
                            reloadParentAfterUpdate={this.props.reloadParentAfterUpdate}
                        />
                    </MDBModalBody>
                </MDBModal>
      </div>
    );
  }
}