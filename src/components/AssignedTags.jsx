import React from 'react'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { TaggedWord } from './TaggedWord';

export const AssignedTags = ({ taggedWords, setTaggedWords, selectedTags, setSelectedTags, allTags }) => {
    const [collapsed, setCollapsed] = React.useState(false);

    const removeTagWord = (tw, tag) => {
        if(taggedWords.get(tw).length > 1) taggedWords.set(tw, [...taggedWords.get(tw).filter(t => t !== tag)]);
        else taggedWords.delete(tw);
        setTaggedWords(new Map(taggedWords));
        setSelectedTags(new Map(selectedTags.set(tag, selectedTags.get(tag) - 1)));
    }
    return (
        <div className={collapsed ? "boxedContainer collapsed" : "boxedContainer"}>
            <div className="boxedContainerTop">
                <p className="heading">Assigned Tags</p>
                {collapsed ? <FaAngleDown onClick={() => setCollapsed(false)} /> : <FaAngleUp onClick={() => setCollapsed(true)} />}
            </div>
            <div className="assignedTagContainer">
                {[...taggedWords.keys()].map((tw, i) => <TaggedWord key={i} text={tw} tags={taggedWords.get(tw)} remove={tag => removeTagWord(tw, tag)} allTags={allTags} />)}
            </div>
        </div>
    )
}
