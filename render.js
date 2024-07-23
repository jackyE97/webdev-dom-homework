import { handleLikeButtons, replyComments } from "./listeners.js";
import { database, publish,  } from "./requests.js";
import { listElement, token, getToken } from "./api.js";
import { user  } from "./main.js";
import { renderLoginForm } from "./renderLoginForm.js";



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


  //Форма ввода комментария
  const contentHtml = () => {

   //авторизация
    const btnLogin = ` 
    <p >  Чтобы добавить комментарий, 
    <a id="render-login-btn" class="authorization">авторизируйтесь</a></p>`;

//если авторизирован возможность добавить комментарий
    if (!token)
      return `<ul id="list" class="comments">${listElement.innerHTML}</ul>
     ${btnLogin}`;
    return `<ul id="list" class="comments">${listElement.innerHTML}</ul>
    <div id="add-form" class="add-form">
      <input id="name-input" value="${user.name}"  readonly type="text" class="add-form-name" placeholder="Введите ваше имя" />
      <textarea id="text-input" type="textArea" class="add-form-text" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
      <div class="add-form-row">
        <button id="exit-button" class="add-form-button">Выйти</button>
        <button id="add-form-button" class="add-form-button">Написать</button>
        </div>
    </div>
    `;
  };

  appHtml.innerHTML = contentHtml();
  
//Переход к форме авторизации по клику
const setLoginBtn = () => {
  const loginButtonElement = document.getElementById("render-login-btn");
  if (!loginButtonElement) {
    return;
  }
  loginButtonElement.addEventListener("click", (event) => {
    event.preventDefault();
    renderLoginForm();
  });
};

if (token) {
  exit();
  handleLikeButtons(); // Функция Лайков
  replyComments(); // Функция ответа на комментарии
  publish(); // Функция публикация постов
 }else {
  setLoginBtn();
}
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
