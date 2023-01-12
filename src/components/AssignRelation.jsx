import React from 'react'
import {RelationItem} from './RelationItem'

export const AssignRelation = ({relationEntities, setRelationEntities}) => {

    const onSelectRelation = () => {

    }

    return (
        <div id="assignRelation" className="boxedContainer">
            {relationEntities.sort((a, b) => a.relation - b.relation).map((entity, i) => <RelationItem key={i}
                                                                                                       entity={entity}
                                                                                                       onSelectRelation={onSelectRelation}/>)}
        </div>
    )
}