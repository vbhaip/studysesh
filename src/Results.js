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
		let startedtasks = [];


		const sessiontime = parseInt(window.sessionStorage.getItem("timemarker"));

		this.sessiontime = sessiontime;

		for(let i = 0; i < tasktimes.length; i++){
			if(!isNaN(starttask[i]) && starttask[i] !== ''){

				if(isNaN(endtask[i]) || endtask[i] === ''){
					realtasktimes.push(sessiontime - parseInt(starttask[i]))
				}
				else{
					realtasktimes.push(parseInt(endtask[i]) - parseInt(starttask[i]))
				}

				startedtasks.push(tasks[i])

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
			width: window.innerWidth,
			startedtasks: startedtasks
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


				<ResultPieChart style={{'marginLeft': this.state.width*1}} title="Ideal" box={this.state.width*.15} data={this.state.tasktimes} labels={this.state.tasks} reactid="projected-pie"/>
				<ResultPieChart title="Actual" box={this.state.width*.15} data={this.state.realtasktimes} labels={this.state.startedtasks} reactid="real-pie"/>
				<div id="resultprogresscontainer">
					<DashboardProgress width={this.state.width*.4} taskstatuses={taskstatuses}/>
				</div>
			</div>
		)
	}
}

export default withTheme(Results);