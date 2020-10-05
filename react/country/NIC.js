import { TWO_LEVELS } from '../constants'
import { secondLevelPostalCodes } from '../transforms/postalCodes'
import { getOneLevel, getTwoLevels } from '../transforms/addressFieldsOptions'

const countryData = {
  Boaco: {
    Boaco: '51000',
    Camoapa: '52100',
    'San José de los Remates': '52500',
    'San Lorenzo': '52400',
    'Santa Lucía': '52200',
    Teustepe: '52300'
  },
  Carazo: {
    Diriamba: '46300',
    Dolores: '46100',
    'El Rosario': '46200',
    Jinotepe: '45000',
    'La Conquista': '46700',
    'La Paz de Oriente': '46500',
    'San Marcos': '46400',
    'Santa Teresa': '46600'
  },
  Chinandega: {
    Chichigalpa: '26100',
    Chinandega: '25000',
    'Cinco Pinos': '27200',
    Corinto: '26400',
    'El Realejo': '26300',
    'El Viejo': '26200',
    Posoltega: '26500',
    'Puerto Morazán': '26600',
    'San Francisco del Norte': '26900',
    'San Pedro del Norte': '27300',
    'Santo Tomás del Norte': '27100',
    Somotillo: '26800',
    Villanueva: '26700'
  },
  Chontales: {
    Acoyapa: '56100',
    Comalapa: '56500',
    Cuapa: '56400',
    'El Coral': '56900',
    Juigalpa: '55000',
    'La Libertad': '56300',
    'San Pedro de Lóvago': '56700',
    'Santo Domingo': '56800',
    'Santo Tomás': '56200',
    'Villa Sandino': '56600'
  },
  'Costa Caribe Norte': {
    Bonanza: '72300',
    Mulukukú: '72600',
    Prinzapolka: '72500',
    'Puerto Cabezas': '71000',
    Rosita: '72200',
    Siuna: '72400',
    Waslala: '72700',
    Waspán: '72100'
  },
  'Costa Caribe Sur': {
    Bluefields: '81000',
    'Desembocadura de Río Grande': '82900',
    'El Ayote': '82800',
    'El Rama': '82300',
    'El Tortuguero': '82700',
    'Islas del Maíz': '82100',
    'Kukra Hill': '82200',
    'La Cruz de Río Grande': '83100',
    'Laguna de Perlas': '82600',
    'Muelle de los Bueyes': '82400',
    'Nueva Guinea': '82500',
    Paiwas: '83200'
  },
  Estelí: {
    Condega: '32100',
    Estelí: '31000',
    'La Trinidad': '32500',
    'Pueblo Nuevo': '32200',
    'San Juan de Limay': '32300',
    'San Nicolás': '32400'
  },
  Granada: {
    Diriá: '44200',
    Diriomo: '44100',
    Granada: '43000',
    Nandaime: '44300'
  },
  Jinotega: {
    'El Cuá': '66500',
    Jinotega: '65000',
    'La Concordia': '66300',
    'San José de Bocay': '66600',
    'San Rafael del Norte': '66100',
    'San Sebastián de Yalí': '66200',
    'Santa María de Pantasma': '66400',
    'Wiwilí de Jinotega': '66700'
  },
  León: {
    Achuapa: '22900',
    'El Jicaral': '22600',
    'El Sauce': '22800',
    'La Paz Centro': '22100',
    Larreynaga: '22500',
    León: '21000',
    Nagarote: '22200',
    Quezalguaque: '22300',
    'Santa Rosa del Peñón': '22700',
    Telica: '22400'
  },
  Madriz: {
    'Las Sabanas': '35500',
    Palacagüina: '35200',
    'San José de Cusmapa': '35600',
    'San Juan de Río Coco': '35800',
    'San Lucas': '35400',
    Somoto: '34000',
    Telpaneca: '35700',
    Totogalpa: '35300',
    Yalagüina: '35100'
  },
  Managua: {
    'Ciudad Sandino': '15700',
    'El Crucero': '16100',
    Managua: '10000',
    Mateare: '15500',
    'San Francisco Libre': '15300',
    'San Rafael del Sur': '16700',
    Ticuantepe: '16300',
    Tipitapa: '15100',
    'Villa El Carmen': '16500'
  },
  Masaya: {
    Catarina: '42500',
    'La Concepción': '42300',
    Masatepe: '42600',
    Masaya: '41000',
    Nandasmo: '42400',
    Nindirí: '42200',
    Niquinohomo: '42700',
    'San Juan de Oriente': '42800',
    Tisma: '42100'
  },
  Matagalpa: {
    'Ciudad Darío': '62800',
    'El Tuma - La Dalia': '62700',
    Esquipulas: '62500',
    Matagalpa: '61000',
    Matiguás: '63100',
    'Muy Muy': '62600',
    'Rancho Grande': '63300',
    'Río Blanco': '63200',
    'San Dionisio': '62400',
    'San Isidro': '62900',
    'San Ramón': '62100',
    Sébaco: '62200',
    Terrabona: '62300'
  },
  'Nueva Segovia': {
    'Ciudad Antigua': '38400',
    Dipilto: '38200',
    'El Jícaro': '38800',
    Jalapa: '39200',
    Macuelizo: '38300',
    Mozonte: '38100',
    Murra: '38900',
    Ocotal: '37000',
    Quilalí: '38700',
    'San Fernando': '38500',
    'Santa María': '38600',
    Wiwilí: '39100'
  },
  'Río San Juan': {
    'El Almendro': '92300',
    'El Castillo': '92200',
    Morrito: '92400',
    'San Carlos': '91000',
    'San Juan del Norte': '92500',
    'San Miguelito': '92100'
  },
  Rivas: {
    Altagracia: '48800',
    Belén: '48400',
    'Buenos Aires': '48200',
    Cárdenas: '48900',
    Moyogalpa: '48700',
    Potosí: '48300',
    Rivas: '47000',
    'San Jorge': '48100',
    'San Juan del Sur': '48600',
    Tola: '48500'
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
      required: true,
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
    receiverName: {
      required: true,
    },
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
    [{ name: 'street' }],
    [{ name: 'complement' }],
    [{ name: 'city' }, { delimiter: ' - ', name: 'state' }],
  ],
}
