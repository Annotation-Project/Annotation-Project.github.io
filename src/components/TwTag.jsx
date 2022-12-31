import React from 'react';
import { MdOutlineClose } from 'react-icons/md';

export const TwTag = ({tag, color, remove}) => {
  return (
    <div className="twTag" style={{backgroundColor: color}}>
        <span>{tag}</span>
        <MdOutlineClose onClick={remove} />
    </div>
  )
}
