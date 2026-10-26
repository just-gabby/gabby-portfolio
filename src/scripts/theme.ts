const button = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
const root = document.documentElement;

function current(): "light" | "dark" {
    const chosen = root.dataset.theme;
    if (chosen === "light" || chosen === "dark") return chosen;
    return systemDark.matches ? "dark" : "light";
}

function render() {
    if (!button) return;
    button.setAttribute("aria-checked", String(current() === "dark"));
}

if (button) {
    // Set the right position first, then reveal, so it never slides on load.
    render();
    button.hidden = false;

    button.addEventListener("click", () => {
        const next = current() === "dark" ? "light" : "dark";
        try {
            if ((next === "dark") === systemDark.matches) {
                // Back in step with the system, so stop overriding it.
                localStorage.removeItem("theme");
                delete root.dataset.theme;
            } else {
                localStorage.setItem("theme", next);
                root.dataset.theme = next;
            }
        } catch {
            // Storage is blocked, so the choice lasts until the page reloads.
            root.dataset.theme = next;
        }
        render();
    });

    systemDark.addEventListener("change", render);
}