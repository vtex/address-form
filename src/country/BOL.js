import { THREE_LEVELS } from '../constants'
import { thirdLevelPostalCodes } from '../transforms/postalCodes'
import {
  getOneLevel,
  getTwoLevels,
  getThreeLevels,
} from '../transforms/addressFieldsOptions.js'

const countryData = {
  Beni: {
    Cercado: {
      Paititi: '10000',
      Trinidad: '10001',
      Yucumo: '10002',
    },
    'José Ballivián': {
      Reyes: '10100',
      Rurrenabaque: '10101',
      'San Borja': '10102',
    },
    Mamore: {
      'San Ramon': '10200',
    },
    Moxos: {
      'San Ignacio de Moxos': '10300',
      'San Joaquin': '10301',
    },
    'Vaca Díez': {
      Guayaramerín: '10400',
      Magdalena: '10401',
      Riberalta: '10402',
    },
    Yacuma: {
      'Santa Ana del Yacuma': '10500',
      'Santa Rosa de Yacuma': '10501',
    },
  },
  Chuquisaca: {
    'Nor Cinti': {
      Pelillojo: '20000',
    },
    'Luis Calvo': {
      Machareti: '20100',
    },
    'Hernando Siles': {
      Monteagudo: '20200',
    },
    Oropeza: {
      Yotala: '20300',
    },
    Sucre: {
      Sucre: '20400',
    },
  },
  Cochabamba: {
    Arani: {
      Arani: '30000',
      Vacas: '30001',
    },
    Ayopaya: {
      Morochata: '30100',
      'Villa Indedencia': '30101',
    },
    Capinota: {
      Capinota: '30200',
      'Irpa Irpa': '30201',
      'La Cantera': '30202',
    },
    Carrasco: {
      'Bulo Bulo': '30300',
      Chimoré: '30301',
      'Entre Ríos': '30302',
      Ivirgarzama: '30303',
      'Puerto Villaroel': '30304',
      Totora: '30305',
      'Villa Tunari': '30306',
    },
    Cercado: {
      Cochabamba: '30400',
    },
    Chapare: {
      Colomi: '30500',
      Epizana: '30501',
      Eterazama: '30502',
      Huayllani: '30503',
      Sacaba: '30504',
      'San Gabriel': '30505',
      Shinaota: '30506',
    },
    'Esteban Arze': {
      Anzaldo: '30600',
      Arbieto: '30601',
      Tarata: '30602',
    },
    'Germán Jordán': {
      Cliza: '30700',
    },
    Mizque: {
      Mizque: '30800',
    },
    'Narciso Campero': {
      Aiquile: '30900',
    },
    Punata: {
      Punata: '31000',
      'San Benito': '31001',
      'Valle Alto': '31002',
    },
    Quillacollo: {
      Apote: '31100',
      Colcapirhua: '31101',
      Quillacollo: '31102',
      'Sipe Sipe': '31103',
      Tapacarí: '31104',
      Tiquipaya: '31105',
      Vinto: '31106',
    },
    Tiraque: {
      Tiraque: '31200',
    },
  },
  'La Paz': {
    Aroma: {
      'Ayo Ayo': '40000',
      Capaja: '40001',
      Patacamaya: '40002',
      Pucara: '40003',
      'Sica Sica': '40004',
    },
    Camacho: {
      Escoma: '40100',
      Mocomoco: '40101',
      'Puerto Acosta': '40102',
    },
    Caranavi: {
      Caranavi: '40200',
      Taipiplaya: '40201',
    },
    'Franz Tamayo': {
      Apolo: '40300',
    },
    Ingavi: {
      Calamarca: '40400',
      Desaguadero: '40401',
      Guaqui: '40402',
      'Jesus de Machaca': '40403',
      Tiahuanacu: '40404',
      Viacha: '40405',
    },
    Inquisivi: {
      Colquiri: '40500',
      Quime: '40501',
    },
    'La Paz': {
      Achacachi: '40600',
    },
    Larecaja: {
      Guanay: '40700',
      Mapiri: '40701',
      Mayaya: '40702',
      Sorata: '40703',
      Tacacoma: '40704',
      Tipuani: '40705',
    },
    'Los Andes': {
      Batallas: '40800',
      'El Lago': '40801',
      Laja: '40802',
      Pucarani: '40803',
    },
    'Manco Kapac': {
      Copacabana: '40900',
      'Tiquina San Pablo': '40901',
    },
    Murillo: {
      Palca: '41000',
    },
    Muñecas: {
      Chuma: '41100',
    },
    'Nor Yungas': {
      Coripata: '41200',
      Coroico: '41201',
    },
    Omasuyos: {
      Ancoraimes: '41300',
      Huarina: '41301',
    },
    Pacajes: {
      Charaña: '41400',
    },
    'Pedro Domingo Murillo': {
      Achocalla: '41500',
      'El Alto': '41501',
      'La Paz': '41502',
      Valencia: '41503',
    },
    'Sud Yungas': {
      Chulumani: '41600',
      Irupana: '41601',
      Ixiamas: '41602',
      'La Asunta': '41603',
      'Palos Blancos': '41604',
    },
    Yungas: {
      'Cruz Loma': '41700',
    },
  },
  Oruro: {
    Cercado: {
      Caracollo: '50000',
      Oruro: '50001',
    },
    Oruro: {
      Challapata: '50100',
    },
    'Pantaleón Dalence': {
      Huanuni: '50200',
    },
    Poopo: {
      Poopo: '50300',
    },
    'Sebastián Pagador': {
      'Santiago de Huari': '50400',
    },
  },
  Pando: {
    'Nicolás Suárez': {
      Cobija: '60000',
      'El Porvenir': '60001',
    },
  },
  Potosí: {
    'Antonio Quijarro': {
      Uyuni: '70000',
    },
    Linares: {
      Puna: '70100',
    },
    'Modesto Omiste': {
      Villazón: '70200',
    },
    'Rafael Bustillo': {
      Llallagua: '70300',
      'Siglo XX': '70301',
      Uncia: '70302',
    },
    Saavedra: {
      Betanzos: '70400',
    },
    'Sud Chichas': {
      Tupiza: '70500',
    },
    'Tomás Frías': {
      Plahipo: '70600',
      Potosí: '70601',
      Pulquipunta: '70602',
    },
  },
  'Santa Cruz': {
    'Andrés Ibañez': {
      'Buena Vista': '80000',
      Cotoca: '80001',
      'El Carmen Rivero Torrez': '80002',
      'El Torno': '80003',
      Jorochito: '80004',
      'La Angostura': '80005',
      'La Guardia': '80006',
      Paurito: '80007',
      Porongo: '80008',
      'San Jose del Torno': '80009',
      'Santa Cruz': '80010',
      'Santa Marta': '80011',
      'Santa Rita': '80012',
    },
    'Angel Sandóval': {
      'San Matías': '80100',
    },
    Caballero: {
      Comarapa: '80200',
      Palizada: '80201',
      Saipina: '80202',
    },
    Chiquitos: {
      'Cañada Larga': '80300',
      Chihuahua: '80301',
      Pailas: '80302',
      Pailón: '80303',
      Roboré: '80304',
      'San José de Chiquitos': '80305',
    },
    Cordillera: {
      Abapo: '80400',
      Basilio: '80401',
      Boyuibe: '80402',
      Cabezas: '80403',
      Camiri: '80404',
      Charagua: '80405',
      Gutierrez: '80406',
      Mora: '80407',
      'Rio Seco': '80408',
      'Zanja Honda': '80409',
    },
    Florida: {
      Mairana: '80500',
      Mataral: '80501',
      Samaipata: '80502',
    },
    'Germán Bush': {
      'Puerto Suárez': '80600',
    },
    Guarayos: {
      'Ascensión de Guarayos': '80700',
      'El Puente': '80701',
      Urubichá: '80702',
      Yotau: '80703',
    },
    Ichilo: {
      'Buen Retiro': '80800',
      'Nuevo Horizontes': '80801',
      'San Carlos': '80802',
      'Santa fe de Yapacani': '80803',
      Yapacani: '80804',
    },
    'Ignacio Warnes': {
      Okinawa: '80900',
      'Okinawa 2': '80901',
      Warnes: '80902',
    },
    'José Miguel de Velasco': {
      'San Ignacio': '81000',
      'San Rafael': '81001',
      'TX San Antonio': '81002',
      'TX Santa Ana': '81003',
    },
    'Manuel María Caballero': {
      Pulquina: '81100',
    },
    'Ñuflo de Chávez': {
      '4 Cañadas': '81200',
      'Cerro Pelado': '81201',
      Concepción: '81202',
      'Los Troncos': '81203',
      'Puerto Rico': '81204',
      'San Javier': '81205',
      'San Juan de Yapacaní': '81206',
      'San Julian': '81207',
      'San Ramón': '81208',
    },
    'Obispo Santiesteban': {
      Canandoa: '81300',
      Chané: '81301',
      'Colonia Pirai': '81302',
      Hardeman: '81303',
      Litoral: '81304',
      Mineros: '81305',
      Montero: '81306',
      Saavedra: '81307',
      'San Pedro': '81308',
    },
    Sara: {
      Portachuelo: '81400',
      'Puente San Pablo': '81401',
      'Santa Rosa del Sara': '81402',
    },
    'Valle Grande': {
      Trigal: '81500',
      Vallegrande: '81501',
    },
    Velasco: {
      'San Miguel de Velasco': '81600',
    },
  },
  Tarija: {
    'Aniceto Arce': {
      Padcaya: '90000',
    },
    "Burnet O'Connor": {
      'Entre Rios': '90100',
    },
    Cercado: {
      Tarija: '90200',
    },
    'Gran Chaco': {
      Sanandita: '90300',
    },
    Méndez: {
      Canasmoro: '90400',
      'San Lorenzo': '90401',
      Tomatitas: '90402',
    },
    Tarija: {
      Bermejo: '90500',
      Villamontes: '90501',
      Yacuiba: '90502',
    },
  },
}

export default {
  country: 'BOL',
  abbr: 'BO',
  postalCodeFrom: THREE_LEVELS,
  postalCodeLevels: ['state', 'city', 'neighborhood'],
  thirdLevelPostalCodes: thirdLevelPostalCodes(countryData),
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
      regex: /^(\d{5})$/,
      size: 'small',
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
      hidden: true,
      name: 'reference',
      maxLength: 750,
      label: 'reference',
      size: 'xlarge',
    },
    {
      name: 'state',
      maxLength: 100,
      label: 'department',
      required: true,
      size: 'large',
      level: 1,
      options: getOneLevel(countryData),
    },
    {
      name: 'city',
      maxLength: 100,
      label: 'province',
      required: true,
      size: 'large',
      level: 2,
      basedOn: 'state',
      optionsMap: getTwoLevels(countryData),
    },
    {
      name: 'neighborhood',
      maxLength: 100,
      label: 'city',
      required: true,
      level: 3,
      basedOn: 'city',
      optionsMap: getThreeLevels(countryData),
    },
    {
      name: 'receiverName',
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
    number: { valueIn: 'long_name', types: ['street_number'], required: false },
    street: { valueIn: 'long_name', types: ['route'], required: true },
    state: {
      valueIn: 'short_name',
      types: ['administrative_area_level_1'],
      required: true,
    },
    city: {
      valueIn: 'long_name',
      types: ['locality', 'administrative_area_level_2'],
      required: true,
    },
    neighborhood: {
      valueIn: 'long_name',
      types: ['administrative_area_level_3'],
      required: false,
    },
  },
  summary: [
    [
      {
        name: 'street',
      },
      {
        delimiter: ' ',
        name: 'number',
      },
      {
        delimiter: ' ',
        name: 'complement',
      },
    ],
    [
      {
        name: 'neighborhood',
        delimiterAfter: ' - ',
      },
      {
        name: 'city',
      },
      {
        delimiter: ' - ',
        name: 'state',
      },
    ],
    [
      {
        name: 'postalCode',
      },
    ],
  ],
}
