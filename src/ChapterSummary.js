import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
const ChapterSummary = () => {
    const { id } = useParams();
    const { data, loading, error } = useFetch(
      "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/?skip=0&limit=18"
    );

    // Log data to check content
    //   console.log("data",data);
    // console.log("called in chapter summary : ", data, id);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
      <div className="chapterSummary">
        <div className="chapterName">
          {data[id - 1].name} / {data[id - 1].name_translated}
        </div>
        {/* <div className="translatedName">{data[id - 1].name_translated}</div> */}
        <div className="chapter_summary">{data[id - 1].chapter_summary}</div>
        </div>
    );
}
 
export default ChapterSummary;