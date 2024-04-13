import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import { defaultTheme } from "@vuepress/theme-default";
import { palettePlugin } from "@vuepress/plugin-palette";
import { searchPlugin } from "@vuepress/plugin-search";

export default defineUserConfig({
  title: "Christine",
  head: [
    [
      "meta",
      {
        name: "referrer",
        content: "no-referrer",
      },
    ],
    // ["link", { rel: "icon", href: "growth.jpg" }],
  ],
  description: "一名专注前端开发的程序媛 👧🏻",
  base: "/blog/",
  plugins: [palettePlugin({ preset: "sass" })],
  theme: defaultTheme({
    // 在这里添加主题配置
    logo: "logo.png",
    lastUpdated: "最后更新时间",
    smoothScroll: true,
    repo: "https://github.com/Christine-Only/blog",
    repoLabel: "Github",
    navbar: [
      {
        text: "前端面试之道",
        link: "/interview/",
      },
      {
        text: "React",
        link: "/react/",
      },
      {
        text: "TypeScript",
        link: "/typescript/",
      },
      {
        text: "前端进阶",
        link: "/advance/prettier",
      },
      {
        text: "前端自动化部署",
        link: "/automate/",
      },
      {
        text: "Git",
        link: "/git/",
      },

      {
        text: "踩过的坑",
        link: "/other/css",
      },
      {
        text: "前端书籍",
        children: [{ text: "JavaScript设计模式", link: "/books/" }],
      },
    ],
    sidebar: {
      "/interview/": [
        {
          text: "Css",
          collapsible: false,
          children: ["/interview/css.md"],
        },
        {
          text: "Html",
          collapsible: false,
          children: ["/interview/html.md"],
        },
        {
          text: "JavaScript",
          collapsible: true,
          children: [
            "/interview/README.md",
            "/interview/advance.md",
            "/interview/es6.md",
            "/interview/jsAsync.md",
            "/interview/eventLoop.md",
            "/interview/handWrite.md",
          ],
        },
        {
          text: "Webpack",
          collapsible: false,
          children: ["/interview/webpack.md"],
        },
        {
          text: "性能优化",
          collapsible: false,
          children: [
            "/interview/performanceOptimization/webOptimize.md",
            "/interview/performanceOptimization/network.md",
            "/interview/performanceOptimization/render.md",
          ],
        },
        {
          text: "HTTP",
          collapsible: false,
          children: ["/interview/http.md"],
        },
        {
          text: "浏览器相关知识点",
          collapsible: true,
          children: ["/interview/browser.md", "/interview/url.md"],
        },
        {
          text: "前端安全",
          collapsible: false,
          children: ["/interview/safetyProtection.md"],
        },
      ],
      "/react/": [
        {
          text: "React",
          collapsible: true,
          children: [
            "/react/README.md",
            "/react/hooks.md",
            "/react/advance.md",
            "/react/reactInterview.md",
          ],
        },
        {
          text: "React Native",
          collapsible: false,
          children: ["/react/RN.md"],
        },
      ],
      "/typescript/": [
        {
          text: "TypeScript",
          collapsible: false,
          children: [
            "/typescript/README.md",
            "/typescript/base.md",
            "/typescript/advance.md",
            "/typescript/challengeBuildIn.md",
            "/typescript/challenge.md",
            "/typescript/tsconfig.md",
            "/typescript/interview.md",
          ],
        },
      ],
      "/advance/": [
        {
          text: "前端进阶",
          collapsible: true,
          children: [
            "/advance/prettier.md",
            "/advance/README.md",
            "/advance/stylelint.md",
            "/advance/umi.md",
          ],
        },
      ],
      "/automate/": [
        {
          text: "前端自动化部署",
          collapsible: true,
          children: ["/automate/README.md", "/automate/nginx.md"],
        },
      ],
      "/git/": [
        {
          text: "Git",
          collapsible: false,
          children: ["/git/README.md"],
        },
      ],
      "/other/": [
        {
          text: "踩过的坑",
          collapsible: true,
          children: [
            "/other/css.md",
            "/other/react.md",
            "/other/antd.md",
            "/other/stylelint.md",
            "/other/nginx.md",
            "/other/vite.md",
            "/other/README.md",
          ],
        },
      ],
      "/books/": [
        {
          text: "前端书籍",
          collapsible: true,
          children: ["/books/README.md", "/books/FactoryPattern.md"],
        },
      ],
    },
  }),
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
  plugins: [
    searchPlugin({
      // 配置项
    }),
  ],
});
