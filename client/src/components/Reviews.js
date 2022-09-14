import Row from 'react-bootstrap/Row'

const Reviews = ({ reviews }) => {
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
              </>
            )
          })}
        </p>
      </section>
    </Row>
  )
}

export default Reviews