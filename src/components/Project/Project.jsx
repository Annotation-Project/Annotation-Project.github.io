import React from 'react'
import NamedEntityTags from "../../constants/NamedEntityTags";
import EventEntityTags from "../../constants/EventEntityTags";
import { ProjectMain } from "./ProjectMain";
import { useNavigate, useParams } from "react-router-dom";
import Apis from "../../constants/Apis";
import { Header } from "../Header";
import { MenuItem } from "../MenuItem";
import { TbFileDownload } from "react-icons/tb";
import { MdRefresh, MdSave } from "react-icons/md";
import { Dialog } from "../Dialog";
import { Download } from "../Download/Download";

export const Project = () => {
    const [savingToDatabase, setSavingToDatabase] = React.useState(false);
    const [projectUpdated, setProjectUpdated] = React.useState(false);
    const [openDownloadDialog, setOpenDownloadDialog] = React.useState(false);

    const [project, setProject] = React.useState({
        paragraph: [],
        namedEntityTags: NamedEntityTags,
        eventEntityTags: EventEntityTags,
        namedEntityAppearances: [],
        eventEntityAppearances: [],
        projectName: '',
        namedEntities: {},
        eventEntities: {},
        relations: {},
    });

    const navigate = useNavigate();
    const { id } = useParams();

    const updateProject = () => {
        setProject({ ...project });
        setProjectUpdated(true);
    }

    const updateDatabase = React.useCallback(() => {
        if (projectUpdated) {
            if (localStorage.getItem('AUTH_TOKEN')) {
                setSavingToDatabase(true);
                fetch(Apis.updateProject.concat(id), {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: localStorage.getItem('AUTH_TOKEN'), project: project })
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
                alert("Session Expired. Please Log In Again.");
                localStorage.removeItem('AUTH_TOKEN');
                sessionStorage.removeItem('ME');
                navigate('/authentication', { replace: true });
            }
        }
    }, [id, navigate, project, projectUpdated])

    React.useEffect(() => {
        if (id && localStorage.getItem('AUTH_TOKEN')) {
            fetch(Apis.getProject.concat(id), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: localStorage.getItem('AUTH_TOKEN') })
            }).then(async (res) => {
                if (res.ok) return res.json();
                throw new Error(await res.text());
            }).then((data) => {
                setProject(data);
            }).catch((err) => {
                alert(err.message)
                navigate(-1);
            });
        } else {
            alert("Session Expired. Please Log In Again.");
            localStorage.removeItem('AUTH_TOKEN');
            sessionStorage.removeItem('ME');
            navigate('/authentication', { replace: true });
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
                        icon={savingToDatabase ? <MdRefresh className="refreshing" /> :
                            <MdSave />}
                        onClick={() => updateDatabase()} /> : ""}
                    <MenuItem name={"Download Files"} icon={<TbFileDownload />}
                        onClick={() => setOpenDownloadDialog(true)} />
                </>
            } />

            {openDownloadDialog ?
                <Dialog onClickOutSide={() => setOpenDownloadDialog(false)}>
                    <Download project={project} />
                </Dialog>
                : ""}

            <ProjectMain
                project={project}
                updateProject={updateProject} />
        </section>
    )
}
