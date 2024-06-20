
const url = "https://wedev-api.sky.pro/api/v1/jacqueline-eller/comments";

export function getApi() {
  let status = 0;

  return fetch(url)
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

export function postApi(name, text) {
  let status = 0;

  return fetch(url, {
    method: "POST",
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

