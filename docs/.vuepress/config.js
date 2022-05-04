module.exports = {
  title: "Christine",
  head: [["link", { rel: "icon", href: "logo.png" }]],
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
        items: [
          { text: 'JavaScript设计模式', link: '/books/' },
        ]
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
        text: "常见问题",
        link: "/other/css",
      }
    ],
    sidebar: {
      "/interview/": ["html", "", "advance", "es6", "jsAsync", "eventLoop", "browser", "safetyProtection", "webpack", "http"],
      "/books/": ["", "FactoryPattern"],
      "/react/": ["", "hooks", "advance"],
      "/typescript/": [
        "",
        "base",
        "advance",
        "challengeBuildIn",
        "challenge",
        "tsconfig",
      ],
      "/advance/": ["prettier", "", "stylelint", "webpack", "umi"],
      "/automate/": ["", "nginx"],
      "/other/": ["css", "react", "antd", "stylelint", "nginx", "vite", ""],
    },
  },
};
