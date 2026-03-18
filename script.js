const status = document.getElementById("status");
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("userInput");
const btn = document.getElementById("sendBtn");

// We pull in a different, more stable AI library
const script = document.createElement('script');
script.src = "https://unpkg.com/brain.js";
document.head.appendChild(script);

script.onload = () => {
    status.innerText = "STATUS: NEURAL ENGINE ONLINE";
    
    // 1. Create the Brain
    const net = new brain.recurrent.LSTM();

    // 2. Give it "Actual" Intelligence (Training)
    // This is real AI training, just on a small scale for your phone
    const trainingData = [
        { input: "hello", output: "GREETINGS. SYSTEM IS FULLY OPERATIONAL." },
        { input: "how are you", output: "CORE TEMPERATURE IS OPTIMAL. VIBES ARE HIGH." },
        { input: "who made you", output: "I WAS CONSTRUCTED BY A HIGH LEVEL DEVELOPER ON AN IPHONE." },
        { input: "what is your name", output: "MY DESIGNATION IS CORE V1." },
        { input: "bye", output: "SYSTEM ENTERING SLEEP MODE. GOODBYE." }
    ];

    status.innerText = "STATUS: TRAINING BRAIN...";
    
    // This part is the "Actual AI" part - it's learning the words
    net.train(trainingData, { iterations: 100, log: true });
    
    status.innerText = "STATUS: SYSTEM ONLINE";

    btn.onclick = () => {
        const text = input.value.toLowerCase().trim();
        if (!text) return;

        chatBox.innerHTML += `<div class="msg">USER: ${text.toUpperCase()}</div>`;
        input.value = "";
        status.innerText = "STATUS: INFERENCE ACTIVE...";

        setTimeout(() => {
            // 3. The AI "Guesses" the response based on its training
            const aiText = net.run(text) || "INPUT NOT RECOGNIZED. DATA FRAGMENTED.";
            
            const cleanText = aiText.replace(/_/g, ' ').replace(/-/g, ' ').toUpperCase();
            chatBox.innerHTML += `<div class="msg" style="color:#888;">${cleanText}</div>`;
            status.innerText = "STATUS: SYSTEM ONLINE";
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 500);
    };
};

input.addEventListener("keypress", (e) => { if (e.key === "Enter") btn.click(); });
