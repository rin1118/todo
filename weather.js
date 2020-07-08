const weather = document.querySelector(".js-weather");

const apiKey = "5eb0f83bf3de5962f93a73367640420f";
const COORDS = "coords";

function getWeather(lat, lon) {
  //날씨를 얻어오는 함수, 위도와 경도 받아오기
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);
      const temperature = json.main.temp;
      const place = json.name;
      console.log(temperature);
      console.log(place);
      weather.innerText = `📍 ${place} ${temperature}도`;
    });
}

function saveCoords(coordeObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordeObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude; //위도 넣어주기
  const longitude = position.coords.longitude; //경도 넣어주기
  const coordeObj = {
    latitude, //객체의 키와 값이 같으면 obj = {latitude, longitude} 이렇게 써도됨
    longitude,
  };
  saveCoords(coordeObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("위치 정보를 읽을 수 없음ㅠㅠ");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError); //navigator.geolocation.getCurrentPosition(좌표를 얻어온 후 실행할 함수, 실패했을 때 함수))
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if (loadedCords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
