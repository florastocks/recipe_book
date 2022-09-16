import { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Container } from 'react-bootstrap'
import { TextField } from '@mui/material'
import Slider from '@mui/material/Slider'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const UpdateReview = ({ review }) => {
  // useEffect(() => {
  //   window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  // }, [])

  const { recipeId, reviewId } = useParams()
  console.log(reviewId)
  console.log(recipeId)

  const [data, setData] = useState({
    title: '',
    text: '',
    rating: '',
    recipe: recipeId,
  })

  const navigate = useNavigate()

  const [error, setError] = useState('')
  // const [oldData, setOldData] = useState('')

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
    setError('')
    console.log('handle change data -> ', data)
  }

  // getting old data for placeholder
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       console.log({ recipeId }, { reviewId })
  //       const { data } = await axios.get(``)
  //     } catch (error) {
  //       console.log(error)
  //       setError(error.response.data.message)
  //     }
  //   }
  // })
  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await axios.put(`/api/reviews/${reviewId}/`, data)
      console.log('review updated')
      navigate(-1)
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  return (
    <main className='form-page'>
      <h1>Update page</h1>
      <Container>
        <Row>
          <form className='form' onSubmit={onSubmit}>
            <h3 className='text-center'>Update Your Review</h3>
            <div>Rating:</div>
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

export default UpdateReview