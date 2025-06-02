let clockInterval;
let timeFormat = 12;
let showSeconds = true;

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let ampm = '';
    if (timeFormat === 12) {
        ampm = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 should be 12
    }

    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    let timeString = `${hours}:${minutes}`;
    if (showSeconds) {
        timeString += `:${seconds}`;
    }
    timeString += ampm;

    document.getElementById('timeDisplay').textContent = timeString;

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const dateString = now.toLocaleDateString('en-US', options);
    document.getElementById('dateDisplay').textContent = dateString;

    const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeZoneOffset = -now.getTimezoneOffset() / 60;
    const offsetString = timeZoneOffset >= 0 ? `+${timeZoneOffset}` : timeZoneOffset;
    document.getElementById('timezoneInfo'). textContent = `${timezoneName} (UTC${offsetString})`;
}

function setTimeFormat(format) {
    timeFormat = format;

    document.getElementById('format12').classList.toggle('active', format === 12);
    document.getElementById('format24').classList.toggle('active', format === 24);

    updateClock();
}

function toggleSeconds() {
    showSeconds = !showSeconds;
    const btn = document.getElementById('toggleSeconds');
    btn.textContent = showSeconds ? 'Hide Seconds' : 'Show Seconds';
    btn.classList.toggle('active', !showSeconds);

    updateClock();
}

function startClock() {
    updateClock();

    clockInterval = setInterval(updateClock, 1000);
}

function stopClock() {
    if (clockInterval) {
        clearInterval(clockInterval);
        clockInterval = null;
    }
}

window.addEventListener('load', startClock);
window.addEventListener('beforeunload', stopClock);

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        if (!clockInterval) {
            startClock();
        }
    } else {
        stopClock();
    }
});