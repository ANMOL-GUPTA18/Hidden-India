// =========================================
// 1. GEMINI CONFIGURATION
// =========================================
// PASTE YOUR KEY HERE:
const GEMINI_API_KEY = "AQ.Ab8RN6LnANKlCl7LnU2Iux2VGJsfBbYZGS5UwOBoYn6FpRwPPg";


// =========================================
// 2. NAVIGATION & GENERAL CONTROLS
// =========================================
function goToExplore() {
    document.getElementById("explore").scrollIntoView({ behavior: "smooth" });
}

function goToProblem() {
    document.getElementById("problem").scrollIntoView({ behavior: "smooth" });
}

function openState(state) {
    localStorage.setItem("selectedState", state);
    window.location.href = "state.html";
}

function openRecommendedState(state) {
    localStorage.setItem("selectedState", state);
    window.location.href = "state.html";
}


// =========================================
// 3. AI GUIDE BOT (INTEREST SELECTOR)
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

function getRecommendation() {
    const message = document.getElementById("aiMessage");

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


// =========================================
// 4. AI HIDDEN GEM FINDER (PURE REST FETCH)
// =========================================
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
        const state = stateInput.value.trim() || 'India';
        const budget = budgetInput.value;

        cardsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #173b32; font-size: 1.1rem; padding: 2rem 0;">✦ Discovering unexplored spots, affordable stays & transit with AI...</p>';

        const promptText = `Provide 3 lesser-known, offbeat tourist hidden gems in ${state}, India for a "${budget}" budget.
Return ONLY a valid JSON array of 3 objects with keys: "name", "tagline", "hotel", "transport", "imageUrl".
Do not include any Markdown backticks (\`\`\`json or \`\`\`), conversational text, or formatting. Only the raw JSON array.`;

        try {
            // Updated line:
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: promptText }]
                    }]
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message || 'Failed to call Gemini API');
            }

            let raw = data.candidates[0].content.parts[0].text;
            // Clean up any stray markdown wrappers
            raw = raw.replace(/```json/gi, '').replace(/```/g, '').trim();

            const gems = JSON.parse(raw);

            cardsContainer.innerHTML = gems.map(gem => `
                <div class="ai-card">
                    <img src="${gem.imageUrl || 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3'}" 
                         alt="${gem.name}" 
                         onerror="this.src='https://images.unsplash.com/photo-1506461883276-594a12b11cf3'" />
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

        } catch (err) {
            console.error('Error:', err);
            cardsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #b74335;"><strong>Error:</strong> ${err.message}</p>`;
        }
    });
}