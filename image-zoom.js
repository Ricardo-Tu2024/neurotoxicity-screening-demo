// 图片缩放功能
(function() {
    'use strict';

    class ImageZoom {
        constructor(container) {
            this.container = container;
            this.image = container.querySelector('img');
            if (!this.image) return;

            this.scale = 1;
            this.minScale = 0.5;
            this.maxScale = 5;
            this.translateX = 0;
            this.translateY = 0;
            this.isDragging = false;
            this.startX = 0;
            this.startY = 0;

            this.init();
        }

        init() {
            // 添加缩放控制按钮
            this.addControls();

            // 绑定事件
            this.bindEvents();

            // 初始化样式
            this.image.style.transition = 'transform 0.3s ease';
            this.image.style.cursor = 'grab';
        }

        addControls() {
            const controls = document.createElement('div');
            controls.className = 'image-zoom-controls';
            controls.innerHTML = `
                <button class="zoom-btn zoom-in" title="放大" aria-label="放大">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="M21 21l-4.35-4.35"></path>
                        <line x1="11" y1="8" x2="11" y2="14"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                </button>
                <button class="zoom-btn zoom-out" title="缩小" aria-label="缩小">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="M21 21l-4.35-4.35"></path>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                </button>
                <button class="zoom-btn zoom-reset" title="重置" aria-label="重置">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                        <path d="M21 3v5h-5"></path>
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                        <path d="M3 21v-5h5"></path>
                    </svg>
                </button>
                <span class="zoom-level">100%</span>
            `;

            this.container.style.position = 'relative';
            this.container.appendChild(controls);

            // 绑定按钮事件
            controls.querySelector('.zoom-in').addEventListener('click', () => this.zoomIn());
            controls.querySelector('.zoom-out').addEventListener('click', () => this.zoomOut());
            controls.querySelector('.zoom-reset').addEventListener('click', () => this.reset());

            this.zoomLevelDisplay = controls.querySelector('.zoom-level');
        }

        bindEvents() {
            // 鼠标滚轮缩放
            this.container.addEventListener('wheel', (e) => {
                e.preventDefault();
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                this.zoom(delta, e.clientX, e.clientY);
            }, { passive: false });

            // 拖拽
            this.image.addEventListener('mousedown', (e) => {
                if (this.scale <= 1) return;
                e.preventDefault();
                this.isDragging = true;
                this.startX = e.clientX - this.translateX;
                this.startY = e.clientY - this.translateY;
                this.image.style.cursor = 'grabbing';
                this.image.style.transition = 'none';
            });

            document.addEventListener('mousemove', (e) => {
                if (!this.isDragging) return;
                e.preventDefault();
                this.translateX = e.clientX - this.startX;
                this.translateY = e.clientY - this.startY;
                this.updateTransform();
            });

            document.addEventListener('mouseup', () => {
                if (this.isDragging) {
                    this.isDragging = false;
                    this.image.style.cursor = 'grab';
                    this.image.style.transition = 'transform 0.3s ease';
                }
            });

            // 双击重置
            this.image.addEventListener('dblclick', () => {
                this.reset();
            });

            // 触摸支持
            let touchStartDistance = 0;
            let touchStartScale = 1;

            this.container.addEventListener('touchstart', (e) => {
                if (e.touches.length === 2) {
                    e.preventDefault();
                    const touch1 = e.touches[0];
                    const touch2 = e.touches[1];
                    touchStartDistance = Math.hypot(
                        touch2.clientX - touch1.clientX,
                        touch2.clientY - touch1.clientY
                    );
                    touchStartScale = this.scale;
                }
            }, { passive: false });

            this.container.addEventListener('touchmove', (e) => {
                if (e.touches.length === 2) {
                    e.preventDefault();
                    const touch1 = e.touches[0];
                    const touch2 = e.touches[1];
                    const touchDistance = Math.hypot(
                        touch2.clientX - touch1.clientX,
                        touch2.clientY - touch1.clientY
                    );
                    const delta = (touchDistance - touchStartDistance) / 100;
                    this.scale = Math.max(this.minScale, Math.min(this.maxScale, touchStartScale + delta));
                    this.updateTransform();
                    this.updateZoomLevel();
                }
            }, { passive: false });
        }

        zoom(delta, centerX, centerY) {
            const oldScale = this.scale;
            this.scale = Math.max(this.minScale, Math.min(this.maxScale, this.scale + delta));

            if (this.scale !== oldScale && centerX !== undefined && centerY !== undefined) {
                // 以鼠标位置为中心缩放
                const rect = this.container.getBoundingClientRect();
                const offsetX = centerX - rect.left - rect.width / 2;
                const offsetY = centerY - rect.top - rect.height / 2;

                this.translateX -= offsetX * delta;
                this.translateY -= offsetY * delta;
            }

            if (this.scale <= 1) {
                this.translateX = 0;
                this.translateY = 0;
                this.image.style.cursor = 'grab';
            }

            this.updateTransform();
            this.updateZoomLevel();
        }

        zoomIn() {
            this.zoom(0.2);
        }

        zoomOut() {
            this.zoom(-0.2);
        }

        reset() {
            this.scale = 1;
            this.translateX = 0;
            this.translateY = 0;
            this.image.style.transition = 'transform 0.3s ease';
            this.updateTransform();
            this.updateZoomLevel();
        }

        updateTransform() {
            this.image.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
        }

        updateZoomLevel() {
            if (this.zoomLevelDisplay) {
                this.zoomLevelDisplay.textContent = `${Math.round(this.scale * 100)}%`;
            }
        }
    }

    // 自动初始化所有图片容器
    function initImageZoom() {
        // 工作区图片
        const workspaceImages = document.querySelectorAll('.workspace-canvas, .preprocessed-image-wrap, .result-canvas');
        workspaceImages.forEach(container => {
            if (container.querySelector('img')) {
                new ImageZoom(container);
            }
        });
    }

    // 导出到全局
    window.ImageZoom = ImageZoom;
    window.initImageZoom = initImageZoom;

    // 页面加载时初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initImageZoom);
    } else {
        initImageZoom();
    }
})();
