import { useNavigate } from "react-router-dom";
import ProjectForm from "../projects/projectForm";
import styles from "./newproject.module.css"

function NewProject(){

        const history = useNavigate()

        function createPost(project){
            // initialize cost and services
            project.cost= 0
            project.services = []

            fetch('http://localhost:5000/projects',{
                method:'POST',
                headers:{
                    "content-Type" : "application/json"
                }, body: JSON.stringify(project)
            }).then((resp) => resp.json()).then((data) => {
            console.log(data)
            history('/projects',{state:{message: 'projeto criado com sucesso'}})}).catch(err => console.log(err))
        }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar projeto</h1>
            <p>crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText='Criar projeto'/>
        </div>
    )
}

export default NewProject;