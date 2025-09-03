import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TravelForm({ onSubmit }) {
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [preference, setPreference] = useState("");
    const [variety, setVariety] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }
        onSubmit({destination, startDate, endDate, preference, variety});
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2>Plan your Trip</h2>
            <div>
                <input
                    type="text"
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                />
            </div>
            
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