import React from 'react';
import {MdOutlineClose} from 'react-icons/md';

export const TwTag = ({text, tags, index, allTags, setTaggedWords, removeTag}) => {

    const handleRemoveTag = () => {
        console.log('ok')
        setTaggedWords(taggedWords => new Map(taggedWords.set(text, {...taggedWords.get(text), tags: taggedWords.get(text).tags.slice(0, index+1)})));
    }

    return (
        <div className="tagContainer">
            <div className="tag" style={{backgroundColor: allTags[tags[0].index].color}}>
                <p className="tagName">{tags[index].name}</p>
                <MdOutlineClose onClick={removeTag}/>
            </div>
            {index < tags.length-1 ? <div className="tagsContainerChild">
                <TwTag text={text} tags={tags} index={index+1} setTaggedWords={setTaggedWords} allTags={allTags[tags[0].index].children} removeTag={handleRemoveTag}/>
            </div> : ""}
        </div>
    )
}
