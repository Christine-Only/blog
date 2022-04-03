module.exports = {
  title: "Christine",
  head: [["link", { rel: "icon", herf: "logo.png" }]],
  description: "一名专注前端开发的程序媛 👧🏻",
  base: "/blog/",
  themeConfig: {
    lastUpdated: "最后更新时间",
    smoothScroll: true,
    repo: "https://github.com/Christine-Only/blog",
    repoLabel: "Github",
    nav: [
      {
        text: "前端面试之道",
        link: "/interview/",
      },
      {
        text: "前端书籍",
        link: "/books/",
      },
      {
        text: "Git",
        link: "/git/",
      },
      {
        text: "TypeScript",
        link: "/typescript/",
      },
      {
        text: "React",
        link: "/react/",
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
        text: "常见问题",
        link: "/other/css",
      }
    ],
    sidebar: {
      "/interview/": ["html", "", "advance", "es6", "jsAsync", "promise", "eventLoop"],
      "/books": ["", "/factoryPattern"],
      "/typescript/": [
        "",
        "base",
        "advance",
        "challengeBuildIn",
        "challenge",
        "tsconfig",
      ],
      "/react/": ["", "advance"],
      "/advance/": ["prettier", "", "stylelint", "webpack", "umi"],
      "/automate/": ["", "nginx"],
      "/other/": ["css", "react", "antd", "stylelint", "nginx", "vite", ""],
    },
  },
};
