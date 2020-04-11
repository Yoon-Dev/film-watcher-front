import React, { useState, useEffect, createContext, useContext } from 'react';

export const moviesContext = createContext({
   movies: null
});

export const useMovies = () => {

    const movies = useContext(moviesContext);
    return  { movies };

}

// hook du composant MoviesProvider
const useData = () =>{

    const [movies, setMovies] = useState(null);

    useEffect(() => {
        fetchData('http://localhost:8000/api/movies').then(res => {
            console.log('#3#', res)
            setMovies({...res}); 
        })
        return () => {
            // cleanup
            console.log('cleanup')
        };
    }, []);

    return movies;

}

// fetch fake-api data
const fetchData = (url) => {
    
    let data =  fetch(url)
                    .then( res => {
                        console.log('#1#', res)
                        return res.json()
                    }) 
                    .then( res => {
                        console.log('#2#', res)
                        return res

                    })
                    .catch(error => {
                        alert(error)
                })
    return data;
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