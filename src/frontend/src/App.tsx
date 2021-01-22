import { createMuiTheme, MuiThemeProvider, Theme, ThemeOptions } from '@material-ui/core';
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

const addThemeStyles = (thm: ThemeOptions) => {
  if (!thm.typography || !thm.breakpoints)
    return;
  else {
    (thm as any).typography.h2 = {
      fontSize: '2.2rem',
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
      [(thm as any).breakpoints.up('md')]: {
        fontSize: '3.75rem',
      },
    };
  }
}

let theme = createMuiTheme({
  palette: {
    type: getTheme() || 'dark',
  }
});

addThemeStyles(theme);

function App() {
  const [uiTheme, setUiTheme] = React.useState<Theme>(theme);

  document.addEventListener("themeChanged", (palette: any) => {
    localStorage.setItem('ui-theme', palette.value);
    let thm = createMuiTheme({
      palette: {
        type: palette.value as ("dark" | "light")
      }
    });
    addThemeStyles(thm);
    setUiTheme(thm);
  }, false);

  return (
    <MuiThemeProvider theme={uiTheme} >
      <CssBaseline />
      <div className='App'><MainView /></div>
    </MuiThemeProvider>
  );
}

export default App;
