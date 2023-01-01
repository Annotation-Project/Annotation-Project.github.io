import React from 'react';
import { AnnotatedTextArea } from './AnnotatedTextArea';
import { RawTextArea } from './RawTextArea';
import { AllTags } from './AllTags';
import { AssignedTags } from './AssignedTags';
import { AssignTag } from './AssignTag';
import DefaultTags from '../constants/DefaultTags';
import Moment from 'moment';

export const Main = React.forwardRef(({ sidebarOpen }, ref) => {
    const [rawParagraph, setRawParagraph] = React.useState((localStorage.getItem('rawParagraph') === null) ? [] : JSON.parse(localStorage.getItem('rawParagraph')));
    const [allTags, setAllTags] = React.useState((localStorage.getItem('allTags') === null) ? new Map(DefaultTags) : new Map(JSON.parse(localStorage.getItem('allTags'))));
    const [selectedTags, setSelectedTags] = React.useState((localStorage.getItem('selectedTags') === null) ? new Map() : new Map(JSON.parse(localStorage.getItem('selectedTags'))));
    const [taggedWords, setTaggedWords] = React.useState((localStorage.getItem('taggedWords') === null) ? new Map() : new Map(JSON.parse(localStorage.getItem('taggedWords'))));
    const [fileName, setFileName] = React.useState(localStorage.getItem('fileName') || "");
    const [sentences, setSentences] = React.useState([]);
    const [selection, setSelection] = React.useState("");

    React.useEffect(() => {
        localStorage.setItem('rawParagraph', JSON.stringify(rawParagraph));
        setSentences(rawParagraph.map(rp => rp.split(/\t/g).at(-1)));
    }, [rawParagraph]);

    React.useEffect(() => {
        localStorage.setItem('allTags', JSON.stringify([...allTags]));
    }, [allTags]);

    React.useEffect(() => {
        localStorage.setItem('selectedTags', JSON.stringify([...selectedTags]));
    }, [selectedTags]);

    React.useEffect(() => {
        localStorage.setItem('taggedWords', JSON.stringify([...taggedWords]));
    }, [taggedWords]);

    React.useEffect(() => {
        localStorage.setItem('fileName', fileName.split('.')[0].trim());
    }, [fileName]);

    const handleSelection = () => {
        setSelection(window.getSelection().toString());
    }

    React.useImperativeHandle(ref, () => ({
        reset() {
            setRawParagraph([]);
            setAllTags(new Map(DefaultTags));
            setSelectedTags(new Map());
            setTaggedWords(new Map());
            setSentences([]);
            setSelection("");
            window.location.reload(true);
        },

        downloadJSON() {
            const output = [];
            [...taggedWords.keys()].forEach(tw => {
                const obj = { text: tw, tags: taggedWords.get(tw), appearances: [] };
                sentences.forEach((s, i) => {
                    const matched = [...s.matchAll(new RegExp(`\\b${tw}\\b`, 'gi'))];
                    if (matched.length > 0) {
                        const rp = rawParagraph[i].split(/\t/g);
                        obj.appearances.push({ details: rp.slice(0, rp.length - 1), sentence: i + 1, indices: matched.map(m => m.index) });
                    }
                })
                output.push(obj);
            });
            const link = document.createElement("a");
            link.download = `${fileName}_${Moment().format('YYYY-MM-DD_HH-mm-ss')}`;
            link.href = URL.createObjectURL(new Blob([JSON.stringify(output)], { type: 'application/json' }));
            link.click();
            link.remove();
        },

        downloadTXT() {
            console.log("ok");
            const output = [];
            [...taggedWords.keys()].forEach(tw => {
                sentences.forEach((s, i) => {
                    const matched = [...s.matchAll(new RegExp(`\\b${tw}\\b`, 'gi'))];
                    if (matched.length > 0) {
                        const rp = rawParagraph[i].split(/\t/g);
                        taggedWords.get(tw).forEach((tag) => {
                            matched.map(m => m.index).forEach((index) => {
                                output.push(`${tw}\tisA\t${tag}\t${i + 1}\t${index}\t${index + tw.length}\t${rp.slice(0, rp.length - 1).reverse().join('\t')}`);
                            })
                        })
                    }
                })
            });
            console.log(output.join('\n'));
            const link = document.createElement("a");
            link.download = `${fileName}_${Moment().format('YYYY-MM-DD_HH-mm-ss')}`;
            link.href = URL.createObjectURL(new Blob([output.join('\n')], { type: 'text/plain' }));
            link.click();
            link.remove();
        }
    }))


    return (
        <div className="main">
            <div className="left">
                <RawTextArea rawParagraph={rawParagraph} setRawParagraph={setRawParagraph} setFileName={setFileName} />
                <AssignTag selection={selection} setSelection={setSelection} selectedTags={selectedTags} setSelectedTags={setSelectedTags} taggedWords={taggedWords} setTaggedWords={setTaggedWords} allTags={allTags} />
                <AnnotatedTextArea sentences={sentences} handleSelection={handleSelection} taggedWords={taggedWords} allTags={allTags} />
            </div>
            <div className={(sidebarOpen) ? "right" : "right colapse"}>
                <AssignedTags taggedWords={taggedWords} setTaggedWords={setTaggedWords} selectedTags={selectedTags} setSelectedTags={setSelectedTags} allTags={allTags} />
                <AllTags allTags={allTags} setAllTags={setAllTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
            </div>
        </div>
    )
})