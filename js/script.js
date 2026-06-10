/* =========================
   COMMON LOGIC (GLOBAL FILE)
========================= */

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("show");

        if (navMenu.classList.contains("show")) {
            hamburger.textContent = "✕";
        } else {
            hamburger.textContent = "☰";
        }
    });
}

function getImages(name){
    const clean = name.toLowerCase().replace(/\s/g, "");
    return [
        `images/${clean}1.jpg`,
        `images/${clean}2.jpg`,
        `images/${clean}3.jpg`
    ];
}

/* LEVEL SYSTEM (USED BY ALL PAGES) */
function getBudgetTotal(destination, type) {
    if (!destination?.cost?.[type]) return 0;

    const { h = 0, f = 0, t = 0 } = destination.cost[type];
    return h + f + t;
}

function getAverageCost(destination) {
    const b = getBudgetTotal(destination, "b");
    const m = getBudgetTotal(destination, "m");
    const l = getBudgetTotal(destination, "l");

    return Math.round((b + m + l) / 3);
}

/* UNIVERSAL LEVEL CLASSIFIER */
function getDestinationLevel(destination) {
    const avg = getAverageCost(destination);

    if (avg < 250) return "budget";
    if (avg < 500) return "moderate";
    return "luxury";
}

/* OPTIONAL: FILTER HELPER (USED BY MULTIPLE PAGES) */
function filterDestinations(type, budget) {

    let list = destinations;

    if (type && type !== "all") {
        list = list.filter(d => d.category === type);
    }

    if (budget && budget !== "all") {
        list = list.filter(d => getDestinationLevel(d) === budget);
    }

    return list;
}

function getBudgetLabel(destination) {

    const totalB = getBudgetTotal(destination, "b");
    const totalM = getBudgetTotal(destination, "m");
    const totalL = getBudgetTotal(destination, "l");

    const avg = (totalB + totalM + totalL) / 3;

    if (avg < 200) return "low";
    if (avg < 500) return "medium";
    return "high";
}

/* DESTINATIONS DATA */

const destinations = [

{
name: "Bali",
country: "Indonesia",
continent: "Asia",
category: "Relaxation",
images: getImages("Bali"),
desc: "Bali, Indonesia — a tropical paradise known for its stunning beaches, lush rice terraces, ancient temples, breathtaking waterfalls, luxury resorts, vibrant nightlife, and unforgettable sunsets. A perfect blend of adventure, culture, relaxation, and natural beauty for every traveler.",
attractions: ["Ubud", "Tanah Lot Temple", "Mount Batur"],
cost: {
b:{h:40,f:10,t:5},
m:{h:120,f:35,t:20},
l:{h:300,f:80,t:50}
}
},

{
name: "Kyoto",
country: "Japan",
continent: "Asia",
category: "Cultural",
images: getImages("Kyoto"),
desc: "Kyoto — a timeless cultural gem where ancient temples, golden shrines, bamboo forests, and peaceful Zen gardens create a serene escape. Wander through lantern-lit streets, experience traditional tea ceremonies, and witness cherry blossoms painting the city in soft pink hues. A perfect harmony of history, elegance, and spiritual calm.",
attractions: ["Fushimi Inari", "Kinkaku-ji", "Arashiyama"],
cost: {
b:{h:60,f:15,t:10},
m:{h:180,f:50,t:30},
l:{h:350,f:100,t:60}
}
},

{
name: "Maldives",
country: "Maldives",
continent: "Asia",
category: "Relaxation",
images: getImages("Maldives"),
desc: "Maldives — a world-famous island paradise scattered across the Indian Ocean, known for its crystal-clear turquoise waters, powder-soft white sand beaches, and luxurious overwater villas. With vibrant coral reefs, peaceful lagoons, and unmatched serenity, it is the ultimate destination for relaxation, romance, and escaping into pure tropical bliss.",
attractions: ["Overwater Villas", "Coral Reefs", "Snorkeling"],
cost: {
b:{h:120,f:30,t:20},
m:{h:350,f:100,t:60},
l:{h:800,f:200,t:100}
}
},

{
name: "Paris",
country: "France",
continent: "Europe",
category: "Cultural",
images: getImages("Paris"),
desc: "Paris — the City of Light, where romantic streets, iconic landmarks like the Eiffel Tower, elegant cafés, and world-class art create an atmosphere of timeless beauty and sophistication.",
attractions: ["Eiffel Tower", "Louvre Museum", "Seine River"],
cost: {
b:{h:70,f:20,t:10},
m:{h:200,f:60,t:30},
l:{h:400,f:120,t:60}
}
},

{
name: "Santorini",
country: "Greece",
continent: "Europe",
category: "Relaxation",
images: getImages("Santorini"),
desc: "Santorini — a breathtaking island of whitewashed cliffside homes, blue-domed churches, and dramatic volcanic views over the Aegean Sea. Famous for its golden sunsets, romantic villages, and crystal-clear waters, it offers a dreamy blend of luxury, serenity, and iconic Mediterranean beauty.",
attractions: ["Oia", "Fira", "Sunset Views"],
cost: {
b:{h:80,f:25,t:15},
m:{h:220,f:70,t:40},
l:{h:500,f:150,t:80}
}
},

{
name: "Swiss Alps",
country: "Switzerland",
continent: "Europe",
category: "Nature",
images: getImages("Alps"),
desc: "Swiss Alps — a majestic world of snow-covered peaks, alpine villages, crystal lakes, and endless mountain horizons. Whether skiing in winter or hiking in summer, it delivers pure natural beauty, fresh mountain air, and peaceful scenic escapes at every turn.",
attractions: ["Matterhorn", "Zermatt", "Interlaken"],
cost: {
b:{h:90,f:30,t:20},
m:{h:250,f:80,t:50},
l:{h:600,f:200,t:120}
}
},

{
name: "Cape Town",
country: "South Africa",
continent: "Africa",
category: "Nature",
images: getImages("Capetown"),
desc: "Cape Town — a breathtaking coastal city framed by Table Mountain and the Atlantic Ocean. Known for its dramatic landscapes, vibrant culture, scenic beaches, and nearby vineyards, it blends natural beauty with urban energy and unforgettable views at every turn.",
attractions: ["Table Mountain", "Cape Point", "Waterfront"],
cost: {
b:{h:50,f:15,t:10},
m:{h:140,f:40,t:25},
l:{h:300,f:90,t:50}
}
},

{
name: "Marrakech",
country: "Morocco",
continent: "Africa",
category: "Cultural",
images: getImages("Marrakech"),
desc: "Marrakech — a sensory-rich city of bustling souks, colorful markets, intricate palaces, and warm desert energy. From spice-filled streets to historic architecture, it's a vibrant blend of tradition and exotic charm.",
attractions: ["Medina", "Souks", "Majorelle Garden"],
cost: {
b:{h:40,f:10,t:5},
m:{h:120,f:35,t:20},
l:{h:250,f:80,t:40}
}
},

{
name: "Cairo",
country: "Egypt",
continent: "Africa",
category: "Cultural",
images: getImages("Cairo"),
desc: "Cairo — a legendary city where ancient wonders meet modern life. Home to the Great Pyramids of Giza, bustling bazaars, and the Nile River, it offers a powerful journey through history, culture, and timeless civilization.",
attractions: ["Pyramids of Giza", "Sphinx", "Nile River"],
cost: {
b:{h:35,f:10,t:5},
m:{h:100,f:30,t:20},
l:{h:220,f:70,t:30}
}
},

{
name: "New York City",
country: "USA",
continent: "North America",
category: "Urban",
images: getImages("Newyork"),
desc: "New York City — a vibrant global hub where towering skyscrapers, neon lights, Broadway shows, and diverse cultures collide. From Central Park's calm green escape to Times Square's electric energy, it's a city that never sleeps and always inspires.",
attractions: ["Times Square", "Central Park", "Statue of Liberty"],
cost: {
b:{h:120,f:40,t:25},
m:{h:300,f:100,t:60},
l:{h:600,f:200,t:120}
}
},

{
name: "Banff",
country: "Canada",
continent: "North America",
category: "Nature",
images: getImages("Banff"),
desc: "Banff — a stunning wilderness paradise nestled in the Canadian Rockies, filled with turquoise lakes, snowy peaks, and pine forests. Home to Lake Louise and Moraine Lake, it's a dream destination for hiking, wildlife, and pure natural wonder.",
attractions: ["Lake Louise", "Banff National Park", "Icefields Parkway"],
cost: {
b:{h:80,f:25,t:15},
m:{h:220,f:70,t:40},
l:{h:500,f:150,t:80}
}
},

{
name: "Tulum",
country: "Mexico",
continent: "North America",
category: "Relaxation",
images: getImages("Tulum"),
desc: "Tulum — a coastal paradise where white sandy beaches meet turquoise Caribbean waters and ancient Mayan ruins overlook the sea. A perfect blend of bohemian lifestyle, tropical relaxation, and rich cultural history.",
attractions: ["Tulum Ruins", "Cenotes", "Beach Clubs"],
cost: {
b:{h:60,f:20,t:10},
m:{h:180,f:60,t:35},
l:{h:350,f:120,t:70}
}
},

{
name: "Rio de Janeiro",
country: "Brazil",
continent: "South America",
category: "Adventure",
images: getImages("Rio"),
desc: "Rio de Janeiro — a vibrant city of golden beaches, dramatic mountains, and world-famous landmarks like Christ the Redeemer. Known for its carnival energy, samba rhythms, and sunset views from Sugarloaf Mountain, it's pure life and color.",
attractions: ["Christ the Redeemer", "Copacabana", "Sugarloaf Mountain"],
cost: {
b:{h:50,f:15,t:10},
m:{h:150,f:50,t:30},
l:{h:300,f:100,t:60}
}
},

{
name: "Machu Picchu",
country: "Peru",
continent: "South America",
category: "Adventure",
images: getImages("Machupicchu"),
desc: "Machu Picchu — an ancient Incan wonder set high in the Andes, surrounded by misty peaks and lush green valleys. Its mysterious stone ruins, breathtaking mountain views, and sacred history create one of the world's most unforgettable journeys.",
attractions: ["Sun Gate", "Temple of the Sun", "Inca Trail"],
cost: {
b:{h:70,f:20,t:15},
m:{h:220,f:70,t:40},
l:{h:450,f:150,t:90}
}
},

{
name: "Cartagena",
country: "Colombia",
continent: "South America",
category: "Relaxation",
images: getImages("Cartagena"),
desc: "Cartagena — a colorful coastal city wrapped in colonial walls, vibrant streets, and Caribbean charm. Filled with music, tropical warmth, and historic architecture, it blends romance, culture, and seaside beauty effortlessly.",
attractions: ["Old Town", "Castillo San Felipe", "Beaches"],
cost: {
b:{h:40,f:12,t:8},
m:{h:120,f:40,t:25},
l:{h:250,f:80,t:50}
}
},

{
name: "Sydney",
country: "Australia",
continent: "Oceania",
category: "Urban",
images: getImages("Sydney"),
desc: "Sydney — a stunning harbor city famous for its Opera House, Harbour Bridge, golden beaches, and laid-back coastal lifestyle. From surfing at Bondi to sunset ferry rides, it's a perfect mix of urban energy and ocean beauty.",
attractions: ["Opera House", "Harbour Bridge", "Bondi Beach"],
cost: {
b:{h:90,f:30,t:20},
m:{h:250,f:80,t:50},
l:{h:500,f:180,t:100}
}
},

{
name: "Queenstown",
country: "New Zealand",
continent: "Oceania",
category: "Adventure",
images: getImages("Queenstown"),
desc: "Queenstown — an adrenaline-filled paradise surrounded by mountains and Lake Wakatipu. Known as the adventure capital of the world, it offers bungee jumping, skiing, hiking, and breathtaking alpine scenery.",
attractions: ["Lake Wakatipu", "Bungee Jumping", "Skyline Gondola"],
cost: {
b:{h:70,f:25,t:15},
m:{h:220,f:70,t:40},
l:{h:450,f:150,t:90}
}
},

{
name: "Bora Bora",
country: "French Polynesia",
continent: "Oceania",
category: "Luxury",
images: getImages("Borabora"),
desc: "Bora Bora — an ultra-luxurious island paradise surrounded by crystal-clear turquoise lagoons and coral reefs. Famous for its overwater bungalows, soft white sand beaches, and dramatic volcanic peaks, it offers unmatched tranquility, romance, and pure tropical escape far away from the world.",
attractions: ["Lagoon", "Overwater Villas", "Snorkeling"],
cost: {
b:{h:200,f:80,t:50},
m:{h:500,f:180,t:100},
l:{h:1000,f:300,t:200}
}
}

];


if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js")
      .then(() => {
        console.log("Service Worker registered");
      })
      .catch((err) => {
        console.log("Service Worker failed: ", err);
      });
  });
}


