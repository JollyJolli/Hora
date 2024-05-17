let is24HourFormat = JSON.parse(localStorage.getItem('is24HourFormat')) ?? true;
let isLightMode = JSON.parse(localStorage.getItem('isLightMode')) ?? false;

function updateClock() {
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    const now = new Date();

    const hours = is24HourFormat ? now.getHours() : now.getHours() % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = is24HourFormat ? '' : now.getHours() >= 12 ? ' PM' : ' AM';

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayName = dayNames[now.getDay()];

    clockElement.textContent = `${String(hours).padStart(2, '0')}:${minutes}:${seconds}${ampm}`;
    dateElement.textContent = `${dayName}, ${day}/${month}/${year}`;
}

function toggleFormat() {
    is24HourFormat = !is24HourFormat;
    const toggleFormatIcon = document.getElementById('toggleFormatIcon');
    toggleFormatIcon.classList.toggle('fa-clock');
    toggleFormatIcon.classList.toggle('fa-hourglass-half');
    localStorage.setItem('is24HourFormat', is24HourFormat);
    updateClock(); // Update immediately when format is toggled
}

function toggleTheme() {
    isLightMode = !isLightMode;
    const body = document.body;
    body.classList.toggle('light-mode');
    const toggleThemeIcon = document.getElementById('toggleThemeIcon');
    toggleThemeIcon.classList.toggle('fa-sun');
    toggleThemeIcon.classList.toggle('fa-moon');
    localStorage.setItem('isLightMode', isLightMode);
}

function setGreeting() {
    const greetingElement = document.getElementById('greeting');
    const now = new Date();
    const hours = now.getHours();
    let greeting;

    if (hours < 12) {
        greeting = 'Buenos días';
    } else if (hours < 18) {
        greeting = 'Buenas tardes';
    } else {
        greeting = 'Buenas noches';
    }

    greetingElement.textContent = greeting;
}

document.getElementById('toggleFormatBtn').addEventListener('click', toggleFormat);
document.getElementById('toggleThemeBtn').addEventListener('click', toggleTheme);

setInterval(updateClock, 1000);
updateClock(); // Initial call to set the time immediately
setGreeting();

// Apply saved settings
if (isLightMode) {
    document.body.classList.add('light-mode');
    document.getElementById('toggleThemeIcon').classList.replace('fa-sun', 'fa-moon');
}
if (!is24HourFormat) {
    document.getElementById('toggleFormatIcon').classList.replace('fa-clock', 'fa-hourglass-half');
}
