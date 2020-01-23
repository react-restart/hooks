module.exports = {
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
          return `import { ${docNode.name} } from '${docNode.packageName}'`
        },
      },
    },
  ],
}
