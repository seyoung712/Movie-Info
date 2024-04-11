let movieListTop = [];
let movieListAll = [];

const category = document.querySelectorAll(".category button");
category.forEach((category) =>
  category.addEventListener("click", (event) => getMovieCategory(event))
);

const getMovie = async () => {
  const url = new URL(
    `https://yts.mx/api/v2/list_movies.json?sort_by=like_count`
  );

  const response = await fetch(url);
  const result = await response.json();
  movieListTop = result.data.movies;
  render();
  console.log("data", movieListTop);
};

/*genre=${category}*/
const getMovieCategory = async(event) => {
  const category = event.target.textContent
  console.log("category",category);
  const url = new URL(`https://yts.mx/api/v2/list_movies.json`);

  const response = await fetch(url);
  const result = await response.json();
  movieListAll = result.result.movies;
  renderAll();
  console.log("data",movieListAll);
};


/* TOP20 */
const render = () => {
  const movieHTML = movieListTop
    .map(
      (movie) =>
        `<span class="col-lg-2 card movie-inner">
            <div>
                <div>
                <img class="movie-img-size card-body" src="${movie.medium_cover_image}"/>
            </div>
            <div class="movie-content">
                <div class="movie-title card-title"><h5>${movie.title}</h5></div>
                <br>
                <div class="movie-genres card-text">${movie.genres}</div>
                <div class="movie-etc card-text">Rating ${movie.rating} / Runtime ${movie.runtime}</div>
            </div>
            </div>
        </span>`
    )
    .join("");

  document.getElementById("movie-list-top").innerHTML = movieHTML;
};

/*전체*/
const renderAll = () => {
    const movieAllHTML = movieListAll
      .map(
        (movie) =>
          `<span class="col-lg-2 card movie-inner">
              <div>
                  <div>
                  <img class="movie-img-size card-body" src="${movie.medium_cover_image}"/>
              </div>
              <div class="movie-content">
                  <div class="movie-title card-title"><h5>${movie.title}</h5></div>
                  <br>
                  <div class="movie-genres card-text">${movie.genres}</div>
                  <div class="movie-etc card-text">Rating ${movie.rating} / Runtime ${movie.runtime}</div>
              </div>
              </div>
          </span>`
      )
      .join("");
  
    document.getElementById("movie-list-all").innerHTML = movieAllHTML;
  };

getMovie();
getMovieCategory();