import React from "react";
import { Identifiers } from "./Indetifiers";
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

export const Download = ({ project }) => {
    const [downloadConfig, setDownloadConfig] = React.useState({
        categories: {
            NAF: {
                text: "Named Entity Annotations (Need Identifiers)",
                value: true,
                identifiers: []
            },
            GAF: {
                text: "Gender Entity Annotations",
                value: true
            },
            RAF: {
                text: "Relation Entity Annotations",
                value: true
            },
            EAF: {
                text: "Event Entity Annotations (Need Identifiers)",
                value: true,
                identifiers: []
            },
            NEO4J: {
                text: "Neo4j Input File",
                value: true
            }
        }
    });

    const downloadZIP = () => {
        const zip = new JSZip();
        const folder = zip.folder(project.projectName);
        const dt = Moment().format('YYYY-MM-DD_HH-mm-ss');

        if (downloadConfig.categories.NAF.value) {
            const neaFolder = folder.folder("NAMED ENTITY ANNOTATIONS");
            downloadConfig.categories.NAF.identifiers.forEach(identifier => {
                const rdf_txt = [], cdf_txt = [];
                const sl = project.paragraph.map(s => s.match(/(\w+|[^\w\s])/g).fill('O'));
                const subFolder = neaFolder.folder(identifier + '-IDENTIFICATION');
                project.namedEntityAppearances.forEach((tws, sNo) => {
                    tws.forEach((tw) => {
                        if (project.namedEntities[tw.text.toLowerCase()].tags && project.namedEntities[tw.text.toLowerCase()].tags.includes(identifier)) {
                            // RDF Dataset
                            tw.indices.forEach(index => {
                                rdf_txt.push(`${tw.text}\tisA\t${identifier}\t${sNo + 1}\t${index}\t${index + tw.text.length}\t${project.paragraph[sNo].split(/\t/g).slice(0, -1).reverse().join('\t')}`);
                            })
                            // Identification Dataset
                            cdf_txt.push(`${project.paragraph[sNo]}\t${tw.text}\t${identifier}`);
                            // Sequence Labeling
                            const subArray = tw.text.match(/(\w+|[^\w\s])/g);
                            findAllIndexOfSubArray(project.paragraph[sNo].split(/\t/g).at(-1).match(/(\w+|[^\w\s])/g), subArray).forEach(index => {
                                for (let i = 0; i < subArray.length; i++) sl[sNo][index + i] = `${(index + i) === 0 ? 'B' : 'I'}-${identifier}`;
                            })
                        }
                    })
                });

                subFolder.file(`${identifier}-IDENTIFICATION-RDF-DATASET.txt`, new Blob([rdf_txt.join('\n')], { type: 'text/plain' }));
                subFolder.file(`${identifier}-IDENTIFICATION-DATASET.txt`, new Blob([cdf_txt.join('\n')], { type: 'text/plain' }));
                subFolder.file(`${identifier}-IDENTIFICATION-SEQUENCE-LABELING.txt`, new Blob([sl.map((l, i) => `${project.paragraph[i]}\t${l.join(' ')}`).join('\n')], { type: 'text/plain' }));
            });
        }

        if (downloadConfig.categories.GAF.value) {
            const rdf_txt = [], cdf_txt = [];
            const sl = project.paragraph.map(s => s.match(/(\w+|[^\w\s])/g).fill('O'));
            const subFolder = folder.folder('GENDER ANNOTATIONS');

            project.namedEntityAppearances.forEach((tws, sNo) => {
                tws.forEach((tw) => {
                    if (project.namedEntities[tw.text.toLowerCase()].gender) {
                        // RDF Dataset
                        tw.indices.forEach(index => {
                            rdf_txt.push(`${tw.text}\tisA\t${project.namedEntities[tw.text.toLowerCase()].gender}\t${sNo + 1}\t${index}\t${index + tw.text.length}\t${project.paragraph[sNo].split(/\t/g).slice(0, -1).reverse().join('\t')}`);
                        })
                        // Identification Dataset
                        cdf_txt.push(`${project.paragraph[sNo]}\t${tw.text}\t${project.namedEntities[tw.text.toLowerCase()].gender}`);
                        // Sequence Labeling
                        const subArray = tw.text.match(/(\w+|[^\w\s])/g);
                        findAllIndexOfSubArray(project.paragraph[sNo].split(/\t/g).at(-1).match(/(\w+|[^\w\s])/g), subArray).forEach(index => {
                            for (let i = 0; i < subArray.length; i++) sl[sNo][index + i] = `${(index + i) === 0 ? 'B' : 'I'}-${project.namedEntities[tw.text.toLowerCase()].gender}`;
                        })
                    }
                })
            });

            subFolder.file(`GENDER-IDENTIFICATION-RDF-DATASET.txt`, new Blob([rdf_txt.join('\n')], { type: 'text/plain' }));
            subFolder.file(`GENDER-IDENTIFICATION-DATASET.txt`, new Blob([cdf_txt.join('\n')], { type: 'text/plain' }));
            subFolder.file(`GENDER-IDENTIFICATION-SEQUENCE-LABELING.txt`, new Blob([sl.map((l, i) => `${project.paragraph[i]}\t${l.join(' ')}`).join('\n')], { type: 'text/plain' }));
        }

        if (downloadConfig.categories.RAF.value) {
            const cdf_txt = [], rdf_txt = [];
            const subFolder = folder.folder('RELATION IDENTIFICATION');
            Object.keys(project.relations).forEach(entity => {
                const obj = JSON.parse(entity);
                cdf_txt.push(`${project.paragraph[project.relations[entity].sentence]}\t${obj.name1}\t${obj.name2}\t${project.relations[entity].phase}\t${project.relations[entity].relation}_OF`);
                rdf_txt.push(`${obj.name1}\tisThe\t${project.relations[entity].relation}_OF\t${obj.name2}\t${project.relations[entity].phase}`);
            })

            subFolder.file(`RELATION-IDENTIFICATION-RDF-DATASET.txt`, new Blob([rdf_txt.join('\n')], { type: 'text/plain' }));
            subFolder.file(`RELATION-IDENTIFICATION-DATASET.txt`, new Blob([cdf_txt.join('\n')], { type: 'text/plain' }));
        }

        if (downloadConfig.categories.EAF.value) {
            const eafFolder = folder.folder("EVENT ENTITY ANNOTATIONS");
            downloadConfig.categories.EAF.identifiers.forEach(identifier => {
                const rdf_txt = [], cdf_txt = [];
                const sl = project.paragraph.map(s => s.match(/(\w+|[^\w\s])/g).fill('O'));
                const subFolder = eafFolder.folder(identifier + '-IDENTIFICATION');
                project.eventEntityAppearances.forEach((tws, sNo) => {
                    tws.forEach((tw) => {
                        if (project.eventEntities[tw.text.toLowerCase()].tags && project.eventEntities[tw.text.toLowerCase()].tags.includes(identifier)) {
                            // RDF Dataset
                            tw.indices.forEach(index => {
                                rdf_txt.push(`${tw.text}\tisA\t${identifier}\t${sNo + 1}\t${index}\t${index + tw.text.length}\t${project.paragraph[sNo].split(/\t/g).slice(0, -1).reverse().join('\t')}`);
                            })
                            // Identification Dataset
                            cdf_txt.push(`${project.paragraph[sNo]}\t${tw.text}\t${identifier}`);
                            // Sequence Labeling
                            const subArray = tw.text.match(/(\w+|[^\w\s])/g);
                            findAllIndexOfSubArray(project.paragraph[sNo].split(/\t/g).at(-1).match(/(\w+|[^\w\s])/g), subArray).forEach(index => {
                                for (let i = 0; i < subArray.length; i++) sl[sNo][index + i] = `${(index + i) === 0 ? 'B' : 'I'}-${identifier}`;
                            })
                        }
                    })
                });

                subFolder.file(`${identifier}-IDENTIFICATION-RDF-DATASET.txt`, new Blob([rdf_txt.join('\n')], { type: 'text/plain' }));
                subFolder.file(`${identifier}-IDENTIFICATION-DATASET.txt`, new Blob([cdf_txt.join('\n')], { type: 'text/plain' }));
                subFolder.file(`${identifier}-IDENTIFICATION-SEQUENCE-LABELING.txt`, new Blob([sl.map((l, i) => `${project.paragraph[i]}\t${l.join(' ')}`).join('\n')], { type: 'text/plain' }));
            });
        }

        if (downloadConfig.categories.NEO4J.value) {
            const subFolder = folder.folder('NEO4J INPUT');
            const variabbles = new Set(), nodes = new Set(), edges = new Set();
            project.namedEntityAppearances.forEach((tws, sNo) => {
                let prevVar = null;
                project.paragraph[sNo].split(/\t/g).slice(0, -1).forEach(tag => {
                    const variable = `var_${tag.replace(/[\s\W]/g, '_').toLowerCase()}`;
                    variabbles.add(variable);
                    nodes.add(`(${variable} {name: "${tag}"})`)
                    if(prevVar !== null) edges.add(`(${prevVar})-[:CHILD]->(${variable})`);
                    prevVar = variable;
                });
                tws.forEach(tw => {
                    const variable = `var_${tw.text.replace(/[\s\W]/g, '_').toLowerCase()}`;
                    variabbles.add(variable);
                    nodes.add(`(${variable}${project.namedEntities[tw.text.toLowerCase()].tags.map(tag => `:${tag}`).join('')} {name: "${tw.text}"})`)
                    if(prevVar !== null) edges.add(`(${prevVar})-[:ENTITY]->(${variable})`);
                });
            });
            for(const[key, value] of Object.entries(project.relations)) {
                const reObj = JSON.parse(key);
                const name1 = `var_${reObj.name1.replace(/[\s\W]/g, '_').toLowerCase()}`, name2 = `var_${reObj.name2.replace(/[\s\W]/g, '_').toLowerCase()}`
                edges.add(`(${name1})-[:${value.relation}_OF {phase: "${value.phase}", sentence: ${value.sentence}}]->(${name2})`);
            }
            subFolder.file(`NEO4J_INPUT.txt`, new Blob([`CREATE\n${[...nodes, ...edges].join(',\n')}\nRETURN ${[...variabbles].join(', ')}`], { type: 'text/plain' }));
        }

        zip.generateAsync({ type: "blob" }).then(value => {
            const link = document.createElement("a");
            link.download = `${project.projectName}_${dt}.zip`;
            link.href = URL.createObjectURL(value);
            link.click();
            link.remove();
        }).catch(error => {
            alert(error.message);
        });
    }

    const handleNameIdentifierSelectionChange = (checked, identifier) => {
        if(checked) downloadConfig.categories.NAF.identifiers.push(identifier);
        else downloadConfig.categories.NAF.identifiers = downloadConfig.categories.NAF.identifiers.filter(e => e !== identifier);
        setDownloadConfig({...downloadConfig})
    }

    const handleEventIdentifierSelectionChange = (checked, identifier) => {
        if(checked) downloadConfig.categories.EAF.identifiers.push(identifier);
        else downloadConfig.categories.EAF.identifiers = downloadConfig.categories.EAF.identifiers.filter(e => e !== identifier);
        setDownloadConfig({...downloadConfig})
    }

    return (
        <div id="downloadArea">
            <div className="boxedContainerTop">
                <p className="heading">Download Config</p>
            </div>
            <div className="downloadMain">
                <div className="config">
                    <div className="boxedContainer">
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
                                                setDownloadConfig({ ...downloadConfig });
                                            }} />
                                        <label htmlFor={category}>{downloadConfig.categories[category].text}</label>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {((downloadConfig.categories.NAF.value && downloadConfig.categories.NAF.identifiers.length > 0)
                        || (downloadConfig.categories.EAF.value && downloadConfig.categories.EAF.identifiers.length > 0)
                        || (!downloadConfig.categories.NAF.value && !downloadConfig.categories.EAF.value && (downloadConfig.categories.GAF.value || downloadConfig.categories.RAF.value || downloadConfig.categories.EAF.value || downloadConfig.categories.NEO4J.value))) ?
                        <button id="downloadFileBtn" onClick={downloadZIP}>Download Files</button> : ""}
                </div>
                {downloadConfig.categories.NAF.value ?
                    <div className="identifiers">
                        <div id="" className="boxedContainer">
                            <div className="boxedContainerTop">
                                <p className="heading">Named Entity Identifiers</p>
                            </div>
                            <div className="boxedContainerMain">
                                {Object.keys(project.namedEntityTags).map((tag, i) => <Identifiers key={i} tagName={tag}
                                    tagDetails={project.namedEntityTags[tag]}
                                    identifiers={downloadConfig.categories.NAF.identifiers}
                                    onSelectionChange={handleNameIdentifierSelectionChange} />)}
                            </div>
                        </div>
                    </div> : ""}
                {downloadConfig.categories.EAF.value ?
                    <div className="identifiers">
                        <div id="" className="boxedContainer">
                            <div className="boxedContainerTop">
                                <p className="heading">Event Entity Identifiers</p>
                            </div>
                            <div className="boxedContainerMain">
                                {Object.keys(project.eventEntityTags).map((tag, i) => <Identifiers key={i} tagName={tag}
                                    tagDetails={project.eventEntityTags[tag]}
                                    identifiers={downloadConfig.categories.EAF.identifiers}
                                    onSelectionChange={handleEventIdentifierSelectionChange} />)}
                            </div>
                        </div>
                    </div> : ""}
            </div>
        </div>
    )
}