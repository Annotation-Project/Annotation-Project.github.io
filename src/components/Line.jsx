import React from 'react';
import HTMLReactParser from 'html-react-parser';

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export const Line = ({sentence, sNo, taggedWords, setTaggedWords, allTags, rawParagraph}) => {
    const [output, setOutput] = React.useState(sentence);
    const HtmlMiddleTagReg = '(<[^/]*>|</[^>]*>|[\\W\\s]*)*';

    React.useEffect(() => {
        let tmpOutput = sentence;
        [...taggedWords.keys()].forEach(tw => {
            const value = taggedWords.get(tw);
            if (!value.appearances.some(a => a.sentence === sNo + 1)) {
                const matched = [...tmpOutput.matchAll(new RegExp(`${/\w/.test(tw.at(0)) ? '\\b' : '\\B'}${tw.replace(/\s/gi, HtmlMiddleTagReg)}${/\w/.test(tw.at(-1)) ? '\\b' : '\\B'}`, 'gi'))];
                if (matched && matched.length > 0) {
                    value.appearances.push({
                        details: rawParagraph[sNo].split(/\t/g).slice(0, -1),
                        sentence: sNo + 1,
                        indices: matched.map(m => m.index)
                    });
                    setTaggedWords(new Map(taggedWords.set(tw, value)));
                }
            }

            if (value.tags.length > 0) {
                let r = 0, g = 0, b = 0, tags = [...allTags];
                value.tags.forEach(tag => {
                    const rgb = hexToRgb(tags[tag.index].color);
                    r += rgb.r;
                    g += rgb.g;
                    b += rgb.b;
                    tags = tags[tag.index].children;
                });
                tmpOutput = tmpOutput.replace(
                    new RegExp(`(${/\w/.test(tw.at(0)) ? '\\b' : '\\B'}${tw.replace(/[\W\s]/gi, HtmlMiddleTagReg)}${/\w/.test(tw.at(0)) ? '\\b' : '\\B'})`, 'gi'),
                    `<span style="background-color: ${rgbToHex((r / value.tags.length), (g / value.tags.length), (b / value.tags.length))}">$1</span>`);
            }
        });
        setOutput(tmpOutput);
    }, [sentence, taggedWords, allTags, sNo, setTaggedWords, rawParagraph]);

    return (
        <p className="annotationText"> {HTMLReactParser(output)} </p>
    )
}