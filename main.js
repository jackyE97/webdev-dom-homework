import { init } from "./listeners.js";

export let commentators = [];

export function setCommentators(data) {
  commentators = data;
}

export let user = JSON.parse(localStorage.getItem("user"));
export const setUser = (newUser) => {
  user = newUser;
};

init();