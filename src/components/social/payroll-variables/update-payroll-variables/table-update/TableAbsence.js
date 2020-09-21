import React from "react";
import {MDBBtn, MDBRow, MDBListGroupItem, MDBModal, MDBModalBody, MDBTable, MDBTableBody, MDBTableHead, MDBContainer, MDBListGroup, MDBCardHeader, MDBCardTitle} from "mdbreact";
import {toast} from "react-toastify";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import ModifyAbsence from "../children/ModifyAbsence";
import { Page, Document } from '@react-pdf/renderer';

const notify = type => {
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>Absence Supprimée &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Absence NON Supprimée &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>Absence NON Supprimée &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
    }
};

class TableAbsence extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalUpdateAbsence: false,
            modalDeleteAbsence: false,
            modaleDetails: false,
            index: null,
            docsAbsence: [],
            pdf: [],
            numPages: null,
            pageNumber: 1
        }
    }

    toggleModalUpdateAbsence = (key) => {
        this.setState({
            index: key,
            modalUpdateAbsence: !this.state.modalUpdateAbsence,
        });
    }

    toggleModalDeleteAbsence = (key) => {
        this.setState({
            index: key,
            modalDeleteAbsence: !this.state.modalDeleteAbsence,
        });
    }

    toggleModalDetails = (key) => {
        console.log(key);
        this.setState({
            index: key,
            modaleDetails: !this.state.modaleDetails,
        }, () => {
            this.getDocumentsByAbsencesId();
        });
    }

    closeToggleModalDetail = (key) => {
        this.setState({
            index: key,
            modaleDetails: !this.state.modaleDetails,
        });
    }

    callBackToDeleteAbsence = () => {
        AxiosCenter.deleteAbsence(this.props.absenceList[this.state.index].id).then(() => {
            this.toggleModalDeleteAbsence();
            this.props.reloadParentAfterUpdate();
            notify('success');
        }).catch((error) => {
            console.log(error);
            notify('error');
        });
    }

    getDocumentsByAbsencesId = () => {
        const id = this.props.absenceList[this.state.index].id;
        AxiosCenter.getDocumentsByAbsencesId(id)
        .then((response) => {
            const docsAbsence = response.data;
            this.setState({ docsAbsence });
        })
    }

    getPdf = (index) => {
        console.log(this.state.docsAbsence[this.state.index].cheminFichier)
        AxiosCenter.getPdfFileByPath(this.state.docsAbsence[index].nom)
        .then((response) => {
            const pdf = response.data;
            this.setState({ pdf, modaleDetails: !this.state.modaleDetails });
            //Create a Blob from the PDF Stream
            const file = new Blob(
                [response.data], 
                {type: 'application/pdf'});
            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
            //Open the URL on new Window
            window.open(fileURL);
        })        
    }

    render() {
        return (
            <div>
                <MDBTable>
                    <MDBTableHead color="default-color">
                        <tr>
                            <th className="font-weight-bold">Absences</th>
                            <th>Du</th>
                            <th>Au</th>
                            <th>Justificatif(s)</th>
                            <th className="w-25"></th>
                        </tr>
                    </MDBTableHead>
                    {this.props.absenceList.length ? (
                        <MDBTableBody>
                            {this.props.absenceList.map((abs, index) => (
                                <tr key={index}>
                                    <td>{abs.intitule}</td>
                                    <td>{abs.debutAbsence}</td>
                                    <td>{abs.finAbsence}</td>
                                    {abs.justificatif ? (
                                        <td>
                                            <MDBBtn color="teal accent-3" rounded size="sm"
                                                    onClick={() => this.toggleModalDetails(index)}>VOIR</MDBBtn>
                                        </td>
                                    ) : (
                                        <td>Pas de justificatif</td>
                                    )}
                                    {abs.etatVariablePaieId === 1 ? (
                                        <td>
                                            <MDBBtn color="teal accent-3" rounded size="sm"
                                                    onClick={() => this.toggleModalUpdateAbsence(index)}>MODIFIER</MDBBtn>
                                            <MDBBtn color="danger" rounded size="sm"
                                                    onClick={() => this.toggleModalDeleteAbsence(index)}>SUPPRIMER</MDBBtn>
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
                                <td colSpan="5">Pas d'Absence ce mois</td>
                            </tr>
                        </MDBTableBody>
                    )}
                </MDBTable>
                {/** MODALE DELETE */}
                <MDBModal isOpen={this.state.modalDeleteAbsence} backdrop={false} centered size="sm">
                    <MDBModalBody>
                        <p>Supprimer l'Absence ?</p>
                        <MDBBtn color="danger" rounded size="sm"
                            onClick={this.callBackToDeleteAbsence}>Supprimer</MDBBtn>
                        <MDBBtn color="teal accent-3" rounded size="sm"
                            onClick={this.toggleModalDeleteAbsence}>Annuler</MDBBtn>                        
                    </MDBModalBody>
                </MDBModal>
                {/** MODALE UPDATE */}
                <MDBModal isOpen={this.state.modalUpdateAbsence} backdrop={false} centered size="lg">
                    <MDBModalBody>
                        <ModifyAbsence
                            absence={this.props.absenceList[this.state.index]}
                            index={this.state.index}
                            toggleModalUpdateAbsence={this.toggleModalUpdateAbsence}
                            reloadParentAfterUpdate={this.props.reloadParentAfterUpdate}
                        />
                    </MDBModalBody>
                </MDBModal>
                {/** MODALE DETAILS */}
                <MDBModal isOpen={this.state.modaleDetails} backdrop={false} centered size="lg">
                    <MDBCardHeader color={"teal accent-4"} >
                        <MDBCardTitle tag="h4">Documents justificatifs</MDBCardTitle>
                    </MDBCardHeader>
                    <MDBModalBody> 
                        <MDBContainer>
                            {console.log(this.state.docsAbsence)}
                            <MDBListGroup>
                                {this.state.docsAbsence.map((doc, index) => (
                                    <MDBListGroupItem style={{cursor:'pointer'}} hover onClick={() => this.getPdf(index)}>{doc.nom}</MDBListGroupItem>
                                ))}
                            </MDBListGroup>
                            <MDBRow center>
                            <MDBBtn
                                color="teal accent-3"
                                className="mt-3"
                                rounded
                                size="sm"
                                onClick={() => this.closeToggleModalDetail(this.state.index)}>
                                Annuler
                            </MDBBtn>
                            </MDBRow>
                        </MDBContainer>                     
                    </MDBModalBody>
                </MDBModal>
            </div>
        );
    }
}

export default TableAbsence;
