import React from 'react';
import '../styles/Header.css'

export const Header = ({children}) => {

    return (<header id="header">
        <div className="left">
            <h1>Annotation Tool</h1>
        </div>
        <div className="right">
            {children}
        </div>
    </header>)
}