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

export const Line = ({sentence, sNo, project, updateProject, flag}) => {

    const getOutput = (sent) => {
        if (flag === HIGHLIGHT_NE) project.namedEntityAppearances[sNo].forEach(tw => {
            const value = project.namedEntities[tw.text.toLowerCase()];
            if (value.tags.length > 0) {
                let r = 0, g = 0, b = 0, tags = project.namedEntityTags;
                value.tags.forEach(tag => {
                    const rgb = hexToRgb(tags[tag].color);
                    r += rgb.r;
                    g += rgb.g;
                    b += rgb.b;
                    tags = tags[tag].children;
                });
                sent = sent.replace(
                    new RegExp(`(${/\w/.test(tw.text.toLowerCase().at(0)) ? '\\b' : '\\B'}${tw.text.toLowerCase().replace(/[\W\s]/gi, '(<[^/]*>|</[^>]*>|[\\W\\s]*)*')}${/\w/.test(tw.text.toLowerCase().at(0)) ? '\\b' : '\\B'})`, 'gi'),
                    `<span style="background-color: ${rgbToHex((r / value.tags.length), (g / value.tags.length), (b / value.tags.length))}">$1</span>`);
            }
        });
        else if (flag === HIGHLIGHT_EE) project.eventEntityAppearances[sNo].forEach(tw => {
            const value = project.eventEntities[tw.text.toLowerCase()];
            if (value.tags.length > 0) {
                let r = 0, g = 0, b = 0, tags = project.eventEntityTags;
                value.tags.forEach(tag => {
                    const rgb = hexToRgb(tags[tag].color);
                    r += rgb.r;
                    g += rgb.g;
                    b += rgb.b;
                    tags = tags[tag].children;
                });
                sent = sent.replace(
                    new RegExp(`(${/\w/.test(tw.text.toLowerCase().at(0)) ? '\\b' : '\\B'}${tw.text.toLowerCase().replace(/[\W\s]/gi, '(<[^/]*>|</[^>]*>|[\\W\\s]*)*')}${/\w/.test(tw.text.toLowerCase().at(0)) ? '\\b' : '\\B'})`, 'gi'),
                    `<span style="background-color: ${rgbToHex((r / value.tags.length), (g / value.tags.length), (b / value.tags.length))}">$1</span>`);
            }
        });
        return sent;
    }

    return (
        <pre className="annotationTextParent" data-index={sNo} contentEditable={true} suppressContentEditableWarning={true}>
            <p className="annotationText" contentEditable={false}> {HTMLReactParser(getOutput(sentence))} </p>
        </pre>
    )
}

export const HIGHLIGHT_NE = 0;
export const HIGHLIGHT_EE = 1;