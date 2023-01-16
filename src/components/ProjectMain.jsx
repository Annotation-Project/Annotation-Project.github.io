import React from 'react';
import {AnnotatedTextArea} from './AnnotatedTextArea';
import {AllTags} from './AllTags';
import {AssignedTags} from './AssignedTags';
import {AssignTag} from './AssignTag';
import {AssignRelation} from './AssignRelation';
import {AssignedRelations} from "./AssignedRelations";
import {MdAssignmentTurnedIn, MdFamilyRestroom} from 'react-icons/md'
import {FaTags} from 'react-icons/fa';
import '../styles/ProjectMain.css';

export const ProjectMain = ({project, updateProject}) => {
    const [assignedTagsOpen, setAssignedTagsOpen] = React.useState(false);
    const [allTagsOpen, setAllTagsOpen] = React.useState(false);
    const [relationsOpen, setRelationsOpen] = React.useState(false);
    const [tab, setTab] = React.useState(0);

    return (
        <div className="main">
            <div className="content">
                <div className="tabsContainer" id="mainTabsContainer">
                    <div className="tabs" id="mainTabs">
                        <div className={tab === 0 ? "tab active" : "tab"} onClick={() => setTab(0)}>Named Entity
                            Annotation
                        </div>
                        <div className={tab === 1 ? "tab active" : "tab"} onClick={() => setTab(1)}>Relationship
                            Annotation
                        </div>
                    </div>
                </div>
                <div className="tabContent">
                    {tab === 0 ?
                        <AssignTag
                            project={project}
                            updateProject={updateProject}/>
                        :
                        <AssignRelation
                            project={project}
                            updateProject={updateProject}/>
                    }

                    <AnnotatedTextArea
                        project={project}
                        updateProject={updateProject}/>
                </div>
            </div>
            <div className="sidebar">
                <div className="sidebarContent" >
                    {assignedTagsOpen ? <AssignedTags
                        project={project}
                        updateProject={updateProject}/> : ""}

                    {allTagsOpen ? <AllTags
                        project={project}
                        updateProject={updateProject}/> : ""}

                    {relationsOpen ? <AssignedRelations
                        project={project}
                        updateProject={updateProject}/> : ""}
                </div>
                <div className="sidebarOptions" >
                    <MdAssignmentTurnedIn className={assignedTagsOpen ? "active" : ""} onClick={() => setAssignedTagsOpen(!assignedTagsOpen)} />
                    <FaTags className={allTagsOpen ? "active" : ""} onClick={() => setAllTagsOpen(!allTagsOpen)} />
                    <MdFamilyRestroom className={relationsOpen ? "active" : ""} onClick={() => setRelationsOpen(!relationsOpen)} />
                </div>
            </div>
        </div>
    )
}