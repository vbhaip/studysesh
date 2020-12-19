import React from 'react'
import Button from '@material-ui/core/Button';
import DashboardTask from './DashboardTask.js'
import TaskContainer from './TaskContainer'
import DashboardProgress from './DashboardProgress'

class Dashboard extends React.Component{

	constructor(props){

		super(props)

		const tasks = window.sessionStorage.getItem("tasks").split(',');
		const tasktimes = window.sessionStorage.getItem("tasktimes").split(',');
		const taskstatuses = new Array(tasktimes.length).fill(0);
		window.sessionStorage.setItem("taskstatuses", taskstatuses);

		console.log(tasks)

		
		this.state = {
			tasks: tasks,
			tasktimes: tasktimes,
			taskstatuses: taskstatuses
		}

		this.updateTaskStatuses = this.updateTaskStatuses.bind(this);


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
		}

		)
	}


	render(){

		const items = this.state.tasks.map((item, key) => <DashboardTask tasklabel={item} 
			taskmin={this.state.tasktimes[key]} key={item + key} update={this.updateTaskStatuses} 
			identifier={key}/>)		

		
		return (
			<div>
				{items}
				<DashboardProgress width={200} taskstatuses={this.state.taskstatuses}/>
				<Button variant="contained" color="primary" href="dashboard">
					Done
				</Button>
			</div>
		);
	}
}

export default Dashboard;
