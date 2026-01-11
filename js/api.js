const API_KEY = 'b532bd925cf8a733b6abea25379cea24'; 
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchData(endpoint, params = '') {
    const url = `${BASE_URL}/${endpoint}?api_key=${API_KEY}&language=en-US${params}`;
    
    const response =await fetch(url);

    if (!response.ok) {
        throw new Error(`Serverfel: ${response.status} ${response.statusText}`);
    }
    return await response.json();
    
}