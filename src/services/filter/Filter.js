import React, { useState, useEffect, createContext, useContext } from 'react';
import { fetchData, signal } from '../../utils/utils';
import { moviesclass } from '../../utils/utils';


export const filtersContext = createContext({
    tags: null,
    filterTag: null,
    filterName: null
 });

 export const useFilters = () => {

    const filters = useContext(filtersContext);
    return  filters;

}

// hook du composant FilterProvider
// recupere tout les tags
const useTags = () =>{

    const [tags, setTags] = useState(null);
    const [filterTag, setFilterTag] = useState(null);
    const [filterName, setFilterName] = useState(null);
    useEffect(() => {
        setFilterTag(() => tagname => {
            const movies = document.querySelectorAll('.cardmovies')
            return movies;
        })
        setFilterName(() => (input, filter) => {
            console.log(input)
            const nodes = document.querySelectorAll(`.${moviesclass}`)
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
        fetchData('http://localhost:8000/api/tags', { signal: signal.signal }).then(res => {
            setTags({...res}); 
        })
        return () => {
            // cleanup
            signal.abort();
        };
    }, []);

    return {tags, filterTag, filterName};

}


// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// Provider
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export const FiltersProvider = (props) => {

    const tags = useTags()
    const { children } = props;

    return (
      <filtersContext.Provider value={tags}>
        {children}
      </filtersContext.Provider>
    );
} 
 