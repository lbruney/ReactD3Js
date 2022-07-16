import PropTypes from 'prop-types'

function Card({ children, reverse }) {
  return (
    <div className={`c-card ${reverse && 'c-card--reverse'}`}>{children}</div>
  )
}
Card.defaultProps = {
  reverse: false
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool
}

export default Card
