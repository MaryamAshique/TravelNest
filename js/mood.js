const plannedGrid =
document.getElementById("plannedGrid");

const visitedGrid =
document.getElementById("visitedGrid");

/* AUDIO */

const oceanAudio =
document.getElementById("oceanAudio");

const rainAudio =
document.getElementById("rainAudio");

const jungleAudio =
document.getElementById("jungleAudio");

const soundToggles =
document.querySelectorAll(".sound-toggle");

/* STORAGE */

let planned =
JSON.parse(localStorage.getItem("plannedDestinations")) || [];

let visited =
JSON.parse(localStorage.getItem("visitedDestinations")) || [];

/* REMOVE DUPLICATES */

planned = planned.filter(
    (item, index, self) =>
    index === self.findIndex(d => d.name === item.name)
);

localStorage.setItem(
    "plannedDestinations",
    JSON.stringify(planned)
);

/* RENDER PLANNED */

function renderPlanned(){

    plannedGrid.innerHTML = "";

    if(planned.length === 0){

        plannedGrid.innerHTML =
        `<p class="empty">
        No planned destinations yet.
        </p>`;

        return;
    }

    planned.forEach(d => {

        const card =
        document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            <button
            class="delete-btn"
            title="Remove">
            ✕
            </button>

            <button
            class="visit-btn"
            title="Visited">
            ✓
            </button>

            <img src="${d.image}" alt="${d.name}">

            <div class="card-body">

                <h2>${d.name}</h2>

                <p>${d.country}</p>

            </div>

        `;

        const deleteBtn =
        card.querySelector(".delete-btn");

        const visitBtn =
        card.querySelector(".visit-btn");

        /* MOVE TO VISITED */

        visitBtn.addEventListener("click", () => {

            if(!visited.some(place => place.name === d.name)){
                visited.push(d);
            }

            planned =
            planned.filter(
                place => place.name !== d.name
            );

            localStorage.setItem(
                "plannedDestinations",
                JSON.stringify(planned)
            );

            localStorage.setItem(
                "visitedDestinations",
                JSON.stringify(visited)
            );

            renderPlanned();
            renderVisited();
        });

        /* DELETE */

        deleteBtn.addEventListener("click", () => {

            planned =
            planned.filter(
                place => place.name !== d.name
            );

            localStorage.setItem(
                "plannedDestinations",
                JSON.stringify(planned)
            );

            renderPlanned();
        });

        plannedGrid.appendChild(card);
    });
}

/* RENDER VISITED */

function renderVisited(){

    visitedGrid.innerHTML = "";

    if(visited.length === 0){

        visitedGrid.innerHTML =
        `<p class="empty">
        No visited destinations yet.
        </p>`;

        return;
    }

    visited.forEach(d => {

        const card =
        document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            <button
            class="delete-btn"
            title="Remove">
            ✕
            </button>

            <img src="${d.image}" alt="${d.name}">

            <div class="card-body">

                <h2>${d.name}</h2>

                <p>${d.country}</p>

            </div>

        `;

        const deleteBtn =
        card.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", () => {

            visited =
            visited.filter(
                place => place.name !== d.name
            );

            localStorage.setItem(
                "visitedDestinations",
                JSON.stringify(visited)
            );

            renderVisited();
        });

        visitedGrid.appendChild(card);
    });
}

/* STOP ALL AUDIO */

function stopAllSounds(){

    oceanAudio.pause();
    rainAudio.pause();
    jungleAudio.pause();

    oceanAudio.currentTime = 0;
    rainAudio.currentTime = 0;
    jungleAudio.currentTime = 0;
}

soundToggles.forEach(toggle => {

    toggle.addEventListener("change", () => {

        stopAllSounds();

        soundToggles.forEach(t => {

            if(t !== toggle){
                t.checked = false;
            }
        });

        if(!toggle.checked) return;

        const sound =
        toggle.dataset.sound;

        if(sound === "ocean"){
            oceanAudio.play();
        }

        if(sound === "rain"){
            rainAudio.play();
        }

        if(sound === "jungle"){
            jungleAudio.play();
        }
    });
});

/* INITIAL */

renderPlanned();
renderVisited();