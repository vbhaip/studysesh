import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';


class DashboardTask extends React.Component{

	constructor(props){
		super()


		//status = 0 - off
		//status = 1 - wip
		//status = 2 - on
		this.state = {
			status: 0,
			checked: false,
			color: 'primary'
		}

		this.changeState = this.changeState.bind(this);
	}


	changeState(){

		let newStatus = (this.state.status + 1) % 3 
		this.setState({
			status: newStatus
		});

		if(newStatus == 0){
			this.setState({
				checked: false,
				color: 'primary'
			});
		}

		else if(newStatus == 1){
			this.setState({
				checked: true,
				color: 'primary'
			});
		}

		else if(newStatus == 2){
			this.setState({
				checked: true,
				color: 'secondary'
			});
		}

		this.props.update(newStatus, this.props.identifier);

	}



	render(){
		return (
			<div className="dashboardtask">
				<Checkbox value="checkbox" inputProps={{ 'aria-label': 'Checkbox A' }} color={this.state.color} checked={this.state.checked} onChange={this.changeState}/>
				<span>{this.props.tasklabel} ({this.props.taskmin} min)</span>
			</div>
		);
	}
}

export default DashboardTask;
