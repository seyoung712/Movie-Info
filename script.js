
const getMovie = () => {
    const url = new URL(`https://yts.mx/api/v2/list_movies.json?sort_by=like_count`);
    console.log("uuu",url);
}

getMovie();