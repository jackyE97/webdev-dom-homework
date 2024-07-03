
const url = "https://wedev-api.sky.pro/api/v1/jacqueline-eller/comments";
const host = "https://wedev-api.sky.pro/api/v2/jacqueline-eller/comments";
const tokenUrl= "https://wedev-api.sky.pro/api/user/login";

export let token;
export const setToken = (newToken) => {
  token = newToken;
}

export function getApi() {
  let status = 0;

  return fetch(host, {
    method: "GET",
  })
    .then((response) => {
      if(response.status === 401) {
        throw new Error("Нет авторизации");
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
      Authorization: `Bearer ${token}`
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


//registration

export function login({ login, password }) {
  return fetch(tokenUrl, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  });
};