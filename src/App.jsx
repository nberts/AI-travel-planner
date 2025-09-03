import { useState } from 'react';
import OpenAI from 'openai';
import './App.css';
import TravelForm from './components/TravelForm';
import { parse, differenceInDays } from 'date-fns';

// OpenRouter config
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
});

function App() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("");

  const handleFormSubmit = async ({ destination, dates, preference }) => {
    setLoading(true);

    //parse dates
    let tripLength = 5; //default value
    try {
      const parts = dates.split(/-|to/);
      if (parts.length === 2) {
        const start = parse(parts[0].trim(), "MMMM d, yyyy", new Date());
        const end = parse(parts[1].trim(), "MMMM d, yyyy", new Date());
        const days = differenceInDays(end, start) + 1;

        if(!isNaN(days) && days >0) {
          tripLength = days;
        }
      }
    } catch (err) {
      console.warn("Could not parse dates, using default plan length");
    }

    // adjust number suggestions
    let numSuggestions = 5;
    if (tripLength <=3) numSuggestions = 3;
    else if (tripLength <= 7) numSuggestions = 5;
    else if (tripLength <= 14) numSuggestions = 7;
    else numSuggestions = 10;

    //prompt
    const prompt =`
    I am planning a trip.
    - Destination: ${destination}
    - Dates: ${dates}
    - Preference: ${preference}

    Please suggest an itinerary of about ${numSuggestions} days,
    with one activity or suggestion per day.
    Format as a friendly list of ${numSuggestions} bullet points.
    Please ensure to advise if any attractiion needs booking in advance.
    `;                    

    try {
      const response = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
      });

      setPlan(response.choices[0].message.content);
    } catch (error) {
      console.error(error);
      setPlan("Error generating plan. Check console for details.");
    }

    setLoading(false);
  };

  return (
    <div style={{margin: "20px"}}>
      <h1>AI Travel Planner</h1>
      <TravelForm onSubmit={handleFormSubmit} />

      {loading && <p> Generating your plan...</p>}

      {plan && (
        <div style={{marginTop: "20px"}}>
          <h2>Your AI Travel Plan</h2> 
          <pre>{plan}</pre>
        </div>
      )}
    </div>
  );
}

export default App
