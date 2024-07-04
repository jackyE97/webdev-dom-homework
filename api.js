
const url = "https://wedev-api.sky.pro/api/v1/jacqueline-eller/comments";
const host = "https://wedev-api.sky.pro/api/v2/jacqueline-eller/comments";
const tokenUrl= "https://wedev-api.sky.pro/api/user/login";

export let token;
export const setToken = (newToken) => {
  token = newToken;
};

export function getApi() {
  let status = 0;

  return fetch(host, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if(response.status === 401) {
        throw new Error("Вы не зарегистрированы");
      }
      // status = response.status;
      
      return response.json();
    })
    .then((data) => {
      if (status >= 400)
        throw new Error(data.error);
 
      return data;
    })
    .catch((error) => {
      if (error === "Failed to fetch")
        alert("Проблемы с Интернетом, проверьте соединение");
      else
        alert(error.message);

      return "error";
    })
}

export function postApi(name, text) {
  let status = 0;

  return fetch(host, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      text: text,
      // forceError: true,
    }),
  })
    .then((response) => {
      status = response.status;
      
      return response.json();
    })
    .then((data) => {
      if (status >= 400)
        throw new Error(data.error);

      return data;
    })
    .catch((error) => {
      if (error === "Failed to fetch")
        alert("Проблемы с Интернетом, проверьте соединение");
      else
        alert(error.message);

      return "error";
    })
}

//login
// функция обращения к серверу для авторизации 
export async function  login({ login, password }) {
  return fetch(tokenUrl, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        console.log("комменты отрисовались?");
        return response.json();
      }
      if (response.status === 400) {
        throw new Error("неправильный логин или пароль 400");
      }
      if (response.status === 500) {
        return Promise.reject("ошибка сервера");
      }
      return Promise.reject("Отсутствует соединение");
    })
    .catch((error) => {
      alert(error);
      console.warn(error);
    });
};


//registration

//   функция обращения к серверу для регистрации 
export async function  register({ name, login, password }) {
  console.log(name, login, password);
  return fetch(tokenUrl, {
    method: "POST",
    body: JSON.stringify({
      name,
      login,
      password,
    }),
  })
    .then((response) => {
      // console.log(response);
      if (response.status === 201) {
        console.log("авторизация?");
        return response.json();
      }
      if (response.status === 400) {
        throw new Error("пользователь с таким логином уже сущетсвует 400");
      }
      if (response.status === 500) {
        return Promise.reject("ошибка сервера");
      }
    })
    .catch((error) => {
      alert(error);
      console.warn(error);
    });
};