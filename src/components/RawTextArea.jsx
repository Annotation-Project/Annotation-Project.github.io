import React from 'react'
import { FaAngleUp, FaAngleDown, FaFileUpload } from 'react-icons/fa'

export const RawTextArea = ({ rawParagraph, setRawParagraph, setFileName }) => {
    const [collapsed, setCollapsed] = React.useState(false);

    React.useEffect(()=> {
        setCollapsed(false);
    }, [rawParagraph]);

    const readTextFromFile = e => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            setRawParagraph(e.target.result.split(/\n/g));
        }
        reader.onerror = async (e) => {
            alert(e.target.error);
        }
        reader.readAsText(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    return (
        <div className={collapsed ? "boxedContainer collapsed" : "boxedContainer"}>
            <div className="boxedContainerTop">
                <p className="heading">Write a paragraph or select a file</p>
                <input type="file" name="paragraphFile" id="paragraphFile" accept="text/plain" onChange={readTextFromFile} />
                <label htmlFor="paragraphFile"><FaFileUpload /></label>
                {collapsed ? <FaAngleDown onClick={() => setCollapsed(false)} /> : <FaAngleUp onClick={() => setCollapsed(true)} />}
            </div>
            <div className="paragraphContainer">
                <textarea value={rawParagraph.join('\n')} onChange={(e) => setRawParagraph(e.target.value.split(/\n/g))} className="paragraph" name="paragraph" id="paragraph" placeholder="Type a paragraph or drag a file here..." />
            </div>
        </div>
    )
}
