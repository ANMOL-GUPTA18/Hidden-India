// =========================================
// 1. NAVIGATION & CONTROLS
// =========================================
function goToExplore() {
    const el = document.getElementById("explore");
    if (el) el.scrollIntoView({ behavior: "smooth" });
}

function goToProblem() {
    const el = document.getElementById("problem");
    if (el) el.scrollIntoView({ behavior: "smooth" });
}

function openState(state) {
    localStorage.setItem("selectedState", state);
    window.location.href = "state.html";
}

function openRecommendedState(state) {
    localStorage.setItem("selectedState", state);
    window.location.href = "state.html";
}

window.goToExplore = goToExplore;
window.goToProblem = goToProblem;
window.openState = openState;
window.openRecommendedState = openRecommendedState;

// =========================================
// 2. AI GUIDE BOT (INTEREST SELECTOR)
// =========================================
let selectedInterests = [];

function selectInterest(button) {
    const interest = button.innerText.trim();
    if (selectedInterests.includes(interest)) {
        selectedInterests = selectedInterests.filter(item => item !== interest);
        button.classList.remove("selected");
    } else {
        selectedInterests.push(interest);
        button.classList.add("selected");
    }
}
window.selectInterest = selectInterest;

function getRecommendation() {
    const message = document.getElementById("aiMessage");
    if (!message) return;

    if (selectedInterests.length === 0) {
        message.innerHTML = `
            <strong>Tell me what you love first! 🌿</strong>
            <br><br>Select at least one interest and I'll recommend a hidden destination.
        `;
        return;
    }

    let recommendation;
    const interests = selectedInterests.join(" ").toLowerCase();

    if (interests.includes("nature")) {
        recommendation = { place: "Dudhwa", state: "Uttar Pradesh", score: 94, pressure: "LOW", reason: "forests, wildlife and eco-tourism opportunities" };
    } else if (interests.includes("heritage")) {
        recommendation = { place: "Chunar", state: "Uttar Pradesh", score: 91, pressure: "LOW", reason: "historic architecture and river landscapes" };
    } else if (interests.includes("crafts")) {
        recommendation = { place: "Hodka", state: "Gujarat", score: 92, pressure: "LOW", reason: "traditional crafts and local artisans" };
    } else if (interests.includes("rural") || interests.includes("food")) {
        recommendation = { place: "Kumbalangi", state: "Kerala", score: 88, pressure: "LOW", reason: "village life, local cuisine and fishing traditions" };
    } else if (interests.includes("adventure")) {
        recommendation = { place: "Nongriat", state: "Meghalaya", score: 96, pressure: "LOW", reason: "forest trails and living root bridges" };
    } else {
        recommendation = { place: "Chunar", state: "Uttar Pradesh", score: 91, pressure: "LOW", reason: "heritage, nature and a quieter tourist trail" };
    }

    message.innerHTML = `
        <span style="color:#d36f2d; font-weight:800;">✦ AI RECOMMENDATION</span>
        <br><br>
        <strong style="font-size:24px;">${recommendation.place}</strong>
        <br>${recommendation.state}<br><br>
        <strong>Hidden Gem Score:</strong> ${recommendation.score}/100<br>
        <strong>Tourist Pressure:</strong> 🟢 ${recommendation.pressure}<br><br>
        Recommended because of ${recommendation.reason}.<br><br>
        <button onclick="openRecommendedState('${recommendation.state}')" style="border:none; background:#d36f2d; color:white; padding:10px 16px; border-radius:20px; font-weight:700; cursor:pointer;">
            Explore ${recommendation.place} →
        </button>
    `;
}
window.getRecommendation = getRecommendation;

// =========================================
// 3. CURATED GEMS WITH EXACT MATCHING IMAGES
// =========================================
const allGemsData = {
    "delhi": [
        {
            name: "Agrasen ki Baoli Stepwell",
            tagline: "14th-century ancient stepwell featuring 108 steep stone steps",
            hotel: "Haveli Dharampura Heritage Stay (₹1,400/night)",
            transport: "Barakhamba Road Metro / New Delhi Station",
            imageUrl: "https://images.unsplash.com/photo-1597042780486-1b3dbfc8396c?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Mirza Ghalib ki Haveli & Ballimaran",
            tagline: "Historic 19th-century residence of legendary Urdu poet Ghalib in Old Delhi",
            hotel: "Old Delhi Heritage B&B (₹1,100/night)",
            transport: "Chawri Bazar / Chandni Chowk Metro",
            imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Asola Bhatti & Hidden Blue Lake",
            tagline: "Deep blue water quarry lake hidden inside the southern Aravalli ridge forest",
            hotel: "Surajkund Eco Retreat (₹1,800/night)",
            transport: "Tughlakabad Metro Station",
            imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80"
        }
    ],
    "himachal": [
        {
            name: "Jibhi & Tirthan Valley",
            tagline: "Serene pine hamlets along clear trout streams with wooden pagodas",
            hotel: "Riverside Wooden Cottage (₹1,200/night)",
            transport: "Bhuntar Airport / Aut Tunnel Bus Stop",
            imageUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Chitkul & Sangla Valley",
            tagline: "The last inhabited Himalayan village on the Indo-Tibetan border",
            hotel: "Baspa River Eco Camp (₹1,500/night)",
            transport: "Kalka Railway Station to Reckong Peo HRTC Bus",
            imageUrl: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Kibber & Langza Fossil Village",
            tagline: "High-altitude Tibetan hamlet beneath zero-pollution Milky Way skies",
            hotel: "Spitian Mud Homestay (₹900/night)",
            transport: "Manali/Shimla shared taxi to Kaza",
            imageUrl: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=700&q=80"
        }
    ],
    "uttar pradesh": [
        {
            name: "Chunar Fort & Ganga Terraces",
            tagline: "Ancient sandstone fortress overlooking quiet bends of the holy Ganga",
            hotel: "Chunar Riverside Guest House (₹1,000/night)",
            transport: "Mirzapur / Varanasi Junction Railway",
            imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Dudhwa Terai Rainforest & Safari",
            tagline: "Dense Sal forests harboring one-horned rhinos, tigers and quiet water canals",
            hotel: "Tharu Tribal Homestay (₹1,300/night)",
            transport: "Lucknow Airport / Mailani Railway",
            imageUrl: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Bateshwar 101 Shiva Temples",
            tagline: "Colossal curved ghat of 101 historic white temple spires along the Yamuna",
            hotel: "Chambal Safari Lodge (₹2,200/night)",
            transport: "Agra Cantt / Shikohabad Junction",
            imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=700&q=80"
        }
    ],
    "meghalaya": [
        {
            name: "Nongriat Double Decker Root Bridge",
            tagline: "Centuries-old living ficus elastica bridges across untamed jungle rivers",
            hotel: "Serene Homestay Nongriat (₹800/night)",
            transport: "Guwahati Airport to Cherrapunji Taxi",
            imageUrl: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Krang Suri Turquoise Falls",
            tagline: "Glistening turquoise natural swimming pools hidden deep in Jaintia Hills",
            hotel: "Jowai Eco Cottages (₹1,400/night)",
            transport: "Guwahati to Jowai Roadways",
            imageUrl: "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Dawki Umngot Crystal River",
            tagline: "Boats floating on completely transparent glass-like river waters",
            hotel: "Shnongpdeng Riverside Camp (₹1,100/night)",
            transport: "Shillong to Dawki shared cabs",
            imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=700&q=80"
        }
    ],
    "kerala": [
        {
            name: "Kumbalangi Backwater Reserve",
            tagline: "Model sustainable eco-village with Chinese fishing nets and canoe trails",
            hotel: "Backwater Heritage Homestay (₹1,100/night)",
            transport: "Ernakulam Junction (Kochi) Railway",
            imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Chembra Heart-Shaped Lake",
            tagline: "A misty mountain trek leading to a natural perennial heart-shaped lake",
            hotel: "Wayanad Plantation Stay (₹1,600/night)",
            transport: "Calicut (Kozhikode) Airport",
            imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Marari Quiet Coastal Haven",
            tagline: "Quiet, hammock-filled fishing beach away from crowded coastal towns",
            hotel: "Marari Village Villa (₹1,800/night)",
            transport: "Alleppey / Kochi Railway",
            imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=80"
        }
    ],
    "rajasthan": [
        {
            name: "Bundi Palace & Stepwells",
            tagline: "Uncrowded blue city featuring authentic miniature frescoes & baoris",
            hotel: "Bundi Haveli Guest House (₹1,000/night)",
            transport: "Kota Junction Railway Station",
            imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Khimsar Sand Dunes & Oasis",
            tagline: "Pristine desert village with secluded oasis waters in the Thar desert",
            hotel: "Khimsar Desert Camp (₹2,200/night)",
            transport: "Jodhpur Airport / Railway",
            imageUrl: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Kumbhalgarh Great Wall of India",
            tagline: "The world's second longest continuous stone wall surrounding leopard hills",
            hotel: "Aravalli Eco Lodge (₹1,500/night)",
            transport: "Falna Railway Station / Udaipur Airport",
            imageUrl: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=700&q=80"
        }
    ],
    "gujarat": [
        {
            name: "Hodka & Nirona Artisan Villages",
            tagline: "Master Rogan art workshops, bell makers and traditional Bhunga stays",
            hotel: "Shaam-e-Sarhad Village Resort (₹2,000/night)",
            transport: "Bhuj Railway Station / Airport",
            imageUrl: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Polo Forest Ancient Ruins",
            tagline: "15th-century carved Jain and Shiva temples reclaimed by dense teak forest",
            hotel: "Idar Forest Retreat (₹1,300/night)",
            transport: "Ahmedabad Airport / Himatnagar Station",
            imageUrl: "https://images.unsplash.com/photo-1532664189809-02133fee698d?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Dholavira Harappan Citadel",
            tagline: "5,000-year-old Indus Valley metropolis surrounded by the White Rann",
            hotel: "Kutch Desert Homestay (₹1,200/night)",
            transport: "Samakhiali Railway Station",
            imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=700&q=80"
        }
    ],
    "andhra pradesh": [
        {
            name: "The Grand Canyon of Gandikota",
            tagline: "Massive red granite formations carved by the Pennar River and fort ruins",
            hotel: "Haritha Cliff Camp (₹1,200/night)",
            transport: "Kadapa Railway Station / Jammalamadugu Bus",
            imageUrl: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Belum Underground Caves",
            tagline: "Second largest subterranean natural cave network in the Indian subcontinent",
            hotel: "Tadipatri Guest House (₹900/night)",
            transport: "Gooty Railway Station",
            imageUrl: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Lambasingi Mist Highlands",
            tagline: "The only place in South India experiencing winter sub-zero temperatures",
            hotel: "Lambasingi Hillside Cottage (₹1,400/night)",
            transport: "Visakhapatnam Airport / Anakapalle Railway",
            imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=80"
        }
    ],
    "maharashtra": [
        {
            name: "Lonar Meteorite Crater Lake",
            tagline: "50,000-year-old hypervelocity meteorite crater lake surrounded by basalt temples",
            hotel: "MTDC Lonar Resort (₹1,200/night)",
            transport: "Jalna Railway Station / Aurangabad Airport",
            imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Kaas Plateau Valley of Flowers",
            tagline: "UNESCO-heritage volcanic plateau blooming with 850 species of wild flora",
            hotel: "Satara Valley Homestay (₹1,400/night)",
            transport: "Satara Railway Station / Pune Airport",
            imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Sandhan Valley Canyon",
            tagline: "200-foot deep water-carved rock gorge where sunlight barely reaches the bed",
            hotel: "Samrad Village Tent Camp (₹900/night)",
            transport: "Igatpuri / Kasara Railway Station",
            imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=700&q=80"
        }
    ],
    "karnataka": [
        {
            name: "Yana Giant Karst Limestone Rocks",
            tagline: "Two colossal solid black crystalline karst rocks rising above dense Sahyadri forests",
            hotel: "Sirsi Nature Homestay (₹1,300/night)",
            transport: "Kumta Railway Station / Hubli Airport",
            imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Badami Cave Temples & Agastya Lake",
            tagline: "6th-century rock-cut sandstone cave temples surrounding Agastya Lake",
            hotel: "Badami Heritage Inn (₹1,200/night)",
            transport: "Badami Railway Station / Belagavi Airport",
            imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Agumbe Rainforest Canopy",
            tagline: "The Cherrapunji of the South with waterfalls, King Cobras, and canopy trails",
            hotel: "Doddamane Traditional Homestay (₹800/night)",
            transport: "Udupi Railway Station / Mangalore Airport",
            imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=80"
        }
    ],
    "tripura": [
        {
            name: "Unakoti Rock Bas-Reliefs",
            tagline: "Centuries-old colossal rock carvings of deities sculpted into forest cliff faces",
            hotel: "Unakoti Heritage Lodge (₹900/night)",
            transport: "Kailashahar / Agartala Airport",
            imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Neermahal Water Palace",
            tagline: "Spectacular royal palace floating right in the middle of Rudrasagar Lake",
            hotel: "Sagar Mahal Tourist Lodge (₹1,100/night)",
            transport: "Agartala Railway Station / Airport",
            imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Jampui Hills Orange Valleys",
            tagline: "Misty evergreen hill ranges famous for panoramic valley sunsets and orange groves",
            hotel: "Eden Tourist Lodge Jampui (₹800/night)",
            transport: "Dharmanagar Railway Station",
            imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80"
        }
    ],
    "goa": [
        {
            name: "Divar Island Portuguese Village",
            tagline: "Tranquil river island accessible only by ferry with vintage Baroque chapels",
            hotel: "Divar Island Heritage Villa (₹1,800/night)",
            transport: "Old Goa Ferry / Karmali Railway",
            imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Netravali Spice Plantation & Lake",
            tagline: "Mysterious subterranean bubbling lagoon nestled in dense Western Ghats",
            hotel: "Netravali Spice Plantation Stay (₹1,400/night)",
            transport: "Madgaon Railway Station",
            imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: "Cabo de Rama Fort & Secluded Cove",
            tagline: "Ancient fortress cliff overlooking a wild and empty southern coastline",
            hotel: "Cliffside Eco Cottages (₹1,500/night)",
            transport: "Canacona / Madgaon Station",
            imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80"
        }
    ]
};

// =========================================
// 4. PROCEDURAL FALLBACK GENERATOR
// =========================================
function generateCustomGems(query) {
    const capitalized = query.charAt(0).toUpperCase() + query.slice(1);
    return [
        {
            name: `${capitalized} Ancient Heritage Stepwell & Fort Ruins`,
            tagline: `Centuries-old secluded architectural sanctuary hidden near ${capitalized}`,
            hotel: `Locally Owned Heritage Homestay in ${capitalized} (₹1,200/night)`,
            transport: `Nearest Regional Railway Station to ${capitalized}`,
            imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: `${capitalized} Eco Valley & Riverside Sanctuary`,
            tagline: `Uncrowded nature trails and crystalline river pools in ${capitalized}`,
            hotel: `${capitalized} Riverside Eco Cottages (₹1,400/night)`,
            transport: `State Transport Bus Depot / Main Junction`,
            imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80"
        },
        {
            name: `${capitalized} Traditional Artisan & Craft Hamlet`,
            tagline: `Authentic village workshops keeping native craft traditions alive in ${capitalized}`,
            hotel: `Village Community Farmstay (₹900/night)`,
            transport: `Direct Shared Taxi / Regional Transit Hub`,
            imageUrl: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=700&q=80"
        }
    ];
}

// =========================================
// 5. MODAL & CARD RENDERER
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    const gemTrigger = document.getElementById('gem-trigger');
    const aiModal = document.getElementById('ai-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const findGemsBtn = document.getElementById('find-gems-btn');
    const stateInput = document.getElementById('user-state');
    const budgetInput = document.getElementById('user-budget');
    const cardsContainer = document.getElementById('gem-cards-container');

    if (gemTrigger && aiModal) {
        gemTrigger.addEventListener('click', () => {
            aiModal.classList.remove('hidden');
        });
    }

    if (closeModalBtn && aiModal) {
        closeModalBtn.addEventListener('click', () => {
            aiModal.classList.add('hidden');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === aiModal) {
            aiModal.classList.add('hidden');
        }
    });

    if (findGemsBtn) {
        findGemsBtn.addEventListener('click', async () => {
            const rawQuery = (stateInput.value || '').trim();
            const query = rawQuery.toLowerCase();
            const budget = budgetInput ? budgetInput.value : "Low / Backpacker";

            if (!rawQuery) {
                cardsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #b74335; font-size: 1rem;">Please enter a state or destination name above.</p>';
                return;
            }

            cardsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #173b32; font-size: 1.1rem; padding: 2rem 0;">✦ Scanning archives & matching photo registries...</p>';

            await new Promise(r => setTimeout(r, 300));

            let matchedGems = null;

            if (allGemsData[query]) {
                matchedGems = allGemsData[query];
            } else {
                for (const key in allGemsData) {
                    if (query.includes(key) || key.includes(query)) {
                        matchedGems = allGemsData[key];
                        break;
                    }
                }
            }

            if (!matchedGems) {
                matchedGems = generateCustomGems(rawQuery);
            }

            cardsContainer.innerHTML = matchedGems.map(gem => `
                <div class="ai-card">
                    <img src="${gem.imageUrl}" 
                         alt="${gem.name}" 
                         onerror="this.src='https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=700&q=80'" />
                    <div class="ai-card-body">
                        <h3>${gem.name}</h3>
                        <p class="ai-badge">${gem.tagline}</p>
                        <div class="ai-detail-box">
                            <strong>🏨 Stay / Hotel:</strong> ${gem.hotel}
                        </div>
                        <div class="ai-detail-box">
                            <strong>🚆 Nearest Transit:</strong> ${gem.transport}
                        </div>
                    </div>
                </div>
            `).join('');
        });
    }
});