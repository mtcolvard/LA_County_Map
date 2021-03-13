import React, { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature } from 'topojson';

const LA_CommunitiesUrl = 'https://gist.githubusercontent.com/mtcolvard/8be528ebb5bfb5154675c338d946f330/raw/0bbb90b0a58d85e4e8a6713e5a888e623da0ba18/LA_County_Communities_minus_islands.json';

export const useBoundaries = () => {
  const [boundaries, setBoundaries] = useState(null);


  useEffect(() => {
    json(LA_CommunitiesUrl).then(topojsonData => {
      const { LA_County_Communities } = topojsonData.objects;
      setBoundaries({
        neighbourhood: feature(topojsonData, LA_County_Communities)
      });
    });
  }, []);

  return boundaries;
};
