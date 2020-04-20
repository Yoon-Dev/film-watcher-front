export const imgdir = "http://localhost:8000/images/movies/";
export const imgdirseries = "http://localhost:8000/images/series/";
export const videodir = "http://localhost:8000/video/movies/";
export const videodirseries = "http://localhost:8000/video/series/";
export const subtitledir = "./subtitle/";
export const upadtelastAPI = "http://localhost:8000/api/series/addnewslasts"


export const moviesclass = "cardmovies";
export const seriesclass = "cardseries";
export const signal = new AbortController();

// fetch data
export const fetchData = (url, signal) => {
    
    let data =  fetch(url)
                    .then( res => {
                        return res.json()
                    }) 
                    .then( res => {
                        return res
                    })
                    .catch(error => {
                        alert(error)
                })
    return data;
} 