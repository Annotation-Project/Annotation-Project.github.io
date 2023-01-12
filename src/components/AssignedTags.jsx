import React from 'react'
import {FaAngleUp, FaAngleDown} from 'react-icons/fa'
import {MdSearch, MdClose} from 'react-icons/md'
import {TaggedWord} from './TaggedWord';

export const AssignedTags = ({taggedWords, setTaggedWords, allTags, setRelationEntities}) => {
    const [collapsed, setCollapsed] = React.useState(false);
    const [searchOpen, setSearchOpen] = React.useState(false);
    const [searchFilter, setSearchFilter] = React.useState("");

    React.useEffect(() => {
        setSearchFilter("");
        if (searchOpen) setCollapsed(false);
    }, [searchOpen]);

    return (
        <div className={collapsed ? "boxedContainer collapsed" : "boxedContainer"}>
            <div className="boxedContainerTop">
                {searchOpen ?
                    <input autoFocus type="text" name="allTagsSearch" className="searchBox" placeholder="Search here..."
                           value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)}/> :
                    <p className="heading">Assigned Tags</p>}
                {searchOpen ? <MdClose onClick={() => setSearchOpen(false)}/> :
                    <MdSearch onClick={() => setSearchOpen(true)}/>}
                {collapsed ? <FaAngleDown onClick={() => setCollapsed(false)}/> :
                    <FaAngleUp onClick={() => setCollapsed(true)}/>}
            </div>
            <div id="assignedTagContainer" className="boxedContainerMain">
                {[...taggedWords.keys()].reverse().filter((tw) => tw.toLowerCase().includes(searchFilter.toLowerCase())).map((tw, i) =>
                    <TaggedWord key={i} text={tw} tag={taggedWords.get(tw)} taggedWords={taggedWords}
                                setTaggedWords={setTaggedWords} allTags={allTags} setRelationEntities={setRelationEntities}/>)}
            </div>
        </div>
    )
}
