import React from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { NUM_OF_ITERATIONS } from '../constants';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

let options = {
  plugins: {
    title: {
      display: true,
      text: 'Hover the dots in the graph with the mouse to see the words'
    },
    legend: {
      display: false
      }
  },
  scales: {
    x: {
      display: false
    }
  }
}

const renderSuccess = (chartData) => {
  let lastData = chartData.datasets[0].data[chartData.datasets[0].data.length-1];
  if (lastData !== undefined && lastData.toFixed(2) === (1).toFixed(2)) {
    return <div className='goodResult'>Found the desired word within {chartData.labels.length - 1} tries!</div>
  } else if (chartData.labels.length === NUM_OF_ITERATIONS + 1) {
    return <div className='badResult'> Couldn't find the desired word within {NUM_OF_ITERATIONS} tries</div>;
  }
  else {
    return null;
    }
}

function ShowRace({ chartData, runAgain }) {
    return (
      <div className="show-page">
        {chartData.labels.length === 0 ? <ClimbingBoxLoader
          color="#000000"
          true
          size={"5vh"}
          speedMultiplier={1}/> :
        <Line data={chartData} options={options} />}
        

        <div className='wordList'> 
          {chartData.labels.map((label, index) => 
          <span>
            <a href={"https://en.wikipedia.org/wiki/"+label} target="_blank" rel="noreferrer">{label} </a>
              {'('}{chartData.datasets[0].data[index].toFixed(2)}{') '}
            {index !== (chartData.labels.length - 1) && <FontAwesomeIcon icon={faArrowRight}/>} </span>)}
        </div>

        {renderSuccess(chartData)}

        <div onClick={runAgain} className='start-btn'>Run again</div>
      </div>
    );
  }

  export default ShowRace;