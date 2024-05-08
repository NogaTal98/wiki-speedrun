import './App.css';
import { useEffect, useState } from 'react';
import InputPage from './components/InputPage';
import ShowRace from './components/ShowRace';

function App() {
  const [url, setUrl] = useState("");
  const [desiredWord, setDesiredWord] = useState("");
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [chartData, setChartData] = useState({
    labels: [], 
    datasets: [
      {
        label: "semantic rate",
        data: [],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

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

          // update chart data
          let newChartData = chartData;
          newChartData.labels = output.history;
          newChartData.datasets[0].data.push(output.max_rate);
          setChartData(newChartData);

          if (output.history[output.history.length-1].toLowerCase() == desiredWord.toLowerCase()) {
            runTimes = NUM_OF_ITERATIONS+1;
          }

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
       <ShowRace chartData={chartData}/> }

    </div>
  );
}

export default App;
