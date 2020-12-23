import './App.css';
import EnterTasks from './EnterTasks'
import Dashboard from './Dashboard'
import Results from './Results'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';
 


import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";




const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4357ad',
    },
    secondary: {
      main: '#48a9a6',
    },
    error: {
    	main: '#c1666b'
    },
    warning: {
    	main: '#d4b843'
    },
    black: {
    	main: '#020202'
    }
  },
  typography: {
  	fontFamily: "'Lato'"
  }
});


function App() {
	return (
		<ThemeProvider theme={theme}>
		<Router basename="/">
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
				<Route exact path="/dashboard">
					<Dashboard/>
				</Route>
				<Route exact path="/results">
					<Results/>
				</Route>
			</Switch>
		</Router>
		</ThemeProvider>
	);
}

export default withTheme(App);
