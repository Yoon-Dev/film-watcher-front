import React, { useState, useEffect, createContext, useContext } from 'react';
import { moviesclass, seriesclass } from '../../utils/utils';
import { useLocation } from 'react-router-dom';


export const filtersContext = createContext({
    filterName: null,
 });

 export const useFilterName = () => {

    const filterName = useContext(filtersContext);
    return  filterName;

}

// hook du composant FilterProvider
// recupere tout les tags
const useTags = () =>{
    const {pathname} = useLocation() 
    const [filterName, setFilterName] = useState(null);
    useEffect(() => {
        setFilterName(() => (input, filter) => {
            const nodes = document.querySelectorAll(`.${pathname === "/" ? moviesclass : seriesclass}`)
            nodes.forEach(e => {
                if(filter && filter !== null && e.getAttribute(filter) && e.getAttribute(filter) !== null){
                    const title = e.getAttribute(filter).toLowerCase()
                    if(title.includes(input.toLowerCase())){
                        e.classList.remove('hidden')   
                    }else{
                        e.classList.add('hidden')
                    }
                }
            })
        })

    }, [pathname]);

    return filterName;

}


// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// Provider
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export const FiltersProvider = (props) => {

    const filterName = useTags()
    const { children } = props;

    return (
      <filtersContext.Provider value={filterName}>
        {children}
      </filtersContext.Provider>
    );
} 
 