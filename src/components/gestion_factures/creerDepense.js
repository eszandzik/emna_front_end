import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

class CreerDepense extends React.Component {
  state = {
    prixtotal: 0,
    tva: 0,
  };
  submit = (values) => {
    console.log(values);
  };

  updatePrix = (ev, index, produits, setFieldValue, remove) => {
    var prixtotal = 0;
    setFieldValue(
      "produits." + index + ".prix",
      Number(ev.target.value) === 0 ? "" : Number(ev.target.value)
    );
    if (typeof remove !== "undefined") {
      remove(index);
    }
    produits.map((produit) => (prixtotal = prixtotal + produit.prix));
    this.setState({ prixtotal: prixtotal });
  };

  updateTva = (ev, index, produits, setFieldValue, remove) => {
    var tva = 0;
    setFieldValue(
      "produits." + index + ".tva",
      Number(ev.target.value) === 0 ? "" : Number(ev.target.value)
    );
    if (typeof remove !== "undefined") {
      remove(index);
    }
    produits.map((produit) => (tva = tva + produit.tva));
    this.setState({ tva: tva });
  };

  render() {
    const initialValues = {
      produits: [
        {
          nom: "",
          description: "",
          prix: "",
          tva: "",
          quantite: "",
        },
      ],
    };
    return (
      <div
        className="container-fluid p-5 bg-light
        d-flex flex-column justify-content-center"
      >
        {" "}
        <h1>Nouvelle dépense</h1>
        <Formik onSubmit={this.submit} initialValues={initialValues}>
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form
              onSubmit={handleSubmit}
              className="bg-white border p-5 d-flex flex-column"
            >
              <div className="form-group row">
                <label className="col-form-label">Facture N°</label>
                <div className="col-md-1">
                  <input
                    type="text"
                    name="numfact"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.numfact}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Fournisseur</label>
                <select
                  type="text"
                  name="client"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.client}
                >
                  <option value="" label="Selectionner le fournisseur"></option>
                  <option value="auchan" label="Auchan"></option>
                  <option value="carrefour" label="Carrefour"></option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="date">Date:</label>
                  <input
                    id="date"
                    type="Date"
                    name="date"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="dateecheance">Echeance:</label>
                  <input
                    id="dateecheance"
                    type="Date"
                    name="echeance"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.echeance}
                  />
                </div>
              </div>
              <FieldArray name="produits">
                {({ insert, remove, push }) => (
                  <div>
                    {values.produits.length > 0 &&
                      values.produits.map((produit, index) => (
                        <div className="row" key={index}>
                          <div className="col">
                            <label htmlFor={`produits.${index}.nom`}>Nom</label>
                            <Field
                              name={`produits.${index}.nom`}
                              placeholder="Nom du produit"
                              type="text"
                            />
                            <ErrorMessage
                              name={`produits.${index}.nom`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="col">
                            <label htmlFor={`produits.${index}.description`}>
                              Description
                            </label>
                            <Field
                              name={`produits.${index}.description`}
                              placeholder="description du produit"
                              type="text"
                            />
                            <ErrorMessage
                              name={`produits.${index}.description`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="col">
                            <label htmlFor={`produits.${index}.quantite`}>
                              Quantite
                            </label>
                            <Field
                              name={`produits.${index}.quantite`}
                              placeholder="2"
                              type="text"
                            />
                            <ErrorMessage
                              name={`produits.${index}.quantite`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="col">
                            <label htmlFor={`produits.${index}.tva`}>TVA</label>
                            <Field
                              name={`produits.${index}.tva`}
                              placeholder="2.5 €"
                              type="number"
                              onChange={
                                (handleChange,
                                (ev) => {
                                  this.updateTva(
                                    ev,
                                    index,
                                    values.produits,
                                    setFieldValue
                                  );
                                })
                              }
                              onBlur={(ev) => {
                                this.updateTva(
                                  ev,
                                  index,
                                  values.produits,
                                  setFieldValue
                                );
                              }}
                            />
                            <ErrorMessage
                              name={`produits.${index}.tva`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="col">
                            <label htmlFor={`produits.${index}.prix`}>
                              Prix
                            </label>
                            <Field
                              name={`produits.${index}.prix`}
                              placeholder="15€"
                              type="number"
                              onChange={
                                (handleChange,
                                (ev) => {
                                  this.updatePrix(
                                    ev,
                                    index,
                                    values.produits,
                                    setFieldValue
                                  );
                                })
                              }
                              onBlur={(ev) => {
                                this.updatePrix(
                                  ev,
                                  index,
                                  values.produits,
                                  setFieldValue
                                );
                              }}
                            />
                            <ErrorMessage
                              name={`produits.${index}.prix`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="col">
                            <button
                              type="button"
                              className="secondary rounded"
                              onClick={(ev) => {
                                this.updatePrix(
                                  ev,
                                  index,
                                  values.produits,
                                  setFieldValue,
                                  remove
                                );
                              }}
                            >
                              X
                            </button>
                          </div>
                        </div>
                      ))}
                    <button
                      type="button"
                      className="secondary rounded"
                      onClick={() =>
                        push({
                          nom: "",
                          description: "",
                          prix: "",
                          tva: "",
                          quantite: "",
                        })
                      }
                    >
                      Add Produit
                    </button>
                  </div>
                )}
              </FieldArray>
              <div className="form-group">
                <label>Notes</label>
                <input
                  type="text"
                  name="message"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                />
              </div>
              <h2>TVA : {this.state.tva} €</h2>
              <h2>Prix total : {this.state.prixtotal} €</h2>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control-file"
                  id="exampleFormControlFile1"
                  multiple
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Enregistrer
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default CreerDepense;