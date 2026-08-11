/* Tiny local SVG icon replacement. It keeps the existing data-lucide API. */
(function installLocalIcons() {
    const icons = {
        "map-pin": "<path d=\"M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z\"/><circle cx=\"12\" cy=\"10\" r=\"2.5\"/>",
        bike: "<circle cx=\"5\" cy=\"17\" r=\"3\"/><circle cx=\"19\" cy=\"17\" r=\"3\"/><path d=\"M5 17l4-8h4l3 8M9 9l3 8m0-8h3l2 3m-5-3-2-3h-2\"/>",
        sun: "<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41\"/>",
        leaf: "<path d=\"M20.8 3.2C12 3.4 5.1 6.3 4 12.1c-.6 3.2 1.7 6 4.8 6.1 5.8.2 8.9-5.3 12-15Z\"/><path d=\"M3 21c3.5-5 7.2-7.6 12-10\"/>",
        sliders: "<path d=\"M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3\"/><path d=\"M1 14h6m5-6h6m1 8h6\"/>",
        "skip-forward": "<path d=\"M5 4l10 8-10 8V4Zm10 0h4v16h-4\"/>",
        play: "<path d=\"m7 4 13 8-13 8V4Z\"/>",
        "rotate-ccw": "<path d=\"M3 12a9 9 0 1 0 3-6.7L3 8\"/><path d=\"M3 3v5h5\"/>",
        "code-2": "<path d=\"m8 9-4 3 4 3m8-6 4 3-4 3m-3-9-2 12\"/>",
        eye: "<path d=\"M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z\"/><circle cx=\"12\" cy=\"12\" r=\"2.5\"/>",
        "bar-chart-3": "<path d=\"M4 20V10m5 10V4m5 16v-7m5 7V7\"/>",
        scale: "<path d=\"M12 3v18M5 6h14M4 6l-3 6a4 4 0 0 0 6 0L4 6Zm16 0-3 6a4 4 0 0 0 6 0l-3-6ZM8 21h8\"/>"
    };

    function createIcons(root = document) {
        root.querySelectorAll("i[data-lucide]").forEach((placeholder) => {
            const name = placeholder.getAttribute("data-lucide");
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("fill", "none");
            svg.setAttribute("stroke", "currentColor");
            svg.setAttribute("stroke-width", "2");
            svg.setAttribute("stroke-linecap", "round");
            svg.setAttribute("stroke-linejoin", "round");
            svg.setAttribute("data-local-icon", name || "icon");
            svg.setAttribute("aria-hidden", "true");
            if (placeholder.className) svg.setAttribute("class", placeholder.className);
            svg.innerHTML = icons[name] || "<circle cx=\"12\" cy=\"12\" r=\"8\"/>";
            placeholder.replaceWith(svg);
        });
    }

    window.lucide = { createIcons };
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => createIcons());
    } else {
        createIcons();
    }
})();
