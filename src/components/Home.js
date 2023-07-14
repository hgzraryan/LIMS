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
        
        <>
        <h1>Home</h1>
        <br />
        <p>You are logged in!</p>
        <br />
        <Link to="/editor">Go to the Editor page</Link>
        <br />
        <Link to="/admin">Go to the Admin page</Link>
        <br />
        <Link to="/lounge">Go to the Lounge</Link>
        <br />
        <Link to="/linkpage">Go to the link page</Link>
        <div className="flexGrow">
            <button onClick={signOut}>Sign Out</button>
        </div>
        </>

        
    )
}

export default Home
