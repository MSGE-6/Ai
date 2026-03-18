const status = document.getElementById("status");
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("userInput");
const btn = document.getElementById("sendBtn");

// This uses an "Inference Widget" - it's a real AI brain (GPT-2 or Llama-based)
// but it's much lighter so it won't hang at 0%.
const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

status.innerText = "STATUS: SYSTEM ONLINE (GPU_READY)";

async function queryAI(text) {
    status.innerText = "STATUS: THINKING...";
    
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({ inputs: text }),
        });
        const result = await response.json();
        
        // Handling the AI's response text
        let aiText = result[0].generated_text || "SYSTEM ERROR: DATA CORRUPT";
        
        // Clean up: Remove the user's prompt from the start of the response
        if (aiText.includes(text)) {
            aiText = aiText.replace(text, "").trim();
        }

        const cleanText = aiText.replace(/_/g, ' ').replace(/-/g, ' ');
        chatBox.innerHTML += `<div class="msg" style="color:#888;">${cleanText}</div>`;
    } catch (e) {
        chatBox.innerHTML += `<div class="msg">ERROR: SIGNAL LOST</div>`;
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
