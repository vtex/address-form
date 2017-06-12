import React, { Component } from 'react'
import CountrySelector from './CountrySelector'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      shipsTo: ['BRA', 'USA'],
      addressId: '1',
      addressType: 'residential',
      city: null,
      complement: null,
      country: null,
      geoCoordinates: [],
      neighborhood: null,
      number: null,
      postalCode: null,
      receiverName: null,
      reference: null,
      state: null,
      street: null,
    }
  }

  handleChangeSelectedCountry = country => {
    this.setState(prevState => ({
      ...prevState,
      country,
    }))
  };

  render() {
    const { shipsTo, country } = this.state

    return (
      <div>
        <CountrySelector
          country={country}
          shipsTo={shipsTo}
          onChangeSelectedCountry={this.handleChangeSelectedCountry}
        />
      </div>
    )
  }
}

export default App
