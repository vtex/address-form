module.exports = {
  type: 'react-component',
  babel: {
    plugins: ['add-react-displayname'],
  },
  devServer: {
    host: 'qamarketplace.vtexlocal.com.br',
    proxy: {
      '*': 'http://qamarketplace.vtexcommercestable.com.br:80',
    },
  },
  npm: {
    esModules: false,
  },
}
