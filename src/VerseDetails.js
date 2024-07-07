import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";

const VerseDetails = () => {
  const [hindiPurport, setHindiPurport] = useState("");
  const [englishPurport, setEnglishPurport] = useState("");
  const { ch, vs } = useParams();
  const { data, loading, error } = useFetch(
    `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${ch}/verses/${vs}/`
  );

  useEffect(() => {
    if (!loading && !error && data.commentaries) {
      const swamiRamsukhdasCommentary = data.commentaries.find(
        (commentary) => commentary.author_name === "Swami Ramsukhdas"
      );

      const swamiSivanandaCommentary = data.commentaries.find(
        (commentary) => commentary.author_name === "Swami Sivananda"
      );

      if (swamiRamsukhdasCommentary) {
        setHindiPurport(swamiRamsukhdasCommentary.description);
      } else {
        setHindiPurport("No comments");
      }

      if (swamiSivanandaCommentary) {
        setEnglishPurport(swamiSivanandaCommentary.description);
      } else {
        setEnglishPurport("No comments");
      }
    }
  }, [loading, error, data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="verse_details">
      <div className="shlok">{data.text}</div>
      <div className="translations">
        <div className="traslationEnglish">
          {data.translations[1].description}
        </div>
        <div className="traslationHindi">
          {data.translations[5].description}
        </div>
      </div>
      <div className="purport">
        <div className="purportHindi">{hindiPurport}</div>
        <div className="purportEnglish">{englishPurport}</div>
      </div>
    </div>
  );
};

export default VerseDetails;
