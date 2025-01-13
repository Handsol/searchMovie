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
const nowPlayingContainer = document.querySelector(".nowPlayingContainer");
const nowPlayingCard = document.querySelector(".nowPlayingCard");
const popularContainer = document.querySelector(".popularContainer");
const popularCard = document.querySelector(".popularCard");
const searchBtn = document.querySelector(".searchBtn");
const searchInput = document.querySelector(".searchMovie");

searchBtn.addEventListener("click", function () {
  console.log("searchInput => ", searchInput.value);
});
