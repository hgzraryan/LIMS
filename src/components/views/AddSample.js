/* eslint-disable jsx-a11y/anchor-is-valid */
import { Input } from "@mui/icons-material";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import useScanDetection from "use-scan-detection-react18";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
function Sample() {
  const [barcodeScan, setBarcodeScan] = useState("Տվյալներ չկան");
  const [data, setData] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
    const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate('/login');
}
const [isActive, setIsActive] = useState(false);
const menuClick = event => {
  setIsActive(current => !current);
};
  useScanDetection({
    onComplete: (code) => {
      setBarcodeScan(code);
    },
  });
  const handleBarcode = async (data) => {
    try {
      const response = await axiosPrivate.get("./getBarcodeData");
      setTimeout(() => {
        setData((prevUsers) => response.data);
      }, 500);
    } catch (err) {
      console.error(err);
      //navigate("/login", { state: { from: location }, replace: true });
    }
  };
  return (
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
                    style={{ height: "80vh", overflow: "auto" }}
                  >
                    <p>Բարկոդ:</p>

                    <form id="barcodeForm">
                      <input
                        id="barcode"
                        type="text"
                        name="barcode"
                        value={barcodeScan}
                      />
                      <Button
                        className="ms-2"
                        onClick={() => handleBarcode(barcodeScan)}
                      >
                        Ստուգել
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
              {data && <div className="data">{data}</div>}
            </div>
          </div>
        </div>
      </div>
          </div>
      
    </div>
  );
}

export default Sample;
