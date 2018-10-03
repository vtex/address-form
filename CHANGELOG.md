# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
