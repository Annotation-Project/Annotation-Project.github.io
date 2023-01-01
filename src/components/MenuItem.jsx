import React from 'react'

export const MenuItem = ({ name, icon, subMenu, onClick }) => {
    return (
        <div className={(subMenu) ? "menuItem hasChild" : "menuItem"} onClick={onClick}>
            {icon}
            {(name) ? <p>{name.toUpperCase()}</p> : ""}
            {(subMenu) ?
                <div className="subMenuContainer">
                    {subMenu}
                </div> : ""
            }
        </div>
    )
}
