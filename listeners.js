import { database } from "./requests.js";
import { renderComments, saveFormData, onRender } from "./render.js";
import { token } from "./api.js";


export const replyComments = () => {
    
    const answerComments = document.querySelectorAll(".comment");
    for (const answer of answerComments) {
        answer.addEventListener('click', (event) => {
            event.stopPropagation();
            const index = answer.dataset.index;
            console.log("index: ", index);
            const reviewInputElement = document.getElementById('text-input');
            reviewInputElement.value =
                `${database[index].review}:  ${database[index].name} \n`;

        });
    }
};


export function handleLikeButtons() {
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', (event) => {
            event.stopPropagation();
            if (!token) {
                alert("autorize");
                return;
              }
            const index = likeButtonElement.dataset.index
            if (database[index].isLiked) {
                database[index].isLiked = !database[index].isLiked
                database[index].likeCount--
            } else {
                database[index].isLiked = !database[index].isLiked
                database[index].likeCount++
            };
            saveFormData(); // Сохранения данных при отправке формы
            renderComments(); //Комменты
            onRender();  // После рендер заполняем форму данными из localStorage
        });
    };
};