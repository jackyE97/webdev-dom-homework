import { setToken, } from "./api.js";
import { setUser } from "./main.js";
import { renderLoginForm, } from "./renderLoginForm.js";
import { register } from "./api.js";
import { safeMode, successfully } from "./helpers.js";


// Рендер функция страницы регистрации 
export const renderRegisterForm = () => {
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
            name: safeMode(nameInnputElement.value.trim()),
            login: safeMode(loginInputElement.value.trim()),
            password: safeMode(passwordInputElement.value.trim()),
        })
            .then((responseData) => {
                setUser(responseData.user.name);
                setToken(responseData.user.setToken);
                console.log(responseData.user.name);
                console.log(setToken);
                successfully();  // Функция уведомления пользователя о регистрации
                renderLoginForm();  // Переход на страницу авторизации 

            });
    });

    buttonLoginElement.addEventListener("click", () => {

        renderLoginForm()
    });
};





// import {  login, setToken  } from "./api.js";
// import { renderRegister} from "./renderRegisterPage.js";
// import { getComments } from "./requests.js";
// import { setUser } from "./main.js";


// export const renderLogin = () => {
//   const appHtml = document.getElementById("app");
//   const loginHtml = `
//     <div class="container">
//       <div class="add-form">
//       <div class="input-form">
//         <input 
//         type="text"
//         id="login-input" 
//         class="add-form-name"
//         placeholder="Логин"
//         />
//         </div>
//         <div class="input-form">
//         <input 
//         type="text"
//         id="password-input"
//         class="add-form-name"
//         placeholder="Пароль"
//         />
//         </div>
//         <button id="login-form-button" class="add-form-button">Войти</button>
//         <button  id="register-button" class="render-register-button">Зарегистрироваться</button>
//         <a hre  id="main-page" class="main-page">На главную</a>
//       </div>
//     </div>`;
//   appHtml.innerHTML = loginHtml;

//   //Добавляем действие по клику на "авторизация"
//   const loginButtonElement = document.getElementById("login-form-button");
//   const loginInputElement = document.getElementById("login-input");
//   const passwordInputElement = document.getElementById("password-input");
//   const registerButtonElement = document.getElementById("register-button");

//   loginButtonElement.addEventListener("click", (event) => {
//       event.preventDefault();
//       if (loginInputElement.value.trim() === "" || passwordInputElement.value.trim() === "") {
//           alert("Проверьте оба поля  на заполненность");
//           return;
//       }
//       login({
//           login: loginInputElement.value,
//           password: passwordInputElement.value,
//       })
//           .then((responseData) => {
//               localStorage.setItem("token", responseData.user.token);
//               localStorage.setItem("user", JSON.stringify(responseData.user));

//               setToken(responseData.user.token);
//               setUser(responseData.user);
//           })
//           .then(() => {
//               getComments();
//           });
//   });
  
//   registerButtonElement.addEventListener("click", () => {

//       renderRegister()
//   });
// };