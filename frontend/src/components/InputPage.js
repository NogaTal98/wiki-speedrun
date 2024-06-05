import React from 'react';

function InputPage({handleStartingWordChange, handleDesiredWordChange, startRace}) {
    return (
      <div className="input-page">
        <div className='title'>
          Wiki Speed Run!
          <div className='description'>
              An AI agent that mimicks the famous wikipedia game
          </div>
        </div>
        <div className='form'>
          <div className='form-input'>
            <label>Entar your starting word</label><br/>
            <input type="text" id="starting_word" name="starting_word" onChange={handleStartingWordChange}></input>
          </div>
          <div className='form-input'>
            <label>Enter your desired word</label><br/>
            <input type="text" id="desired_word" name="desired_word" onChange={handleDesiredWordChange}></input>
          </div>
        </div>
        <div className='submit'>
          <div onClick={startRace} className='start-btn'>Start the race!</div>
        </div>
      </div>
    );
}

export default InputPage;