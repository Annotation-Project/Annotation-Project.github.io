import React from 'react';
import {Tag} from '../Tag';
import {MdSearch, MdClose, MdAdd} from 'react-icons/md';
import {TagInput} from "../TagInput";

export const EventEntityTags = ({project, updateProject}) => {
    const [searchOpen, setSearchOpen] = React.useState(false);
    const [inputOpened, setInputOpened] = React.useState(false);
    const [searchFilter, setSearchFilter] = React.useState("");

    const handleAddTag = (name, color) => {
        project.eventEntityTags[name] = {color: color};
        updateProject();
        setInputOpened(false);
    }

    return (
        <div className={"boxedContainer"}>
            <div className="boxedContainerTopExtra">
                <div className="boxedContainerTop">
                    {searchOpen ? <input autoFocus type="text" name="allTagsSearch" className="searchBox"
                                         placeholder="Search here..." value={searchFilter}
                                         onChange={(e) => setSearchFilter(e.target.value)}/> :
                        <p className="heading">Event Entities</p>}
                    {searchOpen ? <MdClose onClick={() => setSearchOpen(false)}/> :
                        <MdSearch onClick={() => setSearchOpen(true)}/>}
                    {inputOpened ? <MdClose onClick={() => setInputOpened(false)}/> :
                        <MdAdd onClick={() => setInputOpened(true)}/>}
                </div>
            </div>
            <div id="tagsContainer" className="boxedContainerMain">
                {inputOpened ? <TagInput addTag={handleAddTag}/> : ""}
                {project.eventEntityTags ? Object.keys(project.eventEntityTags).map((tag, i) => <Tag key={i} tagName={tag}
                                                                               tagDetails={project.eventEntityTags[tag]}
                                                                               parent={project.namedEntityTags} project={project}
                                                                               updateProject={updateProject}/>) : ""}
            </div>
        </div>
    )
}
