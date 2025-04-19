document.addEventListener('DOMContentLoaded', function() {
    // Zmienne globalne
    let clickCount = 0;
    let sweaterRotation = 0;
    let zoomed = false;
    
    // Elementy DOM
    const sweaterBody = document.getElementById('sweaterBody');
    const sweaterSleeves = document.getElementById('sweaterSleeves');
    const sweaterNeck = document.getElementById('sweaterNeck');
    const sweaterBottom = document.getElementById('sweaterBottom');
    const patternOverlay = document.getElementById('patternOverlay');
    const miniSweater = document.getElementById('miniSweater');
    const miniSweaterBody = miniSweater.querySelector('.mini-sweater-body');
    const miniSweaterSleeves = miniSweater.querySelector('.mini-sweater-sleeves');
    const miniSweaterNeck = miniSweater.querySelector('.mini-sweater-neck');
    const miniSweaterBottom = miniSweater.querySelector('.mini-sweater-bottom');
    const sweaterDecoration = document.getElementById('sweaterDecoration');
    const nameOnSweater = document.getElementById('nameOnSweater');
    const sweaterForm = document.getElementById('sweaterForm');
    const sweaterImage = document.getElementById('sweaterImage');
    const themeToggle = document.getElementById('themeToggle');
    const sizeGuideBtn = document.getElementById('sizeGuideBtn');
    const zoomBtn = document.getElementById('zoomBtn');
    const rotateBtn = document.getElementById('rotateBtn');
    const customMainColor = document.getElementById('customMainColor');

    // Próbujemy uzyskać elementy, które mogą nie istnieć w pierwotnym HTML
    // Będziemy je dodawać dynamicznie, jeśli nie istnieją
    let patternOptions = document.querySelector('.pattern-options');
    let decorationOptions = document.querySelector('.decoration-options');
    let sizeGuideModal = document.querySelector('.size-guide-modal');
    let easterEgg = document.getElementById('easterEgg');

    // Inicjalizacja podstawowego koloru
    updateSweaterColor('#FFFFFF');

    // Obsługa niestandardowego koloru
    document.querySelectorAll('input[name="mainColor"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'custom') {
                customMainColor.disabled = false;
                customMainColor.focus();
                // Używamy istniejącego koloru jako wartości początkowej
                const currentColor = getComputedStyle(sweaterBody).backgroundColor;
                const hex = rgbToHex(currentColor);
                customMainColor.value = hex;
            } else {
                customMainColor.disabled = true;
                updateSweaterColor(this.value);
            }
        });
    });

    // Nasłuchiwanie zmian w polu własnego koloru
    if (customMainColor) {
        customMainColor.addEventListener('input', function() {
            if (this.value.match(/^#([0-9A-F]{3}){1,2}$/i)) {
                updateSweaterColor(this.value);
            }
        });
    }

    // Obsługa mini swetra
    const miniSweaterCheckbox = document.getElementById('miniSweaterCheckbox');
    if (miniSweaterCheckbox) {
        miniSweaterCheckbox.addEventListener('change', function() {
            miniSweater.style.display = this.checked ? 'block' : 'none';
        });
    }

    // Funkcja aktualizująca kolor swetra
    function updateSweaterColor(color) {
        sweaterBody.style.backgroundColor = color;
        sweaterSleeves.style.backgroundColor = color;
        sweaterNeck.style.backgroundColor = color;
        sweaterBottom.style.backgroundColor = color;
        
        // Aktualizacja mini swetra
        miniSweaterBody.style.backgroundColor = color;
        miniSweaterSleeves.style.backgroundColor = color;
        miniSweaterNeck.style.backgroundColor = color;
        miniSweaterBottom.style.backgroundColor = color;
        
        // Dopasowanie koloru tekstu na swetrze
        const brightness = getBrightness(color);
        nameOnSweater.style.color = brightness < 128 ? '#ffffff' : '#333333';
    }

    // Funkcja konwertująca RGB na HEX
    function rgbToHex(rgb) {
        // Jeśli już jest w formacie HEX, zwróć
        if (rgb.startsWith('#')) return rgb;
        
        // W przeciwnym razie konwertuj RGB na HEX
        const rgbArray = rgb.match(/\d+/g);
        if (!rgbArray || rgbArray.length < 3) return '#FFFFFF';
        
        return '#' + [
            parseInt(rgbArray[0]).toString(16).padStart(2, '0'),
            parseInt(rgbArray[1]).toString(16).padStart(2, '0'),
            parseInt(rgbArray[2]).toString(16).padStart(2, '0')
        ].join('').toUpperCase();
    }

    // Funkcja obliczająca jasność koloru
    function getBrightness(color) {
        let r, g, b;
        
        if (color.startsWith('#')) {
            color = color.slice(1);
            // Konwersja 3-cyfrowego HEX na 6-cyfrowy
            if (color.length === 3) {
                color = color.split('').map(c => c + c).join('');
            }
            r = parseInt(color.substr(0, 2), 16);
            g = parseInt(color.substr(2, 2), 16);
            b = parseInt(color.substr(4, 2), 16);
        } else if (color.startsWith('rgb')) {
            const rgbArray = color.match(/\d+/g);
            if (!rgbArray || rgbArray.length < 3) return 255;
            r = parseInt(rgbArray[0]);
            g = parseInt(rgbArray[1]);
            b = parseInt(rgbArray[2]);
        } else {
            return 255; // Domyślnie jasny
        }