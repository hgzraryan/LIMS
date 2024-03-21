import React, { useRef, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import FeatherIcon from "feather-icons-react";
import MissingAvatar from "../../dist/img/Missing.svg";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";
import {
  firstName_validation,
  lastName_validation,
  email_validation,
  mobile_validation,
  password_validation,
  user_validation,
  position_validation,
  country_validation,
  city_validation,
  state_validation,
  street_validation,
  zipCode_validation,
  additional_validation,
  emergencyContactName_validation,
} from "../../utils/inputValidations";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {  toast } from 'react-toastify';
import ReactDatePicker from "react-datepicker";
import { REGISTER_USER } from "../../utils/constants";
import PhoneInput from "react-phone-number-input";
import ErrorSvg from "../../dist/svg/error.svg";
import CustomPhoneComponent from "../CustomPhoneComponent";
import CustomDateComponent from "../CustomDateComponent";
import Select, { StylesConfig } from "react-select";
import makeAnimated from "react-select/animated";
import 'react-phone-number-input/style.css'
import { CountryDropdown, RegionDropdown,CountryRegionData  } from 'react-country-region-selector';

const roleState = [
    { label:'Ադմին',name: "Admin", value: 5150 },
    { label:'Հաստատող',name: "Approver", value: 3345 },
    { label:'Փոփոխող',name: "Editor", value: 1984 },
    { label:'Օգտատեր',name: "User", value: 2001 },
    { label:'Նմուշառող',name: "Sampler", value: 1212 },
    { label:'Բժիշկ',name: "Doctor", value: 9578 },  
  ]

function CreateUser({ setIsOpen,getUsers }) {
  const axiosPrivate = useAxiosPrivate();
  const intupAvatarRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(MissingAvatar);
  const [userType, setUserType] = useState('local');
  const [image, setImage] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const fileReader = new FileReader();
  const formData = new FormData();
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
  const [gender, setGender] = useState(""); 
  const [merried, setMerried] = useState(""); 
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')


  const { trigger } = useForm();

 useEffect(() => {
    if (CountryRegionData[11][0] === "Armenia") {
      CountryRegionData[11][0] = "Հայաստան"
      CountryRegionData[11][2] = "Արագածոտն~AG|Արարատ~AR|Արմավիր~AV|Գեղարքունիք~GR|Կոտայք~KT|Լոռի~LO|Շիրակ~SH|Սյունիք~SU|Տավուշ~TV|Վայոց Ձոր~VD|Երևան~ER";
    }
  }, []);
  const animatedComponents = makeAnimated();
  const colourStyles = {
    control: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: "#fff",
      borderColor: isFocused ? "#fff" : "#e8e3e3",
      boxShadow: "#e8e3e3",

      ":hover": {
        borderColor: "#fff",
      },
    }),
    option: (styles, { data }) => ({
      ...styles,
      zIndex:100,
    }),
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      backgroundColor: "#0096fb",
      color: "#fff",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      backgroundColor: "#0096fb",
      color: "#e8e3e3",
      ":hover": {
        backgroundColor: "#0096fb",
        color: "#eb3434",
      },
    }),
  };
  
  useEffect(() => {
    setTimeout(() => {
      const getData = async () => {
        try {
          const response = await axiosPrivate.get(`/userroles`);
          console.log(response)
          // setIsLoading(false);
          // setOrganizationDiagnostics(((prev) => response.data));
          // setCurrentPage((prev) => prev = 1);
        } catch (err) {
          console.error(err);
          //navigate("/login", { state: { from: location }, replace: true });
        }
      };
      
      getData();
    }, 500);
  }, []);
  const onGenderSelect = (event) => {
    setGender(prev=>event.target.value)
  };
  const onUserMerriedSelect = (event) => {
    setMerried(prev=>event.target.value)
  };

  const methods = useForm({
    mode: "onChange",
  });
  const [validName, setValidName] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  /*------------------ Create user Component --------------------*/
  const handleToggleCreateModal = (value) => {
    setIsOpen((prev) => value);
  };
  /*------------------------------------------------*/
  const getAge = (date) => {
    
    setBirthday(date)
  };

  const notify = (text) => toast.success(text, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  const onSubmit = methods.handleSubmit(async ({firstName,
    lastName,
    position,
    email,
    user,
    password,
    phone,
    street,
    city,
    state,
    country,
    zipCode,
    gender,
    maritalStatus,
    roles,
    // emergencyContactNumber,
    // emergencyContactName,
    dateOfBirth}) => {
   
    const newUser = {
      firstname:firstName,
      lastname:lastName,
      position:position,
      email:email,
      contact: {
        phone: phone,
        address: {
          street: street,
          city: city,
          state: state,
          country: country,
          zipCode: zipCode,
        },
      },
      gender: gender,
      maritalStatus:maritalStatus,
      username:user,
      password:password,
      roles: onRoleSelect(roles),
      //type:userType,
      // emergencyContactName:emergencyContactName,
      // emergencyContactNumber:emergencyContactNumber,
      birthday:new Date(
        dateOfBirth.getTime() - dateOfBirth.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0],
    };
    formData.append("text", JSON.stringify(newUser));
    formData.append("image", image);      
    console.log(newUser)
    try {
      await axiosPrivate.post(REGISTER_USER, newUser, {
        headers: { "Content-Type": "application/json"  },
        withCredentials: true,
      });
      
      handleToggleCreateModal(false);
      getUsers();
      notify(`${newUser.firstname} ${newUser.lastname} աշխատակիցը ավելացված է`)

    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg(" Failed");
      }
    }
  });
  const onRoleSelect = (data) => {
    let rolesArr = {};
    for (let role of data) {
      rolesArr[role.name]=role.value
    }
    return rolesArr
  };
  /*----------------ADD USER END---------------------*/
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

  return (
    <Modal
      show={() => handleToggleCreateModal(true)}
      size="xl"
      onHide={() => handleToggleCreateModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Ավելացնել նոր աշխատակից
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
                        Աշխատակցի նկարը
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
                              <Input {...firstName_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...lastName_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...position_validation} />
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                              <div className="d-flex justify-content-between me-2">
                                <label
                                  className="form-label"
                                  htmlFor="purchaseDate"
                                  >
                                  Ծննդյան ամսաթիվ
                                </label>
                                  {methods.formState.errors.dateOfBirth && (
                                    <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> պարտադիր</span>
                                    )}
                                    </div>
                                <div>                                  
                                   <CustomDateComponent name="dateOfBirth" control={methods.control}/>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...email_validation} />
                            </div>
                            <div className="col-sm-6">
                            <div className="d-flex justify-content-between me-2">
                              <label className="form-label" htmlFor="phoneNumber">
                                Հեռախոս
                              </label>
                              {methods.formState.errors.phone && (
                                    <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> պարտադիր</span>
                                    )}
                                    </div>
                              
                              <CustomPhoneComponent name="phone"  control={methods.control} />  

                            </div>
                          </div>
                          <div className="row gx-3">
                          <div className="col-sm-6">
                            <div className="d-flex justify-content-between me-2">
                              <label className="form-label" htmlFor="country">
                                Երկիր
                              </label>
                              {methods?.formState.errors.country && (
                                <span className="error text-red">
                                  <img src={ErrorSvg} alt="errorSvg" />
                                  Պարտադիր
                                </span>
                              )}
                              </div>
                              <Controller
                                name="country"
                                control={methods.control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => (
                                  <CountryDropdown
                                    {...field}
                                    classes="form-control"
                                    defaultOptionLabel="Երկիր"
                                    value={country}
                                    priorityOptions={['Armenia']}
                                    onChange={(val) => {
                                      field.onChange(val);
                                      setCountry(val);
                                      trigger("country");
                                    }}
                                    style={{
                                      appearance:'auto'
                                    }}
                                  />
                                )}
                              />
                            </div>
                            <div className="col-sm-6">
                            <div className="d-flex justify-content-between me-2">
                            <label className="form-label" htmlFor="state">
                                  Մարզ
                                </label>
                                {methods?.formState.errors.state && (
                                  <span className="error text-red">
                                    <span>
                                      <img src={ErrorSvg} alt="errorSvg" />
                                    </span>
                                    պարտադիր
                                  </span>
                                )}
                                </div>
                                <Controller
                                name="state"
                                control={methods.control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => (
                                  <RegionDropdown
                                  blankOptionLabel="Մարզ"
                                  defaultOptionLabel="Մարզ"
                                  classes="form-control"
                                  country={country}
                                  value={region}
                                  onChange={(val) => {
                                    field.onChange(val);
                                    setRegion(val);
                                    trigger("state");
                                  }}
                                  style={{
                                    appearance:'auto'
                                  }}
                                />                           
                          )}
                        />
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
                              <div className="d-flex justify-content-between me-2">
                                <label
                                  className="form-check-label"
                                  htmlFor="gender"
                                >
                                  Սեռ
                                </label>
                                {methods.formState.errors.gender && (
                                  <span className="error text-red">
                                    <span>
                                      <img src={ErrorSvg} alt="errorSvg" />
                                    </span>{" "}
                                    պարտադիր
                                  </span>
                                )}
                              </div>
                              <div className="d-flex  align-items-center">
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    id="male"
                                    value="Male"
                                    onChange={() => onGenderSelect("Male")}
                                    {...methods.register("gender", {
                                      required: true,
                                    })}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="male"
                                  >
                                    Արական
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    id="female"
                                    value="Female"
                                    onChange={() => onGenderSelect("Female")}
                                    {...methods.register("gender", {
                                      required: true,
                                    })}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="female"
                                  >
                                    Իգական
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="mb-2">
                            <div className="d-flex justify-content-between me-2">
                              <label className="form-check-label" htmlFor="male">
                              Ընտանեկան կարգավիճակ
                              </label>
                              {methods.formState.errors.maritalStatus && (
                                  <span className="error text-red">
                                    <span>
                                      <img src={ErrorSvg} alt="errorSvg" />
                                    </span>{" "}
                                    պարտադիր
                                  </span>
                                )}
                                </div>
                            </div>
                            <div className="d-flex  align-items-center">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  id="married"
                                  value="married"                                
                                  onChange={() => onUserMerriedSelect("married")}
                                    {...methods.register("maritalStatus", {
                                      required: true,
                                    })}
                                />
                              <label className="form-check-label" htmlFor="married">
                              Ամուսնացած
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                id="single"
                                value="single"
                                onChange={() => onUserMerriedSelect("single")}
                                    {...methods.register("maritalStatus", {
                                      required: true,
                                    })}
                              />
                              <label className="form-check-label" htmlFor="single">
                              Չամուսնացած
                              </label>
                              </div>
                              </div>
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...user_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...password_validation} />
                            </div>
                          </div>
                          
                          {/* <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...emergencyContactName_validation} />
                            </div>
                            <div className="col-sm-6">
                              <div className="d-flex justify-content-between me-2">
                              <label className="form-label" htmlFor="phoneNumber">
                              Լրացուցիչ կոնտակտի հեռախոս
                              </label>
                              {methods.formState.errors.emergencyContactNumber && (
                                    <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> պարտադիր</span>
                                    )}
                                    </div>                              
                              <CustomPhoneComponent name="emergencyContactNumber"  control={methods.control} />     
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="separator-full"></div>
                    <div className="card">
                      <div className="card-header">
                        <a href="#">Դերեր</a>
                        <button
                          className="btn btn-xs btn-icon btn-rounded btn-light"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Add Tags"
                        >
                          <span
                            className="icon"
                            data-bs-toggle="modal"
                            data-bs-target="#tagsInput"
                          >
                            <span className="feather-icon">
                              <FeatherIcon icon="edit-2" />
                            </span>
                          </span>
                        </button>
                      </div>
                      <div className="card-body">
                        <div className="modal-body">
                          <form>
                          <div className="row gx-3">
                                <div className="col-sm-12">
                                  <div className="d-flex justify-content-between me-2">
                                    <label
                                      className="form-label"
                                      htmlFor="research"
                                      placeholder={"Ընտրել"}
                                    >
                                    Ավելացնել դերեր
                                    </label>
                                    {methods.formState.errors.roles && (
                                      <span className="error text-red">
                                        <span>
                                          <img src={ErrorSvg} alt="errorSvg" />
                                        </span>{" "}
                                        պարտադիր
                                      </span>
                                    )}
                                  </div>
                                  <div className="form-control">
                                    <Controller
                                      name="roles"
                                      control={methods.control}
                                      isClearable={true}
                                      defaultValue={null}
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          isMulti
                                          closeMenuOnSelect={false}
                                          components={animatedComponents}
                                          options={roleState}
                                          styles={colourStyles}
                                          placeholder={"Ընտրել"}
                                          menuPlacement="top"
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                              </div>
                          </form>
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

export default CreateUser;
