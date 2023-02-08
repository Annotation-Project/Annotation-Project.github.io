import React from 'react';
import '../styles/Header.css'
import {useNavigate} from "react-router-dom";

export const Header = ({children}) => {
    const navigate = useNavigate();

    return (<header id="header">
        <div className="left">
            <h1 onClick={() => navigate('/')}>Annotation Tool</h1>
        </div>
        <div className="right">
            {children}
        </div>
    </header>)
}