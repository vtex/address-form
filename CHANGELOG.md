# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [4.6.1] - 2020-06-09

### Added

- Argentina missing localities.

## [4.6.0] - 2020-06-02

### Added

- PRY missing localities.
- Address rules for Costa Rica, Nicaragua and El Salvador.

## [4.5.4] - 2020-05-12

### Fixed

- Autocomplete was removing other fields values when the request was finished.

## [4.5.3] - 2020-04-09

### Changed

- Styleguide npm package verison.

## [4.5.2] - 2020-03-06

### Fixed

- Number geolocation autofill in URY addresses.

## [4.5.1] - 2020-02-20

### Fixed

- Updated `AddressContainer` to validate address on update if `shouldHandleAddressChangeOnMount` is passed.

## [4.5.0] - 2020-02-14

### Changed

- Update Ecuador rules, including some parishes for Santa Elena province.

## [4.4.3] - 2020-01-09

### Changed

- Styleguide npm package verison.

## [4.4.2] - 2020-01-09

### Added

- Others USA territories as state options.

### Changed

- Input field do now show validation error message when focused.

### Fixed

- State/city selection on Chile because postalCode was not required when it should.

## [4.4.1] - 2020-01-09

### Fixed

- `undefined` postal code mask causing `address-form` to break.

## [4.4.0] - 2020-01-02

### Changed

- Input field now uses `shouldShowNumberKeyboard` prop which, in turn, uses a country's postal code mask to decide its value.

## [4.3.5] - 2019-12-16

### Changed

- Input field do now show validation error message when focused.

## [4.3.4] - 2019-12-11

### Fixed

- State/city selection on Chile because postalCode was not required when it should
- Flaky tests that would return empty string or null depending of computer/Node version

## [4.3.3] - 2019-12-10

### Fixed

- Loading for scenarios when loading is passed as a prop to `StyleguideInput`.

## [4.3.2] - 2019-12-10

### Fixed

- Loading for scenarios when loading is passed as a prop to `StyleguideInput`.

## [4.3.1] - 2019-11-27

### Fixed

- Postal Code autocomplete which should only call API if country is supported
- Autocompleting address with a new address instead of just autocompleted fields which caused confusion
  merging different addresses
- `Spinner` breaking the UI because of `undefined` prop being rendered.
- Unit tests;
- Missing locale messages.
- Number input throwing an error when geolocation address doesn't contain a number.
- Geolocation field rules not being considered on form validation.
- Geolocation number input not being required (should have a value or the not applicable value).

### Changed

- `StyleguideInput` to have an external loading property to show it in the right moment instead of
  when autocomplete is performed

## [4.3.0] - 2019-11-21

### Changed

- `StyleguideInput` to have an external loading property to show it in the right moment instead of
  when autocomplete is performed

## [4.2.5] - 2019-11-06

### Changed

- Styleguide input to show `InputButton` instead of `Input` with a `Button` suffix.

## [4.2.4] - 2019-11-05

### Fixed

- Peru neighborhood geolocation validation.
- Postal code autocompletion on paste.
- Update Chile postal code for some regions.
- Missing validation message to `GeolocationNumberInput`
- Update Chile postal-code for Puerto Montt (Region X).
- Removed unused depdendency (`regexpp`).

### Changed

- Update Ecuador rules, including some parishes for Pichincha province.
- Add address examples in geolocation mode for some countries
- Spanish locale messages
- Removed eslint-utils from dependencies--moved to devDependencies.
- `PER` rules to map `administrative_area_level_3` and `locality` to geolocation rules

## [4.2.3] - 2019-10-15

### Added

- `useGeolocation` prop for `AddressRules` component.
- Add German translations.
- `autoFocus` to `StyleguideInput`.

## [4.2.2] - 2019-09-20

## [4.2.1] - 2019-09-20

## [4.2.0] - 2019-08-22

### Added

- Styleguide button to have submit behavior to `StyleguideInput`;
- Ability to have a submit function for `PostalCodeGetter`;
- Optional button to `PostalCodeGetter`.

### Changed

- Styleguide input to have `onSubmit` function;
- `README.md` to cover new behavior for `PostalCodeGetter`.
- `locality` in CHL to be in `neighborhood`

## [4.1.2] - 2019-07-26

### Fixed

- Keep valid fields valid if they are valid

## [4.1.1] - 2019-06-27

### Fixed

- Build assets with new builder hub.

## [4.1.0] - 2019-02-18

- Update Messages builder to 1.x
- Add Messages context.json

## [4.0.0] - 2019-01-18

### Changed

- Update React builder to 3.x.

## [3.5.18] - 2019-07-24

## [3.5.17] - 2019-07-15

### Fixed

- ROU geolocation placeholder translation.

## [3.5.16] - 2019-07-04

### Changed

- USA postal code regular expression to cover optional diplomatic pouch numbers

## [3.5.15] - 2019-07-03

### Changed

- postalCode API route host URL to consider if baseURI exists

## [3.5.14] - 2019-06-28

### Added

- Aditional address fields to `getAddressByGeolocation`

## [3.5.13] - 2019-06-28

### Added

- New romanina localities

## [3.5.12] - 2019-05-24

### Fixed

- Passing `rules` instead of `rules.geolocation` to `geolocationAutoCompleteAddress` since it uses the root object in the function

## [3.5.11] - 2019-05-20

### Fixed

- Fixes components not changing locale keys after locale change

## [3.5.10] - 2019-05-16

### Added

- Country restrictions when geolocation autocomplete address

## [3.5.9] - 2019-05-08

### Fixed

- Adding validation with properties with wrong object values

## [3.5.8] - 2019-04-24

### Changed

- Checkbox condition now checks if number is valid
- Checkbox now uses `checked` also

## [3.5.7] - 2019-04-22

### Fixed

- Locale change for inputs

## [3.5.6] - 2019-04-10

### Fixed

- Romanian and Catalan locale messages

## [3.5.5] - 2019-03-29

### Fixed

- PostalCodeAPI rules for multiple countries

## [3.5.4] - 2019-03-19

### Fix

- Romanian locale messages

## [3.5.3] - 2019-03-11

### Added

- Support for new `isDisposable` field

## [3.5.2] - 2019-02-26

### Added

- Add Italian translation

## [3.5.1] - 2019-02-21

### Fixed

- Remove neighborhood wrongful requirement

## [3.5.0] - 2019-02-14

### Fixed

- Field number validation updated for rules that hide it in geolocation

## [3.4.3] - 2019-02-14

### Fixed

- Getting already filled multiple levels postal code due to the API sets strings uppercase

## [3.4.2] - 2019-02-13

### Changed

- Updated link for forgotten postal code for MEX

## [3.4.1] - 2019-02-13

### Fixed

- Added `focus` and `reason` to shallow fields for components to update theses props

## [3.4.0] - 2019-02-05

### Fixed

- Ecuador addresses
- Remapping regions

## [3.3.0] - 2019-02-04

### Changed

- Updated Chile regions

## [3.2.0] - 2019-01-31

### Added

- `intl-equalizer` devDependency
- Hook pre-push

### Changed

- Locales with `not applicable` keys

## [3.1.0] - 2019-01-29

### Added

- Geolocation logic input
- `getAddressByGeolocation` function
- `InputCheckbox` component
- `notApplicable` flag to number field
- Tests using geolocation addresses
- Tests cases with the new functions

### Changed

- Geolocation Rules

## [3.0.12] - 2019-01-14

### Changed

- Implement GB postcode in GBR rules

## [3.0.11] - 2019-01-14

### Added

- `Postcode` message for United Kingdom

## [3.0.10] - 2019-01-10

### Fixed

- Fix `delimiterAfter` in summary

## [3.0.9] - 2019-01-10

## [3.0.8] - 2019-01-08

### Fixed

- Fix normalizing fields for third level validation

## [3.0.7] - 2019-01-04

### Added

- Add new locations for Chile

## [3.0.6] - 2018-12-26

### Fixed

- Fix postal code label for GBR

## [3.0.5] - 2018-12-26

### Added

- Added countries to `countries.js`

## [3.0.4] - 2018-12-26

### Changed

- Updated `locales` folder to `messages` folder

## [3.0.3] - 2018-12-17

- Add `ROU` and `GBR` validations

## [3.0.2] - 2018-11-26

- Add `GeolocationInput` to inputs for io imports
- Add `GoogleMapsContainer` and `Map` to components for io imports

## [3.0.1] - 2018-11-14

- Add VTEX IO fetching to `AddressRules` component

## [3.0.0] - 2018-11-14

- Transpose library to VTEX IO scaffolding and configuration
- Add `Shapes`, `helpers`, `components` and `inputs` exports to be imported by vtex io components

## [2.5.8] - 2018-11-09

### Fixed

- Improve app performance

## [2.5.7] - 2018-11-08

### Fixed

- Fix "Dont know postal code" in mobile

## [2.5.6] - 2018-11-05

## [2.5.5] - 2018-10-31

## [2.5.4] - 2018-10-30

- Fix `geolocationAutoCompleteAddress` of `Map` component

## [2.5.3] - 2018-10-08

## [2.5.2] - 2018-10-03

## [2.5.1] - 2018-10-03

## [2.5.0] - 2018-10-02

- Add France validation rules

## [2.4.0] - 2018-09-26

## [2.3.0] - 2018-09-13

### Added

- Add support to new separator of multiple options of Postal Code service

## [2.2.0] - 2018-08-29

### Added

- Add Romanian translation

## [2.1.1] - 2018-08-24

### Fixed

- Fix `shouldComponentUpdate` of `Map` component

## [2.1.0] - 2018-08-22

### Added

- Handle postal code response of multiple values (Fix vtex/omnishipping#826)

### Fixed

- Fix StyleguideInput maxLength prop
- Fix focus being called when ref was wrong
- Only show AddressSummary delimiters if previous or next field has value

## [2.0.4] - 2018-08-09

### Fixed

- Exporting `injectAddressContext` from index
- "I don't know my postal code" button text wrapping

## [2.0.2] - 2018-07-31

### Fixed

- Triggering postal code autocompletion on submit

## [2.0.1] - 2018-07-26

### Changed

- Updated README to include `v2.0.0` changes

## [2.0.0] - 2018-07-26

### Changed

- **[BREAKING]** Both inputs moved to an `inputs` folder
- **[BREAKING]** CustomInput renamed to StyleguideInput [[#103](https://github.com/vtex/address-form/pull/103)]
- **[BREAKING]** AddressContainer now uses plain children instead of render prop
- AddressContainer now passes down `address`, `onChangeAddress` and `Input` via context to children (can be overriden in each component for backwards compatibility)
- Map now does not require the `geoCoordinates` prop; it may use the coordinates from the injected address as default [[#104](https://github.com/vtex/address-form/pull/104)]

### Added

- This Changelog
- **`AddressSubmitter`** component and tests
