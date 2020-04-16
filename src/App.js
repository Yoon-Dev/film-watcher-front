import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup, } from 'react-transition-group';
import Header from './components/header/Header';
import { MoviesProvider } from './services/movies/Movies';
import { FiltersProvider } from './services/filter/Filter';
import Root from './pages/root/Root';
import SingleMovie from './pages/single-movie/SingleMovie';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors/grey';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="app">
          <FiltersProvider>
            <Header/>
          </FiltersProvider>
          <Route render={({location}) => {
            return (
            <TransitionGroup>
              <CSSTransition
              key={location.key}
              timeout={350}
              classNames="fade"
              >
                <Switch location={location}>
                  <MoviesProvider>
                    <Route exact path="/" component={Root}/>
                    <Route path="/:id" component={SingleMovie}/>
                  </MoviesProvider>          
                </Switch>  
              </CSSTransition>      
            </TransitionGroup>           
            )
          }}/>
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
    secondary: grey
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
