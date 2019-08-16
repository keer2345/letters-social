import React from "react"
import PropTypes from "prop-types"

const Ad = props => {
  return (
    <div className="ad">
      <a target="_blank" rel="noreferrer noopener" href={props.url}>
        <img
          className="img-responsive"
          src={props.imageUrl}
          alt="React in Action by Mark Thomas | Manning Publications"
        />
      </a>
    </div>
  )
}

Ad.propTypes = {
  imageUrl: PropTypes.string,
  url: PropTypes.string
}

export default Ad
