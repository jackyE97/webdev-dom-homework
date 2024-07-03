
import { token } from "./api.js"
import { renderLogin } from "./loginPage.js"



 export function regNewUser() {
    if(token) return
    const appRendering = document.getElementById("app")

  const regHtml = `<h1>Страница регистрации</h1>
  <div class="form">
    <h3 class="form-title">Форма регистрации</h3>
    <div class="form-row">
    <input type="text" id="name-reg-input" class="input" placeholder="Введите ваше имя" />
    <input type="text" id="login-reg-input" class="input" placeholder="Введите логин" />
      <input
        type="text"
        id="password-reg-input"
        class="input"
        placeholder="Введите пароль"
      />
      <button class="button-reg-user">Зарегистрироваться</button>
    </div>
    <br />
  </div>`

  appRendering.innerHTML = regHtml


    const nameRegInput =document.getElementById("name-reg-input")
    const loginRegInput =document.getElementById("login-reg-input")
    const passwordRegInput =document.getElementById("password-reg-input")

    const regUserBtn = document.querySelector(".button-reg-user")
        regUserBtn.addEventListener("click",()=>{
            if(loginRegInput.value==="" || nameRegInput.value==="" || passwordRegInput.value=== ""){
                alert("Заполните все поля!")
                return
            }
            regNewUser (
                loginRegInput.value,
                nameRegInput.value,
                passwordRegInput.value
            ).then(()=>{
                renderLogin()
            })
    })
 }

