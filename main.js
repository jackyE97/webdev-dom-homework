import { getApi, postApi } from "./api.js";
import { initEventListeners } from "./listeners.js";
import { renderCommentators } from "./render.js";

const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const commentElements = document.querySelectorAll('.comment');
const loaderEl = document.getElementById("loader");
const loaderMessageEl = document.getElementById('loader-message');
const addForm = document.getElementById("add-form");

export let commentators = [];


//GET

loaderEl.innerHTML = "Комментарии загружаются..."
function getComments() {
  getApi()
    .then((resData) => {
      const appComments = resData.comments.map((commentator) => {
        return {
          name: commentator.author.name,
          time: new Date(commentator.date).toLocaleString(),
          comment: commentator.text,
          like: commentator.likes,
          isLiked: commentator.isLiked,
        };
      });
      commentators = appComments;
      renderCommentators();
      loaderEl.textContent = "";
    }).catch((error) => {
      if (error.message === "Сервер упал") {
        alert("Сервер упал");
        return;
      };
    });
}
getComments();


//ОБРАБОТЧИК КНОПКИ НАПИСАТЬ КОММЕНТАРИЙ//

buttonElement.addEventListener("click", () => {
  nameInputElement.classList.remove("error");
  commentInputElement.classList.remove("error");
  if (nameInputElement.value.trim() === "") {

    nameInputElement.classList.add("error");
    return;
  }
  if (commentInputElement.value.trim() === "") {
    commentInputElement.classList.add("error");
    return;
  }

  // сохранить значения полей ввода

  const nameValue = nameInputElement.value;
  const commentValue = commentInputElement.value;

  buttonElement.disabled = true;
  loaderMessageEl.innerHTML = "комментарий добавляется..."

  postApi(nameValue, commentValue)
    .then((result) => {
      nameInputElement.value = "";
      commentInputElement.value = "";
      getComments()
    }).catch((error) => {
      nameInputElement.value = nameValue;
      commentInputElement.value = commentValue;
      if (error.message === "Failed to fetch") {
        alert("Проверьте интернет")
      }
      else {
        alert(error.message)
      }
    }).finally(() => {
      loaderMessageEl.textContent = "";
      buttonElement.disabled = false;
      buttonElement.textContent = 'Написать';
    })
});


////ЛАЙКИ/////
initEventListeners()


// очищаем форму после отправки заполненного комментария
const form = document.getElementById('myForm');
form.addEventListener('submit', (e) => {
  e.preventDefault(); 
  e.target.reset();
});

initEventListeners();
renderCommentators();