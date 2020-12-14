import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import { configureStoreAsync } from './store';
import { Container, Card, CardContent, LinearProgress, CircularProgress, Backdrop } from '@material-ui/core';

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
      <Backdrop open={true}>
        <Container maxWidth="sm">
          <Card>
            <CardContent>
              <div>There was an error while contacting OpenHAB. Is OpenHAB running?</div>
              <div>Error Message: <code> {JSON.stringify(error)} </code></div>
            </CardContent>
          </Card>
        </Container>
        </Backdrop>
      </React.StrictMode>,
      document.getElementById('root')
    );
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
