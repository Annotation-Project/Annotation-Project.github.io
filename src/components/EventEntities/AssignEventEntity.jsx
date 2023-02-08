import React from 'react'
import {SuggestedTag} from "../SuggestedTag";

export const AssignEventEntity = ({project, updateProject}) => {
    const [availableTags, setAvailableTags] = React.useState({});
    const [selection, setSelection] = React.useState("");

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
        if (selection && project.eventEntities[selection.toLowerCase()]) {
            let tmp = project.eventEntityTags;
            project.eventEntities[selection.toLowerCase()].tags.forEach(tag => {
                tmp = tmp[tag].children;
            });
            setAvailableTags(tmp);
        } else {
            setAvailableTags(project.eventEntityTags);
        }
    }, [project, selection]);

    const onSelectTag = (tag) => {
        if (selection) {
            if (project.eventEntities[selection.toLowerCase()]) {
                project.eventEntities[selection.toLowerCase()].tags.push(tag);
            } else {
                project.eventEntities[selection.toLowerCase()] = {
                    tags: [tag]
                }

                project.paragraph.forEach((paragraph, i) => {
                    const matches = [...paragraph.split(/\t/).at(-1)
                        .matchAll(new RegExp(`${/\w/.test(selection.at(0)) ? '\\b' : '\\B'}${selection.replace(/[\s\W]/g, '[\\s\\W]')}${/\w/.test(selection.at(-1)) ? '\\b' : '\\B'}`, 'gi'))];

                    if (matches.length > 0) {
                        project.eventEntityAppearances[i].push({
                            text: selection,
                            indices: matches.map(m => m.index)
                        });
                    }
                })
            }
            updateProject();
        }
    }

    return (
        <div className="boxedContainer staticSize">
            <div className="boxedContainerTop">
                <p className="heading">Assign An Event</p>
            </div>
            <div id="assignTagMain" className="boxedContainerMain">
                <div className="selectedTextArea">
                    <span>Selected Text</span>
                    <p className="selectedText">{selection}</p>
                </div>
                <div className="tabContainer">
                    <div className="tabContent">
                        <div className="availableTags">
                            {availableTags ?
                                Object.keys(availableTags).map((t, i) => <SuggestedTag key={i} tagName={t}
                                                                                       tagDetails={availableTags[t]}
                                                                                       onSelect={() => onSelectTag(t)}/>)
                                :
                                <p className="message">All tags are assigned for this text...</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
