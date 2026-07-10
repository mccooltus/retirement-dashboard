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