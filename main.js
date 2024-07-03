import { init } from "./listeners.js";
import { loginButtonListerner } from "./loginPage.js";


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
      fetchAndRenderComments();
      window.scrollTo({
        top:document.querySelector('.form'),
      });
      loginButtonListerner();
    });
