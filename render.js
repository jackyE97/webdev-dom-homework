import { token } from "./api.js";
import { handleAnswerComment, handleLikeButtons } from "./listeners.js";
import { renderLoginForm } from "./loginPage.js";
import { commentators, user } from "./main.js";
import { sendComment } from "./requests.js";


export const renderCommentators = () => {
  const appHtml = document.getElementById("app");
  const listElement = document.getElementById("list");
  const commentatorsHtml = commentators
    .map((commentator, index) => {
      return `<li class="comment" data-index="${index}" data-name="${commentator.name}">
        <div class="comment-header">
          <div>${commentator.name.replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")}</div>
          <div>${commentator.time}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${commentator.comment.replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll('QUOTE_BEGIN', "<div class='quote'>")
          .replaceAll('QUOTE_END', "</div>")}
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${commentator.like}</span>
            <button data-like="${index}" data-index="${index}" class="like-button ${commentator.isLiked ? '-active-like' : ''}"></button>
          </div>
        </div>
      </li>`;
    })
    .join("");

  listElement.innerHTML = commentatorsHtml;

    //Форма ввода комментария
    const contentHtml = () => {

      const btnLogin = `
      <p >  Чтобы добавить комментарий, 
      <a id="render-login-btn" class="authorization">авторизуйтесь</a> </p>`;
  
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
    const buttonLoginElement = document.getElementById("render-login-btn");
    if (!buttonLoginElement) {
      return;
    }
    buttonLoginElement.addEventListener("click", (event) => {
      event.preventDefault();
      renderLoginForm();
    });
  };
  
  if (token) {
    exit();
     
  handleLikeButtons();    // Функция Лайков
  
  handleLikeButtons();         // Функция ответа на комментарии
  sendComment();           // Функция публикация постов
   
  }else {
    setLoginBtn();
  }
  

  handleAnswerComment();
  handleLikeButtons();
};



// функция выхода авторизованного пользователя
function exit() {
  const exitButton = document.getElementById("exit-button");
  exitButton?.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    renderLoginForm();
  });
};
// сохранения данных 

export function saveFormData() {
  
const textArea = document.getElementById("text-input");

  localStorage.setItem("comment", textArea.value);
};


