import React, { useEffect, useRef, useState } from 'react'
import { Modal } from "react-bootstrap";
import { Controller, Form, FormProvider, useForm} from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { DIAGNOSTICS_URL, TRANSFERFUNDS_URL } from '../utils/constants';
import makeAnimated from "react-select/animated";
import ErrorSvg from "../dist/svg/error.svg";
import Select from "react-select";
import { desc_validation, moneyTransfer_validation, paymentPurpose_validation, price_validation } from '../utils/inputValidations';
import { Input } from './Input';
import { toast } from 'react-toastify';

function DiagTransferModal({transfer,setTransfer,refreshData}) {
    const navigate = useNavigate()
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
    const [diagnostics, setDiagnostics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [diagnosticsPrice, setDiagnosticsPrice] = useState(0);
  const [errMsg, setErrMsg] = useState("");
  const storedUserData = JSON.parse(localStorage.getItem('userData'));

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
  const onDiagnosticSelect = ({totalPayed}) => {
      setDiagnosticsPrice(totalPayed)  
    };
    const methods = useForm({
        mode: "onChange",
      });
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

    multiValueLabel: (styles, { data }) => ({
      ...styles,
      backgroundColor: "#4eafcb",
      color: "#000",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      backgroundColor: "#4eafcb",
      color: "#e8e3e3",
      ":hover": {
        backgroundColor: "#4eafcb",
        color: "#eb3434",
      },
    }),
  };
      useEffect(() => {
        const fetchData = async () => {
          try {
            const diagResp = await axiosPrivate.get(DIAGNOSTICS_URL);
            setDiagnostics(diagResp?.data?.jsonString);
    
           
            setIsLoading(false);
          } catch (err) {
            console.log(err);
            navigate("/login", { state: { from: location }, replace: true });
          }
        };
        setTimeout(() => {
          fetchData();
        }, 500);
      }, [navigate]);
      const onSubmit = methods.handleSubmit(async (data) => {
        //console.log(mon)
        console.log(data)
        const newTransfer = {
          transAmount: +data?.moneyTransfer|| null,
          sourceId: transfer.diagnosticsId|| null,
          destId: data?.impDiag?.value || null,
          paymentPurpose:data?.paymentPurpose||null,
          userId:storedUserData?.userId||null
        };
    
        //const updatedData = deleteNullProperties(newDiagnose)
    if(data?.moneyTransfer<=transfer.totalPayed){

        try {
            await axiosPrivate.post(TRANSFERFUNDS_URL, newTransfer, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            
            setTransfer(false);
            refreshData();
            notify(
                `Փոխանցումը կատարված է`
            );
        } catch (err) {
            if (!err?.response) {
                setErrMsg("Համակարգի սխալ");
            }  else {
                setErrMsg("Համակարգի սխալ");
            }
        }
    }else if(data?.moneyTransfer>diagnosticsPrice) {
        setErrMsg('Մուտքագրված գումարի չափսը սխալ է')
    }
      });
  return (
    <Modal
    show={() => true}
    size="md"
    onHide={() => setTransfer(false)}
  >
    <Modal.Header closeButton>
      <Modal.Title style={{ width: "100%", textAlign: "center" }}>
      {transfer.name}
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
                        <a href="#">Փոխանցում</a>
                     
                      </div>
                      <div className="card-body">
                        <div className="modal-body">
                        <div className="row gx-3 mt-2">
                                <div className="col-sm-12">
                                  <div className="d-flex justify-content-between me-2">
                                
                                    <label
                                      className="form-label d-flex justify-content-between w-100"
                                      htmlFor="expDiag"
                                      placeholder={"Ընտրել"}
                                    >

                                      <div>Ելքագրվող</div><div>Հասանելի գումար: <span style={{color:'#4eafcb',}}>{transfer?.totalPayed}</span></div>
                                    </label>
                                    {methods.formState.errors.diagExp && (
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
                                      name="diagExp"
                                      control={methods.control}
                                      isClearable={true}
                                      defaultValue={null}
                                      rules={{ required: false }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          onChange={(val) => {
                                            field.onChange(val);
                                            onDiagnosticSelect(val);
                                          }}
                                          value={{value: transfer.diagnosticsId,
                                            label: `${transfer?.diagnosticsId} - ${transfer?.clientFirstName} ${transfer?.clientLastName} ${transfer?.clientMidName}`}}
                                          isDisabled
                                          options={diagnostics.map((res) => ({
                                            value: res.diagnosticsId,
                                            label: `${res?.diagnosticsId} - ${res?.clientFirstName} ${res?.clientLastName} ${res?.clientMidName}`,
                                            totalPayed: res?.totalPayed
                                          }))}
                                          placeholder={"Ախտորոշումներ"}
                                        />
                                      )}
                                    />
                                    
                                  </div>
                                </div>
                                <div className="col-sm-12">
                                  <div className="d-flex justify-content-between me-2">
                                  {/* {researchesPrice ? <div className="d-flex flex-row-reverse" ><p style={{color:'#4eafcb',}}>Ընդհանուր արժեք։ <span style={{fontWeight:'bold'}} >{researchesPrice}</span>դր․</p></div>:''} */}
                                    <label
                                      className="form-label"
                                      htmlFor="research"
                                      placeholder={"Ընտրել"}
                                    >
                                      Մուտքագրվող 
                                    </label>
                                    {methods.formState.errors.impDiag && (
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
                                      name="impDiag"
                                      control={methods.control}
                                      isClearable={true}
                                      defaultValue={null}
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          value={field.value}
                                          components={animatedComponents}
                                          options={diagnostics.map((res) => ({
                                            value: res.diagnosticsId,
                                            label: `${res?.diagnosticsId} - ${res?.clientFirstName} ${res?.clientLastName} ${res?.clientMidName}`,
                                          }))}
                                          placeholder={"Ախտորոշումներ"}
                                        />
                                      )}
                                    />
                                    
                                  </div>
                                </div>
                              </div>
                              <div className="row gx-3 mt-2">
                            <div className="col-sm-12">
                              <Input {...moneyTransfer_validation}/>
                            </div>
                            <div className="col-sm-12">
                              <Input {...paymentPurpose_validation} />
                            </div>
                          </div>
                        </div>
                        <div className='d-flex flex-row-reverse'>

                        <p style={{color:'red', fontSize:'12px'}}>{errMsg}</p>
                        </div>
                      </div>
                    </div>
                    <div className="separator-full"></div>

                    <div className="modal-footer align-items-center">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setTransfer(false)}
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
  )
}

export default DiagTransferModal
