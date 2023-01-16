import React from 'react';
import {TagInput} from "./TagInput";
import {MdClose, MdAdd} from 'react-icons/md'


export const Tag = ({tagName, tagDetails, parent, project, updateProject}) => {
    const [inputOpened, setInputOpened] = React.useState(false);

    const handleColorChange = (e) => {
        tagDetails.color = e.target.value;
        updateProject();
    }

    const handleAddTag = (name, color) => {
        if (tagDetails.children) {
            if (!tagDetails.children[name]) tagDetails.children[name] = {color: color};
        } else {
            tagDetails.children = {
                [name]: {color: color}
            }
        }
        updateProject();
        setInputOpened(false);
    }

    return (
        <div className="tagContainer">
            <div className="tag">
                <p className="tagName">{tagName}</p>
                {inputOpened ? <MdClose onClick={() => setInputOpened(false)}/> : <MdAdd onClick={() => setInputOpened(true)}/>}
                <input type="color" name="colorName" id="colorName" value={tagDetails.color}
                       onChange={handleColorChange}/>
            </div>
            <div className="tagsContainerChild">
                {inputOpened ? <TagInput addTag={handleAddTag}/> : ""}
                {tagDetails.children ? Object.keys(tagDetails.children).map((tag, i) => <Tag key={i} tagName={tag}
                                                                                             tagDetails={tagDetails.children[tag]}
                                                                                             parent={tagDetails.children} project={project} updateProject={updateProject}/>) : ""}
            </div>
        </div>
    )
}