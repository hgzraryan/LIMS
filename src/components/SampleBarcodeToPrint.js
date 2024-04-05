import React from 'react'
import BarcodeComp from './BarcodeComp'
import { forwardRef } from 'react';


export const SampleBarcodeToPrint = forwardRef(({ modalPrint }, ref) => {
        const {firstName,lastName,dateOfBirth} = modalPrint.client
        const {diagnosticsId} = modalPrint.diagnostics
        const {el} = modalPrint
        //const {diagnosticsId} = modalPrint.diagnostics
        console.log(modalPrint)
        return (
        <div ref={ref} style={{margin:'.2rem'}}>
        
            <header>
            <div>
                {/* {firstName + " " + lastName} */}
            </div>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <p>{diagnosticsId}</p>
                <p>{dateOfBirth}</p>
            </div>
            </header> 
            <main>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        
                {
                    el && 
                    <BarcodeComp data={el.id}  /> 
                }
                </div>
            </main>
            {/* <footer>
            <PrintSampleWrapper value={modalPrint} currentClient={el}/>
            </footer> */}
            </div>
        
        );
      });