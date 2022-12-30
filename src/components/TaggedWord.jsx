import React from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';

export const TaggedWord = ({ tw, remove, allTags }) => {
    return (
        <div className="tagWord" style={{backgroundColor: allTags.get(tw.tag)}}>
            <div className="tagWordDetails">
                <p>{tw.text}</p>
                <span>{tw.tag}</span>
            </div>
            <FaRegTimesCircle onClick={(e)=> remove(tw)} />
        </div>
    )
}
