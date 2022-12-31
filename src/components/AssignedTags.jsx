import React from 'react'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { MdSearch, MdClose } from 'react-icons/md'
import { TaggedWord } from './TaggedWord';

export const AssignedTags = ({ taggedWords, setTaggedWords, selectedTags, setSelectedTags, allTags }) => {
    const [collapsed, setCollapsed] = React.useState(false);
    const [searchOpen, setSearchOpen] = React.useState(false);
    const [searchFilter, setSearchFilter] = React.useState("");

    React.useEffect(()=> {
        setSearchFilter("");
        if(searchOpen) setCollapsed(false);
    }, [searchOpen]);

    const removeTagWord = (tw, tag) => {
        if(taggedWords.get(tw).length > 1) taggedWords.set(tw, [...taggedWords.get(tw).filter(t => t !== tag)]);
        else taggedWords.delete(tw);
        setTaggedWords(new Map(taggedWords));
        setSelectedTags(new Map(selectedTags.set(tag, selectedTags.get(tag) - 1)));
    }

    return (
        <div className={collapsed ? "boxedContainer collapsed" : "boxedContainer"}>
            <div className="boxedContainerTop">
                {searchOpen ? <input autoFocus type="text" name="allTagsSearch" className="searchBox" placeholder="Search here..." value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} /> : <p className="heading">Assigned Tags</p>}
                {searchOpen ? <MdClose onClick={() => setSearchOpen(false)} /> : <MdSearch onClick={() => setSearchOpen(true)} />}
                {collapsed ? <FaAngleDown onClick={() => setCollapsed(false)} /> : <FaAngleUp onClick={() => setCollapsed(true)} />}
            </div>
            <div className="assignedTagContainer">
                {[...taggedWords.keys()].filter((tw) => tw.toLowerCase().includes(searchFilter.toLowerCase())).map((tw, i) => <TaggedWord key={i} text={tw} tags={taggedWords.get(tw)} remove={tag => removeTagWord(tw, tag)} allTags={allTags} />)}
            </div>
        </div>
    )
}
