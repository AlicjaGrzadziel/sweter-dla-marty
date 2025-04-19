
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("sweaterForm");
    const sweaterImage = document.getElementById("sweaterImage");
    const sweaterBody = document.getElementById("sweaterBody");
    const sweaterSleeves = document.getElementById("sweaterSleeves");
    const sweaterNeck = document.getElementById("sweaterNeck");
    const sweaterBottom = document.getElementById("sweaterBottom");
    const patternOverlay = document.getElementById("patternOverlay");
    const nameCheckbox = document.getElementById("showName");
    const nameInput = document.getElementById("sweaterNameInput");
    const nameOnSweater = document.getElementById("nameOnSweater");
    const miniSweaterCheckbox = document.getElementById("miniSweaterCheckbox");
    const miniSweater = document.getElementById("miniSweater");
    const decorationOptions = document.querySelectorAll(".decoration-option");
    const patternOptions = document.querySelectorAll(".pattern-option");

    form.addEventListener("change", updateSweater);
    nameCheckbox.addEventListener("change", () => {
        nameInput.style.display = nameCheckbox.checked ? "block" : "none";
        updateSweater();
    });
    nameInput.addEventListener("input", updateSweater);
    miniSweaterCheckbox.addEventListener("change", () => {
        miniSweater.style.display = miniSweaterCheckbox.checked ? "block" : "none";
    });

    decorationOptions.forEach(option => {
        option.addEventListener("click", function () {
            decorationOptions.forEach(opt => opt.classList.remove("selected"));
            option.classList.add("selected");
            updateSweater();
        });
    });

    patternOptions.forEach(option => {
        option.addEventListener("click", function () {
            patternOptions.forEach(opt => opt.classList.remove("selected"));
            option.classList.add("selected");
            updateSweater();
        });
    });

    function updateSweater() {
        const color = form.mainColor.value;
        sweaterBody.style.background = color;
        sweaterSleeves.style.background = color;
        sweaterNeck.style.background = color;
        sweaterBottom.style.background = color;

        const selectedPattern = document.querySelector(".pattern-option.selected").dataset.pattern;
        patternOverlay.className = "pattern-overlay " + selectedPattern;

        const selectedDecoration = document.querySelector(".decoration-option.selected").dataset.decoration;
        document.getElementById("sweaterDecoration").textContent = selectedDecoration !== "none" ? selectedDecoration : "";

        nameOnSweater.textContent = nameCheckbox.checked ? nameInput.value : "";
    }

    // Easter Egg
    let clickCount = 0;
    document.body.addEventListener("click", () => {
        clickCount++;
        if (clickCount === 13) {
            const password = prompt("Podaj hasło:");
            if (password && password.toLowerCase().includes("cardigan")) {
                document.getElementById("easterEgg").style.display = "block";
            }
            clickCount = 0;
        }
    });

    document.querySelector(".close-easter-egg").addEventListener("click", () => {
        document.getElementById("easterEgg").style.display = "none";
    });

    // Size Guide Modal
    document.querySelector(".size-guide-btn").addEventListener("click", () => {
        document.querySelector(".size-guide-modal").style.display = "block";
    });
    document.querySelector(".close-size-guide").addEventListener("click", () => {
        document.querySelector(".size-guide-modal").style.display = "none";
    });
});
