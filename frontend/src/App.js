import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [url, setUrl] = useState("");
  const [desiredWord, setDesiredWord] = useState("");
  const [history, setHistory] = useState([]);
  const [max_rate, setMaxRate] = useState(0);
  const [next_word, setNextWord] = useState("");

  const NUM_OF_ITERATIONS = 20;

  function handleUrlChange(event) {
    setUrl(event.target.value);
  }

  function handleDesiredWordChange(event) {
    setDesiredWord(event.target.value);
  }

  const buttonClick = () => {
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
      <div>
        <label>URL:</label>
        <input type="text" id="url" name="url" onChange={handleUrlChange}></input>
        <label>Desired word:</label>
        <input type="text" id="desired_word" name="desired_word" onChange={handleDesiredWordChange}></input>
        <button onClick={buttonClick}>Click me</button>
      </div>
      <div>next_word: {next_word}</div>
      <div>max_rate: {max_rate}</div>
      <div>history: {history}</div>
      <div>url: {url}</div>
    </div>
  );
}

export default App;
