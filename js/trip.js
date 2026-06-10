const typeFilter = document.getElementById("typeFilter");
const budgetFilter = document.getElementById("budgetFilter");

const cardWrapper = document.getElementById("cardWrapper");

const img = document.getElementById("img");
const nameEl = document.getElementById("name");

const againBtn = document.getElementById("againBtn");
const saveBtn = document.getElementById("saveBtn");
const viewBtn = document.getElementById("viewBtn");

const wishlistGrid = document.getElementById("wishlistGrid");
const section = document.getElementById("wishlistSection");

/* DATA */
const recommendationMap = {
    Adventure: {
        budget: ["Rio de Janeiro", "Machu Picchu"],
        moderate: ["Banff", "Queenstown"],
        luxury: ["Swiss Alps", "Queenstown"]
    },
    Relaxation: {
        budget: ["Cartagena", "Bali"],
        moderate: ["Tulum", "Santorini"],
        luxury: ["Maldives", "Bora Bora"]
    },
    Cultural: {
        budget: ["Cairo", "Marrakech"],
        moderate: ["Kyoto", "Paris"],
        luxury: ["Paris", "Kyoto"]
    },
    Nature: {
        budget: ["Cape Town", "Banff"],
        moderate: ["Swiss Alps", "Banff"],
        luxury: ["Swiss Alps", "Bora Bora"]
    },
    Urban: {
        budget: ["Rio de Janeiro", "Sydney"],
        moderate: ["Sydney", "New York"],
        luxury: ["New York", "Paris"]
    }
};

let list = [];
let index = 0;

/* BUILD LIST */
function buildList() {

    const type = typeFilter.value;
    const budget = budgetFilter.value;

    if (type === "all") {
        cardWrapper.classList.add("hidden");
        list = [];
        return;
    }

    const data = recommendationMap[type];
    if (!data) return;

    let names = [];

    if (budget === "all") {
        names = [...data.budget, ...data.moderate, ...data.luxury];
    } else {
        names = data[budget] || [];
    }

    list = names
        .map(name => destinations.find(d => d.name === name))
        .filter(Boolean);

    index = 0;

    if (list.length === 0) {
        cardWrapper.classList.add("hidden");
        return;
    }

    showCard();
    cardWrapper.classList.remove("hidden");
}

/* SHOW CARD (GENERATOR CARD) */
function showCard() {

    const d = list[index];
    if (!d) return;

    img.src = d.images[0];
    nameEl.textContent = `${d.name}, ${d.country}`;

    saveBtn.textContent = "Save";
}

/* SURPRISE */
againBtn.addEventListener("click", () => {
    if (!list.length) return;

    index = (index + 1) % list.length;
    showCard();
});

typeFilter.addEventListener("change", buildList);
budgetFilter.addEventListener("change", buildList);

/* STORAGE */
let tripWishlist =
    JSON.parse(localStorage.getItem("tripWishlist")) || [];

/* SAVE */
saveBtn.addEventListener("click", () => {

    const d = list[index];
    if (!d) return;

    if (!tripWishlist.some(x => x.name === d.name)) {
        tripWishlist.push({
            name: d.name,
            country: d.country,
            image: d.images[0]
        });
    }

    localStorage.setItem("tripWishlist", JSON.stringify(tripWishlist));
    renderWishlist();
});

/* RENDER WISHLIST */
function renderWishlist() {

    wishlistGrid.innerHTML = "";

    if (tripWishlist.length === 0) {
        wishlistGrid.innerHTML =
            `<p class="empty">No saved destinations yet.</p>`;
        return;
    }

    tripWishlist.forEach(d => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <button class="wishlist-remove">✕</button>

            <img src="${d.image}" alt="${d.name}">

            <div class="card-body">
                <h2>${d.name}</h2>
                <p>${d.country}</p>
            </div>
        `;

        /* REMOVE */
        card.querySelector(".wishlist-remove").onclick = () => {
            tripWishlist = tripWishlist.filter(x => x.name !== d.name);
            localStorage.setItem("tripWishlist", JSON.stringify(tripWishlist));
            renderWishlist();
        };

        wishlistGrid.appendChild(card);
    });
}

/* SCROLL TO WISHLIST */
viewBtn.addEventListener("click", () => {
    section.scrollIntoView({ behavior: "smooth" });
});

/* INIT */
renderWishlist();