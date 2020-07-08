



const title = document.querySelector("#title");

const clicked_class = "clicked";


/*
function handleClick(){

    //clicked_class가 존재하면 true를 반환해줌
    const hasClass = title.classList.contains(clicked_class);

    if(!hasClass){
        title.classList.add(clicked_class);
    } else { 
        title.classList.remove(clicked_class);
    }

}
*/


function handleClick(){

    //toggle - 클래스를 체크해서 있으면 remove, 없으면 add
    title.classList.toggle(clicked_class);

}


function init() {
    title.addEventListener("click", handleClick);
}

init();