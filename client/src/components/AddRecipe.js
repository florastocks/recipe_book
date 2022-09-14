import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import axios from 'axios'
import { TextField } from '@mui/material'
import { useState } from 'react'

const AddRecipe = () => {

  const [data, setData] = useState({
    title: '',
    instructions: '',
    foodtype: [''],
    image: '',
  })

  const [error, setError] = useState('')


  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
    setError('')
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      await axios.post('api/recipes/')
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }
  return (
    <main className="form-page">
      <Container>
        <Row>
          <form className='form' onSubmit={onSubmit}>
            <h4>Add Your Recipe</h4>
            <TextField required error={error ? true : false} name='title' label='Recipe Title' className="form-input" value={data.title} onChange={handleChange}/>
            <TextField required error={error ? true : false} name='instructions' label='Recipe Instructions' className="form-input" value={data.instructions} onChange={handleChange}/>
          </form>
        </Row>
      </Container>
    </main>
  )
}

export default AddRecipe