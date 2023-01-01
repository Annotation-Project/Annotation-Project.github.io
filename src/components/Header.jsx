import React from 'react';
import { FaRegFileAlt, FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';
import { VscJson } from 'react-icons/vsc';
import { MenuItem } from './MenuItem';
import { TbFileDownload } from 'react-icons/tb'

export const Header = ({ sidebar, toggleSidebar, reset, downloadJSON, downloadTXT }) => {
    return (
        <header className="header" >
            <div className="left">
                <h1>Annotation Tool</h1>
            </div>
            <div className="right">
                <MenuItem name={"Reset"} icon={<MdRefresh />} onClick={reset} />
                <MenuItem name={"Download File"} icon={<TbFileDownload />} subMenu={[
                    <MenuItem key={1} name={"Download JSON file"} icon={<VscJson />} onClick={downloadJSON} />,
                    <MenuItem key={2} name={"Download Text file"} icon={<FaRegFileAlt />} onClick={downloadTXT} />
                ]} />
                <MenuItem icon={(sidebar) ? <FaCaretRight /> : <FaCaretLeft />} onClick={toggleSidebar} />
            </div>
        </header>
    )
}
