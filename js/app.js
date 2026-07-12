const retirementDate = new Date("March 1, 2029");

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
// Japan Countdown
// =====================================

const japanDepartureDate = new Date("July 17, 2026");

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

    const tokyoOptions = {
        timeZone: "Asia/Tokyo"
    };

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
// Start Everything
// =====================================

updateRetirementCountdown();
updateJapanCountdown();
document.getElementById("japanDepartureDate").textContent =
    "Friday, July 17, 2026";

document.getElementById("japanFlight").innerHTML =
    "United Airlines<br>LAX → HND";

document.getElementById("japanDestination").textContent =
    "Tokyo, Japan";
updateToday();

setInterval(updateToday, 1000);
