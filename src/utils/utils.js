export const imgdir = "http://localhost:8000/images/movies/";
export const videodir = "http://localhost:8000/video/movies/";
export const moviesclass = "cardmovies";
// fetch data
export const fetchData = (url) => {
    
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