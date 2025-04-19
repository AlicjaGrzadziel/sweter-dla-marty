// Zmiana kolorów na żywo
const sweaterBody = document.getElementById('sweaterBody');
const sweaterSleeves = document.getElementById('sweaterSleeves');
const sweaterNeck = document.getElementById('sweaterNeck');
const sweaterBottom = document.getElementById('sweaterBottom');
const miniSweater = document.getElementById('miniSweater');
const accentRadios = document.querySelectorAll('input[name="accentColor"]');

document.querySelectorAll('input[name="mainColor"]').forEach(input => {
    input.addEventListener('change', () => {
        const color = input.value;
        sweaterBody.style.backgroundColor = color;
        sweaterSleeves.style.backgroundColor = color;
        if (document.querySelector('input[name="accentColor"]:checked').value === "same") {
            sweaterNeck.style.backgroundColor = color;
            sweaterBottom.style.backgroundColor = color;
        }
    });
});

accentRadios.forEach(input => {
    input.addEventListener('change', () => {
        const accent = input.value;
        const main = document.querySelector('input[name="mainColor"]:checked').value;
        if (accent === "same") {
            sweaterNeck.style.backgroundColor = main;
            sweaterBottom.style.backgroundColor = main;
        } else {
            sweaterNeck.style.backgroundColor = accent;
            sweaterBottom.style.backgroundColor = accent;
        }
    });
});

// Mini sweter dla Mańki
document.getElementById('miniSweaterCheckbox').addEventListener('change', (e) => {
    miniSweater.style.display = e.target.checked ? 'block' : 'none';
});

// Easter egg: 13 kliknięć i hasło
let clickCount = 0;
let activated = false;

document.body.addEventListener('click', () => {
    if (activated) return;
    clickCount++;
    if (clickCount === 13) {
        const pass = prompt("Podaj hasło, by odkryć niespodziankę:");
        if (pass && pass.toLowerCase().includes("cardigan")) {
            document.getElementById('easterEgg').style.display = 'block';
            document.getElementById('easterEgg').innerText = "Zawsze zostawię dla Ciebie sweter w szafie...";
            activated = true;
        } else {
            alert("Nie tym razem! Spróbuj jeszcze raz.");
            clickCount = 0;
        }
    }
});