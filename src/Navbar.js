import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";

const Navbar = ({ handleHamburgerClick }) => {
  const { data, loading, error } = useFetch(
    "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/?skip=0&limit=18"
  );

  const history = useHistory();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleChange = (event) => {
    const chapterId = event.target.value;
    if (chapterId) {
      history.push(`/chapters/${chapterId}`);
      handleHamburgerClick();
    }
  };

  return (
    <div className="Navbar">
      <select
        className="chapter-select"
        onChange={handleChange}
        defaultValue=""
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
