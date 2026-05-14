// 渐进式展示动画系统
(function() {
    'use strict';

    // 配置选项
    const config = {
        threshold: 0.1,        // 元素进入视口多少比例时触发
        rootMargin: '0px 0px -50px 0px',  // 提前触发的边距
        animationDelay: 100    // 每个元素之间的延迟（毫秒）
    };

    // 创建 Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 获取元素的延迟时间
                const delay = entry.target.dataset.revealDelay || 0;

                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);

                // 一旦显示就停止观察
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: config.threshold,
        rootMargin: config.rootMargin
    });

    // 初始化渐进式展示
    function initScrollReveal() {
        // 选择需要渐进式展示的元素
        const revealElements = document.querySelectorAll('.reveal-on-scroll');

        revealElements.forEach((element, index) => {
            // 添加初始隐藏类
            element.classList.add('reveal-hidden');

            // 设置延迟时间（如果没有手动设置）
            if (!element.dataset.revealDelay) {
                element.dataset.revealDelay = index * config.animationDelay;
            }

            // 开始观察
            observer.observe(element);
        });
    }

    // 页面加载时初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollReveal);
    } else {
        initScrollReveal();
    }

    // 导出函数供外部调用
    window.NMI_ScrollReveal = {
        init: initScrollReveal,
        observer: observer
    };
})();
