import React from 'react'
import * as d3 from 'd3'
import { withTheme } from '@material-ui/core/styles';

class ResultLineChart extends React.Component {

	constructor(props){
		super(props);

		this.height = this.props.width*.7;
		this.width = this.props.width;

		let marginamt = this.props.width*.2
		this.margin = {top: marginamt, bottom: marginamt, left: marginamt/2, right: marginamt}

		let start = this.props.start.map((x) => parseInt(x));
		let end = this.props.end.map((x) => parseInt(x));
		let times = this.props.times.map((x) => parseInt(x));


		for(let i = start.length; i--; i >= 0){
			if(isNaN(start[i]) || isNaN(end[i])){
				start.splice(i, 1);
				end.splice(i, 1);
				times.splice(i, 1);
			}
		}

		this.start = start;
		this.end = end;
		this.times = times;

		//this pairs up intervals so that the start is always before
		this.end.sort((a,b) => this.start.indexOf(a) - this.start.indexOf(b));
		this.times.sort((a,b) => this.start.indexOf(a) - this.start.indexOf(b));
		this.start.sort((a,b) => a-b)

		this.sessiontime = parseInt(window.sessionStorage.getItem("timemarker"))

		this.xScale = d3.scaleLinear()
			.domain([0, this.sessiontime])
			.range([this.margin.left, this.width-this.margin.right]);


		const totalPredictTime = window.sessionStorage.getItem("tasktimes").split(',').map(x => +x).reduce((a,b)=>a+b, 0);
		
		// console.log(window.sessionStorage.getItem("timemarker"))
		// console.log(totalPredictTime)
		// c

		this.yScale = d3.scaleLinear()
			.domain([0, totalPredictTime])
			.range([this.height-this.margin.bottom, this.margin.top]);


		this.critpoints = []

		console.log(this.start)
		console.log(this.end)
		console.log(this.critpoints)

		for(let i=0; i < this.start.length; i++){
			if(!this.critpoints.includes(this.start[i])){
				this.critpoints.push(this.start[i]);
			}
		}

		for(let i=0; i < this.end.length; i++){
			if(!this.critpoints.includes(this.end[i])){
				this.critpoints.push(this.end[i]);
			}
		}

		console.log(this.start)
		console.log(this.end)
		console.log(this.critpoints)

		this.critpoints.sort((a,b) => a-b);

		console.log(this.critpoints)

		//now we have critpoints where the slope changes

		

		



		this.computeGraphPoints = this.computeGraphPoints.bind(this);
		this.calcGraphPointVal = this.calcGraphPointVal.bind(this);


		this.computeGraphPoints();


	}

	calcGraphPointVal(thresh){
		//goal is to find how much we've added to from our last critpoint
		let cume = 0
		for(let j = 0; j < this.start.length; j++){
			if(this.start[j] <= thresh){
				//calculate ratio of how much of the interval we finished and multiply by projected time, points value

				if(this.end[j] === this.start[j]){
					cume += this.times[j]
				}
				else{
					cume += (Math.min(thresh, this.end[j]) - this.start[j])/(this.end[j] - this.start[j]) * this.times[j];
				}
			}

		}
		return cume;

	}

	computeGraphPoints(){

		// this.y = []
		this.points = []

		for(let i = 0; i < this.critpoints.length; i++){
			// this.y.push(this.calcGraphPointVal(this.critpoints[i]));
			this.points.push([this.critpoints[i], this.calcGraphPointVal(this.critpoints[i])])
		}

		console.log(this.points)

		//should show flat line till end of session
		if(this.points.length > 0){
			this.points.push([this.sessiontime, this.points[this.points.length - 1][1]])
		}
		console.log(this.points)

		//start from beginning
		this.points.unshift([0,0])

		console.log(this.points)

		// this.x = this.critpoints;

	}

	componentDidMount(){

		this.svg = d3.select("#" + this.props.reactid)
			.attr("width", this.width)
			.attr("height", this.height)

		const xAxis = this.svg.append("g")
		    .attr("class", "x axis")
		    .attr("transform", "translate(0," + (this.height-this.margin.bottom)+ ")")
		    .call(d3.axisBottom(this.xScale).ticks(3));

		const yAxis = this.svg.append("g")
		    .attr("class", "y axis")
		    .attr("transform", "translate(" + this.margin.left + ",0)")
		    .call(d3.axisLeft(this.yScale).ticks(3));


		xAxis.select('path')
  			.style('stroke-width', '3px');

  		yAxis.select('path')
  			.style('stroke-width', '3px');



		const line = d3.line()
			.x(d => this.xScale(d[0]))
			.y(d => this.yScale(d[1]))




		this.svg.append("path")
			.attr("d", line(this.points))
			.attr("stroke", this.props.theme.palette.secondary.main)
			.attr("fill", "none")
			.attr("stroke-width", 3)


		//x axis label
		this.svg.append("text")
			.attr("x", this.width/2)
			.attr("y", this.height - this.margin.bottom)
			.attr("transform", "translate(-"+ this.width*.1+ "," + this.height*.1+ ")")
			.text("Actual time taken")
			.style("font-size", "1vw")


		let xloc = this.margin.left - this.width*.05;
		let yloc = this.height/2+this.margin.bottom/2;
		//y axis label
		this.svg.append("text")
			.attr("x", xloc)
			.attr("y", yloc)
			// .attr("transform", "translate(-"+ this.width*.1+ "," + this.height*.1+ ")")
			.attr("transform", "rotate(270,"+ xloc + "," + yloc + ")")
			.text("Predicted time taken")
			.style("font-size", "1vw")


	}

	render(){

		return (
			<svg id={this.props.reactid}>

			</svg>
		)
	}

}

export default withTheme(ResultLineChart);