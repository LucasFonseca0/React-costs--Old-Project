import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import Container from './components/layout/container';
import Footer from './components/layout/footer';
import Navbar from './components/layout/navbar';
import Company from './components/pages/company';
import Contact from './components/pages/contact';
import Home from './components/pages/home';
import NewProject from './components/pages/newproject';
import Project from './components/pages/project';
import Projects from './components/pages/projects';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
          <Container customClass={'minHeight'}>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/company" element={<Company/>}></Route>
                <Route exact path="/contact" element={<Contact/>}></Route>
                <Route exact path="/newproject" element={<NewProject/>}></Route>
                <Route exact path="/projects" element={<Projects/>}></Route>
                <Route path="/project/:id" element={<Project/>}></Route>
            </Routes>
          </Container>
      </Router>
        <Footer/>
    </div>
  );
}

export default App;
