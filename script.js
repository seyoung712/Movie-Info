//?sort_by=like_count
const getMovie = async() => {
    const url = new URL(`https://yts.mx/api/v2/list_movies.json`);

    const response = await fetch(url);
    const result = await response.json();
    let movie = result.data.movies;
    console.log("data",movie);
}

getMovie();