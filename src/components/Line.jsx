import React from 'react';
import parse from 'html-react-parser';

export const Line = ({ sentence, handleSelection, taggedWords, allTags }) => {
    const [output, setOutput] = React.useState(sentence);
    const HtmlMiddleTagReg = '\\b(</[^>]*>|<[^/]*>|\\s)*\\b';

    React.useEffect(() => {
        let tempSentence = sentence;
        [...taggedWords.keys()].forEach(tw => {
            const reg = tw.replace(/\s/gi, HtmlMiddleTagReg);
            const matched = [...new Set(tempSentence.match(new RegExp(reg, 'gi')))];
            if (matched) matched.forEach(match => {
                let f = /\w/.test(match.at(0)), r = /\w/.test(match.at(-1));
                let rep = match;
                taggedWords.get(tw).forEach(t => {
                    rep = `<span style="background-color: ${allTags.get(t)}">${rep}</span>`
                });
                tempSentence = tempSentence.replaceAll(new RegExp((f && r) ? `\\b${match}\\b` : (f) ? `\\b${match}` : (r) ? `${match}\\b` : match, 'gi'), rep);
            })
        });
        setOutput(tempSentence);
    }, [sentence, allTags, taggedWords]);

    return (
        <p className="annotationText" onMouseUp={handleSelection}> {parse(output)} </p>
    )
}