import React from 'react';
import {NamedEntityItemTag} from './NamedEntityItemTag';
import {FaAngleDown, FaAngleUp} from "react-icons/fa";

export const NamedEntityItem = ({text, project, updateProject}) => {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <div className="tagWord">
            <div className="twTag">
                <div className="twTagDetails">
                    <p className="twTagName">{text.toUpperCase()}</p>
                    <span className="twGender">{project.namedEntities[text].gender}</span>
                </div>
                {expanded ? <FaAngleUp onClick={() => setExpanded(false)}/> :
                    <FaAngleDown onClick={() => setExpanded(true)}/>}
            </div>
            {expanded && project.namedEntities[text].tags.length > 0 ? <div className="tagsContainerChild">
                <NamedEntityItemTag text={text} tags={project.namedEntityTags} index={0} project={project} updateProject={updateProject} />
            </div> : ""}
        </div>
    )
}
