export const siteData = JSON.parse("{\"base\":\"/blog/\",\"lang\":\"en-US\",\"title\":\"Christine\",\"description\":\"一名专注前端开发的程序媛 👧🏻\",\"head\":[[\"meta\",{\"name\":\"referrer\",\"content\":\"no-referrer\"}]],\"locales\":{}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
