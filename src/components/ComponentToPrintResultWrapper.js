/* eslint-disable jsx-a11y/anchor-is-valid */
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import  { useRef } from 'react'
import ReactToPrint from 'react-to-print';
import { ResultToPrintComponent } from './ResultToPrintComponent';

function ComponentToPrintResultWrapper({data,patients}) {
    let patientRef = useRef(null); 
const handlePrint = () =>{
    console.log("printed")
}
     const {statusBoard}=data
     const {patientId}=data
     patientRef.current = patients.filter((el)=>el.patientId===patientId)

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
            
            <div style={{ display: "none" }}>
                <ResultToPrintComponent ref={componentRef} value={data} statusBoard={statusBoard[4]} patient={patientRef.current} />
            </div>
        </div>
    )
}

export default ComponentToPrintResultWrapper