(function () {
    'use strict';

    const I18N = {
        zh: {
            conf: {
                reIgnoreId: /^$/,
                reIgnoreClass: /(^|\s)(ace_editor|MathJax|CodeMirror|hljs|katex)(\s|$)/,
                reIgnoreTag: ['SCRIPT', 'STYLE', 'svg', 'path', 'use', 'symbol', 'g', 'rect', 'circle', 'polygon', 'ellipse', 'polyline', 'line', 'defs', 'marker', 'mask', 'pattern', 'linearGradient', 'radialGradient', 'stop', 'textPath', 'feGaussianBlur', 'feComponentTransfer', 'feBlend', 'feColorMatrix', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feFlood', 'feGaussianBlur', 'feImage', 'feMerge', 'feMorphology', 'feOffset', 'feSpecularLighting', 'feTile', 'feTurbulence', 'filter', 'linearGradient', 'radialGradient', 'stop'],
                reIgnoreItemprop: /^$/,
                rePageClass: /page-(\w+)/,
                rePagePath: /^\/(\w+)(?:\/.*)?$/,
                rePagePathRepo: /^\/([^\/]+)\/([^\/]+)(?:\/(.+))?$/,
                rePagePathOrg: /^\/(?:orgs|organizations)(?:\/([^\/]+))?(?:\/(.+))?$/
            },

            // Docker 公共翻译
            public: {
                static: {
                    // 基础操作
                    'Search': '搜索',
                    'Pull': '拉取',
                    'Push': '推送',
                    'Build': '构建',
                    'Run': '运行',
                    'Stop': '停止',
                    'Start': '启动',
                    'Restart': '重启',
                    'Remove': '删除',
                    'Delete': '删除',
                    'Edit': '编辑',
                    'Save': '保存',
                    'Cancel': '取消',
                    'Close': '关闭',
                    'Back': '返回',
                    'Next': '下一步',
                    'Previous': '上一步',
                    'Submit': '提交',
                    'Confirm': '确认',
                    'Continue': '继续',
                    'Skip': '跳过',
                    'Help': '帮助',
                    'About': '关于',
                    'Settings': '设置',
                    'Profile': '个人资料',
                    'Account': '账户',
                    'Logout': '退出',
                    'Login': '登录',
                    'Sign in': '登录',
                    'Sign up': '注册',
                    'Register': '注册',

                    // Docker 特定术语
                    'Container': '容器',
                    'Image': '镜像',
                    'Volume': '卷',
                    'Network': '网络',
                    'Service': '服务',
                    'Stack': '堆栈',
                    'Swarm': '集群',
                    'Node': '节点',
                    'Worker': '工作节点',
                    'Manager': '管理节点',
                    'Port': '端口',
                    'Environment': '环境',
                    'Tag': '标签',
                    'Layer': '层',
                    'Repository': '仓库',
                    'Registry': '注册表',
                    'Digest': '摘要',
                    'Size': '大小',
                    'Created': '创建时间',
                    'Updated': '更新时间',
                    'Version': '版本',
                    'License': '许可证',
                    'Documentation': '文档',
                    'Support': '支持',
                    'Download': '下载',
                    'Upload': '上传',
                    'Copy': '复制',
                    'Share': '分享',
                    'Export': '导出',
                    'Import': '导入',

                    // 导航菜单
                    'Home': '首页',
                    'Explore': '浏览',
                    'Pricing': '价格',
                    'Docs': '文档',
                    'Support': '支持',
                    'Community': '社区',
                    'Partners': '合作伙伴',
                    'Company': '公司',
                    'Blog': '博客',
                    'News': '新闻',
                    'Events': '事件',
                    'Careers': '招聘',

                    // 状态相关
                    'Active': '活动',
                    'Inactive': '非活动',
                    'Running': '运行中',
                    'Stopped': '已停止',
                    'Failed': '失败',
                    'Success': '成功',
                    'Warning': '警告',
                    'Error': '错误',
                    'Pending': '等待中',
                    'Complete': '完成',
                    'Ready': '就绪',
                    'Healthy': '健康',
                    'Unhealthy': '不健康',

                    // 按钮和操作
                    'View': '查看',
                    'Show': '显示',
                    'Hide': '隐藏',
                    'More': '更多',
                    'Less': '更少',
                    'All': '全部',
                    'None': '无',
                    'Filter': '筛选',
                    'Sort': '排序',
                    'Refresh': '刷新',
                    'Reload': '重新加载',
                    'Reset': '重置',
                    'Clear': '清除',
                    'Clean': '清理',

                    // 时间和日期
                    'Today': '今天',
                    'Yesterday': '昨天',
                    'This week': '本周',
                    'Last week': '上周',
                    'This month': '本月',
                    'Last month': '上月',
                    'This year': '今年',
                    'Last year': '去年',
                },

                regexp: [
                    // 时间相关正则
                    [/(\d+)\s*second[s]?\s*ago/, '$1秒前'],
                    [/(\d+)\s*minute[s]?\s*ago/, '$1分钟前'],
                    [/(\d+)\s*hour[s]?\s*ago/, '$1小时前'],
                    [/(\d+)\s*day[s]?\s*ago/, '$1天前'],
                    [/(\d+)\s*week[s]?\s*ago/, '$1周前'],
                    [/(\d+)\s*month[s]?\s*ago/, '$1个月前'],
                    [/(\d+)\s*year[s]?\s*ago/, '$1年前'],
                    [/just now/, '刚刚'],

                    // Docker 特定术语正则
                    [/(\d+)\s*MB/i, '$1 MB'],
                    [/(\d+)\s*GB/i, '$1 GB'],
                    [/(\d+)\s*KB/i, '$1 KB'],
                    [/(\d+)\s*B/i, '$1 B'],

                    // 版本号处理
                    [/v?(\d+\.\d+\.\d+)/, 'v$1'],

                    // 状态信息处理
                    [/running for (\d+)/, '已运行 $1'],
                    [/exited \((\d+)\)/, '已退出 (代码 $1)'],
                ],

                selector: []
            },

            // Docker Hub 翻译
            dockerhub: {
                static: {
                    'Explore repositories': '浏览仓库',
                    'View all': '查看全部',
                    'Official Images': '官方镜像',
                    'Verified Publisher': '已验证发布者',
                    'Sponsored OSS': '赞助开源软件',
                    'Docker Verified Publisher': 'Docker 验证发布者',
                    'Docker Official Images': 'Docker 官方镜像',
                    'Featured': '精选',
                    'Trending': '趋势',
                    'Popular': '热门',
                    'New': '最新',
                    'Recently updated': '最近更新',
                    'Download count': '下载次数',
                    'Stars': '收藏',
                    'Builds': '构建',
                    'Description': '描述',
                    'Tags': '标签',
                    'Layers': '层',
                    'Architecture': '架构',
                    'OS': '操作系统',
                    'Dockerfile': 'Dockerfile',
                    'Compressed Size': '压缩大小',
                    'Full Size': '完整大小',
                },
                regexp: [
                    [/(\d+)\s*(MB|GB|KB)/i, '$1 $2'],
                    [/(\d+)\s*downloads?/, '$1 次下载'],
                    [/(\d+)\s*stars?/, '$1 个收藏'],
                ],
                selector: [
                    ['h1', 'Docker Hub'],
                    ['input[placeholder*="Search"]', '搜索镜像和仓库'],
                    ['a[href*="/explore"]', '浏览'],
                    ['a[href*="/pricing"]', '价格'],
                ]
            },

            dockerhub_home: {
                static: {
                    'Welcome to Docker Hub': '欢迎使用 Docker Hub',
                    'Search for images and repositories': '搜索镜像和仓库',
                    'Popular repositories': '热门仓库',
                    'Official images': '官方镜像',
                    'Trending repositories': '趋势仓库',
                    'Get Started': '开始使用',
                    'Sign In': '登录',
                    'Sign Up': '注册',
                    'Create Account': '创建账户',
                },
                regexp: [
                    [/(\d+)\s*(M|G)B/i, '$1 $2B'],
                ],
                selector: [
                    ['h1', '欢迎使用 Docker Hub'],
                    ['input[placeholder*="Search"]', '搜索镜像和仓库'],
                    ['a[href*="/signup"]', '注册'],
                    ['a[href*="/login"]', '登录'],
                    ['h2:contains("Popular")', '热门仓库'],
                    ['h2:contains("Official")', '官方镜像'],
                ]
            },

            dockerhub_repo: {
                static: {
                    'Overview': '概览',
                    'Tags': '标签',
                    'Security': '安全',
                    'Insights': '洞察',
                    'Actions': '操作',
                    'Pull this image': '拉取此镜像',
                    'Copy pull command': '复制拉取命令',
                    'Docker commands': 'Docker 命令',
                    'Run this container': '运行此容器',
                    'Container information': '容器信息',
                    'Image details': '镜像详情',
                    'Image ID': '镜像 ID',
                    'Created': '创建时间',
                    'Size': '大小',
                    'OS/ARCH': '操作系统/架构',
                    'Docker version': 'Docker 版本',
                },
                regexp: [
                    [/(\d+)\s*(MB|GB|KB)/i, '$1 $2'],
                    [/created (\d+) (\w+) ago/, '创建于 $1 $2 前'],
                ],
                selector: [
                    ['h1', '镜像详情'],
                    ['button:contains("Copy")', '复制'],
                    ['code', ''], // 保留代码块内容
                    ['.nav-link:contains("Overview")', '概览'],
                    ['.nav-link:contains("Tags")', '标签'],
                    ['.nav-link:contains("Security")', '安全'],
                ]
            },

            dockerhub_tags: {
                static: {
                    'Tags': '标签',
                    'Name': '名称',
                    'Last pushed': '最后推送',
                    'Size': '大小',
                    'OS/Arch': '操作系统/架构',
                    'Manifest': '清单',
                    'Copy digest': '复制摘要',
                    'View layers': '查看层',
                    'Pull command': '拉取命令',
                    'No tags found': '未找到标签',
                },
                regexp: [],
                selector: []
            },

            dockerhub_repositories: {
                static: {
                    'Tags': '标签',
                    'Name': '名称',
                    'Last pushed': '最后推送',
                    'Size': '大小',
                    'OS/Arch': '操作系统/架构',
                    'Manifest': '清单',
                    'Copy digest': '复制摘要',
                    'View layers': '查看层',
                    'Pull command': '拉取命令',
                    'No tags found': '未找到标签',
                },
                regexp: [],
                selector: []
            },

            dockerdocs: {
                static: {
                    'Get Docker': '获取 Docker',
                    'Documentation': '文档',
                    'Get started': '开始使用',
                    'Guides': '指南',
                    'Reference': '参考',
                    'Samples': '示例',
                    'Learn Docker': '学习 Docker',
                    'What is a container?': '什么是容器？',
                    'What is Docker?': '什么是 Docker？',
                    'Why use Docker?': '为什么使用 Docker？',
                    'Install Docker': '安装 Docker',
                    'Start coding': '开始编码',
                    'Browse documentation': '浏览文档',
                    'Search documentation': '搜索文档',
                    'Table of Contents': '目录',
                    'On this page': '本页内容',
                    'Edit this page': '编辑此页',
                    'Create an issue': '创建问题',
                    'Was this helpful?': '这个有帮助吗？',
                    'Yes': '是的',
                    'No': '不是',
                },
                regexp: [],
                selector: []
            },

            dockerdocs_home: {
                static: {
                    'Docker Documentation': 'Docker 文档',
                    'Get started with Docker': '开始使用 Docker',
                    'Browse by section': '按部分浏览',
                    'Docker Desktop': 'Docker Desktop',
                    'Docker Hub': 'Docker Hub',
                    'Docker Engine': 'Docker 引擎',
                    'Docker Compose': 'Docker Compose',
                    'Docker Build': 'Docker 构建',
                    'Docker Build Cloud': 'Docker 云构建',
                    'Docker Scout': 'Docker Scout',
                    'Subscription': '订阅',
                    'Billing': '账单',
                    'Administration': '管理',
                    'Security': '安全',
                    'Testcontainers Cloud': 'Testcontainers 云',
                    'Docker Offload': 'Docker 卸载',
                },
                regexp: [],
                selector: []
            },

            dockerdocs_engine: {
                static: {
                    'Docker Engine': 'Docker 引擎',
                    'Install': '安装',
                    'Config': '配置',
                    'CLI reference': 'CLI 参考',
                    'API reference': 'API 参考',
                    'Release notes': '发布说明',
                    'Troubleshooting': '故障排除',
                    'Security': '安全',
                    'Storage': '存储',
                    'Networking': '网络',
                    'Logging': '日志',
                    'Monitoring': '监控',
                },
                regexp: [],
                selector: []
            },

            dockerdocs_compose: {
                static: {
                    'Docker Compose': 'Docker Compose',
                    'Getting started': '入门指南',
                    'File reference': '文件参考',
                    'CLI reference': 'CLI 参考',
                    'Integrations': '集成',
                    'Samples': '示例',
                    'How it works': '工作原理',
                    'Features': '功能特性',
                    'Benefits': '优势',
                },
                regexp: [],
                selector: []
            },

            docker: {
                static: {
                    'Products': '产品',
                    'Solutions': '解决方案',
                    'Pricing': '价格',
                    'Resources': '资源',
                    'Company': '公司',
                    'Get Started': '开始使用',
                    'Download Docker Desktop': '下载 Docker Desktop',
                    'Docker Desktop': 'Docker Desktop',
                    'Docker Hub': 'Docker Hub',
                    'Docker Enterprise': 'Docker 企业版',
                    'Developers': '开发者',
                    'IT Operations': 'IT 运维',
                    'Partners': '合作伙伴',
                    'Blog': '博客',
                    'Community': '社区',
                    'Events': '事件',
                    'News': '新闻',
                    'Careers': '招聘',
                    'Contact': '联系',
                    'Sign In': '登录',
                    'Get Started': '开始使用',
                },
                regexp: [],
                selector: []
            },

            docker_home: {
                static: {
                    'Build, Share, and Run Any App, Anywhere': '构建、分享和运行任何应用，随时随地',
                    'Get Started with Docker': '开始使用 Docker',
                    'Docker Desktop': 'Docker Desktop',
                    'The #1 containerization platform': '#1 容器化平台',
                    'Why Docker?': '为什么选择 Docker？',
                    'Trusted by developers': '受开发者信赖',
                    'Secure by default': '默认安全',
                    'Works everywhere': '随处可用',
                    'For developers': '面向开发者',
                    'For IT Operations': '面向 IT 运维',
                    'Explore Docker products': '探索 Docker 产品',
                    'Docker Hub': 'Docker Hub',
                    'Docker Desktop': 'Docker Desktop',
                    'Docker Enterprise': 'Docker 企业版',
                },
                regexp: [],
                selector: []
            },

            docker_products: {
                static: {
                    'Docker Products': 'Docker 产品',
                    'Docker Desktop': 'Docker Desktop',
                    'Docker Hub': 'Docker Hub',
                    'Docker Engine': 'Docker 引擎',
                    'Docker Compose': 'Docker Compose',
                    'Docker Build': 'Docker 构建',
                    'Docker Scout': 'Docker Scout',
                    'Docker Build Cloud': 'Docker 云构建',
                    'Docker Subscription': 'Docker 订阅',
                    'Features': '功能特性',
                    'Pricing': '价格',
                    'Documentation': '文档',
                    'Get Started': '开始使用',
                },
                regexp: [],
                selector: []
            },

            // 页面标题翻译
            title: {
                static: {
                    'Docker Hub Container Image Library | App Containerization': 'Docker Hub 容器镜像库 | 应用容器化',
                    'Documentation | Docker': '文档 | Docker',
                    'Docker Hub': 'Docker Hub',
                    'Docker Documentation': 'Docker 文档',
                    'Get Started | Docker': '开始使用 | Docker',
                    'Pricing | Docker': '价格 | Docker',
                    'Products | Docker': '产品 | Docker',
                    'Blog | Docker': '博客 | Docker',
                    'Community | Docker': '社区 | Docker',
                    'Company | Docker': '公司 | Docker',
                },
                regexp: [
                    [/^(.+) \| Docker Hub$/, '$1 | Docker Hub'],
                    [/^(.+) \| Docker Documentation$/, '$1 | Docker 文档'],
                    [/^(.+) \| Docker$/, '$1 | Docker'],
                ]
            }
        },

        zh_CN: {
            // 简体中文版本，可以与 zh 共享基础词库
            extend: true, // 继承 zh 的配置
        }
    };

    // 导出词库
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = I18N;
    } else {
        window.I18N = I18N;
    }

    // 兼容 GitHub 中文化插件的词库格式
    if (typeof window.I18N === 'undefined') {
        window.I18N = I18N;
    }

})();