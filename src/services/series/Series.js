import React, { useState, useEffect, createContext, useContext } from 'react';
import { fetchData, signal } from '../../utils/utils';
import { useParams } from 'react-router-dom';
import { store } from '../../redux/store';
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export const seriesContext = createContext({
   series: null
});

export const useSeries = () => {

    const series = useContext(seriesContext);
    return  series;

}

export const oneserieContext = createContext({
    serie: null,
 });

export const useOneSerie = () => {

    const serie = useContext(oneserieContext);
    return  serie;

}

// hook du composant SeriesProvider
const useData = multiple =>{
    const [series, setSeries] = useState(null);
    const {id} = useParams() 
    useEffect(() => {
        if(id && !multiple){
            if(!store.getState().src){
                fetchData(`http://localhost:8000/api/series/${id}`, { signal: signal.signal }).then(res => {
                    setSeries({...res}); 
                })
            }else{
                setSeries({...store.getState().src})
            }
        }else if(multiple){
            fetchData('http://localhost:8000/api/series', { signal: signal.signal }).then(res => {
                setSeries({...res}); 
            })
        }
        return () => {
            // cleanup
            signal.abort();
        };
    }, [id, multiple]);

    return series;

}


// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// Provider
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export const SeriesProvider = (props) => {
    const series = useData(true)
    const { children } = props;
    return (
      <seriesContext.Provider value={series}>
        {children}
      </seriesContext.Provider>
    );
} 

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// Provider
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export const SerieProvider = (props) => {
    const serie = useData(false)
    const { children } = props;
    return (
      <oneserieContext.Provider value={serie}>
        {children}
      </oneserieContext.Provider>
    );
} 