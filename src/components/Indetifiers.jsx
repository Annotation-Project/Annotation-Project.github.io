import React from 'react';


export const Identifiers = ({tagName, tagDetails, downloadConfig, setDownloadConfig}) => {

    return (
        <div className="tagContainer">
            <div className="tag">
                <p className="tagName">{tagName}</p>
                <input type="checkbox" checked={downloadConfig.identifiers.includes(tagName)} onChange={(e) => e.target.checked ?
                    setDownloadConfig({...downloadConfig, identifiers: [...downloadConfig.identifiers, tagName]}) :
                    setDownloadConfig({...downloadConfig, identifiers: downloadConfig.identifiers.filter(type => type !== tagName)})}/>
            </div>
            <div className="tagsContainerChild">
                {tagDetails.children ? Object.keys(tagDetails.children).map((tag, i) => <Identifiers key={i} tagName={tag} tagDetails={tagDetails.children[tag]} downloadConfig={downloadConfig} setDownloadConfig={setDownloadConfig} />) : ""}
            </div>
        </div>
    )
}