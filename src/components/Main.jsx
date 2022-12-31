import React from 'react';
import { AnnotatedTextArea } from './AnnotatedTextArea';
import { RawTextArea } from './RawTextArea';
import { AllTags } from './AllTags';
import { AssignedTags } from './AssignedTags';
import { AssignTag } from './AssignTag';
import DefaultTags from '../constants/DefaultTags';

export const Main = React.forwardRef(({}, ref) => {
    const [rawParagraph, setRawParagraph] = React.useState((localStorage.getItem('rawParagraph') === null) ? [] : JSON.parse(localStorage.getItem('rawParagraph')));
    const [allTags, setAllTags] = React.useState((localStorage.getItem('allTags') === null) ? new Map(DefaultTags) : new Map(JSON.parse(localStorage.getItem('allTags'))));
    const [selectedTags, setSelectedTags] = React.useState((localStorage.getItem('selectedTags') === null) ? new Map() : new Map(JSON.parse(localStorage.getItem('selectedTags'))));
    const [taggedWords, setTaggedWords] = React.useState((localStorage.getItem('taggedWords') === null) ? new Map() : new Map(JSON.parse(localStorage.getItem('taggedWords'))));
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
            
        },

        downloadTXT() {
            
        }
    }))


    return (
        <div className="main">
            <div className="left">
                <RawTextArea rawParagraph={rawParagraph} setRawParagraph={setRawParagraph} />
                <AssignTag selection={selection} setSelection={setSelection} selectedTags={selectedTags} setSelectedTags={setSelectedTags} taggedWords={taggedWords} setTaggedWords={setTaggedWords} allTags={allTags} />
                <AnnotatedTextArea sentences={sentences} handleSelection={handleSelection} taggedWords={taggedWords} allTags={allTags} />
            </div>
            <div className="right">
                <AssignedTags taggedWords={taggedWords} setTaggedWords={setTaggedWords} selectedTags={selectedTags} setSelectedTags={setSelectedTags} allTags={allTags} />
                <AllTags allTags={allTags} setAllTags={setAllTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
            </div>
        </div>
    )
})