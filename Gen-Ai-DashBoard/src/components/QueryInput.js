import { useState, useEffect,useRef } from "react";
import { useDispatch } from "react-redux";
import { addQuery, setResults, setLoading, setError } from "../redux/querySlice";

const QueryInput = ({ resultsRef }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  useEffect(() => {
    fetch("/data/suggestions.txt") 
      .then((response) => response.text())
      .then((text) => {
        setSuggestions(text.split("\n").map((line) => line.trim()).filter(Boolean));
      })
      .catch((error) => console.error("Error loading suggestions:", error));
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    
    setQuery(value);
    

    setFilteredSuggestions(
      value.trim()
        ? suggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase()))
        : []
    );
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setFilteredSuggestions([]);
  };

  const handleQuerySubmit = () => {
    if (query.trim() === "") {
        setErrorMessage("Query cannot be empty!");
      } else {
        setErrorMessage(""); 
      }
    if (!query.trim()) return;
    dispatch(addQuery(query));
    dispatch(setLoading());
    setFilteredSuggestions([]);

    setTimeout(() => {
      if (query.toLowerCase().includes("error")) {
        dispatch(setError("Invalid query. Try again!"));
      } else {
        let results;
        if (query.toLowerCase().includes("last week")) {
          results = [
            { period: "Monday", value: Math.random() * 500 },
            { period: "Tuesday", value: Math.random() * 500 },
            { period: "Wednesday", value: Math.random() * 500 },
            { period: "Thursday", value: Math.random() * 500 },
            { period: "Friday", value: Math.random() * 500 },
            { period: "Saturday", value: Math.random() * 500 },
            { period: "Sunday", value: Math.random() * 500 },
          ];
        }
        else if (query.toLowerCase().includes("last month")) {
            results = [
              { period: "Week 1", value: Math.random() * 10000 },
              { period: "Week 2", value: Math.random() * 10000 },
              { period: "Week 3", value: Math.random() * 10000 },
              { period: "Week 4", value: Math.random() * 10000 },
            ];
          }
          
        else if (query.toLowerCase().includes("last six months")) {
          results = ["January", "February", "March", "April", "May", "June"].map((month) => ({
            period: month,
            value: Math.random() * 10000,
          }));
        }

        else if (query.toLowerCase().includes("top") || query.toLowerCase().includes("best")) {
          results = ["Product A", "Product B", "Product C", "Product D", "Product E"].map((product) => ({
            period: product,
            value: Math.random() * 5000,
          }));
        }

        else if (query.toLowerCase().includes("revenue") || query.toLowerCase().includes("sales")) {
          results = ["Q1", "Q2", "Q3", "Q4"].map((quarter) => ({
            period: quarter,
            value: Math.random() * 20000,
          }));
        }

        else if (query.toLowerCase().includes("region")) {
          results = ["North America", "Europe", "Asia", "South America", "Africa"].map((region) => ({
            period: region,
            value: Math.random() * 15000,
          }));
        }

        else if (query.toLowerCase().includes("customer retention") || query.toLowerCase().includes("churn rate")) {
          results = ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"].map((month) => ({
            period: month,
            value: Math.random() * 100,
          }));
        }

        else if (query.toLowerCase().includes("marketing channel") || query.toLowerCase().includes("conversion rate")) {
          results = [
            { period: "Organic Search", value: Math.random() * 1000 },
            { period: "Paid Ads", value: Math.random() * 1500 },
            { period: "Social Media", value: Math.random() * 1200 },
            { period: "Email Marketing", value: Math.random() * 800 },
          ];
        }

        else if (query.toLowerCase().includes("customer complaints") || query.toLowerCase().includes("support tickets")) {
          results = ["Billing Issues", "Product Defects", "Shipping Delays", "Account Issues", "Other"].map((issue) => ({
            period: issue,
            value: Math.random() * 200,
          }));
        }
        
        else {
          results = [
            { period: "Monday", value: Math.random() * 300 },
            { period: "Tuesday", value: Math.random() * 300 },
            { period: "Wednesday", value: Math.random() * 300 },
            { period: "Thursday", value: Math.random() * 300 },
            { period: "Friday", value: Math.random() * 300 },
            { period: "Saturday", value: Math.random() * 300 },
            { period: "Sunday", value: Math.random() * 300 },
          ];
        }
        
        dispatch(setResults(results));

        
      }
    }, 2000);
    setTimeout(() => {
        if (resultsRef?.current) {
          resultsRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
  };
  

  return (
    <div className="p-4 z-30">
      <div className="relative grid grid-rows-2 gap-3" >
        <input
          type="text"
          placeholder="Ask a business question..."
          className="input w-full h-[60px] bg-[#09090b] px-3 py-1 text-white rounded-l-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-[#09090b] transition-all duration-150 ease-in-out"
          value={query}
          onChange={handleInputChange}
        />
              <button 
              className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 w-[300px] h-[40px] rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              onClick={handleQuerySubmit}>
        Submit Query
      </button>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      {filteredSuggestions.length > 0 && (
  <ul className="absolute bg-white border border-gray-300 w-full mt-10 rounded-lg shadow-lg max-h-[200px] overflow-y-auto p-2 scrollbar-hide">
    {filteredSuggestions.map((s, index) => (
      <li
        key={index}
        className="p-3 rounded-lg hover:bg-violet-100 transition cursor-pointer text-gray-800"
        onClick={() => handleSuggestionClick(s)}
      >
        {s}
      </li>
    ))}
  </ul>
)}

        
      </div>

    </div>
  );
};

export default QueryInput;
