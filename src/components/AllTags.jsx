import React from 'react'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { Tag } from './Tag';
import { MdSearch, MdClose, MdAdd } from 'react-icons/md'


export const AllTags = ({ allTags, setAllTags, selectedTags, setSelectedTags }) => {
    const [collapsed, setCollapsed] = React.useState(false);
    const [searchOpen, setSearchOpen] = React.useState(false);
    const [addOpen, setAddOpen] = React.useState(false);
    const [searchFilter, setSearchFilter] = React.useState("");
    const [tagInput, setTagInput] = React.useState('');
    const [colorInput, setColorInput] = React.useState('#FFFFFF');

    React.useEffect(() => {
        setSearchFilter("");
        if(searchOpen) {
            setAddOpen(false);
            setCollapsed(false);
        }
    }, [searchOpen]);

    React.useEffect(() => {
        setTagInput('');
        if(addOpen) {
            setSearchOpen(false);
            setCollapsed(false);
        }
    }, [addOpen]);

    const onChangeColor = (name, color) => {
        setAllTags(new Map(allTags.set(name, color)));
    }

    const onSelectTag = (name, isSelected) => {
        if (isSelected) selectedTags.set(name, 0);
        else selectedTags.delete(name);
        setSelectedTags(new Map(selectedTags));
    }

    const addNewTag = () => {
        if (tagInput !== '' && colorInput !== '') {
            setAllTags(new Map(allTags.set(tagInput, colorInput)));
            setSelectedTags(new Map(selectedTags.set(tagInput, colorInput)));
            setTagInput('');
            setColorInput('#FFFFFF');
            setAddOpen(false);
        }
    }

    return (
        <div className={collapsed ? "boxedContainer collapsed" : "boxedContainer"}>
            <div className="boxedContainerTopExtra">
                <div className="boxedContainerTop">
                    {searchOpen ? <input autoFocus type="text" name="allTagsSearch" className="searchBox" placeholder="Search here..." value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} /> : <p className="heading">All Tags</p>}
                    {searchOpen ? <MdClose onClick={() => setSearchOpen(false)} /> : <MdSearch onClick={() => setSearchOpen(true)} />}
                    {addOpen ? <MdClose onClick={() => setAddOpen(false)} /> : <MdAdd onClick={() => setAddOpen(true)} />}
                    {collapsed ? <FaAngleDown onClick={() => setCollapsed(false)} /> : <FaAngleUp onClick={() => setCollapsed(true)} />}
                </div>
                {(addOpen) ?
                    <div className="boxedContainerTop">
                        <input type="text" name="tagInput" id="tagInput" placeholder="Enter tag name" value={tagInput} onChange={(e) => setTagInput(e.target.value.trim().toUpperCase())} />
                        <input type="color" name="colorInput" id="colorInput" value={colorInput} onChange={(e) => setColorInput(e.target.value)} />
                        <button className="btn" onClick={addNewTag}>ADD</button>
                    </div> : ""
                }
            </div>
            <div className="allTagsContainer">
                {[...allTags.keys()].filter((t) => t.toLowerCase().includes(searchFilter.toLowerCase())).sort((a, b) => selectedTags.has(b) - selectedTags.has(a)).map((tag, i) => <Tag key={i} i={i} name={tag} color={allTags.get(tag)} selected={selectedTags.has(tag)} onChangeColor={(color) => onChangeColor(tag, color)} onSelectTag={(isSelected) => onSelectTag(tag, isSelected)} />)}
            </div>
        </div>
    )
}
