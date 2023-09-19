//import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import React from "react";
import { BarChartWithMultiXAxis } from "../components/BarChartWithMultiXAxis";
import { CustomActiveShapePieChart } from "../components/CustomActiveShapePieChart";
import { Box } from "@mui/material";
import labImage from "../dist/img/med-lab.jpg"
import VerticalBarChart from "../components/VerticalBarChart";
import InfoTable from "./InfoTable"




const Home = () => {
    
    const navigate = useNavigate();
    const logout = useLogout();



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
          backgroundColor = "#dedfe0"
          >
          <img width={395} height={250} src={labImage}/>
          
            <Box mb="5px" sx={{
            width: 395,
            height: 130,
            padding:"20px",
            bgcolor: "#0a2f4c",          
            color:"#fff",
            fontSize:"35px",
          }}>25,125</Box>
            <Box mb="5px" sx={{
            width: 395,
            height: 130,
            padding:"20px",
            color:"#fff",
            fontSize:"35px",
            bgcolor: "#0a2f4c",
          }}>42,529 </Box>
            <Box mb="5px" sx={{
            width: 395,
            padding:"20px",
            height: 130,
            color:"#fff",
            fontSize:"35px",
            bgcolor: "#0a2f4c",
          }}> 58,000</Box>
            <Box mb="5px" sx={{
            width: 395,
            height: 130,
            padding:"20px",
            bgcolor: "#0a2f4c",
            color:"#fff",
            fontSize:"35px",
          }}>11,254</Box>
            <Box mb="5px" sx={{
            width: 395,
            height: 130,
            padding:"20px",
            bgcolor: "#0a2f4c",
            color:"#fff",
            fontSize:"35px",
          }}>49,457 </Box>
            
          
          </Box>
          <Box 
          gridColumn="span 6"
          sx={{}}
          >
            <Box mb='5px'  backgroundColor = "#EDF7F7">
          <BarChartWithMultiXAxis/>
  
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
