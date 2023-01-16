import React from 'react';
import {TwTag} from './TwTag';
import {FaAngleDown, FaAngleUp} from "react-icons/fa";

export const TaggedWord = ({text, project, updateProject}) => {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <div className="tagWord">
            <div className="twTag">
                <div className="twTagDetails">
                    <p className="twTagName">{text.toUpperCase()}</p>
                    <span className="twGender">{project.words[text].gender}</span>
                </div>
                {expanded ? <FaAngleUp onClick={() => setExpanded(false)}/> :
                    <FaAngleDown onClick={() => setExpanded(true)}/>}
            </div>
            {expanded && project.words[text].tags.length > 0 ? <div className="tagsContainerChild">
                <TwTag text={text} tags={project.tags} index={0} project={project} updateProject={updateProject} />
            </div> : ""}
        </div>
    )
}
