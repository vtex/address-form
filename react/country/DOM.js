import { TWO_LEVELS } from '../constants'
import { secondLevelPostalCodes } from '../transforms/postalCodes'
import { getOneLevel, getTwoLevels } from '../transforms/addressFieldsOptions'

// Based on sheet provided by Rodolfo Bússola:
// https://docs.google.com/spreadsheets/d/1_uoFfVCg-E8lrGJ235ZkcqnK0cspyX53/edit?usp=sharing&ouid=113929948326320493678&rtpof=true&sd=true

const countryData = {
  Azua: {
    Azua: '71000',
    Guayabal: '71100',
    'Las Charcas': '71200',
    'Padre Las Casas': '71400',
    Peralta: '71500',
    'Sabana Yegua': '71600',
    'Tábara Arriba': '71700',
    Estebanía: '71800'
  },
  Baoruco: {
    Neiba: '82000',
    Galván: '82100',
    'Los Ríos': '82200',
    Tamayo: '82300',
    'Villa Jaragua': '82400'
  },
  Barahona: {
    Barahona: '81000',
    Cabral: '81100',
    Enriquillo: '81200',
    'Las Salinas': '81300',
    Paraíso: '81400',
    Polo: '81500',
    'Vicente Noble': '81600',
    'El Peñón': '81700',
    Fundación: '81800',
    'La Ciénaga': '81900'
  },
  Dajabón: {
    Dajabón: '63000',
    'Loma De Cabrera': '63100',
    Partido: '63200',
    Restauración: '63300',
    'El Pino': '63400'
  },
  'Distrito Nacional': {
    'Santo Domingo De Guzmán': '10101'
  },
  Duarte: {
    'San Francisco de Macorís': '31000',
    Arenoso: '31100',
    Castillo: '31206',
    'Eugenio María De Hostos': '31300',
    Pimentel: '31400',
    'Villa Riva': '31500',
    'Las Guáranas': '31600'
  },
  'El Seibo': {
    'El Seibo': '24000',
    Miches: '24101'
  },
  'Elías Piña': {
    Comendador: '73000',
    Bánica: '73100',
    'El Llano': '73200',
    'Hondo Valle': '73300',
    'Juan Santiago': '73500'
  },
  Espaillat: {
    Moca: '53011',
    'Cayetano Germosén': '56100',
    'Gaspar Hernández': '56200',
    'Jamao Al Norte': '56400'
  },
  'Hato Mayor': {
    'Hato Mayor': '25000',
    'Sabana De La Mar': '25100',
    'El Valle': '25200'
  },
  'Hermanas Mirabal': {
    Salcedo: '34000',
    Tenares: '34100',
    'Villa Tapia': '34200'
  },
  Independencia: {
    Jimaní: '83000',
    Duvergé: '83100',
    'La Descubierta': '83200',
    Mella: '83300',
    'Postrer Río': '83400',
    Cristóbal: '83500'
  },
  'La Altagracia': {
    Higüey: '23000',
    'San Rafael Del Yuma': '23100'
  },
  'La Romana': {
    'La Romana': '22000',
    Guaymate: '22100',
    'Villa Hermosa': '22200'
  },
  'La Vega': {
    'La Vega': '41000',
    Constanza: '41100',
    Jarabacoa: '41200',
    'Jima Abajo': '41300'
  },
  'María Trinidad Sánchez': {
    Nagua: '33000',
    Cabrera: '33100',
    'El Factor': '33200',
    'Río San Juan': '33300'
  },
  'Monseñor Nouel': {
    Bonao: '42000',
    Maimón: '42100',
    'Piedra Blanca': '42200'
  },
  'Monte Cristi': {
    'Monte Cristi': '62000',
    Castañuelas: '62100',
    Guayubín: '62200',
    'Las Matas de Santa Cruz': '62300',
    'Pepillo Salcedo': '62400',
    'Villa Vásquez': '62500'
  },
  'Monte Plata': {
    'Monte Plata': '92000',
    Bayaguana: '92100',
    'Sabana Grande De Boyá': '92200',
    Yamasá: '92300'
  },
  Pedernales: {
    Pedernales: '84000',
    Oviedo: '84100'
  },
  Peravia: {
    Baní: '94000',
    Nizao: '94100'
  },
  'Puerto Plata': {
    'Puerto Plata': '57000',
    Altamira: '57100',
    Guananico: '57200',
    Imbert: '57300',
    'Los Hidalgos': '57400',
    Luperón: '57500',
    Sosúa: '57600',
    'Villa Isabela': '57700',
    'Villa Montellano': '57800'
  },
  Samaná: {
    Samaná: '32000',
    Sánchez: '32100',
    'Las Terrenas': '32200'
  },
  'San Cristóbal': {
    'San Cristóbal': '91000',
    'Bajos de Haina': '91100',
    'Los Cacaos': '91200',
    'Cambita Garabitos': '91300',
    'San Gregorio de Nigua': '91400',
    'Sabana Grande de Palenque': '91500',
    Yaguate: '91600',
    'Villa Altagracia': '91700'
  },
  'San José de Ocoa': {
    'San José De Ocoa': '93000',
    'Sabana Larga': '93100'
  },
  'San Juan': {
    'San Juan': '72000',
    Bohechío: '72100',
    'El Cercado': '72200',
    'Juan De Herrera': '72300',
    'Las Matas De Farfán': '72400',
    Vallejuelo: '72500'
  },
  'San Pedro de Macorís': {
    'San Pedro De Macorís': '21000',
    'Los Llanos': '21100',
    'Ramón Santana': '21200',
    Consuelo: '21300',
    Quisqueya: '21400'
  },
  'Sánchez Ramírez': {
    Cotuí: '43000',
    Cevicos: '43100',
    Fantino: '43200',
    'La Mata': '43400'
  },
  Santiago: {
    Santiago: '51000',
    'San José De Las Matas': '51100',
    Jánico: '51200',
    Bisonó: '51300',
    'Licey Al Medio': '51400',
    Tamboril: '51500',
    'Villa González': '51600',
    'Sabana Iglesia': '51800'
  },
  'Santiago Rodríguez': {
    'San Ignacio De Sabaneta': '64000',
    'Villa Los Almácigos': '64100',
    Monción: '64200'
  },
  'Santo Domingo': {
    'Los Alcarrizos': '10705',
    'Santo Domingo Oeste': '10804',
    'Santo Domingo Norte': '11200',
    'San Antonio De Guerra': '11500',
    'Santo Domingo Este': '11501'
  },
  Valverde: {
    Mao: '61000',
    Esperanza: '61100',
    'Laguna Salada': '61200'
  }
}

export default {
  country: 'DOM',
  abbr: 'DO',
  postalCodeFrom: TWO_LEVELS,
  postalCodeLevels: ['state', 'city'],
  secondLevelPostalCodes: secondLevelPostalCodes(countryData),
  fields: [
    {
      hidden: true,
      name: 'country',
      maxLength: 100,
      label: 'country',
      size: 'medium',
    },
    {
      autoComplete: 'nope',
      hidden: true,
      label: 'postalCode',
      maxLength: 50,
      name: 'postalCode',
      postalCodeAPI: false,
      regex: /^([\d]{5})$/,
      size: 'large',
      required: true,
    },
    {
      name: 'street',
      label: 'street',
      required: true,
      size: 'xlarge',
    },
    {
      name: 'number',
      maxLength: 750,
      label: 'number',
      required: true,
      size: 'mini',
      autoComplete: 'nope',
    },
    {
      name: 'complement',
      maxLength: 750,
      label: 'complement',
      size: 'large',
    },
    {
      name: 'reference',
      hidden: true,
      maxLength: 750,
      label: 'reference',
      size: 'xlarge',
    },
    {
      name: 'state',
      maxLength: 100,
      label: 'province',
      required: true,
      size: 'large',
      level: 1,
      options: getOneLevel(countryData),
    },
    {
      name: 'city',
      maxLength: 100,
      label: 'municipality',
      required: true,
      size: 'large',
      level: 2,
      basedOn: 'state',
      optionsMap: getTwoLevels(countryData),
    },
    {
      name: 'neighborhood',
      required: true,
      maxLength: 100,
      label: 'neighborhood',
      size: 'large',
    },
    {
      name: 'receiverName',
      elementName: 'receiver',
      maxLength: 750,
      label: 'receiverName',
      size: 'xlarge',
      required: true,
    },
  ],
  geolocation: {
    postalCode: {
      valueIn: 'long_name',
      types: ['postal_code'],
      required: false,
    },

    number: {
      valueIn: 'long_name',
      types: ['street_number'],
      required: true,
      notApplicable: true,
    },

    street: { valueIn: 'long_name', types: ['route'] },

    state: {
      valueIn: 'short_name',
      types: ['administrative_area_level_1'],
    },

    city: {
      valueIn: 'long_name',
      types: ['locality', 'administrative_area_level_2'],
    },

    neighborhood: {
      valueIn: 'long_name',
      types: ['administrative_area_level_3'],
    },

    receiverName: {
      required: true,
    },
  },
  summary: [
    [
      { name: 'street' },
      { delimiter: ' ', name: 'number' },
      { delimiter: ', ', name: 'complement' },
    ],
    [
      { name: 'neighborhood' },
      { delimiter: ' ', name: 'postalCode' },
    ],
    [
      { name: 'city' },
      { delimiter: ', ', name: 'state' },
    ],
  ],
}
