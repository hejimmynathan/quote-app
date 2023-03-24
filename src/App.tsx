import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.min.css";
const arr = [
  "bg-primary container-fluid flex min-vh-100 p-5 bg-gradient h-100 d-inline-block",
  "bg-secondary container-fluid flex min-vh-100 p-5 bg-gradient h-100 d-inline-block",
  "bg-success container-fluid flex min-vh-100 p-5 bg-gradient h-100 d-inline-block",
  "bg-danger container-fluid flex min-vh-100 p-5 bg-gradient h-100 d-inline-block",
  "bg-warning container-fluid flex min-vh-100 p-5 bg-gradient h-100 d-inline-block",
  "bg-info container-fluid flex min-vh-100 p-5 bg-gradient h-100 d-inline-block",
  "bg-light container-fluid flex min-vh-100 p-5 bg-gradient h-100 d-inline-block",
  "bg-dark container-fluid flex min-vh-100 p-5 bg-gradient h-100 d-inline-block",
];

function App() {
  const [quotes, setQuotes] = useState<string>("");
  const [colors, setColors] = useState(arr[0]);
  const textRef = useRef();
  const getQuote = () => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        let randomNum = Math.floor(Math.random() * data.length);
        let randColor = Math.floor(Math.random() * arr.length);
        setQuotes(data[randomNum]);
        setColors(arr[randColor]);
      });
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div id="quote-box" className={colors}>
      <div className=" card text-center bg-secondary ">
        <h4 className="card-header">Random Quotes App</h4>
        <div className="card shadow ">
          <div id="text" className="card-body">
            {quotes.text}
            <h6 id="author">Author: {quotes.author}</h6>

            <div className="container">
              <button
                id="new-quote"
                onClick={getQuote}
                className="m-1 btn btn-primary"
              >
                Get Quote
              </button>
              <a
                id="tweet-quote"
                href={`https://twitter.com/intent/tweet?text=${quotes.text}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary m-1"
              >
                Tweet
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
