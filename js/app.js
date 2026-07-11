const retirementDate = new Date("March 1, 2029");

function updateRetirementCountdown() {

    const today = new Date();

    const difference = retirementDate - today;

    const daysRemaining = Math.ceil(
        difference / (1000 * 60 * 60 * 24)
    );

    document.getElementById("retirementCountdown").textContent =
        daysRemaining + " days remaining";
}

updateRetirementCountdown();
function updateToday() {

    const now = new Date();

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
}

updateToday();
setInterval(updateToday, 1000);