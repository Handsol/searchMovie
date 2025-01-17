// 검색어 자체를 우선 한번 비워주기
let searchData = [];

// 검색 버튼을 누르면 입력값을 가져오게 설정
searchBtn.addEventListener("click", function () {
  // keyword 변수를 생성하여 검색창에 입력되는 값 불러오기
  const keyword = searchInput.value.trim();

  // 검색어가 입력되지 않으면 초기화면으로 돌아가게 세팅
  if (!keyword) {
    return fetchMovie();
  }

  // 엔터키를 누르면 검색 버튼을 누르는 것과 같은 역할을 하게 설정
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      searchBtn.click();
    }
  });

  // 창고(searchAPI)에서 검색어를 기준으로 검색되게 내용 추가
  const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ko-KR&page=1`;

  // 창고 연결, 검색된 결과가 나오도록 변수 연결
  fetch(searchUrl, options)
    .then((resSearch) => resSearch.json())
    .then((data) => {
      const searchedMovies = data.results;

      // 검색 결과가 화면에 나오도록 설정
      displayMovies(searchedMovies);
    })
    .catch((errSea) => console.error(errSea));
});
