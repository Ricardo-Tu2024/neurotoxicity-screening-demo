/**
 * NMI 数据可视化 - 使用 Chart.js 渲染指标图表
 */
(function () {
    'use strict';

    let chartInstance = null;

    const COLORS = {
        primary: 'oklch(0.65 0.19 250)',
        chart2: 'oklch(0.7 0.15 170)',
        accent: 'oklch(0.7 0.12 80)',
        morph: 'oklch(0.7 0.16 32)',
        grid: 'oklch(0.26 0.012 260)',
        text: 'oklch(0.62 0.015 260)',
    };

    function isDark() {
        return document.documentElement.classList.contains('dark');
    }

    function getColors() {
        const dark = isDark();
        return {
            grid: dark ? 'oklch(0.3 0.01 260)' : 'oklch(0.85 0.01 260)',
            text: dark ? 'oklch(0.62 0.015 260)' : 'oklch(0.4 0.02 260)',
            primary: dark ? 'oklch(0.65 0.19 250)' : 'oklch(0.55 0.2 250)',
            chart2: dark ? 'oklch(0.7 0.15 170)' : 'oklch(0.5 0.18 170)',
            surface: dark ? 'oklch(0.19 0.008 260)' : 'oklch(0.98 0.002 260)',
        };
    }

    /**
     * 为当前任务和样本渲染雷达图
     * @param {string} taskId - 当前任务 ID
     * @param {object} metrics - 当前样本的指标数据
     * @param {string|HTMLElement} container - 容器元素或选择器
     */
    function renderTaskChart(taskId, metrics, container) {
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js not loaded, skipping chart render');
            return;
        }

        const el = typeof container === 'string' ? document.querySelector(container) : container;
        if (!el) return;

        // 清理旧 chart
        if (chartInstance) {
            chartInstance.destroy();
            chartInstance = null;
        }

        const c = getColors();
        const config = getChartConfig(taskId, metrics, c);

        if (!config) {
            el.innerHTML = '';
            return;
        }

        // 创建 canvas
        el.innerHTML = '';
        const canvas = document.createElement('canvas');
        canvas.id = 'nmi-task-chart';
        el.appendChild(canvas);

        const ctx = canvas.getContext('2d');

        Chart.defaults.color = c.text;
        Chart.defaults.borderColor = c.grid;

        chartInstance = new Chart(ctx, {
            type: config.type,
            data: config.data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            padding: 16,
                            usePointStyle: true,
                            font: { family: 'Inter, system-ui, sans-serif', size: 12 },
                        },
                    },
                    tooltip: {
                        backgroundColor: isDark() ? 'oklch(0.17 0.008 260)' : 'oklch(1 0 0)',
                        titleColor: isDark() ? 'oklch(0.93 0.005 260)' : 'oklch(0.15 0.01 260)',
                        bodyColor: isDark() ? 'oklch(0.82 0.01 260)' : 'oklch(0.4 0.02 260)',
                        borderColor: isDark() ? 'oklch(0.26 0.012 260)' : 'oklch(0.88 0.01 260)',
                        borderWidth: 1,
                        padding: 10,
                        cornerRadius: 8,
                    },
                },
                scales: config.scales || {},
            },
        });
    }

    function t(key) {
        if (window.NMI_i18n && typeof NMI_i18n.t === 'function') return NMI_i18n.t(key);
        return key;
    }

    function getChartConfig(taskId, m, c) {
        switch (taskId) {
            case 'bead':
                return {
                    type: 'bar',
                    data: {
                        labels: [t('m_bead_n'), t('m_bead_s')],
                        datasets: [{
                            label: t('task_bead_l'),
                            data: [m.beadCount, m.beadSize],
                            backgroundColor: [c.primary + ' / 0.7', c.chart2 + ' / 0.7'],
                            borderColor: [c.primary, c.chart2],
                            borderWidth: 2,
                            borderRadius: 6,
                        }],
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: c.grid },
                            ticks: { color: c.text, font: { family: 'JetBrains Mono, monospace', size: 11 } },
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: c.text, font: { family: 'Inter, system-ui, sans-serif', size: 11 } },
                        },
                    },
                };

            case 'cellbody':
                return {
                    type: 'radar',
                    data: {
                        labels: [t('m_cep_n'), t('m_cep_s'), t('m_ade_n'), t('m_ade_s')],
                        datasets: [{
                            label: t('task_cell_l'),
                            data: [m.cepCount, m.cepSize / 100, m.adeCount, m.adeSize / 100],
                            backgroundColor: c.primary + ' / 0.2',
                            borderColor: c.primary,
                            borderWidth: 2,
                            pointBackgroundColor: c.primary,
                            pointBorderColor: c.surface,
                            pointBorderWidth: 2,
                            pointRadius: 5,
                        }],
                    },
                    scales: {
                        r: {
                            beginAtZero: true,
                            grid: { color: c.grid },
                            angleLines: { color: c.grid },
                            pointLabels: { color: c.text, font: { family: 'Inter, system-ui, sans-serif', size: 11 } },
                            ticks: {
                                backdropColor: 'transparent',
                                color: c.text,
                                font: { family: 'JetBrains Mono, monospace', size: 10 },
                            },
                        },
                    },
                };

            case 'dendrite':
                return {
                    type: 'bar',
                    data: {
                        labels: [t('m_dend')],
                        datasets: [{
                            label: t('task_dend_l'),
                            data: [m.dendriteLength],
                            backgroundColor: c.primary + ' / 0.7',
                            borderColor: c.primary,
                            borderWidth: 2,
                            borderRadius: 6,
                            barPercentage: 0.4,
                        }],
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: c.grid },
                            ticks: { color: c.text, font: { family: 'JetBrains Mono, monospace', size: 11 } },
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: c.text, font: { family: 'Inter, system-ui, sans-serif', size: 11 } },
                        },
                    },
                };

            case 'morphology':
                const okCount = [m.breakStatus, m.arborizationStatus, m.bendStatus]
                    .filter(s => s === t('st_normal')).length;
                return {
                    type: 'doughnut',
                    data: {
                        labels: [t('chart_normal'), t('chart_abnormal')],
                        datasets: [{
                            data: [okCount, 3 - okCount],
                            backgroundColor: [c.chart2 + ' / 0.8', 'oklch(0.65 0.2 25 / 0.8)'],
                            borderColor: [c.chart2, 'oklch(0.65 0.2 25)'],
                            borderWidth: 2,
                        }],
                    },
                    scales: {},
                };

            default:
                return null;
        }
    }

    function destroyChart() {
        if (chartInstance) {
            chartInstance.destroy();
            chartInstance = null;
        }
    }

    // 暴露 API
    window.NMI_Chart = {
        renderTaskChart: renderTaskChart,
        destroy: destroyChart,
    };
})();
