
import { register, setToken, token } from "./api.js"
import { renderLoginForm } from "./loginPage.js";
import { setUser } from "./main.js";
import { safeMode } from "./helpers.js";


// Рендер функция страницы регистрации 
 export function renderRegForm() {
    if(token) return
    const appRendering = document.getElementById("app");

  const regHtml = `<h1>Страница регистрации</h1>
  <div class="form">
    <h3 class="form-title">Форма регистрации</h3>
    <div class="form-row">
    <input type="text" id="name-input" class="input" placeholder="Имя" />
    <input type="text" id="login-input" class="input" placeholder="Логин" />
      <input type="text" id="password-input" class="input" placeholder="Пароль"/>
      <br />
      <button  id="register-button" class="register-button">Зарегистрироваться</button>
      <br />
      <button id="login-form-button" class="render-login-btn">Войти</button>
    </div>
  </div>`

  appRendering.innerHTML = regHtml

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
      name: safeMode(nameInnputElement.value.trim()),
      login: safeMode(loginInputElement.value.trim()),
      password: safeMode(passwordInputElement.value.trim()),
  })
      .then((responseData) => {
          setUser(responseData.user.name);
          setToken(responseData.user.setToken);
          console.log(responseData.user.name);
          console.log(setToken);
          renderLoginForm();  // Переход на страницы авторизации 

      });
});

buttonLoginElement.addEventListener("click", () => {

  renderLoginForm()
});
};


