import React from 'react';
import {MdOutlineClose} from 'react-icons/md';

export const NamedEntityItemTag = ({text, tags, index, project, updateProject}) => {

    const handleRemoveTag = () => {
        project.namedEntities[text].tags = project.namedEntities[text].tags.slice(0, index);
        if (project.namedEntities[text].tags.length === 0) {
            delete project.namedEntities[text];
            project.namedEntityAppearances = project.namedEntityAppearances.map(ap => ap.filter(t => t.text.toLowerCase() !== text));
            Object.keys(project.relations).forEach(rk => {
                const obj = JSON.parse(rk);
                if (obj.name1.toLowerCase() === text || obj.name2.toLowerCase() === text) {
                    delete project.relations[rk];
                }
            })
        }
        updateProject();
    }

    return (
        <div className="tagContainer">
            <div className="tag" style={{backgroundColor: tags[project.namedEntities[text].tags[index]].color}}>
                <p className="tagName">{project.namedEntities[text].tags[index]}</p>
                <MdOutlineClose onClick={handleRemoveTag}/>
            </div>
            {index < project.namedEntities[text].tags.length-1 ? <div className="tagsContainerChild">
                <NamedEntityItemTag text={text} tags={tags[project.namedEntities[text].tags[index]].children} index={index+1} project={project} updateProject={updateProject}/>
            </div> : ""}
        </div>
    )
}
