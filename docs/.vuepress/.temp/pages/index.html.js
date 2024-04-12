import comp from "/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"heroImage\":\"/logo.png\",\"heroText\":\"前端宝藏库\",\"actionText\":\"点我开始吧 👉\",\"actionLink\":\"/interview/\",\"features\":[{\"title\":\"前端常用知识\",\"details\":\"React、Webpack、TypeScript等。\"},{\"title\":\"踩坑记录\",\"details\":\"技术成长，没有捷径，唯有积累。\"},{\"title\":\"For Me\",\"details\":\"天才出于勤奋。\"}],\"footer\":\"MIT Licensed | Copyright © 2021-present Christine\"},\"headers\":[],\"git\":{\"updatedTime\":1696858807000,\"contributors\":[{\"name\":\"Christinesy\",\"email\":\"tsy17321289030@163.com\",\"commits\":3},{\"name\":\"Christine-Only\",\"email\":\"tsy17321289030@163.com\",\"commits\":2},{\"name\":\"christinesy.tang\",\"email\":\"christinesy.tang@ap.jll.com\",\"commits\":2}]},\"filePathRelative\":\"README.md\"}")
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
