import React from "react";
import {Identifiers} from "./Indetifiers";
import JSZip from "jszip";
import Moment from "moment";
import '../../styles/Download.css';

const findAllIndexOfSubArray = (parent, child, index = 0) => {
    const res = [];
    for (let i = index; i <= parent.length - child.length; i++) {
        let l = 0, r = child.length - 1;
        while (l <= r) {
            if (parent[i + l].toLowerCase() !== child[l].toLowerCase() || parent[i + r].toLowerCase() !== child[r].toLowerCase()) break;
            else {
                l++;
                r--;
            }
        }
        if (l > r) res.push(i);
    }
    return res;
}

export const Download = ({project}) => {
    const [downloadConfig, setDownloadConfig] = React.useState({
        categories: {
            NEA: true,
            NEA_CDF: true,
            NEA_RDF: true,
            NEA_SLF: true,
            GAF: true,
            GAF_CDF: true,
            GAF_RDF: true,
            GAF_SLF: true,
            RAF: true,
            RAF_RDF: true,
            RAF_CDF: true,
        },
        fileTypes: ['text', 'xml', 'json'],
        identifiers: []
    });

    const downloadZIP = () => {
        const zip = new JSZip();
        const folder = zip.folder(project.fileName);
        const dt = Moment().format('YYYY-MM-DD_HH-mm-ss');

        if (downloadConfig.categories.NEA) {
            downloadConfig.identifiers.forEach(identifier => {
                const rdf_txt = [], cdf_txt = [];
                const sl = project.paragraph.map(s => s.match(/(\w+|[^\w\s])/g).fill('O'));
                const subFolder = folder.folder(identifier + '-IDENTIFICATION');
                project.namedEntityAppearances.forEach((tws, sNo) => {
                    tws.forEach((tw) => {
                        if (project.namedEntities[tw.text.toLowerCase()].tags && project.namedEntities[tw.text.toLowerCase()].tags.includes(identifier)) {
                            if (downloadConfig.categories.NEA_RDF) {
                                // RDF Dataset
                                tw.indices.forEach(index => {
                                    rdf_txt.push(`${tw.text}\tisA\t${identifier}\t${sNo + 1}\t${index}\t${index + tw.text.length}\t${project.paragraph[sNo].split(/\t/g).slice(0, -1).reverse().join('\t')}`);
                                })
                            }
                            if (downloadConfig.categories.NEA_CDF) {
                                // Identification Dataset
                                cdf_txt.push(`${project.paragraph[sNo]}\t${tw.text}\t${identifier}`);
                            }
                            if (downloadConfig.categories.NEA_SLF) {
                                // Sequence Labeling
                                const subArray = tw.text.match(/(\w+|[^\w\s])/g);
                                findAllIndexOfSubArray(project.paragraph[sNo].split(/\t/g).at(-1).match(/(\w+|[^\w\s])/g), subArray).forEach(index => {
                                    for (let i = 0; i < subArray.length; i++) sl[sNo][index + i] = `${(index + i) === 0 ? 'B' : 'I'}-${identifier}`;
                                })
                            }
                        }
                    })
                });

                if (downloadConfig.categories.NEA_RDF) subFolder.file(`${identifier}-IDENTIFICATION-RDF-DATASET.txt`, new Blob([rdf_txt.join('\n')], {type: 'text/plain'}));
                if (downloadConfig.categories.NEA_CDF) subFolder.file(`${identifier}-IDENTIFICATION-DATASET.txt`, new Blob([cdf_txt.join('\n')], {type: 'text/plain'}));
                if (downloadConfig.categories.NEA_RDF) subFolder.file(`${identifier}-IDENTIFICATION-SEQUENCE-LABELING.txt`, new Blob([sl.map((l, i) => `${project.paragraph[i]}\t${l.join(' ')}`).join('\n')], {type: 'text/plain'}));
            });
        }

        if (downloadConfig.categories.GAF) {
            const rdf_txt = [], cdf_txt = [];
            const sl = project.paragraph.map(s => s.match(/(\w+|[^\w\s])/g).fill('O'));
            const subFolder = folder.folder('GENDER IDENTIFICATION');

            project.namedEntityAppearances.forEach((tws, sNo) => {
                tws.forEach((tw) => {
                    if (project.namedEntities[tw.text.toLowerCase()].gender) {
                        if (downloadConfig.categories.GAF_RDF) {
                            // RDF Dataset
                            tw.indices.forEach(index => {
                                rdf_txt.push(`${tw.text}\tisA\t${project.namedEntities[tw.text.toLowerCase()].gender}\t${sNo + 1}\t${index}\t${index + tw.text.length}\t${project.paragraph[sNo].split(/\t/g).slice(0, -1).reverse().join('\t')}`);
                            })
                        }
                        if (downloadConfig.categories.GAF_CDF) {
                            // Identification Dataset
                            cdf_txt.push(`${project.paragraph[sNo]}\t${tw.text}\t${project.namedEntities[tw.text.toLowerCase()].gender}`);
                        }
                        if (downloadConfig.categories.GAF_SLF) {
                            // Sequence Labeling
                            const subArray = tw.text.match(/(\w+|[^\w\s])/g);
                            findAllIndexOfSubArray(project.paragraph[sNo].split(/\t/g).at(-1).match(/(\w+|[^\w\s])/g), subArray).forEach(index => {
                                for (let i = 0; i < subArray.length; i++) sl[sNo][index + i] = `${(index + i) === 0 ? 'B' : 'I'}-${project.namedEntities[tw.text.toLowerCase()].gender}`;
                            })
                        }
                    }
                })
            });

            if (downloadConfig.categories.GAF_RDF) subFolder.file(`GENDER-IDENTIFICATION-RDF-DATASET.txt`, new Blob([rdf_txt.join('\n')], {type: 'text/plain'}));
            if (downloadConfig.categories.GAF_CDF) subFolder.file(`GENDER-IDENTIFICATION-DATASET.txt`, new Blob([cdf_txt.join('\n')], {type: 'text/plain'}));
            if (downloadConfig.categories.GAF_SLF) subFolder.file(`GENDER-IDENTIFICATION-SEQUENCE-LABELING.txt`, new Blob([sl.map((l, i) => `${project.paragraph[i]}\t${l.join(' ')}`).join('\n')], {type: 'text/plain'}));
        }

        if (downloadConfig.categories.RAF) {
            const cdf_txt = [], rdf_txt = [];
            const subFolder = folder.folder('RELATION IDENTIFICATION');
            Object.keys(project.relations).forEach(entity => {
                const obj = JSON.parse(entity);
                if (downloadConfig.categories.NEA_CDF) cdf_txt.push(`${project.paragraph[project.relations[entity].sentence]}\t${obj.name1}\t${obj.name2}\t${project.relations[entity].phase}\t${project.relations[entity].relation}of`);
                if (downloadConfig.categories.NEA_RDF) rdf_txt.push(`${obj.name1}\tisThe\t${project.relations[entity].relation}of\t${obj.name2}\t${project.relations[entity].phase}`);
            })

            if (downloadConfig.categories.GAF_RDF) subFolder.file(`RELATION-IDENTIFICATION-RDF-DATASET.txt`, new Blob([rdf_txt.join('\n')], {type: 'text/plain'}));
            if (downloadConfig.categories.GAF_CDF) subFolder.file(`RELATION-IDENTIFICATION-DATASET.txt`, new Blob([cdf_txt.join('\n')], {type: 'text/plain'}));
        }


        zip.generateAsync({type: "blob"}).then(value => {
            const link = document.createElement("a");
            link.download = `${project.filename}_${dt}.zip`;
            link.href = URL.createObjectURL(value);
            link.click();
            link.remove();
        }).catch(error => {
            alert(error.message);
        });
    }

    return (
        <div id="downloadArea">
            <div className="boxedContainerTop">
                <p className="heading">Download Config</p>
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
                                           checked={downloadConfig.categories.NEA}
                                           onChange={(e) => {
                                               downloadConfig.categories.NEA = e.target.checked;
                                               downloadConfig.categories.NEA_CDF = e.target.checked;
                                               downloadConfig.categories.NEA_RDF = e.target.checked;
                                               downloadConfig.categories.NEA_SLF = e.target.checked;
                                               setDownloadConfig({...downloadConfig});
                                           }}/>
                                    <label htmlFor="NEA">Named Entity Annotations</label>
                                </div>
                                <div className="tagsContainerChild">
                                    <div className="tag">
                                        <input type="checkbox" name="NEA_CDF" id="NEA_CDF"
                                               checked={downloadConfig.categories.NEA_CDF}
                                               onChange={(e) => {
                                                   downloadConfig.categories.NEA_CDF = e.target.checked;
                                                   downloadConfig.categories.NEA = downloadConfig.categories.NEA_CDF || downloadConfig.categories.NEA_RDF || downloadConfig.categories.NEA_SLF;
                                                   setDownloadConfig({...downloadConfig});
                                               }}/>
                                        <label htmlFor="NEA_CDF">Identification Dataset</label>
                                    </div>
                                    <div className="tag">
                                        <input type="checkbox" name="NEA_RDF" id="NEA_RDF"
                                               checked={downloadConfig.categories.NEA_RDF}
                                               onChange={(e) => {
                                                   downloadConfig.categories.NEA_RDF = e.target.checked;
                                                   downloadConfig.categories.NEA = downloadConfig.categories.NEA_CDF || downloadConfig.categories.NEA_RDF || downloadConfig.categories.NEA_SLF;
                                                   setDownloadConfig({...downloadConfig});
                                               }}/>
                                        <label htmlFor="NEA_RDF">RDF Dataset</label>
                                    </div>
                                    <div className="tag">
                                        <input type="checkbox" name="NEA_SLF" id="NEA_SLF"
                                               checked={downloadConfig.categories.NEA_SLF}
                                               onChange={(e) => {
                                                   downloadConfig.categories.NEA_SLF = e.target.checked;
                                                   downloadConfig.categories.NEA = downloadConfig.categories.NEA_CDF || downloadConfig.categories.NEA_RDF || downloadConfig.categories.NEA_SLF;
                                                   setDownloadConfig({...downloadConfig});
                                               }}/>
                                        <label htmlFor="NEA_SLF">Sequence Labeling</label>
                                    </div>
                                </div>
                            </div>
                            <div className="tagContainer">
                                <div className="tag">
                                    <input type="checkbox" name="GAF" id="GAF"
                                           checked={downloadConfig.categories.GAF}
                                           onChange={(e) => {
                                               downloadConfig.categories.GAF = e.target.checked;
                                               downloadConfig.categories.GAF_CDF = e.target.checked;
                                               downloadConfig.categories.GAF_RDF = e.target.checked;
                                               downloadConfig.categories.GAF_SLF = e.target.checked;
                                               setDownloadConfig({...downloadConfig});
                                           }}/>
                                    <label htmlFor="GAF">Gender Annotations</label>
                                </div>
                                <div className="tagsContainerChild">
                                    <div className="tag">
                                        <input type="checkbox" name="GAF_CDF" id="GAF_CDF"
                                               checked={downloadConfig.categories.GAF_CDF}
                                               onChange={(e) => {
                                                   downloadConfig.categories.GAF_CDF = e.target.checked;
                                                   downloadConfig.categories.GAF = downloadConfig.categories.GAF_CDF || downloadConfig.categories.GAF_RDF || downloadConfig.categories.GAF_SLF;
                                                   setDownloadConfig({...downloadConfig});
                                               }}/>
                                        <label htmlFor="GAF_CDF">Identification Dataset</label>
                                    </div>
                                    <div className="tag">
                                        <input type="checkbox" name="GAF_RDF" id="GAF_RDF"
                                               checked={downloadConfig.categories.GAF_RDF}
                                               onChange={(e) => {
                                                   downloadConfig.categories.GAF_RDF = e.target.checked;
                                                   downloadConfig.categories.GAF = downloadConfig.categories.GAF_CDF || downloadConfig.categories.GAF_RDF || downloadConfig.categories.GAF_SLF;
                                                   setDownloadConfig({...downloadConfig});
                                               }}/>
                                        <label htmlFor="GAF_RDF">RDF Dataset</label>
                                    </div>
                                    <div className="tag">
                                        <input type="checkbox" name="GAF_SLF" id="GAF_SLF"
                                               checked={downloadConfig.categories.GAF_SLF}
                                               onChange={(e) => {
                                                   downloadConfig.categories.GAF_SLF = e.target.checked;
                                                   downloadConfig.categories.GAF = downloadConfig.categories.GAF_CDF || downloadConfig.categories.GAF_RDF || downloadConfig.categories.GAF_SLF;
                                                   setDownloadConfig({...downloadConfig});
                                               }}/>
                                        <label htmlFor="GAF_SLF">Sequence Labeling</label>
                                    </div>
                                </div>
                            </div>
                            <div className="tagContainer">
                                <div className="tag">
                                    <input type="checkbox" name="RAF" id="RAF"
                                           checked={downloadConfig.categories.RAF}
                                           onChange={(e) => {
                                               downloadConfig.categories.RAF = e.target.checked;
                                               downloadConfig.categories.RAF_CDF = e.target.checked;
                                               downloadConfig.categories.RAF_RDF = e.target.checked;
                                               setDownloadConfig({...downloadConfig});
                                           }}/>
                                    <label htmlFor="RAF">Relation Annotations</label>
                                </div>
                                <div className="tagsContainerChild">
                                    <div className="tag">
                                        <input type="checkbox" name="RAF_CDF" id="RAF_CDF"
                                               checked={downloadConfig.categories.RAF_CDF}
                                               onChange={(e) => {
                                                   downloadConfig.categories.RAF_CDF = e.target.checked;
                                                   downloadConfig.categories.RAF = downloadConfig.categories.RAF_CDF || downloadConfig.categories.RAF_RDF;
                                                   setDownloadConfig({...downloadConfig});
                                               }}/>
                                        <label htmlFor="RAF_CDF">Identification Dataset</label>
                                    </div>
                                    <div className="tag">
                                        <input type="checkbox" name="RAF_RDF" id="RAF_RDF"
                                               checked={downloadConfig.categories.RAF_RDF}
                                               onChange={(e) => {
                                                   downloadConfig.categories.RAF_RDF = e.target.checked;
                                                   downloadConfig.categories.RAF = downloadConfig.categories.RAF_CDF || downloadConfig.categories.RAF_RDF;
                                                   setDownloadConfig({...downloadConfig});
                                               }}/>
                                        <label htmlFor="RAF_RDF">RDF Dataset</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div id="" className="boxedContainer">
                        <div className="boxedContainerTop">
                            <p className="heading">Select Identifiers</p>
                        </div>
                        <div className="boxedContainerMain">
                            {Object.keys(project.namedEntityTags).map((tag, i) => <Identifiers key={i} tagName={tag}
                                                                                    tagDetails={project.namedEntityTags[tag]}
                                                                                    downloadConfig={downloadConfig}
                                                                                    setDownloadConfig={setDownloadConfig}/>)}
                        </div>
                    </div>
                    {((downloadConfig.categories.NEA && downloadConfig.identifiers.length > 0) || (!downloadConfig.categories.NEA && (downloadConfig.categories.GAF || downloadConfig.categories.RAF))) ?
                        <button id="downloadFileBtn" onClick={downloadZIP}>Download Files</button> : ""}
                </div>
            </div>
        </div>
    )
}