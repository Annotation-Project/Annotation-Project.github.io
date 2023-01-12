import React from 'react'
import {SuggestedTag} from "./SuggestedTag";
import Genders from "../constants/Genders";
import {SuggestedGenders} from "./SuggestedGenders";

export const AssignTag = ({taggedWords, setTaggedWords, allTags, relationEntities, setRelationEntities}) => {
    const [availableTags, setAvailableTags] = React.useState(allTags);
    const [selection, setSelection] = React.useState("");
    const [tab, setTab] = React.useState(0);

    React.useEffect(() => {
        document.onselectionchange = () => {
            setSelection(document.getSelection().toString().trim());
        }
        return () => {
            document.onselectionchange = undefined;
        }
    }, [setSelection]);

    // React.useEffect(()=> {
    //     setTab(0);
    // }, [selection])

    React.useEffect(() => {
        if (selection && taggedWords.has(selection.toLowerCase())) {
            let tmp = [...allTags];
            taggedWords.get(selection.toLowerCase()).tags.forEach(tag => {
                tmp = tmp[tag.index].children;
            });
            setAvailableTags(tmp || []);
            if (!tmp) setTab(1);
        }
        else {
            setAvailableTags(allTags);
            setTab(0);
        }
    }, [allTags, selection, taggedWords]);

    React.useEffect(() => {
        if (availableTags.length === 0) setTab(1);
        else setTab(0);
    }, [availableTags])

    const onSelectTag = (index) => {
        if (selection) {
            if (taggedWords.has(selection.toLowerCase())) {
                setTaggedWords(new Map(taggedWords.set(selection.toLowerCase(), {...taggedWords.get(selection.toLowerCase()), tags: [...taggedWords.get(selection.toLowerCase()).tags, {
                        name: availableTags[index].name,
                        index: index
                    }]})));
            } else {
                [...taggedWords.keys()].forEach(tw => {
                    relationEntities.push({name1: tw, name2: selection}, {name1: selection, name2: tw});
                })
                setRelationEntities([...relationEntities]);
                setTaggedWords(new Map(taggedWords.set(selection.toLowerCase(), {
                    appearances: [],
                    relations: {},
                    tags: [{
                        name: availableTags[index].name,
                        index: index
                    }]
                })));
            }
        }
    }

    const onSelectGender = (g) => {
        if (selection) {
            if (taggedWords.has(selection.toLowerCase())) {
                setTaggedWords(new Map(taggedWords.set(selection.toLowerCase(), {
                    ...taggedWords.get(selection.toLowerCase()), gender: g
                })));
            } else {
                [...taggedWords.keys()].forEach(tw => {
                    relationEntities.push({name1: tw, name2: selection}, {name1: selection, name2: tw});
                })
                setRelationEntities([...relationEntities]);
                setTaggedWords(new Map(taggedWords.set(selection.toLowerCase(), {
                    appearances: [],
                    gender: g,
                    relations: {},
                    tags: []
                })));
            }
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
                    <div className="tabs" id="assignTagTabs">
                        <div className={tab === 0 ? "tab active" : "tab"} onClick={() => setTab(0)}>Assign Tag</div>
                        <div className={tab === 1 ? "tab active" : "tab"} onClick={() => setTab(1)}>Assign Gender</div>
                    </div>
                    <div className="tabContent">
                        {tab === 0 ?
                            <div className="availableTags">
                                {availableTags.length === 0 ?
                                    <p className="message">All tags are assigned for this text...</p>
                                    :
                                    availableTags.map((t, i) => <SuggestedTag key={i} tag={t} onSelect={() => onSelectTag(i)}/>)
                                }
                            </div>
                            : tab === 1 ?
                                <div className="availableTags">
                                {Genders.map((g, i) => <SuggestedGenders key={i} gender={g} selected={taggedWords.has(selection.toLowerCase()) && taggedWords.get(selection.toLowerCase()).gender === g} onSelect={() => onSelectGender(g)}/>)}
                            </div>
                                    : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
