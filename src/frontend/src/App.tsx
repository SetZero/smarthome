import { createMuiTheme, MuiThemeProvider, Theme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react';
import './App.css';
import { MainView } from './views/MainView';


const getTheme = () => {
  const lsTheme = localStorage.getItem('ui-theme');
  let palette: "dark" | "light" | undefined;
  if (lsTheme === "dark") {
    palette = "dark";
  } else if (lsTheme === "light") {
    palette = "light";
  }
  return palette
}

let theme = createMuiTheme({
  palette: {
    type: getTheme() || 'dark',
  }
});

function App() {
  const [uiTheme, setUiTheme] = React.useState<Theme>(theme);

  document.addEventListener("themeChanged", (palette: any) => {
    localStorage.setItem('ui-theme', palette.value);
    setUiTheme(createMuiTheme({
      palette: {
        type: palette.value as ("dark" | "light")
      }
    }));
  }, false);

  return (
    <MuiThemeProvider theme={uiTheme} >
      <CssBaseline />
      <div className='App'><MainView /></div>
    </MuiThemeProvider>
  );
}

export default App;
