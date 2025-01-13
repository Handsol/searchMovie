// Now Playing API

// fetch(
//   "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1",
//   options
// )
//   .then((resNowPlaying) => resNowPlaying.json())
//   .then((resNowPlaying) => console.log(resNowPlaying))
//   .catch((errNow) => console.error(errNow));

// -----------------------------------------------------------------------

// API로 fetch 내용 가져오고 json으로 변환하는 부분
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

// fetch 된 정보를 카드UI로 만들어 display 하는 부분
function displayMovies(movies) {
  // 무비컨테이너 한번 비워줘야함 //
  movieContainer.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    const { poster_path, title, vote_average, vote_count } = movies[i];

    // 새로운 카드 요소 생성
    const card = document.createElement("div");
    card.classList.add("movieCard");

    // 포스터 이미지 생성
    const img = document.createElement("img");
    img.classList.add("moviePoster");
    img.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
    img.alt = `${title} 유명포스터`;

    // 제목 생성
    const titleElement = document.createElement("p");
    titleElement.classList.add("movieTitle");
    titleElement.textContent = title;

    // 평점 생성, 소숫점 1자리로 반올림
    let voteAverage = Math.round(vote_average * 10) / 10;
    const voteElement = document.createElement("p");
    voteElement.classList.add("movieVotes");
    voteElement.textContent = `⭐ ${voteAverage} (${vote_count})`;

    // 포스터, 제목, 평점을 카드에 추가
    card.appendChild(img);
    card.appendChild(titleElement);
    card.appendChild(voteElement);

    // 카드를 컨테이너에 추가
    movieContainer.appendChild(card);
  }
}

// fetchMovie를 실행
fetchMovie();

// -----------------------------------------------------------------------
// 검색 결과를 키워드를 통해 구현

let searchData = [];

searchBtn.addEventListener("click", function () {
  // keyword 변수를 생성하여 검색창에 입력되는 값 불러오기
  const keyword = searchInput.value.trim();

  // 검색어가 입력되지 않으면 초기화면으로 돌아가게 세팅
  if (!keyword) {
    fetchMovie();
    return;
  }

  // 창고(searchAPI)에서 검색어를 기준으로 검색되게 내용 추가
  const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ko-KR&page=1`;

  // 창고 연결, 검색된 결과가 나오도록 변수 연결
  fetch(searchUrl, options)
    .then((resSearch) => resSearch.json())
    .then((data) => {
      const searchedMovies = data.results;

      // 검색 결과가 화면에 나오도록 설정
      displayMovies(searchedMovies);
    })
    .catch((errSea) => console.error(errSea));
});
