import Navbar from 'react-bootstrap/Navbar'
import Nav from  'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Avatar } from '@mui/material'

const Header = () => {
  return (
    <Navbar id='navbar-container'>
      <Navbar.Brand as={Link} to='/' className='brand'>Recipes</Navbar.Brand>
      <Nav.Link as={Link} to='/allrecipes'>All Recipes</Nav.Link>
      <NavDropdown title={<Avatar />} className="nav-drop" >
        <NavDropdown.Item as={Link} to='/login'>Login</NavDropdown.Item>
        <NavDropdown.Item as={Link} to='/register'>Register</NavDropdown.Item>
        <NavDropdown.Item as={Link} to='/userprofile'>Profile Page</NavDropdown.Item>
      </NavDropdown>
    </Navbar>
    
  )
}

export default Header