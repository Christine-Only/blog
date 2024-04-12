import comp from "/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/advance/webpack.html.vue"
const data = JSON.parse("{\"path\":\"/advance/webpack.html\",\"title\":\"webpack知识点\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"webpack externals深入理解\",\"slug\":\"webpack-externals深入理解\",\"link\":\"#webpack-externals深入理解\",\"children\":[{\"level\":3,\"title\":\"引入lodash\",\"slug\":\"引入lodash\",\"link\":\"#引入lodash\",\"children\":[]},{\"level\":3,\"title\":\"配置externals\",\"slug\":\"配置externals\",\"link\":\"#配置externals\",\"children\":[]},{\"level\":3,\"title\":\"不同环境设置externals方式\",\"slug\":\"不同环境设置externals方式\",\"link\":\"#不同环境设置externals方式\",\"children\":[]},{\"level\":3,\"title\":\"externals和libraryTarget的关系\",\"slug\":\"externals和librarytarget的关系\",\"link\":\"#externals和librarytarget的关系\",\"children\":[]}]}],\"git\":{\"updatedTime\":1709554054000,\"contributors\":[{\"name\":\"Christine-Only\",\"email\":\"tsy17321289030@163.com\",\"commits\":1},{\"name\":\"christinesy.tang\",\"email\":\"christinesy.tang@ap.jll.com\",\"commits\":1},{\"name\":\"tangshiya\",\"email\":\"tsy17321289030@163.com\",\"commits\":1}]},\"filePathRelative\":\"advance/webpack.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
