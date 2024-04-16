import { useState } from 'react';
import Input from '../form/input';
import SubmitButton from '../form/submitButton';
import styles from '../projects/projectForm.module.css'



function ServiceForm({handleSubmit, btnText, projectData}){

    const [service,setService] = useState({})

    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }
    function handleChange(e){
        setService({...service, [e.target.name] : e.target.value})

    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input type='text'
            text='Nome do serviço'
            name={'name'}
            placeholder={'Insira o nome do serviço'}
            handleOnChange={handleChange}    />
            <Input type='number'
            text='Custo do serviço'
            name={'cost'}
            placeholder={'Insira o Valor total'}
            handleOnChange={handleChange}    />
            <Input type='text'
            text='descriçao do serviço'
            name={'description'}
            placeholder={'descreva o serviço'}
            handleOnChange={handleChange}    />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ServiceForm;