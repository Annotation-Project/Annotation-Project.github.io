import React from 'react';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { Line } from './Line';

export const AnnotatedTextArea = ({ sentences, handleSelection, taggedWords, allTags }) => {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
        <div className={collapsed ? "boxedContainer collapsed" : "boxedContainer"}>
            <div className="boxedContainerTop">
                <p className="heading">Annotations</p>
                {collapsed ? <FaAngleDown onClick={() => setCollapsed(false)} /> : <FaAngleUp onClick={() => setCollapsed(true)} />}
            </div>
            <div className="annotationsContainerExtra">
                <div className="annotationsContainer">
                    {(sentences != null) ? sentences.map((sentence, i) => <Line key={i} sentence={sentence} handleSelection={handleSelection} taggedWords={taggedWords} allTags={allTags} />) : ""}
                </div>
            </div>
        </div>
    )
}