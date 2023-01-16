import React from 'react'
import Relations from "../constants/Relations";

export const AssignRelation = ({project, updateProject}) => {
    const [selectedBox, setSelectedBox] = React.useState(0);
    const [name1, setName1] = React.useState([]);
    const [name2, setName2] = React.useState([]);
    const [sentence, setSentence] = React.useState(-1);
    const [phase, setPhase] = React.useState("");
    const [expanded, setExpanded] = React.useState(false);
    const [relation, setRelation] = React.useState('');

    React.useEffect(() => {
        document.getSelection().empty();
        document.onselectionchange = () => {
            const selection = document.getSelection().toString().trim();
            const index = document.activeElement.dataset.index;
            if (selection && index) {
                if (selectedBox === 0) {
                    setPhase(selection);
                    setSentence(parseInt(index));
                } else {
                    const tmp = new Set();
                    project.appearances[parseInt(index)].map(e => e.text.toLowerCase()).forEach(tw => {
                        const matches = selection.match(new RegExp(`${/\w/.test(tw.at(0)) ? '\\b' : '\\B'}${tw.replace(/[\s\W]/g, '[\\s\\W]')}${/\w/.test(tw.at(-1)) ? '\\b' : '\\B'}`, 'gi'))
                        if (matches) tmp.add(...matches);
                    })
                    if (selectedBox === 1) {
                        setName1([...tmp]);
                    } else if (selectedBox === 2) {
                        setName2([...tmp]);
                    }
                }
            }
        }
        return () => {
            document.onselectionchange = undefined;
        }
    }, [selectedBox, project]);

    const onSelectRelation = (e) => {
        setRelation(e.currentTarget.dataset.option);
        name1.forEach(n1 => {
            name2.forEach(n2 => {
                project.relations[JSON.stringify({name1: n1, name2: n2})] = {
                    relation: e.currentTarget.dataset.option,
                    phase: phase,
                    sentence: sentence
                }
                if (project.words[n2.toLowerCase()].gender && Relations.hasOwnProperty(project.words[n2.toLowerCase()].gender) &&
                    Relations.RELATIONS.get(e.currentTarget.dataset.option)[Relations[project.words[n2.toLowerCase()].gender]] !== null) {

                    project.relations[JSON.stringify({name1: n2, name2: n1})] = {
                        relation: Relations.RELATIONS.get(e.currentTarget.dataset.option)[Relations[project.words[n2.toLowerCase()].gender]],
                        phase: phase,
                        sentence: sentence
                    }
                }
            });
        });
        updateProject();
        setExpanded(false);
    }

    return (<div id="assignRelation" className="boxedContainer staticSize">
        <div className="boxedContainerTop">
            <p className="heading">Assign A Relation</p>
        </div>
        <div id="assignRelationMain" className="boxedContainerMain">
            <div
                className={selectedBox === 0 ? "selectedTextArea noPointer selectedBox" : "selectedTextArea noPointer"}
                onClick={() => setSelectedBox(0)}>
                <span>Relation Phase (Must be selected first!)</span>
                <p className="selectedText">{phase}</p>
            </div>
            <div className="relationItemArea">
                <div
                    className={selectedBox === 1 ? "selectedTextArea noPointer selectedBox" : "selectedTextArea noPointer"}
                    onClick={() => setSelectedBox(phase !== '' ? 1 : 0)}>
                    <span>Select Name(s)</span>
                    <p className="relationName">{name1.join(', ')}</p>
                </div>
                <span>is the</span>
                <div className="selectedTextArea staticSize" onClick={() => {
                    setSelectedBox(phase !== '' ? 3 : 0)
                    setExpanded(phase !== '' && name1.length > 0 && name2.length > 0 && !expanded)
                }}>
                    <span>Select Relation</span>
                    <div className="dropdown">
                        <p className="selected">{relation}</p>
                        {expanded ? <>
                            <span className="dialogBackground" onClick={() => setExpanded(false)}></span>
                            <div className="dropdownContainer">
                                {[...Relations.RELATIONS.keys()].map((option, i) => <p key={i}
                                                                                       className="option"
                                                                                       data-option={option}
                                                                                       onClick={onSelectRelation}>{option}</p>)}
                            </div>
                        </> : ""}
                    </div>
                </div>
                <span>of</span>
                <div
                    className={selectedBox === 2 ? "selectedTextArea noPointer selectedBox" : "selectedTextArea noPointer"}
                    onClick={() => setSelectedBox(phase !== '' ? 2 : 0)}>
                    <span>Select Name(s)</span>
                    <p className="relationName">{name2.join(', ')}</p>
                </div>
            </div>
        </div>
    </div>)
}