import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import axios from 'axios'
import { TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import React from 'react'
import Select from 'react-select'

const AddRecipe = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const [data, setData] = useState({
    title: '',
    instructions: '',
    foodtype: [],
    ingredients: '',
  })

  const [error, setError] = useState('')
  const [ foodtype, setFoodType] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/foodtypes/')
      setFoodType(data)
      console.log(data)
    }
    getData()
  }, [])

  const handleFoodType = (foodtype) => {
    setData({ ...data, foodtype: foodtype.map((type) => type.id) })
  }

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
    setError('')
  } 

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('/api/recipes/', data)
      console.log('console logging this data ->', data)
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
      console.log('getting this error')
    }
  }
 
  return (
    <main className="form-page">
      <Container>
        <Row>
          <form className='form' onSubmit={onSubmit}>
            <h4>Add Your Recipe</h4>
            <TextField required error={error ? true : false} name='title' label='Recipe Title' className="form-input" value={data.title} onChange={handleChange}/>
            <Select 
              options={foodtype.map((option) => ({
                id: option.id,
                value: option.id,
                label: option.name,
              }))}
              isMulti
              name='foodtype'
              onChange={handleFoodType}
            />
            <TextField required error={error ? true : false} name='instructions' label='Recipe Instructions' className="form-input" value={data.instructions} onChange={handleChange}/>
            <TextField required error={error ? true : false} name='ingredients' label='Recipe Ingredients' className="form-input" value={data.ingredients} onChange={handleChange}/>
            <TextField type='url' name='image' label='Insert Image Url' className='form-input' value={data.image} onChange={handleChange}/>
            {error && <div className='error-mex'>{error}</div>}
            <input type='submit' value='Submit' className='submit-btn' />
          </form>
        </Row>
      </Container>
    </main>
  )
}

export default AddRecipe