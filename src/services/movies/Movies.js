import React, { useState, useEffect, createContext, useContext } from 'react';
import { fetchData, signal } from '../../utils/utils';

export const moviesContext = createContext({
   movies: null
});

export const useMovies = () => {

    const movies = useContext(moviesContext);
    return  movies;

}

// hook du composant MoviesProvider
const useData = () =>{
    const [movies, setMovies] = useState(null);
    useEffect(() => {
        fetchData('http://localhost:8000/api/movies', { signal: signal.signal }).then(res => {
            setMovies({...res}); 
        })
        return () => {
            // cleanup
            signal.abort();
        };
    }, []);

    return movies;

}


// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// Provider
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export const MoviesProvider = (props) => {

    const movies = useData()
    const { children } = props;
    return (
      <moviesContext.Provider value={movies}>
        {children}
      </moviesContext.Provider>
    );
} 