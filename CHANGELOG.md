# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
