import React from 'react';

export const TagInput = ({addTag}) => {
    const [inputColor, setInputColor] = React.useState('#ffffff');
    const [inputName, setInputName] = React.useState('');

    const onPressEnter = (e) => {
        if (e.key === 'Enter' && inputName !== '') addTag(inputName, inputColor);
    }

    return (
        <div className="tag">
            <input type="text" className="tagName" placeholder="Enter tag name" autoFocus={true} value={inputName} onKeyDown={onPressEnter} onChange={(e) => setInputName(e.target.value.trim().toUpperCase())}/>
            <input type="color" name="colorName" id="colorName" value={inputColor}
                   onChange={(e) => setInputColor(e.target.value)}/>
        </div>
    )
}