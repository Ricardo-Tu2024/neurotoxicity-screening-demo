/**
 * 界面文案：中文 / English。与 prefs.js 的 nmi-lang 一致；未保存时默认 en。
 */
(function () {
    var S = {
        zh: {
            settings: "设置",
            settings_title: "设置",
            settings_subtitle: "主题与显示语言将保存在本机浏览器。",
            settings_back: "返回",
            setting_theme: "主题模式",
            theme_dark: "暗色",
            theme_light: "亮色",
            setting_language: "显示语言",
            lang_zh: "中文",
            lang_en: "English",
            settings_saved: "已保存",
            // 首页
            page_title_home: "线虫神经毒性筛查系统 - NMI",
            header_eyebrow: "NMI · 神经形态学分析",
            home_title: "线虫神经毒性筛查系统",
            home_subtitle: "基于秀丽隐杆线虫（C. elegans）多巴胺能神经元的高通量神经毒性筛查",
            intro_title: "系统简介",
            intro_lead: "自监督学习基础模型，对多巴胺能神经元进行高通量形态学分析，可检测 10 项关键指标。",
            intro_p:
                "本系统采用自监督学习的基础模型，对秀丽隐杆线虫（C. elegans）多巴胺能神经元进行高通量形态学分析，可检测以下关键指标：",
            mg_bead: "串珠分析",
            mg_cell: "细胞体分析",
            mg_dend: "树突分析",
            mg_morph: "形态异常",
            in_b1: "串珠数量",
            in_b2: "平均串珠大小",
            in_c1: "CEP数量",
            in_c2: "平均CEP大小",
            in_c3: "ADE数量",
            in_c4: "平均ADE大小",
            in_d1: "树突长度",
            in_m1: "断裂",
            in_m2: "增生",
            in_m3: "异常弯曲",
            // BSR 评分系统
            bsr_title: "BSR 评分系统",
            bsr_lead: "基础慢反应（Basal Slowing Response）是评估线虫多巴胺能神经元功能的金标准行为学指标。",
            bsr_what_title: "什么是 BSR？",
            bsr_what_desc: "当线虫遇到食物时，会通过多巴胺能神经元调控运动速度，从快速移动转为缓慢爬行。这种行为反应称为 BSR，是评估多巴胺神经系统功能完整性的关键指标。",
            bsr_metric1_title: "On/Off 频率比",
            bsr_metric1_desc: "食物上与食物外的运动频率比值，反映神经元响应能力",
            bsr_metric2_title: "频率差异",
            bsr_metric2_desc: "On-Off 频率的绝对差值，量化行为变化幅度",
            bsr_metric3_title: "响应状态",
            bsr_metric3_desc: "二元分类（0/1），判断是否产生正常减速反应",
            bsr_corr_title: "形态学与行为学关联",
            bsr_corr_desc: "本系统通过多模态深度学习框架，将神经元形态学特征（串珠、细胞体、树突等）与 BSR 行为学评分相关联，实现从结构到功能的预测，为神经毒性评估提供可解释的 AI 工具。",
            demo_title: "分析演示",
            demo_lead: "选择样本与任务后进入工作区：左侧为原图，右侧为预处理与当前任务结果（演示数据）。",
            pick_sample: "选择样本",
            hint_sample: "缩略图为该样本原始图像预览",
            pick_task: "分析任务",
            hint_task: "选择一项后将进入对应该模块的结果页面",
            start: "开始",
            footer: "基于论文：High-throughput neurotoxicity screening in C. elegans dopaminergic neurons with self-supervised learning",
            sample_sub: "原始图像预览",
            task_bead_l: "串珠分析",
            task_bead_b: "珠状结构数量与大小",
            task_cell_l: "细胞体分析",
            task_cell_b: "CEP、ADE 细胞体",
            task_dend_l: "树突分析",
            task_dend_b: "树突长度",
            task_morph_l: "形态异常分析",
            task_morph_b: "断裂、增生、弯曲",
            // 工作区
            page_title_analysis: "分析工作区 - NMI",
            st_abnormal: "异常",
            chart_normal: "正常指标",
            chart_abnormal: "异常指标",
            img_load_error: "图片加载失败",
            back: "返回",
            workspace_title: "分析工作区",
            sample_label: "样本",
            task_label: "任务",
            result_heading: "结果",
            result_pane: "结果区域",
            left_pane: "原始图像",
            right_placeholder:
                "此区域为分析结果。请先点击「预处理」查看预处理图，再点击「生成结果」查看当前任务输出。",
            btn_preprocess: "预处理",
            btn_generating: "处理中...",
            btn_result: "生成结果",
            btn_resulting: "生成中...",
            btn_reset: "重新分析",
            btn_back_step: "返回上一步",
            pager_prev: "上一页",
            pager_next: "下一页",
            pre_region: "预处理结果，可左右翻页",
            orig_img_alt: "原始线虫神经元图像",
            pre_alt: "预处理后的图像",
            orig_alt: "原始图",
            result_alt_suffix: " 结果",
            result_img_alt: "任务结果图像",
            m_bead_n: "串珠数量",
            m_bead_s: "平均串珠大小",
            m_cep_n: "CEP数量",
            m_cep_s: "平均CEP大小",
            m_ade_n: "ADE数量",
            m_ade_s: "平均ADE大小",
            m_dend: "树突长度",
            m_brk: "断裂",
            m_arb: "增生",
            m_bnd: "异常弯曲",
            st_normal: "正常",
            st_break: "检测到断裂",
            st_arb: "检测到增生",
            st_bend: "轻度弯曲",
            m_export_hint: "Shift+点击导出所有样本",
            // 样本名称
            sample_name_1: "样本 1",
            sample_name_2: "样本 2",
            sample_name_3: "样本 3",
            sample_name_4: "样本 4",
            sample_name_5: "样本 5",
            sample_name_6: "样本 6",
            sample_name_7: "样本 7",
            sample_name_8: "样本 8",
            // 预处理步骤
            preprocess_step1: "方向归一化与视野对齐",
            preprocess_step2: "对比度增强与噪声抑制",
            preprocess_step3: "预处理最终输出",
            preprocess_output: "预处理输出",
        },
        en: {
            settings: "Settings",
            settings_title: "Settings",
            settings_subtitle: "Theme and display language are saved in this browser.",
            settings_back: "Back",
            setting_theme: "Theme",
            theme_dark: "Dark",
            theme_light: "Light",
            setting_language: "Language",
            lang_zh: "中文",
            lang_en: "English",
            settings_saved: "Saved",
            page_title_home: "NMI — C. elegans Neurotoxicity Screening",
            header_eyebrow: "NMI · Neuromorphology",
            home_title: "C. elegans Neurotoxicity Screening",
            home_subtitle:
                "High-throughput screening on dopaminergic neurons in C. elegans",
            intro_title: "Overview",
            intro_lead: "A self-supervised model for high-throughput morphological analysis with 10 key metrics.",
            intro_p: "The system uses a self-supervised model to analyze dopaminergic neurons in C. elegans, including the following metrics:",
            mg_bead: "Bead",
            mg_cell: "Soma",
            mg_dend: "Dendrite",
            mg_morph: "Morphology",
            in_b1: "Bead count",
            in_b2: "Mean bead size",
            in_c1: "CEP count",
            in_c2: "Mean CEP size",
            in_c3: "ADE count",
            in_c4: "Mean ADE size",
            in_d1: "Dendrite length",
            in_m1: "Break",
            in_m2: "Overgrowth",
            in_m3: "Abnormal bend",
            // BSR Scoring System
            bsr_title: "BSR Scoring System",
            bsr_lead: "Basal Slowing Response (BSR) is the gold standard behavioral metric for assessing dopaminergic neuron function in C. elegans.",
            bsr_what_title: "What is BSR?",
            bsr_what_desc: "When C. elegans encounters food, it modulates locomotion speed through dopaminergic neurons, transitioning from rapid movement to slow crawling. This behavioral response, called BSR, is a key indicator of dopaminergic system integrity.",
            bsr_metric1_title: "On/Off Frequency Ratio",
            bsr_metric1_desc: "Ratio of locomotion frequency on vs. off food, reflecting neuronal responsiveness",
            bsr_metric2_title: "Frequency Difference",
            bsr_metric2_desc: "Absolute difference between On and Off frequencies, quantifying behavioral change magnitude",
            bsr_metric3_title: "Response Status",
            bsr_metric3_desc: "Binary classification (0/1) indicating whether normal slowing response occurs",
            bsr_corr_title: "Morphology-Behavior Correlation",
            bsr_corr_desc: "Through a multimodal deep learning framework, the system correlates neuronal morphological features (beads, soma, dendrites) with BSR behavioral scores, enabling structure-to-function prediction and providing an interpretable AI tool for neurotoxicity assessment.",
            demo_title: "Demo",
            demo_lead: "Choose a sample and a task, then open the workspace: original on the left, preprocessing and results on the right.",
            pick_sample: "Sample",
            hint_sample: "Thumbnails are previews of the raw image for each sample.",
            pick_task: "Task",
            hint_task: "You will see the corresponding module’s results after starting.",
            start: "Start",
            footer: "Based on: High-throughput neurotoxicity screening in C. elegans dopaminergic neurons with self-supervised learning",
            sample_sub: "Raw preview",
            task_bead_l: "Bead analysis",
            task_bead_b: "Count & size",
            task_cell_l: "Soma",
            task_cell_b: "CEP / ADE",
            task_dend_l: "Dendrite",
            task_dend_b: "Length",
            task_morph_l: "Morphology",
            task_morph_b: "Breaks, overgrowth, bending",
            page_title_analysis: "Workspace - NMI",
            st_abnormal: "Abnormal",
            chart_normal: "Normal",
            chart_abnormal: "Abnormal",
            img_load_error: "Failed to load image",
            back: "Back",
            workspace_title: "Workspace",
            sample_label: "Sample",
            task_label: "Task",
            result_heading: "Result",
            result_pane: "Results",
            left_pane: "Original",
            right_placeholder: 'This area shows results. Use “Preprocess”, then "Generate" for the current task.',
            btn_preprocess: "Preprocess",
            btn_generating: "Processing...",
            btn_result: "Generate",
            btn_resulting: "Generating...",
            btn_reset: "Reset",
            btn_back_step: "Previous step",
            pager_prev: "Previous",
            pager_next: "Next",
            pre_region: "Preprocessing results, use arrows to flip",
            orig_img_alt: "Original neuron image",
            pre_alt: "Preprocessed",
            orig_alt: "raw",
            result_alt_suffix: " result",
            result_img_alt: "Result image",
            m_bead_n: "Bead count",
            m_bead_s: "Mean bead size",
            m_cep_n: "CEP count",
            m_cep_s: "Mean CEP size",
            m_ade_n: "ADE count",
            m_ade_s: "Mean ADE size",
            m_dend: "Dendrite length",
            m_brk: "Break",
            m_arb: "Arborization",
            m_bnd: "Bend",
            st_normal: "Normal",
            st_break: "Fracture detected",
            st_arb: "Hyperplasia detected",
            st_bend: "Mild bending",
            m_export_hint: "Shift+click to export all samples",
            // Sample names
            sample_name_1: "Sample 1",
            sample_name_2: "Sample 2",
            sample_name_3: "Sample 3",
            sample_name_4: "Sample 4",
            sample_name_5: "Sample 5",
            sample_name_6: "Sample 6",
            sample_name_7: "Sample 7",
            sample_name_8: "Sample 8",
            // Preprocessing steps
            preprocess_step1: "Orientation normalization & field alignment",
            preprocess_step2: "Contrast enhancement & noise suppression",
            preprocess_step3: "Final preprocessed output",
            preprocess_output: "Preprocessed output",
        },
    };

    function getLang() {
        return localStorage.getItem("nmi-lang") || "en";
    }

    function t(key) {
        var lang = getLang();
        var pack = S[lang] || S.zh;
        return (pack && pack[key]) || (S.zh[key] || key);
    }

    function statusDisplay(s) {
        var map = {
            正常: t("st_normal"),
            检测到断裂: t("st_break"),
            检测到增生: t("st_arb"),
            轻度弯曲: t("st_bend"),
        };
        return map[s] || s;
    }

    function applyDocument() {
        var nodes = document.querySelectorAll("[data-i18n]");
        for (var i = 0; i < nodes.length; i++) {
            var el = nodes[i];
            var k = el.getAttribute("data-i18n");
            if (k) el.textContent = t(k);
        }
        var titles = document.querySelectorAll("[data-i18n-title]");
        for (var j = 0; j < titles.length; j++) {
            var a = titles[j];
            var key = a.getAttribute("data-i18n-title");
            if (key) a.setAttribute("title", t(key));
        }
        var ar = document.querySelectorAll("[data-i18n-aria]");
        for (var n = 0; n < ar.length; n++) {
            var ela = ar[n];
            var ka = ela.getAttribute("data-i18n-aria");
            if (ka) ela.setAttribute("aria-label", t(ka));
        }
        var imgs = document.querySelectorAll("img[data-i18n-alt]");
        for (var m = 0; m < imgs.length; m++) {
            var im = imgs[m];
            var ka = im.getAttribute("data-i18n-alt");
            if (ka) im.setAttribute("alt", t(ka));
        }
    }

    window.NMI_i18n = {
        t: t,
        getLang: getLang,
        setLang: function (lang) {
            localStorage.setItem("nmi-lang", lang === "en" ? "en" : "zh");
            document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
            applyDocument();
        },
        applyDocument: applyDocument,
        statusDisplay: statusDisplay,
        taskLabel: function (id) {
            if (id === "bead") return t("task_bead_l");
            if (id === "cellbody") return t("task_cell_l");
            if (id === "dendrite") return t("task_dend_l");
            if (id === "morphology") return t("task_morph_l");
            return id;
        },
    };
})();
