export const baseURL = new URL("https://wedev-api.sky.pro/api/v2/:jacqueline-eller/comments");
export const urlApiLogin = new URL("https://wedev-api.sky.pro/api/user/login")
export const urlApiuser = new URL("https://wedev-api.sky.pro/api/user");

export let listElement = document.getElementById('list');


export let token = localStorage.getItem("token");
export const setToken = (newToken) => {
  token = newToken;
};

export const getToken = () => {
  return token;
};

// Функция обращения к серверу для загрузки комментария
export async function apiGetComments() {
    return fetch(baseURL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
          },
    }).then((response) => {
        if (response.status === 401) {
          throw new Error("Вы не авторизованы");
        }
                if (response.status === 200) {
            return response.json();
        }

        if (response.status === 500) {
            throw new Error("Сервер упал");
        }

      })  
};


// Функция обращения к серверу для публикации поста
export async function apiPostComments(nameInputElement, reviewInputElement) {
   return fetch(baseURL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
          },
        body: JSON.stringify({
            text: reviewInputElement.value,
            name: nameInputElement.value,
            forceError: true
        }),
    })
        .then((response) => {
            console.log(response);
            if (response.status === 201) {
                return response.json();
            }
            if (response.status === 400) {
                throw new Error("Неверный запрос");
            }
            if (response.status === 500) {
                throw new Error("Сервер упал");
            }
        });
};

// ункция обращения к серверу для авторизации 
export async function  login({ login, password }) {
    return fetch(urlApiLogin, {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
        if (response.status === 400) {
          throw new Error("Неправильный логин или пароль");
        }
        if (response.status === 500) {
          return Promise.reject("Ошибка сервера");
        }
        return Promise.reject("Отсутствует соединение");
      })
      .catch((error) => {
        alert(error);
        console.warn(error);
      });
  };

//  Функция обращения к серверу для регистрации 
  export async function  register({ name, login, password }) {
    console.log(name, login, password);
    return fetch(urlApiuser, {
      method: "POST",
      body: JSON.stringify({
        name,
        login,
        password,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
        if (response.status === 400) {
          throw new Error("Этот логином уже занят");
        }
        if (response.status === 500) {
          return Promise.reject("Ошибка сервера");
        }
        return Promise.reject("Отсутствует соединение");
      })
      .catch((error) => {
        alert(error);
        console.warn(error);
      });
  };

  

