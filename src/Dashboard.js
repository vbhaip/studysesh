import React from 'react'
import Button from '@material-ui/core/Button';
import DashboardTask from './DashboardTask.js'
import DashboardProgress from './DashboardProgress'
import DashboardClock from './DashboardClock'
import TextField from '@material-ui/core/TextField';

import { withTheme } from '@material-ui/core/styles';

import './Dashboard.css'

class Dashboard extends React.Component{



	constructor(props){

		super(props)

		let tasks = window.sessionStorage.getItem("tasks").split(',');
		let tasktimes = window.sessionStorage.getItem("tasktimes").split(',');

		for(let i = tasks.length; i--; i >= 0){
			if(tasks[i] === '' || tasktimes[i] === ''){
				tasks.splice(i, 1);
				tasktimes.splice(i, 1);
			}
		}

		window.sessionStorage.setItem("tasks", tasks)
		window.sessionStorage.setItem("tasktimes", tasktimes)


		const taskstatuses = new Array(tasktimes.length).fill(0);

		const starttask = new Array(tasktimes.length).fill(null);
		const endtask = new Array(tasktimes.length).fill(null)

		window.sessionStorage.setItem("taskstatuses", taskstatuses);

		window.sessionStorage.setItem("starttask", starttask);
		window.sessionStorage.setItem("endtask", endtask);


		console.log(tasks)

		
		this.state = {
			tasks: tasks,
			tasktimes: tasktimes,
			taskstatuses: taskstatuses,
			starttask: starttask,
			endtask: endtask,
			width: .8 * window.innerWidth
		}

		this.updateTaskStatuses = this.updateTaskStatuses.bind(this);


		// let outerthis = this;
		// window.addEventListener('resize', function(event){
		//  	outerthis.setState({width: .8*window.innerWidth})
		// });




	}


	updateTaskStatuses(newData, key){
		console.log(newData);
		this.setState((prevState) => 
		{

			let copy = prevState.taskstatuses;
			copy[key] = newData;
			console.log(copy);
			window.sessionStorage.setItem("taskstatuses", copy);

			return copy;
		});

		

		this.setState((prevState)=>
		{

			//update info on start and endtask based on taskstatus returned in newData
			let copy = prevState;

			//start_wip

			if(newData === 1 && this.state.starttask[key] == null){
				copy.starttask[key] = parseInt(window.sessionStorage.getItem("timemarker"));
				window.sessionStorage.setItem("starttask", copy.starttask)
			}

			if(newData === 2){
				copy.endtask[key] = parseInt(window.sessionStorage.getItem("timemarker"));
				window.sessionStorage.setItem("endtask", copy.endtask)
			}

			return copy
		
		})
	}


	render(){

		const items = this.state.tasks.map((item, key) => <DashboardTask tasklabel={item} 
			taskmin={this.state.tasktimes[key]} key={item + key} update={this.updateTaskStatuses} 
			identifier={key}/>)		
		

		console.log(this.props.theme)
		return (
			<div>
				<DashboardClock/>

				<div style={{height: "70vh",}}>
					<div style={{float: "left", "marginLeft": "2vw"}}>
						{items}
					</div>

					<div className="notes">
						<TextField style={{width: "40vw"}} label="Notes" multiline={true} variant="outlined" rows={20} rowsMax={20}/>
					</div>
				</div>
				

				<div id="dashboardbottom">
					<DashboardProgress width={this.state.width} taskstatuses={this.state.taskstatuses} id="dboardprog"/>
					<br/>
					<Button variant="contained" color="primary" href="#results">
						Done
					</Button>
				</div>
			</div>
		);
	}
}

export default withTheme(Dashboard);
