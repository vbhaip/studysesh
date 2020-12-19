import React from 'react'
import Task from './Task'
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';

class TaskContainer extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			tasks: [],
			tasktimes: [],
			taskHTMLItems: []
		};

		this.updateTaskContainer = this.updateTaskContainer.bind(this);
		window.sessionStorage.setItem("tasks",this.state.tasks);
		window.sessionStorage.setItem("tasktimes",this.state.tasktimes);


		this.addTask = this.addTask.bind(this);
	}



	addTask(){
		this.setState((prevState) => {
			let newStateItems = [...prevState.taskHTMLItems];
			let i = prevState.taskHTMLItems.length;
			console.log(newStateItems);
			newStateItems.push(<Task key={i} keyProp={i} updateTaskContainer={this.updateTaskContainer} />)
			// newStateItems.push(i);
			console.log(newStateItems);
			

			let newTasks = [...prevState.tasks]
			newTasks.push('');

			let newTaskTimes = [...prevState.tasktimes]
			newTaskTimes.push('');

			window.sessionStorage.setItem("tasks",newTasks);
			window.sessionStorage.setItem("tasktimes",newTaskTimes);

			return {taskHTMLItems: newStateItems, tasks: newTasks, tasktimes: newTaskTimes}
		});

	}

	updateTaskContainer(data, key, type) {

		if(type == 'label'){
			this.setState(prevState => {
			    const newItems = [...prevState.tasks];
			    newItems[key] = data;
			    window.sessionStorage.setItem("tasks",newItems);
			    return {tasks: newItems};
			});

		}

		if(type == 'time'){
			this.setState(prevState => {
			    const newItems = [...prevState.tasktimes];
			    newItems[key] = data;
			    window.sessionStorage.setItem("tasktimes",newItems);
			    return {tasktimes: newItems};
			});

		}

	}

	componentDidMount(){
		this.addTask();
	}



	render(){
		// const items = [];
		// for(let i = 0; i < this.props.itemCount; i++){
		// 	items.push(<Task key={i} keyProp={i} updateTaskContainer={this.updateTaskContainer} />);
		// }

		return (
			<div>
				{this.state.taskHTMLItems}
				<IconButton color="primary" onClick={this.addTask}>
					<AddBoxIcon/>
				</IconButton>
			</div>
		);
	}
}

export default TaskContainer;

