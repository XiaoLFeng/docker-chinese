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
                    'image': '镜像',
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

                    // 通用术语
                    'Name': '名称',
                    'Last Pushed': '最后推送',
                    'Contains': '包含',
                    'Visibility': '可见性',
                    'Public': '公开',
                    'Private': '私有',
                    'Scout': 'Scout',
                    'All content': '所有内容',
                    'Search by repository name': '按仓库名称搜索',
                    'Create a repository': '创建仓库',
                    'Go to previous page': '上一页',
                    'Go to next page': '下一页',
                    'namespace': '命名空间',
                    'Pricing': '价格',

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
                    [/about (\d+) hours?/, '约 $1 小时'],
                    [/less than 1 day/, '不到 1 天'],
                    [/created (\d+) (\w+) ago/, '创建于 $1 $2 前'],

                    // Docker 特定术语正则
                    [/(\d+)\s*MB/i, '$1 MB'],
                    [/(\d+)\s*GB/i, '$1 GB'],
                    [/(\d+)\s*KB/i, '$1 KB'],
                    [/(\d+)\s*B/i, '$1 B'],
                    [/(\d+) tag\(s\)/, '$1 个标签'],

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
                    // 顶部导航
                    'My Hub': '我的中心',
                    'Search Docker Hub': '搜索 Docker Hub',
                    'Help': '帮助',
                    'Notification center': '通知中心',
                    'notifications': '条通知',
                    'System theme': '系统主题',
                    'open app switcher': '打开应用切换器',
                    'user menu': '用户菜单',

                    // 侧边栏
                    'collapse sidebar': '收起侧边栏',
                    'open context switcher': '打开上下文切换器',
                    'Docker Personal': 'Docker 个人版',
                    'Repositories': '仓库',
                    'Hardened Images': '加固镜像',
                    'Collaborations': '协作',
                    'Settings': '设置',
                    'Default privacy': '默认隐私',
                    'Notifications': '通知',
                    'Billing': '账单',
                    'Usage': '使用情况',
                    'Pulls': '拉取次数',
                    'Storage': '存储',

                    // 通用
                    'Explore repositories': '浏览仓库',
                    'View all': '查看全部',
                    'Official Images': '官方镜像',
                    'Verified Publisher': '已验证发布者',
                    'Sponsored OSS': '赞助开源软件',
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

                    // Docker Scout
                    'Docker Scout': 'Docker Scout',
                    'Inactive': '未激活',
                    'Activate': '激活',

                    // 页脚
                    'Explore': '浏览',
                    'Containers': '容器',
                    'Account': '账户',
                    'Resources': '资源',
                    'Blog': '博客',
                    'Download Docker': '下载 Docker',
                    'Support': '支持',
                    'Feedback': '反馈',
                    'Documentation': '文档',
                    'Hub Release Notes': 'Hub 发布说明',
                    'Forums': '论坛',
                    'Company': '公司',
                    'About Us': '关于我们',
                    'Customers': '客户',
                    'Partners': '合作伙伴',
                    'Newsroom': '新闻室',
                    'Careers': '招聘',
                    'Contact Us': '联系我们',
                    'System Status': '系统状态',
                    'Terms of Service': '服务条款',
                    'Privacy': '隐私',
                    'Legal': '法律',
                    'Cookies Settings': 'Cookie 设置',
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

            dockerhub_official: {
                static: {
                    'Official Image': '官方镜像',
                    'Maintained by': '维护者',
                    'Docker Inc.': 'Docker 公司',
                    'Overview': '概览',
                    'Tags': '标签',
                    'Security': '安全',
                    'Insights': '洞察',
                    'Pull this image': '拉取此镜像',
                    'Copy pull command': '复制拉取命令',
                    'Supported tags': '支持的标签',
                    'Quick reference': '快速参考',
                    'License': '许可证',
                    'About this image': '关于此镜像',
                    'Image Variants': '镜像变体',
                },
                regexp: [
                    [/(\d+)\s*(MB|GB|KB)/i, '$1 $2'],
                    [/updated (\d+) (\w+) ago/, '更新于 $1 $2 前'],
                    [/(\d+)\s*downloads?/, '$1 次下载'],
                ],
                selector: [
                    ['.badge:contains("Official")', '官方'],
                    ['button:contains("Copy")', '复制'],
                    ['.nav-link:contains("Overview")', '概览'],
                    ['.nav-link:contains("Tags")', '标签'],
                ]
            },

            dockerhub_repo: {
                static: {
                    'Overview': '概览',
                    'Tags': '标签',
                    'Security': '安全',
                    'Insights': '洞察',
                    'Actions': '操作',
                    'General': '常规',
                    'Image Management': '镜像管理',
                    'Collaborators': '协作者',
                    'Webhooks': '网络钩子',
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
                    'Repository size': '仓库大小',
                    'Last pushed': '最后推送',
                    'Add a description': '添加描述',
                    'Add a category': '添加分类',
                    'Public view': '公开视图',
                    // 标签页相关
                    'Type': '类型',
                    'Vulnerabilities': '漏洞',
                    'Pulled': '拉取次数',
                    'Pushed': '推送时间',
                    'Operating System': '操作系统',
                    'Architecture': '架构',
                    'See all': '查看全部',
                    'This repository contains': '此仓库包含',
                    'tag(s)': '个标签',
                    'View in settings': '在设置中查看',
                    'less than 1 day': '不到 1 天',
                    'about 9 hours': '约 9 小时',
                    'Analyzed by': '分析工具',
                    // Repository overview
                    'Repository overview': '仓库概览',
                    'INCOMPLETE': '未完成',
                    // 设置页面
                    'RECOMMENDED': '推荐',
                    '无': '无',
                    'Static scanning': '静态扫描',
                    'NEW': '新',
                    'Learn more': '了解更多',
                    'All tags are mutable': '所有标签可变',
                    'DEFAULT': '默认',
                    'All tags are immutable': '所有标签不可变',
                    'Specific tags are immutable': '特定标签不可变',
                    'Regular expressions': '正则表达式',
                    'Regular expression': '正则表达式',
                    'Add': '添加',
                    'Current expressions': '当前表达式',
                    // Build Cloud
                    'Build with': '使用构建',
                    // 标签表格
                    'Tag': '标签',
                    'Tag is active': '标签活跃',
                    'Image': '镜像',
                    'beta': 'Beta',
                    // 按钮和操作
                    'Add overview': '添加概览',
                    // 版权和法律
                    'All rights reserved': '版权所有',
                },
                regexp: [],
                selector: [
                    ['h1', '镜像详情'],
                    ['button:contains("Copy")', '复制'],
                    ['code', ''], // 保留代码块内容
                    ['.nav-link:contains("Overview")', '概览'],
                    ['.nav-link:contains("Tags")', '标签'],
                    ['.nav-link:contains("Security")', '安全'],
                ]
            },

            dockerhub_repositories: {
                static: {
                    'Repositories': '仓库',
                    'namespace': '命名空间',
                    'All content': '所有内容',
                    'Create a repository': '创建仓库',
                    // 表格列头
                    'Name': '名称',
                    'Last Pushed': '最后推送',
                    'Contains': '包含',
                    'Visibility': '可见性',
                    'Scout': 'Scout',
                    // 内容
                    'image': '镜像',
                    'Public': '公开',
                    'Private': '私有',
                    'Inactive': '未激活',
                    // 分页
                    'Go to previous page': '上一页',
                    'Go to next page': '下一页',
                },
                regexp: [],
                selector: []
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

            dockerhub_layers: {
                static: {
                    'Layers': '层',
                    'Image Layers': '镜像层',
                    'Layer Details': '层详情',
                    'Size': '大小',
                    'Command': '命令',
                    'Files': '文件',
                    'Copy digest': '复制摘要',
                    'Back to tags': '返回标签',
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
                    'Install Docker': '安装 Docker',
                    'Start coding': '开始编码',
                    'Table of Contents': '目录',
                    'On this page': '本页内容',
                    'Edit this page': '编辑此页',
                    'Create an issue': '创建问题',
                    'Yes': '是的',
                    'No': '不是',
                },
                regexp: [],
                selector: []
            },

            dockerdocs_other: {
                static: {
                    'Documentation': '文档',
                    'Get started': '开始使用',
                    'Guides': '指南',
                    'Reference': '参考',
                    'Tutorials': '教程',
                    'Examples': '示例',
                    'Troubleshooting': '故障排除',
                    'FAQ': '常见问题',
                    'Community': '社区',
                    'Support': '支持',
                },
                regexp: [],
                selector: []
            },

            dockerdocs_home: {
                static: {
                    'Docker Desktop': 'Docker Desktop',
                    'Docker Hub': 'Docker Hub',
                    'Docker Engine': 'Docker 引擎',
                    'Docker Compose': 'Docker Compose',
                    'Docker Build': 'Docker 构建',
                    'Docker Scout': 'Docker Scout',
                    'Subscription': '订阅',
                    'Billing': '账单',
                    'Administration': '管理',
                    'Security': '安全',
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
                    'Integrations': '集成',
                    'Samples': '示例',
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
                    'Docker Desktop': 'Docker Desktop',
                    'Docker Hub': 'Docker Hub',
                    'Developers': '开发者',
                    'Partners': '合作伙伴',
                    'Blog': '博客',
                    'Community': '社区',
                    'Events': '事件',
                    'News': '新闻',
                    'Careers': '招聘',
                    'Contact': '联系',
                    'Sign In': '登录',
                },
                regexp: [],
                selector: []
            },

            docker_home: {
                static: {
                    'Docker Desktop': 'Docker Desktop',
                    'Docker Hub': 'Docker Hub',
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
                    'Features': '功能特性',
                    'Pricing': '价格',
                    'Documentation': '文档',
                    'Get Started': '开始使用',
                },
                regexp: [],
                selector: []
            },

            docker_pricing: {
                static: {
                    'Pricing': '价格',
                    'Plans': '方案',
                    'Free': '免费',
                    'Pro': '专业版',
                    'Team': '团队版',
                    'Business': '商业版',
                    'Enterprise': '企业版',
                    'Get Started': '开始使用',
                    'Features': '功能特性',
                    'Billing': '账单',
                    'Subscription': '订阅',
                },
                regexp: [],
                selector: []
            },

            docker_resources: {
                static: {
                    'Resources': '资源',
                    'Documentation': '文档',
                    'Tutorials': '教程',
                    'Guides': '指南',
                    'Blog': '博客',
                    'Community': '社区',
                    'Support': '支持',
                    'Training': '培训',
                    'Certification': '认证',
                    'Webinars': '网络研讨会',
                    'Whitepapers': '白皮书',
                },
                regexp: [],
                selector: []
            },

            docker_blog: {
                static: {
                    'Blog': '博客',
                    'Categories': '分类',
                    'Tags': '标签',
                    'Archive': '归档',
                    'Subscribe': '订阅',
                    'Author': '作者',
                    'Published': '发布时间',
                    'Read more': '阅读更多',
                    'Leave a comment': '留言',
                },
                regexp: [],
                selector: []
            },

            docker_other: {
                static: {
                    'Contact': '联系',
                    'About': '关于',
                    'Partners': '合作伙伴',
                    'Events': '事件',
                    'News': '新闻',
                    'Careers': '招聘',
                    'Press': '媒体',
                    'Legal': '法律',
                    'Privacy': '隐私',
                    'Terms': '条款',
                },
                regexp: [],
                selector: []
            },

            docker_public: {
                static: {
                    // 这里可以放置所有页面通用的翻译
                },
                regexp: [],
                selector: []
            },

            // 页面标题翻译
            title: {
                static: {
                    'Docker Hub': 'Docker Hub',
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
        },

        'zh-CN': {
            extend: true,
        }
    };

    function deepMerge(target) {
        target = target || {};
        for (let i = 1; i < arguments.length; i++) {
            const source = arguments[i];
            if (!source) {
                continue;
            }
            Object.keys(source).forEach(key => {
                const value = source[key];
                if (Array.isArray(value)) {
                    target[key] = (target[key] || []).concat(value);
                } else if (value && typeof value === 'object' && !(value instanceof RegExp)) {
                    target[key] = deepMerge(target[key] || {}, value);
                } else {
                    target[key] = value;
                }
            });
        }
        return target;
    }

    function extendLanguage(targetKey, baseKey) {
        if (!I18N[baseKey]) {
            return;
        }
        if (!I18N[targetKey]) {
            I18N[targetKey] = { extend: true };
        }
        const target = I18N[targetKey];
        if (!target.extend) {
            return;
        }
        I18N[targetKey] = deepMerge({}, I18N[baseKey], target);
        delete I18N[targetKey].extend;
    }

    extendLanguage('zh_CN', 'zh');
    extendLanguage('zh-CN', 'zh');

    // 导出词库
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = I18N;
    } else {
        window.I18N = I18N;
    }

    // 兼容 GitHub 中文化插件的词库格式
    if (typeof window !== 'undefined' && typeof window.I18N === 'undefined') {
        window.I18N = I18N;
    }

})();
