(function () {
    'use strict';

    /**
     * Docker 中文化词库 - 统一版本
     * 将原 I18N 和 I18N_PHRASES 合并为统一结构
     * 结构：I18N.zh[页面域][匹配类型][翻译项]
     * 匹配类型：exact（精确）、fragments（片段）、regexp（正则）
     */
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

            // ========================================
            // Docker Hub - 首页
            // ========================================
            dockerhub_home: {
                exact: {
                    'Welcome to Docker Hub': '欢迎使用 Docker Hub',
                    'Search for images and repositories': '搜索镜像和仓库',
                },
                regexp: [],
                fragments: {}
            },

            // ========================================
            // Docker Hub - 官方镜像页
            // ========================================
            dockerhub_official: {
                exact: {
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

            // =======================================
            // Docker Hub - 加固镜像页
            // =======================================
            dockerhub_hardened: {
                exact: {
                    'Hardened Image catalog': '加固镜像目录',
                    'Recently added': '最近添加',
                    'Don\'t see what you need?': '没有看到您需要的？',
                    'We\'re constantly updating the catalog. If you don\'t find what you\'re looking for, request a hardened image, Helm chart, or package by filling out a short form.': '我们不断更新目录。如果您没有找到所需内容，请填写简短的表格，申请加固镜像、Helm 图表或软件包。',
                },
                regexp: [
                    [/Try Docker Hardened Images free for (.+) days - SLA-backed, customizable, production-ready./, '免费试用 Docker 加固镜像 $1 天 - SLA 支持、可定制、适用于生产环境。']
                ],
                fragments: {
                }
            },

            // ========================================
            // Docker Hub - 计费页面
            // ========================================
            dockerhub_billing: {
                exact: {
                    'More Docker. Easy access. New streamlined plans.': '更多 Docker。轻松访问。全新简化的方案。',
                    'Billing Details': '计费详情',
                    'Billing Address': '账单地址',
                    'Invoice History': '发票历史',
                    'Required': '必填项',

                    // 计费详情
                    'Legacy Docker Personal': 'Docker 个人版',
                    'Docker Desktop Personal': 'Docker Desktop 个人版',
                    'Unlimited public repositories': '无限公共仓库',
                    'Docker Engine + Kubernetes': 'Docker Engine + Kubernetes',
                    '200 image pulls per 6 hours': '每 6 小时 200 次镜像拉取',
                    '3 Scout-enabled repositories': '3 个启用 Scout 的仓库',
                    'Local Scout analysis': '本地 Scout 分析',
                    'Legacy Docker Scout Free': 'Docker Scout 免费版',
                    '1 Docker Scout-enabled repository for advanced remote image analysis': '1 个启用 Docker Scout 的仓库，用于高级远程镜像分析',
                    'Unlimited advanced local image analysis': '无限高级本地镜像分析',
                    'SDLC integrations': 'SDLC 集成',
                    'Security posture reporting': '安全态势报告',
                    'Policy evaluation': '策略评估',
                    'View repositories': '查看仓库⁠',

                    // 账单地址
                    'Billing information': '账单信息',
                    'The contact who will receive billing notifications and the address of the company or individual for tax purposes. Changes to this information will appear on future invoices by default.': '将接收账单通知的联系人及公司或个人的税务地址。对此信息的更改将默认出现在未来的发票上。',
                    'Billing contact': '账单联系人',
                    'Billing notifications will be sent to this contact.': '账单通知将发送给此联系人。',
                    'This is the billing address of the company or individual purchasing Docker services and is used to calculate any applicable sales tax.': '这是购买 Docker 服务的公司或个人的账单地址，用于计算任何适用的销售税。',

                    // 发票历史
                    'No invoices': '无发票',
                    'You don\'t have any invoices yet.': '您还没有任何发票。',
                    'Invoice Number': '发票号码',
                    'Date': '日期',
                    'State': '状态',
                    'Amount': '金额',
                },
                regexp: [
                    [/Manage your billing plan for your (.+) namespace./, '管理 $1 的计费计划。'],
                    [/Original pricing will stay in effect until your next renewal date on or after (.+)./, '原始价格将持续有效，直到您在 $1 或之后的下一个续订日期。'],
                    [/(\d+) of (\d+) repositories in use/, '$1 / $2 正在使用的仓库'],
                ],
                fragments: {
                }
            },

            // =======================================
            // Docker Hub - 使用情况页面
            // =======================================
            dockerhub_usage: {
                exact: {
                    'Pulls usage': '拉取使用情况',
                    'Discover insights into your Docker Hub pulls and usage metrics.': '了解您的 Docker Hub 拉取和使用指标的见解。',
                    'Dashboard updates may take up to 1 hour. For real-time information, request a report to be sent to your email.': '仪表板更新可能需要长达 1 小时。有关实时信息，请请求将报告发送到您的电子邮件。',
                    'YOUR PLAN': '您的方案',
                    'Personal': '个人版',
                    'Upgrade to pro': '升级到专业版',
                    'Last update:': '最后更新',
                    'Data is available only from': '数据仅可用自',

                    'Filter by privacy': '按隐私筛选',
                    'Public': '公开',
                    'Private': '私有',
                    'From (UTC)': '起始时间（UTC）',
                    'To (UTC)': '结束时间（UTC）',

                    'Pulls over time': '一段时间内的拉取',
                    'VERSION CHECKS': '版本检查',
                    'Send report to email': '将报告发送到电子邮件',
                    'The number of pulls and version checks for the selected time period.': '所选时间段内的拉取和版本检查次数。',
                    'Pulls are counted when an image is downloaded from Docker Hub.': '当从 Docker Hub 下载镜像时，会计算拉取次数。',   
                    'Version checks are counted when a docker pull does not turn into a download.': '当 docker pull 不转变为下载时，会计算版本检查次数。',

                    'Top repositories by pulls': '按拉取次数排名的热门仓库',
                    'The top 5 repositories with most pulls in the selected time period.': '所选时间段内拉取次数最多的前 5 个仓库。',

                    'Total consumption': '总消耗',
                    'Consumption by repositories': '按仓库划分的消耗',
                    'Filter by name': '按名称筛选',
                    'Rows per page:': '每页行数',
                    'Discover insights into your Docker Hub storage usage metrics.': '了解您的 Docker Hub 存储使用指标的见解。',
                },
                regexp: [
                    [/Avg daily (.+)/, '平均每日$1'],
                ],
                fragments: {}
            },

            // ========================================
            // Docker Hub - 仓库页
            // ========================================
            dockerhub_repo: {
                exact: {
                    // 仓库操作相关
                    'To push a new tag to this repository:': '推送新标签到此仓库：',
                    'Tags cannot be overwritten in this repository': '此仓库中的标签无法被覆盖',
                    'The repository overview is shown in the public view of your repository when the repository has at least one image. Use it to tell users what your image does and how to run it. ': '当仓库至少有一个镜像时，仓库概览会显示在仓库的公开视图中。使用它来告诉用户您的镜像功能以及如何运行它。',
                    'A short description to identify your repository. If the repository is public, this description is used to index your content on Docker Hub and in search engines, and is visible to users in search results.': '用于标识您的仓库的简短描述。如果仓库是公开的，则此描述用于在 Docker Hub 和搜索引擎中索引您的内容，并在搜索结果中向用户显示。',
                    'Repository name is required': '仓库名称为必填项',
                    'Create repository': '创建仓库',
                    'Pushing images': '推送镜像',
                    'You can push a new image to this repository using the CLI:': '您可以使用 CLI 将新镜像推送到此仓库：',
                    'Make sure to replace': '确保将',
                    'with your desired image repository tag.': '替换为您所需的镜像仓库标签。',

                    // 概览相关
                    'An overview describes what your image does and how to run it.': '概览描述您的镜像功能以及如何运行它。',
                    'It displays in': '显示在',
                    'the public view of your repository': '您仓库的公开视图',
                    'once you have pushed some content.': '在您推送内容后。',

                    // 安全设置
                    'Image security insight settings': '镜像安全洞察设置',
                    'Features and controls that help you uncover, understand, and fix issues with your container images in Docker Hub': '帮助您发现、理解和修复 Docker Hub 中容器镜像问题的功能和控制',
                    'Docker Scout image analysis': 'Docker Scout 镜像分析',
                    'Know when new CVEs impact your images, learn where they\'re introduced, and get recommendations for remediation options': '了解新 CVE 何时影响您的镜像、它们的来源以及修复建议',
                    'Enable repos in bulk on Scout Dashboard': '在 Scout 仪表板上批量启用仓库',
                    'Images will be scanned once when pushed and the vulnerability report saved at that point in time.': '镜像将在推送时扫描一次，并保存该时间点的漏洞报告。',
                    'Use a regular expression to match tag names based on patterns, such as specific words, prefixes or version formats.': '使用正则表达式根据模式匹配标签名称，例如特定单词、前缀或版本格式。',
                    'Know when new CVEs impact your images, learn where they\'re introduced, and get recommendations for remediation options.': '了解新 CVE 何时影响您的镜像、它们的来源以及修复建议。',
                    'Archiving this repository will prevent any new pushes and detail changes, but it will still be available for pulls.': '存档此仓库将阻止任何新的推送和详细更改，但仍然可以拉取。',
                    'Archive repository': '存档仓库',
                    'Prevents new pushes': '阻止新的推送',
                    'Prevents changes on repository details': '阻止仓库详情的更改',
                    'Still available for pulls': '仍然可以拉取',
                    'This deletes the repository, all the tags it contains, and its build settings. This cannot be undone.': '这将删除仓库、其中包含的所有标签及其构建设置。此操作无法撤销。',
                    'Delete repository forever': '永久删除仓库',

                    // 标签可变性设置
                    'Tag mutability settings': '标签可变性设置',
                    'Control whether tags can be edited to help maintain consistent, secure, and reliable deployments.': '控制标签是否可编辑，以帮助维护一致、安全和可靠的部署。',
                    'All tags are mutable': '所有标签可变',
                    'Tags can be changed to reference a different image. This allows you to retarget a tag without creating a new one.': '标签可以更改以引用不同的镜像。这允许您重新定位标签而无需创建新标签。',
                    'All tags are immutable': '所有标签不可变',
                    'Tags cannot be updated to point to a different image after creation. This ensures consistency and prevents accidental changes.': '标签在创建后无法更新以指向不同的镜像。这确保一致性并防止意外更改。',
                    'Specific tags are immutable': '特定标签不可变',
                    'Define specific tags that cannot be updated after creation using RegEx values': '使用正则表达式定义创建后无法更新的特定标签',
                    'Define specific tags that cannot be updated after creation using RegEx values.': '使用正则表达式定义创建后无法更新的特定标签。',
                    'Regular expressions': '正则表达式',
                    'Use a regular expression to match tag names based on patterns, such as specific words, prefixes or version formats': '使用正则表达式根据模式匹配标签名称，例如特定单词、前缀或版本格式',
                    'Current expressions': '当前表达式',

                    // 协作者
                    'Collaborators will be given push and pull access to this repository.': '协作者将获得对此仓库的推送和拉取权限。',
                    'Add collaborator': '添加协作者',
                    'Current collaborators': '当前协作者',
                    'This repository does not have any collaborators.': '此仓库没有任何协作者。',

                    // WebHook
                    'A webhook is an HTTP call-back triggered by a specific event. You can create a single webhook to start and connect multiple webhooks to further build out your workflow.': 'Webhook 是由特定事件触发的 HTTP 回调。您可以创建单个 Webhook 来启动并连接多个 Webhook，以进一步构建您的工作流。',
                    'When a tag is pushed to this repository, your workflows will kick off based on your specified webhooks.': '当标签被推送到此仓库时，您的工作流将根据您指定的 Webhook 启动。',
                    'New webhook': '新建 Webhook',
                    'Webhook name': 'Webhook 名称',
                    'Payload URL': '有效负载 URL',
                    'Current webhooks': '当前 Webhook',

                    // Docker Build Cloud
                    'Docker Build Cloud': 'Docker 云构建',
                    'Accelerate image build times with access to cloud-based builders and shared cache': '通过访问云端构建器和共享缓存加速镜像构建时间',
                    'Docker Build Cloud executes builds on optimally-dimensioned cloud infrastructure with dedicated per-organization isolation': 'Docker 云构建在优化配置的云基础设施上执行构建，具有专用的组织隔离',
                    'Get faster builds through shared caching across your team, native multi-platform support, and encrypted data transfer - all without managing infrastructure': '通过团队共享缓存、原生多平台支持和加密数据传输获得更快的构建 - 无需管理基础设施',
                    'Go to Docker Build Cloud': '前往 Docker 云构建',

                    // 其他
                    'once you have pushed some content': '在您推送内容后',
                    'All rights reserved': '版权所有',
                    'Repository size: ': '仓库大小：',
                },
                regexp: [
                    [/Using (\d+) of (\d+) private repositories/, '使用 $1 / $2 个私有仓库'],
                    [/Last pushed about (\d+) hours by (.+)/, '最后推送时间约为 $1 小时前，由 $2 推送'],
                    [/Archive (.+)/, '归档$1'],
                    [/Type (.+) to continue./, '输入 $1 以继续。'],
                    [/To confirm deletion, type the name of your repository (.+)/, '要确认删除，请输入您的仓库名称 $1。']
                ],
                fragments: {
                    'once you have pushed some content': '在您推送内容后',
                    'the public view of your repository': '仓库的公开视图',
                    'This repository contains': '此仓库包含',
                    'cannot be updated': '无法更新',
                    'after creation': '创建后',
                    'This ensures consistency': '这确保一致性',
                    'This allows you to': '这允许您',
                    'all without managing infrastructure': '无需管理基础设施',
                    'Thank you for your feedback!': '感谢您的反馈！',
                    'Was this helpful?': '这个有帮助吗？',
                    'Repository Name': '仓库名称',
                }
            },

            // ========================================
            // Docker Hub - 仓库列表页
            // ========================================
            dockerhub_repositories: {
                exact: {
                    'All repositories within the': '用户',
                    'namespace.': '下的所有仓库',
                    'Search by repository name': '按仓库名称搜索',
                },
                regexp: [],
                fragments: {}
            },

            // ========================================
            // Docker Hub - 标签页
            // ========================================
            dockerhub_tags: {
                exact: {},
                regexp: [],
                fragments: {}
            },

            // ========================================
            // Docker Hub - 层信息页
            // ========================================
            dockerhub_layers: {
                exact: {},
                regexp: [],
                fragments: {}
            },

            // ========================================
            // Docker Hub - 通用页面
            // ========================================
            dockerhub: {
                exact: {
                    'Visit our Facebook page': '访问我们的 Facebook 页面',
                    'Visit our X page': '访问我们的 X 页面',
                    'Visit our YouTube page': '访问我们的 YouTube 页面',
                    'Visit our LinkedIn page': '访问我们的 LinkedIn 页面',
                    'View our RSS feed': '查看我们的 RSS 订阅',
                    'Events and Webinars': '活动和网络研讨会',
                    'Subscription Service Agreement': '订阅服务协议',
                    'No overview available': '暂无可用概览',
                    'This repository doesn\'t have an overview': '此仓库没有概览',
                    'Tag summary': '标签摘要',
                    'Recent tags': '最近标签',
                    'Content type': '内容类型',
                    'Last updated': '最后更新',
                    'Manage Repository': '管理仓库',
                    'This size is calculated by summing the image\'s layers, which are compressed.': '此大小是通过对镜像的层进行压缩后求和计算得出的。',
                    'Trending this week': '本周趋势',
                    'Most pulled images': '拉取次数最多的镜像',

                    // Docker Banner 营销文案
                    'Docker Hardened Images - Secure & Compliant': 'Docker 加固镜像 - 安全且合规',
                    'Enterprise-grade Docker images with built-in security, compliance, and continuous updates. Minimize vulnerabilities and deploy with confidence.': '具有内置安全性、合规性和持续更新的企业级 Docker 镜像。最大限度地减少漏洞，放心部署。',
                    'Visit catalog now': '立即访问',

                    // Docker Hub Collaborators
                    'All repositories you have been added as a collaborator.': '您被添加为协作者的所有仓库。',
                    'No repositories': '无仓库',
                    'No repositories you are collaborating on yet': '您尚未协作的仓库',
                    'Repositories that you are a collaborator of will show up here.': '您作为协作者的仓库将显示在此处。',

                    // Docker Hub Settings
                    'Default repository privacy': '默认仓库隐私',
                    'Appears in Docker Hub search results': '出现在 Docker Hub 搜索结果中',
                    'Only visible to you': '仅对您可见',
                    'autobuilds': '自动构建',
                    'Notified of failed builds': '构建失败通知',
                    'Notified of failed and successful builds': '构建失败和成功通知',

                    // Docker Hub 营销文案
                    'The perfect home for your team\'s applications.': '您团队应用程序的理想家园。',
                    'Seamlessly ship any application, anywhere': '无缝交付任何应用程序，任何地方',
                    'Push images and make your app accessible to your team or with the Docker Community at large.': '推送镜像，使您的应用程序可供您的团队或整个 Docker 社区访问。',
                    'Collaborate and build with your team': '与您的团队协作和构建',
                    'Create and manage users and grant access to your repositories.': '创建和管理用户并授予对您的仓库的访问权限。',
                    'Automate your development to production pipeline': '自动化您的开发到生产管道',
                    'Use automated builds and webhooks for easy integration into your development pipeline.': '使用自动化构建和 webhook，轻松集成到您的开发管道中。',
                    'Create your first repository': '创建您的第一个仓库',
                    'Increase your reach and adoption on Docker Hub': '扩大您在 Docker Hub 上的影响力和采用率',
                    'Local development, simplified.': '本地开发，简化。',
                    'With a Docker Verified Publisher subscription, you\'ll increase trust, boost discoverability, get exclusive data insights, and much more.': '通过 Docker 已验证发布者订阅，您将提高信任度，提升可发现性，获得独家数据洞察，等等。',
                    'Speed up your builds.': '加速您的构建。',
                },
                regexp: [
                    [/^(\d+) - (\d+) of ([\d,]+) available results.$/, '第 $1-$2 条，共 $3 条可用结果'],
                    [/Receive notifications from (.+) when it finishes building your images. Notifications are sent to your current email address./, '当它完成构建您的镜像时，接收来自 $1 的通知。通知将发送到您当前的电子邮件地址。']
                ],
                fragments: {
                    'Visit our': '访问我们的',
                    'View our': '查看我们的',
                }
            },

            // ========================================
            // Docker Docs - 首页
            // ========================================
            dockerdocs_home: {
                exact: {
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

            // ========================================
            // Docker Docs - Engine 文档
            // ========================================
            dockerdocs_engine: {
                exact: {
                    'CLI reference': 'CLI 参考',
                    'API reference': 'API 参考',
                    'Release notes': '发布说明',
                },
                regexp: [],
                fragments: {}
            },

            // ========================================
            // Docker Docs - Compose 文档
            // ========================================
            dockerdocs_compose: {
                exact: {
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

            // ========================================
            // Docker Docs - 其他文档页
            // ========================================
            dockerdocs_other: {
                exact: {
                    'API Documentation': 'API 文档',
                    'Release notes': '发布说明',
                },
                regexp: [],
                fragments: {}
            },

            // ========================================
            // Docker Docs - 通用文档
            // ========================================
            dockerdocs: {
                exact: {
                    'What is a container?': '什么是容器？',
                    'What is Docker?': '什么是 Docker？',
                    'Why use Docker?': '为什么使用 Docker？',
                    'Was this helpful?': '这个有帮助吗？',
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

            // ========================================
            // Docker 官网 - 首页
            // ========================================
            docker_home: {
                exact: {
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

            // ========================================
            // Docker 官网 - 产品页
            // ========================================
            docker_products: {
                exact: {
                    'Docker Build Cloud': 'Docker 云构建',
                    'Docker Subscription': 'Docker 订阅',
                },
                regexp: [],
                fragments: {}
            },

            // ========================================
            // Docker 官网 - 价格页
            // ========================================
            docker_pricing: {
                exact: {
                    'Docker Pricing': 'Docker 价格',
                    'Compare plans': '比较方案',
                },
                regexp: [],
                fragments: {}
            },

            // ========================================
            // Docker 官网 - 资源页
            // ========================================
            docker_resources: {
                exact: {
                    'Docker Resources': 'Docker 资源',
                },
                regexp: [],
                fragments: {}
            },

            // ========================================
            // Docker 官网 - 博客
            // ========================================
            docker_blog: {
                exact: {
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

            // ========================================
            // Docker 官网 - 其他页面
            // ========================================
            docker_other: {
                exact: {
                    'Cookie Policy': 'Cookie 政策',
                },
                regexp: [],
                fragments: {}
            },

            // ========================================
            // Docker 官网 - 通用
            // ========================================
            docker: {
                exact: {
                    'Download Docker Desktop': '下载 Docker Desktop',
                    'Docker Enterprise': 'Docker 企业版',
                    'IT Operations': 'IT 运维',
                },
                regexp: [],
                fragments: {}
            },

            // ========================================
            // 页面标题翻译
            // ========================================
            title: {
                exact: {
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
            },

            // ========================================
            // 公共翻译（所有页面通用，回退终点）
            // ========================================
            public: {
                exact: {
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
                    'Create': '创建',
                    'Update': '更新',
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
                    'Image Index': '镜像索引',
                    'Image Manifest': '镜像清单',
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
                    'Environment variables': '环境变量',
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
                    'Created at': '创建时间',
                    'Updated': '更新时间',
                    'Updated at': '更新时间',
                    'Version': '版本',
                    'License': '许可证',
                    'Dockerfile': 'Dockerfile',
                    'Manifest': '清单',
                    'Platform': '平台',
                    'Platforms': '平台',
                    'Spotlight': '聚焦',
                    'Arch': '架构',
                    'Results': '结果',
                    'Result': '结果',
                    'Matching filters': '匹配的过滤器',
                    'No results found': '未找到结果',
                    'Load more': '加载更多',
                    'Compliance': '合规性',
                    'Off': '关闭',
                    'Only failures': '仅失败',
                    'Everything': '全部',

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
                    'Testcontainers Cloud': '云测试容器',
                    'Testcontainers': '测试容器',
                    'Docker Extensions': 'Docker 扩展',
                    'MCP Servers': 'MCP 服务器',
                    'API management': 'API 管理',
                    'Internet of things': '物联网(IOT)',
                    'Machine learning & AI': '机器学习和人工智能',
                    'Developer tools': '开发者工具',
                    'Data science': '数据科学',
                    'Web servers': 'Web 服务器',
                    'Databases & storage': '数据库与存储',
                    'Monitoring & observability': '监控与可观察性',
                    'Content management system': '内容管理系统',
                    'Web analytics': '网络分析',
                    'Trusted content': '受信任的内容',
                    'Generative AI': '生成式人工智能',
                    'Start trial': '开始试用',
                    'Free trial': '免费试用',
                    'Make a request': '提出请求',

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
                    'Username': '用户名',

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
                    'Docker Suite': 'Docker 套件',
                    'Create organization': '创建组织',
                    'Your account': '你的账户',
                    'Organizations': '组织',
                    'Contact support': '联系支持',
                    'System status': '系统状态',

                    // ========== 用户相关 ==========
                    'Settings': '设置',
                    'Profile': '个人资料',
                    'Account': '账户',
                    'Logout': '退出',
                    'Login': '登录',
                    'Sign in': '登录',
                    'Sign up': '注册',
                    'Register': '注册',
                    'Get started': '开始使用',
                    'Get Docker': '获取 Docker',
                    'Create Account': '创建账户',

                    // ========== 仓库和镜像相关 ==========
                    'Official Image': '官方镜像',
                    'Official images': '官方镜像',
                    'Docker Hardened Images': 'Docker 加固镜像',
                    'Docker Official Images': 'Docker 官方镜像',
                    'Docker Official Image': 'Docker 官方镜像',
                    'Verified Publisher': '已验证发布者',
                    'Verified publisher': '已验证发布者',
                    'Sponsored OSS': '赞助开源软件',
                    'Featured': '精选',
                    'Trending': '趋势',
                    'Trending repositories': '趋势仓库',
                    'Popular': '热门',
                    'Popular repositories': '热门仓库',
                    'New': '最新',
                    'Copied!': '已复制~',
                    'BETA': '测试版',
                    'Recently updated': '最近更新',
                    'Explore repositories': '浏览仓库',
                    'New extensions': '新扩展',
                    'Docker Desktop Extension': 'Docker Desktop 扩展',
                    'publisher program': '发布者计划',
                    'Docker Build Cloud': 'Docker 构建云',
                    'Open Source Software': '开源软件',
                    'View repositories⁠': '查看仓库⁠',

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
                    'Repository size:': '仓库大小',
                    'Repository overview': '仓库概览',
                    'This repository contains': '此仓库包含',

                    // ========== 页面元素 ==========
                    'Overview': '概览',
                    'Security': '安全',
                    'Insights': '洞察',
                    'Actions': '操作',
                    'General': '常规',
                    'Description': '描述',
                    'Short description': '简短描述',
                    'Full description': '完整描述',
                    'Architecture': '架构',
                    'OS': '操作系统',
                    'Operating System': '操作系统',
                    'OS/Arch': '操作系统/架构',
                    'Full Size': '完整大小',
                    'Docker version': 'Docker 版本',
                    'Was this helpful?': '这个有帮助吗？',
                    'Images': '镜像',
                    'Extensions': '扩展',
                    'Plugins': '插件',
                    'Compose': 'Compose',
                    'AI Models': 'AI 模型',
                    'Languages & frameworks': '语言和框架',
                    'Integration & delivery': '集成和交付',
                    'Message queues': '消息队列',
                    'More categories': '更多分类',
                    'Operating Systems': '操作系统',
                    'Linux': 'Linux',
                    'Windows': 'Windows',
                    'Architectures': '架构',
                    'More architectures': '更多架构',
                    'Source Repository': '源代码仓库',
                    'Dockerfile': 'Dockerfile',

                    // 列表和表格
                    'Name': '名称',
                    'Type': '类型',
                    'Command': '命令',
                    'Files': '文件',
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
                    'Default': '默认',
                    'Tag is active': '标签活跃',
                    'Beta': 'Beta',
                    '无': '无',

                    // ========== 按钮和操作 ==========
                    'View': '查看',
                    'View all': '查看全部',
                    'View in settings': '在设置中查看',
                    'View details': '查看详情',
                    'Show': '显示',
                    'Show more': '显示更多',
                    'Show less': '显示更少',
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
                    'Learn more.': '了解更多',
                    'See all': '查看全部',
                    'Activate': '激活',
                    'Give feedback': '提供反馈',
                    'Try it now': '立即试用',
                    'Get it now': '立即获取',

                    // 分页
                    'Go to previous page': '上一页',
                    'Go to next page': '下一页',

                    // ========== Docker Hub 特定 ==========
                    'Collaborations': '协作',
                    'Collaborators': '协作者',
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
                    'Are you missing a category?': '缺少分类？',
                    'Tags cannot be overwritten in this Repository.': '此仓库中的标签无法被覆盖。',
                    'Where to start?': '从哪里开始？',
                    'Report an issue': '报告问题',

                    // 仓库设置
                    'Visibility settings': '可见性设置',
                    'This repository is public.': '此仓库是公开的。',
                    'This repository is active.': '此仓库处于活动状态。',
                    'Make private': '设为私有',
                    'Archive repository': '归档仓库',
                    'Delete repository': '删除仓库',
                    'Deleting a repository will': '删除仓库将',
                    'destroy': '销毁',
                    'cannot be undone.': '无法撤销。',
                    'Get more': '获取更多',

                    // 主题设置
                    'Light theme': '浅色主题',
                    'Dark theme': '深色主题',

                    // Docker 套件相关
                    'Docker Home': 'Docker 主页',
                    'Docker Admin Console': 'Docker 管理控制台',

                    // ========== 页脚和资源 ==========
                    'Resources': '资源',
                    'Feedback': '反馈',
                    'Hub Release Notes': 'Hub 发布说明',
                    'Forums': '论坛',
                    'Customers': '客户',
                    'Newsroom': '新闻室',
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
                    'Category': '分类',
                    'Archive': '归档',
                    'Subscribe': '订阅',
                    'Author': '作者',
                    'Published': '发布时间',
                    'Published by': '发布者',
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

                    // ========== 其他 ==========
                    'Yes': '是的',
                    'No': '不是',
                    'By': '由',
                    'Filter by': '筛选方式',


                    'Sort by': '排序方式',
                    'Newest': '最新',
                    'Oldest': '最旧',
                    'Last pull': '最后拉取',
                    'Last pulled': '最后拉取',
                    'Status': '状态',
                    'Compressed size': '压缩大小',
                },

                regexp: [
                    // 时间相关正则
                    [/about (\d+) hours? ago/, '约 $1 小时前'],
                    [/about (\d+) hours?/, '约 $1 小时'],
                    [/about (\d+) minutes? ago/, '约 $1 分钟前'],
                    [/about (\d+) minutes?/, '约 $1 分钟'],
                    [/about (\d+) days? ago/, '约 $1 天前'],
                    [/about (\d+) days?/, '约 $1 天'],
                    [/about (\d+) weeks? ago/, '约 $1 周前'],
                    [/about (\d+) weeks?/, '约 $1 周'],
                    [/about (\d+) months? ago/, '约 $1 个月前'],
                    [/about (\d+) months?/, '约 $1 个月'],
                    [/about (\d+) years? ago/, '约 $1 年前'],
                    [/about (\d+) years?/, '约 $1 年'],
                    [/(\d+)\s*second[s]?\s*ago/, '$1 秒前'],
                    [/(\d+)\s*minute[s]?\s*ago/, '$1 分钟前'],
                    [/(\d+)\s*minutes?/, '$1 分钟'],
                    [/(\d+)\s*hour[s]?\s*ago/, '$1 小时前'],
                    [/(\d+)\s*day[s]?\s*ago/, '$1 天前'],
                    [/(\d+)\s*days?/, '$1 天'],
                    [/(\d+)\s*week[s]?\s*ago/, '$1 周前'],
                    [/(\d+)\s*month[s]?\s*ago/, '$1 个月前'],
                    [/(\d+)\s*year[s]?\s*ago/, '$1 年前'],
                    [/just now/, '刚刚'],
                    [/less than 1 day/, '不到 1 天'],
                    [/created (\d+) (minutes?|hours?|days?|weeks?|months?|years?) ago/, '创建于 $1 $2前'],
                    [/updated (\d+) (minutes?|hours?|days?|weeks?|months?|years?) ago/, '更新于 $1 $2前'],
                    [/^(\d+)[–-](\d+) of ([\d,]+)$/, '第 $1–$2 条，共 $3 条'],
                    [/^Notification center: (\d+) notifications$/, '通知中心：$1 条通知'],

                    // Docker 特定术语正则
                    [/([\d.]+)\s*(MB|GB|KB)\b/i, '$1 $2'],  // 只匹配 MB/GB/KB，支持小数点
                    [/([\d.]+)\s+B\b/, '$1 B'],  // 单独处理空格+B的情况（如 "14 B"）
                    [/([\d,]+)\s*downloads?/, '$1 次下载'],
                    [/([\d,]+)\s*stars?/, '$1 个收藏'],
                    [/(\d+) tag\(s\)/, '$1 个标签'],

                    // 状态信息处理
                    [/running for ([\d.]+)/, '已运行 $1'],
                    [/exited \((\d+)\)/, '已退出 (代码 $1)'],

                    // Docker Hub - 通用提示
                    [/Using (\d+) of (\d+) private repositories/, '使用 $1 / $2 个私有仓库。'],
                    [/Published by (.+)/, '发布者：$1'],
                    [/By (.+)/, '由 $1 提供'],
                    [/by (.+)/, '由 $1 提供'],
                    [/(\d+) of (\d+)/, '$1 / $2'],
                ],

                fragments: {
                    // 长句片段翻译
                    'Public repositories are available to anyone. Private repositories are only available to you': '公开仓库对所有人可见。私有仓库仅对您可见',
                    'all tags stored within it. This action': '其中存储的所有标签。此操作',
                    'Explore and manage your Docker experience.': '探索和管理您的 Docker 体验。',
                    'Manage users, control access, & set policies.': '管理用户、控制访问和设置策略。',
                    'Find and share images with your team.': '与您的团队查找和分享镜像。',
                    'Secure your supply chain at every level.': '在每个级别保护您的供应链。',
                    'Local development, simplified.': '本地开发，简化。',
                    'Speed up your builds.': '加速您的构建。',
                    'Run integration tests with real dependencies.': '使用真实依赖项运行集成测试。',
                    'Docker, Inc. All rights reserved.': 'Docker 公司。版权所有。',
                    'Repository': '仓库',

                    // 项目描述片段（保留项目名）
                    'The official': '官方的',
                    'docker container': 'Docker 容器',
                    'is a fast, reliable, and flexible open-source build tool with an elegant, extensible': '是一个快速、可靠且灵活的开源构建工具，具有优雅、可扩展的',
                    'is the GNU Project\'s Bourne Again SHell': '是 GNU 项目的 Bourne Again SHell',
                    'Image with': '包含',
                    'meant to be used with a': '的镜像，用于配合',
                    'Dynamic Grid': 'Dynamic Grid',
                    'is an easy-to-use cloud emulation framework for dev, testing, and experimentation!': '是一个易于使用的云模拟框架，用于开发、测试和实验！',
                    'Conveniently open your': '方便地打开您的',
                    'containers in': '容器，在',
                    'terminal subshells.': '终端子shell中。',
                    'displays the output of well-known': '显示常见的',
                    'and': '和',
                    'functions.': '函数的输出。',
                    'Browser and API based on Chrome DevTools Protocol': '基于 Chrome DevTools 协议的浏览器和 API',
                    'Powerful multi-container orchestration system': '强大的多容器编排系统',
                    'interactive shell in': '交互式 shell，在',
                    'A modern terminal with AI features, built with Rust': '具有 AI 功能的现代终端，使用 Rust 构建',
                    'for automating container-based workflows': '用于自动化基于容器的工作流',
                    'A fully functional local cloud stack': '功能齐全的本地云堆栈',
                },

                selector: [
                    // Docker Hub - 通用导航
                    ['input[placeholder*="Search"]', '搜索镜像和仓库'],

                    // Docker Hub - 界面按钮（根据 aria-label 选择）
                    ['button[aria-label="open app switcher"]', '打开应用切换器'],
                    ['button[aria-label="user menu"]', '用户菜单'],
                    ['button[aria-label="collapse sidebar"]', '收起侧边栏'],
                    ['button[aria-label="open context switcher"]', '打开上下文切换器'],
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
