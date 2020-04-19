import React, { useState, useEffect, createContext, useContext } from 'react';
import { fetchData, signal } from '../../utils/utils';
export const seriesContext = createContext({
   series: null
});

export const useSeries = () => {

    const series = useContext(seriesContext);
    return  series;

}

// hook du composant SeriesProvider
const useData = () =>{
    const [series, setSeries] = useState(null);
    useEffect(() => {
        fetchData('http://localhost:8000/api/series', { signal: signal.signal }).then(res => {
            setSeries({...res}); 
        })
        return () => {
            // cleanup
            signal.abort();
        };
    }, []);

    return series;

}


// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// Provider
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export const SeriesProvider = (props) => {
    const series = useData()
    const { children } = props;
    return (
      <seriesContext.Provider value={series}>
        {children}
      </seriesContext.Provider>
    );
} 