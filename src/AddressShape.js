import PropTypes from 'prop-types'

export default {
  addressId: PropTypes.string.isRequired,
  addressType: PropTypes.oneOf([
    'residential',
    'inStore',
    'commercial',
    'giftRegistry',
  ]).isRequired,
  city: PropTypes.string,
  complement: PropTypes.string,
  country: function(props, propName, componentName) {
    if (!/[A-Z]{3}/.test(props[propName])) {
      return new Error(
        'Invalid prop `' +
          propName +
          '` supplied to' +
          ' `' +
          componentName +
          '`. Validation failed.'
      )
    }
  },
  geoCoordinates: PropTypes.array,
  neighborhood: PropTypes.string,
  number: PropTypes.string,
  postalCode: PropTypes.string,
  receiverName: PropTypes.string,
  reference: PropTypes.string,
  state: PropTypes.string,
  street: PropTypes.string,
}
