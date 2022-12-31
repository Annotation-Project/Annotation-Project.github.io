import React from 'react';
import { TwTag } from './TwTag';

export const TaggedWord = ({ text, tags, remove, allTags }) => {
    return (
        <div className="tagWord" /* style={{backgroundColor: allTags.get(tw.tag)}} */>
            <div className="tagWordDetails">
                <p>{text}</p>
                <div className="twTagsContainer">
                    {tags.map(t=> <TwTag tag={t} color={allTags.get(t)} remove={()=> remove(t)} />)}
                </div>
            </div>
        </div>
    )
}
