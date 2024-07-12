import { getComments } from "./requests.js";


export let user = JSON.parse(localStorage.getItem("user"));
export const setUser = (newUser) => {
  user = newUser;
};


// Выводим новый комментарий из сервера на нашу страницу
getComments(); 


