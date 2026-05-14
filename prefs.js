/**
 * 尽早执行：在首帧前恢复主题与 HTML lang，减少闪烁。
 * localStorage: nmi-theme = "dark" | "light", nmi-lang = "zh" | "en"（未设置时默认为 en）
 */
(function () {
    try {
        var th = localStorage.getItem("nmi-theme");
        if (th === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        var lang = localStorage.getItem("nmi-lang") || "en";
        document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
    } catch (e) {
        document.documentElement.classList.add("dark");
    }
})();
