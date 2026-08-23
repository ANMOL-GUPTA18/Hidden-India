/* =========================================
   NAVIGATION
========================================= */

function goToExplore() {
    document.getElementById("explore").scrollIntoView({ behavior: "smooth" });
}

function goToProblem() {
    document.getElementById("problem").scrollIntoView({ behavior: "smooth" });
}



/* =========================================
   STATE
========================================= */

function openState(state) {
    localStorage.setItem("selectedState", state);
    window.location.href = "state.html";
}

function openRecommendedState(state) {
    localStorage.setItem("selectedState", state);
    window.location.href = "state.html";
}



/* =========================================
   HOTSPOT → HIDDEN ALTERNATIVE TOOL
   The direct answer to "tourism is concentrated
   in a few places": pick a famous hotspot, get
   a matched low-pressure alternative.
========================================= */

function findAlternative() {

    const select = document.getElementById("hotspotSelect");
    const resultBox = document.getElementById("hotspotResult");

    const hotspotName = select.value;

    if (!hotspotName) {
        resultBox.innerHTML = `
            <strong>Pick a popular destination above 👆</strong>
            <br><br>
            I'll show you a lower-pressure alternative nearby with similar appeal.
        `;
        return;
    }

    const match = hotspotAlternatives.find(h => h.hotspot === hotspotName);

    if (!match) return;

    const dest = destinations[match.state].find(d => d.name === match.destination);

    resultBox.innerHTML = `

        <div class="swap-row">

            <div class="swap-col from">
                <span class="swap-label">INSTEAD OF</span>
                <strong>${match.hotspot}</strong>
                <div class="swap-pressure">Tourist pressure: <b>${match.pressure}</b></div>
                <p>${match.why}</p>
            </div>

            <div class="swap-arrow">→</div>

            <div class="swap-col to">
                <span class="swap-label">VISIT</span>
                <strong>${dest.name}, ${match.state}</strong>
                <div class="swap-pressure low-text">Tourist pressure: <b>${dest.pressure}</b></div>
                <p>${dest.description}</p>
            </div>

        </div>

        <div class="swap-meta">
            <span>Hidden Gem: <b>${dest.gem}/100</b></span>
            <span>Best time: <b>${dest.bestTime}</b></span>
            <span>Est. local jobs supported: <b>${dest.jobsSupported}+</b></span>
        </div>

        <button
            class="ai-button"
            style="margin-top:18px;"
            onclick="openRecommendedState('${match.state}')">
            Explore ${dest.name} →
        </button>

    `;

}



/* =========================================
   POPULATE HOTSPOT DROPDOWN ON LOAD
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const select = document.getElementById("hotspotSelect");

    if (!select) return;

    hotspotAlternatives.forEach(h => {
        const option = document.createElement("option");
        option.value = h.hotspot;
        option.innerText = h.hotspot;
        select.appendChild(option);
    });

});