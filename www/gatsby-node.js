// Tells gatsby how to find the babel config for the src files as well as itself
exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelOptions({
    options: {
      babelrcRoots: true,
    },
  })
}
