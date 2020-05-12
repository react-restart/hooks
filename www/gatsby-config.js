const path = require('path')

module.exports = {
  pathPrefix: '/hooks',
  siteMetadata: {
    title: '@restart/hooks',
    author: 'Jason Quense',
  },
  plugins: [
    {
      resolve: '@docpocalypse/gatsby-theme',
      options: {
        sources: [`${__dirname}/../src`],
        getImportName(docNode) {
          return `import ${docNode.name} from '${docNode.packageName}/${docNode.name}'`
        },
      },
    },
    {
      resolve: 'gatsby-plugin-typedoc',
      options: {
        debugRaw: true,
        projects: [path.resolve(__dirname, '../src')],
      },
    },
  ],
}
