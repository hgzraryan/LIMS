import React, { useEffect, useState } from 'react'
import useGetData from '../../hooks/useGetData';
import { DIAGNOSTICS_URL, PATIENTS_URL } from '../../utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import {utils, writeFile} from 'xlsx';
import moment from 'moment';

function ReportsExport() {
    const navigate = useNavigate()
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();  
    const [errMsg, setErrMsg] = useState("");
    const [diagnostics, setDiagnostics] = useState([]);
    const [isLoading, setIsLoading] = useState("");
  
    useEffect(() => {
        setTimeout(() => {
          axiosPrivate
            .get(DIAGNOSTICS_URL)
            .then((resp) => {
                // const formatedData=resp?.data?.jsonString.map((el)=>{
                //     return {
                //         ...el,
                //         dateOfBirth:moment(el.dateOfBirth).format('DD-MM-YYYY'),
                //         createdAt:moment(el.createdAt).format('DD-MM-YYYY HH:mm'),
                //         updatedAt:moment(el.updatedAt).format('DD-MM-YYYY HH:mm'),
                //         gender:el.gender==="Male"?'Արական':el.gender==="Female"?'իգական':''
                //     }
                // })
                setDiagnostics(resp?.data?.jsonString);
              setIsLoading(false);
            })            
            // .then((resp) => {
            //   axiosPrivate.get(REFDOCTORS_URL).then((resp) => {
            //     setRefDoctors(resp?.data?.jsonString);
            //     setIsLoading(false);
            //   });
            // })
            .catch((err) => {
              console.log(err);
              navigate("/login", { state: { from: location }, replace: true });
    
            });
        }, 500);
      }, []);
      const handleExportDiagnostics = (exportName,exportData)=>{
        console.log(diagnostics)
        const workBook = utils.book_new()
        const workSheet = utils.json_to_sheet(exportData)
        utils.book_append_sheet(workBook,workSheet,exportName)
        writeFile(workBook,`diag${moment(new Date()).format('DD-MM-YYYY')}.xlsx`)
      }
  return (
    <div>
      <button 
      className='btn btn-primary' 
      onClick={()=>handleExportDiagnostics('Ախտորոշում',diagnostics)}>Արտահանել</button>
    </div>
  )
}

export default ReportsExport
