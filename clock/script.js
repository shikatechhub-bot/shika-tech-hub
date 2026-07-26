// ============================================
// MULTI-TIMEZONE DIGITAL CLOCK
// ============================================

// Timezone database
const TIMEZONES = [
    // Americas
    { name: 'New York', tz: 'America/New_York', region: 'Americas' },
    { name: 'Los Angeles', tz: 'America/Los_Angeles', region: 'Americas' },
    { name: 'Chicago', tz: 'America/Chicago', region: 'Americas' },
    { name: 'Denver', tz: 'America/Denver', region: 'Americas' },
    { name: 'Toronto', tz: 'America/Toronto', region: 'Americas' },
    { name: 'Mexico City', tz: 'America/Mexico_City', region: 'Americas' },
    { name: 'São Paulo', tz: 'America/Sao_Paulo', region: 'Americas' },
    { name: 'Buenos Aires', tz: 'America/Argentina/Buenos_Aires', region: 'Americas' },
    { name: 'Anchorage', tz: 'America/Anchorage', region: 'Americas' },
    { name: 'Honolulu', tz: 'Pacific/Honolulu', region: 'Americas' },

    // Europe
    { name: 'London', tz: 'Europe/London', region: 'Europe' },
    { name: 'Paris', tz: 'Europe/Paris', region: 'Europe' },
    { name: 'Berlin', tz: 'Europe/Berlin', region: 'Europe' },
    { name: 'Madrid', tz: 'Europe/Madrid', region: 'Europe' },
    { name: 'Rome', tz: 'Europe/Rome', region: 'Europe' },
    { name: 'Amsterdam', tz: 'Europe/Amsterdam', region: 'Europe' },
    { name: 'Vienna', tz: 'Europe/Vienna', region: 'Europe' },
    { name: 'Moscow', tz: 'Europe/Moscow', region: 'Europe' },
    { name: 'Istanbul', tz: 'Europe/Istanbul', region: 'Europe' },
    { name: 'Athens', tz: 'Europe/Athens', region: 'Europe' },

    // Asia
    { name: 'Dubai', tz: 'Asia/Dubai', region: 'Asia' },
    { name: 'Mumbai', tz: 'Asia/Kolkata', region: 'Asia' },
    { name: 'Bangkok', tz: 'Asia/Bangkok', region: 'Asia' },
    { name: 'Singapore', tz: 'Asia/Singapore', region: 'Asia' },
    { name: 'Hong Kong', tz: 'Asia/Hong_Kong', region: 'Asia' },
    { name: 'Shanghai', tz: 'Asia/Shanghai', region: 'Asia' },
    { name: 'Tokyo', tz: 'Asia/Tokyo', region: 'Asia' },
    { name: 'Seoul', tz: 'Asia/Seoul', region: 'Asia' },
    { name: 'Jakarta', tz: 'Asia/Jakarta', region: 'Asia' },
    { name: 'Manila', tz: 'Asia/Manila', region: 'Asia' },

    // Africa
    { name: 'Cairo', tz: 'Africa/Cairo', region: 'Africa' },
    { name: 'Johannesburg', tz: 'Africa/Johannesburg', region: 'Africa' },
    { name: 'Lagos', tz: 'Africa/Lagos', region: 'Africa' },
    { name: 'Nairobi', tz: 'Africa/Nairobi', region: 'Africa' },

    // Oceania
    { name: 'Sydney', tz: 'Australia/Sydney', region: 'Oceania' },
    { name: 'Melbourne', tz: 'Australia/Melbourne', region: 'Oceania' },
    { name: 'Auckland', tz: 'Pacific/Auckland', region: 'Oceania' },
    { name: 'Fiji', tz: 'Pacific/Fiji', region: 'Oceania' },
];

// Application state
const appState = {
    clocks: [],
    show12Hour: localStorage.getItem('show12Hour') !== 'false',
    showSeconds: localStorage.getItem('showSeconds') !== 'false',
    showDate: localStorage.getItem('showDate') !== 'false',
    showAnalog: localStorage.getItem('showAnalog') !== 'false',
    theme: localStorage.getItem('theme') || 'dark',
    updateInterval: null,
};

// DOM Elements
const clocksContainer = document.getElementById('clocksContainer');
const btnAddTimezone = document.getElementById('btnAddTimezone');
const btnSettings = document.getElementById('btnSettings');
const btnCloseSettings = document.getElementById('btnCloseSettings');
const settingsPanel = document.getElementById('settingsPanel');
const addTimezoneModal = document.getElementById('addTimezoneModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const overlay = document.getElementById('overlay');
const toggle12Hour = document.getElementById('toggle12Hour');
const toggleSeconds = document.getElementById('toggleSeconds');
const toggleDate = document.getElementById('toggleDate');
const toggleAnalog = document.getElementById('toggleAnalog');
const themeSelect = document.getElementById('themeSelect');
const timezoneInput = document.getElementById('timezoneInput');
const timezoneSuggestions = document.getElementById('timezoneSuggestions');
const popularTimezones = document.getElementById('popularTimezones');
const searchInput = document.getElementById('searchInput');

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Load saved clocks from localStorage
    const savedClocks = localStorage.getItem('clocks');
    if (savedClocks) {
        try {
            appState.clocks = JSON.parse(savedClocks);
        } catch (e) {
            appState.clocks = getDefaultClocks();
        }
    } else {
        appState.clocks = getDefaultClocks();
    }

    // Set theme
    setTheme(appState.theme);
    themeSelect.value = appState.theme;

    // Setup settings
    toggle12Hour.checked = appState.show12Hour;
    toggleSeconds.checked = appState.showSeconds;
    toggleDate.checked = appState.showDate;
    toggleAnalog.checked = appState.showAnalog;

    // Render clocks
    renderClocks();

    // Setup event listeners
    setupEventListeners();

    // Start clock updates
    updateClocks();
    appState.updateInterval = setInterval(updateClocks, 1000);

    // Populate popular timezones
    populateTimezones();
}

function getDefaultClocks() {
    return [
        'America/New_York',
        'Europe/London',
        'Asia/Tokyo',
        'Australia/Sydney',
    ];
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Button events
    btnAddTimezone.addEventListener('click', () => openModal());
    btnSettings.addEventListener('click', () => openSettings());
    btnCloseSettings.addEventListener('click', () => closeSettings());
    modalCloseBtn.addEventListener('click', () => closeModal());

    // Settings events
    toggle12Hour.addEventListener('change', (e) => {
        appState.show12Hour = e.target.checked;
        localStorage.setItem('show12Hour', appState.show12Hour);
        updateClocks();
    });

    toggleSeconds.addEventListener('change', (e) => {
        appState.showSeconds = e.target.checked;
        localStorage.setItem('showSeconds', appState.showSeconds);
        updateClocks();
    });

    toggleDate.addEventListener('change', (e) => {
        appState.showDate = e.target.checked;
        localStorage.setItem('showDate', appState.showDate);
        updateClocks();
    });

    toggleAnalog.addEventListener('change', (e) => {
        appState.showAnalog = e.target.checked;
        localStorage.setItem('showAnalog', appState.showAnalog);
        renderClocks();
    });

    themeSelect.addEventListener('change', (e) => {
        appState.theme = e.target.value;
        localStorage.setItem('theme', appState.theme);
        setTheme(appState.theme);
    });

    // Modal events
    overlay.addEventListener('click', () => {
        if (addTimezoneModal.classList.contains('open')) {
            closeModal();
        } else if (settingsPanel.classList.contains('open')) {
            closeSettings();
        }
    });

    // Timezone input
    timezoneInput.addEventListener('input', handleTimezoneSearch);

    // Search clocks
    searchInput.addEventListener('input', handleSearchClocks);
}

// ============================================
// MODAL MANAGEMENT
// ============================================

function openModal() {
    addTimezoneModal.classList.add('open');
    overlay.classList.add('show');
    timezoneInput.focus();
}

function closeModal() {
    addTimezoneModal.classList.remove('open');
    overlay.classList.remove('show');
    timezoneInput.value = '';
    timezoneSuggestions.innerHTML = '';
}

function openSettings() {
    settingsPanel.classList.add('open');
    overlay.classList.add('show');
}

function closeSettings() {
    settingsPanel.classList.remove('open');
    overlay.classList.remove('show');
}

// ============================================
// TIMEZONE MANAGEMENT
// ============================================

function handleTimezoneSearch(e) {
    const query = e.target.value.toLowerCase();
    const suggestions = TIMEZONES.filter(tz =>
        tz.name.toLowerCase().includes(query) || tz.tz.toLowerCase().includes(query)
    ).slice(0, 8);

    timezoneSuggestions.innerHTML = suggestions
        .map(tz => `
            <div class="timezone-suggestion-item" onclick="addTimezone('${tz.tz}')">
                ${tz.name} (${tz.tz})
            </div>
        `)
        .join('');
}

function populateTimezones() {
    const uniqueRegions = [...new Set(TIMEZONES.map(tz => tz.region))];
    const html = uniqueRegions
        .flatMap(region => {
            const tzInRegion = TIMEZONES.filter(tz => tz.region === region);
            return tzInRegion.slice(0, 4).map(tz =>
                `<button class="timezone-btn" onclick="addTimezone('${tz.tz}')">
                    ${tz.name}
                </button>`
            );
        })
        .join('');

    popularTimezones.innerHTML = html;
}

function addTimezone(tz) {
    if (!appState.clocks.includes(tz)) {
        appState.clocks.push(tz);
        saveClocks();
        renderClocks();
        closeModal();
    } else {
        alert('This timezone is already added!');
    }
}

function removeTimezone(tz) {
    appState.clocks = appState.clocks.filter(t => t !== tz);
    saveClocks();
    renderClocks();
}

function saveClocks() {
    localStorage.setItem('clocks', JSON.stringify(appState.clocks));
}

// ============================================
// RENDERING
// ============================================

function renderClocks() {
    clocksContainer.innerHTML = appState.clocks
        .map(tz => createClockCard(tz))
        .join('');

    // Add event listeners to remove buttons
    document.querySelectorAll('.clock-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tz = e.currentTarget.dataset.timezone;
            removeTimezone(tz);
        });
    });
}

function createClockCard(tz) {
    const tzData = TIMEZONES.find(t => t.tz === tz) || { name: tz, tz };

    return `
        <div class="clock-card" data-timezone="${tz}">
            <div class="clock-header">
                <div class="timezone-info">
                    <h3>${tzData.name}</h3>
                    <p>${tz}</p>
                </div>
                <button class="clock-remove" data-timezone="${tz}" title="Remove timezone">
                    <i class="fas fa-trash"></i>
                </button>
            </div>

            <div class="digital-display">
                <div class="time-display" data-timezone="${tz}">--:--</div>
                ${appState.showDate ? `<div class="date-display" data-date-tz="${tz}"></div>` : ''}
            </div>

            ${appState.showAnalog ? `
                <div class="analog-clock" data-analog-tz="${tz}">
                    <div class="clock-hand hour-hand" data-hour="${tz}"></div>
                    <div class="clock-hand minute-hand" data-minute="${tz}"></div>
                    <div class="clock-hand second-hand" data-second="${tz}"></div>
                </div>
            ` : ''}
        </div>
    `;
}

// ============================================
// CLOCK UPDATES
// ============================================

function updateClocks() {
    appState.clocks.forEach(tz => {
        updateTimeDisplay(tz);
        updateDateDisplay(tz);
        if (appState.showAnalog) {
            updateAnalogClock(tz);
        }
    });
}

function updateTimeDisplay(tz) {
    const element = document.querySelector(`.time-display[data-timezone="${tz}"]`);
    if (!element) return;

    const time = getTimeInTimezone(tz);
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        second: appState.showSeconds ? '2-digit' : undefined,
        hour12: appState.show12Hour,
    });

    element.textContent = formatter.format(time);
}

function updateDateDisplay(tz) {
    const element = document.querySelector(`.date-display[data-date-tz="${tz}"]`);
    if (!element) return;

    const time = getTimeInTimezone(tz);
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    element.textContent = formatter.format(time);
}

function updateAnalogClock(tz) {
    const time = getTimeInTimezone(tz);
    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const hourHand = document.querySelector(`.hour-hand[data-hour="${tz}"]`);
    const minuteHand = document.querySelector(`.minute-hand[data-minute="${tz}"]`);
    const secondHand = document.querySelector(`.second-hand[data-second="${tz}"]`);

    if (hourHand) {
        const hourDegrees = (hours * 30) + (minutes * 0.5);
        hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    }

    if (minuteHand) {
        const minuteDegrees = (minutes * 6) + (seconds * 0.1);
        minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    }

    if (secondHand) {
        const secondDegrees = seconds * 6;
        secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getTimeInTimezone(tz) {
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);

    // Use Intl API to get timezone offset
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    const parts = formatter.formatToParts(now);
    const dateObj = {};
    parts.forEach(part => {
        dateObj[part.type] = part.value;
    });

    const tzTime = new Date(`${dateObj.year}-${dateObj.month}-${dateObj.day}T${dateObj.hour}:${dateObj.minute}:${dateObj.second}Z`);
    return new Date(tzTime.getTime() + (now.getTimezoneOffset() * 60000));
}

function setTheme(theme) {
    document.body.className = `${theme}-theme`;
}

function handleSearchClocks(e) {
    const query = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.clock-card');

    cards.forEach(card => {
        const tzName = card.querySelector('.timezone-info h3').textContent.toLowerCase();
        const tzId = card.querySelector('.timezone-info p').textContent.toLowerCase();

        if (tzName.includes(query) || tzId.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ============================================
// PAGE VISIBILITY OPTIMIZATION
// ============================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(appState.updateInterval);
    } else {
        updateClocks();
        appState.updateInterval = setInterval(updateClocks, 1000);
    }
});

// ============================================
// CLEANUP
// ============================================

window.addEventListener('beforeunload', () => {
    clearInterval(appState.updateInterval);
});