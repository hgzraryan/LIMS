import React from "react";
import BarcodeComp from "./BarcodeComp";
import PrintSampleWrapper from "./PrintSampleWrapper";
import moment from "moment";

function PrintSampleComponent({ modalPrint, setModalPrint }) {
  const { firstName, lastName, dateOfBirth } = modalPrint.client;
  const { diagnosticsId } = modalPrint.diagnostics;
  const { el } = modalPrint;
  //const {diagnosticsId} = modalPrint.diagnostics
  return (
    <>
      {modalPrint && modalPrint.el?.map((el)=>{

         return (
            <>
            <main>
              <header>
                <div>{/* {firstName + " " + lastName} */}</div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    fontSize: "0.8rem",
                  }}
                >
                  <p>{diagnosticsId}</p>
                  <p>{moment(dateOfBirth).format('DD-MM-YYYY')}</p>
                </div>
              </header>
              <section>
    
                <div
                  style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    >
                  {el && <BarcodeComp data={el.id} />}
                </div>
                    </section>
              </main>
            </>
          )
      })
      }
              <footer>
                <div className="d-flex justify-content-end">
                  <PrintSampleWrapper modalPrint={modalPrint} el={el} />
                </div>
              </footer>
    </>
  );
}

export default PrintSampleComponent;
