import { useState } from "react";

function TravelForm({ onSubmit }) {
    const [destination, setDestination] = useState("");
    const [dates, setDates] = useState("");
    const [preference, setPreference] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({destination, dates, preference});
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Plan your Trip</h2>

            <input
                type="text"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
            />

            <input 
                type="text"
                placeholder="Enter dates (e.g. January 10-15)"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                required
            />

            <select
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
                required
            >
                <option value="">Choose preference</option>
                <option value="relaxing">Relaxing</option>
                <option value="adventure">Adventure</option>
                <option value="culture">Culture</option>
            </select> 

            <button type="submit"> Generate Plan</button>
        </form>
    );
}

export default TravelForm;