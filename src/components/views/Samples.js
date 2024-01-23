import { Input } from "@mui/icons-material";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import useScanDetection from "use-scan-detection-react18";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
function Sample() {
  const [barcodeScan, setBarcodeScan] = useState("Տվյալներ չկան");
  const [data, setData] = useState([]);
  const axiosPrivate = useAxiosPrivate();

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
    <div>
      <div className="contactapp-wrap">
        <div className="contactapp-content">
          <div className="contactapp-detail-wrap w-100">
            <header className="contact-header">
              <div className="d-flex align-items-center">
                <div className="dropdown">
                  <a
                    className="contactapp-title link-dark"
                    data-bs-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <h1>Սկանավորիր Բարկոդը</h1>
                  </a>
                </div>
              </div>
            </header>
            <div className="contact-body">
              <div data-simplebar className="nicescroll-bar">
                <div className="contact-list-view">
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
  );
}

export default Sample;
