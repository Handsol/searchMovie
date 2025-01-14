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
    const { id, poster_path, title, vote_average, vote_count } = movies[i];

    // 새로운 카드 요소 생성
    const card = document.createElement("div");
    card.classList.add("movieCard");
    card.id = `movie${id}`;

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
    return fetchMovie();
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

// -----------------------------------------------------------------------
// 영화 포스터를 누르면 모달로 뜨게 구현

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

// 모달에 어떤 내용들을 넣을건지(API에서 뭘 가져올지) 정하기
function updateModal(movie) {
  const {
    title,
    original_title,
    original_language,
    backdrop_path,
    overview,
    release_date,
    vote_average,
    vote_count,
    genres,
  } = movie;

  // 가져온 내용을 HTML로 전송하여 모달 생성
  const modal = document.querySelector(".modal");

  modalBody.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${backdrop_path})`;
  modalBody.style.backgroundSize = "cover";
  modalBody.style.backgroundPosition = "center";
  modalBody.style.backgroundRepeat = "no-repeat";

  modal.querySelector(".movieInformation").innerHTML = `
    <h2>${title}</h2>
    <p><strong>원제 : </strong> ${original_title} (${original_language})</p>
    <p><strong>개봉일 : </strong> ${release_date}</p>
    <p><strong>평점 : </strong> ⭐ ${vote_average} (${vote_count}명)</p>
    <p><strong>줄거리 : </strong> ${overview}</p>
    <p><strong>장르 : </strong> ${genres
      .map((genre) => genre.name)
      .join(", ")}</p>
  `;
  // 다 가져왔으면 모달창을 띄워라!
  modal.style.display = "flex"; // 모달 표시
}

// 닫기 버튼을 누르면 모달 끄게 설정
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
