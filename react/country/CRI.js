import { THREE_LEVELS } from '../constants'
import { thirdLevelPostalCodes } from '../transforms/postalCodes'
import {
  getOneLevel,
  getTwoLevels,
  getThreeLevels,
} from '../transforms/addressFieldsOptions'

const countryData = {
  'Alajuela': {
    'Alajuela': {
      'Alajuela': '20101',
      'Carrizal': '20103',
      'Desamparados': '20110',
      'Garita': '20113',
      'Guácima': '20105',
      'Río Segundo': '20109',
      'Sabanilla': '20107',
      'San Antonio': '20104',
      'San Isidro': '20106',
      'San José': '20102',
      'San Rafael': '20108',
      'Sarapiquí': '20114',
      'Tambor': '20112',
      'Turrúcares': '20111'
    },
    'Atenas': {
      'Atenas': '20501',
      'Concepción': '20505',
      'Escobal': '20508',
      'Jesús': '20502',
      'Mercedes': '20503',
      'San Isidro': '20504',
      'San José': '20506',
      'Santa Eulalia': '20507'
    },
    'Grecia': {
      'Bolívar': '20308',
      'Grecia': '20301',
      'Puente de Piedra': '20307',
      'San Isidro': '20302',
      'San José': '20303',
      'San Roque': '20304',
      'Tacares': '20305'
    },
    'Guatuso': {
      'Buenavista': '21502',
      'Cote': '21503',
      'Katira': '21504',
      'San Rafael': '21501'
    },
    'Los Chiles': {
      'Caño Negro': '21402',
      'El Amparo': '21403',
      'Los Chiles': '21401',
      'San Jorge': '21404'
    },
    'Naranjo': {
      'Cirrí': '20604',
      'El Rosario': '20607',
      'Naranjo': '20601',
      'Palmitos': '20608',
      'San Jerónimo': '20605',
      'San José': '20603',
      'San Juan': '20606',
      'San Miguel': '20602'
    },
    'Orotina': {
      'Coyolar': '20904',
      'Hacienda Vieja': '20903',
      'La Ceiba': '20905',
      'Mastate': '20902',
      'Orotina': '20901'
    },
    'Palmares': {
      'Buenos Aires': '20703',
      'Candelaria': '20705',
      'Esquipulas': '20706',
      'La Granja': '20707',
      'Palmares': '20701',
      'Santiago': '20704',
      'Zaragoza': '20702'
    },
    'Poás': {
      'Carrillos': '20804',
      'Sabana Redonda': '20805',
      'San Juan': '20802',
      'San Pedro': '20801',
      'San Rafael': '20803'
    },
    'Río Cuarto': {
      'Río Cuarto': '21601'
    },
    'San Carlos': {
      'Aguas Zarcas': '21004',
      'Buenavista': '21003',
      'Cutris': '21011',
      'Florencia': '21002',
      'La Fortuna': '21007',
      'La Palmera': '21009',
      'La Tigra': '21008',
      'Monterrey': '21012',
      'Pital': '21006',
      'Pocosol': '21013',
      'Quesada': '21001',
      'Venado': '21010',
      'Venecia': '21005'
    },
    'San Mateo': {
      'Desmonte': '20402',
      'Jesús María': '20403',
      'Labrador': '20404',
      'San Mateo': '20401'
    },
    'San Ramón': {
      'Alfaro': '20209',
      'Ángeles': '20208',
      'Concepción': '20211',
      'Peñas Blancas': '20213',
      'Piedades Norte': '20204',
      'Piedades Sur': '20205',
      'San Isidro': '20207',
      'San Juan': '20203',
      'San Lorenzo4': '20214',
      'San Rafael': '20206',
      'San Ramón': '20201',
      'Santiago': '20202',
      'Volio': '20210',
      'Zapotal': '20212'
    },
    'Upala': {
      'Aguas Claras': '21302',
      'Bijagua': '21304',
      'Canalete': '21308',
      'Delicias': '21305',
      'Dos Ríos': '21306',
      'San José (Pizote)': '21303',
      'Upala': '21301',
      'Yolillal': '21307'
    },
    'Valverde Vega': {
      'Rodríguez': '21205',
      'San Pedro': '21204',
      'Sarchí Norte': '21201',
      'Sarchí Sur': '21202',
      'Toro Amarillo': '21203'
    },
    'Zarcero': {
      'Brisas': '21107',
      'Guadalupe': '21104',
      'Laguna': '21102',
      'Palmira': '21105',
      'Tapezco': '21103',
      'Zapote': '21106',
      'Zarcero': '21101'
    }
  },
  'Cartago': {
    'Alvarado': {
      'Capellades': '30603',
      'Cervantes': '30602',
      'Pacayas': '30601'
    },
    'Cartago': {
      'Agua Caliente (San Francisco)': '30105',
      'Carmen': '30103',
      'Corralillo': '30107',
      'Dulce Nombre': '30109',
      'Guadalupe (Arenilla)': '30106',
      'Llano Grande': '30110',
      'Occidental': '30102',
      'Oriental': '30101',
      'Quebradilla': '30111',
      'San Nicolás': '30104',
      'Tierra Blanca': '30108'
    },
    'El Guarco': {
      'Patio de Agua': '30804',
      'San Isidro': '30802',
      'Tejar': '30801',
      'Tobosi': '30803'
    },
    'Jiménez': {
      'Juan Viñas': '30401',
      'Pejibaye': '30403',
      'Tucurrique': '30402'
    },
    'La Unión': {
      'Concepción': '30305',
      'Dulce Nombre': '30306',
      'Río Azul': '30308',
      'San Diego': '30302',
      'San Juan': '30303',
      'San Rafael': '30304',
      'San Ramón': '30307',
      'Tres Ríos': '30301'
    },
    'Oreamuno': {
      'Cipreses': '30704',
      'Cot': '30702',
      'Potrero Cerrado': '30703',
      'San Rafael': '30701',
      'Santa Rosa': '30705'
    },
    'Paraíso': {
      'Cachí': '30204',
      'Llanos de Santa Lucía': '30205',
      'Orosi': '30203',
      'Paraíso': '30201',
      'Santiago de Paraíso': '30202'
    },
    'Turrialba': {
      'Chirripó': '30512',
      'La Isabel': '30511',
      'La Suiza': '30502',
      'Pavones': '30506',
      'Peralta': '30503',
      'Santa Cruz': '30504',
      'Santa Rosa': '30509',
      'Santa Teresita': '30505',
      'Tayutic': '30508',
      'Tres Equis': '30510',
      'Tuis': '30507',
      'Turrialba': '30501'
    }
  },
  'Guanacaste': {
    'Abangares': {
      'Colorado': '50704',
      'Las Juntas': '50701',
      'San Juan': '50703',
      'Sierra': '50702'
    },
    'Bagaces': {
      'Bagaces': '50401',
      'La Fortuna': '50402',
      'Mogote': '50403',
      'Río Naranjo': '50404'
    },
    'Cañas': {
      'Bebedero': '50604',
      'Cañas': '50601',
      'Palmira': '50602',
      'Porozal': '50605',
      'San Miguel': '50603'
    },
    'Carrillo': {
      'Belén': '50504',
      'Filadelfia': '50501',
      'Palmira': '50502',
      'Sardinal': '50503'
    },
    'Hojancha': {
      'Hojancha': '51101',
      'Huacas': '51104',
      'Matambú': '51105',
      'Monte Romo': '51102',
      'Puerto Carrillo': '51103'
    },
    'La Cruz': {
      'La Cruz': '51001',
      'La Garita': '51003',
      'Santa Cecilia': '51002',
      'Santa Elena': '51004'
    },
    'Liberia': {
      'Cañas Dulces': '50102',
      'Curubandé': '50105',
      'Liberia': '50101',
      'Mayorga': '50103',
      'Nacascolo': '50104'
    },
    'Nandayure': {
      'Bejuco': '50906',
      'Carmona': '50901',
      'Porvenir': '50905',
      'San Pablo': '50904',
      'Santa Rita': '50902',
      'Zapotal': '50903'
    },
    'Nicoya': {
      'Belén de Nosarita': '50207',
      'Mansión': '50202',
      'Nicoya': '50201',
      'Nosara': '50206',
      'Quebrada Honda': '50204',
      'Sámara': '50205',
      'San Antonio': '50203'
    },
    'Santa Cruz': {
      'Bolsón': '50302',
      'Cabo Velas': '50308',
      'Cartagena': '50305',
      'Cuajiniquil': '50306',
      'Diriá': '50307',
      'Santa Cruz': '50301',
      'Tamarindo': '50309',
      'Tempate': '50304',
      'Veintisiete de Abril': '50303'
    },
    'Tilarán': {
      'Arenal': '50807',
      'Líbano': '50805',
      'Quebrada Grande': '50802',
      'Santa Rosa': '50804',
      'Tierras Morenas': '50806',
      'Tilarán': '50801',
      'Tronadora': '50803'
    }
  },
  'Heredia': {
    ' Barva': {
      'Barva': '40201',
      'San José de la Montaña': '40206',
      'San Pablo': '40203',
      'San Pedro': '40202',
      'San Roque': '40204',
      'Santa Lucía': '40205'
    },
    'Belén': {
      'La Asunción': '40703',
      'La Ribera': '40702',
      'San Antonio': '40701'
    },
    'Flores': {
      'Barrantes': '40802',
      'Llorente': '40803',
      'San Joaquín': '40801'
    },
    'Heredia': {
      'Heredia': '40101',
      'Mercedes': '40102',
      'San Francisco': '40103',
      'Ulloa': '40104',
      'Vara Blanca': '40105'
    },
    'San Isidro': {
      'Concepción': '40603',
      'San Francisco': '40604',
      'San Isidro': '40601',
      'San José': '40602'
    },
    'San Pablo': {
      'Rincón de Sabanilla': '40902',
      'San Pablo': '40901'
    },
    'San Rafael': {
      'Ángeles': '40504',
      'Concepción': '40505',
      'San Josecito': '40502',
      'San Rafael': '40501',
      'Santiago': '40503'
    },
    'Santa Bárbara': {
      'Jesús': '40404',
      'Purabá': '40406',
      'San Juan': '40403',
      'San Pedro': '40402',
      'Santa Bárbara': '40401',
      'Santo Domingo': '40405'
    },
    'Santo Domingo': {
      'Pará': '40308',
      'Paracito': '40304',
      'San Miguel': '40303',
      'San Vicente': '40302',
      'Santa Rosa': '40306',
      'Santo Domingo': '40301',
      'Santo Tomás': '40305',
      'Tures': '40307'
    },
    'Sarapiquí': {
      'Cureña': '41005',
      'Horquetas': '41003',
      'La Virgen': '41002',
      'Llanuras del Gaspar': '41004',
      'Puerto Viejo': '41001'
    }
  },
  'Limón': {
    'Guácimo': {
      'Duacarí': '70605',
      'Guácimo': '70601',
      'Mercedes': '70602',
      'Pocora': '70603',
      'Río Jiménez': '70604'
    },
    'Limón': {
      'Limón': '70101',
      'Matama': '70104',
      'Río Blanco': '70103',
      'Valle La Estrella': '70102'
    },
    'Matina': {
      'Batán': '70502',
      'Carrandi': '70503',
      'Matina': '70501'
    },
    'Pococí': {
      'Cariari': '70205',
      'Colorado': '70206',
      'Guápiles': '70201',
      'Jiménez': '70202',
      'La Colonia': '70207',
      'La Rita': '70203',
      'Roxana': '70204'
    },
    'Siquirres': {
      'Alegría': '70306',
      'Cairo': '70305',
      'Florida': '70303',
      'Germania': '70304',
      'Pacuarito': '70302',
      'Siquirres': '70301'
    },
    'Talamanca': {
      'Bratsi': '70401',
      'Cahuita': '70403',
      'Sixaola': '70402',
      'Telire': '70404'
    }
  },
  'Puntarenas': {
    'Buenos Aires': {
      'Biolley': '60308',
      'Boruca': '60304',
      'Brunka': '60309',
      'Buenos Aires': '60301',
      'Chánguena': '60307',
      'Colinas': '60306',
      'Pilas': '60305',
      'Potrero Grande': '60303',
      'Volcán': '60302'
    },
    'Corredores': {
      'Corredor': '61001',
      'La Cuesta': '61002',
      'Laurel': '61004',
      'Paso Canoas': '61003'
    },
    'Coto Brus': {
      'Aguabuena': '60803',
      'Gutiérrez Brown': '60806',
      'Limoncito': '60804',
      'Pittier': '60805',
      'Sabalito': '60802',
      'San Vito': '60801'
    },
    'Esparza': {
      'Caldera': '60206',
      'Espíritu Santo': '60201',
      'Macacona': '60203',
      'San Jerónimo': '60205',
      'San Juan Grande': '60202',
      'San Rafael': '60204'
    },
    'Garabito': {
      'Jacó': '61101',
      'Tárcoles': '61102'
    },
    'Golfito': {
      'Golfito': '60701',
      'Guaycará': '60703',
      'Pavón': '60704',
      'Puerto Jiménez': '60702'
    },
    'Montes de Oro': {
      'La Unión': '60402',
      'Miramar': '60401',
      'San Isidro': '60403'
    },
    'Osa': {
      'Bahía Ballena': '60504',
      'Bahía Drake': '60506',
      'Cortés': '60501',
      'Palmar': '60502',
      'Piedras Blancas': '60505',
      'Sierpe': '60503'
    },
    'Parrita': {
      'Parrita': '60901'
    },
    'Puntarenas': {
      'Acapulco': '60114',
      'Arancibia': '60116',
      'Barranca': '60108',
      'Chacarita': '60112',
      'Chira': '60113',
      'Chomes': '60103',
      'Cóbano': '60111',
      'El Roble': '60115',
      'Guacimal': '60107',
      'Isla del Coco': '60110',
      'Lepanto': '60104',
      'Manzanillo': '60106',
      'Monteverde': '60109',
      'Paquera': '60105',
      'Pitahaya': '60102',
      'Puntarenas': '60101'
    },
    'Quepos': {
      'Naranjito': '60603',
      'Quepos': '60601',
      'Savegre': '60602'
    }
  },
  'San José': {
    'Acosta': {
      'Cangrejal': '11204',
      'Guaitil': '11202',
      'Palmichal': '11203',
      'Sabanillas': '11205',
      'San Ignacio': '11201'
    },
    'Alajuelita': {
      'Alajuelita': '11001',
      'Concepción': '11004',
      'San Antonio': '11003',
      'San Felipe': '11005',
      'San Josecito': '11002'
    },
    'Aserrí': {
      'Aserrí': '10504',
      'Legua': '10605',
      'Monterrey': '10606',
      'Salitrillos': '10607',
      'San Gabriel': '10604',
      'Tarbaca': '10602',
      'Vuelta de Jorco': '10603'
    },
    'Curridabat': {
      'Curridabat': '11801',
      'Granadilla': '11802',
      'Sánchez': '11803',
      'Tirrases': '11804'
    },
    'Desamparados': {
      'Damas': '10310',
      'Desamparados': '10301',
      'Frailes': '10306',
      'Gravilias': '10312',
      'Los Guido': '10313',
      'Patarrá': '10307',
      'Rosario': '10309',
      'San Antonio': '10305',
      'San Cristóbal': '10308',
      'San Juan de Dios': '10303',
      'San Miguel': '10302',
      'San Rafael Abajo': '10311',
      'San Rafael Arriba': '10304'
    },
    'Dota': {
      'Copey': '11703',
      'Jardín': '11702',
      'Santa María': '11701'
    },
    'Escazú': {
      'Escazú': '10201',
      'San Antonio': '10202',
      'San Rafael': '10203'
    },
    'Goicoechea': {
      'Calle Blancos': '10803',
      'Guadalupe': '10801',
      'Ipís': '10805',
      'Mata de Plátano': '10804',
      'Purral': '10807',
      'Rancho Redondo': '10806',
      'San Francisco': '10802'
    },
    'León Cortés Castro': {
      'Llano Bonito': '12003',
      'San Andrés': '12002',
      'San Antonio': '12006',
      'San Isidro': '12004',
      'San Pablo': '12001',
      'Santa Cruz': '12005'
    },
    'Montes de Oca': {
      'Mercedes': '11503',
      'Sabanilla': '11502',
      'San Pedro': '11501',
      'San Rafael': '11504'
    },
    'Mora': {
      'Ciudad Colón': '10701',
      'Guayabo': '10702',
      'Jaris': '10706',
      'Picagres': '10705',
      'Piedras Negras': '10704',
      'Quitirrisí': '10707',
      'Tabarcia': '10703'
    },
    'Moravia': {
      'San Jerónimo': '11402',
      'San Vicente': '11401',
      'Trinidad': '11403'
    },
    'Pérez Zeledón': {
      'Barú': '11909',
      'Cajón': '11908',
      'Daniel Flores': '11903',
      'El General': '11902',
      'La Amistad': '11912',
      'Páramo': '11911',
      'Pejibaye': '11907',
      'Platanares': '11906',
      'Río Nuevo': '11910',
      'Rivas': '11904',
      'San Isidro de El General': '11901',
      'San Pedro': '11905'
    },
    'Puriscal': {
      'Barbacoas': '10403',
      'Candelarita': '10406',
      'Chires': '10409',
      'Desamparaditos': '10407',
      'Grifo Alto': '10404',
      'La Cangreja': '10410',
      'Mercedes Sur': '10402',
      'San Antonio': '10408',
      'San Rafael': '10405',
      'Santiago': '10401'
    },
    'San José': {
      'Carmen': '10101',
      'Catedral': '10104',
      'Hatillo': '10110',
      'Hospital': '10103',
      'Mata Redonda': '10108',
      'Merced': '10102',
      'Pavas': '10109',
      'San Francisco de Dos Ríos': '10106',
      'San Sebastián': '10111',
      'Uruca': '10107',
      'Zapote': '10105'
    },
    'Santa Ana': {
      'Brasil': '10906',
      'Piedades': '10905',
      'Pozos': '10903',
      'Salitral': '10902',
      'Santa Ana': '10901',
      'Uruca': '10904'
    },
    'Tarrazú': {
      'San Carlos': '10503',
      'San Lorenzo': '10502',
      'San Marcos': '10501'
    },
    'Tibás': {
      'Anselmo Llorente': '11303',
      'Cinco Esquinas': '11302',
      'Colima': '11305',
      'León XIII': '11304',
      'San Juan': '11301'
    },
    'Turrubares': {
      'Carara': '11605',
      'San Juan de Mata': '11603',
      'San Luis': '11604',
      'San Pablo': '11601',
      'San Pedro': '11602'
    },
    'Vásquez de Coronado': {
      'Cascajal': '11105',
      'Dulce Nombre de Jesús': '11103',
      'Patalillo': '11104',
      'San Isidro': '11101',
      'San Rafael': '11102'
    }
  }
}

export default {
  country: 'CRI',
  abbr: 'CR',
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
      maxLength: 5,
      name: 'postalCode',
      postalCodeAPI: false,
      required: true,
      regex: /^([\d]{5})$/,
      size: 'small',
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
      required: false,
      autoComplete: 'nope',
    },
    {
      name: 'complement',
      maxLength: 750,
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
      label: 'province',
      required: true,
      size: 'xlarge',
      level: 2,
      basedOn: 'state',
      optionsMap: getTwoLevels(countryData),
    },
    {
      name: 'neighborhood',
      maxLength: 100,
      label: 'district',
      required: true,
      size: 'xlarge',
      level: 3,
      basedOn: 'city',
      optionsMap: getThreeLevels(countryData),
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
      required: false,
      handler: address => {
        if (!address.state || !address.city || !address.neighborhood) {
          return address
        }

        if (
          countryData[address.state.value] &&
          countryData[address.state.value][address.city.value] &&
          countryData[address.state.value][address.city.value][address.neighborhood.value]
        ) {
          address.postalCode = {
            value:
            countryData[address.state.value][address.city.value][address.neighborhood.value],
          }
        }

        return address
      },
    },
    number: {
      valueIn: 'long_name',
      types: ['street_number'],
      required: false,
      notApplicable: true,
    },
    street: {
      valueIn: 'long_name',
      types: ['route']
    },
    neighborhood: {
      valueIn: 'long_name',
      types: ["neighborhood", "sublocality_level_1", "sublocality_level_2", "sublocality_level_3", "sublocality_level_4", "sublocality_level_5"],
    },
    state: {
      valueIn: 'short_name',
      types: ['administrative_area_level_1'],
    },
    city: {
      valueIn: 'long_name',
      types: ["administrative_area_level_2", "locality"],
    },
  },
  summary: [
    [
      { name: 'street' },
      { delimiter: ' ', name: 'complement' },
    ],
    [{ name: 'neighborhood' }],
    [{ name: 'city' }, { delimiter: ', ', name: 'state' }],
  ],
}
