import comp from "/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/interview/safetyProtection.html.vue"
const data = JSON.parse("{\"path\":\"/interview/safetyProtection.html\",\"title\":\"前端安全\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"xss\",\"slug\":\"xss\",\"link\":\"#xss\",\"children\":[{\"level\":3,\"title\":\"转义字符\",\"slug\":\"转义字符\",\"link\":\"#转义字符\",\"children\":[]},{\"level\":3,\"title\":\"csp\",\"slug\":\"csp\",\"link\":\"#csp\",\"children\":[]}]},{\"level\":2,\"title\":\"CSRF\",\"slug\":\"csrf\",\"link\":\"#csrf\",\"children\":[{\"level\":3,\"title\":\"SameSite\",\"slug\":\"samesite\",\"link\":\"#samesite\",\"children\":[]},{\"level\":3,\"title\":\"验证 Referer\",\"slug\":\"验证-referer\",\"link\":\"#验证-referer\",\"children\":[]},{\"level\":3,\"title\":\"Token\",\"slug\":\"token\",\"link\":\"#token\",\"children\":[]}]},{\"level\":2,\"title\":\"点击劫持\",\"slug\":\"点击劫持\",\"link\":\"#点击劫持\",\"children\":[{\"level\":3,\"title\":\"X-FRAME-OPTIONS\",\"slug\":\"x-frame-options\",\"link\":\"#x-frame-options\",\"children\":[]},{\"level\":3,\"title\":\"JS 防御\",\"slug\":\"js-防御\",\"link\":\"#js-防御\",\"children\":[]}]},{\"level\":2,\"title\":\"中间人攻击\",\"slug\":\"中间人攻击\",\"link\":\"#中间人攻击\",\"children\":[]}],\"git\":{\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"interview/safetyProtection.md\"}")
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
