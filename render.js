import { handleLikeButtons, replyComments } from "./listeners.js";
import { database, publish,  } from "./request.js";
import { listElement } from "./api.js";



export function renderComments() {
  const appHtml = document.getElementById("app");
  listElement.innerHTML = database.map((comment, index) => {
    const classButton = comment.isLiked ? "-active-like" : ""
    return `<li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.time}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text" data-index="${index}" >
              ${comment.review}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter" data-index="${index}">${comment.likeCount}</span>
              <button class="like-button ${classButton}" data-index="${index}"></button>
            </div>
          </div>
        </li>`

  }).join("");


  appHtml.innerHTML = contentHtml();

  
//Переход к форме авторизации по клику
const setLoginButton = () => {
  const buttonLoginElement = document.getElementById("render-login-btn");
  if (!buttonLoginElement) {
    return;
  }
  buttonLoginElement.addEventListener("click", (event) => {
    event.preventDefault();
    renderLoginForm();
  });
};


// Функция выхода для авторизованного пользователя
function exit() {
  const exitButton = document.getElementById("exit-button");
  exitButton?.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    renderLoginForm();
  });
};


// Функция сохранения данных 
export function saveFormData() { 
  
const textArea = document.getElementById("text-input");

  localStorage.setItem("comment", textArea.value);
};


 export function onRender() {
  const textArea = document.getElementById("text-input");
  if (localStorage.getItem("comment")) {
    textArea.value = localStorage.getItem("comment");
  }
};
}