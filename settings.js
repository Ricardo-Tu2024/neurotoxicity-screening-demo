(function () {
    function applyTheme(mode) {
        if (mode === "light") {
            document.documentElement.classList.remove("dark");
        } else {
            document.documentElement.classList.add("dark");
        }
        try {
            localStorage.setItem("nmi-theme", mode === "light" ? "light" : "dark");
        } catch (e) {}
        syncThemeUI();
    }

    function applyLang(lang) {
        var l = lang === "en" ? "en" : "zh";
        if (window.NMI_i18n && typeof NMI_i18n.setLang === "function") {
            NMI_i18n.setLang(l);
        } else {
            try {
                localStorage.setItem("nmi-lang", l);
            } catch (e) {}
            document.documentElement.lang = l === "en" ? "en" : "zh-CN";
        }
        syncLangUI();
        if (window.NMI_i18n) {
            document.title = NMI_i18n.t("settings_title");
        }
    }

    function currentTheme() {
        return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }

    function syncThemeUI() {
        var dark = currentTheme() === "dark";
        var rd = document.getElementById("r-dark");
        var rl = document.getElementById("r-light");
        var od = document.getElementById("opt-theme-dark");
        var ol = document.getElementById("opt-theme-light");
        if (rd) rd.checked = dark;
        if (rl) rl.checked = !dark;
        if (od) od.classList.toggle("settings-option--active", dark);
        if (ol) ol.classList.toggle("settings-option--active", !dark);
    }

    function syncLangUI() {
        var lang = (localStorage.getItem("nmi-lang") || "en") === "en" ? "en" : "zh";
        var rz = document.getElementById("r-zh");
        var re = document.getElementById("r-en");
        var oz = document.getElementById("opt-lang-zh");
        var oe = document.getElementById("opt-lang-en");
        if (rz) rz.checked = lang === "zh";
        if (re) re.checked = lang === "en";
        if (oz) oz.classList.toggle("settings-option--active", lang === "zh");
        if (oe) oe.classList.toggle("settings-option--active", lang === "en");
    }

    function goBack() {
        try {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.assign("index.html");
            }
        } catch (e) {
            window.location.assign("index.html");
        }
    }

    function init() {
        syncThemeUI();
        syncLangUI();
        if (window.NMI_i18n) {
            NMI_i18n.applyDocument();
            document.title = NMI_i18n.t("settings_title");
        }

        var backBtn = document.getElementById("settings-back");
        if (backBtn) {
            backBtn.addEventListener("click", goBack);
        }

        document.getElementById("r-dark").addEventListener("change", function () {
            if (this.checked) applyTheme("dark");
        });
        document.getElementById("r-light").addEventListener("change", function () {
            if (this.checked) applyTheme("light");
        });
        document.getElementById("r-zh").addEventListener("change", function () {
            if (this.checked) applyLang("zh");
        });
        document.getElementById("r-en").addEventListener("change", function () {
            if (this.checked) applyLang("en");
        });

        document.getElementById("opt-theme-dark").addEventListener("click", function (e) {
            if (e.target.tagName !== "INPUT") document.getElementById("r-dark").click();
        });
        document.getElementById("opt-theme-light").addEventListener("click", function (e) {
            if (e.target.tagName !== "INPUT") document.getElementById("r-light").click();
        });
        document.getElementById("opt-lang-zh").addEventListener("click", function (e) {
            if (e.target.tagName !== "INPUT") document.getElementById("r-zh").click();
        });
        document.getElementById("opt-lang-en").addEventListener("click", function (e) {
            if (e.target.tagName !== "INPUT") document.getElementById("r-en").click();
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
