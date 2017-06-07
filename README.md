# Address Form Component

> Bootstrapped with [Speedpack](https://github.com/vtex/speedpack/) using Babel, React, webpack 2 and deploying using VTEX Pachamama.

## Starting

Change all references of CHANGEME.

Run `npm install` to install dependencies packages.

### Recommended

Install a Prettier plugin for your editor of choice.

#### VSCode

1. Install the "Prettier - ESLint" extension.
2. Open your workspace settings (⌘ + Shift + P, then type "Workspace settings")
3. Add: `"editor.formatOnSave": true`
4. Save
## Running with HTTPS

Normally you would run `npm start` (or `sudo npm start` on Mac) to launch the application. This will launch webpack-dev-server bind to port 80. If you wish to start the server with https enabled, simply pass the `--https` flag as an argument:

```sh
$ npm start -- --https 
```

If you always need https, then you can edit the `package.json` file and add the `--https` flag to the _start script_, like so:

```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=development webpack-dev-server --hot --https",
  }
}
  
```

## Testing

### `npm test` or `yarn test`

Runs all runs tests.

### `npm run tdd` or `yarn tdd`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

## Deploying

**Warning** If your project is going to be an /admin check [this readme](https://github.com/vtex/ux/tree/master/deploy) or check [releases-ui](https://github.com/vtex/releases-ui) as an exemple

**Recomended:** Use [releasy](https://github.com/vtex/releasy) to do the hard work for you.

**Manually:** Change the version in the `package.json` and tag the commit with the same version number.

Package.json's version | Commit's tag name
---|---
`1.0.1` | `v1.0.1`

[Check the example](https://github.com/vtex/vcs.checkout-ui/commit/b2f10c9fdf8f2111b52a8d1dee630d4b73dbb1b8)
