🌍 AI Travel Planner 
An AI-powered web app that helps you plan your trips! 🧳✈️
Built with React (Vite) and integrated with the OpenAI API to generate personalized travel itineraries based on your chosen destination, travel dates, and preferences. 

🚀 Features 
    Enter your destination, dates, and travel style (relaxing, adventure, culture).  
    AI generates a customized itinerary with suggested activities.  
    Simple, minimal UI to get started quickly.  
    Easily extensible with maps, design frameworks, and more.
     

📦 Tech Stack 
    React (Vite)  – fast React dev setup.  
    OpenAI API  – to generate travel itineraries.  
    JavaScript (ES6+) .
     
<!---
⚙️ Setup & Installation 
Clone this repo: 
    git clone https://github.com/your-username/ai-travel-planner.git
    cd ai-travel-planner
 
Install dependencies: 
    npm install

Run the development server: 
    npm run dev


Open your browser at http://localhost:5173 . 
🔑 Environment Variables 

This project requires an OpenAI API key. 

     Create a .env file in the root of your project.
     Add the following:
        VITE_OPENAI_API_KEY=your_openai_api_key_here
     **You can get an API key from OpenAI.
     
⚠️ Important: In this demo, the API key is exposed to the browser (dangerouslyAllowBrowser: true). This is not safe for production use. For a real app, you should create a backend (Node/Express) to handle API requests securely. 
📂 Project Structure 
    ai-travel-planner/
    ├─ src/
    │  ├─ components/
    │  │  └─ TravelForm.jsx   # Form for collecting trip details
    │  ├─ App.jsx             # Main app logic
    │  └─ main.jsx            # React entry point
    ├─ .env                   # Store your API Keys (not committed to git)
    ├─ index.html
    ├─ package.json
    └─ README.md

-->
 
🛠️ How It Works 
     User enters trip details in TravelForm.  
     Form submits data to App.jsx.  
     The app sends a prompt to the OpenAI API.  
     OpenAI responds with a travel plan, displayed in the UI.
     

✨ Future Improvements 
    Add Google Maps API integration to show the destination.  
    Add a date picker for better UX.  
    Store multiple itineraries (favorites/history).  
    Use Tailwind CSS or Material-UI for modern styling.  
    Build a secure Node.js backend to protect your API keys.
     

📜 License 
This is a learning project – feel free to fork, tweak, and improve!   