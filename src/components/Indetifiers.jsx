import React from 'react';


export const Identifiers = ({tag, downloadConfig, setDownloadConfig}) => {

    return (
        <div className="tagContainer">
            <div className="tag">
                <p className="tagName">{tag.name}</p>
                <input type="checkbox" checked={downloadConfig.identifiers.includes(tag.name)} onChange={(e) => e.target.checked ?
                    setDownloadConfig({...downloadConfig, identifiers: [...downloadConfig.identifiers, tag.name]}) :
                    setDownloadConfig({...downloadConfig, identifiers: downloadConfig.identifiers.filter(type => type !== tag.name)})}/>
            </div>
            <div className="tagsContainerChild">
                {tag.children ? tag.children.map((tag, i) => <Identifiers key={i} tag={tag} downloadConfig={downloadConfig} setDownloadConfig={setDownloadConfig} />) : ""}
            </div>
        </div>
    )
}