import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';


const BlogNavbar = ({theme, toggleTheme}) => {

  return (
    <Navbar
        variant={theme.type}
        className="fj-navbar fj-nav-base"
        bg="transparent"
        expand="lg" >
        <Navbar.Brand className="fj-navbar-brand">
          <Link href="/" style={{color: theme.fontColor}}>
          Filip-Jerga
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
            <Nav.Link
            
            as={() => 
              <Link href='/' className="fj-navbar-item fj-navbar-link">
              Home
              </Link>
            }>
            </Nav.Link>
            <button className='btn btn-success' onClick={toggleTheme}>{theme.type}</button>
        </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default BlogNavbar