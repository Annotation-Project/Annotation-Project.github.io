import React from "react";
import {MdMoreVert} from "react-icons/md";

export const ProjectItem = ({project, onClick}) => {


    return (
        <div className="projectItem" onClick={onClick}>
            <div className="projectItemDetails">
                <p className="name">{project.projectName}</p>
                <div className="details">
                    <p>Lines Count: <span>{project.paragraph.length}</span></p>
                    <p>Named Entity Count: <span>{Object.keys(project.namedEntities).length}</span></p>
                    <p>Event Entity Count: <span>{Object.keys(project.eventEntities).length}</span></p>
                    <p>Relations Count: <span>{Object.keys(project.relations).length}</span></p>
                </div>
            </div>
            <MdMoreVert />
        </div>
    )
}