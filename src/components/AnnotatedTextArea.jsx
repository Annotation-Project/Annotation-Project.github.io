import React from 'react';
import { Line } from './Line';

export const AnnotatedTextArea = ({ sentences, taggedWords, setTaggedWords, allTags, rawParagraph }) => {

    return (
        <div className="boxedContainer">
            <div className="boxedContainerTop">
                <p className="heading">Annotations</p>
            </div>
            <div id="annotationsContainerExtra" className="boxedContainerMain">
                <div className="annotationsContainer" id={"temp"}>
                    {(sentences != null) ? sentences.map((sentence, i) => <Line key={i} sentence={sentence} sNo={i} taggedWords={taggedWords} setTaggedWords={setTaggedWords} allTags={allTags} rawParagraph={rawParagraph} />) : ""}
                </div>
            </div>
        </div>
    )
}