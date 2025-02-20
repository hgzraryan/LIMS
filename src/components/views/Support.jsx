import React from "react";
import supportImg from "../../../src/dist/img/contactUs.jpg";
import phoneSvg from "../../dist/svg/phone.svg";
import messagesSvg from "../../dist/svg/messages.svg";
function Support() {
  return (
    <div className="m-0 p-0" style={{ width: "100%", height: "80vh" }}>
      <main className="d-flex flex-column">
        <section>
          <img src={supportImg} alt="supportImg" width={"100%"} height={'450px'} />
        </section>
        <section className="d-flex justify-content-center align-items-center " style={{gap:'60px',marginTop:'-60px',}}>
          <div className="d-flex flex-column " style={{backgroundColor:'#fff',padding:'30px',minWidth:'400px'}}>
            <div className="d-flex justify-content-center align-items-center mb-2">
              <img src={phoneSvg} alt="phoneImg" width={50} height={50} />
            </div>
            <div className="d-flex justify-content-center align-items-center mb-2">

            <p style={{fontSize:'22px',fontWeight:'bold'}}>Զանգ Սպասարկման կենտրոն</p>
            </div>
            <div className="d-flex justify-content-center align-items-center" style={{fontSize:'22px',fontWeight:'bold'}}>

            <a href="tel:+37493574144" className="supportNumber " >
              <span className="text-decoration-underline" >+37493574144</span>
            </a>
            </div>
          </div>
          <div className="d-flex flex-column " style={{backgroundColor:'#fff',padding:'30px',minWidth:'400px'}}>
            <div className="d-flex justify-content-center align-items-center mb-2">
              <img src={messagesSvg} alt="phoneImg" width={50} height={50} />
            </div>
            <div className="d-flex justify-content-center align-items-center mb-2">

            <p style={{fontSize:'22px',fontWeight:'bold'}}>Կապ մեզ հետ</p>
            </div>
            <div className="d-flex justify-content-center align-items-center" style={{fontSize:'22px',fontWeight:'bold'}}>

            <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                        >
                          Գրել
                        </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Support;
