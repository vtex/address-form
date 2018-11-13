export default function(props, propName, componentName) {
  const value = props[propName]
  if (value === null || value === undefined) {
    return null
  }

  if (!/^[A-Z]{3}$/.test(value)) {
    return new Error(
      'Invalid prop `' +
        propName +
        '` supplied to' +
        ' `' +
        componentName +
        '`. It should be 3 alpha digits.'
    )
  }
}
