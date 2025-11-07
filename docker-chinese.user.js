// ==UserScript==
// @name         Docker 中文化插件
// @namespace    https://github.com/xiao-lfeng/docker-chinese
// @description  中文化 Docker、Docker Hub 和 Docker Docs 网站的界面菜单及内容
// @copyright    2025, XiaoLFeng (https://github.com/xiao-lfeng)
// @icon         https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png
// @version      1.0.0
// @author       XiaoLFeng
// @license      MIT
// @match        https://hub.docker.com/*
// @match        https://docs.docker.com/*
// @match        https://www.docker.com/*
// @require      file:///Users/xiaolfeng/ProgramProjects/Personal/other/docker-chinese/docker-chinese-dict.js
// @run-at       document-end
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @supportURL   https://github.com/xiao-lfeng/docker-chinese/issues
// ==/UserScript==

(function (window, document, undefined) {
    'use strict';

    const lang = 'zh-CN'; // 设置默认语言
    let page;
    let enable_RegExp = GM_getValue("enable_RegExp", 1);

    /**
     * watchUpdate 函数：监视页面变化，根据变化的节点进行翻译
     */
    function watchUpdate() {
        // 检测浏览器是否支持 MutationObserver
        const MutationObserver =
            window.MutationObserver ||
            window.WebKitMutationObserver ||
            window.MozMutationObserver;

        // 获取当前页面的 URL
        const getCurrentURL = () => location.href;
        getCurrentURL.previousURL = getCurrentURL();

        // 创建 MutationObserver 实例，监听 DOM 变化
        const observer = new MutationObserver((mutations, observer) => {
            const currentURL = getCurrentURL();

            // 如果页面的 URL 发生变化
            if (currentURL !== getCurrentURL.previousURL) {
                getCurrentURL.previousURL = currentURL;
                page = getPage(); // 当页面地址发生变化时，更新全局变量 page
                console.log(`Docker页面变化: ${page}`);

                transTitle(); // 翻译页面标题

                if (page) {
                    setTimeout(() => {
                        // 使用 CSS 选择器找到页面上的元素，并将其文本内容替换为预定义的翻译
                        transBySelector();
                    }, 500);
                }
            }

            if (page) {
                // 使用 filter 方法对 mutations 数组进行筛选
                const filteredMutations = mutations.filter(mutation =>
                    mutation.addedNodes.length > 0 ||
                    mutation.type === 'attributes' ||
                    mutation.type === 'characterData'
                );

                // 处理每个变化
                filteredMutations.forEach(mutation => traverseNode(mutation.target));
            }
        });

        // 配置 MutationObserver
        const config = {
            characterData: true,
            subtree: true,
            childList: true,
            attributeFilter: ['value', 'placeholder', 'aria-label', 'title', 'data-confirm'], // 观察特定属性变化
        };

        // 开始观察 document.body 的变化
        observer.observe(document.body, config);
    }

    /**
     * traverseNode 函数：遍历指定的节点，并对节点进行翻译。
     * @param {Node} node - 需要遍历的节点。
     */
    function traverseNode(node) {
        // 跳过忽略的元素
        if (I18N.conf.reIgnoreId.test(node.id) ||
            I18N.conf.reIgnoreClass.test(node.className) ||
            I18N.conf.reIgnoreTag.includes(node.tagName) ||
            (node.getAttribute && I18N.conf.reIgnoreItemprop.test(node.getAttribute("itemprop")))
        ) {
            return;
        }

        if (node.nodeType === Node.ELEMENT_NODE) { // 元素节点处理
            // 元素节点属性翻译
            if (["INPUT", "TEXTAREA"].includes(node.tagName)) { // 输入框 按钮 文本域
                if (["button", "submit", "reset"].includes(node.type)) {
                    if (node.hasAttribute('data-confirm')) {
                        transElement(node, 'data-confirm', true);
                    }
                    transElement(node, 'value');
                } else {
                    transElement(node, 'placeholder');
                }
            } else if (node.tagName === 'BUTTON') {
                if (node.hasAttribute('aria-label')) {
                    transElement(node, 'aria-label', true);
                }
                if (node.hasAttribute('title')) {
                    transElement(node, 'title', true);
                }
                if (node.hasAttribute('data-confirm')) {
                    transElement(node, 'data-confirm', true);
                }
                if (node.hasAttribute('data-disable-with')) {
                    transElement(node, 'data-disable-with', true);
                }
            } else if (node.tagName === 'OPTGROUP') {
                transElement(node, 'label');
            } else if (node.getAttribute && node.getAttribute('aria-label')) {
                transElement(node, 'aria-label', true);
            } else if (node.hasAttribute && node.hasAttribute('title')) {
                transElement(node, 'title', true);
            }

            let childNodes = node.childNodes;
            childNodes.forEach(traverseNode); // 遍历子节点

        } else if (node.nodeType === Node.TEXT_NODE) { // 文本节点翻译
            if (node.length <= 500) {
                transElement(node, 'data');
            }
        }
    }

    /**
     * getPage 函数：获取当前页面的类型。
     * @returns {string|boolean} 当前页面的类型，如果无法确定类型，那么返回 false。
     */
    function getPage() {
        const hostname = location.hostname;
        const pathname = location.pathname;

        // Docker Hub 站点
        if (hostname === 'hub.docker.com') {
            if (pathname === '/' || pathname === '/search') {
                return 'dockerhub-home';
            } else if (pathname.startsWith('/_/')) {
                return 'dockerhub-official';
            } else if (pathname.includes('/tags/')) {
                return 'dockerhub_tags';
            } else if (pathname.includes('/layers/')) {
                return 'dockerhub_layers';
            } else if (pathname.includes('/repositories/')) {
                return 'dockerhub_repositories';
            } else {
                return 'dockerhub_repo';
            }
        }

        // Docker Docs 站点
        else if (hostname === 'docs.docker.com') {
            if (pathname === '/') {
                return 'dockerdocs_home';
            } else if (pathname.includes('/engine/')) {
                return 'dockerdocs_engine';
            } else if (pathname.includes('/compose/')) {
                return 'dockerdocs_compose';
            } else if (pathname.includes('/hub/')) {
                return 'dockerdocs_hub';
            } else if (pathname.includes('/network/')) {
                return 'dockerdocs_network';
            } else if (pathname.includes('/storage/')) {
                return 'dockerdocs_storage';
            } else if (pathname.includes('/config/')) {
                return 'dockerdocs_config';
            } else {
                return 'dockerdocs_other';
            }
        }

        // Docker 官网
        else if (hostname === 'www.docker.com' || hostname === 'docker.com') {
            if (pathname === '/') {
                return 'docker_home';
            } else if (pathname.includes('/products/')) {
                return 'docker_products';
            } else if (pathname.includes('/pricing/')) {
                return 'docker_pricing';
            } else if (pathname.includes('/resources/')) {
                return 'docker_resources';
            } else if (pathname.includes('/blog/')) {
                return 'docker_blog';
            } else {
                return 'docker_other';
            }
        }

        return 'docker_public'; // 默认公共页面
    }

    /**
     * transTitle 函数：翻译页面标题
     */
    function transTitle() {
        let key = document.title;
        let str = I18N[lang]['title']['static'][key] || '';
        if (!str) {
            let res = I18N[lang]['title'].regexp || [];
            for (let [a, b] of res) {
                str = key.replace(a, b);
                if (str !== key) {
                    break;
                }
            }
        }
        document.title = str;
    }

    /**
     * transElement 函数：翻译指定元素的文本内容或属性。
     * @param {Element} el - 需要翻译的元素。
     * @param {string} field - 需要翻译的文本内容或属性的名称。
     * @param {boolean} isAttr - 是否需要翻译属性。
     */
    function transElement(el, field, isAttr = false) {
        let text = isAttr ? el.getAttribute(field) : el[field];
        let str = translateText(text);

        if (str) {
            if (!isAttr) {
                el[field] = str;
            } else {
                el.setAttribute(field, str);
            }
        }
    }

    /**
     * translateText 函数：翻译文本内容。
     * @param {string} text - 需要翻译的文本内容。
     * @returns {string|boolean} 翻译后的文本内容，如果没有找到对应的翻译，那么返回 false。
     */
    function translateText(text) {
        // 内容为空, 空白字符和或数字, 不存在英文字母和符号, 跳过
        if (!isNaN(text) || !/[a-zA-Z,.]+/.test(text)) {
            return false;
        }

        let _key = text.trim();
        let _key_neat = _key.replace(/\xa0|[\s]+/g, ' ');

        let str = fetchTranslatedText(_key_neat);

        if (str && str !== _key_neat) {
            return text.replace(_key, str);
        }

        return false;
    }

    /**
     * fetchTranslatedText 函数：从特定页面的词库中获得翻译文本内容。
     * @param {string} key - 需要翻译的文本内容。
     * @returns {string|boolean} 翻译后的文本内容，如果没有找到对应的翻译，那么返回 false。
     */
    function fetchTranslatedText(key) {
        // 静态翻译
        let str = I18N[lang][page]['static'][key] || I18N[lang]['public']['static'][key];

        if (typeof str === 'string') {
            return str;
        }

        // 正则翻译
        if (enable_RegExp) {
            let res = (I18N[lang][page].regexp || []).concat(I18N[lang]['public'].regexp || []);

            for (let [a, b] of res) {
                str = key.replace(a, b);
                if (str !== key) {
                    return str;
                }
            }
        }

        return false;
    }

    /**
     * transBySelector 函数：通过 CSS 选择器找到页面上的元素，并将其文本内容替换为预定义的翻译。
     */
    function transBySelector() {
        let res = (I18N[lang][page]?.selector || []).concat(I18N[lang]['public'].selector || []);

        if (res.length > 0) {
            for (let [selector, translation] of res) {
                let element = document.querySelector(selector);
                if (element) {
                    element.textContent = translation;
                }
            }
        }
    }

    function registerMenuCommand() {
        const toggleRegExp = () => {
            enable_RegExp = !enable_RegExp;
            GM_setValue("enable_RegExp", enable_RegExp);
            GM_notification(`已${enable_RegExp ? '开启' : '关闭'}正则功能`);
            if (enable_RegExp) {
                location.reload();
            }
            GM_unregisterMenuCommand(id);
            id = GM_registerMenuCommand(`${enable_RegExp ? '关闭' : '开启'}正则功能`, toggleRegExp);
        };

        let id = GM_registerMenuCommand(`${enable_RegExp ? '关闭' : '开启'}正则功能`, toggleRegExp);
    }

    /**
     * init 函数：初始化翻译功能。
     */
    function init() {
        page = getPage();
        console.log(`Docker中文插件开始, 页面类型: ${page}`);

        transTitle();

        if (page) {
            traverseNode(document.body);

            setTimeout(() => {
                transBySelector();
            }, 100);
        }

        watchUpdate();
    }

    // 执行初始化
    registerMenuCommand();
    init();

})(window, document);