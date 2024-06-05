import './App.css';
import { useEffect, useState } from 'react';
import InputPage from './components/InputPage';
import ShowRace from './components/ShowRace';
import logo from './wiki-speedrun-logo.png';

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
        .then(result => {
          if (result.error !== undefined) {
            console.log("error((((())))): ", result.error);
            runTimes = NUM_OF_ITERATIONS+1;
          }
          let history = result.result
          setHistory(history)
          let newWord = history[history.length-1]
          console.log(history);
          setUrl(newWord.url);

          // update chart data
          let newChartData = chartData;
          newChartData.labels = history.map((word) => word.word);
          if (history.length == 2) {
            newChartData.datasets[0].data.push(history[0].rate, newWord.rate);
          } else {
            newChartData.datasets[0].data.push(newWord.rate);
          }
          setChartData(newChartData);

          if (newWord.word.toLowerCase() == desiredWord.toLowerCase()) {
            runTimes = NUM_OF_ITERATIONS+1;
          }

          runTimes++;
          console.log("runTimes: ", runTimes);
          if (runTimes < NUM_OF_ITERATIONS) {
              runFetch({
                "desired_word": desiredWord,
                "url": newWord.url,
                "history": history
              }); 
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

  const runAgain = () => {
    setCurrentPage(0)
    document.location.reload(true)
  }

  return (
    <div className="App">
      <div className='page'>
        <img src={logo} className="logo"/>
        {currentPage === 0 ? <InputPage handleUrlChange={handleUrlChange} handleDesiredWordChange={handleDesiredWordChange} startRace={startRace}/> :
        <ShowRace chartData={chartData} runAgain={runAgain}/> }
      </div>
    </div>
  );
}

export default App;
