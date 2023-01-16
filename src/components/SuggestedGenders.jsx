import React from 'react';
import {MdDone} from "react-icons/md";


export const SuggestedGenders = ({gender, selected, onSelect}) => {

    return (
        <div className="suggestedTagContainer" style={{backgroundColor: "#FFFFFF"}} onClick={onSelect}>
            <p className="suggestedTag">{gender}</p>
            {selected ? <MdDone/> : ""}
        </div>
    )
}