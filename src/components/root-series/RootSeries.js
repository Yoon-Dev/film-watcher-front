import React, { useState, useEffect } from 'react';
import { useSeries } from '../../services/series/Series';
import { store } from '../../redux/store';
import Loading from '../loading/Loading';
import Grid from '@material-ui/core/Grid';
import Thumb from '../thumb/Thumb';


const RootSeries = props => {
    const series = useSeries();
    const [loading, setLoading] = useState(true);
    const [thumbsSeries, setThumbsSeries] = useState(null);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        store.dispatch({type: "CLEAR"})
    }, []);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        if(series){
            setLoading(false)
            setThumbsSeries(createThumbsSeries(series))
        }
    }, [series]);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    const createThumbsSeries = data => {
        const thumbs = Object.keys(data).map( item => 
            
            <Thumb key={data[item].id} data={data[item]} movie={false}/>
            
        );
        return thumbs;   
    }
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°   
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°   
    return(
        <Grid container className="mt-container">
            { loading ? <Loading big={true}/> : thumbsSeries }
        </Grid>
    )
}

export default RootSeries;
