(function () {
    const startBtn = document.getElementById("start-btn");
    const samplePicker = document.getElementById("sample-picker");
    const sampleIndexInput = document.getElementById("sample-index");
    const taskPicker = document.getElementById("task-picker");
    const taskIdInput = document.getElementById("task-id");

    function escapeHtml(t) {
        if (!t) return "";
        const d = document.createElement("div");
        d.textContent = t;
        return d.innerHTML;
    }

    function getSelectedSample() {
        if (sampleIndexInput) return sampleIndexInput.value;
        return "";
    }

    function getSelectedTask() {
        if (taskIdInput) return taskIdInput.value;
        return "bead";
    }

    const FALLBACK_TASK_LIST = [
        { id: "bead", blurb: "珠状结构数量与大小" },
        { id: "cellbody", blurb: "CEP、ADE 细胞体" },
        { id: "dendrite", blurb: "树突长度" },
        { id: "morphology", blurb: "断裂、增生、弯曲" },
    ];

    const TASK_ICONS = {
        bead: '<svg class="task-card__svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="7" cy="19" r="2.3"/><circle cx="13" cy="17" r="2.3"/><circle cx="19" cy="19" r="2.3"/><circle cx="25" cy="16" r="1.8"/></svg>',
        cellbody:
            '<svg class="task-card__svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="15" r="4.2"/><circle cx="21" cy="13" r="3.2"/></svg>',
        dendrite:
            '<svg class="task-card__svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 25c0-3 1.5-3.5 2.5-1.5l2.5 3.5c.8 1.2 2.2 1 3-.3l1.5-2.2c.7-1 2-1 2.8.3l1.2 1.2"/><circle cx="7" cy="25" r="1.4" fill="currentColor" stroke="none"/></svg>',
        morphology:
            '<svg class="task-card__svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 5 L28 25 H4 L16 5z"/><line x1="16" y1="12" x2="16" y2="19" stroke-width="2"/><circle cx="16" cy="22" r="1" fill="currentColor" stroke="none"/></svg>',
        bsr:
            '<svg class="task-card__svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M16 4v4m0 16v4M4 16h4m16 0h4M8.5 8.5l2.8 2.8m9.4 9.4l2.8 2.8M23.5 8.5l-2.8 2.8m-9.4 9.4l-2.8 2.8"/><circle cx="16" cy="16" r="5"/></svg>',
    };

    function initSamplePicker() {
        if (!samplePicker) return;
        if (typeof NMI_SAMPLES === "undefined" || !NMI_SAMPLES.length) {
            samplePicker.innerHTML =
                '<p class="sample-picker__fallback">无法加载样本数据。请确保已包含 data.js 且路径正确。</p>';
            return;
        }

        samplePicker.textContent = "";
        NMI_SAMPLES.forEach(function (s, i) {
            const sampleName = typeof nmiGetSampleName === "function" ? nmiGetSampleName(s) : (s.name || "");
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "sample-card";
            btn.setAttribute("role", "radio");
            btn.setAttribute("aria-checked", "false");
            btn.setAttribute("aria-label", sampleName + "，编号 " + (i + 1));
            btn.dataset.index = String(i);

            const num = String(i + 1).padStart(2, "0");

            btn.innerHTML =
                '<span class="sample-card__inner">' +
                '<span class="sample-card__thumb-wrap">' +
                '<img class="sample-card__thumb" src="' +
                String(s.original).replace(/"/g, "&quot;") +
                '" alt="" loading="lazy" decoding="async" width="200" height="150" />' +
                '<span class="sample-card__badge" aria-hidden="true">#' +
                num +
                "</span>" +
                "</span>" +
                '<span class="sample-card__meta">' +
                '<span class="sample-card__name">' +
                escapeHtml(sampleName) +
                "</span>" +
                "<span class=\"sample-card__sub\" data-i18n=\"sample_sub\">原始图像预览</span>" +
                "</span>" +
                "</span>";

            btn.addEventListener("click", function () {
                selectSample(i);
            });
            samplePicker.appendChild(btn);
        });
    }

    function selectSample(i) {
        if (!samplePicker) return;
        if (sampleIndexInput) sampleIndexInput.value = String(i);
        const cards = samplePicker.querySelectorAll(".sample-card");
        cards.forEach(function (el, j) {
            const on = j === i;
            el.classList.toggle("sample-card--selected", on);
            el.setAttribute("aria-checked", on ? "true" : "false");
        });
        if (cards[i]) {
            try {
                cards[i].scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
            } catch (e) {}
        }
    }

    /** 先使用 index.html 内嵌的任务卡；若无则根据 data 动态生成（不先清空内嵌卡） */
    function initTaskPicker() {
        if (!taskPicker) return;
        if (!taskIdInput) return;

        let staticCards = taskPicker.querySelectorAll(".task-card[data-task-id]");

        if (staticCards.length) {
            staticCards.forEach(function (el) {
                const id = el.getAttribute("data-task-id");
                if (!id) return;
                el.addEventListener("click", function () {
                    selectTask(id);
                });
            });
            if (taskIdInput.value) selectTask(taskIdInput.value);
            return;
        }

        if (typeof NMI_TASKS === "undefined" || typeof NMI_TASK_LIST === "undefined") {
            taskPicker.innerHTML =
                '<p class="sample-picker__fallback">无法加载任务配置。请检查 data.js 是否已成功加载，或刷新页面重试。</p>';
            return;
        }

        const list =
            NMI_TASK_LIST && NMI_TASK_LIST.length ? NMI_TASK_LIST : FALLBACK_TASK_LIST;
        const labelKeys = {
            bead: "task_bead_l",
            cellbody: "task_cell_l",
            dendrite: "task_dend_l",
            morphology: "task_morph_l",
            bsr: "task_bsr_l",
        };
        const blurbKeys = {
            bead: "task_bead_b",
            cellbody: "task_cell_b",
            dendrite: "task_dend_b",
            morphology: "task_morph_b",
            bsr: "task_bsr_b",
        };
        let html = "";
        list.forEach(function (row) {
            const meta = NMI_TASKS[row.id];
            if (!meta) return;
            const icon = TASK_ICONS[row.id] || TASK_ICONS.bead;
            const sel = row.id === "bead" ? " task-card--selected" : "";
            const checked = row.id === "bead" ? "true" : "false";
            const lk = labelKeys[row.id] || "task_bead_l";
            const bk = blurbKeys[row.id] || "task_bead_b";
            html +=
                '<button type="button" class="task-card' +
                sel +
                '" role="radio" aria-checked="' +
                checked +
                '" data-task-id="' +
                row.id +
                '" data-i18n-aria="' +
                lk +
                '">' +
                '<span class="task-card__inner"><span class="task-card__icon" aria-hidden="true">' +
                icon +
                '</span><span class="task-card__body"><span class="task-card__label" data-i18n="' +
                lk +
                '">' +
                escapeHtml(meta.label) +
                '</span><span class="task-card__blurb" data-i18n="' +
                bk +
                '">' +
                escapeHtml(row.blurb) +
                "</span></span></span></button>";
        });
        if (!html) {
            taskPicker.innerHTML =
                '<p class="sample-picker__fallback">任务列表为空。请检查 data.js 中的 NMI_TASK_LIST 与 NMI_TASKS。</p>';
            return;
        }
        taskPicker.innerHTML = html;
        staticCards = taskPicker.querySelectorAll(".task-card[data-task-id]");
        staticCards.forEach(function (el) {
            const id = el.getAttribute("data-task-id");
            if (!id) return;
            el.addEventListener("click", function () {
                selectTask(id);
            });
        });
        if (taskIdInput.value) selectTask(taskIdInput.value);
    }

    function selectTask(id) {
        if (!taskPicker || !taskIdInput) return;
        taskIdInput.value = id;
        const cards = taskPicker.querySelectorAll(".task-card");
        cards.forEach(function (el) {
            const elId = el.getAttribute("data-task-id") || (el.dataset && el.dataset.taskId) || "";
            const on = elId === id;
            el.classList.toggle("task-card--selected", on);
            el.setAttribute("aria-checked", on ? "true" : "false");
        });
    }

    function boot() {
        initSamplePicker();
        initTaskPicker();
        if (window.NMI_i18n) {
            NMI_i18n.applyDocument();
            document.title = NMI_i18n.t("page_title_home");
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }

    if (!startBtn) return;

    startBtn.addEventListener("click", function () {
        const sample = getSelectedSample();
        const task = getSelectedTask();
        if (sample === "" || sample === null || sample === undefined) {
            var firstCard = samplePicker ? samplePicker.querySelector(".sample-card") : null;
            if (firstCard) {
                firstCard.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
                samplePicker.style.transition = "box-shadow 0.3s ease";
                samplePicker.style.boxShadow = "0 0 0 3px " + getComputedStyle(document.documentElement).getPropertyValue("--primary");
                setTimeout(function() { samplePicker.style.boxShadow = ""; }, 1200);
            }
            return;
        }
        if (task === "" || task === null || task === undefined) {
            var firstTask = taskPicker ? taskPicker.querySelector(".task-card") : null;
            if (firstTask) {
                firstTask.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
                taskPicker.style.transition = "box-shadow 0.3s ease";
                taskPicker.style.boxShadow = "0 0 0 3px " + getComputedStyle(document.documentElement).getPropertyValue("--primary");
                setTimeout(function() { taskPicker.style.boxShadow = ""; }, 1200);
            }
            return;
        }
        try {
            sessionStorage.removeItem("nmi-workspace");
        } catch (e) {}
        window.location.href =
            "analysis.html?sample=" + encodeURIComponent(sample) + "&task=" + encodeURIComponent(task);
    });

    /* ---- BSR Calculation Preview ---- */
    var bsrPreview = document.getElementById("bsr-preview");

    function bsrT() {
        return (window.NMI_i18n && NMI_i18n.t) || function(k) { return k; };
    }

    function fmt(v) {
        return v.toFixed(6);
    }

    function fmtScore(v) {
        return v.toFixed(4);
    }

    function renderBsrPreview() {
        if (!bsrPreview) return;
        var raw = sampleIndexInput ? sampleIndexInput.value : "";
        if (raw === "" || raw === null || raw === undefined) {
            bsrPreview.innerHTML =
                '<div class="bsr-preview-card bsr-preview-card--placeholder">' +
                '<p class="bsr-preview-placeholder" data-i18n="bsr_select_prompt">请先选择一个样本以查看 BSR 评分计算演示。</p>' +
                '</div>';
            if (window.NMI_i18n) NMI_i18n.applyElement(bsrPreview);
            return;
        }
        var idx = parseInt(raw, 10);
        var sample = NMI_SAMPLES[idx];
        if (!sample || !sample.bsr) return;
        var bsr = sample.bsr;
        var t = bsrT();
        var name = typeof nmiGetSampleName === "function" ? nmiGetSampleName(sample) : ("Sample " + (idx + 1));

        var metrics = [
            { key: "bsr_metric_00", descKey: "bsr_metric_00_desc", raw: bsr.bsr00, norm: bsr.bsr00Norm, weight: 2, wClass: "bsr-metric-card--w2" },
            { key: "bsr_metric_onoff", descKey: "bsr_metric_onoff_desc", raw: bsr.bsrOnoff, norm: bsr.bsrOnoffNorm, weight: 1, wClass: "bsr-metric-card--w1" },
            { key: "bsr_metric_diff", descKey: "bsr_metric_diff_desc", raw: bsr.bsrDiff, norm: bsr.bsrDiffNorm, weight: 1, wClass: "bsr-metric-card--w1" },
        ];

        var cardsHtml = metrics.map(function(m) {
            return '<div class="bsr-metric-card ' + m.wClass + '">' +
                '<span class="bsr-metric-card__label">' + escapeHtml(t(m.key)) + '</span>' +
                '<span class="bsr-metric-card__desc">' + escapeHtml(t(m.descKey)) + '</span>' +
                '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:0.25rem;">' +
                '<span class="bsr-metric-card__value">' + fmt(m.raw) + '</span>' +
                '<span style="font-size:0.625rem;color:var(--muted-foreground);">→ ' + fmt(m.norm) + '</span>' +
                '</div>' +
                '</div>';
        }).join("");

        bsrPreview.innerHTML =
            '<div class="bsr-preview-card">' +
            '<div class="bsr-preview-card__header">' +
            '<span class="bsr-preview-card__sample">' + escapeHtml(name) + '</span>' +
            '<span class="bsr-preview-card__score">BSR Score: <strong>' + fmtScore(bsr.bsrScore) + '</strong></span>' +
            '</div>' +
            '<div class="bsr-metrics-row" style="margin-bottom:0.85rem;">' + cardsHtml + '</div>' +
            '<div class="bsr-workspace__formula-wrap">' +
            '<div class="bsr-workspace__equation" style="font-size:0.75rem;padding:0.5rem 0.75rem;">' +
            escapeHtml(t("bsr_formula_expr")) +
            '</div>' +
            '</div>' +
            '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:0.75rem;gap:0.75rem;">' +
            '<span style="font-family:JetBrains Mono,monospace;font-size:0.75rem;color:var(--muted-foreground);">' +
            '2 × ' + fmt(bsr.bsr00Norm) + ' + ' + fmt(bsr.bsrOnoffNorm) + ' + ' + fmt(bsr.bsrDiffNorm) +
            ' = <strong style="color:var(--primary);">' + fmtScore(bsr.bsrScore) + '</strong>' +
            '</span>' +
            '<a class="btn btn-primary btn-sm" id="bsr-start-btn" href="#" style="white-space:nowrap;flex-shrink:0;">' +
            escapeHtml(t("start")) + ' →' +
            '</a>' +
            '</div>' +
            '</div>';

        // Wire up the start button
        var btn = document.getElementById("bsr-start-btn");
        if (btn) {
            btn.addEventListener("click", function(e) {
                e.preventDefault();
                try { sessionStorage.removeItem("nmi-workspace"); } catch (ex) {}
                window.location.href = "analysis.html?sample=" + encodeURIComponent(idx) + "&task=bsr";
            });
        }
    }

    function initBsrDemo() {
        if (!bsrPreview) return;
        renderBsrPreview();
    }

    // Initialize after boot
    var _origBoot = boot;
    boot = function() {
        _origBoot();
        initBsrDemo();
    };

    // Sync BSR preview when sample selection changes
    if (samplePicker && sampleIndexInput) {
        var _origSelectSample = selectSample;
        selectSample = function(i) {
            _origSelectSample(i);
            if (bsrPreview) renderBsrPreview();
        };
    }
})();
