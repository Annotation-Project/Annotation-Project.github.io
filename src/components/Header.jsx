import React from 'react';
import { FaFileDownload, FaRegFileAlt } from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';
import { VscJson } from 'react-icons/vsc';
import { MenuItem } from './MenuItem';

export const Header = () => {
    return (
        <header className="header" >
            <div className="left">
                <h1>Annotations Project</h1>
            </div>
            <div className="right">
                <MenuItem name={"Reset"} icon={<MdRefresh />} />
                <MenuItem name={"Download File"} icon={<FaFileDownload />} subMenu={[
                    <MenuItem key={1} name={"Download JSON file"} icon={<VscJson />} />,
                    <MenuItem key={2} name={"Download Text file"} icon={<FaRegFileAlt />} />
                ]} />
            </div>
        </header>
    )
}
