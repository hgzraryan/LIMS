/* eslint-disable jsx-a11y/anchor-is-valid */
import { Input } from "@mui/icons-material";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useScanDetection from "use-scan-detection-react18";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { BiSolidInfoCircle } from "react-icons/bi";
import PrintSampleComponent from "../PrintSampleComponent";
import heparinVial from '../../dist/img/vial_IMG/heparinVial.png'
import edtaVial from '../../dist/img/vial_IMG/EDTAVial.png'
import helVial from '../../dist/img/vial_IMG/helVial.png'
import citratVial from '../../dist/img/vial_IMG/citratVial.png'
function Sample() {
  const [barcodeScan, setBarcodeScan] = useState("");
  const [data, setData] = useState('');
  const [modalInfo, setModalInfo] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const logout = useLogout();
  const barcodeInputRef = useRef(null);
  const [modalPrint, setModalPrint] = useState("");
  const [sortedResearches, setsortedResearches] = useState([]);
  const [noData, setNoData] = useState(true);
  const [wrongId, setWrongId] = useState(false);

  const [userData, setUserData] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData) {
      setUserData(storedData);
    }
  }, []);

  useEffect(() => {
    barcodeInputRef.current?.focus();
  }, []);
  const handleOpenInfoModal = (user) => {
    setModalInfo((prev) => user);
  };
  const handleOpenPrintModal = (data, el) => {
    const sampleData = { ...data, el };

    setModalPrint((prev) => sampleData);
  };
  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  const [isActive, setIsActive] = useState(false);
  const menuClick = (event) => {
    setIsActive((current) => !current);
  };
  const handleUserPage = async (userId) => {
    try {
      navigate(`/users/2095`);
    } catch (err) {
      console.log(err);
    }
  };
  const sortResearches = (data) => {
    if(!data?.length){
      setNoData(true)
    }
    const sortedResearches = data?.reduce(
      (acc, research) => {
        const vial = research?.vial?.trim();
        if (vial === "EDTA") {
          acc[0].push(research);
          setNoData(false)
        } else if (vial === "Հել" || vial === "Hel") {
          acc[1].push(research);
          setNoData(false)
        } else if (vial === "Heparin") {
          acc[2].push(research);
          setNoData(false)
        }else if (vial === "Na Citr." || vial === "Na Citr") {
          acc[3].push(research);
          setNoData(false)
        }else{
          acc[4].push(research)
        }
        return acc;
      },
      [[], [], [],[],[]]
    );

    setsortedResearches(sortedResearches);
  };
  const handleBarcode = async (data) => {
    try {
      const response = await axiosPrivate.get(`./diagnosticsSampling/${data}`);
      // setTimeout(() => {
      setData((prev) => response?.data);
      sortResearches(response?.data?.diagnostics?.statusBoard[1]?.researches);
      response.status===204?setWrongId(true):setWrongId(false)
     
      // }, 500);
    } catch (err) {
      console.error(err);
      //navigate("/login", { state: { from: location }, replace: true });
    }
  };
  return (
    <>
      {modalInfo && (
        <Modal show={() => true} size="md" onHide={() => setModalInfo(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ width: "100%", textAlign: "center" }}>
              Հետազոտության նախապատրաստում/Հանձնման ձևը
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="contact-body contact-detail-body">
              <div data-simplebar className="nicescroll-bar">
                <div className="d-flex flex-xxl-nowrap flex-wrap">
                  <div className="contact-info w-100">
                    <div className="w-100">{modalInfo}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer ">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setModalInfo(false)}
              >
                Փակել
              </button>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {modalPrint && (
        <Modal show={() => true} size="sm" onHide={() => setModalPrint(false)}>
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
                    <PrintSampleComponent
                      modalPrint={modalPrint}
                      setModalPrint={setModalPrint}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
      <div
        className="hk-wrapper"
        data-layout="vertical"
        data-menu="light"
        data-footer="simple"
      >
        {/* /Top Navbar */}
        <nav className="hk-navbar navbar navbar-expand-xl navbar-light fixed-top">
          <div className="container-fluid">
            {/* Start Nav */}
            <div className="nav-start-wrap">
              {/* Search */}
              <h2>
                {userData?.firstname + " "}
                {userData?.lastname}
              </h2>
              {/* /Search */}
            </div>
            {/* /Start Nav */}
            {/* End Nav */}
            <div className="nav-end-wrap" onClick={menuClick}>
              <ul className="navbar-nav flex-row">
                {/*
                                <li className="nav-item">
                                    <a href="email.html" className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover"><span className="icon"><span className=" position-relative"><span className="feather-icon"><i data-feather="inbox"></i></span><span className="badge badge-sm badge-soft-primary badge-sm badge-pill position-top-end-overflow-1">4</span></span></span></a>
                                </li>
                            
                                <li className="nav-item">
                                    <div className="dropdown dropdown-notifications">
                                        <a href="#" className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover dropdown-toggle no-caret" data-bs-toggle="dropdown" data-dropdown-animation role="button" aria-haspopup="true" aria-expanded="false"><span className="icon"><span className="position-relative"><span className="feather-icon"><i data-feather="bell"></i></span><span className="badge badge-success badge-indicator position-top-end-overflow-1"></span></span></span></a>
                                        <div className="dropdown-menu dropdown-menu-end p-0">
                                            <h6 className="dropdown-header px-4 fs-6">Notifications<a href="#" className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"><span className="icon"><span className="feather-icon"><i data-feather="settings"></i></span></span></a>
                                            </h6>
                                            <div data-simplebar className="dropdown-body  p-2">
                                                <a href="#" className="dropdown-item">
                                                    <div className="media">
                                                        <div className="media-head">
                                                            <div className="avatar avatar-rounded avatar-sm">
                                                                <img src="dist/img/avatar2.jpg" alt="user" className="avatar-img"/>
                                                            </div>
                                                        </div>
                                                        <div className="media-body">
                                                            <div>
                                                                <div className="notifications-text">Morgan Freeman accepted your invitation to join the team</div>
                                                                <div className="notifications-info">
                                                                    <span className="badge badge-soft-success">Collaboration</span>
                                                                    <div className="notifications-time">Today, 10:14 PM</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="dropdown-item">
                                                    <div className="media">
                                                        <div className="media-head">
                                                            <div className="avatar  avatar-icon avatar-sm avatar-success avatar-rounded">
                                                                <span className="initial-wrap">
                                                                    <span className="feather-icon"><i data-feather="inbox"></i></span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="media-body">
                                                            <div>
                                                                <div className="notifications-text">New message received from Alan Rickman</div>
                                                                <div className="notifications-info">
                                                                    <div className="notifications-time">Today, 7:51 AM</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="dropdown-item">
                                                    <div className="media">
                                                        <div className="media-head">
                                                            <div className="avatar  avatar-icon avatar-sm avatar-pink avatar-rounded">
                                                                <span className="initial-wrap">
                                                                    <span className="feather-icon"><i data-feather="clock"></i></span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="media-body">
                                                            <div>
                                                                <div className="notifications-text">You have a follow up with Jampack Head on Friday, Dec 19 at 9:30 am</div>
                                                                <div className="notifications-info">
                                                                    <div className="notifications-time">Yesterday, 9:25 PM</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="dropdown-item">
                                                    <div className="media">
                                                        <div className="media-head">
                                                            <div className="avatar avatar-sm avatar-rounded">
                                                                <img src="dist/img/avatar3.jpg" alt="user" className="avatar-img"/>
                                                            </div>
                                                        </div>
                                                        <div className="media-body">
                                                            <div>
                                                                <div className="notifications-text">Application of Sarah Williams is waiting for your approval</div>
                                                                <div className="notifications-info">
                                                                    <div className="notifications-time">Today 10:14 PM</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="dropdown-item">
                                                    <div className="media">
                                                        <div className="media-head">
                                                            <div className="avatar avatar-sm avatar-rounded">
                                                                <img src="dist/img/avatar10.jpg" alt="user" className="avatar-img"/>
                                                            </div>
                                                        </div>
                                                        <div className="media-body">
                                                            <div>	
                                                                <div className="notifications-text">Winston Churchil shared a document with you</div>
                                                                <div className="notifications-info">
                                                                    <span className="badge badge-soft-violet">File Manager</span>
                                                                    <div className="notifications-time">2 Oct, 2021</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="dropdown-item">
                                                    <div className="media">
                                                        <div className="media-head">
                                                            <div className="avatar  avatar-icon avatar-sm avatar-danger avatar-rounded">
                                                                <span className="initial-wrap">
                                                                    <span className="feather-icon"><i data-feather="calendar"></i></span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="media-body">
                                                            <div>	
                                                                <div className="notifications-text">Last 2 days left for the project to be completed</div>
                                                                <div className="notifications-info">
                                                                    <span className="badge badge-soft-orange">Updates</span>
                                                                    <div className="notifications-time">14 Sep, 2021</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="dropdown-footer"><a href="#"><u>View all notifications</u></a></div>
                                        </div>
                                    </div>
                                </li>
                                */}
                <li className="nav-item">
                  <div className="dropdown ps-2">
                    <a
                      className=" dropdown-toggle no-caret"
                      href="#"
                      role="button"
                      data-bs-display="static"
                      data-bs-toggle="dropdown"
                      data-dropdown-animation
                      data-bs-auto-close="outside"
                      aria-expanded="false"
                    >
                      <div className="avatar avatar-rounded avatar-xs">
                        <img
                          src="/dist/img/avatar12.jpg"
                          alt="user"
                          className="avatar-img"
                        />
                      </div>
                    </a>
                    <div
                      className={
                        isActive
                          ? "dropdown-menu dropdown-menu-end show showSlow"
                          : "dropdown-menu dropdown-menu-end showSlow"
                      }
                    >
                      <div className="p-2">
                        <div className="media">
                          <div className="media-head me-2">
                            <div className="avatar avatar-primary avatar-sm avatar-rounded">
                              <span className="initial-wrap">{}</span>
                            </div>
                          </div>
                          <div className="media-body">
                            <div className="fs-7">{}</div>
                            <p style={{ color: "black" }}>
                              <p
                                style={{
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleUserPage(2095)}
                              >
                                {userData?.firstname + " "}
                                {userData?.lastname}
                              </p>
                            </p>
                          </div>
                        </div>
                      </div>
                      {/*
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="profile.html">Profile</a>
                                                <a className="dropdown-item" href="/privacy-policy">
                                                <span className="me-2">Offers</span>
                                                <span className="badge badge-sm badge-soft-pink">2</span>
                                                </a>
                                                <div className="dropdown-divider"></div>
                                                <h6 className="dropdown-header">Manage Account</h6>
                                                <a className="dropdown-item" href="/privacy-policy"><span className="dropdown-icon feather-icon"><i data-feather="credit-card"></i></span><span>Payment methods</span></a>
                                                <a className="dropdown-item" href="/privacy-policy"><span className="dropdown-icon feather-icon"><i data-feather="check-square"></i></span><span>Subscriptions</span></a>
                                                <a className="dropdown-item" href="/privacy-policy"><span className="dropdown-icon feather-icon"><i data-feather="settings"></i></span><span>Settings</span></a>
                                                <div className="dropdown-divider"></div>
                                                <a className="dropdown-item" href="/privacy-policy"><span className="dropdown-icon feather-icon"><i data-feather="tag"></i></span><span>Raise a ticket</span></a>
                                                <div className="dropdown-divider"></div>
                                              */}
                      {/* <a className="dropdown-item" href="/support">
                          Օգնություն և սպասարկում
                        </a> */}
                      <a
                        href="/login"
                        className="d-block fs-8 link-secondary"
                        onClick={signOut}
                      >
                        <u>Դուրս գալ</u>
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            {/* /End Nav */}
          </div>
        </nav>
        <div className="hk-pg-wrapper">
          <div className="contactapp-wrap" style={{ margin: "3rem" }}>
            <div className="contactapp-detail-wrap w-100">
              <header className="contact-header">
                <div className="d-flex align-items-center justify-content-center w-100">
                  <h2>Սկանավորիր Բարկոդը</h2>
                </div>
              </header>
              <div className="contact-body">
                <div data-simplebar className="nicescroll-bar">
                  <div className="contact-list-view d-flex justify-content-center align-items-center">
                    <div
                      id="scrollableDiv"
                      style={{ height: "80vh", width: "100%" }}
                    >
                      <div className="d-flex justify-content-center align-items-center ">
                        <form
                        className="d-flex justify-content-center align-items-center "
                          id="barcodeForm"
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleBarcode(barcodeScan); // Call handleBarcode function when form is submitted
                          }}
                        >
                          <input
                            ref={barcodeInputRef}
                            id="barcode"
                            type="number"
                            name="barcode"
                            value={barcodeScan}
                            placeholder="Մուտքագրեք կոդը"
                            onChange={(e) => setBarcodeScan(e.target.value)}
                            className="form-control"
                            autoFocus 
                          />
                          <Button type="submit" className="ms-2">
                            Ստուգել
                          </Button>
                        </form>
                      </div>
                      {Object.keys(data).length ? (
                        <div
                          className="d-flex justify-content-center align-items-center flex-column"
                          style={{ width: "100%" }}
                        >
                          <header>
                            <div>
                              <span
                                style={{ fontWeight: "bold", fontSize: "18px" }}
                              >
                                {data.client.firstName + " "}
                                {data.client.midName + " "}
                                {data.client.lastName + ", "}
                                {data.client.dateOfBirth + ", "}
                              </span>
                            </div>
                          </header>
                          <main>
                            {sortedResearches?.length && (
                              <>
                              {console.log('sortedResearches',sortedResearches)}
                                {sortedResearches.map((group, groupId) => {
                                  if (
                                    Array.isArray(group) &&
                                    group.length > 0
                                  ) {
                                    return (
                                      <div
                                        key={groupId}
                                        className="d-flex flex-column m-3"
                                        style={{
                                          border: "2px solid gray",
                                          borderRadius: "10px",
                                          padding: ".5rem",
                                          fontSize: "18px",
                                          width:'100%',
                                          
                                        }}
                                      >
                                        {group.map((el, index) => (
                                          <div
                                            key={index}
                                            style={{ marginBottom: "1rem" }}
                                          >
                                            <div className="me-2 d-flex justify-content-between">
                                              <span>ID</span>
                                              {el.id}
                                            </div>
                                            <div className="separator m-0"></div>

                                            <div
                                              style={{ gap: "1rem" }}
                                              className="me-2 d-flex justify-content-between"
                                            >
                                              <span>Անվանում</span>
                                              {el.name}
                                            </div>
                                            <div className="separator m-0"></div>

                                            <div
                                              style={{ gap: "1rem" }}
                                              className="me-2 d-flex justify-content-between"
                                            >
                                              <span>
                                                Լաբորատորիա / Ծառայություն
                                              </span>
                                              {el.laboratoryService}
                                            </div>
                                            <div className="separator m-0"></div>

                                            <div
                                              style={{ gap: "1rem" }}
                                              className="me-2 d-flex justify-content-between"
                                            >
                                              <span>
                                                Մատուցման հրապար/ առավել ժամկետ
                                              </span>
                                              {el.samplingPeriod}
                                            </div>
                                            <div className="separator m-0"></div>

                                            <div
                                              style={{ gap: "1rem" }}
                                              className="me-2 d-flex justify-content-between"
                                            >
                                              <span>Սրվակ</span>
                                              <div className="d-flex justify-content-center align-items-center gap-1">
                                                <span>
                                                  {el.vial?.trim() ===
                                                  "Heparin" ? (
                                                    <div>
                                                       <img width={"20px"} height={"20px"} src={heparinVial} alt='vial'/>
                                                    </div>
                                                  ) : el.vial?.trim() ===
                                                    "EDTA" ? (
                                                      <div>
                                                       <img width={"20px"} height={"20px"} src={edtaVial} alt='vial'/>
                                                    </div>
                                                  ) : el.vial?.trim() ===
                                                      "Na Citr." ||
                                                    el.vial?.trim() ===
                                                      "Na Citr" ? (
                                                        <div>
                                                        <img width={"20px"} height={"20px"} src={citratVial} alt='vial'/>
                                                     </div>
                                                  ) : el.vial?.trim() ===
                                                    "Հել" || el.vial?.trim() ===
                                                    "Hel" ? (
                                                      <div>
                                                      <img width={"20px"} height={"20px"} src={helVial} alt='vial'/>
                                                   </div>
                                                  ) 
                                                  // : el.vial?.trim() ===
                                                  //     "Մատից արյան նմուշառում ֆիլտրի թղթի վրա" ||
                                                  //   el.vial?.trim() ===
                                                  //     "Արյուն - 2 NIPT սրվակներ" ? (
                                                  //   <div
                                                  //     style={{
                                                  //       width: "1rem",
                                                  //       height: "1rem",
                                                  //       borderRadius: "10px",
                                                  //       backgroundColor: "red",
                                                  //     }}
                                                  //   ></div>
                                                  // ) 
                                                  : (
                                                    ""
                                                  )}
                                                </span>
                                                {el.vial}
                                              </div>
                                            </div>
                                            <div className="separator m-0"></div>

                                            <div
                                              style={{ gap: "1rem" }}
                                              className="me-2 d-flex justify-content-between"
                                            >
                                              <span>Կենսանյութ</span>
                                              {el.biomaterial}
                                            </div>
                                            <div className="separator m-0"></div>

                                            <div
                                              style={{ gap: "1rem" }}
                                              className="me-2 d-flex justify-content-between"
                                            >
                                              <span>

                                            <BiSolidInfoCircle
                                              cursor={"pointer"}
                                              size={"1.5rem"}
                                              onClick={() =>
                                                handleOpenInfoModal(
                                                  el.researchPrepSub
                                                )
                                              }
                                              />
                                              </span>
                                              {/* <img width={'30px'} height={'30px'} src={el.vial.trim()==='Heparin'&&heparinVial} alt='vial'/> */}
                                            </div>
 <div>
                                            
                                          </div>
                                            <div
                                              style={{
                                                borderBottom:
                                                  ".15rem solid gray",
                                                borderRadius: ".8rem",
                                              }}
                                            ></div>
                                          </div>
                                        ))}
                                        <div className="d-flex justify-content-end">
                                       

                                          <Button
                                            style={{
                                              backgroundColor: "#4eafcb",
                                            }}
                                            onClick={(e) => {
                                              e.target.disabled = true;
                                            }}
                                          >
                                            Կատարել
                                          </Button>
                                          <Button
                                            style={{ backgroundColor: "gray" }}
                                            onClick={() =>
                                              handleOpenPrintModal(data, group)
                                            }
                                            >
                                            Տպել
                                          </Button>
                                           
                                        </div>
                                      </div>
                                    );
                                  }
                                  return null;
                                })}
                              </>

                            )}

                            {noData && (
                              <div><h3>Այցելուն չունի նմուշառման հետազոտություններ</h3></div>
                            )}
                            
                          </main>
                        </div>
                      )
                        :<>
                        {wrongId && (
                          <div className="d-flex justify-content-center align-items-center" ><h3>Սխալ նույնականացման համար </h3></div>
                        )}
                        </>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sample;
