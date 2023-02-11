import React from 'react';


export const Identifiers = ({tagName, tagDetails, parent='', identifiers, onSelectionChange}) => {

    return (
        <div className="tagContainer">
            <div className="tag">
                <label htmlFor={parent+'_'+tagName} className="tagName">{tagName}</label>
                <input name={parent+'_'+tagName} id={parent+'_'+tagName} type="checkbox" checked={identifiers.includes(tagName)} onChange={(e) => onSelectionChange(e.target.checked, tagName)}/>
            </div>
            <div className="tagsContainerChild">
                {tagDetails.children ? Object.keys(tagDetails.children).map((tag, i) => <Identifiers key={i} tagName={tag} tagDetails={tagDetails.children[tag]} parent={parent+'_'+tagName} identifiers={identifiers} onSelectionChange={onSelectionChange} />) : ""}
            </div>
        </div>
    )
}