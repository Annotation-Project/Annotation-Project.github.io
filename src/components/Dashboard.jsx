import React from 'react';
import '../styles/Dashboard.css';
import Apis from "../constants/Apis";
import NamedEntityTags from "../constants/NamedEntityTags";
import EventEntityTags from "../constants/EventEntityTags";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { MenuItem } from "./MenuItem";
import { MdAdd, MdDone, MdRefresh, MdLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Dialog } from "./Dialog";
import { TbFileUpload } from "react-icons/tb";
import { ProjectItem } from "./ProjectItem";

export const Dashboard = () => {
    const [creatingProject, setCreatingProject] = React.useState(false);
    const [openInput, setOpenInput] = React.useState(false);
    const [projectName, setProjectName] = React.useState('');
    const [ME, setME] = React.useState({});
    const [text, setText] = React.useState('');

    const [projects, setProjects] = React.useState([]);
    const navigate = useNavigate();

    const fetchProjects = React.useCallback(() => {
        fetch(Apis.allProjects, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: localStorage.getItem('AUTH_TOKEN') })
        }).then(async (res) => {
            if (res.ok) return res.json();
            throw new Error(await res.text());
        }).then((data) => {
            setProjects([...data]);
        }).catch((err) => {
            console.log(err.message);
            fetchProjects();
        });
    }, []);

    React.useEffect(() => {
        if (localStorage.getItem('AUTH_TOKEN') && sessionStorage.getItem('ME')) {
            setME(JSON.parse(sessionStorage.getItem('ME')));
            fetchProjects();
        } else if (localStorage.getItem('AUTH_TOKEN')) {
            fetch(Apis.tokenLogin, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: localStorage.getItem('AUTH_TOKEN') })
            }).then(async (res) => {
                if (res.ok) return res.json();
                throw new Error(await res.text());
            }).then((data) => {
                setME(data.user);
                fetchProjects();
                sessionStorage.setItem("ME", JSON.stringify(data.user));
                localStorage.setItem("AUTH_TOKEN", data.token);
            }).catch((err) => {
                console.error(err);
                navigate('/authentication', { replace: true });
            });
        } else {
            navigate('/authentication', { replace: true });
        }
    }, [navigate, fetchProjects]);

    React.useEffect(() => {
        setProjectName('');
        setText('');
        setCreatingProject(false);
    }, [openInput])

    const readTextFromFile = (e) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            setText(e.target.result.trim().split(/\n/g).join('\n'));
        }
        reader.onerror = async (e) => {
            alert(e.target.error);
        }
        reader.readAsText(e.target.files[0]);
        setProjectName(e.target.files[0].name.split('.')[0].trim());
    }

    const handleProjectCreate = () => {
        if (text.trim()) {
            setCreatingProject(true);
            if (localStorage.getItem('AUTH_TOKEN')) {
                const splits = text.split(/\n/g);
                const proj = {
                    paragraph: splits,
                    namedEntityTags: NamedEntityTags,
                    eventEntityTags: EventEntityTags,
                    namedEntityAppearances: Array.from({ length: splits.length }, () => []),
                    eventEntityAppearances: Array.from({ length: splits.length }, () => []),
                    projectName: projectName
                }
                fetch(Apis.addProject, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: localStorage.getItem('AUTH_TOKEN'), project: proj })
                }).then(async (res) => {
                    if (res.ok) return res.json();
                    throw new Error(await res.text());
                }).then((data) => {
                    setProjects([data, ...projects]);
                    setOpenInput(false);
                }).catch((err) => {
                    setCreatingProject(false)
                    alert(err.message)
                });
            } else {
                navigate('/authentication', { replace: true });
            }
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('AUTH_TOKEN');
        sessionStorage.removeItem('ME');
        navigate('/authentication');
    }

    return (
        < section id="dashboard" className="screen" >
            <Header>
                <MenuItem name={"New"} icon={<MdAdd />} onClick={() => setOpenInput(true)} />
            </Header>
            {
                openInput ? <Dialog onClickOutSide={() => setOpenInput(creatingProject)}>
                    <div id="rawParagraphContainer">
                        <div className="boxedContainerTop">
                            <p className="heading">Create New Projrct</p>
                            <input type="file" name="paragraphFile" id="paragraphFile" accept="text/plain"
                                onChange={readTextFromFile} />
                            <label htmlFor="paragraphFile"><TbFileUpload /></label>
                            {creatingProject ? <MdRefresh className="refreshing" /> :
                                <MdDone onClick={handleProjectCreate} />}
                        </div>
                        <div id="paragraphContainer" className="boxedContainerMain">
                            <input className="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Enter project name..."/>
                            <textarea className="paragraph" name="paragraph" id="paragraph"
                                placeholder="Type a paragraph or drag a file here..." value={text}
                                onChange={(e) => setText(e.target.value)} />
                        </div>
                    </div>
                </Dialog> : ""
            }
            <div className="main">
                <div className="sidebar">
                    <div id="profilePicContainer">
                        <FaUserCircle id="profilePic" />
                    </div>
                    <div id="userDetails">
                        <p className="userName">{ME.name}</p>
                        <p className="userEmail">{ME.email}</p>
                    </div>
                    <button onClick={handleLogout}><MdLogout /> Log out</button>
                </div>
                <div className="content">
                    {projects.length > 0 ? projects.map((p, i) => <ProjectItem key={i} project={p}
                        onClick={() => navigate(`/projects/${p._id}`)} />)
                        : <p className="message">Please wait while the projects are loading...</p>
                    }
                </div>
            </div>
        </section >
    )
}
