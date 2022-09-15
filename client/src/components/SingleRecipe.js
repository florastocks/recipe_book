import { useEffect, useState } from 'react'
import axios from 'axios' 
import { useParams } from 'react-router-dom'
import Reviews from './Reviews'
import Container from 'react-bootstrap/Container'
import { LinearProgress } from '@mui/material'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const SingleRecipe = () => {

  const { id } = useParams()
  const [ recipe, setRecipe ] = useState(null)
  const [ error, setError ] = useState(false)

  const navigate = useNavigate()

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

  const handleDeleteRecipe = async () => {
    try {
      const deleteRecipe = await axios.delete(`/api/recipes/${id}`)
      navigate('/allrecipes')

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container>
      { recipe ?
        <>
          <Row>
            <h1 className='recipe-heading'>{recipe.title}</h1>
            <Col md='6'><img className="single-img" src={recipe.image} alt={recipe.title} /></Col>
            <Col md='6'>
              <section className='ingredients-container'>
                <h3 className='ingredients-heading'>Ingredients</h3>
                <p className='ingredients-para'>{recipe.ingredients}</p>
              </section>
            </Col>
          </Row>
          <Row>
            <section className='instructions-container'>
              <h3 className='instructions-heading'>Method:</h3>
              <p className='instructions-para'>{recipe.instructions}</p>
            </section>
          </Row>
          {recipe.reviews.length > 0 ?
            <>
              <Reviews reviews={recipe.reviews} id={id} />
            </>
            :
            <div className="review-container">
              <h3 className="review-heading">Reviews:</h3>
              <Link className="btn-leave-review" as="link" to={`/review/${id}`}>Tried it? Be the First to leave a Recipe!</Link>
            </div>
          }
        </>
        :
        <h2>
          {error ? 'Something went Wrong, Please try again later' : <div className='loading-bar'> <br /> <LinearProgress color="success" /> </div>}
        </h2>
      }
    </Container>
  )
}

export default SingleRecipe