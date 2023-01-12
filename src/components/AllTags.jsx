import React from 'react';
import {FaAngleUp, FaAngleDown} from 'react-icons/fa';
import {Tag} from './Tag';
import {MdSearch, MdClose, MdAdd} from 'react-icons/md';
import {TagInput} from "./TagInput";

export const AllTags = ({allTags, setAllTags}) => {
    const [collapsed, setCollapsed] = React.useState(false);
    const [searchOpen, setSearchOpen] = React.useState(false);
    const [searchFilter, setSearchFilter] = React.useState("");
    const [expanded, setExpanded] = React.useState(false);


    React.useEffect(() => {
        setSearchFilter("");
        if (searchOpen) {
            setCollapsed(false);
        }
    }, [searchOpen]);

    const onChangeColor = (i, color) => {
        setTimeout(() => {
            allTags[i].color = color;
            setAllTags([...allTags]);
        }, 1000);
    }

    const handleAddTag = (name, color) => {
        setExpanded(false);
        setAllTags([...allTags, {name: name, color: color}]);
    }

    return (
        <div className={collapsed ? "boxedContainer collapsed" : "boxedContainer"}>
            <div className="boxedContainerTopExtra">
                <div className="boxedContainerTop">
                    {searchOpen ? <input autoFocus type="text" name="allTagsSearch" className="searchBox"
                                         placeholder="Search here..." value={searchFilter}
                                         onChange={(e) => setSearchFilter(e.target.value)}/> :
                        <p className="heading">All Tags</p>}
                    {searchOpen ? <MdClose onClick={() => setSearchOpen(false)}/> :
                        <MdSearch onClick={() => setSearchOpen(true)}/>}
                    {expanded ? <MdClose onClick={() => setExpanded(false)}/> : <MdAdd onClick={() => {
                        setExpanded(true); setCollapsed(false);
                    }}/>}
                    {collapsed ? <FaAngleDown onClick={() => setCollapsed(false)}/> :
                        <FaAngleUp onClick={() => setCollapsed(true)}/>}
                </div>
            </div>
            <div id="tagsContainer" className="boxedContainerMain">
                {expanded ? <TagInput addTag={handleAddTag}/> : ""}
                {allTags.map((tag, i) =>
                    <Tag key={i} tag={tag} searchFilter={searchFilter} allTags={allTags} setAllTags={setAllTags}
                         onChangeColor={(color) => onChangeColor(i, color)}/>)}
            </div>
        </div>
    )
}
