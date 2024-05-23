import React from 'react';

function InputPage({handleUrlChange, handleDesiredWordChange, startRace}) {
    return (
      <div className="page">
        <div className='title'>
          welcome to wiki speedRun!
        </div>
        <div className='form'>
          <div className='form-input'>
            <label>Strating page URL</label><br/>
            <input type="text" id="url" name="url" onChange={handleUrlChange}></input>
          </div>
          <div className='form-input'>
            <label>Desired word</label><br/>
            <input type="text" id="desired_word" name="desired_word" onChange={handleDesiredWordChange}></input>
          </div>
        </div>
        <div className='submit'>
          <button onClick={startRace}>Click me</button>
        </div>
      </div>
    );
}

export default InputPage;