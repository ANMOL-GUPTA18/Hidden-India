/* =========================================
   HIDDEN INDIA - STATE DATA
========================================= */


const destinations = {


    "Uttar Pradesh": [

        {
            name: "Chunar",
            image: "https://images.unsplash.com/photo-1532664189809-02133fee698d?auto=format&fit=crop&w=1000&q=85",

            description:
            "A historic town overlooking the Ganga, known for its fort, river views and rich cultural history.",

            gem: 91,
            pressure: "LOW",
            community: 87,
            capacity: 82,

            video:
            "https://www.youtube.com/results?search_query=Chunar+Uttar+Pradesh"
        },


        {
            name: "Mahoba",
            image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=85",

            description:
            "A historic Bundelkhand destination with ancient temples, lakes and a strong connection to regional heritage.",

            gem: 87,
            pressure: "LOW",
            community: 84,
            capacity: 78,

            video:
            "https://www.youtube.com/results?search_query=Mahoba+Uttar+Pradesh"
        },


        {
            name: "Dudhwa",
            image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=85",

            description:
            "A nature-focused destination offering forests, wildlife and opportunities for responsible eco-tourism.",

            gem: 94,
            pressure: "LOW",
            community: 89,
            capacity: 75,

            video:
            "https://www.youtube.com/results?search_query=Dudhwa+National+Park"
        }

    ],



    "Rajasthan": [

        {
            name: "Abhaneri",
            image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=85",

            description:
            "A historic village famous for its extraordinary stepwell architecture and cultural heritage.",

            gem: 89,
            pressure: "LOW",
            community: 88,
            capacity: 80,

            video:
            "https://www.youtube.com/results?search_query=Abhaneri+Rajasthan"
        },


        {
            name: "Bundi",
            image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=85",

            description:
            "A beautiful heritage town with forts, palaces, stepwells and traditional architecture.",

            gem: 86,
            pressure: "MODERATE",
            community: 90,
            capacity: 83,

            video:
            "https://www.youtube.com/results?search_query=Bundi+Rajasthan"
        }

    ],



    "Meghalaya": [

        {
            name: "Mawlynnong",
            image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85",

            description:
            "A community-focused village surrounded by Meghalaya's landscapes and living local traditions.",

            gem: 90,
            pressure: "LOW",
            community: 94,
            capacity: 79,

            video:
            "https://www.youtube.com/results?search_query=Mawlynnong+Meghalaya"
        },


        {
            name: "Nongriat",
            image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=85",

            description:
            "Known for its living root bridges, forest trails and remarkable community heritage.",

            gem: 96,
            pressure: "LOW",
            community: 91,
            capacity: 73,

            video:
            "https://www.youtube.com/results?search_query=Nongriat+Meghalaya"
        }

    ],



    "Kerala": [

        {
            name: "Kumbalangi",
            image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=85",

            description:
            "A fishing village offering an example of village-based tourism, local food and traditional livelihoods.",

            gem: 88,
            pressure: "LOW",
            community: 93,
            capacity: 86,

            video:
            "https://www.youtube.com/results?search_query=Kumbalangi+Kerala"
        }

    ],



    "Sikkim": [

        {
            name: "Zuluk",
            image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=85",

            description:
            "A Himalayan settlement with dramatic mountain landscapes and a quieter travel experience.",

            gem: 95,
            pressure: "LOW",
            community: 86,
            capacity: 72,

            video:
            "https://www.youtube.com/results?search_query=Zuluk+Sikkim"
        }

    ],



    "Gujarat": [

        {
            name: "Hodka",
            image: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=1000&q=85",

            description:
            "A Kutch village known for traditional crafts, local architecture and community tourism.",

            gem: 92,
            pressure: "LOW",
            community: 95,
            capacity: 88,

            video:
            "https://www.youtube.com/results?search_query=Hodka+village+Gujarat"
        }

    ]

};



/* =========================================
   GET SELECTED STATE
========================================= */

const selectedState =
    localStorage.getItem("selectedState")
    || "Uttar Pradesh";



/* =========================================
   STATE INFORMATION
========================================= */

const stateDescriptions = {

    "Uttar Pradesh":
        "Go beyond the Taj Mahal and discover heritage, nature and local stories.",

    "Rajasthan":
        "Go beyond Jaipur and Jaisalmer to discover quieter heritage destinations.",

    "Meghalaya":
        "Discover villages, forests, waterfalls and living community traditions.",

    "Kerala":
        "Look beyond the famous backwaters and discover community-led experiences.",

    "Sikkim":
        "Explore quieter Himalayan destinations beyond the usual tourist routes.",

    "Gujarat":
        "Discover traditional crafts, villages and cultural landscapes."
};



/* =========================================
   UPDATE STATE HEADER
========================================= */

document.getElementById("stateName")
    .innerText = selectedState;


document.getElementById("stateDescription")
    .innerText =
    stateDescriptions[selectedState];



/* =========================================
   GET DESTINATIONS
========================================= */

const stateDestinations =
    destinations[selectedState]
    || destinations["Uttar Pradesh"];



/* =========================================
   CREATE DESTINATION CARDS
========================================= */

const grid =
    document.getElementById(
        "destinationGrid"
    );


stateDestinations.forEach(
    (destination, index) => {


        const card =
            document.createElement("div");


        card.className =
            "destination-card";


        card.innerHTML = `

            <img
                src="${destination.image}"
                alt="${destination.name}">


            <div class="destination-overlay">

                <span>
                    HIDDEN GEM • ${destination.gem}/100
                </span>

                <h3>
                    ${destination.name}
                </h3>

                <p>
                    Tourist pressure:
                    ${destination.pressure}
                </p>

                <button>
                    Explore →
                </button>

            </div>

        `;


        card.onclick = function() {

            showDestination(
                destination
            );

        };


        grid.appendChild(card);

    }
);



/* =========================================
   SHOW DESTINATION
========================================= */

function showDestination(destination) {


    document.getElementById(
        "destinationDetail"
    ).scrollIntoView({
        behavior: "smooth"
    });


    document.getElementById(
        "detailImage"
    ).src = destination.image;


    document.getElementById(
        "detailName"
    ).innerText =
        destination.name;


    document.getElementById(
        "detailDescription"
    ).innerText =
        destination.description;


    document.getElementById(
        "gemScore"
    ).innerText =
        destination.gem + "/100";


    document.getElementById(
        "pressure"
    ).innerText =
        destination.pressure;


    document.getElementById(
        "communityScore"
    ).innerText =
        destination.community + "/100";


    document.getElementById(
        "capacityScore"
    ).innerText =
        destination.capacity + "/100";


    document.getElementById(
        "capacityBar"
    ).style.width =
        destination.capacity + "%";


    document.getElementById(
        "capacityText"
    ).innerText =

        "Prototype estimate: this destination may have potential for additional responsible tourism, subject to verified infrastructure, environmental and community data.";


    document.getElementById(
        "videoLink"
    ).href =
        destination.video;

}