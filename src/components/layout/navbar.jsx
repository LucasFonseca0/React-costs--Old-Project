import { Link } from 'react-router-dom';
import styles from './navbar.module.css'
import Container from './container';
import logo from '../../imagens/costs_logo.png'

function Navbar() {
    return(
        <nav className={styles.navbar}>
          <Container customClass='container_vw'>
              <Link to={'/'}><img src={logo}></img></Link>
              <ul className={styles.list}>
                  <li className={styles.item}>
                      <Link to={'/'}>Home</Link>
                  </li>
                  <li className={styles.item}>
                      <Link to={'/projects'}>Projects</Link>
                  </li>
                  <li className={styles.item}>
                      <Link to={'/company'}>Company</Link>
                  </li>
                  <li className={styles.item}>
                      <Link to={'/contact'}>Contact</Link>
                  </li>
              </ul>
          </Container>
        </nav>
    )
}

export default Navbar;