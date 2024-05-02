import React, { useEffect, useState } from 'react'
import useGetData from '../../hooks/useGetData';
import { DIAGNOSTICS_URL, PATIENTS_URL, RESEARCHLISTS_URL } from '../../utils/constants';
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
    const [researchesList, setResearchesList] = useState([]);
    const [isLoading, setIsLoading] = useState("");
  //patient data
    // const formatedData=resp?.data?.jsonString.map((el)=>{
    //     return {
    //         ...el,
    //         dateOfBirth:moment(el.dateOfBirth).format('DD-MM-YYYY'),
    //         createdAt:moment(el.createdAt).format('DD-MM-YYYY HH:mm'),
    //         updatedAt:moment(el.updatedAt).format('DD-MM-YYYY HH:mm'),
    //         gender:el.gender==="Male"?'Արական':el.gender==="Female"?'իգական':''
    //     }
    // })
    useEffect(() => {
     
        axiosPrivate.get(RESEARCHLISTS_URL).then((resp) => {
          setResearchesList(resp?.data?.jsonString);
          setIsLoading(false);
        }).catch((err) => {
              console.log(err);
              navigate("/login", { state: { from: location }, replace: true });
              
            });
       
      }, []);
      useEffect(()=>{
        axiosPrivate.get(DIAGNOSTICS_URL)
        .then((resp) => {
          const formatedData=resp?.data?.jsonString.map((el)=>{
            return{
              ...el,
              researchList: el.researchList.map((researchItem) => {

                let asd=''
                for(let item of researchesList){
                    if(item.researchListId===researchItem){
                        asd=item.researchName
                    }
                }
                return asd; // Return the filtered list for the current researchItem
            })
            }
              })
              setDiagnostics(formatedData);
              setIsLoading(false);
            }).catch((err) => {
              console.log(err);
              navigate("/login", { state: { from: location }, replace: true });
              
            });       
      },[researchesList])
  
      const handleExportDiagnostics = (exportName,exportData)=>{
        const exportData1 = exportData.map(item => ({
          ...item,
          researchList: item.researchList.join(', ') // Convert array to comma-separated string
      }));
        const workBook = utils.book_new()
        const workSheet = utils.json_to_sheet(exportData1)
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
