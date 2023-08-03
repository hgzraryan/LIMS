import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
//import React, { useState, useEffect, useRef } from "react";





const Home = () => {
    
    const navigate = useNavigate();
    const logout = useLogout();



    const signOut = async () => {
        await logout();
        navigate('/login');
    }
    
    return (
        <div>
            Dashoard
		</div>	

        
    )
}

export default Home
