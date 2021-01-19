import { createMuiTheme,  MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react';
import './App.css';
import { MainView } from './views/MainView';



const theme = createMuiTheme({
  palette: {
    type : 'dark',
  }
});


function App() {

  return (
    <MuiThemeProvider theme={theme} >
      <CssBaseline />
      <div className='App'><MainView /></div>
    </MuiThemeProvider>
  );
}

export default App;
