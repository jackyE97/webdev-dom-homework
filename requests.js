import { login, setToken  } from "./api.js";
import { setUser } from "./main.js";
import { getComments } from "./request.js";
import { renderRegisterForm } from "./renderRegisterForm.js";

export const renderLoginForm = () => {
    const appHtml = document.getElementById("app");
    const loginHtml = `
      <div class="container">
        <div class="add-form">
        <div class="input-form">
          <input 
          type="text"
          id="login-input" 
          class="add-form-name"
          placeholder="Логин"
          />
          </div>
          <div class="input-form">
          <input 
          type="text"
          id="password-input"
          class="add-form-name"
          placeholder="Пароль"
          />
          </div>
          <button id="login-form-button" class="add-form-button">Войти</button>
          <button  id="register-button" class="render-register-button">Зарегистрироваться</button>
        </div>
      </div>`;
    appHtml.innerHTML = loginHtml;

    //Добавляем действие по клику на "авторизация"
    const buttonLoginElement = document.getElementById("login-form-button");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");
    const registerButtonElement = document.getElementById("register-button");

    buttonLoginElement.addEventListener("click", (event) => {
        event.preventDefault();
        if (loginInputElement.value.trim() === "" || passwordInputElement.value.trim() === "") {
            alert("Проверьте оба поля  на заполненность");
            return;
        }
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        })
            .then((responseData) => {
                localStorage.setItem("token", responseData.user.token);
                localStorage.setItem("user", JSON.stringify(responseData.user));

                setToken(responseData.user.token);
                setUser(responseData.user);
            })
            .then(() => {
                getComments();
            });
    });
    
    registerButtonElement.addEventListener("click", () => {

        renderRegisterForm()
    });
};



// import { getApi, postApi } from "./api.js";
// import { buttonElement, commentInputElement, loaderEl, loaderMessageEl, nameInputElement } from "./listeners.js";
// import { setCommentators } from "./main.js";
// import { renderCommentators } from "./render.js";

// export function getComments() {
//   getApi()
//     .then((data) => {
//       if (data === "error")
//         return;

//       const appComments = data.comments.map((commentator) => {
//         return {
//           name: commentator.author.name,
//           time: new Date(commentator.date).toLocaleString(),
//           comment: commentator.text,
//           like: commentator.likes,
//           isLiked: commentator.isLiked,
//         };
//       });

//       setCommentators(appComments);
//       renderCommentators();
//       // loaderEl.textContent = "";
//     })
// }

// export function sendComment(name, comment) {
//   postApi(name, comment)
//     .then((data) => {
//       if (data === "error") {
//         nameInputElement.value = name;
//         commentInputElement.value = comment;
//         return;
//       }

//       nameInputElement.value = "";
//       commentInputElement.value = "";

//       getComments()
//     })
//     .finally(() => {
//       loaderMessageEl.textContent = "";
//       buttonElement.disabled = false;
//       buttonElement.textContent = 'Написать';
//     })
// }
