import { Row } from "react-bootstrap"

const Reviews = ({ review, id }) => {
  return (
    <Row>
      <section className='review-container'>
        <h3 className="review-heading">What Others Thought About This Recipe:</h3>
        <p className="review=para">
          {reviews.map(review => {
            const { title, }
          })}
        </p>
      </section>
    </Row>
  )
}

export default Reviews