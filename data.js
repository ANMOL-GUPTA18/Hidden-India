/* =========================================================
   HIDDEN INDIA — SHARED DATA LAYER
   Used by both index.html (AI Guide + Hotspot Swap) and
   state.html (destination explorer).

   Every destination carries:
     - tags: interest categories used by the AI scoring engine
     - pressure/gem/community/capacity: prototype scoring
     - bestTime, jobsSupported: "why this helps" signals
========================================================= */


const destinations = {


    "Uttar Pradesh": [
        {
            name: "Chunar",
            image: "https://images.unsplash.com/photo-1532664189809-02133fee698d?auto=format&fit=crop&w=1000&q=85",
            description: "A historic town overlooking the Ganga, known for its fort, river views and rich cultural history.",
            tags: ["heritage", "nature"],
            gem: 91, pressure: "LOW", community: 87, capacity: 82,
            bestTime: "Oct – Mar",
            jobsSupported: 140,
            access: "Regional Train",
            video: "https://www.youtube.com/results?search_query=Chunar+Uttar+Pradesh"
        },
        {
            name: "Mahoba",
            image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=85",
            description: "A historic Bundelkhand destination with ancient temples, lakes and a strong connection to regional heritage.",
            tags: ["heritage", "rural"],
            gem: 87, pressure: "LOW", community: 84, capacity: 78,
            bestTime: "Nov – Feb",
            jobsSupported: 95,
            access: "State Highway",
            video: "https://www.youtube.com/results?search_query=Mahoba+Uttar+Pradesh"
        },
        {
            name: "Dudhwa",
            image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=85",
            description: "A nature-focused destination offering forests, wildlife and opportunities for responsible eco-tourism.",
            tags: ["nature", "adventure"],
            gem: 94, pressure: "LOW", community: 89, capacity: 75,
            bestTime: "Nov – Jun",
            jobsSupported: 110,
            access: "Forest Gate Road",
            video: "https://www.youtube.com/results?search_query=Dudhwa+National+Park"
        }
    ],


    "Rajasthan": [
        {
            name: "Abhaneri",
            image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=85",
            description: "A historic village famous for its extraordinary stepwell architecture and cultural heritage.",
            tags: ["heritage", "crafts"],
            gem: 89, pressure: "LOW", community: 88, capacity: 80,
            bestTime: "Oct – Mar",
            jobsSupported: 100,
            access: "State Highway",
            video: "https://www.youtube.com/results?search_query=Abhaneri+Rajasthan"
        },
        {
            name: "Bundi",
            image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=85",
            description: "A beautiful heritage town with forts, palaces, stepwells and traditional architecture.",
            tags: ["heritage", "crafts"],
            gem: 86, pressure: "MODERATE", community: 90, capacity: 83,
            bestTime: "Oct – Mar",
            jobsSupported: 160,
            access: "Regional Train",
            video: "https://www.youtube.com/results?search_query=Bundi+Rajasthan"
        }
    ],


    "Meghalaya": [
        {
            name: "Mawlynnong",
            image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85",
            description: "A community-focused village surrounded by Meghalaya's landscapes and living local traditions.",
            tags: ["rural", "nature"],
            gem: 90, pressure: "LOW", community: 94, capacity: 79,
            bestTime: "Sep – May",
            jobsSupported: 130,
            access: "Mountain Road",
            video: "https://www.youtube.com/results?search_query=Mawlynnong+Meghalaya"
        },
        {
            name: "Nongriat",
            image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=85",
            description: "Known for its living root bridges, forest trails and remarkable community heritage.",
            tags: ["adventure", "nature"],
            gem: 96, pressure: "LOW", community: 91, capacity: 73,
            bestTime: "Oct – Apr",
            jobsSupported: 85,
            access: "Trek Trail Only",
            video: "https://www.youtube.com/results?search_query=Nongriat+Meghalaya"
        }
    ],


    "Kerala": [
        {
            name: "Kumbalangi",
            image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=85",
            description: "A fishing village offering an example of village-based tourism, local food and traditional livelihoods.",
            tags: ["food", "rural"],
            gem: 88, pressure: "LOW", community: 93, capacity: 86,
            bestTime: "Sep – Mar",
            jobsSupported: 175,
            access: "Ferry & Road",
            video: "https://www.youtube.com/results?search_query=Kumbalangi+Kerala"
        },
        {
            name: "Wayanad Countryside",
            image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=85",
            description: "Misty hills, spice plantations and tribal heritage away from Kerala's crowded backwater routes.",
            tags: ["nature", "rural", "adventure"],
            gem: 90, pressure: "LOW", community: 88, capacity: 77,
            bestTime: "Oct – May",
            jobsSupported: 120,
            access: "Ghat Road",
            video: "https://www.youtube.com/results?search_query=Wayanad+Kerala"
        }
    ],


    "Sikkim": [
        {
            name: "Zuluk",
            image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=85",
            description: "A Himalayan settlement with dramatic mountain landscapes and a quieter travel experience.",
            tags: ["adventure", "nature"],
            gem: 95, pressure: "LOW", community: 86, capacity: 72,
            bestTime: "Mar – Jun, Sep – Dec",
            jobsSupported: 70,
            access: "Permit Road",
            video: "https://www.youtube.com/results?search_query=Zuluk+Sikkim"
        }
    ],


    "Gujarat": [
        {
            name: "Hodka",
            image: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=1000&q=85",
            description: "A Kutch village known for traditional crafts, local architecture and community tourism.",
            tags: ["crafts", "rural"],
            gem: 92, pressure: "LOW", community: 95, capacity: 88,
            bestTime: "Nov – Feb",
            jobsSupported: 200,
            access: "Desert Highway",
            video: "https://www.youtube.com/results?search_query=Hodka+village+Gujarat"
        }
    ],


    "Himachal Pradesh": [
        {
            name: "Tirthan Valley",
            image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=85",
            description: "A quiet river valley beside the Great Himalayan National Park, known for trout streams and village homestays.",
            tags: ["nature", "adventure", "rural"],
            gem: 93, pressure: "LOW", community: 90, capacity: 76,
            bestTime: "Mar – Jun, Sep – Nov",
            jobsSupported: 105,
            access: "Valley Road",
            video: "https://www.youtube.com/results?search_query=Tirthan+Valley+Himachal"
        },
        {
            name: "Chitkul",
            image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=85",
            description: "The last inhabited village on the old Hindustan-Tibet road, with apple orchards and untouched mountain views.",
            tags: ["adventure", "nature"],
            gem: 92, pressure: "LOW", community: 82, capacity: 68,
            bestTime: "May – Oct",
            jobsSupported: 55,
            access: "Mountain Road",
            video: "https://www.youtube.com/results?search_query=Chitkul+Himachal"
        }
    ],


    "Odisha": [
        {
            name: "Raghurajpur",
            image: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=1000&q=85",
            description: "A heritage crafts village where almost every household practices Pattachitra painting and traditional art.",
            tags: ["crafts", "heritage"],
            gem: 90, pressure: "LOW", community: 92, capacity: 84,
            bestTime: "Oct – Mar",
            jobsSupported: 150,
            access: "State Highway",
            video: "https://www.youtube.com/results?search_query=Raghurajpur+Odisha"
        },
        {
            name: "Chandipur",
            image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85",
            description: "A coastal town famous for a beach where the sea retreats nearly 5km at low tide — a quiet alternative to crowded beach towns.",
            tags: ["nature", "adventure"],
            gem: 88, pressure: "LOW", community: 80, capacity: 81,
            bestTime: "Oct – Feb",
            jobsSupported: 90,
            access: "Coastal Road",
            video: "https://www.youtube.com/results?search_query=Chandipur+Odisha"
        }
    ],


    "Tamil Nadu": [
        {
            name: "Chettinad",
            image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=85",
            description: "A region of grand heritage mansions, tile-making traditions and distinctive regional cuisine.",
            tags: ["heritage", "food", "crafts"],
            gem: 89, pressure: "LOW", community: 86, capacity: 79,
            bestTime: "Nov – Feb",
            jobsSupported: 115,
            access: "Regional Train",
            video: "https://www.youtube.com/results?search_query=Chettinad+Tamil+Nadu"
        }
    ],


    "Maharashtra": [
        {
            name: "Velas",
            image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85",
            description: "A Konkan coastal village famous for its community-run Olive Ridley turtle conservation festival.",
            tags: ["nature", "rural"],
            gem: 91, pressure: "LOW", community: 93, capacity: 74,
            bestTime: "Feb – Mar",
            jobsSupported: 60,
            access: "Coastal Road",
            video: "https://www.youtube.com/results?search_query=Velas+turtle+festival+Maharashtra"
        }
    ]

};



/* =========================================================
   HOTSPOT → HIDDEN ALTERNATIVE MAP
   Powers the "Instead of X, visit Y" tool on the homepage.
   Each hotspot links to a destination above via state + name.
========================================================= */

const hotspotAlternatives = [
    {
        hotspot: "Taj Mahal, Agra",
        pressure: "VERY HIGH",
        why: "Over 6 million visitors a year concentrate around one monument in Agra.",
        state: "Uttar Pradesh",
        destination: "Chunar"
    },
    {
        hotspot: "Varanasi Ghats",
        pressure: "VERY HIGH",
        why: "The ghats see dense, year-round crowds especially during festival season.",
        state: "Uttar Pradesh",
        destination: "Mahoba"
    },
    {
        hotspot: "Jaipur City Palace",
        pressure: "HIGH",
        why: "Jaipur's core heritage sites face heavy footfall during peak winter season.",
        state: "Rajasthan",
        destination: "Abhaneri"
    },
    {
        hotspot: "Udaipur Lake Palace",
        pressure: "HIGH",
        why: "Udaipur's lakefront is saturated with tourism infrastructure and traffic.",
        state: "Rajasthan",
        destination: "Bundi"
    },
    {
        hotspot: "Shimla / Manali",
        pressure: "VERY HIGH",
        why: "Peak-season traffic jams and overcrowded market roads are a recurring strain.",
        state: "Himachal Pradesh",
        destination: "Tirthan Valley"
    },
    {
        hotspot: "Leh Main Market",
        pressure: "HIGH",
        why: "Popular Himalayan routes concentrate vehicles and visitors in a short season.",
        state: "Himachal Pradesh",
        destination: "Chitkul"
    },
    {
        hotspot: "Munnar Tea Gardens",
        pressure: "HIGH",
        why: "Munnar's viewpoints get congested with private vehicles on weekends.",
        state: "Kerala",
        destination: "Wayanad Countryside"
    },
    {
        hotspot: "Alleppey Backwaters",
        pressure: "HIGH",
        why: "The main backwater stretch has a dense concentration of houseboats daily.",
        state: "Kerala",
        destination: "Kumbalangi"
    },
    {
        hotspot: "Goa Beaches",
        pressure: "VERY HIGH",
        why: "North Goa's beach belt is one of India's most saturated coastal tourism zones.",
        state: "Odisha",
        destination: "Chandipur"
    },
    {
        hotspot: "Darjeeling",
        pressure: "HIGH",
        why: "Darjeeling's town centre and toy-train routes are crowded through peak season.",
        state: "Sikkim",
        destination: "Zuluk"
    },
    {
        hotspot: "Mahabalipuram",
        pressure: "MODERATE",
        why: "Weekend day-trippers from Chennai cluster around the same few monuments.",
        state: "Tamil Nadu",
        destination: "Chettinad"
    },
    {
        hotspot: "Mumbai Marine Drive",
        pressure: "VERY HIGH",
        why: "Mumbai's coastline sees dense daily footfall with little coastal tourism spillover.",
        state: "Maharashtra",
        destination: "Velas"
    },
    {
        hotspot: "Rann of Kutch Festival Site",
        pressure: "HIGH",
        why: "The main Rann Utsav tent city gets fully booked and congested every winter.",
        state: "Gujarat",
        destination: "Hodka"
    },
    {
        hotspot: "Cherrapunji",
        pressure: "MODERATE",
        why: "The main waterfall viewpoints get crowded on weekends and holidays.",
        state: "Meghalaya",
        destination: "Nongriat"
    },
    {
        hotspot: "Puri Beach",
        pressure: "VERY HIGH",
        why: "Puri's main beach and temple road are among Odisha's most congested tourist stretches.",
        state: "Odisha",
        destination: "Raghurajpur"
    }
];



/* =========================================================
   STATE DESCRIPTIONS (used on state.html)
========================================================= */

const stateDescriptions = {
    "Uttar Pradesh": "Go beyond the Taj Mahal and discover heritage, nature and local stories.",
    "Rajasthan": "Go beyond Jaipur and Jaisalmer to discover quieter heritage destinations.",
    "Meghalaya": "Discover villages, forests, waterfalls and living community traditions.",
    "Kerala": "Look beyond the famous backwaters and discover community-led experiences.",
    "Sikkim": "Explore quieter Himalayan destinations beyond the usual tourist routes.",
    "Gujarat": "Discover traditional crafts, villages and cultural landscapes.",
    "Himachal Pradesh": "Go beyond Shimla and Manali to find quieter valleys and villages.",
    "Odisha": "Discover craft villages and coastlines away from the usual beach circuit.",
    "Tamil Nadu": "Explore heritage towns beyond the temple-trail hotspots.",
    "Maharashtra": "Look past the metro coastline to community-run conservation villages."
};



/* =========================================================
   INTEREST TAG LABELS (for UI display)
========================================= */

const interestLabels = {
    nature: "🌿 Nature",
    heritage: "🏛 Heritage",
    crafts: "🎨 Crafts",
    food: "🍛 Food",
    adventure: "🥾 Adventure",
    rural: "🏘 Rural Life"
};



/* =========================================================
   NODE EXPORT (safe no-op in the browser)
   Lets build-data.js reuse this exact file so the frontend
   and the serverless function never drift out of sync.
========================================================= */

if (typeof module !== "undefined" && module.exports) {
    module.exports = { destinations, hotspotAlternatives, stateDescriptions, interestLabels };
}