import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {AppBar, Container, createTheme} from "@mui/material";
import Header from "./Header";
import {ThemeProvider} from "@emotion/react";
import Routers from "./Routers";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});
ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
          <BrowserRouter>
              <AppBar color="primary" position="static">
                  <Container maxWidth="lg">
                      <Header />
                  </Container>
              </AppBar>
              <Routers />
          </BrowserRouter>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
