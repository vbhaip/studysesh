import React from 'react'
import DashboardProgress from './DashboardProgress'
import ResultLineChart from './ResultLineChart'
import ResultPieChart from './ResultPieChart'

import './Results.css'
import { withTheme } from '@material-ui/core/styles';


class Results extends React.Component {

	constructor(props){
		super(props);

		const tasks = window.sessionStorage.getItem("tasks").split(',');
		const tasktimes = window.sessionStorage.getItem("tasktimes").split(',').map(x => +x);
		const starttask = window.sessionStorage.getItem("starttask").split(',');
		const endtask = window.sessionStorage.getItem("endtask").split(',');

		let realtasktimes = [];


		const sessiontime = parseInt(window.sessionStorage.getItem("timemarker"));

		this.sessiontime = sessiontime;

		for(let i = 0; i < tasktimes.length; i++){
			if(starttask[i] !== 'null'){

				if(endtask[i] === 'null'){
					realtasktimes.push(sessiontime - parseInt(tasktimes[i]))
				}
				else{
					realtasktimes.push(parseInt(endtask[i]) - parseInt(starttask[i]))
				}

			}
		}

		console.log(starttask)
		console.log(endtask)
		console.log(sessiontime)
		console.log(realtasktimes)

		this.state = {
			tasks: tasks,
			tasktimes: tasktimes,
			starttask: starttask,
			endtask: endtask,
			realtasktimes: realtasktimes,
			width: window.innerWidth
		}



	}


	render(){

		let taskstatuses = window.sessionStorage.getItem("taskstatuses").split(",").map(x => +x)
		console.log(taskstatuses);
		return (

			<div>

				<div id="result-top">
					<div id="resultlinechartcontainer">
						<ResultLineChart width={this.state.width*.5} start={this.state.starttask} end={this.state.endtask} times={this.state.tasktimes} reactid="resultlinechart"/>
					</div>
					<span id="resulttotaltimecontainer" style={{color: this.props.theme.palette.primary.main}}>
						Total Time: {Math.floor(this.sessiontime/60)}.{Math.floor(this.sessiontime%60/6)}hrs
					</span>

				</div>


				<ResultPieChart title="Ideal" box={this.state.width*.2} data={this.state.tasktimes} labels={this.state.tasks} reactid="projected-pie"/>
				<ResultPieChart title="Actual" box={this.state.width*.2} data={this.state.realtasktimes} labels={this.state.tasks} reactid="real-pie"/>
				<DashboardProgress width={this.state.width*.8} taskstatuses={taskstatuses}/>
			</div>
		)
	}
}

export default withTheme(Results);