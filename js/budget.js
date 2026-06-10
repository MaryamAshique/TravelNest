const form = document.getElementById("budgetForm");
const results = document.getElementById("results");

const totalCostText = document.getElementById("totalCost");
const statusText = document.getElementById("status");
const progressBar = document.getElementById("progressBar");
const saveBtn = document.getElementById("saveBtn");

const destinationSelect = document.getElementById("destination");
const daysInput = document.getElementById("days");
const dailyBudgetInput = document.getElementById("dailyBudget");

const savedTripsGrid = document.getElementById("savedTripsGrid");

let currentTrip = null;

/* FORM SUBMIT */

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const destinationName = destinationSelect.value;
    const days = parseInt(daysInput.value, 10);
    const dailyBudget = parseInt(dailyBudgetInput.value, 10);

    if (isNaN(days) || isNaN(dailyBudget)) return;

    if (!destinationName || !days || !dailyBudget) return;

    const destination = destinations.find(
        d => d.name === destinationName
    );

    if (!destination) return;

    /* PER DAY COSTS */

    const budgetPerDay =
        destination.cost.b.h +
        destination.cost.b.f +
        destination.cost.b.t;

    const moderatePerDay =
        destination.cost.m.h +
        destination.cost.m.f +
        destination.cost.m.t;

    const luxuryPerDay =
        destination.cost.l.h +
        destination.cost.l.f +
        destination.cost.l.t;

    /* TOTAL DESTINATION COSTS */

    const totalBudgetCost = budgetPerDay * days;
    const totalModerateCost = moderatePerDay * days;
    const totalLuxuryCost = luxuryPerDay * days;

    /* USER TOTAL COST */

    const userCost = dailyBudget * days;

    /* STATUS LOGIC */

    let status = "";

    if (userCost <= totalBudgetCost) {
        status = "Budget";
    }
    else if (userCost <= totalModerateCost) {
        status = "Moderate";
    }
    else {
        status = "Luxury";
    }

    /* SHOW RESULTS */

    results.style.display = "block";

    animateCounter(userCost);

    statusText.textContent = status;

    progressBar.classList.remove(
        "budget",
        "moderate",
        "luxury"
    );

    if (status === "Budget") {
        progressBar.classList.add("budget");
    }
    else if (status === "Moderate") {
        progressBar.classList.add("moderate");
    }
    else {
        progressBar.classList.add("luxury");
    }

    /* PROGRESS */

    let progress =
        (userCost / totalLuxuryCost) * 100;

    if (progress > 100) progress = 100;

    progressBar.style.width = progress + "%";

    /* SAVE OBJECT */

    currentTrip = {
        destination: destination.name,
        country: destination.country,
        days,
        dailyBudget,
        totalCost: userCost,
        status
    };
});

/* COUNTER */

function animateCounter(target) {

    let current = 0;

    const increment = target / 60;

    const interval = setInterval(() => {

        current += increment;

        if (current >= target) {
            current = target;
            clearInterval(interval);
        }

        totalCostText.textContent =
            "$" + Math.floor(current);

    }, 20);
}

/* SAVE */

saveBtn.addEventListener("click", () => {

    if (!currentTrip) return;

    let savedTrips =
        JSON.parse(
            localStorage.getItem("travelTrips")
        ) || [];

    savedTrips.push(currentTrip);

    localStorage.setItem(
        "travelTrips",
        JSON.stringify(savedTrips)
    );

    renderSavedTrips();

    alert("Trip saved successfully!");
});

/* RENDER SAVED TRIPS */

function renderSavedTrips() {

    const savedTrips =
        JSON.parse(
            localStorage.getItem("travelTrips")
        ) || [];

    savedTripsGrid.innerHTML = "";

    if (savedTrips.length === 0) {

        savedTripsGrid.innerHTML =
            `<p class="empty">No saved trips yet.</p>`;

        return;
    }

    savedTrips.forEach((trip, index) => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <div class="trip-number">
                ${index + 1}
            </div>

            <button class="trip-remove">
                ✕
            </button>

            <div class="card-body trip-details">

                <h3>${trip.destination}</h3>

                <p class="trip-country">
                    ${trip.country}
                </p>

                <ul>
                    <li><strong>Days:</strong> ${trip.days}</li>
                    <li><strong>Daily Budget:</strong> $${trip.dailyBudget}</li>
                    <li><strong>Total Cost:</strong> $${trip.totalCost}</li>
                    <li><strong>Category:</strong> ${trip.status}</li>
                </ul>

            </div>
        `;

        card.querySelector(".trip-remove")
            .addEventListener("click", () => {

                const updatedTrips =
                    JSON.parse(
                        localStorage.getItem("travelTrips")
                    ) || [];

                updatedTrips.splice(index, 1);

                localStorage.setItem(
                    "travelTrips",
                    JSON.stringify(updatedTrips)
                );

                renderSavedTrips();
            });

        savedTripsGrid.appendChild(card);
    });
}

/* INIT */

renderSavedTrips();