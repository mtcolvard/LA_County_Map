import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/mtcolvard/80dd33656f66a2d5fc1087e8d042537b/raw/00cbcfa1a179d2ab847c1ebe7fdc6af394e76312/LA_County_Cummulative_Covid.csv'

const row = d => {
  d.caseRate = +d['CaseRate'];
  return d;
};


export const useCovidData = () => {
  const [covidData, setCovidData] = useState(null);

  useEffect(() => {
    csv(csvUrl, row).then(setCovidData);
  }, []);

  return covidData;
  };

  
