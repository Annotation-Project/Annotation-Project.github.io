import React from 'react'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'

export const AssignTag = ({ selection, setSelection, selectedTags, setSelectedTags, taggedWords, setTaggedWords, allTags }) => {
    const [collapsed, setCollapsed] = React.useState(false);

    const onSelect = (e) => {
        if (selection !== "") {
            const obj = { text: selection.trim(), tag: e.target.innerText };
            if (!taggedWords.some((tag) => JSON.stringify(tag) === JSON.stringify(obj))) {
                setSelectedTags(new Map(selectedTags.set(obj.tag, selectedTags.get(obj.tag) + 1)));
                setTaggedWords([obj, ...taggedWords]);
            }
            setSelection("");
        }
    }

    return (
        <div className={collapsed ? "boxedContainer staticSize collapsed" : "boxedContainer staticSize"}>
            <div className="boxedContainerTop">
                <p className="heading">Assign A Tag</p>
                {collapsed ? <FaAngleDown onClick={() => setCollapsed(false)} /> : <FaAngleUp onClick={() => setCollapsed(true)} />}
            </div>
            <div className="assignTagMain">
                <p className="selectedText"><span>Selected Text: </span>{selection}</p>
                <div className="tagSelectionArea">
                    {[...selectedTags.keys()].sort((a, b) => selectedTags.get(b) - selectedTags.get(a)).map((t, i) => <p key={i} className="suggestedTag" onClick={onSelect} style={{ backgroundColor: allTags.get(t) }} >{t}</p>)}
                </div>
            </div>
        </div>
    )
}
