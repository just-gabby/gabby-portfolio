const SCALE = ["xs", "sm", "md", "lg", "xl"];

// Blocks whose top and bottom padding we mark.
const BLOCKS =
    "main > *, .about-section, .journal-item, .site-nav, .site-footer-inner";

// Text we tag with its typeface, weight, size and line height.
const TEXT =
    "main h1, main h2, main h3, .hero-intro, .page-intro > p:not(.eyebrow), .about-section-body > p:first-of-type";

let layer: HTMLDivElement | null = null;
let queued = false;

// Measures what each spacing token really is in pixels right now.
function tokenPixels() {
    return SCALE.map((name) => {
        const probe = document.createElement("div");
        probe.style.cssText = `position:absolute;visibility:hidden;width:var(--space-${name});`;
        document.body.appendChild(probe);
        const px = probe.getBoundingClientRect().width;
        probe.remove();
        return { name, px };
    });
}

function pxLabel(px: number, tokens: { name: string; px: number }[]) {
    const rounded = Math.round(px * 10) / 10;
    const match = tokens.find((token) => Math.abs(token.px - px) < 0.5);
    return match ? `${rounded}px · space-${match.name}` : `${rounded}px`;
}

function typeLabel(el: Element) {
    const style = getComputedStyle(el);
    const family = style.fontFamily.split(",")[0].replace(/["']/g, "").trim();
    const size = parseFloat(style.fontSize);
    const line = parseFloat(style.lineHeight);
    const ratio = Number.isNaN(line)
        ? "normal"
        : String(Math.round((line / size) * 100) / 100);
    return `${family} · ${style.fontWeight} · ${Math.round(size * 10) / 10}px / ${ratio}`;
}

function make(
    className: string,
    left: number,
    top: number,
    width?: number,
    height?: number,
    text?: string,
) {
    const el = document.createElement("div");
    el.className = className;
    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
    if (width !== undefined) el.style.width = `${width}px`;
    if (height !== undefined) el.style.height = `${height}px`;
    if (text) el.textContent = text;
    return el;
}

function band(
    parent: HTMLElement,
    left: number,
    top: number,
    width: number,
    height: number,
    tokens: { name: string; px: number }[],
) {
    const el = make("redline-band", left, top, width, height);
    if (height >= 12) {
        const label = document.createElement("span");
        label.className = "redline-label";
        label.textContent = pxLabel(height, tokens);
        el.appendChild(label);
    }
    parent.appendChild(el);
}

function build() {
    layer?.remove();
    const root = document.createElement("div");
    root.className = "redline-layer";
    root.setAttribute("aria-hidden", "true");
    root.style.height = `${document.documentElement.scrollHeight}px`;

    const tokens = tokenPixels();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    // Padding bands.
    document.querySelectorAll(BLOCKS).forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const style = getComputedStyle(el);
        const top = parseFloat(style.paddingTop);
        const bottom = parseFloat(style.paddingBottom);
        if (top > 0) {
            band(root, rect.left + scrollX, rect.top + scrollY, rect.width, top, tokens);
        }
        if (bottom > 0) {
            band(
                root,
                rect.left + scrollX,
                rect.bottom + scrollY - bottom,
                rect.width,
                bottom,
                tokens,
            );
        }
    });

    // Type tags.
    document.querySelectorAll(TEXT).forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const left = rect.left + scrollX;
        const top = rect.top + scrollY;
        root.appendChild(make("redline-box", left, top, rect.width, rect.height));
        root.appendChild(make("redline-tag", left, top, undefined, undefined, typeLabel(el)));
    });

    document.body.appendChild(root);
    layer = root;
}

function toggle() {
    if (layer) {
        layer.remove();
        layer = null;
    } else {
        build();
    }
}

document.addEventListener("keydown", (event) => {
    if (event.repeat) return;
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (!event.shiftKey || event.key.toLowerCase() !== "r") return;

    const target = event.target as HTMLElement;
    if (target.matches("input, textarea, select, [contenteditable]")) return;

    toggle();
});

window.addEventListener("resize", () => {
    if (!layer || queued) return;
    queued = true;
    requestAnimationFrame(() => {
        queued = false;
        if (layer) build();
    });
});