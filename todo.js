const toDoForm = document.querySelector(".js-toDoForm"), //html의 클래스 js-toDoForm을 가져와서 todoForm 안에 넣어줌
  toDoInput = toDoForm.querySelector("input"), //js-toDoForm의 input 요소를 toDoInput에 넣어줌
  toDoList = document.querySelector(".js-toDoList"); //html의 클래스 js-toDoList를 가져와서 toDoList에 넣어줌

const notTodo = document.getElementById("notTodo");
const TODOS_LS = "toDos"; //유저의 로컬스토리지에 할일리스트를 저장할 키 이름

let toDos = []; //할일을 저장할 배열

function saveToDos() {
  //할일을 유저의 로컬스토리지에 저장하는 함수
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //로컬스토리지는 string 형태만 저장이 가능해서 object 형식을 string 형식으로 변환해서 저장
}

function deleteToDo(event) {
  //삭제버튼을 누르면 html 상에서 li를 제거하는 함수
  const btn = event.target; //event.target은 이벤트가 일어난 요소를 알려줌
  const li = btn.parentNode; //클릭 이벤트가 일어난 삭제 버튼의 부모 li를 알려줌
  toDoList.removeChild(li); //ul에서 클릭 이벤트가 일어난 삭제 버튼의 부모 li를 지움

  const cleanToDos = toDos.filter(function (toDo) {
    //삭제된 할일을 제외한 새로운 할일 리스트를 로컬스토리지에 저장해주는 함수
    return toDo.id !== parseInt(li.id); //filter 함수는 조건에 맞는 요소들을 배열로 새로 생성(html상에서 삭제되지않은 todo들만 모아서 배열로 새로 만들어줌)
  });
  toDos = cleanToDos; //삭제된 할일을 제외한 할일 리스트를 toDos(할일을 저장하는 배열)에 넣어줌
  saveToDos(); //로컬스토리지에 저장

  const item = document.querySelectorAll(".toDo");
  if (item.length == 0) {
    const notTodo = document.getElementById("notTodo");
    notTodo.style.display = "block";
  }
}

function paintToDo(text) {
  //html에 할일을 표시해주는 함수

  notTodo.style.display = "none";
  const li = document.createElement("li"); //html에 li요소를 생성
  const delBtn = document.createElement("button"); //html에 버튼요소를 생성
  const span = document.createElement("span"); //html에 span요소 생성
  const newId = toDos.length + 1; //배열안의 요소에 id값을 매겨줌

  delBtn.innerHTML = "✅";
  delBtn.addEventListener("click", deleteToDo); //삭제버튼을 클릭했을 때 deleteToDo 함수실행

  span.innerText = text; //span에 input창의 text를 붙여넣어줌 (handleSubmit함수 54번째~55번째)
  li.appendChild(span); //li의 자식요소로 span을 추가해줌
  li.appendChild(delBtn); //li의 자식요소로 delbtn을 추가해줌
  li.id = newId;
  li.className = "toDo";
  toDoList.appendChild(li); //ul의 자식요소로 li를 추가해줌

  const toDoObj = {
    //toDoObj 객체 생성
    text: text,
    id: newId,
  };
  toDos.push(toDoObj); //할일을 저장하는 배열에 객체 넣어주기
  saveToDos(); //로컬스토리지에 저장
}

function handleSubmit() {
  event.preventDefault(); //submit 이벤트 막기 (창 넘어가는거)
  const currentValue = toDoInput.value; //input창에 입력된 할일의 값을 가져와 currentValue에 넣어줌
  paintToDo(currentValue); //html에 입력된 할일을 추가해줌
  toDoInput.value = ""; //초기화
}

function something(toDo) {
  console.log(toDo.text);
  paintToDo(toDo.text);
}

function loadToDos() {
  //로컬스토리지에 입력된 모든 할일을 화면에 표시해줌
  const loadedToDos = localStorage.getItem(TODOS_LS); //로컬스토리지의 TODOS_LS(키)의 값을 가져와 넣어줌
  console.log(loadedToDos);
  if (loadedToDos) {
    //TODOS_LS(키)의 값이 null이 아니면
    const parsedToDos = JSON.parse(loadedToDos); //loadedToDos를 object 형식으로 변환해줌
    console.log(parsedToDos.length);
    if (parsedToDos.length == 0) {
      notTodo.style.display = "block";
    }
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text); //할일의 수만큼 반복해서 paintToDo 함수를 실행
    });
  }
}

function init() {
  //초기화함수
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit); //toDoForm에 submit이 일어났을 때 이벤트를 발생
}

init();
