import { database } from "./request.js";



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