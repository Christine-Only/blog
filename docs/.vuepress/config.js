module.exports = {
  title: "Christine",
  head: [["link", { rel: "icon", herf: "logo.png" }]],
  description: "欢迎来到我的博客👏🏻",
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
        text: "前端自动化部署",
        link: "/automate/",
      },
      {
        text: "Git",
        link: "/git/",
      },
      {
        text: "TypeScript",
        items: [
          { text: "TypeScript介绍", link: "/typescript/" },
          { text: "TypeScript基础", link: "/typescript/base/" },
          { text: "TypeScript进阶", link: "/typescript/advance/" },
        ],
      },
      {
        text: "React",
        link: "/react/",
      },
      {
        text: "前端规范",
        link: "/eslint/",
      },
    ],
    sidebar: {
      "/interview/": ["", "advance", "es6", "jsAsync", "promise", "eventLoop"],
      "/automate/": ["", "nginx"],
      "/react/": ["", "advance"],
      "/eslint/": ["", "stylelint"],
    },
  },
};
