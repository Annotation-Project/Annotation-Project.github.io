import React from 'react';
import {FaCaretLeft, FaCaretRight} from 'react-icons/fa';
import {MdRefresh} from 'react-icons/md';
import {MenuItem} from './MenuItem';
import {TbFileDownload} from 'react-icons/tb'

export const Header = ({reset, openDownloadDialog, sidebar, toggleSidebar, rawParagraph}) => {

    return (<header id="header">
        <div className="left">
            <h1>Annotation Tool</h1>
        </div>
        <div className="right">
            <MenuItem name={"Reset"} icon={<MdRefresh/>} onClick={() => reset()}/>
            {rawParagraph.length > 0 ?
                <MenuItem name={"Download Files"} icon={<TbFileDownload/>} onClick={openDownloadDialog}/> : ""}
            <MenuItem icon={(sidebar) ? <FaCaretRight/> : <FaCaretLeft/>} onClick={() => toggleSidebar(!sidebar)}/>
        </div>
    </header>)
}