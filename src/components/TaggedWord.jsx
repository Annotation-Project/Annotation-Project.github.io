import React from 'react';
import {TwTag} from './TwTag';
import {FaAngleDown, FaAngleUp} from "react-icons/fa";

export const TaggedWord = ({text, tag, taggedWords, setTaggedWords, allTags}) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleRemoveTag = () => {
        taggedWords.delete(text);
        setTaggedWords(new Map(taggedWords));
    }

    return (
        <div className="tagWord">
            <div className="twTag">
                <div className="twTagDetails">
                    <p className="twTagName">{text.toUpperCase()}</p>
                    <span className="twGender">{taggedWords.get(text).gender}</span>
                </div>
                {expanded ? <FaAngleUp onClick={() => setExpanded(false)}/> :
                    <FaAngleDown onClick={() => setExpanded(true)}/>}
            </div>
            {expanded && tag.tags.length > 0 ? <div className="tagsContainerChild">
                <TwTag text={text} tags={tag.tags} index={0} allTags={allTags}  taggedWords={taggedWords} setTaggedWords={setTaggedWords} removeTag={handleRemoveTag} />
            </div> : ""}
        </div>
    )
}
