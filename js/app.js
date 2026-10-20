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

    departureDateTime: new Date("2026-10-21T21:10:00"),
arrivalDateTime: new Date("2026-10-23T06:00:00+13:00"),

    departureAirport: "LAX",
    arrivalAirport: "AKL",

    airline: "Air New Zealand",
    flight: "NZ5",

    
returnFlight: "NZ4",
returnDepartureDateTime: new Date("2026-11-06T19:00:00+13:00"),
returnArrivalDateTime: new Date("2026-11-06T10:05:00-08:00"),

returnDepartureAirport: "AKL",
returnArrivalAirport: "LAX",

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
        destination: "Philadelphia → Bethesda",
        startDate: new Date("2026-09-30T00:00:00"),
        endDate: new Date("2026-10-12T00:00:00")
    },
    {
        type: "Personal",
        icon: "🏠",
        destination: "Philadelphia",
        startDate: new Date("2026-11-18T00:00:00"),
        endDate: new Date("2026-12-02T00:00:00")
    }
];

function updateUpcomingTrips() {

    const container =
        document.getElementById("upcomingTrips");

    // Clear the container before rebuilding the list
    container.innerHTML = "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    upcomingTrips.forEach(trip => {

        // Skip trips that have already ended
        if (trip.endDate < today) {
            return;
        }

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

        // Calculate days until departure
        const daysUntilDeparture =
            Math.ceil(
                (trip.startDate - today) /
                (1000 * 60 * 60 * 24)
            );

        let countdownText = "";

        if (daysUntilDeparture > 0) {

            countdownText =
                `${daysUntilDeparture} DAYS UNTIL DEPARTURE`;

        } else if (daysUntilDeparture === 0) {

            countdownText =
                "DEPARTING TODAY!";

        } else {

            countdownText =
                "CURRENTLY ON TRIP";
        }

        tripElement.innerHTML = `
            <div class="trip-destination">
                ${trip.icon} ${trip.destination}
            </div>

            <div class="trip-type">
                ${trip.type} Trip
            </div>

            <div class="trip-dates">
                ${startDate} – ${endDate}
            </div>

            <div class="trip-countdown">
                ${countdownText}
            </div>
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
        date: new Date("2026-09-07T00:00:00"),
        type: "holiday"
    },
    {
        title: "Birthday",
        date: new Date("2026-09-27T00:00:00"),
        type: "personal"
    },
    {
        title: "50th HS Reunion",
        date: new Date("2026-10-03T00:00:00"),
        type: "personal"
},
    {
        title: "Veterans Day",
        date: new Date("2026-11-11T00:00:00"),
        type: "holiday"
    },
    {
        title: "Thanksgiving",
        date: new Date("2026-11-26T00:00:00"),
        type: "holiday"
    },
    {
        title: "Christmas",
        date: new Date("2026-12-25T00:00:00"),
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

    const dayText = daysRemaining === 1 ? "DAY" : "DAYS";

    document.getElementById("nextEventDate").textContent =
        `${daysRemaining} ${dayText}`;

    document.getElementById("nextEventDateValue").textContent =
        milestone.date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
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

const departure = trip.departureDateTime;
const arrival = trip.arrivalDateTime;

// Compare calendar dates
const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
);

const departureDate = new Date(
    departure.getFullYear(),
    departure.getMonth(),
    departure.getDate()
);

if (
    todayDate.getTime() === departureDate.getTime() &&
    today < departure
) {

    document.getElementById("tripCountdown").textContent =
        "✈️";

    document.getElementById("tripCountdownLabel").textContent =
        "DEPARTING TODAY!";

} else if (today < departure) {

    const daysRemaining = Math.ceil(
        (departure - today) /
        (1000 * 60 * 60 * 24)
    );

    document.getElementById("tripCountdown").textContent =
        daysRemaining;

    document.getElementById("tripCountdownLabel").textContent =
        "DAYS UNTIL DEPARTURE";

} else if (today < arrival) {

    document.getElementById("tripCountdown").textContent =
        "✈️";

    document.getElementById("tripCountdownLabel").textContent =
        "CURRENTLY TRAVELING";

} else {

    document.getElementById("tripCountdown").textContent =
        "✓";

    document.getElementById("tripCountdownLabel").textContent =
        "TRIP COMPLETE";
}
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
    `${trip.airline} - ${trip.flight}`;


   document.getElementById("tripReturnDate").textContent =
    `Return Departure: ${trip.returnDepartureDateTime.toLocaleDateString("en-US", {
        timeZone: trip.timeZone,
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    })} at ${trip.returnDepartureDateTime.toLocaleTimeString("en-US", {
        timeZone: trip.timeZone,
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short"
    })}`;

document.getElementById("tripReturnFlight").textContent =
    `${trip.airline} - ${trip.returnFlight} (${trip.returnDepartureAirport} → ${trip.returnArrivalAirport})`;

;


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
// Auckland Weather
// =====================================

function getWeatherIcon(weatherCode) {

    if (weatherCode === 0) {
        return "☀️";
    }

    if (weatherCode <= 2) {
        return "🌤️";
    }

    if (weatherCode === 3) {
        return "☁️";
    }

    if (weatherCode <= 48) {
        return "🌫️";
    }

    if (weatherCode <= 67) {
        return "🌧️";
    }

    if (weatherCode <= 77) {
        return "❄️";
    }

    if (weatherCode <= 82) {
        return "🌦️";
    }

    if (weatherCode <= 86) {
        return "🌨️";
    }

    return "⛈️";
}


async function updateAucklandWeather() {

    const weatherContainer =
        document.getElementById("aucklandWeather");

    try {

        const url =
            "https://api.open-meteo.com/v1/forecast" +
            "?latitude=-36.8485" +
            "&longitude=174.7633" +
            "&daily=weather_code,temperature_2m_max,temperature_2m_min" +
            "&temperature_unit=fahrenheit" +
            "&timezone=Pacific%2FAuckland" +
            "&forecast_days=7";

        const response = await fetch(url);

        const data = await response.json();

        weatherContainer.innerHTML = "";

        for (let i = 0; i < data.daily.time.length; i++) {

            const date = new Date(
                data.daily.time[i] + "T12:00:00"
            );

            const day =
                date.toLocaleDateString("en-US", {
                    weekday: "short"
                });

            const icon =
                getWeatherIcon(
                    data.daily.weather_code[i]
                );

            const high =
                Math.round(
                    data.daily.temperature_2m_max[i]
                );

            const low =
                Math.round(
                    data.daily.temperature_2m_min[i]
                );

            const weatherDay =
                document.createElement("div");

            weatherDay.className =
                "weather-day";

            weatherDay.innerHTML = `
                <span class="weather-day-name">
                    ${day}
                </span>

                <span class="weather-icon">
                    ${icon}
                </span>

                <span class="weather-temp">
                    ${high}° / ${low}°
                </span>
            `;

            weatherContainer.appendChild(
                weatherDay
            );
        }

    } catch (error) {

        console.error(
            "Unable to load Auckland weather:",
            error
        );

        weatherContainer.textContent =
            "Weather unavailable";
    }
}

// =====================================
// Start Everything
// =====================================

updateRetirementCountdown();
updateWorkingDaysCountdown();
updateTripCountdown();
updateToday();
updateNextMilestone();
updateTripSunriseSunset();
updateUpcomingTrips();
updateAucklandWeather();

setInterval(updateToday, 1000);