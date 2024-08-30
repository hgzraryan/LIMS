import React, { Suspense, useState } from 'react'
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Controller, Form, FormProvider, useForm} from "react-hook-form";
import ErrorSvg from "../dist/svg/error.svg";
import LoadingSpinner from './LoadingSpinner';
import Select from "react-select";
import moment from 'moment';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {utils, writeFile} from 'xlsx';
import { CSVLink } from "react-csv";
import { deleteNullProperties } from '../utils/helper';
import makeAnimated from "react-select/animated";
import CustomExportDateComponent from './CustomExportDateComponent';

function ExportData({handleToggleExportModal,toggleExport,section,refDoctors=[]}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [active, setActive] = useState(true);
    const [dateChanged, setDateChaged] = useState(false);
    const [diagExport, setDiagExport] = useState(false);
    const [exportData, setExportData] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const animatedComponents = makeAnimated();
    const handleDateChanged = (date) => {
      setDateChaged(true)
    }
    const onDiagExportSelect = (event) => {
      setDiagExport(prev=>event.target.value)
    };
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
  
    const methods = useForm({
        mode: "onChange",
      });
      
      const onSubmit = methods.handleSubmit(async ({dates,refDoctor}) => {
        const newReportDates = {        
          startDate:dates.startDate?moment(dates.startDate).format('YYYY-MM-DD'):null,
          endDate:dates.endDate?moment(dates.endDate).format('YYYY-MM-DD'):null,  
          refDoctor:refDoctor?refDoctor.map((el) => el.id):null  
        }
        const updatedFields = deleteNullProperties(newReportDates);
        // console.log(updatedFields)
        // console.log(refDoctor)
        
        try {
          setIsLoading(true);
            const response = await axiosPrivate.post(`/reportExport/${diagExport==='diagnostics'
              ?section
              :diagExport==='researches'
              ?section+'Researches':section}`,updatedFields)
          setExportData(response?.data?.jsonString);
          setIsLoading(false);
          setActive(false);
          setIsDone(true)
          setTimeout(()=>{
            setIsDone(false)

          },5000)
 
        } catch (err) {
          if (!err?.response) {
            setErrMsg("No Server Response");
          }  else {
            setErrMsg(" Failed");
          }
        }
      }); 
      const findResearches = (statusBoard) => {
        return statusBoard?.flatMap(elem => elem.researches.map(research => research.name));
      }
      const handleExportDiagnostics = (exportName,exportData)=>{
        if(section === 'diagnostics' && diagExport==='diagnostics'){
          console.log(exportData)
            const formatedData=exportData.map((el)=>{
              
              console.log(el)
                return {
                    ...el,
                    researchList: findResearches(el.statusBoard)
                }
            })    
            console.log(formatedData)        
            exportData = formatedData.map(item => ({
          ...item,
          diagnosticsId:item.diagnosticsId,
          researchList: item.researchList.join(',\n '),
          createdAt:moment(item.createdAt).format('DD-MM-YYYY HH:mm'),
          generationDate:moment(item.generationDate).format('DD-MM-YYYY HH:mm'),
          updatedAt:moment(item.updatedAt).format('DD-MM-YYYY HH:mm'),
          clientDob:moment(item.clientDob).format('DD-MM-YYYY'),
          clientGender:item.clientGender==="Male"?'Արական':item.clientGender==="Female"?'իգական':'',
          diagStatus:item.diagStatus==="Active"?'Ակտիվ':item.diagStatus==="Cancelled"?'Չեղարկված':'',
          class:item.class==="Internal"?'Ներքին':item.class==="External"?'Արտաքին':'',
          internalStatus:item?.internalStatus==="Approval"?'Ընդունված':item?.internalStatus==="Delayed"?"Հետաձգված":item?.internalStatus==="Generated"?"Ստեղծված":item?.internalStatus==="Other"?"Այլ":null,
          externalStatus:item?.externalStatus==="Approval"?'Ընդունված':item?.externalStatus==="Delayed"?"Հետաձգված":item?.externalStatus==="Generated"?"Ստեղծված":item?.externalStatus==="Other"?"Այլ":null,
          clientType:item.clientType==="patient"?'Այցելու':item.clientType==="organization"?'Պատվիրատու':'',
          paymentDate:item?.paymentDate?moment(item?.paymentDate).format('DD-MM-YYYY HH:mm'):null,
          diagnosisDate:item?.diagnosisDate?moment(item?.diagnosisDate).format('DD-MM-YYYY HH:mm'):null,
          statusBoard:null
        }));
      //   exportData = formatedData.map((item, index) => {
      //     // Create a new object with the formatted fields
      //     const formattedItem = {
      //         ...item,
      //         createdAt: moment(item.createdAt).format('DD-MM-YYYY HH:mm'),
      //         generationDate: moment(item.generationDate).format('DD-MM-YYYY HH:mm'),
      //         updatedAt: moment(item.updatedAt).format('DD-MM-YYYY HH:mm'),
      //         clientDob: moment(item.clientDob).format('DD-MM-YYYY'),
      //         clientGender: item.clientGender === "Male" ? 'Արական' : item.clientGender === "Female" ? 'Իգական' : '',
      //         diagStatus: item.diagStatus === "Active" ? 'Ակտիվ' : item.diagStatus === "Cancelled" ? 'Չեղարկված' : '',
      //         class: item.class === "Internal" ? 'Ներքին' : item.class === "External" ? 'Արտաքին' : '',
      //         internalStatus: item?.internalStatus === "Approval" ? 'Ընդունված' :
      //                         item?.internalStatus === "Delayed" ? "Հետաձգված" :
      //                         item?.internalStatus === "Generated" ? "Ստեղծված" :
      //                         item?.internalStatus === "Other" ? "Այլ" : null,
      //         externalStatus: item?.externalStatus === "Approval" ? 'Ընդունված' :
      //                         item?.externalStatus === "Delayed" ? "Հետաձգված" :
      //                         item?.externalStatus === "Generated" ? "Ստեղծված" :
      //                         item?.externalStatus === "Other" ? "Այլ" : null,
      //         clientType: item.clientType === "patient" ? 'Այցելու' : item.clientType === "organization" ? 'Պատվիրատու' : '',
      //         paymentDate: item?.paymentDate ? moment(item?.paymentDate).format('DD-MM-YYYY HH:mm') : null,
      //         diagnosisDate: item?.diagnosisDate ? moment(item?.diagnosisDate).format('DD-MM-YYYY HH:mm') : null
      //     };
  
      //     // Add additional properties if researchList length is more than one
      //     if (item.researchList && item.researchList.length > 1) {
      //         item.researchList.forEach((el, idx) => {
      //             formattedItem[`researchList${idx}`] = el;
      //         });
      //     } else {
      //         formattedItem.researchList = item.researchList[0];
      //     }
  
      //     // Sort keys
      //     const sortedKeys = Object.keys(formattedItem).sort();
      //     const sortedItem = {};
      //     sortedKeys.forEach(key => {
      //         sortedItem[key] = formattedItem[key];
      //     });
  
      //     return sortedItem;
      // });
  
    }else if(section === 'patients'){
        exportData = exportData.map(el => ({ 
            firstName:el.firstName,
            lastName:el.lastName,
            midName:el.midName,
            patientId:el.patientId,
            age:el.age,
            dateOfBirth:moment(el.dateOfBirth).format('DD-MM-YYYY'),
            createdAt:moment(el.createdAt).format('DD-MM-YYYY HH:mm'),
            updatedAt:moment(el.updatedAt).format('DD-MM-YYYY HH:mm'),
            gender:el.gender==="Male"?'Արական':el.gender==="Female"?'իգական':'',
            email:el.contact.email,
            phone:el.contact.phone,
            passport:el.contact.passport,
            city:el.contact.address.city,
            country:el.contact.address.country,
            state:el.contact.address.state,
            street:el.contact.address.street,
            zipCode:el.contact.address.zipCode
            
        }));
    }else if(section === 'diagnostics' && diagExport==='researches'){
      exportData = exportData.map(el => ({ 
        id:el._id,
        count:el.count,
        researchName:el.researchName
          
      }));
  }else if(section === 'doctorVisits'){
        exportData = exportData.map(el => ({      
            ...el,
            clientDob:moment(el.clientDob).format('DD-MM-YYYY'),
            createdAt:moment(el.createdAt).format('DD-MM-YYYY HH:mm'),
            updatedAt:moment(el.updatedAt).format('DD-MM-YYYY HH:mm'),
            visitDate:moment(el.visitDate).format('DD-MM-YYYY HH:mm'),
            paymentDate:moment(el.paymentDate ).format('DD-MM-YYYY HH:mm'),
            clientGender:el.clientGender==="Male"?'Արական':el.clientGender==="Female"?'իգական':''
            
        }));
    }else if(section === 'notifications'){
      exportData = exportData.map(el => ({      
          ...el,
          createdAt:moment(el.createdAt).format('DD-MM-YYYY HH:mm'),
          updatedAt:moment(el.updatedAt).format('DD-MM-YYYY HH:mm'),          
      }));
    }else if(section === 'researchList'){
      exportData = exportData.map(el => ({      
          ...el,
          createdAt:moment(el.createdAt).format('DD-MM-YYYY HH:mm'),
          updatedAt:moment(el.updatedAt).format('DD-MM-YYYY HH:mm'),          
      }));
  }
        const workBook = utils.book_new()
        const workSheet = utils.json_to_sheet(exportData)
        utils.book_append_sheet(workBook,workSheet,exportName)
        writeFile(workBook,`${section} ${moment(new Date()).format('DD-MM-YYYY')}.xlsx`)
        handleToggleExportModal(false)
      }
  return (
    <Modal
          show={toggleExport}
          size="xs"
          onHide={() => handleToggleExportModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ width: "100%", textAlign: "center" }}>
              Ներբեռնել տվյալներ
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
                        {section !== 'researchList'?
                        <>
                        <div className="card" style={{minHeight:'300px'}}>
                        <div className="card-header">
                            <a href="#">Նշեք ժամանակահատվածը</a>
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
                            <div className="modal-body ">
                              <div className="row gx-3">
                              {/* <div className="col-sm-6">
                              <div className="form-group">
                              <div className="d-flex justify-content-between me-2">
                                <label
                                  className="form-label"
                                  htmlFor="startDate"
                                  >
                                  Սկիզբ
                                </label>
                                  {methods.formState.errors.startDate && (
                                    <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> պարտադիր</span>
                                    )}
                                    </div>
                                <div>                                  
                                   <CustomDateComponent name="startDate" control={methods.control} maxDate={moment(new Date()).format('MM-DD-YYYY')}/>
                                </div>
                              </div>
                            </div> */}
                            <div className="col-sm-12">
                              <div className="form-group">
                              <div className="d-flex justify-content-between me-2">
                                <label
                                  className="form-label"
                                  htmlFor="dates"
                                  >
                                  {/* Ընտրել */}
                                </label>
                                  {methods.formState.errors.dates && (
                                    <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> պարտադիր</span>
                                    )}
                                    </div>
                                <div className='d-flex justify-content-center align-items-center'>                                  
                                   <CustomExportDateComponent name="dates" handleDateChanged={handleDateChanged} control={methods.control} maxDate={moment(new Date()).format('MM-DD-YYYY')}/>
                                </div>
                              </div>
                            </div>
                             {section==='diagnostics' &&

                            <div className="row gx-3">
                          <div className="col-sm-6">
                              <div className="d-flex justify-content-between me-2">
                               
                                {methods.formState.errors.gender && (
                                  <span className="error text-red">
                                    <span>
                                      <img src={ErrorSvg} alt="errorSvg" />
                                    </span>{" "}
                                    պարտադիր
                                  </span>
                                )}
                              </div>
                              <div className="d-flex align-items-center">
  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      id="researches"
      value="researches"  // Set value to "researches"
      onClick={onDiagExportSelect}  // Use the event directly
      {...methods.register("diagExport", {
        required: true,
      })}
    />
    <label className="form-check-label" htmlFor="researches">
      Հետազոտություններ
    </label>
  </div>
  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      id="diagnostics"
      value="diagnostics"  // Set value to "diagnostics"
      onClick={onDiagExportSelect}  // Use the event directly
      {...methods.register("diagExport", {
        required: true,
      })}
    />
    <label className="form-check-label" htmlFor="diagnostics">
      Ախտորոշումներ
    </label>
                                </div>
                              </div>
                            </div>
                            </div>
                            }                            
                            {!!refDoctors.length && 
                            <>
                            <div className="col-sm-12">
                                   <div className="d-flex justify-content-between me-2">
                                    <label
                                      className="form-label"
                                      htmlFor="doctor"
                                      placeholder={"Ընտրել"}
                                      >
                                      Ուղղորդող բժիշկներ
                                    </label>
                                    {methods.formState.errors.refDoctor && (
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
                                      name="refDoctor"
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
                                      styles={colourStyles}
                                        // onChange={(val) => {
                                          //   field.onChange(val.id);
                                          //   onRefDoctorSelect(val);
                                          // }}
                                          // value={refDoctors?.find(
                                            //   (option) => option.value === refDoctor
                                            // )}
                                            options={[
                                      { value: 'all', label: "Ամբողջ տվյալները",id: 'all'},
                                      ...refDoctors.map((item) => ({
                                        value: item.doctorName,
                                        label: item.doctorName,
                                        id: item.refDoctorsId,
                                      })),
                                    ]}
                                    placeholder={"Ընտրել"}
                                    />
                                  )}
                                  />
                               </div>
                                </div>
                               
                              </>
                              }
                              </div>
                              <div className='d-flex justify-content-center align-items-center'>

                          {isLoading && <LoadingSpinner/>}
                          {isDone && 
                            <FeatherIcon icon='check' color='rgb(78, 175, 203)' size={58}/>
                            
                            }
                            </div>
                              </div>
                              </div>
                              </div>
                              <div className="separator-full"></div> 
                              
                              <div className="modal-footer align-items-center">
                          <button
                            type="button"
                            className={`btn btn-primary ${!dateChanged ? 'disabled' : ''}`}
                            style={{backgroundColor:"#4eafcb",border:'none'}}
                            onClick={onSubmit}
                          >
                            Ստեղծել
                          </button>
                          <button
                            type="button"
                            onClick={()=>handleExportDiagnostics(section,exportData)}
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            disabled={active}
                          >
                            XMLS
                          </button>
                          <CSVLink
                          data={exportData}
                          filename={"my-file.csv"}
                          className={`btn btn-primary ${active ? 'disabled' : ''}`}

                          target="_blank"
                        >
                          CSV
                        </CSVLink>
                        </div>
                                </>
                                : <div className="d-flex justify-content-sm-between  align-items-center">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  style={{backgroundColor:"#4eafcb",border:'none'}}
                                  onClick={onSubmit}
                                >
                                  Ստեղծել
                                </button>
                                <button
                                  type="button"
                                  onClick={()=>handleExportDiagnostics(section,exportData)}
                                  className={`btn btn-primary ${active ? 'disabled' : ''}`}
                                  data-bs-dismiss="modal"
                                >
                                  XMLS
                                </button>
                                <CSVLink
                                data={exportData}
                                filename={"my-file.csv"}
                                className={`btn btn-primary ${active ? 'disabled' : ''}`}
      
                                target="_blank"
                              >
                                CSV
                              </CSVLink>
                              </div>
                        }
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

export default ExportData