/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react'
import { ComponentToPrint } from './ComponentToPrint';
import ReactToPrint from 'react-to-print';
import {ComponentToPrintVisit} from './ComponentToPrintVisit';

function ResearchesPrintWrapper({ value,currentClient }) {
    let componentRef = useRef(null); // 2.
    return (
      <div style={{ display: "flex" }}>
        <ReactToPrint
          trigger={() => (
            
              <button
              type="button"
            className="btn btn-secondary"
            >
             Տպել
            </button>
          )}
          content={() => componentRef.current}
        />
        <div style={{ display: "none" }}>
         {value?.diagnosticsId 
         ?<ComponentToPrint ref={componentRef} value={value} currentClient={currentClient} />
         :value?.doctorsVisitId
         ?<ComponentToPrintVisit ref={componentRef} value={value}  />
         :''
         }
        </div>
      </div>
    );
}

export default ResearchesPrintWrapper
