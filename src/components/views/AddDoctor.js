import React, { useEffect, useRef, useState } from "react";
import useSubmitForm from "../../hooks/useSubmitForm";
import { Editor } from "@tinymce/tinymce-react";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import MissingAvatar from "../../dist/img/Missing.svg";
import { Input } from "../Input";
import {
  address_validation,
  email_validation,
  emergencyContactNumber_validation,
  emergencyContactName_validation,
  fullName_validation,
  licenseNumber_validation,
  mobile_validation,
  specialty_validation,
  qualification_validation,
  state_validation,
  country_validation,
  city_validation,
  street_validation,
  zipCode_validation,
  additional_validation,
} from "../../utils/inputValidations";
import { Form, Modal } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Multiselect from "multiselect-react-dropdown";
import DatePicker from "react-datepicker";
import { useCalculateAge } from "../../hooks/useCalculateAge";
import { toast } from "react-toastify";

const REGISTER_DOCTOR = "/registerDoctor";
function AddDoctor({ handleToggleCreateModal, getDoctors }) {
  const axiosPrivate = useAxiosPrivate();
  const multiselectRef = useRef("");
  const [birthday, setBirthday] = useState(new Date());
  const genderRef = useRef("");
  const doctorStateRef = useRef("");
  const intupAvatarRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(MissingAvatar);
  const [image, setImage] = useState("");
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const fileReader = new FileReader();
  const formData = new FormData();
  const editorRef = useRef(null);
  const { age } = useCalculateAge(birthday);

  const onGenderSelect = (data) => {
    genderRef.current = data[0].gender;
  };
  const onDoctorStateSelect = (data) => {
    doctorStateRef.current = data[0].gender;
  };
  const getAge = (date) => {
    setBirthday(date);
  };
  fileReader.onloadend = () => {
    setImageUrl(fileReader.result);
  };

  const handleChangeFile = async (event) => {
    const image = event.target.files[0];
    if (!image.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setImage(image);
    try {
      formData.append("image", event.target.files[0]);
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (image) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setImageUrl(result);
        }
      };
      fileReader.readAsDataURL(image);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [image]);

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    if (event.dataTransfer.files && event.dataTransfer.files.length) {
      setImage(event.dataTransfer.files[0]);
      fileReader.readAsDataURL(event.dataTransfer.files[0]);
    }
  };
  const handleDragEmpty = (event) => {
    event.preventDefault();
    if (event.stopPropagation) {
      event.stopPropagation();
    }
  };
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
      fullName,
      email,
      mobile,
      street,
      city,
      state,
      country,
      zipCode,
      specialty,
      qualification,
      licenseNumber,
      current,
      emergencyContactName,
      doctorState,
    }) => {
      const newDoctor = {
        doctorName: fullName,
        contact: {
          email: email,
          phone: mobile,
        },
        address: {
          street: street,
          city: city,
          state: state,
          country: country,
          zipCode: zipCode,
        },
        specialty: specialty,
        qualification: qualification,
        licenseNumber: licenseNumber,
        gender: genderRef.current,
        dateOfBirth: new Date(
          birthday.getTime() - birthday.getTimezoneOffset() * 60000
        )
          .toISOString()
          .split("T")[0],
        emergencyContactName: emergencyContactName,
        profilePictureUrl: "profilePictureUrl",
        isActive: doctorState,
      };
     

      console.log(newDoctor);

      formData.append("text", JSON.stringify(newDoctor));
      formData.append("image", image);
      try {
        await axiosPrivate.post(REGISTER_DOCTOR, newDoctor, {
          headers: { "Content-Type": "application/json" },
         // headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });

        handleToggleCreateModal(false);
        getDoctors("update");
        notify(`${newDoctor.fullName}  Բժիշկը ավելացված է`)

      } catch (err) {
        console.log(err)
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
    <Modal
      show={() => handleToggleCreateModal(true)}
      size="xl"
      onHide={() => handleToggleCreateModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Ավելացնել նոր բժիշկ
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
                    <div className="text-center mt-5">
                      <div className="dropify-circle edit-img">
                        <img
                          width={"100px"}
                          height={"100px"}
                          style={{
                            borderRadius: "50%",
                            cursor: "pointer",
                          }}
                          onClick={() => intupAvatarRef.current.click()}
                          src={imageUrl}
                          className="avatar_upload_preview"
                          alt="preview"
                          onDrop={handleDrop}
                          onDragEnter={handleDragEmpty}
                          onDragOver={handleDragEmpty}
                        />
                        <input
                          hidden
                          type="file"
                          ref={intupAvatarRef}
                          onChange={handleChangeFile}
                          className="dropify-1"
                          //data-default-file="dist/img/avatar2.jpg"
                        />
                      </div>
                      <div className="cp-name text-truncate mt-3">
                        Բժշկի նկարը
                      </div>

                      <div
                        className="rating rating-yellow my-rating-4"
                        data-rating="3"
                      ></div>
                      <p>&nbsp;</p>
                    </div>

                    <div className="card">
                      <div className="card-header">
                        <a href="#">Անձնական տվյալներ</a>
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
                              <Input {...fullName_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...specialty_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...qualification_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...licenseNumber_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...country_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...state_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...city_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...street_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...zipCode_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...additional_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...email_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...mobile_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <label className="form-label" htmlFor="gender">
                                Սեռ
                              </label>
                              <Multiselect
                                options={[
                                  { gender: "Արական" },
                                  { gender: "Իգական" },
                                  { gender: "այլ" },
                                ]} // Options to display in the dropdown
                                displayValue="gender" // Property name to display in the dropdown options
                                onSelect={onGenderSelect} // Function will trigger on select event
                                //  onRemove={onResearchDelete} // Function will trigger on remove event
                                closeOnSelect={true}
                                singleSelect
                                id="input_tags_4"
                                className="form-control"
                                ref={multiselectRef}
                                hidePlaceholder={true}
                                placeholder="Սեռ"
                                style={{
                                  height: "10rem",
                                  overflow: "hidden",
                                }}
                              />
                            </div>
                            <div className="col-sm-6">
                              <label className="form-label" htmlFor="gender">
                                Կարգավիճակ
                              </label>
                              <Multiselect
                                options={[
                                  { doctorState: "Ակտիվ" },
                                  { doctorState: "Ոչ Ակտիվ" },
                                ]} // Options to display in the dropdown
                                displayValue="doctorState" // Property name to display in the dropdown options
                                onSelect={onDoctorStateSelect} // Function will trigger on select event
                                //  onRemove={onResearchDelete} // Function will trigger on remove event
                                closeOnSelect={true}
                                singleSelect
                                id="input_tags_4"
                                className="form-control"
                                ref={doctorStateRef}
                                hidePlaceholder={true}
                                placeholder="Կարգավիճակ"
                                style={{
                                  height: "10rem",
                                  overflow: "hidden",
                                }}
                              />
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label
                                  className="form-label"
                                  htmlFor="handlingDate"
                                >
                                  Ծննդյան ամսաթիվ
                                </label>
                                <div>
                                  <DatePicker
                                    showYearDropdown
                                    yearDropdownItemNumber={100}
                                    scrollableYearDropdown
                                    selected={birthday}
                                    onChange={(date) => getAge(date)}
                                    dateFormat={"yyyy-MM-dd"}
                                    isClearable
                                    placeholderText="Select date"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...emergencyContactName_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...emergencyContactNumber_validation} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer align-items-center">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => handleToggleCreateModal(false)}
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

export default AddDoctor;