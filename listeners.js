import { commentators } from "./main.js";
import { renderCommentators } from "./render.js";

export const answerComment = () => {
    const commentInputElement = document.getElementById("comment-input");
    const commentsElements = document.querySelectorAll('.comment');
    for (const commentElement of commentsElements) {
      commentElement.addEventListener('click', (e) => {

        const index = commentElement.dataset.index;
        console.log(index)
        if (index !== null) {
          const commentator = commentators[index];
          commentInputElement.value = `> ${commentator.comment} \n ${commentator.name}.,`;
          renderCommentators();
          const styleQuote = document.querySelectorAll(".quote");
        }
      });
    }
  };


 export const initEventListeners = () => {
    const commentElements = document.querySelectorAll('.comment');
  
    for (const commentElement of commentElements) {
      commentElement.addEventListener('click', () => {
      });
    }

    for (const likeButton of document.querySelectorAll('.like-button')) {
      likeButton.addEventListener("click", (event) => {
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