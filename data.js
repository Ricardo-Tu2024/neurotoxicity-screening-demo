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
        original: "images/original/sample1.png",
        preprocessed: [
            { src: "images/preprocessed/sample1_preprocessed.png", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample1_preprocessed.png", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample1_preprocessed.png", labelKey: "preprocess_step3" },
        ],
        results: {
            bead: "images/results/sample1_bead.png",
            cellbody: "images/results/sample1_cellbody.png",
            dendrite: "images/results/sample1_dendrite.png",
            morphology: "images/results/sample1_morphology.png",
        },
        metrics: {
            beadCount: 45,
            beadSize: 125.3,
            cepCount: 4,
            cepSize: 892.5,
            adeCount: 2,
            adeSize: 756.8,
            dendriteLength: 1250.6,
            breakStatus: "正常",
            arborizationStatus: "正常",
            bendStatus: "正常",
        },
    },
    {
        id: 1,
        nameKey: "sample_name_2",
        original: "images/original/sample2.png",
        preprocessed: [
            { src: "images/preprocessed/sample2_preprocessed.png", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample2_preprocessed.png", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample2_preprocessed.png", labelKey: "preprocess_step3" },
        ],
        results: {
            bead: "images/results/sample2_bead.png",
            cellbody: "images/results/sample2_cellbody.png",
            dendrite: "images/results/sample2_dendrite.png",
            morphology: "images/results/sample2_morphology.png",
        },
        metrics: {
            beadCount: 62,
            beadSize: 98.7,
            cepCount: 4,
            cepSize: 845.2,
            adeCount: 2,
            adeSize: 712.4,
            dendriteLength: 1180.3,
            breakStatus: "检测到断裂",
            arborizationStatus: "正常",
            bendStatus: "轻度弯曲",
        },
    },
    {
        id: 2,
        nameKey: "sample_name_3",
        original: "images/original/sample3.png",
        preprocessed: [
            { src: "images/preprocessed/sample3_preprocessed.png", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample3_preprocessed.png", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample3_preprocessed.png", labelKey: "preprocess_step3" },
        ],
        results: {
            bead: "images/results/sample3_bead.png",
            cellbody: "images/results/sample3_cellbody.png",
            dendrite: "images/results/sample3_dendrite.png",
            morphology: "images/results/sample3_morphology.png",
        },
        metrics: {
            beadCount: 38,
            beadSize: 142.6,
            cepCount: 3,
            cepSize: 920.8,
            adeCount: 2,
            adeSize: 788.1,
            dendriteLength: 1320.5,
            breakStatus: "正常",
            arborizationStatus: "检测到增生",
            bendStatus: "正常",
        },
    },
    {
        id: 3,
        nameKey: "sample_name_4",
        original: "images/original/sample4.png",
        preprocessed: [
            { src: "images/preprocessed/sample4_preprocessed.png", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample4_preprocessed.png", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample4_preprocessed.png", labelKey: "preprocess_step3" },
        ],
        results: {
            bead: "images/results/sample4_bead.png",
            cellbody: "images/results/sample4_cellbody.png",
            dendrite: "images/results/sample4_dendrite.png",
            morphology: "images/results/sample4_morphology.png",
        },
        metrics: {
            beadCount: 51,
            beadSize: 110.2,
            cepCount: 4,
            cepSize: 868.0,
            adeCount: 3,
            adeSize: 720.0,
            dendriteLength: 1288.0,
            breakStatus: "正常",
            arborizationStatus: "正常",
            bendStatus: "正常",
        },
    },
    {
        id: 4,
        nameKey: "sample_name_5",
        original: "images/original/sample5.png",
        preprocessed: [
            { src: "images/preprocessed/sample5_preprocessed.png", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample5_preprocessed.png", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample5_preprocessed.png", labelKey: "preprocess_step3" },
        ],
        results: {
            bead: "images/results/sample5_bead.png",
            cellbody: "images/results/sample5_cellbody.png",
            dendrite: "images/results/sample5_dendrite.png",
            morphology: "images/results/sample5_morphology.png",
        },
        metrics: {
            beadCount: 44,
            beadSize: 119.0,
            cepCount: 4,
            cepSize: 901.0,
            adeCount: 2,
            adeSize: 765.0,
            dendriteLength: 1195.0,
            breakStatus: "正常",
            arborizationStatus: "正常",
            bendStatus: "轻度弯曲",
        },
    },
    {
        id: 5,
        nameKey: "sample_name_6",
        original: "images/original/sample6.png",
        preprocessed: [
            { src: "images/preprocessed/sample6_preprocessed.png", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample6_preprocessed.png", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample6_preprocessed.png", labelKey: "preprocess_step3" },
        ],
        results: {
            bead: "images/results/sample6_bead.png",
            cellbody: "images/results/sample6_cellbody.png",
            dendrite: "images/results/sample6_dendrite.png",
            morphology: "images/results/sample6_morphology.png",
        },
        metrics: {
            beadCount: 55,
            beadSize: 103.5,
            cepCount: 3,
            cepSize: 910.0,
            adeCount: 2,
            adeSize: 800.0,
            dendriteLength: 1102.0,
            breakStatus: "正常",
            arborizationStatus: "检测到增生",
            bendStatus: "正常",
        },
    },
    {
        id: 6,
        nameKey: "sample_name_7",
        original: "images/original/sample7.png",
        preprocessed: [
            { src: "images/preprocessed/sample7_preprocessed.png", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample7_preprocessed.png", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample7_preprocessed.png", labelKey: "preprocess_step3" },
        ],
        results: {
            bead: "images/results/sample7_bead.png",
            cellbody: "images/results/sample7_cellbody.png",
            dendrite: "images/results/sample7_dendrite.png",
            morphology: "images/results/sample7_morphology.png",
        },
        metrics: {
            beadCount: 48,
            beadSize: 128.0,
            cepCount: 4,
            cepSize: 880.0,
            adeCount: 2,
            adeSize: 748.0,
            dendriteLength: 1234.0,
            breakStatus: "检测到断裂",
            arborizationStatus: "正常",
            bendStatus: "正常",
        },
    },
    {
        id: 7,
        nameKey: "sample_name_8",
        original: "images/original/sample8.png",
        preprocessed: [
            { src: "images/preprocessed/sample8_preprocessed.png", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample8_preprocessed.png", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample8_preprocessed.png", labelKey: "preprocess_step3" },
        ],
        results: {
            bead: "images/results/sample8_bead.png",
            cellbody: "images/results/sample8_cellbody.png",
            dendrite: "images/results/sample8_dendrite.png",
            morphology: "images/results/sample8_morphology.png",
        },
        metrics: {
            beadCount: 59,
            beadSize: 101.0,
            cepCount: 3,
            cepSize: 905.0,
            adeCount: 3,
            adeSize: 770.0,
            dendriteLength: 1305.0,
            breakStatus: "正常",
            arborizationStatus: "正常",
            bendStatus: "轻度弯曲",
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

function nmiGetPreprocessedSlides(sample) {
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
