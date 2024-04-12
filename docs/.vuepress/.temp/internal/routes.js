export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/advance/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/advance/index.html.js"), meta: {"title":"ESLint配置"} }],
  ["/advance/prettier.html", { loader: () => import(/* webpackChunkName: "prettier.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/advance/prettier.html.js"), meta: {"title":"Perttier配置"} }],
  ["/advance/stylelint.html", { loader: () => import(/* webpackChunkName: "stylelint.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/advance/stylelint.html.js"), meta: {"title":"styleLint配置"} }],
  ["/advance/umi.html", { loader: () => import(/* webpackChunkName: "umi.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/advance/umi.html.js"), meta: {"title":"首屏加载优化"} }],
  ["/automate/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/automate/index.html.js"), meta: {"title":"前端自动化部署"} }],
  ["/automate/nginx.html", { loader: () => import(/* webpackChunkName: "nginx.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/automate/nginx.html.js"), meta: {"title":"Nginx部署"} }],
  ["/books/FactoryPattern.html", { loader: () => import(/* webpackChunkName: "FactoryPattern.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/books/FactoryPattern.html.js"), meta: {"title":"工厂模式"} }],
  ["/books/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/books/index.html.js"), meta: {"title":"JavaScript设计模式"} }],
  ["/interview/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/interview/index.html.js"), meta: {"title":"JS基础知识点"} }],
  ["/interview/advance.html", { loader: () => import(/* webpackChunkName: "advance.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/interview/advance.html.js"), meta: {"title":"JS进阶知识点"} }],
  ["/interview/browser.html", { loader: () => import(/* webpackChunkName: "browser.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/interview/browser.html.js"), meta: {"title":"浏览器相关知识点"} }],
  ["/interview/css.html", { loader: () => import(/* webpackChunkName: "css.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/interview/css.html.js"), meta: {"title":"CSS 知识点"} }],
  ["/interview/es6.html", { loader: () => import(/* webpackChunkName: "es6.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/interview/es6.html.js"), meta: {"title":"ES6知识点"} }],
  ["/interview/eventLoop.html", { loader: () => import(/* webpackChunkName: "eventLoop.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/interview/eventLoop.html.js"), meta: {"title":"Event Loop"} }],
  ["/interview/handWrite.html", { loader: () => import(/* webpackChunkName: "handWrite.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/interview/handWrite.html.js"), meta: {"title":"JS手写题"} }],
  ["/interview/html.html", { loader: () => import(/* webpackChunkName: "html.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/interview/html.html.js"), meta: {"title":"Html 知识点"} }],
  ["/interview/http.html", { loader: () => import(/* webpackChunkName: "http.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/interview/http.html.js"), meta: {"title":"HTTP"} }],
  ["/interview/jsAsync.html", { loader: () => import(/* webpackChunkName: "jsAsync.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/interview/jsAsync.html.js"), meta: {"title":"JS异步编程"} }],
  ["/interview/safetyProtection.html", { loader: () => import(/* webpackChunkName: "safetyProtection.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/interview/safetyProtection.html.js"), meta: {"title":"前端安全"} }],
  ["/interview/url.html", { loader: () => import(/* webpackChunkName: "url.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/interview/url.html.js"), meta: {"title":"输入 URL 到页面展示，这中间发生了什么"} }],
  ["/interview/webOptimize.html", { loader: () => import(/* webpackChunkName: "webOptimize.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/interview/webOptimize.html.js"), meta: {"title":"性能优化"} }],
  ["/interview/webpack.html", { loader: () => import(/* webpackChunkName: "webpack.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/interview/webpack.html.js"), meta: {"title":"Webpack"} }],
  ["/other/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/other/index.html.js"), meta: {"title":"umi常见问题"} }],
  ["/other/antd.html", { loader: () => import(/* webpackChunkName: "antd.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/other/antd.html.js"), meta: {"title":"antd常见问题"} }],
  ["/other/css.html", { loader: () => import(/* webpackChunkName: "css.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/other/css.html.js"), meta: {"title":"css常见问题"} }],
  ["/other/nginx.html", { loader: () => import(/* webpackChunkName: "nginx.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/other/nginx.html.js"), meta: {"title":"Nginx常见问题"} }],
  ["/other/react.html", { loader: () => import(/* webpackChunkName: "react.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/other/react.html.js"), meta: {"title":"React常见问题"} }],
  ["/other/stylelint.html", { loader: () => import(/* webpackChunkName: "stylelint.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/other/stylelint.html.js"), meta: {"title":"stylelint常见问题"} }],
  ["/other/vite.html", { loader: () => import(/* webpackChunkName: "vite.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/other/vite.html.js"), meta: {"title":"vite常见问题"} }],
  ["/other/vscode.html", { loader: () => import(/* webpackChunkName: "vscode.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/other/vscode.html.js"), meta: {"title":"vscode常见问题"} }],
  ["/git/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/git/index.html.js"), meta: {"title":"Git"} }],
  ["/react/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/react/index.html.js"), meta: {"title":"React 基础"} }],
  ["/react/RN.html", { loader: () => import(/* webpackChunkName: "RN.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/react/RN.html.js"), meta: {"title":"RN"} }],
  ["/react/advance.html", { loader: () => import(/* webpackChunkName: "advance.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/react/advance.html.js"), meta: {"title":"React 进阶"} }],
  ["/react/hooks.html", { loader: () => import(/* webpackChunkName: "hooks.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/react/hooks.html.js"), meta: {"title":"React hooks"} }],
  ["/react/reactInterview.html", { loader: () => import(/* webpackChunkName: "reactInterview.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/react/reactInterview.html.js"), meta: {"title":"React 面试题"} }],
  ["/typescript/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/typescript/index.html.js"), meta: {"title":"介绍"} }],
  ["/typescript/advance.html", { loader: () => import(/* webpackChunkName: "advance.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/typescript/advance.html.js"), meta: {"title":"进阶"} }],
  ["/typescript/base.html", { loader: () => import(/* webpackChunkName: "base.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/typescript/base.html.js"), meta: {"title":"基础"} }],
  ["/typescript/challenge.html", { loader: () => import(/* webpackChunkName: "challenge.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/typescript/challenge.html.js"), meta: {"title":"自定义工具类型"} }],
  ["/typescript/challengeBuildIn.html", { loader: () => import(/* webpackChunkName: "challengeBuildIn.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/typescript/challengeBuildIn.html.js"), meta: {"title":"内置工具类型"} }],
  ["/typescript/interview.html", { loader: () => import(/* webpackChunkName: "interview.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/typescript/interview.html.js"), meta: {"title":"常见面试题"} }],
  ["/typescript/tsconfig.html", { loader: () => import(/* webpackChunkName: "tsconfig.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/typescript/tsconfig.html.js"), meta: {"title":"tsconfig.json介绍"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/Users/Berry/Downloads/blog/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
