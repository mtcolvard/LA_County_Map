import {
  geoEquirectangular,
  geoPath,
} from 'd3';
import { json } from 'd3';
import { feature, mesh } from 'topojson';

const LA_CountyUrl =
  'https://gist.githubusercontent.com/mtcolvard/2ab4f30b99c7366c75dd58f29d167573/raw/a73f42681778b23e999a7995f101ab9da91f100f/LA_County_Boundary.json';
const missingDataColor = 'gray'

export const Markss = ({
  boundaries: { neighbourhood },
  rowByCity,
  width,
  height,
  colorScale,
  colorValue }) => {

  const projection = geoEquirectangular()
    .center([-118, 33.33])
    .fitSize([width, height], neighbourhood);
  const path = geoPath(projection);

  return (
    <g className="marks">
      {neighbourhood.features.map((feature) => {
        const d = rowByCity.get(feature.properties.LABEL);
        return <path fill={d ? colorScale(colorValue(d)) : missingDataColor} d={path(feature)} />
      })}
    </g>
  );
};
