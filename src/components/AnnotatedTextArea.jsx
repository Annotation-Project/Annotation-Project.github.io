import React from 'react';
import {Line} from './Line';
import '../styles/AnnotatedTextArea.css'

export const AnnotatedTextArea = ({ project, updateProject}) => {
    const [sentences, setSentences] = React.useState([]);

    React.useEffect(() => {
        setSentences(project.paragraph.map(p => p.split(/\t/g).at(-1)));
    }, [project])

    return (
        <div className="boxedContainer">
            <div className="boxedContainerTop">
                <p className="heading">Annotations</p>
            </div>
            <div id="annotationsContainerExtra" className="boxedContainerMain">
                <div className="annotationsContainer" id={"temp"}>
                    {sentences.map((sentence, i) => <Line key={i} sentence={sentence} sNo={i} project={project} updateProject={updateProject}/>)}
                </div>
            </div>
        </div>
    )
}