import React from 'react';
import {NamedEntityItemTag} from '../NamedEntities/NamedEntityItemTag';
import {FaAngleDown, FaAngleUp} from "react-icons/fa";
import {EventEntityItemTag} from "./EventEntityItemTag";

export const EventEntityItem = ({text, project, updateProject}) => {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <div className="tagWord">
            <div className="twTag">
                <div className="twTagDetails">
                    <p className="twTagName">{text.toUpperCase()}</p>
                </div>
                {expanded ? <FaAngleUp onClick={() => setExpanded(false)}/> :
                    <FaAngleDown onClick={() => setExpanded(true)}/>}
            </div>
            {expanded && project.eventEntities[text].tags.length > 0 ? <div className="tagsContainerChild">
                <EventEntityItemTag text={text} tags={project.eventEntityTags} index={0} project={project} updateProject={updateProject} />
            </div> : ""}
        </div>
    )
}
