import api from "../api";

export const getPopularMovies = async () => {
  let res: any;
  
  const endpoint = 'popular?language=en-US';

  await api
    .get(endpoint)
    .then(
        (d) => {
            res = d.data;
        })
    .catch((err) => {
        res = err.response;
    
    })
  
    return res;

};