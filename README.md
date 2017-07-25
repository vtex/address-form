# Address Form

> A React component that renders VTEX's address forms 

## Setup

```sh
$ npm install @vtex/address-form
```

## API

### Base Components

- [AddressContainer](#AddressContainer)
- [CountrySelector](#CountrySelector)
- [AddressForm](#AddressForm)
- [AddressSummary](#AddressSummary)
- [PostalCodeGetter](#PostalCodeGetter)
- [AutoCompletedFields](#AutoCompletedFields)

### Geolocation Components

- [GoogleMapsContainer](#GoogleMapsContainer)
- [GeolocationInput](#GeolocationInput)
- [Map](#Map)

### Helper Functions

- [addValidation](#addValidation)
- [removeValidation](#removeValidation)

### Public modules

- [locales/](#locales)
- [country/](#country)

### Types

- [AddressShape](#AddressShape)
- [AddressShapeWithValidation](#AddressShapeWithValidation)

---

## Base Components

### AddressContainer

This component handles the input validation based on the country rules provided. It also calls the Postal Code service to autocomplete the address fields.

It provides an `onChangeAddress()` function to the child function.

When a field change its value, it should call the function with an object like so:

```js
onChangeAddress({
  street: { value: 'newValueHere' }
})
```

You can also call it with more than one field:
```js
onChangeAddress({
  street: { value: 'newValueHere' },
  number: { value: 'newValueHere' }
})
```

#### Props

- **`accountName`**: The account name of the store, to be used by the Postal Code Service.
- **`address`**: The current address in the shape of [`AddressShapeWithValidation`](#AddressShapeWithValidation)
- **`rules`**: The selected country rules
- **`onChangeAddress`**: Callback function to be called when a field has changed
- **`children`**: A callback child function

```js
AddressContainer.propTypes = {
  accountName: PropTypes.string.isRequired,
  address: AddressShapeWithValidation,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
}
```

#### Example

```js
<AddressContainer
  accountName="qamarketplace"
  address={address}
  rules={rules}
  onChangeAddress={this.handleAddressChange}
>
  {onChangeAddress =>
    <YourComponent onChange={onChangeAddress}>
  }
</AddressContainer>
```

### CountrySelector

Renders a select that shows all the countries options.

#### Props

- **`Input`**: (default: `@vtex/address-form/lib/DefaultInput`) A custom React component to render the inputs
- **`address`**: The current address in the shape of [`AddressShapeWithValidation`](#AddressShapeWithValidation)
- **`shipsTo`**: An array of an object of shape `{ value: String, label: String }`
- **`onChangeAddress`**: Callback function to be called when a field has changed

```js
CountrySelector.propTypes = {
  Input: PropTypes.func,
  address: AddressShapeWithValidation,
  shipsTo: PropTypes.array.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}
````

#### Example

```js
<AddressContainer
  accountName={accountName}
  address={address}
  rules={selectedRules}
  onChangeAddress={this.handleAddressChange}
>
  {onChangeAddress =>
    (<div>
      <CountrySelector
        Input={DefaultInput}
        address={address}
        shipsTo={shipsTo}
        onChangeAddress={onChangeAddress}
      />
    </div>
    )
  }
</AddressContainer>
```

### AddressForm

Renders an address form base on rules of the selected country.

#### Props

- **`Input`**: (default: `@vtex/address-form/lib/DefaultInput`) A custom React component to render the inputs
- **`address`**: The current address in the shape of [`AddressShapeWithValidation`](#AddressShapeWithValidation)
- **`omitPostalCodeFields`**: (default: `true`) Option to omit or not the fields that are rendered by `<PostalCodeGetter/>`
- **`omitAutoCompletedFields`**: (default: `true`) Option to omit or not the fields that were auto completed
- **`rules`**: The rules of the selected country
- **`onChangeAddress`**: Callback function to be called when a field has changed

```js
AddressForm.propTypes = {
  Input: PropTypes.func,
  address: AddressShapeWithValidation,
  omitPostalCodeFields: PropTypes.bool,
  omitAutoCompletedFields: PropTypes.bool,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}
```

#### Example

```js
<AddressContainer
  accountName={accountName}
  address={address}
  rules={selectedRules}
  onChangeAddress={this.handleAddressChange}
>
  {onChangeAddress =>
    (<div>
      <AddressForm
        Input={DefaultInput}
        address={address}
        rules={selectedRules}
        onChangeAddress={onChangeAddress}
      />
    </div>
    )
  }
</AddressContainer>
```

### AddressSummary

Renders a summary of the address.

#### Props

- **`address`**: The current address in the shape of [`AddressShape`](#AddressShape)
- **`rules`**: The rules of the selected country
- **`giftRegistryDescription`**: If the address is from a gift list, pass the description of it here
- **`canEditData`**: (default: `true`) Boolean that tells if the data is masked, the same property of the `orderForm`.
- **`onClickMaskedInfoIcon`**: Function that handles when the icon of masked info is clicked

```js
AddressSummary.propTypes = {
  canEditData: PropTypes.bool,
  address: AddressShape.isRequired,
  rules: PropTypes.object.isRequired,
  giftRegistryDescription: PropTypes.string,
  onClickMaskedInfoIcon: PropTypes.func,
}
```

#### Example

```js
 <AddressSummary
  address={removeValidation(address)}
  rules={selectedRules}
  onClickMaskedInfoIcon={this.handleClickMaskedInfoIcon}
/>
```

### PostalCodeGetter

Renders the requried components to get the postal code of an address. Some countries you can get the postal code by one simple and direct input, but in other countries we must render some select fields so that the user may select a place that we assign a defined postal code.

#### Props

- **`Input`**: (default: `@vtex/address-form/lib/DefaultInput`) A custom React component to render the inputs
- **`address`**: The current address in the shape of [`AddressShapeWithValidation`](#AddressShapeWithValidation)
- **`rules`**: The rules of the selected country
- **`onChangeAddress`**: Callback function to be called when a field has changed

```js
PostalCodeGetter.propTypes = {
  Input: PropTypes.func,
  address: AddressShapeWithValidation,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}
```

#### Example

```js
<AddressContainer
  accountName={accountName}
  address={address}
  rules={selectedRules}
  onChangeAddress={this.handleAddressChange}
>
  {onChangeAddress =>
    (<div>
      <PostalCodeGetter
        Input={DefaultInput}
        address={address}
        rules={selectedRules}
        onChangeAddress={onChangeAddress}
      />
    </div>
    )
  }
</AddressContainer>
```

### AutoCompletedFields

Renders a summary of the fields that were auto completed by the postal code or by the geolocation.

#### Props

- **`children`**: Node element that can be rendered for the "Edit" element
- **`address`**: The current address in the shape of [`AddressShapeWithValidation`](#AddressShapeWithValidation)
- **`rules`**: The rules of the selected country
- **`onChangeAddress`**: Callback function to be called when a field has changed

```
AutoCompletedFields.propTypes = {
  children: PropTypes.node.isRequired,
  address: AddressShapeWithValidation,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}
```

#### Example

```js
<AddressContainer
  accountName={accountName}
  address={address}
  rules={selectedRules}
  onChangeAddress={this.handleAddressChange}
>
  {onChangeAddress =>
    (<div>
      <AutoCompletedFields
        address={address}
        rules={selectedRules}
        onChangeAddress={onChangeAddress}
      >
        <a className="link-edit" id="force-shipping-fields">
          {intl.formatMessage({ id: 'address-form.edit' })}
        </a>
      </AutoCompletedFields>
    </div>
    )
  }
</AddressContainer>
```

## Geolocation Components

**Important!**: The Geolocation Components are recommended to be loaded async using dynamic import.

### GoogleMapsContainer

This component handles the loading of the Google Maps JavaScript Library.

It provides an object with `{ loading, googleMaps }` to the child function.

- **`loading`**: Loading when the 
- **`googleMaps`**: Google Maps JavaScript library object

#### Props

- **`children`**: A callback child function
- **`apiKey`**: The Google Maps API Key
- **`locale`**: The user locale

```js
GoogleMapsContainer.propTypes = {
  children: PropTypes.func.isRequired,
  apiKey: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
}
```

#### Example

```js
<GoogleMapsContainer apiKey={googleMapsAPIKey} locale={locale}>
  {({ loading, googleMaps }) => {
    ...
  }
</GoogleMapsContainer>
```

### GeolocationInput

Renders an input with the Google Maps auto complete feature. When the user selects an option suggested, it fills the address fields using the specified rules defined by the country and its geocoordinates.

#### Props

- **`Input`**: (default: `@vtex/address-form/lib/DefaultInput`) A custom React component to render the inputs
- **`rules`**: The selected country rules
- **`address`**: The current address in the shape of [`AddressShapeWithValidation`](#AddressShapeWithValidation)
- **`onChangeAddress`**: Callback function to be called when a field has changed
- **`loadingGoogle`**: Boolean if the Google Maps JavaScript Library is loading
- **`googleMaps`**: The Google Maps JavaScript Library object

```js
GeolocationInput.propTypes = {
  Input: PropTypes.func,
  rules: PropTypes.object.isRequired,
  address: AddressShapeWithValidation.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  loadingGoogle: PropTypes.bool,
  googleMaps: PropTypes.object,
}
```

#### Example

```js
<GoogleMapsContainer apiKey={googleMapsAPIKey} locale={locale}>
  {({ loading, googleMaps }) =>
    (<div>
      <GeolocationInput
        loadingGoogle={loading}
        googleMaps={googleMaps}
        address={address}
        rules={selectedRules}
        onChangeAddress={onChangeAddress}
      />
    </div>
    )
  }
</GoogleMapsContainer>
```

### Map

Renders a Google Map with a marker at the point of the address' geocoordinates.

#### Props

- **`loadingElement`**: (default: `<div>Loading...</div>`) Node element that is rendered while it's loading
- **`mapProps`**: Props passed to the map element
- **`geoCoordinates`**: Address` geocoordinates
- **`rules`**: The selected country rules
- **`onChangeAddress`**: Callback function to be called when a field has changed
- **`loadingGoogle`**: Boolean if the Google Maps JavaScript Library is loading
- **`googleMaps`**: The Google Maps JavaScript Library object

```js
Map.propTypes = {
  loadingElement: PropTypes.node,
  mapProps: PropTypes.object,
  geoCoordinates: PropTypes.array.isRequired,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  loadingGoogle: PropTypes.bool,
  googleMaps: PropTypes.object,
}
```

#### Example

```js
<GoogleMapsContainer apiKey={googleMapsAPIKey} locale={locale}>
  {({ loading, googleMaps }) =>
    (<div>
      {address.geoCoordinates &&
        address.geoCoordinates.valid &&
        address.geoCoordinates.value.length === 2 &&
        <Map
          loadingGoogle={loading}
          googleMaps={googleMaps}
          geoCoordinates={address.geoCoordinates.value}
          rules={selectedRules}
          onChangeAddress={onChangeAddress}
          mapProps={{
            style: {
              height: '120px',
              marginBottom: '10px',
              width: '260px',
            },
          }}
        />}
    </div>)}
</GoogleMapsContainer>
```

## Helper Functions

### addValidation

#### Params

- **`address`**: An address in the shape of [`AddressShape`](#AddressShape)

#### Returns

- **`address`**: An address in the shape of [`AddressShapeWithValidation`](#AddressShapeWithValidation)

#### Example

```js
const address = {
  addressId: '10',
  addressType: 'residential',
  city: null,
  complement: null,
  country: 'BRA',
  geoCoordinates: [],
  neighborhood: null,
  number: null,
  postalCode: null,
  receiverName: null,
  reference: null,
  state: null,
  street: null,
  addressQuery: null,
}

addValidation(address)
// {
//   addressId: { value: '10' },
//   addressType: { value: 'residential' },
//   city: { value: null },
//   complement: { value: null },
//   country: { value: 'BRA' },
//   geoCoordinates: { value: [] },
//   neighborhood: { value: null },
//   number: { value: null },
//   postalCode: { value: null },
//   receiverName: { value: null },
//   reference: { value: null },
//   state: { value: null },
//   street: { value: null },
//   addressQuery: { value: null },
// }
```

### removeValidation

#### Params

- **`address`**: An address in the shape of [`AddressShapeWithValidation`](#AddressShapeWithValidation)

#### Returns

- **`address`**: An address in the shape of [`AddressShape`](#AddressShape)

#### Example

```js
const address = {
  addressId: { value: '10' },
  addressType: { value: 'residential' },
  city: { value: null },
  complement: { value: null },
  country: { value: 'BRA' },
  geoCoordinates: { value: [] },
  neighborhood: { value: null },
  number: { value: null },
  postalCode: { value: null },
  receiverName: { value: null },
  reference: { value: null },
  state: { value: null },
  street: { value: null },
  addressQuery: { value: null },
}

removeValidation(address)
// {
//   addressId: '10',
//   addressType: 'residential',
//   city: null,
//   complement: null,
//   country: 'BRA',
//   geoCoordinates: [],
//   neighborhood: null,
//   number: null,
//   postalCode: null,
//   receiverName: null,
//   reference: null,
//   state: null,
//   street: null,
//   addressQuery: null,
// }
```

## Public modules

### locales/

This folder provides JSONs of translations commonly used by the Address Form in a flat format.

### country/

This folder provides the country rules modules.

Each country has their own set of rules on how an address form should be rendered. They specify:

- Fields order
- Fields labels
- Fields requirements
- Fields validation (regexes and mask)
- How to handle Google Maps geocoding feature.
- List of states, cities and neighborhood (not all modules)
- List of postal codes (not all modules)

If a selected country does not exists in the country folder. Use the `default.js`

## Types

### AddressShape

### AddressShapeWithValidation