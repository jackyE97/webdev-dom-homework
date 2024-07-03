import { init, listElement } from "./listeners.js";
import { appElement, loginButtonListerner } from "./loginPage.js";
import { renderCommentators } from "./render.js";


export let commentators = [];

export function setCommentators(data) {
  commentators = data;
}

init();

const loginLinkElement = document.querySelector('.login-link');

    loginLinkElement.addEventListener('click', () => {
      listElement.style.display = 'none';
      appElement.classList.add('add-form');
      document.querySelector('.link').style.display = 'none';
      renderLogin();
      renderCommentators();
      window.scrollTo({
        top:document.querySelector('.form'),
      });
      loginButtonListerner();
    });
