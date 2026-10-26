const button = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
const label = button?.querySelector<HTMLElement>("[data-theme-label]");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
const root = document.documentElement;

function current(): "light" | "dark" {
    const chosen = root.dataset.theme;
    if (chosen === "light" || chosen === "dark") return chosen;
    return systemDark.matches ? "dark" : "light";
}

function render() {
    if (!button || !label) return;
    const next = current() === "dark" ? "light" : "dark";
    label.textContent = next === "dark" ? "Dark" : "Light";
    button.setAttribute("aria-label", `Switch to ${next} mode`);
}

if (button) {
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
    render();
}