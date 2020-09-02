#!/bin/bash

unparsed_version=$(git describe --exact-match)

if [[ ! $? -eq 0 ]]; then
  echo "Nothing to publish, exiting.."
  exit 0;
fi

version=${unparsed_version//v}

if [[ -z "$NPM_TOKEN" ]]; then
  echo "No NPM_TOKEN, exiting.."
  exit 0;
fi

echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" >> ~/.npmrc

# Remove react-intl from dependencies because it only
# exist there for builder-hub to be able to build this
# app, and update the version in case the releasy
# script didn't.
jq -M "del(.dependencies.\"react-intl\") | .version = \"$version\"" react/package.json > react/package.json.tmp

mv react/package.json.tmp react/package.json

if [[ $version =~ -beta ]]; then
  echo "Publishing beta @vtex/address-form@$version"

  yarn --cwd react publish --new-version $version --tag next
else
  echo "Publishing stable @vtex/address-form@$version"

  yarn --cwd react publish --new-version $version --tag latest
fi
