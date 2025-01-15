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

// fetch 된 정보를 카드UI로 만들어 display 하는 부분
function displayBannerMovies(movies) {
  bannerContainer.innerHTML = ""; // 일단 비워주기

  const maxMovies = Math.min(movies.length, 10);

  for (let i = 0; i < maxMovies; i++) {
    const { backdrop_path, title } = movies[i];

    // 배너 요소 생성
    const bannerItem = document.createElement("div");
    bannerItem.classList.add("movieSlide");
    // 배너에 아무것도 없을때 첫번째 요소 불러오기
    if (i === 0) bannerItem.classList.add("active");

    // 배너에 넣을 포스터 이미지
    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w1280${backdrop_path}`;
    img.alt = `${title} 상영포스터`;
    img.classList.add("d-block", "w-100");

    // 제목 넣기
    const caption = document.createElement("div");
    caption.classList.add("bannerCaption", "d-none", "d-md-block");
    caption.innerHTML = `<h5>${title}</h5>`;

    // 배너 아이템에 이미지와 제목 삽입
    bannerContainer.appendChild(img);
    bannerItem.appendChild(img);
    bannerItem.appendChild(caption);

    // 카드를 컨테이너에 추가
    bannerContainer.appendChild(bannerItem);
  }
}

// fetchMovie를 실행
fetchBannerMovie();
