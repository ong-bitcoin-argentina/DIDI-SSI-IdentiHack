import React from 'react';
//import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import InitPage from './pages/InitPage';
import FormPage from './pages/FormPage';

import PrimarySearchAppBar from './components/PrimaryAppBar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Copyright from './components/Copyright'

// Or Create your Own theme:
const theme = createMuiTheme({
  palette: {
    secondary: {
      // main: '#E33E7F'
      main: '#4360d8'
      // main: '#08cfd3'
    },
    primary: {
      // main: '#4360d8'
      // main: 'rgb(31, 78, 120)'
      main: '#3282d6'
    }
  }
});


function App() {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <PrimarySearchAppBar />
          <Switch>
            <Route path='/' exact component={InitPage}/>
            <Route path='/form' component={FormPage}/>
          </Switch>
          <Copyright />
        </MuiThemeProvider>
      </Router>
  );
}

export default App;
