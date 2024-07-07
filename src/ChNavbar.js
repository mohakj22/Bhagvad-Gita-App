import useFetch from "./useFetch";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ChNavbar = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${id}/verses/`
  );

  // Log data to check content
  console.log("called in chnavbar",data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="Navbar">
      {data &&
        data.map((verse) => (
          <Link to={`/chapters/${id}/${verse.verse_number}`} key={verse.id}>
            <div className="chapter">Shlok: {verse.verse_number}</div>
          </Link>
        ))}
      <div className="footer"></div>
    </div>
  );
};

export default ChNavbar;
