import PropTypes from 'prop-types'
import CountryType from './CountryType'

export const Address = {
  addressId: PropTypes.string.isRequired,
  addressType: PropTypes.oneOf([
    'residential',
    'inStore',
    'commercial',
    'giftRegistry',
    'pickup',
    'search',
  ]).isRequired,
  city: PropTypes.string,
  complement: PropTypes.string,
  country: CountryType,
  geoCoordinates: PropTypes.array,
  neighborhood: PropTypes.string,
  number: PropTypes.string,
  postalCode: PropTypes.string,
  receiverName: PropTypes.string,
  reference: PropTypes.string,
  state: PropTypes.string,
  street: PropTypes.string,
  addressQuery: PropTypes.string,
}

export default PropTypes.shape(Address)
