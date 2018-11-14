import deburr from 'lodash/deburr'

const cleanStr = str => str ? deburr(str.toLowerCase()) : str

export default cleanStr
