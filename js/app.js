// =====================================
// Constants
// =====================================

const retirementDate = new Date("March 1, 2029");
const trip = {
    departureDate: new Date("October 18, 2026"),
    destination: "Sydney, Australia",
    airline: "Qantas",
    flight: "LAX → SYD"
};

const tokyoOptions = {
    timeZone: "Asia/Tokyo"
};

// =====================================
// Non-Working Days
// =====================================

const nonWorkingDays = [
    {
        date: "2026-09-07",
        name: "Labor Day"
    },
    {
        date: "2026-11-11",
        name: "Veterans Day"
    },
    {
        date: "2026-11-26",
        name: "Thanksgiving"
    },
    {
        date: "2026-12-25",
        name: "Christmas"
    }
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

        const dateString =
            currentDate.getFullYear() + "-" +
            String(currentDate.getMonth() + 1).padStart(2, "0") + "-" +
            String(currentDate.getDate()).padStart(2, "0");

        if (
            dayOfWeek >= 1 &&
            dayOfWeek <= 5 &&
            !nonWorkingDays.some(day => day.date === dateString)
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

    const difference = trip.departureDate - today;

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