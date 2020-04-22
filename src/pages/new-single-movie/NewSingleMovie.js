import React from 'react';
import SingleMovie from '../../components/single-movie/SingleMovie';
import { MovieProvider } from '../../services/movies/Movies';

const NewSingleMovie = () => {
    return(
        <MovieProvider>
            <SingleMovie/>
        </MovieProvider>
    )
}

export default NewSingleMovie;