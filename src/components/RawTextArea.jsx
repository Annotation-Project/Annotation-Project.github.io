import React from 'react';
import { TbFileUpload } from 'react-icons/tb';

export const RawTextArea = ({ rawParagraph, setRawParagraph, setFileName }) => {

    const readTextFromFile = e => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            setRawParagraph(e.target.result.trim().split(/\n/g));
        }
        reader.onerror = async (e) => {
            alert(e.target.error);
        }
        reader.readAsText(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    return (
        <div className="boxedContainer">
            <div className="boxedContainerTop">
                <p className="heading">Write a paragraph or select a file</p>
                <input type="file" name="paragraphFile" id="paragraphFile" accept="text/plain" onChange={readTextFromFile} />
                <label htmlFor="paragraphFile"><TbFileUpload /></label>
            </div>
            <div id="paragraphContainer" className="boxedContainerMain">
                <textarea value={rawParagraph.join('\n')} onChange={(e) => setRawParagraph(e.target.value.split(/\n/g))} className="paragraph" name="paragraph" id="paragraph" placeholder="Type a paragraph or drag a file here..." />
            </div>
        </div>
    )
}
