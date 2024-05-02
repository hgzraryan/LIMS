import React, { Suspense, useState } from "react";
import { Form, FormProvider, useForm, Controller } from "react-hook-form";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Input } from "../Input";
import Select from "react-select";
import ErrorSvg from "../../dist/svg/error.svg";
import {
  shortName_validation,
  category_validation,
  purchasePrice_validation,
  deliveryTimeLimit_validation,
  biomaterial_validation,
  serviceName_validation,
  categoryName_validation,
  vial_validation,
  laboratoryService_validation,
  samplingPeriod_validation,
  researchPrepSub_validation,
  researchName_validation,
  price_validation,
} from "../../utils/inputValidations";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LoadingSpinner from "../LoadingSpinner";
import { RESEARCHLISTS_URL } from "../../utils/constants";
import { deleteNullProperties } from "../../utils/helper";

const researchListClassState = [
  { value: "External", label: "Արտաքին" },
  { value: "Internal", label: "Ներքին" },
  { value: "Other", label: "Այլ" },
];
function ResearchListEditModal({ researchList, setEditRow, refreshData }) {
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const methods = useForm({
    mode: "onChange",
  });
  const onSubmit = methods.handleSubmit(
    async ({
      researchName,
      laboratoryService,
      categoryName,
      serviceName,
      shortName,
      deliveryTimeLimit,
      biomaterial,
      vial,
      samplingPeriod,
      researchPrepSub,
      category,
      researchType,
      purchasePrice,
      price,
    }) => {
      const updatedResearchList = {
        researchName:
          researchName?.trim() !== researchList?.researchName?.trim()
            ? researchName
            : null,
        // localCode:
        //   localCode?.trim() !== researchList?.localCode?.trim()
        //     ? localCode
        //     : null,
        // partnerCode:
        //   partnerCode?.trim() !== researchList?.partnerCode?.trim()
        //     ? partnerCode
        //     : null,
        laboratoryService:
          laboratoryService?.trim() !== researchList?.laboratoryService?.trim()
            ? laboratoryService
            : null,
        categoryName:
          categoryName?.trim() !== researchList?.categoryName?.trim()
            ? categoryName
            : null,
        category:
          category?.trim() !== researchList?.category?.trim() ? category : null,
        serviceName:
          serviceName?.trim() !== researchList?.serviceName?.trim()
            ? serviceName
            : null,
        shortName:
          shortName?.trim() !== researchList?.shortName?.trim()
            ? shortName
            : null,
        price: +price !== +researchList?.price ? price : null,
        purchasePrice:
          +purchasePrice !== researchList?.purchasePrice ? purchasePrice : null,
        deliveryTimeLimit:
          deliveryTimeLimit?.trim() !== researchList?.deliveryTimeLimit?.trim()
            ? deliveryTimeLimit
            : null,
        biomaterial:
          biomaterial?.trim() !== researchList?.biomaterial?.trim()
            ? biomaterial
            : null,
        vial: vial?.trim() !== researchList?.vial?.trim() ? vial : null,
        samplingPeriod:
          samplingPeriod?.trim() !== researchList?.samplingPeriod?.trim()
            ? samplingPeriod
            : null,
        researchPrepSub:
          researchPrepSub?.trim() !== researchList?.researchPrepSub?.trim()
            ? researchPrepSub
            : null,
        class:
          researchType?.value?.trim() !== researchList?.class?.trim()
            ? researchType?.value
            : null,
        //additional: editorRef.current.getContent({ format: "text" }),
        //currency:currency,
      };
      const updatedFields = deleteNullProperties(updatedResearchList);
      console.log(updatedFields);
      try {
        await axiosPrivate.put(
          RESEARCHLISTS_URL,
          { updatedFields, id: researchList.researchListId },
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
                                      {...researchName_validation}
                                      defaultValue={researchList?.researchName}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...shortName_validation}
                                      defaultValue={researchList?.shortName}
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...category_validation}
                                      defaultValue={researchList?.category}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...categoryName_validation}
                                      defaultValue={researchList?.categoryName}
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...deliveryTimeLimit_validation}
                                      defaultValue={
                                        researchList?.deliveryTimeLimit
                                      }
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...biomaterial_validation}
                                      defaultValue={researchList?.biomaterial}
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...serviceName_validation}
                                      defaultValue={researchList?.serviceName}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...laboratoryService_validation}
                                      defaultValue={
                                        researchList?.laboratoryService
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...vial_validation}
                                      defaultValue={researchList?.vial}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...samplingPeriod_validation}
                                      defaultValue={
                                        researchList?.samplingPeriod
                                      }
                                    />
                                  </div>
                                </div>
                                {/* <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...localCode_validation}
                                      defaultValue={researchList?.localCode}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...partnerCode_validation}
                                      defaultValue={researchList?.partnerCode}
                                    />
                                  </div>
                                </div> */}
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="diagnosticsType"
                                      >
                                        Հետազոտության տեսակ
                                      </label>
                                      {methods.formState.errors
                                        .researchType && (
                                        <span className="error text-red">
                                          <span>
                                            <img
                                              src={ErrorSvg}
                                              alt="errorSvg"
                                            />
                                          </span>{" "}
                                          պարտադիր
                                        </span>
                                      )}
                                    </div>
                                    <div className="form-control">
                                      <Controller
                                        name="researchType"
                                        control={methods.control}
                                        defaultValue={researchListClassState.find(
                                          (option) =>
                                            option.value === researchList?.class
                                        )}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                          <Select
                                            {...field}
                                            options={researchListClassState}
                                            placeholder={"Ընտրել"}
                                            style={{ appearance: "auto" }}
                                          />
                                        )}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...researchPrepSub_validation}
                                      defaultValue={
                                        researchList?.researchPrepSub
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...purchasePrice_validation}
                                      defaultValue={researchList?.purchasePrice}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...price_validation}
                                      defaultValue={researchList?.price}
                                    />
                                  </div>
                                  {/* <div className="col-sm-6">
                              <label htmlFor="price"className="mb-2">Արժեք</label>
                              <div className="form-control d-flex ">
                                <select
                                  id="currency"
                                  value={currency}
                                  onChange={handleCurrencyChange}
                                  style={{ border: "none", outline: "none" }}
                                >
                                  <option value="AMD">AMD</option>
                                  <option value="USD">USD</option>
                                  <option value="EUR">EUR</option>
                                  <option value="GBP">GBP</option>
                                  <option value="RU">RU</option>
                                </select>
                                <input
                                  type="number"
                                  id="amount"
                                  value={amount}
                                  onChange={handleAmountChange}
                                  placeholder="Enter amount"
                                  style={{
                                    border: "none",
                                    outline: "none",
                                    flex: 1,
                                  }}
                                />
                              </div>
                            </div> */}
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
                                apiKey='yx10svi3vbrzauhd8j5jtut8pi6v59tb9ozhno5b1qcz902v'
                                onInit={(evt, editor) =>
                                  (editorRef.current = editor)
                                }
                                init={{
                                  plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
                                  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                  tinycomments_mode: 'embedded',
                                  tinycomments_author: 'Author name',
                                  mergetags_list: [
                                    { value: 'First.Name', title: 'First Name' },
                                    { value: 'Email', title: 'Email' },
                                  ],
                                  ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                }}
                                
                              />
                              </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div> */}
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

export default ResearchListEditModal;
