import './App.css';
import { useEffect, useState } from 'react';
import InputPage from './components/InputPage';
import ShowRace from './components/ShowRace';

function App() {
  const [url, setUrl] = useState("");
  const [desiredWord, setDesiredWord] = useState("");
  const [history, setHistory] = useState([]);
  const [max_rate, setMaxRate] = useState(0);
  const [next_word, setNextWord] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const NUM_OF_ITERATIONS = 20;

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  }

  const handleDesiredWordChange = (event) => {
    setDesiredWord(event.target.value);
  }


  const startRace = () => {
    if (url === "" || desiredWord === "") {
      alert("url or desired word is empty");
      return;
    }

    if (url.startsWith("https://en.wikipedia.org/wiki/") === false) {
      alert("url is not from wikipedia");
      return;
    }

    setCurrentPage(1);

    let runTimes = 0;
    const runFetch = (data) => {
      fetch("https://NogaTal.pythonanywhere.com/get_next_page", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "desired_word": desiredWord,
          "url": data.url,
          "history": data.history
        })
      })
        .then(response => response.json())
        .then(output => {
          if (output.error !== undefined) {
            console.log("error: ", output.error);
            runTimes = NUM_OF_ITERATIONS+1;
          }
          setUrl(output.url)
          setHistory(output.history)
          setMaxRate(output.max_rate)
          setNextWord(output.max_rated_word)
            runTimes++;
            console.log("runTimes: ", runTimes);
            if (runTimes < NUM_OF_ITERATIONS) {
                runFetch(output); 
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    runFetch({
      "desired_word": desiredWord,
      "url": url,
      "history": history});
  }

  return (
    <div className="App">
      {currentPage === 0 ? <InputPage handleUrlChange={handleUrlChange} handleDesiredWordChange={handleDesiredWordChange} startRace={startRace}/> :
       <ShowRace next_word={next_word} max_rate={max_rate} history={history} url={url}/> }

    </div>
  );
}

export default App;
