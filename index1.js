// Function to trigger vibration effect
function vibrateChatbotIcon() {
    const chatbotIcon = document.getElementById('chatbot-icon');
    
    // Add the vibration effect
    chatbotIcon.classList.add('vibrate');
    
    // Remove vibration effect after a short duration
    setTimeout(() => {
        chatbotIcon.classList.remove('vibrate');
    }, 1000); // Vibration lasts for 1 second
}

// Function to show and hide the pop-up message
function showPopUpMessage() {
    const popUpMessage = document.getElementById('pop-up-message');
    
    // Show the message for 5 seconds
    popUpMessage.style.display = 'block';
    
    setTimeout(() => {
        popUpMessage.style.display = 'none';  // Hide the message after 5 seconds
    }, 2000); // Message visible for 5 seconds
}

// Function to start the vibration and popup message cycle
function startVibrationAndPopUpCycle() {
    setInterval(() => {
        vibrateChatbotIcon();      // Trigger vibration every 5 seconds
        showPopUpMessage();         // Show pop-up message for 5 seconds
    }, 5000); // Repeat the cycle every 10 seconds (5 seconds for display, 5 seconds hidden)
}

// Call the function when the page loads
window.onload = startVibrationAndPopUpCycle;

// Function to toggle chatbot visibility
function toggleChat() {
    const chat = document.getElementById('chatbot');
    chat.style.display = (chat.style.display === 'none' || chat.style.display === '') ? 'block' : 'none';
}

// Handle chatbot input and respond based on keywords
function handleChat(event) {
    if (event.key === 'Enter') {
        const userInput = document.getElementById('userInput').value;
        const chatHistory = document.getElementById('chat-history');

        if (userInput.trim()) {
            // Display user input
            chatHistory.innerHTML += `<div class="user-message">You: ${userInput}</div>`;
            document.getElementById('userInput').value = '';

            // Generate bot response based on predefined logic
            const botResponse = getBotResponse(userInput);
            chatHistory.innerHTML += `<div class="bot-message">Bot: ${botResponse}</div>`;
            chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to the bottom
        }
    }
}

// Predefined keyword-based responses
function getBotResponse(input) {
    const message = input.toLowerCase();

    if (message.includes("appointment")) {
        return "You can book an appointment by visiting the 'Appointments' section.";
    } else if (message.includes("doctor")) {
        return "We have experienced doctors. You can see more details in the 'Doctors' section.";
    } else if (message.includes("departments")) {
        return "Our hospital offers multiple departments like General Medicine, Pediatrics, Orthopedics, and more.";
    } else if (message.includes("contact")) {
        return "You can contact us at (123) 456-7890 or via email at hospital@EMAIL.";
    } else {
        return "I'm sorry, I didn't understand that. Can you ask something else?";
    }
}
