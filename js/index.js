// api를 가져올 옵션
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmFmOWM2MTljZWY3YTVmNmJlZmJkNzc0ZDIwMmZkOCIsIm5iZiI6MTczNjMxODE4MS4yMjU5OTk4LCJzdWIiOiI2NzdlMWNlNTYwMWFjZmU3YmQ0ZTVkMWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7LW9uAEtLVOnToPstggCU2IoZYWezpWFT7Y6Y3I4K0Q",
  },
};

// header, nowPlaying, search, popularMovie
const bannerContainer = document.querySelector(".bannerContainer");
const bannerLeftBtn = document.querySelector(".bannerLeft");
const bannerRightBtn = document.querySelector(".bannerRight");
const movieContainer = document.querySelector(".movieContainer");
const movieCard = document.querySelector(".movieCard");
const searchBtn = document.querySelector(".searchBtn");
const searchInput = document.querySelector(".searchMovie");
const modal = document.querySelector(".modal");
const modalBody = document.querySelector(".modalBody");
const movieInformation = document.querySelector(".movieInformation");
const openModal = document.querySelector(".openModal");

// 검색창에서 검색어 입력 후 엔터키를 누르면 인식하게 설정
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});
