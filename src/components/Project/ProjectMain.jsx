import React from 'react';
import {AnnotatedTextArea} from '../AnnotatedTextArea';
import {NamedEntityTags} from '../NamedEntities/NamedEntityTags';
import {NamedEntities} from '../NamedEntities/NamedEntities';
import {AssignNamedEntity} from '../NamedEntities/AssignNamedEntity';
import {AssignRelation} from '../RelationEntities/AssignRelation';
import {AssignedRelations} from "../RelationEntities/AssignedRelations";
import {EventEntities} from "../EventEntities/EventEntities";
import {MdAssignmentTurnedIn, MdFamilyRestroom, MdEventAvailable, MdEventNote} from 'react-icons/md'
import {FaTags} from 'react-icons/fa';
import '../../styles/ProjectMain.css';
import {EventEntityTags} from "../EventEntities/EventEntityTags";
import {AssignEventEntity} from "../EventEntities/AssignEventEntity";
import {HIGHLIGHT_EE, HIGHLIGHT_NE} from "../Line";

export const ProjectMain = ({project, updateProject}) => {
    const [sideBar, setSideBar] = React.useState(0);
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
                        <div className={tab === 2 ? "tab active" : "tab"} onClick={() => setTab(2)}>Event Entity
                            Annotation
                        </div>
                    </div>
                </div>
                <div className="tabContent">
                    {tab === 0 ?
                        <>
                            <AssignNamedEntity
                                project={project}
                                updateProject={updateProject}/>

                            <AnnotatedTextArea
                                project={project}
                                updateProject={updateProject}
                                flag={HIGHLIGHT_NE}/>
                        </>
                        : tab === 1 ?
                            <>
                                <AssignRelation
                                    project={project}
                                    updateProject={updateProject}/>

                                <AnnotatedTextArea
                                    project={project}
                                    updateProject={updateProject}
                                    flag={HIGHLIGHT_NE}/>
                            </>
                            : tab === 2 ?
                                <>
                                    <AssignEventEntity
                                        project={project}
                                        updateProject={updateProject}/>

                                    <AnnotatedTextArea
                                        project={project}
                                        updateProject={updateProject}
                                        flag={HIGHLIGHT_EE}/>
                                </>
                                : ""
                    }
                </div>
            </div>
            <div className="sidebar">
                <div className="sidebarContent">
                    {sideBar === 1 ? <NamedEntities
                            project={project}
                            updateProject={updateProject}/>
                        : sideBar === 2 ? <NamedEntityTags
                                project={project}
                                updateProject={updateProject}/>
                            : sideBar === 3 ? <AssignedRelations
                                    project={project}
                                    updateProject={updateProject}/>
                                : sideBar === 4 ? <EventEntities
                                        project={project}
                                        updateProject={updateProject}/>
                                    : sideBar === 5 ? <EventEntityTags
                                            project={project}
                                            updateProject={updateProject}/>
                                        : ""}
                </div>
                <div className="sidebarOptions">
                    <MdAssignmentTurnedIn className={sideBar === 1 ? "active" : ""}
                                          onClick={() => setSideBar(sideBar === 1 ? 0 : 1)}/>

                    <FaTags className={sideBar === 2 ? "active" : ""}
                            onClick={() => setSideBar(sideBar === 2 ? 0 : 2)}/>

                    <MdFamilyRestroom className={sideBar === 3 ? "active" : ""}
                                      onClick={() => setSideBar(sideBar === 3 ? 0 : 3)}/>

                    <MdEventAvailable className={sideBar === 4 ? "active" : ""}
                                      onClick={() => setSideBar(sideBar === 4 ? 0 : 4)}/>

                    <MdEventNote className={sideBar === 5 ? "active" : ""}
                                 onClick={() => setSideBar(sideBar === 5 ? 0 : 5)}/>
                </div>
            </div>
        </div>
    )
}