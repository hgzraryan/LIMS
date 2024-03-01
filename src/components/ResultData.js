import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useTable } from 'react-table';
import mainLogo from "../dist/img/main-logo.jpg";
import userIcon from "../dist/pngIcons/user.png";
import phoneIcon from "../dist/pngIcons/phone.png";
import emailIcon from "../dist/pngIcons/email.png";
import genderIcon from "../dist/pngIcons/gender.png";
import calendarIcon from "../dist/pngIcons/calendar.png";
import geoIcon from "../dist/pngIcons/geo.png";
import { jsPDF } from "jspdf";
import '../dist/fonts/arnamu-normal.js'
import BarcodeComp from './BarcodeComp.js';
import ComponentToPrintResultWrapper from './ComponentToPrintResultWrapper.js';
import useAxiosPrivate from '../hooks/useAxiosPrivate.js';
import LoadingSpinner from './LoadingSpinner.js';

const data1 = [
    {
      shortName: "WBC",
      researchName: "Լեյկոցիտների ընդհանուր քանակ",
      analysisResult: 8.88,
      referenceRange: "4.0-10.0",
      units: "10^9/L",
    },
    {
      shortName: "RBC",
      researchName: "Էրիթրոցիտների ընդհանուր քանակ",
      analysisResult: 6.09,
     // referenceRange: ["men 4.0-10.0", "women 4,6-6,2"],
      referenceRange: [ " 4,6-6,2"],
      units: "10^9/L",
    },
    {
      shortName: "MCV ",
      researchName: "Էրիթրոցիտի միջին ծավալը փորձանմուշի  ընդհանուր ծավալում",
      analysisResult: 83.7 ,
      referenceRange: "80-100",
      units: "fl",
    },
    {
      shortName: "WBC",
      researchName: "Լեյկոցիտների ընդհանուր քանակ",
      analysisResult: 8.88,
      referenceRange: "4.0-10.0",
      units: "10^9/L",
    },
    {
      shortName: "WBC",
      researchName: "Լեյկոցիտների ընդհանուր քանակ",
      analysisResult: 8.88,
      referenceRange: "4.0-10.0",
      units: "10^9/L",
    },
    {
      shortName: "WBC",
      researchName: "Լեյկոցիտների ընդհանուր քանակ",
      analysisResult: 8.88,
      referenceRange: "4.0-10.0",
      units: "10^9/L",
    },
  
  ];
function ResultData({modalResult,patients,setModalResult}) { 
const [patient,setPatient]=useState({})
const [isLoading, setIsLoading] = useState(true);

  const axiosPrivate = useAxiosPrivate()
    const {patientId}=modalResult
    const {statusBoard}=modalResult
useEffect(()=>{
setTimeout(()=>{
axiosPrivate.get(`/patients/${patientId}`).then((resp)=>{
  setPatient(prev=>resp?.data?.jsonString)
  setIsLoading(false);
})
},500)
},[])
    let patientRef = useRef(null); 
    const handleSendResult = () => {
      const resultData = document.getElementById('resultData');
      console.log(JSON.stringify(resultData))
    };
    // const patient= patients.filter((el)=>el.patientId===patientId)[0]
       const columns = React.useMemo(
           () => [
             {
               Header: "",
               accessor: "shortName",
             },
             {
               Header: "Անվանում",
               accessor: "researchName",
             },
             {
               Header: "Արդյունք",
               accessor: "analysisResult",
             },
             {
               Header: "նորմա",
               accessor: "referenceRange",
             },
             {
               Header: "չ/մ",
               accessor: "units",
             },
           ],
           []
         );
   

   
     const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
     useTable({
       columns,
       data: data1,
     });
     const componentRef = useRef(); // Create a ref to the component

     const generatePDF = () => {
       //const doc = new jsPDF('p', 'pt', 'a4');
       const componentHTML = document.getElementById('resultData');

       const doc = new jsPDF({
         orientation: "portrait",
         
         unit: "pt",
         hotfixes: ["px_scaling"],
         putOnlyUsedFonts:true
        });
        doc.setFont('arnamu','normal')
        doc.html(componentRef.current,{
      html2canvas: {
            scale: 0.5,
            scrollY:0
        },
        x: 0,
        y: 0,
  
          callback: function  (pdf) {
            // Save the PDF
            pdf.save('generated_pdf.pdf');
          },
          margin: [10, 10, 10, 10],
          autoPaging: 'text',
          
        }
     )
    };
   return (
    <>
     
       
          <div
            className="resultTable"
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                margin: "4px",
                fontFamily:'arnamu'
            }}
            id='resultData'
            ref={componentRef}
        >
            <header className="header">
                <div className="" style={{ display: 'flex', justifyContent: "space-between" }}>
                    <div className="header__infoL " style={{ flex: '1' }}>
                        <h3 style={{ fontWeight: "bold", color: "#01903e" }}>ԵՎԱ ԼԱԲ</h3>
                        <h6>www.evalab.am</h6>
                    </div>
                    <div className="header__logo" style={{ flex: '1', display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <img
                            width={"136px"}
                            height={"136px"}
                            src={mainLogo}
                            alt="Logo"
                            style={{ margin: 0 }}
                        />
                    </div>
                    <div className="header__infoR"
                        style={{ flex: '1', display: 'flex', justifyContent: "center", flexWrap: 'wrap' }}>
                        <div style={{ maxWidth: "300px", fontSize: "14px" }}>
                            <div className="info-element" style={{ display: 'flex', justifyContent: 'end' }}>
                                <p>Ք․Վանաձոր, Բաբայան 5/8,4548</p>
                            </div>
                            <div className="info-element" style={{ display: 'flex', justifyContent: 'end' }}>
                                <p>+374 99 942-200, +374 32 242-200</p>
                            </div>
                            <div className="info-element" style={{ display: 'flex', justifyContent: 'end' }}>
                                <p>Երկ. - Ուրբ. 08:00-18:00</p>
                            </div>
                            <div className="info-element" style={{ display: 'flex', justifyContent: 'end' }}>
                                <p>Շաբ․ 08:00-13:00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
         <main style={{ flex: "1 1 auto" }}>
           <section>
             <div
               className="result title"
               style={{
                 display:'flex',
                justifyContent:'center',
                alignItems:'center',
                 background: "#01903e",
                 color: "white",
                 borderRadius: "5px",
                 margin: "10px 0",
               }}
             >
               <p style={{ padding: "5px", fontSize: "20px", fontWeight: "bold" }}>
                 ՀԵՏԱԶՈՏՈՒԹՅՈՒՆՆԵՐԻ ԱՐԴՅՈՒՆՔՆԵՐ
               </p>
             </div>
           </section>
                 <Suspense fallback={<LoadingSpinner />}>
           {isLoading ? (
             <LoadingSpinner />
           ) : (
             <>
           <section className="containerr"  >
             <div  style={{display:'flex'}}>
               <div  style={{flex:'1'}}>
                 <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                   <div  style={{display:'flex'}}>
                     <img src={userIcon} alt='userIcon' width='20px'/>
                     <p  style={{marginLeft:'2px',fontWeight:'bold'}}>{ patient?.lastName + " " + patient?.firstName + " " + patient?.midName}</p>
                   </div>
   
                   <div style={{display:'flex'}}>
                     <p style={{marginLeft:'2px',fontWeight:'bold'}}>{patient?.gender==='Male' ? 'Ար․':'Իգ'}</p>
                     <p style={{marginLeft:'2px',fontWeight:'bold'}}>{patient.dateOfBirth }</p>
                     <p style={{marginLeft:'2px',fontWeight:'bold'}}>{patient.age}</p>
                   </div>
                 </div>
                 <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                   <div style={{display:'flex'}}>
                   <img src={phoneIcon} alt='phoneIcon' width='20px'/>

                     <p style={{marginLeft:'2px',marginRight:'4px',fontWeight:"bold"}}>{patient?.contact?.phone}</p>
                     <img src={geoIcon} alt='geoIcon' width='20px' style={{marginLeft:'20px'}}/>

                     <p style={{marginLeft:'5px'}}> ք. {patient?.contact?.address?.city} </p>
                   </div>
   
                   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                   <img src={emailIcon} alt='emailIcon' width='20px' style={{marginRight:'10px'}}/>

                     <a href="mailto:someone@example.com">{patient?.contact?.email}</a>
                   </div>
                 </div>
               </div>
   
               <div style={{marginLeft:'1.5rem'}}>
                 <div style={{display:'flex'}}>
                 <img src={calendarIcon} alt='calendarIcon' width='20px' height='20px' style={{marginLeft:'10px', marginRight:'10px'}}/>

                   <p>{modalResult.createdAt || '22.01.24 10:08'}</p>
                 </div>
                 <div style={{display:'flex'}}>
                 <img src={calendarIcon} alt='calendarIcon' width='20px' height='20px' style={{marginLeft:'10px', marginRight:'10px'}}/>

                   <p>{modalResult.diagnosisDate || '22.01.24 15:08'}</p>
                 </div>
               </div>
             </div>
           </section>
           <section className="containerr d-flex justify-content-between mb-2">
          <BarcodeComp data = {modalResult?.diagnosticsId}/>
        </section>
           <section>
             <div>
               <div style={{display:'flex',justifyContent:'center',marginTop:'0.5rem',alignItems:'center'}} >
                 <b>{modalResult.title || 'Արյան կլինիկական հետազոտություններ'}</b>
               </div>
               <div style={{display:'flex',justifyContent:'center',marginTop:'0.5rem',alignItems:'center'}} >
                 <p>
                   
                   Նմուշառված է՝ {modalResult.diagnosisDate}
                   {/* <span className="ps-8"> Արտաքին նմուշ [] </span> */}
                 </p>
               </div>
               <div style={{display:'flex',justifyContent:'space-between'}}>
                 <p> Կենսանյութ՝ {modalResult.biomass || 'Արյուն'}</p>
                 <p style={{ fontSize: "13px" }}>
                   Հետազոտությունը կատարվել է {modalResult.device || 'Sysmex XN 550'} ավտոմատ վերլուծիչով
                 </p>
               </div>
             </div>
           </section>
           <section className="containerr">
             <div>
               <table
               className='resultTable'
                 style={{
                  width:'100%',
                   border: "1px solid black",
                   fontSize: "14px",
                   color: "#000",
                   marginTop: "10px",
                   borderCollapse: 'collapse',
                 }}
               >
                 <thead>
                   {headerGroups.map((headerGroup) => (
                     <tr {...headerGroup.getHeaderGroupProps()}>
                       {headerGroup.headers.map((column) => (
                         <th {...column.getHeaderProps()}>
                           {column.render("Header")}
                         </th>
                       ))}
                     </tr>
                   ))}
                 </thead>
                 <tbody {...getTableBodyProps()}>
                   {rows.map((row, i) => {
                     prepareRow(row);
                     return (
                       <tr key={i} {...row.getRowProps()}>
                         {row.cells.map((cell) => {
                           return (
                             <td
                               {...cell.getCellProps()}
                               style={{ border: "1px solid black" }}
                             >
                               {cell.render("Cell")}
                             </td>
                           );
                         })}
                       </tr>
                     );
                   })}
                 </tbody>
               </table>
             </div>
           </section>
           </>
       )}
       </Suspense>
         </main>
         <footer style={{ marginTop: "auto" }}>
           <div>
             <p>Լիցենզիա Կ-ԲՕ-145847 տրվ. ԱՆ 24.07.2013թ</p>
           </div>
         </footer>
     <footer style={{display:'flex', justifyContent:'end',gap:'5px'}}>

           <button
                type="button"
                className="btn btn-secondary"
                onClick={()=> generatePDF()}
                >
                Ուղարկել
              </button>
              <ComponentToPrintResultWrapper
                data={modalResult}
                patients={patients}
                />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setModalResult(false)}
                >
                Փակել
              </button>
     
                </footer>
                
     </div>
                
                
       
       </>
   );
}

export default ResultData
