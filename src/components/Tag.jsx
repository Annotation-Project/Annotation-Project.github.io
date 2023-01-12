import React from 'react';
import {TagInput} from "./TagInput";
import {MdClose, MdAdd} from 'react-icons/md'


export const Tag = ({tag, searchFilter, allTags, setAllTags, onChangeColor}) => {
    const [expanded, setExpanded] = React.useState(false);
    const handleColorChange = (i, color) => {
        setTimeout(() => {
            tag.children[i].color = color;
            setAllTags([...allTags]);
        }, 1000);
    }

    const handleAddTag = (name, color) => {
        tag.children = tag.children ? [...tag.children, {name: name, color: color}] : [{name: name, color: color}];
        setExpanded(false);
        setAllTags([...allTags]);
    }

    return (
        <div className="tagContainer">
            <div className="tag">
                <p className="tagName">{tag.name}</p>
                {expanded ? <MdClose onClick={() => setExpanded(false)}/> : <MdAdd onClick={() => setExpanded(true)}/>}
                <input type="color" name="colorName" id="colorName" value={tag.color}
                       onChange={(e) => onChangeColor(e.target.value)}/>
            </div>
            <div className="tagsContainerChild">
                {expanded ? <TagInput addTag={handleAddTag}/> : ""}
                {tag.children ? tag.children.map((tag, i) => <Tag key={i} tag={tag}
                                                                  searchFilter={searchFilter}
                                                                  allTags={allTags}
                                                                  setAllTags={setAllTags}
                                                                  onChangeColor={(color) => handleColorChange(i, color)}/>) : ""}
            </div>
        </div>
    )
}