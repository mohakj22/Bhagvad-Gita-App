import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";

const VerseDetails = () => {
  const [hindiPurport, setHindiPurport] = useState("");
  const [englishPurport, setEnglishPurport] = useState("");
  const { ch, vs } = useParams();
  const verseFromParams = parseInt(vs, 10);
  const history = useHistory();
  const [totalVerses, setTotalVerses] = useState(0);

  const { data, loading, error } = useFetch(
    `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${ch}/verses/`
  );

  // Fetch data for the current verse
  const verseData = useFetch(
    `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${ch}/verses/${verseFromParams}/`
  );

  // console.log("Chapter:", ch, "Verse:", verseFromParams);
  useEffect(() => {
    if (data) {
      setTotalVerses(data.length);
    }
  }, [data]);

  // Fetching data for the current verse
  useEffect(() => {
    if (verseData.data && verseData.data.commentaries) {
      // console.log("Data fetched successfully:", verseData.data);
      const swamiRamsukhdasCommentary = verseData.data.commentaries.find(
        (commentary) => commentary.author_name === "Swami Ramsukhdas"
      );

      const swamiSivanandaCommentary = verseData.data.commentaries.find(
        (commentary) => commentary.author_name === "Swami Sivananda"
      );

      setHindiPurport(
        swamiRamsukhdasCommentary
          ? swamiRamsukhdasCommentary.description
          : "No comments"
      );

      setEnglishPurport(
        swamiSivanandaCommentary
          ? swamiSivanandaCommentary.description
          : "No comments"
      );
    }
  }, [verseData.data]);

  const handlePrevious = () => {
    const newVerse = verseFromParams - 1;
    if (newVerse > 0) {
      console.log("Navigating to previous verse:", newVerse);
      history.push(`/chapters/${ch}/${newVerse}`);
    }
  };

  const handleNext = () => {
    const newVerse = verseFromParams + 1;
    console.log("Navigating to next verse:", newVerse);
    history.push(`/chapters/${ch}/${newVerse}`);
  };

  if (verseData.loading) return <div>Loading...</div>;
  if (verseData.error) return <div>Error: {verseData.error.message}</div>;

  return (
    <div className="verse_details">
      <div className="shlok">{verseData.data.text}</div>
      <div className="translations">
        <div className="traslationEnglish">
          {verseData.data.translations[1]?.description ||
            "Translation not available"}
        </div>
        <div className="traslationHindi">
          {verseData.data.translations[5]?.description ||
            "अनुवाद उपलब्ध नहीं है"}
        </div>
      </div>
      <div className="purport">
        <div className="purportHindi">{hindiPurport}</div>
        <div className="purportEnglish">{englishPurport}</div>
        <div className="nav-buttons">
          <button
            onClick={handlePrevious}
            disabled={verseFromParams <= 1}
            className="nb"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={verseFromParams >= totalVerses}
            className="nb"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerseDetails;
