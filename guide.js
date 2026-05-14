// 交互式引导系统
(function() {
    'use strict';

    const GUIDE_KEY = 'nmi_guide_completed';
    const GUIDE_VERSION = '1.0';

    // 引导步骤定义
    const guideSteps = [
        {
            target: '.intro',
            title: {
                zh: '欢迎使用 NMI 系统',
                en: 'Welcome to NMI System'
            },
            content: {
                zh: '这是一个基于 AI 的线虫神经毒性筛查系统。让我们快速了解如何使用它。',
                en: 'This is an AI-based neurotoxicity screening system for C. elegans. Let\'s learn how to use it.'
            },
            position: 'bottom'
        },
        {
            target: '.metrics-grid--intro',
            title: {
                zh: '10 项关键指标',
                en: '10 Key Metrics'
            },
            content: {
                zh: '系统可以自动检测串珠、细胞体、树突和形态异常等 10 项神经元形态学指标。将鼠标悬停在术语上可查看详细解释。',
                en: 'The system automatically detects 10 morphological metrics including beads, cell bodies, dendrites, and abnormalities. Hover over terms for detailed explanations.'
            },
            position: 'top'
        },
        {
            target: '.bsr-section',
            title: {
                zh: 'BSR 评分系统',
                en: 'BSR Scoring System'
            },
            content: {
                zh: 'BSR（基础慢反应）是评估多巴胺神经元功能的金标准。系统将形态学特征与行为学评分相关联。',
                en: 'BSR (Basal Slowing Response) is the gold standard for assessing dopaminergic neuron function. The system correlates morphological features with behavioral scores.'
            },
            position: 'top'
        },
        {
            target: '.sample-picker',
            title: {
                zh: '选择样本',
                en: 'Select Sample'
            },
            content: {
                zh: '点击样本卡片选择要分析的线虫图像。每个样本都包含原始显微镜图像。',
                en: 'Click on a sample card to select the worm image for analysis. Each sample contains original microscopy images.'
            },
            position: 'bottom',
            highlight: true
        },
        {
            target: '.task-picker',
            title: {
                zh: '选择分析任务',
                en: 'Select Analysis Task'
            },
            content: {
                zh: '选择要执行的分析任务：串珠分析、细胞体分析、树突分析或形态异常分析。',
                en: 'Choose the analysis task: bead analysis, cell body analysis, dendrite analysis, or morphology analysis.'
            },
            position: 'top',
            highlight: true
        },
        {
            target: '#start-btn',
            title: {
                zh: '键盘快捷键',
                en: 'Keyboard Shortcuts'
            },
            content: {
                zh: '工作区支持快捷键：Space/Enter 执行、Esc 返回上一步、←→ 翻页、B 后退、E 导出 CSV、R 重置、1-8 切换样本。',
                en: 'Workspace supports: Space/Enter to execute, Esc to go back, ←→ to navigate, B for back, E to export CSV, R to reset, 1-8 to switch samples.'
            },
            position: 'top'
        },
        {
            target: '#start-btn',
            title: {
                zh: '开始分析',
                en: 'Start Analysis'
            },
            content: {
                zh: '点击"开始"按钮进入分析工作区。您将看到原始图像、预处理结果和分析结果。',
                en: 'Click "Start" to enter the analysis workspace. You\'ll see the original image, preprocessing results, and analysis results.'
            },
            position: 'top',
            highlight: true,
            final: true
        }
    ];

    class GuideSystem {
        constructor() {
            this.currentStep = 0;
            this.overlay = null;
            this.tooltip = null;
            this.lang = localStorage.getItem('language') || 'zh';
        }

        shouldShowGuide() {
            const completed = localStorage.getItem(GUIDE_KEY);
            return completed !== GUIDE_VERSION;
        }

        start() {
            if (!this.shouldShowGuide()) return;

            this.createOverlay();
            this.showStep(0);
        }

        createOverlay() {
            // 创建遮罩层
            this.overlay = document.createElement('div');
            this.overlay.className = 'guide-overlay';
            document.body.appendChild(this.overlay);

            // 创建提示框
            this.tooltip = document.createElement('div');
            this.tooltip.className = 'guide-tooltip';
            this.tooltip.innerHTML = `
                <div class="guide-tooltip__header">
                    <h3 class="guide-tooltip__title"></h3>
                    <button class="guide-tooltip__close" aria-label="关闭引导">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="guide-tooltip__content"></div>
                <div class="guide-tooltip__footer">
                    <div class="guide-tooltip__progress">
                        <span class="guide-tooltip__step-current">1</span> /
                        <span class="guide-tooltip__step-total">${guideSteps.length}</span>
                    </div>
                    <div class="guide-tooltip__actions">
                        <button class="guide-tooltip__btn guide-tooltip__btn--skip">跳过</button>
                        <button class="guide-tooltip__btn guide-tooltip__btn--prev" style="display:none;">上一步</button>
                        <button class="guide-tooltip__btn guide-tooltip__btn--next guide-tooltip__btn--primary">下一步</button>
                    </div>
                </div>
            `;
            document.body.appendChild(this.tooltip);

            // 绑定事件
            this.tooltip.querySelector('.guide-tooltip__close').addEventListener('click', () => this.close());
            this.tooltip.querySelector('.guide-tooltip__btn--skip').addEventListener('click', () => this.skip());
            this.tooltip.querySelector('.guide-tooltip__btn--prev').addEventListener('click', () => this.prev());
            this.tooltip.querySelector('.guide-tooltip__btn--next').addEventListener('click', () => this.next());
        }

        showStep(index) {
            if (index < 0 || index >= guideSteps.length) return;

            this.currentStep = index;
            const step = guideSteps[index];
            const target = document.querySelector(step.target);

            if (!target) {
                console.warn(`Guide target not found: ${step.target}`);
                this.next();
                return;
            }

            // 更新内容
            this.tooltip.querySelector('.guide-tooltip__title').textContent = step.title[this.lang];
            this.tooltip.querySelector('.guide-tooltip__content').textContent = step.content[this.lang];
            this.tooltip.querySelector('.guide-tooltip__step-current').textContent = index + 1;

            // 更新按钮
            const prevBtn = this.tooltip.querySelector('.guide-tooltip__btn--prev');
            const nextBtn = this.tooltip.querySelector('.guide-tooltip__btn--next');

            prevBtn.style.display = index > 0 ? 'inline-flex' : 'none';
            nextBtn.textContent = step.final ? (this.lang === 'zh' ? '完成' : 'Finish') : (this.lang === 'zh' ? '下一步' : 'Next');

            // 高亮目标元素
            this.highlightTarget(target, step.highlight);

            // 定位提示框
            this.positionTooltip(target, step.position);

            // 滚动到目标元素
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        highlightTarget(target, shouldHighlight) {
            // 移除之前的高亮
            document.querySelectorAll('.guide-highlight').forEach(el => {
                el.classList.remove('guide-highlight');
            });

            if (shouldHighlight) {
                target.classList.add('guide-highlight');
            }
        }

        positionTooltip(target, position) {
            const rect = target.getBoundingClientRect();
            const tooltipRect = this.tooltip.getBoundingClientRect();
            const spacing = 20;

            let top, left;

            switch (position) {
                case 'top':
                    top = rect.top - tooltipRect.height - spacing;
                    left = rect.left + (rect.width - tooltipRect.width) / 2;
                    break;
                case 'bottom':
                    top = rect.bottom + spacing;
                    left = rect.left + (rect.width - tooltipRect.width) / 2;
                    break;
                case 'left':
                    top = rect.top + (rect.height - tooltipRect.height) / 2;
                    left = rect.left - tooltipRect.width - spacing;
                    break;
                case 'right':
                    top = rect.top + (rect.height - tooltipRect.height) / 2;
                    left = rect.right + spacing;
                    break;
                default:
                    top = rect.bottom + spacing;
                    left = rect.left + (rect.width - tooltipRect.width) / 2;
            }

            // 确保提示框在视口内
            top = Math.max(spacing, Math.min(top, window.innerHeight - tooltipRect.height - spacing));
            left = Math.max(spacing, Math.min(left, window.innerWidth - tooltipRect.width - spacing));

            this.tooltip.style.top = `${top}px`;
            this.tooltip.style.left = `${left}px`;
        }

        next() {
            if (this.currentStep < guideSteps.length - 1) {
                this.showStep(this.currentStep + 1);
            } else {
                this.complete();
            }
        }

        prev() {
            if (this.currentStep > 0) {
                this.showStep(this.currentStep - 1);
            }
        }

        skip() {
            if (confirm(this.lang === 'zh' ? '确定要跳过引导吗？' : 'Skip the guide?')) {
                this.complete();
            }
        }

        close() {
            this.skip();
        }

        complete() {
            localStorage.setItem(GUIDE_KEY, GUIDE_VERSION);
            this.cleanup();
        }

        cleanup() {
            if (this.overlay) {
                this.overlay.remove();
                this.overlay = null;
            }
            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip = null;
            }
            document.querySelectorAll('.guide-highlight').forEach(el => {
                el.classList.remove('guide-highlight');
            });
        }
    }

    // 导出到全局
    window.GuideSystem = GuideSystem;

    // 页面加载完成后自动启动
    window.addEventListener('load', () => {
        setTimeout(() => {
            const guide = new GuideSystem();
            guide.start();
        }, 500);
    });

    // 提供手动启动的方法
    window.startGuide = function() {
        localStorage.removeItem(GUIDE_KEY);
        const guide = new GuideSystem();
        guide.start();
    };
})();
