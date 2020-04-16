import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DetailMovie from '../../components/detail-movie/DetailMovie';
import { store } from '../../redux/store';
import Loading from '../../components/loading/Loading';

const SingleMovie = props => {

  const [loading, setLoading] = useState(true);
  const [detailMovie, setDetailMovie] = useState(null);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°

  useEffect(() => {
    if(store.getState() !== null){
      setLoading(false)
      setDetailMovie(createDetailMovie(store.getState()))
    }
    return () => {
      console.log('cleanup')
    };
  }, [loading]);
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// Create News
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
const createDetailMovie = movie => {
  const detailmovie = <DetailMovie key={movie.id} data={movie}/>;
  return detailmovie;   
}
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  return (
        <Grid container className="mt-single pt-single">
          { loading ? <Loading big={true}/> : detailMovie }
        </Grid>
  );
}

export default SingleMovie;

