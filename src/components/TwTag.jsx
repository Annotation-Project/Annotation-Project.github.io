import React from 'react';
import {MdOutlineClose} from 'react-icons/md';

export const TwTag = ({text, tags, index, project, updateProject}) => {

    const handleRemoveTag = () => {
        project.words[text].tags = project.words[text].tags.slice(0, index);
        if (project.words[text].tags.length === 0) {
            delete project.words[text];
            project.appearances = project.appearances.map(ap => ap.filter(t => t.text.toLowerCase() !== text));
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
            <div className="tag" style={{backgroundColor: tags[project.words[text].tags[index]].color}}>
                <p className="tagName">{project.words[text].tags[index]}</p>
                <MdOutlineClose onClick={handleRemoveTag}/>
            </div>
            {index < project.words[text].tags.length-1 ? <div className="tagsContainerChild">
                <TwTag text={text} tags={tags[project.words[text].tags[index]].children} index={index+1} project={project} updateProject={updateProject}/>
            </div> : ""}
        </div>
    )
}
