import { TWO_LEVELS } from '../constants'
import { secondLevelPostalCodes } from '../transforms/postalCodes'
import { getOneLevel, getTwoLevels } from '../transforms/addressFieldsOptions'

const countryData = {
  'Managua': {
    'Managua': '10000',
    'Tipitapa': '15100',
    'San Francisco Libre': '15300',
    'Mateare': '15500',
    'Ciudad Sandino': '15700',
    'El Crucero': '16100',
    'Ticuantepe': '16300',
    'Villa El Carmen': '16500',
    'San Rafael del Sur': '16700'
  },
  'León': {
    'León': '21000',
    'La Paz Centro': '22100',
    'Nagarote': '22200',
    'Quezalguaque': '22300',
    'Telica': '22400',
    'Larreynaga': '22500',
    'El Jicaral': '22600',
    'Santa Rosa del Peñón': '22700',
    'El Sauce': '22800',
    'Achuapa': '22900'
  },
  'Chinandega': {
    'Chinandega': '25000',
    'Chichigalpa': '26100',
    'El Viejo': '26200',
    'El Realejo': '26300',
    'Corinto': '26400',
    'Posoltega': '26500',
    'Puerto Morazán': '26600',
    'Villanueva': '26700',
    'Somotillo': '26800',
    'San Francisco del Norte': '26900',
    'Santo Tomás del Norte': '27100',
    'Cinco Pinos': '27200',
    'San Pedro del Norte': '27300'
  },
  'Estelí': {
    'Estelí': '31000',
    'Condega': '32100',
    'Pueblo Nuevo': '32200',
    'San Juan de Limay': '32300',
    'San Nicolás': '32400',
    'La Trinidad': '32500'
  },
  'Madriz': {
    'Somoto': '34000',
    'Yalagüina': '35100',
    'Palacagüina': '35200',
    'Totogalpa': '35300',
    'San Lucas': '35400',
    'Las Sabanas': '35500',
    'San José de Cusmapa': '35600',
    'Telpaneca': '35700',
    'San Juan de Río Coco': '35800'
  },
  'Nueva Segovia': {
    'Ocotal': '37000',
    'Mozonte': '38100',
    'Dipilto': '38200',
    'Macuelizo': '38300',
    'Ciudad Antigua': '38400',
    'San Fernando': '38500',
    'Santa María': '38600',
    'Quilalí': '38700',
    'El Jícaro': '38800',
    'Murra': '38900',
    'Wiwilí': '39100',
    'Jalapa': '39200'
  },
  'Masaya': {
    'Masaya': '41000',
    'Tisma': '42100',
    'Nindirí': '42200',
    'La Concepción': '42300',
    'Nandasmo': '42400',
    'Catarina': '42500',
    'Masatepe': '42600',
    'Niquinohomo': '42700',
    'San Juan de Oriente': '42800'
  },
  'Granada': {
    'Granada': '43000',
    'Diriomo': '44100',
    'Diriá': '44200',
    'Nandaime': '44300'
  },
  'Carazo': {
    'Jinotepe': '45000',
    'Dolores': '46100',
    'El Rosario': '46200',
    'Diriamba': '46300',
    'San Marcos': '46400',
    'La Paz de Oriente': '46500',
    'Santa Teresa': '46600',
    'La Conquista': '46700'
  },
  'Rivas': {
    'Rivas': '47000',
    'San Jorge': '48100',
    'Buenos Aires': '48200',
    'Potosí': '48300',
    'Belén': '48400',
    'Tola': '48500',
    'San Juan del Sur': '48600',
    'Moyogalpa': '48700',
    'Altagracia': '48800',
    'Cárdenas': '48900'
  },
  'Boaco': {
    'Boaco': '51000',
    'Camoapa': '52100',
    'Santa Lucía': '52200',
    'Teustepe': '52300',
    'San Lorenzo': '52400',
    'San José de los Remates': '52500'
  },
  'Chontales': {
    'Juigalpa': '55000',
    'Acoyapa': '56100',
    'Santo Tomás': '56200',
    'La Libertad': '56300',
    'Cuapa': '56400',
    'Comalapa': '56500',
    'Villa Sandino': '56600',
    'San Pedro de Lóvago': '56700',
    'Santo Domingo': '56800',
    'El Coral': '56900'
  },
  'Matagalpa': {
    'Matagalpa': '61000',
    'San Ramón': '62100',
    'Sébaco': '62200',
    'Terrabona': '62300',
    'San Dionisio': '62400',
    'Esquipulas': '62500',
    'Muy Muy': '62600',
    'El Tuma - La Dalia': '62700',
    'Ciudad Darío': '62800',
    'San Isidro': '62900',
    'Matiguás': '63100',
    'Río Blanco': '63200',
    'Rancho Grande': '63300'
  },
  'Jinotega': {
    'Jinotega': '65000',
    'San Rafael del Norte': '66100',
    'San Sebastián de Yalí': '66200',
    'La Concordia': '66300',
    'Santa María de Pantasma': '66400',
    'El Cuá': '66500',
    'San José de Bocay': '66600',
    'Wiwilí de Jinotega': '66700'
  },
  'Costa Caribe Norte': {
    'Puerto Cabezas': '71000',
    'Waspán': '72100',
    'Rosita': '72200',
    'Bonanza': '72300',
    'Siuna': '72400',
    'Prinzapolka': '72500',
    'Mulukukú': '72600',
    'Waslala': '72700'
  },
  'Costa Caribe Sur': {
    'Bluefields': '81000',
    'Islas del Maíz': '82100',
    'Kukra Hill': '82200',
    'El Rama': '82300',
    'Muelle de los Bueyes': '82400',
    'Nueva Guinea': '82500',
    'Laguna de Perlas': '82600',
    'El Tortuguero': '82700',
    'El Ayote': '82800',
    'Desembocadura de Río Grande': '82900',
    'La Cruz de Río Grande': '83100',
    'Paiwas': '83200'
  },
  'Río San Juan': {
    'San Carlos': '91000',
    'San Miguelito': '92100',
    'El Castillo': '92200',
    'El Almendro': '92300',
    'Morrito': '92400',
    'San Juan del Norte': '92500'
  }
}

export default {
  country: 'NIC',
  abbr: 'NI',
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
      regex: /^[\d]{4,5}$/,
      size: 'small',
    },
    {
      name: 'state',
      maxLength: 100,
      label: 'department',
      required: true,
      size: 'xlarge',
      level: 1,
      options: getOneLevel(countryData),
    },
    {
      name: 'city',
      maxLength: 100,
      label: 'municipality',
      required: true,
      size: 'xlarge',
      level: 2,
      basedOn: 'state',
      optionsMap: getTwoLevels(countryData),
    },
    {
      hidden: true,
      name: 'neighborhood',
      maxLength: 100,
      label: 'neighborhood',
      size: 'large',
    },
    {
      name: 'street',
      label: 'street',
      required: true,
      size: 'xlarge',
    },
    {
      hidden: true,
      name: 'number',
      maxLength: 750,
      label: 'number',
      size: 'small',
      autoComplete: 'nope',
    },
    {
      name: 'complement',
      label: 'complement',
      size: 'xlarge',
    },
    {
      hidden: true,
      name: 'reference',
      maxLength: 750,
      label: 'reference',
      size: 'xlarge',
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
      required: true,
    },
    number: {
      valueIn: 'long_name',
      types: ['street_number'],
      required: true,
      notApplicable: true,
    },
    street: { valueIn: 'long_name', types: ['route'] },
    neighborhood: {
      valueIn: 'long_name',
      types: ['neighborhood'],
    },
    state: {
      valueIn: 'long_name',
      types: ['administrative_area_level_1'],
    },
    city: {
      valueIn: 'long_name',
      types: ['administrative_area_level_2', 'locality'],
    },
  },
  summary: [
    [ { name: 'street' } ],
    [ { name: 'complement' } ],
    [
      { name: 'city' },
      { delimiter: ' - ', name: 'state' },
    ],
  ],
}
