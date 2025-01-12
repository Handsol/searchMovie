// Now Playing API
fetch(
  "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1",
  options
)
  .then((resNowPlaying) => resNowPlaying.json())
  .then((resNowPlaying) => console.log(resNowPlaying))
  .catch((errNow) => console.error(errNow));

// -----------------------------------------------------------------------

// Popular API
fetch(
  "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
  options
)
  .then((res) => res.json())
  .then((data) => {
    data.results.forEach((popularMovie) => {
      const { poster_path, title } = popularMovie;

      // 템플릿 카드 복사
      const card = popularCard.cloneNode(true);
      card.classList.remove("template");

      // 데이터 삽입
      card.querySelector(
        ".popularPoster"
      ).src = `https://image.tmdb.org/t/p/w500${poster_path}`;
      card.querySelector(".popularPoster").alt = `${title} 유명포스터`;
      card.querySelector(".popularTitle").textContent = title;

      // 카드 추가
      popularContainer.appendChild(card);
    });

    // 템플릿 카드 제거 (루프 이후)
    popularCard.remove();
  })
  .catch((err) => console.error(err));

// -----------------------------------------------------------------------

// Search API
fetch(
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=ko-KR&page=1",
  options
)
  .then((resSearch) => resSearch.json())
  .then((resSearch) => console.log(resSearch))
  .catch((errSea) => console.error(errSea));
