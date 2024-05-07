import React from 'react';

function InputPage({handleUrlChange, handleDesiredWordChange, startRace}) {
    return (
      <div className="inputPage">
        <label>URL:</label>
        <input type="text" id="url" name="url" onChange={handleUrlChange}></input>
        <label>Desired word:</label>
        <input type="text" id="desired_word" name="desired_word" onChange={handleDesiredWordChange}></input>
        <button onClick={startRace}>Click me</button>
      </div>
    );
}

export default InputPage;