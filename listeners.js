import { commentators } from "./main.js";
import { renderCommentators } from "./render.js";
import { getComments, sendComment } from "./requests.js";


export const buttonElement = document.getElementById("add-button");
export const listElement = document.getElementById("list");
export const nameInputElement = document.getElementById("name-input");
export const commentInputElement = document.getElementById("comment-input");
export const commentElements = document.querySelectorAll('.comment');
export const loaderEl = document.getElementById("loader");
export const loaderMessageEl = document.getElementById('loader-message');
export const addForm = document.getElementById("add-form");

export const init = () => {
  loaderEl.innerHTML = "Комментарии загружаются..."

  getComments();

  handleFormActions();
}

//ответы на комменты
export const handleAnswerComment = () => {
  const commentInputElement = document.getElementById("comment-input");
  const commentsElements = document.querySelectorAll('.comment');

  for (const commentElement of commentsElements) {
    commentElement.addEventListener('click', (e) => {
      const index = commentElement.dataset.index;

      if (index !== null) {
        const commentator = commentators[index];
        commentInputElement.value = `> ${commentator.comment} \n ${commentator.name}.,`;

        renderCommentators();
      }
    });
  }
};

//лайки
export const handleLikeButtons = () => {
  for (const likeButton of document.querySelectorAll('.like-button')) {
    likeButton.addEventListener("click", (event) => {
      if(!token) {
        alert("Нужно авторизироваться")
        return
      }
      event.stopPropagation();
      const index = likeButton.dataset.index;
      const commentator = commentators[index];
      commentator.like = commentator.isLiked
        ? commentator.like - 1
        : commentator.like + 1;
      commentator.isLiked = !commentator.isLiked;

      renderCommentators();
    });
  }
};

const handleFormActions = () => {
  // очистка формы после отправки комментария
  const form = document.getElementById('myForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.reset();
  });

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
    const name = nameInputElement.value;
    const comment = commentInputElement.value;

    buttonElement.disabled = true;
    loaderMessageEl.innerHTML = "комментарий добавляется..."

    sendComment(name, comment)
  });
}
