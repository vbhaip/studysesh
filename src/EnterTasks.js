import React from 'react'
import TaskContainer from './TaskContainer'
import ActionButton from './ActionButton'
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';
import './EnterTasks.css'


class EnterTasks extends React.Component{

	
	
	render(){
		return (
			<div id="entertasks">
				<h1 style={{"font-family": this.props.theme.typography.fontFamily,
				 "color": this.props.theme.palette.primary.main}}>Enter tasks</h1>
				<TaskContainer itemCount={5}/>
				<Button variant="contained" color="primary" href="dashboard">
					Done
				</Button>
			</div>
		);
	}
}

export default withTheme(EnterTasks);
