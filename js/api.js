// api를 가져올 옵션
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmFmOWM2MTljZWY3YTVmNmJlZmJkNzc0ZDIwMmZkOCIsIm5iZiI6MTczNjMxODE4MS4yMjU5OTk4LCJzdWIiOiI2NzdlMWNlNTYwMWFjZmU3YmQ0ZTVkMWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7LW9uAEtLVOnToPstggCU2IoZYWezpWFT7Y6Y3I4K0Q",
  },
};

// 배너에 들어갈 영화와 기본적인 리스트가 될 영화 불러오는 URL 선언
const bannerMovieUrl = `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1`;
const movieListUrl = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`;

// 배너 가지고와서 문제 여부 확인
async function fetchBannerMovie() {
  try {
    const response = await fetch(bannerMovieUrl, options);
    const data = await response.json();
    displayBannerMovies(data.results);
  } catch (err) {
    console.error("fetching Nowplaying Movie : ", err);
  }
}

// 기본 리스트가 될 영화 가지고 와서 문제 여부 확인
async function fetchMovie() {
  try {
    const response = await fetch(movieListUrl, options);
    const data = await response.json();
    searchData = data.results;
    displayMovies(data.results);
  } catch (err) {
    console.error("fetching Movie : ", err);
  }
}

// 카드를 눌렀을때 나올 영화 상세 목록 - 카드를 누르면 해당하는 ID의 영화 정보 불러옴
async function fetchMovieInfo(movieId) {
  try {
    const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
    const response = await fetch(detailsUrl, options);
    const movie = await response.json();
    updateModal(movie);
  } catch (err) {
    console.error("Error fetching movie details:", err);
  }
}
