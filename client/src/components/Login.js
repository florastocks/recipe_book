import { TextField } from '@mui/material'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Login = () => {

  const [ data, setData ] = useState({
    email: '',
    password: '',
  })
  const [ error, setError ] = useState('')
  const [ login, setLogin ] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await axios.post('/login', data)

      //we get back the token
      const { token } = res.data
      localStorage.setItem('recipes', token)
      // add token to header for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setLogin(true)



    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  } 

  return (
    <main className="form-page">
      <Container>
        <Row>
          <form className='form' onSubmit={handleSubmit}>
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