import React from "react";
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

function ShowRace({ chartData, runAgain }) {
    return (
      <div className="show-page">
        <Line data={chartData} options={options} />

        <div className='wordList'> 
          {chartData.labels.map((label, index) => 
          <span>
            <a href={"https://en.wikipedia.org/wiki/"+label} target="_blank">{label} </a>
              {'('}{chartData.datasets[0].data[index].toFixed(2)}{') '}
            {index !== (chartData.labels.length - 1) && <FontAwesomeIcon icon={faArrowRight}/>} </span>)}
        </div>

        <div onClick={runAgain} className='start-btn'>Run again</div>
      </div>
    );
  }

  export default ShowRace;