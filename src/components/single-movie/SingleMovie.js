import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DetailMovie from '../detail-movie/DetailMovie';
import { store } from '../../redux/store';
import Loading from '../loading/Loading';
import RedirectAll from "../redirect-all/RedirectAll";
import { useOneMovie } from '../../services/movies/Movies';

const SingleMovie = props => {
  const onemovie = useOneMovie();
  const [loading, setLoading] = useState(true);
  const [detailMovie, setDetailMovie] = useState(null);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°

  useEffect(() => {

    if(store.getState().id !== null && onemovie){
      setLoading(false)
      setDetailMovie(createDetailMovie(store.getState().general, store.getState().src ? store.getState().src : onemovie))
    }else{
      setTimeout(() => {
        if(store.getState().id === null){
          setDetailMovie(createRedirectAll("/"))
        }     
      },1000);  
    }
  }, [loading, onemovie]);
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// Create News
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
const createDetailMovie = (general, src) => {
  const detailmovie = <DetailMovie key={general.id} general={general} src={src}/>;
  return detailmovie;   
}
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
const createRedirectAll = url => {
  setLoading(false)
  return <RedirectAll url={url}/>;   
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

