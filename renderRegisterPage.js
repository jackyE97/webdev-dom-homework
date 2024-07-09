
import { token } from "./api.js";
import { renderLogin } from "./renderLoginPage.js";
import { setToken, } from "./api.js";
import { setUser } from "./main.js";
import { register } from "./api.js";



// Рендер функция страницы регистрации 
export const renderRegister = () => {
  const registerAppHtml = document.getElementById("app");
  const registerHtml = `
  <div class="container">
  <div class="add-form">
  <p class="heading">Форма регистрации</p>
    <div class="input">
      <input type="text" id="name-input" class="add-form-input" placeholder="Имя" />
      <input type="text" id="login-input" class="add-form-input" placeholder="Логин" />
      <input type="text" id="password-input" class="add-form-input" placeholder="Пароль" />
    </div>
    <br />
    <button  id="register-button" class="register-button">Зарегистрироваться</button>
    <br />
    <button id="login-form-button" class="render-login-btn">Войти</button>
  </div>
  </div>`;
  registerAppHtml.innerHTML = registerHtml;

  const buttonLoginElement = document.getElementById("login-form-button");
  const registerButtonElement = document.getElementById("register-button");



// Функция при нажатии на кнопку регистрации 
  registerButtonElement.addEventListener("click", () => {
      const nameInnputElement = document.getElementById("name-input");
      const loginInputElement = document.getElementById("login-input");
      const passwordInputElement = document.getElementById("password-input");
      if (loginInputElement.value.trim() === "" || passwordInputElement.value.trim() === ""  || nameInnputElement.value.trim() === "" ) {
          alert("Заполните все поля");
          return

      }
      register({ //Функция регистрации пользователя
          name: nameInnputElement.value.trim(),
          login: loginInputElement.value.trim(),
          password: passwordInputElement.value.trim(),
      })
          .then((responseData) => {
              setUser(responseData.user.name);
              setToken(responseData.user.setToken);
              console.log(responseData.user.name);
              console.log(setToken);
              renderLogin();  // Переход на страницы авторизации 

          });
  });

  buttonLoginElement.addEventListener("click", () => {

      renderLogin()
  });
};

