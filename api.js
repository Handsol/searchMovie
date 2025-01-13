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
    for (let i = 0; i < data.results.length; i++) {
      const { poster_path, title } = data.results[i];

      // 새로운 카드 요소 생성
      const card = document.createElement("div");
      card.classList.add("popularCard");

      // 포스터 이미지 생성
      const img = document.createElement("img");
      img.classList.add("popularPoster");
      img.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
      img.alt = `${title} 유명포스터`;

      // 제목 생성
      const titleElement = document.createElement("p");
      titleElement.classList.add("popularTitle");
      titleElement.textContent = title;

      // 카드에 추가
      card.appendChild(img);
      card.appendChild(titleElement);

      // 컨테이너에 추가
      popularContainer.appendChild(card);
    }
  })
  .catch((err) => console.error(err));

// -----------------------------------------------------------------------

// Search API

// 검색 관련은 인풋.value에 대한 필터링이 필요하기 때문에
// Data를 받아오는 명령과 뿌리는 명령 구분 필요

function searchData() {
  fetch(
    "https://api.themoviedb.org/3/search/movie?include_adult=false&language=ko-KR&page=1",
    options
  )
    .then((resSearch) => resSearch.json())
    .then((resSearch) => console.log(resSearch))
    .catch((errSea) => console.error(errSea));
}

function displayPosts() {}
searchData();
