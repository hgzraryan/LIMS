/* eslint-disable no-undef */
import React, { Suspense, useRef, useState } from "react";
import { Form, FormProvider, useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Input } from "../Input";
import {
  shortName_validation,
  purchasePrice_validation,
  serviceName_validation,
  categoryName_validation,
  price_validation,
} from "../../utils/inputValidations";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LoadingSpinner from "../LoadingSpinner";
import { RADIOLOGYSERVICES_URL, ROLES } from "../../utils/constants";
import { deleteNullProperties } from "../../utils/helper";
import ReactQuillEditor from "../ReactQuillEditor";

function RadiologyServiceEditModal({
  radiologyService,
  setEditRow,
  refreshData,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [additionalData, setAdditionalData] = useState(radiologyService.additional)
  const storedUserRoles = JSON.parse(localStorage.getItem("userRoles"));
  const [superAdmin, setSuperAdmin] = useState(
    storedUserRoles.includes(ROLES?.SuperAdmin)
  );

  const methods = useForm({
    mode: "onChange",
  });
  const onSubmit = methods.handleSubmit(
    async ({
      categoryName,
      serviceName,
      shortName,
      //localCode,
      purchasePrice,
      price,
    }) => {
      const updatedResearchList = {
        // localCode:
        //   localCode?.trim() !== radiologyService?.localCode?.trim()
        //     ? localCode
        //     : null,
        // partnerCode:
        categoryName:
          categoryName?.trim() !== radiologyService?.categoryName?.trim()
            ? categoryName
            : null,
        serviceName:
          serviceName?.trim() !== radiologyService?.serviceName?.trim()
            ? serviceName
            : null,
        shortName:
          shortName?.trim() !== radiologyService?.shortName?.trim()
            ? shortName
            : null,
        price: +price !== +radiologyService?.price ? price : null,
        purchasePrice:
          +purchasePrice !== radiologyService?.purchasePrice
            ? purchasePrice
            : null,
        additional:additionalData !== radiologyService?.additional? additionalData: null,
      };
      const updatedFields = deleteNullProperties(updatedResearchList);
      console.log(updatedFields);
      try {
        await axiosPrivate.put(
          RADIOLOGYSERVICES_URL,
          { updatedFields, id: radiologyService.radiologyServiceId },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        setEditRow(false);
        refreshData();
        //notify(`${newResearchList.researchName} ավելացված է`)
      } catch (err) {
        //   if (!err?.response) {
        //     setErrMsg("No Server Response");
        //   } else if (err.response?.status === 409) {
        //     setErrMsg("Username Taken");
        //   } else {
        //     setErrMsg(" Failed");
        //   }
      }
    }
  );
  return (
    <>
      <Modal show={() => true} size="xl" onHide={() => setEditRow(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ width: "100%", textAlign: "center" }}>
            Թարմացնել հետազոտության տվյալները
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
                              <a href="#">Հետազոտության տվյալներ</a>
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
                                  <span className="feather-icon">
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
                                      defaultValue={
                                        radiologyService?.serviceName
                                      }
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...shortName_validation}
                                      defaultValue={radiologyService?.shortName}
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...categoryName_validation}
                                      defaultValue={
                                        radiologyService?.categoryName
                                      }
                                    />
                                  </div>
                                </div>
                                {!!superAdmin && (
                                  <div className="row gx-3">
                                    <div className="col-sm-6">
                                      <Input
                                        {...purchasePrice_validation}
                                        defaultValue={
                                          radiologyService?.purchasePrice
                                        }
                                      />
                                    </div>
                                    <div className="col-sm-6">
                                      <Input
                                        {...price_validation}
                                        defaultValue={radiologyService?.price}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="separator-full"></div>
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
                                  className="icon"
                                  data-bs-toggle="modal"
                                  data-bs-target="#moreContact"
                                >
                                  <span className="feather-icon">
                                    <FeatherIcon icon="edit-2" />
                                  </span>
                                </span>
                              </button>
                            </div>
                            <div className="card-body" style={{ zIndex: "0" }}>
                              <div className="modal-body">
                                <form>
                                  <div className="row gx-12">
                                    <div className="col-sm-12">
                                    <ReactQuillEditor
                                      value={additionalData}
                                      onChange={setAdditionalData}
                                      />
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          <div className="separator-full"></div>

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

export default RadiologyServiceEditModal;
