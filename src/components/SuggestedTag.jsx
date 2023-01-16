import React from 'react';


export const SuggestedTag = ({tagName, tagDetails, onSelect}) => {

    return (
        <div className="suggestedTagContainer" style={{backgroundColor: tagDetails.color}} onClick={onSelect}>
            <p className="suggestedTag">{tagName}</p>
        </div>
    )
}