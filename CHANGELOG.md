# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.36.0] - 2024-05-22

### Added

- Hungarian translations.

## [3.35.6] - 2024-05-21

- Malta geolocation.

## [3.35.5] - 2024-05-09

### Fixed

- Malta postal code validation.

## [3.35.4] - 2024-05-06

### Fixed

- Malta postal code validation.

## [3.35.3] - 2024-04-26

## [3.35.2] - 2024-04-25

### Added

- Malta address rules

### Fixed

- Fix prop for state in GBR

## [3.35.1] - 2024-02-05

### Fixed

- Netherlands ('NLD') country rules to show number in address summary.

## [3.35.0] - 2024-01-25

### Added

- Hungary country rules and placeholder.

## [3.34.12] - 2023-12-06

### Fixed

- Belgium ('BEL') country rules.
- Netherlands ('NDL')  country rules.

## [3.34.11] - 2023-10-18

### Fixed

- New Zealand geolocation to format neighborhood.

## [3.34.10] - 2023-10-12

### Fixed

- Made Number field not required for NLD customers.

## [3.34.9] - 2023-10-12

## [3.34.8] - 2023-10-10

### Fixed

- Fields displayed for Netherlands customers, in order to better reflect the usual experience for shoppers in that country.

## [3.34.7] - 2023-10-09

### Fixed

- New Zealand geolocation to include neighborhood.

### Fixed

- Ecuador postal code settings to be more granular and show the cities list during check-out.

## [3.34.6] - 2023-08-24

## [3.34.5] - 2023-08-24

### Added

- Virgin Islands (US) country rules.

## [3.34.4] - 2023-06-27

### Fixed

- Postal code rules when using geolocation mode

## [3.34.3] - 2023-06-19

### Fixed
- Change Uruguay geolocation city types order for accuracy.

## [3.34.2] - 2023-06-13
### Fixed
- Fix missing`notApplicable` property in `number` field for geolocation mode

## [3.34.1] - 2023-05-24
### Fixed
- Interop of external ESM imports in NPM build.

## [3.34.0] - 2023-05-18

### Added

- Rules for Japan ('JPN')

## [3.33.2] - 2023-05-15

### Fixed
- Street field using geolocation in New Zealand (NZL) file.

## [3.33.1] - 2023-05-11
### Fixed
- Discard postal code rules when using geolocation mode in `AddressRules`.

## [3.33.0] - 2023-05-11

### Added

- Placeholder addresses for several countries.

### Fixed

- Country index list.

## [3.32.0] - 2023-05-05

### Added

- Dominican Republic (DOM) rules.

## [3.31.1] - 2023-05-02
### Fixed
- Number field discarded in geolocation mode for FRA
- Number field discarded in geolocation mode for USA
- Number field as required in geolocation mode for USA
- Address being reviewed in the geolocation mode even for complete addresses.

## [3.31.0] - 2023-04-27

### Added

- Rules for Puerto Rico ('PRI'). Same as USA, but with 'State' field pre-filled with 'PR'.

## [3.30.1] - 2023-04-26

### Fixed
- Australia ('AUS') address fields rearranged using GAPI.

## [3.30.0] - 2023-04-25

### Added

- Rules for Thailand ('THA').

## [3.29.7] - 2023-04-04

### Fixed
- Australia ('AUS') postal code auto-fill API has been disabled to allow GAPI to perperly auto-fill.

## [3.29.6] - 2023-03-31

### Changed

- Filter optionsMap, valueOptions and options out from `AddressRules` geolocation validation.

## [3.29.5] - 2023-03-23

### Fixed

- Australia ('AUS') postal code auto-fill enable.

## [3.29.4] - 2023-03-23

### Added

- `Suburb` translation

## [3.29.3] - 2023-03-17

### Fixed

- Build script not including JSON files.

## [3.29.2] - 2023-02-17

### Fixed

- Geolocation implementation for Australia ('AUS').

## [3.29.1] - 2023-02-14

### Changed

- Add the number field as hidden in France config file.

## [3.29.0] - 2022-12-23

### Added

- Indonesian translation.
- City "Villa Madero" to "Buenos Aires" province.

### Fixed

- English, Portuguese, Italian and Spanish translations.

## [3.28.0] - 2022-12-22

### Added

- Greece country rules.

## [3.27.2] - 2022-09-06

### Fixed

- Fixed city type being retrieved from GMaps API

## [3.27.1] - 2022-09-01

### Changed

- Replace usage of `splunkevents-js` with `window.logSplunk`.

## [3.27.0] - 2022-08-30

### Added

- Jamaica country rules.

## [3.26.8] - 2022-08-10

### Fixed

- Invalidate whitespace-only required fields.

## [3.26.7] - 2022-08-08

### Removed

- Panama country rules.

## [3.26.6] - 2022-08-05

### Fixed

- Address rules for SPAIN.

## [3.26.5] - 2022-08-03

### Changed

- Missing Guatemala, Costa Rica and Panama states and cities.

## [3.26.4] - 2022-07-22

### Added

- Australia ('AUS'), Indonesia ('IDN') and New Zealand ('NZL') country rules.

## [3.26.3] - 2022-07-22

### Added

- Added German complement to rules

## [3.26.2] - 2022-07-22

### Fixed

- Logic for log of mismatched addresses.

## [3.26.1] - 2022-07-20

### Fixed

- Regex for detecting "module not found" error.

## [3.26.0] - 2022-07-19

### Changed

- Relax validation of field options when validating an address value.
- Include valid option in combobox if postalCode is valid.

## [3.25.5] - 2022-07-11

### Added

- Thai translation.

### Fixed

- Czech and Slovak translations.

## [3.25.4] - 2022-06-27

## [3.25.3] - 2022-06-20

### Added

- Saudi Arabia ('SAU') country rules.

## [3.25.2] - 2022-05-11

### Fixed

- `NLD` and `BEL` users not able to proceed to payment due to missing `number` geolocation field.

## [3.25.1] - 2022-04-14

### Changed

- Singapore address rules, `complement field` as mandatory

## [3.25.0] - 2022-04-07

### Added

- `address-form.field.suburb` string
- US states

### Changed

- Missing India's states and cities.
- South Africa neighborhood label.

### Removed

- Invalid US states.

## [3.24.9] - 2022-04-06

### Fixed

- Arabic translation.

## [3.24.8] - 2022-03-23 [YANKED]

### Fixed

- Arabic translation and Russia country rules for two-levels postal code.

## [3.24.7] - 2022-03-22

### Added

- Support for ZAF locale

## [3.24.6] - 2022-03-21

### Fixed

- Russia postal code country rules

## [3.24.5] - 2022-03-16

### Fixed

- Arabic translation.

## [3.24.4] - 2022-03-14

### Changed

- Singapore address rules, hiding `city` and `state` fields.

## [3.24.3] - 2022-02-25

### Fixed

- South Africa country rules for geolocation.

## [3.24.2] - 2022-02-24

### Fixed

- Arabic translation.

### Added

- South Africa country rules.

## [3.24.1] - 2022-02-21

### Changed

- Add required flag to India's postal code field.

## [3.24.0] - 2022-02-15

### Added

- Ecuador city `San Rafael`.
- India's cities and states.

### Fixed

- Arabic translation.

## [3.23.1] - 2022-02-08

### Removed

- Address rules for Iraq.

## [3.23.0] - 2022-02-03

### Added

- Address rules for Singapore.
- Address rules for Iraq.

## [3.22.4] - 2022-01-25

### Fixed

- Russia country rules.

## [3.22.3] - 2022-01-20

### Changed

- Russia country rules.

### Fixed

- Russian translation.

## [3.22.2] - 2022-01-19

### Added

- New cities to ECU country.

## [3.22.1] - 2022-01-18

### Fixed

- Invalid address `field` name for `IRQ`.

## [3.22.0] - 2022-01-13

### Added

- Address rules for Iraq.

## [3.21.1] - 2021-12-13

### Added

- `address-form.geolocation.example.RUS` to all language files.

## [3.21.0] - 2021-12-01

## [3.20.6] - 2021-11-25

### Changed

- Use exponential backoff and limit retries on Splunk calls.

## [3.20.5] - 2021-11-08

### Fixed

- Russian translation

## [3.20.4] - 2021-11-04

### Changed

- Update the cities order in CHL file

## [3.20.3] - 2021-10-25

### Changed

- Activate postal code API for Portugal

## [3.20.2] - 2021-10-21

### Added

- Add "Mi Perú" city to PER country

## [3.20.1] - 2021-10-14

### Fixed

- Update build script and update @babel/preset-typescript for transforms/address lib generation.

## [3.20.0] - 2021-10-07

### Added

- Exports `geolocationAutoCompleteAddress` to VTEX IO apps.

## [3.19.0] - 2021-09-30

### Added

- I18n Ar

## [3.18.13] - 2021-09-13

### Added

- Adding new cities to BOL country

## [3.18.12] - 2021-09-02

### Added

- Adding new cities to ECU country

## [3.18.11] - 2021-09-02

### Added

- Add new cities to COL country

## [3.18.10] - 2021-08-30

### Fixed

- I18n It

## [3.18.9] - 2021-08-23

### Fixed

- Adress fields with null value being marked with `geolocationAutoCompleted` flag

## [3.18.8] - 2021-08-11

### Changed

- Forgotten URL for CEP in Brazil

## [3.18.7] - 2021-07-29

### Fixed

- Address fields being overwritten with old information on geolocation.

## [3.18.6] - 2021-07-26

### Fixed

- Add more cities to romanian zipcodes

## [3.18.5] - 2021-07-15

### Fixed

- Change of address autocompleted by postal code.

## [3.18.4] - 2021-07-13

### Fixed

- Address "General Gutierrez" mismatch for postal code based argentina stores.

## [3.18.3] - 2021-07-12

### Changed

- Add the county capital cities and their corresponding postal codes.

## [3.18.2] - 2021-07-08

### Fixed

- `receiverName` not required for geolocation.
- `number` fields required in geolocation but hidden in postal code.

## [3.18.1] - 2021-07-08

### Changed

- Remove duplicate city names and corresponding values from Romanian zipcodes list.

## [3.18.0] - 2021-07-07

### Added

- `neighborhood` info to the address summary for the country `ARG`.

### Changed

- Now different address fields can have equal `types` property.
- The precedence present on `types` property will be respected.

## [3.17.1] - 2021-07-06

### Changed

- Update Romanian zipcodes list

## [3.17.0] - 2021-07-06

### Changed

- Updated `isValidAddress` to accept geolocation rules definition.

## [3.16.14] - 2021-07-05

### Fixed

- `geolocationAutoCompleted` flag being lost after the address is validated.

## [3.16.13] - 2021-06-22

### Fixed

- Address "Santa Fe" mismatch for postal code based argentina stores.

## [3.16.12] - 2021-06-22

### Changed

- Add URL data to address mismatch log.

## [3.16.11] - 2021-06-17

### Added

- Tests for geolocation address mismatch log.

### Changed

- Address data is now indexable by Splunk.

### Fixed

- Cities and neighborhoods being wrongfully logged as address mismatches.
- Account name not being logged when used outside Checkout.
- Country from rules object is now differentiable from address country on logger.
- Raised exceptions from Splunk logger breaking the application.

## [3.16.10] - 2021-06-15

### Changed

- Maps unknown `state` values to `state` options for `ARG` country.

## [3.16.9] - 2021-06-10

## Fixed

- Get Forgotten Postal Code Url for Brazil (Correios).

## [3.16.8] - 2021-06-08

## Added

- Splunk log on address mismatch between Google Maps response and the option lists

## [3.16.7] - 2021-06-08

### Added

- Add new two new cities to col file.

## [3.16.6] - 2021-06-01

### Fixed

- Valid address with `valid: false` fields not correctly updated to have
  `valid: true` in all fields.

## [3.16.5] - 2021-05-27

### Added

- Add a few cities to PER file.

## [3.16.4] - 2021-05-21

### Fixed

- Fix 'Villa Hipodromo' naming in ARG file

## [3.16.3] - 2021-05-13

### Fixed

- Ensure the `state` field is populate when user visits `addresses` inside their account for `RUS`.

## [3.16.2] - 2021-05-12

### Fixed

- `CHL` rules when filling data with Google Maps.

## [3.16.1] - 2021-04-29

### Fixed

- `postalCodeAutoCompleteAddress` ignoring provided `addressId`.

## [3.16.0] - 2021-04-20

### Added

- Add RUS for RUSSIA.
- Applies a behavior where the postal code isnt required, adding them as ROU example.

## [3.15.6] - 2021-03-25

### Fixed

- Change Escuintla Postal Codes in GTM file.

## [3.15.5] - 2021-03-22

### Fixed

- Change regions in CHL file.

## [3.15.4] - 2021-03-05

## [3.15.3] - 2021-02-25

### Added

- `La Loma` city to COL file.

## [3.15.2] - 2021-02-18

### Added

- `Fátima` city to ARG file.

## [3.15.1] - 2021-01-28

### Fixed

- Address autocomplete for Argentina's capital.

## [3.15.0] - 2021-01-25

### Added

- Rules for San Marino.

### Changed

- Update `AddressContainer` to pass remaining arguments of `onChangeAddress` to prop.

## [3.14.3] - 2021-01-22

### Fixed

- State/city selection on Venezuela because postalCode was not required when it should.

## [3.14.2] - 2021-01-19

### Added

- Rules for India.

## [3.14.1] - 2021-01-19

### Added

- Rules for Finland, Denmark, and Sweden removing the 'state' field as mandatory.

## [3.14.0] - 2021-01-18

### Added

- Address rules for Unites Arabes Emirates.

### Fixed

- Italian address rules when using geolocation.

## [3.13.12] - 2021-01-15

### Fixed

- State/city selection on Bolivia because postalCode was not required when it should.

## [3.13.11] - 2021-01-14

### Fixed

- Fix "Rosario" (Santa Fé) city in Argentina to "Rosário".

## [3.13.10] - 2021-01-04

### Fixed

- Eslint and prettier errors.

## [3.13.9] - 2020-12-17

### Added

- I18n Cs.

### Fixed

- I18n It.

### Changed

- Crowdin configuration file.

## [3.13.8] - 2020-11-13

### Changed

- Update Chile localities.

## [3.13.7] - 2020-11-04

### Fixed

- Fix the abbreviation of 'Yukon' & 'Nunavut' provinces in Canada.

## [3.13.6] - 2020-10-22

### Fixed

- Messages localization in romanian.

## [3.13.5] - 2020-10-22

### Fixed

- Fix Guatemala postalCode's RegEx to allow 6-digit options.

## [3.13.4] - 2020-10-21

### Changed

- Update Guatemala localities.

## [3.13.3] - 2020-10-14

### Fixed

- Google geolocation rules for Italia around the data that should be used as "state" and "city".

## [3.13.2] - 2020-10-09

### Added

- Add bg, ca, da, de, el, fi, fr, it, ko, nl, pl, ro, ru, sk, sl, sv and uk translations.

## [3.13.1] - 2020-10-06 [YANKED]

### Fixed

- Make `receiverName` required while using geolocation input.

## [3.13.0] - 2020-10-01

### Added

- Prop `className` to `AddressForm` component.

## [3.12.14] - 2020-09-23

### Fixed

- Google geolocation not working for ARG country.

## [3.12.13] - 2020-09-15

### Added

- New Guatemala localities, splitting Mixco and Villa Nueva.

## [3.12.12] - 2020-09-04

### Changed

- Added support for newer versions of `react-intl` package.

## [3.12.11] - 2020-08-27

### Fixed

- Endless postal code input loading icon.

## [3.12.10] - 2020-08-24

### Changed

- Italian messages translations.

## [3.12.9] - 2020-08-10

### Fixed

- Revert validation of country code in address change handler.

## [3.12.8] - 2020-08-10

### Fixed

- State/city selection on Romania because postalCode was not required when it should.
- Remove USA states as options for South Korea.

## [3.12.7] - 2020-08-07 [YANKED]

### Fixed

- `handleAddressChange` calling `postalCodeAutoCompleteAddress` even with a `null` country code.

## [3.12.6] - 2020-08-03

### Added

- Address rules for Italia.

## [3.12.5] - 2020-07-24

### Added

- Argentina missing locality.

## [3.12.4] - 2020-07-09

### Fixed

- Prop errorMessage of Styleguide's Input.

## [3.12.3] - 2020-06-15

### Changed

- Italian i18n.

## [3.12.2] - 2020-06-10

### Fixed

- `postalCodeAutoCompleteAddress` reusing previous address info.

## [3.12.1] - 2020-06-09

### Added

- Argentina missing localities.

## [3.12.0] - 2020-06-09

### Added

- Russian translation.

## [3.11.0] - 2020-06-02

### Added

- PRY missing localities.
- Address rules for Costa Rica.

### Changed

- Sorting NIC and SLV alphabetically.

## [3.10.2] - 2020-05-13

### Fixed

- `geolocationAutoCompleted` verification in `handleAddressChange()` to display number input when not written down in geolocation field.

## [3.10.1] - 2020-05-11

### Fixed

- Autocomplete was removing other fields values when the request was finished.

## [3.10.0] - 2020-05-04

### Added

- Address rules for El Salvador and Nicaragua.

### Fixed

- State/city selection on Guatemala because `postalCode` was not required when it should.

## [3.9.4] - 2020-05-04

### Added

- Ecuador missing localities.

## [3.9.3] - 2020-04-28

### Fixed

- Typos in some states/cities from Guatemala.

## [3.9.2] - 2020-04-08

### Changed

- Styleguide npm package verison.

## [3.9.1] - 2020-04-06

### Changed

- Default number geolocation setup.

## [3.9.0] - 2020-03-10

### Added

- Dutch and Polish translations.

## [3.8.12] - 2020-03-04

### Fixed

- Number geolocation autofill in URY addresses.

## [3.8.11] - 2020-02-14

### Fixed

- Updated `AddressContainer` to validate address on update if `shouldHandleAddressChangeOnMount` is passed.

## [3.8.10] - 2020-02-12

### Changed

- Update Ecuador rules, including some parishes for Santa Elena province.

## [3.8.9] - 2020-01-09

### Changed

- Styleguide npm package verison.

## [3.8.8] - 2020-01-09

### Added

- Others USA territories as state options.

## [3.8.7] - 2019-12-12

### Changed

- Input field do now show validation error message when focused.

## [3.8.6] - 2019-12-11

### Fixed

- State/city selection on Chile because postalCode was not required when it should
- Flaky tests that would return empty string or null depending of computer/Node version

## [3.8.5] - 2019-12-10

### Fixed

- Loading for scenarios when loading is passed as a prop to `StyleguideInput`.

## [3.8.4] - 2019-11-27

### Fixed

- Postal Code autocomplete which should only call API if country is supported.

## [3.8.3] - 2019-11-27

### Fixed

- Autocompleting address with a new address instead of just autocompleted fields which caused confusion
  merging different addresses.

## [3.8.2] - 2019-11-26

### Fixed

- `Spinner` breaking the UI because of `undefined` prop being rendered.

## [3.8.1] - 2019-11-26

### Fixed

- Unit tests;
- Missing locale messages.

## [3.8.0] - 2019-11-21

### Changed

- `StyleguideInput` to have an external loading property to show it in the right moment instead of
  when autocomplete is performed

## [3.7.0] - 2019-11-18

### Fixed

- Number input throwing an error when geolocation address doesn't contain a number.
- Geolocation field rules not being considered on form validation.
- Geolocation number input not being required (should have a value or the not applicable value).

### Added

- `useGeolocation` prop for `AddressRules` component.

## [3.6.13] - 2019-11-06

### Changed

- Styleguide input to show `InputButton` instead of `Input` with a `Button` suffix.

## [3.6.12] - 2019-11-05

### Fixed

- Peru neighborhood geolocation validation.

## [3.6.11] - 2019-10-31

### Fixed

- Postal code autocompletion on paste.

## [3.6.10] - 2019-10-29

### Changed

- Update Ecuador rules, including some parishes for Pichincha province.

## [3.6.9] - 2019-10-28

### Added

- Add German translations.

## [3.6.8] - 2019-10-21

### Changed

- Add address examples in geolocation mode for some countries

## [3.6.7] - 2019-10-17

### Fixed

- Update Chile postal code for some regions.

## [3.6.6] - 2019-10-14

### Fixed

- Missing validation message to `GeolocationNumberInput`

## [3.6.5] - 2019-10-03

### Fixed

- Update Chile postal-code for Puerto Montt (Region X).

## [3.6.4] - 2019-09-24

### Changed

- Spanish locale messages

## [3.6.3] - 2019-09-23

### Fixed

- Removed unused depdendency (`regexpp`).

## [3.6.2] - 2019-09-23

### Changed

- Removed eslint-utils from dependencies--moved to devDependencies.

## [3.6.1] - 2019-08-28

### Changed

- `PER` rules to map `administrative_area_level_3` and `locality` to geolocation rules

## [3.6.0] - 2019-08-22

### Added

- Styleguide button to have submit behavior to `StyleguideInput`;
- Ability to have a submit function for `PostalCodeGetter`;
- Optional button to `PostalCodeGetter`.

### Changed

- Styleguide input to have `onSubmit` function;
- `README.md` to cover new behavior for `PostalCodeGetter`.

## [3.5.20] - 2019-08-02

### Changed

- `locality` in CHL to be in `neighborhood`

## [3.5.19] - 2019-07-26

### Fixed

- Keep valid fields valid if they are valid

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


[Unreleased]: https://github.com/vtex/address-form/compare/v3.36.0...HEAD
[3.34.6]: https://github.com/vtex/address-form/compare/v3.34.5...v3.34.6
[3.34.5]: https://github.com/vtex/address-form/compare/v3.34.4...v3.34.5
[3.35.5]: https://github.com/vtex/address-form/compare/v3.35.4...v3.35.5
[3.35.4]: https://github.com/vtex/address-form/compare/v3.35.3...v3.35.4
[3.35.3]: https://github.com/vtex/address-form/compare/v3.35.2...v3.35.3
[3.35.2]: https://github.com/vtex/address-form/compare/v3.35.1...v3.35.2
[3.35.1]: https://github.com/address-form//compare/v3.35.0...v3.35.1
[3.35.0]: https://github.com/vtex/address-form/compare/v3.34.12...v3.35.0
[3.34.12]: https://github.com/vtex/address-form/compare/v3.34.11...v3.34.12
[3.34.11]: https://github.com/vtex/address-form/compare/v3.34.10...v3.34.11
[3.36.0]: https://github.com/vtex/address-form/compare/v3.35.6...v3.36.0