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

// 모달 밖을 누르면 모달 끄게 설정
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
