import { init } from "./listeners.js";

export let commentators = [];

export function setCommentators(data) {
  commentators = data;
}

init();