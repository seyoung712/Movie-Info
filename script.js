let movieListTop = [];
let movieListAll = [];

/*카테고리 목록 가져오기*/
const menus = document.querySelectorAll(".category button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => ByCategory(event))
);

let url = new URL(`https://yts.mx/api/v2/list_movies.json`);
const getMovieUrl = async () => {
  const response = await fetch(url);
  const result = await response.json();
  movieListAll = result.data.movies; //데이터가 .data.movies에 존재
  renderAll();
};

/*TOP20*/
const getMovieTop = async () => {
  url = new URL(`https://yts.mx/api/v2/list_movies.json?sort_by=like_count`);

  const response = await fetch(url);
  const result = await response.json();
  movieListTop = result.data.movies;
  render();
};

/*all*/
const getMovieCategory = async () => {
  url = new URL(`https://yts.mx/api/v2/list_movies.json`);
  getMovieUrl();
};

/* 카테고리별 검색*/
const ByCategory = async (Event) => {
  const category = event.target.textContent;
  //console.log("categ", category);

  url = new URL(`https://yts.mx/api/v2/list_movies.json?genre=${category}`);
  getMovieUrl();
};

/* 키워드 검색 */
const searchKeyword = async () => {
  try {
    const keyword = document.getElementById("search-input").value;
    const url = new URL(
      `https://yts.mx/api/v2/list_movies.json?query_term=${keyword}`
    );
    const response = await fetch(url);

    if (data.movies.length === 0) {
      throw new error("No Result this search.");
    }
    
    const result = await response.json();
    movieListAll = result.data.movies;
    renderAll();

  } catch (error) {
    errorRender(error.message);
  }
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

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="error">
  ${errorMessage}
  </div>`;

  document.getElementById("movie-list-all").innerHTML = errorHTML;
};
getMovieTop();
getMovieCategory();
