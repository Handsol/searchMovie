// fetch 된 정보를 카드UI로 만들어 display 하는 부분
function displayBannerMovies(movies) {
  bannerContainer.innerHTML = ""; // 칸을 비워주고 시작하기

  // 배너 생성 (영화는 10개만 가져오기)
  for (let i = 0; i < 10; i++) {
    const { backdrop_path, title } = movies[i];

    // 배너 요소가 들어갈 틀 만들어주기(클래스는 movieSlide)
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

    // 이미지에 클래스 부여
    img.classList.add("frontImage");
    backImg.classList.add("backImage");

    // 제목 넣기
    const caption = document.createElement("div");
    caption.classList.add("bannerCaption");
    caption.innerHTML = `<h5>${title}</h5>`;

    // 배너 요소에 이미지와 제목 삽입
    bannerItem.appendChild(img);
    bannerItem.appendChild(backImg);
    bannerItem.appendChild(caption);

    // 배너를 컨테이너에 추가
    bannerContainer.appendChild(bannerItem);
  }

  let currentIndex = 0;

  // 슬라이더가 돌아가게 하기
  function changeSlide(direction) {
    const slides = document.querySelectorAll(".movieSlide");
    slides[currentIndex].classList.remove("active");

    currentIndex = (currentIndex + direction + slides.length) % slides.length;

    slides[currentIndex].classList.add("active");
  }

  const prevButton = document.querySelector(".prevButton");
  prevButton.addEventListener("click", () => changeSlide(-1));

  const nextButton = document.querySelector(".nextButton");
  nextButton.addEventListener("click", () => changeSlide(1));
}

// fetchMovie를 실행
fetchBannerMovie();
