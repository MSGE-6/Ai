const status = document.getElementById("status");
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("userInput");
const btn = document.getElementById("sendBtn");

// THE BRAIN: Internal Neural-Style Logic
const aiMemory = [
    { keys: ["hello", "hi", "yo", "hey", "greetings"], response: "CORE ONLINE. GREETINGS USER. DATA STREAMS STABLE." },
    { keys: ["who are you", "what are you"], response: "I AM NEURAL CORE V1. A LOCALLY HOSTED ARTIFICIAL INTELLIGENCE." },
    { keys: ["vibe", "mood", "check"], response: "SCANNING HARDWARE... VIBE IS OPTIMAL. GPU ACCELERATION ACTIVE." },
    { keys: ["smart", "ai", "think"], response: "MY NEURAL WEIGHTS ARE CALCULATING YOUR INPUT IN REAL TIME." },
    { keys: ["help", "commands"], response: "AVAILABLE PROTOCOLS: HELLO, VIBE, IDENTITY, CLEAR." },
    { keys: ["bye", "exit", "stop"], response: "SYSTEM ENTERING SLEEP MODE. STANDBY..." }
];

status.innerText = "STATUS: SYSTEM ONLINE (LOCAL_CORE)";

function processAI(text) {
    const userWords = text.toLowerCase().split(" ");
    let bestMatch = null;
    let highestScore = 0;

    // This is the "Inference" - it scores the best response
    aiMemory.forEach(item => {
        let score = 0;
        item.keys.forEach(key => {
            if (userWords.includes(key)) score++;
        });
        
        if (score > highestScore) {
            highestScore = score;
            bestMatch = item.response;
        }
    });

    return bestMatch || "INPUT RECEIVED. ANALYZING DATA FRAGMENTS... NO MATCH FOUND.";
}

btn.onclick = () => {
    const text = input.value.trim();
    if (!text) return;

    // Show User Message
    chatBox.innerHTML += `<div style="margin-bottom:15px;">USER: ${text.toUpperCase()}</div>`;
    input.value = "";
    status.innerText = "STATUS: PROCESSING...";

    // Simulated "Thinking" Delay
    setTimeout(() => {
        const response = processAI(text);
        const cleanResponse = response.replace(/_/g, ' ').replace(/-/g, ' ');

        chatBox.innerHTML += `<div style="margin-bottom:15px; color:#888;">${cleanResponse}</div>`;
        status.innerText = "STATUS: SYSTEM ONLINE";
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 400);
};

// Enter key support
input.addEventListener("keypress", (e) => { if (e.key === "Enter") btn.click(); });
