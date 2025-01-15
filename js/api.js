// 배너 영화 fetch

async function fetchBannerMovie() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1",
      options
    );
    const data = await response.json();
    displayBannerMovies(data.results);
  } catch (err) {
    console.error("fetching Nowplaying Movie : ", err);
  }
}

// Modal 영화 fetch

// movieContainer에 이벤트 리스너를 추가하여 포스터가 눌리는지 인식
movieContainer.addEventListener("click", function (event) {
  const target = event.target;

  // 클릭된 객체가 영화포스터인지 확인하고, 맞으면 ID를 불러와 API 호출
  if (target.classList.contains("moviePoster")) {
    const movieId = target.closest(".movieCard").id.replace("movie", ""); // ID에서 숫자만 추출
    fetchMovieInfo(movieId);
  }
});

// search와 비슷하게 id를 기반으로 찾게 환경 구성
function fetchMovieInfo(movieId) {
  const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;

  // 검색을 진행할 API json으로 정리하고 필요한 내용을
  // 모달로 보내줄 수 있도록 콜백함수로 순서 정해주기
  fetch(detailsUrl, options)
    .then((res) => res.json())
    .then((movie) => {
      updateModal(movie);
    })
    .catch((err) => console.error("Error fetching movie details:", err));
}

// MovieList 영화 fetch

function fetchMovie() {
  fetch(
    "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
    options
  )
    .then((res) => res.json())
    .then((data) => {
      searchData = data.results;
      displayMovies(data.results);
    })
    .catch((err) => console.error("fetching Movie : ", err));
}
