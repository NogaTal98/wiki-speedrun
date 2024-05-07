import React from "react";

function ShowRace({ next_word, max_rate, history, url }) {
    return (
      <div className="shoRace">
        <div>next_word: {next_word}</div>
        <div>max_rate: {max_rate}</div>
        <div>history: {history}</div>
        <div>url: {url}</div>
      </div>
    );
  }

  export default ShowRace;