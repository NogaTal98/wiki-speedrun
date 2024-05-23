import React from 'react';

function InputPage({handleUrlChange, handleDesiredWordChange, startRace}) {
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
            <label>Entar the strating page URL</label><br/>
            <input type="text" id="url" name="url" placeholder="https://en.wikipedia.org/wiki/..."onChange={handleUrlChange}></input>
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