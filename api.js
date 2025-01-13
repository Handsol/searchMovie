// Now Playing API

// fetch(
//   "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1",
//   options
// )
//   .then((resNowPlaying) => resNowPlaying.json())
//   .then((resNowPlaying) => console.log(resNowPlaying))
//   .catch((errNow) => console.error(errNow));

// -----------------------------------------------------------------------

let searchData = [];

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
    voteElement.textContent = `평점 : ${voteAverage} (${vote_count})`;

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

// featchData를 통해 불러온 데이터 중에서 filter를 통해 검색결과 구현
searchBtn.addEventListener("click", function () {
  const keyword = searchInput.value;
  const searchedMovies = searchData.filter(function (movie) {
    return movie.title.includes(keyword);
  });
  console.log("잘 검색됐니? ", searchedMovies);
  displayMovies(searchedMovies);
});

// -----------------------------------------------------------------------

// 검색을 위해 접근할 수 있도록 데이터를 배열로 선언.

// 검색을 위한 데이터 불러오고, 배열로 나갈 수 있도록 설정.
// fetch(
//   "https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=ko-KR&page=1",
//   options
// )
//   .then((resSearch) => resSearch.json())
//   .then((searchDatas) => {
//     searchData = searchDatas.data;
//     console.log("잘 검색됐니? ", searchDatas);
//   })
//   .catch((errSea) => console.error(errSea));

// 검색 버튼이 검색창에 들어가는 내용을 가져오도록 설정.
// searchBtn.addEventListener("click", function () {
//   const keyword = searchInput.value;
//   const searchedMovies = searchData.filter(function (movie) {
//     return movie.title.includes(keyword);
//   });
//   console.log("잘 검색됐니? ", searchedMovies);
//   displayMovies(searchedMovies);
// });
