document.addEventListener("DOMContentLoaded", () => {
    const app = document.querySelector(".app");
    const socket = io();
    let username;

    app.querySelector("#join-user").addEventListener("click", () => {
        username = app.querySelector("#username").value.trim();
        if (!username) return;
        socket.emit("newuser", username);
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
    });

    
    app.querySelector("#exit-chat").addEventListener("click", () => {
        socket.emit("exituser", username);
        app.querySelector(".chat-screen").classList.remove("active");
        app.querySelector(".join-screen").classList.add("active");
    });

    app.querySelector("#send-message").addEventListener("click", () => {
        const messageInput = app.querySelector("#message-input");
        const message = messageInput.value.trim();
        if (!message) return;
        socket.emit("chat", { username, text: message });
        messageInput.value = "";
    });

    socket.on("chat", (message) => {
        renderMessage(message);
    });

    function renderMessage(message) {
        const messagesContainer = app.querySelector(".messages");
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        if (message.username === username) {
            messageElement.classList.add("my-message");
        }
        messageElement.innerText = `${message.username}: ${message.text}`;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});
