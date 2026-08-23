/* =========================================
   HIDDEN INDIA — STATE PAGE LOGIC
   Destination + hotspot data now lives in
   data.js so it's shared with the homepage.
========================================= */


/* =========================================
   GET SELECTED STATE
========================================= */

const selectedState =
    localStorage.getItem("selectedState") || "Uttar Pradesh";



/* =========================================
   UPDATE STATE HEADER
========================================= */

document.getElementById("stateName").innerText = selectedState;

document.getElementById("stateDescription").innerText =
    stateDescriptions[selectedState] || "";



/* =========================================
   GET DESTINATIONS FOR THIS STATE
========================================= */

const stateDestinations =
    destinations[selectedState] || destinations["Uttar Pradesh"];


let activeFilter = "all";



/* =========================================
   BUILD FILTER CHIPS
   (only from tags that actually exist in this state)
========================================= */

function buildFilters() {

    const bar = document.getElementById("tagFilterBar");
    if (!bar) return;

    const tagsInState = new Set();
    stateDestinations.forEach(d => d.tags.forEach(t => tagsInState.add(t)));

    let html = `<button class="tag-filter selected" data-tag="all">All</button>`;

    tagsInState.forEach(tag => {
        html += `<button class="tag-filter" data-tag="${tag}">${interestLabels[tag] || tag}</button>`;
    });

    bar.innerHTML = html;

    bar.querySelectorAll(".tag-filter").forEach(btn => {
        btn.addEventListener("click", () => {
            bar.querySelectorAll(".tag-filter").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            activeFilter = btn.dataset.tag;
            renderGrid();
        });
    });

}



/* =========================================
   RENDER DESTINATION GRID
========================================= */

const grid = document.getElementById("destinationGrid");


function renderGrid() {

    grid.innerHTML = "";

    const visible = activeFilter === "all"
        ? stateDestinations
        : stateDestinations.filter(d => d.tags.includes(activeFilter));

    if (visible.length === 0) {
        grid.innerHTML = `<p style="color:#78847e;">No destinations match that filter yet.</p>`;
        return;
    }

    visible.forEach(destination => {

        const card = document.createElement("div");
        card.className = "destination-card";

        card.innerHTML = `
            <img src="${destination.image}" alt="${destination.name}">
            <div class="destination-overlay">
                <span>HIDDEN GEM • ${destination.gem}/100</span>
                <h3>${destination.name}</h3>
                <p>Tourist pressure: ${destination.pressure}</p>
                <div class="card-tags">
                    ${destination.tags.map(t => `<i>${interestLabels[t] || t}</i>`).join("")}
                </div>
                <button>Explore →</button>
            </div>
        `;

        card.onclick = function () {
            showDestination(destination);
        };

        grid.appendChild(card);

    });

}


buildFilters();
renderGrid();



/* =========================================
   AUTO-OPEN DESTINATION FROM AI CHAT
   If the user arrived here by clicking
   "Explore X" on a chat match card, jump
   straight to that destination's detail
   view instead of showing just the grid.
========================================= */

const incomingDestinationName = localStorage.getItem("selectedDestination");

if (incomingDestinationName) {

    const matched = stateDestinations.find(d => d.name === incomingDestinationName);

    if (matched) {
        showDestination(matched);
    }

    // Clear it so a later, unrelated visit to this page
    // doesn't keep re-opening the same destination.
    localStorage.removeItem("selectedDestination");

}



/* =========================================
   SHOW DESTINATION DETAIL
========================================= */

function showDestination(destination) {

    document.getElementById("destinationDetail").scrollIntoView({ behavior: "smooth" });

    document.getElementById("detailImage").src = destination.image;
    document.getElementById("detailName").innerText = destination.name;
    document.getElementById("detailDescription").innerText = destination.description;

    document.getElementById("gemScore").innerText = destination.gem + "/100";
    document.getElementById("pressure").innerText = destination.pressure;
    document.getElementById("communityScore").innerText = destination.community + "/100";

    document.getElementById("capacityScore").innerText = destination.capacity + "/100";
    document.getElementById("capacityBar").style.width = destination.capacity + "%";

    document.getElementById("capacityText").innerText =
        "Prototype estimate: this destination may have potential for additional responsible tourism, subject to verified infrastructure, environmental and community data.";

    const bestTimeEl = document.getElementById("bestTime");
    if (bestTimeEl) bestTimeEl.innerText = destination.bestTime;

    const jobsEl = document.getElementById("jobsSupported");
    if (jobsEl) jobsEl.innerText = destination.jobsSupported + "+";

    document.getElementById("videoLink").href = destination.video;

}