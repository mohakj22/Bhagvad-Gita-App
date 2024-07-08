import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("Loading.......")

  useEffect(() => {
    async function fetchVerses(retryCount = 3) {
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "252b57ee6emshe735d4c8423be35p1bec71jsnc101002893eb",
          "x-rapidapi-host": "bhagavad-gita3.p.rapidapi.com",
        },
      };

      for (let attempt = 1; attempt <= retryCount; attempt++) {
        try {
          const response = await fetch(url, options);
          if (response.ok) {
            const data = await response.json();
            // console.log(data);
            setData(data);
            setLoading(false);
            return data;
          } else if (response.status === 429 && attempt < retryCount) {
            // Wait before retrying (exponential backoff)
            const waitTime = Math.pow(2, attempt) * 1000; // 2^attempt seconds
            console.log(
              `Rate limit exceeded. Retrying in ${waitTime / 1000} seconds...`
            );
            await new Promise((resolve) => setTimeout(resolve, waitTime));
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          setMessage("We could'nt load the data. Sorry for the inconvinience.")
          if (attempt === retryCount) {
            // console.error("Error:", error);
            setError(error);
            setLoading(false);
            throw error;
          }
        }
      }
    }
    fetchVerses();
  }, [url]);

  return { data, loading, error, message };
};

export default useFetch;
