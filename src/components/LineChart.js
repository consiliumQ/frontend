/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { line, curveMonotoneX } from 'd3-shape';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';

import XYAxis from './XYAxis';
import Line from './Line';

class LineChart extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [{ day: 1, tasks: 2 }, { day: 2, tasks: 5 }, { day: 3, tasks: 7 }, { day: 4, tasks: 3 }, { day: 5, tasks: 6 }],
        };
    }
    render() {
        const { data } = this.state;
        const parentWidth = 500;

        const margins = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
        };

        const width = parentWidth - margins.left - margins.right;
        const height = 200 - margins.top - margins.bottom;

        const ticks = 5;
        const t = transition().duration(1000);

        const xScale = scaleBand()
            .domain(data.map(d => d.day))
            .rangeRound([0, width])
            .padding(0.1);

        const yScale = scaleLinear()
            .domain(extent(data, d => d.tasks))
            .range([height, 0])
            .nice();

        const lineGenerator = line()
            .x(d => xScale(d.day))
            .y(d => yScale(d.tasks))
            .curve(curveMonotoneX);
        return (
            <div>
                <svg className="lineChartSvg" width={width + margins.left + margins.right} height={height + margins.top + margins.bottom}>
                    <g transform={`translate(${margins.left}, ${margins.top})`}>
                        <XYAxis {...{ xScale, yScale, height, ticks, t }} />
                        <Line data={data} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator} width={width} height={height} />
                    </g>
                </svg>
            </div>
        );
    }
}
export default LineChart;
