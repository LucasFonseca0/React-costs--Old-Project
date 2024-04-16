import { useEffect, useState } from 'react'
import Input from '../form/input'
import Select from '../form/select'
import SubmitButton from '../form/submitButton'
import styles from './projectForm.module.css'

function ProjectForm({btnText,handleSubmit, projectData}){
    const[categories, setCategories] = useState([])
    const[project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch('http://localhost:5000/categories' , {
        method: "GET",
        headers: {
            'content-Type' : 'application/json'
        },
    }).then((resp) => resp.json()).then((data) => setCategories(data)).catch(err => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({...project,[e.target.name]: e.target.value})
    }
    function handleCategory(e){
        setProject({...project,category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        },
    })
    }

    return(

        <form onSubmit={submit} className={styles.form}>
            <Input 
            type='text'
            text={'Nome do projeto:'} 
            placeholder='Insira o nome do projeto'
            name={'name'}
            handleOnChange={handleChange}
            value={project.name ? project.name : ''}
             />
            <Input 
            type='number' 
            text={'Orçamento do projeto:'} 
            placeholder='Insira o orçamento total'
            name={'budget'}
            handleOnChange={handleChange}
            value={project.budget ? project.budget : ''}
            />
            <Select 
            name='category_id' 
            text={'Selecione a categoria:'} 
            handleOnChange={handleCategory}
            options={categories}
            value = {project.category ? project.category.id : ''}
            />
           <SubmitButton text={btnText}/> 
        </form>
    )
}

export default ProjectForm