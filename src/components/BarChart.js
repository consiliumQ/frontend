import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { scaleBand } from 'd3';
import propTypes from 'prop-types';
import { select } from 'd3-selection';

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{ day: 1, tasks: 2 }, { day: 2, tasks: 5 }, { day: 3, tasks: 7 }, { day: 4, tasks: 3 }, { day: 5, tasks: 6 }],
        };
        this.createBarChart = this.createBarChart.bind(this);
    }
    componentDidMount() {
        window.addEventListener('resize', this.createBarChart);
        this.createBarChart();
    }
    componentDidUpdate() {
        this.createBarChart();
    }
    // eslint-disable-next-line react/no-deprecated
    componentWillMount() {
        window.removeEventListener('resize', this.createBarChart);
    }
    createBarChart() {
        const node = select(this.node);
        const bounds = node.node().getBoundingClientRect();
        const w = bounds.width;
        const h = bounds.height;
        const { data } = this.state;
        const xscale = scaleBand();
        xscale.domain(data.map(d => d.day));
        xscale.padding(0.1);
        xscale.range(0, w);
        const yscale = scaleLinear();
        yscale.domain([0, 10]);
        yscale.range(0, h);
        const upd = node.selectAll('rect').data(data);
        upd.enter()
            .append('rect')
            .merge(upd)
            .attr('x', d => xscale(d.day))
            .attr('y', d => h - yscale(d.tasks))
            .attr('width', xscale.bandwidth())
            .attr('height', d => yscale(d.tasks))
            .attr('fill', 'black');
    }
    render() {
        return <svg ref={node => (this.node = node)} width={'100%'} height={'100%'} />;
    }
}
BarChart.propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    data: propTypes.arrayOf(propTypes.object).isRequired,
};
export default BarChart;
