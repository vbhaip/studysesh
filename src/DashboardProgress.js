import React from 'react'
import * as d3 from 'd3'

class DashboardProgress extends React.Component {

	constructor(props){
		super(props);
		this.update = this.update.bind(this);

		//3 things to keep track:
		//ns - not started
		//wip - work in progress
		//d - done

		console.log(this.props)

		this.state = {
			nswidth: this.props.width,
			wipwidth: 0,
			dwidth: 0
		}
		console.log(this.state)

		this.countOccurrence = this.countOccurrence.bind(this);

		this.updateWidthsBasedOffTaskStatuses = this.updateWidthsBasedOffTaskStatuses.bind(this);
	}

	// updateWidths()

	componentDidUpdate(){
		this.update()
	}

	countOccurrence(array, val){
		return array.filter((v) => (v===val)).length;
	}


	updateWidthsBasedOffTaskStatuses(){
		let length = this.props.taskstatuses.length;

		let newNSWidth = this.countOccurrence(this.props.taskstatuses, 0) / length * this.props.width;
		let newWIPWidth = this.countOccurrence(this.props.taskstatuses, 1) / length * this.props.width;
		let newDWidth = this.countOccurrence(this.props.taskstatuses, 2) / length * this.props.width;



		return [newNSWidth, newWIPWidth, newDWidth];


	}


	update(){


		let [newNSWidth, newWIPWidth, newDWidth] = this.updateWidthsBasedOffTaskStatuses();

		console.log(newNSWidth);
		console.log(newWIPWidth);
		console.log(newDWidth);

		d3.select("#done")
			.transition(1000)
			.attr("width", newDWidth)


		d3.select("#wip")
			.transition(1000)
			.attr("width", newWIPWidth)
			.attr("x", newDWidth)

		d3.select("#notstarted")
			.transition(1000)
			.attr("width", newNSWidth)
			.attr("x", newDWidth + newWIPWidth)


	}

	componentDidMount(){
		// this.update();
		console.log(window.sessionStorage.getItem("taskstatuses"));
		
		console.log(this.state.nswidth);

		d3.select("#dboard-progress")
			.append("rect")
			.attr("id", "done")
			.attr("width", this.state.dwidth)
			.attr("height", "5vw")
			.style("fill", "green")
			.attr("x", 0)

		d3.select("#dboard-progress")
			.append("rect")
			.attr("id", "wip")
			.attr("width", this.state.wipwidth)
			.attr("height", "5vw")
			.style("fill", "yellow")
			.attr("x", this.state.dwidth)
		
		d3.select("#dboard-progress")
			.append("rect")
			.attr("id", "notstarted")
			.attr("width", this.state.nswidth)
			.attr("height", "5vw")
			.style("fill", "red")
			.attr("x", this.state.dwidth+this.state.wipwidth)
		


	}


	render(){
		return (
		<svg id="dboard-progress">

		</svg>
		);

	}

}

export default DashboardProgress;