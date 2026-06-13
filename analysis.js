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

        // BSR: always show preprocessed image on left, hide preprocessed viewer
        if (taskId === "bsr") {
            rightPreprocessed.hidden = true;
            var bsrSlides = nmiGetPreprocessedSlides(getSample(), "bsr");
            if (bsrSlides.length > 0) {
                var lastSlide = bsrSlides[bsrSlides.length - 1];
                originalImg.src = lastSlide.src;
                originalImg.alt = lastSlide.label || t("pre_alt");
            }
            var lh = document.querySelector(".workspace-pane--left .pane-title");
            if (lh) lh.textContent = t("pre_alt");
        }

        if (showPre) {
            if (!preservePreSlide) {
                preprocessedSlideIndex = 0;
            }
            updatePreprocessedSlide();
        }
        // Restore result canvas visibility (hidden by BSR view)
        var resultCanvas = document.querySelector(".result-canvas");
        if (resultCanvas) resultCanvas.style.display = "";

        if (showRes) {
            if (taskId === "bsr") {
                renderBsrResult();
            } else {
                const sample = getSample();
                const key = getTask().resultKey;
                resultImage.src = sample.results[key];
                resultImage.alt = taskLabel() + t("result_alt_suffix");
                setupImageLoading(resultImage, resultImage.closest(".image-container"));
                renderMetrics(sample.metrics);
            }
        }

        syncActionButton();
        saveWorkspaceState();
    }

    function renderBsrResult() {
        // Hide the standard result image, show BSR pipeline instead
        var resultCanvas = document.querySelector(".result-canvas");
        if (resultCanvas) resultCanvas.style.display = "none";

        var sample = getSample();
        if (!sample || !sample.bsr) return;

        var bsr = sample.bsr;
        var m = sample.metrics;
        var sampleName = typeof nmiGetSampleName === "function" ? nmiGetSampleName(sample) : ("Sample " + (sample.id + 1));

        var fmt = function(v) { return v.toFixed(6); };
        var fmtSize = function(v) { return v.toFixed(1); };
        var fmtScore = function(v) { return v.toFixed(4); };

        var sd = window.NMI_i18n && NMI_i18n.statusDisplay
            ? NMI_i18n.statusDisplay.bind(NMI_i18n)
            : function(s) { return s; };

        var bsrMetrics = [
            { key: "bsr_metric_00", descKey: "bsr_metric_00_desc", raw: bsr.bsr00, norm: bsr.bsr00Norm, weight: 2, wClass: "bsr-metric-card--w2" },
            { key: "bsr_metric_onoff", descKey: "bsr_metric_onoff_desc", raw: bsr.bsrOnoff, norm: bsr.bsrOnoffNorm, weight: 1, wClass: "bsr-metric-card--w1" },
            { key: "bsr_metric_diff", descKey: "bsr_metric_diff_desc", raw: bsr.bsrDiff, norm: bsr.bsrDiffNorm, weight: 1, wClass: "bsr-metric-card--w1" },
        ];

        function buildMetricCard(bm, value, metaKey) {
            return '<div class="bsr-metric-card ' + bm.wClass + '">' +
                '<span class="bsr-metric-card__label">' + escapeHtml(t(bm.key)) + '</span>' +
                '<span class="bsr-metric-card__desc">' + escapeHtml(t(bm.descKey)) + '</span>' +
                '<span class="bsr-metric-card__value">' + fmt(value) + '</span>' +
                '<span class="bsr-metric-card__meta">' + escapeHtml(t(metaKey)) + '</span>' +
                '</div>';
        }

        // --- Morphological input cards (10 metrics in 4 category groups) ---
        function buildMorphRow(labelKey, value, alert) {
            return '<div class="bsr-morph-card__row">' +
                '<span class="bsr-morph-card__label">' + escapeHtml(t(labelKey)) + '</span>' +
                '<span class="bsr-morph-card__value' + (alert ? ' bsr-morph-card__value--alert' : '') + '">' + escapeHtml(String(value)) + '</span>' +
                '</div>';
        }

        function morphCard(accent, titleKey, rowsHtml) {
            return '<div class="bsr-morph-card bsr-morph-card--' + accent + '">' +
                '<span class="bsr-morph-card__title">' + escapeHtml(t(titleKey)) + '</span>' +
                '<div class="bsr-morph-card__body">' + rowsHtml + '</div>' +
                '</div>';
        }

        var morphCardsHtml = "";
        if (m) {
            var beadRows = buildMorphRow("m_bead_n", m.beadCount) +
                buildMorphRow("m_bead_s", fmtSize(m.beadSize) + " px²");
            var somaRows = buildMorphRow("m_cep_n", m.cepCount) +
                buildMorphRow("m_cep_s", fmtSize(m.cepSize) + " px²") +
                buildMorphRow("m_ade_n", m.adeCount) +
                buildMorphRow("m_ade_s", fmtSize(m.adeSize) + " px²");
            var dendRows = buildMorphRow("m_dend", fmtSize(m.dendriteLength) + " px");
            var statusRows = buildMorphRow("m_brk", sd(m.breakStatus), m.breakStatus !== "正常") +
                buildMorphRow("m_arb", sd(m.arborizationStatus), m.arborizationStatus !== "正常") +
                buildMorphRow("m_bnd", sd(m.bendStatus), m.bendStatus !== "正常");

            morphCardsHtml = morphCard("bead", "task_bead_l", beadRows) +
                morphCard("soma", "task_cell_l", somaRows) +
                morphCard("dend", "task_dend_l", dendRows) +
                morphCard("morph", "task_morph_l", statusRows);
        }

        var rawCards = bsrMetrics.map(function(bm) { return buildMetricCard(bm, bm.raw, "bsr_raw"); }).join("");
        var normCards = bsrMetrics.map(function(bm) { return buildMetricCard(bm, bm.norm, "bsr_normalized"); }).join("");

        var formulaTerms = bsrMetrics.map(function(bm) {
            return '<span class="bsr-workspace__term">' +
                '<span class="bsr-workspace__term-weight ' + (bm.weight === 2 ? 'bsr-workspace__term-weight--w2' : 'bsr-workspace__term-weight--w1') + '">×' + bm.weight + '</span>' +
                '<span class="bsr-workspace__term-value">' + fmt(bm.norm) + '</span>' +
                '</span>';
        }).join("");

        var termsBreakdown = bsrMetrics.map(function(bm) {
            var result = bm.weight * bm.norm;
            var sign = bm.weight === 2 ? "2 × " + fmt(bm.norm) : ("1 × " + fmt(bm.norm));
            return sign + " = " + fmt(result);
        }).join("\n");

        var formulaHtml =
            '<div class="bsr-workspace__formula-wrap">' +
            '<div class="bsr-workspace__equation">' +
            escapeHtml(t("bsr_formula_expr")) +
            '</div>' +
            '<div class="bsr-workspace__terms">' + formulaTerms + '</div>' +
            '<div class="bsr-workspace__breakdown">' +
            termsBreakdown.replace(/\n/g, '<br>') + '<br>' +
            '<strong>' + escapeHtml(t("bsr_final_score")) + ' = ' + fmtScore(bsr.bsrScore) + '</strong>' +
            '</div>' +
            '</div>';

        var conn = '<div class="bsr-connector" aria-hidden="true"></div>';

        var bsrIcon = '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">' +
            '<path d="M16 4v4m0 16v4M4 16h4m16 0h4M8.5 8.5l2.8 2.8m9.4 9.4l2.8 2.8M23.5 8.5l-2.8 2.8m-9.4 9.4l-2.8 2.8"/>' +
            '<circle cx="16" cy="16" r="5"/></svg>';

        resultMetrics.innerHTML =
            '<div class="bsr-workspace">' +
            // Top bar with sample name + quick score
            '<div class="bsr-workspace__top">' +
            '<div class="bsr-workspace__top-left">' +
            '<span class="bsr-workspace__top-icon" aria-hidden="true">' + bsrIcon + '</span>' +
            '<span class="bsr-workspace__top-name">' + escapeHtml(sampleName) + '</span>' +
            '</div>' +
            '<span class="bsr-workspace__top-score">' + fmtScore(bsr.bsrScore) + '</span>' +
            '</div>' +
            // Stage 1: Morphological input features (10 metrics)
            conn +
            '<div class="bsr-workspace__stage">' +
            '<div class="bsr-workspace__stage-head">' +
            '<span class="bsr-step-badge">1</span>' +
            '<span class="bsr-workspace__stage-title">' + escapeHtml(t("bsr_stage_morph_input")) + '</span>' +
            '</div>' +
            '<p class="bsr-workspace__stage-desc">' + escapeHtml(t("bsr_morph_desc")) + '</p>' +
            '<div class="bsr-morph-grid">' + morphCardsHtml + '</div>' +
            '</div>' +
            // Transition: morphology → behavioral prediction
            conn +
            '<div class="bsr-workspace__transition">' +
            '<span class="bsr-workspace__transition-label">' + escapeHtml(t("bsr_stage_bsr_predict")) + '</span>' +
            '<span class="bsr-workspace__transition-desc">' + escapeHtml(t("bsr_predict_desc")) + '</span>' +
            '</div>' +
            // Stage 2: Raw BSR metrics
            conn +
            '<div class="bsr-workspace__stage">' +
            '<div class="bsr-workspace__stage-head">' +
            '<span class="bsr-step-badge">2</span>' +
            '<span class="bsr-workspace__stage-title">' + escapeHtml(t("bsr_raw_metrics")) + '</span>' +
            '</div>' +
            '<div class="bsr-metrics-row">' + rawCards + '</div>' +
            '</div>' +
            // Stage 3: Normalized
            conn +
            '<div class="bsr-workspace__stage">' +
            '<div class="bsr-workspace__stage-head">' +
            '<span class="bsr-step-badge">3</span>' +
            '<span class="bsr-workspace__stage-title">' + escapeHtml(t("bsr_norm_metrics")) + '</span>' +
            '</div>' +
            '<div class="bsr-metrics-row">' + normCards + '</div>' +
            '</div>' +
            // Stage 4: Formula
            conn +
            '<div class="bsr-workspace__stage">' +
            '<div class="bsr-workspace__stage-head">' +
            '<span class="bsr-step-badge">4</span>' +
            '<span class="bsr-workspace__stage-title">' + escapeHtml(t("bsr_formula_title")) + '</span>' +
            '</div>' +
            formulaHtml +
            '</div>' +
            // Stage 5: Final score
            conn +
            '<div class="bsr-workspace__stage">' +
            '<div class="bsr-workspace__stage-head">' +
            '<span class="bsr-step-badge">5</span>' +
            '<span class="bsr-workspace__stage-title">' + escapeHtml(t("bsr_final_score")) + '</span>' +
            '</div>' +
            '<div class="bsr-workspace__final">' +
            '<span class="bsr-workspace__score-badge">' + fmtScore(bsr.bsrScore) + '</span>' +
            '<span class="bsr-workspace__score-label">BSR Score</span>' +
            '</div>' +
            '</div>' +
            '</div>';
    }

    function syncActionButton() {
        if (phase === "empty") {
            actionBtn.textContent = taskId === "bsr" ? t("btn_result") : t("btn_preprocess");
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
        const slides = nmiGetPreprocessedSlides(sample, taskId);
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
        const slides = nmiGetPreprocessedSlides(sample, taskId);
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
        const slides = nmiGetPreprocessedSlides(sample, taskId);
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

    function exportCSV() {
        const sample = getSample();
        const sampleName = typeof nmiGetSampleName === "function" ? nmiGetSampleName(sample) : (sample.name || "Sample");
        const m = sample.metrics;

        // Build CSV rows
        const rows = [
            [t("m_bead_n"), String(m.beadCount)],
            [t("m_bead_s"), m.beadSize.toFixed(1) + " px²"],
            [t("m_cep_n"), String(m.cepCount)],
            [t("m_cep_s"), m.cepSize.toFixed(1) + " px²"],
            [t("m_ade_n"), String(m.adeCount)],
            [t("m_ade_s"), m.adeSize.toFixed(1) + " px²"],
            [t("m_dend"), m.dendriteLength.toFixed(1) + " px"],
            [t("m_brk"), NMI_i18n.statusDisplay(m.breakStatus)],
            [t("m_arb"), NMI_i18n.statusDisplay(m.arborizationStatus)],
            [t("m_bnd"), NMI_i18n.statusDisplay(m.bendStatus)],
        ];

        if (sample.bsr) {
            rows.push([t("m_bsr_score"), sample.bsr.bsrScore.toFixed(4)]);
        }

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
        a.download = "results_" + sampleName + "_" + taskId + "_" + new Date().toISOString().slice(0, 10) + ".csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function exportAllCSV() {
        const tFn = window.NMI_i18n && NMI_i18n.t || (k => k);
        const sd = window.NMI_i18n && NMI_i18n.statusDisplay || (s => s);
        const rows = [[tFn("sample_label"), tFn("m_bead_n"), tFn("m_bead_s"), tFn("m_cep_n"), tFn("m_cep_s"), tFn("m_ade_n"), tFn("m_ade_s"), tFn("m_dend"), tFn("m_brk"), tFn("m_arb"), tFn("m_bnd"), tFn("m_bsr_score")]];

        NMI_SAMPLES.forEach(function(s) {
            const name = typeof nmiGetSampleName === "function" ? nmiGetSampleName(s) : (s.name || "Sample " + (s.id + 1));
            const m = s.metrics;
            rows.push([
                name,
                String(m.beadCount), m.beadSize.toFixed(1),
                String(m.cepCount), m.cepSize.toFixed(1),
                String(m.adeCount), m.adeSize.toFixed(1),
                m.dendriteLength.toFixed(1),
                sd(m.breakStatus), sd(m.arborizationStatus), sd(m.bendStatus),
                s.bsr ? s.bsr.bsrScore.toFixed(4) : "",
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
        a.download = "results_all_samples_" + new Date().toISOString().slice(0, 10) + ".csv";
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
            setPhase(taskId === "bsr" ? "empty" : "preprocessed");
        }
    }

    function onActionClick() {
        if (phase === "empty") {
            if (taskId === "bsr") {
                actionBtn.disabled = true;
                actionBtn.textContent = t("btn_resulting");
                syncActionButton();
                window.setTimeout(function () {
                    setPhase("result");
                }, 1000);
            } else {
                actionBtn.disabled = true;
                actionBtn.textContent = t("btn_generating");
                syncActionButton();
                window.setTimeout(function () {
                    setPhase("preprocessed");
                }, 800);
            }
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
                        setPhase(taskId === "bsr" ? "empty" : "preprocessed");
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
