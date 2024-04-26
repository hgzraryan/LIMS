//import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import React from "react";
import { BarChartWithMultiXAxis } from "../BarChartWithMultiXAxis";
import { CustomActiveShapePieChart } from "../CustomActiveShapePieChart";
import { Box } from "@mui/material";
import labImage from "../../dist/img/med-lab.jpg"
import VerticalBarChart from "../VerticalBarChart";
import InfoTable from "../InfoTable"
import { useSelector } from "react-redux";
import { selectPatientsCount } from "../../redux/features/patients/patientsCountSlice";
import { selectDiagnosticsCount } from "../../redux/features/diagnostics/diagnosticsCountSlice";
import { selectUsersCount } from "../../redux/features/users/usersCountSlice";
import { selectResearchListCount } from "../../redux/features/researches/researchListCountSlice";
import { selectDoctorCount } from "../../redux/features/doctor/doctorCountSlice";
import StackedBarChart from "../StackedBarChart";

const Home = ({asd}) => {    
    const navigate = useNavigate();
    const logout = useLogout();
    const doctorsCount = useSelector(selectDoctorCount)
    const patientsCount = useSelector(selectPatientsCount)
    const usersCount = useSelector(selectUsersCount)
    const diagnosticsCount = useSelector(selectDiagnosticsCount)
    const researchListCount = useSelector(selectResearchListCount)

    const signOut = async () => {
        await logout();
        navigate('/login');
    }
    return (
      <Box p="1px" sx={{}}>
        <Box
        display="grid"
        gridTemplateColumns="repeat(12,1fr)"
        gridAutoRows="100vh"
        gap="5px"
		    ml='10px'
		    mt='10px'
        >
          <Box 
          gridColumn="span 3"
          //backgroundColor = "#dedfe0"
          >
          <img width={'100%'} height={300} src={labImage} alt="labImg"/>
          
            <Box mb="5px" sx={{
            width: 'auto',
            height: 'auto',
            padding:"20px",
            bgcolor: "#0a2f4c",          
            color:"#fff",
            fontSize:"35px",
            fontStyle:'italic',
          }}>
            <p>
          {patientsCount} 
            </p>
            <p style={{ fontSize:'18px'}}>
          Գրանցված այցելուներ
            </p>
          </Box>
            <Box mb="5px" sx={{
            width: 'auto',
            height: 'auto',
            padding:"20px",
            color:"#fff",
            fontSize:"35px",
            bgcolor: "#0a2f4c",
            fontStyle:'italic',
          }}>
             <p>
          {diagnosticsCount} 
            </p>
            <p style={{ fontSize:'18px'}}>
          Կատարված ախտորոշումներ
            </p> 
          </Box>
            <Box mb="5px" sx={{
            width: 'auto',
            padding:"20px",
            height: 'auto',
            color:"#fff",
            fontSize:"35px",
            bgcolor: "#0a2f4c",
            fontStyle:'italic',

          }}> <p>
          {doctorsCount} 
            </p>
            <p style={{ fontSize:'18px'}}>
          Փորձառու բժիշկներ
            </p>
            </Box>
            <Box mb="5px" sx={{
            width: 'auto',
            height: 'auto',
            padding:"20px",
            bgcolor: "#0a2f4c",
            color:"#fff",
            fontSize:"35px",
            fontStyle:'italic',

          }}><p>
          {researchListCount} 
            </p>
            <p style={{ fontSize:'18px'}}>
          Հետազոտություններ 
            </p> </Box>
            <Box mb="5px" sx={{
            width: 'auto',
            height: 'auto',
            padding:"20px",
            bgcolor: "#0a2f4c",
            color:"#fff",
            fontSize:"35px",
            fontStyle:'italic',

          }}><p>
          {usersCount} 
            </p>
            <p style={{ fontSize:'18px'}}>
          Պրոֆեսիոնալ աշխատակիցներ 
            </p> 
            </Box>
            
          
          </Box>
          <Box 
          gridColumn="span 6"
          sx={{}}
          >
            <Box mb='5px'  backgroundColor = "#EDF7F7">
          {/* <BarChartWithMultiXAxis/> */}
          <StackedBarChart/>
  
            </Box>
            <Box display="flex" justifyContent="space-between" overflow="hidden">
  
  
              <Box mr='5px' backgroundColor = "#EDF7F7" sx={{flex:"1",height:"595px", maxWidth:"400px"}} ><InfoTable/></Box>
  
  
              <Box backgroundColor = "#EDF7F7"sx={{flex:"1",height:"100%"}}><VerticalBarChart/></Box>
            </Box>
          </Box>
          <Box 
          gridColumn="span 3"
          backgroundColor = "#EDF7F7"
          >
    <CustomActiveShapePieChart/>
    <VerticalBarChart/>
          </Box>
        </Box>
        
        
        
       
      </Box>
    );
}

export default Home
