/* =========================================================
   HIDDEN INDIA — CONCIERGE CHAT (frontend)

   Talks to /.netlify/functions/concierge, which holds the
   real Anthropic API key server-side. This file never sees
   the key.
========================================================= */

const CONCIERGE_ENDPOINT = "/.netlify/functions/concierge";

let chatHistory = [];   // [{role: "user"|"assistant", content: "..."}]

const chatLog = document.getElementById("chatLog");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");


/* =========================================
   FOOTFALL / IMPACT / ACCESS DERIVED LABELS
========================================= */

function footfallLabel(pressure) {
    if (pressure === "LOW") return "< 20 guests/day";
    if (pressure === "MODERATE") return "50–150 guests/day";
    return "300+ guests/day";
}


/* =========================================
   RENDER HELPERS
========================================= */

function appendBubble(role, text) {

    const wrap = document.createElement("div");
    wrap.className = "chat-row " + (role === "user" ? "row-user" : "row-ai");

    wrap.innerHTML = `
        <div class="avatar ${role === "user" ? "avatar-user" : "avatar-ai"}">
            ${role === "user" ? "YOU" : "AI"}
        </div>
        <div class="bubble ${role === "user" ? "bubble-user" : "bubble-ai"}">
            ${text}
        </div>
    `;

    chatLog.appendChild(wrap);
    chatLog.scrollTop = chatLog.scrollHeight;

    return wrap;

}


function appendTyping() {

    const wrap = document.createElement("div");
    wrap.className = "chat-row row-ai";
    wrap.id = "typingRow";

    wrap.innerHTML = `
        <div class="avatar avatar-ai">AI</div>
        <div class="bubble bubble-ai typing">
            <span></span><span></span><span></span>
        </div>
    `;

    chatLog.appendChild(wrap);
    chatLog.scrollTop = chatLog.scrollHeight;

}


function removeTyping() {
    const el = document.getElementById("typingRow");
    if (el) el.remove();
}


function appendMatchCard(destination, matchPercent) {

    const wrap = document.createElement("div");
    wrap.className = "match-card";

    wrap.innerHTML = `

        <div class="match-top">
            <span class="match-badge">${matchPercent}% MATCH IDENTIFIED</span>
            <span class="match-location">${destination.name}, ${destination.state}</span>
        </div>

        <p class="match-desc">
            <strong>${destination.name}:</strong> ${destination.description}
        </p>

        <div class="match-stats">

            <div>
                <span>DAILY FOOTFALL</span>
                <strong>${footfallLabel(destination.pressure)}</strong>
            </div>

            <div>
                <span>DIRECT IMPACT</span>
                <strong>${destination.community}% Direct</strong>
            </div>

            <div>
                <span>ACCESS</span>
                <strong>${destination.access || "Local Road"}</strong>
            </div>

        </div>

        <div class="match-footer">
            <span>Best time: <b>${destination.bestTime}</b></span>
            <span>Est. jobs supported: <b>${destination.jobsSupported}+</b></span>
        </div>

        <button
            class="ai-button match-explore-btn"
            onclick="localStorage.setItem('selectedState', '${destination.state}'); localStorage.setItem('selectedDestination', '${destination.name}'); window.location.href='state.html';">
            Explore ${destination.name} →
        </button>

    `;

    chatLog.appendChild(wrap);
    chatLog.scrollTop = chatLog.scrollHeight;

}


function appendErrorNotice(text) {

    const wrap = document.createElement("div");
    wrap.className = "chat-error";
    wrap.innerText = text;

    chatLog.appendChild(wrap);
    chatLog.scrollTop = chatLog.scrollHeight;

}



/* =========================================
   SEND MESSAGE
========================================= */

async function sendChatMessage() {

    const text = chatInput.value.trim();
    if (!text) return;

    appendBubble("user", escapeHtml(text));
    chatHistory.push({ role: "user", content: text });

    chatInput.value = "";
    sendBtn.disabled = true;
    appendTyping();

    try {

        const res = await fetch(CONCIERGE_ENDPOINT, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ message: text, history: chatHistory })
        });

        removeTyping();

        if (!res.ok) {
            const errBody = await res.json().catch(() => ({}));
            appendErrorNotice(
                errBody.error === "Gemini API error"
                    ? "The concierge is temporarily unavailable. Please try again shortly."
                    : "This chat needs a deployed backend with GEMINI_API_KEY set — see README.md for setup."
            );
            return;
        }

        const data = await res.json();

        appendBubble("ai", escapeHtml(data.reply || "..."));
        chatHistory.push({ role: "assistant", content: data.reply || "" });

        if (data.destination) {
            appendMatchCard(data.destination, data.matchPercent || 0);
        }

    } catch (err) {

        removeTyping();
        appendErrorNotice(
            "Couldn't reach the concierge function. If you're running this locally, use `netlify dev` " +
            "instead of opening index.html directly — see README.md."
        );

    } finally {
        sendBtn.disabled = false;
    }

}


function escapeHtml(str) {
    const div = document.createElement("div");
    div.innerText = str;
    return div.innerHTML;
}



/* =========================================
   WIRE UP INPUT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    if (!chatLog) return;

    appendBubble(
        "ai",
        "Namaste! 🙏 Tell me what you're drawn to — a mood, a craft, a landscape — in your own words, " +
        "and I'll match you to a hidden destination with real room to host you."
    );

    sendBtn.addEventListener("click", sendChatMessage);

    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") sendChatMessage();
    });

});