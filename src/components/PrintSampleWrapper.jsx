import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import {SampleBarcodeToPrint} from './SampleBarcodeToPrint'

function PrintSampleWrapper({modalPrint,el}) {
    const handlePrint = () =>{
        console.log("printed")
    }
        //  const {statusBoard}=data
        //  const {patientId}=data
        //   patientRef.current = [].filter((el)=>el.patientId===patientId)
    
        let componentRef = useRef(null); 
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
        onAfterPrint={handlePrint}
        content={() => componentRef.current}
    />
    {
        modalPrint &&
    <div style={{ display: "none" }}>
        <SampleBarcodeToPrint ref={componentRef} modalPrint={modalPrint}  el={el} />
    </div>
    }
</div>
  )
}

export default PrintSampleWrapper
