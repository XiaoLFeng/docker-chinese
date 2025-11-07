// ==UserScript==
// @name         Docker 中文化插件
// @namespace    https://github.com/XiaoLFeng/docker-chinese
// @description  中文化 Docker、Docker Hub 和 Docker Docs 网站的界面菜单及内容
// @copyright    2025, XiaoLFeng (https://github.com/XiaoLFeng)
// @icon         https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png
// @version      1.0.0
// @author       筱锋
// @license      MIT
// @match        https://hub.docker.com/*
// @match        https://docs.docker.com/*
// @match        https://www.docker.com/*
// @require      https://raw.githubusercontent.com/XiaoLFeng/docker-chinese/master/docker-chinese-dict.js
// @run-at       document-end
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        GM_unregisterMenuCommand
// @supportURL   https://github.com/XiaoLFeng/docker-chinese/issues
// ==/UserScript==

(function (window, document, undefined) {
    'use strict';

    if (typeof window.I18N === 'undefined') {
        console.error('[Docker 中文化] 词库未加载，无法继续执行');
        return;
    }

    const DEFAULT_LANG = 'zh-CN';
    const lang = resolveLangKey(DEFAULT_LANG); // 自动匹配词库中可用语言
    const langPack = window.I18N[lang] || {};
    const langConf = createLangConf(langPack);
    let page = 'docker_public';
    let enable_RegExp = GM_getValue("enable_RegExp", 1);

    // 翻译缓存
    const translationCache = new Map();

    /**
     * 节流函数：限制函数执行频率
     * @param {Function} func - 需要节流的函数
     * @param {number} delay - 延迟时间（毫秒）
     * @returns {Function} 节流后的函数
     */
    function throttle(func, delay) {
        let lastCall = 0;
        let timeoutId = null;
        return function (...args) {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                func.apply(this, args);
            } else {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(() => {
                    lastCall = Date.now();
                    func.apply(this, args);
                }, delay);
            }
        };
    }

    /**
     * 防抖函数：延迟执行函数，直到停止调用一段时间后才执行
     * @param {Function} func - 需要防抖的函数
     * @param {number} delay - 延迟时间（毫秒）
     * @returns {Function} 防抖后的函数
     */
    function debounce(func, delay) {
        let timeoutId = null;
        return function (...args) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    /**
     * watchUpdate 函数：监视页面变化，根据变化的节点进行翻译
     */
    function watchUpdate() {
        // 检测浏览器是否支持 MutationObserver
        const MutationObserver =
            window.MutationObserver ||
            window.WebKitMutationObserver ||
            window.MozMutationObserver;

        if (!MutationObserver || !document.body) {
            return;
        }

        // 获取当前页面的 URL
        const getCurrentURL = () => location.href;
        getCurrentURL.previousURL = getCurrentURL();

        // 使用防抖处理 URL 变化
        const handleURLChange = debounce(() => {
            page = getPage() || 'docker_public';
            console.log(`Docker页面变化: ${page}`);
            transTitle();
            transBySelector();
        }, 300);

        // 使用节流处理 DOM 变化
        const handleMutations = throttle((mutations) => {
            const filteredMutations = mutations.filter(mutation =>
                mutation.addedNodes.length > 0 ||
                mutation.type === 'attributes' ||
                mutation.type === 'characterData'
            );

            filteredMutations.forEach(mutation => {
                // 跳过不需要翻译的节点类型
                const target = mutation.target;
                if (target.nodeType === Node.ELEMENT_NODE) {
                    const tagName = target.tagName;
                    if (['SCRIPT', 'STYLE', 'svg'].includes(tagName)) {
                        return;
                    }
                }
                traverseNode(target);
            });
        }, 100);

        // 创建 MutationObserver 实例，监听 DOM 变化
        const observer = new MutationObserver((mutations) => {
            const currentURL = getCurrentURL();

            // 如果页面的 URL 发生变化
            if (currentURL !== getCurrentURL.previousURL) {
                getCurrentURL.previousURL = currentURL;
                handleURLChange();
            }

            // 处理 DOM 变化
            handleMutations(mutations);
        });

        // 配置 MutationObserver
        const config = {
            characterData: true,
            characterDataOldValue: true,
            subtree: true,
            childList: true,
            attributeFilter: ['value', 'placeholder', 'aria-label', 'title', 'data-confirm'], // 观察特定属性变化
        };

        // 开始观察 document.body 的变化
        if (document.body) {
            observer.observe(document.body, config);
        }
    }

    /**
     * traverseNode 函数：遍历指定的节点，并对节点进行翻译。
     * @param {Node} node - 需要遍历的节点。
     */
    function traverseNode(node) {
        if (!node) {
            return;
        }

        // 跳过已翻译的节点，避免死循环
        if (node.nodeType === Node.ELEMENT_NODE && node.hasAttribute && node.hasAttribute('data-i18n-translated')) {
            return;
        }

        const nodeId = node.id || '';
        const nodeClass = (node.className || '').toString();
        const nodeTag = (node.tagName || '').toUpperCase();
        const nodeItemprop = node.getAttribute ? (node.getAttribute('itemprop') || '') : '';

        // 跳过忽略的元素
        if ((nodeId && langConf.reIgnoreId.test(nodeId)) ||
            (nodeClass && langConf.reIgnoreClass.test(nodeClass)) ||
            (nodeTag && langConf.reIgnoreTag.includes(nodeTag)) ||
            (nodeItemprop && langConf.reIgnoreItemprop.test(nodeItemprop))
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

            // 标记节点已翻译
            if (node.setAttribute) {
                node.setAttribute('data-i18n-translated', 'true');
            }

            // 使用 TreeWalker 优化子节点遍历
            if (document.createTreeWalker && node.childNodes.length > 10) {
                // 只对子节点较多的节点使用 TreeWalker
                const walker = document.createTreeWalker(
                    node,
                    NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
                    {
                        acceptNode: function(node) {
                            // 过滤已翻译的节点
                            if (node.nodeType === Node.ELEMENT_NODE &&
                                node.hasAttribute &&
                                node.hasAttribute('data-i18n-translated')) {
                                return NodeFilter.FILTER_REJECT;
                            }
                            // 过滤忽略的标签
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                const tag = node.tagName.toUpperCase();
                                if (langConf.reIgnoreTag.includes(tag)) {
                                    return NodeFilter.FILTER_REJECT;
                                }
                            }
                            return NodeFilter.FILTER_ACCEPT;
                        }
                    }
                );

                let currentNode;
                while (currentNode = walker.nextNode()) {
                    if (currentNode !== node) { // 跳过根节点
                        traverseNode(currentNode);
                    }
                }
            } else {
                // 子节点较少时使用传统方式
                let childNodes = node.childNodes;
                childNodes.forEach(traverseNode); // 遍历子节点
            }

        } else if (node.nodeType === Node.TEXT_NODE) { // 文本节点翻译
            if (node.length <= 500 && node.length > 0) {
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
                return 'dockerhub_home';
            } else if (pathname.startsWith('/_/')) {
                return 'dockerhub_official';
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
        const titlePack = langPack.title;
        if (!titlePack) {
            return;
        }

        let key = document.title;
        let str = titlePack.static?.[key] || '';
        if (!str && Array.isArray(titlePack.regexp)) {
            for (let [pattern, replacement] of titlePack.regexp) {
                const replaced = key.replace(pattern, replacement);
                if (replaced !== key) {
                    str = replaced;
                    break;
                }
            }
        }

        if (str) {
            document.title = str;
        }
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
        if (typeof text !== 'string') {
            return false;
        }

        let _key = text.trim();

        if (!_key) {
            return false;
        }

        // 智能过滤：跳过已经是中文的内容
        if (isChinese(_key)) {
            return false;
        }

        let _key_neat = _key.replace(/\xa0|[\s]+/g, ' ');

        // 移除有问题的正则检查，改为更宽松的验证
        // 只排除纯空白和特殊符号
        if (_key_neat.length === 0 || /^[\s\u200b-\u200d\ufeff]*$/.test(_key_neat)) {
            return false;
        }

        let str = fetchTranslatedText(_key_neat);

        if (str && str !== _key_neat) {
            return text.replace(_key, str);
        }

        return false;
    }

    /**
     * isChinese 函数：检查文本是否主要包含中文
     * @param {string} text - 需要检查的文本
     * @returns {boolean} 如果文本主要是中文则返回 true
     */
    function isChinese(text) {
        // 统计中文字符的比例
        const chineseChars = text.match(/[\u4e00-\u9fa5]/g);
        if (!chineseChars) {
            return false;
        }
        // 如果中文字符占比超过50%，认为是中文内容
        const chineseRatio = chineseChars.length / text.length;
        return chineseRatio > 0.5;
    }

    /**
     * fetchTranslatedText 函数：从特定页面的词库中获得翻译文本内容。
     * @param {string} key - 需要翻译的文本内容。
     * @returns {string|boolean} 翻译后的文本内容，如果没有找到对应的翻译，那么返回 false。
     */
    function fetchTranslatedText(key) {
        // 先查询缓存
        if (translationCache.has(key)) {
            return translationCache.get(key);
        }

        // 智能词库回退策略：当前页面 -> 站点通用 -> 公共词库
        const fallbackChain = [page];

        // 添加站点级别的回退
        if (page.startsWith('dockerhub_')) {
            fallbackChain.push('dockerhub');
        } else if (page.startsWith('dockerdocs_')) {
            fallbackChain.push('dockerdocs');
        } else if (page.startsWith('docker_')) {
            fallbackChain.push('docker');
        }

        // 最后回退到 public
        fallbackChain.push('public');

        // 尝试静态翻译
        for (const pageName of fallbackChain) {
            const pack = langPack[pageName];
            if (pack && pack.static && pack.static[key]) {
                const result = pack.static[key];
                translationCache.set(key, result);
                return result;
            }
        }

        // 尝试正则翻译
        if (enable_RegExp) {
            for (const pageName of fallbackChain) {
                const pack = langPack[pageName];
                if (pack && Array.isArray(pack.regexp)) {
                    for (let [pattern, replacement] of pack.regexp) {
                        const str = key.replace(pattern, replacement);
                        if (str !== key) {
                            translationCache.set(key, str);
                            return str;
                        }
                    }
                }
            }
        }

        // 缓存未找到的结果，避免重复查询
        translationCache.set(key, false);
        return false;
    }

    /**
     * transBySelector 函数：通过 CSS 选择器找到页面上的元素，并将其文本内容替换为预定义的翻译。
     */
    function transBySelector() {
        // 智能词库回退策略
        const fallbackChain = [page];

        if (page.startsWith('dockerhub_')) {
            fallbackChain.push('dockerhub');
        } else if (page.startsWith('dockerdocs_')) {
            fallbackChain.push('dockerdocs');
        } else if (page.startsWith('docker_')) {
            fallbackChain.push('docker');
        }

        fallbackChain.push('public');

        // 收集所有选择器翻译规则
        const selectors = [];
        for (const pageName of fallbackChain) {
            const pack = langPack[pageName];
            if (pack && Array.isArray(pack.selector)) {
                selectors.push(...pack.selector);
            }
        }

        selectors.forEach(([selector, translation]) => {
            if (!selector || typeof translation !== 'string') {
                return;
            }

            const containsMatch = selector.match(/^(.*):contains\((['"])(.+?)\2\)$/);
            if (containsMatch) {
                const baseSelector = containsMatch[1].trim();
                const needle = containsMatch[3];
                try {
                    const elements = document.querySelectorAll(baseSelector);
                    elements.forEach(element => {
                        if (element.textContent && element.textContent.includes(needle)) {
                            applySelectorTranslation(element, translation);
                        }
                    });
                } catch (error) {
                    console.warn('[Docker 中文化] 选择器解析失败:', selector, error);
                }
                return;
            }

            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => applySelectorTranslation(element, translation));
            } catch (error) {
                console.warn('[Docker 中文化] 选择器解析失败:', selector, error);
            }
        });
    }

    function applySelectorTranslation(element, translation) {
        if (!element) {
            return;
        }

        // 跳过已翻译的元素
        if (element.hasAttribute && element.hasAttribute('data-i18n-selector-translated')) {
            return;
        }

        if (element.tagName === 'INPUT') {
            if (element.hasAttribute('placeholder')) {
                element.placeholder = translation;
            } else if (["button", "submit", "reset"].includes(element.type)) {
                element.value = translation;
            }
        } else if (element.tagName === 'TEXTAREA' && element.hasAttribute('placeholder')) {
            element.placeholder = translation;
        } else if (element.tagName === 'OPTGROUP') {
            element.label = translation;
        } else {
            element.textContent = translation;
        }

        // 标记已通过选择器翻译
        if (element.setAttribute) {
            element.setAttribute('data-i18n-selector-translated', 'true');
        }
    }

    function registerMenuCommand() {
        if (typeof GM_registerMenuCommand !== 'function') {
            return;
        }
        const toggleRegExp = () => {
            enable_RegExp = !enable_RegExp;
            GM_setValue("enable_RegExp", enable_RegExp);
            if (typeof GM_notification === 'function') {
                GM_notification(`已${enable_RegExp ? '开启' : '关闭'}正则功能`);
            }
            if (enable_RegExp) {
                location.reload();
            }
            if (typeof GM_unregisterMenuCommand === 'function' && menuId) {
                GM_unregisterMenuCommand(menuId);
            }
            menuId = GM_registerMenuCommand(`${enable_RegExp ? '关闭' : '开启'}正则功能`, toggleRegExp);
        };

        let menuId = GM_registerMenuCommand(`${enable_RegExp ? '关闭' : '开启'}正则功能`, toggleRegExp);
    }

    /**
     * init 函数：初始化翻译功能。
     */
    function init() {
        page = getPage() || 'docker_public';
        console.log(`Docker中文插件开始, 页面类型: ${page}`);

        transTitle();

        if (document.body) {
            traverseNode(document.body);
        }

        // 使用 requestIdleCallback 或降级到 setTimeout
        const scheduleTranslation = window.requestIdleCallback || function(cb) {
            return setTimeout(cb, 100);
        };

        scheduleTranslation(() => {
            transBySelector();
        });

        watchUpdate();
    }

    function resolveLangKey(preferred) {
        const seed = preferred || '';
        const candidates = [
            seed,
            seed.replace('-', '_'),
            seed.split(/[-_]/)[0],
            'zh'
        ].filter(Boolean);

        for (const key of candidates) {
            if (window.I18N && window.I18N[key]) {
                return key;
            }
        }

        const available = Object.keys(window.I18N || {});
        return available[0] || preferred || 'zh';
    }

    function createLangConf(pack = {}) {
        const defaults = {
            reIgnoreId: /^$/,
            reIgnoreClass: /(?!)/,
            reIgnoreTag: [],
            reIgnoreItemprop: /^$/
        };

        if (!pack.conf) {
            return defaults;
        }

        return {
            ...defaults,
            ...pack.conf,
            reIgnoreTag: Array.isArray(pack.conf.reIgnoreTag) ? pack.conf.reIgnoreTag : defaults.reIgnoreTag,
        };
    }

    // 执行初始化
    registerMenuCommand();
    init();

})(window, document);
