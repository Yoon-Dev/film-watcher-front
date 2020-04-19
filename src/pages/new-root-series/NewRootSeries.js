import React from 'react';
import RootSeries from '../../components/root-series/RootSeries';
import { SeriesProvider } from '../../services/series/Series';

const NewRoot = props => {
    return(
        <SeriesProvider>
            <RootSeries/>
        </SeriesProvider>
    )
}

export default NewRoot;