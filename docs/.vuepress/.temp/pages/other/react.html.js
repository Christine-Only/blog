import comp from "/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/other/react.html.vue"
const data = JSON.parse("{\"path\":\"/other/react.html\",\"title\":\"React常见问题\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"useState\",\"slug\":\"usestate\",\"link\":\"#usestate\",\"children\":[]},{\"level\":2,\"title\":\"useRef\",\"slug\":\"useref\",\"link\":\"#useref\",\"children\":[]},{\"level\":2,\"title\":\"设置source-map后在chrome中仍无法显示webpack://的问题\",\"slug\":\"设置source-map后在chrome中仍无法显示webpack-的问题\",\"link\":\"#设置source-map后在chrome中仍无法显示webpack-的问题\",\"children\":[]},{\"level\":2,\"title\":\"控制台警告\",\"slug\":\"控制台警告\",\"link\":\"#控制台警告\",\"children\":[{\"level\":3,\"title\":\"原因分析\",\"slug\":\"原因分析\",\"link\":\"#原因分析\",\"children\":[]}]}],\"git\":{\"updatedTime\":1659954522000,\"contributors\":[{\"name\":\"christinesy.tang\",\"email\":\"christinesy.tang@ap.jll.com\",\"commits\":2},{\"name\":\"Christine-Only\",\"email\":\"tsy17321289030@163.com\",\"commits\":1}]},\"filePathRelative\":\"other/react.md\"}")
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
