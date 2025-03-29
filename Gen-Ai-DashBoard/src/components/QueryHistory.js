import { useSelector } from "react-redux";
import { useState,useRef } from "react";
import { useDispatch } from "react-redux";
import {  sethistResults, setLoading, setError } from "../redux/querySlice";

const History = ({resultsRef}) => {
    const dispatch = useDispatch();
  const history = useSelector((state) => state.queries.history);
  const uniqueHistory = Array.from(new Set(history));
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index,q) => {
    setOpenIndex(openIndex === index ? null : index);
    handleQuerySubmit(q)
  };

  const handleQuerySubmit = (query) => {
    if (!query.trim()) return;
    dispatch(setLoading());


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

        dispatch(sethistResults(results));
      }
    }, 2000);
    setTimeout(() => {
        if (resultsRef?.current) {
          resultsRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
  };
  return (
    <div className="p-6 max-w-2xl">
      <h2 className="text-2xl font-bold text-center text-white mb-4">Query History</h2>

      {history.length === 0 ? (  // 🔹 Show this message if history is empty
        <p className="text-center text-gray-400">No history available. Start searching!</p>
      ) : (
        <div className="space-y-3">
          {uniqueHistory.map((q, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-3 shadow-md">
              <button
                className="w-full flex justify-between items-center text-lg font-semibold text-white py-2 px-3 focus:outline-none"
                onClick={() => toggleQuestion(index, q)}
              >
                {q}
                <span className="transition-transform transform" style={{ rotate: openIndex === index ? "25deg" : "0deg" }}>
                  ▼
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
