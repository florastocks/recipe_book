import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { TextField, TextareaAutosize } from '@mui/material'
import axios from 'axios'
import Slider from '@mui/material/Slider'
import { useNavigate } from 'react-router-dom'

const AddReview = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const { recipeId } = useParams()

  const [ data, setData ] = useState({
    title: '',
    rating: '',
    text: '',
    recipe: recipeId,
  })
  const [error, setError] = useState('')
  const [login, setLogin] = useState(false)

  const navigate = useNavigate()

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
    setError('')

    console.log(data)
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await axios.post('/api/reviews/', data)
      console.log('review posted')
      navigate(-1)

    } catch (error) {
      console.log(error)

      if (error.response.data.message === 'Unauthorized = No token provided') {
        setError('Please Login to Review this Recipe')
        setLogin(true)
      } else { 
        setError(error.response.data.message) 
      }
    }
  }
  return (
    <main className='form-page'>
      <Container>
        <Row>
          <form className='form' onSubmit={onSubmit}>
            <h3 className='text-center'>Give this Recipe a Review</h3>
            <Slider defaultValue={1} valueLabelDisplay='auto' step={1} marks min={1} max={5} onChange={handleChange} name='rating'/>
            <TextField required className='form-input' name='title' label='Review Title' value={data.title} onChange={handleChange}/>
            <TextField required className='form-input' name='text' label='What did you think?' value={data.text} onChange={handleChange}/>
            <input type="submit" value="Submit review" className='submit-btn' />
          </form>
        </Row>
      </Container>
    </main>
  )
}

export default AddReview