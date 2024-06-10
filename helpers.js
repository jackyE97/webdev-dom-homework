const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");

export const  saveValue = () => {

const nameValue = nameInputElement.value;
const commentValue = commentInputElement.value;

buttonElement.disabled = true;
loaderMessageEl.innerHTML = "комментарий добавляется..."

};
