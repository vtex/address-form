/* eslint-env node */
const path = require('path')

const rootPath = path.resolve(__dirname, '..')
const intlUtilsPath = path.resolve(rootPath, 'react', 'intl', 'utils')

const INTL_SHAPE = 'intlShape'
const INJECT_INTL = 'injectIntl'

/**
 * @type {import("jscodeshift").Transform}
 */
module.exports = (fileInfo, api) => {
  const j = api.jscodeshift

  const root = j(fileInfo.source)

  const intlImports = root
    .find(j.ImportDeclaration, {
      type: 'ImportDeclaration',
      source: {
        type: 'Literal',
        value: 'react-intl',
      },
    })
    .filter(
      (p) =>
        p.value.specifiers.findIndex(
          (s) =>
            s.imported.name === INJECT_INTL || s.imported.name === INTL_SHAPE
        ) > -1
    )

  const intlSpecifiers = intlImports
    .paths()
    .reduce((t, e) => t.concat(e.value.specifiers), [])
    .filter(
      (p) => p.imported.name === INJECT_INTL || p.imported.name === INTL_SHAPE
    )

  if (!intlImports.length || !intlSpecifiers.length) {
    return
  }

  const filePath = path.join(rootPath, fileInfo.path)

  let importPath = path.relative(path.dirname(filePath), intlUtilsPath)

  if (!importPath.startsWith('.')) {
    importPath = `.${path.sep}${importPath}`
  }

  intlImports.insertAfter(
    j.importDeclaration(intlSpecifiers, { type: 'Literal', value: importPath })
  )

  intlImports.forEach((p) => {
    const newSpecifiers = p.value.specifiers.filter((s) => {
      return !(
        s.imported.name === INJECT_INTL || s.imported.name === INTL_SHAPE
      )
    })

    if (newSpecifiers.length === 0) {
      p.replace()

      return
    }

    p.replace(j.importDeclaration(newSpecifiers, p.value.source))
  })

  return root.toSource()
}
