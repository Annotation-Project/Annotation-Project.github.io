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
            NEA: {
                text: "Named Entity Annotations (Need Identifier)",
                value: true,
                children: {
                    CDF: {text: "Identification Dataset", value: true},
                    RDF: {text: "RDF Dataset", value: true},
                    SLF: {text: "Sequence Labeling", value: true}
                }
            },
            GAF: {
                text: "Gender Entity Annotations",
                value: true,
                children: {
                    CDF: {text: "Identification Dataset", value: true},
                    RDF: {text: "RDF Dataset", value: true},
                    SLF: {text: "Sequence Labeling", value: true}
                }
            },
            RAF: {
                text: "Relation Entity Annotations",
                value: true,
                children: {
                    CDF: {text: "Identification Dataset", value: true},
                    RDF: {text: "RDF Dataset", value: true},
                }
            },
            NEO4J: {
                text: "Neo4j Input File",
                value: true,
                children: {
                    CDF: {text: "Identification Dataset", value: true},
                    RDF: {text: "RDF Dataset", value: true},
                }
            }
        },
        identifiers: []
    });

    const downloadZIP = () => {
        const zip = new JSZip();
        const folder = zip.folder(project.fileName);
        const dt = Moment().format('YYYY-MM-DD_HH-mm-ss');

        if (downloadConfig.categories.NEA.value) {
            downloadConfig.identifiers.forEach(identifier => {
                const rdf_txt = [], cdf_txt = [];
                const sl = project.paragraph.map(s => s.match(/(\w+|[^\w\s])/g).fill('O'));
                const subFolder = folder.folder(identifier + '-IDENTIFICATION');
                project.namedEntityAppearances.forEach((tws, sNo) => {
                    tws.forEach((tw) => {
                        if (project.namedEntities[tw.text.toLowerCase()].tags && project.namedEntities[tw.text.toLowerCase()].tags.includes(identifier)) {
                            if (downloadConfig.categories.NEA.children.RDF.value) {
                                // RDF Dataset
                                tw.indices.forEach(index => {
                                    rdf_txt.push(`${tw.text}\tisA\t${identifier}\t${sNo + 1}\t${index}\t${index + tw.text.length}\t${project.paragraph[sNo].split(/\t/g).slice(0, -1).reverse().join('\t')}`);
                                })
                            }
                            if (downloadConfig.categories.NEA.children.CDF.value) {
                                // Identification Dataset
                                cdf_txt.push(`${project.paragraph[sNo]}\t${tw.text}\t${identifier}`);
                            }
                            if (downloadConfig.categories.NEA.children.SLF.value) {
                                // Sequence Labeling
                                const subArray = tw.text.match(/(\w+|[^\w\s])/g);
                                findAllIndexOfSubArray(project.paragraph[sNo].split(/\t/g).at(-1).match(/(\w+|[^\w\s])/g), subArray).forEach(index => {
                                    for (let i = 0; i < subArray.length; i++) sl[sNo][index + i] = `${(index + i) === 0 ? 'B' : 'I'}-${identifier}`;
                                })
                            }
                        }
                    })
                });

                if (downloadConfig.categories.NEA.children.RDF.value) subFolder.file(`${identifier}-IDENTIFICATION-RDF-DATASET.txt`, new Blob([rdf_txt.join('\n')], {type: 'text/plain'}));
                if (downloadConfig.categories.NEA.children.CDF.value) subFolder.file(`${identifier}-IDENTIFICATION-DATASET.txt`, new Blob([cdf_txt.join('\n')], {type: 'text/plain'}));
                if (downloadConfig.categories.NEA.children.SLF.value) subFolder.file(`${identifier}-IDENTIFICATION-SEQUENCE-LABELING.txt`, new Blob([sl.map((l, i) => `${project.paragraph[i]}\t${l.join(' ')}`).join('\n')], {type: 'text/plain'}));
            });
        }

        if (downloadConfig.categories.GAF) {
            const rdf_txt = [], cdf_txt = [];
            const sl = project.paragraph.map(s => s.match(/(\w+|[^\w\s])/g).fill('O'));
            const subFolder = folder.folder('GENDER IDENTIFICATION');

            project.namedEntityAppearances.forEach((tws, sNo) => {
                tws.forEach((tw) => {
                    if (project.namedEntities[tw.text.toLowerCase()].gender) {
                        if (downloadConfig.categories.GAF.children.RDF.value) {
                            // RDF Dataset
                            tw.indices.forEach(index => {
                                rdf_txt.push(`${tw.text}\tisA\t${project.namedEntities[tw.text.toLowerCase()].gender}\t${sNo + 1}\t${index}\t${index + tw.text.length}\t${project.paragraph[sNo].split(/\t/g).slice(0, -1).reverse().join('\t')}`);
                            })
                        }
                        if (downloadConfig.categories.GAF.children.CDF.value) {
                            // Identification Dataset
                            cdf_txt.push(`${project.paragraph[sNo]}\t${tw.text}\t${project.namedEntities[tw.text.toLowerCase()].gender}`);
                        }
                        if (downloadConfig.categories.GAF.children.SLF.value) {
                            // Sequence Labeling
                            const subArray = tw.text.match(/(\w+|[^\w\s])/g);
                            findAllIndexOfSubArray(project.paragraph[sNo].split(/\t/g).at(-1).match(/(\w+|[^\w\s])/g), subArray).forEach(index => {
                                for (let i = 0; i < subArray.length; i++) sl[sNo][index + i] = `${(index + i) === 0 ? 'B' : 'I'}-${project.namedEntities[tw.text.toLowerCase()].gender}`;
                            })
                        }
                    }
                })
            });

            if (downloadConfig.categories.GAF.children.RDF.value) subFolder.file(`GENDER-IDENTIFICATION-RDF-DATASET.txt`, new Blob([rdf_txt.join('\n')], {type: 'text/plain'}));
            if (downloadConfig.categories.GAF.children.CDF.value) subFolder.file(`GENDER-IDENTIFICATION-DATASET.txt`, new Blob([cdf_txt.join('\n')], {type: 'text/plain'}));
            if (downloadConfig.categories.GAF.children.SLF.value) subFolder.file(`GENDER-IDENTIFICATION-SEQUENCE-LABELING.txt`, new Blob([sl.map((l, i) => `${project.paragraph[i]}\t${l.join(' ')}`).join('\n')], {type: 'text/plain'}));
        }

        if (downloadConfig.categories.RAF.value) {
            const cdf_txt = [], rdf_txt = [];
            const subFolder = folder.folder('RELATION IDENTIFICATION');
            Object.keys(project.relations).forEach(entity => {
                const obj = JSON.parse(entity);
                if (downloadConfig.categories.RAF.children.CDF.value) cdf_txt.push(`${project.paragraph[project.relations[entity].sentence]}\t${obj.name1}\t${obj.name2}\t${project.relations[entity].phase}\t${project.relations[entity].relation}of`);
                if (downloadConfig.categories.RAF.children.RDF.value) rdf_txt.push(`${obj.name1}\tisThe\t${project.relations[entity].relation}of\t${obj.name2}\t${project.relations[entity].phase}`);
            })

            if (downloadConfig.categories.RAF.children.RDF.value) subFolder.file(`RELATION-IDENTIFICATION-RDF-DATASET.txt`, new Blob([rdf_txt.join('\n')], {type: 'text/plain'}));
            if (downloadConfig.categories.RAF.children.CDF.value) subFolder.file(`RELATION-IDENTIFICATION-DATASET.txt`, new Blob([cdf_txt.join('\n')], {type: 'text/plain'}));
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
                            {Object.keys(downloadConfig.categories).map((category, i) =>
                                <div key={i} className="tagContainer">
                                    <div className="tag">
                                        <input type="checkbox" name={category} id={category}
                                               checked={downloadConfig.categories[category].value}
                                               onChange={(e) => {
                                                   downloadConfig.categories[category].value = e.target.checked;
                                                   Object.keys(downloadConfig.categories[category].children).forEach(subCategory => {
                                                       downloadConfig.categories[category].children[subCategory].value = e.target.checked;
                                                   })
                                                   setDownloadConfig({...downloadConfig});
                                               }}/>
                                        <label htmlFor={category}>{downloadConfig.categories[category].text}</label>
                                    </div>
                                    <div className="tagsContainerChild">
                                        {Object.keys(downloadConfig.categories[category].children).map((subCategory, i) =>
                                            <div key={i} className="tag">
                                                <input type="checkbox" name={category + '_' + subCategory}
                                                       id={category + '_' + subCategory}
                                                       checked={downloadConfig.categories[category].children[subCategory].value}
                                                       onChange={(e) => {
                                                           downloadConfig.categories[category].children[subCategory].value = e.target.checked;
                                                           downloadConfig.categories[category].value = Object.values(downloadConfig.categories[category].children).some(subCategory => subCategory.value);
                                                           setDownloadConfig({...downloadConfig});
                                                       }}/>
                                                <label htmlFor={category + '_' + subCategory}>{downloadConfig.categories[category].children[subCategory].text}</label>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
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
                                                                                               disabled={!downloadConfig.categories.NEA.value}
                                                                                               downloadConfig={downloadConfig}
                                                                                               setDownloadConfig={setDownloadConfig}/>)}
                        </div>
                    </div>
                    {((downloadConfig.categories.NEA.value && downloadConfig.identifiers.length > 0) || (!downloadConfig.categories.NEA.value && (downloadConfig.categories.GAF.value || downloadConfig.categories.RAF.value || downloadConfig.categories.NEO4J.value))) ?
                        <button id="downloadFileBtn" onClick={downloadZIP}>Download Files</button> : ""}
                </div>
            </div>
        </div>
    )
}