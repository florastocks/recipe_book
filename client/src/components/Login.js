import { TextField } from '@mui/material'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Login = () => {
  return (
    <main className="form-page">
      <Container>
        <Row>
          <form className='form'>
            <h3 className='form-header'>Login</h3>
            <TextField required className='form-input' name='email' label="Email" />
            <TextField required className='form-input' name='password' label="Password" />
            <input type="submit" value="Login" className='submit-btn' />
          </form>
        </Row>
      </Container>
    </main>
  )
}

export default Login