import React from 'react';
import SingleSerie from '../../components/single-serie/SingleSerie';
import { SerieProvider } from '../../services/series/Series';

const NewSingleSerie = () => {
    return(
        <SerieProvider>
            <SingleSerie/>
        </SerieProvider>
    )
}

export default NewSingleSerie;