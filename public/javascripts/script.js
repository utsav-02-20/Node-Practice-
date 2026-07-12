const modeBtn = document.querySelector(".mode");

const saved = localStorage.getItem("theme");
const prefDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (saved === "dark" || (!saved && prefDark)) {
    document.body.classList.add("dark");
}

modeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
});

// auto detect big notes
document.querySelectorAll('.notes').forEach(card => {
  const text = card.querySelector('.note_content');
  if (!text) return;
  const len = text.value.length;
  const lines = text.value.split('\n').length;

  // if long content -> full page
  if (len > 400 || lines > 8 || text.scrollHeight > 320) {
    card.classList.add('full');
  }
});