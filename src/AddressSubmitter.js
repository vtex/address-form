import PropTypes from 'prop-types'
import { injectAddressContext } from './addressContainerContext'

const AddressSubmitter = ({ onSubmit, children }) => {
  return children(onSubmit)
}

AddressSubmitter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
}

export default injectAddressContext(AddressSubmitter)
