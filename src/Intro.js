import { Link } from "react-router-dom";
const Intro = () => {
  return (
    <div className="pageIntro">
      <h1>Bhagvad Gita</h1>
      <div className="links">
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default Intro;
