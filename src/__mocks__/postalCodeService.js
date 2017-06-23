const fallbackAddress = {
  city: '',
  state: '',
  street: '',
  number: '',
  neighborhood: '',
  complement: '',
  reference: '',
  geoCoordinates: [],
}

const addresses = {
  BRA: {
    '22231000': {
      postalCode: '22231000',
      city: 'Rio de Janeiro',
      state: 'RJ',
      country: 'BRA',
      street: 'Rua Barão de Itambi',
      number: '',
      neighborhood: 'Botafogo',
      complement: '',
      reference: '',
      geoCoordinates: [],
    },
  },
}

export function getAddress({ accountName, country, postalCode }) {
  return new Promise((resolve, reject) => {
    const address = addresses[country] && addresses[country][postalCode]
    console.log({ ENV: process.env.NODE_ENV })

    if (process.env.NODE_ENV === 'test') {
      process.nextTick(
        () =>
          (address
            ? resolve(address)
            : resolve({
              ...fallbackAddress,
              country,
              postalCode,
            }))
      )
    } else {
      setTimeout(
        () =>
          (address
            ? resolve(address)
            : resolve({
              ...fallbackAddress,
              country,
              postalCode,
            })),
        5000
      )
    }
  })
}
