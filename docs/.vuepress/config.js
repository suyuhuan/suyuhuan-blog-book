module.exports = {
    title: 'SUYUHUAN | 高级前端术道',
    description: '进阶前端高级整理各种知识点',
    displayAllHeaders: true,
    themeConfig: {
      nav: [
        { text: '进修.博文', link: '/article/' },
        { text: '巩固.知识', items: [
          { text: 'CSS', link: '/knowledge/css.md' },
          { text: 'JavaScript', link: '/knowledge/javascript.md' },
          { text: '浏览器', link: '/knowledge/浏览器.md' },
          { text: '服务端与网络', link: '/knowledge/服务端与网络.md' },
          { text: '框架', link: '/knowledge/框架.md' },
          { text: '计算机通识', link: '/knowledge/计算机通识.md' }
        ]
      },
        {
           text: '面试.助力', 
           items: [
            { text: '常考', items: [
              { text: '高频常考', link: '/questions/高频.md' },
            ]
            },
            { text: '基础', items: [
              { text: 'web综合基础', link: '/questions/web基础.md' },
            ]
            },
            { text: '汇总', 
            items: [
              { text: 'JavaScript', link: '/questions/javascript.md' },
              { text: '浏览器', link: '/questions/浏览器.md' },
              { text: '性能', link: '/questions/性能.md' },
              { text: '安全', link: '/questions/安全.md' },
              { text: '框架', link: '/questions/框架.md' },
              { text: '编程题', link: '/questions/编程题.md' },
              { text: '小程序', link: '/questions/小程序.md' },
              
            ] 
            },
          ],
           link: '/questions/' 
        },
        
      { text: 'GitHub', link: 'https://github.com/suyuhuan/suyuhuan-blog-book' },
      ],
      // logo: '/assets/img/logo.png',
      sidebar: {
        '/article/':[
          '',
        ],
        '/questions/': [
          '高频',
          'web基础',
          'javascript', 
          '浏览器', 
          '性能', 
          '安全', 
          '框架',
          '编程题', 
          '小程序',
        ],
        '/knowledge/': [
          'css',
          'javascript',
          '浏览器',
          '服务端与网络',
          '框架',
          '计算机通识'
        ]
      }
    }
    
  }