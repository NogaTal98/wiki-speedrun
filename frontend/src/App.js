import logo from './logo.svg';
import './App.css';

function App() {
    function buttonClick() {
      fetch("https://NogaTal.pythonanywhere.com/get_next_page", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "desired_word": "dog",
          "url": "https://en.wikipedia.org/wiki/Special:Random",
          "history": []
      })
      }).then(response => {
        if (response.status === 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error("Something went wrong. Status code: " + response.status);
        }
      }).then(data => {
        console.log(data);
      }).catch(error => {
        console.error(error);
      })
  }
  return (
    <div className="App">
      <button onClick={buttonClick}>Click me</button>
    </div>
  );
}

export default App;
