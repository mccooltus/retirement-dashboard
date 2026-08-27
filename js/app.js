// =====================================
// TODO LIST Mission Build 021
// =====================================

// TODO: Subtract PTO days.
// TODO: Add Phillies schedule.
// TODO: Add Padres ticket dates.
// TODO: Add next milestone card.
// TODO: Generate holidays automatically.

// =====================================
// Constants
// =====================================

const tripDepartureTime = document.getElementById("tripDepartureTime");
const retirementDate = new Date("2029-03-01");
const trip = {
    title: "Next Adventure",
    status: "Booked",

    city: "Auckland",
    country: "New Zealand",

    latitude: -36.8509,
    longitude: 174.7645,

    departureDateTime: new Date("2026-10-20T21:10:00"),
    arrivalDateTime: new Date("2026-10-22T06:00:00+13:00"),

    departureAirport: "LAX",
    arrivalAirport: "AKL",

    airline: "Air New Zealand",
    flight: "NZ5",

    timeZone: "Pacific/Auckland"
};

const aucklandOptions = {
    timeZone: "Pacific/Auckland",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};
const upcomingTrips = [
    {
        type: "Work",
        icon: "💼",
        destination: "Charlotte",
        startDate: new Date("2026-08-26T00:00:00"),
        endDate: new Date("2026-09-02T00:00:00")
    },
    {
        type: "Work",
        icon: "💼",
        destination: "New York → Philadelphia → Bethesda",
        startDate: new Date("2026-09-26T00:00:00"),
        endDate: new Date("2026-10-12T00:00:00")
    },
    {
        type: "Personal",
        icon: "🏠",
        destination: "Philadelphia",
        startDate: new Date("2026-11-19T00:00:00"),
        endDate: new Date("2026-12-02T00:00:00")
    }
];

function updateUpcomingTrips() {

    const container =
        document.getElementById("upcomingTrips");

    upcomingTrips.forEach(trip => {

        const tripElement =
            document.createElement("div");

        const startDate =
            trip.startDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric"
            });

        const endDate =
            trip.endDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
            });

        tripElement.innerHTML = `
            <div>${trip.icon} ${trip.destination}</div>
            <div>${trip.type} Trip</div>
            <div>${startDate} – ${endDate}</div>
        `;

        container.appendChild(tripElement);
    });
}



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
        title: "50th HS Reunion",
        date: new Date("2026-10-03"),
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

    // ==========================
    // 2026
    // ==========================
    "2026-09-07", // Labor Day
    "2026-11-11", // Veterans Day
    "2026-11-26", // Thanksgiving
    "2026-12-25", // Christmas

    // ==========================
    // 2027
    // ==========================
    "2027-01-01", // New Year's Day
    "2027-01-18", // Martin Luther King Jr. Day
    "2027-02-15", // Presidents Day
    "2027-05-31", // Memorial Day
    "2027-06-18", // Juneteenth (Observed)
    "2027-07-05", // Independence Day (Observed)
    "2027-09-06", // Labor Day
    "2027-11-11", // Veterans Day
    "2027-11-25", // Thanksgiving
    "2027-12-24", // Christmas (Observed)

    // ==========================
    // 2028
    // ==========================
    "2028-01-17", // Martin Luther King Jr. Day
    "2028-02-21", // Presidents Day
    "2028-05-29", // Memorial Day
    "2028-06-19", // Juneteenth
    "2028-07-04", // Independence Day
    "2028-09-04", // Labor Day
    "2028-11-10", // Veterans Day (Observed)
    "2028-11-23", // Thanksgiving
    "2028-12-25", // Christmas

    // ==========================
    // 2029
    // ==========================
    "2029-01-01", // New Year's Day
    "2029-01-15", // Martin Luther King Jr. Day
    "2029-02-19"  // Presidents Day

];

const pto = [

    // Summer PTO
    "2026-07-27",
    "2026-07-28",
    "2026-07-29",
    "2026-07-30",
    "2026-07-31",

    // New Zealand PTO
    "2026-10-20",
    "2026-10-21",
    "2026-10-22",
    "2026-10-23",
    "2026-10-26",
    "2026-10-27",
    "2026-10-28",
    "2026-10-29",
    "2026-10-30",
    "2026-11-02",
    "2026-11-03",
    "2026-11-04",
    "2026-11-05",
    "2026-11-06"

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
    !holidays.includes(dateString) &&
    !pto.includes(dateString)
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
// Trip Countdown
// =====================================

function updateTripCountdown() {

    const today = new Date();

    const difference = trip.departureDateTime - today;

    const daysRemaining = Math.ceil(
        difference / (1000 * 60 * 60 * 24)
    );

    document.getElementById("tripCountdown").textContent = daysRemaining;

    document.getElementById("tripDepartureDate").textContent =
        trip.departureDateTime.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

        tripDepartureTime.textContent =
            trip.departureDateTime.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit"
    }) + " PT";

    document.getElementById("tripArrivalDate").textContent =
        "Arrival: " +
        trip.arrivalDateTime.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            timeZone: trip.timeZone
    });

    document.getElementById("tripArrivalTime").textContent =
        "Arrival Time: " +
        trip.arrivalDateTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            timeZone: trip.timeZone
});

    const flightMilliseconds =
        trip.arrivalDateTime - trip.departureDateTime;

    const flightHours =
        Math.floor(flightMilliseconds / (1000 * 60 * 60));

    const flightMinutes =
        Math.floor((flightMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

document.getElementById("tripFlightDuration").textContent =
    `Flight Duration: ${flightHours}h ${flightMinutes}m`;


    document.getElementById("tripFlight").textContent =
        `${trip.airline} • ${trip.flight}`;

    document.getElementById("tripDestination").textContent =
        `${trip.city}, ${trip.country}`

    const hour = Number(
    new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        hour12: false,
        timeZone: trip.timeZone
    }).format(new Date())

);


if (hour >= 9 && hour < 17) {

    document.getElementById("businessHours").textContent =
        "🟢 Auckland Business Hours";

} else {

    document.getElementById("businessHours").textContent =
        "🌙 Outside Business Hours";

}    
}   


// =====================================
// Today & Destination
// =====================================

function updateToday() {

    const now = new Date();

// Home (Pacific Time)

document.getElementById("currentDay").textContent =
    now.toLocaleDateString("en-US", {
        weekday: "long",
        timeZone: "America/Los_Angeles"
    });

document.getElementById("currentDate").textContent =
    now.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "America/Los_Angeles"
    });

document.getElementById("currentTime").textContent =
    now.toLocaleTimeString("en-US", {
        timeZone: "America/Los_Angeles"
    });

    document.getElementById("tripDate").textContent =
        now.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            timeZone: trip.timeZone
        });

    document.getElementById("tripTime").textContent =
    now.toLocaleTimeString("en-US", {
        timeZone: trip.timeZone
    });

}

// =====================================
// Sunrise / Sunset Helper
// =====================================

async function getSunriseSunset(
    latitude,
    longitude,
    date = "today",
    timeZone = "UTC"
) {

    const url =
        `https://api.sunrise-sunset.org/v2?lat=${latitude}&lng=${longitude}&date=${date}&tz=${encodeURIComponent(timeZone)}`;

    const response = await fetch(url);

    const data = await response.json();

    return {
        sunrise: new Date(data.sunrise),
        sunset: new Date(data.sunset)
    };

}

// =====================================
// Sunrise & Sunset
// =====================================

async function updateSunriseSunset() {

    try {

    const { sunrise, sunset } =
    await getSunriseSunset(
        33.0369,
        -117.2919,
        "today",
        "America/Los_Angeles"
    );

        

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
// Trip Sunrise & Sunset
// =====================================

async function updateTripSunriseSunset() {

    try {

       const { sunrise, sunset } =
        await getSunriseSunset(
        trip.latitude,
        trip.longitude,
        "2026-10-22",
        trip.timeZone
    );

        
        document.getElementById("tripSunrise").textContent =
            "☀️ Sunrise: " +
            sunrise.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                timeZone: trip.timeZone
            });

        document.getElementById("tripSunset").textContent =
            "🌇 Sunset: " +
            sunset.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                timeZone: trip.timeZone
            });

    } catch (error) {

        console.error("Unable to load trip sunrise/sunset:", error);

        document.getElementById("tripSunrise").textContent =
            "☀️ Sunrise: --";

        document.getElementById("tripSunset").textContent =
            "🌇 Sunset: --";

    }

}

// =====================================
// Start Everything
// =====================================

updateRetirementCountdown();
updateWorkingDaysCountdown();
updateTripCountdown();
updateToday();
updateSunriseSunset();
updateNextMilestone();
updateTripSunriseSunset();
updateUpcomingTrips();

setInterval(updateToday, 1000);