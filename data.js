/**
 * 演示数据与任务元数据（供 index / analysis 共用）
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
        original: "images/original/sample1.webp",
        preprocessed: [
            { src: "images/preprocessed/sample1_crop.webp", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample1_rotate.webp", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample1_he.webp", labelKey: "preprocess_step3" },
        ],
        beadPreprocessed: [
            { src: "images/preprocessed/sample1_crop.webp", labelKey: "preprocess_bead_step1" },
            { src: "images/preprocessed/sample1_bead_he.webp", labelKey: "preprocess_bead_step2" },
        ],
        results: {
            bead: "images/results/sample1_bead.webp",
            cellbody: "images/results/sample1_cellbody.webp",
            dendrite: "images/results/sample1_dendrite.webp",
            morphology: "images/results/sample1_morphology.webp",
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
        bsr: {
            bsr00: 0.051605964,
            bsr00Norm: 0.03982719,
            bsrOnoff: 0.822753906,
            bsrOnoffNorm: 0.459114779,
            bsrDiff: -0.102539063,
            bsrDiffNorm: 0.524679245,
            bsrScore: 1.063448404,
        },
    },
    {
        id: 1,
        nameKey: "sample_name_2",
        original: "images/original/sample2.webp",
        preprocessed: [
            { src: "images/preprocessed/sample2_crop.webp", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample2_rotate.webp", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample2_he.webp", labelKey: "preprocess_step3" },
        ],
        beadPreprocessed: [
            { src: "images/preprocessed/sample2_crop.webp", labelKey: "preprocess_bead_step1" },
            { src: "images/preprocessed/sample2_bead_he.webp", labelKey: "preprocess_bead_step2" },
        ],
        results: {
            bead: "images/results/sample2_bead.webp",
            cellbody: "images/results/sample2_cellbody.webp",
            dendrite: "images/results/sample2_dendrite.webp",
            morphology: "images/results/sample2_morphology.webp",
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
        bsr: {
            bsr00: 0.098165744,
            bsr00Norm: 0.088011157,
            bsrOnoff: 0.988769531,
            bsrOnoffNorm: 0.714178545,
            bsrDiff: -0.015167236,
            bsrDiffNorm: 0.740754717,
            bsrScore: 1.630955576,
        },
    },
    {
        id: 2,
        nameKey: "sample_name_3",
        original: "images/original/sample3.webp",
        preprocessed: [
            { src: "images/preprocessed/sample3_crop.webp", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample3_rotate.webp", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample3_he.webp", labelKey: "preprocess_step3" },
        ],
        beadPreprocessed: [
            { src: "images/preprocessed/sample3_crop.webp", labelKey: "preprocess_bead_step1" },
            { src: "images/preprocessed/sample3_bead_he.webp", labelKey: "preprocess_bead_step2" },
        ],
        results: {
            bead: "images/results/sample3_bead.webp",
            cellbody: "images/results/sample3_cellbody.webp",
            dendrite: "images/results/sample3_dendrite.webp",
            morphology: "images/results/sample3_morphology.webp",
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
        bsr: {
            bsr00: 0.037082023,
            bsr00Norm: 0.024796597,
            bsrOnoff: 0.740722656,
            bsrOnoffNorm: 0.333083271,
            bsrDiff: -0.166625977,
            bsrDiffNorm: 0.366188679,
            bsrScore: 0.748865143,
        },
    },
    {
        id: 3,
        nameKey: "sample_name_4",
        original: "images/original/sample4.webp",
        preprocessed: [
            { src: "images/preprocessed/sample4_crop.webp", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample4_rotate.webp", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample4_he.webp", labelKey: "preprocess_step3" },
        ],
        beadPreprocessed: [
            { src: "images/preprocessed/sample4_crop.webp", labelKey: "preprocess_bead_step1" },
            { src: "images/preprocessed/sample4_bead_he.webp", labelKey: "preprocess_bead_step2" },
        ],
        results: {
            bead: "images/results/sample4_bead.webp",
            cellbody: "images/results/sample4_cellbody.webp",
            dendrite: "images/results/sample4_dendrite.webp",
            morphology: "images/results/sample4_morphology.webp",
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
        bsr: {
            bsr00: 0.056288198,
            bsr00Norm: 0.044672758,
            bsrOnoff: 0.895996094,
            bsrOnoffNorm: 0.571642911,
            bsrDiff: -0.111572266,
            bsrDiffNorm: 0.502339623,
            bsrScore: 1.16332805,
        },
    },
    {
        id: 4,
        nameKey: "sample_name_5",
        original: "images/original/sample5.webp",
        preprocessed: [
            { src: "images/preprocessed/sample5_crop.webp", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample5_rotate.webp", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample5_he.webp", labelKey: "preprocess_step3" },
        ],
        beadPreprocessed: [
            { src: "images/preprocessed/sample5_crop.webp", labelKey: "preprocess_bead_step1" },
            { src: "images/preprocessed/sample5_bead_he.webp", labelKey: "preprocess_bead_step2" },
        ],
        results: {
            bead: "images/results/sample5_bead.webp",
            cellbody: "images/results/sample5_cellbody.webp",
            dendrite: "images/results/sample5_dendrite.webp",
            morphology: "images/results/sample5_morphology.webp",
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
        bsr: {
            bsr00: 0.159348181,
            bsr00Norm: 0.151327878,
            bsrOnoff: 0.834472656,
            bsrOnoffNorm: 0.47711928,
            bsrDiff: -0.114807129,
            bsrDiffNorm: 0.494339623,
            bsrScore: 1.274114658,
        },
    },
    {
        id: 5,
        nameKey: "sample_name_6",
        original: "images/original/sample6.webp",
        preprocessed: [
            { src: "images/preprocessed/sample6_crop.webp", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample6_rotate.webp", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample6_he.webp", labelKey: "preprocess_step3" },
        ],
        beadPreprocessed: [
            { src: "images/preprocessed/sample6_crop.webp", labelKey: "preprocess_bead_step1" },
            { src: "images/preprocessed/sample6_bead_he.webp", labelKey: "preprocess_bead_step2" },
        ],
        results: {
            bead: "images/results/sample6_bead.webp",
            cellbody: "images/results/sample6_cellbody.webp",
            dendrite: "images/results/sample6_dendrite.webp",
            morphology: "images/results/sample6_morphology.webp",
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
        bsr: {
            bsr00: 0.038756194,
            bsr00Norm: 0.026529169,
            bsrOnoff: 0.937988281,
            bsrOnoffNorm: 0.63615904,
            bsrDiff: -0.040740967,
            bsrDiffNorm: 0.677509434,
            bsrScore: 1.366726812,
        },
    },
    {
        id: 6,
        nameKey: "sample_name_7",
        original: "images/original/sample7.webp",
        preprocessed: [
            { src: "images/preprocessed/sample7_crop.webp", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample7_rotate.webp", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample7_he.webp", labelKey: "preprocess_step3" },
        ],
        beadPreprocessed: [
            { src: "images/preprocessed/sample7_crop.webp", labelKey: "preprocess_bead_step1" },
            { src: "images/preprocessed/sample7_bead_he.webp", labelKey: "preprocess_bead_step2" },
        ],
        results: {
            bead: "images/results/sample7_bead.webp",
            cellbody: "images/results/sample7_cellbody.webp",
            dendrite: "images/results/sample7_dendrite.webp",
            morphology: "images/results/sample7_morphology.webp",
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
        bsr: {
            bsr00: 0.135403478,
            bsr00Norm: 0.126547889,
            bsrOnoff: 0.924804688,
            bsrOnoffNorm: 0.615903976,
            bsrDiff: -0.076599121,
            bsrDiffNorm: 0.588830189,
            bsrScore: 1.457829942,
        },
    },
    {
        id: 7,
        nameKey: "sample_name_8",
        original: "images/original/sample8.webp",
        preprocessed: [
            { src: "images/preprocessed/sample8_crop.webp", labelKey: "preprocess_step1" },
            { src: "images/preprocessed/sample8_rotate.webp", labelKey: "preprocess_step2" },
            { src: "images/preprocessed/sample8_he.webp", labelKey: "preprocess_step3" },
        ],
        beadPreprocessed: [
            { src: "images/preprocessed/sample8_crop.webp", labelKey: "preprocess_bead_step1" },
            { src: "images/preprocessed/sample8_bead_he.webp", labelKey: "preprocess_bead_step2" },
        ],
        results: {
            bead: "images/results/sample8_bead.webp",
            cellbody: "images/results/sample8_cellbody.webp",
            dendrite: "images/results/sample8_dendrite.webp",
            morphology: "images/results/sample8_morphology.webp",
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
        bsr: {
            bsr00: 0.06091929,
            bsr00Norm: 0.049465401,
            bsrOnoff: 0.822753906,
            bsrOnoffNorm: 0.459114779,
            bsrDiff: -0.117431641,
            bsrDiffNorm: 0.487849057,
            bsrScore: 1.045894636,
        },
    },
];

const NMI_TASKS = {
    bead: { id: "bead", label: "串珠分析", resultKey: "bead" },
    cellbody: { id: "cellbody", label: "细胞体分析", resultKey: "cellbody" },
    dendrite: { id: "dendrite", label: "树突分析", resultKey: "dendrite" },
    morphology: { id: "morphology", label: "形态异常分析", resultKey: "morphology" },
    bsr: { id: "bsr", label: "BSR 评分", resultKey: null },
};

/** 首页任务卡顺序与副标题（id 需与 NMI_TASKS 一致） */
const NMI_TASK_LIST = [
    { id: "bead", blurb: "珠状结构数量与大小" },
    { id: "cellbody", blurb: "CEP、ADE 细胞体" },
    { id: "dendrite", blurb: "树突长度" },
    { id: "morphology", blurb: "断裂、增生、弯曲" },
    { id: "bsr", blurb: "BSR 行为学评分计算" },
];

function nmiGetPreprocessedSlides(sample, taskId) {
    // BSR uses a 2-step pipeline (crop + rotate, no HE)
    if (taskId === "bsr") {
        const t2 = window.NMI_i18n && window.NMI_i18n.t ? window.NMI_i18n.t : function(k) { return k; };
        const bsrPre = sample.preprocessed;
        if (Array.isArray(bsrPre) && bsrPre.length >= 2) {
            return bsrPre.slice(0, 2).map(function(slide) {
                return { src: slide.src, label: slide.labelKey ? t2(slide.labelKey) : (slide.label || "") };
            });
        }
        if (Array.isArray(bsrPre) && bsrPre.length) {
            return bsrPre.map(function(slide) {
                return { src: slide.src, label: slide.labelKey ? t2(slide.labelKey) : (slide.label || "") };
            });
        }
        return [];
    }

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
