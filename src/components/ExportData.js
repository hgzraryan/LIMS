import React, { Suspense, useState } from 'react'
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Controller, Form, FormProvider, useForm} from "react-hook-form";
import CustomDateTimeComponent from './CustomDateTimeComponent';
import ErrorSvg from "../dist/svg/error.svg";
import LoadingSpinner from './LoadingSpinner';
import Select from "react-select";
import CustomDateComponent from './CustomDateComponent';
import moment from 'moment';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {utils, writeFile} from 'xlsx';
import { CSVLink } from "react-csv";
import { deleteNullProperties } from '../utils/helper';
import makeAnimated from "react-select/animated";

function ExportData({handleToggleExportModal,toggleExport,section,refDoctors=[]}) {
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [active, setActive] = useState(true);
    const [exportData, setExportData] = useState([]);
    const axiosPrivate = useAxiosPrivate();
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
  
    const methods = useForm({
        mode: "onChange",
      });
      
      const { trigger } = useForm();
      const onSubmit = methods.handleSubmit(async ({startDate,endDate,refDoctor}) => {
        const newReportDates = {        
            startDate:startDate?moment(startDate).format('YYYY-MM-DD'):null,
            endDate:endDate?moment(endDate).format('YYYY-MM-DD'):null,  
            refDoctor:refDoctor?refDoctor.map((el) => el.id):null  
        }
        const updatedFields = deleteNullProperties(newReportDates);

        // console.log(updatedFields)
        // console.log(refDoctor)

        try {
            const response = await axiosPrivate.post(`/reportExport/${section}`,updatedFields)
        //     const response = await axiosPrivate.post('/reportExport', newReport, {
        //     headers: { "Content-Type": "application/json" },
        //     withCredentials: true,
        //   });
          setExportData(response?.data?.jsonString);
          setIsLoading(false);
          setActive(false);
 
        } catch (err) {
          if (!err?.response) {
            setErrMsg("No Server Response");
          }  else {
            setErrMsg(" Failed");
          }
        }
      }); 
      const findResearches = (statusBoard) => {
        return statusBoard.flatMap(elem => elem.researches.map(research => research.name));
      }
      const handleExportDiagnostics = (exportName,exportData)=>{
        if(section === 'diagnostics'){
            const formatedData=exportData.map((el)=>{
                return {
                    ...el,
                    researchList: findResearches(el.statusBoard)
                }
            })            
            exportData = formatedData.map(item => ({
          ...item,
          researchList: item.researchList.join(', '),
          createdAt:moment(item.createdAt).format('DD-MM-YYYY HH:mm'),
          generationDate:moment(item.generationDate).format('DD-MM-YYYY HH:mm'),
          updatedAt:moment(item.updatedAt).format('DD-MM-YYYY HH:mm'),
          clientDob:moment(item.generationDate).format('DD-MM-YYYY'),
          clientGender:item.clientGender==="Male"?'Արական':item.clientGender==="Female"?'իգական':'',
          diagStatus:item.diagStatus==="Active"?'Ակտիվ':item.diagStatus==="Cancelled"?'Չեղարկված':'',
          class:item.class==="Internal"?'Ներքին':item.class==="External"?'Արտաքին':'',
          internalStatus:item?.internalStatus==="Approval"?'Ընդունված':item?.internalStatus==="Delayed"?"Հետաձգված":item?.internalStatus==="Generated"?"Ստեղծված":item?.internalStatus==="Other"?"Այլ":null,
          externalStatus:item?.externalStatus==="Approval"?'Ընդունված':item?.externalStatus==="Delayed"?"Հետաձգված":item?.externalStatus==="Generated"?"Ստեղծված":item?.externalStatus==="Other"?"Այլ":null,
          clientType:item.clientType==="patient"?'Այցելու':item.clientType==="organization"?'Պատվիրատու':'',
          paymentDate:item?.paymentDate?moment(item?.paymentDate).format('DD-MM-YYYY HH:mm'):null,
          diagnosisDate:item?.diagnosisDate?moment(item?.diagnosisDate).format('DD-MM-YYYY HH:mm'):null,
        }));

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
          <Suspense fallback={<LoadingSpinner />}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
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
                            <a href="#">Տվյալներ</a>
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
                                   <CustomDateComponent name="startDate" control={methods.control}/>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                              <div className="d-flex justify-content-between me-2">
                                <label
                                  className="form-label"
                                  htmlFor="endDate"
                                  >
                                  Ավարտ
                                </label>
                                  {methods.formState.errors.endDate && (
                                    <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> պարտադիր</span>
                                    )}
                                    </div>
                                <div>                                  
                                   <CustomDateComponent name="endDate" control={methods.control}/>
                                </div>
                              </div>
                            </div>
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
                              
                              </div>
                              </div>
                              </div>
                              <div className="separator-full"></div> 
                              
                              <div className="modal-footer align-items-center">
                        
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
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </FormProvider>
          </Modal.Body>
            )}
            </Suspense>
        </Modal>
  )
}

export default ExportData