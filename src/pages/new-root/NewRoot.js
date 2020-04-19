import React from 'react';
import Root from '../../components/root/Root';
import { MoviesProvider } from '../../services/movies/Movies';

const NewRoot = props => {
    return(
        <MoviesProvider>
            <Root/>
        </MoviesProvider>
    )
}

export default NewRoot;