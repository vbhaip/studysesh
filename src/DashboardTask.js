import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import { withTheme } from '@material-ui/core/styles';


class DashboardTask extends React.Component{

	constructor(props){
		super()


		//status = 0 - off
		//status = 1 - wip
		//status = 2 - on
		this.state = {
			status: 0,
			checked: false,
			color: 'black'
		}
		// console.log(this.props)
		this.changeState = this.changeState.bind(this);
	}


	changeState(){

		let newStatus = (this.state.status + 1) % 3 
		this.setState({
			status: newStatus
		});

		if(newStatus === 0){
			this.setState({
				checked: false,
				color: this.props.theme.palette.black.main
			});
		}

		else if(newStatus === 1){
			this.setState({
				checked: true,
				color: this.props.theme.palette.warning.main
			});
		}

		else if(newStatus === 2){
			this.setState({
				checked: true,
				color: this.props.theme.palette.secondary.main
			});
		}
		// console.log(this.props.theme.palette.primary.light)

		this.props.update(newStatus, this.props.identifier);

	}



	render(){
		return (
			<div className="dashboardtask">
				<Checkbox size="medium" value="checkbox" inputProps={{ 'aria-label': 'Checkbox A' }} style={{color: this.state.color, transform: "scale(1.2)"}} checked={this.state.checked} onChange={this.changeState}/>
				<span style={{"fontSize": "2.5vh", "paddingTop": "20vh"}}>{this.props.tasklabel}<span style={{color: this.props.theme.palette.primary.light}}> ({this.props.taskmin} min)</span></span>
			</div>
		);
	}
}

export default withTheme(DashboardTask);
