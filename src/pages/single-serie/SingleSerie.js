import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DetailSerie from '../../components/detail-serie/DetailSerie';
import { store } from '../../redux/store';
import Loading from '../../components/loading/Loading';
import RedirectAll from "../../components/redirect-all/RedirectAll";

const SingleSerie = props => {
  const [loading, setLoading] = useState(true);
  const [detailSerie, setDetailSerie] = useState(null);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°

  useEffect(() => {
    if(store.getState() !== null){
      setLoading(false)
      setDetailSerie(createDetailSerie(store.getState()))
    }else{
      setTimeout(() => {
        if(store.getState() === null){
          setDetailSerie(createRedirectAll("/series"))
        }     
      },1000);  
    }
  }, [loading]);
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// Create News
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
const createDetailSerie = Serie => {
  const detailSerie = <DetailSerie key={Serie.id} data={Serie}/>;
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

