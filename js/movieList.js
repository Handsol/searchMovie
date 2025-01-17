// movieContainer에 이벤트 리스너를 추가하여 포스터가 눌리는지 인식
movieContainer.addEventListener("click", function (event) {
  const target = event.target;

  // 클릭된 객체가 영화포스터인지 확인하고, 맞으면 ID를 불러와 API 호출
  if (target.classList.contains("moviePoster")) {
    const movieId = target.closest(".movieCard").id.replace("movie", ""); // ID에서 숫자만 추출
    fetchMovieInfo(movieId);
  }
});

function displayMovies(movies) {
  // 무비컨테이너 한번 비워줘야함 //
  movieContainer.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    const { id, backdrop_path, title } = movies[i];

    // 새로운 카드 요소 생성
    const card = document.createElement("div");
    card.classList.add("movieCard");
    card.id = `movie${id}`;

    // 포스터 이미지 생성
    const img = document.createElement("img");
    img.classList.add("moviePoster");
    img.src = `https://image.tmdb.org/t/p/w780${backdrop_path}`;
    img.alt = `${title} 유명포스터`;

    // 영화 제목 생성
    const movieTitle = document.createElement("div");
    movieTitle.classList.add("movieTitle");
    movieTitle.textContent = title;

    // 포스터와 제목을 카드에 추가
    card.appendChild(img);
    card.appendChild(movieTitle);

    // 카드를 컨테이너에 추가
    movieContainer.appendChild(card);
  }
}

// fetchMovie를 실행
fetchMovie();
