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
