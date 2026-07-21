// =====================================
// TODO LIST Mission Build 017
// =====================================

// TODO: Subtract PTO days.
// TODO: Add Phillies schedule.
// TODO: Add Padres ticket dates.
// TODO: Add next milestone card.
// TODO: Generate holidays automatically.

// =====================================
// Constants
// =====================================

const retirementDate = new Date("2029-03-01");
const trip = {
    city: "Sydney",
    destination: "Sydney, Australia",
    departureDate: new Date("2026-10-18"),
    airline: "Qantas",
    flight: "LAX → SYD",
    timeZone: "Australia/Sydney"
};

const tokyoOptions = {
    timeZone: "Asia/Tokyo"
};

// =====================================
// Milestones
// =====================================

const milestones = [
    {
        title: "Labor Day",
        date: new Date("2026-09-07"),
        type: "holiday"
    },
    {
        title: "Birthday",
        date: new Date("2026-09-27"),
        type: "personal"
    },
    {
        title: "Veterans Day",
        date: new Date("2026-11-11"),
        type: "holiday"
    },
    {
        title: "Thanksgiving",
        date: new Date("2026-11-26"),
        type: "holiday"
    },
    {
        title: "Christmas",
        date: new Date("2026-12-25"),
        type: "holiday"
    },
    {
        title: "Retirement",
        date: retirementDate,
        type: "life"
    }
];

// =====================================
// Holidays (Excluded from Working Days)
// =====================================

const holidays = [
    "2026-09-07", // Labor Day
    "2026-11-11", // Veterans Day
    "2026-11-26", // Thanksgiving
    "2026-12-25"  // Christmas
];
const ptoDays = [
    // Future Mission Build
    
];

// =====================================
// Functions
// =====================================

function getNextMilestone() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return milestones.find(milestone => milestone.date >= today);
}
    function updateNextMilestone() {

    const milestone = getNextMilestone();

    if (!milestone) return;

    const icon = getMilestoneIcon(milestone.type);

   document.getElementById("nextEventName").textContent =
    `${icon} ${milestone.title}`;

    const daysRemaining = getDaysUntil(milestone.date);

    const dayText = daysRemaining === 1 ? "Day" : "Days";

    document.getElementById("nextEventDate").textContent =
    `in ${daysRemaining} ${dayText}`;

}

function getDaysUntil(targetDate) {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const target = new Date(targetDate);

    target.setHours(0, 0, 0, 0);

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    return Math.round((target - today) / millisecondsPerDay);

}

function getMilestoneIcon(type) {

    switch (type) {

        case "holiday":
            return "🇺🇸";

        case "personal":
            return "🎂";

        case "travel":
            return "✈️";

        case "life":
            return "🎉";

        default:
            return "📅";
    }

}
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
    currentDate.setHours(0, 0, 0, 0);
    

   
    while (currentDate < retirementDate) {

    const dayOfWeek = currentDate.getDay();

    const dateString =
        currentDate.getFullYear() + "-" +
        String(currentDate.getMonth() + 1).padStart(2, "0") + "-" +
        String(currentDate.getDate()).padStart(2, "0");

    if (
        dayOfWeek >= 1 &&
        dayOfWeek <= 5 &&
        !holidays.includes(dateString)
            
)
    {
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

    document.getElementById("tripNumber").textContent =
        daysRemaining;

    document.getElementById("tripDepartureDate").textContent =
        trip.departureDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

    document.getElementById("tripFlight").textContent =
        `${trip.airline} • ${trip.flight}`;

    document.getElementById("tripDestination").textContent =
        trip.destination;

    const hour = Number(
    new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        hour12: false,
        timeZone: trip.timeZone
    }).format(new Date())

);


if (hour >= 9 && hour < 17) {

    document.getElementById("businessHours").textContent =
        "🟢 Business Hours";

} else {

    document.getElementById("businessHours").textContent =
        "🌙 Outside Business Hours";

}    
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
        timeZone: trip.timeZone
    });

    document.getElementById("tokyoDate").textContent =
        now.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            timeZone: trip.timeZone
        });

    document.getElementById("tokyoTime").textContent =
    now.toLocaleTimeString("en-US", {
        timeZone: trip.timeZone
    });

}


// =====================================
// Sunrise & Sunset
// =====================================

async function updateSunriseSunset() {

    const url =
        "https://api.sunrise-sunset.org/json?lat=33.0369&lng=-117.2919&formatted=0";

    try {

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

    } catch (error) {

        console.error("Unable to load sunrise/sunset:", error);

        document.getElementById("sunrise").textContent =
            "Sunrise: --";

        document.getElementById("sunset").textContent =
            "Sunset: --";
    }

}


// =====================================
// Start Everything
// =====================================

updateRetirementCountdown();
updateWorkingDaysCountdown();
updateJapanCountdown();
updateToday();
updateSunriseSunset();
updateNextMilestone();

setInterval(updateToday, 1000);