import React from 'react'
import { FaAngleUp, FaAngleDown, FaFileUpload } from 'react-icons/fa'

export const RawTextArea = ({ rawParagraph, setRawParagraph }) => {
    const [collapsed, setCollapsed] = React.useState(false);

    const readTextFromFile = e => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            setRawParagraph(e.target.result);
        }
        reader.onerror = async (e) => {
            alert(e.target.error);
        }
        reader.readAsText(e.target.files[0]);
    }

    return (
        <div className={collapsed ? "boxedContainer collapsed" : "boxedContainer"}>
            <div className="boxedContainerTop">
                <p className="heading">Write a paragraph or select a file</p>
                <div className="icons">
                    <input type="file" name="paragraphFile" id="paragraphFile" accept="text/plain" onChange={readTextFromFile} />
                    <label htmlFor="paragraphFile"><FaFileUpload /></label>
                    {collapsed ? <FaAngleDown onClick={() => setCollapsed(false)} /> : <FaAngleUp onClick={() => setCollapsed(true)} />}
                </div>
            </div>
            <div className="paragraphContainer">
                <textarea value={rawParagraph} onChange={(e) => setRawParagraph(e.target.value)} className="paragraph" name="paragraph" id="paragraph" placeholder="Type a paragraph or drag a file here..." />
            </div>
        </div>
    )
}
