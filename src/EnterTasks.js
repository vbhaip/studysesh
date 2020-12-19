import React from 'react'
import TaskContainer from './TaskContainer'
import ActionButton from './ActionButton'
import Button from '@material-ui/core/Button';


class EnterTasks extends React.Component{

	
	
	render(){
		return (
			<div>
				<TaskContainer itemCount={5}/>
				<Button variant="contained" color="primary" href="dashboard">
					Done
				</Button>
			</div>
		);
	}
}

export default EnterTasks;
