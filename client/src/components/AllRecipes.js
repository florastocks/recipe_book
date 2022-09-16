import { useState, useEffect } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { LinearProgress } from '@mui/material'
import { Link } from 'react-router-dom'

const AllRecipes = () => {

  const [ allRecipes, setAllRecipes ] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/recipes/')
        // console.log(data)
        setAllRecipes(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])


  return (
    <Container className='recipes-container'>
      <h1>Recipes</h1> 
      <Row className='card-row'>
        {allRecipes.map( recipe => {
          const { id, title, image } = recipe
          console.log(id, title)
          return (
            <Col key={id} md='4' className="col-allRecipes" mb='5'>
              { title ? 
                <Link to={`/recipes/${id}/`}>
                  <Card className="recipe-card">
                    <Card.Body>
                      <img className='card-img-top' src={image} alt={title}/>
                      <Card.Title className="card-title">{title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
                :
                <div className="loading-bar"> <br /> <LinearProgress color="success" /> </div>
              }
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default AllRecipes

// add images in later