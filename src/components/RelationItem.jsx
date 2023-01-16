import React from 'react';
import {MdClose} from "react-icons/md";

export const RelationItem = ({ relationEntity, project, updateProject}) => {

    const handleRemoveTag = () => {
        delete project.relations[JSON.stringify(relationEntity)];
        updateProject();
    }

    return (
        <div className="relationItem">
            <div className="relationItemDetails">
                <p className="relationText">{`${relationEntity.name1.toUpperCase()} is the ${project.relations[(JSON.stringify(relationEntity))].relation} of ${relationEntity.name2.toUpperCase()}`}</p>
                <span className="relationPhase">{project.relations[(JSON.stringify(relationEntity))].phase}</span>
            </div>
            <MdClose onClick={handleRemoveTag} />
        </div>
    )
}
