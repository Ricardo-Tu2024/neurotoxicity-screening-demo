// 术语提示系统
(function() {
    'use strict';

    // 术语定义
    const termDefinitions = {
        'bead': {
            zh: '串珠：神经元轴突上的珠状结构，是神经退行性病变的早期标志物',
            en: 'Bead: Bead-like structures on neuronal axons, early markers of neurodegeneration'
        },
        'cep': {
            zh: 'CEP：头部的四个多巴胺能神经元（Cephalic sensilla neurons），负责感知环境信号',
            en: 'CEP: Four dopaminergic neurons in the head (Cephalic sensilla neurons)'
        },
        'ade': {
            zh: 'ADE：后部的两个多巴胺能神经元（Anterior deirid neurons），参与运动调控',
            en: 'ADE: Two dopaminergic neurons in the posterior (Anterior deirid neurons)'
        },
        'dendrite': {
            zh: '树突：神经元接收信号的分支结构，其完整性反映神经元健康状态',
            en: 'Dendrite: Branched structures that receive signals, integrity reflects neuronal health'
        },
        'bsr': {
            zh: 'BSR：基础慢反应，线虫遇到食物时的减速行为，评估多巴胺神经元功能的金标准',
            en: 'BSR: Basal Slowing Response, slowing behavior when encountering food'
        }
    };

    // 获取当前语言
    function getCurrentLang() {
        return (window.NMI_i18n && window.NMI_i18n.getLang) ? window.NMI_i18n.getLang() : (localStorage.getItem('nmi-lang') || 'en');
    }

    // 初始化 tooltip
    function initTooltips() {
        const tooltips = document.querySelectorAll('.term-tooltip');
        const currentLang = getCurrentLang();

        tooltips.forEach(tooltip => {
            const term = tooltip.getAttribute('data-term');
            if (termDefinitions[term]) {
                const definition = termDefinitions[term][currentLang];
                tooltip.setAttribute('data-tooltip', definition);
                tooltip.setAttribute('title', ''); // 清除默认 title，避免冲突
            }
        });
    }

    // 当语言切换时更新 tooltip
    window.addEventListener('languageChanged', initTooltips);

    // 页面加载时初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTooltips);
    } else {
        initTooltips();
    }

    // 导出函数供外部调用
    window.NMI_Tooltip = {
        init: initTooltips
    };
})();
