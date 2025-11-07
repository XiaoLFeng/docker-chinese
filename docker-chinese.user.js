// ==UserScript==
// @name         Docker 中文化插件
// @namespace    https://github.com/XiaoLFeng/docker-chinese
// @description  中文化 Docker、Docker Hub 和 Docker Docs 网站的界面菜单及内容
// @copyright    2025, XiaoLFeng (https://github.com/XiaoLFeng)
// @icon         https://www.docker.com/favicon.ico
// @version      1.1.0
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

(function (window, document) {
    'use strict';

    // ==================== 初始化配置 ====================
    if (!window.I18N) {
        console.error('[Docker 中文化] 统一词库未加载，无法继续执行');
        return;
    }

    const lang = resolveLangKey('zh-CN');
    const langPack = window.I18N[lang] || {};
    const langConf = langPack.conf || createDefaultConf();
    const enable_RegExp = GM_getValue("enable_RegExp", 1);

    // 常量定义
    const APPLIED_ATTR = 'data-docker-cn';
    const APPLIED_SELECTOR_ATTR = 'data-docker-cn-selector';
    const CACHE_VERSION_KEY = Symbol('cacheVersion');

    // 全局状态
    let currentPage = getPage();
    const translationCache = new Map();

    // ==================== 工具函数 ====================

    /**
     * 节流函数
     */
    function throttle(func, delay) {
        let lastCall = 0;
        let timer = null;
        return function (...args) {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                func.apply(this, args);
            } else {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    lastCall = Date.now();
                    func.apply(this, args);
                }, delay);
            }
        };
    }

    /**
     * 防抖函数
     */
    function debounce(func, delay) {
        let timer = null;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    }

    /**
     * 解析语言键
     */
    function resolveLangKey(preferred) {
        const candidates = [
            preferred,
            preferred?.replace('-', '_'),
            preferred?.split(/[-_]/)[0],
            'zh'
        ].filter(Boolean);

        for (const key of candidates) {
            if (window.I18N?.[key]) return key;
        }
        return Object.keys(window.I18N || {})[0] || 'zh';
    }

    /**
     * 创建默认配置
     */
    function createDefaultConf() {
        return {
            reIgnoreId: /^$/,
            reIgnoreClass: /(?!)/,
            reIgnoreTag: ['SCRIPT', 'STYLE', 'svg', 'path', 'use', 'symbol', 'g', 'rect', 'circle', 'polygon', 'ellipse', 'polyline', 'line', 'defs', 'marker', 'mask', 'pattern', 'linearGradient', 'radialGradient', 'stop'],
            reIgnoreItemprop: /^$/
        };
    }

    /**
     * 获取当前页面类型
     */
    function getPage() {
        const { hostname, pathname } = location;

        const pageMap = {
            'hub.docker.com': {
                '/': 'dockerhub_home',
                '/search': 'dockerhub_home',
                '/repositories/': 'dockerhub_repositories',
                '/_/': 'dockerhub_official',
                '/tags/': 'dockerhub_tags',
                '/layers/': 'dockerhub_layers',
                '/repository/': 'dockerhub_repo',
                default: 'dockerhub'
            },
            'docs.docker.com': {
                '/': 'dockerdocs_home',
                '/engine/': 'dockerdocs_engine',
                '/compose/': 'dockerdocs_compose',
                default: 'dockerdocs_other'
            },
            'www.docker.com': {
                '/': 'docker_home',
                '/products/': 'docker_products',
                '/pricing/': 'docker_pricing',
                '/resources/': 'docker_resources',
                '/blog/': 'docker_blog',
                default: 'docker_other'
            }
        };

        const map = pageMap[hostname] || pageMap['www.docker.com'];
        for (const [path, page] of Object.entries(map)) {
            if (path === 'default') continue;
            if (pathname === path || pathname.startsWith(path)) {
                return page;
            }
        }
        return map.default || 'docker_public';
    }

    /**
     * 构建回退查询链
     */
    function buildFallbackChain(page) {
        const chain = [page];
        const prefix = page.split('_')[0];
        if (prefix !== page) chain.push(prefix);
        chain.push('public');
        return chain;
    }

    /**
     * 检查是否为中文内容
     */
    function isChinese(text) {
        const chineseChars = text.match(/[\u4e00-\u9fa5]/g);
        return chineseChars && (chineseChars.length / text.length) > 0.5;
    }

    /**
     * 检查节点是否应该被忽略
     */
    function shouldIgnoreNode(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.hasAttribute?.(APPLIED_ATTR)) return true;

            const id = node.id || '';
            const className = (node.className || '').toString();
            const tag = node.tagName?.toUpperCase() || '';
            const itemprop = node.getAttribute?.('itemprop') || '';

            return (
                (id && langConf.reIgnoreId.test(id)) ||
                (className && langConf.reIgnoreClass.test(className)) ||
                (tag && langConf.reIgnoreTag.includes(tag)) ||
                (itemprop && langConf.reIgnoreItemprop.test(itemprop))
            );
        }
        return false;
    }

    // ==================== 翻译核心 ====================

    /**
     * 统一查询引擎
     */
    function searchInDict(key, fallbackChain) {
        for (const pageName of fallbackChain) {
            const pack = langPack[pageName];
            if (!pack) continue;

            // 1. 精确匹配
            if (pack.exact?.[key]) return pack.exact[key];

            // 2. 片段匹配（30+ 字符或 5+ 单词）
            if (key.length > 30 || key.split(/\s+/).length > 5) {
                if (pack.fragments) {
                    for (const [fragment, translation] of Object.entries(pack.fragments)) {
                        if (key.includes(fragment)) {
                            return key.replace(fragment, translation);
                        }
                    }
                }
            }

            // 3. 正则匹配
            if (enable_RegExp && Array.isArray(pack.regexp)) {
                for (const [pattern, replacement] of pack.regexp) {
                    const result = key.replace(pattern, replacement);
                    if (result !== key) return result;
                }
            }
        }
        return false;
    }

    /**
     * 翻译文本（带缓存）
     */
    function translateText(text) {
        if (typeof text !== 'string') return false;

        const key = text.trim().replace(/\xa0|[\s]+/g, ' ');
        if (!key || /^[\s\u200b-\u200d\ufeff]*$/.test(key) || isChinese(key)) {
            return false;
        }

        // 查询缓存
        if (translationCache.has(key)) {
            return translationCache.get(key);
        }

        // 查询词库
        const fallbackChain = buildFallbackChain(currentPage);
        const result = searchInDict(key, fallbackChain);

        // 缓存结果
        translationCache.set(key, result);

        return result && result !== key ? text.replace(text.trim(), result) : false;
    }

    /**
     * 翻译元素
     */
    function transElement(el, field, isAttr = false) {
        const text = isAttr ? el.getAttribute(field) : el[field];
        const translated = translateText(text);

        if (translated) {
            isAttr ? el.setAttribute(field, translated) : (el[field] = translated);
        }
    }

    /**
     * 翻译页面标题
     */
    function transTitle() {
        const titlePack = langPack.title;
        if (!titlePack) return;

        const key = document.title;
        let result = titlePack.exact?.[key];

        if (!result && Array.isArray(titlePack.regexp)) {
            for (const [pattern, replacement] of titlePack.regexp) {
                const replaced = key.replace(pattern, replacement);
                if (replaced !== key) {
                    result = replaced;
                    break;
                }
            }
        }

        if (result) document.title = result;
    }

    // ==================== DOM 遍历 ====================

    /**
     * 翻译元素属性
     */
    function transElementAttrs(node) {
        const attrMap = {
            INPUT: { button: ['data-confirm', 'value'], submit: ['data-confirm', 'value'], reset: ['data-confirm', 'value'], default: ['placeholder'] },
            TEXTAREA: { default: ['placeholder'] },
            BUTTON: { default: ['aria-label', 'title', 'data-confirm', 'data-disable-with'] },
            OPTGROUP: { default: ['label'] }
        };

        const tag = node.tagName;
        const type = node.type || 'default';
        const attrs = attrMap[tag]?.[type] || attrMap[tag]?.default;

        if (attrs) {
            attrs.forEach(attr => {
                if (node.hasAttribute(attr)) {
                    transElement(node, attr, true);
                }
            });
        } else if (node.getAttribute?.('aria-label')) {
            transElement(node, 'aria-label', true);
        } else if (node.hasAttribute?.('title')) {
            transElement(node, 'title', true);
        }
    }

    /**
     * 遍历并翻译节点
     */
    function traverseNode(node) {
        if (!node || shouldIgnoreNode(node)) return;

        if (node.nodeType === Node.ELEMENT_NODE) {
            // 翻译属性
            transElementAttrs(node);

            // 遍历子节点
            const useTreeWalker = node.childNodes.length > 10;
            if (useTreeWalker && document.createTreeWalker) {
                const walker = document.createTreeWalker(
                    node,
                    NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
                    {
                        acceptNode: n => {
                            if (n.nodeType === Node.ELEMENT_NODE) {
                                if (n.hasAttribute?.(APPLIED_ATTR)) return NodeFilter.FILTER_REJECT;
                                if (langConf.reIgnoreTag.includes(n.tagName?.toUpperCase())) {
                                    return NodeFilter.FILTER_REJECT;
                                }
                            }
                            return NodeFilter.FILTER_ACCEPT;
                        }
                    }
                );

                let current;
                while (current = walker.nextNode()) {
                    if (current !== node) traverseNode(current);
                }
            } else {
                Array.from(node.childNodes).forEach(traverseNode);
            }

            // 标记已翻译
            node.setAttribute?.(APPLIED_ATTR, 'true');

        } else if (node.nodeType === Node.TEXT_NODE && node.length > 0 && node.length <= 500) {
            transElement(node, 'data');
        }
    }

    // ==================== 选择器翻译 ====================

    /**
     * 应用选择器翻译
     */
    function applySelectorTrans(el, translation, originalText) {
        if (!el || el.hasAttribute?.(APPLIED_SELECTOR_ATTR)) return;

        const tagMap = {
            INPUT: (e) => {
                if (e.hasAttribute('placeholder')) e.placeholder = translation;
                else if (['button', 'submit', 'reset'].includes(e.type)) e.value = translation;
            },
            TEXTAREA: (e) => e.hasAttribute('placeholder') && (e.placeholder = translation),
            OPTGROUP: (e) => e.label = translation
        };

        if (tagMap[el.tagName]) {
            tagMap[el.tagName](el);
        } else if (originalText) {
            // 对于 :contains() 选择器，只替换匹配的文本节点，保留子元素
            replaceTextInNode(el, originalText, translation);
        } else {
            // 普通选择器，直接替换 textContent
            el.textContent = translation;
        }

        el.setAttribute?.(APPLIED_SELECTOR_ATTR, 'true');
    }

    /**
     * 在节点中替换文本，保留子元素
     */
    function replaceTextInNode(node, searchText, replaceText) {
        // 遍历所有子节点
        const walker = document.createTreeWalker(
            node,
            NodeFilter.SHOW_TEXT,
            null
        );

        const textNodes = [];
        let currentNode;
        while (currentNode = walker.nextNode()) {
            if (currentNode.textContent.includes(searchText)) {
                textNodes.push(currentNode);
            }
        }

        // 替换找到的文本节点
        textNodes.forEach(textNode => {
            textNode.textContent = textNode.textContent.replace(searchText, replaceText);
        });
    }

    /**
     * 通过选择器翻译
     */
    function transBySelector() {
        const fallbackChain = buildFallbackChain(currentPage);
        const selectors = [];

        for (const pageName of fallbackChain) {
            const pack = langPack[pageName];
            if (pack?.selector) selectors.push(...pack.selector);
        }

        selectors.forEach(([selector, translation]) => {
            if (!selector || typeof translation !== 'string') return;

            try {
                const containsMatch = selector.match(/^(.*):contains\((['"])(.+?)\2\)$/);
                if (containsMatch) {
                    const [, base, , needle] = containsMatch;
                    document.querySelectorAll(base.trim()).forEach(el => {
                        if (el.textContent?.includes(needle)) {
                            // 传递原始文本，用于精确替换
                            applySelectorTrans(el, translation, needle);
                        }
                    });
                } else {
                    document.querySelectorAll(selector).forEach(el => {
                        applySelectorTrans(el, translation);
                    });
                }
            } catch (err) {
                console.warn('[Docker 中文化] 选择器解析失败:', selector, err);
            }
        });
    }

    // ==================== 监听器 ====================

    /**
     * 监听页面变化
     */
    function watchUpdate() {
        const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        if (!MutationObserver || !document.body) return;

        let previousURL = location.href;

        // URL 变化处理
        const handleURLChange = debounce(() => {
            currentPage = getPage();
            console.log(`[Docker 中文化] 页面切换: ${currentPage}`);

            // 清空缓存和旧标记
            translationCache.clear();
            document.querySelectorAll(`[${APPLIED_ATTR}]`)
                .forEach(el => el.removeAttribute(APPLIED_ATTR));

            // 重新翻译
            transTitle();
            transBySelector();
            if (document.body) traverseNode(document.body);
        }, 300);

        // DOM 变化处理
        const handleMutations = throttle(mutations => {
            mutations
                .filter(m => m.addedNodes.length > 0 || m.type === 'attributes' || m.type === 'characterData')
                .forEach(m => {
                    const target = m.target;
                    if (target.nodeType === Node.ELEMENT_NODE) {
                        const tag = target.tagName;
                        if (['SCRIPT', 'STYLE', 'svg'].includes(tag)) return;
                    }
                    traverseNode(target);
                });
        }, 100);

        // 创建观察器
        const observer = new MutationObserver(mutations => {
            const currentURL = location.href;
            if (currentURL !== previousURL) {
                previousURL = currentURL;
                handleURLChange();
            }
            handleMutations(mutations);
        });

        observer.observe(document.body, {
            characterData: true,
            characterDataOldValue: true,
            subtree: true,
            childList: true,
            attributeFilter: ['value', 'placeholder', 'aria-label', 'title', 'data-confirm']
        });
    }

    // ==================== 菜单命令 ====================

    function registerMenuCommand() {
        if (typeof GM_registerMenuCommand !== 'function') return;

        let menuId;
        let regexpEnabled = enable_RegExp;

        const toggleRegExp = () => {
            regexpEnabled = !regexpEnabled;
            GM_setValue("enable_RegExp", regexpEnabled);

            if (typeof GM_notification === 'function') {
                GM_notification(`已${regexpEnabled ? '开启' : '关闭'}正则功能`);
            }

            if (regexpEnabled) location.reload();

            if (typeof GM_unregisterMenuCommand === 'function' && menuId) {
                GM_unregisterMenuCommand(menuId);
            }
            menuId = GM_registerMenuCommand(
                `${regexpEnabled ? '关闭' : '开启'}正则功能`,
                toggleRegExp
            );
        };

        menuId = GM_registerMenuCommand(
            `${regexpEnabled ? '关闭' : '开启'}正则功能`,
            toggleRegExp
        );
    }

    // ==================== 初始化 ====================

    function init() {
        console.log(`[Docker 中文化] 开始翻译, 页面类型: ${currentPage}`);

        transTitle();

        if (document.body) {
            traverseNode(document.body);
        }

        // 延迟选择器翻译
        if (window.requestIdleCallback) {
            window.requestIdleCallback(() => transBySelector());
        } else {
            setTimeout(() => transBySelector(), 100);
        }

        watchUpdate();
    }

    // 执行
    registerMenuCommand();
    init();

})(window, document);
