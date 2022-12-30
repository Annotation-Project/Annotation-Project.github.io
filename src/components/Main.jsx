import React from 'react';
import { AnnotatedTextArea } from './AnnotatedTextArea';
import { RawTextArea } from './RawTextArea';
import { AllTags } from './AllTags';
import { AssignedTags } from './AssignedTags';
import { AssignTag } from './AssignTag';
import DefaultTags from '../constants/DefaultTags';

export const Main = () => {
    const [rawParagraph, setRawParagraph] = React.useState((localStorage.getItem('rawParagraph') === null) ? "" : localStorage.getItem('rawParagraph'));
    const [sentences, setSentences] = React.useState([]);
    const [selection, setSelection] = React.useState("");
    const [allTags, setAllTags] = React.useState((localStorage.getItem('allTags') === null) ? new Map(DefaultTags) : new Map(JSON.parse(localStorage.getItem('allTags'))));
    const [selectedTags, setSelectedTags] = React.useState((localStorage.getItem('selectedTags') === null) ? new Map() : new Map(JSON.parse(localStorage.getItem('selectedTags'))));
    const [taggedWords, setTaggedWords] = React.useState((localStorage.getItem('taggedWords') === null) ? [] : JSON.parse(localStorage.getItem('taggedWords')));

    React.useEffect(() => {
        localStorage.setItem('rawParagraph', rawParagraph);
        setSentences(rawParagraph.match(/[^\t]+\n/g));
    }, [rawParagraph]);

    React.useEffect(() => {
        localStorage.setItem('allTags', JSON.stringify([...allTags]));
    }, [allTags]);

    React.useEffect(() => {
        localStorage.setItem('selectedTags', JSON.stringify([...selectedTags]));
    }, [selectedTags]);

    React.useEffect(() => {
        localStorage.setItem('taggedWords', JSON.stringify(taggedWords));
    }, [taggedWords]);

    // const getAnnotations = () => {
    //     const uniqueWords = [...new Set(wordObjects.map(e => e.word))];
    //     const wordPositions = new Map();
    //     const sentences = (rawParagraph + " ").match(/[^.?!]+[.?!]+['"]*\s+/g);
    //     sentences.forEach((s, i) => {
    //         uniqueWords.forEach(w => {
    //             let startingIndex = 0, occured;
    //             if (!wordPositions.has(w)) wordPositions.set(w, []);
    //             while ((occured = s.toLowerCase().indexOf(w.toLowerCase(), startingIndex)) >= 0) {
    //                 wordPositions.get(w).push({ sentence: i, index: occured });
    //                 startingIndex = occured + 1;
    //             }
    //         });
    //     });
    //     console.log(wordPositions);
    // }

    const handleSelection = () => {
        setSelection(window.getSelection().toString());
    }

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
}
