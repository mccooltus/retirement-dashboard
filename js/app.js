// =====================================
// Constants
// =====================================

const retirementDate = new Date("March 1, 2029");
const japanDepartureDate = new Date("July 17, 2026");

const tokyoOptions = {
    timeZone: "Asia/Tokyo"
};

// =====================================
// Non-Working Days
// =====================================

const nonWorkingDays = [
    "2026-09-07", // Labor Day
    "2026-11-11", // Veterans Day
    "2026-11-26", // Thanksgiving
    "2026-12-25"  // Christmas
];

// =====================================
// Retirement Countdown
// =====================================

function updateRetirementCountdown() {

    const today = new Date();

    const difference = retirementDate - today;

    const daysRemaining = Math.ceil(
        difference / (1000 * 60 * 60 * 24)
    );

    document.getElementById("retirementNumber").textContent =
        daysRemaining;
}


// =====================================
// Working Days
// =====================================

function updateWorkingDaysCountdown() {

    let workingDays = 0;

    let currentDate = new Date();

    while (currentDate < retirementDate) {

        const dayOfWeek = currentDate.getDay();

        const dateString = currentDate.toISOString().split("T")[0];

        if (
            dayOfWeek >= 1 &&
            dayOfWeek <= 5 &&
            !nonWorkingDays.includes(dateString)
        ) {

            workingDays++;

        }

        currentDate.setDate(currentDate.getDate() + 1);

    }

    document.getElementById("workingDaysNumber").textContent =
        workingDays;

}



// =====================================
// Japan Countdown
// =====================================

function updateJapanCountdown() {

    const today = new Date();

    const difference = japanDepartureDate - today;

    const daysRemaining = Math.ceil(
        difference / (1000 * 60 * 60 * 24)
    );

    document.getElementById("japanNumber").textContent =
        daysRemaining;
}


// =====================================
// Today & Tokyo
// =====================================

function updateToday() {

    const now = new Date();

    // Today

    document.getElementById("currentDay").textContent =
        now.toLocaleDateString("en-US", {
            weekday: "long"
        });

    document.getElementById("currentDate").textContent =
        now.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        });

    document.getElementById("currentTime").textContent =
        now.toLocaleTimeString();

    // Tokyo

    document.getElementById("tokyoDay").textContent =
        now.toLocaleDateString("en-US", {
            weekday: "long",
            ...tokyoOptions
        });

    document.getElementById("tokyoDate").textContent =
        now.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            ...tokyoOptions
        });

    document.getElementById("tokyoTime").textContent =
        now.toLocaleTimeString("en-US", {
            timeZone: "Asia/Tokyo"
        });

}


// =====================================
// Sunrise & Sunset
// =====================================

async function updateSunriseSunset() {

    const url =
        "https://api.sunrise-sunset.org/json?lat=33.0369&lng=-117.2919&formatted=0";

    const response = await fetch(url);

    const data = await response.json();

    const sunrise = new Date(data.results.sunrise);

    const sunset = new Date(data.results.sunset);

    document.getElementById("sunrise").textContent =
        "Sunrise: " +
        sunrise.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit"
        });

    document.getElementById("sunset").textContent =
        "Sunset: " +
        sunset.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit"
        });

}


// =====================================
// Start Everything
// =====================================

document.getElementById("japanDepartureDate").textContent =
    "Friday, July 17, 2026";

document.getElementById("japanFlight").innerHTML =
    "United Airlines<br>LAX → HND";

document.getElementById("japanDestination").textContent =
    "Tokyo, Japan";

updateRetirementCountdown();
updateWorkingDaysCountdown();
updateJapanCountdown();
updateToday();
updateSunriseSunset();

setInterval(updateToday, 1000);