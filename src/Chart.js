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
          },
          {type: 'bar', x: years, y: emissions, yaxis: 'y2'},
        ]}
        layout={ {
            width: 1020, 
            height: 640, 
            title: 'Population & Emissions (1970-2014)',
            yaxis: {title: 'population'},
            yaxis2: {
              title: 'emissions in kiloTonnes',
              titlefont: {color: 'rgb(148, 103, 189)'},
              tickfont: {color: 'rgb(148, 103, 189)'},
              overlaying: 'y',
              side: 'right'
            }
        } }
      />
    );

}

export default Chart