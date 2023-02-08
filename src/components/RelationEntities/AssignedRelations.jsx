import React from 'react'
import {MdSearch, MdClose} from 'react-icons/md'
import {RelationItem} from "./RelationItem";

export const AssignedRelations = ({project, updateProject}) => {
    const [searchOpen, setSearchOpen] = React.useState(false);
    const [searchFilter, setSearchFilter] = React.useState("");

    return (
        <div className={"boxedContainer"}>
            <div className="boxedContainerTop">
                {searchOpen ?
                    <input autoFocus type="text" name="allTagsSearch" className="searchBox" placeholder="Search here..."
                           value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)}/> :
                    <p className="heading">Assigned Relations</p>}
                {searchOpen ? <MdClose onClick={() => setSearchOpen(false)}/> :
                    <MdSearch onClick={() => setSearchOpen(true)}/>}
            </div>
            <div id="assignedRelationsContainer" className="boxedContainerMain">
                {Object.keys(project.relations).reverse().map(re => JSON.parse(re)).filter((re) => re.name1.toLowerCase().includes(searchFilter) || re.name2.toLowerCase().includes(searchFilter)).map((re, i) =>
                    <RelationItem key={i} relationEntity={re} project={project} updateProject={updateProject} />
                )}
            </div>
        </div>
    )
}
