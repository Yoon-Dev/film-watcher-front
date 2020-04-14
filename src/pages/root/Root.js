import React, { useEffect, useState } from 'react';
import { useMovies } from '../../services/movies/Movies';
import Thumb from '../../components/thumb/Thumb';
import Grid from '@material-ui/core/Grid';
import { store } from '../../redux/store';

const Root = props => {
    
    const movies = useMovies();
    const [loading, setLoading] = useState(true);
    const [thumbs, setThumbs] = useState(null);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        store.dispatch({type: "CLEAR"})
    }, []);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        if(movies){
            setLoading(false)
            setThumbs(createThumbs(movies))
        }
        return () => {
            console.log("cleanup");
        };
    }, [movies]);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    const createThumbs = data => {
        const thumbs = Object.keys(data).map( item => 
            
            <Thumb key={data[item].id} data={data[item]}/>
            
        );
        return thumbs;   
    }
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°   
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°   
    return (
        <Grid container className="mt-container">
           { loading ? "<Loader/>" : thumbs }
        </Grid>
  );
}

export default Root;