import React, { Suspense, useState } from "react";
import { Form, FormProvider, useForm, Controller } from "react-hook-form";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Input } from "../Input";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LoadingSpinner from "../LoadingSpinner";
import { deleteNullProperties } from "../../utils/helper";
import { EQUIPMENTS_URL } from "../../utils/constants";
import { equipmentType_validation, location_validation, manufacturer_validation, model_validation, name_validation, serialNumber_validation } from "../../utils/inputValidations";
import CustomDateComponent from "../CustomDateComponent";
import ErrorSvg from "../../dist/svg/error.svg";
import Select from "react-select";

const EquipmentStatus = [
    {value:'Operational', label: "Սարքին" },
    {value:'Under Maintenance', label: "Վերանորոգվում է" },
    {value:'Out of Service', label: "Չի աշխատում" },
  ];

function EquipmentEditModal({ equipment, setEditRow, refreshData }) {
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
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
        async ({
          name,
          equipmentType,
          manufacturer,
          model,
          serialNumber,
          locationValid,
          purchaseDate,
          warrantyExpiryDate,
          equipmentStatus
        }) => {
            const newPurchaseDate = purchaseDate
        ? new Date(
            purchaseDate.getTime() - purchaseDate.getTimezoneOffset() * 60000
          )
            .toISOString()
            .split("T")[0]
        : null;
            const newExpireDate = warrantyExpiryDate
        ? new Date(
            warrantyExpiryDate.getTime() - warrantyExpiryDate.getTimezoneOffset() * 60000
          )
            .toISOString()
            .split("T")[0]
        : null;
          const updatedEquipment = {
            equipmentName: name?.trim() !== equipment?.equipmentName?.trim() ? name : null,
            equipmentType: equipmentType?.trim() !== equipment?.equipmentType?.trim() ? equipmentType : null,
            manufacturer: manufacturer?.trim() !== equipment?.manufacturer?.trim() ? manufacturer : null,
            model: model?.trim() !== equipment?.model?.trim() ? model : null,
            serialNumber: serialNumber?.trim() !== equipment?.serialNumber?.trim() ? serialNumber : null,
            location: locationValid?.trim() !== equipment?.location?.trim() ? locationValid : null,
            status: equipmentStatus?.value?.trim() !== equipment?.status?.trim()
            ? equipmentStatus?.value
            : null,
            purchaseDate: equipment?.purchaseDate?.split('T')[0] !== newPurchaseDate ? equipment?.purchaseDate?.split('T')[0] : null,
            warrantyExpiryDate: equipment?.warrantyExpiryDate?.split('T')[0] !== newExpireDate ? equipment?.warrantyExpiryDate?.split('T')[0] : null,
          };
    
      
          const updatedFields = deleteNullProperties(updatedEquipment);
          //console.log(updatedEquipment);
          try {
            await axiosPrivate.put(EQUIPMENTS_URL, { updatedFields, id: equipment.equipmentId }, {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            });
    
            setEditRow(false);
            refreshData();
            //notify(`${newEquipment.name} Սարքավորումը ավելացված է`);
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
            Թարմացնել ыф8йфмц8ьфт տվյալները
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
                              <a href="#">Սարքավորման տվյալներ</a>
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
                                    <Input {...name_validation}  defaultValue={equipment?.equipmentName}/>
                                  </div>
                                  <div className="col-sm-6">
                                    <Input {...equipmentType_validation} defaultValue={equipment?.equipmentType}/>
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input {...manufacturer_validation} defaultValue={equipment?.manufacturer}/>
                                  </div>
                                  <div className="col-sm-6">
                                    <Input {...model_validation} defaultValue={equipment?.model}/>
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input {...serialNumber_validation} defaultValue={equipment?.serialNumber}/>
                                  </div>
                                  <div className="col-sm-6">
                                    <Input {...location_validation} defaultValue={equipment?.location}/>
                                  </div>
                                </div>
      
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="purchaseDate"
                                        >
                                        Գնման ամսաթիվ
                                      </label>
                                        {methods.formState.errors.purchaseDate && (
                                          <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> պարտադիր</span>
                                          )}
                                          </div>
                                      <div></div>
                                      <div>                                  
                                        <CustomDateComponent name="purchaseDate" control={methods.control} defaultValue={equipment?.purchaseDate}/>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="warrantyExpiryDate"
                                        >
                                        Երաշխիքի ավարտի ամսաթիվ
                                      </label>
                                        {methods.formState.errors.warrantyExpiryDate && (
                                          <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> պարտադիր</span>
                                          )}
                                          </div>
                                      <div>
                                        <CustomDateComponent name="warrantyExpiryDate" control={methods.control} defaultValue={equipment?.warrantyExpiryDate}/>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row gx-3">
                                <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="equipmentStatus"
                                      >
                                        Հետազոտության տեսակ
                                      </label>
                                      {methods.formState.errors
                                        .equipmentStatus && (
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
                                        name="equipmentStatus"
                                        control={methods.control}
                                        defaultValue={EquipmentStatus.find(
                                          (option) =>
                                            option.value === equipment?.status
                                        )}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                          <Select
                                            {...field}
                                            options={EquipmentStatus}
                                            placeholder={"Ընտրել"}
                                            style={{ appearance: "auto" }}
                                          />
                                        )}
                                      />
                                    </div>
                                  </div>
                                  {/* <div className="col-sm-6">
                                    <label
                                      className="form-label"
                                      htmlFor="internalDiagnosticsStatus"
                                    >
                                      Սարքավորման կարգավիճակը
                                    </label>
                                    <Multiselect
                                      options={status}
                                      displayValue="status"
                                      onSelect={onStatusChange}
                                      closeOnSelect={true}
                                      singleSelect
                                      id="input_tags_4"
                                      className="form-control"
                                      placeholder="Ընտրեք կարգավիճակը"
                                      selectedValues={[{ status: "Սարքին" }]}
                                      //hidePlaceholder={true}
                                      style={{
                                        height: "10rem",
                                        overflow: "hidden",
                                      }}
                                    />
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
  )
}

export default EquipmentEditModal
