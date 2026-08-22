/* =========================================
   NAVIGATION
========================================= */

function goToExplore() {

    document
        .getElementById("explore")
        .scrollIntoView({
            behavior: "smooth"
        });

}


function goToProblem() {

    document
        .getElementById("problem")
        .scrollIntoView({
            behavior: "smooth"
        });

}



/* =========================================
   STATE
========================================= */

function openState(state) {

    localStorage.setItem(
        "selectedState",
        state
    );

    window.location.href =
        "state.html";

}



/* =========================================
   AI INTERESTS
========================================= */

let selectedInterests = [];


function selectInterest(button) {

    const interest =
        button.innerText;


    if (
        selectedInterests.includes(interest)
    ) {

        selectedInterests =
            selectedInterests.filter(
                item => item !== interest
            );

        button.classList.remove("selected");

    }

    else {

        selectedInterests.push(interest);

        button.classList.add("selected");

    }

}



/* =========================================
   AI RECOMMENDATION
========================================= */

function getRecommendation() {

    const message =
        document.getElementById("aiMessage");


    // If the user hasn't selected anything
    if (selectedInterests.length === 0) {

        message.innerHTML = `

            <strong>
                Tell me what you love first! 🌿
            </strong>

            <br><br>

            Select at least one interest
            and I'll recommend a hidden
            destination.

        `;

        return;
    }


    let recommendation;


    // Convert selected interests into text
    const interests =
        selectedInterests.join(" ").toLowerCase();


    // ==========================
    // NATURE
    // ==========================

    if (interests.includes("nature")) {

        recommendation = {

            place: "Dudhwa",

            state: "Uttar Pradesh",

            score: 94,

            pressure: "LOW",

            reason:
            "forests, wildlife and responsible eco-tourism opportunities"

        };

    }


    // ==========================
    // HERITAGE
    // ==========================

    else if (
        interests.includes("heritage")
    ) {

        recommendation = {

            place: "Chunar",

            state: "Uttar Pradesh",

            score: 91,

            pressure: "LOW",

            reason:
            "historic architecture, river landscapes and cultural heritage"

        };

    }


    // ==========================
    // CRAFTS
    // ==========================

    else if (
        interests.includes("crafts")
    ) {

        recommendation = {

            place: "Hodka",

            state: "Gujarat",

            score: 92,

            pressure: "LOW",

            reason:
            "traditional crafts, local artisans and community tourism"

        };

    }


    // ==========================
    // RURAL
    // ==========================

    else if (
        interests.includes("rural")
    ) {

        recommendation = {

            place: "Kumbalangi",

            state: "Kerala",

            score: 88,

            pressure: "LOW",

            reason:
            "village life, traditional livelihoods and local food"

        };

    }


    // ==========================
    // ADVENTURE
    // ==========================

    else if (
        interests.includes("adventure")
    ) {

        recommendation = {

            place: "Nongriat",

            state: "Meghalaya",

            score: 96,

            pressure: "LOW",

            reason:
            "forest trails, living root bridges and an adventurous journey"

        };

    }


    // ==========================
    // FOOD
    // ==========================

    else if (
        interests.includes("food")
    ) {

        recommendation = {

            place: "Kumbalangi",

            state: "Kerala",

            score: 88,

            pressure: "LOW",

            reason:
            "local cuisine, fishing traditions and village experiences"

        };

    }


    // ==========================
    // DEFAULT
    // ==========================

    else {

        recommendation = {

            place: "Chunar",

            state: "Uttar Pradesh",

            score: 91,

            pressure: "LOW",

            reason:
            "heritage, nature and a quieter tourist trail"

        };

    }


    // ==========================
    // SHOW RESULT ON SCREEN
    // ==========================

    message.innerHTML = `

        <span style="
            color:#d36f2d;
            font-weight:800;
        ">

            ✦ AI RECOMMENDATION

        </span>


        <br><br>


        <strong style="
            font-size:24px;
        ">

            ${recommendation.place}

        </strong>


        <br>


        ${recommendation.state}


        <br><br>


        <strong>
            Hidden Gem Score:
        </strong>

        ${recommendation.score}/100


        <br>


        <strong>
            Tourist Pressure:
        </strong>

        🟢 ${recommendation.pressure}


        <br><br>


        Recommended because of
        ${recommendation.reason}.


        <br><br>


        <button
            onclick="openRecommendedState('${recommendation.state}')"
            style="
                border:none;
                background:#d36f2d;
                color:white;
                padding:10px 16px;
                border-radius:20px;
                font-weight:700;
                cursor:pointer;
            ">

            Explore ${recommendation.place} →

        </button>

    `;

}



function openRecommendedState(state) {

    localStorage.setItem(
        "selectedState",
        state
    );

    window.location.href =
        "state.html";

}