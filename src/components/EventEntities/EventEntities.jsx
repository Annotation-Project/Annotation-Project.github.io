import React from 'react';
import {MdSearch, MdClose} from 'react-icons/md';
import {EventEntityItem} from "./EventEntityItem";

export const EventEntities = ({project, updateProject}) => {
    const [searchOpen, setSearchOpen] = React.useState(false);
    const [searchFilter, setSearchFilter] = React.useState("");

    return (
        <div className={"boxedContainer"}>
            <div className="boxedContainerTop">
                {searchOpen ?
                    <input autoFocus type="text" name="allTagsSearch" className="searchBox" placeholder="Search here..."
                           value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)}/> :
                    <p className="heading">Assigned Event Entities</p>}
                {searchOpen ? <MdClose onClick={() => setSearchOpen(false)}/> :
                    <MdSearch onClick={() => setSearchOpen(true)}/>}
            </div>
            <div id="assignedTagContainer" className="boxedContainerMain">
                {Object.keys(project.eventEntities).filter((tw) => tw.toLowerCase().includes(searchFilter.toLowerCase())).map((tw, i) =>
                    <EventEntityItem key={i} text={tw} project={project} updateProject={updateProject}/>)}
            </div>
        </div>
    )
}
