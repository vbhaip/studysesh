import React from 'react'

class DashboardClock extends React.Component {


	constructor(props){
		super(props);

		this.state = {
			minutes: 0,
			hours: 0
		}

		this.updateTime = this.updateTime.bind(this);

		window.sessionStorage.setItem("timemarker", 0);


	}

	componentDidMount(){
		this.interval = setInterval(this.updateTime, 1000)
	}

	componentWillUnmount(){
		clearInterval(this.interval)
	}

	updateTime(){
		this.setState((prevState) => {

			window.sessionStorage.setItem("timemarker", prevState.minutes + prevState.hours*60 + 1)
			
			return {
				minutes: (prevState.minutes + 1)%60,
				hours: (prevState.hours + Math.floor((prevState.minutes + 1)/60))
			}

		})

	}

	render(){
		return (

			<h2 class="dboardclock">
			{("0" + this.state.hours).slice(-2)}:{("0" + this.state.minutes).slice(-2)}
			</h2>

		)
	}

} 

export default DashboardClock;