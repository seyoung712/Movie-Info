let movieListTop = [];
let movieListAll = [];

const menus = document.querySelectorAll(".category button");
menus.forEach(menu =>
  menu.addEventListener("click", (event) => ByCategory(event))
);

const getMovieTop = async () => {
  const url = new URL(
    `https://yts.mx/api/v2/list_movies.json?sort_by=like_count`
  );

  const response = await fetch(url);
  const result = await response.json();
  movieListTop = result.data.movies; //데이터가 .data.movies에 존재
  render();
  console.log("data", movieListTop);
};

/*genre=${category}*/
const ByCategory = async(Event) => {
  const category = event.target.textContent;
  console.log("categ",category);
  
  const url = new URL(
    `https://yts.mx/api/v2/list_movies.json?genre=${category}`
  );
  const response = await fetch(url);
  const result = await response.json();
  console.log("data",result);
  movieListAll = result.data.movies; //데이터가 .data.movies에 존재
  renderAll();
}

/*all*/
const getMovieCategory = async() => {
  const url = new URL(`https://yts.mx/api/v2/list_movies.json`);

  const response = await fetch(url);
  const result = await response.json();
  movieListAll = result.data.movies;
  renderAll();
  console.log("data2",movieListAll);
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

getMovieTop();
getMovieCategory();