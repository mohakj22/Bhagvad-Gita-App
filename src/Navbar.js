import useFetch from "./useFetch";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { data, loading, error } = useFetch(
    "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/?skip=0&limit=18"
  );

  const history = useHistory();
  const location = useLocation();
  const [selectedChapter, setSelectedChapter] = useState("");

  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedChapter("");
    }
  }, [location.pathname]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleChange = (event) => {
    const chapterId = event.target.value;
    setSelectedChapter(chapterId);
    if (chapterId) {
      history.push(`/chapters/${chapterId}`);
    }
  };

  return (
    <div className="Navbar">
      <select
        className="chapter-select"
        onChange={handleChange}
        value={selectedChapter}
      >
        <option value="" disabled>
          Select a Chapter
        </option>
        {data &&
          data.map((chapter) => (
            <option value={chapter.id} key={chapter.id}>
              Chapter: {chapter.id}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Navbar;
