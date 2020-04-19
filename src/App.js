import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/header/Header';
import { FiltersProvider } from './services/filter/Filter';
import NewRoot from './pages/new-root/NewRoot';
import NewRootSeries from './pages/new-root-series/NewRootSeries';
import SingleMovie from './pages/single-movie/SingleMovie';
import SingleSerie from './pages/single-serie/SingleSerie';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';

function App() {
  console.log(process.env)
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="app">
          <FiltersProvider>
            <Header/>
          </FiltersProvider>
          <Switch>
              <Route exact path="/detail/:id" component={SingleMovie}/> 
              <Route path="/detail/series/:id" component={SingleSerie}/> 
              <Route path="/series" component={NewRootSeries}/>
              <Route exact path="/" component={NewRoot}/>
          </Switch>  
        </div>
      </BrowserRouter>
    </ThemeProvider> 
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#616161",
      light: "#f5f5f5",
      dark: "#212121"
    },
    secondary: {
      main: "#bbdefb",
      light: "#e3f2fd",
      dark: "#0d47a1"
    },
  },
  overrides: {
    MuiCardMedia: {
      root: {
        height: '30em'
      }
    },
    MuiCard: {
      root: {
        boxShadow: '20px 20px 40px #8b8b8bb3, -20px -20px 40px #ffffff',
        borderRadius: '30px'
      }
    },
    MuiTypography: {
      h6: {
        fontWeight: 'bold'
      },
      h4: {
        fontWeight: 'bold'
      }
    },
    MuiInputBase: {
      root: {
        color: 'white',
      },
    }
  }
});

export default App;
