import { getApi, postApi } from "./api.js";
import { buttonElement, commentInputElement, loaderEl, loaderMessageEl, nameInputElement } from "./listeners.js";
import { setCommentators } from "./main.js";
import { renderCommentators } from "./render.js";

export function getComments() {
  getApi()
    .then((data) => {
      if (data === "error")
        return;

      const appComments = data.comments.map((commentator) => {
        return {
          name: commentator.author.name,
          time: new Date(commentator.date).toLocaleString(),
          comment: commentator.text,
          like: commentator.likes,
          isLiked: commentator.isLiked,
        };
      });

      setCommentators(appComments);
      renderCommentators();
      // loaderEl.textContent = "";
    })
}

export function sendComment(name, comment) {
  postApi(name, comment)
    .then((data) => {
      if (data === "error") {
        nameInputElement.value = name;
        commentInputElement.value = comment;
        return;
      }

      nameInputElement.value = "";
      commentInputElement.value = "";

      getComments()
    })
    .finally(() => {
      loaderMessageEl.textContent = "";
      buttonElement.disabled = false;
      buttonElement.textContent = 'Написать';
    })
}
