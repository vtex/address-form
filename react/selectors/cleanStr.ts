import deburr from 'lodash/deburr'

const cleanStr = (str: string) => (str ? deburr(str.toLowerCase()) : str)

export default cleanStr
