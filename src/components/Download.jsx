import React from 'react'
import {MdClose} from 'react-icons/md'
import {Identifiers} from "./Indetifiers";

export const Download = ({downloadZIP, closeDialog, allTags, downloadConfig, setDownloadConfig}) => {

    return (
        <div id="downloadArea">
            <div className="boxedContainerTop">
                <p className="heading">Download Config</p>
                <MdClose onClick={closeDialog}/>
            </div>
            <div className="downloadMain">
                <div className="left">
                    <div id="" className="boxedContainer">
                        <div className="boxedContainerTop">
                            <p className="heading">Download Options</p>
                        </div>
                        <div id="downloadOptions" className="boxedContainerMain">
                            <div className="tagContainer">
                                <div className="tag">
                                    <input type="checkbox" name="NEA" id="NEA"
                                           checked={downloadConfig.categories.includes("NEA")}
                                           onChange={(e) => e.target.checked ?
                                               setDownloadConfig({
                                                   ...downloadConfig,
                                                   categories: [...downloadConfig.categories, "NEA"]
                                               }) :
                                               setDownloadConfig({
                                                   ...downloadConfig,
                                                   categories: downloadConfig.categories.filter(type => type !== "NEA")
                                               })}/>
                                    <label htmlFor="NEA">Named Entity Annotations</label>
                                </div>
                                {downloadConfig.categories.includes("NEA") ?
                                    <div className="tagsContainerChild">
                                        <div className="tag">
                                            <input type="checkbox" name="NEA_CDF" id="NEA_CDF"
                                                   checked={downloadConfig.categories.includes("NEA_CDF")}
                                                   onChange={(e) => e.target.checked ?
                                                       setDownloadConfig({
                                                           ...downloadConfig,
                                                           categories: [...downloadConfig.categories, "NEA_CDF"]
                                                       }) :
                                                       setDownloadConfig({
                                                           ...downloadConfig,
                                                           categories: downloadConfig.categories.filter(type => type !== "NEA_CDF")
                                                       })}/>
                                            <label htmlFor="NEA_CDF">Identification Dataset</label>
                                        </div>
                                        <div className="tag">
                                            <input type="checkbox" name="NEA_RDF" id="NEA_RDF"
                                                   checked={downloadConfig.categories.includes("NEA_RDF")}
                                                   onChange={(e) => e.target.checked ?
                                                       setDownloadConfig({
                                                           ...downloadConfig,
                                                           categories: [...downloadConfig.categories, "NEA_RDF"]
                                                       }) :
                                                       setDownloadConfig({
                                                           ...downloadConfig,
                                                           categories: downloadConfig.categories.filter(type => type !== "NEA_RDF")
                                                       })}/>
                                            <label htmlFor="NEA_RDF">RDF Dataset</label>
                                        </div>
                                    </div>
                                : ""}
                            </div>
                            <div className="tagContainer">
                                <div className="tag">
                                    <input type="checkbox" name="GAF" id="GAF"
                                           checked={downloadConfig.categories.includes("GAF")}
                                           onChange={(e) => e.target.checked ?
                                               setDownloadConfig({
                                                   ...downloadConfig,
                                                   categories: [...downloadConfig.categories, "GAF"]
                                               }) :
                                               setDownloadConfig({
                                                   ...downloadConfig,
                                                   categories: downloadConfig.categories.filter(type => type !== "GAF")
                                               })}/>
                                    <label htmlFor="GAF">Gender Annotations</label>
                                </div>
                                {downloadConfig.categories.includes("GAF") ?
                                    <div className="tagsContainerChild">
                                        <div className="tag">
                                            <input type="checkbox" name="GAF_CDF" id="GAF_CDF"
                                                   checked={downloadConfig.categories.includes("GAF_CDF")}
                                                   onChange={(e) => e.target.checked ?
                                                       setDownloadConfig({
                                                           ...downloadConfig,
                                                           categories: [...downloadConfig.categories, "GAF_CDF"]
                                                       }) :
                                                       setDownloadConfig({
                                                           ...downloadConfig,
                                                           categories: downloadConfig.categories.filter(type => type !== "GAF_CDF")
                                                       })}/>
                                            <label htmlFor="GAF_CDF">Identification Dataset</label>
                                        </div>
                                        <div className="tag">
                                            <input type="checkbox" name="GAF_RDF" id="GAF_RDF"
                                                   checked={downloadConfig.categories.includes("GAF_RDF")}
                                                   onChange={(e) => e.target.checked ?
                                                       setDownloadConfig({
                                                           ...downloadConfig,
                                                           categories: [...downloadConfig.categories, "GAF_RDF"]
                                                       }) :
                                                       setDownloadConfig({
                                                           ...downloadConfig,
                                                           categories: downloadConfig.categories.filter(type => type !== "GAF_RDF")
                                                       })}/>
                                            <label htmlFor="GAF_RDF">RDF Dataset</label>
                                        </div>
                                    </div>
                                    : ""}
                            </div>
                            <div className="tagContainer">
                                <div className="tag">
                                    <input type="checkbox" name="SLF" id="SLF"
                                           checked={downloadConfig.categories.includes("SLF")}
                                           onChange={(e) => e.target.checked ?
                                               setDownloadConfig({
                                                   ...downloadConfig,
                                                   categories: [...downloadConfig.categories, "SLF"]
                                               }) :
                                               setDownloadConfig({
                                                   ...downloadConfig,
                                                   categories: downloadConfig.categories.filter(type => type !== "SLF")
                                               })}/>
                                    <label htmlFor="SLF">Sequence Labeling</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*<div id="" className="boxedContainer staticSize">*/}
                    {/*    <div className="boxedContainerTop">*/}
                    {/*        <p className="heading">Select File Types</p>*/}
                    {/*    </div>*/}
                    {/*    <div id="selectFileType" className="boxedContainerMain">*/}
                    {/*        <div className="tag">*/}
                    {/*            <input type="checkbox" name="text" id="text"*/}
                    {/*                   checked={downloadConfig.fileTypes.includes("text")}*/}
                    {/*                   onChange={(e) => e.target.checked ? setDownloadConfig({*/}
                    {/*                       ...downloadConfig, fileTypes: [...downloadConfig.fileTypes, e.target.name]*/}
                    {/*                   }) : setDownloadConfig({*/}
                    {/*                       ...downloadConfig,*/}
                    {/*                       fileTypes: downloadConfig.fileTypes.filter(type => type !== e.target.name)*/}
                    {/*                   })}/>*/}
                    {/*            <label htmlFor="text">.txt</label>*/}
                    {/*        </div>*/}
                    {/*        <div className="tag">*/}
                    {/*            <input type="checkbox" name="xml" id="xml"*/}
                    {/*                   checked={downloadConfig.fileTypes.includes("xml")}*/}
                    {/*                   onChange={(e) => e.target.checked ? setDownloadConfig({*/}
                    {/*                       ...downloadConfig, fileTypes: [...downloadConfig.fileTypes, e.target.name]*/}
                    {/*                   }) : setDownloadConfig({*/}
                    {/*                       ...downloadConfig,*/}
                    {/*                       fileTypes: downloadConfig.fileTypes.filter(type => type !== e.target.name)*/}
                    {/*                   })}/>*/}
                    {/*            <label htmlFor="xml">.xml</label>*/}
                    {/*        </div>*/}
                    {/*        <div className="tag">*/}
                    {/*            <input type="checkbox" name="json" id="json"*/}
                    {/*                   checked={downloadConfig.fileTypes.includes("json")}*/}
                    {/*                   onChange={(e) => e.target.checked ? setDownloadConfig({*/}
                    {/*                       ...downloadConfig, fileTypes: [...downloadConfig.fileTypes, e.target.name]*/}
                    {/*                   }) : setDownloadConfig({*/}
                    {/*                       ...downloadConfig,*/}
                    {/*                       fileTypes: downloadConfig.fileTypes.filter(type => type !== e.target.name)*/}
                    {/*                   })}/>*/}
                    {/*            <label htmlFor="json">.json</label>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>/**/}

                </div>
                <div className="right">
                    <div id="" className="boxedContainer">
                        <div className="boxedContainerTop">
                            <p className="heading">Select Identifiers</p>
                        </div>
                        <div className="boxedContainerMain">
                            {allTags.map((tag, i) => <Identifiers key={i} tag={tag} downloadConfig={downloadConfig}
                                                                  setDownloadConfig={setDownloadConfig}/>)}
                        </div>
                    </div>
                    {(downloadConfig.identifiers.length > 0 && downloadConfig.fileTypes.length > 0 && downloadConfig.categories.length > 0) ?
                        <button id="downloadFileBtn" onClick={() => downloadZIP()}>Download Files</button> : ""}
                </div>
            </div>
        </div>
    )
}