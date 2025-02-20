import React, { useEffect, useState } from 'react';
import { DIAGNOSTICS_URL} from '../../utils/constants';
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
      setTimeout(() => {
        axiosPrivate.get(DIAGNOSTICS_URL).then((resp) => {
          setDiagnostics(resp?.data?.jsonString);
          setIsLoading(false);       
        })
        .catch((err) => {
            console.log(err);
            navigate("/login", { state: { from: location }, replace: true });  
          });
      }, 500);
    }, []);
    const findResearches = (statusBoard) => {
      return statusBoard.flatMap(elem => elem.researches.map(research => research?.name));
    }
    const handleExportDiagnostics = (exportName,exportData)=>{
        const formatedData=exportData.map((el)=>{
          return {
            ...el,
            // researchList: el.researchList.map((researchItem) => {
            //     const foundResearch = researchesList.find((item) => item.researchListId === researchItem);
            //     return foundResearch ? foundResearch.researchName : '';
            // })
            researchList: findResearches(el.statusBoard)
        }
            })
        const exportData1 = formatedData.map(item => ({
          ...item,
          researchList: item.researchList.join(', '),
          createdAt:moment(item.createdAt).format('DD-MM-YYYY HH:mm'),
          generationDate:moment(item.generationDate).format('DD-MM-YYYY HH:mm'),
          updatedAt:moment(item.updatedAt).format('DD-MM-YYYY HH:mm'),
          clientDob:moment(item.generationDate).format('DD-MM-YYYY'),
          clientGender:item.clientGender==="Male"?'Արական':item.clientGender==="Female"?'իգական':'',
          diagStatus:item.diagStatus==="Active"?'Ակտիվ':item.diagStatus==="Cancelled"?'Չեղարկված':'',
          class:item.class==="Internal"?'Ներքին':item.class==="External"?'Արտաքին':'',
          internalStatus:item.internalStatus==="Approval"?'Ընդունված':item.internalStatus,
          externalStatus:item.externalStatus==="Approval"?'Ընդունված':item.externalStatus,
          clientType:item.clientType==="patient"?'Այցելու':item.clientType==="organization"?'Պատվիրատու':'',
          paymentDate:item?.paymentDate?moment(item?.paymentDate).format('DD-MM-YYYY HH:mm'):null,
          diagnosisDate:item?.diagnosisDate?moment(item?.diagnosisDate).format('DD-MM-YYYY HH:mm'):null,
          doctors:item?.doctors?.length?item.doctors[0]:null
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
