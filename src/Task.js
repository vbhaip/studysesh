import React from 'react'
import TextField from '@material-ui/core/TextField';


class Task extends React.Component{

	constructor(props){
		super(props);
		this.handleTextFieldLabelChange = this.handleTextFieldLabelChange.bind(this);
		this.handleTextFieldMinChange = this.handleTextFieldMinChange.bind(this);
		
		this.state = {
			task: '',
			tasktime: ''
		};
	}


	handleTextFieldLabelChange(e){
		this.setState({
			task: e.target.value
		});

		this.props.updateTaskContainer(e.target.value, this.props.keyProp, 'label');

	}

	handleTextFieldMinChange(e){
		this.setState({
			tasktime: e.target.value
		});

		this.props.updateTaskContainer(e.target.value, this.props.keyProp, 'time');

	}



	render(){
		return (
			<div className="task">
				<TextField id="standard-basic" label="Task" onChange={this.handleTextFieldLabelChange}/>
				<TextField id="standard-basic" label="Minutes" type="number" onChange={this.handleTextFieldMinChange}/>
			</div>
		);
	}
}

export default Task;
