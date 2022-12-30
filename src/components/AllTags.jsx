import React from 'react'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { Tag } from './Tag';

export const AllTags = ({ allTags, setAllTags, selectedTags, setSelectedTags }) => {
    const [collapsed, setCollapsed] = React.useState(false);
    const [tagInput, setTagInput] = React.useState('');
    const [colorInput, setColorInput] = React.useState('#FFFFFF');

    const onChangeColor = (name, color) => {
        setAllTags(new Map(allTags.set(name, color)));
    }

    const onSelectTag = (name, isSelected) => {
        if (isSelected) selectedTags.set(name, 0);
        else selectedTags.delete(name);
        setSelectedTags(new Map(selectedTags));
    }

    const addNewTag = ()=> {
        if(tagInput !== '' && colorInput !== '') {
            setAllTags(new Map(allTags.set(tagInput, colorInput)));
            setSelectedTags(new Map(selectedTags.set(tagInput, colorInput)));
            setTagInput('');
            setColorInput('#FFFFFF');
        }
    }

    return (
        <div className={collapsed ? "boxedContainer collapsed" : "boxedContainer"}>
            <div className="boxedContainerTop">
                <p className="heading">All Tags</p>
                {collapsed ? <FaAngleDown onClick={() => setCollapsed(false)} /> : <FaAngleUp onClick={() => setCollapsed(true)} />}
            </div>
            <div className="allTagsContainer">
                {[...allTags.keys()].sort((a,b)=> selectedTags.has(b) - selectedTags.has(a)).map((tag, i) => <Tag key={i} i={i} name={tag} color={allTags.get(tag)} selected={selectedTags.has(tag)} onChangeColor={(color) => onChangeColor(tag, color)} onSelectTag={(isSelected) => onSelectTag(tag, isSelected)} />)}
            </div>
            <div className="boxedContainerBottom">
                <input type="text" name="tagInput" id="tagInput" value={tagInput} onChange={(e)=> setTagInput(e.target.value.trim().toUpperCase())} />
                <input type="color" name="colorInput" id="colorInput"  value={colorInput} onChange={(e)=> setColorInput(e.target.value)} />
                <button className="btn" onClick={addNewTag}>ADD</button>
            </div>
        </div>
    )
}
