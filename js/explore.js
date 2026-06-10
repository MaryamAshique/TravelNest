/* ELEMENTS */

const grid = document.getElementById("grid");
const pagination = document.getElementById("pagination");
const continentFilter = document.getElementById("continentFilter");
const placeFilter = document.getElementById("placeFilter");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");

/* STATE */

let currentPage = 1;
const perPage = 9;
let filtered = destinations;
let activeContinent = "all";
let activePlace = "all";

/* HELPERS */

function getPlanned() {
    return JSON.parse(localStorage.getItem("plannedDestinations")) || [];
}

function getVisited() {
    return JSON.parse(localStorage.getItem("visitedDestinations")) || [];
}

/* RENDER */

function render() {

    grid.innerHTML = "";

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const items = filtered.slice(start, end);

    const planned = getPlanned();
    const visited = getVisited();

    items.forEach(d => {

        const isPlanned = planned.some(x => x.name === d.name);
        const isVisited = visited.some(x => x.name === d.name);

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="card-img-wrapper">

                <img src="${d.images[0]}" alt="${d.name}">

                <button
                    class="visited-btn ${isVisited ? "active" : ""}"
                    title="${isVisited ? "Remove from Visited" : "Mark as Visited"}"
                >
                    ✓
                </button>

            </div>

            <div class="card-body">

                <div class="card-info">

                    <div>
                        <h2>${d.name}</h2>
                        <p>${d.country}</p>
                    </div>

                    <button
                        class="plan-btn ${isPlanned ? "active" : ""}"
                        title="${isPlanned ? "Remove from Plan" : "Add to Plan"}"
                    >
                        <i class="${isPlanned ? "fa-solid" : "fa-regular"} fa-bookmark"></i>
                    </button>

                </div>

            </div>
        `;

        card.onclick = () => openModal(d);
        grid.appendChild(card);

        const planBtn = card.querySelector(".plan-btn");
        const visitedBtn = card.querySelector(".visited-btn");

        /* VISITED TOGGLE */

        visitedBtn.onclick = (e) => {

            e.stopPropagation();

            let visited = getVisited();
            let planned = getPlanned();

            const visitedIndex =
            visited.findIndex(x => x.name === d.name);

            if (visitedIndex === -1) {

                visited.push({
                    name: d.name,
                    country: d.country,
                    image: d.images[0]
                });

                planned =
                planned.filter(x => x.name !== d.name);

            } else {

                visited.splice(visitedIndex, 1);
            }

            localStorage.setItem(
                "visitedDestinations",
                JSON.stringify(visited)
            );

            localStorage.setItem(
                "plannedDestinations",
                JSON.stringify(planned)
            );

            render();
        };

        /* PLAN TOGGLE */

        planBtn.onclick = (e) => {

            e.stopPropagation();

            let planned = getPlanned();
            let visited = getVisited();

            const plannedIndex =
            planned.findIndex(x => x.name === d.name);

            if (plannedIndex === -1) {

                planned.push({
                    name: d.name,
                    country: d.country,
                    image: d.images[0]
                });

                visited =
                visited.filter(x => x.name !== d.name);

            } else {

                planned.splice(plannedIndex, 1);
            }

            localStorage.setItem(
                "plannedDestinations",
                JSON.stringify(planned)
            );

            localStorage.setItem(
                "visitedDestinations",
                JSON.stringify(visited)
            );

            render();
        };
    });

    renderPagination();
}

/* PAGINATION */

function renderPagination() {

    pagination.innerHTML = "";

    const pages = Math.ceil(filtered.length / perPage);

    for (let i = 1; i <= pages; i++) {

        const btn = document.createElement("div");
        btn.className = "page";
        btn.innerText = i;

        if (i === currentPage) btn.classList.add("active");

        btn.onclick = () => {
            currentPage = i;
            render();
        };

        pagination.appendChild(btn);
    }
}

/* MODAL */

let imgIndex = 0;
let currentImages = [];

function openModal(d) {

    currentImages = d.images;
    imgIndex = 0;

    document.getElementById("title").innerText = d.name;
    document.getElementById("country").innerText = d.country;
    document.getElementById("desc").innerText = d.desc;
    document.getElementById("modalImg").src = currentImages[0];

    const ul = document.getElementById("attractions");
    ul.innerHTML = "";

    d.attractions.forEach(a => {
        const li = document.createElement("li");
        li.innerText = a;
        ul.appendChild(li);
    });

    document.getElementById("bHotel").innerText = "$" + d.cost.b.h;
    document.getElementById("mHotel").innerText = "$" + d.cost.m.h;
    document.getElementById("lHotel").innerText = "$" + d.cost.l.h;

    document.getElementById("bFood").innerText = "$" + d.cost.b.f;
    document.getElementById("mFood").innerText = "$" + d.cost.m.f;
    document.getElementById("lFood").innerText = "$" + d.cost.l.f;

    document.getElementById("bTransport").innerText = "$" + d.cost.b.t;
    document.getElementById("mTransport").innerText = "$" + d.cost.m.t;
    document.getElementById("lTransport").innerText = "$" + d.cost.l.t;

    document.getElementById("bTotal").innerText =
        "$" + (d.cost.b.h + d.cost.b.f + d.cost.b.t);

    document.getElementById("mTotal").innerText =
        "$" + (d.cost.m.h + d.cost.m.f + d.cost.m.t);

    document.getElementById("lTotal").innerText =
        "$" + (d.cost.l.h + d.cost.l.f + d.cost.l.t);

    modal.style.display = "flex";
}

/* SLIDER */

document.getElementById("next").onclick = () => {
    imgIndex = (imgIndex + 1) % currentImages.length;
    document.getElementById("modalImg").src = currentImages[imgIndex];
};

document.getElementById("prev").onclick = () => {
    imgIndex = (imgIndex - 1 + currentImages.length) % currentImages.length;
    document.getElementById("modalImg").src = currentImages[imgIndex];
};

/* FILTER - CONTINENT */

continentFilter.onchange = () => {

    activeContinent = continentFilter.value;
    activePlace = "all";
    placeFilter.value = "all";

    placeFilter.innerHTML = `<option value="all">All Destinations</option>`;

    let base =
        activeContinent === "all"
            ? destinations
            : destinations.filter(d => d.continent === activeContinent);

    base.forEach(d => {
        const option = document.createElement("option");
        option.value = d.name;
        option.textContent = d.name;
        placeFilter.appendChild(option);
    });

    currentPage = 1;
    applyFilters();
};

/* FILTER - PLACE */

placeFilter.onchange = () => {

    activePlace = placeFilter.value;

    currentPage = 1;
    applyFilters();
};

function applyFilters() {

    let result = destinations;

    if (activeContinent !== "all") {
        result = result.filter(d => d.continent === activeContinent);
    }

    if (activePlace !== "all") {
        result = result.filter(d => d.name === activePlace);
    }

    filtered = result;
    render();
}

/* CLOSE MODAL */

closeBtn.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};

/* INIT */

destinations.forEach(d => {
    const option = document.createElement("option");
    option.value = d.name;
    option.textContent = d.name;
    placeFilter.appendChild(option);
});

render();

/* OPEN FROM STORAGE */

const selectedDestination =
    JSON.parse(localStorage.getItem("selectedDestination"));

if (selectedDestination) {

    const destination = destinations.find(
        d => d.name === selectedDestination.name
    );

    if (destination) openModal(destination);

    localStorage.removeItem("selectedDestination");
}