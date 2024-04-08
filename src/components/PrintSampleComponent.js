import React from 'react'
import BarcodeComp from './BarcodeComp'
import PrintSampleWrapper from './PrintSampleWrapper'

function PrintSampleComponent({modalPrint,setModalPrint}) {
    const {firstName,lastName,dateOfBirth} = modalPrint.client
    const {diagnosticsId} = modalPrint.diagnostics
    const {el} = modalPrint
    //const {diagnosticsId} = modalPrint.diagnostics
  return (
    <>
    {modalPrint &&
<>
        <header>
        <div>
            {/* {firstName + " " + lastName} */}
        </div>
        <div style={{display:'flex',justifyContent:'space-around', fontSize:'0.8rem'}}>
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
        <footer>
            
            <div className='d-flex justify-content-end'>

        <PrintSampleWrapper modalPrint={modalPrint} el={el}/>
            </div>
        </footer>
        </>
}
    </>
  )
}

export default PrintSampleComponent
