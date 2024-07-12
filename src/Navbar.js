import useFetch from "./useFetch";
import { Link } from "react-router-dom";
const Navbar = ({handleHamburgerClick}) => {
  const { data, loading, error } = useFetch(
    "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/?skip=0&limit=18"
  );
  // console.log("called in navbar", data);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="Navbar">
      {data &&
        data.map((chapter) => (
          <Link
            to={`/chapters/${chapter.id}`}
            key={chapter.id}
            onClick={handleHamburgerClick}
          >
            <div className="chapter" key={chapter.id}>
              Chapter: {chapter.id}
            </div>
          </Link>
        ))}
      <div className="footer"></div>
    </div>
  );
};

export default Navbar;
