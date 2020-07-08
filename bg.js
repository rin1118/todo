const body = document.querySelector("body"); //body 요소를 얻어와서 넣어줌

const IMG_NUMBER = 3; //이미지 번호 초기화

function paintImage(imgNumber) {
  //html에 이미지 표시
  const image = new Image(); //image 객체 생성
  image.src = `IMG/${imgNumber + 1}.jpg`; //이미지의 경로 지정, imgNumber + 1은 랜덤 번호가 0부터 시작해서 1을 더해줌
  image.classList.add("bgImage"); //클래스(bgImage) 추가
  body.prepend(image); //html의 body에 이미지를 붙여넣음
}

function genRandom() {
  //랜덤 번호 생성
  const number = Math.floor(Math.random() * IMG_NUMBER); //(math.random() * img_number) -> 0~3까지의 랜덤 번호 생성, math.floor를 감싸 소숫점 뒷자리를 버림
  return number; //함수를 실행하면 랜덤 번호를 return
}

function init() {
  const randomNumber = genRandom(); //genRandom() 함수에서 얻어온 랜덤 값을 변수에 넣어줌
  paintImage(randomNumber); //paintImage() 함수에 랜덤 값을 넣고 실행
}

init();
