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
function Sample() {
  const [barcodeScan, setBarcodeScan] = useState("");
  const [data, setData] = useState("");
  const [modalInfo, setModalInfo] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const logout = useLogout();
  const barcodeInputRef = useRef(null);

  useEffect(() => {
    barcodeInputRef.current.focus();
  }, []);
  const handleOpenInfoModal = (user) => {
    setModalInfo((prev) => user);
  };
  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  const [isActive, setIsActive] = useState(false);
  const menuClick = (event) => {
    setIsActive((current) => !current);
  };

  const handleBarcode = async (data) => {
    try {
      const response = await axiosPrivate.get(`./diagnosticsSampling/${data}`);
      // setTimeout(() => {
      setData((prev) => response.data);
      //console.log(response.data);
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

              {/* /Search */}
            </div>
            {/* /Start Nav */}
            {/* End Nav */}
            <div className="nav-end-wrap" onClick={menuClick}>
              <ul className="navbar-nav flex-row">
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
                            <a
                              href="/login"
                              className="d-block fs-8 link-secondary"
                              onClick={signOut}
                            >
                              <u>Դուրս գալ</u>
                            </a>
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
                      {/* <a className="dropdown-item" href="/">
                          Օգնություն և սպասարկում
                        </a> */}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            {/* /End Nav */}
          </div>
        </nav>
        <div className="hk-pg-wrapper">
          <div className="contactapp-wrap">
            <div className="contactapp-content">
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
                        style={{ height: "80vh", width: "100%"}}
                      >
                        <div className="d-flex justify-content-center align-items-center flex-column">
                          <form
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
                              placeholder="Տվյալներ չկան"
                              onChange={(e) => setBarcodeScan(e.target.value)}
                            />
                            <Button type="submit" className="ms-2">
                              Ստուգել
                            </Button>
                          </form>
                        </div>
                        {console.log(data)}
                        {data && (
                          <div
                            className="d-flex justify-content-center align-items-center flex-column"
                            style={{ width: "100%" }}
                          >
                            <header>
                              <div>
                                <span style={{ fontWeight: "bold",fontSize:'18px' }}>
                                  {data.patient.firstName+" "}
                                  {data.patient.midName+" "}
                                  {data.patient.lastName+", "}
                                  {data.patient.dateOfBirth+", "}
                                </span>
                              </div>
                            </header>
                            <main>
                              {data.diagnostics?.statusBoard[1]?.researches.length &&
                                data.diagnostics?.statusBoard[1]?.researches.map((el) => {
                                  return (
                                    <>
                                      <div
                                        className="d-flex flex-column m-3"
                                        style={{
                                          border: "2px solid #000",
                                          borderRadius: "10px",
                                          padding: "2px",
                                          fontSize: "18px",
                                          width:'100%',
                                        }}
                                      >
                                          <div className="me-2 d-flex justify-content-between" >
                                            <span>ID</span>{el.id }
                                          </div>
                                          <div className="separator m-0"></div>                  

                                          <div className="me-2 d-flex justify-content-between">
                                          <span>Անվանում</span>{el.name }
                                          </div>
                                          <div className="separator m-0"></div>                  

                                          <div className="me-2 d-flex justify-content-between">
                                          <span>Լաբորատորիա / Ծառայություն</span> Քաղցկեղի մոլեկուլային հետազոտություն 
                                          </div>
                                          <div className="separator m-0"></div>                  

                                          <div className="me-2 d-flex justify-content-between">
                                          <span>Մատուցման հրապար/ առավել ժամկետ</span> 3-4 աշխ. օր 
                                          </div>
                                          <div className="separator m-0"></div>                  
                                          <div className="me-2 d-flex justify-content-between">
                                          <span>Սրվակ</span> Heparin</div>
                                          <div className="separator m-0"></div>                  

                                          <div className="me-2 d-flex justify-content-between">
                                          <span>Կենսանյութ</span>Ոսկրածուծ/ արյուն 
                                          </div>
                                          <div className="separator m-0"></div>                  

                                          <BiSolidInfoCircle
                                            cursor={"pointer"}
                                            size={"1.5rem"}
                                            onClick={() =>
                                              handleOpenInfoModal(
                                                "Ոսկրածուծի ախտաբան. / արյան ընդհ. Վերլուծության պատասխան պահանջվում է"
                                              )
                                            }
                                          />
                                        <Button
                                          style={{ backgroundColor: "#4eafcb" }}
                                          onClick={(e) => {
                                            e.target.disabled = true;
                                          }}
                                        >
                                          Կատարել
                                        </Button>
                                      </div>
                                    </>
                                  );
                                })}
                            </main>
                          </div>
                        )}
                      </div>
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
