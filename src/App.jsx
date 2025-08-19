import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TravelForm from './components/TravelForm'

function App() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("");

  const handleFormSubmit = async ({ destination, dates, preference }) => {
    setLoading(true);

    //API will be going here.

    await new Promise(res => setTimeout(res, 1000));

    const fakePlan = `
    Trip to ${destination}
    Dates: ${dates}
    Preference: ${preference}
    Suggested itinerary:
      - Day 1: Explore the city
      - Day 2: Visit top attractions
      - Day 3: Relax and enjoy local cuisine
    `;

    setPlan(fakePlan);
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
