import React, { useState, useEffect } from 'react';
import DetailMovie from '../../components/detail-movie/DetailMovie';
import { store } from '../../redux/store';

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
        <div className="mt-container">
          { loading ? "loading" : detailMovie }
        </div>
  );
}

export default SingleMovie;

