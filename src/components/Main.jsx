import React from 'react';
import {AnnotatedTextArea} from './AnnotatedTextArea';
import {RawTextArea} from './RawTextArea';
import {AllTags} from './AllTags';
import {AssignedTags} from './AssignedTags';
import {AssignTag} from './AssignTag';
import {AssignRelation} from './AssignRelation';

export const Main = ({
    rawParagraph,
    setRawParagraph,
    setFileName,
    taggedWords,
    setTaggedWords,
    allTags,
    sentences,
    sidebarOpen,
    setAllTags,
    relationEntities,
    setRelationEntities
}) => {

    const [tab, setTab] = React.useState(1);

    return (
        <div id="main">
            <div className="left">
                <div className="tabs" id="mainTabs">
                    <div className={tab === 0 ? "tab active" : "tab"} onClick={() => setTab(0)}>Insert Paragraph</div>
                    <div className={tab === 1 ? "tab active" : "tab"} onClick={() => setTab(1)}>Named Entity Annotation</div>
                    <div className={tab === 2 ? "tab active" : "tab"} onClick={() => setTab(2)}>Relationship Annotation</div>
                </div>
                <div className="tabContent">
                    {tab === 0 ?
                        <RawTextArea
                            rawParagraph={rawParagraph}
                            setRawParagraph={setRawParagraph}
                            setFileName={setFileName}/>
                        : tab === 1 ?
                            <>
                                <AssignTag
                                    taggedWords={taggedWords}
                                    setTaggedWords={setTaggedWords}
                                    allTags={allTags}
                                    relationEntities={relationEntities}
                                    setRelationEntities={setRelationEntities}/>

                                <AnnotatedTextArea
                                    sentences={sentences}
                                    taggedWords={taggedWords}
                                    setTaggedWords={setTaggedWords}
                                    allTags={allTags}
                                    rawParagraph={rawParagraph}/>
                            </>
                            : tab === 2 ?
                            <AssignRelation
                                relationEntities={relationEntities} setRelationEntities={setRelationEntities}/>
                                : ""
                    }
                </div>
            </div>
            <div className={(sidebarOpen) ? "right" : "right collapse"}>
                <AssignedTags
                    taggedWords={taggedWords}
                    setTaggedWords={setTaggedWords}
                    allTags={allTags}
                    setRelationEntities={setRelationEntities}/>

                <AllTags
                    allTags={allTags}
                    setAllTags={setAllTags}/>
            </div>
        </div>
    )
}