module.exports = {
  // theme: "",
  title: 'Naive-Echarts',
  description: 'Chart components written using Vue2',
  base: '/',
  port: '4396',
  themeConfig: {
    // smoothScroll: true,
    nav: [
      {
        text: 'github',
        link: 'https://github.com/moaningwind/naive-echarts',
      },
    ],
    sidebar: ['/comps/install', '/comps/use'],
  },
  // Using echarts directly results in an error: global is not defined
  head: [['script', { src: 'https://cdn.bootcdn.net/ajax/libs/echarts/5.4.0/echarts.min.js' }]],
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  plugins: ['demo-container'],
  configureWebpack: {
    resolve: {
      alias: {
        '@': '/../src',
      },
    },
    externals: {
      'echarts/core': 'echarts',
    },
  },
  evergreen: true,
}
