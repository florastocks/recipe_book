import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const Reviews = ({ reviews, id }) => {

  const { reviewId } = useParams()

  return (
    <Row>
      <section className='review-container'>
        <h3 className="review-heading">What Others Thought About This Recipe:</h3>
        <p className="review=para">
          {reviews.map(review => {
            const { title, rating, text } = review
            return (
              <>
                <div className="review-rating">{rating}</div>
                <div className="review-title">{title}</div>
                <div className="review-text">{text}</div>
                <Link className='btn-update-review' as='link' to={`/review/${reviewId}`}>Update Your Review</Link>
              </>
            )
          })}
        </p>
        <Link className="btn-leave-review" as="link" to={`/review/${id}`}>Tried it? Review this Recipe!</Link>
      </section>
    </Row>
  )
}

export default Reviews