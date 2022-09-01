window.onload = () => {
  getOriginals();
  getTrendingNow();
  getTopRated();
};

const fetchMovies = async (url, dom_element, path_type) => {
  const response = await fetch(`${url}`);

  if (!response.ok) throw new Error("Something went wrong with movies");

  const data = await response.json();
  showMovies(data, dom_element, path_type);
};

showMovies = (movies, dom_element, path_type) => {
  const moviesElement = document.querySelector(dom_element);

  for (let movie of movies.results) {
    let imgElement = document.createElement("img");
    imgElement.setAttribute("data-id", movie.id);
    imgElement.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`;
    imgElement.addEventListener("click", (e) => {
      handleMovieSelection(e);
    });
    moviesElement.appendChild(imgElement);
  }
};

function getOriginals() {
  let url =
    "https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213";
  fetchMovies(url, "#original__movies", "poster_path");
}
function getTrendingNow() {
  let url =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045";
  fetchMovies(url, "#trending", "backdrop_path");
}
function getTopRated() {
  let url =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1";
  fetchMovies(url, "#top_rated", "poster_path");
}

const getMovieTrailer = async (id) => {
  let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`;
  const response = await fetch(url);

  if (!response.ok) throw new Error("Something went wrong with trailers");

  const data = await response.json();
  return data;
};

const setTrailer = (trailers) => {
  const iframe = document.getElementById("movieTrailer");
  const movieNotFound = document.querySelector(".movieNotFound");

  if (trailers.length > 0) {
    movieNotFound.classList.add("d-none");

    iframe.classList.remove("d-none");
    iframe.src = `https://www.youtube.com/embed/${trailers[0].key}`;
  } else {
    iframe.classList.add("d-none");
    movieNotFound.classList.remove("d-none");
  }
};

const handleMovieSelection = (e) => {
  const id = e.target.getAttribute("data-id");

  getMovieTrailer(id).then((data) => {
    const results = data.results;
    const youtubeTrailers = results.filter((result) => {
      if (result.site == "YouTube" && result.type == "Trailer") {
        return true;
      } else {
        return false;
      }
    });
    setTrailer(youtubeTrailers);
  });

  $("#trailerModal").modal("show");
};
