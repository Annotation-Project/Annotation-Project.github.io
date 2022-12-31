import React from 'react';
import { FaFileDownload, FaRegFileAlt } from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';
import { VscJson } from 'react-icons/vsc';
import { MenuItem } from './MenuItem';

export const Header = ({ reset, downloadJSON, downloadTXT }) => {
    return (
        <header className="header" >
            <div className="left">
                <h1>Annotations Project</h1>
            </div>
            <div className="right">
                <MenuItem name={"Reset"} icon={<MdRefresh />} onClick={reset} />
                <MenuItem name={"Download File"} icon={<FaFileDownload />} subMenu={[
                    <MenuItem key={1} name={"Download JSON file"} icon={<VscJson />}  onClick={downloadJSON} />,
                    <MenuItem key={2} name={"Download Text file"} icon={<FaRegFileAlt />} onClick={downloadTXT} />
                ]} />
            </div>
        </header>
    )
}
