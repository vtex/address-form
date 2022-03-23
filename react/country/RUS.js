import { ONE_LEVEL } from '../constants'
import { firstLevelPostalCodes } from '../transforms/postalCodes'
import { getOneLevel } from '../transforms/addressFieldsOptions'

const countryDataRaw = {
  'Республика Адыгея': {
    Maykop: '385000',
  },
  'Алтайский край': {
    Barnaul: '656000',
  },
  'Республика Алтай': {
    'Gorno-Altaysk': '649000',
  },
  'Амурская область': {
    Blagoveshchensk: '675000',
  },
  'Архангельская область': {
    Arkhangelsk: '163000',
  },
  'Астраханская область': {
    Astrakhan: '414000',
  },
  'Республика Башкортостан': {
    Ufa: '450000',
  },
  'Белгородская область': {
    Belgorod: '308000',
  },
  'Брянская область': {
    Bryansk: '241000',
  },
  'Республика Бурятия': {
    'Ulan-Ude': '670000',
  },
  'Чеченская Республика': {
    Grozny: '386000',
  },
  'Челябинская область': {
    Chelyabinsk: '454000',
  },
  'Чукотский автономный округ': {
    Anadyr: '689541',
  },
  'Чувашская Республика': {
    Cheboksary: '428000',
  },
  'Республика Крым': {
    Simferopol: '95000',
  },
  'Республика Дагестан': {
    Makhachkala: '367000',
  },
  'Республика Ингушетия': {
    'Magas (Largest city: Nazran)': '386200',
  },
  'Иркутская область': {
    Irkutsk: '664000',
  },
  'Ивановская область': {
    Ivanovo: '152990',
  },
  'Еврейская автономная область': {
    Birobidzhan: '679000',
  },
  'Кабардино-Балкарская Республика': {
    Nalchik: '360000',
  },
  'Калининградская область': {
    Kaliningrad: '236000',
  },
  'Республика Калмыкия': {
    Elista: '358000',
  },
  'Калужская область': {
    Kaluga: '248000',
  },
  'Камчатский край': {
    'Petropavlovsk-Kamchatsky': '683010',
  },
  'Карачаево-Черкесская Республика': {
    Cherkessk: '369000',
  },
  'Республика Карелия': {
    Petrozavodsk: '185000',
  },
  Казахстан: {
    'Nur-Sultan ': '10015',
  },
  'Кемеровская область': {
    'Kemerovo (Largest city: Novokuznetsk)': '650000',
  },
  'Хабаровский край': {
    Khabarovsk: '680000',
  },
  'Республика Хакасия': {
    Abakan: '655000',
  },
  'Ханты-Мансийский автономный округ - Югра': {
    'Khanty-Mansiysk (Largest city: Surgut)': '628000',
  },
  'Кировская область': {
    Kirov: '610000',
  },
  'Республика Коми': {
    Syktyvkar: '166747',
  },
  'Костромская область': {
    Kostroma: '156000',
  },
  'Краснодарский край': {
    Krasnodar: '350000',
  },
  'Красноярский край': {
    Krasnoyarsk: '660000',
  },
  'Курганская область': {
    Kurgan: '640000',
  },
  'Курская область': {
    Kursk: '303980',
  },
  'Ленинградская область': {
    'Largest city: Gatchina': '187000',
  },
  'Липецкая область': {
    Lipetsk: '398000',
  },
  'Магаданская область': {
    Magadan: '685000',
  },
  'Республика Марий Эл': {
    'Yoshkar-Ola': '424000',
  },
  'Республика Мордовия': {
    Saransk: '430000',
  },
  Москва: {
    Moscow: '100000',
  },
  'Московская область': {
    'Largest city: Balashikha': '101194',
  },
  'Мурманская область': {
    Murmansk: '183000',
  },
  'Ненецкий автономный округ': {
    'Naryan-Mar': '166000',
  },
  'Нижегородская область': {
    'Nizhny Novgorod': '603000',
  },
  'Республика Северная Осетия — Алания': {
    Vladikavkaz: '362000',
  },
  'Новгородская область': {
    'Veliky Novgorod': '173000',
  },
  'Новосибирская область': {
    Novosibirsk: '630000',
  },
  'Омская область': {
    Omsk: '644000',
  },
  'Оренбургская область': {
    Orenburg: '460000',
  },
  'Орловская область': {
    Oryol: '302000',
  },
  'Пензенская область': {
    Penza: '440000',
  },
  'Пермский край': {
    Perm: '614000',
  },
  'Приморский край': {
    Vladivostok: '690000',
  },
  'Псковская область': {
    Pskov: '180000',
  },
  'Ростовская область': {
    'Rostov-on-Don': '344000',
  },
  'Рязанская область': {
    Ryazan: '390000',
  },
  'Санкт-Петербург': {
    'Saint Petersburg': '190000',
  },
  'Республика Саха (Якутия)': {
    Yakutsk: '677001',
  },
  'Сахалинская область': {
    'Yuzhno-Sakhalinsk': '693000',
  },
  'Самарская область': {
    Samara: '443000',
  },
  'Саратовская область': {
    Saratov: '410000',
  },
  'Смоленская область': {
    Smolensk: '214000',
  },
  'Ставропольский край': {
    Stavropol: '355000',
  },
  'Свердловская область': {
    Yekaterinburg: '620000',
  },
  'Тамбовская область': {
    Tambov: '392000',
  },
  'Республика Татарстан': {
    Kazan: '420000',
  },
  'Томская область': {
    Tomsk: '634000',
  },
  'Тульская область': {
    Tula: '300000',
  },
  'Республика Тыва': {
    Kyzyl: '667000',
  },
  'Тверская область': {
    Tver: '170000',
  },
  'Тюменская область': {
    Tyumen: '625000',
  },
  'Удмуртская Республика': {
    Izhevsk: '426000',
  },
  'Ульяновская область': {
    Ulyanovsk: '432000',
  },
  'Владимирская область': {
    Vladimir: '600000',
  },
  'Волгоградская область': {
    Volgograd: '400000',
  },
  'Вологодская область': {
    'Vologda (Largest city: Cherepovets)': '160000',
  },
  'Воронежская область': {
    Voronezh: '394000',
  },
  'Ямало-Ненецкий автономный округ': {
    'Salekhard (Largest city: Novy Urengoy)': '629000',
  },
  'Ярославская область': {
    Yaroslavl: '150000',
  },
  'Забайкальский край': {
    Chita: '672000',
  },
}

function capitalizeStatename(rawObj) {
  const states = Object.keys(rawObj)
  const convertedObj = {}

  for (const state of states) {
    const stateCapitalized = state.toLocaleUpperCase()

    convertedObj[stateCapitalized] = rawObj[state]
  }

  return convertedObj
}

const countryData = capitalizeStatename(countryDataRaw)

export default {
  country: 'RUS',
  abbr: 'RU',
  postalCodeFrom: ONE_LEVEL,
  postalCodeLevels: ['state'],
  firstLevelPostalCodes: firstLevelPostalCodes(countryData),
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
      label: 'postalCode',
      maxLength: 50,
      name: 'postalCode',
      postalCodeAPI: false,
      required: true,
      regex: /^(\d{6}|)$/,
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
      size: 'mini',
    },
    {
      name: 'reference',
      maxLength: 750,
      label: 'reference',
      size: 'mini',
    },
    {
      name: 'neighborhood',
      maxLength: 100,
      label: 'neighborhood',
      required: true,
      size: 'mini',
    },
    {
      name: 'state',
      maxLength: 100,
      label: 'region',
      required: true,
      size: 'large',
      level: 1,
      options: getOneLevel(countryData),
    },
    {
      name: 'city',
      maxLength: 100,
      label: 'city',
      required: true,
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
    },

    number: {
      valueIn: 'long_name',
      types: ['street_number'],
      required: false,
      notApplicable: true,
    },

    street: { valueIn: 'long_name', types: ['route'] },

    state: {
      valueIn: 'long_name',
      types: ['administrative_area_level_1'],
      handler: (address) => {
        if (!address.city || !address.state) {
          return address
        }

        const states = Object.keys(countryData)

        for (let i = 0; i < states.length; i++) {
          const state = states[i]
          const cities = Object.keys(countryData[state])
          const hasCity = cities.indexOf(address.city.value) !== -1

          if (hasCity) {
            address.state = { value: state }

            return address
          }
        }

        return address
      },
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
      { delimiter: ' ', name: 'complement' },
    ],
    [
      { name: 'neighborhood', delimiterAfter: ' - ' },
      { name: 'city' },
      { delimiter: ' - ', name: 'state' },
    ],
    [{ name: 'postalCode' }],
  ],
}
