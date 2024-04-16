import styles from './linkbutton.module.css'
import { Link } from 'react-router-dom';

function LinkButton({to, text}) {
    return(
        <div>
            <Link className={styles.bnt} to={to}>
                {text}
            </Link>
        </div>
    )
}

export default LinkButton;