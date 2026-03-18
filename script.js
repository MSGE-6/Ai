const status = document.getElementById("status");
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("userInput");
const btn = document.getElementById("sendBtn");

status.innerText = "STATUS: SYSTEM ONLINE";

async function queryAI(text) {
    status.innerText = "STATUS: THINKING...";
    
    try {
        // Using a public, no-key-needed AI endpoint
        const response = await fetch(`https://api.duckduckgo.com/lib/chat/v1/query?q=${encodeURIComponent(text)}`);
        
        // If that one is picky, we use this super simple fallback AI
        const backupRes = await fetch(`https://api.simsimi.vn/v2/simsimi?text=${encodeURIComponent(text)}&lc=en`);
        const data = await backupRes.json();
        
        let aiText = data.result || "SYSTEM ERROR: DATA_CORRUPT";

        // Clean up the text
        const cleanText = aiText.replace(/_/g, ' ').replace(/-/g, ' ').toUpperCase();

        chatBox.innerHTML += `<div class="msg" style="color:#888;">${cleanText}</div>`;
    } catch (e) {
        // If the internet is being mid, it shows this
        chatBox.innerHTML += `<div class="msg">ERROR: CONNECTION_STRENGTH_LOW</div>`;
    }
    
    status.innerText = "STATUS: SYSTEM ONLINE";
    chatBox.scrollTop = chatBox.scrollHeight;
}

btn.onclick = () => {
    const text = input.value.trim();
    if (!text) return;

    chatBox.innerHTML += `<div class="msg">USER: ${text}</div>`;
    input.value = "";
    queryAI(text);
};

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") btn.click();
});
