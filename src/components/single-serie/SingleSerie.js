import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DetailSerie from '../detail-serie/DetailSerie';
import { store } from '../../redux/store';
import Loading from '../loading/Loading';
import RedirectAll from "../redirect-all/RedirectAll";
import { useOneSerie } from '../../services/series/Series';


const SingleSerie = props => {
  const oneserie = useOneSerie();
  const [loading, setLoading] = useState(true);
  const [detailSerie, setDetailSerie] = useState(null);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°

  useEffect(() => {
    if(store.getState().id !== null && oneserie){
      setLoading(false)
      setDetailSerie(createDetailSerie(store.getState().general, store.getState().src ? store.getState().src : oneserie))
    }else{
      setTimeout(() => {
        if(store.getState() === null){
          setDetailSerie(createRedirectAll("/series"))
        }     
      },1000);  
    }
  }, [loading, oneserie]);
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// Create News
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
const createDetailSerie = (general, src) => {
  const detailSerie = <DetailSerie key={general.id} general={general} src={src}/>;
  return detailSerie;   
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
          { loading ? <Loading big={true}/> : detailSerie }
        </Grid>
  );
}

export default SingleSerie;

