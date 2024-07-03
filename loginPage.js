import { login, setToken, token } from "./api.js";
import { regNewUser } from "./reg.js";
import { renderCommentators } from "./render.js";
import { getComments } from "./requests.js";


export const renderLogin = () => {
  const appHtml = document.getElementById("app")
    const loginHTML = `
      <h3 class="form-title">Форма входа</h3>
      <div class="form-row">
        <input type="text" class="input login-input" placeholder="Логин" />
        <input
          type="text"
          class="input password-input"
          placeholder="Пароль"
        />
      </div>
      <br />
      <button class="button login-button">Войти</button>
      <a href="index.html" id="link-to-tasks">Главная страница</a>
      <button class="button reg-button">Регистрация</button>
    </div>`
    appHtml.innerHTML = loginHTML;
    loginButtonListerner();
    regButtonListener();
};


export function loginButtonListerner () {
  const loginButtonElement = document.querySelector('.login-button');
  const loginInputElement = document.querySelector('.login-input');
  const passwordInputElement = document.querySelector('.password-input');

  loginButtonElement.addEventListener('click', () => {
      login({ 
          login: loginInputElement.value,
          password: passwordInputElement.value,
      }).then((responseData) => {
          setToken(responseData.user.token);
          console.log(token);
  }).then (() => {
    renderCommentators();
  })
});
};

function regButtonListener () {
  const regBtn = document.querySelector(".reg-button")
  regBtn.addEventListener("click", () => {
    regNewUser();
  } )
}



