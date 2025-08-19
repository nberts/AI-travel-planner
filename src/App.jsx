import { useState } from 'react'
import OpenAI from 'openai';
import './App.css'
import TravelForm from './components/TravelForm'

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

    const prompt =`
    I am planning a trip.
    Destination: ${destination}
    Dates: ${dates}
    Preference: ${preference}
    Please suggest a short travel itinerary (friendly, simple, 3-5 bullet points),
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
