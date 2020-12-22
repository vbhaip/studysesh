import React from 'react'
import * as d3 from 'd3'

import { withTheme } from '@material-ui/core/styles';

class ResultPiChart extends React.Component {

	constructor(props){
		super(props);
	}

	componentDidMount(){
		console.log(this.props.data);
		const arcs = d3.pie()(this.props.data);
		console.log(arcs);


		const width = 300;
		const height = 300;

		this.box = this.props.box;

		const svg = d3.select("#" + this.props.reactid);

			svg
			.attr("width", this.props.box)
			.attr("height", this.props.box)
			.append("g")
			.attr("transform", 'translate(' + this.props.box/2  + ', ' + this.props.box/2 + ')')

			.attr("stroke", "white")
			.selectAll("path")
			.data(arcs)
			.join("path")
				.attr("fill", (d) => d3.schemeCategory10[d.index])
				.attr("d", d3.arc()
				    .innerRadius(this.box/8)
				    .outerRadius(this.box/4))

			.on("mouseover", (e, d) => {
				svg.select(".label").remove();
	          	console.log(d);
	          	console.log(this.props.labels)
	          	svg.append("text")
	            .attr("y", this.box/10)
	            .attr("x", this.box/2)
	            // .attr("dominant-baseline", "central") 


	            // .attr("x", width/2)
	            .style("text-anchor", "middle")
	            .style("font-size", this.box/20)
	            .attr("class","label")
	            .style("fill", "black")
	            .text(this.props.labels[d.index] + " " + Math.round(100*(d.endAngle - d.startAngle)/6.28) + "%");
	          
		     })
		     .on("mouseout", function(d) {
		     	svg.select(".label").remove();
		     })

		     svg.append("text")
		     	.attr("x", this.box/2)
		     	.attr("y", this.box/5)
		     	.text(this.props.title)
		     	.style("fill", this.props.theme.palette.primary.dark)
		     	.style("font-size", this.box/10)
		     	.style("text-anchor", "middle")
		    
			
	}


	render(){
		return (
		<svg id={this.props.reactid}>
		</svg>
		);
	}

}
export default withTheme(ResultPiChart);