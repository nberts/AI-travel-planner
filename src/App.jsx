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

function parseItinerary(text) {
  if (!text) return [];

  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const days = [];
  let current = null;

  lines.forEach(line => {
    const dayMatch = line.match(/^(Day\s*\d+[:.-]?)/i);
      if (dayMatch) {
        if (current) days.push(current);
        current = { day: dayMatch[1], activities: [] };
        const rest = line.replace(dayMatch[1], "").trim();
        if (rest) current.activities.push(rest);
      } else if (current) {
        current.activities.push(line);
      }
    });
    if (current) days.push(current);
    return days;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("");
  const [parsedPlan, setParsedPlan] = useState([]);

  const handleFormSubmit = async ({ destination, startDate, endDate, preference, variety }) => {
    setLoading(true);

    //calculate days in trip
    const days = differenceInDays(endDate, startDate) +1;
    let numSuggestions = days <= 3 ? 3 : days <= 7 ? 5 : days <= 14 ? 7 : 10;

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

      const content = response.choices[0]?.message?.content || "";
      setPlan(content);
      setParsedPlan(parseItinerary(content));
    } catch (error) {
      console.error(error);
      setPlan("Error generating plan. Try again.");
      setParsedPlan([]);
    }

    setLoading(false);
  };

  return (
    <div>
      <div>
        <h1>
          🌎 AI Travel Planner
        </h1>

        <div className='form-container'>
          <TravelForm onSubmit={handleFormSubmit} />
        </div>
        {loading && <p> ✨ Generating your plan...</p>}

        {parsedPlan.length > 0 ? (
          <div className='itinerary'>
            <h2>Your Itinerary</h2> 
              <div className='day-grid'>
                {parsedPlan.map((day, index) => (
                  <div key={index} className='day-card'>
                    <strong>{day.day}</strong>
                    <ul>
                      {day.activities.map((act, i) => (
                        <li key={i}>{act}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div> 
          </div>
        ) : (
          plan && (
            <div>
              <h2>Your Itinerary</h2>
              <pre>{plan}</pre>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App
