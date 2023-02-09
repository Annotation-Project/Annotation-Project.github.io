import React from 'react';


export const Identifiers = ({tagName, tagDetails, disabled, parent='', downloadConfig, setDownloadConfig}) => {

    return (
        <div className="tagContainer">
            <div className="tag">
                <label htmlFor={parent+'_'+tagName} className="tagName">{tagName}</label>
                <input disabled={disabled} name={parent+'_'+tagName} id={parent+'_'+tagName} type="checkbox" checked={downloadConfig.identifiers.includes(tagName)} onChange={(e) => e.target.checked ?
                    setDownloadConfig({...downloadConfig, identifiers: [...downloadConfig.identifiers, tagName]}) :
                    setDownloadConfig({...downloadConfig, identifiers: downloadConfig.identifiers.filter(type => type !== tagName)})}/>
            </div>
            <div className="tagsContainerChild">
                {tagDetails.children ? Object.keys(tagDetails.children).map((tag, i) => <Identifiers key={i} tagName={tag} tagDetails={tagDetails.children[tag]} disabled={disabled} parent={parent+'_'+tagName} downloadConfig={downloadConfig} setDownloadConfig={setDownloadConfig} />) : ""}
            </div>
        </div>
    )
}