import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import propTypes from 'prop-types';
import { select } from 'd3-selection';
import * as d3 from 'd3';

class BarChart extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        const { width: w, height: h, data } = this.props;

        const svg = d3
            .select('body')
            .append('svg')
            .attr('width', this.props.width)
            .attr('height', this.props.height)
            .style('margin-left', 100);

        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', (d, i) => i * 70)
            .attr('y', (d, i) => h - 10 * d)
            .attr('width', 65)
            .attr('height', (d, i) => d * 10)
            .attr('fill', 'black');
        svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .text(d => d)
            .attr('x', (d, i) => i * 70)
            .attr('y', (d, i) => h - 10 * d - 3);
    }

    render() {
        return <div id={`#${this.props.id}`} />;
    }
}
BarChart.propTypes = {
    data: propTypes.arrayOf(propTypes.number).isRequired,
    width: propTypes.number.isRequired,
    height: propTypes.number.isRequired,
};
export default BarChart;
