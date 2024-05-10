import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Input } from "./Input";
import { CREATE_POS_PAY } from "../utils/constants";
import CustomDateTimeComponent from "./CustomDateTimeComponent";
import Select from "react-select";
import ErrorSvg from "../dist/svg/error.svg";
import {
  authCode_validation,
  payment_validation,
} from "../utils/inputValidations";
import moment from "moment";

const paymentType = [{ value: "pos", label: "POS" }];
function CreatePayByPos({ handleClosePosPay, actionData, refreshData }) {
  const [errMsg, setErrMsg] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const methods = useForm({
    mode: "onChange",
  });
  const notify = (text) =>
    toast.success(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const onSubmit = methods.handleSubmit(
    async ({ authCode, paymentType, paymentDate, payment }) => {
      const newPosPayment = {
        authCode: authCode,
        paymentType: paymentType.value,
        paymentDate: moment(paymentDate).format("YYYY-MM-DD HH:mm"),
        totalPayment: +payment,
        id: actionData?.diagnosticsId
          ? actionData?.diagnosticsId
          : actionData?.doctorsVisitId
          ? actionData?.doctorsVisitId
          : null,
      };

      console.log(newPosPayment);
      try {
        await axiosPrivate.post(CREATE_POS_PAY, newPosPayment, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        refreshData();
        handleClosePosPay(false);
        //   notify(
        //     `${newAgent.name} գործընկերը ավելացված է`
        //   );
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else {
          setErrMsg(" Failed");
        }
      }
    }
  );
  return (
    <Modal show={() => true} size="xl" onHide={() => handleClosePosPay()}>
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          {actionData?.diagnosticsId ? (
            <p>Վճարում ախտորոշման համար</p>
          ) : actionData?.doctorsVisitId ? (
            <p>Վճարում Բժշկի այցելության համար</p>
          ) : (
            <></>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
                        <a href="#">Վճարում</a>
                      </div>
                      <div className="card-body">
                        <div className="modal-body">
                          {actionData?.diagnosticsId ? (
                            <div className="mt-0 mb-4">
                              <p>
                                Ախտորոշման համար:{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {actionData.diagnosticsId}
                                </span>
                              </p>
                              <p>
                                Այցելու:{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {actionData.clientLastName +
                                    " " +
                                    actionData.clientFirstName +
                                    " " +
                                    actionData.clientMidName}
                                </span>
                              </p>
                            </div>
                          ) : actionData?.doctorsVisitId ? (
                            <div className="mt-0 mb-4">
                              <p>
                                Այցելության համար:{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {actionData?.doctorsVisitId}
                                </span>
                              </p>
                              <p>
                                Այցելու:{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {actionData.clientLastName +
                                    " " +
                                    actionData.clientFirstName +
                                    " " +
                                    actionData.clientMidName}
                                </span>
                              </p>
                            </div>
                          ) : (
                            <></>
                          )}
                          <div className="row gx-3 mb-3">
                            <div className="col-sm-6">
                              <Input {...authCode_validation} min={'1'} />
                            </div>

                            <div className="col-sm-6">
                              <div className="d-flex justify-content-between me-2">
                                <label
                                  className="form-label"
                                  htmlFor="paymentType"
                                >
                                  Վճարման տեսակը
                                </label>
                                {methods.formState.errors.biomassType && (
                                  <span className="error text-red">
                                    <span>
                                      <img src={ErrorSvg} alt="errorSvg" />
                                    </span>{" "}
                                    պարտադիր
                                  </span>
                                )}
                              </div>
                                <Controller
                                  name="paymentType"
                                  control={methods.control}
                                  defaultValue={{label:'POS',value:'pos'}}
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      options={paymentType}
                                      placeholder={"Ընտրել"}
                                    />
                                  )}
                                />
                              </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                                <Input
                                  {...payment_validation}
                                  defaultValue={
                                    actionData?.totalPrice -
                                    actionData?.totalPayed
                                  }
                                  min={'1'}
                                />
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <div className="d-flex justify-content-between me-2">
                                  <label
                                    className="form-label"
                                    htmlFor="purchaseDate"
                                  >
                                    Վճարման ամսաթիվ
                                  </label>
                                   {(methods.formState.errors.paymentDate & !methods.formState.errors.notValidVisitDate?.message) ? (
                                    <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> պարտադիր</span>
                                    ):''}
                                  {methods.formState.errors.notValidVisitDate?.message && (
                                   
                                    <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> Սխալ ձևաչափ</span>
                                    )}
                                </div>
                                <div>
                                  <CustomDateTimeComponent
                                    name="paymentDate"
                                    control={methods.control}
                                    required={true}
                                    defaultValue={new Date()}
                                    methods={methods}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="separator-full"></div>

                    <div className="modal-footer align-items-center">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => handleClosePosPay(false)}
                      >
                        Չեղարկել
                      </button>
                      <button
                        type="button"
                        onClick={onSubmit}
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                      >
                        Ավելացնել
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </FormProvider>
      </Modal.Body>
    </Modal>
  );
}

export default CreatePayByPos;
