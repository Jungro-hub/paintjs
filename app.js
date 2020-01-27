const canvas = document.getElementById("js_canvas");
const ctx = canvas.getContext("2d");
const erase = document.getElementById("js_erase");
const colors = document.getElementsByClassName("js_color");
const range = document.getElementById("js_range");
const mode = document.getElementById("js_mode");
const save = document.getElementById("js_save");

//캔버스 사이즈를 따로 지정해줘야 한다.
canvas.width = 900;
canvas.height = 600;

//디폴트 값 설정
let painting = false;
let color = "#2c2c2c";
let lineWidth = 2.5;
let filling = false;
let fillStyle = "#fff";

ctx.strokeStyle = color;
ctx.lineWidth = lineWidth;
ctx.fillStyle = fillStyle;

//마우스 움직이면 실행되는 function이며 움직이는 대로 좌표를 그린다.
//클릭중이 아니면 좌표만 찍히고 클릭중일때 라인이 그려진다.
function mouse_move(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (painting) {
    ctx.lineTo(x, y);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
}
//마우스 클릭을 떼거나 캔버스를 벗어나면 실행된다.
function stop_painting() {
  painting = false;
}
//캔버스에서 클릭시 실행된다.
function start_painting() {
  painting = true;
}

//컬러칩을 클릭하면 모든 컬러칩을 forEach문을 돌며 실행된다.
//클릭된 해당 컬러값을 stroke, fill style에 저장한다.
function handle_color(event) {
  color = String(event.target.style.backgroundColor);
  fillStyle = String(event.target.style.backgroundColor);
  ctx.strokeStyle = color;
  ctx.fillStyle = fillStyle;
}

//range 막대에 input 값의 변화가 있으면 실행되며 그 값을 linewidth에 넣어준다.
function handle_lineWidth(event) {
  lineWidth = event.target.value;
  ctx.lineWidth = lineWidth;
}

//채우기, 그리기 모드 토글 버튼이 눌리면 실행된다.
//클릭할때 마다 텍스트와 filling의 boolean 값이 바뀐다.
function handle_mode(event) {
  if (filling == true) {
    filling = false;
    mode.innerText = "Paint";
  } else {
    filling = true;
    mode.innerText = "Stroke";
  }
}

//지우기 버튼을 누르면 캔버스 전체를 지운다.
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//저장 버튼을 누르면 실행된다.
//캔버스 내의 이미지 data를 url형식으로 쏴주며, link 주소에 넣어준다.
//link 다운로드를 지정해주며 link를 마지막에 클릭한다.
function save_img() {
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = image;
  link.download = "painting";
  link.click();
}

//채우기 모드시 filling 값이 true가 되며 캔버스 전체를 색칠한다.
function fill_canvas() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

//캔버스 오른쪽 클릭을 방지한다.
function handle_cm(event) {
  event.preventDefault();
}

canvas.addEventListener("mousemove", mouse_move);
canvas.addEventListener("mousedown", start_painting);
canvas.addEventListener("mouseup", stop_painting);
canvas.addEventListener("mouseleave", stop_painting);
canvas.addEventListener("click", fill_canvas);
canvas.addEventListener("contextmenu", handle_cm);
range.addEventListener("input", handle_lineWidth);
mode.addEventListener("click", handle_mode);
erase.addEventListener("click", clear);
save.addEventListener("click", save_img);
Array.from(colors).forEach(color =>
  color.addEventListener("click", handle_color)
);

//초기화 코드 : 흰색으로 전체 칠해준다.
function init() {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
init();
