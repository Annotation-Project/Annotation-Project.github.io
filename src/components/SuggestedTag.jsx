import React from 'react';


export const SuggestedTag = ({tag, onSelect}) => {

    return (
        <div className="suggestedTagContainer" style={{backgroundColor: tag.color}} onClick={onSelect}>
            <p className="suggestedTag">{tag.name}</p>
        </div>
    )
}