import React from 'react'
import Relations from "../constants/Relations";

export const RelationItem = ({entity, onSelectRelation}) => {
    const [expanded, setExpanded] = React.useState(false);
    const [selected, setSelected] = React.useState('Select Relation...');

    React.useEffect(() => {
        setExpanded(false);
        onSelectRelation({...entity, relation: selected})
    }, [entity, onSelectRelation, selected])

    return (
        <div className="relationItem">
            <p className="relationName">{entity.name1}</p>
            <span>is the</span>
            <div className="dropdown">
                <p className="selected" onClick={() => setExpanded(!expanded)}>{selected}</p>
                {expanded ?
                    <>
                        <span className="dialogBackground" onClick={() => setExpanded(false)}></span>
                        <div className="dropdownContainer">
                            {[...Relations.relations.keys()].map((option, i) => <p key={i} className="option"
                                                                                   onClick={e => setSelected(e.target.innerText)}>{option}</p>)}
                        </div>
                    </>
                    : ""}
            </div>
            <span>of</span>
            <p className="relationName">{entity.name2}</p>
        </div>
    )
}
