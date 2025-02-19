import styles from './message.module.css'
import { useState, useEffect } from 'react';

function Message({type,msg}){

    const[visible,setVisible] = useState(false)

    useEffect(() => {
        if(!msg){
            setVisible(false)
            return
        }
        else{
            setVisible(true)
            const timer = setTimeout(() => {
                setVisible(false)
            }, 3000);

            return () => clearTimeout(timer)
        }
    },{msg})

    return(
        <>
        {visible && <div className={`${styles.message} ${styles[type]}`}>
            {msg}
        </div>}
        </>
        
    )
}

export default Message;