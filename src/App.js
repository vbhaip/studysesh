import logo from './logo.svg';
import './App.css';
import EnterTasks from './EnterTasks'
import Dashboard from './Dashboard'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
	return (
		<Router>
		{
	//	<div className="App">
	//	  <header className="App-header">
	//		<img src={logo} className="App-logo" alt="logo" />
	//		<p>
	//		  Edit <code>src/App.js</code> and save to reload.
	//		</p>
	//		<a
	//		  className="App-link"
	//		  href="https://reactjs.org"
	//		  target="_blank"
	//		  rel="noopener noreferrer"
	//		>
	//		  Learn React
	//		</a>
	//	  </header>
	//	  <TaskContainer itemCount={5}/>
	//	</div>
			}
			<Switch>
				<Route exact path="/">
					<EnterTasks/>
				</Route>
				<Route path="/dashboard">
					<Dashboard/>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
