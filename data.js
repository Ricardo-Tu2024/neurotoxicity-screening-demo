/**
 * NMI 演示数据与任务元数据（供 index / analysis 共用）
 * 修改后若浏览器仍显示旧条数：在 index.html / analysis.html 中把 data.js 的 ?v= 改大，或 Ctrl+F5 强刷。
 */

// 预处理步骤标签的国际化键
const PREPROCESS_LABELS = {
    step1: "preprocess_step1",
    step2: "preprocess_step2",
    step3: "preprocess_step3"
};

const NMI_SAMPLES = [
    {
        id: 0,
        nameKey: "sample_name_1",
        original: "images/original/sample1.png?v=2",
        preprocessed: [
            { src: "images/preprocessed/sample1_crop.png?v=2", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample1_rotate.png?v=2", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample1_he.png?v=2", labelKey: "preprocess_step3" },
        ],
        beadPreprocessed: [
            { src: "images/preprocessed/sample1_crop.png?v=2", labelKey: "preprocess_bead_step1" },
            { src: "images/preprocessed/sample1_bead_he.png?v=2", labelKey: "preprocess_bead_step2" },
        ],
        results: {
            bead: "images/results/sample1_bead.png?v=2",
            cellbody: "images/results/sample1_cellbody.png?v=2",
            dendrite: "images/results/sample1_dendrite.png?v=2",
            morphology: "images/results/sample1_morphology.png?v=2",
        },
        metrics: {
            beadCount: 7,
            beadSize: 257.6,
            cepCount: 4,
            cepSize: 3257.2,
            adeCount: 2,
            adeSize: 2742.5,
            dendriteLength: 1095.9,
            breakStatus: "检测到断裂",
            arborizationStatus: "检测到增生",
            bendStatus: "正常",
        },
    },
    {
        id: 1,
        nameKey: "sample_name_2",
        original: "images/original/sample2.png?v=2",
        preprocessed: [
            { src: "images/preprocessed/sample2_crop.png?v=2", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample2_rotate.png?v=2", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample2_he.png?v=2", labelKey: "preprocess_step3" },
        ],
        beadPreprocessed: [
            { src: "images/preprocessed/sample2_crop.png?v=2", labelKey: "preprocess_bead_step1" },
            { src: "images/preprocessed/sample2_bead_he.png?v=2", labelKey: "preprocess_bead_step2" },
        ],
        results: {
            bead: "images/results/sample2_bead.png?v=2",
            cellbody: "images/results/sample2_cellbody.png?v=2",
            dendrite: "images/results/sample2_dendrite.png?v=2",
            morphology: "images/results/sample2_morphology.png?v=2",
        },
        metrics: {
            beadCount: 8,
            beadSize: 169.1,
            cepCount: 4,
            cepSize: 3338.9,
            adeCount: 2,
            adeSize: 1162.0,
            dendriteLength: 1197.1,
            breakStatus: "正常",
            arborizationStatus: "正常",
            bendStatus: "正常",
        },
    },
    {
        id: 2,
        nameKey: "sample_name_3",
        original: "images/original/sample3.png?v=2",
        preprocessed: [
            { src: "images/preprocessed/sample3_crop.png?v=2", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample3_rotate.png?v=2", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample3_he.png?v=2", labelKey: "preprocess_step3" },
        ],
        beadPreprocessed: [
            { src: "images/preprocessed/sample3_crop.png?v=2", labelKey: "preprocess_bead_step1" },
            { src: "images/preprocessed/sample3_bead_he.png?v=2", labelKey: "preprocess_bead_step2" },
        ],
        results: {
            bead: "images/results/sample3_bead.png?v=2",
            cellbody: "images/results/sample3_cellbody.png?v=2",
            dendrite: "images/results/sample3_dendrite.png?v=2",
            morphology: "images/results/sample3_morphology.png?v=2",
        },
        metrics: {
            beadCount: 7,
            beadSize: 81.9,
            cepCount: 4,
            cepSize: 3923.6,
            adeCount: 2,
            adeSize: 2872.0,
            dendriteLength: 1121.4,
            breakStatus: "正常",
            arborizationStatus: "正常",
            bendStatus: "正常",
        },
    },
    {
        id: 3,
        nameKey: "sample_name_4",
        original: "images/original/sample4.png?v=2",
        preprocessed: [
            { src: "images/preprocessed/sample4_crop.png?v=2", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample4_rotate.png?v=2", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample4_he.png?v=2", labelKey: "preprocess_step3" },
        ],
        beadPreprocessed: [
            { src: "images/preprocessed/sample4_crop.png?v=2", labelKey: "preprocess_bead_step1" },
            { src: "images/preprocessed/sample4_bead_he.png?v=2", labelKey: "preprocess_bead_step2" },
        ],
        results: {
            bead: "images/results/sample4_bead.png?v=2",
            cellbody: "images/results/sample4_cellbody.png?v=2",
            dendrite: "images/results/sample4_dendrite.png?v=2",
            morphology: "images/results/sample4_morphology.png?v=2",
        },
        metrics: {
            beadCount: 4,
            beadSize: 186.8,
            cepCount: 4,
            cepSize: 4757.4,
            adeCount: 2,
            adeSize: 4000.8,
            dendriteLength: 1124.1,
            breakStatus: "正常",
            arborizationStatus: "正常",
            bendStatus: "正常",
        },
    },
    {
        id: 4,
        nameKey: "sample_name_5",
        original: "images/original/sample5.png?v=2",
        preprocessed: [
            { src: "images/preprocessed/sample5_crop.png?v=2", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample5_rotate.png?v=2", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample5_he.png?v=2", labelKey: "preprocess_step3" },
        ],
        beadPreprocessed: [
            { src: "images/preprocessed/sample5_crop.png?v=2", labelKey: "preprocess_bead_step1" },
            { src: "images/preprocessed/sample5_bead_he.png?v=2", labelKey: "preprocess_bead_step2" },
        ],
        results: {
            bead: "images/results/sample5_bead.png?v=2",
            cellbody: "images/results/sample5_cellbody.png?v=2",
            dendrite: "images/results/sample5_dendrite.png?v=2",
            morphology: "images/results/sample5_morphology.png?v=2",
        },
        metrics: {
            beadCount: 7,
            beadSize: 110.0,
            cepCount: 4,
            cepSize: 4743.2,
            adeCount: 2,
            adeSize: 1003.5,
            dendriteLength: 1090.8,
            breakStatus: "检测到断裂",
            arborizationStatus: "正常",
            bendStatus: "正常",
        },
    },
    {
        id: 5,
        nameKey: "sample_name_6",
        original: "images/original/sample6.png?v=2",
        preprocessed: [
            { src: "images/preprocessed/sample6_crop.png?v=2", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample6_rotate.png?v=2", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample6_he.png?v=2", labelKey: "preprocess_step3" },
        ],
        beadPreprocessed: [
            { src: "images/preprocessed/sample6_crop.png?v=2", labelKey: "preprocess_bead_step1" },
            { src: "images/preprocessed/sample6_bead_he.png?v=2", labelKey: "preprocess_bead_step2" },
        ],
        results: {
            bead: "images/results/sample6_bead.png?v=2",
            cellbody: "images/results/sample6_cellbody.png?v=2",
            dendrite: "images/results/sample6_dendrite.png?v=2",
            morphology: "images/results/sample6_morphology.png?v=2",
        },
        metrics: {
            beadCount: 6,
            beadSize: 130.7,
            cepCount: 4,
            cepSize: 4300.8,
            adeCount: 2,
            adeSize: 3480.5,
            dendriteLength: 1163.7,
            breakStatus: "检测到断裂",
            arborizationStatus: "正常",
            bendStatus: "正常",
        },
    },
    {
        id: 6,
        nameKey: "sample_name_7",
        original: "images/original/sample7.png?v=2",
        preprocessed: [
            { src: "images/preprocessed/sample7_crop.png?v=2", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample7_rotate.png?v=2", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample7_he.png?v=2", labelKey: "preprocess_step3" },
        ],
        beadPreprocessed: [
            { src: "images/preprocessed/sample7_crop.png?v=2", labelKey: "preprocess_bead_step1" },
            { src: "images/preprocessed/sample7_bead_he.png?v=2", labelKey: "preprocess_bead_step2" },
        ],
        results: {
            bead: "images/results/sample7_bead.png?v=2",
            cellbody: "images/results/sample7_cellbody.png?v=2",
            dendrite: "images/results/sample7_dendrite.png?v=2",
            morphology: "images/results/sample7_morphology.png?v=2",
        },
        metrics: {
            beadCount: 12,
            beadSize: 225.1,
            cepCount: 4,
            cepSize: 4410.0,
            adeCount: 2,
            adeSize: 1661.0,
            dendriteLength: 1256.6,
            breakStatus: "正常",
            arborizationStatus: "正常",
            bendStatus: "正常",
        },
    },
    {
        id: 7,
        nameKey: "sample_name_8",
        original: "images/original/sample8.png?v=2",
        preprocessed: [
            { src: "images/preprocessed/sample8_crop.png?v=2", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample8_rotate.png?v=2", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample8_he.png?v=2", labelKey: "preprocess_step3" },
        ],
        beadPreprocessed: [
            { src: "images/preprocessed/sample8_crop.png?v=2", labelKey: "preprocess_bead_step1" },
            { src: "images/preprocessed/sample8_bead_he.png?v=2", labelKey: "preprocess_bead_step2" },
        ],
        results: {
            bead: "images/results/sample8_bead.png?v=2",
            cellbody: "images/results/sample8_cellbody.png?v=2",
            dendrite: "images/results/sample8_dendrite.png?v=2",
            morphology: "images/results/sample8_morphology.png?v=2",
        },
        metrics: {
            beadCount: 7,
            beadSize: 132.1,
            cepCount: 4,
            cepSize: 3508.5,
            adeCount: 2,
            adeSize: 2143.8,
            dendriteLength: 1109.9,
            breakStatus: "正常",
            arborizationStatus: "正常",
            bendStatus: "正常",
        },
    },
];

const NMI_TASKS = {
    bead: { id: "bead", label: "串珠分析", resultKey: "bead" },
    cellbody: { id: "cellbody", label: "细胞体分析", resultKey: "cellbody" },
    dendrite: { id: "dendrite", label: "树突分析", resultKey: "dendrite" },
    morphology: { id: "morphology", label: "形态异常分析", resultKey: "morphology" },
};

/** 首页任务卡顺序与副标题（id 需与 NMI_TASKS 一致） */
const NMI_TASK_LIST = [
    { id: "bead", blurb: "珠状结构数量与大小" },
    { id: "cellbody", blurb: "CEP、ADE 细胞体" },
    { id: "dendrite", blurb: "树突长度" },
    { id: "morphology", blurb: "断裂、增生、弯曲" },
];

function nmiGetPreprocessedSlides(sample, taskId) {
    // Bead task uses a 2-step pipeline (crop + HE, no rotate)
    if (taskId === "bead") {
        const t = window.NMI_i18n && window.NMI_i18n.t ? window.NMI_i18n.t : function(k) { return k; };
        const beadPre = sample.beadPreprocessed || sample.preprocessed;
        if (Array.isArray(beadPre) && beadPre.length) {
            return beadPre.map(function(slide) {
                return {
                    src: slide.src,
                    label: slide.labelKey ? t(slide.labelKey) : (slide.label || "")
                };
            });
        }
        if (typeof beadPre === "string" && beadPre) return [{ src: beadPre, label: t("preprocess_output") }];
        return [];
    }

    const p = sample.preprocessed;
    const t = window.NMI_i18n && window.NMI_i18n.t ? window.NMI_i18n.t : function(k) { return k; };

    if (Array.isArray(p) && p.length) {
        return p.map(function(slide) {
            return {
                src: slide.src,
                label: slide.labelKey ? t(slide.labelKey) : (slide.label || "")
            };
        });
    }
    if (typeof p === "string" && p) return [{ src: p, label: t("preprocess_output") }];
    return [];
}

// 获取样本名称（支持国际化）
function nmiGetSampleName(sample) {
    const t = window.NMI_i18n && window.NMI_i18n.t ? window.NMI_i18n.t : function(k) { return k; };
    return sample.nameKey ? t(sample.nameKey) : (sample.name || "");
}
