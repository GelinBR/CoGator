// Create and inject the chat button and chat window
function createChatInterface() {
    // Create chat button
    const chatButton = document.createElement('div');
    chatButton.id = 'cogator-chat-button';
    chatButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor"/>
        </svg>
    `;

    // Create chat window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'cogator-chat-window';
    chatWindow.innerHTML = `
        <div class="chat-header">
            <h3>CoGator Assistant</h3>
            <button class="close-button">×</button>
        </div>
        <div class="chat-messages"></div>
        <div class="chat-input">
            <textarea placeholder="Type your message..."></textarea>
            <button class="send-button">Send</button>
        </div>
    `;

    // Add elements to the page
    document.body.appendChild(chatButton);
    document.body.appendChild(chatWindow);

    // Add event listeners
    chatButton.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        chatButton.classList.toggle('open');
    });

    const closeButton = chatWindow.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        chatWindow.classList.remove('open');
        chatButton.classList.remove('open');
    });
}

// Initialize the chat interface when the page loads
createChatInterface(); 