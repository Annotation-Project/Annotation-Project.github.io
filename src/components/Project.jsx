import React from 'react'
import DefaultTags from "../constants/DefaultTags";
import {ProjectMain} from "./ProjectMain";
import {useNavigate, useParams} from "react-router-dom";
import Apis from "../constants/Apis";
import {Header} from "./Header";
import {MenuItem} from "./MenuItem";
import {TbFileDownload} from "react-icons/tb";
import {MdRefresh, MdSave} from "react-icons/md";
import {Dialog} from "./Dialog";
import {Download} from "./Download";

export const Project = () => {
    const [savingToDatabase, setSavingToDatabase] = React.useState(false);
    const [projectUpdated, setProjectUpdated] = React.useState(false);
    const [openDownloadDialog, setOpenDownloadDialog] = React.useState(false);

    const [project, setProject] = React.useState({
        paragraph: [],
        tags: DefaultTags,
        words: {},
        appearances: [],
        relations: {},
        filename: ''
    });

    const navigate = useNavigate();
    const {id} = useParams();


    // const [allLanguages, setAllLanguages] = React.useState(Object.keys(Languages));
    // const [selectedLanguage, setSelectedLanguage] = React.useState(localStorage.getItem('language') || allLanguages[0]);

    const updateProject = () => {
        setProject({...project});
        setProjectUpdated(true);
    }

    const updateDatabase = React.useCallback(() => {
        if (projectUpdated) {
            if (localStorage.getItem('AUTH_TOKEN') && sessionStorage.getItem('ME')) {
                setSavingToDatabase(true);
                fetch(Apis.updateProject.concat(id), {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({token: localStorage.getItem('AUTH_TOKEN'), project: project})
                }).then(async (res) => {
                    if (res.ok) return res.json();
                    throw new Error(await res.text());
                }).then((data) => {
                    setSavingToDatabase(false);
                    setProjectUpdated(false);
                    setProject(data);
                }).catch((err) => {
                    setSavingToDatabase(false);
                    alert(err.message)
                });
            } else {
                navigate('/authentication', {replace: true});
            }
        }
    }, [id, navigate, project, projectUpdated])

    React.useEffect(() => {
        if (id && localStorage.getItem('AUTH_TOKEN') && sessionStorage.getItem('ME')) {
            fetch(Apis.getProject.concat(id), {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token: localStorage.getItem('AUTH_TOKEN')})
            }).then(async (res) => {
                if (res.ok) return res.json();
                throw new Error(await res.text());
            }).then((data) => {
                setProject(data);
            }).catch((err) => {
                alert(err.message)
            });
        } else {
            navigate('/authentication', {replace: true});
        }
    }, [id, navigate]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            updateDatabase();
        }, 300000);
        return () => clearInterval(interval);
    }, [updateDatabase])

    return (
        <section id="project" className="screen">
            <Header children={
                <>
                    {projectUpdated ? <MenuItem name={"Save"}
                                                icon={savingToDatabase ? <MdRefresh className="refreshing"/> :
                                                    <MdSave/>}
                                                onClick={() => updateDatabase()}/> : ""}
                    <MenuItem name={"Download Files"} icon={<TbFileDownload/>}
                              onClick={() => setOpenDownloadDialog(true)}/>
                </>
            }/>

            {openDownloadDialog ?
                <Dialog onClickOutSide={() => setOpenDownloadDialog(false)}>
                    <Download project={project}/>;
                </Dialog>
                : ""}

            <ProjectMain
                project={project}
                updateProject={() => updateProject()}/>
        </section>
    )
}
