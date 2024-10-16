import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useRef } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Intro from "./Intro";
import ChNavbar from "./ChNavbar";
import ChapterSummary from "./ChapterSummary";
import VerseDetails from "./VerseDetails";
import ScrollToTop from "./ScrollToTop"; // Import the ScrollToTop component

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const contentRef = useRef(null);

  const handleHamburgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="App">
        <ScrollToTop /> {/* Ensure this is added here */}
        <div className="main">
          <div className={`navbar ${isMenuOpen ? "open" : "closed"}`}>
            <Switch>
              <Route exact path="/">
                <div className="options">
                  <div className="chSelection">Select Chapter</div>
                  <div
                    id="hamburger"
                    className="ham"
                    onClick={handleHamburgerClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 25 25"
                      width="35"
                      height="35"
                      color="white"
                      fill="white"
                    >
                      <path
                        d="M4 5L20 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 12L20 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 19L20 19"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <Navbar handleHamburgerClick={handleHamburgerClick} />
              </Route>
              <Route path="/chapters/:id">
                <div className="options">
                  <div className="options">Select Verse</div>
                  <div
                    id="hamburger"
                    className="ham"
                    onClick={handleHamburgerClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 25 25"
                      width="35"
                      height="35"
                      color="white"
                      fill="white"
                    >
                      <path
                        d="M4 5L20 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 12L20 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 19L20 19"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <Navbar handleHamburgerClick={handleHamburgerClick} />
                <ChNavbar handleHamburgerClick={handleHamburgerClick} />
              </Route>
            </Switch>
          </div>
          <div className="content" ref={contentRef}>
            <div className="introduction">
              <div
                id="hamburger"
                className="ham"
                onClick={handleHamburgerClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                  width="35"
                  height="35"
                  color="white"
                  fill="white"
                >
                  <path
                    d="M4 5L20 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 12L20 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 19L20 19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <Intro />
            </div>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/chapters/:id">
                <ChapterSummary />
              </Route>
              <Route path="/chapters/:ch/:vs">
                <VerseDetails contentRef={contentRef} />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
