import { createMuiTheme,  MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import './App.css';
import { MainView } from './views/MainView';



const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e0e0e0'
    },
    secondary: {
      main: '#212121'
    }
  }
});


function App() {

  return (
    <MuiThemeProvider theme={theme} >
      <div className='App'><MainView /></div>
      </MuiThemeProvider>
  );
}

export default App;
