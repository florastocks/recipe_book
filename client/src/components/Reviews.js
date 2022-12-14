import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

const Reviews = ({ reviews, id }) => {

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const handleDelete = async (reviewId) => {
    try {
      console.log({ reviewId })
      const deleteReview = await axios.delete(`/api/reviews/${reviewId}/`)
      console.log('delete Review button clicked ->', deleteReview)
      window.location.reload()
      


    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Row>
      <section className='singleRecipe-container'>
        <h3 className="review-heading">What Others Thought About This Recipe:</h3>
        <p className='singleRecipe-para'>
          {reviews.map((review, idx) => {
            const { title, rating, text } = review
            return (
              <div className='single-rev-cont' key={idx}>
                <div className="review-rating">{'⭐️'.repeat(rating)}</div>
                <div className="review-title">{title}</div>
                <div className="review-text">{text}</div>
                <Link className='btn-update-review' to={`/update-review/${id}/${review.id}`}>Update Your Review</Link>
                <button className='btn-review-delete' onClick={() => handleDelete(review.id)}>Delete This Review</button>
              </div>
            )
          })}
        </p>
        <Link className="btn-leave-review" as="link" to={`/review/${id}`}>Tried it? Review this Recipe!</Link>
      </section>
    </Row>
  )
}

export default Reviews