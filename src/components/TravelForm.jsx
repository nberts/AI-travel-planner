import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TravelForm({ onSubmit }) {
    const [destinationInput, setDestinationInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    
    
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [preference, setPreference] = useState("");
    const [variety, setVariety] = useState(false);

    //fetch autocomplete suggestions
    const handleDestinationChange = async (e) => {
        const value = e.target.value;
        setDestinationInput(value);
        setSelectedDestination(null);

        if (value.length < 3) {
            setSuggestions([]);
            return;
        }

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                value
                )}&addressdetails=1&limit=5`
            );
            const data = await res.json();
            setSuggestions(data);
        } catch (err) {
            console.error("Error fetching suggestions:", err);
        }
    };

    // Select destination from drop down
    const handleSelectSuggestion = (suggestion) => {
        setSelectedDestination(suggestion);
        setDestinationInput(suggestion.display_name);
        setSuggestions([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }

        if (!selectedDestination) {
            alert("Please select a location from the suggestions.");
            return;
        }

        //Send all form data back
        onSubmit({
            destination: selectedDestination,
            startDate,
            endDate,
            preference,
            variety,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="travel-form">
            <h2>Plan your Trip</h2>

            {/* --- Destionation --- */}
            <div style={{ position: "relative" }}>
                <input
                    type="text"
                    placeholder="Enter destination"
                    value={destinationInput}
                    onChange={handleDestinationChange}
                    required
                />

                {suggestions.length > 0 && (
                    <ul
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            right: 0,
                            background: "white",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            maxHeight: "200px",
                            overflowY: "auto",
                            marginTop: "2px",
                            zIndex: 1000,
                            listStyle: "none",
                            padding: 0,
                        }}
                    >
                        {suggestions.map((sugg, index) => (
                            <li
                            key={index}
                            onClick={() => handleSelectSuggestion(sugg)}
                            style={{ padding: "8px", cursor: "pointer" }}
                            >
                                {sugg.display_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* --- Dates --- */}
            <div>
                <label>Start Date: </label>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    required
                />
            </div>
            
            <div>
                <label>End Date: </label>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    required
                />
            </div>

            {/* --- Preferences --- */}
            <div>
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
            </div>
            
            {/* --- Variety Checkbox --- */}
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={variety}
                        onChange={(e) => setVariety(e.target.checked)}
                    />
                    Include a variety of categories
                </label>
            </div>
            
            <button type="submit"> Generate Plan</button>
        </form>
    );
}

export default TravelForm;