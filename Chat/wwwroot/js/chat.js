const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

connection.on("ReceiveMessage", (user, message) => {
    const encodedUser = user ? `${user}: ` : '';
    const li = document.createElement("li");
    li.textContent = encodedUser + message;
    document.getElementById("chatMessages").appendChild(li);
});

document.getElementById("sendButton").addEventListener("click", async (event) => {
    const username = document.getElementById("usernameInput").value;
    const message = document.getElementById("messageInput").value;
    await connection.invoke("SendMessage", username, message);
    document.getElementById("messageInput").value = '';
});

connection.start().catch(err => console.error(err.toString()));
