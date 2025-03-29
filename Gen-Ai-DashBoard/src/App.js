import { useRef } from "react";
import QueryInput from "./components/QueryInput";
import QueryHistory from "./components/QueryHistory";
import ResultsDisplay from "./components/ResultsDisplay";
import NavBar from "./components/NavBar";

const App = () => {
  const resultsRef = useRef(null);

  return (
    <div>
      <div className="grid grid-row-4 min-h-[750px] bg-gradient-to-br from-gray-900 to-purple-900">
        <NavBar/>
        <div className="sticky top-[100px] z-40 bg-gradient-to-br from-gray-900 to-purple-900">
        <QueryInput resultsRef={resultsRef}  />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="relative w-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg text-white">
            <QueryHistory resultsRef={resultsRef} />
          </div>
          <div 
            ref={resultsRef} 
            className="relative w-full max-h-[500px] bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg text-white"
          >
            <ResultsDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
