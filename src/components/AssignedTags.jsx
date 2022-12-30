import React from 'react'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { TaggedWord } from './TaggedWord';

export const AssignedTags = ({ taggedWords, setTaggedWords, selectedTags, setSelectedTags, allTags }) => {
    const [collapsed, setCollapsed] = React.useState(false);

    const removeTagWord = (tw) => {
        setTaggedWords([...taggedWords.filter(e => JSON.stringify(e) !== JSON.stringify(tw))]);
        setSelectedTags(new Map(selectedTags.set(tw.tag, selectedTags.get(tw.tag) - 1)));
    }

    return (
        <div className={collapsed ? "boxedContainer collapsed" : "boxedContainer"}>
            <div className="boxedContainerTop">
                <p className="heading">Assigned Tags</p>
                {collapsed ? <FaAngleDown onClick={() => setCollapsed(false)} /> : <FaAngleUp onClick={() => setCollapsed(true)} />}
            </div>
            <div className="assignedTagContainer">
                {taggedWords.map((tw, i) => <TaggedWord key={i} tw={tw} remove={removeTagWord} allTags={allTags} />)}
            </div>
        </div>
    )
}
