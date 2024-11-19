import { THREE_LEVELS } from '../constants'
import { thirdLevelPostalCodes } from '../transforms/postalCodes'
import { getOneLevel, getTwoLevels, getThreeLevels } from '../transforms/addressFieldsOptions'
import type { PostalCodeRules } from '../types/rules'

const countryData = {
  Ahuachapán: {
    'Ahuachapán Centro': {
      Ahuachapán: '2101',
      Apaneca: '2102',
      'Concepción de Ataco': '2106',
      Tacuba: '2117'
    },
    'Ahuachapán Norte': {
      Atiquizaya: '2103',
      'El Refugio': '2107',
      'San Lorenzo': '2115',
      Turín: '2118'
    },
    'Ahuachapán Sur': {
      Guaymango: '2108',
      Jujutla: '2109',
      'San Francisco Menéndez': '2113',
      'San Pedro Puxtla': '2116'
    }
  },
  Cabañas: {
    'Cabañas Este': {
      Dolores: '1209',
      Guacotecti: '1203',
      'San Isidro': '1207',
      Sensuntepeque: '1201',
      Victoria: '1210'
    },
    'Cabañas Oeste': {
      Cinquera: '1202',
      Ilobasco: '1204',
      Jutiapa: '1206',
      Tejutepeque: '1208'
    }
  },
  Chalatenango: {
    'Chalatenango Centro': {
      'Agua Caliente': '1302',
      'Dulce Nombre de María': '1309',
      'El Paraíso': '1312',
      'La Reina': '1315',
      'Nueva Concepción': '1319',
      'San Fernando': '1326',
      'San Francisco Morazán': '1328',
      'San Rafael': '1333',
      'Santa Rita': '1334',
      Tejutla: '1335'
    },
    'Chalatenango Norte': {
      Citalá: '1306',
      'La Palma': '1314',
      'San Ignacio': '1329'
    },
    'Chalatenango Sur': {
      Arcatao: '1303',
      Azacualpa: '1304',
      Chalatenango: '1301',
      Comalapa: '1307',
      'Concepción Quezaltepeque': '1308',
      'El Carrizal': '1311',
      'La Laguna': '1313',
      'Las Vueltas': '1317',
      'Nombre de Jesús': '1318',
      'Nueva Trinidad': '1320',
      'Ojos de Agua': '1321',
      Potonico: '1322',
      'San Antonio de la Cruz': '1324',
      'San Antonio Los Ranchos': '1325',
      'San Francisco Lempa': '1327',
      'San Isidro Labrador': '1330',
      'San José Cancasque': '1305',
      'San José Las Flores': '1316',
      'San Luis del Carmen': '1331',
      'San Miguel de Mercedes': '1332'
    }
  },
  Cuscatlán: {
    'Cuscatlán Norte': {
      'Oratorio de Concepción': '1406',
      'San Bartolomé Perulapía': '1407',
      'San José Guayabal': '1409',
      'San Pedro Perulapán': '1410',
      Suchitoto: '1415'
    },
    'Cuscatlán Sur': {
      Candelaria: '1402',
      Cojutepeque: '1401',
      'El Carmen': '1403',
      'El Rosario': '1404',
      'Monte San Juan': '1405',
      'San Cristóbal': '1408',
      'San Rafael Cedros': '1411',
      'San Ramón': '1412',
      'Santa Cruz Analquito': '1413',
      'Santa Cruz Michapa': '1414',
      Tenancingo: '1416'
    }
  },
  'La Libertad': {
    'La Libertad Centro': {
      'Ciudad Arce': '1504',
      'San Juan Opico': '1514'
    },
    'La Libertad Costa': {
      Chiltiupán: '1507',
      Jicalapa: '1510',
      'La Libertad': '1511',
      Tamanique: '1522',
      Teotepeque: '1523'
    },
    'La Libertad Este': {
      'Antiguo Cuscatlán': '1502',
      Huizúcar: '1508',
      'Nuevo Cuscatlán': '1513',
      'San José Villanueva': '1517',
      Zaragoza: '1525'
    },
    'La Libertad Norte': {
      Quezaltepeque: '1515',
      'San Matías': '1518',
      'San Pablo Tacachico': '1519'
    },
    'La Libertad Oeste': {
      Colon: '1512',
      Jayaque: '1509',
      Sacacoyo: '1516',
      Talnique: '1521',
      Tepecoyo: '1524'
    },
    'La Libertad Sur': {
      Comasagua: '1506',
      'Santa Tecla': '1501'
    }
  },
  'La Paz': {
    'La Paz Centro': {
      'El Rosario': '1604',
      Jerusalén: '1605',
      'Mercedes La Ceiba': '1607',
      'Paraíso de Osorio': '1609',
      'San Antonio Masahuat': '1610',
      'San Emigdio': '1611',
      'San Juan Tepezontes': '1615',
      'San Luis La Herradura': '1606',
      'San Miguel Tepezontes': '1617',
      'San Pedro Nonualco': '1619',
      'Santa María Ostuma': '1621',
      'Santiago Nonualco': '1622'
    },
    'La Paz Este': {
      'San Juan Nonualco': '1613',
      'San Rafael Obrajuelo': '1620',
      Zacatecoluca: '1601'
    },
    'La Paz Oeste': {
      Cuyultitán: '1603',
      Olocuilta: '1608',
      'San Francisco Chinameca': '1612',
      'San Juan Talpa': '1614',
      'San Luis Talpa': '1616',
      'San Pedro Masahuat': '1618',
      Tapalhuaca: '1623'
    }
  },
  'La Unión': {
    'La Unión Norte': {
      Anamorós: '3104',
      Bolivar: '3105',
      'Concepción de Oriente': '3106',
      'El Sauce': '3109',
      Lislique: '3112',
      'Nueva Esparta': '3114',
      Pasaquina: '3116',
      Polorós: '3117',
      'San José de La Fuente': '3120',
      'Santa Rosa de Lima': '3121'
    },
    'La Unión Sur': {
      Conchagua: '3107',
      'El Carmen': '3108',
      Intipucá: '3111',
      'La Unión': '3101',
      'Meanguera del Golfo': '3113',
      'San Alejo': '3119',
      Yayantique: '3122',
      Yucuaiquín: '3123'
    },
  },
  Morazán: {
    'Morazán Norte': {
      Arambala: '3202',
      Cacaopera: '3203',
      Corinto: '3204',
      'El Rosario': '3208',
      Joateca: '3211',
      Jocoaitique: '3212',
      Meanguera: '3215',
      Perquín: '3217',
      'San Fernando': '3219',
      'San Isidro': '3220',
      Torola: '3224'
    },
    'Morazán Sur': {
      Chilanga: '3205',
      'Delicias de Concepción': '3206',
      'El Divisadero': '3207',
      Gualococti: '3209',
      Guatajiagua: '3210',
      Jocoro: '3213',
      Lolotiquillo: '3214',
      Osicala: '3216',
      'San Carlos': '3218',
      'San Francisco Gotera': '3201',
      'San Simón': '3221',
      Sensembra: '3222',
      Sociedad: '3223',
      Yamabal: '3225',
      Yoloaiquín: '3226'
    }
  },
  'San Miguel': {
    'San Miguel Centro': {
      Chirilagua: '3307',
      Comacarán: '3304',
      Moncagua: '3312',
      Quelepa: '3315',
      'San Miguel': '3301',
      Uluazapa: '3324'
    },
    'San Miguel Norte': {
      Carolina: '3302',
      Chapeltique: '3305',
      'Ciudad Barrios': '3303',
      'Nuevo Edén de San Juan': '3314',
      'San Antonio del Mosco': '3316',
      'San Gerardo': '3318',
      'San Luis de la Reina': '3320',
      Sesori: '3323'
    },
    'San Miguel Oeste': {
      Chinameca: '3306',
      'El Tránsito': '3309',
      Lolotique: '3311',
      'Nueva Guadalupe': '3313',
      'San Jorge': '3319',
      'San Rafael Oriente': '3322'
    }
  },
  'San Salvador': {
    'San Salvador Centro': {
      Ayutuxtepeque: '1121',
      'Ciudad Delgado': '1118',
      Cuscatancingo: '1119',
      Mejicanos: '1120',
      'San Salvador': '1101'
    },
    'San Salvador Este': {
      Ilopango: '1117',
      'San Martín': '1129',
      Soyapango: '1116',
      Tonacatepeque: '1132'
    },
    'San Salvador Norte': {
      Aguilares: '1122',
      'El Paisnal': '1124',
      Guazapa: '1125'
    },
    'San Salvador Oeste': {
      Apopa: '1123',
      Nejapa: '1126'
    },
    'San Salvador Sur': {
      Panchimalco: '1127',
      'Rosario de Mora': '1128',
      'San Marcos': '1115',
      'Santiago Texacuangos': '1130',
      'Santo Tomas': '1131'
    }
  },
  'San Vicente': {
    'San Vicente Norte': {
      Apastepeque: '1702',
      'San Esteban Catarina': '1705',
      'San Ildefonso': '1706',
      'San Lorenzo': '1707',
      'San Sebastián': '1708',
      'Santa Clara': '1709',
      'Santo Domingo': '1710'
    },
    'San Vicente Sur': {
      Guadalupe: '1703',
      'San Cayetano Istepeque': '1704',
      'San Vicente': '1701',
      Tecoluca: '1711',
      Tepetitán: '1712',
      Verapaz: '1713'
    }
  },
  'Santa Ana': {
    'Santa Ana Centro': {
      'Santa Ana': '2201'
    },
    'Santa Ana Este': {
      Coatepeque: '2204',
      'El Congo': '2207'
    },
    'Santa Ana Norte': {
      Masahuat: '2210',
      Metapán: '2211',
      'Santa Rosa Guachipilín': '2216',
      Texistepeque: '2218'
    },
    'Santa Ana Oeste': {
      'Candelaria de la Frontera': '2203',
      Chalchuapa: '2205',
      'El Porvenir': '2208',
      'San Antonio Pajonal': '2212',
      'San Sebastian Salitrillo – Ciudad Real': '2215',
      'Santiago de la Frontera': '2217'
    }
  },
  Sonsonate: {
    'Sonsonate Centro': {
      Nahulingo: '2312',
      'San Antonio del Monte': '2314',
      'Santo Domingo Guzmán': '2319',
      Sonsonate: '2301',
      Sonzacate: '2320'
    },
    'Sonsonate Este': {
      Armenia: '2303',
      Caluco: '2304',
      Cuisnahuat: '2305',
      Izalco: '2306',
      'San Julián': '2316',
      'Santa Isabel Ishuatán': '2318'
    },
    'Sonsonate Norte': {
      Juayúa: '2307',
      Nahuizalco: '2311',
      Salcoatitán: '2313',
      'Santa Catarina Masahuat': '2317'
    },
    'Sonsonate Oeste': {
      Acajutla: '2302'
    }
  },
  Usulután: {
    'Usulután Este': {
      California: '3404',
      'Concepción Batres': '3405',
      Ereguayquín: '3407',
      Jucuarán: '3411',
      Ozatlán: '3415',
      'San Dionisio': '3420',
      'Santa Elena': '3422',
      'Santa María': '3423',
      Tecapán: '3426',
      Usulután: '3401'
    },
    'Usulután Norte': {
      Alegría: '3402',
      Berlín: '3403',
      'El Triunfo': '3406',
      Estanzuelas: '3408',
      Jucuapa: '3410',
      'Mercedes Umaña': '3412',
      'Nueva Granada': '3413',
      'San Buenaventura': '3419',
      'Santiago de María': '3424'
    },
    'Usulután Oeste': {
      Jiquilisco: '3409',
      'Puerto El Triunfo': '3417',
      'San Agustín': '3418',
      'San Francisco Javier': '3421'
    }
  }
}

const rules: PostalCodeRules = {
  country: 'SLV',
  abbr: 'SV',
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
      postalCodeAPI: false,
      required: true,
      regex: /^[\d]{4}$/,
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
      name: 'neighborhood',
      maxLength: 100,
      label: 'district',
      required: true,
      size: 'large',
      level: 3,
      basedOn: 'city',
      optionsMap: getThreeLevels(countryData),
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
      required: false,
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

    receiverName: {
      required: true,
    },
  },
  summary: [
    [{ name: 'street' }],
    [{ name: 'complement' }],
    [{ name: 'neighborhood' }, { delimiter: ' - ', name: 'city' }, { delimiter: ' - ', name: 'state' }],
  ],
}

export default rules
