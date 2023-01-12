import React from 'react';
import './App.css';
import {Header} from './components/Header';
import {Main} from './components/Main';
import DefaultTags from './constants/DefaultTags';
import Moment from 'moment';
import JSZip from 'jszip';
import Languages from "./constants/Languages";
import {Download} from "./components/Download";

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

export const App = () => {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [rawParagraph, setRawParagraph] = React.useState(localStorage.getItem('rawParagraph') ? JSON.parse(localStorage.getItem('rawParagraph')) : []);
    const [allTags, setAllTags] = React.useState(localStorage.getItem('allTags') ? JSON.parse(localStorage.getItem('allTags')) : [...DefaultTags]);
    const [taggedWords, setTaggedWords] = React.useState(localStorage.getItem('taggedWords') ? new Map(JSON.parse(localStorage.getItem('taggedWords'))) : new Map());
    const [relationEntities, setRelationEntities] = React.useState(localStorage.getItem('relationEntities') ? JSON.parse(localStorage.getItem('relationEntities')) : []);
    const [fileName, setFileName] = React.useState(localStorage.getItem('fileName') || "");
    const [sentences, setSentences] = React.useState([]);

    // const [allLanguages, setAllLanguages] = React.useState(Object.keys(Languages));
    // const [selectedLanguage, setSelectedLanguage] = React.useState(localStorage.getItem('language') || allLanguages[0]);
    const [openDownloadDialog, setOpenDownloadDialog] = React.useState(true);
    const [downloadConfig, setDownloadConfig] = React.useState({
        categories: ['NEA', 'NEA_CDF', 'NEA_RDF', 'GAF', 'GAF_CDF', 'GAF_RDF', 'SLF'],
        fileTypes: ['text', 'xml', 'json'],
        identifiers: []
    });

    React.useEffect(() => {
        localStorage.setItem('rawParagraph', JSON.stringify(rawParagraph));
        setSentences(rawParagraph.map(rp => rp.split(/\t/g).at(-1)));
    }, [rawParagraph]);
    React.useEffect(() => {
        localStorage.setItem('allTags', JSON.stringify(allTags));
    }, [allTags]);
    React.useEffect(() => {
        localStorage.setItem('taggedWords', JSON.stringify([...taggedWords]));
    }, [taggedWords]);
    React.useEffect(() => {
        localStorage.setItem('relationEntities', JSON.stringify(relationEntities));
    }, [relationEntities]);
    React.useEffect(() => {
        localStorage.setItem('fileName', fileName.split('.')[0].trim());
    }, [fileName]);

    const reset = () => {
        setRawParagraph([]);
        setAllTags([...DefaultTags]);
        setTaggedWords(new Map());
        setSentences([]);
        window.location.reload();
    }

    const downloadZIP = () => {
        const zip = new JSZip();
        const folder = zip.folder(fileName);
        const HtmlMiddleTagReg = '(<[^/]*>|</[^>]*>|[\\W\\s]*)*';
        const time = Date.now();
        const dt = Moment().format('YYYY-MM-DD_HH-mm-ss');

        const XML_G = ['<?xml version="1.0" encoding="UTF-8"?>', ...rawParagraph.map((s, i) => {
            const tmp = s.split('\t');
            let sent = `<dataitem><pubdate>${time}</pubdate><sent-idx>${i + 1}</sent-idx><sentence>${tmp.at(-1)}</sentence></dataitem>`;
            tmp.slice(0, -1).forEach(detail => {
                sent = sent.replace(new RegExp(`(<sentence>.*</sentence>)`, 'g'), `<${detail}>$1</${detail}>`);
            });
            return sent;
        })];
        const SL_G = sentences.map(s => s.match(/(\w+|[^\w\s])/g).fill('O'));
        const RDF_TXT = [];
        const CDF_TXT = [];

        downloadConfig.identifiers.forEach(identifier => {
            const subFolder = folder.folder(identifier + '-IDENTIFICATION');
            const tmpXML = [...XML_G], tmpCDF_TXT = [], tmpRDF_TXT = [], tmpSL = [...SL_G];
            [...taggedWords.keys()].forEach(tw => {
                const value = taggedWords.get(tw);
                if (value.tags.some(e => e.name === identifier)) {
                    value.appearances.forEach(appearance => {
                        if (downloadConfig.categories.includes('NEA')) {
                            if (downloadConfig.categories.includes('NEA_RDF')) {
                                // RDF DATASET XML
                                // tmpXML[appearance.sentence] = tmpXML[appearance.sentence].replace(
                                //     new RegExp(`(${/\w/.test(tw.at(0)) ? '\\b' : '\\B'}${tw.replace(/\s/gi, HtmlMiddleTagReg)}${/\w/.test(tw.at(-1)) ? '\\b' : '\\B'})`, 'gi'),
                                //     `<${identifier}>$1</${identifier}>`);

                                // RDF DATASET TXT
                                appearance.indices.forEach(index => {
                                    tmpRDF_TXT.push(`${tw}\tisA\t${identifier}\t${appearance.sentence}\t${index}\t${index + tw.length}\t${[...appearance.details].reverse().join('\t')}`);
                                })
                            }
                            if (downloadConfig.categories.includes('NEA_CDF')) {
                                // IDENTIFICATION-DATASET TXT
                                tmpCDF_TXT.push(`${rawParagraph[appearance.sentence - 1]}\t${sentences[appearance.sentence - 1].match(new RegExp(`(${/\w/.test(tw.at(0)) ? '\\b' : '\\B'}${tw.replace(/\s/gi, HtmlMiddleTagReg)}${/\w/.test(tw.at(-1)) ? '\\b' : '\\B'})`, 'gi'))[0]}\t${identifier}`);
                            }
                        }
                        if (downloadConfig.categories.includes('SLF')) {
                            // SEQUENCE LABELING TXT
                            const tmpTW = tw.match(/(\w+|[^\w\s])/g);
                            findAllIndexOfSubArray(sentences[appearance.sentence - 1].match(/(\w+|[^\w\s])/g), tmpTW).forEach(index => {
                                for (let i = 0; i < tmpTW.length; i++) tmpSL[appearance.sentence - 1][index + i] = `${(index + 1) === 0 ? 'B' : 'I'}-${identifier}`;
                            })
                        }
                    });
                }
            });

            if (downloadConfig.categories.includes('NEA')) {
                if (downloadConfig.categories.includes('NEA_RDF')) {
                    subFolder.file(`${identifier}-IDENTIFICATION-RDF-DATASET.txt`, new Blob([tmpRDF_TXT.join('\n')], {type: 'text/plain'}));
                }
                if (downloadConfig.categories.includes('NEA_CDF')) {
                    subFolder.file(`${identifier}-IDENTIFICATION-DATASET.txt`, new Blob([tmpCDF_TXT.join('\n')], {type: 'text/plain'}));
                }
            }
            if (downloadConfig.categories.includes('SLF')) {
                subFolder.file(`${identifier}-IDENTIFICATION-SEQUENCE-LABELING.txt`, new Blob([tmpSL.map((l, i) => `${rawParagraph[i]}\t${l.join(' ')}`).join('\n')], {type: 'text/plain'}));
            }

            // subFolder.file(`${identifier}-IDENTIFICATION-RDF-DATASET.xml`, new Blob([tmpXML.join('\n')], {type: 'application/xml'}));
        });

        if (downloadConfig.categories.includes('GAF')) {
            const tmpCDF_TXT = [], tmpRDF_TXT = [];
            const subFolder = folder.folder('GENDER IDENTIFICATION');
            [...taggedWords.keys()].forEach(tw => {
                const value = taggedWords.get(tw);
                if (value.gender) {
                    value.appearances.forEach(appearance => {
                        if (downloadConfig.categories.includes('GAF_RDF')) {
                            appearance.indices.forEach(index => {
                                tmpRDF_TXT.push(`${tw}\tisA\t${value.gender}\t${appearance.sentence}\t${index}\t${index + tw.length}\t${[...appearance.details].reverse().join('\t')}`);
                            })
                        }
                        if (downloadConfig.categories.includes('GAF_CDF')) {
                            tmpCDF_TXT.push(`${rawParagraph[appearance.sentence - 1]}\t${sentences[appearance.sentence - 1].match(new RegExp(`(${/\w/.test(tw.at(0)) ? '\\b' : '\\B'}${tw.replace(/\s/gi, HtmlMiddleTagReg)}${/\w/.test(tw.at(-1)) ? '\\b' : '\\B'})`, 'gi'))[0]}\t${value.gender}`);
                        }
                    });
                }
            })
            if (downloadConfig.categories.includes('GAF_RDF')) {
                subFolder.file(`GENDER-IDENTIFICATION-RDF-DATASET.txt`, new Blob([tmpRDF_TXT.join('\n')], {type: 'text/plain'}));
            }
            if (downloadConfig.categories.includes('GAF_CDF')) {
                subFolder.file(`GENDER-IDENTIFICATION-DATASET.txt`, new Blob([tmpCDF_TXT.join('\n')], {type: 'text/plain'}));
            }
        }

        zip.generateAsync({type: "blob"}).then(value => {
            const link = document.createElement("a");
            link.download = `${fileName}_${dt}.zip`;
            link.href = URL.createObjectURL(value);
            link.click();
            link.remove();
        }).catch(error => {
            alert(error.message);
        });
    }

    return (
        <div className="screen">
            <Header
                rawParagraph={rawParagraph}
                reset={reset}
                openDownloadDialog={() => setOpenDownloadDialog(true)}
                sidebar={sidebarOpen}
                toggleSidebar={setSidebarOpen}/>

            {openDownloadDialog ?
                <>
                    <span className="dialogBackground"></span>
                    <Download downloadZIP={downloadZIP} closeDialog={() => setOpenDownloadDialog(false)}
                              allTags={allTags}
                              downloadConfig={downloadConfig}
                              setDownloadConfig={setDownloadConfig}/>
                </>
                : ""}

            <Main
                rawParagraph={rawParagraph}
                setRawParagraph={setRawParagraph}
                setFileName={setFileName}
                taggedWords={taggedWords}
                setTaggedWords={setTaggedWords}
                allTags={allTags}
                sentences={sentences}
                sidebarOpen={sidebarOpen}
                setAllTags={setAllTags}
                relationEntities={relationEntities}
                setRelationEntities={setRelationEntities}/>
        </div>
    )
}

