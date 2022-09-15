import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const AddReview = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  // let { recipeId } = useParams()

  const [ data, setData ] = useState({
    title: '',
    rating: '',
    text: '',
  })
  const [error, setError] = useState('')

  return <h1>Add Review Page</h1>
}

export default AddReview