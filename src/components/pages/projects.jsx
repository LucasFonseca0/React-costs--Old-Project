import styles from './projects.module.css'
import Message from "../layout/message";
import { useLocation } from "react-router-dom";
import Container from '../layout/container';
import LinkButton from '../layout/linkbutton';
import ProjectCard from '../projects/projectCard';
import { useState, useEffect } from 'react';
import Loading from '../layout/loading';

function Projects(){

    const location = useLocation()
    let message = false
    if(location.state){
        message=location.state.message
    }

    const [projects,setProjects] = useState([])
    const [removeLoading,setRemoveLoading] = useState(false)
    const [projectMessage,setprojectMessage] = useState('')


    useEffect(() => {
        fetch('http://localhost:5000/projects',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((resp) => resp.json()).then(data => {
            console.log(data)
            setProjects(data)
            setRemoveLoading(true)
        }).catch(err => console.log(err))
    },[])

    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`, {
            method:'DELETE',
            headers:{
                'Content-Type': 'aplication/json'
            },
        }).then(resp => resp.json())
        .then((data) => {
            setProjects(projects.filter((project) => 
                project.id !== id
                
                ))
                setprojectMessage('projeto removido com sucesso!')
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto'/>
            </div>
            {message && <Message msg={message} type={'success'}/>}
            {projectMessage && <Message msg={projectMessage} type={'success'}/>}
            <Container customClass='start'>
            {projects.length > 0 && projects.map((projects) =>(
                    <ProjectCard 
                    name={projects.name}
                    id={projects.id}
                    budget={projects.budget}
                    category={projects.category.name ? projects.category.name:''
                    }
                    handleRemove={removeProject}/>
                )
                )}
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 && 
            
                <p> não há projetos cadastrados</p>
            }
            </Container>

        </div>
    )
}

export default Projects;