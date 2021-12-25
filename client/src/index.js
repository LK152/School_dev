import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';

let defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#F3905F'
    }
  }
});
const Theme = responsiveFontSizes(defaultTheme);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);