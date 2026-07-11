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
function updateTodayPanel() {

    const now = new Date();

    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    };

    const today = now.toLocaleDateString("en-US", options);

    const time = now.toLocaleTimeString("en-US");

    document.getElementById("todayPanel").innerHTML =
        today + "<br><strong>" + time + "</strong>";
}

updateTodayPanel();

setInterval(updateTodayPanel, 1000);