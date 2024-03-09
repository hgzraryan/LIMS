/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react'
import { ComponentToPrint } from './ComponentToPrint';
import ReactToPrint from 'react-to-print';

function ResearchesPrintWrapper({ value,currentPatient }) {
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
          <ComponentToPrint ref={componentRef} value={value} currentPatient={currentPatient} />
        </div>
      </div>
    );
}

export default ResearchesPrintWrapper
