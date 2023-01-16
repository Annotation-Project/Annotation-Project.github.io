import React from 'react'
import {SuggestedTag} from "./SuggestedTag";
import Genders from "../constants/Genders";
import {SuggestedGenders} from "./SuggestedGenders";
import Relations from "../constants/Relations";

export const AssignTag = ({project, updateProject}) => {
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
        if (selection && project.words[selection.toLowerCase()]) {
            let tmp = project.tags;
            project.words[selection.toLowerCase()].tags.forEach(tag => {
                tmp = tmp[tag].children;
            });
            setAvailableTags(tmp);
            if (!tmp) setTab(1);
        } else {
            setAvailableTags(project.tags);
            setTab(0);
        }
    }, [project, selection]);

    const onSelectTag = (tag) => {
        if (selection) {
            if (project.words[selection.toLowerCase()]) {
                project.words[selection.toLowerCase()].tags.push(tag);
            } else {
                project.words[selection.toLowerCase()] = {
                    tags: [tag]
                }

                project.paragraph.forEach((paragraph, i) => {
                    const matches = [...paragraph.split(/\t/).at(-1)
                        .matchAll(new RegExp(`${/\w/.test(selection.at(0)) ? '\\b' : '\\B'}${selection.replace(/[\s\W]/g, '[\\s\\W]')}${/\w/.test(selection.at(-1)) ? '\\b' : '\\B'}`, 'gi'))];

                    if (matches.length > 0) {
                        project.appearances[i].push({
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
            if (project.words[selection.toLowerCase()]) {
                if (project.words[selection.toLowerCase()].gender) {
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

                project.words[selection.toLowerCase()].gender = g;
            } else {
                project.words[selection.toLowerCase()] = {
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
                <p className="heading">Assign A Tag/Gender</p>
            </div>
            <div id="assignTagMain" className="boxedContainerMain">
                <div className="selectedTextArea">
                    <span>Selected Text</span>
                    <p className="selectedText">{selection}</p>
                </div>
                <div className="tabContainer">
                    <div className="tabsContainer" id="assignTagTabsContainer">
                        <div className="tabs" id="assignTagTabs">
                            <div className={tab === 0 ? "tab active" : "tab"} onClick={() => setTab(0)}>Assign Tag</div>
                            <div className={tab === 1 ? "tab active" : "tab"} onClick={() => setTab(1)}>Assign Gender
                            </div>
                        </div>
                    </div>
                    <div className="tabContent">
                        {tab === 0 ?
                            <div className="availableTags">
                                {availableTags ?
                                    Object.keys(availableTags).map((t, i) => <SuggestedTag key={i} tagName={t}
                                                                                           tagDetails={availableTags[t]}
                                                                                           onSelect={() => onSelectTag(t)}/>)
                                    :
                                    <p className="message">All tags are assigned for this text...</p>
                                }
                            </div>
                            : tab === 1 ?
                                <div className="availableTags">
                                    {Genders.map((g, i) => <SuggestedGenders key={i} gender={g}
                                                                             selected={project.words[selection.toLowerCase()] && project.words[selection.toLowerCase()].gender === g}
                                                                             onSelect={() => onSelectGender(g)}/>)}
                                </div>
                                : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
