import React from 'react'
import PropTypes from 'prop-types'

export default function Styles({ children }) {
  return (
    <div>
      <link
        rel="stylesheet"
        href="//io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="//io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap-responsive.min.css"
      />
      <link
        rel="stylesheet"
        href="//io.vtex.com.br/front-libs/font-awesome/3.2.1/css/font-awesome.min.css"
      />
      <link
        rel="stylesheet"
        href="//io.vtex.com.br/checkout-ui/5.5.2/style/style.css"
      />
      {children}
    </div>
  )
}

Styles.propTypes = {
  children: PropTypes.node.isRequired,
}
