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
    const backImg = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w1280${backdrop_path}`;
    backImg.src = `https://image.tmdb.org/t/p/w1280${backdrop_path}`;
    img.alt = `${title} 상영포스터`;
    img.classList.add("d-block", "w-100");

    // 제목 넣기
    const caption = document.createElement("div");
    caption.classList.add("bannerCaption", "d-none", "d-md-block");
    caption.innerHTML = `<h5>${title}</h5>`;

    // 배너 아이템에 이미지와 제목 삽입
    bannerItem.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280/${backdrop_path})`;
    bannerItem.appendChild(img);
    bannerItem.appendChild(backImg);
    bannerItem.appendChild(caption);

    // 카드를 컨테이너에 추가
    bannerContainer.appendChild(bannerItem);
  }
}

// fetchMovie를 실행
fetchBannerMovie();
