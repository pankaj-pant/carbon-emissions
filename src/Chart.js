import React from 'react';
import Plot from 'react-plotly.js';

const Chart = ({years, emissions, population}) => {

    return (
      <Plot
        data={[
          {
            x: years,
            y: population,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
            name: 'population'
          },
          {type: 'bar', x: years, y: emissions, yaxis: 'y2', name: 'emissions'},
        ]}
        layout={ {
            width: 1020, 
            height: 640, 
            title: 'Population & Emissions (1970-2014)',
            yaxis: {title: 'population',
            overlaying: 'y2',
            side: 'right'},
            yaxis2: {
              title: 'emissions in kiloTonnes',
              titlefont: {color: 'rgb(148, 103, 189)'},
              tickfont: {color: 'rgb(148, 103, 189)'}
            }
        } }
      />
    );

}

export default Chart