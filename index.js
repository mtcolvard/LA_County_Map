import React, {useState} from 'react';
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
  const [hoveredValue, setHoveredValue] = useState({null:null})
  console.log(hoveredValue.MODIFIED_ZCTA)


 // const handleSetHoveredValue = useCallback(event => {
 	//const { d } = event;
	//setHoveredValue({ d });
	//}, [setHoveredValue]);

  if (!boundaries || !covidData) {
    return <pre>Loading...</pre>;
  }

  const rowByCity = new Map();
  covidData.forEach(d => {
    rowByCity.set(d.MODIFIED_ZCTA, d);
  });

  const colorValue = d => +d.PERCENT_POSITIVE;

 	const colorScale =
 	scaleThreshold()
 	.domain([4,6,8,10,12,14,16,18,20])
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
        onHover={setHoveredValue}
        />
    </svg>
  );
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
