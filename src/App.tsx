import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
type Quote = {
  author: string;
  text: string;
};

const arr = [
  "bg-primary ",
  "bg-secondary ",
  "bg-success ",
  "bg-danger",
  "bg-warning",
  "bg-info",
  "bg-light",
  "bg-dark",
];

function App() {
  const [quotes, setQuotes] = useState<Quote>({ author: "", text: "" });
  const [colors, setColors] = useState<string>(arr[0]);

  const getQuote = () => {
    let randColor = Math.floor(Math.random() * arr.length);
    setColors(arr[randColor]);
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        let randomNum = Math.floor(Math.random() * data.length);
        setQuotes(data[randomNum]);
      });
  };

  useEffect(() => {
    getQuote();
  }, []);

  const tweetQuote = () => {
    let url = `https://twitter.com/intent/tweet?text=${quotes.text}`;
    window.open(url, "_blank");
  };

  return (
    <div
      id="quote-box"
      className={`container-fluid min-vh-100 p-5 bg-gradient vw-100 d-inline-block ${colors}`}
    >
      <div className={`h-50 mw-50 m-5 card p-1 text-center ${colors}`}>
        <h4 className="card-header">Random Quotes App</h4>
        <div className="card shadow">
          <div id="text" className="card-body">
            "{quotes.text}"{" "}
            <h6 id="author">Author: {quotes.author || "Unknown"}</h6>
            <div className="container">
              <button
                id="new-quote"
                onClick={getQuote}
                className={`m-1 btn ${colors}`}
              >
                Get Quote
              </button>

              <button
                id="tweet-quote"
                onClick={tweetQuote}
                className={`btn m-2 ${colors}`}
              >
                <FontAwesomeIcon icon={faTwitter} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
