import { handleAnswerComment, handleLikeButtons } from "./listeners.js";
import { commentators } from "./main.js";


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

  handleAnswerComment();
  handleLikeButtons();
};