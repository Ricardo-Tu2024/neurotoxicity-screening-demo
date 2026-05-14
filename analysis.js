(function () {
    let sampleIndex = 0;
    let taskId = "bead";
    /** @type {'empty' | 'preprocessed' | 'result'} */
    let phase = "empty";
    let preprocessedSlideIndex = 0;

    const originalImg = document.getElementById("workspace-original");
    const rightEmpty = document.getElementById("right-empty");
    const rightPreprocessed = document.getElementById("right-preprocessed");
    const rightResult = document.getElementById("right-result");
    const preprocessedImage = document.getElementById("preprocessed-image");
    const preprocessedCaption = document.getElementById("preprocessed-caption");
    const preprocessedIndicator = document.getElementById("preprocessed-indicator");
    const preprocessedPrev = document.getElementById("preprocessed-prev");
    const preprocessedNext = document.getElementById("preprocessed-next");
    const resultImage = document.getElementById("result-image");
    const resultMetrics = document.getElementById("result-metrics");
    const actionBtn = document.getElementById("action-btn");
    const backStepBtn = document.getElementById("back-step-btn");
    const workspaceSubtitle = document.getElementById("workspace-subtitle");
    const rightPaneHeading = document.getElementById("right-pane-heading");
    const sampleSwitcher = document.getElementById("sample-switcher");
    const taskSwitcher = document.getElementById("task-switcher");

    function t(key) {
        if (window.NMI_i18n && typeof NMI_i18n.t === "function") {
            return NMI_i18n.t(key);
        }
        return key;
    }

    /** 与 i18n 中 btn_back_step 一致；若翻译未加载则回退，避免界面上出现键名 */
    function backStepButtonLabel() {
        var s = t("btn_back_step");
        if (s !== "btn_back_step") return s;
        var lang =
            window.NMI_i18n && typeof NMI_i18n.getLang === "function" ? NMI_i18n.getLang() : "en";
        return lang === "en" ? "Previous step" : "返回上一步";
    }

    function taskLabel() {
        if (window.NMI_i18n && typeof NMI_i18n.taskLabel === "function") {
            return NMI_i18n.taskLabel(taskId);
        }
        return getTask().label;
    }

    var WORKSPACE_KEY = "nmi-workspace";

    function saveWorkspaceState() {
        try {
            sessionStorage.setItem(
                WORKSPACE_KEY,
                JSON.stringify({
                    sample: sampleIndex,
                    task: taskId,
                    phase: phase,
                    preSlide: preprocessedSlideIndex,
                })
            );
        } catch (e) {}
    }

    function loadWorkspaceState() {
        try {
            var raw = sessionStorage.getItem(WORKSPACE_KEY);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (e) {
            return null;
        }
    }

    function parseQuery() {
        const params = new URLSearchParams(window.location.search);
        const s = params.get("sample");
        const tt = params.get("task");
        const si = s !== null ? parseInt(s, 10) : NaN;
        if (Number.isNaN(si) || si < 0 || si >= NMI_SAMPLES.length) return null;
        if (!tt || !NMI_TASKS[tt]) return null;
        return { sample: si, task: tt };
    }

    function redirectHome() {
        window.location.href = "index.html";
    }

    function getSample() {
        return NMI_SAMPLES[sampleIndex];
    }

    function getTask() {
        return NMI_TASKS[taskId];
    }

    function refreshHeaders() {
        const sample = getSample();
        const sampleName = typeof nmiGetSampleName === "function" ? nmiGetSampleName(sample) : (sample.name || "");
        rightPaneHeading.textContent = t("result_heading") + " · " + taskLabel();
    }

    function populateSwitchers() {
        // Populate sample switcher
        sampleSwitcher.innerHTML = "";
        NMI_SAMPLES.forEach((sample, index) => {
            const option = document.createElement("option");
            option.value = index;
            const sampleName = typeof nmiGetSampleName === "function" ? nmiGetSampleName(sample) : (sample.name || `Sample ${index + 1}`);
            option.textContent = sampleName;
            if (index === sampleIndex) {
                option.selected = true;
            }
            sampleSwitcher.appendChild(option);
        });

        // Populate task switcher
        taskSwitcher.innerHTML = "";
        Object.keys(NMI_TASKS).forEach((key) => {
            const task = NMI_TASKS[key];
            const option = document.createElement("option");
            option.value = key;
            option.textContent = window.NMI_i18n && typeof NMI_i18n.taskLabel === "function" ? NMI_i18n.taskLabel(key) : task.label;
            if (key === taskId) {
                option.selected = true;
            }
            taskSwitcher.appendChild(option);
        });
    }

    function switchSampleOrTask(newSampleIndex, newTaskId) {
        sampleIndex = newSampleIndex;
        taskId = newTaskId;

        // Update original image
        const sample = getSample();
        originalImg.src = sample.original;
        const sampleName = typeof nmiGetSampleName === "function" ? nmiGetSampleName(sample) : (sample.name || "");
        originalImg.alt = sampleName + " " + t("orig_alt");

        // Refresh headers
        refreshHeaders();

        // Reset to empty phase
        setPhase("empty");

        // Update switcher selections
        sampleSwitcher.value = sampleIndex;
        taskSwitcher.value = taskId;
    }

    /**
     * @param next {'empty' | 'preprocessed' | 'result'}
     * @param options {{ preservePreSlide?: boolean } | undefined} 为 true 时进入预处理阶段不重置翻页索引（用于从 session 恢复或返回）
     */
    function setPhase(next, options) {
        var preservePreSlide = options && options.preservePreSlide;
        phase = next;
        const showEmpty = next === "empty";
        const showPre = next === "preprocessed";
        const showRes = next === "result";

        rightEmpty.hidden = !showEmpty;
        rightPreprocessed.hidden = !showPre;
        rightResult.hidden = !showRes;

        if (showPre) {
            if (!preservePreSlide) {
                preprocessedSlideIndex = 0;
            }
            updatePreprocessedSlide();
        }
        if (showRes) {
            const sample = getSample();
            const key = getTask().resultKey;
            resultImage.src = sample.results[key];
            resultImage.alt = taskLabel() + t("result_alt_suffix");
            setupImageLoading(resultImage, resultImage.closest(".image-container"));
            renderMetrics(sample.metrics);
            renderChart(sample.metrics);
        }

        syncActionButton();
        saveWorkspaceState();
    }

    function syncActionButton() {
        if (phase === "empty") {
            actionBtn.textContent = t("btn_preprocess");
            actionBtn.disabled = false;
            actionBtn.classList.remove("btn-secondary");
            actionBtn.classList.add("btn-primary");
        } else if (phase === "preprocessed") {
            actionBtn.textContent = t("btn_result");
            actionBtn.disabled = false;
            actionBtn.classList.remove("btn-secondary");
            actionBtn.classList.add("btn-primary");
        } else {
            actionBtn.textContent = t("btn_reset");
            actionBtn.disabled = false;
            actionBtn.classList.remove("btn-primary");
            actionBtn.classList.add("btn-secondary");
        }
        if (backStepBtn) {
            var bsl = backStepButtonLabel();
            backStepBtn.textContent = bsl;
            backStepBtn.setAttribute("aria-label", bsl);
            backStepBtn.hidden = phase === "empty";
            backStepBtn.disabled = actionBtn.disabled;
        }
        const exportBtn = document.getElementById("export-btn");
        if (exportBtn) {
            exportBtn.hidden = phase !== "result";
            exportBtn.title = t("m_export_hint") || "Shift+点击导出所有样本";
        }
    }

    function updatePreprocessedSlide() {
        const sample = getSample();
        const slides = nmiGetPreprocessedSlides(sample);
        if (!slides.length) {
            preprocessedImage.removeAttribute("src");
            if (preprocessedCaption) preprocessedCaption.textContent = "";
            if (preprocessedIndicator) preprocessedIndicator.textContent = "0 / 0";
            syncPreprocessedPager();
            saveWorkspaceState();
            return;
        }
        const i = Math.max(0, Math.min(preprocessedSlideIndex, slides.length - 1));
        preprocessedSlideIndex = i;
        const slide = slides[i];
        preprocessedImage.src = slide.src;
        preprocessedImage.alt = slide.label || t("pre_alt");
        setupImageLoading(preprocessedImage, preprocessedImage.closest(".image-container"));
        if (preprocessedCaption) preprocessedCaption.textContent = slide.label || "";
        if (preprocessedIndicator) preprocessedIndicator.textContent = i + 1 + " / " + slides.length;
        syncPreprocessedPager();
        saveWorkspaceState();
    }

    function syncPreprocessedPager() {
        const sample = getSample();
        const slides = nmiGetPreprocessedSlides(sample);
        const n = slides.length;
        const viewer = document.querySelector("#right-preprocessed .preprocessed-viewer");
        if (viewer) viewer.classList.toggle("preprocessed-viewer--single", n <= 1);
        const canPrev = n > 1 && preprocessedSlideIndex > 0;
        const canNext = n > 1 && preprocessedSlideIndex < n - 1;
        if (preprocessedPrev) {
            preprocessedPrev.disabled = !canPrev;
            preprocessedPrev.setAttribute("aria-disabled", canPrev ? "false" : "true");
        }
        if (preprocessedNext) {
            preprocessedNext.disabled = !canNext;
            preprocessedNext.setAttribute("aria-disabled", canNext ? "false" : "true");
        }
    }

    function goPreprocessedSlide(delta) {
        const sample = getSample();
        const slides = nmiGetPreprocessedSlides(sample);
        if (slides.length <= 1) return;
        preprocessedSlideIndex = Math.max(0, Math.min(preprocessedSlideIndex + delta, slides.length - 1));
        updatePreprocessedSlide();
    }

    function renderMetrics(m) {
        if (!resultMetrics) return;
        if (taskId === "bead") {
            resultMetrics.innerHTML =
                '<div class="metrics task-metrics-block">' +
                metricRow(t("m_bead_n"), m.beadCount) +
                metricRow(t("m_bead_s"), m.beadSize.toFixed(1) + " px²") +
                "</div>";
        } else if (taskId === "cellbody") {
            resultMetrics.innerHTML =
                '<div class="metrics task-metrics-block">' +
                metricRow(t("m_cep_n"), m.cepCount) +
                metricRow(t("m_cep_s"), m.cepSize.toFixed(1) + " px²") +
                metricRow(t("m_ade_n"), m.adeCount) +
                metricRow(t("m_ade_s"), m.adeSize.toFixed(1) + " px²") +
                "</div>";
        } else if (taskId === "dendrite") {
            resultMetrics.innerHTML =
                '<div class="metrics task-metrics-block">' +
                metricRow(t("m_dend"), m.dendriteLength.toFixed(1) + " px") +
                "</div>";
        } else {
            const sd =
                window.NMI_i18n && NMI_i18n.statusDisplay
                    ? NMI_i18n.statusDisplay.bind(NMI_i18n)
                    : function (s) {
                          return s;
                      };
            resultMetrics.innerHTML =
                '<div class="metrics task-metrics-block">' +
                statusRow(t("m_brk"), m.breakStatus, sd) +
                statusRow(t("m_arb"), m.arborizationStatus, sd) +
                statusRow(t("m_bnd"), m.bendStatus, sd) +
                "</div>";
        }
    }

    function metricRow(label, value) {
        return (
            '<div class="metric-item">' +
            '<span class="metric-label">' +
            escapeHtml(label) +
            "</span>" +
            '<span class="metric-value">' +
            escapeHtml(String(value)) +
            "</span></div>"
        );
    }

    function statusRow(label, statusRaw, sd) {
        const display = sd(statusRaw);
        const ok = statusRaw === "正常";
        const cls = ok ? " metric-value--ok" : " metric-value--alert";
        return (
            '<div class="metric-item">' +
            '<span class="metric-label">' +
            escapeHtml(label) +
            "</span>" +
            '<span class="metric-value' +
            cls +
            '">' +
            escapeHtml(display) +
            "</span></div>"
        );
    }

    function renderChart(metrics) {
        const container = document.getElementById("result-chart-container");
        if (!container) return;
        if (window.NMI_Chart && typeof NMI_Chart.renderTaskChart === "function") {
            NMI_Chart.renderTaskChart(taskId, metrics, container);
        }
    }

    function exportCSV() {
        const sample = getSample();
        const sampleName = typeof nmiGetSampleName === "function" ? nmiGetSampleName(sample) : (sample.name || "Sample");
        const m = sample.metrics;

        // Build CSV rows
        const rows = [
            ["指标", "值"],
            ["串珠数量", m.beadCount],
            ["平均串珠大小 (px²)", m.beadSize.toFixed(1)],
            ["CEP 数量", m.cepCount],
            ["平均 CEP 大小 (px²)", m.cepSize.toFixed(1)],
            ["ADE 数量", m.adeCount],
            ["平均 ADE 大小 (px²)", m.adeSize.toFixed(1)],
            ["树突长度 (px)", m.dendriteLength.toFixed(1)],
            ["断裂", m.breakStatus],
            ["增生", m.arborizationStatus],
            ["异常弯曲", m.bendStatus],
        ];

        const csvContent = rows.map(row =>
            row.map(cell => {
                const s = String(cell);
                return s.includes(",") || s.includes('"') ? '"' + s.replace(/"/g, '""') + '"' : s;
            }).join(",")
        ).join("\n");

        const BOM = "﻿";
        const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "NMI_" + sampleName + "_" + taskId + "_" + new Date().toISOString().slice(0, 10) + ".csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function exportAllCSV() {
        const t = window.NMI_i18n && NMI_i18n.t || (k => k);
        const rows = [["样本", "串珠数量", "串珠大小", "CEP数量", "CEP大小", "ADE数量", "ADE大小", "树突长度", "断裂", "增生", "异常弯曲"]];

        NMI_SAMPLES.forEach(function(s) {
            const name = typeof nmiGetSampleName === "function" ? nmiGetSampleName(s) : (s.name || "Sample " + (s.id + 1));
            const m = s.metrics;
            rows.push([
                name,
                String(m.beadCount), m.beadSize.toFixed(1),
                String(m.cepCount), m.cepSize.toFixed(1),
                String(m.adeCount), m.adeSize.toFixed(1),
                m.dendriteLength.toFixed(1),
                m.breakStatus, m.arborizationStatus, m.bendStatus,
            ]);
        });

        const csvContent = rows.map(row =>
            row.map(cell => {
                const s = String(cell);
                return s.includes(",") || s.includes('"') ? '"' + s.replace(/"/g, '""') + '"' : s;
            }).join(",")
        ).join("\n");

        const BOM = "﻿";
        const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "NMI_all_samples_" + new Date().toISOString().slice(0, 10) + ".csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function escapeHtml(s) {
        const d = document.createElement("div");
        d.textContent = s;
        return d.innerHTML;
    }

    function onBackStepClick() {
        if (phase === "preprocessed") {
            setPhase("empty");
        } else if (phase === "result") {
            setPhase("preprocessed");
        }
    }

    function onActionClick() {
        if (phase === "empty") {
            actionBtn.disabled = true;
            actionBtn.textContent = t("btn_generating");
            syncActionButton();
            window.setTimeout(function () {
                setPhase("preprocessed");
            }, 800);
        } else if (phase === "preprocessed") {
            actionBtn.disabled = true;
            actionBtn.textContent = t("btn_resulting");
            syncActionButton();
            window.setTimeout(function () {
                setPhase("result");
            }, 1000);
        } else {
            setPhase("empty");
        }
    }

    // --- 图片加载管理 ---
    function setupImageLoading(imgEl, container) {
        if (!imgEl) return;
        var skeleton = document.createElement("div");
        skeleton.className = "image-skeleton";
        skeleton.style.position = "absolute";
        skeleton.style.inset = "1rem";
        skeleton.style.zIndex = "2";
        skeleton.style.borderRadius = "calc(var(--radius) - 2px)";
        if (container) container.style.position = "relative";
        if (container) container.appendChild(skeleton);

        function onLoad() {
            if (skeleton.parentNode) skeleton.parentNode.removeChild(skeleton);
            imgEl.classList.add("loaded");
        }

        function onError() {
            if (skeleton.parentNode) skeleton.parentNode.removeChild(skeleton);
            imgEl.classList.add("error");
            imgEl.alt = imgEl.alt || "图片加载失败";
            // 添加错误提示覆盖层
            if (container) {
                var overlay = document.createElement("div");
                overlay.className = "image-error-overlay";
                overlay.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:2rem;height:2rem;opacity:0.5;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg><span>' + (t("img_load_error") || "加载失败") + '</span>';
                container.appendChild(overlay);
            }
        }

        if (imgEl.complete) {
            if (imgEl.naturalWidth > 0) onLoad();
            else onError();
        } else {
            imgEl.addEventListener("load", onLoad, { once: true });
            imgEl.addEventListener("error", onError, { once: true });
        }
    }

    function init() {
        if (window.NMI_i18n) {
            NMI_i18n.applyDocument();
            document.title = NMI_i18n.t("page_title_analysis");
        }

        const q = parseQuery();
        if (!q) {
            redirectHome();
            return;
        }
        sampleIndex = q.sample;
        taskId = q.task;

        const sample = getSample();
        originalImg.src = sample.original;
        const sampleName = typeof nmiGetSampleName === "function" ? nmiGetSampleName(sample) : (sample.name || "");
        originalImg.alt = sampleName + " " + t("orig_alt");
        setupImageLoading(originalImg, originalImg.closest(".image-container"));

        refreshHeaders();

        // Populate switchers
        populateSwitchers();

        // Add switcher event listeners
        sampleSwitcher.addEventListener("change", function() {
            const newSampleIndex = parseInt(this.value, 10);
            if (!isNaN(newSampleIndex) && newSampleIndex >= 0 && newSampleIndex < NMI_SAMPLES.length) {
                switchSampleOrTask(newSampleIndex, taskId);
            }
        });

        taskSwitcher.addEventListener("change", function() {
            const newTaskId = this.value;
            if (NMI_TASKS[newTaskId]) {
                switchSampleOrTask(sampleIndex, newTaskId);
            }
        });

        preprocessedPrev.addEventListener("click", function () {
            goPreprocessedSlide(-1);
        });
        preprocessedNext.addEventListener("click", function () {
            goPreprocessedSlide(1);
        });
        actionBtn.addEventListener("click", onActionClick);
        if (backStepBtn) {
            backStepBtn.addEventListener("click", onBackStepClick);
        }

        const exportBtn = document.getElementById("export-btn");
        if (exportBtn) {
            exportBtn.addEventListener("click", function(e) {
                if (e.shiftKey) {
                    exportAllCSV();
                } else {
                    exportCSV();
                }
            });
        }

        document.addEventListener("keydown", function (e) {
            // Ignore when typing in form elements
            if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT" || e.target.tagName === "TEXTAREA") return;
            if (e.metaKey || e.ctrlKey) return;

            // Preprocessed navigation
            if (phase === "preprocessed" && !rightPreprocessed.hidden) {
                if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    goPreprocessedSlide(-1);
                    return;
                } else if (e.key === "ArrowRight") {
                    e.preventDefault();
                    goPreprocessedSlide(1);
                    return;
                }
            }

            // Phase-specific shortcuts
            switch (e.key) {
                case " ":
                case "Enter":
                    e.preventDefault();
                    onActionClick();
                    break;
                case "Escape":
                    if (phase === "preprocessed") {
                        e.preventDefault();
                        setPhase("empty");
                    } else if (phase === "result") {
                        e.preventDefault();
                        setPhase("preprocessed");
                    }
                    break;
                case "b":
                case "B":
                    if (phase !== "empty") {
                        e.preventDefault();
                        onBackStepClick();
                    }
                    break;
                case "e":
                case "E":
                    if (phase === "result") {
                        e.preventDefault();
                        if (e.shiftKey) exportAllCSV();
                        else exportCSV();
                    }
                    break;
                case "r":
                case "R":
                    if (phase === "result") {
                        e.preventDefault();
                        setPhase("empty");
                    }
                    break;
                default:
                    // Number keys 1-8 for sample switching
                    var num = parseInt(e.key, 10);
                    if (num >= 1 && num <= 8 && num <= NMI_SAMPLES.length) {
                        e.preventDefault();
                        switchSampleOrTask(num - 1, taskId);
                    }
                    break;
            }
        });

        var saved = loadWorkspaceState();
        var canRestore =
            saved &&
            saved.sample === sampleIndex &&
            saved.task === taskId &&
            (saved.phase === "empty" || saved.phase === "preprocessed" || saved.phase === "result");
        if (canRestore) {
            if (saved.phase === "preprocessed" && typeof saved.preSlide === "number" && !isNaN(saved.preSlide)) {
                preprocessedSlideIndex = Math.max(0, Math.floor(saved.preSlide));
            }
            setPhase(saved.phase, { preservePreSlide: saved.phase === "preprocessed" });
        } else {
            if (saved) {
                try {
                    sessionStorage.removeItem(WORKSPACE_KEY);
                } catch (e) {}
            }
            setPhase("empty");
        }

        window.addEventListener("pagehide", function () {
            saveWorkspaceState();
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
