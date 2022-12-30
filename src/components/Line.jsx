import React from 'react';
import parse from 'html-react-parser';

export const Line = ({ sentence, handleSelection, taggedWords, allTags, i }) => {
    const [output, setOutput] = React.useState(sentence);
    const HtmlOpeningTagReg = '(<[^/]*>)*\\b';
    const HtmlMiddleTagReg = '\\b(</[^>]*>|<[^/]*>|\\s)*\\b';
    const HtmlClosingTagReg = '\\b(</[^>]*>)*';

    React.useEffect(() => {
        let tempSentence = sentence;
        taggedWords.forEach(tw => {
            const reg = HtmlOpeningTagReg + tw.text.replace(/\s/gi, HtmlMiddleTagReg) + HtmlClosingTagReg;
            const matched = [...new Set(tempSentence.match(new RegExp(reg, 'gi')))];
            if (matched) matched.forEach(match => {
                let f = /\w/.test(match[0]), r = /\w/.test(match[match.length-1]);
                tempSentence = tempSentence.replaceAll(new RegExp((f && r) ? `\\b${match}\\b` : (f) ? `\\b${match}` : (r) ? `${match}\\b` : match, 'gi'), `<span style="background-color: ${allTags.get(tw.tag)}">${match}</span>`);
            })
        });
        setOutput(tempSentence);
    }, [sentence, allTags, taggedWords]);

    return (
        <p className="annotationText" onMouseUp={handleSelection}> {parse(output)} </p>
    )
}