import React from "react";
import BarcodeComp from "./BarcodeComp";
import { forwardRef } from "react";

export const SampleBarcodeToPrint = forwardRef(({ modalPrint }, ref) => {
  const { firstName, lastName, dateOfBirth } = modalPrint.client;
  const { diagnosticsId } = modalPrint.diagnostics;
  const { el } = modalPrint;
  //const {diagnosticsId} = modalPrint.diagnostics
  return (
    <div ref={ref} style={{ margin: ".2rem" }}>
      <>
        {modalPrint &&
          modalPrint.el?.map((el) => {
            return (
              <div key={el.id} style={{ pageBreakAfter: "always", }}>
                <main style={{  margin: ".3rem" }}>
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
                      <p>{dateOfBirth}</p>
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
              </div>
            );
          })}
      </>
    </div>
  );
});
