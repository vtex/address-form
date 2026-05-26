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
    22231000: {
      postalCode: '22231000',
      city: 'Rio de Janeiro',
      state: 'RJ',
      country: 'BRA',
      street: 'Rua Barão de Itambi',
      number: '',
      neighborhood: 'Botafogo',
      complement: undefined,
      reference: null,
      geoCoordinates: [],
    },
    22251000: { reject: true },
  },
}

export function getAddress({ country, postalCode }) {
  return new Promise((resolve, reject) => {
    const address = addresses[country]?.[postalCode]
    const shouldReject = address?.reject === true

    process.nextTick(() => {
      if (shouldReject) {
        reject(new Error('Error'))

        return
      }

      if (address) {
        resolve({ ...address })

        return
      }

      resolve({ ...fallbackAddress, country, postalCode })
    })
  })
}
