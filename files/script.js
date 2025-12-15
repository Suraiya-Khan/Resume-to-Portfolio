/* script.js */

document.addEventListener('DOMContentLoaded', () => {
    const chatbotIcon = document.querySelector('.chatbot-icon');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const closeChatbotButton = document.getElementById('closeChatbot');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const chatboxMessages = document.getElementById('chatboxMessages');

    // Toggle chatbot window visibility
    chatbotIcon.addEventListener('click', () => {
        chatbotWindow.classList.toggle('visible');
    });

    // Close chatbot window
    closeChatbotButton.addEventListener('click', () => {
        chatbotWindow.classList.remove('visible');
    });

    // Function to add a message to the chat window
    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatboxMessages.appendChild(messageElement);
        // Auto-scroll to the bottom of the chat
        chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
    }

    // Function to get a response from the 'AI' (based on predefined rules)
    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase().trim();

        // More sophisticated keyword matching
        if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
            return "Hello! How can I assist you with Suraiya's portfolio today?";
        }
        if (lowerCaseMessage.includes('project') && lowerCaseMessage.includes('health insurance')) {
            return "The 'Health Insurance Cost Prediction' project involved building a machine learning model using Python, Pandas, and scikit-learn to predict costs based on various features.";
        }
        if (lowerCaseMessage.includes('project') && lowerCaseMessage.includes('practo')) {
            return "The 'Practo Online Consultation Analysis' project focused on data analysis using Python and Pandas to uncover trends in healthcare consultations.";
        }
        if (lowerCaseMessage.includes('project') && lowerCaseMessage.includes('adidas')) {
            return "For the 'Adidas Sales Analysis', Suraiya created an interactive Power BI dashboard to visualize sales performance and identify key insights.";
        }
         if (lowerCaseMessage.includes('project') && lowerCaseMessage.includes('energy')) {
            return "The 'Energy Consumption Analysis' involved using SQL and Power BI to analyze global energy trends and their relationship with economic and environmental factors.";
        }
        if (lowerCaseMessage.includes('project') && (lowerCaseMessage.includes('clone') || lowerCaseMessage.includes('ecommerce') || lowerCaseMessage.includes('food delivery'))) {
            return "Suraiya developed functional clones of e-commerce and food delivery platforms as part of her MERN Stack development, showcasing her full-stack capabilities.";
        }
        if (lowerCaseMessage.includes('skill') || lowerCaseMessage.includes('technologies')) {
            return "Suraiya is proficient in Data Science (Python, Power BI, SQL, ML, DL, Agentic AI), Frontend (HTML, CSS, JavaScript, React, Bootstrap), Backend (Node.js, Express.js, MongoDB), and Version Control (Git, GitHub).";
        }
        if (lowerCaseMessage.includes('experience') || lowerCaseMessage.includes('work')) {
            return "She has experience as a Fellow at Piramal Foundation (Project Coordination & Training) and as a MERN Stack Developer Intern at Edureka.";
        }
        if (lowerCaseMessage.includes('education') || lowerCaseMessage.includes('studied')) {
            return "Suraiya holds a Master of Computer Applications (Marwari College) and a Bachelor of Science in Information Technology (Nirmala College). She received Gold Medals in both!";
        }
        if (lowerCaseMessage.includes('achievement') || lowerCaseMessage.includes('award') || lowerCaseMessage.includes('medal')) {
            return "A significant achievement includes receiving Gold Medals in both her Graduation and Post-Graduation, with the Graduation honor presented by the President of India. She was also recognized as the Best Speaker.";
        }
        if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('reach')) {
            return "You can contact Suraiya via email at suraiyakhan482@gmail.com or phone at 8298104359.";
        }
        if (lowerCaseMessage.includes('linkedin')) {
            return "Suraiya's LinkedIn profile: https://www.linkedin.com/in/suraiyakhan/";
        }
        if (lowerCaseMessage.includes('github') || lowerCaseMessage.includes('git')) {
            return "You can find her code and projects on GitHub: https://github.com/Suraiya-Khan";
        }
         if (lowerCaseMessage.includes('MERN')) {
            return "MERN stands for MongoDB, Express.js, React, and Node.js - a popular stack for building full-stack web applications.";
        }
        if (lowerCaseMessage.includes('Power BI')) {
            return "Power BI is a business analytics service that provides interactive visualizations and business intelligence capabilities with an interface simple enough for end users to create their own reports and dashboards.";
        }
        if (lowerCaseMessage.includes('machine learning')) {
            return "Machine learning is a type of artificial intelligence (AI) that allows software applications to become more accurate at predicting outcomes without being explicitly programmed to do so. It focuses on building systems that can learn from and make decisions based on data.";
        }

        // Default response if no specific match
        return "I'm still learning! Can you please ask about Suraiya's skills, projects, education, or experience?";
    }

    // Event listener for the send button
    sendButton.addEventListener('click', () => {
        const messageText = userInput.value.trim();
        if (messageText) {
            addMessage('user', messageText); // Add user message to chat
            userInput.value = ''; // Clear input field

            // Simulate bot typing delay
            setTimeout(() => {
                const botResponse = getBotResponse(messageText);
                addMessage('bot', botResponse); // Add bot response to chat
            }, 500); // 0.5 second delay
        }
    });

    // Event listener for pressing Enter in the input field
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click(); // Trigger send button click
        }
    });

    // Initial welcome message from the bot
    addMessage('bot', "Hello! I'm your AI Assistant for Suraiya Khan's portfolio. Ask me anything about her skills, projects, or experience!");
});