import React from 'react';
import ReactDOM from 'react-dom';
import { useBoundaries } from './useBoundaries';
import { useCovidData } from './useCovidData';
import { Markss } from './Markss';
import { interpolateBlues, schemeBlues, scaleThreshold, scalePow, scaleQuantize, scaleSequential, scaleSequentialLog, scaleSequentialQuantile, scaleLinear, scaleLog, max, extent } from 'd3';


const width = 960;
const height = 500;

const App = () => {
  const boundaries = useBoundaries();
  const covidData = useCovidData();

  if (!boundaries || !covidData) {
    return <pre>Loading...</pre>;
  }

  const rowByCity = new Map();
  covidData.forEach(d => {
    rowByCity.set(d.Neighbourhood, d);
  });
  console.log(rowByCity)

  const colorValue = d => +d.DeathRate

  const colorScale =
    scaleThreshold()
    	.domain([100,150,200,250,300,350,400,450,500])
    	.range(schemeBlues[9]);

  return (
    <svg width={width} height={height}>
      <Markss
        boundaries={boundaries}
        rowByCity={rowByCity}
        width={width}
        height={height}
        colorScale={colorScale}
        colorValue={colorValue}
        />
    </svg>
  );
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
