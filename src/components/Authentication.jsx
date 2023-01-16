import {Login} from "./Login";
import {Signup} from "./Signup";
import React from "react";
import '../styles/Authentication.css';

export const Authentication = () => {
    const [selectedTab, setSelectedTab] = React.useState(0);
    return (
        <section id="authentication" className="screen">
            <div className="main">
                <div id="authenticationLeft" >
                    <h1 className="heading">Annotations Tool</h1>
                    <p className="subHeading">Authenticate yourself to get started.</p>
                </div>
                <div id="authenticationRight" >
                    <div  id="authenticationContainer">
                        <div className="tabsContainer" id="authenticationTabsContainer">
                            <div className="tabs" id="authenticationTabs">
                                <div className={selectedTab === 0 ? "tab active" : "tab"}  id="loginTab"
                                     onClick={(e) => setSelectedTab(0)}>Log In
                                </div>
                                <div className={(selectedTab === 1) ? "tab active" : "tab"} id="signupTab"
                                     onClick={(e) => setSelectedTab(1)}>Sign Up
                                </div>
                            </div>
                        </div>
                        <div className="tabContent">
                            {selectedTab === 0 ? <Login/> : <Signup/>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};