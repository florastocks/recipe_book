import { useEffect, useState } from 'react'
import axios from 'axios' 
import { useParams } from 'react-router-dom'

const SingleRecipe = () => {

  const { id } = useParams()
  const [ recipe, setRecipe ] = useState(null)


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/recipes/${id}`)
        setRecipe(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  return <h1>Single Recipe Page</h1>
}

export default SingleRecipe