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

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function ShowRace({ chartData, runAgain }) {
    return (
      <div className="show-page">
        <Line data={chartData} />
        <div onClick={runAgain} className='start-btn'>Run again</div>
      </div>
    );
  }

  export default ShowRace;