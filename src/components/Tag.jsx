import React from 'react'

export const Tag = ({ name, color, selected, onChangeColor, onSelectTag, i }) => {

    return (
        <div className="tag">
            <input type="checkbox" name={"selectedTag" + i} id={"selectedTag" + i} checked={selected} onChange={(e) => onSelectTag(e.target.checked)} />
            <label htmlFor={"selectedTag" + i} className="tagName">{name}</label>
            <input type="color" name="colorName" id="colorName" value={color} onChange={(e) => onChangeColor(e.target.value)} />
        </div>
    )
}
