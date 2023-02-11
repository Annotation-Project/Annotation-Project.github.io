import React from 'react'
import { SuggestedTag } from "../SuggestedTag";
import Genders from "../../constants/Genders";
import { SuggestedGenders } from "../SuggestedGenders";
import Relations from "../../constants/Relations";

export const AssignNamedEntity = ({ project, updateProject }) => {
    const [availableTags, setAvailableTags] = React.useState({});
    const [selection, setSelection] = React.useState("");
    const [tab, setTab] = React.useState(0);

    React.useEffect(() => {
        document.getSelection().empty();
        document.onselectionchange = () => {
            setSelection(document.getSelection().toString().trim());
        }
        return () => {
            document.onselectionchange = undefined;
        }
    }, [setSelection]);

    React.useEffect(() => {
        if (selection && project.namedEntities[selection.toLowerCase()]) {
            let tmp = project.namedEntityTags;
            project.namedEntities[selection.toLowerCase()].tags.forEach(tag => {
                tmp = tmp[tag].children;
            });
            setAvailableTags(tmp);
        } else {
            setAvailableTags(project.namedEntityTags);
        }
    }, [project, selection]);

    const onSelectTag = (tag) => {
        if (selection) {
            if (project.namedEntities[selection.toLowerCase()]) {
                project.namedEntities[selection.toLowerCase()].tags.push(tag);
            } else {
                project.namedEntities[selection.toLowerCase()] = {
                    tags: [tag]
                }

                project.paragraph.forEach((paragraph, i) => {
                    const matches = [...paragraph.split(/\t/).at(-1)
                        .matchAll(new RegExp(`${/\w/.test(selection.at(0)) ? '\\b' : '\\B'}${selection.replace(/[\s\W]/g, '[\\s\\W]')}${/\w/.test(selection.at(-1)) ? '\\b' : '\\B'}`, 'gi'))];

                    if (matches.length > 0) {
                        project.namedEntityAppearances[i].push({
                            text: selection,
                            indices: matches.map(m => m.index)
                        });
                    }
                })
            }
            updateProject();
        }
    }

    const onSelectGender = (g) => {
        if (selection) {
            if (project.namedEntities[selection.toLowerCase()]) {
                if (project.namedEntities[selection.toLowerCase()].gender) {
                    Object.keys(project.relations).forEach(rk => {
                        const obj = JSON.parse(rk);
                        if (obj.name1.toLowerCase() === selection.toLowerCase()) {
                            const revRel = project.relations[JSON.stringify({
                                name1: obj.name2,
                                name2: obj.name1
                            })].relation;
                            project.relations[rk].relation = Relations.RELATIONS.get(revRel)[Relations[g]];
                        }
                    })
                }

                project.namedEntities[selection.toLowerCase()].gender = g;
            } else {
                project.namedEntities[selection.toLowerCase()] = {
                    tags: [],
                    gender: g
                };
            }
            updateProject();
        }
    }

    return (
        <div className="boxedContainer staticSize">
            <div className="boxedContainerTop">
                {/* <p className="heading">Assign A Tag/Gender</p> */}
                <div className="tabsContainer" id="assignTagTabsContainer">
                    <div className="tabs" id="assignTagTabs">
                        <div className={tab === 0 ? "tab active" : "tab"} onClick={() => setTab(0)}>Assign Tag</div>
                        <div className={tab === 1 ? "tab active" : "tab"} onClick={() => setTab(1)}>Assign Gender
                        </div>
                    </div>
                </div>
            </div>
            <div id="assignTagMain" className="boxedContainerMain">
                <div className="selectedTextArea">
                    <span>Selected Text</span>
                    <p className="selectedText">{selection}</p>
                </div>
                <div className="tabContainer">
                    <div className="tabContent">
                        <div className="availableTags">
                            {tab === 0 ?
                                availableTags ? Object.keys(availableTags).map((t, i) => <SuggestedTag key={i} tagName={t}
                                    tagDetails={availableTags[t]}
                                    onSelect={() => onSelectTag(t)} />) : "All tags are assigned..."
                                : tab === 1 ?
                                    Genders.map((g, i) => <SuggestedGenders key={i} gender={g}
                                        selected={project.namedEntities[selection.toLowerCase()] && project.namedEntities[selection.toLowerCase()].gender === g}
                                        onSelect={() => onSelectGender(g)} />)
                                    : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
