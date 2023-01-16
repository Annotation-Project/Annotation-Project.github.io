import React from "react";
import {MdMoreVert} from "react-icons/md";

export const ProjectItem = ({project, onClick}) => {


    return (
        <div className="projectItem" onClick={onClick}>
            <div className="projectItemDetails">
                <p className="name">{project.filename}</p>
                <div className="details">
                    <p>Lines Count: <span>{project.paragraph.length}</span></p>
                    <p>Tagged Words Count: <span>{Object.keys(project.words).length}</span></p>
                    <p>Relations Count: <span>{Object.keys(project.relations).length}</span></p>
                </div>
            </div>
            <MdMoreVert />
        </div>
    )
}