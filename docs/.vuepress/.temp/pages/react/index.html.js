import comp from "/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/react/index.html.vue"
const data = JSON.parse("{\"path\":\"/react/\",\"title\":\"React 基础\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"新旧生命周期对比\",\"slug\":\"新旧生命周期对比\",\"link\":\"#新旧生命周期对比\",\"children\":[{\"level\":3,\"title\":\"旧生命周期\",\"slug\":\"旧生命周期\",\"link\":\"#旧生命周期\",\"children\":[]},{\"level\":3,\"title\":\"新生命周期\",\"slug\":\"新生命周期\",\"link\":\"#新生命周期\",\"children\":[]}]},{\"level\":2,\"title\":\"setState\",\"slug\":\"setstate\",\"link\":\"#setstate\",\"children\":[]},{\"level\":2,\"title\":\"高阶组件（HOC）\",\"slug\":\"高阶组件-hoc\",\"link\":\"#高阶组件-hoc\",\"children\":[]}],\"git\":{\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"react/README.md\"}")
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
