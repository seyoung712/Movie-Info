//?sort_by=like_count

let movieList = [];

const getMovie = async () => {
  const url = new URL(`https://yts.mx/api/v2/list_movies.json`);

  const response = await fetch(url);
  const result = await response.json();
  movieList = result.data.movies;
  renderAll();
  console.log("data", movieList);
};

/*
const categoryEngToKor{
    if(Action){
        return "액션"
    }
};
*/

/*
document.querySelector('.slide-btn').addEventListener('click', () => {
    document.querySelector('.container-slide').style.transform = 'translate(-100%)';
}); 
*/
//https://www.youtube.com/watch?v=qHzSQrLjxlQ
//java 가로 슬라이드

const renderAll = () => {
  const movieHTML = movieList
    .map((movie) =>
        `<span class="col-lg-2 card movie-inner">
            <div>
                <div>
                <img class="movie-img-size card-body" src="${movie.medium_cover_image}"/>
            </div>
            <div class="movie-content">
                <div class="movie-title card-title"><h5>${movie.title}</h5></div>
                <div class="movie-genres card-text">${movie.genres}</div>
                <div class="movie-etc card-text">Rating ${movie.rating} / Runtime ${movie.runtime}</div>
            </div>
            </div>
        </span>`
    )
    .join("");

  document.getElementById("movie-list").innerHTML = movieHTML;
};

getMovie();
