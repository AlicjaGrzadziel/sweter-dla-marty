document.addEventListener('DOMContentLoaded', function() {
    // Elementy swetra
    const sweaterBody = document.getElementById('sweaterBody');
    const sweaterSleeves = document.querySelectorAll('.sweater-sleeves');
    const sweaterNeck = document.getElementById('sweaterNeck');
    const sweaterBottom = document.getElementById('sweaterBottom');
    const sweaterImage = document.getElementById('sweaterImage');
    const easterEgg = document.getElementById('easterEgg');
    
    // Mini sweter dla dziecka
    const miniSweater = document.getElementById('miniSweater');
    const miniSweaterCheckbox = document.getElementById('miniSweaterCheckbox');
    const miniSweaterBody = document.querySelector('.mini-sweater-body');
    const miniSweaterSleeves = document.querySelectorAll('.mini-sweater-sleeves');
    const miniSweaterNeck = document.querySelector('.mini-sweater-neck');
    const miniSweaterBottom = document.querySelector('.mini-sweater-bottom');
    
    // Formularz
    const sweaterForm = document.getElementById('sweaterForm');
    const mainColorInputs = document.getElementsByName('mainColor');
    const accentColorInputs = document.getElementsByName('accentColor');
    const typeInputs = document.getElementsByName('type');
    const sleevesInputs = document.getElementsByName('sleeves');
    const lengthInputs = document.getElementsByName('length');
    const necklineInputs = document.getElementsByName('neckline');
    
    // Easter egg - Taylor Swift
    let clickCounter = 0;
    const taylorSwiftLyrics = [
        "Are you ready for it?",
        "I knew you were trouble when you walked in",
        "We are never ever getting back together",
        "Baby, now we got bad blood",
        "Look what you made me do",
        "Shake it off, shake it off",
        "Blank space, baby",
        "You belong with me",
        "I don't know about you, but I'm feeling 22",
        "Welcome to New York",
        "All too well...",
        "Long live all the magic we made",
    ];
    
    // Tajny przycisk Taylor
    const tsSecret = document.createElement('div');
    tsSecret.className = 'ts-secret';
    tsSecret.innerHTML = '<span>🎵</span>';
    document.body.appendChild(tsSecret);
    
    // Modal z niespodzianką Taylor
    const tsModal = document.createElement('div');
    tsModal.className = 'ts-modal';
    tsModal.innerHTML = `
        <div class="ts-modal-content">
            <span class="ts-modal-close">&times;</span>
            <h2>Taylor Swift Easter Egg!</h2>
            <p>🎵 Znalazłaś sekretną niespodziankę! 🎵</p>
            <div style="margin: 20px 0;">
                <img src="https://i.imgur.com/Gl5nXr6.jpg" alt="Taylor Swift" style="max-width: 100%; border-radius: 5px;">
            </div>
            <p>Ten sweter będzie wyglądał absolutnie <strong>Fearless</strong> na Tobie!</p>
            <p style="font-style: italic; margin-top: 15px;">PS: Kto jest Twoim ulubionym artystą? 😉</p>
        </div>
    `;
    document.body.appendChild(tsModal);
    
    const tsModalClose = document.querySelector('.ts-modal-close');
    tsModalClose.addEventListener('click', function() {
        tsModal.classList.remove('active');
    });
    
    // Obsługa mini swetra
    miniSweaterCheckbox.addEventListener('change', function() {
        if (this.checked) {
            miniSweater.style.display = 'block';
            updateMiniSweater();
        } else {
            miniSweater.style.display = 'none';
        }
    });
    
    // Funkcja aktualizująca wygląd mini swetra
    function updateMiniSweater() {
        const selectedMainColor = document.querySelector('input[name="mainColor"]:checked').value;
        let selectedAccentColor = document.querySelector('input[name="accentColor"]:checked').value;
        
        if (selectedAccentColor === 'same') {
            selectedAccentColor = selectedMainColor;
        }
        
        miniSweaterBody.style.backgroundColor = selectedMainColor;
        miniSweaterNeck.style.backgroundColor = selectedAccentColor;
        miniSweaterBottom.style.backgroundColor = selectedAccentColor;
        miniSweaterSleeves.forEach(sleeve => {
            sleeve.style.backgroundColor = selectedMainColor;
        });
    }
    
    // Funkcja aktualizująca wygląd swetra
    function updateSweaterPreview() {
        // Pobierz wybrane wartości
        const selectedType = document.querySelector('input[name="type"]:checked').value;
        const selectedSleeves = document.querySelector('input[name="sleeves"]:checked').value;
        const selectedLength = document.querySelector('input[name="length"]:checked').value;
        const selectedNeckline = document.querySelector('input[name="neckline"]:checked').value;
        const selectedMainColor = document.querySelector('input[name="mainColor"]:checked').value;
        let selectedAccentColor = document.querySelector('input[name="accentColor"]:checked').value;
        
        if (selectedAccentColor === 'same') {
            selectedAccentColor = selectedMainColor;
        }
        
        // Aktualizuj kolory
        sweaterBody.style.backgroundColor = selectedMainColor;
        sweaterBottom.style.backgroundColor = selectedAccentColor;
        sweaterNeck.style.backgroundColor = selectedAccentColor;
        sweaterSleeves.forEach(sleeve => {
            sleeve.style.backgroundColor = selectedMainColor;
        });
        
        // Aktualizuj typ (sweter/kardigan)
        if (selectedType === 'cardigan') {
            sweaterBody.style.width = '80%';
            sweaterNeck.style.width = '100%';
            sweaterNeck.style.height = '20px';
            sweaterNeck.style.borderRadius = '10px 10px 0 0';
        } else {
            sweaterBody.style.width = '100%';
            sweaterNeck.style.width = '80px';
            sweaterNeck.style.height = '30px';
            sweaterNeck.style.borderRadius = '10px 10px 0 0';
        }
        
        // Aktualizuj rękawy
        if (selectedSleeves === 'short') {
            sweaterSleeves.forEach(sleeve => {
                sleeve.style.height = '60px';
            });
        } else if (selectedSleeves === 'three-quarter') {
            sweaterSleeves.forEach(sleeve => {
                sleeve.style.height = '100px';
            });
        } else {
            sweaterSleeves.forEach(sleeve => {
                sleeve.style.height = '150px';
            });
        }
        
        // Aktualizuj długość
        if (selectedLength === 'long') {
            sweaterBody.style.height = '85%';
        } else if (selectedLength === 'crop') {
            sweaterBody.style.height = '55%';
        } else {
            sweaterBody.style.height = '70%';
        }
        
        // Aktualizuj wykończenie szyi
        if (selectedNeckline === 'v-neck') {
            sweaterNeck.style.borderBottom = '30px solid ' + selectedAccentColor;
            sweaterNeck.style.borderLeft = '20px solid transparent';
            sweaterNeck.style.borderRight = '20px solid transparent';
            sweaterNeck.style.height = '0';
            sweaterNeck.style.width = '0';
            sweaterNeck.style.backgroundColor = 'transparent';
        } else if (selectedNeckline === 'turtleneck') {
            sweaterNeck.style.height = '50px';
            sweaterNeck.style.width = '70px';
            sweaterNeck.style.borderRadius = '10px 10px 0 0';
            sweaterNeck.style.backgroundColor = selectedAccentColor;
            sweaterNeck.style.border = 'none';
        } else {
            sweaterNeck.style.height = '30px';
            sweaterNeck.style.width = '80px';
            sweaterNeck.style.borderRadius = '10px 10px 0 0';
            sweaterNeck.style.backgroundColor = selectedAccentColor;
            sweaterNeck.style.border = 'none';
        }
        
        // Aktualizuj mini sweter jeśli jest aktywny
        if (miniSweaterCheckbox.checked) {
            updateMiniSweater();
        }
    }
    
    // Aktualizuj wygląd przy zmianie opcji
    typeInputs.forEach(input => {
        input.addEventListener('change', updateSweaterPreview);
    });
    
    sleevesInputs.forEach(input => {
        input.addEventListener('change', updateSweaterPreview);
    });
    
    lengthInputs.forEach(input => {
        input.addEventListener('change', updateSweaterPreview);
    });
    
    necklineInputs.forEach(input => {
        input.addEventListener('change', updateSweaterPreview);
    });
    
    mainColorInputs.forEach(input => {
        input.addEventListener('change', updateSweaterPreview);
    });
    
    accentColorInputs.forEach(input => {
        input.addEventListener('change', updateSweaterPreview);
    });
    
    // Ustaw początkowy wygląd swetra
    updateSweaterPreview();
    
    // Obsługa kliknięć dla Easter Egga
    document.addEventListener('click', function() {
        clickCounter++;
        
        // Losowo pojawiające się teksty Taylor Swift
        if (clickCounter % 5 === 0) {
            const randomLyric = taylorSwiftLyrics[Math.floor(Math.random() * taylorSwiftLyrics.length)];
            const randomX = Math.random() * window.innerWidth * 0.8;
            const randomY = Math.random() * window.innerHeight * 0.8;
            
            easterEgg.style.left = randomX + 'px';
            easterEgg.style.top = randomY + 'px';
            easterEgg.textContent = randomLyric;
            easterEgg.style.opacity = '1';
            
            setTimeout(() => {
                easterEgg.style.opacity = '0';
            }, 2000);
        }
        
        // Pokaż pole do wpisania hasła po 13 kliknięciach
        if (clickCounter === 13) {
            const password = prompt("Podaj hasło do tajnej niespodzianki:", "");
            if (password && password.toLowerCase() === "cardigan") {
                tsSecret.classList.add('visible');
                alert("Hasło poprawne! Kliknij ikonę nutki, aby zobaczyć niespodziankę.");
            } else if (password !== null) {
                alert("Niepoprawne hasło. Spróbuj ponownie klikając w różne miejsca na stronie.");
                // Resetuj licznik, by użytkownik mógł spróbować ponownie
                clickCounter = 0;
            }
        }
    });
    
    // Obsługa tajnego przycisku Taylor
    tsSecret.addEventListener('click', function() {
        tsModal.classList.add('active');
    });
    
    // Obsługa formularza
    sweaterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Zbierz wszystkie dane z formularza
        const formData = new FormData(sweaterForm);
        let sweaterConfig = {};
        
        for (let [key, value] of formData.entries()) {
            if (key === 'extras') {
                if (!sweaterConfig[key]) {
                    sweaterConfig[key] = [];
                }
                sweaterConfig[key].push(value);
            } else {
                sweaterConfig[key] = value;
            }
        }
        
        // Przygotuj dane do wysłania emailem
        const subject = "Mój projekt swetra urodzinowego";
        let body = `Cześć,

Zaprojektowałam właśnie wymarzony sweter urodzinowy! Oto szczegóły:

Typ: ${sweaterConfig.type === 'sweater' ? 'Sweter' : 'Kardigan'}
Rękawy: ${sweaterConfig.sleeves === 'long' ? 'Długie' : sweaterConfig.sleeves === 'short' ? 'Krótkie' : '3/4'}
Długość: ${sweaterConfig.length === 'regular' ? 'Regularna' : sweaterConfig.length === 'long' ? 'Długa' : 'Krótka (crop)'}
Wykończenie szyi: ${sweaterConfig.neckline === 'crew' ? 'Okrągłe' : sweaterConfig.neckline === 'v-neck' ? 'V-neck' : 'Golf'}
Kolor główny: ${document.querySelector('input[name="mainColor"]:checked').nextElementSibling.nextElementSibling.textContent}
Kolor wykończenia: ${sweaterConfig.accentColor === 'same' ? 'Taki sam jak główny' : document.querySelector('input[name="accentColor"]:checked').nextElementSibling.nextElementSibling.textContent}
${sweaterConfig.extras ? 'Dodatki: ' + sweaterConfig.extras.map(extra => extra === 'pockets' ? 'Kieszenie' : extra === 'buttons' ? 'Guziki' : 'Delikatny wzór').join(', ') : 'Bez dodatków'}
`;

        // Dodaj informację o mini swetrze jeśli opcja została wybrana
        if (sweaterConfig.miniSweater) {
            body += `
Poproszę również o pasujący sweterek dla mojej córeczki Mańki!
`;
        }

        body += `
${sweaterConfig.specialRequests ? 'Dodatkowe uwagi: ' + sweaterConfig.specialRequests : ''}

Pozdrawiam,
${sweaterConfig.name}
`;
        
        // Otwórz klienta poczty z prefilled subject i body
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
        
        // Pokaż potwierdzenie
        alert('Twój projekt został zapisany! Otwieram klienta poczty, aby wysłać szczegóły projektu.');
    });
});
