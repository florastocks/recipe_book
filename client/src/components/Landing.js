import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
const Landing = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])
  
  return (
    <div className="landing-container">
      <main className="hero text-center">
        <div className='hero-container'>
          <h1 className='landing-title'>Rate These Recipes</h1>
          <p className='lead'>Trying to plan your next meal but feeling uninspired? Look inside this recipe book, find a recipe that excites you, and see what others who tried it thought!</p>
          <button className='homepage-btn'><Link as='link' to='/allrecipes'>Go To all Recipes</Link></button>
        </div>
        <Col className='images-col'>
          <div className='image-landing'>
            <img className="image-ind" src={'https://res.cloudinary.com/aaf-proj3/image/upload/v1663181833/Recipes/46263204_qxkeuj.jpg'} alt='pie'/>
          </div>
          <div className='image-landing'>
            <img className="image-ind" src={'https://res.cloudinary.com/aaf-proj3/image/upload/v1663182276/Recipes/136867685_mepehp.jpg'} alt='one-pot'/>
          </div>
          <div className='image-landing'>
            <img className="image-ind" src={'https://res.cloudinary.com/aaf-proj3/image/upload/v1663182362/Recipes/117867077_j8cave.jpg'} alt='fish'/>
          </div>
        </Col>
      </main>
    </div>
  )
}

export default Landing