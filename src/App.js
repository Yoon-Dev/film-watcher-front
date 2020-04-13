import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup, } from 'react-transition-group';
import Header from './components/header/Header';
import { MoviesProvider } from './services/movies/Movies';
import Root from './pages/root/Root';
import SingleMovie from './pages/single-movie/SingleMovie';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="app">
          <Header/>
          <Route render={({location}) => {
            return (
            <TransitionGroup>
              <CSSTransition
              key={location.key}
              timeout={350}
              classNames="fade"
              >
                <Switch location={location}>
                  <Route exact path="/">
                    <MoviesProvider>
                      <Root/>
                    </MoviesProvider>          
                  </Route>
                  <Route path="/:id">
                    <SingleMovie/>
                  </Route>
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
  overrides: {
    MuiCardMedia: {
      root: {
        height: '30em'
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
  }
});

export default App;
