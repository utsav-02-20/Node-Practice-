const oldBox = document.querySelector(".old-note textarea");
const newBox = document.querySelector(".new-note textarea");

function syncHeight() {
    const h = Math.max(oldBox.scrollHeight, newBox.scrollHeight);
    oldBox.style.height = h + "px";
    newBox.style.height = h + "px";
}

newBox.addEventListener("input", syncHeight);
window.addEventListener("load", syncHeight);