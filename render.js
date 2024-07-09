import { handleAnswerComment, handleLikeButtons } from "./listeners.js";
import { commentators } from "./main.js";
import { renderLogin } from "./renderLoginPage.js";


export const renderCommentators = () => {
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


//Переход к форме авторизации по клику
const setLoginBtn = () => {
  const loginButtonElement = document.getElementById("render-login-btn");
  if (!loginButtonElement) {
    return;
  }
  loginButtonElement.addEventListener("click", (event) => {
    event.preventDefault();
    renderLogin();
  });
};

if (token) {
  // exit();
   
handleLikeButtons(); // Функция Лайков

handleAnswerComment(); // Функция ответа на комментарии
 
}else {
  setLoginBtn();
}
};


// // функция выхода авторизованного пользователя
// function exit() {
//   const exitButton = document.getElementById("exit-button");
//   exitButton?.addEventListener("click", () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     renderLogin();
//   });
// };
