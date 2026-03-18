import * as webllm from "https://esm.run/@mlc-ai/web-llm";

const status = document.getElementById("status");
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("userInput");
const btn = document.getElementById("sendBtn");

// This is the smallest "smart" model that won't crash a phone
const modelId = "TinyLlama-1.1B-Chat-v1.0-q4f16_1-MLC"; 

let engine;

async function initAI() {
    try {
        status.innerText = "STATUS: SEARCHING_FOR_GPU...";
        
        // Create the engine and start the download
        engine = await webllm.CreateMLCEngine(modelId, {
            initProgressCallback: (p) => {
                status.innerText = `DOWNLOADING_BRAIN: ${Math.round(p.progress * 100)}%`;
            }
        });
        
        status.innerText = "STATUS: SYSTEM_ONLINE_GPU_ACTIVE";
    } catch (e) {
        status.innerText = "ERROR: DEVICE_NOT_SUPPORTED";
        console.error(e);
    }
}

async function handleChat() {
    const text = input.value.trim();
    if (!text || !engine) return;

    // Display User Message
    chatBox.innerHTML += `<div class="msg">USER: ${text}</div>`;
    input.value = "";
    status.innerText = "STATUS: THINKING...";
    
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const messages = [{ role: "user", content: text }];
        
        // This is the actual AI generating text
        const reply = await engine.chat.completions.create({ messages });
        const aiText = reply.choices[0].message.content;

        // Display AI Message (Cleaned of underscores/dashes)
        const cleanText = aiText.replace(/_/g, ' ').replace(/-/g, ' ');
        chatBox.innerHTML += `<div class="msg" style="color:#888;">${cleanText}</div>`;
        
        status.innerText = "STATUS: SYSTEM_ONLINE";
    } catch (e) {
        chatBox.innerHTML += `<div class="msg">ERROR: INFERENCE_FAILED</div>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

btn.onclick = handleChat;

// Support "Enter" key
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleChat();
});

initAI();
