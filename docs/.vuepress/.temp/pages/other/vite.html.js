import comp from "/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/other/vite.html.vue"
const data = JSON.parse("{\"path\":\"/other/vite.html\",\"title\":\"vite常见问题\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"vite多入口配置\",\"slug\":\"vite多入口配置\",\"link\":\"#vite多入口配置\",\"children\":[{\"level\":3,\"title\":\"配置vite.config.ts\",\"slug\":\"配置vite-config-ts\",\"link\":\"#配置vite-config-ts\",\"children\":[]}]}],\"git\":{\"updatedTime\":1646654111000,\"contributors\":[{\"name\":\"christinesy.tang\",\"email\":\"christinesy.tang@ap.jll.com\",\"commits\":1}]},\"filePathRelative\":\"other/vite.md\"}")
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
