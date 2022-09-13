import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { TextField } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [ data, setData ] = useState({
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
  })

  const navigate = useNavigate()

  const [ error, setError ] = useState('')
  const [ emailError, setEmailError ] = useState('')
  const [ userError, setUserError ] = useState('')
  const [ passError, setPassError ] = useState('')

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })

    setError('')
    setEmailError('')
    setUserError('')
    setPassError('')
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    //post request to API
    try {
      await axios.post('api/auth/register/', data)
      navigate('/login')

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="form-page">
      <Container>
        <Row>
          <form className='form' onSubmit={onSubmit}>
            <h3 className='form-header'>Register</h3>
            <TextField required error={emailError ? true : false} className='form-input' name='email' label="Email" value={data.email} onChange={handleChange}/>
            <TextField required error={userError ? true : false} className='form-input' name='username' label="Username" value={data.usename} onChange={handleChange}/>
            <TextField required error={passError ? true : false} className='form-input' name='password' type='password' label="Password" value={data.password} onChange={handleChange}/>
            <TextField required error={passError ? true : false} className='form-input' name='password_confirmation' type='password' label="Password Confirmation" value={data.password_confirmation} onChange={handleChange}/>
            <input type="submit" value="Register" className='submit-btn' />
          </form>
        </Row>
      </Container>
    </main>
  )
}
export default Register