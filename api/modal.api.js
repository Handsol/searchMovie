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
  let voteAverage = Math.round(vote_average * 10) / 10;

  modalBody.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${backdrop_path})`;
  modalBody.style.backgroundSize = "cover";
  modalBody.style.backgroundPosition = "center";
  modalBody.style.backgroundRepeat = "no-repeat";

  modal.querySelector(".movieInformation").innerHTML = `
      <h2>${title}</h2>
      <p><strong>원제 : </strong> ${original_title} (${original_language})</p>
      <p><strong>개봉일 : </strong> ${release_date}</p>
      <p><strong>평점 : </strong> ⭐ ${voteAverage} (${vote_count}명)</p>
      <p><strong>줄거리 : <br></strong> ${overview}</p>
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

// 모달 밖을 누르면 모달 끄게 설정
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
