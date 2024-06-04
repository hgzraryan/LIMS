/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Suspense, useEffect, useState, useRef } from "react";
import LoadingSpinner from "../LoadingSpinner";
import {
  useTable,
} from "react-table";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import profileBgImg from "../../dist/img/profile-bg.jpg";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { toast } from "react-toastify";
import FileDownload from "js-file-download";
import moment from "moment";
import ResultData from "../ResultData";
import { Modal } from "react-bootstrap";

function DiagnosticsDetails() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { id } = useParams();
  const [diagnosticsDetails, setDiagnosticsDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState(null); // State to hold the uploaded file
  const [fileName, setFileName] = useState(""); // State to hold the file name
  const [downloadFiles, setDownloadFiles] = useState(""); // State to hold the file name
  const fileInputRef = useRef(null);
  const [modalResult, setModalResult] = useState("");
  const [smsCount, setSmsCount] = useState(0);

  const [activeLink, setActiveLink] = useState("tab_summery");
  const [pageTab, setPageTab] = useState("tab_summery");
  const handleOpenResultModal = (data) => {
    setModalResult((prev) => data);
  };
  const getToastOptions = () => ({
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  
  const notify = (text) =>
    toast.success(text, getToastOptions());
  
  const notifyError = (text) =>
    toast.error(text, getToastOptions());
  const handleLinkClick = (linkId) => {
    setActiveLink(linkId);
    setPageTab(linkId);
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "shortName",
      },
      {
        Header: "Անվանում",
        accessor: "name",
      },
      {
        Header: "Արդյունք",
        accessor: "analysisResult",
      },
      {
        Header: "նորմա",
        accessor: "referenceRange",
      },
      {
        Header: "չ/մ",
        accessor: "units",
      },
    ],
    []
  );
  const {
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: columns,
    data: diagnosticsDetails?.statusBoard?.[4]?.researches || [],
  });
  
  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
const handleDownload = (data) => {
  axiosPrivate({
    url:`getExtFile/${data.fileId}`,
  method:'GET',
responseType:'blob'
      })
      .then((res)=>{
        FileDownload(res.data,data.fileName)
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });
};
  useEffect(() => {
    setTimeout(() => {
      axiosPrivate
        .get(`/diagnostics/${id}`)
        .then((resp) => {
          setDiagnosticsDetails(resp?.data);
          setSmsCount(resp?.data?.notifications?.length)
          setIsLoading(false);
        })
        .then((resp) => {
          axiosPrivate.get(`/uploadExtResult/${id}`)
          .then((resp) => {
            setDownloadFiles((prev) => resp?.data?.jsondata);
          
            setIsLoading(false);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
  }, []);
  /*----------------ADD diagnostics data by file upload---------------------*/

  const handleChangeFile = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Check if the file type is PDF or TXT
      if (
        selectedFile.type === "application/pdf" ||
        selectedFile.type === "text/plain"
      ) {
        setFile(selectedFile);
        setFileName(selectedFile.name); // Update file name
      } else {
        alert("Please select a PDF or TXT file.");
      }
    }
  };

  // Function to handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      // Check if the file type is PDF or TXT
      if (
        droppedFile.type === "application/pdf" ||
        droppedFile.type === "text/plain"
      ) {
        setFile(droppedFile);
        setFileName(droppedFile.name); // Update file name
      } else {
        alert("Please drop a PDF or TXT file.");
      }
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("fileName", file);
      formData.append("diagnosticsId", diagnosticsDetails?.diagnosticsId);
      axiosPrivate.post("/uploadExtResult", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        notify(` Փաստաթուղթը ավելացված է`);
        setFileName('')
      })
      .then((resp) => {
        axiosPrivate.get(`/uploadExtResult/${id}`)
        .then((resp) => {
          setDownloadFiles((prev) => resp?.data?.jsondata);
          setIsLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      alert("Please select a file to upload.");
    }
  };
  const handleSendSMS =  (e) => {    
      axiosPrivate.post('/sendNotification', { 
        patientId: diagnosticsDetails?.clientId,
        diagnosticsId: diagnosticsDetails?.diagnosticsId,
        type:'sms',notify:'result' 
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }).then((resp) => {
        notify(
          `Հաղորդագրությունը ուղարկված է`
        );
        e.target.disabled = true;  
      setTimeout(() => {
        e.target.disabled = false;
      }, 20000);
      }).catch((err) => {
        console.log(err);
      notifyError(
        `Հաղորդագրությունը չի ուղարկվել`
      );  
      }).then((resp) => {
        axiosPrivate
        .get(`/diagnostics/${id}`)
        .then((resp) => {
          setDiagnosticsDetails(resp?.data);
          setIsLoading(false);
        })
      }) 
     
  }
  return (
    <>
    {modalResult && (
        <Modal show={() => true} size="xl" onHide={() => setModalResult(false)}>
          <Modal.Header closeButton>
            <Modal.Title
              style={{ width: "100%", textAlign: "center" }}
            ></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="contact-body contact-detail-body">
              <div data-simplebar className="nicescroll-bar">
                <div className="d-flex flex-xxl-nowrap flex-wrap">
                  <div className="contact-info w-100">
                    <ResultData
                      modalResult={modalResult}
                      setModalResult={setModalResult}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer "></div>
          </Modal.Body>
        </Modal>
      )}
      <Suspense fallback={<LoadingSpinner />}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="hk-pg-body p-2">
            <div className="profile-wrap">
              <div className="profile-img-wrap">
                <img
                  className="img-fluid rounded-5"
                  src={profileBgImg}
                  alt="Description"
                />
              </div>
              {/* <div className="profile-intro">
                  <div className="card card-flush mw-400p bg-transparent">
                    <div className="card-body">
                      <div className="avatar avatar-xxl avatar-rounded position-relative mb-2">
                    
                        <span className="badge badge-indicator badge-success  badge-indicator-xl position-bottom-end-overflow-1 me-1"></span>
                      </div>
                      <h4>
                        {" "}
                        {diagnosticsDetails.doctorName}
                        <i
                          className="bi-check-circle-fill fs-6 text-blue"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Top endorsed"
                        ></i>
                      </h4>

                      <ul className="list-inline fs-7 mt-2 mb-0">
                        <li className="list-inline-item d-sm-inline-block d-block mb-sm-0 mb-1 me-3">
                          <img
                            src={mobileSvg}
                            width="15px"
                            height="15px"
                            alt="mobile"
                            className="me-2"
                          />
                          <span style={{ fontSize: "1.1rem" }}>
                            {diagnosticsDetails?.contact?.phone || ""}
                          </span>
                        </li>

                        <li className="list-inline-item d-sm-inline-block d-block mb-sm-0 mb-1 me-3">
                          <img
                            src={emailSvg}
                            width="15px"
                            height="15px"
                            alt="email"
                            className="me-2"
                          />
                          <span style={{ fontSize: "1.1rem" }}>
                            {diagnosticsDetails?.contact?.email || ""}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> */}
              <header className="profile-header">
                <ul className="nav nav-line nav-tabs nav-icon nav-light h-100 d-md-flex d-none">
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeLink === "tab_summery" ? "active" : ""
                      }`}
                      onClick={() => handleLinkClick("tab_summery")}
                      data-bs-toggle="tab"
                      href="#"
                    >
                      <span className="nav-icon-wrap">
                        <span className="feather-icon">
                          <FeatherIcon icon="zap" />
                        </span>
                      </span>
                      <span className="nav-link-text">Գլխավոր</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-toggle="tab"
                      href="#"
                      className={`nav-link ${
                        activeLink === "tab_documents" ? "active" : ""
                      }`}
                      onClick={() => handleLinkClick("tab_documents")}
                    >
                      <span className="nav-icon-wrap">
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                            <svg
                              fill="#000000"
                              width="23"
                              height="23"
                              viewBox="0 0 512 512"
                              id="Layer_1"
                              version="1.1"
                            >
                              <g>
                                <g>
                                  <g>
                                    <rect
                                      x="210.464"
                                      y="46.307"
                                      transform="matrix(-0.8935 -0.449 0.449 -0.8935 417.2299 376.1477)"
                                      width="85.498"
                                      height="184.595"
                                    />
                                    <rect
                                      x="83.863"
                                      y="313.827"
                                      width="134.1"
                                      height="34.2"
                                    />
                                    <path
                                      d="M405.663,277.327c0-60.6-31.9-113.9-79.7-143.8l-18.7,36.9c34.6,23,57.6,62.2,57.6,106.9c0,70.7-57.5,128.2-128.2,128.2
			c-34.6,0-65.7-13.6-88.6-35.7h-53.2c16.3,24.9,39.2,45.5,66.1,58.7h-38.1v61h225.8v-61h-35.7
			C367.563,400.927,405.663,343.427,405.663,277.327z"
                                    />

                                    <rect
                                      x="277.843"
                                      y="7.844"
                                      transform="matrix(-0.8935 -0.449 0.449 -0.8935 555.6599 173.8512)"
                                      width="41.199"
                                      height="26.399"
                                    />

                                    <rect
                                      x="216.894"
                                      y="240.196"
                                      transform="matrix(0.449 -0.8935 0.8935 0.449 -106.2222 341.1332)"
                                      width="13.2"
                                      height="32.999"
                                    />

                                    <rect
                                      x="158.474"
                                      y="225.818"
                                      transform="matrix(-0.8935 -0.4491 0.4491 -0.8935 225.362 525.2878)"
                                      width="33.001"
                                      height="20.2"
                                    />
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </span>
                        </span>
                      </span>
                      <span className="nav-link-text">Փաստաթղթեր</span>
                    </a>
                  </li>
                  {/* <li className="nav-item">
                <a 
                          className={`nav-link ${activeLink === 'tab_calendar' ? 'active' : ''}`}
                          onClick={() => handleLinkClick('tab_calendar')}
                           data-bs-toggle="tab" 
                           href="#">
                            <span className="nav-icon-wrap">
                              <span className="feather-icon">
                                <FeatherIcon icon='calendar' />
                              </span>
                            </span>
                            <span className="nav-link-text">Օրացույց</span>
                          </a>
								</li> */}
                </ul>
              </header>
              <div className="row ">
                {pageTab === "tab_summery" && (
                  <>
                    <div className="col-lg-4 mb-lg-0 mb-3">
                      <div className="card card-border mb-lg-4 mb-3">
                        <div className="card-header card-header-action"></div>

                        <ul className="list-group list-group-flush">
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-file-earmark-person text-disabled me-2"></i>
                              <span className="text-muted">
                                Նույնականացման համար:
                              </span>
                            </span>
                            <span className="ms-2">
                              {diagnosticsDetails?.diagnosticsId}
                            </span>
                          </li>
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-activity text-disabled me-2"></i>
                              <span className="text-muted">Կարգավիճակ:</span>
                            </span>
                            <span className="ms-2">
                              {diagnosticsDetails?.diagStatus === "Active"
                                ? "Ակտիվ"
                                : diagnosticsDetails?.diagStatus === "Cancelled"
                                ? "Չեղարկված"
                                : ""}
                            </span>
                          </li>
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-ui-checks text-disabled me-2"></i>
                              <span className="text-muted">Տեսակը:</span>
                            </span>
                            <span className="ms-2">
                              {diagnosticsDetails?.class === "Internal"
                                ? "Ներքին"
                                : diagnosticsDetails?.class === "External"
                                ? "Արտաքին"
                                : "այլ"}
                            </span>
                          </li>
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-calendar-check-fill text-disabled me-2"></i>
                              <span className="text-muted">Անվանում:</span>
                            </span>
                            <span className="ms-2">
                              {diagnosticsDetails?.diagnosticsName}
                            </span>
                          </li>
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-calendar-event text-disabled me-2"></i>
                              <span className="text-muted">
                                Գրանցման ամսաթիվ:
                              </span>
                            </span>
                            <span className="ms-2">
                            {diagnosticsDetails?.createdAt && moment.utc(diagnosticsDetails?.createdAt).format('DD-MM-YYYY HH:mm')}
                            </span>
                          </li>
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-calendar-event text-disabled me-2"></i>
                              <span className="text-muted">
                                Վերջին թարմացում:
                              </span>
                            </span>
                            <span className="ms-2">
                            {diagnosticsDetails?.updatedAt && moment.utc(diagnosticsDetails?.updatedAt).format('DD-MM-YYYY HH:mm')}
                            </span>
                          </li>

                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-file-earmark-person text-disabled me-2"></i>
                              <span className="text-muted">Այցելու:</span>
                            </span>
                            <span className="ms-2">
                            {diagnosticsDetails?.clientFirstName
                            ?diagnosticsDetails?.clientFirstName +" " + 
                               diagnosticsDetails?.clientLastName + " "+ 
                               diagnosticsDetails?.clientMidName
                            :'Առանց այցելու'}
                            </span>
                          </li>
                          {diagnosticsDetails?.refDoctor?
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-file-earmark-person text-disabled me-2"></i>
                              <span className="text-muted">Ուղղորդող բժիշկ:</span>
                            </span>
                            <span className="ms-2">
                              {diagnosticsDetails?.refDoctorName && diagnosticsDetails?.refDoctorName[0]}
                            </span>
                          </li>:''
                          }
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-file-medical-fill text-disabled me-2"></i>
                              <span className="text-muted">Բժիշկ:</span>
                            </span>
                            <span className="ms-2">
                               {diagnosticsDetails?.docs.map((el)=>el.doctorName+",") } 
                            </span>
                          </li>
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-currency-dollar text-disabled me-2"></i>
                              <span className="text-muted">
                                Ընդհանուր արժեք:
                              </span>
                            </span>
                            <span className="ms-2">
                              {diagnosticsDetails?.totalPrice}
                            </span>
                          </li>
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-currency-dollar text-disabled me-2"></i>
                              <span className="text-muted">
                                Ընդհանուր վճարված:
                              </span>
                            </span>
                            <span className="ms-2">
                              {diagnosticsDetails?.totalPayed}
                            </span>
                          </li>
                          {diagnosticsDetails?.totalPayed ?
                          <>
                          <li className="list-group-item border-0">
                            <span>
                            <i className="bi bi-ui-checks text-disabled me-2"></i>
                              <span className="text-muted">
                                Վճարման տեսակ:
                              </span>
                            </span>
                            <span className="ms-2">
                              {diagnosticsDetails?.paymentMethod}
                            </span>
                          </li>
                          <li className="list-group-item border-0">
                            <span>
                            <i className="bi bi-calendar-event text-disabled me-2"></i>
                              <span className="text-muted">
                                Վճարման ամսաթիվ:
                              </span>
                            </span>
                            <span className="ms-2">
                              {diagnosticsDetails?.paymentDate && moment.utc(diagnosticsDetails?.paymentDate).format('DD-MM-YYYY HH:mm')}
                            </span>
                          </li>
                          </>:''}
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-info text-disabled me-2"></i>
                              <span className="text-muted">
                                Հավելյալ տեղեկություն:
                              </span>
                            </span>
                            <span className="ms-2">
                              {diagnosticsDetails?.additional}
                            </span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="card card-border ">
                        <div className="card-header card-header-action">
                          <div className="d-flex justify-content-between align-items-center w-100">
                            <p>
                              Ծանուցումներ
                              </p>
                            <div 
                            className="d-flex justify-content-center align-items-center" 
                            style={{
                              width:'25px',
                              height:'25px', 
                              border:'2px solid gray',
                              borderRadius:'100px',
                              fontWeight:'bold',
                              color:'gray',
                              paddingTop:'1px'
                              }}>{smsCount}</div>
                            </div> 
                            </div>
                          <ul className="p-0 m-0">
                            <li >
                              <div className="d-flex justify-content-between align-items-center  w-100"
                              style={{
                                marginLeft:0,
                                padding:'10px 20px 10px 20px'
                              }} >

                                <p>Կարճ հաղորդագրություն</p>
                                <button type="button" onClick={(e)=>handleSendSMS(e)} className="btn btn-primary">Ուղարկել</button>
                              </div>
                            </li>
                          </ul>
                        
                      </div>
                    </div>
                    
                    <div className="col-lg-8">
                      <div className="card card-border card-profile-feed mb-lg-4 mb-3">
                        <div className="card-header card-header-action">
                          <div className="media align-items-center">
                            <p>Հետազոտություններ</p>
                          </div>
                          <div className="card-action-wrap"></div>
                        </div>                        
                          <div className="ps-2 pe-2" >
                          {(diagnosticsDetails && diagnosticsDetails?.statusBoard?.[1]?.researches?.length)?
                            (
                              <>
                              <p className="fw-bold">Նմուշառման փուլ</p>
                              <ol>
                        {diagnosticsDetails?.statusBoard?.[1]?.researches?.map((el,id)=>{
                          return ( 
                              <li key={el.id}>{el.name}</li>
                            )
                          })}
                          </ol>
                          </>)
                        :''   
                        }
                        
                          </div>                        
                          <div className="ps-2 pe-2" >
                          {(diagnosticsDetails && diagnosticsDetails?.statusBoard?.[2]?.researches?.length)?
                            (
                            <>
                            <p className="fw-bold">Հետազոտման փուլ</p>
                            <ol>
                        {diagnosticsDetails?.statusBoard?.[2]?.researches?.map((el,id)=>{
                          return ( 
                              <li key={el.id}>{el.name}</li>
                            )
                          })}
                          </ol>
                          </>)
                        :''   
                        }
                            
                          </div>
                        
                          <div className="ps-2 pe-2" >
                          {(diagnosticsDetails && diagnosticsDetails?.statusBoard?.[3]?.researches?.length)?
                            (
                            <>
                            <p className="fw-bold">Հաստատման փուլ</p>
                            <ol>
                        {diagnosticsDetails?.statusBoard?.[3]?.researches?.map((el,id)=>{
                          return ( 
                              <li key={el.id}>{el.name}</li>
                            )
                          })}
                          </ol>
                          </>)
                        :''   
                        }                    
                          </div>                       
                        <div className="card-body">
                          <div className="ms-10 me-10">
                          <p className="fw-bold">Պատասխանների հանձնման փուլ </p>
                            <table
                              className="table"
                              style={{
                                border: "1px solid black",
                                fontSize: "12px",
                                color: "#000",
                                marginTop: "10px",
                              }}
                            >
                              <thead>
                                {headerGroups.map((headerGroup) => (
                                  <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                      <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                      </th>
                                    ))}
                                  </tr>
                                ))}
                              </thead>
                              <tbody {...getTableBodyProps()}>
                                {rows.map((row, i) => {
                                  prepareRow(row);
                                  return (
                                    <tr key={i} {...row.getRowProps()}>
                                      {row.cells.map((cell) => {
                                        return (
                                          <td
                                            {...cell.getCellProps()}
                                            style={{
                                              border: "1px solid black",
                                            }}
                                          >
                                            {cell.render("Cell")}
                                          </td>
                                        );
                                      })}
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="card-footer justify-content-between">
                          <div className="d-flex justify-content-between w-100">
                            <p>Ուղարկել արդյունքները</p>
                          <button 
                          className="btn btn-primary"
                          onClick={()=>handleOpenResultModal(diagnosticsDetails)}>Ուղարկել</button></div>
                      </div>
                          </div>
                    </div>
                   
                  </>
                )}
                {pageTab === "tab_documents" && (
                  <div className="col-lg-12">
                     <div className="card card-border card-profile-feed mb-lg-4 mb-3">
                      <div className="card-header card-header-action">
                        <div className="media align-items-center">
                          <p>Վերբեռնել փաստաթուղթ</p>
                        </div>
                        <div className="card-action-wrap"></div>
                      </div>
                      <div
                        className="row"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <div className="d-flex justify-content-center">
                          <div className="upload-logo">
                            <div
                              className="dropify-wrapper"
                              onClick={(e) => {
                                e.stopPropagation()
                                fileInputRef?.current.click()}}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="dropify-message d-flex justify-content-center  align-items-center flex-column">
                                <span
                                  className="file-icon d-flex justify-content-center  align-items-center"
                                  style={{ width: "32px", height: "32px" }}
                                ></span>
                                <p className="d-flex justify-content-center align-items-center">
                                  Ընտրել
                                </p>

                                <p
                                  className="dropify-error"
                                  style={{ display: "none" }}
                                >
                                  Ooops, something wrong appended.
                                </p>
                              </div>
                              <div
                                className="dropify-loader"
                                style={{ display: "none" }}
                                
                              ></div>
                              
                              <form onSubmit={(e) => handleSubmit(e)}>
                                <div >

                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  onChange={handleChangeFile}
                                  onDrop={handleDrop}
                                  onDragOver={(e) => e.preventDefault()}
                                  style={{ display: "none" }}
                                  />
                                  </div>
                                <button
                                  className="btn btn-primary"
                                  type="submit"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSubmit(e);
                                  }}
                                >
                                  Վերբեռնել!
                                </button>
                              </form>
                              <button
                                type="button"
                                className="dropify-clear"
                                style={{ display: "none" }}
                              >
                                Remove
                              </button>
                              <div className="dropify-preview">
                                <span className="dropify-render"></span>
                                <div className="dropify-infos">
                                  <div className="dropify-infos-inner">
                                    <p className="dropify-filename">
                                      <span className="file-icon"></span>
                                      <span className="dropify-filename-inner">
                                        {" "}
                                      </span>
                                    </p>
                                    <p
                                      className="dropify-infos-message"
                                      style={{ display: "none" }}
                                    >
                                      Drag and drop or click to replace
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {fileName && <span>{" " + fileName}</span>}
                      </div>
                    </div>

                    <div>
                      <div className="card-body">
                        <div className="card">
                          <div className="card-header">
                           
                              <h5 className="mb-0">Վերբեռնված փաստաթղթեր</h5>
                            
                          </div>
                          <div id="fm_collapse_3" className="collapse show">
  <div className="row gx-3 row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 m-1 ">
    {downloadFiles.length > 0 ? (
      downloadFiles.map((el) => (
        <div className="col" key={el.fileId}>
          <div className="card file-compact-card card-border">
            <div className="card-body d-flex justify-content-between">
              <div className="media fmapp-info-trigger">
                <div className="media-head me-3">
                  <div className="avatar avatar-icon avatar-soft-danger avatar-sm">
                    <span className="initial-wrap">
                      <i className="ri-file-pdf-fill"></i>
                    </span>
                  </div>
                </div>
                <div className="media-body">
                  <div className="file-name">
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={(e) => handleDownload(el)}
                    >
                      {el?.fileName}
                    </p>
                  </div>
                  <div className="text-truncate fs-8 mb-2">
                    {formatBytes(el.size)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="col d-flex justify-content-center align-items-center w-100"><p>Վերբեռնված փաստաթղթեր չկան</p></div>
    )}
  </div>
</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
         
        )}
      </Suspense>
    </>
  );
}

export default DiagnosticsDetails;
