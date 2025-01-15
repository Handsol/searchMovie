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
    const { id, poster_path, title } = movies[i];

    // 새로운 카드 요소 생성
    const card = document.createElement("div");
    card.classList.add("movieCard");
    card.id = `movie${id}`;
    card.style.backgroundSize = "cover";

    // 포스터 이미지 생성
    const img = document.createElement("img");
    img.classList.add("moviePoster");
    img.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
    img.alt = `${title} 유명포스터`;

    // 포스터, 제목, 평점을 카드에 추가
    card.appendChild(img);

    // 카드를 컨테이너에 추가
    movieContainer.appendChild(card);
  }
}

// fetchMovie를 실행
fetchMovie();
