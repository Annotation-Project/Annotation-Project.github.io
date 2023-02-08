import React from 'react';
import {MdOutlineClose} from 'react-icons/md';

export const EventEntityItemTag = ({text, tags, index, project, updateProject}) => {

    const handleRemoveTag = () => {
        project.eventEntities[text].tags = project.eventEntities[text].tags.slice(0, index);
        if (project.eventEntities[text].tags.length === 0) {
            delete project.eventEntities[text];
            project.eventEntityAppearances = project.eventEntityAppearances.map(ap => ap.filter(t => t.text.toLowerCase() !== text));
        }
        updateProject();
    }

    return (
        <div className="tagContainer">
            <div className="tag" style={{backgroundColor: tags[project.eventEntities[text].tags[index]].color}}>
                <p className="tagName">{project.eventEntities[text].tags[index]}</p>
                <MdOutlineClose onClick={handleRemoveTag}/>
            </div>
            {index < project.eventEntities[text].tags.length-1 ? <div className="tagsContainerChild">
                <EventEntityItemTag text={text} tags={tags[project.eventEntities[text].tags[index]].children} index={index+1} project={project} updateProject={updateProject}/>
            </div> : ""}
        </div>
    )
}
