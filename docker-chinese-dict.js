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

            // 公共翻译（所有短词翻译都在这里）
            public: {
                static: {
                    // ========== 基础操作 ==========
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
                    'Add': '添加',

                    // ========== Docker 特定术语 ==========
                    'Container': '容器',
                    'Containers': '容器',
                    'Image': '镜像',
                    'image': '镜像',
                    'Volume': '卷',
                    'Network': '网络',
                    'Networking': '网络',
                    'Service': '服务',
                    'Stack': '堆栈',
                    'Swarm': '集群',
                    'Node': '节点',
                    'Worker': '工作节点',
                    'Manager': '管理节点',
                    'Port': '端口',
                    'Environment': '环境',
                    'Tag': '标签',
                    'Tags': '标签',
                    'tag(s)': '个标签',
                    'Layer': '层',
                    'Layers': '层',
                    'Repository': '仓库',
                    'Repositories': '仓库',
                    'Registry': '注册表',
                    'Digest': '摘要',
                    'Size': '大小',
                    'Created': '创建时间',
                    'Updated': '更新时间',
                    'Version': '版本',
                    'License': '许可证',
                    'Dockerfile': 'Dockerfile',
                    'Manifest': '清单',

                    // Docker 产品和功能
                    'Docker Hub': 'Docker Hub',
                    'Docker Desktop': 'Docker Desktop',
                    'Docker Engine': 'Docker 引擎',
                    'Docker Compose': 'Docker Compose',
                    'Docker Build': 'Docker 构建',
                    'Docker Scout': 'Docker Scout',
                    'Docker Personal': 'Docker 个人版',
                    'Docker Inc.': 'Docker 公司',
                    'Docker Products': 'Docker 产品',
                    'Docker Offload': 'Docker 卸载',
                    'Hardened Images': '加固镜像',

                    // ========== 导航菜单 ==========
                    'Home': '首页',
                    'Explore': '浏览',
                    'Pricing': '价格',
                    'Docs': '文档',
                    'Documentation': '文档',
                    'Support': '支持',
                    'Community': '社区',
                    'Partners': '合作伙伴',
                    'Company': '公司',
                    'Blog': '博客',
                    'News': '新闻',
                    'Events': '事件',
                    'Careers': '招聘',
                    'Help': '帮助',
                    'About': '关于',
                    'About Us': '关于我们',
                    'Contact': '联系',
                    'Contact Us': '联系我们',

                    // Docker Hub 导航
                    'My Hub': '我的中心',
                    'Search Docker Hub': '搜索 Docker Hub',
                    'Notification center': '通知中心',
                    'notifications': '条通知',
                    'System theme': '系统主题',
                    'open app switcher': '打开应用切换器',
                    'user menu': '用户菜单',
                    'collapse sidebar': '收起侧边栏',
                    'open context switcher': '打开上下文切换器',

                    // ========== 用户相关 ==========
                    'Settings': '设置',
                    'Profile': '个人资料',
                    'Account': '账户',
                    'Logout': '退出',
                    'Login': '登录',
                    'Sign in': '登录',
                    'Sign In': '登录',
                    'Sign up': '注册',
                    'Sign Up': '注册',
                    'Register': '注册',
                    'Get Started': '开始使用',
                    'Get started': '开始使用',
                    'Get Docker': '获取 Docker',
                    'Create Account': '创建账户',

                    // ========== 仓库和镜像相关 ==========
                    'Official Image': '官方镜像',
                    'Official images': '官方镜像',
                    'Official Images': '官方镜像',
                    'Docker Official Images': 'Docker 官方镜像',
                    'Verified Publisher': '已验证发布者',
                    'Sponsored OSS': '赞助开源软件',
                    'Featured': '精选',
                    'Trending': '趋势',
                    'Trending repositories': '趋势仓库',
                    'Popular': '热门',
                    'Popular repositories': '热门仓库',
                    'New': '最新',
                    'Recently updated': '最近更新',
                    'Explore repositories': '浏览仓库',

                    // 仓库操作
                    'Pull this image': '拉取此镜像',
                    'Copy pull command': '复制拉取命令',
                    'Run this container': '运行此容器',
                    'Docker commands': 'Docker 命令',
                    'Pull command': '拉取命令',
                    'Copy digest': '复制摘要',
                    'View layers': '查看层',
                    'Back to tags': '返回标签',
                    'Add a description': '添加描述',
                    'Add a category': '添加分类',
                    'Add overview': '添加概览',

                    // 仓库信息
                    'Maintained by': '维护者',
                    'Supported tags': '支持的标签',
                    'Quick reference': '快速参考',
                    'About this image': '关于此镜像',
                    'Image Variants': '镜像变体',
                    'Image Layers': '镜像层',
                    'Layer Details': '层详情',
                    'Image details': '镜像详情',
                    'Image ID': '镜像 ID',
                    'Image Management': '镜像管理',
                    'Container information': '容器信息',
                    'Repository size': '仓库大小',
                    'Repository overview': '仓库概览',
                    'This repository contains': '此仓库包含',

                    // ========== 页面元素 ==========
                    'Overview': '概览',
                    'Security': '安全',
                    'Insights': '洞察',
                    'Actions': '操作',
                    'General': '常规',
                    'Description': '描述',
                    'Architecture': '架构',
                    'OS': '操作系统',
                    'Operating System': '操作系统',
                    'OS/ARCH': '操作系统/架构',
                    'OS/Arch': '操作系统/架构',
                    'Compressed Size': '压缩大小',
                    'Full Size': '完整大小',
                    'Docker version': 'Docker 版本',

                    // 列表和表格
                    'Name': '名称',
                    'Type': '类型',
                    'Command': '命令',
                    'Files': '文件',
                    'Last Pushed': '最后推送',
                    'Last pushed': '最后推送',
                    'Contains': '包含',
                    'Visibility': '可见性',
                    'Public': '公开',
                    'Private': '私有',
                    'Public view': '公开视图',
                    'Scout': 'Scout',
                    'All content': '所有内容',
                    'namespace': '命名空间',
                    'Search by repository name': '按仓库名称搜索',
                    'Create a repository': '创建仓库',
                    'No tags found': '未找到标签',

                    // ========== 统计信息 ==========
                    'Download count': '下载次数',
                    'Stars': '收藏',
                    'Builds': '构建',
                    'Pulls': '拉取次数',
                    'Pulled': '拉取次数',
                    'Pushed': '推送时间',
                    'Storage': '存储',
                    'Usage': '使用情况',
                    'Vulnerabilities': '漏洞',
                    'Analyzed by': '分析工具',

                    // ========== 状态相关 ==========
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
                    'INCOMPLETE': '未完成',
                    'RECOMMENDED': '推荐',
                    'NEW': '新',
                    'DEFAULT': '默认',
                    'Tag is active': '标签活跃',
                    'beta': 'Beta',
                    '无': '无',

                    // ========== 按钮和操作 ==========
                    'View': '查看',
                    'View all': '查看全部',
                    'View in settings': '在设置中查看',
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
                    'Download': '下载',
                    'Upload': '上传',
                    'Copy': '复制',
                    'Share': '分享',
                    'Export': '导出',
                    'Import': '导入',
                    'Learn more': '了解更多',
                    'See all': '查看全部',
                    'Activate': '激活',

                    // 分页
                    'Go to previous page': '上一页',
                    'Go to next page': '下一页',

                    // ========== Docker Hub 特定 ==========
                    'Collaborations': '协作',
                    'Collaborators': '协作者',
                    'Webhooks': '网络钩子',
                    'Default privacy': '默认隐私',
                    'Notifications': '通知',
                    'Billing': '账单',
                    'Subscription': '订阅',
                    'Static scanning': '静态扫描',
                    'Regular expressions': '正则表达式',
                    'Regular expression': '正则表达式',
                    'Current expressions': '当前表达式',
                    'All tags are mutable': '所有标签可变',
                    'All tags are immutable': '所有标签不可变',
                    'Specific tags are immutable': '特定标签不可变',
                    'Build with': '使用构建',

                    // ========== 页脚和资源 ==========
                    'Resources': '资源',
                    'Feedback': '反馈',
                    'Hub Release Notes': 'Hub 发布说明',
                    'Forums': '论坛',
                    'Customers': '客户',
                    'Newsroom': '新闻室',
                    'System Status': '系统状态',
                    'Terms of Service': '服务条款',
                    'Privacy': '隐私',
                    'Legal': '法律',
                    'Terms': '条款',
                    'Cookies Settings': 'Cookie 设置',
                    'All rights reserved': '版权所有',
                    'Download Docker': '下载 Docker',

                    // ========== 文档相关 ==========
                    'Learn Docker': '学习 Docker',
                    'Install Docker': '安装 Docker',
                    'Install': '安装',
                    'Start coding': '开始编码',
                    'Table of Contents': '目录',
                    'On this page': '本页内容',
                    'Edit this page': '编辑此页',
                    'Create an issue': '创建问题',
                    'Guides': '指南',
                    'Reference': '参考',
                    'Samples': '示例',
                    'Examples': '示例',
                    'Tutorials': '教程',
                    'Troubleshooting': '故障排除',
                    'FAQ': '常见问题',
                    'Config': '配置',
                    'Logging': '日志',
                    'Monitoring': '监控',
                    'Integrations': '集成',
                    'Features': '功能特性',
                    'Benefits': '优势',
                    'Administration': '管理',

                    // ========== 商业和价格 ==========
                    'Products': '产品',
                    'Solutions': '解决方案',
                    'Plans': '方案',
                    'Free': '免费',
                    'Pro': '专业版',
                    'Team': '团队版',
                    'Business': '商业版',
                    'Enterprise': '企业版',
                    'Developers': '开发者',

                    // ========== 博客和媒体 ==========
                    'Categories': '分类',
                    'Archive': '归档',
                    'Subscribe': '订阅',
                    'Author': '作者',
                    'Published': '发布时间',
                    'Read more': '阅读更多',
                    'Leave a comment': '留言',
                    'Press': '媒体',
                    'Training': '培训',
                    'Certification': '认证',
                    'Webinars': '网络研讨会',
                    'Whitepapers': '白皮书',

                    // ========== 时间和日期 ==========
                    'Today': '今天',
                    'Yesterday': '昨天',
                    'This week': '本周',
                    'Last week': '上周',
                    'This month': '本月',
                    'Last month': '上月',
                    'This year': '今年',
                    'Last year': '去年',
                    'less than 1 day': '不到 1 天',
                    'about 9 hours': '约 9 小时',

                    // ========== 其他 ==========
                    'Yes': '是的',
                    'No': '不是',
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
                    [/updated (\d+) (\w+) ago/, '更新于 $1 $2 前'],

                    // Docker 特定术语正则
                    [/(\d+)\s*(MB|GB|KB|B)/i, '$1 $2'],
                    [/(\d+)\s*downloads?/, '$1 次下载'],
                    [/(\d+)\s*stars?/, '$1 个收藏'],
                    [/(\d+) tag\(s\)/, '$1 个标签'],

                    // 版本号处理
                    [/v?(\d+\.\d+\.\d+)/, 'v$1'],

                    // 状态信息处理
                    [/running for (\d+)/, '已运行 $1'],
                    [/exited \((\d+)\)/, '已退出 (代码 $1)'],

                    // 页面标题处理
                    [/^(.+) \| Docker Hub$/, '$1 | Docker Hub'],
                    [/^(.+) \| Docker Documentation$/, '$1 | Docker 文档'],
                    [/^(.+) \| Docker$/, '$1 | Docker'],
                ],

                selector: [
                    // Docker Hub
                    ['h1', 'Docker Hub'],
                    ['input[placeholder*="Search"]', '搜索镜像和仓库'],
                    ['a[href*="/explore"]', '浏览'],
                    ['a[href*="/pricing"]', '价格'],
                    ['a[href*="/signup"]', '注册'],
                    ['a[href*="/login"]', '登录'],

                    // Docker Hub - 官方镜像
                    ['.badge:contains("Official")', '官方'],
                    ['button:contains("Copy")', '复制'],
                    ['.nav-link:contains("Overview")', '概览'],
                    ['.nav-link:contains("Tags")', '标签'],
                    ['.nav-link:contains("Security")', '安全'],

                    // Docker Hub - 仓库
                    ['h1', '镜像详情'],
                    ['h2:contains("Popular")', '热门仓库'],
                    ['h2:contains("Official")', '官方镜像'],
                    ['code', ''], // 保留代码块内容
                ]
            }
        },

        zh_CN: {
            // 简体中文版本，继承 zh 的配置
            extend: true,
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
