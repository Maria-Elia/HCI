const sendBtn = document.getElementById("sendBtn");
const chat = document.getElementById("chat");
const chatInner = document.querySelector(".chat-inner") || chat;
const inputField = document.querySelector(".input-box input");

let readingStart = null;

sendBtn.addEventListener("click", () => {
  // Get the message from input field
  const userMessage = inputField.value;

  if (!userMessage.trim()) return;

  sendBtn.disabled = true;

  const userWrapper = document.createElement("div");
  userWrapper.className = "message user";
  const userBubble = document.createElement("div");
  userBubble.className = "bubble";
  userBubble.textContent = userMessage;
  userWrapper.appendChild(userBubble);
  chatInner.appendChild(userWrapper);

  inputField.value = "";

  const assistantWrapper = document.createElement("div");
  assistantWrapper.className = "message assistant";

  const assistantBubble = document.createElement("div");
  assistantBubble.className = "bubble";

  assistantBubble.innerHTML = `
        <div class="typing">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    `;

  assistantWrapper.appendChild(assistantBubble);
  chatInner.appendChild(assistantWrapper);
  chat.scrollTop = chat.scrollHeight;

  setTimeout(() => {
    assistantBubble.innerHTML = "";
    let i = 0;
    const interval = setInterval(() => {
      assistantBubble.textContent += explanation.charAt(i);
      i++;
      chat.scrollTop = chat.scrollHeight;
      if (i >= explanation.length) {
        clearInterval(interval);
        readingStart = Date.now();
        const notice = document.createElement("div");
        notice.innerHTML = `
                    <div class="notice">
                        Please read the explanation carefully.
                        You will be tested on the content afterwards.
                    </div>
                    <button class="continue-btn" id="continueBtn">Continue to Quiz</button>
                `;
        chatInner.appendChild(notice);
        document.getElementById("continueBtn").addEventListener("click", () => {
          const readingTime = Math.round((Date.now() - readingStart) / 1000);
          localStorage.setItem("readingTime", readingTime);
          window.location.href = GOOGLE_FORM;
        });
        chat.scrollTop = chat.scrollHeight;
      }
    }, 10);
  }, 1500);
});
