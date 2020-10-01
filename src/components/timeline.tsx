import { axisBottom, max, min, range, scaleBand, scaleTime, select } from 'd3';
import React, { RefObject, useEffect, useRef } from 'react';
import { normalizeData, NormalizedTrial, Trial } from '../utils/normalize-data';

type TimelineProps = {
  data: Trial[];
  height?: number;
  width?: number;
  children?: never;
  padding?: number;
};

export const Timeline: React.FC<TimelineProps> = ({
  data,
  padding,
  height,
  width,
  ...props
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    renderChart(svgRef, data, padding, height, width);
  }, [height, width, padding, data]);

  return <svg ref={svgRef} />;
};

function renderChart(
  svgRef: RefObject<SVGSVGElement>,
  data: Trial[],
  padding = 50,
  height = 350,
  width = 900,
) {
  const P = padding;
  const H = height;
  const W = width;
  const trials: NormalizedTrial[] = normalizeData(data);

  const minDate = min(trials, t => t.start) ?? Date.now();
  const maxDate = max(trials, t => t.end) ?? Date.now();

  const svg = select(svgRef.current).style('height', '100%').style('width', '100%');
  const nRows = (max(trials, t => t.yIndex) ?? 0) + 1;

  const xScale = scaleTime()
    .domain([minDate, maxDate])
    .range([P, W - P]);
  const yScale = scaleBand()
    .domain(range(0, nRows).map(i => i.toString()))
    .range([P, H - P])
    .paddingInner(0.0);

  const xAxis = axisBottom(xScale);

  svg.select('g.axis-x').remove();

  svg
    .append<SVGSVGElement>('g')
    .attr('class', 'axis-x')
    .style('transform', `translateY(${H - P + 15}px)`)
    .call(xAxis);

  const g = svg
    .selectAll('g.trial')
    .data(trials)
    .join('g')
    .attr('class', 'trial')
    .attr(
      'transform',
      t => `translate(${xScale(t.start)}, ${yScale(t.yIndex.toString())})`,
    );

  g.select('rect').remove();
  g.select('text').remove();

  g.append('rect')
    .attr('width', t =>
      t.start >= t.end ? 30 : (xScale(t.end) ?? 0) - (xScale(t.start) ?? 0),
    )
    .attr('height', t => {
      return yScale.bandwidth() * t.hIndex;
    })
    .attr('fill', '#3182ceAA')
    .attr('stroke', '#edf2f6')
    .attr('stroke-width', '.2rem')
    .attr('rx', 7)
    .attr('fill-opacity', 0.5);

  g.append('text')
    .attr('y', yScale.bandwidth() / 3)
    .attr('x', '1rem')
    .text(t => t.title)
    .style('font-size', 'max(1vw, .8rem)');
}
