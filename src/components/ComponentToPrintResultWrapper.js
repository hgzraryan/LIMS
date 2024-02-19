/* eslint-disable jsx-a11y/anchor-is-valid */
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import  { useRef } from 'react'
import ReactToPrint from 'react-to-print';
import { ResultToPrintComponent } from './ResultToPrintComponent';

function ComponentToPrintResultWrapper({data,patients}) {
    let patientRef = useRef(null); 

     const {statusBoard}=data
     const {patientId}=data
     patientRef.current = patients.filter((el)=>el.patientId===patientId)
    // console.log(data)
    let componentRef = useRef(null); 
    return (
        <div style={{ display: "flex" }}>
            <ReactToPrint
                trigger={() => (
                    <a
                        className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                        data-bs-toggle="tooltip"
                        data-placement="top"
                        title=""
                        data-bs-original-title="Archive"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}        
                    >
                        <span className="icon">
                            <span className="feather-icon">
                                <FeatherIcon icon="send"  />
                            </span>
                        </span>
                    </a>
                )}
                content={() => componentRef.current}
            />
            
            <div style={{ display: "none" }}>
                <ResultToPrintComponent ref={componentRef} value={data} statusBoard={statusBoard[4]} patient={patientRef.current} />
            </div>
        </div>
    )
}

export default ComponentToPrintResultWrapper