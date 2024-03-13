import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import React, { useRef, useState } from 'react'
import { Input } from '../Input';
import { desc_validation, name_validation } from '../../utils/inputValidations';
import { Modal } from "react-bootstrap";

import { Form, FormProvider, useForm} from "react-hook-form";
import { toast } from 'react-toastify';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { REGISTER_ROLE } from '../../utils/constants';
import Multiselect from 'multiselect-react-dropdown';

function CreateUserRole({setIsOpenRole,getUsers}) {
    const axiosPrivate = useAxiosPrivate();
    const typeMultiselectRef = useRef("");

    const [userType, setUserType] = useState('local');

    const [errMsg, setErrMsg] = useState("");
    const onUserTypeSelect = (data) => {
      switch (data[0].type) {
        case "Տեղում":
          setUserType("local");
          break;
        case "Շրջիկ":
          setUserType("mobile");
          break;
        case "Հեռավար":
          setUserType("remote");
          break;
        default:
          break;
      }
          
        };
    const methods = useForm({
        mode: "onChange",
      });
      const handleToggleCreateModal = (value) => {
        setIsOpenRole((prev) => value);
      };
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
    const onSubmit = methods.handleSubmit(async (name,description) => {
      const newRole = {
         name: name,
         description:description,
      };
  
     // console.log(newRole);
      try {
        await axiosPrivate.post(REGISTER_ROLE, newRole, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
  
        handleToggleCreateModal(false);
        getUsers();
        notify(
          `${newRole.name} դերը ավելացված է`
        );
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
    return (
      <Modal
        show={() => true}
        size="xl"
        onHide={() => handleToggleCreateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ width: "100%", textAlign: "center" }}>
            Ավելացնել նոր դեր
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
                          <a href="#">Դերի տվյալներ</a>
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
                                <Input {...name_validation} />
                              </div>
                              <div className="col-sm-6">
                                <Input {...desc_validation} />
                              </div>
                            </div>
                            <div className="row gx-3">
                          <div className="col-sm-6">
                              <label className="form-label" htmlFor="doctor">
                              Տեսակը
                              </label>
                              <Multiselect
                                options={[...[{type:"Տեղում"},{type:"Շրջիկ"},{type:"Հեռավար"}]]}
                                onSelect={onUserTypeSelect} 
                                closeOnSelect={true}
                                singleSelect
                                displayValue="type"
                                id="input_tags_5"
                                className="form-control"
                                ref={typeMultiselectRef}
                                hidePlaceholder={true}
                                placeholder="Ընտրել աշխատանքի տեսակը"
                                selectedValues={[{type:"Տեղում"}]}
                                style={{
                                  height: "10rem",
                                  overflow: "hidden",
                                }}
                                
                              />
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

export default CreateUserRole
