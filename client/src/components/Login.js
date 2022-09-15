import { TextField } from '@mui/material'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = () => {

  const [ data, setData ] = useState({
    email: '',
    password: '',
  })
  const [ error, setError ] = useState('')
  const [ login, setLogin ] = useState(false)
  const [ currentUser, setCurrentUser ] = useState()

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    console.log(axios.defaults.headers.common)
    try {
      const res = await axios.post('/api/auth/login/', data)
      //we get back the token
      const { token } = res.data
      localStorage.setItem('recipes', token)
      // add token to header for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setLogin(true)
      setCurrentUser(data.id)
      console.log(data)
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
            <TextField required className='form-input' name='email' value={data.email} label="Email" onChange={handleChange} />
            <TextField required className='form-input' type='password' name='password' value={data.password} label="Password" onChange={handleChange}/>
            {error && <div className='error-message'>{error}</div>}
            <input type="submit" value="Login" className='submit-btn' />
            { login && 
            <>
              <Link as='btn' to='/' className='login-success'>Login Successful! Click to go Home</Link>
            </>}
          </form>
        </Row>
      </Container>
    </main>
  )
}

export default Login