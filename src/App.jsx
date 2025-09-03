import { useState } from 'react';
import OpenAI from 'openai';
import './App.css';
import TravelForm from './components/TravelForm';
import { format, differenceInDays } from 'date-fns';

// OpenRouter config
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
});

function App() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("");

  const handleFormSubmit = async ({ destination, startDate, endDate, preference, variety }) => {
    setLoading(true);

    //calculate days in trip
    const days = differenceInDays(endDate, startDate) +1;

    // adjust number suggestions
    let numSuggestions = 5;
    if (days <=3) numSuggestions = 3;
    else if (days <= 7) numSuggestions = 5;
    else if (days <= 14) numSuggestions = 7;
    else numSuggestions = 10;

    const formattedStart = format(startDate, "MMMM d, yyyy");
    const formattedEnd = format(endDate, "MMMM d, yyyy");

    //prompt
    const prompt =`
    I am planning a trip.
    - Destination: ${destination}
    - Dates: ${formattedStart} → ${formattedEnd} (${days} days)
    - Preference: ${preference}
    - ${variety ? "Please include a mix of categories (museums, outdoors, food, culture, nightlife)." : ""}

    Please generate a daily itinerary for ${numSuggestions} days.
    Each day should have 1-2 suggested activities.
    Format as:
    Day 1: ...
    Day 2: ...
    etc.
    `;                    

    try {
      const response = await client.chat.completions.create({
        model: "openai/gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
      });

      setPlan(response.choices[0]?.message?.content || "No response");
    } catch (error) {
      console.error(error);
      setPlan("Error generating plan. Try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>AI Travel Planner</h1>

      <TravelForm onSubmit={handleFormSubmit} />

      {loading && <p> ✨ Generating your plan...</p>}

      {plan && (
        <div>
          <h2>Your itinerary</h2> 
          <pre>{plan}</pre>
        </div>
      )}
    </div>
  );
}

export default App
