import React from "react";
import '../styles/Dialog.css';

export const Dialog = ({onClickOutSide, children}) => {
    return (
        <div className="dialogBackground" >
            <span className="dialogBackgroundOuter" onClick={onClickOutSide}></span>
            {children}
        </div>
    )
}