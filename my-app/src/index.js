import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './Layouts/App';
import AppContextProvider from './AppContext';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#deffff',
      main: '#abdafc',
      dark: '#7aa9c9',
      contrastText: '#000',
    },
    secondary: {
      light: '#b8336a',
      main: '#b8336a',
      dark: '#840040',
      contrastText: '#fff',
    },
  },
});
ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
