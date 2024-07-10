
import { getComments } from "./request.js";


export let user = JSON.parse(localStorage.getItem("user"));
export const setUser = (newUser) => {
  user = newUser;
};

// Выводим новый комментарий из сервера на страницу
getComments(); 


// import { init } from "./listeners.js";

// export let user = JSON.parse(localStorage.getItem("user"));
// export const setUser = (newUser) => {
//   user = newUser;
// };

// export let commentators = [];

// export function setCommentators(data) {
//   commentators = data;
// }

// init();