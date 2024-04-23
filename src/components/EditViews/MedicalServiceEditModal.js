import React, { Suspense, useState } from "react";
import { Form, FormProvider, useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Input } from "../Input";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LoadingSpinner from "../LoadingSpinner";
import { deleteNullProperties } from "../../utils/helper";
import {
  additional_validation,
  categoryName_validation,
  localCode_validation,
  price_validation,
  purchasePrice_validation,
  serviceName_validation,
  shortName_validation,
} from "../../utils/inputValidations";
import { MEDICALSERVICES_URL } from "../../utils/constants";

function MedicalServiceEditModal({ medicalService, setEditRow, refreshData }) {
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const { trigger } = useForm();
  const methods = useForm({
    mode: "onChange",
  });
  const onSubmit = methods.handleSubmit(
    async ({
      serviceName,
      localCode,
      categoryName,
      shortName,
      price,
      purchasePrice,
      additional,
    }) => {
      const updatedMedicalService = {
        localCode:
          localCode?.trim() !== medicalService?.localCode?.trim()
            ? localCode
            : null,
        categoryName:
          categoryName?.trim() !== medicalService?.categoryName?.trim()
            ? categoryName
            : null,
        serviceName:
          serviceName?.trim() !== medicalService?.serviceName?.trim()
            ? serviceName
            : null,
        shortName:
          shortName?.trim() !== medicalService?.shortName?.trim()
            ? shortName
            : null,
        price: +price !== +medicalService?.price ? price : null,
        purchasePrice:
          +purchasePrice !== medicalService?.purchasePrice
            ? purchasePrice
            : null,
        additional:
          additional?.trim() !== medicalService?.additional?.trim()
            ? additional
            : null,
      };
      const updatedFields = deleteNullProperties(updatedMedicalService);
      console.log(updatedFields);
      try {
        await axiosPrivate.put(
          MEDICALSERVICES_URL,
          { updatedFields, id: medicalService.medServiceId },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        setEditRow(false);
        refreshData();
        //notify(`Բուժ․ ծառայությունը ավելացված է`)
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 409) {
          setErrMsg("Username Taken");
        } else {
          setErrMsg(" Failed");
        }
      }
    }
  );
  return (
    <>
      <Modal show={() => true} size="xl" onHide={() => setEditRow(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ width: "100%", textAlign: "center" }}>
            Թարմացնել բժշկական ծառայության տվյալները
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Suspense fallback={<LoadingSpinner />}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <FormProvider {...methods}>
                <div className="contact-body contact-detail-body">
                  <div data-simplebar className="nicescroll-bar">
                    <div className="d-flex flex-xxl-nowrap flex-wrap">
                      <div className="contact-info w-100">
                        <Form
                          onSubmit={(e) => e.preventDefault()}
                          noValidate
                          autoComplete="off"
                          className="container"
                        >
                          <div className="card">
                            <div className="card-header">
                              <a href="#">Բուժ․ ծառայության տվյալներ</a>
                              <button
                                className="btn btn-xs btn-icon btn-rounded btn-light"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Edit"
                              >
                                <span
                                  className="icon"
                                  data-bs-toggle="modal"
                                  data-bs-target="#editInfo"
                                >
                                  <span class="feather-icon">
                                    <FeatherIcon icon="edit-2" />
                                  </span>
                                </span>
                              </button>
                            </div>
                            <div className="card-body">
                              <div className="modal-body">
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...serviceName_validation}
                                      defaultValue={medicalService?.serviceName}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...localCode_validation}
                                      defaultValue={medicalService?.localCode}
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...categoryName_validation}
                                      defaultValue={
                                        medicalService?.categoryName
                                      }
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...shortName_validation}
                                      defaultValue={medicalService?.shortName}
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...purchasePrice_validation}
                                      defaultValue={
                                        medicalService?.purchasePrice
                                      }
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...price_validation}
                                      defaultValue={medicalService?.price}
                                    />
                                  </div>
                                </div>

                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...additional_validation}
                                      defaultValue={medicalService?.additional}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div className="separator-full"></div>
                          <div className="card">
                        <div className="card-header">
                          <a href="#">Հավելյալ տվյալներ</a>
                          <button
                            className="btn btn-xs btn-icon btn-rounded btn-light"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Edit"
                          >
                            <span
                              class="icon"
                              data-bs-toggle="modal"
                              data-bs-target="#moreContact"
                            >
                              <span class="feather-icon">
                                <FeatherIcon icon="edit-2" />
                              </span>
                            </span>
                          </button>
                        </div>
                        <div className="card-body" style={{zIndex:'0'}}>
                          <div className="modal-body">
                            <form>
                              <div className="row gx-12">
                                <div className="col-sm-12">
                                  <Editor
                                    apiKey="wiejyphh2h0z879p5bvha1lqdfd0z7utg4rqsw6cyjhd28lx"
                                    onInit={(evt, editor) =>
                                      (editorRef.current = editor)
                                    }
                                    //initialValue="<p>This is the initial content of the editor.</p>"
                                    init={{
                                      height: 200,
                                      menubar: false,
                                      plugins: [
                                        "advlist autolink lists link image charmap print preview anchor",
                                        "searchreplace visualblocks code fullscreen",
                                        "insertdatetime media table paste code help wordcount",
                                      ],
                                      toolbar:
                                        "undo redo | formatselect | " +
                                        "bold italic backcolor | alignleft aligncenter " +
                                        "alignright alignjustify | bullist numlist outdent indent | " +
                                        "removeformat | help",
                                      content_style:
                                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                    }}
                                  />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className="separator-full"></div>
   */}
                          <div className="modal-footer align-items-center">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => setEditRow(false)}
                            >
                              Չեղարկել
                            </button>
                            <button
                              type="button"
                              onClick={onSubmit}
                              className="btn btn-primary"
                              data-bs-dismiss="modal"
                            >
                              Հաստատել
                            </button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </FormProvider>
            )}
          </Suspense>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MedicalServiceEditModal;
