// 快速开始引导系统
(function() {
    'use strict';

    // 引导步骤配置
    const guideSteps = {
        zh: [
            {
                target: '.intro',
                title: '欢迎使用 NMI 系统',
                content: '这是一个基于 AI 的线虫神经毒性筛查演示系统。让我们快速了解如何使用。',
                position: 'bottom'
            },
            {
                target: '.metrics-grid',
                title: '10 项关键指标',
                content: '系统可以自动检测串珠、细胞体、树突和形态异常等 10 项神经元形态学指标。',
                position: 'top'
            },
            {
                target: '.sample-picker',
                title: '选择样本',
                content: '点击任意样本卡片选择要分析的线虫神经元图像。',
                position: 'top'
            },
            {
                target: '.task-picker',
                title: '选择分析任务',
                content: '选择您想要执行的分析类型：串珠、细胞体、树突或形态异常分析。',
                position: 'top'
            },
            {
                target: '#start-btn',
                title: '键盘快捷键',
                content: '在工作区中，您可以使用键盘快捷键快速操作：Space/Enter 执行、Esc 返回、←→ 翻页、1-8 切换样本、E 导出 CSV。',
                position: 'top',
                highlight: false
            },
            {
                target: '#start-btn',
                title: '开始分析',
                content: '点击"开始"按钮进入工作区，查看实时分析结果。',
                position: 'top',
                highlight: true
            }
        ],
        en: [
            {
                target: '.intro',
                title: 'Welcome to NMI System',
                content: 'This is an AI-based C. elegans neurotoxicity screening demo. Let\'s quickly learn how to use it.',
                position: 'bottom'
            },
            {
                target: '.metrics-grid',
                title: '10 Key Metrics',
                content: 'The system automatically detects 10 neuronal morphological metrics including beads, soma, dendrites, and morphological abnormalities.',
                position: 'top'
            },
            {
                target: '.sample-picker',
                title: 'Select Sample',
                content: 'Click any sample card to choose the C. elegans neuron image you want to analyze.',
                position: 'top'
            },
            {
                target: '.task-picker',
                title: 'Choose Analysis Task',
                content: 'Select the type of analysis you want to perform: bead, soma, dendrite, or morphology analysis.',
                position: 'top'
            },
            {
                target: '#start-btn',
                title: 'Keyboard Shortcuts',
                content: 'In the workspace, use keyboard shortcuts: Space/Enter to execute, Esc to go back, ←→ to navigate, 1-8 to switch samples, E to export CSV.',
                position: 'top',
                highlight: false
            },
            {
                target: '#start-btn',
                title: 'Start Analysis',
                content: 'Click the "Start" button to enter the workspace and view real-time analysis results.',
                position: 'top',
                highlight: true
            }
        ]
    };

    let currentStep = 0;
    let isGuideActive = false;
    let overlay = null;
    let tooltip = null;

    // 获取当前语言
    function getCurrentLang() {
        return (window.NMI_i18n && window.NMI_i18n.getLang) ? window.NMI_i18n.getLang() : (localStorage.getItem('nmi-lang') || 'en');
    }

    // 获取当前步骤配置
    function getCurrentSteps() {
        const lang = getCurrentLang();
        return guideSteps[lang] || guideSteps.en;
    }

    // 创建遮罩层
    function createOverlay() {
        overlay = document.createElement('div');
        overlay.className = 'guide-overlay';
        overlay.addEventListener('click', skipGuide);
        document.body.appendChild(overlay);
    }

    // 创建提示框
    function createTooltip(step) {
        const steps = getCurrentSteps();
        const lang = getCurrentLang();

        tooltip = document.createElement('div');
        tooltip.className = 'guide-tooltip';

        tooltip.innerHTML = `
            <div class="guide-tooltip__header">
                <h3 class="guide-tooltip__title">${step.title}</h3>
                <button type="button" class="guide-tooltip__close" aria-label="${lang === 'zh' ? '关闭' : 'Close'}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <div class="guide-tooltip__body">
                <p>${step.content}</p>
            </div>
            <div class="guide-tooltip__footer">
                <div class="guide-tooltip__progress">
                    <span class="guide-tooltip__step-count">${currentStep + 1} / ${steps.length}</span>
                </div>
                <div class="guide-tooltip__actions">
                    ${currentStep > 0 ? `<button type="button" class="guide-tooltip__btn--icon" data-guide-action="prev" aria-label="${lang === 'zh' ? '上一步' : 'Previous'}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:1rem;height:1rem;"><path d="M15 18l-6-6 6-6"/></svg></button>` : ''}
                    ${currentStep < steps.length - 1
                        ? `<button type="button" class="guide-tooltip__btn--icon" data-guide-action="next" aria-label="${lang === 'zh' ? '下一步' : 'Next'}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:1rem;height:1rem;"><path d="M9 18l6-6-6-6"/></svg></button>`
                        : `<button type="button" class="guide-tooltip__btn guide-tooltip__btn-primary" data-guide-action="finish">${lang === 'zh' ? '完成' : 'Finish'}</button>`
                    }
                </div>
            </div>
        `;

        document.body.appendChild(tooltip);

        // 绑定事件
        tooltip.querySelector('.guide-tooltip__close').addEventListener('click', function(e) {
            e.stopPropagation();
            skipGuide();
        });

        const prevBtn = tooltip.querySelector('[data-guide-action="prev"]');
        if (prevBtn) prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            previousStep();
        });

        const nextBtn = tooltip.querySelector('[data-guide-action="next"]');
        if (nextBtn) nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            nextStep();
        });

        const finishBtn = tooltip.querySelector('[data-guide-action="finish"]');
        if (finishBtn) finishBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            finishGuide();
        });

        return tooltip;
    }

    // 高亮目标元素
    function highlightElement(selector) {
        const element = document.querySelector(selector);
        if (!element) return;

        const rect = element.getBoundingClientRect();

        // 添加高亮类
        element.classList.add('guide-highlight');

        // 滚动到元素
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });

        return rect;
    }

    // 定位提示框
    function positionTooltip(targetSelector, position) {
        const element = document.querySelector(targetSelector);
        if (!element || !tooltip) return;

        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        let top, left;

        switch (position) {
            case 'top':
                top = rect.top - tooltipRect.height - 20;
                left = rect.left + (rect.width - tooltipRect.width) / 2;
                break;
            case 'bottom':
                top = rect.bottom + 20;
                left = rect.left + (rect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = rect.top + (rect.height - tooltipRect.height) / 2;
                left = rect.left - tooltipRect.width - 20;
                break;
            case 'right':
                top = rect.top + (rect.height - tooltipRect.height) / 2;
                left = rect.right + 20;
                break;
            default:
                top = rect.bottom + 20;
                left = rect.left + (rect.width - tooltipRect.width) / 2;
        }

        // 确保提示框在视口内
        top = Math.max(20, Math.min(top, window.innerHeight - tooltipRect.height - 20));
        left = Math.max(20, Math.min(left, window.innerWidth - tooltipRect.width - 20));

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    }

    // 显示当前步骤
    function showStep(stepIndex) {
        const steps = getCurrentSteps();
        if (stepIndex < 0 || stepIndex >= steps.length) return;

        currentStep = stepIndex;
        const step = steps[stepIndex];

        // 移除之前的高亮
        document.querySelectorAll('.guide-highlight').forEach(el => {
            el.classList.remove('guide-highlight');
        });

        // 移除旧的提示框
        if (tooltip) {
            tooltip.remove();
        }

        // 创建新的提示框
        createTooltip(step);

        // 高亮目标元素
        highlightElement(step.target);

        // 定位提示框
        setTimeout(() => {
            positionTooltip(step.target, step.position);
        }, 100);
    }

    // 下一步
    function nextStep() {
        const steps = getCurrentSteps();
        if (currentStep < steps.length - 1) {
            showStep(currentStep + 1);
        }
    }

    // 上一步
    function previousStep() {
        if (currentStep > 0) {
            showStep(currentStep - 1);
        }
    }

    // 完成引导
    function finishGuide() {
        localStorage.setItem('nmi-guide-completed', 'true');
        endGuide();
    }

    // 跳过引导
    function skipGuide() {
        localStorage.setItem('nmi-guide-skipped', 'true');
        endGuide();
    }

    // 结束引导
    function endGuide() {
        isGuideActive = false;

        // 移除高亮
        document.querySelectorAll('.guide-highlight').forEach(el => {
            el.classList.remove('guide-highlight');
        });

        // 移除遮罩和提示框
        if (overlay) {
            overlay.remove();
            overlay = null;
        }
        if (tooltip) {
            tooltip.remove();
            tooltip = null;
        }
    }

    // 开始引导
    function startGuide() {
        if (isGuideActive) return;

        isGuideActive = true;
        currentStep = 0;

        createOverlay();
        showStep(0);
    }

    // 检查是否需要显示引导
    function checkAndShowGuide() {
        const completed = localStorage.getItem('nmi-guide-completed');
        const skipped = localStorage.getItem('nmi-guide-skipped');

        // 如果用户已完成或跳过引导，不再显示
        if (completed || skipped) return;

        // 延迟显示引导，让页面先加载完成
        setTimeout(() => {
            startGuide();
        }, 1000);
    }

    // 添加快速开始按钮（圆形浮窗）
    function addQuickStartButton() {
        const lang = getCurrentLang();
        const buttonText = lang === 'zh' ? '快速开始引导' : 'Quick Start Guide';

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'guide-floating-btn';
        button.setAttribute('aria-label', buttonText);
        button.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="white" stroke-width="2" fill="none"/>
                <circle cx="12" cy="17" r="1" fill="white"/>
            </svg>
        `;
        button.addEventListener('click', startGuide);

        document.body.appendChild(button);
    }

    // 初始化
    function init() {
        addQuickStartButton();
        checkAndShowGuide();
    }

    // 页面加载时初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 导出函数供外部调用
    window.NMI_Guide = {
        start: startGuide,
        skip: skipGuide,
        finish: finishGuide
    };
})();
