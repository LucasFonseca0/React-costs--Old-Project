import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../layout/container'
import Loading from '../layout/loading'
import Message from '../layout/message'
import ProjectForm from '../projects/projectForm'
import styles from './project.module.css'
import ServiceForm from '../service/serviceForm'
import {parse, v4 as uuidv4} from 'uuid'
import ServiceCard from '../service/serviceCard'

function Project(){

        const {id} = useParams()

        const [project,setProject] = useState([])
        const [showProjectForm,setshowProjectForm] = useState(false)
        const [showServiceForm,setshowSeviceForm] = useState(false)
        const[message,setMessage] = useState()
        const[type,setType] = useState()
        const[services,setservices] = useState([])

        useEffect(() => {

            setTimeout(() => {
                fetch(`http://localhost:5000/projects/${id}`,{
                method:'GET',
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(resp => resp.json()).then(data => {
                setProject(data)
                setservices(data.services)
            }).catch(err => console.log(err))
            },  1000);

        },[id])


        function editPost(project){

            setMessage(false)

            if(project.budget < project.cost){
                setMessage('O orçamento não pode ser menor que o custo do projeto')
                setType('error')
                setTimeout(() => {
                    setMessage(false)
                }, 3010);
                return false
            }
                fetch(`http://localhost:5000/projects/${project.id}`,{
                    method: 'PATCH',
                    headers:{
                        'Content-type' : 'application/json'
                    },
                    body: JSON.stringify(project),
                    
                }).then(resp => resp.json())
                .then(data => {
                    setProject(data)
                    setshowProjectForm(false)
                    setMessage('Projeto atualizado')
                    setType('success')
                })
                .catch(err => console.log(err))
            
        }

        function createService(project) {
            setMessage(false)
            const lastService = project.services[project.services.length -1]

            lastService.id = uuidv4()

            const lastServiceCost = lastService.cost

            const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

            if(newCost > parseFloat(project.budget))    {
                setMessage('Orçamento ultrapassado')
                setType('error')
                project.services.pop()
                return(false)
            }

            // add service cost to project total cost
            project.cost = newCost

            fetch(`http://localhost:5000/projects/${id}`,{
                method:'PATCH',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(project)
            }).then(response => response.json()).then(
                data => {
                    setshowSeviceForm(false)
                }
            ).catch(err => console.log(err))

        }
        function toggleProjectForm() {
            setshowProjectForm(!showProjectForm)
        }
        function toggleServiceForm() {
            setshowSeviceForm(!showServiceForm)
        }
        function removeService(id,cost) {

            setMessage(false)

            const serviceUpdated = project.services.filter(service => service.id !== id)

            const projectUpdated = project

        projectUpdated.services  =serviceUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
            method:'PATCH',
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(projectUpdated)
        }).then(resp => resp.json())
        .then(data => {
            setProject(projectUpdated)
            setservices(serviceUpdated)
            setMessage('Serviço removido com sucesso')
            setType('success')
        })
        .catch(err => console.log(err))
        }

        

    return(
        <>

            
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass='column'>
                        {message && <Message type={type}
                        msg ={message}/>}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button
                            className={styles.btn} onClick={toggleProjectForm}>{showProjectForm ? ('Fechar') : ('Editar Projeto')}</button>
                            {!showProjectForm ? (
                                <div  className={styles.project_info}>
                                    <p><span>Categoria: </span> {project.category.name}</p>
                                    <p>
                                        <span>Total de orçamento: </span>R$ {project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado: </span>R$ {project.cost}
                                    </p>
                                    </div>
                            ) : (
                                <div className={styles.project_info}>
                                     <ProjectForm handleSubmit={editPost} btnText={'Concluir edição'}
                                     projectData={project}/>
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>adicione um serviço</h2>
                            <button
                            className={styles.btn} onClick={toggleServiceForm}>{showServiceForm ? ('Fechar') : ('Adicionar serviço')}</button>
                            <div className={styles.project_info}>
                                {showServiceForm && 
                                    <ServiceForm handleSubmit={createService}
                                    btnText={'Adicionar serviço'}
                                    projectData={project}/>
                                 }
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass={'start'}>
                            
                                {services.length > 0 ? (
                                    project.services.map((services) =>(
                                        <ServiceCard
                                        id={services.id}
                                        name={services.name}
                                        cost={services.cost}
                                        description={services.description}
                                        key={services.id}
                                        handleRemove={removeService}
                                        />
                                
                                ))) : (<p>não há serviços cadastrados</p>)}
                            
                        </Container>
                    </Container>
                </div>
             ): (
                <div className={styles.loading}><Loading/></div>
                
            )}
        </>
    )
}

export default Project