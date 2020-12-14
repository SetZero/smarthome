import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import { configureStoreAsync } from './store';
import { LinearProgress, CircularProgress, Backdrop } from '@material-ui/core';
import { LoadingError } from './views/LoadingError';


ReactDOM.render(
  <React.StrictMode>
    <LinearProgress />
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  </React.StrictMode>,
  document.getElementById('root')
);

configureStoreAsync().then(result => {
  const store = result;
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
})
  .catch((error) => {
    ReactDOM.render(
      <React.StrictMode>
        <LoadingError error={error}/>
      </React.StrictMode>,
      document.getElementById('root')
    );
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
