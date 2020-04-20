import React from 'react';
import Root from '../../components/root/Root';
import { MoviesProvider } from '../../services/movies/Movies';

const NewRoot = () => {
    return(
        <MoviesProvider>
            <Root/>
        </MoviesProvider>
    )
}

export default NewRoot;