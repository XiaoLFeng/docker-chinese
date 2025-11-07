(function () {
    'use strict';

    const I18N_PHRASES = {
        zh: {
            // 不需要重复 conf，从 I18N 继承即可

            // Docker Hub 长句翻译
            dockerhub: {
                static: {
                    // 完整句子（包含标点符号）
                    'Visit our Facebook page': '访问我们的 Facebook 页面',
                    'Visit our X page': '访问我们的 X 页面',
                    'Visit our YouTube page': '访问我们的 YouTube 页面',
                    'Visit our LinkedIn page': '访问我们的 LinkedIn 页面',
                    'View our RSS feed': '查看我们的 RSS 订阅',
                    'Events and Webinars': '活动和网络研讨会',
                    'Subscription Service Agreement': '订阅服务协议',
                },
                regexp: [],
                fragments: {
                    // 片段匹配规则
                    'Visit our': '访问我们的',
                    'View our': '查看我们的',
                }
            },

            dockerhub_home: {
                static: {
                    'Welcome to Docker Hub': '欢迎使用 Docker Hub',
                    'Search for images and repositories': '搜索镜像和仓库',
                },
                regexp: [],
                fragments: {}
            },

            dockerhub_official: {
                static: {
                    'Docker Official Image': 'Docker 官方镜像',
                    'Where to file issues': '在哪里提交问题',
                    'Supported architectures': '支持的架构',
                    'Published image artifact details': '已发布的镜像详情',
                    'How to use this image': '如何使用此镜像',
                    'View available tags': '查看可用标签',
                },
                regexp: [],
                fragments: {
                    'Where to file': '在哪里提交',
                    'How to use': '如何使用',
                }
            },

            dockerhub_repo: {
                static: {
                    // 超过6个单词的句子
                    'Using 0 of 1 private repositories': '使用 0 / 1 个私有仓库',
                    'To push a new tag to this repository': '推送新标签到此仓库',
                    'Tags cannot be overwritten in this repository': '此仓库中的标签无法被覆盖',

                    // 包含标点符号的长句
                    'An overview describes what your image does and how to run it. It displays in': '概览描述您的镜像功能以及如何运行它。显示在',
                    'the public view of your repository once you have pushed some content': '您推送内容后仓库的公开视图中',

                    // 设置页面长句
                    'Image security insight settings': '镜像安全洞察设置',
                    'Features and controls that help you uncover, understand, and fix issues with your container images in Docker Hub': '帮助您发现、理解和修复 Docker Hub 中容器镜像问题的功能和控制',
                    'Docker Scout image analysis': 'Docker Scout 镜像分析',
                    'Know when new CVEs impact your images, learn where they\'re introduced, and get recommendations for remediation options': '了解新 CVE 何时影响您的镜像、它们的来源以及修复建议',
                    'Enable repos in bulk on Scout Dashboard': '在 Scout 仪表板上批量启用仓库',
                    'Images will be scanned once when pushed and the vulnerability report saved at that point in time': '镜像将在推送时扫描一次，并保存该时间点的漏洞报告',

                    // 标签可变性设置
                    'Tag mutability settings': '标签可变性设置',
                    'Control whether tags can be edited to help maintain consistent, secure, and reliable deployments': '控制标签是否可编辑，以帮助维护一致、安全和可靠的部署',
                    'All tags are mutable': '所有标签可变',
                    'Tags can be changed to reference a different image. This allows you to retarget a tag without creating a new one': '标签可以更改以引用不同的镜像。这允许您重新定位标签而无需创建新标签',
                    'All tags are immutable': '所有标签不可变',
                    'Tags cannot be updated to point to a different image after creation. This ensures consistency and prevents accidental changes': '标签在创建后无法更新以指向不同的镜像。这确保一致性并防止意外更改',
                    'Specific tags are immutable': '特定标签不可变',
                    'Define specific tags that cannot be updated after creation using RegEx values': '使用正则表达式定义创建后无法更新的特定标签',
                    'Regular expressions': '正则表达式',
                    'Use a regular expression to match tag names based on patterns, such as specific words, prefixes or version formats': '使用正则表达式根据模式匹配标签名称，例如特定单词、前缀或版本格式',
                    'Current expressions': '当前表达式',

                    // Docker Build Cloud
                    'Docker Build Cloud': 'Docker 云构建',
                    'Accelerate image build times with access to cloud-based builders and shared cache': '通过访问云端构建器和共享缓存加速镜像构建时间',
                    'Docker Build Cloud executes builds on optimally-dimensioned cloud infrastructure with dedicated per-organization isolation': 'Docker 云构建在优化配置的云基础设施上执行构建，具有专用的组织隔离',
                    'Get faster builds through shared caching across your team, native multi-platform support, and encrypted data transfer - all without managing infrastructure': '通过团队共享缓存、原生多平台支持和加密数据传输获得更快的构建 - 无需管理基础设施',
                    'Go to Docker Build Cloud': '前往 Docker 云构建',

                    // 其他长句
                    'once you have pushed some content': '在您推送内容后',
                    'All rights reserved': '版权所有',
                },
                regexp: [
                    // 动态内容的正则匹配
                    [/Using (\d+) of (\d+) private repositories/, '使用 $1 / $2 个私有仓库'],
                    [/To push a new tag to (.+)/, '推送新标签到 $1'],
                ],
                fragments: {
                    // 片段包含匹配
                    'once you have pushed some content': '在您推送内容后',
                    'the public view of your repository': '仓库的公开视图',
                    'This repository contains': '此仓库包含',
                    'cannot be overwritten': '无法被覆盖',
                    'cannot be updated': '无法更新',
                    'after creation': '创建后',
                    'This ensures consistency': '这确保一致性',
                    'This allows you to': '这允许您',
                    'all without managing infrastructure': '无需管理基础设施',
                }
            },

            dockerhub_repositories: {
                static: {
                    'All repositories within the': '命名空间内的所有仓库',
                    'Search by repository name': '按仓库名称搜索',
                    'Activate Docker Scout in repository settings to get continuous security insights': '在仓库设置中激活 Docker Scout 以获得持续的安全洞察',
                },
                regexp: [
                    [/All repositories within the (.+?) namespace/, '命名空间 $1 内的所有仓库'],
                ],
                fragments: {
                    'All repositories within': '内的所有仓库',
                    'in repository settings to get': '在仓库设置中以获得',
                    'continuous security insights': '持续的安全洞察',
                }
            },

            dockerhub_tags: {
                static: {},
                regexp: [],
                fragments: {}
            },

            dockerhub_layers: {
                static: {},
                regexp: [],
                fragments: {}
            },

            dockerdocs: {
                static: {
                    // 问句（包含问号）
                    'What is a container?': '什么是容器？',
                    'What is Docker?': '什么是 Docker？',
                    'Why use Docker?': '为什么使用 Docker？',
                    'Was this helpful?': '这个有帮助吗？',

                    // 其他长句
                    'Browse documentation': '浏览文档',
                    'Search documentation': '搜索文档',
                    'Table of Contents': '目录',
                    'Edit this page': '编辑此页',
                    'Create an issue': '创建问题',
                },
                regexp: [],
                fragments: {
                    'What is': '什么是',
                    'Why use': '为什么使用',
                    'Was this': '这个',
                }
            },

            dockerdocs_other: {
                static: {
                    'API Documentation': 'API 文档',
                    'Release notes': '发布说明',
                },
                regexp: [],
                fragments: {}
            },

            dockerdocs_home: {
                static: {
                    'Docker Documentation': 'Docker 文档',
                    'Get started with Docker': '开始使用 Docker',
                    'Browse by section': '按部分浏览',
                    'Docker Build Cloud': 'Docker 云构建',
                    'Testcontainers Cloud': 'Testcontainers 云',
                },
                regexp: [],
                fragments: {
                    'Get started with': '开始使用',
                    'Browse by': '按',
                }
            },

            dockerdocs_engine: {
                static: {
                    'CLI reference': 'CLI 参考',
                    'API reference': 'API 参考',
                    'Release notes': '发布说明',
                },
                regexp: [],
                fragments: {}
            },

            dockerdocs_compose: {
                static: {
                    'Getting started': '入门指南',
                    'File reference': '文件参考',
                    'CLI reference': 'CLI 参考',
                    'How it works': '工作原理',
                },
                regexp: [],
                fragments: {
                    'Getting started': '入门',
                    'How it works': '工作原理',
                }
            },

            docker: {
                static: {
                    'Download Docker Desktop': '下载 Docker Desktop',
                    'Docker Enterprise': 'Docker 企业版',
                    'IT Operations': 'IT 运维',
                },
                regexp: [],
                fragments: {}
            },

            docker_home: {
                static: {
                    // 包含逗号和标点的句子
                    'Build, Share, and Run Any App, Anywhere': '构建、分享和运行任何应用，随时随地',
                    'Get Started with Docker': '开始使用 Docker',
                    'The #1 containerization platform': '#1 容器化平台',
                    'Why Docker?': '为什么选择 Docker？',
                    'Trusted by developers': '受开发者信赖',
                    'Secure by default': '默认安全',
                    'Works everywhere': '随处可用',
                    'For developers': '面向开发者',
                    'For IT Operations': '面向 IT 运维',
                    'Explore Docker products': '探索 Docker 产品',
                    'Docker Enterprise': 'Docker 企业版',
                },
                regexp: [],
                fragments: {
                    'Build, Share, and Run': '构建、分享和运行',
                    'Get Started with': '开始使用',
                    'Trusted by': '受',
                    'Secure by': '默认',
                    'Works everywhere': '随处可用',
                }
            },

            docker_products: {
                static: {
                    'Docker Build Cloud': 'Docker 云构建',
                    'Docker Subscription': 'Docker 订阅',
                },
                regexp: [],
                fragments: {}
            },

            docker_pricing: {
                static: {
                    'Docker Pricing': 'Docker 价格',
                    'Compare plans': '比较方案',
                },
                regexp: [],
                fragments: {}
            },

            docker_resources: {
                static: {
                    'Docker Resources': 'Docker 资源',
                },
                regexp: [],
                fragments: {}
            },

            docker_blog: {
                static: {
                    'Docker Blog': 'Docker 博客',
                    'Latest Posts': '最新文章',
                    'Read more': '阅读更多',
                    'Leave a comment': '留言',
                },
                regexp: [],
                fragments: {
                    'Latest Posts': '最新文章',
                    'Read more': '阅读更多',
                }
            },

            docker_other: {
                static: {
                    'Cookie Policy': 'Cookie 政策',
                },
                regexp: [],
                fragments: {}
            },

            docker_public: {
                static: {},
                regexp: [],
                fragments: {}
            },

            // 页面标题翻译
            title: {
                static: {
                    'Docker Hub Container Image Library | App Containerization': 'Docker Hub 容器镜像库 | 应用容器化',
                    'Documentation | Docker': '文档 | Docker',
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
                ],
                fragments: {}
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

    // deepMerge 函数（复用）
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

    // extendLanguage 函数（复用）
    function extendLanguage(targetKey, baseKey) {
        if (!I18N_PHRASES[baseKey]) {
            return;
        }
        if (!I18N_PHRASES[targetKey]) {
            I18N_PHRASES[targetKey] = { extend: true };
        }
        const target = I18N_PHRASES[targetKey];
        if (!target.extend) {
            return;
        }
        I18N_PHRASES[targetKey] = deepMerge({}, I18N_PHRASES[baseKey], target);
        delete I18N_PHRASES[targetKey].extend;
    }

    extendLanguage('zh_CN', 'zh');
    extendLanguage('zh-CN', 'zh');

    // 导出词库
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = I18N_PHRASES;
    } else {
        window.I18N_PHRASES = I18N_PHRASES;
    }

    // 兼容性处理
    if (typeof window !== 'undefined' && typeof window.I18N_PHRASES === 'undefined') {
        window.I18N_PHRASES = I18N_PHRASES;
    }

})();
